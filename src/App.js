import logo from './logo.svg';
import './App.css';
import StagePicker from "./components/StagePicker.tsx"
import TeamPicker from './components/TeamPicker.tsx';
import MapPicker from './components/MapPicker.tsx';
import MapTypePicker from './components/MapTypePicker.tsx';



function App() {
  return (
    <div className="App">
      <StagePicker></StagePicker>
      <TeamPicker></TeamPicker>
      <MapTypePicker mapCategories={["assult", "control", "hybrid", "payload", "push"]} isCheckedArray={["true", "true", "true", "true", "true"]}></MapTypePicker>
    </div>
  );
}

export default App;
