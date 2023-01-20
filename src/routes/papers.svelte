<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */

	export async function load({ fetch }) {
		///		const items = await fetch('/content/listPosts.json').then((res) => res.json());
		//		const otheritems = await fetch('/work/listPapers.json').then((res) => res.json());

		//const publishedPosts = posts.filter((post) => post.published).slice(0, limit);
		const all = await fetch('/work/listPapers.json').then((res) => res.json());
		const preprints = all.filter((paper) => paper.type == 'preprint');
		preprints.sort((a, b) => (new Date(a.year) > new Date(b.year) ? -1 : 1));

		const papers = all.filter((paper) => paper.type == 'paper');
		// papers.sort((a, b) => (new Date(a.year) > new Date(b.year) ? -1 : 1));
		papers.reverse();

		//publishedPosts.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));
		return {
			props: {
				papers,
				preprints
			}
		};
	}
</script>

<script>
	export let papers;
	export let preprints;

	// export let papers = [];
	// for (let i = 0; i < otheritems.length; i++) {
	// 	if (otheritems[i].regex == null) {
	// 		//papers.push([otheritems[i].data]);
	// 		papers.push({ index: i, item: otheritems[i].data });
	// 	} else {
	// 		const start = otheritems[i].regex[1];
	// 		const mid = otheritems[i].regex[2];
	// 		const end = otheritems[i].regex[3];

	// 		papers.push({ index: i, start: start, mid: mid, end: end, url: otheritems[i].url });
	// 	}
	//}
</script>

<svelte:head>
	<title>papers</title>
	<meta name="description" content="Alex papers" />
</svelte:head>


<section
	class="container
prose
mx-auto
max-w-3xl
hover:scroll-auto
prose-h1:mb-0
prose-h1:pb-0
prose-p:mb-12
hover:prose-a:text-blue-300
prose-ul:mt-2
dark:prose-invert"
>

	<div class="">
		<h1 class="relative">
			Papers
			<span class="absolute right-0 inline-block pt-2 text-sm">
				<a href="https://orcid.org/0000-0003-0001-2848">
					<img
						class="my-0 mx-1 inline-block h-7 w-7 bg-transparent py-0"
						alt="ORCIDiD icon"
						src="static/svg/ORCIDiD_iconvector.svg"
					/>
					0000-0003-0001-2848
				</a>
			</span>
		</h1>
	</div>

	<br />
	<div class="border-l-4 border-artemesia">
		<ol class="space-y-3 leading-relaxed">
			{#each papers as paper}
				{#if paper.details == null}
					<p>Will apepr</p>
				{:else}
					<li>
						{paper.details.before_name}<span class="font-italic font-bold underline"
							>{paper.details.name}</span
						>{paper.details.after_name}<a href={paper.details.url}>{paper.details.url}</a>
					</li>
				{/if}

				<!-- <p>
				<li>{paper.start}<b>{paper.mid}</b>{paper.end} <a href={paper.url}>link</a></li>
			</p> -->
			{/each}
		</ol>
	</div>

	<br />

	<h1>Preprints</h1>
	<br />
	<div class="border-l-4 border-artemesia">
		<ol class="space-y-3 leading-normal">
			{#each preprints as paper}
				{#if paper.details == null}
					<p>somethinb ad</p>
				{:else}
					<li>
						{paper.details.before_name}<span class="font-italic font-bold underline"
							>{paper.details.name}</span
						>{paper.details.after_name}<a href={paper.details.url}>{paper.details.url}</a>
					</li>
				{/if}
			{/each}
		</ol>
	</div>
	<br />
</section>
