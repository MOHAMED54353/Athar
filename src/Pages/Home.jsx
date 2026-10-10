import Navbar from "../Components/Navbar"
import Hero from "../Components/Hero"
import NewArrivals from "../Components/NewArrivals"
import AboutBrand from "../Components/AboutBrand"
import Line from "../Components/Line"
import Clothes from "../Components/Clothes"
import SummerCollection from "../Components/SummerCollection"
// import Reviews from "../Components/Reviews"
import Footer from "../Components/Footer"
const Home = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <NewArrivals />
            <AboutBrand />
            <Line />
            <Clothes />
            <SummerCollection />
            {/* <Reviews /> */}
            <Footer />

        </>
    )
}

export default Home
