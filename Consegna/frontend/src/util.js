/*This file contains all important method used in our project.*/
import axios from 'axios'

/*Method to decode data from the token created during the login phase.
  Return a JSON objet containing the user's data (email, username, id).*/
export function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''));
  
    return JSON.parse(jsonPayload)
  }

/*Return the username of the user logged, from the token saved in the localStorage.*/
function getUsername() {
  let state = JSON.parse(localStorage.getItem("state"));
    return parseJwt(state).username
}

/*Return the Id of the user logged, from the token saved in the localStorage.*/
export function getUserId() {
  let state = JSON.parse(localStorage.getItem("state"));
  if(state!=null){
    return parseJwt(state).userId
  }
  else{
    return null
  } 
}

/*Method to log out the user.
  Save the items in the cart into the database and clear the localStorage.*/
export function Logout () {
    let total = JSON.parse(localStorage.getItem("total"));
    let cart = [JSON.parse(localStorage.getItem("cart")), total];
    let userId = getUserId();
    axios.patch(`http://localhost:5000/users/${userId}`, {cartItems: cart });
    window.localStorage.clear();
  }

/*Check if there is an user logged in or not.
  If an user is logged, return the "Logout" button, else return the "Login" button.*/
export function checkAuth() {
    let state = window.localStorage.getItem("state");
    if (state === null) {
      return <a href="/login">Login</a>
    }
    else {
      return <a href="/" onClick={Logout}> Logout</a>
    }
  }

/*Return a welcome message.
  If a user is logged in, return a message with its username*/
export function welcomeMessage(){
    let state = JSON.parse(localStorage.getItem("state"));
    if (state === null) {
      return ""
    }
    else {
      return `Welcome ${getUsername()}!`
    }
  }

