<script>
    import axios from "axios";
    //https://thonia-foods-server.onrender.com
    import CustomModal from "./CustomModal.svelte";

    let isCustomModalOpen = $state(false);
    function openCustomModal() {
        isCustomModalOpen = true;
    }

    let showOrders = $state(false);
    let showKitchen = $state(false);
    let containerAction = $state("");
    let coolerName = $state('');
    let coolerWeight = $state(0);
    let scoopWeight = $state(0);
    
    let loadingCreate = $state(false);
    let menuAction = $state("");
    let menuItemName = $state('');
    let menuItemPrice = $state(0);
    let menuItemCategory = $state('') // Food or Drink
    let menuItemQty = $state(0); // Basically just for drink items

    let recentOrders = $state([]); // Orders in the last 2  hrs
    let recents = $state([]); // Kitchen Table submissions in the last 24hrs

    let fetchingOrders = $state(false);
    // async function getRecentOrders() {
    //     try {
    //         fetchingOrders = true;
    //         const token = localStorage.getItem("token");
    //         const res = await axios.get('https://thonia-foods-server.onrender.com/api/orders/', { 
    //             headers: { Authorization: `Bearer ${token}`},
    //         });
    //        /* const res = await axios.get('http://localhost:5000/api/orders/', { 
    //             headers: { Authorization: `Bearer ${token}`},
    //         })*/
    //         if (res) {
    //             recentOrders = res.data;
    //         }
    //     } catch (err) {
    //         console.error(err);
    //     } finally {
    //         fetchingOrders = false;
    //     }
    // } 
        async function getDailySales() {
        try {
            fetchingOrders = true;
            const token = localStorage.getItem("token");
            const res = await axios.get('https://thonia-foods-server.onrender.com/api/orders/daily-sales', { 
                headers: { Authorization: `Bearer ${token}`},
            });
        //    const res = await axios.get('http://localhost:5000/api/orders/daily-sales', { 
        //         headers: { Authorization: `Bearer ${token}`},
        //     })
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
            // const res = await axios.get('http://localhost:5000/api/kitchen/recent', { 
            //     headers: { Authorization: `Bearer ${token}`},
            // })
            const res = await axios.get('https://thonia-foods-server.onrender.com/api/kitchen/recent', { 
                headers: { Authorization: `Bearer ${token}`},
            })
            if (res) {
                const foodData = res.data.foodData;
                const snackData = res.data.snackData;
                const result = [...foodData, ...snackData]
                recents = result;//res.data;
            }
        } catch (err) {
            console.error(err);
        } finally {
            fetching = false;
        }
    } 

    //==============================
    //  let showMenuModal = $state(false);
    // function openMenuModal() {
    //     showMenuModal = true;
    // }
    // function closeMenuModal() {
    //     showMenuModal = false;
    // }
    let getting = $state(false);
    let currentMenu = $state([])
    async function getCurrentMenu() {
       // openMenuModal();
       openCustomModal()
        try {
            getting = true;
            const token = localStorage.getItem("token");
            const res = await axios.get('https://thonia-foods-server.onrender.com/api/menu/all', { 
                headers: { Authorization: `Bearer ${token}`},
            })
           
            if (res) {
                
            currentMenu = res.data;
              
            }
        } catch (err) {
            console.error(err);
        } finally {
            getting = false;
        }
    } 
    //================================

    function handleShowOrders() {
        showOrders = true;
       // getRecentOrders()
       getDailySales();
    }
    //the admin selects a date from a calendar widget, you can format it as a string (YYYY-MM-DD)
    async function fetchDaily(dateString) {
        const res = await fetch(`/search-daily?date=${dateString}`);
        const data = await res.json();
        return data;
    }

    let showKitchenModal = $state(false)
    function openKitchenModal() {
    showKitchenModal = true;
    getEntries()
    
  }

  function closeKitchenModal() {
    showKitchenModal = false;
    
  }

  let loadingAdd = $state(false);
  let loadingEdit = $state(false);
    async function addMenuItem(event) {
        event.preventDefault();
        if (menuItemName === '' || menuItemPrice === 0 || menuItemCategory === '') {
            alert("You haven't filled all the information!");
            return
        }

        let added;
        let edited;
        try {
            const token = localStorage.getItem("token");
            if (menuAction === "add") {
                loadingAdd = true;
                added = await axios.post('https://thonia-foods-server.onrender.com/api/menu', {name:menuItemName.trim().toLowerCase(), price:menuItemPrice, category: menuItemCategory, quantity:menuItemQty},{ 
                    headers: { Authorization: `Bearer ${token}`},
                })
                if (added) {
                alert(`Added: ${menuItemName} to ${menuItemCategory} category.`);
                }
            } else if (menuAction === "edit") {
               loadingEdit = true;
                edited = await axios.put(`https://thonia-foods-server.onrender.com/api/menu/edit-item`, {name:menuItemName.trim().toLowerCase(), price:menuItemPrice, category: menuItemCategory, quantity:menuItemQty},{ 
                    headers: { Authorization: `Bearer ${token}`},
                })
                if (edited){
                    console.log("Edit res", edited.data);
                    alert(`Updated Menu..`);
                }
            }

                menuItemName = "";
                menuItemPrice = 0;
                menuItemCategory = '';
                menuItemQty = 0;

            
        } catch (err) {
            console.error(err)
        } finally {
            loadingAdd = false;
            loadingEdit = false;
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
            // const res = await axios.post('https://thonia-foods-server.onrender.com/api/kitchen/add-container', {name:coolerName.trim().toLowerCase(), wgt:coolerWeight, scoop: scoopWeight},{ 
            //     headers: { Authorization: `Bearer ${token}`},
            // })
            const res = await axios.post('https://thonia-foods-server.onrender.com/api/kitchen/add-container', {name:coolerName.trim().toLowerCase(), wgt:coolerWeight, scoop: scoopWeight},{ 
                headers: { Authorization: `Bearer ${token}`},
            })

            if (res) {
                alert(`Created: ${coolerName} container.`);
              //  console.log(res.data);
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
    <h3>Today's sales</h3>
    <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#dailyOrdersModal" onclick={handleShowOrders}>Show sales</button>
    <!-- <button class="recents-btn" onclick={handleShowOrders}>{fetchingOrders ? 'Fetching..' : 'Show orders'}</button>
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

    {/if} -->
</section>
<!--Orders Modal -->
<div class="modal fade" id="dailyOrdersModal" tabindex="-1" aria-labelledby="dailyOrdersModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title heading" id="dailyOrdersModalLabel">Sales for {new Date().toISOString().substring(0, 10)}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <!-- <div class="modal-body">
        {#if recentOrders.length > 0}
        <table class="responsive-table">
        <thead>
            <tr>
            <th>Order ID</th>
            <th>Time</th>
            <th>Attendant</th>
            <th>Items</th>
            <th>Payment by</th>
            <th>Paid</th>
            </tr>
        </thead>
        <tbody>
            {#each recentOrders as order}
                <tr>
                    <td data-label="Order ID">{order.orderId}</td>
                    <td data-label="Time">{new Intl.DateTimeFormat("en-GB", {dateStyle:"short",timeStyle: "medium"}).format(new Date(order.createdAt))}</td>
                    <td data-label="Attendant">{order.attendant}</td>
                    
                    <td data-label="Items">
                        <div class="items-container">
                            {#each order.items as item}
                            <span class="item-badge">
                                {item.name} ×{item.quantity} ₦{item.subTotal}
                            </span>
                            {/each}
                        </div>
                    </td>

                    <td data-label="Payment">{order.paidBy}</td>
                    <td data-label="Paid" style="text-decoration:underline;"><strong>₦{order.total}</strong></td>
                    
                </tr>
            {/each}
        </tbody>
    </table>
    {:else}
    <p>No sales yet!</p>
    {/if}
      </div> -->
      <div class="modal-body scrollable-table-container">
        {#if recentOrders.length > 0}
        <table class="h-scroll-table">
            <thead>
                <tr>
                    <th scope="col">Order ID</th>
                    <th scope="col">Time</th>
                    <th scope="col">Attendant</th>
                    <th scope="col">Items</th>
                    <th scope="col">Payment by</th>
                    <th scope="col">Paid</th>
                </tr>
            </thead>
            <tbody>
                {#each recentOrders as order}
                        <tr>
                            <td data-label="Order ID">{order.orderId}</td>
                            <td data-label="Time">{new Intl.DateTimeFormat("en-GB", {dateStyle:"short",timeStyle: "medium"}).format(new Date(order.createdAt))}</td>
                            <td data-label="Attendant">{order.attendant}</td>
                            
                            <td data-label="Items">
                                <div class="items-container">
                                    {#each order.items as item}
                                    <span class="item-badge">
                                        {item.name} ×{item.quantity} ₦{item.subTotal}
                                    </span>
                                    {/each}
                                </div>
                            </td>

                            <td data-label="Payment">{order.paidBy}</td>
                            <td data-label="Paid" style="text-decoration:underline;"><strong>₦{order.total}</strong></td>
                            
                        </tr>
                    {/each}
            </tbody>
        </table>
            {:else}
                <p>No sales yet!</p>
            {/if}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-success">Save</button>
      </div>
    </div>
  </div>
</div>
<hr/>
<section class="top-section">
    <h3>Last 24hrs (Kitchen)</h3>
    <button style="background:teal;color:white;" onclick={openKitchenModal}>Show kitchen</button>
</section>
<!--Kitchen Modal -->
{#if showKitchenModal}
  <div class="modal fade show" tabindex="-1" style="display: block;">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title heading">Kitchen Table for {new Date().toISOString().substring(0, 10)}</h5>
          <button type="button" aria-label="show kitchen button" class="btn-close" onclick={closeKitchenModal}></button>
        </div>

        <div class="modal-body scrollable-table-container">
            {#if recents.length > 0}
            <table class="h-scroll-table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Weight</th>
                        <th scope="col">Scoops/Pieces</th>
                        <th scope="col">Addition</th>
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
            {:else}
            <p>Kitchen has sent no data!</p>
            {/if}
        </div>
        <div class="modal-footer">
        <button type="button" class="btn btn-secondary" onclick={closeKitchenModal}>Close</button>
        <button type="button" class="btn btn-success">Save</button>
      </div>
      </div>
    </div>
  </div>
{/if}
<hr/>
<section class="top-section">
    <h3>Menu</h3>
    <button type="button" class="btn btn-secondary" onclick={getCurrentMenu}>Show menu</button>
</section>
<CustomModal bind:isOpen={isCustomModalOpen}>
        <table class="responsive-table">
        <thead>
            <tr>
            <th>Name</th>
            <th>Unit</th>
            <th>Category</th>
            <th>Stock</th>
            </tr>
        </thead>
        <tbody>
            {#each currentMenu as m}
                {#each m.menu as v}
                    <tr>
                        <td data-label="Name">{v.name}</td>
                        <td data-label="Unit">₦{v.price}</td>
                        <td data-label="Category">{v.category}</td>
                        <td data-label="Stock">{v.quantity || 'n/a'}</td>
                    </tr>
                {/each}
            {/each}
                    
        </tbody>
    </table>
</CustomModal>

<hr/>
<section class="set-stock-section">
    <!-- <h3>Create Container</h3> -->
     <label for="container-action" style="font-weight: 700;">Food container</label><br/>
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
    <!-- <h3>Add Menu Item</h3> -->
    <label for="menu-action" style="font-weight: 700;">Menu item</label><br/>
    <select id="menu-action" bind:value={menuAction}>
        <option value="">--Select action--</option>
        <option value="add">Add Item</option>
        <option value="edit">Edit Item</option>
    </select>
        <form onsubmit={addMenuItem}>
    <label for="menuItemName">Snack/Food or Drink</label>
    <input placeholder="snack/food or drink" bind:value={menuItemName} id="menuItemName" />
        <label for="menuItemPrice">Price (portion or piece)</label>
    <input type="number" placeholder="In Naira e.g. 2550" bind:value={menuItemPrice} id="menuItemPrice" />
    <br/>
    <label for="menuItemQty">Stock quantity (Drinks/Snacks)</label>
    <input type="number" placeholder="Count per piece" bind:value={menuItemQty} id="menuItemQty" />
        <label for="itemCategory">Category</label>
    <select name="itemCategory" id="itemCategory" bind:value={menuItemCategory}>
  <option value="">--Choose menu category--</option>
  <option value="snack">Snack</option>
  <option value="food">Food</option>
  <option value="drinks">Drinks</option>
</select>
    <button type="submit" class="add-container-btn">{loadingAdd || loadingEdit ? 'Wait..' : menuAction === 'edit' ? 'Edit' : 'Add'}</button>
    </form>
</section>
</div>


<style scoped>
    .add-container-btn {
        width: 74px;
        height: 38px;
        background: green;
        color: white;
        padding: 6px;
        margin: 6px;
    }
    #container-action, #menu-action {
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
    .heading {
        font-size: small;
    }
    .items-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    }

    .item-badge {
    background-color: #f0f0f0;
    border-radius: 12px;
    padding: 0.25rem 0.75rem;
    font-size: 0.85rem;
    color: #333;
    white-space: nowrap;
    }

   /* .recents-btn {
        color: white;
        margin: 6px;
        background: rgb(68, 99, 68);
    }*/
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
  .modal-content {
    width: 680px;
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
    .modal-content {
        max-width: 310px;
    }
  }

  /* 
  The wrapper DIV that enables horizontal scrolling.
  This is the key to the entire technique.
*/
.scrollable-table-container {
    overflow-x: auto; /* Enables horizontal scrolling */
    -webkit-overflow-scrolling: touch; /* Optional: Enables smooth scrolling on iOS devices */
    border: 1px solid #ddd;
    border-radius: 8px;
}

.h-scroll-table {
    /* The table itself should be allowed to be wider than its container */
    width: 100%;
    /* A min-width can prevent the table from becoming too crushed on small screens. */
    /* Adjust this based on your content. */
    min-width: 800px; 
    
    border-collapse: collapse;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

.h-scroll-table thead th {
    padding: 12px 15px;
    background-color: #f8f9fa;
    border-bottom: 2px solid #dee2e6;
    text-align: left;
    font-weight: 600;
}
.h-scroll-table tbody td {
    padding: 10px 15px;
    border-bottom: 1px solid #e9ecef;
    text-align: left;
}
.h-scroll-table tbody tr:last-child td {
    border-bottom: none;
}
.h-scroll-table tbody tr:nth-of-type(even) {
    /* background-color: #f8f9fa; */
    background-color: #e3ecf5;
}
</style>


