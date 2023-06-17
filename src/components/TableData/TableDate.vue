<script>
export default {
    name: "TableData",
    props: {
        dataColumns: {
            type: Array,
            default: [],
        },
      DataHeader:[]
    },
    data() {

        return {
            headersColumn: [
                "Mã học sinh",
                "Họ tên",
                "Giới tính",
                "Ngày sinh",
                "Địa chỉ",
                "Số điện thoại",
                "Email",
                "Chức năng",
            ],

        };
    },
};
</script>
<template lang="">
  <div>
    <table class="min-w-full border-collapse block md:table">
      <thead class="block md:table-header-group">
        <tr
          class="border border-green-300  block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative"
        >
          <th
            v-for="(item, index) in DataHeader"
            :key="index"
            class="bg-green-500 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell"
          >
            {{ item }}
          </th>
        </tr>
      </thead>
      <tbody class="block md:table-row-group">
        <tr
          v-for="(item, index) in dataColumns"
          :key="item.id"
          class=" border border-green-300 md:border-none block md:table-row"
        >
          <td
            class=" bg-green-400 p-2 md:border border-b-green-300 text-center text-white font-medium text-base block md:table-cell"
          >
            <span class="inline-block w-1/3 md:hidden font-bold">Name</span
            >{{ item.userName }}
          </td>
          <td
            class="p-2 md:border md:border-green-300 text-center text-green-400 font-medium text-base  block md:table-cell"
          >
            <span class="inline-block w-1/3 md:hidden font-bold">User Name</span
            >{{ item.fullName }}
          </td>
          <td
             class=" bg-green-400 p-2 md:border md:border-green-300 text-center text-white font-medium text-base block md:table-cell"
          >
            <span class="inline-block w-1/3 md:hidden font-bold"
              >Email Address</span
            >{{ item.sex }}
          </td>
          <td
           class="p-2 md:border md:border-green-300 text-center text-green-400 font-medium text-base  block md:table-cell"
          >
            <span class="inline-block w-1/3 md:hidden font-bold">Mobile</span
            >{{ item.Date }}
          </td>
             <td
          class=" bg-green-400 p-2 md:border border-green-300 text-center text-white font-medium text-base block md:table-cell"
          >
            <span class="inline-block w-1/3 md:hidden font-bold">Mobile</span
            >{{ item.subjectTeacherName ||item.className}}
          </td>
          <td
            class="p-2 md:border border-green-300 text-center text-green-400 font-medium text-base  block md:table-cell"
          >
            <span class="inline-block w-1/3 md:hidden font-bold">Mobile</span
            >{{ item.Address }}
          </td>
          <td
          class=" bg-green-400 p-2 md:border border-green-300 text-center text-white font-medium text-base block md:table-cell"
          >
            <span class="inline-block w-1/3 md:hidden font-bold">Mobile</span
            >{{ item.numberPhone }}
          </td>
          <td
            class="p-2 md:border border-green-300 text-center text-green-400 font-medium text-base  block md:table-cell"
          >
            <span class="inline-block w-1/3 md:hidden font-bold">Mobile</span
            >{{ item.email }}
          </td>
          <td
            class="p-2 md:border bg-green-400 border-green-300 flex justify-around text-center text-green-400 font-medium text-base  "
          >
            <span class="inline-block w-1/3 md:hidden font-bold">Actions</span>
            <button
            @click="$emit('actionEdit',item.userName)"
              class="bg-white hover:bg-blue-500 hover:text-white  font-bold py-1 px-2 border text-blue-500 border-none rounded"

            >
              Sửa
            </button>
            <button
              class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded"
               @click="$emit('actionDelete',item.userName)"
            >
              Xóa
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
