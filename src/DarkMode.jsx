import "./DarkMode.css";
import { ChangeEventHandler } from "react";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useState } from "react";

const setDark = () => {

  localStorage.setItem("theme", "dark");

  document.documentElement.setAttribute("data-theme", "dark");
};

const setLight = () => {
  localStorage.setItem("theme", "light");
  document.documentElement.setAttribute("data-theme", "light");
};

const storedTheme = localStorage.getItem("theme");

const prefersDark =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const defaultDark =
  storedTheme === "dark" || (storedTheme === null && prefersDark);

if (defaultDark) {
  setDark();
}

const toggleTheme = (e) => {
  if (e.target.checked) {
    setDark();
  } else {
    setLight();
  }
};


const DarkMode = () => {
  const [darkmode, setDarkmode] = useState(storedTheme === 'dark')
  const handleClick = (e) => {
    toggleTheme(e);
    setDarkmode(!darkmode)
  }

  return (
    <div className="toggle-theme-wrapper">
      <label className="toggle-theme" htmlFor="checkbox">
        <input
          type="checkbox"
          id="checkbox"
          onChange={handleClick}
          defaultChecked={defaultDark}
        />
        <div className="slider round">
          <div className="icon dark">
          {darkmode && <DarkModeIcon />}
          </div>
          <div className="icon light">
          {!darkmode && <LightModeIcon />}
          </div>
        </div>
      </label>
    </div>
  );
};

export default DarkMode;
