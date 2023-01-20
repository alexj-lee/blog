<!-- <script context="module"> 
<script context="module">
	import { REPO_URL, SITE_TITLE } from '$lib/siteConfig';
	import Nav from '../../components/Nav.svelte';
	import '../../tailwind.css'; -->
<script>
	import Toc from '../../components/Toc.svelte';
</script>

<main class="">
	<!-- <Toc /> -->
	<Toc />

	<slot />
</main>
