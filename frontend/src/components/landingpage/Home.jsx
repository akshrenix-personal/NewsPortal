import React from 'react'
import Slider from './Slider';
import NewsCategory from './NewsCategory';
import NewsDetails from './NewsDetails';
import SignIn from './Login';
import PostNews from '../userComponent/PostNews';
import LatestNews from './LatestNews';
import LatestVideos from './LatestVideos';
import City from './City';
import ImageGallery from './ImageGallery';
import ContactUs from './ContactUs';
import About from './About';
import Navbar from './Navbar';
import TopNews from './TopNews';
import Footer from './Footer';
function Home() {
  return (
    <>
      <Navbar />
      <Slider />
      <NewsCategory /> 
      <LatestNews />
      <LatestVideos />
      < City />
      <ImageGallery /> 
      < About /> 
    </>)
}

export default Home
