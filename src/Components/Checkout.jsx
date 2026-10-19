import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useCart } from "./CartContext";
import "../Css/Checkout.css";

const fmt = (n) => n.toLocaleString("en-US");

const governorates = [
    "القاهرة", "الجيزة", "الإسكندرية", "القليوبية", "الشرقية", "الدقهلية",
    "الغربية", "المنوفية", "البحيرة", "كفر الشيخ", "دمياط", "بورسعيد",
    "الإسماعيلية", "السويس", "الفيوم", "بني سويف", "المنيا", "أسيوط",
    "سوهاج", "قنا", "الأقصر", "أسوان", "البحر الأحمر", "الوادي الجديد",
    "مطروح", "شمال سيناء", "جنوب سيناء",
];

const initialForm = {
    fullName: "",
    phone: "",
    governorate: "",
    city: "",
    address: "",
    notes: "",
};

export default function Checkout() {
    const { items, totalItems, totalPrice, clearCart } = useCart();
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [order, setOrder] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const validate = () => {
        const err = {};
        if (form.fullName.trim().length < 3) err.fullName = "اكتب اسمك بالكامل";
        if (!/^01[0125]\d{8}$/.test(form.phone.trim()))
            err.phone = "رقم موبايل مصري غير صحيح (مثال: 01012345678)";
        if (!form.governorate) err.governorate = "اختار المحافظة";
        if (form.city.trim().length < 2) err.city = "اكتب المدينة أو المنطقة";
        if (form.address.trim().length < 8) err.address = "اكتب العنوان بالتفصيل";
        setErrors(err);
        return Object.keys(err).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        const newOrder = {
            number: "ATH-" + Date.now().toString().slice(-6),
            date: new Date().toISOString(),
            customer: { ...form },
            items,
            totalItems,
            totalPrice,
            payment: "cash_on_delivery",
        };

        try {
            const old = JSON.parse(localStorage.getItem("athar-orders")) || [];
            localStorage.setItem("athar-orders", JSON.stringify([...old, newOrder]));
        } catch {
            /* ignore */
        }

        setOrder(newOrder);
        clearCart();
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    /* ───────── Success ───────── */
    if (order) {
        return (
            <>
                <Navbar />
                <section className="checkout-page section">
                    <div className="container">
                        <div className="co-success">
                            <div className="co-success__icon">✓</div>
                            <span className="section-header__eyebrow">Order Confirmed</span>
                            <h2 className="co-success__title">تم تأكيد طلبك</h2>
                            <p className="co-success__number">
                                رقم الطلب: <strong>{order.number}</strong>
                            </p>
                            <p className="co-success__text">
                                شكراً يا {order.customer.fullName.split(" ")[0]}، هنتواصل معاك
                                على {order.customer.phone} لتأكيد الشحن. الدفع عند الاستلام
                                ({fmt(order.totalPrice)} ج.م).
                            </p>
                            <Link to="/" className="btn btn-outline">
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </section>
                <Footer />
            </>
        );
    }

    /* ───────── Empty ───────── */
    if (items.length === 0) {
        return (
            <>
                <Navbar />
                <section className="checkout-page section">
                    <div className="container">
                        <div className="co-empty">
                            <p>الكارت فاضي، ضيف منتجات الأول.</p>
                            <Link to="/" className="btn btn-outline">
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </section>
                <Footer />
            </>
        );
    }

    /* ───────── Form ───────── */
    return (
        <>
            <Navbar />

            <section className="checkout-page section">
                <div className="container">

                    <div className="section-header section-header--center">
                        <span className="section-header__eyebrow">Almost There</span>
                        <h2 className="section-header__title">Checkout</h2>
                        <div className="divider divider--center" />
                    </div>

                    <form className="co-layout" onSubmit={handleSubmit} noValidate>

                        {/* Form */}
                        <div className="co-form">
                            <h3 className="co-title">بيانات الشحن</h3>

                            <div className="co-field">
                                <label htmlFor="fullName">الاسم بالكامل</label>
                                <input
                                    id="fullName"
                                    name="fullName"
                                    className={`co-input ${errors.fullName ? "has-error" : ""}`}
                                    value={form.fullName}
                                    onChange={handleChange}
                                    autoComplete="name"
                                />
                                {errors.fullName && <span className="co-error">{errors.fullName}</span>}
                            </div>

                            <div className="co-field">
                                <label htmlFor="phone">رقم الموبايل</label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    inputMode="numeric"
                                    maxLength={11}
                                    placeholder="01012345678"
                                    className={`co-input ${errors.phone ? "has-error" : ""}`}
                                    value={form.phone}
                                    onChange={handleChange}
                                    autoComplete="tel"
                                />
                                {errors.phone && <span className="co-error">{errors.phone}</span>}
                            </div>

                            <div className="co-row">
                                <div className="co-field">
                                    <label htmlFor="governorate">المحافظة</label>
                                    <select
                                        id="governorate"
                                        name="governorate"
                                        className={`co-input ${errors.governorate ? "has-error" : ""}`}
                                        value={form.governorate}
                                        onChange={handleChange}
                                    >
                                        <option value="">اختار...</option>
                                        {governorates.map((g) => (
                                            <option key={g} value={g}>{g}</option>
                                        ))}
                                    </select>
                                    {errors.governorate && <span className="co-error">{errors.governorate}</span>}
                                </div>

                                <div className="co-field">
                                    <label htmlFor="city">المدينة / المنطقة</label>
                                    <input
                                        id="city"
                                        name="city"
                                        className={`co-input ${errors.city ? "has-error" : ""}`}
                                        value={form.city}
                                        onChange={handleChange}
                                    />
                                    {errors.city && <span className="co-error">{errors.city}</span>}
                                </div>
                            </div>

                            <div className="co-field">
                                <label htmlFor="address">العنوان بالتفصيل</label>
                                <textarea
                                    id="address"
                                    name="address"
                                    rows={3}
                                    placeholder="الشارع، رقم العمارة، الدور، الشقة"
                                    className={`co-input ${errors.address ? "has-error" : ""}`}
                                    value={form.address}
                                    onChange={handleChange}
                                    autoComplete="street-address"
                                />
                                {errors.address && <span className="co-error">{errors.address}</span>}
                            </div>

                            <div className="co-field">
                                <label htmlFor="notes">ملاحظات (اختياري)</label>
                                <textarea
                                    id="notes"
                                    name="notes"
                                    rows={2}
                                    className="co-input"
                                    value={form.notes}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="co-payment">
                                <span className="co-payment__dot" />
                                <div>
                                    <strong>الدفع عند الاستلام</strong>
                                    <p>هتدفع كاش للمندوب لما الطلب يوصلك.</p>
                                </div>
                            </div>
                        </div>

                        {/* Summary */}
                        <aside className="co-summary">
                            <h3 className="co-title">ملخص الطلب</h3>

                            <div className="co-summary__items">
                                {items.map((item) => (
                                    <div className="co-summary__item" key={item.id}>
                                        <div className="co-summary__thumb">
                                            <img src={item.img} alt={item.name} />
                                            <span className="co-summary__qty">{item.qty}</span>
                                        </div>
                                        <p className="co-summary__name">{item.name}</p>
                                        <p className="co-summary__price">
                                            {fmt(item.price * item.qty)} ج.م
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="co-summary__row">
                                <span>Items</span>
                                <span>{totalItems}</span>
                            </div>
                            <div className="co-summary__row">
                                <span>Subtotal</span>
                                <span>{fmt(totalPrice)} ج.م</span>
                            </div>
                            <div className="co-summary__row">
                                <span>Shipping</span>
                                <span>مجاني</span>
                            </div>
                            <div className="co-summary__row co-summary__row--total">
                                <span>Total</span>
                                <span>{fmt(totalPrice)} ج.م</span>
                            </div>

                            <button type="submit" className="btn btn-outline co-summary__submit">
                                Place Order
                            </button>
                            <Link to="/cart" className="co-summary__back">
                                ← Back to Cart
                            </Link>
                        </aside>

                    </form>
                </div>
            </section>

            <Footer />
        </>
    );
}