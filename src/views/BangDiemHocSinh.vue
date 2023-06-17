<template>
    <div class="">
        <div class="flex justify-between mb-5"></div>
        <div class="">
            <div class="bg-white p-4">
                <div class="flex justify-between mb-4">
                    <h1 class="text-xl font-bold">Bảng Điểm</h1>
                </div>

                <h2>Lọc Năm
                    <Học></Học>
                </h2>
                <el-select v-model="valueNamHoc" label="Chọn Năm học" placeholder="Chọn Năm Học " class="mb-4">
                    <el-option v-for="type in this.listYear" :key="type.value" :label="type.label"
                               :value="type.value"/>
                </el-select>
                <el-select v-model="valueHocKy" label="Học Kỳ" placeholder="Chọn Học Kỳ" class="mb-4">
                    <el-option label="Học Kỳ 1" value="1"/>
                    <el-option label="Học Kỳ 2" value="2"/>
                    <el-option label="Tổng Kết" value="3"/>
                </el-select>
                <el-table
                    v-if="valueHocKy!=3"
                        :data="this.ScoreAllSubject"
                        border
                        class-name="mt-4"
                        style="width: 100%; border-collapse: collapse"
                >
                    <el-table-column property="subjectName" label="Tên Môn Học"/>
                    <el-table-column v-if="valueHocKy!=3" property="Score15m" label="Điểm 15 phút"/>
                    <el-table-column v-if="valueHocKy!=3" property="Score45m" label="Điểm 45 phút"/>
                    <el-table-column v-if="valueHocKy!=3" property="Score60m" label="Điểm 60 phút"/>
                    <el-table-column v-if="valueHocKy!=3" property="average" label="Trung Bình Cộng"/>

                </el-table>
              <el-table
                  v-else
                  :data=" this.ScoreAllSubject "
                  border
                  class-name="mt-4"
                  style="width: 100%; border-collapse: collapse"
              >
                <el-table-column property="subjectName" label="Tên Môn Học"/>

                <el-table-column property="average" label="Tổng kết"/>
              </el-table>

            </div>


        </div>
    </div>
</template>

<script>
import Score from '@/api/Score'
import YearService from '@/api/Year'

export default {
    name: "BangDiemHocSinh",
    data() {
        let userName = this.$store.state.auth.user.data
        return {
            userName,
            valueNamHoc: "",
            valueHocKy: "",
            ScoreAllSubject: [''],
            listYear: [''],
          result:[]
        }
    },
    created() {
        YearService.getYearActive().then(result => {
            this.listYear = result.data.map(({id, name}) => ({label: name, value: name}))
        })
    },
    watch: {
        valueNamHoc: function (value) {
            this.getAll()
        },
        valueHocKy: function (value) {
            this.getAll()
            this.EndPont()
        }
    },
    methods: {
        getAll() {
            Score.getAllScore(this.userName, this.valueHocKy, this.valueNamHoc).then(result => {
                this.ScoreAllSubject = result.data

                console.log(this.ScoreAllSubject)
            })
        },
       

    }
}
</script>

<style scoped>

</style>