<script setup lang="ts">
import useApi from "@/composables/api.ts";
defineOptions({
	name: "countries"
})


const {response, request} = useApi('https://restcountries.com/v3.1/all');
await request();

</script>

<template>
	<h1>Hello countries</h1>
	<el-table size="small" stripe :data="response" >
		<el-table-column label="Name" prop="name.common"></el-table-column>
	</el-table>

</template>
