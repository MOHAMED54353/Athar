import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../Css/Account.css";

const PROFILE_KEY = "athar-profile";
const ORDERS_KEY = "athar-orders";

const fmt = (n) => Number(n).toLocaleString("en-US");

const readJSON = (key, fallback) => {
    try {
        return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
        return fallback;
    }
};

export default function Account() {
    const [tab, setTab] = useState("orders");
    const [orders] = useState(() => readJSON(ORDERS_KEY, []).slice().reverse());
    const [profile, setProfile] = useState(() =>
        readJSON(PROFILE_KEY, { fullName: "", phone: "", address: "" })
    );
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
        setSaved(false);
    };

    const handleSave = (e) => {
        e.preventDefault();
        try {
            localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
        } catch {
            /* ignore */
        }
        setSaved(true);
    };

    return (
        <>
            <Navbar />

            <section className="account-page section">
                <div className="container">

                    <div className="section-header section-header--center">
                        <span className="section-header__eyebrow">
                            {profile.fullName ? `أهلاً ${profile.fullName.split(" ")[0]}` : "Welcome"}
                        </span>
                        <h2 className="section-header__title">My Account</h2>
                        <div className="divider divider--center" />
                    </div>

                    <div className="na-filters">
                        <button
                            className={`na-filter-btn ${tab === "orders" ? "active" : ""}`}
                            onClick={() => setTab("orders")}
                        >
                            طلباتي
                        </button>
                        <button
                            className={`na-filter-btn ${tab === "profile" ? "active" : ""}`}
                            onClick={() => setTab("profile")}
                        >
                            بياناتي
                        </button>
                    </div>

                    {/* Orders */}
                    {tab === "orders" &&
                        (orders.length === 0 ? (
                            <div className="acc-empty">
                                <p>لسه معملتش أي طلب.</p>
                                <Link to="/collections" className="btn btn-outline">
                                    Start Shopping
                                </Link>
                            </div>
                        ) : (
                            <div className="acc-orders">
                                {orders.map((o) => (
                                    <div className="acc-order" key={o.number}>
                                        <div className="acc-order__head">
                                            <strong>{o.number}</strong>
                                            <span>
                                                {new Date(o.date).toLocaleDateString("ar-EG", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </span>
                                        </div>

                                        <ul className="acc-order__items">
                                            {o.items.map((i) => (
                                                <li key={i.id}>
                                                    <img src={i.img} alt={i.name} />
                                                    <span className="acc-order__name">{i.name}</span>
                                                    <span className="acc-order__qty">× {i.qty}</span>
                                                    <span className="acc-order__price">
                                                        {fmt(i.price * i.qty)} ج.م
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="acc-order__foot">
                                            <span>الدفع عند الاستلام</span>
                                            <strong>{fmt(o.totalPrice)} ج.م</strong>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}

                    {/* Profile */}
                    {tab === "profile" && (
                        <form className="acc-form" onSubmit={handleSave}>
                            <div className="co-field">
                                <label htmlFor="fullName">الاسم بالكامل</label>
                                <input
                                    id="fullName"
                                    name="fullName"
                                    className="co-input"
                                    value={profile.fullName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="co-field">
                                <label htmlFor="phone">رقم الموبايل</label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    maxLength={11}
                                    className="co-input"
                                    value={profile.phone}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="co-field">
                                <label htmlFor="address">العنوان</label>
                                <textarea
                                    id="address"
                                    name="address"
                                    rows={3}
                                    className="co-input"
                                    value={profile.address}
                                    onChange={handleChange}
                                />
                            </div>

                            <button type="submit" className="btn btn-outline">
                                {saved ? "Saved ✓" : "Save Changes"}
                            </button>
                        </form>
                    )}

                </div>
            </section>

            <Footer />
        </>
    );
}