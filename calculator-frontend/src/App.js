import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [number1, setNumber1] = useState(null);
  const [number2, setNumber2] = useState(null);
  const [result, setResult] = useState([]);
  const [results, setResults] = useState([]);

  async function submit() {
    if (number1 && number2) {
      const res = await axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/results",
        headers: { "content-type": "application/json" },
        data: JSON.stringify({
          number1,
          number2,
        }),
      });
      console.log("Post: ", res.data);
      setResult(res.data.data)
      getData()
    }
  }

  async function getData() {
    const res = await axios.get(`http://127.0.0.1:8000/api/results`);
    if (res.data.length) {
      setResults(res.data);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className={"nav"}>
        <h1>CALCULATOR</h1>
      </div>

      <div className="container">
        <div class="card">
          <div class="card-body">
            <div className="col-sm-12 d-flex justify-content-center">
              <h6>Enter the numbers</h6>
            </div>
            <div className="col-sm-12 d-flex justify-content-center">
              <input
                type="number"
                placeholder="number 1"
                value={number1}
                onChange={(e) => setNumber1(e.target.value)}
              />
            </div>
            <div className="col-sm-12 d-flex justify-content-center">
              <input
                type="number"
                placeholder="number 2"
                value={number2}
                onChange={(e) => setNumber2(e.target.value)}
              />
            </div>
            <div className="col-sm-12 d-flex justify-content-center">
              <button type="button" class="" onClick={submit}>
                Sum
              </button>
            </div>

            <div className="col-sm-12 d-flex history">
              {results.map((item, i) => {
                return <p key={i}>{item.result},</p>;
              })}
            </div>

            <hr />

            <div className="col-sm-12 d-flex justify-content-center">
              <h6>Results</h6>
            </div>

            <div className="col-sm-12 d-flex justify-content-center">
              <input
                className={"result"}
                type="number"
                placeholder=""
                value={result}
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
