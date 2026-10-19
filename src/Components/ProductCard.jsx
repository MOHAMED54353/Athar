import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useWishlist } from "./WishlistContext";
import "../Css/Clothes.css";
import "../Css/ProductCard.css";

export default function ProductCard({ p }) {
    const { has, toggle } = useWishlist();
    const liked = has(p.id);
    const to = `/product/${p.id}`;

    return (
        <div className="product-card">
            <div className="product-card__img-wrap">
                <Link to={to} className="product-card__img-link">
                    <img src={p.img} alt={p.name} loading="lazy" />
                </Link>

                {p.badge && (
                    <span className={`product-card__badge ${p.badge === "Sale" ? "badge--sale" : ""}`}>
                        {p.badge}
                    </span>
                )}

                <button
                    type="button"
                    className={`product-card__heart ${liked ? "active" : ""}`}
                    onClick={() => toggle(p.id)}
                    aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
                    aria-pressed={liked}
                >
                    <Heart size={16} fill={liked ? "currentColor" : "none"} />
                </button>

                <div className="product-card__actions">
                    <Link to={to} className="product-card__quick-add">
                        Choose Options
                    </Link>
                </div>
            </div>

            <div className="product-card__info">
                <span className="product-card__category">{p.category}</span>
                <Link to={to} className="product-card__name-link">
                    <p className="product-card__name">{p.name}</p>
                </Link>
                <p className="product-card__price">
                    {p.price} ج.م
                    {p.oldPrice && <s>{p.oldPrice} ج.م</s>}
                </p>
            </div>
        </div>
    );
}