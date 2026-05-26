import { GameScreen } from './components/game/GameScreen';
import { StartScreen } from './components/start/StartScreen';
import { useGameStore } from './store/gameStore';
import { useUiStore } from './store/uiStore';

function App() {
  const state = useGameStore((s) => s.state);
  const startGame = useGameStore((s) => s.startGame);
  const resetUi = useUiStore((s) => s.reset);

  const handleStart = (level: Parameters<typeof startGame>[0]) => {
    resetUi();
    startGame(level);
  };

  return (
    <div className="min-h-dvh w-full bg-slate-900 text-slate-100">
      {state ? <GameScreen /> : <StartScreen onStart={handleStart} />}
    </div>
  );
}

export default App;
