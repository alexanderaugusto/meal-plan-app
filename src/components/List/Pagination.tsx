import { useEffect, useState } from 'react'
import Input from '../Input'
import styles from './Pagination.module.css'

interface PaginationProps {
  page: number
  totalPages: number
  setPage: (page: number) => void
  className?: string
}

export default function Pagination({ page, setPage, totalPages, className }: PaginationProps) {
  const [inputPage, setInputPage] = useState(page)

  useEffect(() => {
    setInputPage(page)
  }, [page])

  function handleChangePage(newPage: number) {
    setPage(newPage)
  }

  function handlePressEnter() {
    if (inputPage > 0 && inputPage <= totalPages) {
      handleChangePage(inputPage)
    }
  }

  return (
    <div className={`${styles.pagination} ${className}`}>
      <div className={styles['pagination-container']}>
        <button
          disabled={page === 1}
          onClick={() => handleChangePage(page - 1)}
        >
          Anterior
        </button>
        <div className={styles.pages}>
          <Input
            type="text"
            value={inputPage}
            className={styles['page-input']}
            onChange={(e) => setInputPage(Number(e.target.value.replace(/[^0-9]/g, '')))}
            onKeyDown={(e) => e.key === 'Enter' && handlePressEnter()}
          />
          <h2>/</h2>
          <Input type="text" value={totalPages} className={styles['page-input']} disabled={true} />
        </div>
        <button
          disabled={page === totalPages}
          onClick={() => handleChangePage(page + 1)}
        >
          Próxima
        </button>
      </div>
    </div>
  )
}