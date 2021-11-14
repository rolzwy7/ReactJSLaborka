import { useEffect } from "react";
import "./App.css";
// Router imports
import { HashRouter as Router, Switch, Route } from "react-router-dom";
// Components
import Toolbar from "./components/Toolbar";
// Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserListPage from "./pages/UserListPage";
import Chat from "./pages/Chat";

function App() {
  return (
    <div>
      <Router>
        <Toolbar />
        <Switch>
          <Route path="/register" component={RegisterPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/chat/:id" component={Chat} />
          {/* Default route */}
          <Route exact path="/">
            <UserListPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
