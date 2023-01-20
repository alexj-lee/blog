<script context="module">
	import { REPO_URL, SITE_TITLE } from '$lib/siteConfig';
	import Nav from '../components/Nav.svelte';
	import '../tailwind.css';
</script>

<script>
</script>

<svelte:head>
	<link
		rel="alternate"
		type="application/rss+xml"
		title={'RSS Feed for ' + SITE_TITLE}
		href="/rss.xml"
	/>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css"
		integrity="sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X"
		crossorigin="anonymous"
	/>
</svelte:head>

<div class="flex flex-col justify-center px-4 dark:bg-vblue sm:px-8">
	<Nav />
</div>

<!-- <aside class="text-red fixed text-orange-300" /> -->

<!-- <<main class="relative flex flex-col justify-center px-4 dark:bg-vblue sm:px-8"> -->
<main class="relative flex flex-col justify-center px-4 sm:px-8">
	<!-- <aside class="invisible absolute flex bg-red-50 lg:visible"> -->

	<img
		src="/static/1jrj-d80_minsize.webp"
		alt="A video of a protein wiggling around."
		class="brightness-85 invisible absolute 
		max-w-sm bg-transparent object-right 
		opacity-90 dark:bg-transparent dark:opacity-100 dark:brightness-100
		md:visible
		"
	/>
	<!-- </aside> -->

	<slot />
</main>

<footer
	class="mx-auto mb-8 flex w-full max-w-2xl flex-col items-start justify-center dark:bg-vblue"
>
	<hr class="border-1 mb-8 w-full border-gray-200 dark:border-gray-800 dark:bg-vblue" />
	<div class="grid w-full max-w-2xl grid-cols-1 gap-4 px-4 pb-16 dark:bg-vblue sm:grid-cols-2">
		<div class="dark: flex flex-col space-y-4 dark:bg-vblue">
			<a class="text-gray-500 transition hover:text-gray-300" href="/">Home</a>
			<!--<a class="text-gray-500 transition hover:text-gray-300" href="/testpage">Homae</a>-->
			<a class="text-gray-500 transition hover:text-gray-300" href="/blog">Blog</a>
			<a class="text-gray-500 transition hover:text-gray-300" href="/about">About</a>
			<!--			<a class="text-gray-500 transition hover:text-gray-300" href="/#newsletter">Newsletter</a> 
			<a class="text-gray-500 transition hover:text-gray-300" href="/api/rss.xml" rel="external">
				RSS
			</a> -->
		</div>
		<div class="flex flex-col space-y-4">
			<a
				class="text-gray-500 transition hover:text-gray-300"
				target="_blank"
				rel="noopener noreferrer"
				href={REPO_URL}
			>
				GitHub
			</a>
		</div>
	</div>
</footer>
