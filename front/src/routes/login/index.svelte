<script>

    import api from "api"
    import { goto } from '@sapper/app'

    import { session } from "store"

    async function submit(e) {

        await api.get('/airlock/csrf-cookie')

        const res = await api.post('/login', { email, password })
        console.log(res.data.data)

        $session.user = res.data.data

        session.set(res.data.data)

        goto('/')
    }

    let email = 'shu@example.com'
    let password = 'password'
</script>

<form on:submit|preventDefault={submit}>

    <input type="email" bind:value={email}>
    <input type="password" bind:value={password}>
    <button type="submit">Login</button>

</form>