<script lang="ts">
  import { enhance } from "$app/forms";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<h1>Welcome back, {data.user.name}</h1>

<p>User data:</p>

<pre>
  {JSON.stringify(data.user, null, 4)}
</pre>

<form action="/account?/logout" method="post" use:enhance>
  <button>Log out</button>
</form>
