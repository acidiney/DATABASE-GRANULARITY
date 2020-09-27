<script>
  import network from "../assets/js/resources/network/index.mjs";
  import event from "../assets/js/resources/event.js";
  import { DB_VERSION } from "../assets/js/constants.mjs";
  import { onMount } from "svelte";

  let todos = [];
  let currentNetworkState = true;
  let todo = "";
  let errorMessage = "";

  function onChange(id, done) {
    network.updateTodo(id, done);
  }

  function onDelete(id) {
    network.deleteTodo(id);
  }

  function onClick() {
    network.createTodo(todo).then(() => {
      todo = "";
    });
  }

  event.on("reload", getTodos);
  event.on("network", function(val) {
    currentNetworkState = val;
  });

  window.addEventListener("offline", function() {
    currentNetworkState = false;
  });

  async function getTodos() {
    todos = await network.todos();
  }

  onMount(getTodos);
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }

  .mgh-auto {
    margin: 0 auto;
  }
</style>

<main>
  <h1 class="mb-3">{currentNetworkState ? 'online' : 'offline'}</h1>
  <div class="mb-3">
    <input required minlength="1" type="text" bind:value={todo} />
    <span class="error-message">{errorMessage}</span>
    <button on:click={onClick}>Criar todo</button>
  </div>
  <table class="table is-striped mgh-auto">
    <thead>
      <tr>
        <th>#</th>
        <th>Todo</th>
        <th>Estado</th>
        <th>Ações</th>
      </tr>
    </thead>
    {#each todos as todo}
      {#if !todo.removed}
        <tr>
          <td>{todo.id}</td>
          <td>{todo.todo}</td>
          <td>
            <input
              type="checkbox"
              checked={todo.done}
              on:change={() => onChange(todo.id, todo.done)} />
          </td>
          <td>
            <button on:click={() => onDelete(todo.id)}>Eliminar</button>
          </td>
        </tr>
      {/if}
    {/each}
  </table>

  <h2 class="mt-3"> DB VERSÃO {DB_VERSION} </h2>
</main>
