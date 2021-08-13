import { Pagination } from 'react-bootstrap'

const MyPagination = ({ maxPage, nextPage, prevPage, jumpToPage, currentPage }) => {
    let items = []
    
    for (let number = 1; number <= maxPage; number++) {
        items.push(
          <Pagination.Item key={number} onClick={() => jumpToPage(number)}>
            {number}
          </Pagination.Item>,
        );
      }

    return(
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Pagination> 
            <Pagination.Prev onClick={prevPage}/>
              {items} 
            <Pagination.Next onClick={nextPage}/>
          </Pagination>
        </div>
    )
}

export default MyPagination