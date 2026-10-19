import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useCart } from "./CartContext";
import products from "../data/products";
import "../Css/Clothes.css";
import "../Css/Shop.css";

export default function Shop({ category = "All", eyebrow, title, sub }) {
    const { addToCart } = useCart();
    const [active, setActive] = useState("All");
    const [addedId, setAddedId] = useState(null);

    // الصفحة تبدأ من فوق لما تفتح
    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, []);

    // Collections فيها فلتر Men/Women، لكن Men و Women مش محتاجينه
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

    const handleAdd = (p) => {
        // نفس الـ prefix بتاع Clothes عشان نفس المنتج مايتكررش في الكارت
        addToCart({ ...p, id: `clothes-${p.id}` });
        setAddedId(p.id);
        setTimeout(() => setAddedId(null), 1200);
    };

    return (
        <>
            <Navbar />

            <section className="shop-page section">
                <div className="container">

                    {/* Header */}
                    <div className="section-header section-header--center">
                        <span className="section-header__eyebrow">{eyebrow}</span>
                        <h2 className="section-header__title">{title}</h2>
                        <div className="divider divider--center" />
                        <p className="section-header__sub">{sub}</p>
                    </div>

                    {/* Filters */}
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

                    {/* Grid */}
                    {filtered.length === 0 ? (
                        <p className="shop-empty">مفيش منتجات في الفلتر ده دلوقتي.</p>
                    ) : (
                        <div className="row g-4">
                            {filtered.map((p) => (
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
                    )}

                </div>
            </section>

            <Footer />
        </>
    );
}