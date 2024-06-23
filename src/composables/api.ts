import {ref, Ref} from 'vue'

export type ApiRequest = () => Promise<void>;


export interface UsableApi<T> {
	request: ApiRequest;
	response: Ref<T | undefined>;
	error: Ref<string | undefined>;
	loading: Ref<boolean>;
	options?: RequestInit;
}

export default function useApi<T>(
	url: RequestInfo,
	options?: RequestInit
): UsableApi<T> {
	const response: Ref<T | undefined> = ref();
	const error: Ref<string | undefined> = ref();
	const loading: Ref<boolean> = ref(false);

	const request: ApiRequest = async () => {
		loading.value = true;
		error.value = undefined;

		try {
			const res = await fetch(url, options);
			if (!res.ok) {
				throw new Error(`HTTP error! status: ${res.status}`);
			}
			response.value = await res.json();
		} catch (err: any) {
			error.value = err.message;
		} finally {
			loading.value = false;
		}
	};

	return {error, loading, request, response};
}
