export type Props = {
  pages: number
  next: string
  prev: string
  onPageChange: (pageNumber: number) => void
}