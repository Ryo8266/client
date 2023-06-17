<template lang="">
    <div>
        
<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3" v-for="(item,index) in headerTable" :key = "item.id">
               {{item}}
                </th>

            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="(item,idex ) in dataPreview">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{item.userName}}
                </th>
                <td class="px-6 py-4">
                  {{item.fullName}}
                </td>
                <td class="px-6 py-4">
                  {{item.email}}
                </td>
                <td class="px-6 py-4">
                     {{item.sex}}
                </td>
                <td class="px-6 py-4">
                    {{item.numberPhone}}
                </td><td class="px-6 py-4">
                    {{item.Date}}
                </td>
                <td class="px-6 py-4">
                    {{item.Address}}
                </td>
             <td class="px-6 py-4">
                    {{item.subjectTeacherName}}
                </td>
            </tr>

        </tbody>
    </table>
</div>

    </div>
</template>
<script>
export default {
    name: "TablePreview",
    props: {
        headerTable: [],
        dataPreview: []
    }
}
</script>
<style lang="">

</style>