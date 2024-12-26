import React, { useState, useEffect } from "react"; // Add useEffect here
import { useSpring, animated } from '@react-spring/web';
import ParticlesBackground from './ParticlesBackground';
import "./App.css";

const App = () => {
  const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 200 });
  const [clicked, setClicked] = useState(false);

  const [showButton, setShowButton] = useState(false);  // State to control button visibility

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);  // Show the button after 3 seconds
    }, 1500); // 3000ms = 3 seconds

    return () => clearTimeout(timer);  // Cleanup timeout if component unmounts
  }, []);  // Empty dependency array means this effect runs once on mount


  const buttonSpring = useSpring({
    width: clicked ? "200px" : "150px",  // Button size reduces to box size
    height: clicked ? "50px" : "40px",   // Height shrinks
    opacity: showButton  ? 1 : 0,            // Fade out button
    transform: clicked ? "scale(0)" : "scale(1)", // Shrink the button
    borderRadius: clicked ? "5px" : "5px", // Round corners for box
    backgroundColor: clicked ? "#4A90E2" : "#F9F9FF", // Color change
    config: { tension: 120, friction: 20 },
  });

  const boxSpring = useSpring({
    opacity: clicked ? 1 : 0, // Fade in box when clicked
    transform: clicked ? "scale(1)" : "scale(0)", // Scale the box
  });

 /* test version control*/
  return (
  <>
      <ParticlesBackground />
      <animated.div className="app" style={fadeIn}>
        <animated.header className="header" style={fadeIn}>
          <h1>Hi, I'm Quinn</h1>

          <p>
            I'm a Junior studying Computer Science at Worcester Polytechnic Institute. 
            I am very into Emergent Behavior, Public Policy, and the Boston Celtics.
          </p>
          
          <p>
            <a href="mailto:quinnbudnick@gmail.com">quinnbudnick@gmail.com</a>
            <span> | </span>
            <a 
              href="https://www.linkedin.com/in/quinn-budnick-3043b513/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <span> | </span>
            <span>(401) 787-2195 | Worcester, MA</span>
          </p>
        </animated.header>
         {showButton && (
          <animated.button
          className="transform-btn"
          style={buttonSpring}
          onClick={() => setClicked(!clicked)}
        >
          {clicked ? null : "See More"}
        </animated.button>
        )}

        <animated.div style={boxSpring} className="box">
          {clicked && <a href="https://linktr.ee/qhbud">My Work</a>}

        </animated.div>

      </animated.div>




  </>
  );
};

export default App;