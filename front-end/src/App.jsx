
import "./App.css";
import AuthForm from "./pages/AuthForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Settings from "./pages/Settings";


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" Component={LandingPage} />
           <Route path="/settings" Component={Settings} />
        <Route path="/auth" Component={AuthForm} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
