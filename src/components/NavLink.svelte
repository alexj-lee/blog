<script>
	import { page } from '$app/stores';
	$: isActive = $page.url.pathname === $$props.href;
	export let href;
</script>

<a
	class="hover:bg-cameopink-200 hidden rounded-lg p-1 text-gray-800 transition-all dark:text-gray-200 dark:hover:bg-cameopink sm:px-3 sm:py-2 md:inline-block"
	class:font-semibold={isActive}
	{href}
	><span class="capsize"><slot /> </span>
</a>
