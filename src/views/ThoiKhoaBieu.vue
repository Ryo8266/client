<template>
    <div class="">
        <h1 class="text-3xl font-bold mb-10">Danh Sách Thời Khóa Biểu</h1>
        <div class="">
            <div class="bg-white p-4 ">
                <div class="flex justify-between mb-4 ">
                    <h1 class="text-xl font-bold">Danh Sách Lớp</h1>
                </div>
                <h2> Chọn Khối Học </h2>
                <el-select v-model="filterValue" placeholder="Chọn Khối">
                    <el-option label="6" value="6"></el-option>
                    <el-option label="7" value="7"></el-option>
                    <el-option label="8" value="8"></el-option>
                    <el-option label="9" value="9"></el-option>
                </el-select>
                <el-table :data="listClass" border caption="Table Title" class-name="mt-4"
                          style="width: 100%;border-collapse: collapse;">
                    <el-table-column type="index" width="50"/>
                    <el-table-column label="Tên Lớp" prop="name"/>
                    <el-table-column label="Khối" prop="Khoi"/>

                    <el-table-column align="right" label="Chức Năng">
                        <template #default="scope">

                            <el-button type="success" @click="handleView(scope.$index, scope.row)">
                                <el-icon>
                                    <View/>
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
                <el-dialog v-model="viewVisible" width="80%">
                    <el-select v-model="yearValue" label="Chọn Năm học">
                        <el-option v-for="type in this.listYear" :key="type.value" :label="type.label"
                                   :value="type.value"/>
                    </el-select>
                    <ViewShedule :class-name="this.viewClass" :isOpen="this.isShowView" :shedule="this.listShedule"/>
                    <template #footer>
            <span class="dialog-footer">
              <el-button type="danger" @click="viewVisible = false">Thoát</el-button>
            </span>
                    </template>
                </el-dialog>
            </div>
            <div>
                <el-dialog v-model="editVisible" title='Sửa thời khóa biểu lớp' width="80%">
                    <h2> Chọn Năm Học</h2>
                    <div class="mb-3">
                        <el-select v-model="yearValue" label="Chọn Năm học" placeholder="Chọn Khối">
                            <el-option v-for="type in this.listYear" :key="type.value" :label="type.label"
                                       :value="type.value"/>
                        </el-select>
                    </div>
                    <table class="min-w-full w-[1000px]  table-auto border-collapse block md:table">
                        <thead class="block md:table-header-group">
                        <tr
                                class="border border-green-300  block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
                            <th
                                    class="bg-green-500 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">
                                Tiết
                            </th>
                            <th
                                    class="bg-green-500 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">
                                Thứ 2
                            </th>
                            <th
                                    class="bg-green-500 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">
                                Thứ 3
                            </th>
                            <th
                                    class="bg-green-500 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">
                                Thứ 4
                            </th>
                            <th
                                    class="bg-green-500 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">
                                Thứ 5
                            </th>
                            <th
                                    class="bg-green-500 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">
                                Thứ 6
                            </th>
                            <th
                                    class="bg-green-500 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">
                                Thứ 7
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="i in 10">
                            <td
                                    class=" text-center   border-r border-r-green-300 font-medium text-base py-2 px-2  border-b border-l border-b-green-300">
                                {{ i }}
                            </td>
                            <td v-for="dayItem in dataDay"
                                class=" text-center   border-r border-r-green-300 font-medium text-base pb-2 px-2  border-b border-l border-b-green-300">
                                <template
                                        v-if="this.dataEdit.find(lesson => lesson.time == i && lesson.nameDate === dayItem)">
                                    <div>
                                        <select
                                                v-model="this.dataEdit.find(lesson => lesson.time == i && lesson.nameDate === dayItem).subjectName"
                                                :name="'Thu ' + dayItem + ' tiet' + i" as="select"
                                                class="block w-full px-4 pb-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                                @change="onChangeUpdate(e, i)">
                                            <option :data-value="dataEdit.find(lesson => lesson.time == i && lesson.nameDate === dayItem).id"
                                                    class="text-gray-400" selected value="">Chọn Môn
                                            </option>
                                            <option v-for="(item, index) in this.listSubject " :key="item.id"
                                                    :data-value="dataEdit.find(lesson => lesson.time == i && lesson.nameDate === dayItem).id"
                                                    :value='item.name'>
                                                {{ item.name }}
                                            </option>
                                        </select>
                                    </div>
                                </template>
                                <template v-else>
                                    <div>
                                        <select :name="'Thu ' + dayItem + ' tiet' + i" as="select"
                                                class="block w-full px-4 pb-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                                placeholder="Chọn Môn" @change="onChange">
                                            <option class="text-gray-400" selected>Chọn Môn</option>
                                            <option v-for="(item, index) in this.listSubject " :key="item.id"
                                                    :value='getOptionValue(item, dayItem, i)'>
                                                {{ item.name }}
                                            </option>
                                        </select>
                                    </div>
                                </template>
                            </td>
                        </tr>
                        </tbody>
                    </table>
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
        </div>
    </div>
</template>
<script>
import TableShedule from "@/components/TableData/TableShedule.vue";
import ClassService from "@/api/Class";
import AddTable from "@/components/tableAddSchedule/AddTable.vue";
import TeacherScheduleService from "@/api/TeacherShedule"
import Shedule from "@/api/Shedule"
import YearService from "@/api/Year"
import ViewShedule from "@/components/TableData/ViewShedule.vue";
import SubjectService from "@/api/Subject"
import EditFormShedule from "@/components/FormEdit/EditFormShedule.vue";
import {Form} from "vee-validate"

export default {
    name: "ThoiKhoaBieu",
    components: {EditFormShedule, ViewShedule, AddTable, TableShedule, Form},
    data() {
        return {
            HeaderData: [
                "Số Thứ Tự",
                "Tên Lớp",
                "Khối",
                "Chức Năng"
            ],
            dialogVisible: false,
            filterValue: '',
            listClass: [],
            viewVisible: false,
            class: {},
            filterClass: [],
            isShow: false,
            isShowView: false,
            classTarget: '',
            khoiTarget: '',
            listSubject: [],
            DataHeader: ['Tiết', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7',],
            dataDay: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            editVisible: false,
            listShedule: [],
            viewClass: '',
            isShowEdit: false,
            dataEdit: [],
            listYear: [],
            yearValue: undefined,

        }
    },


    watch: {

        filterValue: function (value) {
            this.getAllData()
        },
        yearValue: function (value) {
            console.log(value)


            TeacherScheduleService.getClass(this.classTarget,  value).then(
                res => {
                    this.listShedule = res.data
                    console.log('list',this.listShedule)
                })
        }
    },
    methods: {
        submitEdit() {
            this.editVisible = false
            this.$notify({
                type: "success",
                title: "Thành Công",
                text: `Update Thời Khóa Biểu Thành Công`,
            });
        },
        submitForm(data) {
            console.log(data)
        },
        handleAdd(index, value) {
            this.dialogVisible = true
            SubjectService.getAllSubjectsbyKhoi(value.Khoi).then(
                res => {
                    this.listSubject = res.data
                }
            )
        },
        converObjectToString(item) {
            return JSON.stringify(item)
        },
        updateName(index, value) {
            this.items[index].name = value;
            console.log()
        },
        onChange(e) {
            const data = JSON.parse(e.target.value);
            ScheduleService.updateAndCreate('undefined', data).then(result => {
                console.log(result.data)
            })
        },
        getOptionValue(item, day, tiet) {
            const valueString = '{ "subjectName": "' + item.name + '", "time": "' + tiet + '", "nameDate": "' + day + '", "className": "' + this.classTarget + '","yearName": "' + this.yearValue + '" }';
            return valueString;
        },
        onChangeUpdate(e, i) {
            const selectedValue = event.target.options[event.target.selectedIndex].dataset.value;
            console.log('Selected value:', selectedValue);
            console.log('v-model:', event.target.value);
            console.log('v-model:', i);
            const data = {
                subjectName: event.target.value,
            }
            console.log(data);
            ScheduleService.updateAndCreate(selectedValue, data).then(result => {
                console.log(result.data)
            })

        },
        handleEdit(index, value) {
            this.editVisible = true
            ScheduleService.getByClass(value.name, this.yearValue).then(result => {
                this.dataEdit = result.data
            })
            YearService.getYearActive().then(result => {
                this.listYear = result.data.map(({id, name}) => ({label: name, value: name}))
                this.yearValue = this.listYear[0].value
            })
            this.classTarget = value.name
            SubjectService.getAllSubjectsbyKhoi(value.Khoi).then(
                res => {
                    this.listSubject = res.data
                }
            )
        },

        handleView(index, value) {
            this.viewVisible = true
            this.classTarget = value.name
            YearService.getYearActive().then(result => {
                this.listYear = result.data.map(({id, name}) => ({label: name, value: name}))
                this.yearValue = this.listYear[0].value
            })
            console.log(value)
            TeacherScheduleService.getClass(value.name,  this.yearValue).then(
                res => {
                    this.listShedule = res.data
                    console.log('list',this.listShedule)
                })
        },
        submit() {
            this.$notify({
                type: "success",
                title: "Thành Công",
                text: `Update Thời Khóa Biểu Thành Công`,
            });
            this.isShowEdit = false
        },
        getAllData() {
            ClassService.getClassByList(this.filterValue).then(result => {
                this.listClass = result.data
            })
        },
        actionEdit(lop, khoi) {
            this.classTarget = lop
            this.isShowEdit = true;
        },

        createMany(data) {
            console.log()
            ScheduleService.createMany(data).then(res => {
                this.isShow = false
                this.$notify({
                    type: "success",
                    title: "Thành Công",
                    text: `Thêm Thời Khóa Biểu Thành Công`,
                });
            })
        },

    }
}
</script>

<style scoped></style>