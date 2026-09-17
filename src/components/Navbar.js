
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../Styles/Navbar.css'

function Navbar() {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("login")
        localStorage.removeItem("role")

        navigate("/login")
    }

    return (
        <header className="premium-navbar">

            <div className="container">

                <nav className="navbar navbar-expand-lg">

                    {/* Logo */}
                    <Link to="/" className="navbar-brand premium-logo">
                        LUXE<span>STORE</span>
                    </Link>

                    {/* Mobile Toggle */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarContent"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div
                        className="collapse navbar-collapse"
                        id="navbarContent"
                    >

                        {/* Center Navigation */}
                        <ul className="navbar-nav mx-auto premium-nav-links">

                            <li className="nav-item">
                                <Link className="nav-link" to="/">
                                    Home
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" >
                                   Products
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link
                                    to="/createproduct"
                                    className="nav-link"
                                >
                                    Add Product
                                </Link>
                            </li>

                        </ul>

                        {/* Logout */}
                        <div className="navbar-actions">

                            <button
                                className="logout-btn"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>

                        </div>

                    </div>

                </nav>

            </div>

        </header>
    )
}

export default Navbar
