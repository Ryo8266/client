<script>
import TablePreview from "./TableData/TablePreview.vue";

import { boolean } from "yup";
import userService from "../api/auth/user.service";

export default {
  name: "ExcelTable",
  components: {

    TablePreview
  },
  props: {
    dataRow: [],
    isOpen: boolean,
    account:{
      type:String
    },

  },
  data() {
    return {
      previewData: [],
      dataHeader: [],
      success: false

    };
  },
  methods: {
    previewTable(e) {
      userService.uploadExcel(e.target.files[0]).then((res) => {
        this.previewData = res.data.result;
        this.dataHeader = Object.keys(this.previewData[0])
      });

    },
    importExcel() {
      // if( this.account  ==='hs'){
      //   userService.importExcel(this.previewData).then(res => {
      //     this.success = true
      //   })
      // }else {
      //   userService.importExcelTeacher(this.previewData).then(res => {
      //     this.success = true
      //   })
      // }
console.log(this.previewData)
    this.$emit('importExcel',this.previewData)
    }
  },
};
</script>
<template lang="">
  <div
    class="relative z-10"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
    v-show="isOpen"
  >
    <div
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
    ></div>
    {{account}}1111111111
    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div
        class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
      >
        <div
          class=" p-5 h-full relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8" :class="this.success == true ? '!w-[500px] !h-[500px]':''"
        >
          <div class="flex items-center  justify-center w-full">
            <label
              for="dropzone-file"
              class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  class="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span class="font-semibold">Click to upload</span> or drag and
                  drop
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                class="hidden"
                @change="previewTable"
              />
            </label>
          </div>
          <div v-if="this.previewData.length  != 0 && this.success == false"  class="mt-5" >
            <TablePreview :headerTable="this.dataHeader" :dataPreview="this.previewData"/>
          </div>

          <div
          v-if="this.previewData.length  != 0 && this.success == false"  
            class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
          >
            <button
              type="button"
              class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              @click="importExcel"
            >
              Deactivate
            </button>
            <button
              @click="$emit('close')"
              type="button"
              class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            >
              Cancel
            </button>
          </div>
          <div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<style lang=""></style>
