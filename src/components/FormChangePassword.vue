<script>
import { boolean, ref } from "yup";
import userService from "../api/auth/user.service";
export default {
  name: "FromChangePassword",
  props: {
    isShow: boolean,
    userName: String,
  },
  data() {
    const error = ref < boolean > (false)
    return {
      data: {
        oldPassword: "",
        newPassword: "",
      },
      error,
      success: false,
    };
  },
  methods: {
    getPassWord() {
      if (this.data.newPassword != this.data.oldPassword) {
        this.error = true

      } else {
        userService.changePassword(this.userName.data, this.data).then(() => {
          this.success = true
        })
      }
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
    v-show="this.isShow"
  >
    <div
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
    ></div>
    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div
        class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
      >
        <div
          class="w-[512px] h-[320px] relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
        >
          <form  v-if="!success" class=" px-4 my-5">
            <div class="mx-auto max-w-lg">
              <div class="text-xl font-bold flex justify-center">
                <h1>Đổi Mật Khẩu</h1>
              </div>
              <div class="py-2">
                <span class="px-1 text-sm text-gray-600">Mật khẩu mới</span>
                <input
                  v-model="data.oldPassword"
                  placeholder="Nhập mật khẩu mới"
                  type="password"
                  class="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                />
              </div>
              <div class="py-2" x-data="{ show: true }">
                <span class="px-1 text-sm text-gray-600"
                  >Nhập lại mật khẩu</span
                >
                <div class="relative">
                  <input
                    v-model="data.newPassword"
                    placeholder="Nhập lại mật khẩu mới"
                    type="password"
                    class="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                  />
                  <div
                    class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  >
                    <svg
                      class="h-6 text-gray-700"
                      fill="none"
                      @click="show = !show"
                      :class="{ hidden: !show, block: show }"
                      xmlns="http://www.w3.org/2000/svg"
                      viewbox="0 0 576 512"
                    >
                      <path
                        fill="currentColor"
                        d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div classs="mx-4 w-full" v-show="error">
            <p class="px-4 text-red-600">Mật Khẩu Không Trùng Nhau</p>
          </div>
             
          <div
          v-if="!success"
            class=" bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
          >
            <button
              type="button"
              class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue  -500 sm:ml-3 sm:w-auto"
              @click="getPassWord()"
            >
              Đổi Mật Khẩu
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
           
          </div>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>
