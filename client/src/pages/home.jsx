import Contact from "../components/Home/contact"
import UpcomingBooks from "../components/Home/features/upcomingBooks"
import MainPage from "../components/Home/mainPage"
import Maps from "../components/Home/maps"
import News from "../components/Home/news"
import RecommendedBooks from "../components/Home/recomended"
import Books from "../components/Home/topSellers"


const Home = () => {

  return (
    <>

        <MainPage/>
        <Books/>
        <RecommendedBooks/>
        <News/>
        {/* <UpcomingBooks/> */}
        <Contact/>
        <Maps/>

    </>

)}

export default Home