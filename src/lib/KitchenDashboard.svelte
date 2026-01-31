<script>
    import axios from "axios";
    let itemName = $state('');
    let itemWgt = $state(0);
    let isExtra = $state(false);
    let loading = $state(false);

    async function submitEntry(event) {
        event.preventDefault();
      //  const timestamp = new Date().toLocaleString()
        loading = true;
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post('http://localhost:5000/api/kitchen/serving', {name:itemName, weight:itemWgt, extra: isExtra},{ 
        headers: { Authorization: `Bearer ${token}`},
       })
            console.log(`Status: ${res.status}`);
            if (res.status !== 200) {
                alert("Couldn't complete this action. That's all I know!");
                return;
            }
            if (res) {
                alert(`Submission: ${JSON.stringify(res.data)}`);
                itemName = "";
                itemWgt = 0;
                isExtra = false;

            }
        } catch (err) {
            if (err.response) {
                alert(err.response.data.error)
            } else { alert("Network error, please try again."); }
           // console.error(err)
        } finally {
            loading = false
        }
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
    <form onsubmit={submitEntry}>
    <input type="text" placeholder="Item name" bind:value={itemName} />
    <input type="number" placeholder="Item weight (g)" bind:value={itemWgt}/>
    <input type="checkbox" bind:checked={isExtra}/> Extra
    <button type="submit">{loading ? 'Submitting' : 'Submit'}</button>
    </form>
    
</section>