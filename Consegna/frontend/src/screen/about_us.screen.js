import React, { Component } from 'react';

/*This is the "about us" screen used in the "about us" page.*/
class AboutUs extends Component {
    render() {
        return (<div className="about_us">
            <div>
                <p>
                <h2>Siamo Bruno Federica e Bruno Carmine, due studenti dell'Università di Parma, che hanno realizzato questo sito di e-commerce
                    per il progetto del corso di Tecnologie Internet.
                    Ci siamo interessati allo sviluppo di pagine web e
                    abbiamo deciso di realizzare questo sito per la vendita di piante carnivore definite da Charles Darwin "the most wonderful plants in the world".
                </h2>
                </p>
                </div>

                <div>
                <img src="/images/intro.png" alt="logo"></img>
                </div>
            </div>
        )
    }
}
export default AboutUs;