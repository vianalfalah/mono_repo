import { useState, useEffect, useCallback } from 'react'

const GRID_SIZE = 4

function createEmptyGrid(): number[][] {
  return Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(0))
}

function addRandomTile(grid: number[][]): number[][] {
  const newGrid = grid.map(row => [...row])
  const emptyCells: [number, number][] = []

  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (newGrid[r][c] === 0) {
        emptyCells.push([r, c])
      }
    }
  }

  if (emptyCells.length > 0) {
    const [r, c] = emptyCells[Math.floor(Math.random() * emptyCells.length)]
    newGrid[r][c] = Math.random() < 0.9 ? 2 : 4
  }

  return newGrid
}

function slide(row: number[]): { arr: number[]; score: number } {
  let arr = row.filter(val => val !== 0)
  let score = 0

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] === arr[i + 1]) {
      arr[i] *= 2
      score += arr[i]
      arr.splice(i + 1, 1)
    }
  }

  while (arr.length < GRID_SIZE) {
    arr.push(0)
  }

  return { arr, score }
}

export function use2048() {
  const [grid, setGrid] = useState<number[][]>(() =>
    addRandomTile(addRandomTile(createEmptyGrid()))
  )
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('2048-best-score')
    if (saved) setBestScore(parseInt(saved))
  }, [])

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score)
      localStorage.setItem('2048-best-score', score.toString())
    }
  }, [score, bestScore])

  const move = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    setGrid(prevGrid => {
      let newGrid = prevGrid.map(row => [...row])
      let moved = false
      let roundScore = 0

      if (direction === 'left') {
        newGrid = newGrid.map(row => {
          const result = slide(row)
          roundScore += result.score
          if (row.join(',') !== result.arr.join(',')) moved = true
          return result.arr
        })
      } else if (direction === 'right') {
        newGrid = newGrid.map(row => {
          const result = slide(row.reverse())
          roundScore += result.score
          const resultArr = result.arr.reverse()
          if (row.join(',') !== resultArr.join(',')) moved = true
          return resultArr
        })
      } else if (direction === 'up') {
        for (let c = 0; c < GRID_SIZE; c++) {
          const col = newGrid.map(row => row[c])
          const result = slide(col)
          roundScore += result.score
          if (col.join(',') !== result.arr.join(',')) moved = true
          for (let r = 0; r < GRID_SIZE; r++) {
            newGrid[r][c] = result.arr[r]
          }
        }
      } else if (direction === 'down') {
        for (let c = 0; c < GRID_SIZE; c++) {
          const col = newGrid.map(row => row[c]).reverse()
          const result = slide(col)
          roundScore += result.score
          const resultArr = result.arr.reverse()
          const originalCol = newGrid.map(row => row[c])
          if (originalCol.join(',') !== resultArr.join(',')) moved = true
          for (let r = 0; r < GRID_SIZE; r++) {
            newGrid[r][c] = resultArr[r]
          }
        }
      }

      if (moved) {
        setScore(s => s + roundScore)
        const gridWithRandom = addRandomTile(newGrid)

        // Check for game over
        const hasEmptyCells = gridWithRandom.some(row => row.includes(0))
        let canMerge = false

        if (!hasEmptyCells) {
          for (let r = 0; r < GRID_SIZE; r++) {
            for (let c = 0; c < GRID_SIZE; c++) {
              if (
                (r < GRID_SIZE - 1 && gridWithRandom[r][c] === gridWithRandom[r + 1][c]) ||
                (c < GRID_SIZE - 1 && gridWithRandom[r][c] === gridWithRandom[r][c + 1])
              ) {
                canMerge = true
                break
              }
            }
            if (canMerge) break
          }
        }

        if (!hasEmptyCells && !canMerge) {
          setGameOver(true)
        }

        return gridWithRandom
      }

      return prevGrid
    })
  }, [])

  const reset = useCallback(() => {
    setGrid(addRandomTile(addRandomTile(createEmptyGrid())))
    setScore(0)
    setGameOver(false)
  }, [])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOver) return

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault()
          move('up')
          break
        case 'ArrowDown':
          e.preventDefault()
          move('down')
          break
        case 'ArrowLeft':
          e.preventDefault()
          move('left')
          break
        case 'ArrowRight':
          e.preventDefault()
          move('right')
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [move, gameOver])

  return { grid, score, bestScore, gameOver, reset }
}

const CELL_COLORS: Record<number, string> = {
  0: 'bg-amber-100 dark:bg-amber-950',
  2: 'bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-100',
  4: 'bg-amber-300 dark:bg-amber-800 text-amber-900 dark:text-amber-100',
  8: 'bg-orange-300 dark:bg-orange-800 text-orange-900 dark:text-orange-100',
  16: 'bg-orange-400 dark:bg-orange-700 text-orange-100',
  32: 'bg-orange-500 dark:bg-orange-600 text-orange-100',
  64: 'bg-red-400 dark:bg-red-700 text-red-100',
  128: 'bg-red-500 dark:bg-red-600 text-red-100',
  256: 'bg-red-600 dark:bg-red-500 text-red-100',
  512: 'bg-yellow-400 dark:bg-yellow-600 text-yellow-100',
  1024: 'bg-yellow-500 dark:bg-yellow-500 text-yellow-100',
  2048: 'bg-yellow-600 dark:bg-yellow-400 text-yellow-100',
}

export function getCellColor(value: number): string {
  return CELL_COLORS[value] || 'bg-purple-600 text-purple-100'
}
