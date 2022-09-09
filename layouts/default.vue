<template>
  <div>
    <nav>
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/categories">Categories</NuxtLink>
        <NuxtLink to="/importer">Importer</NuxtLink>
        <NuxtLink to="/diagnostics">Diagnostics</NuxtLink>
        <NuxtLink to="/user">Profile</NuxtLink>
        <NuxtLink to="/user/logout">Logout</NuxtLink>
    </nav>
    <slot />
  </div>
</template>