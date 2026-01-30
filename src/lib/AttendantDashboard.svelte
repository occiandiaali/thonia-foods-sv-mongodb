<script>

    let itemName = $state('');
      // Runes syntax states
  let items = $state([
    { food: 'Beans', qty: 20, unit: 200, count: 0, expected: 4000, total: 0 },
    { food: 'Ofada rice', qty: 10, unit: 300, count: 0, expected: 3000, total: 0 },
    { food: 'Spaghetti', qty: 15, unit: 100,  count: 0, expected: 1500, total: 0 },
    { food: 'Fried rice', qty: 10, unit:250, count: 0, expected: 2500, total: 0 }
  ]);

  function addItem() {
    if (itemName.length >= 3) {
    items.push({ food: itemName, qty: 5, unit: 200, count: 0, expected: 1500, total: 0 });
    } else {
        alert("Enter the item name first!")
    }
  }

  function increment(item) {
    if (item.total > 0 && item.total < item.expected) {
    item.qty++;
    item.count--;
    item.total = item.count * item.unit;
    } else {
    item.qty = item.qty
  }
  } 

  function decrement(item) {
    if (item.qty > 0) {
      item.qty--;
      item.count++;
      item.total = item.count * item.unit;
    } else {
        item.qty = 0;
    }
  }

    function removeItem(index) {
    items.splice(index, 1);
  }

  function clearAll() { 
    items.splice(0, items.length); // remove everything 
    // reset with one blank row 
    // items.push({ food: '', qty: 0, unit:0, count: 0, expected: 2500, total: 0 }); 
    }

    // Grand total (reactive derived value)
  let grandTotal = $derived(items.reduce((sum, item) => sum + item.total, 0));

  function checkOut() {
    alert(`Payment: ₦${grandTotal}`)
  }

   // import DailyMenu from "./DailyMenu.svelte";

    let rowqty = $state(0)
	


    const columns = [
        // {header: "ID", field: "id"},
        {header: "Name", field: "name"},
        {header: "Unit", field: "unit"},
        {header: "Kg", field: "kg"},
        {header: "Confirm", field: "confirm"},
        {header: "Qty", field: "qty"},
        {header: "Target", field: "target"},
        {header: "Total", field: "total"},
    ]

    const rows = [
        {name: "Ofada Rice", unit: 450, kg: 7143, confirm: 0, qty: rowqty = 10, target:4500, total:0},
        {name: "Beans", unit: 250, kg: 9143, confirm: 0, qty: rowqty = 20, target:5000, total:0},
        {name: "Spaghetti", unit: 200, kg: 2000, confirm: 0, qty: rowqty = 10, target:2000, total:0},
        {name: "Fried Rice", unit: 300, kg: 7143, confirm: 0, qty: rowqty = 10, target:3000, total:0},
        {name: "Jollof Rice", unit: 450, kg: 7143, confirm: 0, qty: rowqty = 10, target:4500, total:0},
        {name: "Plantain", unit: 200, kg: 1000, confirm: 0, qty: rowqty = 10, target:2000, total:0},
    ]

</script>

<style>
.daily-menu-section {
    margin: 8% auto;
}

    .row {
    width: 100%;
    height: 68px;
    display: flex;
    gap: 1rem;
    margin-bottom: 0.5rem;
    align-items: center;

  }
  input {
    width: 120px;
  }
  .item-food-span {
    width: 120px;
    border: 1px solid lightslategray;
    padding: 6px;
    font-size: large;
  }
  .checkout-btn {
    width: 150px;
    background: green;
    color: white;
  }
    .controls {
    margin: 1rem auto;
    /* display: flex; */
    gap: 1rem;
  }
    .grand-total {
    margin-top: 1rem;
    font-weight: bold;
  }
    .remove {
    width: 26px;  
    height: 26px;  
    background: crimson;
    color: white;
    border: none;
    padding: 0.3rem 0.6rem;
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
  .item-add {
    width: 30px;
    height: 30px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
   .clear {
    background: darkorange;
    color: white;
    border: none;
    padding: 0.4rem 0.8rem;
    cursor: pointer;
  }
  #decQty {
    width: 40px;
    height: 40px;
    background: rgb(119, 95, 50);
    color: white;
        display: inline-flex;
    justify-content: center;
    align-items: center;
  }
    #incQty {
    width: 40px;
    height: 40px;
    background: green;
    color: white;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    
  }
  .items-list-div {
    margin-top: 3%;
  }
  .kitchen-stats-div ul li {
     list-style: none;
     font-size: small;
     width: 100%;
     height: 32px;
     border: 1px solid orange;
     margin: 3px;
  }
  .kitchen-remove {
    width: 20px;  
    height: 20px;  
    background: crimson;
    color: white;
    border: none;
    padding: 0.3rem 0.6rem;
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 0;
    margin-top: 6px;
  }
  .refresher:hover {
    cursor: pointer;
  }

  @media only screen and (max-width: 600px) {
    .daily-menu-section {
        margin: 100px auto;
    }
}
</style>

<section class="daily-menu-section">

    
    <!-- <div class="box">
        <input bind:value={title} bind:this={inputEl} type="text" placeholder="Enter Snack/Food" />
        <button onclick={addTodo}>Add</button>
        <button onclick={clearFld}>Clear</button>
    </div>
    <h2 style="text-align:center">Snack/Food</h2>
    <hr />
   <div class="todos">
    {#each todos as todo}
        <input bind:value={todo.name} />
        <button onclick={() => {count > 0 ? count -= 1 : 0;sum+=1}}> - </button>
        <span>{count}</span>
        <button onclick={() => {count < 20 ? count += 1 : 20;sum < 1 ? sum : sum-=1} }>+</button>
    {:else}
        <p>No Entries</p>
    {/each}
   </div> -->
   <div class="kitchen-stats-div">
   <p>From Kitchen <img src="/refresh-arrows-nobg.svg" alt="refresh" width="20px" height="20px" class="refresher"/></p>
   <ul>
   {#each rows as row}
    <li>{row.name}: {row.kg}Kg <button class="kitchen-remove" onclick={() => {}}>X</button></li>
   {/each}
   </ul>
   </div>

<div class="controls">
    <input type="text" bind:value={itemName} placeholder="Item name" />
<button class="item-add" onclick={addItem}>✖</button>
<button class="clear" onclick={clearAll}>Clear All</button>
</div>
<div class="items-list-div">
  {#each items as item, i}
    <div class="row">
        
        <div>
          <!-- Food input -->
          <!-- <input type="text" bind:value={item.food} placeholder="Item name" /> -->
          <span class="item-food-span">{item.food}</span>
           <!-- Qty control -->
      <button id="decQty" onclick={() => decrement(item)}>-</button>
      <span>{item.qty}</span>
      <button id="incQty" onclick={() => increment(item)}>+</button>
      <!-- Count -->
      <span>Qty: {item.count}</span>
      <span>|</span>
      <!-- Expected -->
      <span> ₦{item.expected}</span>
      <span>|</span>
      <!-- Total -->
      <span>Total: ₦{item.total}</span>
      <!-- Remove button -->
      <button class="remove" onclick={() => removeItem(i)}>X</button>
      </div>

      <!-- <button class="remove" onclick={() => removeItem(i)}>✖</button> -->
    </div>
    {:else}
        <p>Added items show here.</p>
  {/each}


    <!-- Grand total -->
  <div class="grand-total">
    Grand Total: ₦{grandTotal}
    {#if grandTotal > 0}
    <button class="checkout-btn" onclick={checkOut}>Checkout</button>
    {/if}
  </div>
</div>

</section>
