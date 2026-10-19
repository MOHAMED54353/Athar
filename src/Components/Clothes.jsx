import { useState } from "react";
import { useCart } from "./CartContext";
import "../Css/Clothes.css";

const products = [
    {
        id: 1,
        name: "Linen Oversized Shirt",
        category: "Men",
        price: "2000",
        oldPrice: "2699",
        badge: "New",
        img: "/5.jpg",
    },
    {
        id: 2,
        name: "Draped Midi Dress",
        category: "Women",
        price: "1600",
        badge: "New",
        img: "/6.jpg",
    },
    {
        id: 3,
        name: "Wide Leg Trousers",
        category: "Women",
        price: "2599",
        oldPrice: "3399",
        badge: "Sale",
        img: "/7.jpg",
    },
    {
        id: 4,
        name: "Structured Blazer",
        category: "Women",
        price: "1899",
        badge: null,
        img: "/8.jpg",
    },
    {
        id: 5,
        name: "Cotton Relaxed Tee",
        category: "Men",
        price: "999",
        badge: "New",
        img: "/9.jpg",
    },
    {
        id: 6,
        name: "Silk Wrap Skirt",
        category: "Women",
        price: "1599",
        badge: null,
        img: "/10.jpg",
    },
    {
        id: 7,
        name: "Cargo Utility Pants",
        category: "Men",
        price: "1399",
        oldPrice: "1999",
        badge: "Sale",
        img: "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg",
    },
    {
        id: 8,
        name: "Open Back Blouse",
        category: "Women",
        price: "1785",
        badge: "New",
        img: "/11.jpg",
    },
    {
        id: 9,
        name: "Denim Jacket Classic",
        category: "Men",
        price: "6500",
        badge: null,
        img: "/12.jpg",
    },
    {
        id: 10,
        name: "Ribbed Knit Top",
        category: "Women",
        price: "850",
        badge: "New",
        img: "/13.jpg",
    },
    {
        id: 11,
        name: "Slim Fit Jeans",
        category: "Men",
        price: "1800",
        oldPrice: "2300",
        badge: "Sale",
        img: "/14.jpg",
    },
    {
        id: 12,
        name: "Satin Evening Dress",
        category: "Women",
        price: "3200",
        badge: null,
        img: "/15.jpg",
    },
    {
        id: 13,
        name: "Hooded Sweatshirt",
        category: "Men",
        price: "1200",
        badge: "New",
        img: "/16.jpg",
    },
    {
        id: 14,
        name: "Pleated Mini Skirt",
        category: "Women",
        price: "1100",
        badge: null,
        img: "/17.jpg",
    },
    {
        id: 15,
        name: "Basic Tank Top",
        category: "Women",
        price: "600",
        badge: "Sale",
        oldPrice: "850",
        img: "/18.jpg",
    },
    {
        id: 16,
        name: "Leather Casual Jacket",
        category: "Men",
        price: "3500",
        badge: null,
        img: "/19.jpg",
    },
];
const filters = ["All", "Men", "Women", "Sale"];

export default function Clothes() {
    const [active, setActive] = useState("All");
    const [addedId, setAddedId] = useState(null);
    const { addToCart } = useCart();

    const handleAdd = (p) => {
        // prefix عشان الـ id مايتعارضش مع منتجات NewArrivals
        addToCart({ ...p, id: `clothes-${p.id}` });
        setAddedId(p.id);
        setTimeout(() => setAddedId(null), 1200);
    };

    const filtered = active === "All"
        ? products
        : active === "Sale"
            ? products.filter(p => p.badge === "Sale")
            : products.filter(p => p.category === active);

    return (
        <section className="new-arrivals section">
            <div className="container">

                {/* Header */}
                <div className="section-header section-header--center">
                    <span className="section-header__eyebrow">Just Dropped</span>
                    <h2 className="section-header__title">New Arrivals</h2>
                    <div className="divider divider--center" />
                    <p className="section-header__sub">
                        أحدث الإضافات لهذا الموسم — مختارة بعناية لتعكس أسلوبك.
                    </p>
                </div>

                {/* Filters */}
                <div className="na-filters">
                    {filters.map(f => (
                        <button
                            key={f}
                            className={`na-filter-btn ${active === f ? "active" : ""}`}
                            onClick={() => setActive(f)}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="row g-4">
                    {filtered.map(p => (
                        <div className="col-6 col-md-4 col-lg-3" key={p.id}>
                            <div className="product-card">

                                <div className="product-card__img-wrap">
                                    <img src={p.img} alt={p.name} />

                                    {p.badge && (
                                        <span className={`product-card__badge ${p.badge === "Sale" ? "badge--sale" : ""}`}>
                                            {p.badge}
                                        </span>
                                    )}

                                    {/* Hover Actions */}
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

                {/* CTA */}
                <div className="na-cta">
                    <a href="/collections" className="btn btn-outline">
                        View All Collections
                    </a>
                </div>

            </div>
        </section>
    );
}