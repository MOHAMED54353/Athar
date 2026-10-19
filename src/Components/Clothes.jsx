import { useState } from "react";
import ProductCard from "./ProductCard";
import products from "../data/products";
import "../Css/Clothes.css";

const filters = ["All", "Men", "Women", "Sale"];

const list = products.filter((p) => !p.featured);

export default function Clothes() {
    const [active, setActive] = useState("All");

    const filtered =
        active === "All"
            ? list
            : active === "Sale"
                ? list.filter((p) => p.badge === "Sale")
                : list.filter((p) => p.category === active);

    return (
        <section className="new-arrivals section">
            <div className="container">
                <div className="section-header section-header--center">
                    <span className="section-header__eyebrow">Just Dropped</span>
                    <h2 className="section-header__title">New Arrivals</h2>
                    <div className="divider divider--center" />
                    <p className="section-header__sub">
                        أحدث الإضافات لهذا الموسم — مختارة بعناية لتعكس أسلوبك.
                    </p>
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

                <div className="row g-4">
                    {filtered.map((p) => (
                        <div className="col-6 col-md-4 col-lg-3" key={p.id}>
                            <ProductCard p={p} />
                        </div>
                    ))}
                </div>
                <div className="na-cta">
                    <a href="/collections" className="btn btn-outline">
                        View All Collections
                    </a>
                </div>
            </div>
        </section>
    );
}