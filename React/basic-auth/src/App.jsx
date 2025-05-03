import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

// Contexts
import AuthContext from "./context/AuthContext";

// Components
import LoadingSpinner from "./components/loadingSpinner/LoadingSpinner";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import ModalExpiredSession from "./components/modalExpiredSession/ModalExpiredSession";

// Routes
import publicRoutes from "src/routes/publicRoutes";
import privateRoutes from "src/routes/privateRoutes";

// Hooks
import useAuth from "./hooks/useAuth";

function App() {
  const { user, updateUser, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="app-loading">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, updateUser, isAuthenticated, loading }}>
      <Router>
        <Routes>
          {publicRoutes.map(({ path, component: Component }) => (
            <Route
              key={path}
              path={path}
              element={
                <>
                  <Navbar />
                  <Component />
                  <Footer />
                </>
              }
            />
          ))}
          {isAuthenticated ? (
            privateRoutes.map(({ path, component: Component }) => (
              <Route
                key={path}
                path={path}
                element={
                  <>
                    <Navbar />
                    <Component />
                    <Footer />
                    <ModalExpiredSession />
                  </>
                }
              />
            ))
          ) : (
            // Redireciona para login se não autenticado
            <Route path="*" element={<Navigate to="/" />} />
          )}
        </Routes>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
