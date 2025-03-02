import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Popup from "./Popup";
import "./Part.css";

const Part = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const [data, setData] = useState(null);
  const [cityN, setCityN] = useState([]);
  const [score, setScore] = useState(0);
  const [anslvl, setAnslvl] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAns, setCorrectAns] = useState(null);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [wrong, setWrong] = useState(1);
  const [quesno,setquesno]=useState(0);
  const totalScore = useSelector((state) => state.totscore);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3005/query`);
        const result = await response.json();
        const cityNames = result.map((m) => m.city);

        setData(result[id]);
        setCorrectAns(result[id].city);

        // Ensure the correct answer is included and shuffle the options
        let options = cityNames
          .filter((city) => city !== result[id].city) // Exclude correct answer first
          .sort(() => 0.5 - Math.random()) // Shuffle the array
          .slice(0, 4); // Pick 4 random incorrect answers

        options.push(result[id].city); // Add correct answer
        options.sort(() => 0.5 - Math.random()); // Shuffle again

        setCityN(options);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleChoice = (answer) => {
    setSelectedAnswer(answer);
    if (answer === correctAns) {
      setScore((prev) => prev + 10);
      setAnslvl(true);
    } else {
      if (!anslvl) setScore((prev) => prev - 10);
      setAnslvl(false);
      setWrong((prev) => prev + 1);
    }
  };

  const handleReplay = () => {
    setSelectedAnswer(null);
    setScore(0);
    setWrong(0);
  };

  const handleNext = () => {
    const newId = Math.floor(Math.random() * 11);
    dispatch({ type: "updated", val: score });
    setScore(0);
    setSelectedAnswer(null);
    
    setquesno((prev)=>{return prev+1})
    console.log(quesno);
    nav(`/part/${newId}`);
  };

  const Newplay=()=>{
    setScore(0);
    setquesno(0);
    
    setSelectedAnswer(null);

  }

  const shareOnWhatsApp = () => {
    const gameLink = `https://yourgame.com/part/${id}`;
    const message = `Hey! I scored ${totalScore} points in this game. Can you beat me? Click here to play: ${gameLink}`;
    const whatsappURL = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank");
  };

  return (
    <div>
      <div>
        
        <div className="progress " 
       style={{ "width": `${(quesno / 5) * 100}%` }}></div>
      </div>
    <div className="container2">
      <h1 className="start">Guess the city name</h1>

      {/* Challenge a Friend Section */}
      { quesno!==5?<><div>
        <h2 className="share">Share with a Friend</h2>
        <button onClick={() => setButtonPopup(true)}>Click to Share/Invite</button>

        <Popup trigger={buttonPopup} settrigger={setButtonPopup} Score={totalScore}>
          <h3>Challenge Your Friends!</h3>
          <button onClick={shareOnWhatsApp}>Share via WhatsApp</button>
        </Popup>
      </div>

      <ul className="list1">
        {data ? data.clues.slice(0, 3).map((clue, index) => <li key={index}>{clue}</li>) : <></>}
      </ul>

      {/* Answer Options (Limited to 5 including correct answer) */}
      <div>
        {cityN.map((option) => (
          <button
            key={option}
            className={`option-button ${selectedAnswer === option ? "selected" : ""}`}
            onClick={() => handleChoice(option)}
            style={{ backgroundColor: selectedAnswer === option ? "blue" : "green" }}
          >
            {option}
          </button>
        ))}
      </div>
      </>: <button onClick={Newplay}className="next-button" disabled={quesno !== 5}>New  game</button>}


      {selectedAnswer != null && (
        <div>
          {anslvl ? <h2>🎉 Fun Facts about {data.city}</h2> : <h2>😢 Oops! Try Again</h2>}
          <ul className="list1">
            {data.fun_fact.slice(0, wrong).map((val, index) => (
              <li key={index}>{val}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Play Again & Next Round */}
      <div>
        <button onClick={handleReplay} className="replay-button">
          Play Again
        </button>
        <button onClick={handleNext} className="next-button" disabled={selectedAnswer !== correctAns||quesno==5}>
          Next
        </button>
      </div>

      <h1 >Total Score: {totalScore}</h1>
    </div>
    </div>
  );
};

export default Part;
