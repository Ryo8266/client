<template>
    <div class="">
        <h1 class="text-3xl font-bold mb-10">Quản Lý Lớp Học</h1>
        <div class="flex justify-between mb-5">
        </div>
        <div class="">

            <div class="bg-white p-4 ">
                <div class="flex justify-between mb-4 ">
                    <h1 class="text-xl font-bold">Danh Sách Lớp Học</h1>
                    <div>
                        <el-button type="primary" @click="dialogVisible = true">
                            <el-icon>
                                <Plus/>
                            </el-icon>
                            Thêm Lớp Học
                        </el-button>
                    </div>


                </div>
                <h2> Lọc Theo Khối</h2>
                <el-select v-model="filterValue" placeholder="Chọn Khối">
                    <el-option label="Tất cả" value=""></el-option>
                    <!--                  /  <el-option v-for="type in this.listKhoi" :key="type.value" :label="type.label"-->
                    <!--                               :value="type.value"><el-option>-->
                    <el-option label="6" value="6"></el-option>
                    <el-option label="7" value="7"></el-option>
                    <el-option label="8" value="8"></el-option>
                    <el-option label="9" value="9"></el-option>

                </el-select>
                <el-table :data="this.listClass" border caption="Table Title"
                          class-name="mt-4" style="width: 100%;border-collapse: collapse;">
                    <el-table-column type="index" width="50"/>
                    <el-table-column label="Tên Lớp" prop="name"/>
                    <el-table-column
                            :filter-method="filterHandler"
                            :filters="this.listKhoi"
                            label="Khối"
                            prop="Khoi"
                    />
                    <el-table-column label="Số Lượng Học Sinh" prop="_count.student"/>
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
                <el-dialog v-model="dialogVisible" title="Thêm Lớp Học" width="80%">
                    <el-form ref="ruleFormRef" :model="ruleForm" :rules="this.rules">
                        <el-form-item :label-width="formLabelWidth" label="Tên Lớp" prop="name">
                            <el-input v-model="ruleForm.name" autocomplete="off"/>
                        </el-form-item>
                        <el-form-item :label-width="formLabelWidth" label="Khối" prop="Khoi">
                            <el-select v-model="ruleForm.Khoi" placeholder="Chọn Khối">
                                <el-option v-for="type in this.listKhoi" :key="type.value" :label="type.label"
                                           :value="type.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>


                        </el-form-item>
                    </el-form>
                    <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" @click="dialogVisible = false">Thoát</el-button>

   <el-button type="primary" @click="submitForm(ruleFormRef)">
                Create
              </el-button>
      </span>
                    </template>
                </el-dialog>
            </div>
            <div>
                <el-dialog v-model="editVisible" title="Sửa Lớp Học" width="80%">
                    <el-form ref="myForm" :model="form">
                        <el-form-item :label-width="formLabelWidth" label="Lớp Học" required>
                            <el-input v-model="form.name" autocomplete="off" required/>
                        </el-form-item>
                        <el-form-item :label-width="formLabelWidth" label="Khối">
                            <el-select v-model="form.Khoi" placeholder="Chọn Khối">
                                <el-option v-for="type in this.listKhoi" :key="type.value" :label="type.label"
                                           :value="type.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" @click="editVisible  = false">Thoát</el-button>
        <el-button type="primary" @click="EditClass">
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
        <el-button type="danger" @click="deleteClass">
          Có
        </el-button>
      </span>
                </template>
            </el-dialog>
        </div>

    </div>
</template>

<script lang="ts">
import TableClass from "@/components/TableData/TableClass.vue";
import ClassService from "@/api/Class";
import ExcelTable from "@/components/ExcelTable.vue";
import xlsx from "xlsx/dist/xlsx.full.min";
import AddFormClass from "@/components/AddForm/AddFormClass.vue";
import ListClass from "@/api/listClass";
import {reactive, ref} from 'vue'
import type {FormInstance, FormRules} from 'element-plus'
import FormInstance from 'element-plus'

export default {
    name: "DanhSachLopHoc",
    components: {
        TableClass,
        ExcelTable,
        AddFormClass,
    },
    setup() {
        const ruleFormRef = ref<FormInstance>()
        const ruleForm = reactive({
            name: '',
            Khoi: '',
        })

        const rules = reactive<FormRules>({
            name: [
                {required: true, message: 'Mời bạn nhập tên lớp', trigger: 'blur'},

            ],
            Khoi: [
                {
                    required: true,
                    message: 'Mời bạn chọn khối',
                    trigger: 'change',
                },
            ],
        })
        return {
            ruleFormRef,
            ruleForm,
            rules,
        }
    },
    data() {
        return {
            allData: [''],
            KhoiEdit: '',
            editVisible: false,
            listKhoi: [],
            listClass: [''],
            selectedOption: "",
            editVisible: false,
            dialogVisible: false,
            formLabelWidth: '140px',
            deleteVisible: false,
            idEdit: '',
            nameEdit: '',
            idItem: '',
            form: {
                name: '',
                Khoi: '',
            },

            name: '',
            filterValue: '',
            template: [],
            currentPage: 1,
            pageSize: 8,
            indexTem: 0,
            total: 0,
            selectedOption: 'all',
        };
    },
    created() {
        ClassService.getClass().then((res) => {
            this.total = res.data.length
            this.allData = res.data
        })
        ListClass.getAll().then((res) => {
            this.listKhoi = res.data.listClass.map(({id, name}) => ({label: name, value: name}));
        })
        this.getData()
    },
    watch: {
        filterValue: function (newVal, oldVal) {
            console.log(newVal)
            this.currentPage = 1;
            this.getData()
            this.setTotalPages()
        },
        nameEdit: function (newVal, oldVal) {
            console.log(newVal)
            console.log(oldVal)
        }
    },
    methods: {
        resetForm(formEl: FormInstance | undefined) {
            if (!formEl) return
            formEl.resetFields()
        },
        async submitForm(formEl: FormInstance) {
            if (!formEl) return
            await formEl.validate((valid, fields) => {
                if (valid) {
                    const data = {
                        name: this.ruleForm.name,
                        Khoi: this.ruleForm.Khoi
                    }
                    ClassService.createClass(data).then((result) => {
                        this.dialogVisible = false
                        this.getData(),
                            this.setTotalPages(),
                            console.log(result.data)
                        if (result.data.isError) {
                            this.$notify({
                                type: "error",
                                title: "Lỗi",
                                text: `${result.data.message}`,
                            });
                        } else {
                            this.$notify({
                                type: "success",
                                title: "Thành Công",
                                text: `${result.data.message}`,
                            });
                        }
                    });
                } else {
                    console.log('error submit!', fields)
                }
            })
        },
        getData() {
            ClassService.filterClass(this.filterValue, this.currentPage).then((res) => {
                this.listClass = res.data
            })
        },
        setTotalPages() {
            ClassService.filterClass(this.filterValue).then((res) => {
                this.total = res.data.length
            })
        },
        changeValue(e) {
            this.khoi = e.target.value;
            ClassService.filterClass(this.khoi).then((res) => {
                this.listClass = res.data;
                console.log(this.listClass)
            });
            ClassService.filterClass(e.target.value, 1).then(
                response => {
                    this.class = response.data
                    console.log('sub', this.class)
                }
            )
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.currentPage = 1;
            this.getData();
        },
        handleCurrentChange(val) {
            console.log(val)
            this.currentPage = val;
            this.getData();
        },

        handleEdit(index, val) {
            console.log(val)
            this.editVisible = true;
            this.form.name = val.name;
            this.form.Khoi = val.Khoi;
            this.idEdit = val.id;
        },
        EditClass() {
            ClassService.edit(this.idEdit, this.form).then(
                result => {

                    this.editVisible = false,
                        this.getData(),
                        this.setTotalPages(),
                        console.log(result.data)
                    this.$notify({
                        type: "success",
                        title: "Thành Công",
                        text: `Cập Nhật Thành Công`,
                    });
                }
            )
        },
        handleDelete(index, value) {
            this.deleteVisible = true
            this.idItem = value.id
        },
        deleteClass() {
            ClassService.delete(this.idItem).then(res => {
                this.deleteVisible = false,
                    this.getData()
                this.setTotalPages()
                this.$notify({
                    type: "success",
                    title: "Thành Công",
                    text: `Xóa Thành Công`,
                });

            })
        },
        exportExcel() {
            const XLSX = xlsx;
            const rows = this.allData.map(row => ({
                name: row.name,
                Khoi: row.Khoi,
            }));
            const worksheet = XLSX.utils.json_to_sheet(rows);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Danh Sách Lớp Học");
            XLSX.utils.sheet_add_aoa(worksheet, [["Tên Lớp", "Khối"]], {origin: "A1"});
            const max_width = rows.reduce((w, r) => Math.max(w, r.name.length), 10);
            worksheet["!cols"] = [{wch: max_width}];

            /* create an XLSX file and try to save to Presidents.xlsx */
            XLSX.writeFile(workbook, "Danh Sách Lớp Học.xlsx", {compression: true});

        },
    },

};
</script>
<style lang="scss"></style>
