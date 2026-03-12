import { useEffect, useState } from "react";
import "./App.css";

export default function App() {

  const [info, setInfo] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    device: "Unknown",
    ip: "Loading...",
    country: "Loading...",
    date: "",
    time: ""
  });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  useEffect(() => {

    const updateScreen = () => {
      setInfo(prev => ({
        ...prev,
        width: window.innerWidth,
        height: window.innerHeight
      }));
    };

    window.addEventListener("resize", updateScreen);

    // device detect
    const ua = navigator.userAgent;
    let device = "Desktop";

    if (/mobile/i.test(ua)) device = "Mobile";
    else if (/tablet/i.test(ua)) device = "Tablet";

    // IP API
    fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(data => {
        setInfo(prev => ({
          ...prev,
          ip: data.ip,
          country: data.country_name,
          device
        }));
      });

    // clock
    const clock = setInterval(() => {
      const now = new Date();
      setInfo(prev => ({
        ...prev,
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString()
      }));
    }, 1000);

    return () => {
      window.removeEventListener("resize", updateScreen);
      clearInterval(clock);
    };

  }, []);

  return (
    <div className="container">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">PROTEGOSS</div>

        <div className="menu">
          <a href="#">Home</a>
          <a href="/official-website/index.html">Back</a>
        </div>
      </nav>

      {/* SEARCH BAR */}
      <div className="searchBox">
        <input placeholder="Search..." />
      </div>

      {/* TITLE */}
      <h1 className="title">PROTEGOSS</h1>

      {/* GREETING */}
      <p className="greeting">{getGreeting()}, Welcome.</p>

      {/* INFO BOX */}
      <div className="infoBox">

        <p><b>Screen Type:</b> {info.device}</p>
        <p><b>Resolution:</b> {info.width} x {info.height}</p>
        <p><b>IP Address:</b> {info.ip}</p>
        <p><b>Country:</b> {info.country}</p>
        <p><b>Date:</b> {info.date}</p>
        <p><b>Time:</b> {info.time}</p>

      </div>

    </div>
  );
}