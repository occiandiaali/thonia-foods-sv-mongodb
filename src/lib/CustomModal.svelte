<script>
  export let isOpen = false;

  function closeModal() {
    isOpen = false;
  }
</script>

<div>Today {new Date().toISOString().substring(0, 10)}</div>
<div class="modal" class:open={isOpen}>
  <div class="modal-overlay" role="button" tabindex="-1" on:keydown={closeModal} on:click={closeModal}>
  <div class="modal-content">
    <slot></slot>

    <button on:click={closeModal}>Close</button>
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
</style>