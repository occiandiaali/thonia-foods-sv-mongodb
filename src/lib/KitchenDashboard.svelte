<script>
    import axios from "axios";

    let itemName = $state('');
    let itemWgt = $state(0);
    let isExtra = $state(false);
    let loading = $state(false);
    let recents = $state([])

    async function submitEntry(event) {
        event.preventDefault();
      //  const timestamp = new Date().toLocaleString()
      if (itemName === '' || itemWgt === 0) {
        alert('You must provide item name and weight!');
        return;
      }
        loading = true;
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post('http://localhost:5000/api/kitchen/serving', {name:itemName, weight:itemWgt, extra: isExtra},{ 
        headers: { Authorization: `Bearer ${token}`},
       })
            console.log(`Status: ${res.status}`);
            if (res.status !== 200) {
                alert("Couldn't complete this action. That's all I know!");
                return;
            }
            if (res) {
                alert(`Submission: ${JSON.stringify(res.data)}`);
                itemName = "";
                itemWgt = 0;
                isExtra = false;

            }
        } catch (err) {
            if (err.response) {
                alert(err.response.data.error)
            } else { alert("Network error, please try again."); }
           // console.error(err)
        } finally {
            loading = false
        }
    }
    let fetching = $state(false);
async function getEntries() {
    try {
        fetching = true;
        const token = localStorage.getItem("token");
        const res = await axios.get('http://localhost:5000/api/kitchen/serving/recent', { 
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
    input {
        padding: 6px;
        border: none;
        border-radius: 24px;
    }
    section {
        max-width: 60%;
        margin: 10% auto;
    }
    section input {
        margin: 6px;
        padding: 6px;
    }
    button {
        height: 32px;
        background: green;
        color: white;
            display: inline-flex;
        justify-content: center;
        align-items: center;
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
  }

  @media (max-width: 600px) {
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
    }
</style>

<section>
    <h3 style="margin: 0 auto;">Kitchen Table</h3>
    <form onsubmit={submitEntry}>
    <input type="text" placeholder="Food/Snack name" bind:value={itemName} />
    <input type="number" placeholder="Item weight (g)" bind:value={itemWgt}/>
    <input type="checkbox" bind:checked={isExtra}/> Extra
    <button type="submit">{loading ? 'Submitting' : 'Submit'}</button>
    </form>
    <button class="recents-btn" onclick={getEntries}>{fetching ? 'Fetching..' : 'Show recent'}</button>
    {#if recents.length > 0}
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
    {/if}
</section>