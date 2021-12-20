import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter } from "react-router-dom";
import Header from './component/Header';
import Footer from './component/Footer';
import MainComponent from './component/MainComponent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <MainComponent />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
