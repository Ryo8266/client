<template>

  <div class="flex justify-center mt-10">
    <div>
      <nav aria-label="Page navigation example">
        <ul class="list-style-none mb-6 flex">
          <li>
            <a
                class="pointer-events-none relative block rounded bg-transparent py-1.5 px-3 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400"
            >Previous</a
            >
          </li>
          <li v-for=" index in  10 ">
            <router-link :to="'?page='+index">
              <div>
                <a class="relative block rounded bg-transparent py-1.5 px-3 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100  dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                >{{index}}</a>
              </div>
            </router-link>

          </li>
          <li>
            <a
                class="relative block rounded bg-transparent py-1.5 px-3 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                href="#!"
            >Next</a
            >
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pagination"
}
</script>

<style scoped>
.router-link-active .router-link-exact-active div{
  background-color: green;
}
</style>