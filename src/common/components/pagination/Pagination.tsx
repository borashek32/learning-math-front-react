import styles from './Pagination.module.sass'
import { Props } from './Pagination.types'
import arrowLeft from './../../assets/icons/arrow-left.svg'
import arrowRight from './../../assets/icons/arrow-right.svg'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

export const Pagination = ({ 
  pages,
  next,
  prev,
  onPageChange,
}: Props) => {
  const [startPage, setStartPage] = useState(1)
  const [endPage, setEndPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)

  const handlePageClick = (pageNumber: number) => {
    onPageChange(pageNumber)
    
    setStartPage(pageNumber)
    setEndPage(pageNumber + 4)

    if (pageNumber + 4 >= pages) {
      setStartPage(pageNumber)
      setEndPage(pages)
    }
  }

  const getPageNumberFromUrl = (url: string): number => {
    const pageNumberRegex = /page=(\d+)/
    const match = url.match(pageNumberRegex)
    const pageNumber = match ? parseInt(match[1]) : 1
    setStartPage(pageNumber)
    
    return pageNumber
  }
  console.log(startPage)

  return (
    <div className={styles.paginationWrapper}>
      {(startPage !== 1) &&
        <div onClick={() => handlePageClick(getPageNumberFromUrl(prev))} className={styles.arrow}>
          <img src={arrowLeft} alt="arrow left" width="30" />
        </div>
      }
      {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map((pageNumber) => (
        <div key={pageNumber} className={styles.page}>
          <p className={styles.pageNumber} onClick={() => handlePageClick(pageNumber)}>{pageNumber}</p>
        </div>
      ))}
      {(endPage <= pages - 1) &&
        <div onClick={() => handlePageClick(getPageNumberFromUrl(next))} className={styles.arrow}>
          <img src={arrowRight} alt="arrow right" width="30" />
        </div>
      }
    </div>
  )
}
