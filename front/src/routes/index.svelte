<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

<script>
	import { session } from 'store'


</script>

{#if $session}
	Hello {$session.name}
{:else}
	Not logged in
{/if}