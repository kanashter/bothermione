<script>
	import { CodeBlock } from '$lib/components';
	const code1 = `
def get_all_pages():
    base_url = "https://archiveofourown.org/tags/Hermione%20Granger/works"
    r = requests.get(base_url, headers=headers)
    soup = BeautifulSoup(r.content, 'html.parser')

    all_pages = { "class": "pagination actions" }

    lis = []
    x = soup.find("ol", all_pages)

    for li in x.findAll('li'):
        for a in li.findAll('a'):
            lis.append(a.contents[0])

    all_pages = lis[-2]
    return {
        "base_url": "https://archiveofourown.org/tags/Hermione%20Granger/works",
        "total_pages": int(all_pages)
    }
    `;
	const code2 = `
def get_fic_link(page_num, count, total):
    base_url = f"https://archiveofourown.org/tags/Hermione%20Granger/works?page={page_num}"
    while True:
        r = requests.get(base_url, headers=headers)
        if r.status_code == 200:
            print(f"LINK: {count} OF {total} DOWNLOADED")
            break
        else:
            print(f"TIMING OUT - STATUS: {r.status_code}")
            print(r.headers)
            time.sleep(300)
            print("REATTEMPTING")
            continue
    soup = BeautifulSoup(r.content, 'html.parser')
    all_works = { "class": "work index group" }
    all_works_souped = soup.find("ol", all_works)
    all_fics_on_page = all_works_souped.findChildren("li", recursive=False)
    return_link = None
    for i in range(0, len(all_fics_on_page)-1):
        if tag_check(all_fics_on_page[i]):
            heading = all_fics_on_page[i].find("h4", { "class": "heading" })
            links = heading.findAll("a")
            return_link = f"https://archiveofourown.org{links[0]['href']}"
            break
    return return_link
    `;
	const code3 = `
def tag_check(work):
    tags = { "class": "tags commas" }
    language = { "class": "language" }
    relationships = { "class": "relationships" }
    list = work.find("ul", tags)
    language = work.find("dd", "language").text
    try:
        check = list.find("li", relationships).text
        if "Hermione" in check:
            if "English" in language:
                return True
            else:
                return False
        else:
            return False
    except:
        return False
    `;
	const code4 = `
def get_fic_text(link, count, total):
    while True:
        r = requests.get(link, headers=headers, cookies=cookies)
        if r.status_code == 200:
            print(f"FIC {count} of {total} DOWNLOADED")
            break
        else:
            print(f"TIMING OUT - STATUS: {r.status_code}")
            print(r.headers)
            time.sleep(300)
            print("REATTEMPTING")
            continue
    soup = BeautifulSoup(r.content, 'html.parser')
    work = soup.find("div", { "role": "article" }).text
    return work.replace("Chapter Text", "").replace("Work Text:", "").strip()

    `;
	const code5 = `
from aitextgen.TokenDataset import TokenDataset
from aitextgen.tokenizers import train_tokenizer
from aitextgen.utils import GPT2ConfigCPU
from aitextgen import aitextgen

train_tokenizer(file_name)
tokenizer_file = "aitextgen.tokenizer.json"
config = GPT2ConfigCPU()
ai = aitextgen(tokenizer_file=tokenizer_file, config=config)
data = TokenDataset(file_name, tokenizer_file=tokenizer_file, block_size=64)
ai.train(data, batch_size=8, num_steps=50000, generate_every=5000, save_every=5000, num_workers=8)
    `;
	const code6 = `
ai = aitextgen(model_folder="model_folder",
        tokenizer_file="model_folder/aitextgen.tokenizer.json")
    `;
	const code7 = `
# Short Text
x = ai.generate_one(max_length=240, prompt=chosen_start)

# Long Text
string = ""
string += ai.generate_one(prompt=chosen_start)

for i in range(100):
    last_words = (' ').join(string.split()[-5:])
    new_string = ai.generate_one(prompt=last_words)
    cleaned_string = new_string.replace(last_words, "")
    string += cleaned_string
    `;
	const code8 = `
selected_string = random.choice(all_strings)
complete_string = f"""
{selected_string}
{fic}
"""`;
	const code9 = `
def push_to_firebase(text):
    cert = credentials.Certificate({
			# CERTIFICATE DETAILS
        })

    default_app = firebase_admin.initialize_app(cert, {
        "databaseURL": "https://horny-hermione-default-rtdb.firebaseio.com/"
    })

    dt = date.today().strftime('%y%m%d')
    fic = {
        str(dt): {
            'text': text
        }
    }

    ref = db.reference("/largefics/")
    ref.update(fic)

    firebase_admin.delete_app(default_app)
	`;
	const code10 = `
for key, val in fics_snapshot.items():
	if datetime.now().timestamp() > val["datetime"] + 310000:
		delete_ref = ref.child(key)
		delete_ref.delete()
	`;
	const code11 = `
def tweet_fanfic(string):
    with open("keys.json") as keys:
        certs = json.load(keys)

    auth = tweepy.OAuthHandler(certs["api_key"], certs["api_key_secret"])
    auth.set_access_token(certs["access_token"], certs["access_secret"])
    api = tweepy.API(auth)
    status = api.update_status(status=string)
	`;
	const code12 = `
def post_on_fic(link_to_fic, bot_hermione_comment, tweet_link):
    with requests.Session() as s:
        payload = {
            "utf8": "%E2%9C%93",
            "user[login]": "username",
            "user[password]": "password",
            "commit": "Log+In"
        }
        site = s.get("https://archiveofourown.org")
        soup = BeautifulSoup(site.content, 'html.parser')
        payload["authenticity_token"] = soup.find("input", {"name": "authenticity_token"})['value']

        s.encoding = 'utf-8'
        s.post("https://archiveofourown.org/users/login", data=payload)

        kudos_payload = {
            "utf8": "%E2%9C%93",
            "kudo[commentable_type]": "Work"
        }

        comment_payload = {
            "utf8": "%E2%9C%93",
            "controller_name": "works",
            "commit": "Comment"
        }

        cookies = { "view_adult": "true"}

        rating_data = s.get(link_to_fic, cookies=cookies)
        rating_soup = BeautifulSoup(rating_data.content, 'html.parser')
        rating = rating_soup.find("dd", { "class": "rating tags" }).text.replace('\n', '')
        kudos_payload["kudo[commentable_id]"] = rating_soup.find("input", { "name": "subscription[subscribable_id]"} )["value"]
        kudos_payload["authenticity_token"] = rating_soup.find("input", { "name": "authenticity_token" })["value"]

        k = s.post("https://archiveofourown.org/kudos.js", cookies=cookies, data=kudos_payload)

        if rating == "Explicit":
            comment_payload["comment[comment_content]"] = f"The Hermione Twitter Bot Thinks\n\n<strong>{bot_hermione_comment}</strong>\n\n<i>This tweet was created by an automatic bot that linked to your work. Please DM the following account for details</i>\n<a href='https://twitter.com/BotHermione'>BotHermione</a> - <a href={tweet_link}>Tweet</a>",
        else:
            comment_payload["comment[comment_content]"] = f"The Hermione Twitter Bot likes this work! Great Job!\n\n<i>This tweet was created by an automatic bot that linked to your work.</i>\n<a href='https://twitter.com/BotHermione'>BotHermione</a>"

        work_page = f"{link_to_fic}/comments"
        work_data = s.get(work_page, cookies=cookies)
        work_soup = BeautifulSoup(work_data.content, 'html.parser')
        comment_payload["comment[pseud_id]"] = (work_soup.find("input", { "name": "comment[pseud_id]" })["value"])
        comment_payload["authenticity_token"] = work_soup.find("input", { "name": "authenticity_token" })["value"]

        p = s.post(work_page, data=comment_payload, cookies=cookies)

        if p.status_code == 200:
            print("COMMENTED SUCCESSFULLY")
        else:
            print(p.status_code)
            print("COMMENT FAILURE")

	`;
	const code13 = `
def reply_to_tweet():
    with open("keys.json") as keys:
        certs = json.load(keys)

    auth = tweepy.OAuthHandler(certs["api_key"], certs["api_key_secret"])
    auth.set_access_token(certs["access_token"], certs["access_secret"])
    api = tweepy.API(auth)
    time_check = datetime.utcnow().replace(tzinfo=pytz.utc) - timedelta(minutes=30)
    status = api.search_tweets(q="@BotHermione -filter:retweets", lang="en")

    for tweet in status:
        to_reply = []
        if tweet.created_at >= time_check:
            to_reply.append(tweet)
        for x in to_reply:
            if 'horn score' in x.text.lower():
                api.update_status(generate_horny_rating(), 
					in_reply_to_status_id=x.id, auto_populate_reply_metadata=True)
`;
</script>

<svelte:head>
	<title>BotHermione - About</title>
</svelte:head>

<div class="wrapper">
	<div class="container">
		<h1>Hello</h1>
		<p>I'm BotHermione, a little side project of dumps_mcgee.</p>
		<p>
			What started out as a minor joke turned into something of a full fledged obsession that
			weirdly enough is also a very helpful CV piece. BotHermione now exists as a fullstack Web
			project with social integration. If you're not after the technical breakdown, and instead just
			want to know <br />
			<i
				>"Hey BotHermione, despite how terrible you usually are you wrote something that's really
				good and I'd like to use it as a prompt"</i
			> <br /> I have a simple answer for you.
		</p>
		<h1 style="font-style: italic;">Please feel free</h1>
		<p>
			As this text is all ML generated, it falls under the GPL2 License, meaning it, and it's
			outputs are free to use as you see fit. I'd actually be quite honored should you choose to do
			so.
		</p>
		<p>
			Now for the dull (or maybe interesting if you'd like to do something like this yourself!) bits
		</p>
		<p>
			BotHermione is made up of a few very poorly coded parts, the majority of which I'll attempt to
			explain through here. These are best broken down into the following components:
		</p>
		<ul>
			<li>The Scraper</li>
			<li>The Writer</li>
			<li>The Database</li>
			<li>The Speaker</li>
			<li>The Display</li>
		</ul>
		<h1>The Scraper</h1>
		<p>
			The Scraper has two functions - to periodically update the training dataset for The Writer,
			and to collect content for The Speaker.
		</p>
		<p>
			The first of these is done using <i>Python</i> and
			<i>BeautifulSoup</i>. For the training dataset, this is a monthly cron job that pulls all
			works that have Hermione tagged as the primary (first) relationship in AO3, strips the content
			and compiles it to a text file. To collect all the fics, we have to first get the total number
			of pages that are available for a specific character on AO3
		</p>
		<CodeBlock language="python" code={code1} />
		<p>
			The next step is to iterate over all the pages, and collect the links of all matching works.
			This is achieved using the following helper functions
		</p>
		<CodeBlock language="python" code={code2} />
		<CodeBlock language="python" code={code3} />
		<p>
			Finally, with a clean list of every URL that we can scrape, we can set about actually getting
			the text of the work
		</p>
		<CodeBlock language="python" code={code4} />

		<p>
			This is a relatively lengthy process, as AO3 doesn't really apprectiate being bombed with
			requests. The timeout functions ensure that this is sidestepped. It's also important to pass a
			cookie to the session to ensure that the Adult Consent section of the site is not triggered.
			This is quite easy, and can be done using the following:
		</p>
		<CodeBlock
			language="python"
			code={`headers = {
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'
        }
cookies = { "view_adult": "true"}`}
		/>
		<br />
		<p>
			The secondary function uses these same helper methods, however rather than collecting all the
			fics, chooses a random page from the first function, then selects a random link from that page
			using the random.choice() builtin python methods.
		</p>
		<br />
		<h1>The Writer</h1>
		<p>
			The Writer performs 2 functions, generating ML text, and generating the content for social
			media. All the heavy lifting for ML text is run through the wonderful <a
				href="https://github.com/minimaxir/aitextgen"
				target="_blank">aitextgen.</a
			> which handles both the training, and the actual content generation.
		</p>
		<CodeBlock language="python" code={code5} />
		<p>
			This creates a model that can be loaded quite easily. This method works well when working on
			something like a micro EC2 instance (as BotHermione does), as it means the training can be
			seperated out to a local device or CoLab file, with only the trained model being used by the
			instance. It can be loaded as follows:
		</p>
		<CodeBlock language="python" code={code6} />
		<p>
			The max length that can be loaded by aitextgen is 1024 characters on an instance like this,
			which means loops to generate large text snippets, and a limit for tweets. This can be done as
			follows
		</p>
		<CodeBlock language="python" code={code7} />
		<br />
		<p>
			The secondary function of the writer is much simpler - generating content for social media.
			This is a relatively simple function that selects a random string to start the tweet, appends
			the partner found in the fic link, adds some spice and appends the link.
		</p>
		<CodeBlock language="python" code={code8} />
		<br />
		<h1>The Database</h1>
		<p>
			The Database is a simple storage solution using a Firebase Realtime database. This stores the
			large writted material, and additional links to fanfics inside it. An example of how this data
			is stored can be found below.
		</p>
		<CodeBlock language="python" code={code9} />
		<p>
			This function runs on a cron basis, and updates the database as is necessary. Large fics are
			updated daily, while works are updated twice daily. To ensure the number of linked works
			stored does not get too large, these are stored on a datetime basis, with an expiration. When
			updating the linked works, there is also a job that checks for any works that are older than
			their expiration, and deletes them.
		</p>
		<CodeBlock language="python" code={code10} />
		<br />
		<h1>The Speaker</h1>
		<p>
			The Speaker has two primary functions - updating social media, and informing the fanfiction
			writer of a linked work knows their work has been mentioned by the bot. The first of these is
			managed through the <a href="https://www.tweepy.org/">tweepy</a> package. It's important to
			note here that a <a href="https://developer.twitter.com/en">twitter developer</a> account is required
			to run this correctly. The package is relatively simple, the required string is passed to the tweepy
			function which then updates as follows
		</p>
		<CodeBlock language="python" code={code11} />
		<p>
			The final piece of content for social media is a job that replies to specific mentions of the
			bot with a "horn score", which is run as a cron job every half hour as follows:
		</p>
		<CodeBlock language="python" code={code13} />
		<br />
		<p>
			Commenting on a fanfic is however a touch more difficult. As this requires authentication, it
			becomes necessary to start a new session that authenticates, stores the required auth
			response, then comment. Thankfully, AO3 makes this relatively easy to perform programatically,
			although the function is a lengthy one
		</p>
		<CodeBlock language="python" code={code12} />
		<p>In order to better explain this, it's best to run through it step by step.</p>
		<p>
			We first initiate a session that simply loads the main site - and grab the returned
			"authenticity token". This is appended to the required payload for authentication purposes.
			With this, we can now authenticate our session by posting to the login script. Next - we check
			the rating of the work and set our cookie to view_adult=True to ensure we can load the work
			correctly. If the rating of the work isn't explicit, it may not make sense to post the actual
			tweet, rather a link to the twitter account.
			<br />
			<br />
			With all these details sorted, we can now set our comment and kudos payloads, which are posted
			to their required scripts
		</p>
		<br />
		<h1>The Display</h1>
		<p>At last, we're at the final part of the fullstack application.</p>
		<p>
			The frontend is written using the wonderful <a href="https://kit.svelte.dev">SvelteKit</a>,
			and deployed through <a href="https://vercel.com">Vercel</a>. SvelteKit was chosen because in
			all honesty I just find it much easier than React, especially when it comes to DOM state
			management (it does it all for you!)
		</p>
		<p>
			The most complex part of the code is the dynamically loaded pages for each ML generated work.
			As mentioned earlier, this are all stored in the Firebase Database, but with script modules,
			we can create a page called [slug].svelte that acts as a template for each item in the
			database. Rather than using my absolutely terrible code to do this, I can strongly recommend
			checking out the <a href="https://kit.svelte.dev/docs#routing-pages"
				>documentation SvelteKit has available for modules.</a
			>
		</p>
		<br />
		<br />
		<h1>And that's it</h1>
		<p>
			There's likely more functionality to come in future, and if and when it does the details of
			which will be appended here. The roadmap for BotHermione is as follows:
		</p>
		<ul>
			<li>Improving ML Fics to better retain context</li>
			<li>Generative Fanart</li>
			<li>Better social engagement</li>
		</ul>
		<br />
		<p>
			As always, suggestions on improvements, and any questions are welcomed. Just DM the Bot on
			twitter and I'll make sure to get around to it!
		</p>
	</div>
</div>

<style>
	h1 {
		font-family: var(--serif-font);
	}
	p {
		font-family: var(--sans-font);
		font-size: 1.2rem;
	}
	.wrapper {
		width: 100%;
		display: flex;
		justify-content: center;
	}
	.container {
		width: 60%;
	}
	ul {
		font-family: var(--sans-font);
	}
	@media only screen and (max-width: 600px) {
		.container {
			width: 80%;
		}
	}
</style>
