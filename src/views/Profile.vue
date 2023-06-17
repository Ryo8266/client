<template lang="">
  <div class="container mx-auto px-4 mt-[400px]">
    <div
      class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64"
    >
      <div class="px-6">
        <div class="flex flex-wrap justify-center">
          <div class="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
            <div class="relative">
              <img
              :src="user.avatar=='' ? '/src/assets/avatarDefault.jpg':'http://localhost:4000/users/img/'+user.avatar" alt=""
                class="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
              />
            </div>
          </div>
          <div
            class="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center"
          >
            <div class="py-6 px-3 mt-32 sm:mt-0">
              <button
                class="bg-[rgba(51,65,85,1)] active:bg-blueGray-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                type="button"
                @click="this.isShow = true"
              >
              Đổi Mật Khâu
              </button>
            </div>
          </div>
          <div class="w-full lg:w-4/12 px-4 lg:order-1">
            <div class="flex justify-center py-4 lg:pt-4 pt-8">
              

            </div>
          </div>
        </div>
        <div class="text-center mt-1">
          <div
            class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase"
          >
            <i class="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
 
           <div class="flex-1 bg-white rounded-lg shadow-xl p-8">
                    <h4 class="text-xl text-gray-900 font-bold">{{
    this.user.fullName
  }}</h4>
                      <ul class="mt-2 text-gray-700">
                        <li class="flex border-b py-2 w-full">
                              <span class="font-bold  w-44 text-left ">Mã Người Dùng:</span>
                              <span class="text-gray-700">{{
    this.user.userName
  }}</span>
                          </li>
                          <li class="flex border-y py-2 w-full">
                              <span class="font-bold  w-44 text-left ">Email:</span>
                              <span class="text-gray-700">{{
    this.user.email
  }}</span>
                          </li>
                          <li class="flex border-b py-2 w-full">
                              <span class="font-bold w-44 text-left ">Giới tính:</span>
                              <span class="text-gray-700">{{
    this.user.sex
  }}</span>
                          </li>
                          <li class="flex border-b py-2 w-60 text-left w-full">
                              <span class="font-bold w-24">Ngày sinh:</span>
                              <span class="text-gray-700">{{
    this.user.date
  }}</span>
                          </li>
                          <li class="flex border-b py-2 w-60 text-left w-full">
                              <span class="font-bold w-24">Địa chỉ:</span>
                              <span class="text-gray-700">{{
    user.Address
  }}</span>
                          </li>
                          <li class="flex border-b py-2 w-60 text-left w-full">
                              <span class="font-bold w-44">Số điện thoại:</span>
                              <span class="text-gray-700">{{
    this.user.numberPhone
  }}</span>
                          </li>
                          <li class="flex border-b py-2 w-60 text-left w-full">
                              <span class="font-bold w-44">Lớp:</span>
                              <span class="text-gray-700">{{
    this.user.className
  }}</span>
                          </li>

                      </ul>
                  </div>
            </div>

          </div>
          <div class="mt-10 py-10 border-t border-blueGray-200 text-center">
            <div class="flex flex-wrap justify-center">
              <div class="w-full lg:w-9/12 px-4">
              </div>
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <FromChangePassword @close="closeToggle" :isShow="this.isShow" :userName="this.$store.state.auth.user"/>
    </div>




</template>
<script>
import userService from '../api/auth/user.service';
import FromChangePassword from '../components/FormChangePassword.vue';

export default {
    name: 'ProFile',
    components: {
        FromChangePassword,
    },
    data() {
        return {
            isShow: false,
            user: [],
            fileInput: null
        }
    },

    computed: {},
    methods: {
        closeToggle() {
            this.isShow = false
        },

        onUpLoad() {
            console.log(this.$refs.fileInput.value)
            console.log()
            const fd = new FormData()
            fd.append('file', this.$refs.fileInput.files[0])
            console.log(fd.getAll('file'))
            // userService.updateAvatar(this.$store.state.auth.user, this.$refs.fileInput.files[0])
        }
    },
    mounted() {
        userService.getUser(this.$store.state.auth.user).then(
            res => {
                this.user = res.data.user
                console.log(this.user);
                localStorage.setItem('subjectTeacherName', this.user.subjectTeacherName)

            }, error => {
                this.user =
                    (error.res && error.res.data) ||
                    error.message ||
                    error.toString();
            }
        )

    }
};
</script>
<style lang=""></style>
