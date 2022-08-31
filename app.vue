<template>
        <NuxtLayout>
                <nav>
                        <NuxtLink to="/">Home</NuxtLink>
                        <NuxtLink to="/login">Login</NuxtLink>
                        <NuxtLink to="/logout">Logout</NuxtLink>
                        <NuxtLink to="/register">Register</NuxtLink>
                </nav>
                <NuxtPage/>
                <template #footer>
                        This is the footer
                </template>
        </NuxtLayout>
</template>
