<script>
  export let rows = [];
  export let columns = [];
</script>

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
          <td>{row[column.field]}</td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

<style>
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 6px;
  }
  th, td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
  }
</style>