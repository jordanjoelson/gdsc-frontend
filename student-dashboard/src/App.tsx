import "./style.css"
import React from 'react'
import ReactDOM from 'react-dom/client'
//import Message from './Message'
//import {BrowserRouter as Router, Route} from 'react-router-dom'
import Layout from "@/app/layout"
import CourseCard from "./components/CourseCard";

export default function App() {
  return (
    <Layout>
      <CourseCard name = "Computer Science" progress = {30}/>
      <CourseCard name ="Calculus 1" progress = {75}/>
    </Layout>
  )
}


ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)