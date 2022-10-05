<template>
  <div class="flex">
    <SideBar/>
    <div class="flex flex-col grow">
      <Header/>
      <div class="bg-gray-200 px-16 py-8 h-full">
        <slot />
      </div>
      <Footer/>
    </div>
  </div>
</template>