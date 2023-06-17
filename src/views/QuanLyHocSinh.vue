<script>
import userService from "../api/auth/user.service";
import UserService from "../api/auth/user.service";
import ListClass from "../api/listClass";
import * as XLSX from 'xlsx/xlsx.mjs';


import AuthService from "@/api/auth/auth.service";
import ClassService from "@/api/Class";

export default {
    name: "QuanLyHocSinh",
    data() {
        return {
            openExcel: false,
            name,
            total: 0,
            currentPage: 1,
            input2: '',
            pageSize: 2,
            filtersValueListClass: '',
            filterValueClass: '',
            dataTable: [],
            listClass: [],
            class: [],
            addFormClass: [],
            nameClass: "",
            filterValueSex: '',
            sexValue: [
                {
                    label: 'Nam', value: 'Nam',
                },

                {
                    label: 'Nữ', value: 'Nữ',
                }

            ],
            deleteVisible: false,
            addressValue: [],
            filterValueAddress: '',
            editVisible: false,
            file: null,
            addValueKhoi: '',
            ruleForm: {
                userName: '',
                password: '',
                fullName: '',
                sex: '',
                Date: '',
                className: '',
                Address: '',
                email: '',
                numberPhone: '',
                dataAll: []
            },
            formEdit: {
                userName: '',
                password: '',
                fullName: '',
                sex: '',
                Date: '',
                className: '',
                Address: '',
                email: '',
                numberPhone: '',
                dataAll: []
            },
            rules: {
                userName: [
                    {required: true, message: 'Mã Học sinh không được để trống', trigger: 'blur'},
                    {min: 4, message: 'Mã Học sinh tối thiểu 4 kí tự', trigger: 'blur'}
                ],
                fullName: [
                    {required: true, message: 'Họ tên không được bỏ trống', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: 'Mật khẩu không được bỏ trống', trigger: 'blur'}
                ],
                Date: [
                    {type: 'date', required: true, message: 'Ngày sinh không được bỏ trống', trigger: 'change'}
                ],
                sex: [
                    {required: true, message: 'Giới tính không được bỏ trống', trigger: 'change'}
                ],
                className: [
                    {required: true, message: 'Lớp học không được bỏ trống', trigger: 'change'}
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
            excelData: null,
            previewData: [],
            execelVisible: false,
            dialogVisible: false
        };
    },
    watch: {
        execelVisible: function (newValue) {
            console.log(newValue)
            this.previewData = []
        },
        filtersValueListClass: function (newValue) {
            this.getClass(newValue)
        },
        filterValueClass: function (newValue) {
            this.getAllData()
            this.getDataByPage()
        },
        filterValueSex: function (newValue) {
            this.getAllData()
            this.getDataByPage()
        },
        input2: function (newValue) {
            this.getAllData()
            this.getDataByPage()
        },
        addValueKhoi: function (newValue) {
            this.getAddClass(newValue)
        }
    },


    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.ruleForm.Date = new Date(this.ruleForm.Date).toLocaleDateString("en-GB");
                    console.log(this.ruleForm)
                    AuthService.signUpStudent(this.ruleForm).then(
                        res => {
                            if (res.isError) {
                                this.show = false
                                this.$notify({type: "error", title: "Lỗi", text: `${res.message}`});
                            } else {
                                this.$notify({type: "success", title: "Thành Công", text: `${res.message}`});
                                this.dialogVisible = false;
                                this.$refs[formName].resetFields();
                            }
                        }
                    )
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        handlePreview(file, fileList) {
            userService.uploadExcel(fileList[0].raw).then((res) => {
                this.previewData = res.data.result.map(obj => {
                    return {
                        "email": obj["Email"],
                        "sex": obj["Giới Tính"],
                        "fullName": obj["Họ Tên"],
                        "className": obj["Lớp Học"],
                        "userName": obj["Mã Học Sinh"],
                        "Date": obj["Ngày Sinh"],
                        "numberPhone": obj["Số Điện Thoại"],
                        'Address': obj["Địa Chỉ"]
                    }
                });
                console.log(this.previewData)
                // this.dataHeader = Object.keys(this.previewData[0])

                console.log(this.dataHeader)
            });
        },
        getAllData() {

            UserService.getStudentFillters(null, this.input2, this.filterValueClass, this.filterValueSex).then(result => {
                this.total = result.data.length;
                this.dataAll = result.data
            })
        },
        getDataByPage() {
            UserService.getStudentFillters(this.currentPage, this.input2, this.filterValueClass, this.filterValueSex).then(result => {
                this.dataTable = result.data
            })
        },

        getListClass() {
            ListClass.getAll().then(res => {
                this.listClass = res.data.listClass.map(({id, name}) => ({label: name, value: name}));
                console.log(this.listClass)
            })
        },
        getClass(nameList) {
            console.log(nameList)
            ClassService.getClassByList(nameList).then((res) => {
                this.class = res.data.map(({id, name}) => ({label: name, value: name}));
            });
        },
        getAddClass(nameList) {
            ClassService.getClassByList(nameList).then((res) => {
                this.addFormClass = res.data.map(({id, name}) => ({label: name, value: name}));
            });
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
            userService.importExcel(data).then(res => {
                this.isShowExcel = false
            })
        },
        exportExcel() {
            console.log(this.dataTable)
            const rows = this.dataAll.map(row => ({
                userName: row.userName,
                fullName: row.fullName,
                sex: row.sex,
                Date: row.Date,
                className: row.className,
                Address: row.Address,
                numberPhone: row.numberPhone,
                email: row.email
            }));
            const worksheet = XLSX.utils.json_to_sheet(rows);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Danh Sách Học Sinh");
            XLSX.utils.sheet_add_aoa(worksheet, [["Mã Học Sinh", "Họ Tên", "Giới Tính", "Ngày Sinh", "Lớp Học", "Địa Chỉ", "Số Điện Thoại", "Email"]], {origin: "A1"});
            const max_width = rows.reduce((w, r) => Math.max(w, r.numberPhone.length), 10);
            worksheet["!cols"] = [{wch: max_width}];
            XLSX.writeFile(workbook, "Danh Sách Học Sinh.xlsx", {compression: true});
        },
        editAction(userName) {
            this.dataEditor = this.dataTable.filter(el => el.userName == userName);
            console.log(this.dataEditor)
            this.isEditor = true;
        },
        submitImportExcel() {
            UserService.importExcel(this.previewData).then(() => {
                this.execelVisible = false;
                this.$notify({type: "success", title: "Thành Công", text: `Nhập Excel thành công`});

            }).catch(err=>{
                
                this.$notify({type: "error", title: "Thất bại", text: `Vui Lòng kiểm tra lại dữ liệu file và định dạng file`});
                this.execelVisible = false;
            
            })
        },
        handleEdit(index, row) {
            this.editVisible = true;
            this.formEdit.userName = row.userName;
            this.formEdit.fullName = row.fullName;
            this.formEdit.sex = row.sex;
            this.formEdit.email = row.email;
            this.formEdit.Date = row.Date;
            this.formEdit.className = row.className;
            this.formEdit.numberPhone = row.numberPhone;
            this.formEdit.password = row.password;
            this.formEdit.Address = row.Address;
        },
        editUpdate(user, username) {
            let data
            UserService.updateProfileUser(this.formEdit).then((res) => {
                this.getDataByPage()
                this.editVisible = false
                data = res.data
                console.log('data', data)
                this.dataTable = this.dataTable.map(el => el.userName === res.data.userName ? {...data} : el)
                this.isEditor = false
                this.$notify({type: "success", title: "Thành Công", text: `Update Thông tin thành công`});
            })
            console.log('listClass', this.formEdit.password)
        },
        handleDelete(index, row) {
            this.deleteVisible = true,
                this.name = row.userName
        },
        DeleteAction() {
            UserService.UserDelete(this.name).then(() => {
                this.dataTable = this.dataTable.filter(el => el.name != this.name);
                this.getDataByPage()
                this.deleteVisible = false;
                this.$notify({type: "success", title: "Thành Công", text: `Xóa tài khoản thành công`});
            })
        },
    },
    created() {
        this.getListClass()
    },


};
</script>
<template>
    <div class="">
        <h1 class="text-3xl font-bold mb-10">Quản Lý Học Sinh</h1>
        <div class="flex justify-between mb-5">
        </div>
        <div class="">
            <div class="bg-white p-4 ">
                <div class="flex justify-between mb-4 ">
                    <h1 class="text-xl font-bold">Danh Sách Học Sinh</h1>
                    <div>
                        <el-button type="success" @click="exportExcel">
                            <el-icon>
                                <Download/>
                            </el-icon>
                            Tải Xuống excel
                        </el-button>
                        <el-button slot="trigger" type="primary" @click="execelVisible = true">Upload Excel File
                        </el-button>
                        <el-button type="primary" @click="dialogVisible = true">
                            <el-icon>
                                <Plus/>
                            </el-icon>
                            Thêm Học Sinh
                        </el-button>
                    </div>


                </div>
                <div class="flex gap-4 justify-between">
                    <div class="flex justify-start gap-4 basis-2/5">
                        <div>
                            <h2> Chọn Theo Khối</h2>
                            <el-select v-model="filtersValueListClass" placeholder="Chọn Khối">

                                <el-option v-for="type in this.listClass" :key="type.value" :label="type.label"
                                           :value="type.value"></el-option>
                            </el-select>
                        </div>
                        <div>
                            <h2> Chọn Theo Lớp</h2>
                            <el-select v-model="filterValueClass" placeholder="Chọn Lớp">
                                <el-option v-for="type in this.class" :key="type.value" :label="type.label"
                                           :value="type.value"></el-option>
                            </el-select>
                        </div>
                        <div>
                            <h2> Chọn Theo Lớp</h2>
                            <el-select v-if="this.filterValueClass != ''" v-model="filterValueSex"
                                       placeholder="Chọn Giới TÍnh">
                                <el-option v-for="type in this.sexValue" :key="type.value" :label="type.label"
                                           :value="type.value"></el-option>
                            </el-select>
                            <el-select v-else v-model="filterValueSex" disabled placeholder="Chọn Giới Tính">

                                <el-option v-for="type in this.sexValue" :key="type.value" :label="type.label"
                                           :value="type.value"></el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="mt-6 justify-end flex basis-1/2">
                        <h2></h2>
                        <el-input v-if="this.filterValueClass != ''" v-model="input2"
                                  placeholder="Nhập Mã Học Sinh, Tên Học Sinh"
                                  prefix-icon="el-icon-search">
                        </el-input>
                        <el-input v-else v-model="input2" disabled placeholder="Nhập Mã Học Sinh, Tên Học Sinh"
                                  prefix-icon="el-icon-search">
                        </el-input>
                    </div>
                </div>


                <el-table :data="this.dataTable" border caption="Table Title" height="500" class-name="mt-4"
                          style="width: 100%;border-collapse: collapse;">
                    <el-table-column type="index" width="50"/>
                    <el-table-column label="Mã Học Sinh" prop="userName"/>
                    <el-table-column label="Họ Tên" prop="fullName"/>
                    <el-table-column label="Giới Tính" prop="sex"/>
                    <el-table-column label="Ngày Sinh" prop="Date"/>
                    <el-table-column label="Lớp" prop="className"/>
                    <el-table-column label="Email" prop="email"/>
                    <el-table-column label="Số Điện Thoại" prop="numberPhone"/>
                    <el-table-column label="Địa Chỉ" prop="Address"/>
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
                <el-dialog v-model="dialogVisible" title="Thêm Học Sinh" width="80%">
                    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="demo-ruleForm" label-width="120px">
                        <el-form-item label="Mã học sinh" prop="userName">
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
                        <el-form-item label="Chọn Lớp Học" prop="className" required>
                            <el-col :span="4">
                                <el-select v-model="addValueKhoi" placeholder="Chọn Khối học">
                                    <el-option label="6" value="6"></el-option>
                                    <el-option label="7" value="7"></el-option>
                                    <el-option label="8" value="8"></el-option>
                                    <el-option label="9" value="9"></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="11">
                                <el-select v-if="addValueKhoi != ''" v-model="ruleForm.className"
                                           placeholder="Chọn Lớp học" required>
                                    <el-option v-for="type in this.addFormClass" :key="type.value" :label="type.label"
                                               :value="type.value"></el-option>
                                </el-select>
                                <el-select v-else v-model="ruleForm.className" disabled placeholder="Chọn Lớp học">
                                    <el-option v-for="type in this.addFormClass" :key="type.value" :label="type.label"
                                               :value="type.value"></el-option>
                                </el-select>
                            </el-col>
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
                Thêm
              </el-button>
            </span>
                    </template>
                </el-dialog>
            </div>
            <div>
                <el-dialog v-model="editVisible" title="Sửa Tài Khoản Học Sinh" width="80%">
                    <el-form ref="formEdit" :model="formEdit" class="demo-ruleForm" label-width="120px">
                        <el-form-item label="Mã học sinh" prop="userName">
                            <el-input v-model="formEdit.userName" disabled></el-input>
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
                        <el-form-item label="Chọn Lớp Học" prop="className" required>
                            <el-col :span="4">
                                <el-select v-model="addValueKhoi" placeholder="Chọn Khối học">
                                    <el-option label="6" value="6"></el-option>
                                    <el-option label="7" value="7"></el-option>
                                    <el-option label="8" value="8"></el-option>
                                    <el-option label="9" value="9"></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="11">
                                <el-select v-if="addValueKhoi != ''" v-model="formEdit.className"
                                           placeholder="Chọn Lớp học" required>
                                    <el-option v-for="type in this.addFormClass" :key="type.value" :label="type.label"
                                               :value="type.value"></el-option>
                                </el-select>
                                <el-select v-else v-model="formEdit.className" disabled placeholder="Chọn Lớp học">
                                    <el-option v-for="type in this.addFormClass" :key="type.value" :label="type.label"
                                               :value="type.value"></el-option>
                                </el-select>
                            </el-col>
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
              <el-button type="danger" @click="editVisible = false">Thoát</el-button>
              <el-button type="primary" @click="editUpdate">
                Sửa
              </el-button>
            </span>
                    </template>
                </el-dialog>
            </div>
            <el-dialog v-model="deleteVisible" center destroy-on-close title="Cảnh Báo" width="30%">
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
            <el-upload :file-list="fileList" :on-change="handlePreview" :on-remove="handleRemove" action=""
                       class="upload-demo"
                       drag multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
                <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
            </el-upload>
            <el-table :data="this.previewData">
                <el-table-column type="index" width="50"/>
                <el-table-column label="Mã Học Sinh" prop="userName"/>
                <el-table-column label="Họ Tên" prop="fullName"/>
                <el-table-column label="Giới Tính" prop="sex"/>
                <el-table-column label="Ngày Sinh" prop="Date"/>
                <el-table-column label="Lớp" prop="className"/>
                <el-table-column label="Email" prop="email"/>
                <el-table-column label="Số Điện Thoại" prop="numberPhone"/>
                <el-table-column label="Địa Chỉ" prop="Address"/>
            </el-table>
            <template #footer>
        <span class="dialog-footer">
          <el-button type="danger" @click="execelVisible = false">Thoát</el-button>
          <el-button type="primary" @click="submitImportExcel">
            Nhập excel
          </el-button>
        </span>
            </template>
        </el-dialog>
    </div>
</template>
<style lang=""></style>
