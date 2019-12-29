import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./components/home.component";
import CreatePost from "./components/create-post.component";
import EditPost from "./components/edit-post.component";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">Memes App</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Post</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Route path="/" exact component={Home} />
          <Route path='/create' component={CreatePost} />
          <Route path="/edit/:id" component={EditPost} />
        </div>
      </Router>
    );
  }
}

export default App;