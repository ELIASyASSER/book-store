import Contact from "../components/Home/contact"
import MainPage from "../components/Home/mainPage"
import News from "../components/Home/news"
import RecommendedBooks from "../components/Home/recomended"
import TopSellers from "../components/Home/topSellers"


const Home = () => {

  return (
    <>

        <MainPage/>
        <TopSellers/>
        <RecommendedBooks/>
        <News/>
        <Contact/>

    </>

)}

export default Home