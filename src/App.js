import './App.css';
import LoginForm from './components/LoginForm.jsx';
import ProductListing from "./components/ProductListing";
import {Route, Routes} from "react-router-dom";
import ProductDetails from "./components/ProductDetails";
import { Client } from 'appwrite';
function App() {
  return (

    <div className="">
        {/*<LoginForm />*/}
        <Routes>
            <Route path="/" element={<LoginForm/>} />
            <Route path="/products" element={<ProductListing />} />
            <Route path="/product/:id" element={<ProductDetails />} />
       </Routes>
    </div>
  );
}

export default App;
