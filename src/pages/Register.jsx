import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api/api'
import '../Styles/Register.css'
function Register() {
    const navigate = useNavigate()

    const [formdata, setFormdata] = useState({
        name: "",
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
            const response = await api.post('/auth/register', formdata)

            alert(response.data.message)
            navigate('/login')

        } catch (err) {
            alert(err.response?.data?.message || "Registration failed")
        }
    }

    return (
        <div className="register-page">

            <div className="register-card">

                {/* Left Side */}
                <div className="register-info">
                    <span className="brand-name">SHOPORA</span>

                    <h1>
                        Start your
                        <br />
                        <span>shopping journey.</span>
                    </h1>

                    <p>
                        Create your account and discover products
                        curated just for you.
                    </p>

                    <div className="register-line"></div>

                    <small>
                        Premium shopping. Simple experience.
                    </small>
                </div>

                {/* Right Side */}
                <div className="register-form-section">

                    <div className="form-header">
                        <h2>Create Account</h2>
                        <p>Enter your details to get started</p>
                    </div>

                    <form onSubmit={handlesubmit}>

                        <div className="input-group-custom">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formdata.name}
                                onChange={handlechange}
                                placeholder="Enter your name"
                                required
                            />
                        </div>

                        <div className="input-group-custom">
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

                        <div className="input-group-custom">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formdata.password}
                                onChange={handlechange}
                                placeholder="Create a password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="create-account-btn"
                        >
                            Create Account
                        </button>

                    </form>

                    <p className="login-text">
                        Already have an account?
                        <Link to="/login"> Sign in</Link>
                    </p>

                </div>

            </div>

        </div>
    )
}

export default Register

