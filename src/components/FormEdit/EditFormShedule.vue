<template>

  <div class="flex w-full min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
    <div
        class="w-full h-full relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 p-6 ">
      {{className}}
      <Form @submit="register">
        <div>

        </div>
      </Form>
    </div>
    <div></div>
  </div>
</template>

<script>
import {ErrorMessage, Field, Form} from "vee-validate";
import {boolean} from "yup";
import ScheduleService from "@/api/Shedule";


export default {
  name: "EditFormShedule",
  components: {
    ErrorMessage, Field, Form
  },
  methods: {
    converObjectToString(item) {
      return JSON.stringify(item)
    },
    updateName(index, value) {
      this.items[index].name = value;
      console.log()
    },
    dataEdit() {
      return shedule
    },
    onChange(e){
      const data = JSON.parse(e.target.value);
      ScheduleService.updateAndCreate('undefined',data).then(result=>{
        console.log(result.data)
      })
    },
    getOptionValue(item, day, tiet) {
      const valueString = '{ "subjectName": "' + item.name + '", "time": "' + tiet + '", "nameDate": "' + day + '", "className": "' + this.className + '" }';
      return valueString;
    },
    onChangeUpdate(e,i){
      const selectedValue = event.target.options[event.target.selectedIndex].dataset.value;
      console.log('Selected value:', selectedValue);
      console.log('v-model:', event.target.value);
      console.log('v-model:', i);
      const data ={
        subjectName: event.target.value,
      }
      ScheduleService.updateAndCreate(selectedValue,data).then(result=>{
        console.log(result.data)
      })

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
    dataEdit: {
      type: Array,
      default: []
    },
    monday: {
      type: Array,
      default: []
    },
    tuesday: {
      type: Array,
      default: []
    },
    wednesday: {
      type: Array,
      default: []
    },
    thursday: {
      type: Array,
      default: []
    },
    friday: {
      type: Array,
      default: []
    },
    saturday: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      DataHeader: ['Tiết', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7',],
      dataDay: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      checkReder: false,
      valueVModel:'',
    }
  },

  watch: {
    dataEdit: function (newVal, oldVal) {
      if (newVal && Object.keys(newVal).length > 0) {
        this.checkReder = true
        console.log('Giá trị của number là:', this.dataEdit);
      } else {
        this.checkReder = false
        console.log('Không có giá trị cho number');
        // hoặc có thể sử dụng thư viện UI để hiển thị thông báo cho người dùng
      }
    }
  },
  mounted() {
    if (this.dataEdit) {

    } else {
      console.log('Không có giá trị cho number');
      // hoặc có thể sử dụng thư viện UI để hiển thị thông báo cho người dùng
    }
  },
}
</script>

<style scoped>

</style>