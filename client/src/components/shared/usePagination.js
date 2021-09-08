import { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import styled from 'styled-components';

const ArrowButton = styled.button`

`;

const usePagination = (data, itemPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(data.length / itemPerPage);
  const currentData = () => {
    if (data) {
      const start = (currentPage - 1) * itemPerPage;
      const end = start + itemPerPage;
      return data.slice(start, end);
    }
  };
  const nextPage = () => {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  };
  const prevPage = () => {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  };
  const pagination = () => {
    return (
      <div>
        {
          currentData().length === 1
            ? ((currentPage - 1) * itemPerPage + 1)
            : (
              <>
                {(currentPage - 1) * itemPerPage + 1}
                {' '}
                -
                {(currentPage - 1) * itemPerPage + currentData().length}
                {' '}
              </>
            )
        }
        of
        {' '}
        { data.length}
        <ArrowButton onClick={prevPage}>
          <FaAngleLeft />
        </ArrowButton>
        <ArrowButton onClick={nextPage}>
          <FaAngleRight />
        </ArrowButton>
      </div>
    );
  };

  return { currentData, pagination };
};

export default usePagination;
