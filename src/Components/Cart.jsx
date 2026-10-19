import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useCart } from "./CartContext";
import "../Css/Cart.css";

const fmt = (n) => n.toLocaleString("en-US");

export default function Cart() {
    const {
        items,
        increase,
        decrease,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
    } = useCart();

    return (
        <>
            <Navbar />

            <section className="cart-page section">
                <div className="container">

                    <div className="section-header section-header--center">
                        <span className="section-header__eyebrow">Your Bag</span>
                        <h2 className="section-header__title">Shopping Cart</h2>
                        <div className="divider divider--center" />
                    </div>

                    {items.length === 0 ? (
                        <div className="cart-empty">
                            <p>الكارت فاضي دلوقتي.</p>
                            <Link to="/" className="btn btn-outline">
                                Continue Shopping
                            </Link>
                        </div>
                    ) : (
                        <div className="cart-layout">

                            {/* Items */}
                            <div className="cart-items">
                                {items.map((item) => (
                                    <div className="cart-item" key={item.key}>
                                        <img
                                            className="cart-item__img"
                                            src={item.img}
                                            alt={item.name}
                                        />

                                        <div className="cart-item__info">
                                            <span className="cart-item__category">
                                                {item.category}
                                            </span>
                                            <p className="cart-item__name">
                                                {Number.isInteger(item.id) ? (
                                                    <Link to={`/product/${item.id}`}>{item.name}</Link>
                                                ) : (
                                                    item.name
                                                )}
                                            </p>
                                            {(item.size || item.color) && (
                                                <p className="cart-item__variant">
                                                    {[
                                                        item.size && `المقاس: ${item.size}`,
                                                        item.color && `اللون: ${item.color}`,
                                                    ]
                                                        .filter(Boolean)
                                                        .join(" · ")}
                                                </p>
                                            )}
                                            <p className="cart-item__price">
                                                {fmt(item.price)} ج.م
                                            </p>
                                        </div>

                                        <div className="cart-item__qty">
                                            <button
                                                onClick={() => decrease(item.key)}
                                                aria-label="Decrease quantity"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span>{item.qty}</span>
                                            <button
                                                onClick={() => increase(item.key)}
                                                aria-label="Increase quantity"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>

                                        <p className="cart-item__total">
                                            {fmt(item.price * item.qty)} ج.م
                                        </p>

                                        <button
                                            className="cart-item__remove"
                                            onClick={() => removeFromCart(item.key)}
                                            aria-label="Remove item"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}

                                <button className="cart-clear" onClick={clearCart}>
                                    Clear Cart
                                </button>
                            </div>

                            {/* Summary */}
                            <aside className="cart-summary">
                                <h3 className="cart-summary__title">Order Summary</h3>

                                <div className="cart-summary__row">
                                    <span>Items</span>
                                    <span>{totalItems}</span>
                                </div>
                                <div className="cart-summary__row">
                                    <span>Subtotal</span>
                                    <span>{fmt(totalPrice)} ج.م</span>
                                </div>
                                <div className="cart-summary__row">
                                    <span>Shipping</span>
                                    <span>مجاني</span>
                                </div>

                                <div className="cart-summary__row cart-summary__row--total">
                                    <span>Total</span>
                                    <span>{fmt(totalPrice)} ج.م</span>
                                </div>

                                <Link
                                    to="/checkout"
                                    className="btn btn-outline cart-summary__checkout"
                                >
                                    Checkout
                                </Link>
                                <Link to="/" className="cart-summary__continue">
                                    Continue Shopping
                                </Link>
                            </aside>

                        </div>
                    )}

                </div>
            </section>

            <Footer />
        </>
    );
}