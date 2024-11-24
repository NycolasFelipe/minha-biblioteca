import { useState, useContext, createContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

// Create a context for authentication
const authContext = createContext();

// Provide the authentication context to child components
const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Custom hook to handle authentication logic
function useProvideAuth() {
  const [user, setUser] = useState(null); // User state
  const [errors, setErros] = useState([]); // Error state
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Sign in function
  function signin(username, password) {
    setIsLoading(true); // Set loading state to true
    fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    }).then(res => {
      setIsLoading(false); // Set loading state to false
      if (res.ok) {
        res.json().then(user => setUser(user)); // Set user state if successful
      } else {
        res.json().then(err => setErros(err.errors)); // Set error state if failed
      }
    })
  }

  // Sign up function
  function signup(signUpData) {
    setErros([]); // Clear errors
    setIsLoading(true); // Set loading state to true
    fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ signUpData })
    }).then(res => {
      setIsLoading(false); // Set loading state to false
      if (res.ok) {
        res.json().then(user => setUser(user)); // Set user state if successful
      } else {
        res.json().then(err => setErros(err.errors)); // Set error state if failed
      }
    })
  }

  // Sign out function
  function signout() {
    fetch("/api/logout", { method: "DELETE" }).then(res => {
      if (res.ok) {
        setUser(null); // Clear user state
      }
    });
  }

  // Auto sign-in function (e.g., using a token)
  function autoSignin() {
    fetch("/api/me").then(res => {
      if (res.ok) {
        res.json().then(user => setUser(user))
      }
    })
  }

  return {
    user, // Current user
    signin, // Sign in function
    signup, // Sign up function
    signout, // Sign out function
    autoSignin, // Auto sign-in function
    errors, // Error state
    isLoading // Loading state
  }
}

// Custom hook to access the authentication context
function useAuth() {
  return useContext(authContext);
}

// Private route component
function PrivateRoute({ children, ...rest }) {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children // Render children if authenticated
        ) : (
          <Redirect // Redirect to login if not authenticated
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

// Login page component
function LoginPage() {
  const history = useHistory();
  const location = useLocation();
  const auth = useAuth();
  const { from } = location.state || { from: { pathname: "/" } };
  
  function login() {
    auth.signin(); // Trigger sign-in
    if (auth.user) {
      history.replace(from); // Redirect to the intended page
    }
  }

  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>
    </div>
  );
}

// Main application component
export default function AuthExample() {
  return (
    <ProvideAuth>
      <Router>
        <Switch>
          <Route path="/public">
            <PublicPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <PrivateRoute path="/protected">
            <ProtectedPage />
          </PrivateRoute>
        </Switch>
      </Router>
    </ProvideAuth>
  );
}