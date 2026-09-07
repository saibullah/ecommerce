
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api/api'
import '../Styles/Editproduct.css'

function Editproduct() {

    const navigate = useNavigate()
    const { id } = useParams()

    const [formdata, setFormdata] = useState({
        name: "",
        description: "",
        image: "",
        actualprice: "",
        discountprice: "",
        discountpercentage: "",
        quantity: ""
    })

    useEffect(() => {

        const getsingleproduct = async () => {

            try {

                const response = await api.get(`/product/${id}`)

                setFormdata(response.data.product)

            } catch (err) {

                alert("Failed to fetch the product")

            }
        }

        getsingleproduct()

    }, [id])


    const handlechange = (e) => {

        setFormdata({
            ...formdata,
            [e.target.name]: e.target.value
        })

    }


    const handlesubmit = async (e) => {

        e.preventDefault()

        try {

            const token = localStorage.getItem("token")

            const response = await api.put(
                `/product/${id}`,
                formdata,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            alert(response.data.message)

            navigate('/')

        } catch (err) {

            alert("Failed to update product")

        }
    }


    return (

        <div className="edit-product-page">

            <div className="container py-5">

                {/* HEADER */}

                <div className="text-center mb-5">

                    <span className="edit-label">
                        ADMIN PANEL
                    </span>

                    <h1 className="fw-semibold mt-2">
                        Edit Product
                    </h1>

                    <p className="text-secondary mb-0">
                        Update your product information
                    </p>

                </div>


                {/* FORM CARD */}

                <div className="card border-0 shadow-lg rounded-4 edit-product-card">

                    <div className="card-body p-4 p-md-5">

                        <form onSubmit={handlesubmit}>

                            <div className="row g-4">

                                {/* PRODUCT NAME */}

                                <div className="col-md-6">

                                    <label className="form-label fw-semibold">
                                        Product Name
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        value={formdata.name}
                                        onChange={handlechange}
                                        placeholder="Enter product name"
                                        className="form-control form-control-lg"
                                        required
                                    />

                                </div>


                                {/* IMAGE */}

                                <div className="col-md-6">

                                    <label className="form-label fw-semibold">
                                        Image URL
                                    </label>

                                    <input
                                        type="text"
                                        name="image"
                                        value={formdata.image}
                                        onChange={handlechange}
                                        placeholder="Enter image URL"
                                        className="form-control form-control-lg"
                                        required
                                    />

                                </div>


                                {/* DESCRIPTION */}

                                <div className="col-12">

                                    <label className="form-label fw-semibold">
                                        Description
                                    </label>

                                    <textarea
                                        name="description"
                                        value={formdata.description}
                                        onChange={handlechange}
                                        placeholder="Enter product description"
                                        className="form-control"
                                        rows="4"
                                        required
                                    />

                                </div>


                                {/* ACTUAL PRICE */}

                                <div className="col-md-6 col-lg-3">

                                    <label className="form-label fw-semibold">
                                        Actual Price
                                    </label>

                                    <div className="input-group input-group-lg">

                                        <span className="input-group-text">
                                            ₹
                                        </span>

                                        <input
                                            type="number"
                                            name="actualprice"
                                            value={formdata.actualprice}
                                            onChange={handlechange}
                                            placeholder="0"
                                            className="form-control"
                                            required
                                        />

                                    </div>

                                </div>


                                {/* DISCOUNT PRICE */}

                                <div className="col-md-6 col-lg-3">

                                    <label className="form-label fw-semibold">
                                        Discount Price
                                    </label>

                                    <div className="input-group input-group-lg">

                                        <span className="input-group-text">
                                            ₹
                                        </span>

                                        <input
                                            type="number"
                                            name="discountprice"
                                            value={formdata.discountprice}
                                            onChange={handlechange}
                                            placeholder="0"
                                            className="form-control"
                                            required
                                        />

                                    </div>

                                </div>


                                {/* DISCOUNT */}

                                <div className="col-md-6 col-lg-3">

                                    <label className="form-label fw-semibold">
                                        Discount
                                    </label>

                                    <div className="input-group input-group-lg">

                                        <input
                                            type="number"
                                            name="discountpercentage"
                                            value={formdata.discountpercentage}
                                            onChange={handlechange}
                                            placeholder="0"
                                            className="form-control"
                                            required
                                        />

                                        <span className="input-group-text">
                                            %
                                        </span>

                                    </div>

                                </div>


                                {/* QUANTITY */}

                                <div className="col-md-6 col-lg-3">

                                    <label className="form-label fw-semibold">
                                        Quantity
                                    </label>

                                    <input
                                        type="number"
                                        name="quantity"
                                        value={formdata.quantity}
                                        onChange={handlechange}
                                        placeholder="0"
                                        min="0"
                                        className="form-control form-control-lg"
                                        required
                                    />

                                </div>


                                {/* IMAGE PREVIEW */}

                                {formdata.image && (

                                    <div className="col-12">

                                        <div className="preview-box">

                                            <span className="preview-label">
                                                IMAGE PREVIEW
                                            </span>

                                            <img
                                                src={formdata.image}
                                                alt={formdata.name}
                                                className="product-preview"
                                            />

                                        </div>

                                    </div>

                                )}


                                {/* BUTTONS */}

                                <div className="col-12">

                                    <div className="d-flex gap-3 justify-content-end mt-3">

                                        <button
                                            type="button"
                                            className="btn btn-outline-dark px-4 py-2"
                                            onClick={() => navigate('/')}
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            type="submit"
                                            className="btn btn-dark px-5 py-2"
                                        >
                                            Update Product
                                        </button>

                                    </div>

                                </div>

                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Editproduct