export default function AboutBrand() {
    return (
        <section
            style={{
                background: "var(--clr-dark-2)",
                borderTop: "var(--border-subtle)",
                borderBottom: "var(--border-subtle)",
            }}
            className="section"
        >
            <div className="container">
                <div className="row align-items-center g-5">
                    <div className="col-12 col-lg-6">
                        <div style={{ position: "relative" }}>
                            <div style={{
                                overflow: "hidden",
                                aspectRatio: "4/5",
                                border: "var(--border-subtle)",
                            }}>
                                <img
                                    src="/1.png"
                                    alt="About Athar"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        objectPosition: "center top",
                                        filter: "grayscale(15%)",
                                        transition: "transform var(--transition-slow)",
                                        display: "block",
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
                                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                                />
                            </div>

                            <div style={{
                                position: "absolute",
                                top: "2rem",
                                left: "-1rem",
                                width: "3px",
                                height: "80px",
                                background: "var(--clr-accent)",
                            }} />
                        </div>
                    </div>

                    <div className="col-12 col-lg-6" dir="rtl">
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1.5rem",
                            paddingLeft: "clamp(0px, 3vw, 2rem)",
                        }}>
                            <h2 dir="ltr" style={{
                                fontFamily: "var(--ff-serif)",
                                fontSize: "var(--fs-3xl)",
                                fontWeight: "var(--fw-light)",
                                lineHeight: 1.15,
                                color: "var(--clr-light)",
                                margin: 0,
                            }}>
                                Fashion That <br />
                                <em style={{
                                    fontStyle: "italic",
                                    color: "var(--clr-accent)",
                                }}>
                                    Leaves an Athar
                                </em>
                            </h2>

                            <div style={{
                                width: "40px",
                                height: "1px",
                                background: "var(--clr-accent)",
                            }} />

                            <p dir="" style={{
                                fontFamily: "var(--ff-sans)",
                                fontSize: "var(--fs-base)",
                                color: "var(--clr-muted)",
                                lineHeight: 1.85,
                                margin: 0,
                            }}>
                                أثر بدأت في القاهرة سنة ٢٠١٩ من فكرة بسيطة —
                                إن اللبس مش بس قماش وخيط، ده تعبير عن مين إنت.
                                كل قطعة بنصممها بتفكير، وبتتعمل بيد ناس بتحب شغلها.
                            </p>

                            <p style={{
                                fontFamily: "var(--ff-sans)",
                                fontSize: "var(--fs-base)",
                                color: "var(--clr-muted)",
                                lineHeight: 1.85,
                                margin: 0,
                            }}>
                                مش بنبيع موضة — بنبيع أسلوب.
                                وبنؤمن إن الأناقة الحقيقية هي اللي بتفضل في الأذهان
                                حتى بعد ما تمشي.
                            </p>

                            <div className="row g-3" style={{ marginTop: "0.5rem" }}>
                                {[
                                    { num: "+5K", label: "Happy Clients" },
                                    { num: "+120", label: "Unique Pieces" },
                                    { num: "6", label: "Years of Craft" },
                                ].map((s) => (
                                    <div className="col-4" key={s.label}>
                                        <div style={{
                                            borderLeft: "1px solid rgba(201,169,110,0.25)",
                                            paddingLeft: "1rem",
                                        }}>
                                            <p style={{
                                                fontFamily: "var(--ff-serif)",
                                                fontSize: "var(--fs-xl)",
                                                fontWeight: "var(--fw-light)",
                                                color: "var(--clr-accent)",
                                                margin: 0,
                                                lineHeight: 1.1,
                                            }}>
                                                {s.num}
                                            </p>
                                            <p style={{
                                                fontFamily: "var(--ff-sans)",
                                                fontSize: "var(--fs-xs)",
                                                letterSpacing: "var(--ls-wide)",
                                                textTransform: "uppercase",
                                                color: "var(--clr-muted)",
                                                margin: 0,
                                                marginTop: "4px",
                                            }}>
                                                {s.label}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ marginTop: "0.5rem" }}>
                                <a href="/about" className="btn btn-outline-accent">
                                    Discover More →
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}