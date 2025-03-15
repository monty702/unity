import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import DonationPage from './components/DonationPage';
import AboutUs from './components/AboutUs';
import LoginForm from './components/LoginForm';
import ContactUs from './components/ContactUs';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element ={<LoginForm/>}/>
        <Route path="/home" element={<HomePage />} />
        <Route path="/donation" element={<DonationPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;