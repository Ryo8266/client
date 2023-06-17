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

            <tbody class="bg-grey-light flex flex-col items-center  overflow-y-auto w-full"
                 >
            <tr v-for="(item,index) in classes" :key="index" class="flex w-full ">
              <td :class="this.width , this.bgGreen500"
                  class=" text-center  font-medium text-base py-5 px-2  border-b border-l border-b-green-300"
              >
                {{ index + 1 }}
              </td>
              <td :class="this.width , this.bgWhite"
                  class="  text-center  font-medium text-base py-5 px-2  border-b border-b-green-300">
                {{ item.name }}
              </td>
              <td v-if="typeAccount ==='hs' || typeAccount ==='monHoc'"
                  :class="this.width ,  this.bgGreen500 "
                  class=" text-center  font-medium text-base py-5 px-2  border-b  border-b-green-300"
              >
                {{ item.Khoi || "" }}
              </td>
              <td v-if="typeAccount ==='hs' || typeAccount ==='gv'"
                  :class="this.width ,  this.dataHeader.length%2===0 ? this.bgWhite :this.bgGreen500"
                  class=" text-center    font-medium text-base py-5 px-2 border-b border-r border-r-green-300 border-b-green-300"
              >
                {{ typeAccount === 'hs' ? item.student.length : item.teachers.length }}
              </td>
            </tr>
            </tbody>
          </table>
          <div class="flex justify-center mt-10">
            <vue-awesome-paginate
                v-model="currentPage"
                :items-per-page="10"
                :max-pages-shown="10"
                :on-click="onClickHandler"
                :total-items="40"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  name: "TableClass",
  props: {
    dataHeader: {
      type: Array,

    },
    listClass: {
      type: Array,
    },
    typeAccount: {
      type: String,
    },
    classes: {
      type: Array
    }
  },
  data() {
    const currentPage = ref(1);
    const totalItems = this.listClass.length;

    return {
      width: this.dataHeader.length === 4 ? 'w-1/4' : 'w-1/3',
      bgGreen500: 'bg-green-400 text-white',
      bgWhite: 'bg-white text-green-500',
      currentPage,
      totalItems
    }
  },
  methods: {
    onClickHandler(page) {
      this.$emit('onClickHandler', page)
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