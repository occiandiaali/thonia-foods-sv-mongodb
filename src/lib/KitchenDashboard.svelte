<script>
    let itemName = $state('');
    let itemWgt = $state(0);

    function submitEntry() {
        const timestamp = new Date().toLocaleString()
        alert(`Submission: ${itemName} - ${itemWgt/1000}kg on ${timestamp}`);
        itemName = "";
        itemWgt = 0;
    }
</script>

<style scoped>
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
    <h3>Send information</h3>
    <input type="text" placeholder="Item name" bind:value={itemName} />
    <input type="number" placeholder="Item weight (g)" bind:value={itemWgt}/>
    <button onclick={submitEntry}>Submit</button>
    
</section>