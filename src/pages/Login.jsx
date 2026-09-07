
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/api'
import '../Styles/Login.css'

function Login() {

    const navigate = useNavigate()

    const [formdata, setFormdata] = useState({
        email: "",
        password: ""
    })

    const handlechange = (e) => {
        setFormdata({
            ...formdata,
            [e.target.name]: e.target.value
        })
    }

    const handlesubmit = async (e) => {
        e.preventDefault()

        try {

            const response = await api.post('/auth/login', formdata)

            alert(response.data.message)

            localStorage.setItem("token", response.data.token)
            localStorage.setItem("login", true)
            localStorage.setItem("role", response.data.role)

            navigate('/')

        } catch (err) {

            alert(
                err.response?.data?.message ||
                "Login failed"
            )
        }
    }

    return (
        <div className="login-page">

            <div className="login-card">

                {/* LEFT SIDE */}

                <div className="login-info">

                    <span className="login-brand">
                        LUXE<span>STORE</span>
                    </span>

                    <div className="login-hero-text">

                        <span className="login-label">
                            WELCOME BACK
                        </span>

                        <h1>
                            Your world of
                            <br />
                            <span>shopping awaits.</span>
                        </h1>

                        <p>
                            Sign in to continue exploring our
                            curated collection of quality products.
                        </p>

                    </div>

                    <div className="login-bottom-line">
                        <span></span>
                        <small>
                            Premium shopping. Simple experience.
                        </small>
                    </div>

                </div>


                {/* RIGHT SIDE */}

                <div className="login-form-section">

                    <div className="login-header">

                        <h2>Welcome back</h2>

                        <p>
                            Sign in to your account
                        </p>

                    </div>


                    <form onSubmit={handlesubmit}>

                        {/* EMAIL */}

                        <div className="login-input-group">

                            <label>Email</label>

                            <input
                                type="email"
                                name="email"
                                value={formdata.email}
                                onChange={handlechange}
                                placeholder="Enter your email"
                                required
                            />

                        </div>


                        {/* PASSWORD */}

                        <div className="login-input-group">

                            <div className="password-label">

                                <label>Password</label>

                                <span>
                                    Required
                                </span>

                            </div>

                            <input
                                type="password"
                                name="password"
                                value={formdata.password}
                                onChange={handlechange}
                                placeholder="Enter your password"
                                required
                            />

                        </div>


                        {/* BUTTON */}

                        <button
                            type="submit"
                            className="login-submit-btn"
                        >
                            Sign In
                            <span>→</span>
                        </button>

                    </form>


                    {/* REGISTER */}

                    <p className="register-text">

                        Don't have an account?

                        <Link to="/register">
                            Create account
                        </Link>

                    </p>

                </div>

            </div>

        </div>
    )
}

export default Login
