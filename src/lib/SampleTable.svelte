    <script>
 
           	let price= $state(0);
	let count = $state(20);
    let rowqty = $state(0)
	let sum = $state(0);
	let expected = $derived(count*price)
	let total = $derived(sum*price);
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

    <style scoped>
            button {
        width: 48px;
        height: 42px;
    }
    .input {
        max-width: 100px;
    }
    .table-div {
        overflow-x: auto;
    }
    table {
        width: 100%;
        border: 2px solid rgb(140 140 140);
        border-collapse: collapse;
    }

    th,
    td {
        /* border: 1px solid rgb(160 160 160); */
        border: 1px solid #ccc;
        padding: 8px;
        text-align: left;
    }
    @media screen and (max-width: 600px) {
        table {
            display: block;
            overflow-x: auto;
        }
    }
    </style>
    
    <div class="table-div">
     <table>
        <thead>
                <tr>
      {#each columns as column}
        <th>{column.header}</th>
      {/each}
    </tr>
        </thead>
        <tbody>
            {#each rows as row}
            <tr>
                {#each columns as column}
                <!-- <td>{row[column.field]}</td> -->
                 {#if column.field === "qty"}
                <td>
                    <button onclick={() => {rowqty > row['qty'] ? rowqty -= 1 : 0;sum+=1;row['qty']-sum}}> - </button>
                        <span>{row['qty']}</span>
                    <button onclick={() => {rowqty < 20 ? rowqty += 1 : 20;sum < 1 ? sum : sum-=1} }>+</button>
                    {sum}
                </td>
                {:else if column.field === "target"}
                <td>{row['target']}</td>
                {:else if column.field === "total"}
                <td>{total}</td>
                {:else}
                <td>
                    <input class="input" placeholder={row[column.field]} />
                </td>
                 {/if}
                {/each}
            </tr>
            {/each}
        </tbody>
     </table>
     </div>