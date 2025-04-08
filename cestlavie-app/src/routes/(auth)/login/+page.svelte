<form method="POST" action="?/login">
  <fieldset class="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
    <legend class="fieldset-legend">Login</legend>
    
    <label class="fieldset-label">
      Email
      <input name="email" type="email" class="input" placeholder="Email" />
    </label>
    
    <label class="fieldset-label">
      Password
      <input name="password" type="password" class="input" placeholder="Password" />
    </label>

    <button class="btn btn-neutral mt-4">Login</button>
    <button formaction="?/signup">Sign up</button>
  </fieldset>
</form>
