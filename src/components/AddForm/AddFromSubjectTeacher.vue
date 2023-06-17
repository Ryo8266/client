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

        >
          <Form @submit="create"  :validation-schema="schema" >
            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-1">
              <div>
                <label class="text-black dark:text-gray-200" for="username">Tên bộ môn</label>
                <Field id="username" name="name"  type="text" class="block w-full h-[52px] px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                <ErrorMessage name="username" class="error-feedback" />
              </div>
            </div>
            <div class="flex justify-end mt-6 gap-6">
              <div  class="px-6 py-2 leading-5 text-white cursor-pointer transition-colors duration-200 transform bg-red-500 rounded-md hover:bg-red-700 focus:outline-none focus:bg-gray-600" @click="$emit('close')">Đóng</div>
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
import {ErrorMessage, Field, Form} from "vee-validate";
import * as yup from "yup";
export default {
  name: "AddFromSubjectTeacher",
  props:{
    isOpen: false,
  },
  components:{
    ErrorMessage,
    Field,
    Form,
  },
  data() {
    const schema = yup.object().shape({
      name: yup.string().required("Username is required!"),
    });
    return{
      schema
    }
  },
  methods:{
    create(user,{ resetForm }) {
      this.$emit('success',user)
      console.log(user)
      resetForm();
    },
  }
}
</script>

<style scoped>

</style>