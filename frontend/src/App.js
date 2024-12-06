import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthContextWrapper from "./context/AuthContextWrapper";
import LogsContextWrapper from "./context/LogsContextWrapper";
import IsLoggedIn from "./components/Routing/isLoggedIn";
import IsLoggedOut from "./components/Routing/isLoggedOut";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MemberUpload from "./pages/MemberUpload";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import SystemLogsTable from "./components/SystemLogsTable";

function App() {
  return (
    <>
      <AuthContextWrapper>
        <LogsContextWrapper>
          <BrowserRouter>
            <Header />
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
                <Route index element={<Dashboard />} />
              </Route>
              <Route path="/profile/:id" element={<Dashboard />} />
              <Route path="/logs" element={<SystemLogsTable />} />

              <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
          </BrowserRouter>
        </LogsContextWrapper>
      </AuthContextWrapper>
    </>
  );
}

export default App;
