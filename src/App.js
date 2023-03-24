import './App.css';
import StagePicker from "./components/StagePicker.tsx"
import TeamPicker from './components/TeamPicker.tsx';
import MapPicker from './components/MapPicker.tsx';
import MapTypePicker from './components/MapTypePicker.tsx';
import GlobalHeroUsage from './components/GlobalHeroUsage.tsx'
import { MapType } from './components/MapType.ts';


function App() {
  return (
    <div className="App">
      <GlobalHeroUsage/>
    </div>
  );
}

export default App;
