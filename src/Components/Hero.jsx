import "../Css/Hero.css";

export default function Hero() {
    return (
        <section className="hero">
            <div className="hero__video-wrap">
                <video
                    className="hero__video"
                    src="/101.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                />
                <div className="hero__overlay" />
            </div>

            <div className="hero__content container">
                <div className="hero__text">
                    <span className="section-header__eyebrow">New Collection — 2026</span>
                    <h1 className="hero__title">
                        Wear What <br />
                        <em>Leaves a Mark</em>
                    </h1>
                    <p className="hero__sub">
                        ملابس مصممة لمن يؤمن بأن الأناقة ليست مظهراً — بل أثر.
                    </p>
                    <div className="hero__actions">
                        <a href="/collections" className="btn btn-primary">Shop Now</a>
                        <a href="/about" className="btn btn-ghost">Our Story →</a>
                    </div>
                </div>
            </div>

            <div className="hero__scroll">
                <span className="hero__scroll-label">Scroll</span>
                <div className="hero__scroll-line" />
            </div>
        </section>
    );
}