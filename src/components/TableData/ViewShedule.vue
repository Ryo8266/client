<template>
      <h2 class="font-bold text-xl mb-3">Thời Khóa Biểu Lớp {{ className }} </h2>
      <table v-if="this.checkReder" class="min-w-full w-[1000px]  table-auto border-collapse block md:table">
        <thead class="block md:table-header-group">
        <tr class="border border-green-300  block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
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
              <div v-if=" item.time == i && item.nameDate == itemDate">{{ item.subjectName }}</div>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
      <div v-else>
        <h2>Lớp học chưa có thời khóa biểu</h2>
      </div>

</template>
<script>
import {boolean} from "yup";
import shedule from "@/api/Shedule";

export default {
  name: "ViewShedule",
  methods: {
    shedule() {
      return shedule
    }
  },
  props: {
    isOpen: {
      type: boolean,
    },
    className: {
      type: String,
    },
    khoi: {
      type: String
    },
    Subject: {
      type: Array,
      default: []
    },
    shedule: {
      type: Array,
      default: []
    },
  },
  data() {
    return {
      DataHeader: ['Tiết', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7',],
      dataDay: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      checkReder: false
    }
  },
  watch: {
    shedule: function (newVal, oldVal) {
      if (newVal && Object.keys(newVal).length > 0) {
        this.checkReder = true
        console.log('Giá trị của number là:', this.shedule);
      } else {
        this.checkReder = false
        console.log('Không có giá trị cho number');
        // hoặc có thể sử dụng thư viện UI để hiển thị thông báo cho người dùng
      }
    }
  },
  mounted() {
    if (this.shedule) {
      console.log('Giá trị của number là:', this.shedule);
    } else {
      console.log('Không có giá trị cho number');
      // hoặc có thể sử dụng thư viện UI để hiển thị thông báo cho người dùng
    }
  },
}
</script>

<style scoped>

</style>