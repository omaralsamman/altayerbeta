document.addEventListener('DOMContentLoaded', function() {
    const trackForm = document.getElementById('track-order-form');
    
    if (trackForm) {
        trackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real app, you would make an API call here
            // For demo purposes, we'll simulate a response
            simulateOrderTracking();
        });
    }
    
    function simulateOrderTracking() {
        const orderStatus = document.getElementById('order-status');
        
        // Show loading state
        orderStatus.innerHTML = `
            <div class="status-loading">
                <div class="spinner"></div>
                <p>Searching for your order...</p>
            </div>
        `;
        
        // Simulate API delay
        setTimeout(() => {
            // Simulated order data
            const orderData = {
                restaurant: "Green Garden Salad Bar",
                status: "in_transit",
                estimatedDelivery: "25-35 min",
                driver: {
                    name: "John D.",
                    phone: "+1 (555) 123-4567",
                    vehicle: "Motorcycle #ALT54321"
                },
                items: [
                    { name: "Caesar Salad", quantity: 2 },
                    { name: "Avocado Toast", quantity: 1 },
                    { name: "Fresh Lemonade", quantity: 2 }
                ],
                total: "$28.45",
                address: "123 Main St, Apt 4B, New York, NY 10001"
            };
            
            displayOrderStatus(orderData);
        }, 1500);
    }
    
    function displayOrderStatus(order) {
        const orderStatus = document.getElementById('order-status');
        let statusText, statusClass, statusIcon;
        
        switch(order.status) {
            case 'preparing':
                statusText = 'Preparing your food';
                statusClass = 'preparing';
                statusIcon = 'fa-blender';
                break;
            case 'ready':
                statusText = 'Waiting for driver';
                statusClass = 'ready';
                statusIcon = 'fa-motorcycle';
                break;
            case 'in_transit':
                statusText = 'On its way to you';
                statusClass = 'in-transit';
                statusIcon = 'fa-motorcycle';
                break;
            case 'delivered':
                statusText = 'Delivered';
                statusClass = 'delivered';
                statusIcon = 'fa-home';
                break;
            default:
                statusText = 'Order received';
                statusClass = 'received';
                statusIcon = 'fa-utensils';
        }
        
        orderStatus.innerHTML = `
            <div class="status-details ${statusClass}">
                <div class="status-header">
                    <div class="status-icon">
                        <i class="fas ${statusIcon}"></i>
                    </div>
                    <div class="status-text">
                        <h3>${statusText}</h3>
                        <p>Estimated delivery: ${order.estimatedDelivery}</p>
                    </div>
                </div>
                
                <div class="status-progress">
                    <div class="progress-steps">
                        <div class="step ${order.status === 'received' || order.status === 'preparing' || order.status === 'ready' || order.status === 'in_transit' || order.status === 'delivered' ? 'active' : ''}">
                            <div class="step-icon"><i class="fas fa-utensils"></i></div>
                            <p>Order received</p>
                        </div>
                        <div class="step ${order.status === 'preparing' || order.status === 'ready' || order.status === 'in_transit' || order.status === 'delivered' ? 'active' : ''}">
                            <div class="step-icon"><i class="fas fa-blender"></i></div>
                            <p>Preparing</p>
                        </div>
                        <div class="step ${order.status === 'ready' || order.status === 'in_transit' || order.status === 'delivered' ? 'active' : ''}">
                            <div class="step-icon"><i class="fas fa-motorcycle"></i></div>
                            <p>On the way</p>
                        </div>
                        <div class="step ${order.status === 'delivered' ? 'active' : ''}">
                            <div class="step-icon"><i class="fas fa-home"></i></div>
                            <p>Delivered</p>
                        </div>
                    </div>
                </div>
                
                <div class="order-info">
                    <div class="info-section">
                        <h4>Your Order</h4>
                        <ul class="order-items">
                            ${order.items.map(item => `
                                <li>${item.quantity}x ${item.name}</li>
                            `).join('')}
                        </ul>
                        <div class="order-total">
                            <strong>Total: ${order.total}</strong>
                        </div>
                    </div>
                    
                    <div class="info-section">
                        <h4>Delivery Details</h4>
                        <p>${order.address}</p>
                    </div>
                    
                    ${order.driver ? `
                    <div class="info-section driver-info">
                        <h4>Your Driver</h4>
                        <div class="driver-details">
                            <div class="driver-avatar">
                                <i class="fas fa-user"></i>
                            </div>
                            <div class="driver-text">
                                <p><strong>${order.driver.name}</strong></p>
                                <p>${order.driver.vehicle}</p>
                                <p><a href="tel:${order.driver.phone.replace(/[^0-9+]/g, '')}">${order.driver.phone}</a></p>
                            </div>
                        </div>
                    </div>
                    ` : ''}
                </div>
            </div>
        `;
    }
});