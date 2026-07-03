import Landing  from "./pages/Landing";
import { ChatRoom } from "./pages/ChatRoom"
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {

  return (
    <>  
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/room/:roomId" element={<ChatRoom />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
