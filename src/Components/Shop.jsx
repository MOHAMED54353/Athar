import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ProductCard from "./ProductCard";
import products from "../data/products";
import "../Css/Clothes.css";
import "../Css/Shop.css";

export default function Shop({ category = "All", eyebrow, title, sub }) {
    const [active, setActive] = useState("All");

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, []);

    const filters =
        category === "All"
            ? ["All", "Men", "Women", "New", "Sale"]
            : ["All", "New", "Sale"];

    const base =
        category === "All"
            ? products
            : products.filter((p) => p.category === category);

    const filtered = base.filter((p) => {
        if (active === "All") return true;
        if (active === "New" || active === "Sale") return p.badge === active;
        return p.category === active; // Men / Women
    });

    return (
        <>
            <Navbar />
            <section className="shop-page section">
                <div className="container">
                    <div className="section-header section-header--center">
                        <span className="section-header__eyebrow">{eyebrow}</span>
                        <h2 className="section-header__title">{title}</h2>
                        <div className="divider divider--center" />
                        <p className="section-header__sub">{sub}</p>
                    </div>

                    <div className="na-filters">
                        {filters.map((f) => (
                            <button
                                key={f}
                                className={`na-filter-btn ${active === f ? "active" : ""}`}
                                onClick={() => setActive(f)}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                    <p className="shop-count">{filtered.length} منتج</p>
                    {filtered.length === 0 ? (
                        <p className="shop-empty">مفيش منتجات في الفلتر ده دلوقتي.</p>
                    ) : (
                        <div className="row g-4">
                            {filtered.map((p) => (
                                <div className="col-6 col-md-4 col-lg-3" key={p.id}>
                                    <ProductCard p={p} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
            <Footer />
        </>
    );
}