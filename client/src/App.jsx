import {Outlet} from 'react-router-dom'
import Header from './components/Home/header'
import Footer from './components/Home/footer'
import '../src/styles/App.css'
function App() {
  return (
    <main className='min-h-screen'>
      <Header/>
        <main className=' sm:w-[90%] mx-auto p-3 mt-10 '> 
          <Outlet/>
        </main>
      <Footer/>
    </main>
  )

}
export default App
