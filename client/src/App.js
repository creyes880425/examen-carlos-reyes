import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/home/home';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
