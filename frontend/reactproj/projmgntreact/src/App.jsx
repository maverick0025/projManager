import "./App.css";
import Home from "./pages/Home/Home";
import NavBar from "./pages/NavBar/NavBar";
import ProjectDetails from "./pages/ProjectDetails/ProjectDetails";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import IssueDetails from "./pages/IssueDetails/IssueDetails";
import Upgrade from "./pages/Subscription/Subscription";
import Subscription from "./pages/Subscription/Subscription";
import Auth from "./pages/Auth/Auth";
import { AuthProvider, useAuth } from "./context/AuthContext";

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated ? (
        <div>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route
              path="/project/:projectId/issue/:issueId"
              element={<IssueDetails />}
            />
            <Route path="/upgrade_plan" element={<Subscription />} />
          </Routes>
        </div>
      ) : (
        <Auth />
      )}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      {/* <BrowserRouter> */}
        <AppRoutes />
      {/* </BrowserRouter> */}
    </AuthProvider>
  );
}

export default App;
