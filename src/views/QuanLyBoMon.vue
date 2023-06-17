<template>
    <div class="">
        <h1 class="text-3xl font-bold mb-10">Quản Lý Bộ Môn</h1>
        <div class="flex justify-between mb-5">
        </div>
        <div class="">

            <div class="bg-white p-4 ">
                <div class="flex justify-between">
                    <h1>Danh Sách Bộ Môn</h1>
                    <el-button type="primary" @click="dialogVisible = true">
                        <el-icon>
                            <Plus/>
                        </el-icon>
                        Thêm Bộ Môn
                    </el-button>
                </div>

                <el-table :data="this.listSubject" :row-key="getRowKey" border caption="Table Title"
                          class-name="mt-4" style="width: 100%;border-collapse: collapse;">
                    <el-table-column type="index" width="50"/>
                    <el-table-column label="Tên Bộ Môn" prop="name"/>
                    <el-table-column label="Sô Giáo Viên" prop="_count.teachers"/>
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
                <el-dialog v-model="dialogVisible" title="Thêm Bộ Môn Giảng Dạy" width="80%">
                    <el-form ref="myForm" :model="form">
                        <el-form-item :label-width="formLabelWidth" label="Tên Bộ Môn">
                            <el-input v-model="form.name" autocomplete="off"/>
                        </el-form-item>
                    </el-form>
                    <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" @click="dialogVisible = false">Thoát</el-button>
        <el-button type="primary" @click="addSubject">
          Thêm
        </el-button>
      </span>
                    </template>
                </el-dialog>
            </div>
            <div>
                <el-dialog v-model="editVisible" title="Sửa Bộ Môn Giảng Dạy" width="80%">
                    <el-form ref="myForm" :model="this.nameEdit">
                        <el-form-item :label-width="formLabelWidth" label="Tên Bộ Môn">
                            <el-input v-model="this.nameEdit" autocomplete="off"/>
                        </el-form-item>
                    </el-form>
                    <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" @click="editVisible = false">Thoát</el-button>
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
import SubjectTeacherService from "@/api/SubjectTeacher";
import SubjectTeacher from "@/api/SubjectTeacher";
import {Check, Delete, Edit, Message, Search, Star,} from '@element-plus/icons-vue'

export default {
    name: "QuanLyBoMon",
    components: {
        Check,
        Delete,
        Edit,
        Message,
        Search,
        Star,
    },
    data() {
        return {
            listSubject: [],
            HeaderData: ["Số thứ tự", "Tên Bộ Môn", "Số lượng giáo viên"],
            editVisible: false,
            subjectTeacher: [],
            dialogVisible: false,
            formLabelWidth: '140px',
            deleteVisible: false,
            idEdit: '',
            nameEdit: '',
            idItem: '',
            form: {
                name: '',

            },
            name: '',
            filterValue: '',
            currentPage: 1,
            pageSize: 6,
            indexTem: 0,
            total: 0

        }
    },
    created() {
        SubjectTeacherService.getAll().then(res => {
            this.total = res.data.length;
        })
        this.getData()
    },

    computed: {
        filteredTableData() {
            if (this.filterValue === '') {
                return this.listSubject;
            } else {
                return this.listSubject.filter((item) => item.name === this.filterValue);
            }
        },
        currentTableData() {
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            return this.filteredTableData.slice(startIndex, endIndex);
        },
    },
    methods: {
        getData() {
            console.log(this.currentPage)
            SubjectTeacherService.getAllbyPage(this.currentPage).then(res => {
                this.listSubject = res.data
                console.log(res.data)
            })
        },
        handleEdit(index, row) {
            this.editVisible = true,
                this.nameEdit = row.name
            this.idEdit = row.id
            console.log(index, row.name)
        },
        EditSubject(data) {
            this.$refs.myForm.validate(valid => {
                if (valid) {
                    SubjectTeacherService.edit(this.idEdit, {name: this.nameEdit}).then(() => {
                        this.getData()
                        this.editVisible = false
                        this.$notify({
                            type: "success",
                            title: "Thành Công",
                            text: `Sửa bộ  môn thành công`,
                        });
                    })
                } else {
                    console.log('Validation failed');
                    return false;
                }
            });
        },
        handleDelete(index, row) {
            this.deleteVisible = true;
            this.idItem = row.id
            this.name = row.name;
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
        getRowKey(row) {
            return row.name;
        },
        SubmitDelete() {
            SubjectTeacherService.delete(this.idItem).then(() => {
                this.getData()
                this.deleteVisible = false
            })

        },

        closeToggle() {
            this.isShow = false
        },
        addSubject(data) {
            this.$refs.myForm.validate(valid => {
                if (valid) {
                    SubjectTeacherService.create(this.form).then(res => {
                        this.$notify({
                            type: "success",
                            title: "Thành Công",
                            text: `Tạo bộ môn thành công`,
                        });
                        this.dialogVisible = false
                        this.getData()
                        this.form.name=''
                    })
                } else {
                    console.log('Validation failed');
                    return false;
                }
            });

        },
    }
}
</script>

<style>
.el-pagination__jump {
    display: none;
}

.el-table td,
.el-table th {
    border: 1px solid #ddd;
    padding: 10px;
}
</style>