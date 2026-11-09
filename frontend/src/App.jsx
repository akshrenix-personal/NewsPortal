
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css'
import TopNavbar from './components/landingpage/TopNavbar';
import LogoSec from './components/landingpage/LogoSec';
import Navbar from './components/landingpage/Navbar';
import Home from './components/landingpage/Home';
import About from './components/landingpage/About';
import NewsCategory from './components/landingpage/NewsCategory';
import NewsDetails from './components/landingpage/NewsDetails';
import ImageGallery from './components/landingpage/ImageGallery';
import ContactUs from './components/landingpage/ContactUs';
import UserSignUp from './components/landingpage/UserSignUp';
import Login from './components/landingpage/Login';
import EditProfile from './components/adminComponent/EditProfile';
import AllNews from './components/adminComponent/AllNews';
import AdminContactUsList from './components/adminComponent/AdminContactUsList';
import UserEditProfile from './components/userComponent/UserEditProfile';
import PostNews from './components/userComponent/PostNews';
import YourNews from './components/userComponent/YourNews';
import UserAllNewsList from './components/userComponent/UserAllNewsList';
import Footer from './components/landingpage/Footer';
import NotFound from './NotFound';
import { useEffect, useState } from 'react';
function App() {
  const location = useLocation()
  const [user, setData] = useState(null)
  useEffect(() => {
    const dataUser = JSON.parse(localStorage.getItem('userInfo'));
    setData(dataUser);
  }, [location])


  return (<>

    <TopNavbar />
    <LogoSec />
    <Routes>
      {/*landing navbar*/}
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/gallery' element={<ImageGallery />} />
      <Route path='/contact' element={<ContactUs />} />
      <Route path='/UserSignUp' element={<UserSignUp />} />
      <Route path='/login' element={<Login />} />
      <Route path='/news-details' element={<NewsDetails />} />

      {/*admin route*/}
      {user?.userType == 'admin' &&
        <>
          <Route path='/admin-profile' element={<EditProfile />} />
          <Route path='/admin-newslist' element={<AllNews />} />
          <Route path='/admin-ContactUS' element={<AdminContactUsList />} />
        </>}

      {/*user route*/}
      {user?.userType == 'user' && <>
        <Route path='/user-profile' element={<UserEditProfile />} />
        <Route path='/user-addnews' element={<PostNews />} />
        <Route path='/user-list' element={<YourNews />} />
        <Route path='/user-alllist' element={<UserAllNewsList />} />
      </>}
      <Route path='*' element={<NotFound />} />
    </Routes>
    <Footer />


  </>)
}

export default App


