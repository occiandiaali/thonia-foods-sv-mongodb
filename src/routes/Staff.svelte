<script>
  import { onMount } from "svelte";
 import axios from "axios";

  const rows = [
  { index: 1, firstname: "Sara", lastname: "Mcguire", email: "tsharp@example.net", phone: "09056459160", role: "admin" },
  { index: 2, firstname: "Alisha", lastname: "Hebert", email: "vincentgarrett@example.net", phone: "04056459160", role: "kitchen" },
  { index: 3, firstname: "Gwendolyn", lastname: "Sheppard", email: "mercadon@example.com", phone: "90178077288", role: "attendant" },
  { index: 4, firstname: "Kristine", lastname: "Mccann", email: "lindsay55@example.com", phone: "07056459160", role: "attendant" },
  { index: 5, firstname: "Bobby", lastname: "Pittman", email: "blevins@example.com", phone: "37398475381", role: "kitchen" }, 
];
let users = $state([]);
let fetchingUsers = $state(false);
  let loading = $state(false);
  let errorMessage = $state('');
  let getUsersErrorMessage = $state('');

  let isModalOpen = $state(false);
  let firstname = $state('');
  let lastname = $state('');

  let email = $state('');
  let phone = $state('');
  let role = $state('');
  let action = $state('');
  let password = $state('');

  function setDefaultPassword(value) {
    if (value === 'admin') {
      return 'adminadmin'
    } else if (value === 'attendant') {
      return 'frontuser'
    } else if (value === 'kitchen') {
      return 'backuser'
    } else {
      return 'frontuser'
    }
  } 

  /**
   * @param {string} a
   * @param {any|null} f
   * @param {any|null} l

   * @param {any|null} e
   * @param {any|null} p
   * @param {any|null} r

   */
  function openModal(a, f='', l='', e='',p='',r='') {
    isModalOpen = true;
    if (a === 'Edit') {
      action = 'Edit'
    //  console.log(`Editing: ${e} & ${p} & ${r}`)
      firstname = f;
  
      email = e;
      phone = p;
      role = r;
    }
    if (a === 'New') {
      action = 'New'
    //  console.log(`Creating: ${e} & ${p} & ${r}`)
      firstname = f;
      lastname = l;

      email = e;
      phone = p;
      role = r;
      
    }
  //  console.log(`Updated: ${e} & ${p} & ${r}`)
  }

  async function registerNewUser() {
    errorMessage = '';// Reset error msg
    if (firstname === "" || role === "" || email === "") {
      alert("At least, enter the firstname, email, and role, please.");
      return;
    }
    loading = true
    try {
      password = setDefaultPassword(role)
      const token = localStorage.getItem("token");
      const res = await axios.post('http://localhost:5000/api/auth/register', {firstname, lastname, email, phone, role, password}, 
      { 
        headers: { Authorization: `Bearer ${token}`},
       });
      if (res) {
        //console.log("Res ", res);
        closeModal();
        alert(`Successfully registered: ${res.data.firstname} in the role of ${res.data.role}!`)
      }
     // alert(`Registered: ${firstname} ${lastname}, role of ${role} with email: ${email}, password: ${password}, & phone: ${phone}`)
      
    } catch (error) {
      errorMessage = error
    }finally {
        loading = false;
    }
  }

  function closeModal() {
    isModalOpen = false;
  }

async function getUsers() {
  getUsersErrorMessage = '';// Reset error msg
  try {
      fetchingUsers = true;
      const token = localStorage.getItem("token");
      const res = await axios.get('http://localhost:5000/api/auth/', 
      { 
        headers: { Authorization: `Bearer ${token}`},
       });
      if (res) {
        users = res.data
      } 
  } catch (error) {
    getUsersErrorMessage = error;
  } finally {
    fetchingUsers = false;
  }
}  

onMount(() => {
  getUsers()
})

</script>

<h2>Staff</h2>
     <div class="table-responsive">
       <button type="button" class="btn btn-warning fw-bold" on:click={() => openModal("New")}>&plus;</button>
     <table class="table caption-top">
        <caption style="color: purple;">List of users</caption>

        <thead>
            <tr>
            <!-- <th scope="col">#</th> -->
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Role</th>
            <!-- <th scope="col">Actions</th> -->
            <th scope="col">Edit</th>
            <th scope="col">Remove</th>
            </tr>
        </thead>
        <tbody>
          {#each users as user}
                <tr>
                <!-- <th scope="row">{user._id}</th> -->
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.role}</td>
                    <!-- <td>
                        <span class="badge" role="button" tabindex="-1" style="cursor: pointer;" data-toggle="modal" data-target="#exampleModal">✏️</span> <span class="badge" role="button" tabindex="-1" style="cursor: pointer;" on:click={() => confirm(`Remove ${row.firstname}?`)}>🗑️</span>
                    </td> -->
                    <td>
                      <span class="badge" role="button" tabindex="-1" style="cursor: pointer;" on:click={() => openModal('Edit', user.role, user.phone, user.email)}>✏️</span>
                    </td>
                    <td>
                      <span class="badge" role="button" tabindex="-1" style="cursor: pointer;" on:click={() => confirm(`Remove ${user.firstname}?`)}>🗑️</span>
                    </td>
                </tr>
            {/each}
        </tbody>
     </table>
      {#if fetchingUsers}
        <p>Loading...</p>
      {/if}
    </div>
    <!-- Modal -->
     {#if isModalOpen}
  <div class="modal-overlay" on:click={closeModal}>
    <div class="modal-content" on:click|stopPropagation>
      <h2>{action}</h2>
      <form on:submit|preventDefault={registerNewUser}>
      {#if action === 'New'}
      <input type="text" placeholder="First name" bind:value={firstname}/>
      <input type="text" placeholder="Last name" bind:value={lastname}/>
      {/if}
      <input type="email" placeholder={email ? email : 'user@email.address'} bind:value={email}/>
      <input type="tel" placeholder={phone ? phone : 'e.g. 0903367900'} bind:value={phone}/>
      <select name="role" id="role" bind:value={role}>
        <option value="">--User role--</option>
        <option value="attendant">Attendant</option>
        <option value="kitchen">Kitchen</option>
        <option value="admin">Admin</option>
      </select>
      <!-- <input type="text" placeholder={role ? role : 'user or admin'} value={role}/> -->
      <!-- {#if action === 'Edit'}<p>Update {firstname}'s record.</p>{/if} -->
      <button type="submit" class="btn btn-outline-success">{loading ? 'Saving' : 'Save'}</button>
      <button class="btn btn-outline-danger" on:click={closeModal}>Close</button>
        {#if errorMessage}
          <p class="error">{errorMessage}</p>
        {/if}
      </form>
    </div>
  </div>
{/if}

<style>
  input, button {
    margin: 4px;
  }
.error {
  color: red;
}

select {
  font-size: 0.9rem;
  padding: 2px 5px;
}
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    max-width: 320px;
    background: white;
    padding: 20px;
    border-radius: 5px;
  }

    @media only screen and (max-width: 600px) {
        /* p {
            font-size: small;
        } */

    }
</style>