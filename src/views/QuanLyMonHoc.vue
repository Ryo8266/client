<template>
    <div class="">
        <h1 class="text-3xl font-bold mb-10">Quản Lý Môn Học</h1>

        <div class="">
            <div class="bg-white p-4 ">
                <div class="flex justify-between mb-4 ">
                    <h1 class="text-xl font-bold">Danh Sách Môn Học</h1>
                    <div>
                        <el-button type="primary" @click="dialogVisible = true">
                            <el-icon>
                                <Plus/>
                            </el-icon>
                            Thêm Môn Học
                        </el-button>
                    </div>
                </div>
                <h2> Chọn Môn Học Theo Khối</h2>
                <el-select v-model="filterValue" placeholder="Chọn Khối">
                    <el-option label="6" value="6"></el-option>
                    <el-option label="7" value="7"></el-option>
                    <el-option label="8" value="8"></el-option>
                    <el-option label="9" value="9"></el-option>
                </el-select>
                <el-table :data="this.listSubject" border caption="Table Title" class-name="mt-4" height="500"
                          style="width: 100%;border-collapse: collapse;">
                    <el-table-column type="index" width="50"/>
                    <el-table-column label="Tên Môn" prop="name"/>
                    <el-table-column label="Khối" prop="Khoi"/>
                    <el-table-column align="right" label="Chức Năng">
                        <template #default="scope">
                            <el-button type="primary" @click="handleEdit(scope.$index, scope.row)">
                                <el-icon>
                                    <Edit/>
                                </el-icon>
                            </el-button>
                            <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">
                                <el-icon>
                                    <Delete/>
                                </el-icon>
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination :current-page="currentPage" :page-size="pageSize" :total="total" background class="mt-4"
                               layout="prev, pager, next" @size-change="handleSizeChange"
                               @current-change="handleCurrentChange"/>
            </div>
            <div>
                <el-dialog v-model="dialogVisible" title="Thêm Lớp Học" width="80%">
                    <el-form ref="form" :model="form" :rules="rules">
                        <el-form-item label="Tên môn học" prop="name">
                            <el-select v-model="form.name" placeholder="Chọn Lớp học">
                                <el-option v-for="type in this.subjectTeacher" :key="type.value" :label="type.label"
                                           :value="type.value"></el-option>
                            </el-select>

                        </el-form-item>
                        <el-form-item label="Khối" prop="Khoi">
                            <el-select v-model="form.Khoi" placeholder="Chọn Khối">
                                <el-option label="6" value="6"></el-option>
                                <el-option label="7" value="7"></el-option>
                                <el-option label="8" value="8"></el-option>
                                <el-option label="9" value="9"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                        </el-form-item>
                    </el-form>
                    <template #footer>
            <span class="dialog-footer">
              <el-button type="danger" @click="dialogVisible = false">Thoát</el-button>

              <el-button type="primary" @click="submitForm('form')">
                Thêm
              </el-button>
            </span>
                    </template>
                </el-dialog>
            </div>
            <div>
                <el-dialog v-model="editVisible" title="Sửa Lớp Học" width="80%">
                    <el-form ref="myForm" :model="formEdit">
                        <el-form-item label="Lớp Học" required>
                            <!--                            <el-input v-model="" autocomplete="off" required/>-->
                            <el-select v-model="formEdit.name" placeholder="Chọn Lớp học">
                                <el-option v-for="type in this.subjectTeacher" :key="type.value" :label="type.label"
                                           :value="type.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Khối" prop="Khoi">
                            <el-select v-model="formEdit.Khoi" placeholder="Chọn Khối">
                                <el-option label="6" value="6"></el-option>
                                <el-option label="7" value="7"></el-option>
                                <el-option label="8" value="8"></el-option>
                                <el-option label="9" value="9"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <template #footer>
            <span class="dialog-footer">
              <el-button type="danger" @click="editVisible = false">Thoát</el-button>
              <el-button type="primary" @click="submitEdit">
                Sửa
              </el-button>
            </span>
                    </template>
                </el-dialog>
            </div>
            <el-dialog v-model="deleteVisible" center destroy-on-close title="Cảnh Báo" width="30%">
        <span>
          Bạn có muốn xóa {{ this.name }}
        </span>
                <div>
                    <strong>Dữ liệu sẽ không thể khôi phục</strong>
                </div>
                <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="deleteVisible = false">Không</el-button>
            <el-button type="danger" @click="submitDelete">
              Có
            </el-button>
          </span>
                </template>
            </el-dialog>
        </div>
    </div>
</template>

<script>

import SubjectService from "@/api/Subject";
import AuthService from "@/api/auth/auth.service";
import SubjectTeacherService from "@/api/SubjectTeacher"

export default {
    name: "QuanLyMonHoc",
    data() {
        return {
            listSubjectAll: [],
            deleteVisible: false,
            listSubject: [],
            isShow: false,
            editVisible: false,
            listKhoi: [],
            subject: [],
            subjectTeacher: [],
            isEditor: false,
            name: '',
            form: {
                name: '',
                Khoi: '',
            },
            formEdit: {
                name: '',
                Khoi: '',
                id: '',
            },
            rules: {
                name: [
                    {required: true, message: 'Tên môn học không được để trống', trigger: 'change'},
                ],
                Khoi: [
                    {required: true, message: 'Khối học chưa được chọn', trigger: 'change'},
                ],
            },
            dialogVisible: false,
            idSubject: '',
            filterValue: '',
            currentPage: 1,
            pageSize: 8,
            idDelete: '',
            total: 0,
        }
    },
    watch: {
        filterValue: function (value) {
            this.getAllValue()
            this.getValueByPage()

        }
    },
    methods: {
        getAllValue() {
            SubjectService.getAllSubjectsbyKhoi(this.filterValue).then(result => {
                this.listSubjectAll = result.data;
                this.total = result.data.length;
                console.log(this.listSubject)
            })
        },
        getAllSubject() {
            SubjectTeacherService.getAll().then((result) => {
                this.subjectTeacher = result.data.map(({id, name}) => ({label: name, value: name}));
            })
        },

        getValueByPage() {
            SubjectService.getAllSubjectsbyKhoi(this.filterValue).then(result => {
                this.listSubject = result.data;
            })
        },
        submitForm(formName) {

            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.form.name = this.form.name + ' ' + this.form.Khoi
                    SubjectService.createSubject(this.form).then(result => {
                        console.log(this.form)
                        this.dialogVisible = false;
                        this.getAllValue();
                        this.getValueByPage();
                        formName.resetFields()
                        this.$notify({type: "success", title: "Thành Công", text: `Thêm Môn học thành công`});
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        handleEdit(index, row) {
            this.editVisible = true;
            this.formEdit.name = row.name;
            this.formEdit.Khoi = row.Khoi;
            this.formEdit.id = row.id;
        },
        submitEdit() {
            SubjectService.updateData({
                name: this.formEdit.name,
                Khoi: this.formEdit.Khoi
            }, this.formEdit.id).then(result => {
                this.editVisible = false;
                this.$notify({type: "success", title: "Thành Công", text: `Update Môn học thành công`});
                this.getValueByPage()
                this.getValueByPage()
            })
        },
        handleDelete(index, row) {
            this.idDelete = row.id;
            this.deleteVisible = true;
            this.name = row.name;
        },
        submitDelete() {
            SubjectService.deleteSubject(this.idDelete).then(result => {
                this.deleteVisible = false;
                this.getValueByPage()
                this.getValueByPage()
                this.$notify({type: "success", title: "Thành Công", text: `Xóa Môn học thành công`});
            })
        }
    },
    created() {
        this.getAllSubject()
    }

}


</script>

