<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

<script>
	import { session } from 'store'
	//
	// import api from 'api'
	//
	// api.get('/api/user')
	// .then(res => {
	// 	console.log(res.data)
	// })
</script>

<script context="module">

	export async function preload(page, session) {
		//console.log(page, session)
	}

</script>

{#if $session}
	Hello {$session.name}
{:else}
	Not logged in
{/if}