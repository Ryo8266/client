<template lang="">


      <div class="">
            <div class="bg-white p-4 ">
                  <div>
        <ViewSheduleTeacher
            :class-name="this.viewClass"
            :isOpen="this.isShowView"
            :shedule="this.dataEdit"
          />
    </div>
</div>
</div>


</template>
<script>
import ViewSheduleTeacher from "./../components/TableData/ViewSheduleTeacher.vue"
import TeacherScheduleService from "../api/TeacherShedule";

export default {
    name: "LichDayGiaoVien",
    components: {
        ViewSheduleTeacher,
    },
    created() {
        this.getAllData()
    },
    data() {
        return {

            dataEdit: [],

        }
    },
    methods: {
        getAllData() {
            TeacherScheduleService.getByClass(this.$store.state.auth.user.data, undefined).then(
                (result) => {
                    this.dataEdit = result.data;
                    console.log(result.data)
                }
            );
        },
    },
};
</script>
<style lang="">
</style>