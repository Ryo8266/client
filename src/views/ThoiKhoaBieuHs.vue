<template>
  <div class="p-8 bg-white rounded-3xl">
    <h1 class="text-3xl font-bold mb-10">Thời Khóa Biểu</h1>
    <div class="flex justify-between mb-5">
      <div class="flex gap-5">

      </div>
    </div>

    <table v-if="this.shedule.length >0" class="min-w-full w-[1000px]  table-auto border-collapse block md:table">
      <thead class="block md:table-header-group">
      <tr
          class="border border-green-300  block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
        <th v-for="(item, index) in this.DataHeader" :key="index"
            class="bg-green-500 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">
          {{ item }}
        </th>
      </tr>
      </thead>

      <tbody class="block md:table-row-group">
      <tr v-for="i in 10" :key="i">
        <td class=" text-center   border-r border-r-green-300 font-medium text-base py-5 px-2  border-b border-l border-b-green-300">
          Tiết {{ i }}
        </td>
        <td v-for="( itemDate,indexDay) in dataDay" :key="indexDay"
            class="  border-r border-r-green-300 text-center  font-medium text-base py-5 px-2  border-b border-b-green-300">

          <div v-for="(item,index) in shedule ">
            <div v-if=" item.time == i && item.nameDate == itemDate" >{{ item.subjectName}}</div>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
    <div v-else >
      <h2>Lớp học chưa có thời khóa biểu</h2>
    </div>

  </div>
</template>

<script>
import userService from "@/api/auth/user.service";
import TeacherScheduleService from "@/api/TeacherShedule";
export default {
  name: "ThoiKhoaBieuHs",
  data(){
    return{
      DataHeader: ['Tiết', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7',],
      dataDay:['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      checkReder: false,
      user:[''],
      shedule:[],
    }
  },
  created() {
    userService.getUser(this.$store.state.auth.user).then(
        res => {
          this.user = res.data.user
          this.getShedule(this.user.className)
        }, error => {
          this.user =
              (error.res && error.res.data) ||
              error.message ||
              error.toString();
        }
    )

  },
  methods: {
    getShedule(className){
        TeacherScheduleService.getClass(className,undefined).then(result => {
            console.log(className)
        this.shedule = result.data
        console.log(this.shedule)
      })
    }
  },


}
</script>

<style scoped>

</style>