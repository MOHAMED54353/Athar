import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../Css/About.css";

const values = [
    {
        num: "01",
        title: "خامات مختارة",
        text: "بنختار كل قماشة بعناية عشان تبقى مريحة وتعيش معاك سنين.",
    },
    {
        num: "02",
        title: "تفصيل مظبوط",
        text: "قصّات بسيطة وأنيقة، من غير مبالغة ومن غير ما تطلع عن الموضة.",
    },
    {
        num: "03",
        title: "دفع عند الاستلام",
        text: "اطلب من بيتك، وافحص طلبك، وادفع لما يوصلك.",
    },
];

export default function About() {
    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, []);

    return (
        <>
            <Navbar />

            <section className="about-page section">
                <div className="container">

                    <div className="section-header section-header--center">
                        <span className="section-header__eyebrow">Our Story</span>
                        <h2 className="section-header__title">About Athar</h2>
                        <div className="divider divider--center" />
                        <p className="section-header__sub">
                            أثر — لأن كل قطعة بتسيب بصمة على اللي بيلبسها.
                        </p>
                    </div>

                    <div className="about-story">
                        <p>
                            بدأ Athar من فكرة بسيطة: هدوم أنيقة وبسيطة تعبّر عنك من غير ما
                            تحتاج تشرح نفسك. بنصمم قطع عملية للاستخدام اليومي، وبنهتم
                            بالتفاصيل الصغيرة اللي بتفرق في الإحساس والشكل.
                        </p>
                        <p>
                            كل كوليكشن بنطلعه بنختاره بعناية، وبنحاول يكون مناسب لجو مصر
                            وأسلوب الناس هنا.
                        </p>
                    </div>

                    <div className="about-values">
                        {values.map((v) => (
                            <div className="about-value" key={v.num}>
                                <span className="about-value__num">{v.num}</span>
                                <h3 className="about-value__title">{v.title}</h3>
                                <p className="about-value__text">{v.text}</p>
                            </div>
                        ))}
                    </div>

                    <div className="about-cta">
                        <Link to="/collections" className="btn btn-outline">
                            Shop The Collection
                        </Link>
                    </div>

                </div>
            </section>

            <Footer />
        </>
    );
}