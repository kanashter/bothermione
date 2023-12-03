<script>
  import { randomEmoji } from "$lib/api/stringfunctions";
  export let title;
  export let color1;
  export let color2;
  export let rotation;
  export let array;
  export let quote;
</script>

<div
  class="tile"
  style="background: linear-gradient({rotation}deg, {color1}, {color2})"
>
  <h1>{title}</h1>
  {#each array as tag, i}
    <p>
      <span class="size-{i + 1}">
        {i + 1} - {tag}
        {randomEmoji()}
      </span>
    </p>
  {/each}
  <h3>{quote}</h3>
</div>

<style>
  .tile {
    padding: 30px;
    text-align: center;
    margin-bottom: 3rem;
    border-radius: 50px;
    flex-direction: column;
  }
  h1 {
    font-size: 3rem;
    font-family: var(--serif-font);
    font-style: italic;
  }
  h3 {
    font-family: var(--serif-font);
    font-style: italic;
  }
  .size-1 {
    font-size: 2rem;
  }
  .size-2 {
    font-size: 1.8rem;
  }
  .size-3 {
    font-size: 1.6rem;
  }
  .size-4 {
    font-size: 1.4rem;
  }
  .size-5 {
    font-size: 1.2rem;
  }
</style>
