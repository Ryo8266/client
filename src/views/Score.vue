<template>
    <div class="">
        <h1 class="text-3xl font-bold mb-10">Quản Lý Điểm</h1>
        <div class="flex justify-between mb-5"></div>
        <div class="">
            <div class="bg-white p-4">
                <div class="flex justify-between mb-4">
                    <h1 class="text-xl font-bold">Danh Sách Lớp Học</h1>
                    <div>
                        
                    </div>
                </div>
                <h2>Lọc Theo Khối</h2>
                <el-select v-model="filterValue" placeholder="Chọn Khối">
                    <el-option label="Tất cả" value=""></el-option>
                    <el-option
                            label="6"
                            value="6"
                    ></el-option>
                    <el-option
                            label="7"
                            value="7"
                    ></el-option>
                    <el-option
                            label="8"
                            value="8"
                    ></el-option>
                    <el-option
                            label="9"
                            value="9"
                    ></el-option>
                </el-select>
                <el-table
                        :data="this.listClass"
                        border
                        caption="Table Title"
                        class-name="mt-4"
                        style="width: 100%; border-collapse: collapse"
                        v-if="this.role =='admin'"
                >
                    <el-table-column type="index" width="50"/>
                    <el-table-column label="Tên Lớp" prop="name"/>
                    <el-table-column

                            label="Khối"
                            prop="Khoi"
                    />
                    <el-table-column align="right" label="Chức Năng">
                        <template #default="scope">
                            <el-button
                                    type="primary"
                                    @click="handleEdit(scope.$index, scope.row)"
                            >
                                <el-icon>
                                    <Edit/>
                                </el-icon>
                            </el-button>

                        </template>
                    </el-table-column>
                </el-table>
                <el-table
                        :data="this.listClass"
                        border
                        caption="Table Title"
                        class-name="mt-4"
                        style="width: 100%; border-collapse: collapse"
                        v-if="this.role =='gv'"
                >
                    <el-table-column type="index" width="50"/>
                    <el-table-column label="Tên Lớp" prop="className"/>
                    <el-table-column align="right" label="Chức Năng">
                        <template #default="scope">
                            <el-button
                                    type="primary"
                                    @click="handleEdit(scope.$index, scope.row)"
                            >
                                <el-icon>
                                    <Edit/>
                                </el-icon>
                            </el-button>

                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                        :current-page="currentPage"
                        :page-size="pageSize"
                        :total="total"
                        background
                        class="mt-4"
                        layout="prev, pager, next"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                />
            </div>
            <div>
                <el-dialog v-model="dialogVisible" title="Thêm Lớp Học" width="80%">
                    <el-form ref="ruleFormRef" :model="ruleForm" :rules="this.rules">
                        <el-form-item
                                :label-width="formLabelWidth"
                                label="Tên Lớp"
                                prop="name"
                        >
                            <el-input v-model="ruleForm.name" autocomplete="off"/>
                        </el-form-item>
                        <el-form-item
                                :label-width="formLabelWidth"
                                label="Khối"
                                prop="Khoi"
                        >
                            <el-select v-model="ruleForm.Khoi" placeholder="Chọn Khối">
                                <el-option
                                        v-for="type in this.listKhoi"
                                        :key="type.value"
                                        :label="type.label"
                                        :value="type.value"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item></el-form-item>
                    </el-form>
                    <template #footer>
            <span class="dialog-footer">
              <el-button type="danger" @click="dialogVisible = false"
              >Thoát</el-button
              >
              <el-button type="primary" @click="submitForm(ruleFormRef)">
                Create
              </el-button>
            </span>
                    </template>
                </el-dialog>
                <el-dialog v-model="editVisible" title="Sửa Lớp Học" width="80%">
                    <el-form ref="myForm" :model="form">
                        <el-form-item
                                :label-width="formLabelWidth"
                                label="Lớp Học"
                                required
                        >
                            <el-input v-model="form.name" autocomplete="off" required/>
                        </el-form-item>
                        <el-form-item :label-width="formLabelWidth" label="Khối">
                            <el-select v-model="form.Khoi" placeholder="Chọn Khối">
                                <el-option
                                        v-for="type in this.listKhoi"
                                        :key="type.value"
                                        :label="type.label"
                                        :value="type.value"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <template #footer>
            <span class="dialog-footer">
              <el-button type="danger" @click="editVisible = false"
              >Thoát</el-button
              >
              <el-button type="primary" @click="EditClass"> Sửa </el-button>
            </span>
                    </template>
                </el-dialog>
            </div>
            <el-dialog
                    v-model="deleteVisible"
                    center
                    destroy-on-close
                    title="Cảnh Báo"
                    width="30%"
            >
                <span> Bạn có muốn xóa {{ this.name }} </span>
                <div>
                    <strong>Dữ liệu sẽ không thể khôi phục</strong>
                </div>
                <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="deleteVisible = false"
            >Không</el-button
            >
            <el-button type="danger" @click="deleteClass"> Có </el-button>
          </span>
                </template>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import ClassService from "@/api/Class"
import store from "@/store";
import TeacherShedule from "@/api/TeacherShedule";

export default {
    name: "Score",
    created() {
        this.getAllData()
    },
    data() {
        let role = store.state.auth.user.role
        let userName = store.state.auth.user.data
        return {
            filterValue: '',
            listClass: [],
            role,
            userName
        }
    },
    watch: {
        filterValue: function (value) {
            this.getAllData()
        }
    },
    methods: {
        getAllData() {
            if (this.role == "admin") {
                ClassService.getClassByList(this.filterValue).then(result => {
                    this.listClass = result.data
                    console.log(result.data)
                })
            } else {
                TeacherShedule.getUnique(this.userName, undefined).then(result => {
                    this.listClass = result.data

                })
            }
        },
        handleEdit(index, value) {
            if (this.role == "gv") {
                console.log(value.name)
                this.$router.push(`/cham-diem/${value.className}`);

            } else {
                this.$router.push(`/cham-diem/${value.name}`);

            }
        }

    }

};
</script>

<style scoped></style>
