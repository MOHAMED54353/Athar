import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ProductCard from "./ProductCard";
import products from "../data/products";
import "../Css/Clothes.css";
import "../Css/Shop.css";
import "../Css/Search.css";

const suggestions = ["Dress", "Jacket", "Shirt", "Jeans", "Skirt", "Tee"];

export default function Search() {
    const [params, setParams] = useSearchParams();
    const q = params.get("q") || "";

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