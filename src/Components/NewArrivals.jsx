import { useState } from "react";
import { useCart } from "./CartContext";
import "../Css/NewArrivals.css";

const products = [
    {
        id: 1,
        name: "Linen Oversized Shirt",
        category: "Men",
        price: "2499 ج.م",
        oldPrice: "3000 ج.م",
        badge: "New",
        img: "/dab57cb8ac975af091624ae00a0000be.jpg",
    },
    {
        id: 2,
        name: "Draped Midi Dress",
        category: "Women",
        price: "8999 ج.م",
        badge: "New",
        img: "/2.jpg",
    },
    {
        id: 3,
        name: "Wide Leg Trousers",
        category: "Men",
        price: "3000 ج.م",
        oldPrice: "7499 ج.م",
        badge: "Sale",
        img: "/3.jpg",
    },
    {
        id: 4,
        name: "Structured Blazer",
        category: "Women",
        price: "7899 ج.م",
        badge: null,
        img: "/4.jpg",
    },
];

export default function NewArrivals() {
    const { addToCart } = useCart();
    const [addedId, setAddedId] = useState(null);

    const handleAdd = (p) => {
        // prefix عشان الـ id مايتعارضش مع منتجات Clothes
        addToCart({ ...p, id: `na-${p.id}` });
        setAddedId(p.id);
        setTimeout(() => setAddedId(null), 1200);
    };

    return (
        <section className="new-arrivals section">
            <div className="container">

                <div className="section-header section-header--center">
                    <span className="section-header__eyebrow">Just Dropped</span>
                    <h2 className="section-header__title">Leave Your Athar</h2>
                    <div className="divider divider--center" />
                    <p className="section-header__sub">
                        قطع مختارة بعناية — لتعكس حضورك وتبرز أسلوبك.
                    </p>
                </div>

                <div className="na-grid">
                    {products.map((p) => (
                        <div className="product-card" key={p.id}>
                            <div className="product-card__img-wrap">
                                <img src={p.img} alt={p.name} />
                                {p.badge && (
                                    <span className={`product-card__badge ${p.badge === "Sale" ? "badge--sale" : ""}`}>
                                        {p.badge}
                                    </span>
                                )}
                                <button
                                    className="product-card__quick-add"
                                    onClick={() => handleAdd(p)}
                                >
                                    {addedId === p.id ? "Added ✓" : "Quick Add"}
                                </button>
                            </div>
                            <div className="product-card__info">
                                <span className="product-card__category">{p.category}</span>
                                <p className="product-card__name">{p.name}</p>
                                <p className="product-card__price">
                                    {p.price}
                                    {p.oldPrice && <s>{p.oldPrice}</s>}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="na-cta">
                    <a href="/collections" className="btn btn-outline">View All Collections</a>
                </div>

            </div>
        </section>
    );
}