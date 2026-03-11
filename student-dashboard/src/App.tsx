//Entry point of the app
import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from "@/app/layout"

//pages being imported
import Dashboard from "@/pages/Dashboard"
import Classes from "@/pages/Classes"
import Calendar from "@/pages/Calendar"
import Achievments from "@/pages/Achievments"
import CourseTasksPage from "@/components/CourseTasksPage"
import SettingsPage from "@/pages/SettingsPage"


export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/classes/:courseId" element={<CourseTasksPage />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/achievments" element={<Achievments />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}



//DON'T TOUCH, this makes react able to put things directly into the website DOM
ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)