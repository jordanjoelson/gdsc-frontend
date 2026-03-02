//Entry point of the app
import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Layout from "@/app/layout"

//main pages
import Dashboard from "@/pages/Dashboard"
import Classes from "@/pages/Classes"
import Calendar from "@/pages/Calendar"
import Achievments from "@/pages/Achievments"

//login/signup pages
// login/signup pages
import Login from "@/pages/auth/login"
import Signup from "@/pages/auth/signup"
import SignupOrLogin from "@/pages/auth/signupOrLogin"
import Authentication from "@/pages/auth/Authentication"


export default function App() {
  return (
    <Router>
      <Routes>

        {/* AUTH ROUTES (no sidebar layout) */}
        <Route path="/auth" element={<SignupOrLogin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/auth/verify" element={<Authentication title={''} subtitle={''} children={undefined} />} />

        {/* APP ROUTES (with sidebar layout) */}
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/classes" element={<Classes />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/achievments" element={<Achievments />} />
              </Routes>
            </Layout>
          }
        />

      </Routes>
    </Router>
  )
}



//DON'T TOUCH, this makes react able to put things directly into the website DOM
ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)