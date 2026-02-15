<script>
  export let isOpen = false;

  function closeModal() {
    isOpen = false;
  }
  function clearMenu() {
    alert("This would delete all the content in Menu..")
  }
</script>

<div>Today {new Date().toISOString().substring(0, 10)}</div>
<div class="modal" class:open={isOpen}>
  <div class="modal-overlay" >
    <div class="modal-content">
      <span role="button" tabindex="-1" on:keydown={closeModal} on:click={closeModal} style="position:absolute;top:2%;right:5%; color: red;font-size:large;font-weight:700">X</span>
    <label for="category-select">Filter by category</label>
    <select name="categories" id="category-select">
      <option value="">--Show only--</option>
      <option value="food">Food</option>
      <option value="drinks">Drinks</option>
      <option value="snack">Snacks</option>
    </select>
    <slot></slot>

    <button on:click={closeModal}>Close</button>
    <button class="clear-menu" on:click={clearMenu}>Clear</button>
  </div>
  </div>
</div>

<style>
    button {
        width: 80px;
        height: 48px;
        margin: 0 auto;
        background: black;
        color: white;
    }
    button:hover {
        background: white;
        color: black;
    }
    .clear-menu {
      background: red;
      color: white;
      margin: 1% auto;
    }
  .modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
  }

  .modal.open {
    display: flex;
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-content {
    /* position: relative; */
    background: white;
    padding: 20px;
    border-radius: 8px;
    max-height: 80vh;
    overflow-y: auto;
    width: 90%;
    max-width: 600px;
  }
  label {
    font-family: sans-serif;
    font-size: 1rem;
    padding-right: 10px;
  }

  select {
    font-size: 0.9rem;
    padding: 2px 5px;
  }
</style>