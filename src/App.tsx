import { useEffect, useState } from "react";

const local: string = "theme";

function App() {
  const [theme, setTheme] = useState<string>("");
  const [firstNumber, setFirstNumber] = useState<string>("");
  const [operator, setOperator] = useState<string>("");
  const [display, setDisplay] = useState<string>("0");

  const handleClick = (s: string) => {
    window.localStorage.setItem(local, s);
    setTheme(s);
  };

  const handleKeyDown = (s: string) => {
    switch (s) {
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "0":
        setDisplay((prev) => {
          if (prev === "0") {
            return s;
          } else {
            return prev + s;
          }
        });
        break;
      case "Enter":
        if (firstNumber === "") break;
        if (operator === "") break;
        switch (operator) {
          case "+":
            setDisplay(() => {
              let a: number = parseFloat(firstNumber);
              let b: number = parseFloat(display);
              let res = a + b;
              setFirstNumber(res.toString());
              setOperator("");
              return res.toString();
            });
            break;
          case "-":
            setDisplay(() => {
              let a: number = parseFloat(firstNumber);
              let b: number = parseFloat(display);
              let res = a - b;
              setFirstNumber(res.toString());
              setOperator("");
              return res.toString();
            });
            break;
          case "/":
            setDisplay(() => {
              let a: number = parseFloat(firstNumber);
              let b: number = parseFloat(display);
              let res = a / b;
              setFirstNumber(res.toString());
              setOperator("");
              return res.toString();
            });
            break;
          case "*":
            setDisplay(() => {
              let a: number = parseFloat(firstNumber);
              let b: number = parseFloat(display);
              let res = a * b;
              setFirstNumber(res.toString());
              setOperator("");
              return res.toString();
            });
            break;
        }
        break;
      case "Backspace":
        setDisplay((prev) => {
          if (prev === "0") return "0";
          else if (prev.length === 1) return "0";
          else return prev.slice(0, -1);
        });
        break;
      case "Delete":
        setDisplay("0");
        setFirstNumber("");
        setOperator("");
        break;
      case "-":
      case "+":
      case "/":
      case "*":
        setFirstNumber(display);
        setOperator(s);
        setDisplay("0");
        break;
      case ".":
      case ",":
        setDisplay((prev) => {
          if (prev.indexOf(".") === -1) return prev + ".";
          else return prev;
        });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    let tmp = window.localStorage.getItem(local);
    if (tmp) {
      setTheme(tmp);
    } else {
      if (matchMedia("(forced-colors: active").matches) {
        setTheme("h-contrast");
      } else if (matchMedia("(prefers-color-scheme: dark)").matches) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    }

    document.addEventListener("keydown", (e) => handleKeyDown(e.key));

    return document.removeEventListener("keydown", () => {});
  }, []);

  return (
    <div className={`App ${theme}`}>
      <div className="calculator">
        <header>
          <h1>calc</h1>
          <div className="theme-switch">
            <span className="text-uppercase">Theme</span>
            <div className="toggle">
              <div className="label">
                <label htmlFor="1" className="name">
                  1
                </label>
                <label htmlFor="2" className="name">
                  2
                </label>
                <label htmlFor="3" className="name">
                  3
                </label>
              </div>
              <div className="input">
                <input
                  type="radio"
                  name="theme"
                  className="slider"
                  id="1"
                  checked={theme === "dark"}
                  onClick={() => handleClick("dark")}
                />
                <input
                  type="radio"
                  name="theme"
                  className="slider"
                  id="2"
                  checked={theme === "light"}
                  onClick={() => handleClick("light")}
                />
                <input
                  type="radio"
                  name="theme"
                  className="slider"
                  id="3"
                  checked={theme === "h-contrast"}
                  onClick={() => handleClick("h-contrast")}
                />
              </div>
            </div>
          </div>
        </header>
        <main>
          <div className="display">{display}</div>
          <div className="keypad">
            <button
              className="key key-number"
              onClick={() => handleKeyDown("7")}
            >
              7
            </button>
            <button
              className="key key-number"
              onClick={() => handleKeyDown("8")}
            >
              8
            </button>
            <button
              className="key key-number"
              onClick={() => handleKeyDown("9")}
            >
              9
            </button>
            <button
              className="key key-special"
              onClick={() => handleKeyDown("Backspace")}
            >
              DEL
            </button>
            <button
              className="key key-number"
              onClick={() => handleKeyDown("4")}
            >
              4
            </button>
            <button
              className="key key-number"
              onClick={() => handleKeyDown("5")}
            >
              5
            </button>
            <button
              className="key key-number"
              onClick={() => handleKeyDown("6")}
            >
              6
            </button>
            <button
              className="key key-number"
              onClick={() => handleKeyDown("+")}
            >
              +
            </button>
            <button
              className="key key-number"
              onClick={() => handleKeyDown("1")}
            >
              1
            </button>
            <button
              className="key key-number"
              onClick={() => handleKeyDown("2")}
            >
              2
            </button>
            <button
              className="key key-number"
              onClick={() => handleKeyDown("3")}
            >
              3
            </button>
            <button
              className="key key-number"
              onClick={() => handleKeyDown("-")}
            >
              -
            </button>
            <button
              className="key key-number"
              onClick={() => handleKeyDown(",")}
            >
              .
            </button>
            <button
              className="key key-number"
              onClick={() => handleKeyDown("0")}
            >
              0
            </button>
            <button
              className="key key-number"
              onClick={() => handleKeyDown("/")}
            >
              /
            </button>
            <button
              className="key key-number"
              onClick={() => handleKeyDown("*")}
            >
              &times;
            </button>
            <button
              className="key key-reset key-special
            "
              onClick={() => handleKeyDown("Delete")}
            >
              RESET
            </button>
            <button
              className="key key-equals key-2"
              onClick={() => handleKeyDown("Enter")}
            >
              =
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
