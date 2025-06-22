import Split from 'react-split';
import './App.css'
import PieChart from './components/pie-chart/PieChart';
import ClearScreen from './components/ClearScreen';
import DonutChart from './components/donut-chart/DonutChart';
import { BrowserRouter, Routes, Route } from 'react-router';
import Editor from './Editor';
import LandingPage from './Landing';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/editor" element={<Editor />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
