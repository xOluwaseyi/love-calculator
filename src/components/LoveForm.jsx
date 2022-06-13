import React, { useRef, useState } from "react";
import "./LoveForm.css";

const LoveForm = () => {
  // use state
  const [firstName, setFirstname] = useState("");
  const [secondName, setSecondName] = useState("");
  const [textResult, setTextResult] = useState("");
  const [calcResult, setCalcResult] = useState("");
  const [resultGif, setResultGif] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [auth, setAuth] = useState(false);

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
      setAuth(true);
      setIsValid(false);
      return;
    }

    setFirstname(fName);
    setSecondName(sName);

    // calculating result

    const params = {
      secondName: sName,
      firstName: fName,
    };
    let url = new URL("https://lovemeterbackend.herokuapp.com/lovemeter");

    for (let k in params) {
      url.searchParams.append(k, params[k]);
    }

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
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
    setAuth(false);
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
            {auth && <p>Please input at least 3 letters in a box</p>}

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
              {firstName} and {secondName} are:
            </strong>
          </h1>
          <p>{textResult}</p>
          <img src={resultGif} alt="reaction" />
          <div>
            <button type="submit" onClick={resetBtn}>
              Make another calculation
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LoveForm;
