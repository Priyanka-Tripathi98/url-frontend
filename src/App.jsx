import {BrowserRouter, Routes, Route} from "react-router-dom"
import  Url  from "./component/Url"

 function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Url/>}/>
       </Routes>
    </BrowserRouter>
  )
}


export default App
