<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData } from "./$types";

  export let form: ActionData;
</script>

<h1>Log in</h1>

<form method="post" use:enhance>
  <input type="email" name="email" placeholder="E-mail" />
  <input type="password" name="password" placeholder="Password" />

  <button>Log in</button>

  {#if form?.error}
    <p>{form.error}</p>
  {/if}
</form>
