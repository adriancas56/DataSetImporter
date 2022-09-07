<template>
  <div>
    <nav>
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/users">Users</NuxtLink>
        <NuxtLink to="/categories">Categories</NuxtLink>
        <NuxtLink to="/importer">Importer</NuxtLink>
        <NuxtLink to="/diagnostics">Diagnostics</NuxtLink>
    </nav>
    <slot />
  </div>
</template>