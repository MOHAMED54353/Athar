import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ProductCard from "./ProductCard";
import { useWishlist } from "./WishlistContext";
import products from "../data/products";
import "../Css/Clothes.css";
import "../Css/Shop.css";

export default function Wishlist() {
    const { ids } = useWishlist();
    const items = products.filter((p) => ids.includes(p.id));

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, []);

    return (
        <>
            <Navbar />
            <section className="shop-page section">
                <div className="container">
                    <div className="section-header section-header--center">
                        <span className="section-header__eyebrow">Saved For Later</span>
                        <h2 className="section-header__title">Wishlist</h2>
                        <div className="divider divider--center" />
                    </div>

                    {items.length === 0 ? (
                        <div className="shop-empty">
                            <p>مفيش حاجة في المفضلة لسه. دوس على ♡ في أي منتج.</p>
                            <Link to="/collections" className="btn btn-outline">
                                Browse Collections
                            </Link>
                        </div>
                    ) : (
                        <>
                            <p className="shop-count">{items.length} منتج</p>
                            <div className="row g-4">
                                {items.map((p) => (
                                    <div className="col-6 col-md-4 col-lg-3" key={p.id}>
                                        <ProductCard p={p} />
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>
            <Footer />
        </>
    );
}