import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useCart } from "./CartContext";
import products from "../data/products";
import "../Css/Clothes.css";
import "../Css/Shop.css";
import "../Css/Search.css";

const suggestions = ["Dress", "Jacket", "Shirt", "Jeans", "Skirt", "Tee"];

export default function Search() {
    const [params, setParams] = useSearchParams();
    const q = params.get("q") || "";
    const { addToCart } = useCart();
    const [addedId, setAddedId] = useState(null);

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, []);

    const setQuery = (value) => {
        if (value) setParams({ q: value }, { replace: true });
        else setParams({}, { replace: true });
    };

    const term = q.trim().toLowerCase();
    const results = term
        ? products.filter(
            (p) =>
                p.name.toLowerCase().includes(term) ||
                p.category.toLowerCase().includes(term) ||
                (p.badge || "").toLowerCase().includes(term)
        )
        : [];

    const handleAdd = (p) => {
        addToCart({ ...p, id: `clothes-${p.id}` });
        setAddedId(p.id);
        setTimeout(() => setAddedId(null), 1200);
    };

    return (
        <>
            <Navbar />

            <section className="shop-page section">
                <div className="container">

                    <div className="section-header section-header--center">
                        <span className="section-header__eyebrow">Find Your Piece</span>
                        <h2 className="section-header__title">Search</h2>
                        <div className="divider divider--center" />
                    </div>

                    <div className="search-box">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="دوّر على منتج... (مثال: dress)"
                            value={q}
                            onChange={(e) => setQuery(e.target.value)}
                            autoFocus
                        />
                        {q && (
                            <button
                                className="search-clear"
                                onClick={() => setQuery("")}
                                aria-label="Clear"
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    {!term ? (
                        <div className="search-suggestions">
                            <p>جرّب تدوّر على:</p>
                            <div>
                                {suggestions.map((s) => (
                                    <button
                                        key={s}
                                        className="na-filter-btn"
                                        onClick={() => setQuery(s)}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : results.length === 0 ? (
                        <p className="shop-empty">
                            مفيش نتايج لـ "{q}". جرّب كلمة تانية.
                        </p>
                    ) : (
                        <>
                            <p className="shop-count">{results.length} نتيجة</p>
                            <div className="row g-4">
                                {results.map((p) => (
                                    <div className="col-6 col-md-4 col-lg-3" key={p.id}>
                                        <div className="product-card">

                                            <div className="product-card__img-wrap">
                                                <img src={p.img} alt={p.name} />

                                                {p.badge && (
                                                    <span className={`product-card__badge ${p.badge === "Sale" ? "badge--sale" : ""}`}>
                                                        {p.badge}
                                                    </span>
                                                )}

                                                <div className="product-card__actions">
                                                    <button
                                                        className="product-card__quick-add"
                                                        onClick={() => handleAdd(p)}
                                                    >
                                                        {addedId === p.id ? "Added ✓" : "Quick Add"}
                                                    </button>
                                                    <button className="product-card__wishlist" aria-label="Wishlist">
                                                        ♡
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="product-card__info">
                                                <span className="product-card__category">{p.category}</span>
                                                <p className="product-card__name">{p.name}</p>
                                                <p className="product-card__price">
                                                    {p.price} ج.م
                                                    {p.oldPrice && <s>{p.oldPrice} ج.م</s>}
                                                </p>
                                            </div>

                                        </div>
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