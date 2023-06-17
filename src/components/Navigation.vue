<template>
    <div class="sidebar">
        <img src="http://thcsthanhquan.hoankiem.edu.vn/upload/52785/20220208/logo_8882b96d6f.png" class="w-[100px] m-auto my-4">
        <el-menu default-active class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router>
            <el-sub-menu index="1" v-if="roles == 'admin'">
                <template #title>
                    <el-icon>
                        <Suitcase/>
                    </el-icon>
                    <span>Giáo Viên</span>
                </template>
                <el-menu-item-group index="1">
                    <el-menu-item index="/bo-mon-giang-day" @click="setActiveLink('/bo-mon-giang-day')"
                                  :class="activeLink === '/bo-mon-giang-day' ? 'active' : ''">
                        <el-icon :size="10">
                            <SemiSelect/>
                        </el-icon>
                        Danh Sách Bộ Môn
                    </el-menu-item>
                    <el-menu-item index="/quan-ly-giao-vien" @click="setActiveLink('/quan-ly-giao-vien')"
                                  :class="activeLink === '/quan-ly-giao-vien' ? 'active' : ''">
                        <el-icon :size="10">
                            <SemiSelect/>
                        </el-icon>
                        Danh Sách Giáo viên
                    </el-menu-item>
                    <el-menu-item index="/lich-giang-day" @click="setActiveLink('/lich-giang-day')"
                                  :class="activeLink === '/lich-giang-day' ? 'active' : ''">
                        <el-icon :size="10">
                            <SemiSelect/>
                        </el-icon>
                        Lịch Giảng Dạy
                    </el-menu-item>
                    <el-menu-item index="/cham-diem" @click="setActiveLink('/cham-diem')"
                                  :class="activeLink === '/cham-diem' ? 'active' : ''">
                        <el-icon :size="10">
                            <SemiSelect/>
                        </el-icon>
                        Chấm Điểm
                    </el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="2" v-if="roles === 'admin'">
                <template #title>
                    <el-icon>
                        <Collection/>
                    </el-icon>
                    <span>Học Sinh</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/quan-ly-lop-hoc" @click="setActiveLink('/quan-ly-lop-hoc')"
                                  :class="activeLink === '/quan-ly-lop-hoc' ? 'active' : ''">
                        <el-icon :size="10">
                            <SemiSelect/>
                        </el-icon>
                        Danh Sách Lớp Học
                    </el-menu-item>
                    <el-menu-item index="/quan-ly-hoc-sinh" @click="setActiveLink('/quan-ly-hoc-sinh')"
                                  :class="activeLink === '/quan-ly-hoc-sinh' ? 'active' : ''">
                        <el-icon :size="10">
                            <SemiSelect/>
                        </el-icon>
                        Danh Sách Học Sinh
                    </el-menu-item>
                    <el-menu-item index="/quan-ly-mon-hoc" @click="setActiveLink('/quan-ly-mon-hoc')"
                                  :class="activeLink === '/quan-ly-mon-hoc' ? 'active' : ''">
                        <el-icon :size="10">
                            <SemiSelect/>
                        </el-icon>
                        Quản Lý Môn Học
                    </el-menu-item>
                    <el-menu-item index="/nam-hoc" @click="setActiveLink('/nam-hoc')"
                                  :class="activeLink === '/nam-hoc' ? 'active' : ''">
                        <el-icon :size="10">
                            <SemiSelect/>
                        </el-icon>
                        Năm học
                    </el-menu-item>
                    <el-menu-item index="/thoi-khoa-bieu" @click="setActiveLink('/thoi-khoa-bieu')"
                                  :class="activeLink === '/thoi-khoa-bieu' ? 'active' : ''">
                        <el-icon :size="10">
                            <SemiSelect/>
                        </el-icon>
                        Thời Khóa Biểu
                    </el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>

            <el-menu-item index="/thoi-khoa-bieu/hs" @click="setActiveLink('/thoi-khoa-bieu/hs')"
                          :class="activeLink === '/quan-ly-lop-hoc' ? 'active' : ''" v-if="roles == 'hs'">
                <el-icon :size="10">
                    <SemiSelect/>
                </el-icon>
                Thời Khóa Biểu
            </el-menu-item>

            <el-menu-item index="/bang-diem" @click="setActiveLink('/bang-diem')"
                          :class="activeLink === '/bang-diem' ? 'active' : ''" v-if="roles == 'hs'">
                <el-icon :size="10">
                    <SemiSelect/>
                </el-icon>
                Bảng Điểm
            </el-menu-item>
            <el-menu-item index="/lich-day" @click="setActiveLink('/lich-day')"
                          :class="activeLink === '/lich-day' ? 'active' : ''" v-if="roles == 'gv'">

                <el-icon :size="10">
                    <SemiSelect/>
                </el-icon>
                Lịch Giảng Dạy

            </el-menu-item>
            <el-menu-item index="/cham-diem" @click="setActiveLink('/cham-diem')"
                          :class="activeLink === '/cham-diem' ? 'active' : '' " v-if="roles == 'gv'">
                <el-icon :size="10">
                    <SemiSelect/>
                </el-icon>
                Chấm Điểm
            </el-menu-item>
            <!-- <el-menu-item index="4">
                <el-icon><setting /></el-icon>
                <span>Navigator Four</span>
              </el-menu-item> -->
        </el-menu>
    </div>
    <div>
        <el-header style="text-align: right; font-size: 12px">
            <div class="toolbar">
                <el-dropdown>
                    <el-avatar :size="40" :src="circleUrl" class="mt-[13px]"/>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item >
                                <router-link to="/">
                                    Thông Tin Tài Khoản
                                </router-link>
                            </el-dropdown-item>
                           
                            <el-dropdown-item @click="logOut">Đăng Xuất</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>

            </div>
        </el-header>
    </div>
</template>


<script>

export default {
    name: "Navigation",
    components: {},
    created() {
        this.setActiveLink(window.location.pathname);
        this.roles = this.$store.state.auth.user.role;
    },
    data() {
        return {
            activeLink: '',
            roles: '',
        };
    },
    methods: {
        setActiveLink(link) {
            this.activeLink = link;
        },
        logOut() {
            localStorage.clear();
            this.$router.push("/");
        }
    }
};
</script>
<style scoped>.sidebar {
    width: 249px;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #ffffff;
    overflow-y: auto;
    box-shadow: 0 2px 4px rgba(15, 34, 58, .12);
    z-index: 999;
}

.active {
    background-color: #409EFF !important;
    color: #FFFFFF !important;
}

.el-header {
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(15, 34, 58, .12);
    color: #333;
    line-height: 60px;
    height: 70px;

}</style>