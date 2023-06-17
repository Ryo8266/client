<script >
import Navigation from '../components/Navigation.vue';
export default {
  name: 'DefaultLayout',
  components: {
    Navigation
  }
}


</script>

<template>
  <div class=" ">
    <Navigation />
    <main>
      <div class="relative md:ml-64 ">
        <div class=" md:px-[25px] mx-auto w-full  mt-4">
          <router-view />
        </div>
      </div>
    </main>
  </div>
</template>
