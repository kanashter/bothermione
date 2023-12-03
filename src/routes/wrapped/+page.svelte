<script>
  import {
    randomEmoji,
    commaNum,
    randomString,
    generateRandomEmojiString,
    randomPersonString,
    randomRelationshipString,
    randomTagString,
    readCount,
  } from "$lib/api/stringfunctions";
  import { getWrapped } from "$lib/api/databaserequests";
  import { LoadingScreen, ListTile } from "$lib/components";
  let loaded = false;
  let u;
  let p;
</script>

<svelte:head>
  <title>BotHermione - WRAPPED</title>
</svelte:head>

<div class="wrapper">
  {#if loaded == true}
    <div class="container">
      {#await getWrapped(u, p)}
        <LoadingScreen />
      {:then data}
        {#if !data.error}
          <div class="wrapped">
            <div class="wrapped-1">
              <h1>{data.username}, this year you read</h1>
              <h2>
                {commaNum(data.total_fics)} fics, and you visited them {commaNum(
                  data.total_reads
                )} times
              </h2>
              <h2>{readCount(data.total_words)}</h2>
              <h2>{randomEmoji()}</h2>
            </div>
            <div class="wrapped-2">
              <h3>
                Your most read fic was <br />
              </h3>
              <h1>
                <span style="font-size: 1rem">
                  {generateRandomEmojiString()}<br />
                </span>
                <i>{data.most_visited.title}</i><br />
                by
                <i>{data.most_visited.author}</i>
                <span style="font-size: 1rem">
                  <br />
                  {generateRandomEmojiString()}
                </span>
              </h1>
              <h3>
                <br />You went back to it {commaNum(data.most_visited.count)}
                times.
                <br />
                {randomString()}
              </h3>
              <h2>{randomEmoji()}</h2>
            </div>
            <ListTile
              title="Characters"
              color1="#a8edea"
              color2="#fed6e3"
              rotation="135"
              array={data.most_visited.characters}
              quote={randomPersonString(data.most_visited.characters[0])}
            />
            <ListTile
              title="Relationships"
              color1="#d4fc79"
              color2="#96e6a1"
              rotation="45"
              array={data.most_visited.relations}
              quote={randomRelationshipString(data.most_visited.relations[0])}
            />
            <ListTile
              title="Tags"
              color1="#a1c4fd"
              color2="#c2e9fb"
              rotation="135"
              array={data.most_visited.tags}
              quote={randomTagString(data.most_visited.tags[0])}
            />
          </div>
        {:else}
          <h1>
            Looks like there was a server error! If you're positive you got your
            password right, please try again later!
          </h1>
          <p>
            If you're getting this error a lot, it means the server is currently
            being denied access to AO3. This usually refreshes after 10 minutes,
            but this has been so popular I can't ensure that's going to be the
            case.
          </p>
          <p>
            There is a solution, I've made a local version of this that will run
            on your computer. Please give it a try!
          </p>
          <p>
            <a
              href="https://github.com/kanashter/bothermione-ao3wrapped/releases/tag/v1.0.3-windows"
              >Windows</a
            >
          </p>
          <p>
            <a
              href="https://github.com/kanashter/bothermione-ao3wrapped/releases/tag/v1.0.3-mac"
              >Mac</a
            >
          </p>
          <p>
            <button on:click={() => (loaded = false)}>Try Again</button>
          </p>
          <h2>{randomEmoji()}</h2>
        {/if}
      {/await}
    </div>
  {:else}
    <h1>WRAPPED</h1>
    <div class="imgWrapper">
      <img src="/images/ao3_logo.png" alt="AO3 Logo" />
      <img class="altImage" src="/images/logo.jpg" alt="BotHermione logo" />
    </div>
    <div class="container">
      <p>
        Welcome back to AO3 wrapped. I'm sorry this asks for your password, but
        AO3 locks a readers history behind their account. Smart - but annoying
        for making these. If it makes you uncomfortable - For those savvy in
        code, all the BotHermione code is now open source, and can be found <a
          href="https://github.com/kanashter/BotHermione/">here.</a
        > This function uses a Flask container on Heroku to perform the following
        actions:
      </p>
      <ul>
        <li>Log into your account</li>
        <li>Loop through your history</li>
        <li>Parse data</li>
      </ul>
      <p>
        And thats it. None of your details are stored on this website, nor are
        they on the server performing this operation. I have enough trouble
        managing my own account - let alone other users!
      </p>
      <p>
        If you're having trouble due to a super long history, or servers being
        constantly overloaded, a local version will be available soon.
      </p>
      <p>
        But, if you're feeling brave - please log in below and see all the grimy
        details about your 2023 on AO3.
      </p>
    </div>
    <div class="login">
      <input bind:value={u} placeholder="username" />
      <input bind:value={p} placeholder="password" type="password" />
      <button on:click={() => (loaded = true)}> Show me the dirt </button>
      <h2>{randomEmoji()}</h2>
    </div>
  {/if}
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
    padding-top: 1rem;
  }
  input {
    width: 80%;
    margin-bottom: 2rem;
    background-color: rgba(0, 0, 0, 0);
    color: rgb(42, 42, 42);
    font-size: 2rem;
    font-family: var(--serif-font);
    border: 0px solid rgb(42, 42, 42);
    border-bottom: 1px solid rgb(42, 42, 42);
    text-align: center;
  }
  input:focus {
    outline: none;
    border-bottom: 1px solid rgb(152, 84, 84);
  }
  .login {
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  button {
    width: 80%;
    font-family: var(--sans-font);
    font-size: 1.2rem;
    border: 0px solid rgba(0, 0, 0, 0);
    border-bottom: 2px solid rgb(42, 42, 42);
    background-color: rgba(0, 0, 0, 0);
    color: rgb(42, 42, 42);
  }
  button:hover {
    background-color: rgb(42, 42, 42);
    color: rgb(152, 84, 84);
  }
  .wrapped {
    display: flex;
    flex-direction: column;
  }
  .wrapped-1 {
    background: linear-gradient(135deg, #c7a9e9, #a1c4fd);
    padding: 30px;
    text-align: center;
    margin-bottom: 3rem;
    border-radius: 50px;
    margin-top: 5rem;
  }
  .wrapped-2 {
    background: linear-gradient(45deg, #ffd3a5, #fd6585);
    padding: 30px;
    text-align: center;
    margin-bottom: 3rem;
    border-radius: 50px;
  }
  img {
    height: 80px;
  }
  .altImage {
    border-radius: 80px;
  }
  .imgWrapper {
    display: flex;
  }

  @media only screen and (max-width: 600px) {
    .container {
      width: 80%;
    }
  }
</style>
