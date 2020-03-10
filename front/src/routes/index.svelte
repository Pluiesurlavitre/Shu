<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

<script context="module">

	export async function preload(page, session) {

		if (session.user === undefined) {
			goto('/login')
		}
		let user = session.user

		return { user }
	}

</script>


<script>
	import { session } from "store"

	export let user

	console.log($session.user)
</script>


hello {user.name}