<template>

  <div
      v-show="isActionDelete"
      aria-labelledby="modal-title"
      aria-modal="true"
      class="relative z-10"
      role="dialog"
  >
    <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
    ></div>
    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
      >
        <div
            class="w-full h-full relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
        >
          <div class="text-center">
            <h1 class="text-xl font-semibold text-red-600">
              Cảnh báo
            </h1>
            <p class="text-base mt-4 font-bold">
              Bạn có muốn xóa tài khoản
            </p>
          </div>

          <div
              v-if="!success"
              class=" bg-gray-50 px-4 py-2 sm:flex sm:flex-row-reverse sm:px-6"
          >
            <button
                class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                type="button"
                @click="$emit('delete')"
            >
              Deactivate
            </button>
            <button
                class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                type="button"
                @click="$emit('close')"
            >
              Cancel
            </button>
          </div>

        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import {boolean} from "yup";

export default {
  name: "ModalDelete",
  props: {
    isActionDelete: boolean
  }, methods: {
    delete() {
      this.$emit('delete');
    }
  }
}
</script>

<style scoped>

</style>