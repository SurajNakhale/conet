import {BrowserRouter, Route, Routes} from "react-router-dom";
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query';
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Rooms from "@/pages/Rooms";
import ChatRoom from "./pages/ChatRoom"
import AuthRoute from "./components/AuthRoute";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

function App() {

  return (
    <>  
    <QueryClientProvider client={ queryClient }>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route element={<AuthRoute />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
          </Route>
          
          <Route element={<ProtectedRoute />}>
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/room/:roomId" element={<ChatRoom />} />
          </Route>
          
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
    </>
  )
}

export default App
