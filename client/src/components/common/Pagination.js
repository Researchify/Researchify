import { Pagination as btPagination, Row } from 'react-bootstrap'

const Pagination = ({ totalPages, handleClick}) => {
    let items = []
    
    for (let number = 1; number <= totalPages; number++) {
        items.push(
          <btPagination.Item key={number}>
            {number}
          </btPagination.Item>,
        );
      }


    return(
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <btPagination size="sm">
                {items}
            </btPagination>
        </div>
    )
}

export default Pagination