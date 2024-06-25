import {ref, Ref, computed} from 'vue';

export interface UsePaginationProps {
	total: Ref<number>;
	perPage: number;
	currentPage?: number;
}

export default function usePagination({total, perPage, currentPage = 1}: UsePaginationProps) {
	const currentPageRef = ref(currentPage);
	const totalPages = computed(() => Math.ceil(total.value / perPage));

	const paginatedItems = computed(() => {
		const start = (currentPageRef.value - 1) * perPage;
		const end = start + perPage;
		return {start, end};
	});

	const setCurrentPage = (page: number) => {
		if (page > 0 && page <= totalPages.value) {
			currentPageRef.value = page;
		}
	};

	return {
		currentPage: currentPageRef,
		totalPages,
		paginatedItems,
		setCurrentPage,
	};
}
