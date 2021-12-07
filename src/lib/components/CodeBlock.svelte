<script>
	import { onMount } from 'svelte';

	export let language;
	export let code;

	onMount(() => {
		let script = document.createElement('script');
		script.src = 'https://tutsplus.github.io/syntax-highlighter-demos/highlighters/Prism/prism.js';
		document.head.append(script);

		script.onload = function () {
			let langJS = false;
			let lang_script;
			let lang_module;

			switch (language) {
				case 'python':
					lang_module = 'https://prismjs.com/components/prism-python.js';
					langJS = true;
					break;
			}

			if (langJS == true) {
				lang_script = document.createElement('script');
				lang_script.src = lang_module;
				lang_script.async = true;
				document.head.append(lang_script);

				lang_script.onload = () => {
					Prism.highlightAll();
				};
			} else {
				Prism.highlightAll();
			}
		};
	});
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css?family=Open+Sans:400,700"
		type="text/css"
	/>
	<link
		rel="stylesheet"
		href="https://tutsplus.github.io/syntax-highlighter-demos/highlighters/Prism/prism_okaidia.css"
	/>
</svelte:head>

<div class="w3-container">
	<pre><code class="language-{language}">{code}</code></pre>
</div>
