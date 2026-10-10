const items = [
    { text: "New Collection" },
    { text: "ATHAR" },
    { text: "Handcrafted in Cairo" },
    { text: "ATHAR" },
    { text: "Premium Cotton" },
    { text: "ATHAR" },
    { text: "Easy Returns" },
    { text: "ATHAR" },
];

export default function Line({ reverse = false }) {
    const repeated = [...items, ...items];

    return (
        <div style={{
            background: "var(--clr-accent)",
            borderTop: "var(--border-subtle)",
            borderBottom: "var(--border-subtle)",
            overflow: "hidden",
            padding: "14px 0",
        }}>
            <div style={{
                display: "inline-flex",
                whiteSpace: "nowrap",
                animation: `marquee 18s linear infinite ${reverse ? "reverse" : ""}`,
            }}>
                {repeated.map((item, i) => (
                    <span
                        key={i}
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            padding: "0 2rem",
                            fontFamily: item.text === "ATHAR"
                                ? "var(--ff-serif)"
                                : "var(--ff-sans)",
                            fontSize: item.text === "ATHAR"
                                ? "var(--fs-md)"
                                : "var(--fs-xs)",
                            fontWeight: item.text === "ATHAR"
                                ? "var(--fw-light)"
                                : "var(--fw-reg)",
                            fontStyle: item.text === "ATHAR" ? "italic" : "normal",
                            letterSpacing: item.text === "ATHAR"
                                ? "var(--ls-widest)"
                                : "var(--ls-wider)",
                            textTransform: "uppercase",
                            color: item.text === "ATHAR"
                                ? "var(--clr-dark)"
                                : "rgba(10,10,10,0.6)",
                        }}
                    >
                        {item.text !== "ATHAR" && (
                            <span style={{
                                display: "inline-block",
                                width: "4px",
                                height: "4px",
                                borderRadius: "50%",
                                background: "var(--clr-dark)",
                                marginRight: "2rem",
                                opacity: 0.4,
                            }} />
                        )}
                        {item.text}
                    </span>
                ))}
            </div>

            <style>{`
                @keyframes marquee {
                    from { transform: translateX(0); }
                    to   { transform: translateX(-50%); }
                }
            `}</style>
        </div>
    );
}