import {Outlet} from 'react-router-dom'
import Header from './components/Home/header'
import Footer from './components/Home/footer'
import '../src/styles/App.css'
function App() {
  return (
    <>
      <Header/>
        <main className='min-h-screen sm:w-[90%] mx-auto p-3 mt-10'> 
          <Outlet/>
        </main>
      <Footer/>
    </>
  )

}
export default App
