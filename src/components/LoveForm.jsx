import React, { useRef, useState } from "react";
import "./LoveForm.css";

const LoveForm = () => {
  // use state
  const [fName, setFname] = useState("");
  const [sName, setSname] = useState("");
  const [textResult, setTextResult] = useState("");
  const [calcResult, setCalcResult] = useState("");
  const [resultGif, setResultGif] = useState("");
  const [isValid, setIsValid] = useState(false);

  //   use ref

  const formRef = useRef();
  const fNameRef = useRef();
  const sNameRef = useRef();

  //   onSubmit function

  const handleSubmit = (e) => {
    e.preventDefault();

    // validation and state update

    const fNameInput = fNameRef.current.value;
    const sNameInput = sNameRef.current.value;

    const fName =
      fNameInput.charAt(0).toUpperCase() + fNameInput.slice(1).toLowerCase();
    const sName =
      sNameInput.charAt(0).toUpperCase() + sNameInput.slice(1).toLowerCase();

    if (fName.length < 3 || sName.length < 3) {
      alert("Input at least 3 letters on either of the form areas");
      setIsValid(false);
      return;
    }

    setFname(fName);
    setSname(sName);

    // calculating result

    fetch(
      "https://love-calculator.p.rapidapi.com/getPercentage?sname=" +
        `${sName}` +
        "&fname=" +
        `${fName}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "love-calculator.p.rapidapi.com",
          "x-rapidapi-key":
            "5afaa1f7e4mshe388e5ce13bb139p17d9fdjsnc3389b2cb0ea",
        },
      }
    )
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error("Something went wrong, check later");
        }

        return response.json();
      })
      .then((data) => {
        setCalcResult(data.percentage);

        // result gif and text

        if (data.percentage <= 30) {
          setResultGif(
            "https://c.tenor.com/nSn7GdwhlhkAAAAC/dr-house-gregory-house.gif"
          );
          setTextResult("not compatible at all, sorry :(");
        } else if (data.percentage <= 50) {
          setResultGif(
            "https://c.tenor.com/Muec-pdBO_4AAAAS/caroline-cameron-sportsnet.gif"
          );
          setTextResult("both decent, but not strong enough");
        } else if (data.percentage <= 70) {
          setResultGif(
            "https://c.tenor.com/A7AnKfnSLFQAAAAM/its-close-close-enough-anthony-vincent.gif"
          );

          setTextResult("close to being perfect together");
        } else if (data.percentage <= 90) {
          setResultGif(
            "https://c.tenor.com/R8Vz1E_mxRkAAAAS/perfect-amazing.gif"
          );

          setTextResult("perfect together");
        } else if (data.percentage > 90) {
          setResultGif(
            "https://c.tenor.com/TISglNFygoEAAAAM/husband-and-wife-married.gif"
          );
          setTextResult("the best thing ever, they should get married");
        }
      })
      .catch((err) => {
        console.error(err);
      });

    setIsValid(true);
    formRef.current.reset();
  };

  //   reset button

  const resetBtn = (e) => {
    e.preventDefault();
    setIsValid(false);
  };

  return (
    <>
      {/* form */}
      <form onSubmit={handleSubmit} ref={formRef}>
        {!isValid && (
          <div>
            <label htmlFor="yourName">Your Name:</label>
            <input
              type="text"
              id="yourName"
              className="icon"
              ref={fNameRef}
              placeholder="Enter your name"
            />
            <label htmlFor="yourCrushName">Your Crush Name:</label>
            <input
              type="text"
              id="yourCrushName"
              className="icon"
              ref={sNameRef}
              placeholder="Enter your crush name"
            />

            <button type="submit">Calculate %</button>
          </div>
        )}
      </form>

      {/* result */}
      {isValid && (
        <div className="formResult">
          <p>
            Your love percentage is <strong> {calcResult}%</strong>.
          </p>
          <hr />
          <h1>
            <strong>
              {fName} and {sName} are:
            </strong>
          </h1>
          <p>{textResult}</p>
          <img src={resultGif} alt="reaction" />
          <div>
            <button type="button" onClick={resetBtn}>
              Reset
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LoveForm;
