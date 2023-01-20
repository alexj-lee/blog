<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ fetch }) {
		// Use a `limit` querystring parameter to fetch a limited number of posts
		// e.g. fetch('posts.json?limit=5') for 5 most recent posts
		//const posts = await fetch('/posts.json').then((res) => res.json());
		const posts = await fetch('/content/listPosts.json').then((res) => res.json());
		return {
			props: {
				posts
			}
		};
	}
</script>

<script>
	export let posts;

	import IndexCard from '../components/IndexCard.svelte';

	let inputEl;
	function focusSearch(e) {
		if (e.key === '/' && inputEl) inputEl.select();
	}

	let isTruncated = posts.length > 20;
	let search;
	$: list = posts
		.filter((post) => {
			if (search) {
				let lowerCase = search.toLowerCase();
				let containsTitle = post.title.toLowerCase().includes(lowerCase);
				let containsDesc = post.description.toLowerCase().includes(lowerCase);
				let containsTags = post.tags.join(' ').toLowerCase().includes(lowerCase);

				return containsTitle || containsDesc || containsTags;
			}
			return true;
		})
		.slice(0, isTruncated ? 2 : posts.length);
</script>

<svelte:head>
	<title>blog index</title>
	<meta name="description" content="Most recent posts in the {list} category." />
</svelte:head>

<svelte:window on:keyup={focusSearch} />

<section class="mx-auto mb-16 flex max-w-3xl flex-col items-start justify-center px-4 sm:px-8">
	<h1 class="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
		blog
	</h1>

	<p class="mb-4 text-gray-600 dark:text-gray-400">
		I try to write to consolidate notes in one place, and to get more used to writing ideas down,
		with some implicit decay of older ideas. In total, I've written {posts.length} articles on my blog.
		Use the search below to filter by title, description, or tags.
	</p>

	<div class="relative mb-4 w-full">
		<input
			aria-label="Search articles"
			type="text"
			bind:value={search}
			bind:this={inputEl}
			placeholder="Hit / to search"
			class="block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
		/><svg
			class="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
			/></svg
		>
	</div>

	{#if !search}
		{#each posts as { slug, title, author, description, date, tags }}
			<!-- <IndexCard
				href="/content/{slug}"
				{title}
				stringData={new Date(date).toISOString().slice(0, 10)}
			>
				{description}
			</IndexCard> -->
		{/each}
	{/if}

	{#if list.length}
		{#each list as { slug, title, author, description, date, tags }}
			<IndexCard
				href="/content/{slug}"
				{title}
				stringData={new Date(date).toISOString().slice(0, 10)}
			>
				{description}
			</IndexCard>
		{/each}
	{/if}
</section>
