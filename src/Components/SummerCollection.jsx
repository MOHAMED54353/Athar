import "../Css/SummerCollection.css";

const items = [
    {
        id: 1,
        label: "Men's Edit",
        title: "Desert\nBreeze",
        sub: "قطع خفيفة تناسب حرارة الصيف المصري",
        img: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800",
        href: "/collections/men-summer",
        size: "large",
    },
    {
        id: 2,
        label: "Women's Edit",
        title: "Golden\nHour",
        sub: "إطلالات ناعمة من وحي غروب الشمس",
        img: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800",
        href: "/collections/women-summer",
        size: "large",
    },
    {
        id: 3,
        label: "Essentials",
        title: "The\nBasics",
        sub: "أساسيات لا تخرج عن الموضة",
        img: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800",
        href: "/collections/essentials",
        size: "small",
    },
    {
        id: 4,
        label: "Limited Drop",
        title: "Athar\nExclusive",
        sub: "قطع محدودة لا تتكرر",
        img: "https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg?auto=compress&cs=tinysrgb&w=800",
        href: "/collections/exclusive",
        size: "small",
    },
];

export default function SummerCollection() {
    return (
        <section className="summer section">
            <div className="container">

                {/* Header */}
                <div className="section-header section-header--center">
                    <span className="section-header__eyebrow">Season 2025</span>
                    <h2 className="section-header__title">
                        The Summer <em style={{
                            fontStyle: "italic",
                            color: "var(--clr-accent)"
                        }}>Collection</em>
                    </h2>
                    <div className="divider divider--center" />
                    <p className="section-header__sub">
                        صُممت لأجواء الصيف — خفيفة، جريئة، وفاضية المكان.
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="sc-grid">

                    {/* Large Cards */}
                    {items.filter(i => i.size === "large").map(item => (
                        <a href={item.href} key={item.id} className="sc-card sc-card--large">
                            <img src={item.img} alt={item.title} className="sc-card__img" />
                            <div className="sc-card__overlay" />
                            <div className="sc-card__content">
                                <span className="sc-card__label">{item.label}</span>
                                <h3 className="sc-card__title">
                                    {item.title.split("\n").map((line, i) => (
                                        <span key={i}>{line}<br /></span>
                                    ))}
                                </h3>
                                <p className="sc-card__sub">{item.sub}</p>
                                <span className="sc-card__cta">Shop Now →</span>
                            </div>
                        </a>
                    ))}

                    {/* Small Cards */}
                    {items.filter(i => i.size === "small").map(item => (
                        <a href={item.href} key={item.id} className="sc-card sc-card--small">
                            <img src={item.img} alt={item.title} className="sc-card__img" />
                            <div className="sc-card__overlay" />
                            <div className="sc-card__content">
                                <span className="sc-card__label">{item.label}</span>
                                <h3 className="sc-card__title">
                                    {item.title.split("\n").map((line, i) => (
                                        <span key={i}>{line}<br /></span>
                                    ))}
                                </h3>
                                <span className="sc-card__cta">Explore →</span>
                            </div>
                        </a>
                    ))}
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "var(--sp-xl)"
                }}>
                    <a href="/collections/summer" className="btn btn-outline-accent">
                        View Full Summer Collection
                    </a>
                </div>

            </div>
        </section>
    );
}