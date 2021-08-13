import { useState } from "react";

const usePagination = ( data, itemPerPage ) => {
    console.log(data)
    const [ currentPage, setCurrentPage ] = useState(1)
    const maxPage = Math.ceil(data.length/itemPerPage)

    const currentData = () => {
        if(data){
            const start = (currentPage - 1) * itemPerPage;
            const end = start + itemPerPage;
            return data.slice(start, end)
        }
    }
    const nextPage = () => {
        setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
    }
    const prevPage = () => {
        setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
    }
    const jumpToPage = (page) => {
        const pageNumber = Math.max(1, page);
        setCurrentPage(Math.min(pageNumber, maxPage));
    }

    return { nextPage, prevPage, jumpToPage, currentData, currentPage, maxPage}
}

export default usePagination