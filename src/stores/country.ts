import  {defineStore} from "pinia";

export const useCountryStore = defineStore({
	id: 'country',
	state: () => ({
		countries: []
	}),
	getters: {},
	actions: {},
})
