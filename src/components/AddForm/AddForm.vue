<script>
import { boolean } from "yup";
import ListClass from "../../api/listClass";
import AuthService from "../../api/auth/auth.service";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  name: "AddForm",
  props: {
    isOpen: boolean,
    listClass: [],
  },
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required("Username is required!"),
      password: yup.string().required("Password is required!"),
      email: yup.string().email().required("Email is required!"),
      address: yup.string().required("Adress is required!"),
      numberPhone: yup.string().required("Number Phone is required!"),
      date: yup.string().required("date is required!"),
      sex: yup.string().required("date is required!"),
      className: yup.string().required("date is required!"),
      fullName: yup.string().required("date is required!"),
    });

    return {
      nameClass: "",
      class: [],
      loading: false,
      schema
    };
  },
  methods: {
    changeValue(e) {
      if (e.target.value !== "") {
        ListClass.getListClassByName(e.target.value).then((res) => {
          this.class = res.data.classList[0].class;
        });
      }
    },
    getValueSex(e) {
      this.data.sex = e.target.value;
    },
    getValueClass(e) {
      this.data.className = e.target.value;
    },
    register(user,{ resetForm }) {

      resetForm()
      this.$emit('register',user)
    },
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
    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div
        class="flex w-full min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
      >
        <div
          class="w-[1000px] h-full relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 p-6 "
        >
    
        <Form @submit="register"  :validation-schema="schema">
            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <div>
                    <label class="text-black dark:text-gray-200" for="username">Mã học sinh</label>
                    <Field id="username" name="username"  type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                    <ErrorMessage name="username" class="error-feedback" />
                </div>
                <div>
                    <label class="text-black dark:text-gray-200" for="password">Họ Tên</label>
                    <Field id="password" name="fullName" type="text"  class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                    <ErrorMessage name="fullName" class="error-feedback" />
                  </div>
                <div>
                    <label class="text-black dark:text-gray-200" for="emailAddress">Email Address</label>
                    <Field id="emailAddress" name="email" type="email" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                    <ErrorMessage name="emailAddress" class="error-feedback" />
                  </div>
                <div>
                    <label class="text-black dark:text-gray-200" for="password">Password</label>
                    <Field name="password" type="password" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                    <ErrorMessage name="password" class="error-feedback" />
                  </div>
                <div>
                    <label  class="text-black dark:text-gray-200" for="passwordConfirmation">Date</label>
                    <Field name="date" type="date"  class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                    <ErrorMessage name="date" class="error-feedback" />
                  </div>
                <div>
                    <label  class="text-black dark:text-gray-200" for="passwordConfirmation">Giới Tinh</label>
                    <Field name="sex" as="select" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                    </Field>
                    <ErrorMessage name="sex" class="error-feedback" />
                </div>
                <div>
                    <label class="text-black dark:text-gray-200" for="passwordConfirmation">Số Điện Thoại</label>
                    <Field  name="numberPhone" id="range" type="text" class="block w-full py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                    <ErrorMessage name="numberPhone" class="error-feedback" />
                  </div>
                <div>
                  <label class="text-black dark:text-gray-200" for="passwordConfirmation">Khối</label>
                    <select @change="changeValue" name="" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                      <option selected>Chọn khối</option>
                      <option v-for="(item,index) in listClass " :value="item.name">{{item.name}}</option>
                    </select>
                </div>
                <div>
                    <label class="text-black dark:text-gray-200" for="passwordConfirmation">Địa Chỉ</label>
                    <Field  name="address" type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"></Field>
                    <ErrorMessage name="address" class="error-feedback" />
                  </div>
                <div>
                  <label class="text-black dark:text-gray-200" for="passwordConfirmation">Lớp</label>
                    <Field  as="select"  name="className" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                      <option selected>Chọn Lớp</option>
                      <option v-for="(item,index) in   this.class " :value="item.name">{{item.name}}</option>
                    </Field>
                    <ErrorMessage name="className" class="error-feedback" />
                  </div>
            </div>

            <div class="flex justify-end mt-6 gap-6">
                <button :disabled="loading" class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-red-500 rounded-md hover:bg-red-700 focus:outline-none focus:bg-gray-600" @click="$emit('close')">Đóng</button>
                <button class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-green-500 rounded-md hover:bg-green-700 focus:outline-none focus:bg-gray-600" >Save</button>
            </div>
        </Form>
       
          <!-- <div>
            <div
              class="w-[100px] absolute left-1/2 right-1/2 top-[50%]" v-if="success"
              style="transform: translate(-50%, -50%)"
            >
              <img src="../assets/Success-PNG-Image.png"  />
              <p class="text-center mt-4 text-green-500"> Đổi Mật Khẩu Thành Công</p>
              <button @click="$emit('close')" class="border-[1px] border-green-500 py-3 px-5 mt-4 rounded-[50px] hover:bg-green-500 hover:text-white">
                Quay lại
              </button>
            </div>
           
          </div> -->
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<style lang=""></style>
