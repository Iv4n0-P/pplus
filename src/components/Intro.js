import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../img/logo.png'

const Intro = () => {
    return (
        <div className="intro-container">
            <div className="intro-content">
                <img className="intro-logo" src={logo} />
                <h1 className="intro-title">Plan Plus</h1>
                <div className="intro-languages-wrap">
                    <Link className="intro-link" to="/menu/en">
                    <div className="lang-box lang-box--active">
                        <h6>English</h6>
                        <p>English</p>
                    </div>
                    </Link>
                    <Link className="intro-link" to="/menu/hr">
                    <div className="lang-box">
                        <h6>Hrvatski</h6>
                        <p>Croatian</p>
                    </div>
                    </Link>
                    <Link className="intro-link" to="/menu/de">
                    <div className="lang-box">
                        <h6>Deutsch</h6>
                        <p>German</p>
                    </div>
                    </Link>
                    <Link className="intro-link" to="/menu/it">
                    <div className="lang-box">
                        <h6>Italiano</h6>
                        <p>Italian</p>
                    </div>
                    </Link>
                    
                </div>
            </div>
        </div>
    )
}

export default Intro