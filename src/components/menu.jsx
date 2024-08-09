import React, { useState, useEffect } from "react";
import Todoapp from "./todoapp"; // Убедитесь, что путь к компоненту правильный
import Musikapp from "./Musikapp";
import WeatherApp from "./Weatherapp";
import { Route, Link, Switch } from "wouter";

const Menu = () => {
  const backBtn = document.querySelector(".main_page_btn");
  const [, setLocation] = useState(window.location.pathname);

  if (location !== "/") {
    backBtn.style.display = "block";
    backBtn.setAttribute("onclick", `window.location.href = '/'`);
  } else if (location === "") {
    {
      backBtn.style.display = "none";
    }
  }

  return (
    <div>
      <div>
        <Switch>
          <Route path="/">
            <h1>Choose an App</h1>
            <div className="app_icons">
              <div className="app_icon">
                <Link to="/todo">
                  <img
                    className="app_icon_img"
                    src="/img/todo.png"
                    alt="To-Do App"
                  />
                </Link>
              </div>
              <div className="app_icon">
                <Link to="/musik">
                  <img
                    className="app_icon_img"
                    src="/img/music.png"
                    alt="Music App"
                  />
                </Link>
              </div>
              <div className="app_icon">
                <Link to="/weather">
                  <img
                    className="app_icon_img"
                    src="/img/weather02-512.webp"
                    alt="Weather App"
                  />
                </Link>
              </div>
            </div>
          </Route>
          <Route path="/todo" component={Todoapp} />
          <Route path="/musik" component={Musikapp} />
          <Route path="/weather" component={WeatherApp} />
        </Switch>
      </div>
    </div>
  );
};

export default Menu;
