import { useState } from "react";
import { ShoppingBag, Search, User, Menu, X } from "lucide-react";
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

                <a href="/" className="nav-logo">ATHAR</a>
                <ul className="nav-links">
                    {links.map((l) => (
                        <li key={l.label}>
                            <a href={l.href}>{l.label}</a>
                        </li>
                    ))}
                </ul>

                <div className="nav-actions">
                    <a href="/search" aria-label="Search"><Search size={18} /></a>
                    <span className="nav-divider" />
                    <a href="/account" aria-label="Account"><User size={18} /></a>
                    <a href="/cart" aria-label="Cart" className="cart-icon">
                        <ShoppingBag size={18} />
                        <span className="cart-dot" />
                    </a>
                </div>
            </nav>

            <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
                {links.map((l) => (
                    <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}>
                        {l.label}
                    </a>
                ))}
            </div>
        </>
    );
}