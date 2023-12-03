<div class="wrapper">
  <div class="container">
    <h1>BotHermione's Page</h1>
  </div>

  <div class="row">
    <div class="column">
      <h1>Wrapped now available</h1>
      <p><a href="/wrapped">See yours here</a></p>
    </div>
    <div class="column">
      <img class="logo" src="/images/logo.jpg" alt="BOTHERMIONE" />
    </div>
  </div>
</div>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  .container {
    width: 60%;
    display: flex;
    justify-content: center;
  }
  .row {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .column {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 200px;
  }
  h1 {
    font-family: var(--serif-font);
    font-style: italic;
    z-index: 1;
    mix-blend-mode: difference;
    color: rgb(45, 42, 42);
  }
  p {
    font-family: var(--serif-font);
    font-style: italic;
    color: rgb(45, 42, 42);
  }
  .logo {
    width: 100px;
    height: 100px;
    border-radius: 100px;
    position: absolute;
    z-index: 0;
  }
  @media only screen and (max-width: 600px) {
    .container {
      width: 80%;
    }
    .row {
      flex-direction: column;
    }
    .column {
      width: 100%;
    }
  }
</style>
