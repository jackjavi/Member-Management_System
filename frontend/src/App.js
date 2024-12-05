import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthContextWrapper from "./context/AuthContextWrapper";
import IsLoggedIn from "./components/Routing/isLoggedIn";
import IsLoggedOut from "./components/Routing/isLoggedOut";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <>
      <AuthContextWrapper>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<IsLoggedOut />}>
              <Route index element={<LoginPage />} />
            </Route>
            <Route path="/signup" element={<IsLoggedOut />}>
              <Route index element={<SignupPage />} />
            </Route>
            <Route path="/" element={<IsLoggedIn />} />
          </Routes>
        </BrowserRouter>
      </AuthContextWrapper>
    </>
  );
}

export default App;
