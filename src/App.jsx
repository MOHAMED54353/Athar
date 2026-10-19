import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Cart from "./Components/Cart";
import Checkout from "./Components/Checkout";
import { CartProvider } from "./Components/CartContext";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;