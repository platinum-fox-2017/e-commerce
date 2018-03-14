<template>

   <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
  <!-- Brand -->
  <a class="navbar-brand" href="#">Eng-Commerce</a>

  <!-- Links -->
  <ul class="navbar-nav">
    <!-- Dropdown -->
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
        Products
      </a>
      <div class="dropdown-menu">
        <a class="dropdown-item" href="#">Engineering Tools</a>
        <a class="dropdown-item" href="#">Woodworking Tools</a>
        <a class="dropdown-item" href="#">Engineering Service</a>
      </div>
    </li>
  </ul>
</nav>
</template>

<script>
export default {
  props: ['total']
}
</script>
