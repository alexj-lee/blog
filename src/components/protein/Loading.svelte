<script>
	export let showLoading = false;
</script>

{#if showLoading}
	<div class="loading-container">
		<p>Loading...</p>
	</div>
{/if}

<style>
	.loading-container {
		position: fixed;
		left: 1rem;
		bottom: 1rem;
		background: #00000088;
		color: #fafbfc;
		padding: 0.5rem 0.875rem;
	}

	p {
		margin: 0;
	}
</style>
