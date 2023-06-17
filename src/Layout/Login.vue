<script>
import {Form, Field, ErrorMessage} from "vee-validate";
import * as yup from "yup";

export default {
    name: "LoginLayout",
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const schema = yup.object().shape({
            username: yup.string().required("Username is required!"),
            password: yup.string().required("Password is required!"),
        });

        return {
            loading: false,
            message: "",
            schema,
        };
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
    },
    created() {
        if (this.loggedIn) {
            this.$router.push("/");
        }
    },
    methods: {
        handleLogin(user) {
            this.loading = true;
            this.$store.dispatch("auth/login", user).then(
                () => {
                    this.$router.push("/");
                },
                (error) => {
                    this.loading = false;
                    console.error();
                    this.$notify({
                        type: "error",
                        title: "Thất Bại",
                        text: `${error.response.data}`,
                    });
                    this.message =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                }
            );
        },
    },

};

</script>
<template>
    <section class="flex flex-col md:flex-row h-screen items-center">
        <div class="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
            <img src="http://thcsthanhquan.hoankiem.edu.vn/upload/52785/20220208/logo_8882b96d6f.png" alt="" class="w-full h-full object-cover"/>
        </div>

        <div
                class="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
            <div class="w-full h-100">
                <h1 class="text-xl md:text-2xl font-bold leading-tight mt-12">
                    Log in to your account
                </h1>

                <Form class="mt-6" @submit="handleLogin" :validation-schema="schema">
                    <div>
                        <label class="block text-gray-700">Tài Khoản</label>
                        <Field name="username" type="email" id="" placeholder="Mật Tài Khoản"
                               class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                               autofocus autocomplete required/>
                    </div>

                    <div class="mt-4">
                        <label class="block text-gray-700">Mật Khẩu</label>
                        <Field type="password" name="password" id="" placeholder=" Nhập Mật Khẩu" minlength="6"
                               class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                               required/>
                    </div>

                    <div class="text-right mt-2">
                        <a href="#" class="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">Forgot
                            Password?</a>
                    </div>

                    <button type="submit"
                            class="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg px-4 py-3 mt-6">
                        Log In
                    </button>
                </Form>

                <hr class="my-6 border-gray-300 w-full"/>

              

              
            </div>
        </div>
    </section>
</template>
