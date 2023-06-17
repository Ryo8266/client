<template>
  <div
      v-if="isOpen"
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
          class="flex w-full min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
      >
        <div
            class="w-[1000px] h-full relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 p-6 "
        >

          <Form v-for="(item,index) in dataEditor" :key="index" :validation-schema="schema" @submit="upload">
            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label class="text-black dark:text-gray-200" for="username">Mã học sinh</label>
                <Field id="username" v-model="item.userName"
                       class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                       name="userName"
                       type="text"/>
                <ErrorMessage class="error-feedback" name="username"/>
              </div>
              <div>
                <label class="text-black dark:text-gray-200" for="password">Họ Tên</label>
                <Field id="password" v-model="item.fullName"
                       class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                       name="fullName"
                       type="text"/>
                <ErrorMessage class="error-feedback" name="fullName"/>
              </div>
              <div>
                <label class="text-black dark:text-gray-200" for="emailAddress">Email Address</label>
                <Field id="emailAddress" v-model="item.email"
                       class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                       name="email"
                       type="email"/>
                <ErrorMessage class="error-feedback" name="emailAddress"/>
              </div>
              <div>
                <label class="text-black dark:text-gray-200" for="password">Password</label>
                <Field v-model="item.hashedPassword"
                       class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                       name="hashedPassword"
                       type="password"/>
                <ErrorMessage class="error-feedback" name="password"/>
              </div>
              <div>
                <label class="text-black dark:text-gray-200" for="passwordConfirmation">Date</label>
                <Field v-model="item.Date"
                       class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                       name="date"
                       type="date"/>
                <ErrorMessage class="error-feedback" name="date"/>
              </div>
              <div>
                <label class="text-black dark:text-gray-200" for="passwordConfirmation">Giới Tinh</label>
                <Field v-model="item.sex" as="select"
                       class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                       name="sex">
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </Field>
                <ErrorMessage class="error-feedback" name="sex"/>
              </div>
              <div>
                <label class="text-black dark:text-gray-200" for="passwordConfirmation">Số Điện Thoại</label>
                <Field id="range" v-model="item.numberPhone"
                       class="block w-full py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                       name="numberPhone"
                       type="text"/>
                <ErrorMessage class="error-feedback" name="numberPhone"/>
              </div>

              <div>
                <label class="text-black dark:text-gray-200" for="passwordConfirmation">Địa Chỉ</label>
                <Field v-model="item.Address"
                       class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                       name="address"
                       type="text"></Field>
                <ErrorMessage class="error-feedback" name="address"/>
              </div>
              <div>
                <label class="text-black dark:text-gray-200" for="passwordConfirmation">Bộ môn giảng dạy</label>
                <Field as="select"
                       class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                       name="subjectTeacherName">
                  <option selected>Tất cả</option>
                  <option v-for="(item,index) in listSubject " :value="item.name">{{ item.name }}</option>
                </Field>
                <ErrorMessage class="error-feedback" name="className"/>
              </div>
            </div>
            <div v-if="this.isSuccess" class="mt-4 text-xl font-bold text-green-600">
              <h3 class="">Update Thanh Cong</h3>
            </div>
            <div class="flex justify-end mt-6 gap-6">
              <div
                  class="px-6 py-2 leading-5 text-white cursor-pointer transition-colors duration-200 transform bg-red-500 rounded-md hover:bg-red-700 focus:outline-none focus:bg-gray-600"
                  @click="$emit('close')">Đóng
              </div>
              <button
                  class="px-6 py-2 leading-5 text-white  transition-colors duration-200 transform bg-green-500 rounded-md hover:bg-green-700 focus:outline-none focus:bg-gray-600"
                  type="submit">
                Save
              </button>
            </div>
          </Form>
        </div>
        <div></div>
      </div>
    </div>

  </div>
</template>

<script>
import {ErrorMessage, Field, Form} from "vee-validate";
import {boolean} from "yup";
import ListClass from "@/api/listClass";
import UserService from "@/api/auth/user.service";

export default {
  name: "FormEditTeacher",
  components: {
    Field,
    Form,
    ErrorMessage
  },
  props: {
    dataEditor: Object,
    isOpen: boolean,
    listClass: [],
 listSubject: [],
  },
  data() {

    return {

      isSuccess: false,
    }
  },
  methods: {
    // changeValue(e) {
    //   if (e.target.value !== "") {
    //     ListClass.getListClassByName(e.target.value).then((res) => {
    //       this.class = res.data.classList[0].class;
    //
    //     })
    //   }
    // },
    upload(user,{ resetForm }) {
      resetForm();
      this.$emit('upload', user)

    }
  }


}
</script>

<style scoped>

</style>