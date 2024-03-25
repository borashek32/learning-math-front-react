import styles from './Pagination.module.sass'
import { Props } from './Pagination.types'
import arrowLeft from './../../assets/icons/arrow-left.svg'
import arrowRight from './../../assets/icons/arrow-right.svg'
import { useState } from 'react'

export const Pagination = ({ 
  pages,
  next,
  prev,
  onPageChange,
}: Props) => {
  const [startPage, setStartPage] = useState<number>(1)

  console.log(startPage)

  const getPageNumberFromUrl = (url: string): number => {
    const pageNumberRegex = /page=(\d+)/
    const match = url.match(pageNumberRegex)
    const pageNumber = match ? parseInt(match[1]) : 1
    
    return pageNumber
  }

  const handlePageClick = (pageNumber: number) => {
    onPageChange(pageNumber)
    
    if (pageNumber <= 3) {
      setStartPage(1)
    } else if (pageNumber >= 3) {
      setStartPage(pageNumber)
    } 
  }

  return (
    <div className={styles.paginationWrapper}>
      <div onClick={() => handlePageClick(getPageNumberFromUrl(prev))} className={styles.arrow}>
        <img src={arrowLeft} alt="arrow left" width="30" />
      </div>
      {Array.from({ length: 5 }, (_, index) => startPage + index).map((pageNumber) => (
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
