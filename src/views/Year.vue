<template>
    <div class="">
        <h1 class="text-2xl font-bold mb-10">Quản Lý Năm Học</h1>
        <div class="">
            <div class="bg-white p-4 ">
                <div class="flex justify-between">
                    <h1>Danh Sách Năm Học</h1>
                    <el-button type="primary" @click="dialogVisible = true">
                        <el-icon>
                            <Plus/>
                        </el-icon>
                        Thêm Năm Học
                    </el-button>
                </div>

                <el-table :data="this.listYear" row-key="id" border caption="Table Title"
                          class-name="mt-4" style="width: 100%;border-collapse: collapse;">
                    <el-table-column type="index" width="50"/>
                    <el-table-column label="Năm học" prop="name"/>
                    <el-table-column label=" Trạng Thái" prop="isActive">
                        <template #default="scope">
                            <el-tag
                                    :type="scope.row.isActive === 'Hoạt Động' ? 'primary' : 'danger'"
                                    disable-transitions>{{ scope.row.isActive }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column align="right" label="Chức Năng">
                        <template #default="scope">
                            <el-button type="success" @click="handleChange(scope.$index, scope.row)"
                            >
                                <el-icon>
                                    <Switch/>
                                </el-icon>
                            </el-button
                            >
                            <el-button type="primary" @click="handleEdit(scope.$index, scope.row)"
                            >
                                <el-icon>
                                    <Edit/>
                                </el-icon>
                            </el-button
                            >
                            <el-button
                                    type="danger"
                                    @click="handleDelete(scope.$index,scope.row)"
                            >
                                <el-icon>
                                    <Delete/>
                                </el-icon>
                            </el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>

            </div>
            <div>
                <el-dialog v-model="dialogVisible" title="Thêm Năm Học" width="80%">
                    <el-form ref="form" :model="form" :rules="rules">
                        <el-form-item label="Tên Năm Học" prop="name">
                            <el-input v-model="form.name" autocomplete="off"/>
                        </el-form-item>
                    </el-form>
                    <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" @click="dialogVisible = false">Thoát</el-button>
        <el-button type="primary" @click="addSubject('form')">
          Thêm
        </el-button>
      </span>
                    </template>
                </el-dialog>
            </div>
            S
            <div>
                <el-dialog v-model="editVisible" title="Sửa Bộ Môn Giảng Dạy" width="80%">
                    <el-form ref="myForm" :model="this.formEdit">
                        <el-form-item label="Tên Bộ Môn">
                            <el-input v-model="this.formEdit.name" autocomplete="off"/>
                        </el-form-item>
                    </el-form>
                    <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" @click="dialogVisible = false">Thoát</el-button>
        <el-button type="primary" @click="EditSubject">
          Sửa
        </el-button>
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
    <span>
      Bạn có muốn xóa {{ this.name }}
    </span>
                <div>
                    <strong>Dữ liệu sẽ không thể khôi phục</strong>
                </div>
                <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="deleteVisible = false">Không</el-button>
        <el-button type="danger" @click="SubmitDelete">
          Có
        </el-button>
      </span>
                </template>
            </el-dialog>
        </div>

    </div>
</template>

<script>


import YearService from "@/api/Year"
import AuthService from "@/api/auth/auth.service";

export default {
    name: "Year",
    components: {},
    created() {
        this.getYearAll()
    },

    data() {
        return {
            listYear: [],
            dialogVisible: false,
            deleteVisible: false,
            editVisible: false,
            name: '',
            form: {
                name: ""
            },
            formEdit: {
                name: "",
                id: "",
            },
            rules: {
                name: [
                    {required: true, message: 'Năm Học không được để trống', trigger: 'blur'},

                ],
            },
            idDelete: '',
        };
    },
    methods: {
        getYearAll() {
            YearService.getYear().then(result => {
                this.listYear = result.data.map(el => {
                    if (el.isActive) {
                        return {...el, isActive: 'Hoạt Động'};
                    } else {
                        return {...el, isActive: 'Không Hoạt Động'}
                    }
                })
            })
        },
        handleChange(index, value) {
            YearService.changeActiveYear(value.id).then(result => {
                this.$notify({
                    type: "success",
                    title: "Thành Công",
                    text: `Đổi Trạng Thái Hoạt Động Thành Công`,
                });
                this.getYearAll()
            })
        },
        addSubject(formName) {

            this.$refs[formName].validate((valid) => {
                if (valid) {
                    YearService.createYear(this.form).then(result => {
                        this.dialogVisible = false;
                        this.getYearAll()
                        this.$refs[formName].resetFields();
                        this.$notify({
                            type: "success",
                            title: "Thành Công",
                            text: `Thêm Năm Học Thành Công`,
                        });
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        handleEdit(index, value) {
            this.editVisible = true;
            this.formEdit.name = value.name;
            this.formEdit.id = value.id;
        },

        EditSubject() {
            YearService.upadeYear(this.formEdit.id, {name: this.formEdit.name}).then(result => {
                this.$notify({
                    type: "success",
                    title: "Thành Công",
                    text: `Update Thành Công`,
                });
                this.getYearAll()
                this.editVisible = false;
                this.formEdit.name = ""
            })
        },
        handleDelete(index, value) {
            this.deleteVisible = true;
            this.name = value.name
            this.idDelete = value.id
        },

        SubmitDelete() {
            YearService.deleteYear(this.idDelete).then(result => {
                this.$notify({
                    type: "success",
                    title: "Thành Công",
                    text: `Xóa Thành Công`,
                });
                this.getYearAll()
                this.deleteVisible = false;
            })
        },
    },
}
</script>

<style scoped>

</style>