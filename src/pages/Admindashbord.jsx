import React, { useEffect, useState } from 'react'
import api from '../api/api'
import '../Styles/Admindasboard.css'

function Admindashbord() {
  const [orders, setOrders] = useState([])

  const getallorders = async () => {
    try {
      const token = localStorage.getItem("token")

      const response = await api.get('/orders', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setOrders(response.data.order)
    } catch (err) {
      console.log("Failed to get all orders", err)
    }
  }

  useEffect(() => {
    getallorders()
  }, [])

  return (
    <div className="admin-page">

      {/* Header */}
      <div className="container py-4">

        <div className="admin-header mb-4">
          <div>
            <p className="admin-label mb-1">ADMIN PANEL</p>
            <h1 className="admin-title">Orders Dashboard</h1>
            <p className="admin-subtitle">
              Manage and monitor customer orders
            </p>
          </div>

          <div className="order-count">
            <span>{orders.length}</span>
            <small>Total Orders</small>
          </div>
        </div>

        {/* Orders */}
        <div className="row g-4">

          {orders.length === 0 ? (
            <div className="col-12">
              <div className="empty-orders">
                <h4>No orders found</h4>
                <p>Customer orders will appear here.</p>
              </div>
            </div>
          ) : (
            orders.map((order) => (

              <div className="col-12 col-md-6 col-lg-4" key={order._id}>

                <div className="card order-card h-100">

                  {/* Customer */}
                  <div className="customer-section">
                    <div className="customer-avatar">
                      {order.user.name?.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <small className="customer-label">
                        CUSTOMER
                      </small>

                      <h5 className="customer-name mb-0">
                        {order.user.name}
                      </h5>
                    </div>
                  </div>

                  {/* Product Image */}
                  <div className="product-image-container">
                    <img
                      src={order.product.image}
                      alt={order.product.name}
                      className="card-img-top product-image"
                    />
                  </div>

                  {/* Details */}
                  <div className="card-body">

                    <small className="product-label">
                      PRODUCT
                    </small>

                    <h4 className="product-name">
                      {order.product.name}
                    </h4>

                    <div className="order-details">

                      <div className="detail-item">
                        <span>Quantity</span>
                        <strong>{order.quantity}</strong>
                      </div>

                      <div className="detail-item">
                        <span>Status</span>

                        <span className="status-badge">
                          {order.Status}
                        </span>
                      </div>

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

export default Admindashbord