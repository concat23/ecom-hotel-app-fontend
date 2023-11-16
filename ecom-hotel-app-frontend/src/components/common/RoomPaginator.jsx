import React from 'react'
import '../common/style.css'

export const RoomPaginator = ({currentPage, totalPages, onPageChange}) => {
  
    const pageNumbers = Array.from({length: totalPages}, (_,i) => i + 1)

    return (
    <nav>
        <ul className='paginator justify-content-center'>
            { pageNumbers.map( (pageNumber) =>{
                <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? "active" : ""}`}>
                    <button className='page-link' onClick={() => onPageChange(pageNumber)}>{pageNumber}</button>
                </li>
            })}
        </ul>
    </nav>
  )
}
