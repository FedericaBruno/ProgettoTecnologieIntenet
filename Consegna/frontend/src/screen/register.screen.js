import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

/*This is the register form where the user fill the field (Username, Email, Password) to register in the site.
  If he already has an account, he can click "Login" and will be directed to the login page.*/
class RegisterForm extends React.Component {
    render() {
        return (
            <div className="form">
                <form onSubmit={this.props.handleSubmit.bind(this)}>
                <ul className="form-container">
                    <li>
                        <h2>Crea un account</h2>
                    </li>
                    <li>
                        <label htmlFor="username">Username</label>
                        <input value = {this.props.username} onChange = {this.props.setUsername.bind(this)}/>
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
                        <label htmlFor="rePassword">Reinserisci Password</label>
                        <input type="password" value = {this.props.repassword} onChange = {this.props.setRePassword.bind(this)}/>
                    </li>
                    <li>
                        <button type='submit'>Iscriviti!</button>
                    </li>
                    <li>Hai già un account?
                        <Link to={"/login" } className="register_button">Login</Link>
                    </li>
                    <li>
                        <h2>{this.props.message}</h2>
                    </li>
                </ul>
                </form>
            </div>
    );
}
};

class RegisterPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        username:'',
        email:'',
        password:'',
        repassword:'',
        message:''
    };
      this.setUsername = this.setUsername.bind(this);
      this.setEmail = this.setEmail.bind(this);
      this.setPassword = this.setPassword.bind(this);
      this.setRePassword = this.setRePassword.bind(this);
      this.handleSubmit =this.handleSubmit.bind(this);
    }

    /*The information inserted in the form from the user are saved in the state.*/
    setUsername(event) {
        this.setState({
            username: event.target.value
        })
      }
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

    setRePassword(event) {
        this.setState({
            repassword: event.target.value
        })
    }

    handleSubmit(event) {
    event.preventDefault();
    axios.get(`http://localhost:5000/users/${this.state.email}`)
    .then(result => {

        /*Check if the two password inserted match.*/
        if(this.state.password!== this.state.repassword){
            this.setState({ message: `Le password non corrispondono`});
        }
        /*If the email inserted has already been used to register.*/
        else if(result.data !== null){
            this.setState({ message: `Email già in uso` })
        }
        /*If all information are correct, a new User object is created and added to the database.*/
        else{
            const User = {username: this.state.username, email: this.state.email, password: this.state.password};
            axios.post("http://localhost:5000/users/register", User)
            .then(response => {
                this.setState({message: response.data.message});
                this.props.history.push('/login');
            })
            .catch((error) => {
                this.setState({message: "Error"})
        })
    }})
}
    render() {
      return (
        <div>
            <RegisterForm 
            {...this.state} 
            setUsername={this.setUsername} 
            setEmail={this.setEmail} 
            setPassword={this.setPassword} 
            setRePassword={this.setRePassword} 
            handleSubmit={this.handleSubmit}
            />
        </div>
      );
    }
  }

  
export default RegisterPage;