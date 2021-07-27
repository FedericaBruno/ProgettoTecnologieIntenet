import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

/*This is the login form where the user inserts his credentials (email and password) to log in the site.
  If the user is not registered, he can click the "register" button and it will be redirected to the register page.*/
class LoginForm extends React.Component {
    render() {
        return (
            <div className="form">
                <form onSubmit={this.props.handleSubmit.bind(this)}>
                <ul className="form-container">
                    <li>
                        <h2>Sign In</h2>
                    </li>
                    <li>
                        <label htmlFor="email">Email</label>
                        <input type="email" value = {this.props.email} onChange = {this.props.setEmail.bind(this)}/>
                    </li>
                    <li>
                        <label htmlFor="password">Password</label>
                        <input type="password" value = {this.props.password} onChange = {this.props.setPassword.bind(this)}/>
                    </li>
                    <li>
                        <button type='submit'>Login!</button>
                    </li>
                    <li>Non hai un account?
                        <Link to={"/register" } className="register_button">Registrati ora!</Link>
                    </li>
                    <li>
                        <h2>{this.props.logInStatus}</h2>
                    </li>
                </ul>
                </form>
            </div>
    );
}
};

/*This is the component for login.*/
class LoginPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = JSON.parse(window.localStorage.getItem('state')) || { 
        email:'',
        password:'',
        message:'',
        logInStatus: ''
    };
      this.setEmail = this.setEmail.bind(this);
      this.setPassword = this.setPassword.bind(this);
      this.handleSubmit =this.handleSubmit.bind(this);
    }

    /*All information entered from the user in the form are saved in the state while typing.*/
    setEmail(event) {
        this.setState({
            email: event.target.value
        })
    }
    setPassword(event) {
        this.setState({
            password: event.target.value
        })
    }

    setLoginStatus(event) {
        this.setState({
            logInStatus: event
        })
    }
    /*On click, send a POST request to the server.
      Checks login credentials, then look for the user's information (cart_items).*/
    handleSubmit(event) {
    event.preventDefault();
    axios.post("http://localhost:5000/users/login", {
        email: this.state.email,
        password: this.state.password,
      }).then((response) => {
        axios.get(`http://localhost:5000/users/id/${response.data.userId}`).then((res =>{
            window.localStorage.setItem('state', JSON.stringify(response.data.token));
            window.localStorage.setItem('cart', JSON.stringify(res.data.cartItems[0]));
            window.localStorage.setItem('total', JSON.stringify(res.data.cartItems[1]));
            this.setLoginStatus(response.data.token);
            this.props.history.push('/');
            document.location.reload()
        }))
      })
      /*If an error is returned, it means that the user has inserted not valid credentials. A message is shown to the user.*/
      .catch((err) => {
        window.localStorage.setItem('state', JSON.stringify(err.message));
        this.setLoginStatus("Credenziali errate");
      })
}
    render() {
      return (
        <div>
            <LoginForm 
            {...this.state} 
            setEmail={this.setEmail} 
            setPassword={this.setPassword}  
            handleSubmit={this.handleSubmit}
            />
        </div>
      );
    }
  }

  
export default LoginPage;