<script>
	import { CodeBlock } from '$lib/components';
	const code1 = `
from flask import Flask
from flask import request, jsonify
import json
import urllib.request
from functions import resolve_request

app = Flask(__name__)

def get(username, password):
    data = resolve_request(username, password)
    return jsonify(data)

@app.route('/', methods=['GET'])
def run():
    try:
        username = request.args['username']
        password = request.args['password']
    except:
        resp = {
            'error': 'No Username/Password provided'
        }
        data = jsonify(resp)
        data.headers.add('Access-Control-Allow-Origin', '*')
        return data
    try:
        data = get(username, password)
        data.headers.add('Access-Control-Allow-Origin', '*')
        return data
    except Exception as e:
        resp = {
            'error': e
        }
        data = jsonify(resp)
        data.headers.add('Access-Control-Allow-Origin', '*')
        return data


if __name__ == "__main__":
    app.run()

    `;

	const code2 = `
import requests
from bs4 import BeautifulSoup
import json
from datetime import datetime
import pandas as pd
import json

def return_session(username, password):
    s = requests.Session()
    payload = {
        "utf8": "%E2%9C%93",
        "user[login]": username,
        "user[password]": password,
        "commit": "Log+In"
    }
    site = s.get("https://archiveofourown.org")
    soup = BeautifulSoup(site.content, 'html.parser')
    payload["authenticity_token"] = soup.find("input", {"name": "authenticity_token"})['value']

    s.encoding = 'utf-8'
    s.post("https://archiveofourown.org/users/login", data=payload)
    return s

def get_pages(base_url, session):
    request = session.get(base_url)
    soup = BeautifulSoup(request.content, 'html.parser')
    pages = soup.find("ol", { "class": "pagination actions" })
    all_pages = []
    for li in pages.findAll('li'):
        all_pages.append(li.text)
    max_pages = int(all_pages[-2])
    return [*range(1, max_pages+1)]

def get_fics(base_url, session):
    request = session.get(base_url)
    soup = BeautifulSoup(request.content, 'html.parser')
    works = soup.find("ol", { "class": "reading work index group" })
    all_fics = []
    fics = works.findChildren("li", recursive=False)
    for i in fics:
        try:
            temp_fic = fic_check(i)
            if temp_fic['dt'] >= datetime(2021, 1, 1, 0, 0):
                all_fics.append(temp_fic)
            else:
                break
        except:
            pass

    return all_fics

def fic_check(soup):
    title_array = []
    character_array = []
    freeform_array = []

    heading = soup.find("h4", { "class": "heading"})
    title_details = heading.findChildren("a", recursive=False)
    for i in title_details:
        title_array.append(i.text)
    try:
        relationships = soup.find("li", { "class": "relationships" }).text.replace('\n', '')
    except:
        relationships = "NONE"
    characters = soup.findAll("li", { "class": "characters" })
    for i in characters:
        character_array.append(i.text)

    freeforms = soup.findAll("li", { "class": "freeforms"})
    for i in freeforms:
        freeform_array.append(i.text)

    visited = soup.find("h4", { "class": "viewed heading" }).text.replace('\n', '').replace(',', '')
    visited_list = visited.split()
    visited_count = visited_list[visited_list.index("Visited") + 1]
    if visited_count == "once":
        visited_count = 1
    else:
        visited_count = int(visited_count)

    last_visited = (' ').join(visited_list[2:5])
    dt = datetime.strptime(last_visited, '%d %b %Y')

    word_count = int(soup.find("dd", { "class": "words"}).text.replace(',', ''))

    details = {
        "title": title_array[0],
        "author": title_array[1],
        "relationship": relationships,
        "characters": character_array,
        "word_count": word_count,
        "tags": freeform_array,
        "visited": visited_count,
        "dt": dt
    }
    return details


def load_data(username, password):
    session = return_session(username, password)
    base_url = f"https://archiveofourown.org/users/{username}/readings"
    all_pages = get_pages(base_url, session)
    all_fics = []
    all_breaks = []
    for i in all_pages:
        try:
            fics_url = base_url + f"?page={i}"
            fics = get_fics(fics_url, session)
            for fic in fics:
                all_fics.append(fic)
                if fic["dt"] >= datetime(2021, 1, 1):
                    all_breaks.append(False)
                else:
                    all_breaks.append(True)
        except:
            pass

        if True in all_breaks:
            print(f'BREAKING ON PAGE {i}')
            break

    return all_fics

def resolve_request(username, password):
    raw_data = load_data(username, password)
    frame = pd.DataFrame(raw_data)
    most_visited = frame[frame.visited == frame.visited.max()]

    total_words = frame.word_count.sum()
    total_fics = len(frame)
    total_reads = frame.visited.sum()

    all_relations = []
    all_characters = []
    all_tags = []

    for i in raw_data:
        all_relations.append(i["relationship"])
        for x in i["characters"]:
            all_characters.append(x)
        for x in i["tags"]:
            all_tags.append(x)

    relations_df = pd.DataFrame(all_relations)[0].value_counts().head(5).index.tolist()
    characters_df = pd.DataFrame(all_characters)[0].value_counts().head(5).index.tolist()
    tags_df = pd.DataFrame(all_tags)[0].value_counts().head(5).index.tolist()
    mv = {
        "title": most_visited.iloc[0].title,
        "author": most_visited.iloc[0].author,
        "count": int(most_visited.iloc[0].visited),
        "relations": relations_df,
        "characters": characters_df,
        "tags": tags_df
    }

    return_data = {
        "username": username,
        "total_words": int(total_words),
        "total_fics": int(total_fics),
        "total_reads": int(total_reads),
        "most_visited": mv,
    }
    return return_data

    `;
</script>

<svelte:head>
	<title>AO3 Wrapped - 2021 Looking Back</title>
</svelte:head>

<div class="wrapper">
	<div class="container">
		<h1>AO3 Wrapped - Looking Back on 2021</h1>
		<p>
			Hello all. With traffic finally starting to die down, I thought it would be interesting to
			look at how AO3 wrapped with BotHermione went this year, and what it means for next years.
		</p>
		<p>So, first things first -</p>
		<br />
		<h1>What the hell is AO3 Wrapped?</h1>
		<p>
			This was a question I saw get thrown around a bit on. To break it down in the simplest way,
			it's a brief, entertaining way for someone to look back at their history on <a
				href="https://archiveofourown.org">Archive Of Our Own (AO3)</a
			>. The idea of this is quite obviously taken from Spotify Wrapped, which does the same thing
			but for a Spotify account.
		</p>
		<p>
			The idea for making one of these was floating around for a few days before I thought about
			giving it a go.
		</p>
		<h1>The Boring Code Preamble</h1>
		<p>
			Initally AO3 Wrapped was going to be a webapp only (more on this fun foreshadowing later). So
			it was split into two parts the frontend to display the results (this site!) and a backend
			that performed the following actions:
		</p>
		<ul>
			<li>Taking provided details from a user</li>
			<li>Logging in as a user</li>
			<li>Finding out how long a users history is</li>
			<li>Looping through pages</li>
			<li>Pulling each fic from page</li>
			<li>If fic time &lt; 01-01-2021 break loop and calculate all fics</li>
			<li>Return statistics to the frontend</li>
		</ul>
		<p>
			Easy peasy. Because I'm lazy and didn't think I'd have to build something performant Python
			was always going to be the easiest option. It's good at looping through data, I already had
			some of the code ready with <a href="https://www.crummy.com/software/BeautifulSoup/bs4/doc/"
				>BeautifulSoup</a
			> for the data analytics page and the ML text finding, so it shouldn't be too hard right?
		</p>
		<p>The first part of the code was simple - making a Flask server -</p>
		<CodeBlock code={code1} language="python" />
		<p>
			This initial part is quite simple, all it does is check if there's a username and password
			required. This is necessary for AO3, as a users history is not publically viewable, thus the
			backend has to be able to log in as them. If this ever fails, a catch statement in the
			frontend ensures they're informed of this.
		</p>
		<p>
			This brings us to the mysterious function, get(username, password) which runs the
			resolve_request(username, password) from a file called functions
		</p>
		<CodeBlock code={code2} language="python" />
		<br />
		<p>Good lord there's a lot going on here. So lets start breaking it down.</p>
		<p>
			The first thing resolve_request does is create an authenticated session. It does this by first
			creating a request session, loading AO3 and pulling the "authenticity_token". This is a
			uniquely created token that is required for a user to be able to log in, basically, just
			making sure a user isn't spamming the login request (more ominous foreboding noises). It then
			calls the login function from "https://archiveofourown.org/users/login" with the required
			data.
		</p>
		<p>
			If this returns 200, the session is authenticated, and the history page will now display a
			users history correctly. As such, we now load the following page
			"https://archiveofourown.org/users/&#123;username&#125;/readings". From here, we can search
			for all the pages in a user history by finding "pages = soup.find("ol", &#123; "class":
			"pagination actions" &#125;)". The last result will be the "Next" button, so we need to find
			the last integer in the list with [-2]. We then finally, return an array from 1 to that
			integer.
		</p>
		<p>
			So, we finally have an authenticated session, and a list of the maximum number of pages we're
			going to have to parse. We can finally start finding the fics with get_fics(base_url,
			session). The base_url variable we'll pass in will be the specific history page we're looking
			at. Each fic on this page (default is 20 if a user has more than one history page) then has
			its data parsed, json data is saved to a list.
		</p>
		<p>
			Once all the fics for 2021 are added to this list, it's converted to a dataframe, and the most
			visited, total word count, total number of fics, and total reads are calculated from this set.
			Then, each character, relationship and tag is added to a seperate list, which is then loaded
			into a dataframe (purely to run the value_counts() function), and the top five are returned as
			a list.
		</p>
		<p>
			With the data finally parsed, it's returned as a dictionary, converted to json, and returned
			to the frontend for display.
		</p>
		<p>
			Simple! At no point are any of the login details stored or saved, as soon as the function is
			complete the memory these variables were stored in is released, and the flask server waits for
			its next request
		</p>
		<br />
		<p>
			So with the flask server complete, it was loaded onto Heroku and made to wait. Initially it
			ran just fine, with the couple of requests it got every hour or so
		</p>
		<h1>And that's when the problems started, that damn smile</h1>
		<img src="/images/requests.jpg" alt="An unexpected number of requests" />
		<p>
			The seventh came and went with a few requests, and I had no issues! Fantastic. One thing that
			I hadn't really thought about however, was how Heroku handles outgoing IP's. Each dyno is
			assigned an IP address on boot, and retains that address throughout its lifecycle. I foolishly
			thought if the dyno crashed and restarted (i.e., the function returns a 429), it would be
			assigned a new IP adress.
		</p>
		<p>This isn't how it worked at all</p>
		<p>
			Sharing the webapp on twitter then, ended up being a mistake. It spread through DM's people
			sharing on their feeds, and eventually the dyno was recieving thousands of requests per hour -
			and AO3 naturally began timing out the IP. The .catch function on the frontend encouraged
			people to try again later - but I really should have specified a time. Users were simply
			refreshing the page, and sending the request again immediately. Testing showed I could scan
			about 700 pages per minute before getting timed out for 10. Herein lied one of the major
			issues - I seriously underestimated the number of pages a user might have. The highest I've
			seen shared would have been ~110 pages, meaning 7 users with a history of that size would kill
			the bot. With 85,000 requests on the first day of being properly live, the flask deployment
			was getting timed out a lot.
		</p>
		<p>
			This could be alleviated with a proxy service, or additional dynos, but I foolishly thought
			"Why not just turn the whole thing into a local app for people to do it on their own devices".
			The site was already ran off Svelte, and I have had a small amount of experience converting a
			Svelte site into an Electron App, I had a Windows and Mac available to me - surely this
			wouldn't be too hard to package up and make available?
		</p>
		<p>
			The hardest part by far was making sure the Electron App spawned a local copy of the flask
			server that ran the request. Thankfully <a href="https://www.pyinstaller.org/"
				>PyInstaller
			</a> has some great docs and made packaging the application easy, and the snippet of code "var
			subpy = require("child_process").execFile("./ao3_flaskserver/ao3.exe");" inside the index.js file
			that launches Electron ensured the file loads correctly. There are some minor alterations for mac
			(specifically, getting the __dirname, appending the full path and altering execFile to instead
			be .execFile('open', [__dirname + "/ao3_flaskserver/ao3.app"]) corrected this.) This correctly
			opened the packaged flask server available for download. The local copy runs the exact same code
			as Heroku does, but doesn't have the same 30s timeout limit (meaning users with much larger histories
			can actually run the function), and has the desired effect of avoiding the dreaded AO3 429 error.
		</p>
		<br />
		<h1>So, what was learnt?</h1>
		<p>
			Making the source code available was a good idea for user trust. While most people didnt even
			look at it, simply the act of making it available and committing to transparency helped people
			feel comfortable providing their password. Making a local copy was apparently the reason some
			users felt comfortable using it.
		</p>
		<p>
			However, clearly more thought needs to be put into the backend. While Vercel managed the
			frontend with zero interruptions (absolutely incredible service, cannot recommend them
			enough). AWS Lambda is a potential option, although inital reading implies this also has a
			fixed IP. Perhaps a distributed network of Lambda functions then, with a party function to
			select a random one? Of course, reaching out to AO3 and requesting a 429 exception is also an
			option, but it's unlikely. Perhaps instead providing all the code for them to implement in on
			AO3 would be smart. If anyone has any ideas, please do DM me on Twitter!
		</p>
		<p>
			It's also clear that a cross platform, locally provided option (iOS/Android I'm looking at
			you) would be good to have for next year. There were also some issues with how things
			displayed on mobile devices (long usernames etc.), so UI/UX testing is a required function.
		</p>
		<p>Here's looking at you 2022, seems like it's going to be fun.</p>
	</div>
</div>

<style>
	h1 {
		font-size: 3rem;
		font-family: var(--serif-font);
		font-style: italic;
	}
	.wrapper {
		display: flex;
		flex-direction: column;
		width: 100%;
		align-items: center;
		font-family: var(--sans-font);
		font-size: 1.2rem;
	}
	.container {
		width: 60%;
	}
	img {
		width: auto;
		height: auto;
		max-height: 100%;
		max-width: 100%;
		object-fit: contain;
	}
	@media only screen and (max-width: 600px) {
		.container {
			width: 80%;
		}
	}
</style>
