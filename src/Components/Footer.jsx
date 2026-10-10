import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
    return (
        <>
            <style>{`
                footer {
                    background: #0d0d0d;
                    color: #ccc;
                }

                .footer-link {
                    color: #aaa;
                    text-decoration: none;
                    font-size: 14px;
                    transition: 0.3s;
                    display: block;
                    margin-bottom: 6px;
                }

                .footer-link:hover {
                    color: #c9a96e;
                    padding-left: 5px;
                }

                .footer-input {
                    display: flex;
                    border: 1px solid #333;
                    overflow: hidden;
                }

                .footer-input input {
                    flex: 1;
                    padding: 10px;
                    background: transparent;
                    border: none;
                    color: white;
                    outline: none;
                }

                .footer-input button {
                    background: #c9a96e;
                    border: none;
                    padding: 0 15px;
                    cursor: pointer;
                }

                .footer-bottom {
                    border-top: 1px solid #222;
                    text-align: center;
                    padding: 15px;
                    font-size: 13px;
                }
            `}</style>

            <footer>
                <Container style={{ padding: "60px 0" }}>
                    <Row className="gy-4">

                        <Col md={4}>
                            <h3 style={{ color: "#c9a96e", letterSpacing: "2px" }}>
                                ATHAR
                            </h3>
                            <p style={{ fontSize: "14px", lineHeight: "1.8" }}>
                                Minimal Egyptian streetwear brand.
                            </p>
                        </Col>

                        <Col xs={6} md={2}>
                            <h6 style={{ color: "#fff", marginBottom: "15px" }}>Shop</h6>
                            <a href="#" className="footer-link">New</a>
                            <a href="#" className="footer-link">Men</a>
                            <a href="#" className="footer-link">Women</a>
                        </Col>

                        <Col xs={6} md={2}>
                            <h6 style={{ color: "#fff", marginBottom: "15px" }}>Company</h6>
                            <a href="#" className="footer-link">About</a>
                            <a href="#" className="footer-link">Contact</a>
                        </Col>

                        <Col md={4}>
                            <h6 style={{ color: "#fff", marginBottom: "15px" }}>
                                Join the Club
                            </h6>

                            <div className="footer-input">
                                <input type="email" placeholder="Your Email" />
                                <button>→</button>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <div className="footer-bottom">
                    © 2026 ATHAR — All Rights Reserved
                </div>
            </footer>
        </>
    );
}