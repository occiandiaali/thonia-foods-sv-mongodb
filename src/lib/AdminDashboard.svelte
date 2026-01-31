<script>
    import axios from "axios";

    let coolerName = $state('');
    let coolerWeight = $state(0);
    let scoopWeight = $state(0);
    let loading = $state(false);

    async function saveCoolerDetails(event) {
        event.preventDefault();
        loading = true;
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post('http://localhost:5000/api/kitchen/add-container', {name:coolerName, wgt:coolerWeight, scoop: scoopWeight},{ 
                headers: { Authorization: `Bearer ${token}`},
            })

            if (res) {
                alert(`Submission: ${JSON.stringify(res.data)}`);
                coolerName = "";
                coolerWeight = 0;
                scoopWeight = 0;

            }
        } catch (error) {
            console.error(error)
        } finally {
            loading = false;
        }

    }
</script>

<section>
    <h2>Another section</h2>
</section>
<section class="set-stock-section">
    <form onsubmit={saveCoolerDetails}>
    <label for="coolerName">Container name</label>
    <input placeholder="e.g. beans" bind:value={coolerName} id="coolerName" />
        <label for="coolerWgt">Container weight (grams)</label>
    <input type="number" placeholder="In grams e.g. 1450" bind:value={coolerWeight} id="coolerWgt" />
        <label for="scoopWgt">Portion weight (grams)</label>
    <input type="number" placeholder="In grams e.g. 150" bind:value={scoopWeight} id="scoopWgt"/>
    <button type="submit" class="add-container-btn">{loading ? 'Saving' : 'Save'}</button>
    </form>
</section>


<style scoped>
    .add-container-btn {
        width: 68px;
        height: 38px;
        background: green;
        color: white;
        padding: 6px;
        margin: 6px;
    }
</style>


