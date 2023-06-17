import {createRouter, createWebHistory} from 'vue-router'
import DefaultLayout from '../Layout/DefaultLayout.vue'
import Login from '../Layout/Login.vue'
import store from "@/store";

const routes = [
    {
        path: '/',
        name: 'home',
        component: DefaultLayout,
        meta: {
            layout: 'DefaultLayout',
        },
        children: [
            {
                name: 'DanhSachLopHoc',
                path: '/quan-ly-lop-hoc',
                component: () => import('../views/DanhSachLopHoc.vue'),
                beforeEnter(to, from, next) {
                    if (store.state.auth.user.role === 'admin') {
                        next()
                        console.log(store.state.auth.user.role)
                    } else {
                        next(false)
                    }
                }
            },
            {
                name: 'QuanLyHocSinh',
                path: '/quan-ly-hoc-sinh',
                component: () => import('../views/QuanLyHocSinh.vue'),
                beforeEnter(to, from, next) {
                    if (store.state.auth.user.role === 'admin') {
                        next()
                        console.log(store.state.auth.user.role)
                    } else {
                        next(false)
                    }
                }
            },
            {
                name: 'QuanLyGiaoVien',
                path: '/quan-ly-giao-vien',
                component: () => import('../views/QuanLyGiaoVien.vue'),
                beforeEnter(to, from, next) {
                    if (store.state.auth.user.role === 'admin') {
                        next()
                        console.log(store.state.auth.user.role)
                    } else {
                        next(false)
                    }
                }

            },
            {
                name: 'Score',
                path: '/cham-diem',
                component: () => import('../views/Score.vue'),
                beforeEnter(to, from, next) {
                    if (store.state.auth.user.role === 'admin' || store.state.auth.user.role === 'gv') {
                        next()
                        console.log(store.state.auth.user.role)
                    } else {
                        next(false)
                    }
                }

            },
            {
                name: 'ScoreListStudent',
                path: '/cham-diem/:id',
                component: () => import('../views/ListStudent.vue'),
                beforeEnter(to, from, next) {
                    if (store.state.auth.user.role === 'admin' || store.state.auth.user.role === 'gv') {
                        next()
                        console.log(store.state.auth.user.role)
                    } else {
                        next(false)
                    }
                }

            },
            {
                name: 'BangDiemHocSinh',
                path: '/bang-diem',
                component: () => import('../views/BangDiemHocSinh.vue'),
                beforeEnter(to, from, next) {
                    if (store.state.auth.user.role === 'hs') {
                        next()
                        console.log(store.state.auth.user.role)
                    } else {
                        next(false)
                    }
                }

            },
            {
                name: 'BoMonGiangDay',
                path: '/bo-mon-giang-day',
                component: () => import('../views/QuanLyBoMon.vue'),
                beforeEnter(to, from, next) {
                    if (store.state.auth.user.role === 'admin') {
                        next()
                        console.log(store.state.auth.user.role)
                    } else {
                        next(false)
                    }
                }
            },
            {
                name: 'QuanLyMonHoc',
                path: '/quan-ly-mon-hoc',
                component: () => import('../views/QuanLyMonHoc.vue'),
                beforeEnter(to, from, next) {
                    if (store.state.auth.user.role === 'admin') {
                        next()
                        console.log(store.state.auth.user.role)
                    } else {
                        next(false)
                    }
                }
            },
            {
                name: 'Year',
                path: '/nam-hoc',
                component: () => import('../views/Year.vue'),
                beforeEnter(to, from, next) {
                    if (store.state.auth.user.role === 'admin') {
                        next()
                        console.log(store.state.auth.user.role)
                    } else {
                        next(false)
                    }
                }
            }, {
                name: 'ThoiKhoaBieu',
                path: '/thoi-khoa-bieu',
                component: () => import('../views/ThoiKhoaBieu.vue'),
                beforeEnter(to, from, next) {
                    if (store.state.auth.user.role === 'admin') {
                        next()
                        console.log(store.state.auth.user.role)
                    } else {
                        next(false)
                    }
                }
            }, {
                name: 'ThoiKhoaBieuHs',
                path: '/thoi-khoa-bieu/hs',
                component: () => import('../views/ThoiKhoaBieuHs.vue'),
                beforeEnter(to, from, next) {
                    if (store.state.auth.user.role === 'hs') {
                        next()
                        console.log(store.state.auth.user.role)
                    } else {
                        next(false)
                    }
                }
            }, {
                name: 'LichDayGiaoVien',
                path: '/lich-day',
                component: () => import('../views/LichDayGiaoVien.vue'),
                beforeEnter(to, from, next) {
                    if (store.state.auth.user.role === 'gv') {
                        next()
                        console.log(store.state.auth.user.role)
                    } else {
                        next(false)
                    }
                }
            }, {
                name: 'LichGiangDay',
                path: '/lich-giang-day',
                component: () => import('../views/ThoiKhoaBieuGiaoVien.vue'),
                beforeEnter(to, from, next) {
                    if (store.state.auth.user.role === 'admin') {
                        next()
                        console.log(store.state.auth.user.role)
                    } else {
                        next(false)
                    }
                }
            },
            {
                name: 'profile',
                path: '',
                component: () => import('../views/Profile.vue')
            },

        ]


    },
    {
        name: 'Login',
        path: '/login',
        component: Login,
        meta: {
            layout: 'Login',
        },
    },
]
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})
router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/home'];
    const requireRole = to.meta.requireRole;
    let userRole;
    console.log('userRole', userRole)
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');
    if (authRequired && !loggedIn) {
        next('/login');
    } else {
        next();
        userRole = store.state.auth.user.role;
    }
});

export default router
