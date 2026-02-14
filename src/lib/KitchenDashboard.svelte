<script>
    import axios from "axios";
    //https://thonia-foods-server.onrender.com

   // let itemName = $state('');
    let foodName = $state('');
    let snackName = $state('');
   // let itemWgt = $state(0);
    let foodWgt = $state(0);
    let snackCount = $state(0);
    let isExtra = $state(false);
    //let loading = $state(false);
    let loadingFood = $state(false);
    let loadingSnack = $state(false);
    let recents = $state([])
    let showRecents = $state(false);

    async function submitFoodEntry(event) {
        event.preventDefault();
      //  const timestamp = new Date().toLocaleString()
      if (foodName === '' || foodWgt === 0) {
        alert('You must provide the food name and weight!');
        return;
      }
        loadingFood = true;
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post('https://thonia-foods-server.onrender.com/api/kitchen/food', {name:foodName.trim().toLowerCase(), weight:foodWgt, extra: isExtra},{ 
                headers: { Authorization: `Bearer ${token}`},
            })
            // const res = await axios.post('http://localhost:5000/api/kitchen/food', {name:foodName.trim().toLowerCase(), weight:foodWgt, extra: isExtra},{ 
            //     headers: { Authorization: `Bearer ${token}`},
            // })
           // console.log(`Status: ${res.status}`);
            if (res.status !== 200) {
                alert("Couldn't complete this action. That's all I know!");
                return;
            }
            if (res) {
                alert(`Successfully submitted.`);
                foodName = "";
                foodWgt = 0;
                isExtra = false;

            }
        } catch (err) {
            if (err.response) {
                alert(err.response.data.error)
            } else { alert("Network error, please try again."); }
           // console.error(err)
        } finally {
            loadingFood = false
        }
    }
        async function submitSnackEntry(event) {
        event.preventDefault();
      //  const timestamp = new Date().toLocaleString()
      if (snackName === '' || snackCount === 0) {
        alert('You must provide the snack name and quantity!');
        return;
      }
        loadingSnack = true;
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post('https://thonia-foods-server.onrender.com/api/kitchen/snack', {name:snackName.trim().toLowerCase(), count:snackCount, extra: isExtra},{ 
                headers: { Authorization: `Bearer ${token}`},
            })
            // const res = await axios.post('http://localhost:5000/api/kitchen/snack', {name:snackName.trim().toLowerCase(), count:snackCount, extra: isExtra},{ 
            //     headers: { Authorization: `Bearer ${token}`},
            // })
           // console.log(`Status: ${res.status}`);
            if (res.status !== 200) {
                alert("Couldn't complete this action. That's all I know!");
                return;
            }
            if (res) {
                alert(`Successfully submitted.`);
                snackName = "";
                snackCount = 0;
                isExtra = false;

            }
        } catch (err) {
            if (err.response) {
                alert(err.response.data.error)
            } else { alert("Network error, please try again."); }
           // console.error(err)
        } finally {
            loadingSnack = false
        }
    }
    //=============================
    let fetching = $state(false);
async function getEntries() {
    try {
        showRecents = true;
        fetching = true;
        const token = localStorage.getItem("token");
        const res = await axios.get('https://thonia-foods-server.onrender.com/api/kitchen/recent', { 
            headers: { Authorization: `Bearer ${token}`},
        })
        if (res) {
            recents = res.data;
        }
    } catch (err) {
        console.error(err);
    } finally {
        fetching = false;
    }
}    
</script>

<style scoped>
    /* .gui-switch {
    display: flex;
    align-items: center;
    margin-left: 12%;
    }
    input[type="checkbox"] {
    appearance: none;
    width: 50px;
    height: 25px;
    background-color: #ccc;
    border-radius: 15px;
    position: relative;
    cursor: pointer;
    }

input[type="checkbox"]:checked {
  background-color: #4caf50;
}

input[type="checkbox"]:checked::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 28px;
  width: 20px;
  height: 20px;
  background-color: rgb(43, 33, 33);
  border-radius: 50%;
  transition: 0.2s;
} */
    input {
        padding: 6px;
        border: none;
        border-radius: 8px;
    }
    /* section {
        width: 100%;
        
        margin: 10% auto;
    }
    section input {
        margin: 6px;
        padding: 6px;
    } */
    button {
        height: 32px;
        background: black;
        color: white;
            display: inline-flex;
        justify-content: center;
        align-items: center;
    }
    button:hover {
        background: rgb(87, 73, 73);
        color: black;
    }
    /* .hide-recents-btn {
        margin: 6px;
        background: slateblue;
    }
    .recents-btn {
        margin: 6px;
        background: rgb(68, 99, 68);
    }
      .responsive-table {
    width: 100%;
    border-collapse: collapse;
  }

  .responsive-table th, .responsive-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  .responsive-table th {
    background-color: #f2f2f2;
  } */
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr; /* Two equal columns */
    gap: 1rem; /* Space between columns */
    margin: 10% auto;
}

.submit-food-section {
    padding: 1rem;
    background-color: rgb(125, 131, 133);
}
.submit-snacks-section {
        padding: 1rem;
    background-color: rgb(115, 163, 179);
}

@media (max-width: 600px) {
    .container {
        grid-template-columns: 1fr; /* Stack columns on small screens */
        justify-content: space-around;
       
    }
    input {
        margin: 6px;
    }
}


  /* @media (max-width: 600px) {
    .responsive-table thead {
      display: none;
    }

    .responsive-table tr {
      display: block;
      margin-bottom: 10px;
    }

    .responsive-table td {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      border: none;
      border-bottom: 1px solid #ddd;
    }

    .responsive-table td::before {
      content: attr(data-label);
      font-weight: bold;
      margin-right: 10px;
    }
  }
    @media only screen and (max-width: 600px) {
        h3 {
            font-size: medium;
        }
        section {
            margin: 40% auto;
        }
    } */
</style>

<!-- <h3 style="margin: 0 auto;">Kitchen Table</h3> -->
<div class="container">
<div class="submit-food-section column">
    <h5>Food Entry</h5>
    <form onsubmit={submitFoodEntry}>
    <input type="text" placeholder="Food name" bind:value={foodName} />
    <input type="number" placeholder="Item weight (g)" bind:value={foodWgt}/>
    <input type="checkbox" role="switch" bind:checked={isExtra}/> Extra <br/>
   
    <button type="submit">{loadingFood ? 'Submitting' : 'Submit Food'}</button>
    </form>
    <!-- <button class="recents-btn" onclick={getEntries}>{fetching ? 'Fetching..' : 'Show recent'}</button>
    {#if showRecents}
        <button class="hide-recents-btn" onclick={() => showRecents = false}>Hide recent</button>
    {/if}
    {#if recents.length > 0 && showRecents === true}
    <table class="responsive-table">
        <thead>
            <tr>
            <th>Name</th>
            <th>Weight</th>
            <th>Portions</th>
            <th>Addition</th>
            </tr>
        </thead>
        <tbody>
            {#each recents as item}
                <tr>
                    <td data-label="Name">{item.name}</td>
                    <td data-label="Weight">{item.wgt}</td>
                    <td data-label="Portions">{item.qty}</td>
                    <td data-label="Addition">{item.addition}</td>
                </tr>
            {/each}
        </tbody>
    </table>
    {/if} -->
</div>

<div class="submit-snacks-section column">
    <h5>Snacks Entry</h5>
    <form onsubmit={submitSnackEntry}>
    <input type="text" placeholder="Snack name" bind:value={snackName} />
    <input type="number" placeholder="Snacks count" bind:value={snackCount}/>
    <input type="checkbox" role="switch" bind:checked={isExtra}/> Extra <br/>
   
    <button type="submit">{loadingSnack ? 'Submitting' : 'Submit Snack'}</button>
    </form>

</div>
</div>
