<script>
    import {link, replace} from 'svelte-spa-router';
    import { userState } from '../state.svelte';

        const handleSignOut = () => {
        userState.isAuthenticated = false;
        replace("/login")
        localStorage.removeItem("token");
    }
</script>

<nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light transparent">
  <div class="container-fluid">
    <img src="/app-logo.svg" alt="Thonia Foods" width="24px" height="24px" />
    <span class="navbar-brand lobster-text">Thonia Foods</span>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-current="page" href="/" use:link>Home</a>
        </li>
   
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            More
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" href="/profile" use:link>Profile</a></li>
            {#if userState.role === "admin"}
              <li><a class="dropdown-item" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" href="/management" use:link>Management</a></li>
              <li><a class="dropdown-item" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" href="/staff" use:link>Staff</a></li>
              
            {/if}
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" href="/help" use:link>Help</a></li>
          </ul>
        </li>
      </ul>
 
      <div class="d-flex">
        <!-- <li style="list-style: none;"><a class="dropdown-item" href="/signout">Sign out</a></li> -->
         <button class="btn btn-outline-danger" on:click={handleSignOut}>Sign out</button>
      </div>
    </div>
  </div>
</nav>

<style>
    .navbar {
        opacity: 0.85;
    }

    .lobster-text {
        font-family: 'Lobster', cursive;
        margin-left: 4px;
    }
    @media only screen and (max-width: 600px) {
      .lobster-text {
        position: absolute;
        left: 13%;
        top: 6%;
      }
    }
</style>