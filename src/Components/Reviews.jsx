import { useState } from "react";
import "../Css/Reviews.css";

const reviews = [
    {
        id: 1,
        name: "أحمد محمود",
        location: "القاهرة",
        rating: 5,
        text: "من أول ما لبست الشيرت حسيت بالفرق — القماش خفيف ومريح جداً وشكله محترم. ناس كتير سألتني عليه في نفس اليوم.",
        product: "Linen Oversized Shirt",
        initial: "أ",
    },
    {
        id: 2,
        name: "سارة خالد",
        location: "الإسكندرية",
        rating: 5,
        text: "أخيراً براند مصري بيفهم إن المرأة محتاجة ستايل وراحة في نفس الوقت. الفستان جه بالمقاس بالظبط والتوصيل كان سريع.",
        product: "Draped Midi Dress",
        initial: "س",
    },
    {
        id: 3,
        name: "عمر حسن",
        location: "الجيزة",
        rating: 5,
        text: "اشتريت البنطلون وكنت متردد بسبب السعر، بس والله يستاهل. الخامة تفرق تماماً عن أي حاجة اشتريتها أونلاين قبل كده.",
        product: "Wide Leg Trousers",
        initial: "ع",
    },
    {
        id: 4,
        name: "نور إبراهيم",
        location: "المنصورة",
        rating: 5,
        text: "الجاكيت خطف الأنظار من أول لحظة. التصميم أنيق جداً ومحسوس إن في اهتمام بكل تفصيلة صغيرة فيه.",
        product: "Structured Blazer",
        initial: "ن",
    },
    {
        id: 5,
        name: "كريم طارق",
        location: "أسيوط",
        rating: 5,
        text: "خدمة العملاء ممتازة وبيردوا بسرعة. المنتج وصل في التايم وكان متغلف بشكل محترم — حاسس إني اشتريت من براند حقيقي.",
        product: "Cotton Relaxed Tee",
        initial: "ك",
    },
];

const Stars = ({ count }) => (
    <div className="t-stars">
        {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} style={{ color: i < count ? "var(--clr-accent)" : "rgba(201,169,110,0.2)" }}>
                ★
            </span>
        ))}
    </div>
);

export default function Reviews() {
    const [active, setActive] = useState(0);

    const prev = () => setActive(i => (i === 0 ? reviews.length - 1 : i - 1));
    const next = () => setActive(i => (i === reviews.length - 1 ? 0 : i + 1));

    const r = reviews[active];

    return (
        <section className="testimonials section">
            <div className="container">

                {/* Header */}
                <div className="section-header section-header--center">
                    <span className="section-header__eyebrow">What They Say</span>
                    <h2 className="section-header__title">آراء عملائنا</h2>
                    <div className="divider divider--center" />
                </div>
                <div className="t-slider">
                    <div className="t-quote">"</div>
                    <p className="t-text" key={r.id}>{r.text}</p>
                    <Stars count={r.rating} />
                    <span className="t-product-tag">{r.product}</span>

                    <div className="t-reviewer">
                        <div className="t-avatar">{r.initial}</div>
                        <div className="t-reviewer-info">
                            <p className="t-reviewer-name">{r.name}</p>
                            <p className="t-reviewer-location">{r.location}</p>
                        </div>
                    </div>

                    <div className="t-controls">
                        <button className="t-btn" onClick={prev} aria-label="Previous">←</button>
                        <div className="t-dots">
                            {reviews.map((_, i) => (
                                <button
                                    key={i}
                                    className={`t-dot ${i === active ? "active" : ""}`}
                                    onClick={() => setActive(i)}
                                    aria-label={`Review ${i + 1}`}
                                />
                            ))}
                        </div>
                        <button className="t-btn" onClick={next} aria-label="Next">→</button>
                    </div>
                </div>
                <div className="row g-3 t-stats">
                    {[
                        { num: "4.9", label: "Average Rating" },
                        { num: "+2K", label: "Happy Customers" },
                        { num: "98%", label: "Would Recommend" },
                    ].map(s => (
                        <div className="col-4" key={s.label}>
                            <div className="t-stat-card">
                                <Stars count={5} />
                                <p className="t-stat-num">{s.num}</p>
                                <p className="t-stat-label">{s.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}