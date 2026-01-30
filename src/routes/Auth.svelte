<script>
import axios from 'axios';
  import { userState } from "../state.svelte";
  import {push} from 'svelte-spa-router'

  let email = $state('');
  let password = $state('');
  let loading = $state(false);
  let errorMessage = $state('');
  let isLoggedIn = $state(false)

  async function handleSubmit() {


    errorMessage = '';// Reset error msg
    if (!email || !password) {
        errorMessage = 'Please, enter valid credentials!';
        return;
    }
    
    loading = true
    try {
        // const response = await fetch('http://localhost:5000/api/auth/login', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ email, password })
        // });
        const res = await axios.post('http://localhost:5000/api/auth/login', {email, password})
    
        // if (!response.ok) {
        //     errorMessage = "Login failed. That's all I know."
        // } 
        if (res) {
            userState.firstname = res.data.user.firstname;
            userState.lastname = res.data.user.lastname;
            userState.email = res.data.user.email;
            userState.phone = res.data.user.phone;
            userState.role = res.data.user.role;
           // console.log(`Response: ${JSON.stringify(res.data)}`)
            localStorage.setItem("token", res.data.token);
            userState.isAuthenticated = true;
            push('/profile')
        }
   
        
    } catch (error) {
        errorMessage = error;
    } finally {
        loading = false;
    }

  }

//   const loginAction = () => {
//     loading = true;
//    setTimeout(() => {
//      isAuthenticated.set(true);
     
//      fakeEmail.set(email);
//     loading = false;
//    }, 4000);
//   }
</script>

<div class="wrap">
  <img src="/app-logo.svg" alt="Thonia Foods" width="64px" height="64px" />
  <h2>Thonia Foods</h2>
  <form on:submit|preventDefault={handleSubmit}>
<div class="mb-3">
  <!-- <label for="emailInput" class="form-label">Email</label> -->
  <input type="email" class="form-control" bind:value={email} id="emailInput" placeholder="Email">
</div>

<div class="mb-3">
  <!-- <label for="passwordInput" class="form-label">Password</label> -->
  <input type="password" class="form-control" bind:value={password} id="passwordInput" placeholder="Password">
</div>

<!-- <div class="form-check form-switch mb-4">
  <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" on:change={() => isAdmin.set($isAdmin = !$isAdmin)} checked={$isAdmin}>
  <label class="form-check-label" for="flexSwitchCheckChecked">Use as Admin</label>
</div> -->


<button type="submit" class="btn btn-success">{loading ? 'Wait..' : 'Login'}</button>
  {#if errorMessage}
    <p class="error">{errorMessage}</p>
  {/if}
</form>
</div>

<style>
  /* .form-check-input {
    margin-right: 10px;
} */

/* .form-check-label {
    margin-left: -68%;
} */

h2 {
  font-family: 'Lobster', cursive;
}

.error {
    color: white;
}
  .wrap {
    max-width: 380px;
    margin: 60px auto;
    padding: 8px;
    background-color: rgb(126, 97, 97);
    opacity: 0.76;
  }

@media only screen and (max-width: 600px) {
  /* .form-check-label {
    margin-left: -105px;
} */
}  
</style>