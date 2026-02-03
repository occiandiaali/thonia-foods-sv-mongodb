<script>
    import {link, replace} from 'svelte-spa-router';
    import { userState } from '../state.svelte';

    const handleSignOut = () => {
        userState.isAuthenticated = false;
        replace("/login")
        localStorage.removeItem("token");
    }
</script>


<style scoped>
    .update {
        margin: 6px;
    }
    .update-input {
        padding: 6px;
        border: none;
        border-radius: 4px;
    }
</style>

<section>
    <h3>{userState.firstname}'s Profile</h3>
    {#if userState.role === "admin"}
        <p>You're logged in as {userState.role}</p>
    {/if}
    <p>Email: {userState.email}</p>
    <p>Phone: {userState.phone}</p>
    <button class="btn btn-outline-danger" onclick={handleSignOut}>Logout</button>
    <hr />
    <div style="margin: 6px;">
    <h5>Change password</h5>
    <input type="password" placeholder="Update password" class="update-input" />
    <button class="btn btn-outline-success update">Update</button>
    </div>
</section>