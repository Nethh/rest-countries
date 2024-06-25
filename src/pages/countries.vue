<script setup lang="ts">
import useApi from "@/composables/api.ts";
import usePagination from "@/composables/paginate.ts";
import {reactive, ref, shallowRef, watch} from "vue";
import { Search, CaretRight, Sort, Select} from '@element-plus/icons-vue'

// Fetch all the countries data since the API itself does not provide a pagination
const {response: countries, request: onGetCountries, loading: load} = useApi('https://restcountries.com/v3.1/all',);
await onGetCountries();

const search = reactive({name: '', sort: 'Default'});
const timeout = shallowRef(0);

// init with all countries data
const filteredCountries = ref([...countries.value]);

const handleSearch = () => {
	clearTimeout(timeout.value);
	load.value = true
	timeout.value = setTimeout(() => {
		const query = search.name;
		const sort = search.sort;
		let data = [...countries.value];

		// if there is no query or sort return the full list of countries
		if (!query && !sort) {
			filteredCountries.value = data;
			handlePaginate(1);
			load.value = false;
			return
		}

		if (query) {
			data = data.filter(country => country.name.official.toLowerCase().includes(query.toLowerCase()));
		}

		if (sort !== 'Default') {
			data = data.sort((a, b) => {
				if (sort === 'Asc') {
					return a.name.official.localeCompare(b.name.official);
				}
				return b.name.official.localeCompare(a.name.official);
			});
			filteredCountries.value = data;
		}

		filteredCountries.value = data;
		handlePaginate(1);
		load.value = false;
	}, 500)
}

let pagination = null;
const paginatedCountries = ref([])
const handlePaginate = (page = 1) => {
	pagination = usePagination({
		total: ref(filteredCountries.value.length), perPage: 25
	});

	pagination.setCurrentPage(page)
	const {start, end} = pagination.paginatedItems.value;
	paginatedCountries.value = filteredCountries.value.slice(start, end)
}

// watch the search object for trigger the function when the value changes
watch(search, handleSearch, {immediate: true});

</script>

<template>
	<div class="bg-gray mb-4 gap-x-5 grid md:grid-cols-2">
		<div >
		</div>
		<div >
			<div class="grid md:grid-cols-4 grid-cols-3 gap-x-5">
				<el-input @input="handleSearch" class="md:col-span-3 col-span-2" size="large" :prefix-icon="Search" v-model="search.name" placeholder="Search for official name..."></el-input>
				<div class="w-full">
					<el-dropdown class="w-full" trigger="click">
						<el-button class="w-full" size="large" type="primary">
							Sort name: {{search.sort}}
						</el-button>
						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item @click.native="search.sort = 'Default'"><el-icon v-if="search.sort === 'Default'"><Select/></el-icon> Default </el-dropdown-item>
								<el-dropdown-item @click.native="search.sort = 'Asc'"><el-icon v-if="search.sort === 'Asc'"><Select/></el-icon> Asc </el-dropdown-item>
								<el-dropdown-item @click.native="search.sort = 'Desc'"><el-icon v-if="search.sort === 'Desc'"><Select/></el-icon> Desc </el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>
				</div>
			</div>
		</div>
	</div>


	<el-card body-class="!p-0">
		<el-table height="calc(100vh - 200px)" v-loading="load" stripe :data="paginatedCountries">
			<el-table-column label="No." align="center" width="50" type="index"></el-table-column>
			<el-table-column align="center" width="70" label="Flag">
				<template v-slot="{row}">
					<img class="w-full border h-[30px] rounded-sm" :src="row.flags.png"
						 :alt="row.flags?.alt || row.name.official || 'country flag pic'">
				</template>
			</el-table-column>
			<el-table-column label="Name" align="center">
				<el-table-column min-width="150"  show-overflow-tooltip label="Official" prop="name.official"></el-table-column>
				<el-table-column min-width="150"  label="Alternative">
					<template v-slot="{row}">
						<ul class="m-0">
							<li v-for="(alt, index) in row.altSpellings" :key="index"><el-icon><CaretRight/></el-icon> {{ alt }}</li>
						</ul>
					</template>
				</el-table-column>
				<el-table-column min-width="150" label="Native">
					<template v-slot="{row}">
						<ul class="m-0">
							<li v-for="(value, key) of row.name.nativeName" :key="key"><el-icon><CaretRight/></el-icon> {{ value.official }}
								<el-tag size="small">{{ key }}</el-tag>
							</li>
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
								<el-tag
									type="success" class="mr-[5px] mb-[5px]" effect="dark"
									v-for="(suffix, index) in row.idd.suffixes" :key="index">
									{{ row.idd.root }}{{ suffix }}
								</el-tag>
							</div>
							<el-tag v-else effect="dark" type="success">
								{{ row.idd.root }}{{ row.idd.suffixes[0] }}
							</el-tag>
						</div>
					</template>
				</el-table-column>
			</el-table-column>
		</el-table>
		<template #footer>
			<div class="flex justify-between items-center">
				Showing results {{paginatedCountries.length}} of {{filteredCountries.length}}
				<el-pagination
					background
					layout="prev, pager, next"
					:page-count="pagination?.totalPages?.value"
					@current-change="handlePaginate"
				></el-pagination>
			</div>
		</template>
	</el-card>
</template>
