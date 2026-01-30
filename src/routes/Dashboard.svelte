<script>
    import {link, replace} from 'svelte-spa-router';
    import { userState } from '../state.svelte';

    const handleSignOut = () => {
        localStorage.removeItem("token");
        userState.isAuthenticated = false;
        replace("/login")
    }
</script>


<style scoped></style>

<section>
    <h2>Hi, {userState.firstname}</h2>
    {#if userState.role === "admin"}
    <p>You're logged in as {userState.role}</p>
    {:else if userState.role === "attendant"}
    <p>Attendant Table</p>
    {:else if userState.role === "kitchen"}
    <p>Kitchen Table</p>
    {/if}
    <button onclick={handleSignOut}>Logout</button>
</section>
