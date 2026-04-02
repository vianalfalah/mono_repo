import { Game } from './components/Game'
import { IDELayout } from '@mono/ui'

export default function App() {
  return (
    <IDELayout appName="Game 2048" activePath="/game-2048">
      <Game />
    </IDELayout>
  )
}
