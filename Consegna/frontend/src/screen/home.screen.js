import React, { Component } from 'react';
import Intro from '../component/intro.component';
import Categories from '../component/categories.component';

/*This is the homepage.
  It shows the intro (using "intro" component) and categories (using the "categories" component).*/
class HomeScreen extends Component {
    render() {
        return (
        <div>
            <Intro />
            <Categories />
        </div>
        )
    }
}

export default HomeScreen;
