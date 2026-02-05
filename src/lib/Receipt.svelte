<script>
  // Props passed in from parent (CheckoutCart or wherever you handle checkout)
  export let orderid;
  export let waiter;
  export let time;
  export let total;
  export let mode;
  export let cart; // array in format [{id:'', food:{...}, drink:{...}}]

//     let orderid = $state('');
//   let waiter = $state('');
//   let time = $state('');
//   let total = $state(0);
//   let mode = $state('');
//   let cart = $state({})

  function printReceipt() {
    window.print();
  }
  if (cart) {
    console.debug(cart);
  }
</script>

<style>
  .receipt {
    width: 260px;
    background: white;
    border: 1px dashed #000;
    padding: 15px;
    margin: auto;
    font-family: monospace;
  }
  .receipt h2 {
    text-align: center;
    margin: 0 0 10px;
  }
  .receipt table {
    width: 100%;
    border-collapse: collapse;
  }
  .receipt td {
    padding: 4px 0;
  }
  .total {
    border-top: 1px dashed #000;
    margin-top: 10px;
    padding-top: 10px;
    font-weight: bold;
    text-align: right;
  }
  .meta {
    font-size: 0.9em;
    margin-bottom: 10px;
  }
  .center {
    text-align: center;
  }
  @media print {
    tbody { background: none; }
    .receipt { border: none; width: 100%; }
    button { display: none; }
  }
</style>

<div class="receipt">
  <h2>Restaurant Receipt</h2>

  <div class="meta">
    <div>Order ID: {orderid}</div>
    <div>Waiter: {waiter}</div>
    <div>Time: {time}</div>
    <div>Paid by: {mode}</div>
  </div>

  <table>
    <thead>
    <tr>
      <td><strong>Item</strong></td>
      <td class="center"><strong>Qty</strong></td>
      <!-- <td class="center"><strong>Price</strong></td> -->
      <td class="center"><strong>Subtotal</strong></td>
    </tr>
    </thead>
    <tbody>
    {#each cart as order}
      <!-- Food -->
      <tr>
        <td>{order.food.name}</td>
        <td class="center">{order.food.qty}</td>
        <!-- <td class="center">${order.food.price.toFixed(2)}</td> -->
        <!-- <td class="center">${(order.food.price * order.food.qty).toFixed(2)}</td> -->
         <td class="center">₦{order.food.subTotal}</td>
      </tr>

      <!-- Drink -->
      <tr>
        <td>{order.drinks.name}</td>
        <td class="center">{order.drinks.qty}</td>
        <!-- <td class="center">${order.drink.price.toFixed(2)}</td>
        <td class="center">${(order.drink.price * order.drink.qty).toFixed(2)}</td> -->
         <td class="center">₦{order.drinks.subTotal}</td>
      </tr>
    {/each}
    </tbody>
  </table>

  <div class="total">TOTAL: ₦{total}</div>
  <p class="center">Thank you for visiting!</p>
</div>

<button on:click={printReceipt}>Print / Save as PDF</button>
