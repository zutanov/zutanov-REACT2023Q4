import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Form from './components/forms/uncontrolled/Form';
import HookForm from './components/forms/controlled/HookForm';
import Header from './components/header/Header';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/form" element={<Form />} />
          <Route path="/form-hook" element={<HookForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
