import ProductCard from "./ProductCard";
import products from "../data/products";
import "../Css/NewArrivals.css";

const featured = products.filter((p) => p.featured);

export default function NewArrivals() {
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
                    {featured.map((p) => (
                        <ProductCard key={p.id} p={p} />
                    ))}
                </div>

                <div className="na-cta">
                    <a href="/collections" className="btn btn-outline">View All Collections</a>
                </div>
            </div>
        </section>
    );
}