<template>
  <div class="flex">
    <SideBar/>
    <main>
      <Header/>
      <div class="bg-gray-200 p-6">
        <slot />
      </div>
      <Footer/>
    </main>
  </div>
</template>