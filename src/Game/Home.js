import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Home.css'
const Home = () => {
    
    var lgth=3;
    const nav=useNavigate();
    const handlestart=()=>{
        
        var a=Math.floor(Math.random()*lgth);
        nav(`/part/${a}`)
       

        
    }
  return (
    <div className='container'>
        <h1 className='title1'> Welcome to Globetrotter Challenge – The Ultimate Travel Guessing Game</h1>
        <h2 className='title2'>To begin the game click the below button</h2>

        <button className='start-game1'onClick={handlestart}>Start game</button>
      
    </div>
  )
}

export default Home
