import React from 'react'
import { Link } from "react-router-dom";
export default function Header() {
    return (
        <div className="header">
        <nav className="navbar navbar-inverse  bg-1">
        <div className="container">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="#"><img src="img/logo.svg" /> </a>
                <a className="navbar-brand border-left" href="#"> Data Adjustment Manager</a>
            </div>
            <div className="collapse navbar-collapse" id="myNavbar">

                <ul className="nav navbar-nav navbar-right">
                    <li className="dropdown">
                        <a className="dropdown-toggle" data-toggle="dropdown" href="#"> User Profile
                            <span className="caret"></span></a>
                        <ul className="dropdown-menu">
                            <li><a href="#">Profile</a></li>
                            <li><a href="#">Edit Profile</a></li>
                            <li><a href="#">Log out</a></li>
                        </ul>
                    </li>
                    <li>
                        <div className="log_out"><a href="#">Log off</a></div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <nav className="navbar navbar-inverse  bg-4">
        <div className="container">
            <div className="navbar-header">
                
                <Link to="/" className="navbar-brand active">
                    <span className="glyphicon glyphicon-home"></span> Home
                    </Link>
            </div>
            <div className="navbar-header navbar-right">
                <a className="navbar-brand active" href="#">
                    Tasks <i className="glyphicon glyphicon-th-large"></i></a>
            </div>
        </div>
    </nav>
    </div>
    )
}
