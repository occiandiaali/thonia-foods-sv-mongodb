<script>
    import axios from "axios";

    let showOrders = $state(false);
    let showKitchen = $state(false);
    let containerAction = $state("");
    let coolerName = $state('');
    let coolerWeight = $state(0);
    let scoopWeight = $state(0);
    let loadingAdd = $state(false);
    let loadingCreate = $state(false);
    let menuItemName = $state('');
    let menuItemPrice = $state(0);
    let menuItemCategory = $state('') // Food or Drink
    let menuItemQty = $state(0); // Basically just for drink items

    let recentOrders = $state([]); // Orders in the last 2  hrs
    let recents = $state([]); // Kitchen Table submissions in the last 24hrs

    let fetchingOrders = $state(false);
    async function getRecentOrders() {
        try {
            fetchingOrders = true;
            const token = localStorage.getItem("token");
            const res = await axios.get('http://localhost:5000/api/orders/', { 
                headers: { Authorization: `Bearer ${token}`},
            })
            if (res) {
                recentOrders = res.data;
            }
        } catch (err) {
            console.error(err);
        } finally {
            fetchingOrders = false;
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

    function handleShowOrders() {
        showOrders = true;
        getRecentOrders()
    }
    function handleHideOrders() {
        showOrders = false
    }
    
    function handleShowKitchen() {
        showKitchen = true;
        getEntries()
    }
    function handleHideKitchen() {
        showKitchen = false
    }

    async function addMenuItem(event) {
        event.preventDefault();
        if (menuItemName === '' || menuItemPrice === 0 || menuItemCategory === '') {
            alert("You haven't filled all the information!");
            return
        }
        loadingAdd = true;
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post('http://localhost:5000/api/menu', {name:menuItemName.toLowerCase(), price:menuItemPrice, category: menuItemCategory, quantity:menuItemQty},{ 
                headers: { Authorization: `Bearer ${token}`},
            })

            if (res) {
                alert(`Added: ${JSON.stringify(res.data)}`);
                menuItemName = "";
                menuItemPrice = 0;
                menuItemCategory = '';
                menuItemQty = 0;

            }
        } catch (err) {
            console.error(err)
        } finally {
            loadingAdd = false;
        }
    }

    async function saveCoolerDetails(event) {
        event.preventDefault();
        if (coolerName === '' || coolerWeight === 0 || scoopWeight === 0) {
            alert("You haven't filled all the information!");
            return
        }
        loadingCreate = true;
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post('http://localhost:5000/api/kitchen/add-container', {name:coolerName.toLowerCase(), wgt:coolerWeight, scoop: scoopWeight},{ 
                headers: { Authorization: `Bearer ${token}`},
            })

            if (res) {
                alert(`Created: ${coolerName} container.`);
                console.log(res.data);
                coolerName = "";
                coolerWeight = 0;
                scoopWeight = 0;

            }
        } catch (error) {
            console.error(error)
        } finally {
            loadingCreate = false;
        }

    }
</script>

<div class="wrap-div">
    <section class="top-section">
    <h3>Last 3hrs (Orders)</h3>
    <button class="recents-btn" onclick={handleShowOrders}>{fetchingOrders ? 'Fetching..' : 'Show orders'}</button>
    {#if showOrders}
    <button onclick={handleHideOrders}>Hide orders</button>
    {/if}
        {#if recentOrders.length > 0 && showOrders}
    <table class="responsive-table">
        <thead>
            <tr>
            <th>Order ID</th>
            <th>When</th>
            <th>Attendant</th>
            <th>Total</th>
            <th>Payment</th>
            </tr>
        </thead>
        <tbody>
            {#each recentOrders as order}
                <tr>
                    <td data-label="Order ID">{order.orderId}</td>
                    <td data-label="When">{new Intl.DateTimeFormat("en-GB", {dateStyle:"short",timeStyle: "medium"}).format(new Date(order.createdAt))}</td>
                    <td data-label="Attendant">{order.attendant}</td>
                    <td data-label="Total">₦{order.total}</td>
                    <td data-label="Payment">{order.paidBy}</td>
                </tr>
            {/each}
        </tbody>
    </table>

    {/if}
</section>
<hr/>
<section class="top-section">
    <h3>Last 24hrs (Kitchen)</h3>
    <button class="recents-btn" onclick={handleShowKitchen}>{fetching ? 'Fetching..' : 'Show kitchen'}</button>
    {#if showKitchen}
    <button onclick={handleHideKitchen}>Hide kitchen</button>
    {/if}
        {#if recents.length > 0 && showKitchen}
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
<hr/>
<section class="set-stock-section">
    <!-- <h3>Create Container</h3> -->
     <label for="container-action">Food/Snack container</label>
    <select id="container-action" bind:value={containerAction}>
        <option value="">--Select action--</option>
        <option value="create">Create Container</option>
        <option value="edit">Edit Container</option>
    </select>

    <form onsubmit={saveCoolerDetails}>
    <label for="coolerName">Container name</label>
    <input placeholder="e.g. beans" bind:value={coolerName} id="coolerName" />
        <label for="coolerWgt">Container weight (grams)</label>
    <input type="number" placeholder="In grams e.g. 1450" bind:value={coolerWeight} id="coolerWgt" />
        <label for="scoopWgt">Portion weight (grams)</label>
    <input type="number" placeholder="In grams e.g. 150" bind:value={scoopWeight} id="scoopWgt"/>
    {#if containerAction === "edit"}
    <button type="submit" class="add-container-btn">{loadingCreate ? 'Editing' : 'Edit'}</button>
    {:else}   
    <button type="submit" class="add-container-btn">{loadingCreate ? 'Creating' : 'Create'}</button>
    {/if}
    </form>
</section>
<hr/>
<section class="set-menu-section">
    <h3>Add Menu Item</h3>
        <form onsubmit={addMenuItem}>
    <label for="menuItemName">Snack/Food or Drink</label>
    <input placeholder="snack/food or drink" bind:value={menuItemName} id="menuItemName" />
        <label for="menuItemPrice">Price (portion or piece)</label>
    <input type="number" placeholder="In Naira e.g. 2550" bind:value={menuItemPrice} id="menuItemPrice" />
    <br/>
    <label for="menuItemQty">Stock quantity (Drinks)</label>
    <input type="number" placeholder="For drinks" bind:value={menuItemQty} id="menuItemQty" />
        <label for="itemCategory">Category</label>
    <select name="itemCategory" id="itemCategory" bind:value={menuItemCategory}>
  <option value="">--Choose item category--</option>
  <option value="food">Snack/Food</option>
  <option value="drinks">Drinks</option>
</select>
    <button type="submit" class="add-container-btn">{loadingAdd ? 'Adding' : 'Add'}</button>
    </form>
</section>
</div>


<style scoped>
    .add-container-btn {
        width: 68px;
        height: 38px;
        background: green;
        color: white;
        padding: 6px;
        margin: 6px;
    }
    #container-action {
        margin-bottom: 5%;
    }
    h3 {
        font-size: medium;
        font-weight: 700;
    }
    input {
        padding: 6px;
        border: none;
        border-radius: 24px;
        margin: 6px;
    }
    label {
        font-size: medium;
    }
    .recents-btn {
        color: white;
        margin: 6px;
        background: rgb(68, 99, 68);
    }
    .set-stock-section {
        margin-top: 18px;
    }
    .set-menu-section {
        margin-top: 18px;
    }

    .wrap-div {
        margin: 5% auto;
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
        .top-section {
        padding-top: 15%;
    }
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
</style>


