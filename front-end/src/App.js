import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import auth from "./services/authService";
import ProtectedRoutes from "./components/common/protectedRoutes";
import CustomerForm from "./components/customerForm";
import RentalForm from "./components/rentalForm";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            {/* movie  */}
            <ProtectedRoutes path="/movies/:id" component={MovieForm} />
            <Route
              path="/movies"
              render={(props) => <Movies {...props} user={this.state.user} />}
            />
            {/* movie end */}

            {/* customer routes */}
            <ProtectedRoutes path="/customers/:id" component={CustomerForm} />

            <Route
              path="/customers"
              render={(props) => (
                <Customers {...props} user={this.state.user} />
              )}
            />

            {/* customer routes end */}

            {/* rentals routes */}
            <ProtectedRoutes path="/rentals/:id" component={RentalForm} />
            <Route
              path="/rentals"
              render={(props) => <Rentals {...props} user={this.state.user} />}
            />

            {/* <Route path="/rentals" component={Rentals} /> */}

            {/* rentals routes end */}
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
