import React, { useEffect, useState } from 'react'
import api from '../api/api'
import '../Styles/AddToCart.css'

function AddtoCart() {
  const [orders, setOrder] = useState([])

  const myorders = async () => {
    try {
      const token = localStorage.getItem("token")

      const response = await api.get('/orders/my-order', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setOrder(response.data.orders)

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    myorders()
  }, [])

  return (
    <div className="orders-page">

      <div className="container py-5">

        {/* Header */}
        <div className="orders-header mb-5">

          <div>
            <p className="orders-label">YOUR SHOPPING</p>

            <h1 className="orders-title">
              My Orders
            </h1>

            <p className="orders-subtitle">
              Track and manage your purchased products
            </p>
          </div>

          <div className="orders-count">
            <span>{orders.length}</span>
            <small>Orders</small>
          </div>

        </div>


        {/* Orders */}
        <div className="row g-4">

          {orders.length === 0 ? (

            <div className="col-12">
              <div className="empty-cart">

                <div className="empty-icon">
                  🛍️
                </div>

                <h3>No Orders Yet</h3>

                <p>
                  Your purchased products will appear here.
                </p>

              </div>
            </div>

          ) : (

            orders.map((order) => (

              <div
                className="col-12 col-md-6 col-lg-4"
                key={order._id}
              >

                <div className="card order-card h-100">

                  {/* Product Image */}
                  <div className="order-image-wrapper">

                    <img
                      src={order.product.image}
                      alt={order.product.name}
                      className="card-img-top order-image"
                    />

                  </div>


                  {/* Card Body */}
                  <div className="card-body order-card-body">

                    {/* Status */}
                    <div className="d-flex justify-content-between align-items-center mb-3">

                      <span className="product-category">
                        ORDER
                      </span>

                      <span className="status-badge">
                        {order.Status}
                      </span>

                    </div>


                    {/* Product Name */}
                    <h3 className="card-title product-title">
                      {order.product.name}
                    </h3>


                    {/* Description */}
                    <p className="card-text product-description">
                      {order.product.description}
                    </p>


                    {/* Price */}
                    <div className="price-section">

                      <div>
                        <small>PRICE</small>

                        <h4>
                          ₹{order.product.discountprice}
                        </h4>
                      </div>

                      <div className="text-end">

                        <small>DISCOUNT</small>

                        <p className="discount-text">
                          {order.product.discountpercentage}% OFF
                        </p>

                      </div>

                    </div>


                    {/* Quantity */}
                    <div className="quantity-section">

                      <span>
                        Quantity
                      </span>

                      <strong>
                        {order.quantity}
                      </strong>

                    </div>

                  </div>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  )
}

export default AddtoCart    