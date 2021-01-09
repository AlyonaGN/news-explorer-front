import React from 'react';
import './Main.css';
import About from '../About/About.js';

function Main () {
    return (
        <main className="content-container">
            <section className="content-container__about-author">
                <About />
            </section>
        </main>
    );
}

export default Main;