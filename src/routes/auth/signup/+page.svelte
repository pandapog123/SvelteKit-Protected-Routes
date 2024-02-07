<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData, PageData } from "./$types";

  export let form: ActionData;
</script>

<h1>Sign up</h1>

<form method="post" use:enhance>
  <input type="text" name="name" placeholder="Name" />
  <input type="email" name="email" placeholder="E-mail" />
  <input type="password" name="password" placeholder="Password" />

  <button>Sign up</button>

  {#if form?.error}
    <p>{form.error}</p>
  {/if}
</form>
