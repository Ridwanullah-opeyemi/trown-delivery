import { useState } from 'react'
import ExploreMenu from '../../component/exploreMenu/exploreMenu'
import Header from '../../component/header/header'
import NavBar from '../../component/navBar/navBar'
import './home.css'
import FoodDisplay from '../../component/foodDsp/foodDisplay'
import AppDownload from '../../component/appdownload/appdownload'


const Home = () => {

    const [category,setCategory] = useState("All")


  return (
    <div className="Home">
        <Header/>
        <ExploreMenu category={category} setCategory={setCategory} />
        <FoodDisplay category={category} />
        <AppDownload/>
    </div>
  )
}


export default Home