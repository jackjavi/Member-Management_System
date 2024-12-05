import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthContextWrapper from "./context/AuthContextWrapper";
import IsLoggedIn from "./components/Routing/isLoggedIn";
import IsLoggedOut from "./components/Routing/isLoggedOut";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MemberUpload from "./pages/MemberUpload";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <AuthContextWrapper>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/login" element={<IsLoggedOut />}>
              <Route index element={<LoginPage />} />
            </Route>
            <Route path="/signup" element={<IsLoggedOut />}>
              <Route index element={<SignupPage />} />
            </Route>
            <Route path="/upload" element={<IsLoggedIn />}>
              <Route index element={<MemberUpload />} />
            </Route>
            <Route path="/" element={<IsLoggedIn />}>
              <Route index element={<h1>Home</h1>} />
            </Route>

            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </BrowserRouter>
      </AuthContextWrapper>
    </>
  );
}

export default App;
