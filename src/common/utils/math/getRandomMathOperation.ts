export const getRandomMathOperation = (operations: string[]) => {
  const randomIndex = Math.floor(Math.random() * operations.length)

  return operations[randomIndex]
}