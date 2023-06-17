<template>
  <!-- component -->
  <div class="flex flex-col w-full">
    <div class=" sm:mx-0.5 lg:mx-0.5 w-full">
      <div class="py-2 inline-block w-full ">
        <div class=" w-full">
          <table class="text-left w-full">
            <thead class="bg-green-500 flex text-white w-full">
            <tr class="flex w-full ">
              <th v-for="(item,index) in dataHeader" :key="index" :class="this.width" class="p-4  text-center ">
                {{ item }}
              </th>
            </tr>
            </thead>
            <tbody class="bg-grey-light flex flex-col items-center  overflow-y-auto w-full">
            <tr v-for="(item,index) in subject" :key="index" class="flex w-full ">
              <td :class="this.bgGreen500"
                  class=" w-1/4 text-center flex items-center justify-center  font-medium text-base py-5 px-2  border-b border-l border-b-green-300"
              >
                {{ index + 1 }}
              </td>
              <td :class="this.bgWhite"
                  class=" w-1/4 text-center flex items-center justify-center  font-medium text-base py-5 px-2  border-b border-b-green-300">
                {{ item.name }}
              </td>
              <td :class="this.bgGreen500 "
                  class=" w-1/4 text-center flex items-center justify-center font-medium text-base py-5 px-2  border-b  border-b-green-300"
              >
                {{ item.Khoi || "" }}
              </td>
              <td :class="this.bgWhite"
                  class=" w-1/4 text-center flex justify-between border-r-green-300 border-r gap-4  font-medium text-base py-3 px-3  border-b  border-b-green-300"
              >
                <button
                    class="bg-blue-500 hover:bg-blue-600 hover:text-white w-1/2 font-bold py-2 px-4 border text-white border-none rounded"
                    @click="$emit('actionEdit',item.id)"
                >
                  Sửa
                </button>
                <button
                    class="bg-red-500 hover:bg-red-700 text-white w-1/2 font-bold py-2 px-4 border border-red-500 rounded"
                    @click="$emit('actionDelete',item.id)"
                >
                  Xóa
                </button>
              </td>
            </tr>
            </tbody>
            <tfoot>
            </tfoot>
          </table>
          <div class="mt-10 flex justify-center">
            <vue-awesome-paginate
                v-model="currentPage"
                :items-per-page="5"
                :max-pages-shown="5"
                :on-click="onClickHandler"
                :total-items="listSubject.length"
            />
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import {ref} from "vue";

export default {
  name: "TableSubject",
  components: {Pagination},
  data() {
    const currentPage = ref(1);
    return {
      width: this.dataHeader.length === 4 ? 'w-1/4' : 'w-1/3',
      bgWhite: 'bg-white text-green-500',
      bgGreen500: 'bg-green-400 text-white',
      currentPage
    }


  },
  props: {
    dataHeader: {
      type: Array,

    },
    listSubject: {
      type: Array,
    },
    subject: {
      type: Array,
    }
  },
  methods: {
    onClickHandler(page) {
      this.$emit('onClickHandler',page)
      console.log(page);
    }

  }
}
</script>
<style>
.pagination-container {
  display: flex;
  column-gap: 10px;
}

.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: rgb(242, 242, 242);
  border: 1px solid rgb(217, 217, 217);
  color: black;
}

.paginate-buttons:hover {
  background-color: #d8d8d8;
}

.active-page {
  background-color: #3498db;
  border: 1px solid #3498db;
  color: white;
}

.active-page:hover {
  background-color: #2988c8;
}
</style>