<script lang="ts">
  import "$lib/main.css";
</script>

<div class="container">
  <main>
    <slot />
  </main>

  <footer>
    <a href="/">Home</a>
    <a href="/auth/signup">Sign up</a>
    <a href="/auth/login">Log in</a>
    <a href="/account">Account</a>
  </footer>
</div>

<style>
  .container {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem;
  }

  footer {
    display: flex;
    gap: 1rem;
  }
</style>
