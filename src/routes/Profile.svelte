<script>
    import {link, replace} from 'svelte-spa-router';
    import { userState } from '../state.svelte';

    const handleSignOut = () => {
        userState.isAuthenticated = false;
        replace("/login")
        localStorage.removeItem("token");
    }
</script>


<style scoped></style>

<section>
    <h3>{userState.firstname}'s Profile</h3>
    <p>Email: {userState.email}</p>
    <p>Phone: {userState.phone}</p>
    <button class="btn btn-outline-danger" onclick={handleSignOut}>Logout</button>
    <aside style="margin: 6px;">
    <h4>Change password</h4>
    <input type="password" placeholder="Update password" />
    <button class="btn btn-outline-success">Update</button>
    </aside>
</section>