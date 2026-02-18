//Entry point of the app
import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
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



//DON'T TOUCH, this makes react able to put things directly into the website DOM
ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)