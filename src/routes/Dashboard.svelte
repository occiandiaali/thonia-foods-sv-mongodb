<script>
   // import {link, replace} from 'svelte-spa-router';
    import { userState } from '../state.svelte';
    import AdminDashboard from '../lib/AdminDashboard.svelte';
    import KitchenDashboard from '../lib/KitchenDashboard.svelte';
    import AttendantDashboard from '../lib/AttendantDashboard.svelte';

    // const handleSignOut = () => {
    //     localStorage.removeItem("token");
    //     userState.isAuthenticated = false;
    //     replace("/login")
    // }
</script>


<style scoped>
    .greeting-div {
        position: absolute;
        top: 10%;
        left: 15%;
        display: flex;
        align-items: center;
        padding: 4px;
    }
    /* .greeting-div img:hover {
        cursor: pointer;
    } */
    .greeting-div span {
        font-size: small;
    }
</style>

<section>
    <div class="greeting-div">
    <span>Hi, {userState.firstname}</span>
    <!-- <img src="/signout-blackbg.svg" alt="Logout" width="24px" height="24px" onkeydown={handleSignOut} onclick={handleSignOut}/> -->
    <!-- <button onclick={handleSignOut}>Logout</button> -->
     </div>
    {#if userState.role === "admin"}
    
    <AdminDashboard />
    {:else if userState.role === "attendant"}
    <AttendantDashboard/>
    {:else if userState.role === "kitchen"}

    <KitchenDashboard/>
    {/if}
</section>
