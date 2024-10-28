import React from 'react';
import './Pagination.css';


const Pagination = ({ postsPerPage, length, handlePagination, currentPage }) => {

  const paginationNumbers = [];



for (let i = 1; i <= Math.ceil(length / postsPerPage); i++) {
    paginationNumbers.push(i);
}

return (

    <div className='pagination'>
        <ul class="pagination__list">
            {paginationNumbers.map((pageNumber) => (
                <li class={pageNumber == currentPage ? "pagination__link--active" : "pagination__link"} aria-label={"Go to page"+pageNumber} key={pageNumber} onClick={() => handlePagination(pageNumber)} numero={pageNumber}> {pageNumber} </li>
            ))}
        </ul>

    </div>
  );

};



export default Pagination;