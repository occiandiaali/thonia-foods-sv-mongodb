<script>
    import axios from "axios";

    let coolerName = $state('');
    let coolerWeight = $state(0);
    let scoopWeight = $state(0);
    let loadingAdd = $state(false);
    let loadingCreate = $state(false);
    let menuItemName = $state('');
    let menuItemPrice = $state(0);
    let menuItemCategory = $state('') // Food or Drink
    let menuItemQty = $state(0); // Basically just for drink items

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
    <h2>Another section</h2>
</section>
<hr/>
<section class="set-stock-section">
    <h3>Create Container</h3>
    <form onsubmit={saveCoolerDetails}>
    <label for="coolerName">Container name</label>
    <input placeholder="e.g. beans" bind:value={coolerName} id="coolerName" />
        <label for="coolerWgt">Container weight (grams)</label>
    <input type="number" placeholder="In grams e.g. 1450" bind:value={coolerWeight} id="coolerWgt" />
        <label for="scoopWgt">Portion weight (grams)</label>
    <input type="number" placeholder="In grams e.g. 150" bind:value={scoopWeight} id="scoopWgt"/>
    <button type="submit" class="add-container-btn">{loadingCreate ? 'Creating' : 'Create'}</button>
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
    .set-stock-section {
        margin-top: 18px;
    }
    .set-menu-section {
        margin-top: 18px;
    }
    .wrap-div {
        margin: 20% auto;
    }
</style>


