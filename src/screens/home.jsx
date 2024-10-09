import React from 'react';
import '../styles/home.css';

const Home = () => {

    return (
        <section className="home">
            <div className="home-content">
                <h1>
                    Hi, Welcome to my
                    <br />
                    <span style={{ color: 'rgb(78, 226, 78)' }}>API</span>!
                </h1>
                <h3>
                    A Full-Stack API for <strong>Task list</strong>
                </h3>
                <p>
                    This project demonstrates a full-stack web application built using React.js for the front end, C#
                    for the API, and SQL Server for the database. Explore and test the API endpoints, and see how
                    seamlessly it all integrates!
                </p>

                <div className="btn-box">
                    <a href="./contactMe">Contact me</a>
                    <a href="./login">Task list</a>
                </div>
            </div>
        </section>
    );
};

export default Home;
