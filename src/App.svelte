<script lang="ts">
  import { userState } from "./state.svelte";
  // import svelteLogo from './assets/svelte.svg'
  // import viteLogo from '/vite.svg'
  // import Counter from './lib/Counter.svelte'
  import { onMount } from "svelte";
  import Router from "svelte-spa-router";
  import Navbar from "./lib/Navbar.svelte";
  import Dashboard from "./routes/Dashboard.svelte";
  //import Help from "./routes/Help.svelte";
  import Profile from "./routes/Profile.svelte";
  import Management from "./routes/Management.svelte";
  import Staff from "./routes/Staff.svelte";
  import NotFound from "./routes/NotFound.svelte";
  import Auth from "./routes/Auth.svelte";

  const routes = {
    '/': Dashboard,
    '/profile': Profile,
    '/management': Management,
    '/staff': Staff,
    '/login': Auth,
    '*': NotFound
  }
//  // let isAuthenticated = false;
//  onMount(async () => {
//   const storedToken = localStorage.getItem("token");
//   if (storedToken) {
//     const parsedToken = JSON.parse(storedToken);
//     try {
//       // Call backend to validate token
// const res = await fetch("http://localhost:5000/api/auth/validate", {
//     headers: {
//       Authorization: `Bearer ${parsedToken.token}`,
//     },
//   })
//   if (!res.ok) throw new Error("Invalid token");
//   const data = await res.json()
//   // Backend returns role (and possibly other user info)
//   userState.role = data.user.role;
//   userState.email = data.user.email;
//   userState.name = data.user.name;
//   userState.phone = data.user.phone;
//   userState.isAuthenticated = true;
      
//     } catch (error) {
//       console.error(error)
//       // Token invalid → clear session
//       localStorage.removeItem("token");
//     }

//   }
//  })
</script>

{#if userState.isAuthenticated}
<main class="mt-5">
  <Navbar/>
  <Router {routes}/>
</main>
{:else}
<Auth/>
{/if}
