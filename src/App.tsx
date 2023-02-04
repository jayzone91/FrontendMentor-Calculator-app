import { useEffect, useState } from "react";

const local: string = "theme";

function App() {
  const [theme, setTheme] = useState<string>("");

  const handleClick = (s: string) => {
    window.localStorage.setItem(local, s);
    setTheme(s);
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
          <div className="display">0.12345</div>
          <div className="keypad">
            <button className="key key-number">7</button>
            <button className="key key-number">8</button>
            <button className="key key-number">9</button>
            <button className="key key-special">DEL</button>
            <button className="key key-number">4</button>
            <button className="key key-number">5</button>
            <button className="key key-number">6</button>
            <button className="key key-number">+</button>
            <button className="key key-number">1</button>
            <button className="key key-number">2</button>
            <button className="key key-number">3</button>
            <button className="key key-number">-</button>
            <button className="key key-number">.</button>
            <button className="key key-number">0</button>
            <button className="key key-number">/</button>
            <button className="key key-number">&times;</button>
            <button
              className="key key-reset key-special
            "
            >
              RESET
            </button>
            <button className="key key-equals key-2">=</button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
