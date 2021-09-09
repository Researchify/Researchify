import { useState } from 'react';
import { Pagination } from 'react-bootstrap';

const usePagination = (data, itemPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(data.length / itemPerPage);
  const currentData = () => {
    if (data) {
      const start = (currentPage - 1) * itemPerPage;
      const end = start + itemPerPage;
      const currentData = data.slice(start, end);
      // check if the current page contains data
      if (currentData.length === 0) {
        const start = (currentPage - 2) * itemPerPage;
        const end = start + itemPerPage;
        setCurrentPage(currentPage - 1);
        return data.slice(start, end);
      }
      return currentData;
    }
  };
  const nextPage = () => {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  };
  const prevPage = () => {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  };
  const jumpToPage = (page) => {
    const pageNumber = Math.max(1, page);
    setCurrentPage(Math.min(pageNumber, maxPage));
  };
  const pagination = () => {
    const items = [];
    for (let number = 1; number <= maxPage; number++) {
      items.push(
        <Pagination.Item
          key={number}
          onClick={() => jumpToPage(number)}
          active={number === currentPage}
        >
          {number}
        </Pagination.Item>,
      );
    }
    return (
      data.length > itemPerPage
      && (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination>
          <Pagination.Prev
            onClick={prevPage}
            disabled={currentPage === 1}
          />
          {items}
          <Pagination.Next
            onClick={nextPage}
            disabled={currentPage === maxPage}
          />
        </Pagination>
      </div>
      )
    );
  };

  return { currentData, pagination };
};

export default usePagination;
