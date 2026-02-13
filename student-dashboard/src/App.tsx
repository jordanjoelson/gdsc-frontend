import React from 'react'
import ReactDOM from 'react-dom/client'
//import Message from './Message'
//import {BrowserRouter as Router, Route} from 'react-router-dom'
import Layout from "@/app/layout"

export default function App() {
  return (
    <Layout>
      <h1>Hello world</h1>  {/* your page content goes here */}
    </Layout>
  )
}


ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)