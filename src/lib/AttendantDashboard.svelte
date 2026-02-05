<script>
  import { onMount } from "svelte";
  import axios from "axios";

  import { userState } from "../state.svelte";
  // import returnCurrentDateTime from "../helpers/returnCurrentDateTime";
  // import Receipt from "./Receipt.svelte";

    let itemName = $state('');
  //  let items = $state([])
      // Runes syntax states
  // let items = $state([
  //   { food: 'Beans', qty: 20, unit: 200, count: 0, expected: 4000, total: 0 },
  //   { food: 'Ofada rice', qty: 10, unit: 300, count: 0, expected: 3000, total: 0 },
  //   { food: 'Spaghetti', qty: 15, unit: 100,  count: 0, expected: 1500, total: 0 },
  //   { food: 'Fried rice', qty: 10, unit:250, count: 0, expected: 2500, total: 0 }
  // ]);
  let food = $state([])

  let drinks = $state([])
  //   /** @typedef {Object} Drink ... */
//   /**
//  * @typedef {Object} Drink
//  * @property {string} name
//  * @property {number} quantity
//  * @property {string} category
//  * @property {number} price
//  * @property {number} count
//  * @property {number} sales
//  * @property {boolean} locked
//  */

// function lockDrink(index) {
//   drinks[index] = { ...drinks[index], locked: true };
//   drinks = [...drinks]; // reassign to trigger reactivity
// }

  // let drinks = [
  //   { name: "Coke", quantity: 10, category: "Soft Drink", price: 2, count: 0, sales: 0, locked: false },
  //   { name: "Pepsi", quantity: 5, category: "Soft Drink", price: 2, count: 0, sales: 0, locked: false }
  // ];

  // function lockDrink(index) {
  //   drinks[index] = { ...drinks[index], locked: true };
  //   drinks = [...drinks]; // reassign array to trigger reactivity
  // }

  // For attendant's confirmation of received cooler/container snack/food
  let foodConfirm = $state('');
  let wgtConfirm = $state(0);
  let confirmation = $state(''); // Text that shows beneath the attendant confirm button
  async function confirmKitchenTable(event) {
    event.preventDefault();
    if (foodConfirm === '' || wgtConfirm === 0) {
      alert("Enter values to confirm.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:5000/api/kitchen/serving/attendant-confirm", {name:foodConfirm, weight:wgtConfirm}, { 
              headers: { Authorization: `Bearer ${token}`},
            });
      if (res) {
        confirmation = res.data;
      }      
    } catch (err) {
      console.error(err)
    }
    // confirmation = `${foodConfirm} weight: ${wgtConfirm}`;
    // alert(confirmation); 
  }
  function clearConfirm() {
    foodConfirm = "";
    wgtConfirm = 0;
    confirmation = ""
  }

  let getservingCount = $state(0);
  function handleGetServing() {
    // if block is to check fetching stale data
    if (getservingCount < food.length && food.length > 0) {
      getServing();
    }// getservingCount < food
  }
  async function getServing() {
    try {      
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/kitchen/serving", { 
                headers: { Authorization: `Bearer ${token}`},
            });
      if (res) {
        res.data.forEach(obj => {
          const temp = {...obj, count:0, sales:0}
          food.push(temp);
          getservingCount = food.length;
          localStorage.setItem("food", JSON.stringify(food));
        });
      }
    
    } catch (err) {
      console.error(err)
    }
  }

  // function clearAll() { 
  //   items.splice(0, items.length); // remove everything 
  //   // reset with one blank row 
  //   // items.push({ food: '', qty: 0, unit:0, count: 0, expected: 2500, total: 0 }); 
  //   }

  //   // Grand total (reactive derived value)
  // let grandTotal = $derived(items.reduce((sum, item) => sum + item.total, 0));

   let startOrder = $state(false);
   let checkingOut = $state(false);

   let orderStorage = $state([]);

     /** New Order vars */
  /**
 * @typedef {Object} foodObj
 * @property {string} name - The name of the object.
 * @property {number} quantity - The quantity associated with the object.
 * @property {number} subTotal - The subTotal associated with the object.
 */
  const foodObj = $state({name:'', quantity:0,subTotal:0});
  let foodCount = $state(0);

/**
 * @typedef {Object} drinkObj
 * @property {string} name - The name of the object.
 * @property {number} quantity - The quantity associated with the object.
 * @property {number} subTotal - The subTotal associated with the object.
 */
  const drinkObj = $state({name:'', quantity:0,subTotal:0});
  let drinkCount = $state(0);

  let foodTotal = $state(0);
  let drinkTotal = $state(0);

   function newOrder() {
    startOrder = true;
    // const storedOrder = localStorage.getItem("storedOrder");
    // if (storedOrder) {
    //   localStorage.removeItem("storedOrder");
    //   orderStorage = [];
    // } else {
    //   localStorage.setItem("storedOrder", JSON.stringify(orderStorage))
    // }
   }

  //========================
  function updateFoodLocalStorage() {
    localStorage.setItem("food", JSON.stringify(food))
  }
  function updateDrinkLocalStorage() {
    localStorage.setItem("drinks", JSON.stringify(drinks))
  }
   
   let addDrinkErrorMsg = $state('');
  async function addDrink(event) {
      event.preventDefault();
      addDrinkErrorMsg = '';// Reset error msg
    if (itemName.length >= 3) {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/menu", { 
            params: {name: itemName},
            headers: { Authorization: `Bearer ${token}`},
        })
        if (res) {
        //  console.log("drink ",res.data);
          const temp = {...res.data, count:0, sales:0}
          drinks.push(temp);
          localStorage.setItem("drinks", JSON.stringify(drinks));
          itemName = "";  
        }     
        
      } catch (err) {
        if (err.response) {
          // The request was made and the server responded with a status code
          addDrinkErrorMsg = err.response.data.error;
          // console.error('Code ', err.response.status);
          // console.error('Reason ', err.response.data.error);
        } else if (err.request) {
          // The request was made but no response was received
          addDrinkErrorMsg = err.request;
          console.log('No response received:', err.request);
        } else {
          console.error(err.message);
        }
      }
    } else {
        alert("Enter the item name first!")
    }
  }

  function increment(item) {
    if (item.sales > 0 && item.sales < item.expectedTotal) {
      item.qty++;
      item.count--;
      foodCount--;
      item.sales = item.count * item.price;
     // console.log(`Food inc item.count:${item.count} & foodCount:${foodCount}`);
  
      updateFoodLocalStorage();
      foodObj['name'] = item.name;
      foodObj['quantity'] = foodCount;
      foodObj['subTotal'] = item.price * foodCount;

     // foodItems.pop();
      //const obj = {name: item.name, unit: item.price, quantity: item.count, subTotal: item.price * item.count};
     // foodItems.push(foodObj);
      } else {
      item.qty = item.qty
      
    }
  } 

  function decrement(item) {
    if (item.qty > 0) {
      item.qty--;
      item.count++;
      foodCount++;
      item.sales = item.count * item.price;
     // console.log(`Food dec item.count:${item.count} & foodCount:${foodCount}`);
      updateFoodLocalStorage();
      foodObj['name'] = item.name;
      foodObj['quantity'] = foodCount;
      foodObj['subTotal'] = item.price * foodCount;
      //foodItems.pop();
     // const obj = {name: item.name, unit: item.price, quantity: item.count, subTotal: item.price * item.count};
     //// foodItems.push(foodObj);
    } else {
        item.qty = 0;
        
    }
  }
    function drinkDecrement(item) {
    if (item.quantity > 0) {
      item.quantity--;
      item.count++;
      drinkCount++;
      item.sales = item.count * item.price;

      updateDrinkLocalStorage();
      drinkObj['name'] = item.name;
      drinkObj['quantity'] = drinkCount;
      drinkObj['subTotal'] = item.price * drinkCount;
    //  drinkItems.pop();
     // const obj = {name: item.name, unit: item.price, quantity: item.count, subTotal: item.price * item.count};
    //  drinkItems.push(drinkObj);
    } else {
        item.quantity = 0;
        
    }
  }

function drinkIncrement(item) {
  if (item.count > 0 && item.count < item.quantity) {
        item.quantity++;
        item.count--;
        drinkCount--;
        item.sales = item.count * item.price;
        
      //   drinkItems.pop();
      // const obj = {name: item.name, unit: item.price, quantity: item.count, subTotal: item.price * item.count};
      // drinkItems.push(obj);
        updateDrinkLocalStorage();
        drinkObj['name'] = item.name;
        drinkObj['quantity'] = drinkCount;
        drinkObj['subTotal'] = item.price * drinkCount;
        
      } else {
      item.quantity = item.quantity
      
    }
  } 

  function removeItem(index) {
    food.splice(index, 1);
    updateFoodLocalStorage();
    // Clear localstorage to avoid leaving empty []
    if (food.length === 0) {
      localStorage.removeItem('food');
    }
  }
  function removeDrink(idx) {
    drinks.splice(idx, 1);
    updateDrinkLocalStorage();
    // Clear localstorage to avoid leaving empty []
        if (drinks.length === 0) {
      localStorage.removeItem('drinks');
    }
  }

  function clearAllLocalStorage() { 
    food.splice(0, food.length); // remove everything 
    drinks.splice(0, drinks.length);
    // reset with one blank row 

    // items.push({ food: '', qty: 0, unit:0, count: 0, expected: 2500, total: 0 }); 
    }

    // Grand total (reactive derived value)
//  let grandTotal = $derived(food.reduce((sum, item) => sum + item.sales, 0));

  let orderTotal = $derived(foodObj.subTotal + drinkObj.subTotal);
  let paymentMode = $state('');
  let orderid = $state('');
  let waiter = $state('');
  let time = $state('');
  let total = $state(0);
  let mode = $state('');
  let cart = $state({});
  let checkoutDone = $state(false);
  let foodOrder = $state(null);
  let drinkOrder = $state(null);

  async function checkOut() {
    try {
      checkingOut = true;
      if (Object.keys(foodObj).length > 0) {
        Object.entries(foodObj).forEach(([k,v]) => {
          if (k === 'subTotal') {
            foodTotal += +v;
          }
        })
        foodOrder = {name:foodObj.name, quantity: foodObj.quantity, subTotal: foodObj.subTotal}
      } else {
        foodTotal = 0;
      }

      if (Object.keys(drinkObj).length > 0) {
        Object.entries(drinkObj).forEach(([k,v]) => {
          if (k === 'subTotal') {
            drinkTotal += +v;
          }
        })
        drinkOrder = {name:drinkObj.name, quantity: drinkObj.quantity, subTotal: drinkObj.subTotal};
      } else {
        drinkTotal = 0;
      }

      // console.log("FoodObj..");
      // console.debug(foodObj)
      //       console.log("DrinkObj..");
      // console.debug(drinkObj)
      
    //  const foodOrder = Object.keys(foodObj).length > 0 ? {name:foodObj.name, quantity: foodObj.quantity, subTotal: foodObj.subTotal} : null;
    //  const drinkOrder = Object.keys(drinkObj).length > 0 ? {name:drinkObj.name, quantity: drinkObj.quantity, subTotal: drinkObj.subTotal} : null;
      
      const newOrder = {
        orderId: Math.random().toString(36).slice(2),
       
        attendant: `${userState.firstname} ${userState.lastname}`,
        items: [foodOrder, drinkOrder],
        total: drinkTotal + foodTotal,
        paidBy: paymentMode
      }
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:5000/api/orders/", newOrder, { 
              headers: { Authorization: `Bearer ${token}`},
        });
        if (res) {
          alert(`Completed order`);
        //  console.log(res.data);
        }
      // drinkObj['locked'] = true;
      //order.id, order.food.{name,quantity,subTotal}, order.drinks.{name,quantity,subTotal}
      //Order: ${JSON.stringify(order, null, 2)}
      // alert(`

      //  Attendant: ${attendant}
      //  =======================
      //  Time: ${timestamp}
      //   Order:
      //    ${JSON.stringify(order, null, 2)}
      //   ===================
      //   Total: ₦${t}
      //   paid via: ${paidBy}
      //   `); 

    orderid = newOrder.orderId;
    mode = newOrder.paidBy;
    waiter = newOrder.attendant;
 
    total = newOrder.total;
    cart = newOrder.items; 
    checkoutDone = true;   
       
    startOrder = false;
    foodObj["name"] = "";
    foodObj["quantity"] = 0;
    foodObj["subTotal"] = 0;
    drinkObj["name"] = "";
    drinkObj["quantity"] = 0;
    drinkObj["subTotal"] = 0;
    foodCount = 0;
    drinkCount = 0;
    foodTotal = 0;
    drinkTotal = 0;
    orderTotal = 0;
    paymentMode = ''
     
    } catch (err) {
      console.error(err);
    } finally {
      checkingOut = false
    }
  }

 onMount(() => {
   const storedFood = localStorage.getItem("food");
   const storedDrinks = localStorage.getItem("drinks");
   if (storedFood) {
     food = JSON.parse(storedFood)
    } else {
      getServing();
  }
  if (storedDrinks) {
    drinks = JSON.parse(storedDrinks)
  }
 })   

</script>

<style>
  h5 {
    font-size: medium;
  }
.daily-menu-section {
    margin: 8% auto;
}

    /* .row {
    width: 100%;
    height: 68px;
    display: flex;
    gap: 1rem;
    margin-bottom: 0.5rem;
    align-items: center;

  } */
  input {
    width: 120px;
  }
  .item-food-span {
    width: 120px;
    border: 1px solid rgb(235, 83, 56);
    padding: 6px;
    font-size: small;
  }
  .item-drink-span {
    width: 120px;
    border: 1px solid rgb(235, 83, 56);
    padding: 6px;
    font-size: small;
  }
  /* .cancel-checkout-btn {
    width: 150px;
    background: red;
    color: white;
    margin: 6px;
  } */
  .checkout-btn {
    width: 150px;
    background: green;
    color: white;
  }
  .new-order-btn {
    width: 150px;
    background: rgb(66, 75, 66);
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
    width: 20px;  
    height: 20px;  
    background: crimson;
    color: white;
    border: none;
    border-radius: 100%;
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
   /* .clear {
    background: darkorange;
    color: white;
    border: none;
    padding: 0.4rem 0.8rem;
    cursor: pointer;
  } */
  #decQty {
    width: 30px;
    height: 30px;
        flex: 0 0 auto;
    margin: 5px;
    padding: 10px 15px;
    background: rgb(119, 95, 50);
    color: white;
        display: inline-flex;
    justify-content: center;
    align-items: center;
  }
    #incQty {
    /* width: 40px;
    height: 40px; */
    width: 30px;
    height: 30px;
    flex: 0 0 auto;
    margin: 5px;
    padding: 10px 15px;
    background: green;
    color: white;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    
  }
  .items-list-div {
    margin-top: 3%;
  }
  .kitchen-stats-div {
    display: flex;
    flex-direction: column;
    align-items: center;

  }
  .kitchen-stats-div ul li {
     list-style: none;
     font-size: small;
     width: 100%;
     height: 32px;
     border: 1px solid rgb(73, 51, 11);
     margin: 3px;
     padding: 6px;
  }
  /* .kitchen-remove {
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
  } */
  .refresher:hover {
    cursor: pointer;
  }
  .weight-confirm-section button {
    background: yellowgreen;
    padding: 6px;
    margin: 8px;
  }
  .weight-confirm-section input {
    padding: 6px;
    border: none;
    border-radius: 24px;
  }
  .clear-confirm-btn {
    background-color: red;
    color: white;
  }
  /** The Orders list drinks section styles*/
  .drinkOrdersDiv {
    display: flex;
    flex-direction: row;
    justify-items: center;
  }
  .drinkOrdersNameDiv {
    flex: 1;
  }
  .drinkOrdersStatDiv {
    flex: 1;
  }

  @media only screen and (max-width: 600px) {
    .daily-menu-section {
        margin: 100px auto;
    }
    .drinkOrdersDiv {
      flex-direction: column;
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
   <p style="margin-left: 24px;">Kitchen <img src="/refresh-arrows-nobg.svg" alt="refresh" width="20px" height="20px" class="refresher" onclick={handleGetServing}/></p>
   <ul>
   {#each food as row}
    <li>{row.name}: {row.wgt/1000}Kg/{row.qty} portions</li>
   {/each}
   </ul>
   </div>
<hr/>
<section class="weight-confirm-section">
  <h5>Confirm item</h5>
  <form onsubmit={confirmKitchenTable}>
  <input placeholder="food/snack" bind:value={foodConfirm}/>
  <input type="number" placeholder="Weight" bind:value={wgtConfirm}/>
  <button type="submit">Confirm</button>
  </form>
  {#if confirmation}
  <button class="clear-confirm-btn" onclick={clearConfirm}>Clear</button>
    <p>Weight: {+confirmation/1000}Kg</p>
  {/if}
</section>
<hr/>
<!-- <div class="controls">
  <input type="text" bind:value={itemName} placeholder="Item name" />
  <button class="item-add" onclick={addItem}>✖</button>
</div> -->
<h4>Orders list</h4>
<div class="controls">
  <form onsubmit={addDrink}>
  <input type="text" style="padding: 6px;border:none;border-radius:24px;" bind:value={itemName} placeholder="Add drink" />
  <button type="submit" class="item-add">✖</button>
  </form>
  {#if addDrinkErrorMsg}
    <p style="color: red;">{addDrinkErrorMsg}</p>
  {/if}
</div>
<!--[TODO]:ClearAll what? -->
<!-- <button class="clear" onclick={clearAllLocalStorage}>Clear All</button> -->
<div class="items-list-div">
  <h5>Snacks/Food</h5>
  {#each food as item, i}     
        <div style="display: flex;flex-wrap:wrap; padding:10px;justify-content:space-around; align-items:center">
          <!-- Food input -->
          <!-- <input type="text" bind:value={item.food} placeholder="Item name" /> -->
          <span class="item-food-span">{item.name}{item.addition ? '★' : null}</span>
           <!-- Qty control -->
      <button id="decQty" onclick={() => decrement(item)} disabled={startOrder === false}>-</button>
      <span>{item.qty}</span>
      <!-- <button id="incQty" onclick={() => increment(item)} disabled={startOrder === false}>+</button> -->
      <!-- Count -->
      <span>quantity: {item.count}</span>
      <span>|</span>
      <!-- Expected -->
      <span> <strong>₦{item.expectedTotal}</strong></span>
      <span>|</span>
      <!-- Total -->
      <span>Total: ₦{item.sales}</span>
      <!-- Remove button -->
      <button class="remove" onclick={() => removeItem(i)}>X</button>
      
      </div>

      <!-- <button class="remove" onclick={() => removeItem(i)}>✖</button> -->
  
    {:else}
        <p>Served snacks/food show here.</p>
  {/each}
  <hr/>
  <h5>Drinks</h5>
  <ul>
  {#each drinks as drink, x}
  <div class="drinkOrdersDiv">
    <div class="drinkOrdersNameDiv">
      <span class="item-drink-span">{drink.name}</span>
      <!-- Qty control -->
        <button id="decQty" onclick={() => drinkDecrement(drink)} disabled={startOrder === false}>-</button>
        <span>{drink.quantity}</span>
        <!-- <button id="incQty" onclick={() => drinkIncrement(drink)} disabled={startOrder === false}>+</button> -->
    </div>
    <div class="drinkOrdersStatDiv">
          <!-- Count -->
          <span>qty: {drink.count}</span>
          <span>|</span>
          <!-- Total -->
          <span>Total: ₦{drink.sales}</span>
          <!-- Remove button -->
          <button class="remove" onclick={() => removeDrink(x)}>X</button>
          
    </div>
  </div>

  {:else}
      <p>Added drinks show here</p>
  {/each}
  </ul>
  {#if orderTotal > 0}
  <!-- <button class="cancel-checkout-btn" onclick={() => startOrder = false}>Cancel</button> -->
   <select bind:value={paymentMode} id="paymentMode" style="margin: 6px;">
    <option value="">--Payment mode--</option>
    <option value="cash">Cash</option>
    <option value="transfer">Transfer</option>
    <option value="card">Card</option>
   </select>
  {/if}
    <!-- Grand total -->
  <div class="grand-total">
    Order Total: ₦{orderTotal}
    <button class={!startOrder ? 'new-order-btn' : 'checkout-btn'} onclick={() => !startOrder ? newOrder() : checkOut()}>{startOrder ? 'Complete' : checkingOut ? 'Processing' : 'New Order'}</button>
  </div>
  <!-- {#if checkoutDone}
  <Receipt orderid={orderid} mode={mode} total={total} cart={cart} waiter={waiter} />
    
  {/if} -->
</div>
</section>
