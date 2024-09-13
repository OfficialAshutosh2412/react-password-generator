import { useCallback, useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [allowNumber, setAllowNumber] = useState(false);
  const [allowChar, setAllowChar] = useState(false);
  const passwordReference = useRef(null);

  const generator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (allowNumber) str += "0123456789";
    if (allowChar) str += "!@#$%^&*()_+}{|?><.,-";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, allowNumber, allowChar]);

  const copyPassword = useCallback(() => {
    passwordReference.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);
  useEffect(() => {
    generator();
  }, [length, allowNumber, allowChar, generator]);

  return (
    <>
      <div className="bg-white text-black flex justify-between flex-col p-5 rounded-xl">
        <h1 className="capitalize text-4xl font-semibold text-gray-700 p-3">
          password generator
        </h1>
        <div className=" p-3 flex gap-1">
          <input
            type="text"
            className="w-full h-10 rounded p-1 border-2 border-blue-700"
            value={password}
            ref={passwordReference}
          />
          <button
            className="bg-blue-700 text-white pl-3 pr-3 rounded font-bold capitalize"
            onClick={copyPassword}
          >
            copy
          </button>
        </div>
        <div className="p-3">
          <div>
            <label htmlFor="length" className="font-bold text-sm text-gray-700">
              Password Length : {length}
            </label>
            <input
              type="range"
              min={4}
              max={20}
              id="length"
              className="w-full"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
          </div>
          <div className="flex  justify-between mt-3">
            <div className="flex justify-center items-center gap-1">
              <input
                type="checkbox"
                id="numbers"
                defaultChecked={allowNumber}
                onChange={() => {
                  setAllowNumber((prev) => !prev);
                }}
              />
              <label
                htmlFor="numbers"
                className="font-bold text-sm text-gray-700"
              >
                Include Numbers
              </label>
            </div>
            <div className="flex justify-center items-center gap-1">
              <input
                type="checkbox"
                defaultChecked={allowChar}
                id="chars"
                onChange={() => {
                  setAllowChar((prev) => !prev);
                }}
              />
              <label
                htmlFor="chars"
                className="font-bold text-sm text-gray-700"
              >
                Special Charaters
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
