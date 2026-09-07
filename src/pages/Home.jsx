
import React, { useEffect, useState } from 'react'
import api from '../api/api'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import '../Styles/Home.css'

function Home() {
    const [products, setProduct] = useState([])
    const navigate = useNavigate()

    const role = localStorage.getItem("role")

    const getProduct = async () => {
        try {
            const response = await api.get('/product')
            setProduct(response.data.product)
        } catch (err) {
            alert("Failed to get products")
        }
    }

    useEffect(() => {
        getProduct()
    }, [])

    const placeorder = async (product) => {
        try {
            const token = localStorage.getItem("token")

            if (!token) {
                return navigate('/login')
            }

            await api.post(
                '/orders/addtocart',
                {
                    productId: product._id
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            alert("Product added to cart")

        } catch (err) {
            alert("Failed to add product to cart")
        }
    }

    return (
        <div className="home-page">

            <Navbar />

            {/* HERO SECTION */}

            <section className="hero-section">

                <div className="hero-content">

                    <span className="hero-small-title">
                        CURATED FOR YOU
                    </span>

                    <h1>
                        Discover products
                        <br />
                        <span>you'll love.</span>
                    </h1>

                    <p>
                        Explore our carefully selected collection
                        of quality products at exceptional prices.
                    </p>

                    <a href="#products" className="hero-btn">
                        Explore Collection
                    </a>

                </div>

            </section>


            {/* ACTION BAR */}

            <div className="store-header">

                <div>
                    <span className="collection-label">
                        OUR COLLECTION
                    </span>

                    <h2>Featured Products</h2>

                    <p>
                        {products.length} products available
                    </p>
                </div>

                <div className="store-actions">

                    {role === "admin" ? (
                        <Link
                            to="/admindasbord"
                            className="secondary-btn"
                        >
                            Admin Dashboard
                        </Link>
                    ) : (
                        <Link
                            to="/addtocart"
                            className="secondary-btn"
                        >
                            My Cart
                        </Link>
                    )}
                    

                </div>

            </div>


            {/* PRODUCTS */}

            <section
                className="products-section"
                id="products"
            >

                <div className="product-grid">

                    {products.map((product) => (

                        <div
                            className="product-card"
                            key={product._id}
                        >

                            {/* IMAGE */}

                            <div className="product-image-wrapper">

                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="product-image"
                                />

                                <div className="discount-badge">
                                    -{product.discountpercentage}%
                                </div>

                            </div>


                            {/* PRODUCT INFO */}

                            <div className="product-info">

                                <h3 className="product-name">
                                    {product.name}
                                </h3>

                                <p className="product-description">
                                    {product.description}
                                </p>


                                {/* PRICE */}

                                <div className="price-row">

                                    <span className="sale-price">
                                        ₹{product.discountprice}
                                    </span>

                                    <span className="original-price">
                                        ₹{product.actualprice}
                                    </span>

                                </div>


                                {/* QUANTITY */}

                                <div className="stock-info">

                                    <span>
                                        Available
                                    </span>

                                    <span className="quantity">
                                        {product.quantity} left
                                    </span>

                                </div>


                                {/* ACTION */}

                                {role === "admin" ? (

                                    <Link
                                        className="product-action admin-action"
                                        to={`/editproduct/${product._id}`}
                                    >
                                        Edit Product
                                    </Link>

                                ) : (

                                    <button
                                        className="product-action"
                                        onClick={() => placeorder(product)}
                                    >
                                        Add to Cart
                                        <span>→</span>
                                    </button>

                                )}

                            </div>

                        </div>

                    ))}

                </div>

            </section>


            {/* EMPTY STATE */}

            {products.length === 0 && (

                <div className="empty-products">
                    <h3>No products available</h3>
                    <p>Please check back later.</p>
                </div>

            )}

        </div>
    )
}

export default Home
