import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Search, User, Heart, Menu, X } from "lucide-react";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";
import "../Css/Navbar.css";

const links = [
    { label: "Home", href: "/" },
    { label: "Collections", href: "/collections" },
    { label: "Men", href: "/men" },
    { label: "Women", href: "/women" },
    { label: "About", href: "/about" },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { totalItems } = useCart();
    const { count: wishCount } = useWishlist();

    return (
        <>
            <div className="announcement-bar">
                شحن مجاني على جميع الطلبات لفترة محدودة   &nbsp;·&nbsp; NEW COLLECTION NOW LIVE
            </div>

            <nav className="athar-navbar">
                <button
                    className="hamburger"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Menu"
                >
                    {menuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>

                <Link to="/" className="nav-logo">ATHAR</Link>
                <ul className="nav-links">
                    {links.map((l) => (
                        <li key={l.label}>
                            <Link to={l.href}>{l.label}</Link>
                        </li>
                    ))}
                </ul>

                <div className="nav-actions">
                    <Link to="/search" aria-label="Search"><Search size={18} /></Link>
                    <span className="nav-divider" />
                    <Link to="/account" aria-label="Account"><User size={18} /></Link>
                    <Link to="/wishlist" aria-label="Wishlist" className="cart-icon">
                        <Heart size={18} />
                        {wishCount > 0 && (
                            <span className="cart-count">{wishCount}</span>
                        )}
                    </Link>
                    <Link to="/cart" aria-label="Cart" className="cart-icon">
                        <ShoppingBag size={18} />
                        {totalItems > 0 && (
                            <span className="cart-count">{totalItems}</span>
                        )}
                    </Link>
                </div>
            </nav>

            <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
                {links.map((l) => (
                    <Link key={l.label} to={l.href} onClick={() => setMenuOpen(false)}>
                        {l.label}
                    </Link>
                ))}
            </div>
        </>
    );
}