import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Heart, Minus, Plus } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ProductCard from "./ProductCard";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";
import products, { getProduct } from "../data/products";
import "../Css/Clothes.css";
import "../Css/ProductPage.css";

function ProductDetails({ product }) {
    const { addToCart } = useCart();
    const { has, toggle } = useWishlist();
    const liked = has(product.id);

    const gallery = product.images?.length ? product.images : [product.img];
    const [activeImg, setActiveImg] = useState(0);
    const [size, setSize] = useState("");
    const [color, setColor] = useState(product.colors?.[0]?.name || "");
    const [qty, setQty] = useState(1);
    const [error, setError] = useState("");
    const [justAdded, setJustAdded] = useState(false);
    const [hasAdded, setHasAdded] = useState(false);

    const discount = product.oldPrice
        ? Math.round((1 - Number(product.price) / Number(product.oldPrice)) * 100)
        : 0;

    const related = products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    const handleAdd = () => {
        if (product.sizes?.length && !size) {
            setError("اختار المقاس الأول");
            return;
        }
        addToCart(product, { size, color, qty });
        setJustAdded(true);
        setHasAdded(true);
        setTimeout(() => setJustAdded(false), 1500);
    };

    return (
        <section className="product-page section">
            <div className="container">

                <nav className="pp-breadcrumb">
                    <Link to="/">Home</Link>
                    <span>/</span>
                    <Link to={`/${product.category.toLowerCase()}`}>{product.category}</Link>
                    <span>/</span>
                    <span>{product.name}</span>
                </nav>

                <div className="pp-layout">
                    <div className={`pp-gallery ${gallery.length > 1 ? "" : "pp-gallery--single"}`}>
                        {gallery.length > 1 && (
                            <div className="pp-thumbs">
                                {gallery.map((src, i) => (
                                    <button
                                        key={src}
                                        type="button"
                                        className={`pp-thumb ${i === activeImg ? "active" : ""}`}
                                        onClick={() => setActiveImg(i)}
                                    >
                                        <img src={src} alt="" />
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="pp-main">
                            <img src={gallery[activeImg]} alt={product.name} />
                            {product.badge && (
                                <span className={`product-card__badge ${product.badge === "Sale" ? "badge--sale" : ""}`}>
                                    {product.badge}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="pp-info">
                        <span className="pp-category">{product.category}</span>
                        <h1 className="pp-title">{product.name}</h1>

                        <div className="pp-price">
                            <span>{product.price} ج.م</span>
                            {product.oldPrice && <s>{product.oldPrice} ج.م</s>}
                            {discount > 0 && <em>-{discount}%</em>}
                        </div>
                        <p className="pp-desc">{product.description}</p>
                        {product.colors?.length > 0 && (
                            <div className="pp-option">
                                <div className="pp-label">
                                    اللون: <strong>{color}</strong>
                                </div>
                                <div className="pp-colors">
                                    {product.colors.map((c) => (
                                        <button
                                            key={c.name}
                                            type="button"
                                            className={`pp-color ${color === c.name ? "active" : ""}`}
                                            style={{ background: c.hex }}
                                            title={c.name}
                                            aria-label={c.name}
                                            onClick={() => setColor(c.name)}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {product.sizes?.length > 0 && (
                            <div className="pp-option">
                                <div className="pp-label">
                                    المقاس {size && <strong>: {size}</strong>}
                                </div>
                                <div className="pp-sizes">
                                    {product.sizes.map((s) => (
                                        <button
                                            key={s}
                                            type="button"
                                            className={`pp-size ${size === s ? "active" : ""}`}
                                            onClick={() => {
                                                setSize(s);
                                                setError("");
                                            }}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                                {error && <span className="pp-error">{error}</span>}
                            </div>
                        )}

                        <div className="pp-buy">
                            <div className="pp-qty">
                                <button
                                    type="button"
                                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                                    aria-label="Decrease quantity"
                                >
                                    <Minus size={14} />
                                </button>
                                <span>{qty}</span>
                                <button
                                    type="button"
                                    onClick={() => setQty((q) => Math.min(10, q + 1))}
                                    aria-label="Increase quantity"
                                >
                                    <Plus size={14} />
                                </button>
                            </div>

                            <button type="button" className="btn btn-outline pp-add" onClick={handleAdd}>
                                {justAdded ? "Added ✓" : "Add to Cart"}
                            </button>

                            <button
                                type="button"
                                className={`pp-wish ${liked ? "active" : ""}`}
                                onClick={() => toggle(product.id)}
                                aria-label="Wishlist"
                                aria-pressed={liked}
                            >
                                <Heart size={18} fill={liked ? "currentColor" : "none"} />
                            </button>
                        </div>

                        {hasAdded && (
                            <Link to="/cart" className="pp-viewcart">
                                View Cart →
                            </Link>
                        )}

                        <ul className="pp-meta">
                            <li>الدفع عند الاستلام</li>
                            <li>شحن مجاني على كل الطلبات</li>
                        </ul>
                    </div>
                </div>

                {related.length > 0 && (
                    <div className="pp-related">
                        <h3 className="pp-related__title">You May Also Like</h3>
                        <div className="row g-4">
                            {related.map((p) => (
                                <div className="col-6 col-md-3" key={p.id}>
                                    <ProductCard p={p} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </section>
    );
}

export default function ProductPage() {
    const { id } = useParams();
    const product = getProduct(id);

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [id]);

    if (!product) {
        return (
            <>
                <Navbar />
                <section className="product-page section">
                    <div className="container">
                        <div className="pp-missing">
                            <p>المنتج ده مش موجود.</p>
                            <Link to="/collections" className="btn btn-outline">
                                Back to Collections
                            </Link>
                        </div>
                    </div>
                </section>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <ProductDetails key={product.id} product={product} />
            <Footer />
        </>
    );
}