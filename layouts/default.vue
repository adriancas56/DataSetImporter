<template>
  <div>
    <nav>
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/logout">Logout</NuxtLink>
        <NuxtLink to="/register">Register</NuxtLink>
        <NuxtLink to="/categories">Categories</NuxtLink>
        <NuxtLink to="/category">Category</NuxtLink>
    </nav>
    <slot />
  </div>
</template>