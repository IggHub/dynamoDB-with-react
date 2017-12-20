import React, {Component} from 'react';

class Login extends Component {
  render(){
    return (
      <div className="Login">
        <input placeholder="email" />
        <input placeholder="password" />
        <button>Login</button>
      </div>
    )
  }
}

export default Login;
