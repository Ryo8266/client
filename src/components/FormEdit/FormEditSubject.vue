<template>
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
    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div
          class="flex w-full min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
      >
        <div
            class="w-[1000px] h-full relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 p-6 "
            :class="this.succees == true ? 'h-[500px]':''"
        >
          <h1>Sửa Thông Tin </h1>
          <Form @submit="upload"    :class="this.succees == true ? 'hidden':'' ">
            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label class="text-black dark:text-gray-200" for="username">Tên Môn Học</label>
                <Field id="username" name="name" v-model="dataEditor.name"  type="text" class="block  h-[42px] w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                <ErrorMessage name="username" class="error-feedback" />
              </div>

              <div>
                <label class="text-black dark:text-gray-200" for="passwordConfirmation">Khối</label>
                <Field v-model="dataEditor.Khoi"  as="select"  name="Khoi" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                  <option selected>Chọn Khối</option>
                  <option v-for="(item,index) in  listKhoi " :value="item.name">{{item.name}}</option>
                </Field>
                <ErrorMessage name="khoi" class="error-feedback" />
              </div>
            </div>
            <div class="flex justify-end mt-6 gap-6">
              <div :disabled="loading" class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-red-500 rounded-md hover:bg-red-700 focus:outline-none focus:bg-gray-600" @click="$emit('close')">Đóng</div>
              <button class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-green-500 rounded-md hover:bg-green-700 focus:outline-none focus:bg-gray-600" >Save</button>
            </div>
          </Form>
        </div>

        <div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {boolean} from "yup";
import {ErrorMessage, Field, Form} from "vee-validate";

export default {
  name: "FormEditSubject",
  props:{
    isOpen:{
      type: boolean,
    },
    dataEditor:{
      type: Array,
    },listKhoi: Array
  },
  components: {
    Field,
    Form,
    ErrorMessage
  },
  methods:{
    upload(data,id ){

      this.$emit('update',data)
    }
  }
}
</script>

<style scoped>

</style>