//Entry point of the app
import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from "@/app/layout"

// pages
import Dashboard from "@/pages/Dashboard"
import Classes from "@/pages/Classes"
import Calendar from "@/pages/Calendar"
import Achievements from "@/pages/Achievements"
import CourseTasksPage from "@/pages/CourseTasksPage"
import SettingsPage from "@/pages/SettingsPage"
import AllTasks from "@/pages/AllTasks"

// auth pages
import Landing from "@/pages/authentication/landing"
import Login from "@/pages/authentication/login"
import Signup from "@/pages/authentication/signup"
import EnterEmail from "@/pages/authentication/enterEmail"
import EnterCode from "@/pages/authentication/enterCode"
import ResetPassword from "@/pages/authentication/resetPassword"

export default function App() {
  return (
    <Router>
      <Routes>

        {/* Auth Pages (no sidebar layout) */}
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/enter-email" element={<EnterEmail />} />
        <Route path="/enter-code" element={<EnterCode />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Dashboard Layout Pages */}
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/classes" element={<Classes />} />
                <Route path="/classes/:courseId" element={<CourseTasksPage />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/achievements" element={<Achievements />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/allTasks" element={<AllTasks />} />
              </Routes>
            </Layout>
          }
        />

      </Routes>
    </Router>
  )
}

// DON'T TOUCH
ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)