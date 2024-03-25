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
  const location = useLocation()
  const [startPage, setStartPage] = useState<number>(1)
  const [endPage, setEndPage] = useState<number>(5)

  const pageNumber = parseInt(new URLSearchParams(location.search).get('page') || '1')

  console.log(startPage, endPage)

  const handlePageClick = (pageNumber: number) => {
    onPageChange(pageNumber)
    
    if (pageNumber <= 3) {
      setStartPage(1)
      setEndPage(5)
    } else if (pageNumber >= pages - 2) {
      setStartPage(pageNumber - 2)
      setEndPage(pageNumber + 2)
    } 
  }

  const getPageNumberFromUrl = (url: string): number => {
    const pageNumberRegex = /page=(\d+)/
    const match = url.match(pageNumberRegex)
    const pageNumber = match ? parseInt(match[1]) : 1
    
    return pageNumber
  }

  return (
    <div className={styles.paginationWrapper}>
      <div onClick={() => handlePageClick(getPageNumberFromUrl(prev))} className={styles.arrow}>
        <img src={arrowLeft} alt="arrow left" width="30" />
      </div>
      {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map((pageNumber) => (
        <div key={pageNumber} className={styles.page}>
          <p className={styles.pageNumber} onClick={() => handlePageClick(pageNumber)}>{pageNumber}</p>
        </div>
      ))}
      <div onClick={() => handlePageClick(getPageNumberFromUrl(next))} className={styles.arrow}>
        <img src={arrowRight} alt="arrow right" width="30" />
      </div>
    </div>
  )
}
