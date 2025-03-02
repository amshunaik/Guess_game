import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Popup from "./Popup";
import correctSound from "./sounds/correct.mp3";
import wrongSound from "./sounds/wrong.mp3";
import "./Part.css";

const Part = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const totalScore = useSelector((state) => state.totscore);

  const [data, setData] = useState(null);
  const [cityN, setCityN] = useState([]);
  const [score, setScore] = useState(0);
  const [anslvl, setAnslvl] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAns, setCorrectAns] = useState(null);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [wrong, setWrong] = useState(1);
  const [quesno, setquesno] = useState(0);
  const [firstAttempt, setFirstAttempt] = useState(true);
  const [showThumbsUp, setShowThumbsUp] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://guess-game-backend-ug7p.onrender.com/query`);
        const result = await response.json();
        const cityNames = result.map((m) => m.city);

        setData(result[id]);
        setCorrectAns(result[id].city);

        // Shuffle city options, ensuring the correct one is included
        let options = cityNames
          .filter((city) => city !== result[id].city)
          .sort(() => 0.5 - Math.random())
          .slice(0, 4);

        options.push(result[id].city);
        options.sort(() => 0.5 - Math.random());

        setCityN(options);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const playSound = (isCorrect) => {
    const audio = new Audio(isCorrect ? correctSound : wrongSound);
    audio.play();
  };

  const handleChoice = (answer) => {
    setSelectedAnswer(answer);

    if (answer === correctAns) {
      playSound(true);
      setScore((prev) => prev + 10);
      setAnslvl(true);

      if (firstAttempt) {
        setShowThumbsUp(true);
      }
    } else {
      playSound(false);
      if (!anslvl) setScore((prev) => prev - 10);
      setAnslvl(false);
      setWrong((prev) => prev + 1);
      setFirstAttempt(false);
    }
  };

  const handleNext = () => {
    const newId = Math.floor(Math.random() * 11);
    dispatch({ type: "updated", val: score });
    setScore(0);
    setSelectedAnswer(null);
    setquesno((prev) => prev + 1);
    setFirstAttempt(true);
    setShowThumbsUp(false);
    nav(`/part/${newId}`);
  };

  const handleReplay = () => {
    setSelectedAnswer(null);
    setScore(0);
    setWrong(0);
    setFirstAttempt(true);
    setShowThumbsUp(false);
  };

  const shareOnWhatsApp = () => {
    const gameLink = `https://guess-game-backend-ug7p.onrender.com/part/${id}`;
    const message = `Hey! I scored ${totalScore} points in this game. Can you beat me? Click here to play: ${gameLink}`;
    const whatsappURL = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
  };
  const Newplay=()=>{
    setScore(0);
    setquesno(0);
    setSelectedAnswer(null);

  }

  return (
    <div>
      <div>
        <div
          className="progress"
          style={{ width: `${(quesno / 5) * 100}%`, transition: "width 0.5s ease-in-out" }}
        ></div>
      </div>
      <div className="container2">
        <h1 className="start">Guess the city name</h1>

        {quesno !== 5 ? (
          <>
            <div>
              <h2 >Share with a Friend</h2>
              <button className="share" onClick={() => setButtonPopup(true)}>Click to Share/Invite</button>

              <Popup trigger={buttonPopup} settrigger={setButtonPopup} Score={totalScore}>
                <h3>Challenge Your Friends!</h3>
                <button onClick={shareOnWhatsApp}>Share via WhatsApp</button>
              </Popup>
            </div>

            <ul className="list1">
              {data ? data.clues.slice(0, 3).map((clue, index) => <li key={index}>{clue}</li>) : <></>}
            </ul>

            <div>
              {cityN.map((option) => (
                <button
                  key={option}
                  className={`option-button ${selectedAnswer === option ? "selected1" : ""}`}
                  style={{
                    backgroundColor: selectedAnswer
                      ? option === correctAns &&selectedAnswer===correctAns 
                        ? "blue"
                        : selectedAnswer === option
                        ? "pink"
                        : "green"
                      : "green",
                    transition: "0.3s ease-in-out",
                  }}
                  onClick={() => handleChoice(option)}
                 
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        ) : (
          <button onClick={Newplay} className="next-button">
            New Game
          </button>
        )}

        {selectedAnswer !== null && (
          <div>
            {anslvl ? <h2>🎉 Fun Facts about {data.city}</h2> : <h2>😢 Oops! Try Again</h2>}
            <ul className="list1">
              {data.fun_fact.slice(0, wrong).map((val, index) => (
                <li key={index}>{val}</li>
              ))}
            </ul>
          </div>
        )}

        {showThumbsUp && <h2>🎉 Good first attempt! 👍</h2>}

        <div>
          <button onClick={handleReplay} className="replay-button">
            Play Again
          </button>
          <button onClick={handleNext} className="next-button" disabled={selectedAnswer !== correctAns || quesno === 5}>
            Next
          </button>
        </div>

        <h1>Total Score: {totalScore}</h1>
      </div>
    </div>
  );
};

export default Part;
