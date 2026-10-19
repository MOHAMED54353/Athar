import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Cart from "./Components/Cart";
import Checkout from "./Components/Checkout";
import Shop from "./Components/Shop";
import About from "./Components/About";
import Search from "./Components/Search";
import Account from "./Components/Account";
import ProductPage from "./Components/ProductPage";
import Wishlist from "./Components/Wishlist";
import { CartProvider } from "./Components/CartContext";
import { WishlistProvider } from "./Components/WishlistContext";

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/collections"
              element={
                <Shop
                  key="all"
                  category="All"
                  eyebrow="Athar"
                  title="All Collections"
                  sub="كل قطعنا في مكان واحد — اختار اللي يعبّر عنك."
                />
              }
            />
            <Route
              path="/men"
              element={
                <Shop
                  key="men"
                  category="Men"
                  eyebrow="Men's Edit"
                  title="Men"
                  sub="قطع رجالي بخامات مريحة وتفصيل مظبوط."
                />
              }
            />
            <Route
              path="/women"
              element={
                <Shop
                  key="women"
                  category="Women"
                  eyebrow="Women's Edit"
                  title="Women"
                  sub="إطلالات أنيقة لكل مناسبة."
                />
              }
            />

            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/wishlist" element={<Wishlist />} />

            <Route path="/about" element={<About />} />
            <Route path="/search" element={<Search />} />
            <Route path="/account" element={<Account />} />

            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </BrowserRouter>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;