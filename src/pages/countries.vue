<script setup lang="ts">
import useApi from "@/composables/api.ts";

defineOptions({
	name: "countries"
})

const {response: countries, request: onGetCountries, loading: load} = useApi('https://restcountries.com/v3.1/all', );
await onGetCountries();


</script>

<template>
	<el-card body-style="padding: 0">
		<el-table height="calc(100vh - 200px)" v-loading="load"  stripe :data="countries">
			<el-table-column align="center" width="60" label="Flag">
				<template v-slot="{row}">
					<img style="width: 20px; border-radius: 2px" class="" :src="row.flags.png"
						 :alt="row.flags?.alt || row.name.official || 'country flag pic'">
				</template>
			</el-table-column>
			<el-table-column label="Name" align="center" show-overflow-tooltip>
				<el-table-column label="Official" prop="name.official"></el-table-column>
				<el-table-column label="Alternative">
					<template v-slot="{row}">
						<ul style="margin: 0">
							<li v-for="(alt, index) in row.altSpellings" :key="index">{{ alt }}</li>
						</ul>
					</template>
				</el-table-column>
				<el-table-column label="Native">
					<template v-slot="{row}">
						<ul style="margin: 0">
							<li v-for="(value, key) of row.name.nativeName" :key="key">{{  value.official }} <el-tag size="small">{{key}}</el-tag></li>
						</ul>
					</template>
				</el-table-column>
			</el-table-column>
			<el-table-column align="center" label="Country code">
				<el-table-column label="CCA2" width="100" prop="cca2"></el-table-column>
				<el-table-column label="CCA3" width="100" prop="cca3"></el-table-column>
				<el-table-column label="Calling codes" prop="">
					<template v-slot="{row}">
						<div v-if="row.idd.suffixes">
							<div v-if="row.idd.suffixes.length > 1">
								<el-tag type="success" style="margin-left: 5px; margin-bottom: 5px;" effect="dark" v-for="(suffix, index) in row.idd.suffixes" :key="index">{{ row.idd.root }}{{suffix}}</el-tag>
							</div>
							<el-tag v-else effect="dark" type="success">{{ row.idd.root }}{{row.idd.suffixes[0]}}</el-tag>
						</div>
					</template>
				</el-table-column>
			</el-table-column>
		</el-table>
		<template #footer>
			<!--add pagination-->
			Total
		</template>
	</el-card>
</template>
