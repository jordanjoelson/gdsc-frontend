//Entry point of the app
import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Layout from "@/app/layout"
import Dashboard from '@/pages/Dashboard'

export default function App() {
  return (
    <Layout>
      <h1>Hello world</h1>  {/* The page content goes here */}
    </Layout>
  )
}







//DON'T TOUCH, this makes react able to put things directly into the website DOM
ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)