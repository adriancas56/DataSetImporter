<template>
  <div class="flex">
    <SideBar/>
    <div class="flex flex-col grow">
      <Header/>
      <div class="bg-gray-200 p-6 h-full">
        <slot />
      </div>
      <Footer/>
    </div>
  </div>
</template>