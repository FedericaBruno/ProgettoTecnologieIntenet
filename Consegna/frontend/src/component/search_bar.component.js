import React from 'react';
import { withRouter } from "react-router-dom";

/*Render a input form and a button.*/
class SearchForm extends React.Component {
    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit.bind(this)}>
                        <label htmlFor="input"></label>
                        <input value = {this.props.input} onChange = {this.props.setInput.bind(this)} placeholder="Cosa stai cercando?"/>
                        <button className= "search_button" type='submit'>Cerca</button>
                </form>
            </div>
    );
}
};

/*Search Bar.*/
class SearchBar extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        input:''
    };
      this.setInput = this.setInput.bind(this);
      this.handleSubmit =this.handleSubmit.bind(this);
    }

    /*The input is saved in the state.*/
    setInput(event) {
        this.setState({
            input: event.target.value
        })
    }

    handleSubmit(event) {
    event.preventDefault();

    const { history } = this.props;
    /*The user is directed to the search results. */
    history.push(`/products/${this.state.input}`)
}
    render() {
      return (
        <div>
            <SearchForm 
            {...this.state} 
            setInput={this.setInput}   
            handleSubmit={this.handleSubmit}
            />
        </div>
      );
    }
  }

  
export default withRouter(SearchBar);