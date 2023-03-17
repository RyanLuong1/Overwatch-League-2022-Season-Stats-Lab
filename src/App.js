import logo from './logo.svg';
import './App.css';
import StagePicker from "./components/StagePicker.tsx"
import TeamPicker from './components/TeamPicker.tsx';
import MapPicker from './components/MapPicker.tsx';

function App() {
  return (
    <div className="App">
      <StagePicker></StagePicker>
      <TeamPicker></TeamPicker>
      {/* <MapPicker></MapPicker> */}
    </div>
  );
}

export default App;
