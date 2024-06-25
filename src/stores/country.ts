import {defineStore} from "pinia";

export interface Country {
	flags: { png: string };
	name: { official: string; nativeName: Record<string, { official: string }> };
	cca2: string;
	cca3: string;
	altSpellings: string[];
	idd: { root: string; suffixes: string[] };
	[key: string]: any;
}


export const useCountryStore = defineStore('country', {
	state: () => ({
		countries: [] as Array<Country>,
	}),
	getters: {},
	actions: {},
});
