import { useEffect, useState } from "react"

export default function App(){

  const [screen,setScreen] = useState("")
  const [resolution,setResolution] = useState("")
  const [device,setDevice] = useState("")
  const [ip,setIp] = useState("")
  const [country,setCountry] = useState("")
  const [time,setTime] = useState("")
  const [date,setDate] = useState("")

  useEffect(()=>{

    function detectScreen(){

      const width = window.innerWidth
      const height = window.innerHeight

      setResolution(width + " x " + height)

      if(width < 480) setScreen("Small Mobile")
      else if(width < 768) setScreen("Mobile")
      else if(width < 1024) setScreen("Tablet")
      else if(width < 1440) setScreen("Desktop")
      else setScreen("Large Desktop")

      const ua = navigator.userAgent

      if(/mobile/i.test(ua)) setDevice("Mobile Browser")
      else if(/tablet/i.test(ua)) setDevice("Tablet")
      else setDevice("Desktop Browser")

    }

    detectScreen()

    window.addEventListener("resize",detectScreen)

    fetch("https://ipapi.co/json/")
      .then(res=>res.json())
      .then(data=>{
        setIp(data.ip)
        setCountry(data.country_name)
      })

    setInterval(()=>{

      const now = new Date()

      setTime(now.toLocaleTimeString())

      setDate(
        now.toLocaleDateString(undefined,{
          weekday:"long",
          year:"numeric",
          month:"long",
          day:"numeric"
        })
      )

    },1000)

  },[])

  return(

    <div>

      {/* NAVBAR */}

      <nav style={navStyle}>

        <div style={{fontWeight:"600"}}>

          Modern Site

        </div>

        <div>

          <a href="/official-website/modern/" style={linkStyle}>
            Home
          </a>

          <a href="/official-website/" style={linkStyle}>
            Back
          </a>

        </div>

      </nav>


      {/* CENTER BOX */}

      <div style={containerStyle}>

        <div style={infoBox}>

          <h2>System Information</h2>

          <p><b>Screen Type:</b> {screen}</p>

          <p><b>Resolution:</b> {resolution}</p>

          <p><b>Access Via:</b> {device}</p>

          <p><b>IP Address:</b> {ip}</p>

          <p><b>Country:</b> {country}</p>

          <p><b>Date:</b> {date}</p>

          <p><b>Time:</b> {time}</p>

        </div>

      </div>

    </div>

  )

}


/* STYLES */

const navStyle = {

  display:"flex",
  justifyContent:"space-between",
  alignItems:"center",
  padding:"16px 32px",
  backdropFilter:"blur(20px)",
  background:"rgba(255,255,255,0.25)",
  position:"sticky",
  top:0

}

const linkStyle = {

  marginLeft:"20px",
  textDecoration:"none",
  color:"#000",
  fontWeight:"500"

}

const containerStyle = {

  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  height:"80vh"

}

const infoBox = {

  backdropFilter:"blur(25px)",
  background:"rgba(255,255,255,0.35)",
  padding:"40px",
  borderRadius:"20px",
  width:"90%",
  maxWidth:"420px",
  boxShadow:"0 10px 30px rgba(0,0,0,0.2)"

}