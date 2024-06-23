import {ref, computed} from 'vue';

interface UsePaginationProps {
	total: number;
	perPage: number;
	currentPage?: number;
}

export function usePagination({total, perPage, currentPage = 1}: UsePaginationProps) {
	const currentPageRef = ref(currentPage);
	const totalPages = computed(() => Math.ceil(total / perPage));

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

	const nextPage = () => {
		if (currentPageRef.value < totalPages.value) {
			currentPageRef.value += 1;
		}
	};

	const previousPage = () => {
		if (currentPageRef.value > 1) {
			currentPageRef.value -= 1;
		}
	};

	return {
		currentPage: currentPageRef,
		totalPages,
		paginatedItems,
		setCurrentPage,
		nextPage,
		previousPage,
	};
}
