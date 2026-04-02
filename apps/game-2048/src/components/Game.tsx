import { use2048, getCellColor } from '../hooks/use2048'
import { Button } from '@mono/ui'
import { Card, CardContent } from '@mono/ui'

export function Game() {
  const { grid, score, bestScore, gameOver, reset } = use2048()

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-amber-800 dark:text-amber-200">2048</h1>
            <p className="text-sm text-muted-foreground">Join the tiles!</p>
          </div>
          <div className="flex gap-2">
            <div className="bg-white dark:bg-slate-800 rounded-lg px-4 py-2 text-center">
              <div className="text-xs text-muted-foreground uppercase">Score</div>
              <div className="text-xl font-bold">{score}</div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg px-4 py-2 text-center">
              <div className="text-xs text-muted-foreground uppercase">Best</div>
              <div className="text-xl font-bold">{bestScore}</div>
            </div>
          </div>
        </div>

        {/* Game Board */}
        <Card>
          <CardContent className="p-4">
            <div className="bg-amber-200 dark:bg-amber-900 rounded-lg p-2">
              <div className="grid grid-cols-4 gap-2">
                {grid.map((row, r) =>
                  row.map((value, c) => (
                    <div
                      key={`${r}-${c}`}
                      className={`game-cell aspect-square rounded-md flex items-center justify-center text-2xl font-bold ${getCellColor(value)}`}
                    >
                      {value || ''}
                    </div>
                  ))
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Controls */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Use arrow keys to move</p>
          <Button onClick={reset} variant="outline" size="sm">
            New Game
          </Button>
        </div>

        {/* Game Over Overlay */}
        {gameOver && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="bg-white dark:bg-slate-900 p-6 text-center">
              <h2 className="text-2xl font-bold mb-2">Game Over!</h2>
              <p className="text-muted-foreground mb-4">Final Score: {score}</p>
              <Button onClick={reset}>Try Again</Button>
            </Card>
          </div>
        )}

        {/* Back Link */}
        <div className="mt-6 text-center">
          <a
            href="https://vian-project.pages.dev"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}
