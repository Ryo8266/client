<template>
    <div class="">
        <h1 class="text-3xl font-bold mb-10">Quản Lý Giáo Viên</h1>
        <div class="flex justify-between mb-5">
        </div>
        <div class="">
            <div class="bg-white p-4 ">
                <div class="flex justify-between mb-4 ">
                    <h1 class="text-xl font-bold">Danh Sách Giáo Viên</h1>
                    <div>
                        <el-button type="success" @click="exportExcel">
                            <el-icon>
                                <Download/>
                            </el-icon>
                            Tải Xuống Excel
                        </el-button>
                        <el-button slot="trigger" type="primary" @click="execelVisible = true">Upload Excel File
                        </el-button>

                        <el-button type="primary" @click="dialogVisible = true">
                            <el-icon>
                                <Plus/>
                            </el-icon>
                            Thêm Giáo Viên
                        </el-button>
                    </div>


                </div>
                <div class="flex gap-4 justify-between">
                    <div class="flex justify-start gap-4 basis-2/5">
                        <div>
                            <h2> Lọc Theo Bộ Môn</h2>
                            <el-select v-model="filtersValueListSubject" placeholder="Chọn bộ môn">
                                <el-option label="Tất cả" value=""></el-option>
                                <el-option v-for="type in this.subjectTeacher" :key="type.value" :label="type.label"
                                           :value="type.value"></el-option>
                            </el-select>
                        </div>

                    </div>
                    <div class="mt-6 justify-end flex basis-1/2">
                        <h2></h2>
                        <el-input
                                v-model="filterSearchValueList"
                                placeholder="Nhập Mã Giáo Viên, Tên Giáo Viên"
                                prefix-icon="el-icon-search">
                        </el-input>
                    </div>
                </div>
                <el-table :data="this.listTeacher" border caption="Table Title" height="500"
                          class-name="mt-4" style="width: 100%;border-collapse: collapse;">
                    <el-table-column type="index" width="50"/>
                    <el-table-column label="Mã Giáo Viên" prop="userName"/>
                    <el-table-column label="Họ Tên" prop="fullName"/>
                    <el-table-column label="Giới Tính" prop="sex"/>
                    <el-table-column label="Ngày Sinh" prop="Date"/>
                    <el-table-column label="Bộ Môn" prop="subjectTeacherName"/>
                    <el-table-column label="Email" prop="email"/>
                    <el-table-column label="Số Điện Thoại" prop="numberPhone"/>
                    <el-table-column label="Địa Chỉ" prop="Address"/>
                    <el-table-column align="right" label="Chức Năng">
                        <template #default="scope">
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
                <el-dialog v-model="dialogVisible" title="Thêm Học Sinh" width="80%">
                    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="demo-ruleForm" label-width="120px">
                        <el-form-item label="Mã Giáo Viên" prop="userName">
                            <el-input v-model="ruleForm.userName"></el-input>
                        </el-form-item>
                        <el-form-item label="Họ Tên" prop="fullName">
                            <el-input v-model="ruleForm.fullName"></el-input>
                        </el-form-item>
                        <el-form-item label="Giới Tính" prop="sex">
                            <el-select v-model="ruleForm.sex" placeholder="Chọn giới tính">
                                <el-option label="Nam" value="Nam"></el-option>
                                <el-option label="Nữ" value="Nữ"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Ngày sinh" required>
                            <el-form-item prop="Date">
                                <el-date-picker v-model="ruleForm.Date" placeholder="Chọn Ngày Sinh"
                                                style="width: 100%;"
                                                type="date"></el-date-picker>
                            </el-form-item>
                        </el-form-item>
                        <el-form-item label="Chọn Bộ Môn" prop="subjectTeacherName" required>
                            <el-select v-model="ruleForm.subjectTeacherName" placeholder="Chọn Lớp học">
                                <el-option v-for="type in this.subjectTeacher" :key="type.value" :label="type.label"
                                           :value="type.value"></el-option>
                            </el-select>
                        </el-form-item>
                     
                        <el-form-item label="Địa Chỉ" prop="Address">
                            <el-input v-model="ruleForm.Address"></el-input>
                        </el-form-item>
                        <el-form-item label="Số điện thoại" prop="numberPhone">
                            <el-input v-model="ruleForm.numberPhone"></el-input>
                        </el-form-item>
                        <el-form-item label="Email" prop="email">
                            <el-input v-model="ruleForm.email" type="textarea"></el-input>
                        </el-form-item>
                    </el-form>
                    <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" @click="dialogVisible = false">Thoát</el-button>

   <el-button type="primary" @click="submitForm('ruleForm')">
                Create
              </el-button>
      </span>
                    </template>
                </el-dialog>
            </div>
            <div>
                <el-dialog v-model="editVisible" title="Sửa Tài Khoản Giáo Viên" width="80%">
                    <el-form ref="formEdit" :model="formEdit" class="demo-ruleForm" label-width="120px">
                        <el-form-item label="Mã Giáo Viên" prop="userName">
                            <el-input disabled v-model="formEdit.userName"></el-input>
                        </el-form-item>
                        <el-form-item label="Họ Tên" prop="fullName">
                            <el-input v-model="formEdit.fullName"></el-input>
                        </el-form-item>
                        <el-form-item label="Giới Tính" prop="sex">
                            <el-select v-model="formEdit.sex" placeholder="Chọn giới tính">
                                <el-option label="Nam" value="Nam"></el-option>
                                <el-option label="Nữ" value="Nữ"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Ngày sinh" required>
                            <el-form-item prop="Date">
                                <el-date-picker v-model="formEdit.Date" placeholder="Chọn Ngày Sinh"
                                                style="width: 100%;"
                                                type="date"></el-date-picker>
                            </el-form-item>
                        </el-form-item>
                        <el-form-item label="Chọn Bộ Môn" prop="subjectTeacherName" required>
                            <el-select v-model="formEdit.subjectTeacherName" placeholder="Chọn Lớp học"
                                       required>
                                <el-option v-for="type in this.subjectTeacher" :key="type.value" :label="type.label"
                                           :value="type.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Nhập Mật khẩu" prop="password" required>
                            <el-input v-model="formEdit.password" placeholder="Please input password"
                                      show-password></el-input>
                        </el-form-item>
                        <el-form-item label="Địa Chỉ" prop="Address">
                            <el-input v-model="formEdit.Address"></el-input>
                        </el-form-item>
                        <el-form-item label="Số điện thoại" prop="numberPhone">
                            <el-input v-model="formEdit.numberPhone"></el-input>
                        </el-form-item>
                        <el-form-item label="Email" prop="email">
                            <el-input v-model="formEdit.email" type="textarea"></el-input>
                        </el-form-item>
                    </el-form>
                    <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" @click="editVisible  = false">Thoát</el-button>
        <el-button type="primary" @click="editUpdate">
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
      Bạn có muốn xóa tài khoản {{ this.name }}
    </span>
                <div>
                    <strong>Dữ liệu sẽ không thể khôi phục</strong>
                </div>
                <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="deleteVisible = false">Không</el-button>
        <el-button type="danger" @click="DeleteAction">
          Có
        </el-button>
      </span>
                </template>
            </el-dialog>
        </div>
        <el-dialog v-model="execelVisible" title="Nhập Excel" width="80%">
            <el-upload
                    :file-list="fileList"
                    :on-change="handlePreview"
                    :on-remove="handleRemove"
                    action=""
                    class="upload-demo"
                    drag
                    multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
                <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
            </el-upload>
            <el-table :data="this.previewData">
                <el-table-column type="index" width="50"/>
                <el-table-column label="Mã Giáo Viên" prop="userName"/>
                <el-table-column label="Họ Tên" prop="fullName"/>
                <el-table-column label="Giới Tính" prop="sex"/>
                <el-table-column label="Ngày Sinh" prop="Date"/>
                <el-table-column label="Bộ Môn" prop="subjectTeacherName"/>
                <el-table-column label="Email" prop="email"/>
                <el-table-column label="Số Điện Thoại" prop="numberPhone"/>
                <el-table-column label="Địa Chỉ" prop="Address"/>
            </el-table>
            <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" @click="execelVisible = false">Thoát</el-button>
        <el-button type="primary" @click="importExcel">
          Nhập excel
        </el-button>
      </span>
            </template>
        </el-dialog>
    </div>
</template>
<script>
import AuthService from "@/api/auth/auth.service";
import UserService from "@/api/auth/user.service";
import userService from "@/api/auth/user.service";
import SubjectTeacherService from "@/api/SubjectTeacher";
import * as XLSX from 'xlsx/xlsx.mjs';

export default {
    name: "QuanLyGiaoVien",
    data() {
        return {
            total: 0,
            currentPage: 1,
            editVisible: false,
            input2: '',
            pageSize: 15,
            listTeacher: [],
            execelVisible: false,
            subjectTeacher: [],
            listTeacherAll: [],
            dataEditor: [],
            name: '',
            filtersValueListSubject: '',
            filterSearchValueList: '',
            previewData: [], //
            dialogVisible: false,
            deleteVisible: false,
            ruleForm: {
                userName: '',
              
                fullName: '',
                sex: '',
                Date: '',
                subjectTeacherName: '',
                Address: '',
                email: '',
                numberPhone: '',
                dataAll: []
            },
            rules: {
                userName: [
                    {required: true, message: 'Mã Giáo Viên không được để trống', trigger: 'blur'},
                    {min: 4, message: 'Mã Học sinh tối thiểu 4 kí tự', trigger: 'blur'}
                ],
                fullName: [
                    {required: true, message: 'Họ tên không được bỏ trống', trigger: 'blur'}
                ],
                
                Date: [
                    {type: 'date', required: true, message: 'Ngày sinh không được bỏ trống', trigger: 'change'}
                ],
                sex: [
                    {required: true, message: 'Giới tính không được bỏ trống', trigger: 'change'}
                ],
                subjectTeacherName: [
                    {required: true, message: 'Bộ Môn không được bỏ trống', trigger: 'change'}
                ],
                email: [
                    {required: true, message: 'Email không được bỏ trống', trigger: 'blur'},
                    {type: 'email', message: 'Email không đúng định dạng', trigger: 'blur'}
                ],
                numberPhone: [
                    {required: true, message: 'Số điện thoại không được bỏ trống', trigger: 'blur'},
                    {
                        min: 10,
                        max: 13,
                        message: 'Số điện Thoại không được ít hơn 10 số và lớn hơn 13 số',
                        trigger: 'blur'
                    }
                ],
                Address: [
                    {required: true, message: 'Địa chỉ không được bỏ trống', trigger: 'blur'}
                ]
            },

            formEdit: {
                userName: '',
                password: '',
                fullName: '',
                sex: '',
                Date: '',
                subjectTeacherName: '',
                Address: '',
                email: '',
                numberPhone: '',
                dataAll: []
            },
        }
    },
    components: {},
    created() {
        this.getAllData()
        this.getDataByPage()
        this.getAllSubjectTeacher()
    },

    watch: {
        execelVisible: function (newValue) {
            console.log(newValue)
            this.previewData = []
        },

        filtersValueListSubject: function (newValue) {
            this.getAllData()
            this.getDataByPage()
        },
        filterSearchValueList: function (newValue) {
            this.getAllData()
            this.getDataByPage()
        }
    },
    methods: {
        editUpdate(user, username) {
            console.log(this.formEdit)
            UserService.updateProfileUser(this.formEdit).then((res) => {
                this.getDataByPage()
                this.editVisible = false
                this.isEditor = false
                this.$notify({type: "success", title: "Thành Công", text: `Update Thông tin thành công`});
            })
            console.log('listClass', this.formEdit.password)
        },
        handleEdit(index, row) {
            this.editVisible = true,
                this.formEdit.userName = row.userName;
            this.formEdit.fullName = row.fullName;
            this.formEdit.sex = row.sex;
            this.formEdit.email = row.email;
            this.formEdit.Date = row.Date;
            this.formEdit.subjectTeacherName = row.subjectTeacherName;
            this.formEdit.numberPhone = row.numberPhone;
            this.formEdit.password = row.password;
            this.formEdit.Address = row.Address;
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.ruleForm.Date = new Date(this.ruleForm.Date).toLocaleDateString("en-GB");
                    console.log(this.ruleForm)
                    AuthService.signUpTeacher(this.ruleForm).then(
                        res => {
                            if (res.isError) {
                                this.show = false
                                this.$notify({type: "error", title: "Lỗi", text: `${res.message}`});
                            } else {
                                this.$notify({type: "success", title: "Thành Công", text: `${res.message}`});
                                this.dialogVisible = false;
                                this.$refs[formName].resetFields();
                                this.getAllData()
                this.getDataByPage()
                            }
                        }
                    )
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        handleDelete(index, newValue) {
            this.deleteVisible = true;
            this.name = newValue.userName
        },
        getAllData() {
            UserService.getTeacherFillters(null, this.filterSearchValueList, this.filtersValueListSubject,).then(result => {
                this.listTeacherAll = result.data
                this.total = result.data.length
            })
        },
        getAllSubjectTeacher() {
            SubjectTeacherService.getAll().then(result => {
                this.subjectTeacher = result.data.map(({id, name}) => ({label: name, value: name}))
            })
        },

        getDataByPage() {
            UserService.getTeacherFillters(this.currentPage, this.filterSearchValueList, this.filtersValueListSubject,).then(result => {
                this.listTeacher = result.data
            })
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.currentPage = 1;
            this.getDataByPage();
        },
        handleCurrentChange(val) {
            console.log(val)
            this.currentPage = val;
            this.getDataByPage();
        },
        importExcel(data) {
            userService.importExcelTeacher(this.previewData).then(res => {
                this.execelVisible = false
                this.$notify({
                    type: "success",
                    title: "Thành Công",
                    text: `Thêm Excel Thành Công`,
                });
                this.getAllData()
                this.  getDataByPage() 
            })
        },
        exportExcel() {
            const rows = this.listTeacherAll.map(row => ({
                userName: row.userName,
                fullName: row.fullName,
                sex: row.sex,
                Date: row.Date,
                subjectTeacherName: row.subjectTeacherName,
                Address: row.Address,
                numberPhone: row.numberPhone,
                email: row.email
            }));
            console.log(rows)
            const worksheet = XLSX.utils.json_to_sheet(rows);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Danh Sách Giáo Viên");
            XLSX.utils.sheet_add_aoa(worksheet, [["Mã Giáo Viên", "Họ Tên", "Giới Tính", "Ngày Sinh", "Bộ Môn", "Địa Chỉ", "Số Điện Thoại", "Email"]], {origin: "A1"});
            const max_width = rows.reduce((w, r) => Math.max(w, r.numberPhone.length), 10);
            worksheet["!cols"] = [{wch: max_width}];
            XLSX.writeFile(workbook, "Danh Sách Giáo Viên.xlsx", {compression: true});
        },
        editAction(userName) {
            this.dataEditor = this.listTeacher.filter(el => el.userName == userName);
            console.log(userName)
            this.isEditor = true;
        },
        actionDelete(userName) {
            this.userDelete = userName
            this.isDeleteAction = true;
        },
        handlePreview(file, fileList) {
            userService.uploadExcel(fileList[0].raw).then((res) => {
                this.previewData = res.data.result.map(obj => {
                    return {
                        "email": obj["Email"],
                        "sex": obj["Giới Tính"],
                        "fullName": obj["Họ Tên"],
                        "subjectTeacherName": obj["Bộ Môn"],
                        "userName": obj["Mã Giáo Viên"],
                        "Date": obj["Ngày Sinh"],
                        "numberPhone": obj["Số Điện Thoại"],
                        'Address': obj["Địa Chỉ"]
                    }
                });
                console.log(this.previewData)
                this.dataHeader = Object.keys(this.previewData[0])

                console.log(this.dataHeader)
            });
        },
        DeleteAction() {
            console.log(this.userDelete)
            UserService.UserDelete(this.name).then(() => {
                this.getAllData()
                this.getDataByPage()
                this.deleteVisible = false;
                this.$notify({type: "success", title: "Thành Công", text: `Xóa tài khoản thành công`});
            })
        },


        success(data) {
            AuthService.signUpTeacher(data).then((result) => {
                console.log(result);
                if (result.isError) {
                    this.$notify({type: "error", title: "Lỗi", text: `${result.message}`});
                    this.isShow = false;

                } else {
                    this.$notify({type: "success", title: "Thành Công", text: `${result.message}`});
                    this.isShow = false;
                    console.log("change")
                }

            }).catch(err => {
                console.log(err.message)

            })
        }
    }
}
</script>
<style lang="">

</style>