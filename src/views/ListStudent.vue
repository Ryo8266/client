<template>
    <div class="">
        <h1 class="text-3xl font-bold mb-10">Danh Sách Lớp {{ className }}</h1>
        <div class="flex justify-between mb-5">
        </div>
        <div class="">

            <div class="bg-white p-4 ">
                <el-page-header @back="goBack" content=''>
                </el-page-header>
                <div class="w-full">
                    <div class="mt-6 justify-between flex ">
                        <div class="basis-2/4">
                            <el-input v-model="input2"
                                      placeholder="Nhập Mã Học Sinh, Tên Học Sinh" prefix-icon="el-icon-search">
                            </el-input>

                        </div>
                        <div v-if="this.role == 'gv'">
                            <el-button slot="trigger" type="primary" @click="execelVisible = true">Upload Excel File
                            </el-button>

                        </div>
                    </div>

                    <div>

                    </div>
                </div>
                <el-form>
                    <el-table :data="this.listStudent" border caption="Table Title" height="500" class-name="mt-4"
                              style="width: 100%;border-collapse: collapse;">
                        <el-table-column type="index" width="50"/>
                        <el-table-column label="Mã Học Sinh" prop="userName"/>
                        <el-table-column label="Họ Tên" prop="fullName"/>
                        <el-table-column label="Giới Tính" prop="sex"/>
                        <el-table-column label="Ngày Sinh" prop="Date"/>
                        <el-table-column label="Lớp" prop="className"/>
                        <el-table-column align="center" label="Chức Năng">
                            <template #default="scope">
                                <el-button type="primary" @click="handleAdd(scope.$index, scope.row)"
                                           v-if="this.role =='gv'">
                                    <el-icon>
                                        <Plus/>
                                    </el-icon>
                                </el-button>
                                <el-button type="success" @click="handleView(scope.$index, scope.row)">
                                    <el-icon>
                                        <View/>
                                    </el-icon>
                                </el-button>
                                <el-button type="warning" @click="handleEdit(scope.$index, scope.row)"
                                           v-if="this.role == 'admin'">
                                    <el-icon>
                                        <Edit/>
                                    </el-icon>
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form>
                <el-pagination :current-page="currentPage" :page-size="pageSize" :total="total" background class="mt-4"
                               layout="prev, pager, next" @size-change="handleSizeChange"
                               @current-change="handleCurrentChange"/>
            </div>
        </div>
        <el-dialog v-model="dialogFormVisible" title="Nhập Điểm ">
            <h1 class="pb-3 text-xl">{{NameStudent }} - {{idStudent }}</h1>
            <el-form :model="form">
                <el-form-item label="Môn học" width="150">
                    <el-input v-model="this.form.subjectName" controls-position="right" :precision="2" :step="0.1"
                              :max="10" autocomplete="off" disabled/>
                </el-form-item>
                <el-form-item label="Điểm 15 phút" width="150">
                    <el-input-number v-model="form.Score15m" controls-position="right" :precision="2" :step="0.1"
                                     :max="10" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="Điểm 1 Tiết" width="150">
                    <el-input-number v-model="form.Score45m" controls-position="right" :precision="2" :step="0.1"
                                     :max="10" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="Điểm Cuối Kỳ" width="150">
                    <el-input-number v-model="form.Score60m" controls-position="right" :precision="2" :step="0.1"
                                     :max="10" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="Học Kỳ">
                    <el-select v-model="form.semester" placeholder="Chọn Học Kỳ">
                        <el-option label="Học Kỳ 1" value="1"/>
                        <el-option label="Học Kỳ 2" value="2"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="Năm học">
                    <el-select v-model="form.yearName" label="Chọn Năm học" placeholder="Chọn Khối">
                        <el-option v-for="type in this.listYear" :key="type.value" :label="type.label"
                                   :value="type.value"/>
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">Thoát</el-button>
                    <el-button type="primary" @click="submit">
                        Lưu
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog v-model="dialogTableVisible" title="Bảng Điểm ">
            <h1 class="pb-3 text-xl"> {{NameStudent }} - {{idStudent }}</h1>
            <el-select v-model="valueNamHoc" label="Chọn Năm học" placeholder="Chọn Năm Học ">
                <el-option v-for="type in this.listYear" :key="type.value" :label="type.label"
                           :value="type.value"/>
            </el-select>
            <el-select v-model="valueHocKy" label="Học Kỳ" placeholder="Chọn Học Kỳ">
                <el-option label="Học Kỳ 1" value="1"/>
                <el-option label="Học Kỳ 2" value="2"/>
              <el-option label="Tổng Kết" value="3"/>
            </el-select>
            <el-table :data="dataScore" v-if="this.role == 'gv' && valueHocKy !=3 ">
                <el-table-column property="Score15m" label="Điểm 15 phút"/>
                <el-table-column property="Score45m" label="Điểm 45 phút"/>
                <el-table-column property="Score60m" label="Điểm 60 phút"/>
                <el-table-column property="average" label="Trung Bình Cộng"/>
            </el-table>
            <el-table :data="dataScoreAll"  v-if="this.role == 'admin' && valueHocKy !=3  ">
                <el-table-column property="subjectName" label="Tên Môn Học"/>
                <el-table-column property="Score15m" label="Điểm 15 phút"/>
                <el-table-column property="Score45m" label="Điểm 45 phút"/>
                <el-table-column property="Score60m" label="Điểm 60 phút"/>
                <el-table-column property="average" label="Trung Bình Cộng"/>
            </el-table>
          <el-table
              v-if="valueHocKy == 3"
              :data=" dataScoreAll "
              border
              class-name="mt-4"
              style="width: 100%; border-collapse: collapse"
          >
            <el-table-column property="subjectName" label="Tên Môn Học"/>

            <el-table-column property="average" label="Tổng kết"/>
          </el-table>

        </el-dialog>

        <el-dialog v-model="dialogTableVisibleEdit" title="Sửa Điểm ">
            <h1 class="pb-3 text-xl">{{NameStudent }} - {{idStudent }}</h1>
            <el-select v-model="valueNamHocEdit" label="Chọn Năm học" placeholder="Chọn Năm Học " class="mb-4">
                <el-option v-for="type in this.listYear" :key="type.value" :label="type.label"
                           :value="type.value"/>
            </el-select>
            <el-select v-model="valueHocKyEdit" label="Học Kỳ" placeholder="Chọ Học Kỳ" class="mb-4">
                <el-option label="Học Kỳ 1" value="1"/>
                <el-option label="Học Kỳ 2" value="2"/>
            </el-select>
            <el-table :data="dataScoreAllEdit" v-if="this.role == 'admin' ">
                <el-table-column property="subjectName" label="Tên Môn Học"/>
                <el-table-column property="Score15m" label="Điểm 15 phút">
                    <template #default="scope">
                        <el-input-number controls-position="right" :step="0.1" :max="10" :min="0"
                                         v-model="scope.row.Score15m"
                                         @change="hangeChange(scope.$index, scope.row)"/>
                    </template>
                </el-table-column>
                <el-table-column property="Score45m" label="Điểm 45 phút">
                    <template #default="scope">
                        <el-input-number controls-position="right" :step="0.1" :max="10" :min="0"
                                         v-model="scope.row.Score45m"
                                         @change="hangeChange(scope.$index, scope.row)"/>
                    </template>
                </el-table-column>
                <el-table-column property="Score60m" label="Điểm 60 phút">
                    <template #default="scope">
                        <el-input-number controls-position="right" :precision="2" :step="0.1" :max="10" :min="0"
                                         v-model="scope.row.Score60m"
                                         @change="hangeChange(scope.$index, scope.row)"/>
                    </template>
                </el-table-column>
                <el-table-column property="average" label="Trung Bình Cộng"/>
            </el-table>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogTableVisibleEdit = false">Thoát</el-button>
                    <el-button type="primary" @click="submitEdit">
                        Cập Nhật
                    </el-button>
                </span>
            </template>
        </el-dialog>
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
                <el-table-column label="Mã Học Sinh" prop="accountId"/>
                <el-table-column label="Họ Tên" prop="fullName"/>
                <el-table-column label="Giới Tính" prop="sex"/>
                <el-table-column label="Ngày Sinh" prop="Date"/>
                <el-table-column label="Lớp" prop="className"/>
                <el-table-column property="subjectName" label="Môn học"/>
                <el-table-column property="Score15m" label="Điểm 15 phút"/>
                <el-table-column property="Score45m" label="Điểm 45 phút"/>
                <el-table-column property="Score60m" label="Điểm 60 phút"/>
                <el-table-column property="average" label="Trung Bình Cộng"/>
                <el-table-column property="semester" label="Học Kỳ"/>
                <el-table-column property="yearName" label="Năm học"/>
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
<script>
import UserService from "@/api/auth/user.service";
import Score from "@/api/Score";
import YearSecrvice from "@/api/Year";
import SubjectService from "@/api/Subject";
import userService from "@/api/auth/user.service";
import store from "@/store";
import {Edit} from "@element-plus/icons-vue";

export default {
    name: "ListStudent",
    components: {Edit},
    data() {
        let url = window.location.href
        let className = url.substring(url.lastIndexOf('/') + 1);
        let role = store.state.auth.user.role
        return {
            className,
            role,
            listStudent: [],
            currentPage: 1,
            pageSize: 20,
            total: 0,
            listYear: [],
            listSubject: [],
            input2: '',
            form: {
                Score15m: 0,
                Score45m: 0,
                Score60m: 0,
                average: 0,
                semester: '',
                accountId: '',
                subjectName: '',
                yearName: ''
            },
            formEdit: {

                Score15m: 0,
                Score45m: 0,
                Score60m: 0,
                average: 0,
                semester: '',
                accountId: '',
                subjectName: '',
                yearName: ''
            },
            previewData: [],
            dialogFormVisible: false,
            dataScoreAllEdit: '',
            yearValue: '',
            listYear: [],
            dialogTableVisible: false,
            dataScore: [],
            dataScoreAll: [],
            valueHocKy: '',
            valueNamHoc: '',
            valueHocKyEdit: '',
            valueNamHocEdit: '',
            valueId: '',
            valueSubject: '',
            dialogTableVisibleEdit: false,
            subjectId: '',
            NameStudent:'',
            idStudent:"",
            idEdit: '',
            execelVisible: false,

        }
    },
    created() {
        this.getAllData()
        this.getAllYear()
        this.getSubjectIdByName()
    },
    watch: {
        valueHocKy: function (event) {
            Score.getAll(this.valueId, this.subjectId, this.valueHocKy, this.valueNamHoc).then(res => {
                this.dataScore = res.data
                console.log(res.data)
            })
            Score.getAllScore(this.valueId, this.valueHocKy, this.valueNamHoc).then(res => {
                this.dataScoreAll = res.data
                console.log('data All', res.data)
            })
        },
        valueNamHoc: function (value) {
            Score.getAll(this.valueId, this.subjectId, this.valueHocKyEdit, value).then(res => {
                this.dataScore = res.data
                console.log(res.data)
            })
            Score.getAllScore(this.valueId, this.valueHocKy, value).then(res => {
                this.dataScoreAll = res.data
                console.log('data All', res.data)
            })
        },
        valueHocKyEdit: function (value) {
            this.valueHocKyEdit = value
            Score.getAll(this.valueId, this.subjectId, this.valueHocKyEdit, this.valueNamHocEdit).then(res => {
                this.formEdit = {...res.data[0]}
                console.log(res.data)
                console.log(this.formEdit.semester)
            })
            Score.getAllScore(this.valueId, this.valueHocKyEdit, this.valueNamHocEdit).then(res => {
                this.dataScoreAllEdit = res.data
                console.log('data All', res.data)
            })
        },
        valueNamHocEdit: function (value) {
            this.valueNamHocEdit = value
            Score.getAll(this.valueId, this.subjectId, this.valueHocKyEdit, this.valueNamHocEdit).then(res => {

                this.formEdit = {...res.data[0]}
                console.log(res.data)
                console.log(this.formEdit.semester)
            })
            Score.getAllScore(this.valueId, this.valueHocKyEdit, this.valueNamHocEdit).then(res => {
                this.dataScoreAllEdit = res.data
                console.log('data All', res.data)
            })
        },
        input2: function (value) {
            this.getAllData()
        }
    },
    methods: {
        hangeChange(index, value, val) {
            
            console.log('hange Change', value.Score15m)
            console.log('hange Change', value.id)
            value.average = ((value.Score15m + value.Score60m + value.Score45m) / 3)
                this.formEdit.Score15m =value.Score15m,
                this.formEdit.Score45m = value.Score45m,
                this.formEdit.Score60m= value.Score60m,
                this.formEdit.average = value.average

        },

        handleCurrentChange(val) {
            console.log(val)
            this.currentPage = val;
            this.getAllData();
        },
        goBack() {
            window.history.back()
        },
        getAllData() {
            UserService.getStudentFillters(undefined, this.input2, this.className, '').then(result => {
                this.total = result.data.length
                console.log(this.total)
            })
            UserService.getStudentFillters(this.currentPage, this.input2, this.className, '').then(result => {
                this.listStudent = result.data
                console.log(result.data)
            })
        },
        getSubjectIdByName() {
            this.form.subjectName = localStorage.getItem('subjectTeacherName')
            SubjectService.getAllSubjectsByName(this.form.subjectName).then(result => {
                this.subjectId = result.data.id
                console.log(result.data)
            })
        },
        getAllYear() {
            YearSecrvice.getYearActive().then(result => {
                this.listYear = result.data.map(({id, name}) => ({label: name, value: name}))
                console.log(result.data)
            })
        },
        handleAdd(index, v) {
            this.form.accountId = v.userName
            this.dialogFormVisible = true
        },
        handleView(index, v) {
          this.NameStudent = v.fullName,
              this.idStudent = v.userName
            this.dialogTableVisible = true
            this.valueId = v.userName
            this.valueSubject = this.form.subjectName
            Score.getAll(v.userName, this.subjectId, this.valueNamHoc, this.valueHocKy).then(res => {
                this.dataScore = res.data
                console.log(res.data)
            })

            Score.getAllScore(v.userName, this.subjectId, this.valueNamHoc, this.valueHocKy).then(res => {
                this.dataScoreAll = res.data
                console.log(res.data)
            })
        },
        handleEdit(index, v) {
            this.NameStudent = v.fullName,
            this.idStudent = v.userName
            console.log(v)
            this.dataScoreAllEdit = ''

            console.log(this.formEdit)
            this.valueId = v.userName
            this.dialogTableVisibleEdit = true,
                Score.getAll(v.userName, this.subjectId, this.valueNamHoc, this.valueHocKy).then(res => {
                    Object.assign(this.formEdit, res.data);
                })
        },
        submit() {
            this.form.average = (this.form.Score15m + this.form.Score45m + this.form.Score60m) / 3
            console.log(this.form)
            Score.create(this.form).then(result => {
                console.log(result)
                if (result.data.isError) {
                    this.$notify({type: "error", title: "Lỗi", text: `${result.data.Message}`});
                    this.form.Score15m=0,
                        this.form.Score45m=0,

                        this.form.Score60m=0

                } else {
                    this.$notify({type: "success", title: "Thành Công", text: `Nhập Điểm Thành Công`});
                location.reload()

                }


                this.dialogFormVisible = false
            }).catch(eros => {
                this.$notify({type: "error", title: "Thất Bại", text: `Lỗi xảy ra, vui lòng thử lại`});
            })
        },
        submitEdit() {

            this.idEdit = this.formEdit.id
            if(this.idEdit === undefined){
                console.log(true)
                this.idEdit = this.formEdit[0].id
            }
            this.formEdit.average = (this.formEdit.Score15m + this.formEdit.Score45m + this.formEdit.Score60m) / 3
            console.log( 'formEdit',this.formEdit)

            Score.update(this.idEdit, this.formEdit).then(result => {
                 console.log(result)
                this.$notify({type: "success", title: "Thành Công", text: ` Cập Nhật Điểm Thành Công Thành Công`});
                this.valueHocKyEdit = '',

                this.dialogTableVisibleEdit = false
                this.valueNamHocEdit=''
                    this.dataScoreAllEdit = ''
            })
        },

    }
}
</script>

<style scoped></style>