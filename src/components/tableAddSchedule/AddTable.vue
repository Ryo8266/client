<template>


  <Form :validation-schema="schema" @submit="register">
    <table class="min-w-full table-auto border-collapse block md:table">
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
      <tr v-for="(item,number) in 10" :key="index"
          class="border border-green-300 md:border-none block md:table-row">
        <td
            class="bg-green-400 p-2 md:border border-b-green-300 text-center text-white font-medium text-base block md:table-cell">
          Tiết {{ number + 1 }}
        </td>
        <td
            class=" text-center    font-medium text-base py-2 px-2 border-b border-r border-r-green-300 border-b-green-300">
          <label class="text-black dark:text-gray-200" for="passwordConfirmation"></label>
          <Field v-validate="'not-null'"
                 :name="'Thu 2 tiet'+number"
                 :value="'{}'"
                 as="select"
                 class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                 @change="onChange">
            <option selected>Chọn Môn</option>
            <option v-for="(item, index) in Subject " :key="item.id" :value='getOptionValue(item,"Monday",number+1)'>
              {{ item.name }}
            </option>

          </Field>
          <ErrorMessage class="error-feedback" name=" "/>
        </td>
        <td
            class=" text-center    font-medium text-base py-2 px-2 border-b border-r border-r-green-300 border-b-green-300">
          <label class="text-black dark:text-gray-200" for="passwordConfirmation"></label>
          <Field v-validate="'not-null'"
                 :name="'Thu 3 tiet'+number"
                 :value="'{}'"
                 as="select"
                 class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                 @change="onChange">
            <option selected>Chọn Môn</option>
            <option v-for="(item, index) in Subject " :key="item.id" :value='getOptionValue(item,"Tuesday",number+1)'>
              {{ item.name }}
            </option>
          </Field>
          <ErrorMessage class="error-feedback" name=" "/>
        </td>
        <td
            class=" text-center    font-medium text-base py-2 px-2 border-b border-r border-r-green-300 border-b-green-300">
          <label class="text-black dark:text-gray-200" for="passwordConfirmation"></label>
          <select v-validate="'not-null'"
                 :name="'Thu 4 tiet'+number"
                 :value="'{}'"
                 as="select"
                 class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                 @change="onChange">
            <option selected>Chọn Môn</option>
            <option v-for="(item, index) in Subject " :key="item.id" :value='getOptionValue(item,"Wednesday",number+1)'>
              {{ item.name }}
            </option>
          </select>
          <ErrorMessage class="error-feedback" name=" "/>
        </td>
        <td
            class=" text-center    font-medium text-base py-2 px-2 border-b border-r border-r-green-300 border-b-green-300">
          <label class="text-black dark:text-gray-200" for="passwordConfirmation"></label>
          <select v-validate="'not-null'"
                 :name="'Thu 5 tiet'+number"
                 :value="'{}'"
                 as="select"
                 class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                 @change="onChange">
            <option selected>Chọn Môn</option>
            <option v-for="(item, index) in Subject " :key="item.id" :value='getOptionValue(item,"Thursday",number+1)'>
              {{ item.name }}
            </option>
          </select>
          <ErrorMessage class="error-feedback" name=" "/>
        </td>
        <td
            class=" text-center    font-medium text-base py-2 px-2 border-b border-r border-r-green-300 border-b-green-300">
          <label class="text-black dark:text-gray-200" for="passwordConfirmation"></label>
          <select v-validate="'not-null'"
                 :name="'Thu 6 tiet'+number"
                 :value="'{}'"
                 as="select"
                 class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                 @change="onChange">
            <option selected>Chọn Môn</option>
            <option v-for="(item, index) in Subject " :key="item.id" :value='getOptionValue(item,"Friday",number+1)'>
              {{ item.name }}
            </option>
          </select>
          <ErrorMessage class="error-feedback" name=" "/>
        </td>
        <td
            class=" text-center    font-medium text-base py-2 px-2 border-b border-r border-r-green-300 border-b-green-300">
          <label class="text-black dark:text-gray-200" for="passwordConfirmation"></label>
          <select v-validate="'not-null'" :name="'Thu 7 tiet'+number"
                 :value="'{}'"
                 as="select"
                 class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                 @change="onChange">
            <option selected>Chọn Môn</option>
            <option v-for="(item, index) in Subject " :key="item.id" :value='getOptionValue(item,"Saturday",number+1)'>
              {{ item.name }}
            </option>
          </select>
          <ErrorMessage class="error-feedback" name=" "/>
        </td>
      </tr>

      </tbody>
    </table>

    <div class="flex justify-end mt-6 gap-6">
      <div :disabled="loading"
           class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-red-500 rounded-md hover:bg-red-700 focus:outline-none focus:bg-gray-600"
           @click="$emit('close')">Đóng
      </div>
      <button

          class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-green-500 rounded-md hover:bg-green-700 focus:outline-none focus:bg-gray-600">
        Save
      </button>
    </div>
  </Form>


</template>

<script>
import {boolean} from "yup";
import {ErrorMessage, Field, Form} from "vee-validate";

export default {
  name: "AddTable",
  components: {
    ErrorMessage, Field, Form
  },
  props: {
    isOpen: {
      type: boolean,
    },
    class: {
      type: String,
    },
    khoi: {
      type: String
    },
    Subject: {
      type: Array,
      default: []
    }
  },

  data() {
    return {
      DataHeader: ['Tiết', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7',],

    }

  },
  methods: {
    register(data) {
      const results = Object.fromEntries(
          Object.entries(data).map(([key, value]) => [key, JSON.parse(value)])
      );
      let result = Object.values(results);
      result = result.filter(function (obj) {
        return Object.keys(obj).length > 0;
      });
      this.$emit('createMany', result)

    },
    onChange(e) {
      console.log(JSON.parse(e.target.value))
    },
    getOptionValue(item, day, tiet) {
      const valueString = '{ "subjectName": "' + item.name + '", "time": "' + tiet + '", "nameDate": "' + day + '", "className": "' + this.class + '" }';
      return valueString;
    }
  },
  mounted() {

  }

}
</script>

<style scoped></style>