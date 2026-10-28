import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearCart } from './CartSlice';
import './CheckoutModal.css';

function CheckoutModal({ cartItems, totalAmount, totalQuantity, onClose, onOrderComplete }) {
  const dispatch = useDispatch();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  // Selected Payment Method: 'upi' | 'card' | 'netbanking' | 'cod'
  const [paymentMethod, setPaymentMethod] = useState('upi');
  
  // Card Details State
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });

  // Selected Bank for Net Banking
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  // UPI Reference State
  const [upiRef, setUpiRef] = useState('');
  const [upiCopied, setUpiCopied] = useState(false);

  // Checkout Status: 'form' | 'processing' | 'success'
  const [status, setStatus] = useState('form');
  const [orderSummary, setOrderSummary] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const upiId = 'paradisenursery@okaxis';
  // Standard UPI URI format for payment
  const upiUri = `upi://pay?pa=${upiId}&pn=Paradise%20Nursery&am=${totalAmount}&cu=INR&tn=Plant%20Order`;
  // Online QR generator URL with local SVG fallback
  const onlineQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(upiUri)}`;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleCardChange = (e) => {
    let { name, value } = e.target;
    if (name === 'cardNumber') {
      // Auto-format card number in 4-digit groups
      value = value.replace(/\D/g, '').slice(0, 16);
      value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    } else if (name === 'expiry') {
      // Auto-format MM/YY
      value = value.replace(/\D/g, '').slice(0, 4);
      if (value.length >= 3) {
        value = `${value.slice(0, 2)}/${value.slice(2)}`;
      }
    } else if (name === 'cvv') {
      value = value.replace(/\D/g, '').slice(0, 3);
    }
    setCardData((prev) => ({ ...prev, [name]: value }));
  };

  const copyUpiId = () => {
    navigator.clipboard.writeText(upiId);
    setUpiCopied(true);
    setTimeout(() => setUpiCopied(false), 2500);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Full name is required';
    if (!formData.email.trim()) errors.email = 'Valid email is required';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    if (!formData.address.trim()) errors.address = 'Street address is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.zip.trim()) errors.zip = 'ZIP code is required';

    if (paymentMethod === 'card') {
      if (cardData.cardNumber.replace(/\s/g, '').length < 16) {
        errors.cardNumber = 'Enter a valid 16-digit card number';
      }
      if (!cardData.cardName.trim()) errors.cardName = 'Cardholder name is required';
      if (cardData.expiry.length < 5) errors.expiry = 'MM/YY required';
      if (cardData.cvv.length < 3) errors.cvv = '3-digit CVV required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus('processing');

    const generatedOrderId = `PN-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderDetails = {
      orderId: generatedOrderId,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      customer: { ...formData },
      items: [...cartItems],
      totalAmount,
      totalQuantity,
      paymentMethod:
        paymentMethod === 'upi'
          ? 'UPI Online QR Code'
          : paymentMethod === 'card'
          ? 'Credit / Debit Card'
          : paymentMethod === 'netbanking'
          ? `Net Banking (${selectedBank})`
          : 'Cash on Delivery (COD)',
      transactionRef: upiRef || `TXN-${Math.floor(10000000 + Math.random() * 90000000)}`,
    };

    // Simulate payment authorization & network delay
    setTimeout(() => {
      setOrderSummary(orderDetails);
      setStatus('success');
      dispatch(clearCart());
    }, 1600);
  };

  return (
    <div className="checkout-backdrop" role="dialog" aria-modal="true" aria-labelledby="checkout-title">
      <div className="checkout-container">
        {status !== 'success' && (
          <button type="button" className="checkout-close-btn" onClick={onClose} aria-label="Close Checkout">
            &times;
          </button>
        )}

        {status === 'processing' && (
          <div className="checkout-processing-state">
            <div className="botanical-spinner"></div>
            <h3>Securing Your Greenery Order...</h3>
            <p>Authorizing payment with bank gateway. Please do not close or refresh this window.</p>
          </div>
        )}

        {status === 'success' && orderSummary && (
          <div className="checkout-success-view">
            <div className="success-badge-circle">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>

            <h2 className="success-title">Order Confirmed!</h2>
            <p className="success-subtitle">
              Thank you for adopting plants from Paradise Nursery! A confirmation receipt has been dispatched to <strong>{orderSummary.customer.email}</strong>.
            </p>

            <div className="order-receipt-card">
              <div className="receipt-header-row">
                <div>
                  <span className="receipt-meta-label">Order Number</span>
                  <p className="receipt-meta-value highlight">{orderSummary.orderId}</p>
                </div>
                <div>
                  <span className="receipt-meta-label">Date & Time</span>
                  <p className="receipt-meta-value">{orderSummary.date}</p>
                </div>
                <div>
                  <span className="receipt-meta-label">Payment Mode</span>
                  <p className="receipt-meta-value payment-tag">{orderSummary.paymentMethod}</p>
                </div>
              </div>

              <div className="receipt-divider"></div>

              <div className="receipt-address-box">
                <h4>🌿 Shipping & Delivery Address</h4>
                <p><strong>{orderSummary.customer.name}</strong> ({orderSummary.customer.phone})</p>
                <p>{orderSummary.customer.address}, {orderSummary.customer.city}, {orderSummary.customer.state} - {orderSummary.customer.zip}</p>
                <span className="shipping-estimate-pill">⚡ Expected Nursery Dispatch: Within 24-48 Hours</span>
              </div>

              <div className="receipt-items-list">
                <h4>Ordered Plants ({orderSummary.totalQuantity})</h4>
                {orderSummary.items.map((item) => (
                  <div className="receipt-item-row" key={item.name}>
                    <img src={item.image} alt={item.name} className="receipt-thumb" />
                    <div className="receipt-item-info">
                      <span className="receipt-item-name">{item.name}</span>
                      <span className="receipt-item-calc">{item.quantity} &times; {item.cost}</span>
                    </div>
                    <span className="receipt-item-subtotal">
                      ${(parseFloat(item.cost.toString().replace(/[^0-9.-]+/g, '')) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="receipt-totals-section">
                <div className="receipt-total-row">
                  <span>Plant Subtotal</span>
                  <span>${orderSummary.totalAmount}</span>
                </div>
                <div className="receipt-total-row">
                  <span>Eco-Packaging & Shipping</span>
                  <span className="free-tag">FREE</span>
                </div>
                <div className="receipt-total-row final">
                  <span>Grand Total Paid</span>
                  <span>${orderSummary.totalAmount}</span>
                </div>
              </div>
            </div>

            <div className="success-actions-row">
              <button type="button" className="print-receipt-btn" onClick={() => window.print()}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 6 2 18 2 18 9"></polyline>
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                  <rect x="6" y="14" width="12" height="8"></rect>
                </svg>
                Print Receipt
              </button>
              <button 
                type="button" 
                className="return-catalog-btn"
                onClick={() => {
                  if (onOrderComplete) onOrderComplete();
                  onClose();
                }}
              >
                Continue Browsing Plants &rarr;
              </button>
            </div>
          </div>
        )}

        {status === 'form' && (
          <form className="checkout-form-layout" onSubmit={handleSubmitOrder}>
            <div className="checkout-left-column">
              <header className="checkout-header">
                <div className="checkout-logo-pill">
                  <span>🌱</span> Paradise Nursery Checkout
                </div>
                <h2 id="checkout-title" className="checkout-heading">Shipping & Secure Payment</h2>
                <p className="checkout-desc">Enter your delivery address and choose your preferred payment option below.</p>
              </header>

              {/* 1. Delivery Details */}
              <section className="checkout-section">
                <h3 className="section-title">
                  <span className="step-num">1</span> Delivery Information
                </h3>

                <div className="form-grid">
                  <div className="form-group full-width">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="e.g. Jane Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={formErrors.name ? 'input-error' : ''}
                    />
                    {formErrors.name && <span className="field-error-msg">{formErrors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={formErrors.email ? 'input-error' : ''}
                    />
                    {formErrors.email && <span className="field-error-msg">{formErrors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={formErrors.phone ? 'input-error' : ''}
                    />
                    {formErrors.phone && <span className="field-error-msg">{formErrors.phone}</span>}
                  </div>

                  <div className="form-group full-width">
                    <label htmlFor="address">Street Address *</label>
                    <input
                      id="address"
                      type="text"
                      name="address"
                      placeholder="Apartment, suite, or street address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={formErrors.address ? 'input-error' : ''}
                    />
                    {formErrors.address && <span className="field-error-msg">{formErrors.address}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="city">City *</label>
                    <input
                      id="city"
                      type="text"
                      name="city"
                      placeholder="San Francisco"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={formErrors.city ? 'input-error' : ''}
                    />
                    {formErrors.city && <span className="field-error-msg">{formErrors.city}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="state">State / Province</label>
                    <input
                      id="state"
                      type="text"
                      name="state"
                      placeholder="California"
                      value={formData.state}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="zip">ZIP / Postal Code *</label>
                    <input
                      id="zip"
                      type="text"
                      name="zip"
                      placeholder="94103"
                      value={formData.zip}
                      onChange={handleInputChange}
                      className={formErrors.zip ? 'input-error' : ''}
                    />
                    {formErrors.zip && <span className="field-error-msg">{formErrors.zip}</span>}
                  </div>
                </div>
              </section>

              {/* 2. Payment Method */}
              <section className="checkout-section">
                <h3 className="section-title">
                  <span className="step-num">2</span> Payment Method
                </h3>

                <div className="payment-options-grid" role="radiogroup" aria-label="Payment Method Selection">
                  {/* UPI / QR Option */}
                  <label className={`payment-option-card ${paymentMethod === 'upi' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                    />
                    <div className="payment-option-content">
                      <div className="payment-icon-badge">📱</div>
                      <div>
                        <strong>UPI & Online QR Code</strong>
                        <p>Instant scan & pay via Google Pay, PhonePe, Paytm</p>
                      </div>
                    </div>
                    <span className="popular-tag">Recommended</span>
                  </label>

                  {/* Card Option */}
                  <label className={`payment-option-card ${paymentMethod === 'card' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                    />
                    <div className="payment-option-content">
                      <div className="payment-icon-badge">💳</div>
                      <div>
                        <strong>Credit / Debit Card</strong>
                        <p>Visa, Mastercard, RuPay, Amex</p>
                      </div>
                    </div>
                  </label>

                  {/* Net Banking Option */}
                  <label className={`payment-option-card ${paymentMethod === 'netbanking' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="netbanking"
                      checked={paymentMethod === 'netbanking'}
                      onChange={() => setPaymentMethod('netbanking')}
                    />
                    <div className="payment-option-content">
                      <div className="payment-icon-badge">🏦</div>
                      <div>
                        <strong>Net Banking</strong>
                        <p>All major banks supported</p>
                      </div>
                    </div>
                  </label>

                  {/* COD Option */}
                  <label className={`payment-option-card ${paymentMethod === 'cod' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                    />
                    <div className="payment-option-content">
                      <div className="payment-icon-badge">💵</div>
                      <div>
                        <strong>Cash on Delivery</strong>
                        <p>Pay cash or card when plants arrive</p>
                      </div>
                    </div>
                  </label>
                </div>

                {/* Sub-Panel: UPI & QR Code */}
                {paymentMethod === 'upi' && (
                  <div className="payment-method-details upi-box">
                    <div className="upi-qr-wrapper">
                      <div className="qr-container">
                        <div className="qr-scan-lens">
                          {/* QR Image with SVG fallback */}
                          <img
                            src={onlineQrUrl}
                            alt="Scan QR code to pay Paradise Nursery"
                            className="qr-image"
                            onError={(e) => {
                              // If external QR service is unreachable, render embedded SVG QR code
                              e.currentTarget.onerror = null;
                              e.currentTarget.style.display = 'none';
                              const svgElem = document.getElementById('fallback-svg-qr');
                              if (svgElem) svgElem.style.display = 'block';
                            }}
                          />
                          {/* Embedded SVG QR code fallback */}
                          <svg
                            id="fallback-svg-qr"
                            className="qr-svg-fallback"
                            viewBox="0 0 100 100"
                            style={{ display: 'none', width: '100%', height: '100%' }}
                          >
                            <rect width="100" height="100" fill="#ffffff" />
                            {/* Finder pattern Top-Left */}
                            <rect x="10" y="10" width="25" height="25" fill="#1b4332" />
                            <rect x="15" y="15" width="15" height="15" fill="#ffffff" />
                            <rect x="19" y="19" width="7" height="7" fill="#1b4332" />
                            {/* Finder pattern Top-Right */}
                            <rect x="65" y="10" width="25" height="25" fill="#1b4332" />
                            <rect x="70" y="15" width="15" height="15" fill="#ffffff" />
                            <rect x="74" y="19" width="7" height="7" fill="#1b4332" />
                            {/* Finder pattern Bottom-Left */}
                            <rect x="10" y="65" width="25" height="25" fill="#1b4332" />
                            <rect x="15" y="70" width="15" height="15" fill="#ffffff" />
                            <rect x="19" y="74" width="7" height="7" fill="#1b4332" />
                            {/* Simulated matrix pixels */}
                            <rect x="42" y="12" width="6" height="6" fill="#1b4332" />
                            <rect x="52" y="12" width="6" height="6" fill="#1b4332" />
                            <rect x="42" y="24" width="6" height="6" fill="#1b4332" />
                            <rect x="50" y="30" width="6" height="6" fill="#1b4332" />
                            <rect x="12" y="42" width="6" height="6" fill="#1b4332" />
                            <rect x="24" y="42" width="6" height="6" fill="#1b4332" />
                            <rect x="36" y="42" width="6" height="6" fill="#1b4332" />
                            <rect x="48" y="42" width="6" height="6" fill="#1b4332" />
                            <rect x="60" y="42" width="6" height="6" fill="#1b4332" />
                            <rect x="72" y="42" width="6" height="6" fill="#1b4332" />
                            <rect x="84" y="42" width="6" height="6" fill="#1b4332" />
                            <rect x="42" y="52" width="6" height="6" fill="#1b4332" />
                            <rect x="52" y="52" width="6" height="6" fill="#1b4332" />
                            <rect x="42" y="64" width="6" height="6" fill="#1b4332" />
                            <rect x="64" y="64" width="6" height="6" fill="#1b4332" />
                            <rect x="76" y="64" width="6" height="6" fill="#1b4332" />
                            <rect x="50" y="76" width="6" height="6" fill="#1b4332" />
                            <rect x="68" y="76" width="6" height="6" fill="#1b4332" />
                            <rect x="80" y="76" width="6" height="6" fill="#1b4332" />
                            {/* Center plant icon */}
                            <circle cx="50" cy="50" r="11" fill="#2d6a4f" />
                            <path d="M50 43 C54 46, 56 50, 50 55 C44 50, 46 46, 50 43 Z" fill="#95d5b2" />
                          </svg>
                          <div className="qr-scan-line"></div>
                        </div>
                        <span className="qr-amount-caption">Pay Exactly <strong>${totalAmount}</strong></span>
                      </div>

                      <div className="upi-instructions">
                        <h4>Scan with Any UPI / Mobile Banking App</h4>
                        <div className="upi-apps-badges">
                          <span className="app-badge">Google Pay</span>
                          <span className="app-badge">PhonePe</span>
                          <span className="app-badge">Paytm</span>
                          <span className="app-badge">BHIM</span>
                          <span className="app-badge">Apple Pay</span>
                        </div>

                        <div className="upi-id-copy-row">
                          <span className="upi-label">UPI ID:</span>
                          <code className="upi-code">{upiId}</code>
                          <button type="button" className="copy-btn" onClick={copyUpiId}>
                            {upiCopied ? '✓ Copied' : 'Copy'}
                          </button>
                        </div>

                        <div className="form-group" style={{ marginTop: '0.85rem' }}>
                          <label htmlFor="upiRef">UPI Reference / UTR Number (Optional)</label>
                          <div className="upi-input-group">
                            <input
                              id="upiRef"
                              type="text"
                              placeholder="e.g. 339482910482"
                              value={upiRef}
                              onChange={(e) => setUpiRef(e.target.value)}
                            />
                            <button
                              type="button"
                              className="simulate-pay-btn"
                              onClick={() => setUpiRef(`UTR-${Math.floor(100000000000 + Math.random() * 900000000000)}`)}
                            >
                              Auto-Fill Reference
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Sub-Panel: Card Details */}
                {paymentMethod === 'card' && (
                  <div className="payment-method-details">
                    <div className="form-grid">
                      <div className="form-group full-width">
                        <label htmlFor="cardNumber">Card Number *</label>
                        <input
                          id="cardNumber"
                          type="text"
                          name="cardNumber"
                          placeholder="4532 •••• •••• 8821"
                          value={cardData.cardNumber}
                          onChange={handleCardChange}
                          className={formErrors.cardNumber ? 'input-error' : ''}
                        />
                        {formErrors.cardNumber && <span className="field-error-msg">{formErrors.cardNumber}</span>}
                      </div>

                      <div className="form-group full-width">
                        <label htmlFor="cardName">Cardholder Name *</label>
                        <input
                          id="cardName"
                          type="text"
                          name="cardName"
                          placeholder="Jane Doe"
                          value={cardData.cardName}
                          onChange={handleCardChange}
                          className={formErrors.cardName ? 'input-error' : ''}
                        />
                        {formErrors.cardName && <span className="field-error-msg">{formErrors.cardName}</span>}
                      </div>

                      <div className="form-group">
                        <label htmlFor="expiry">Expiry Date *</label>
                        <input
                          id="expiry"
                          type="text"
                          name="expiry"
                          placeholder="MM/YY"
                          value={cardData.expiry}
                          onChange={handleCardChange}
                          className={formErrors.expiry ? 'input-error' : ''}
                        />
                        {formErrors.expiry && <span className="field-error-msg">{formErrors.expiry}</span>}
                      </div>

                      <div className="form-group">
                        <label htmlFor="cvv">CVV / CVC *</label>
                        <input
                          id="cvv"
                          type="password"
                          name="cvv"
                          placeholder="•••"
                          value={cardData.cvv}
                          onChange={handleCardChange}
                          className={formErrors.cvv ? 'input-error' : ''}
                        />
                        {formErrors.cvv && <span className="field-error-msg">{formErrors.cvv}</span>}
                      </div>
                    </div>
                  </div>
                )}

                {/* Sub-Panel: Net Banking */}
                {paymentMethod === 'netbanking' && (
                  <div className="payment-method-details">
                    <label htmlFor="bankSelect">Choose Your Bank</label>
                    <select
                      id="bankSelect"
                      className="bank-select"
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                    >
                      <option value="HDFC Bank">HDFC Bank</option>
                      <option value="State Bank of India">State Bank of India (SBI)</option>
                      <option value="ICICI Bank">ICICI Bank</option>
                      <option value="Axis Bank">Axis Bank</option>
                      <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                      <option value="Chase / Bank of America">Chase / Bank of America</option>
                      <option value="Other National Bank">Other National Bank</option>
                    </select>
                    <p className="bank-info-note">You will be securely redirected to your bank portal to authenticate.</p>
                  </div>
                )}

                {/* Sub-Panel: COD */}
                {paymentMethod === 'cod' && (
                  <div className="payment-method-details cod-box">
                    <p>
                      📦 <strong>Pay upon doorstep arrival:</strong> Our eco-courier will bring a mobile card terminal and UPI QR scanner alongside cash collection options.
                    </p>
                  </div>
                )}
              </section>
            </div>

            {/* Right Column: Order Summary */}
            <div className="checkout-right-column">
              <div className="order-summary-panel">
                <h3 className="summary-title">Order Summary ({totalQuantity} Plants)</h3>

                <div className="summary-items-scroll">
                  {cartItems.map((item) => (
                    <div className="summary-item-card" key={item.name}>
                      <img src={item.image} alt={item.name} className="summary-item-img" />
                      <div className="summary-item-meta">
                        <span className="summary-item-name">{item.name}</span>
                        <span className="summary-item-qty">Qty: {item.quantity} &times; {item.cost}</span>
                      </div>
                      <span className="summary-item-price">
                        ${(parseFloat(item.cost.toString().replace(/[^0-9.-]+/g, '')) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="summary-cost-breakdown">
                  <div className="cost-row">
                    <span>Plants Subtotal</span>
                    <span>${totalAmount}</span>
                  </div>
                  <div className="cost-row">
                    <span>Eco Shipping & Packaging</span>
                    <span className="free-text">FREE</span>
                  </div>
                  <div className="cost-row">
                    <span>Taxes & Handling</span>
                    <span>$0.00</span>
                  </div>
                  <div className="cost-row grand-total">
                    <span>Grand Total</span>
                    <span>${totalAmount}</span>
                  </div>
                </div>

                <div className="guarantee-box">
                  <div className="guarantee-item">
                    <span>🌿</span> 100% Thriving Plant Guarantee
                  </div>
                  <div className="guarantee-item">
                    <span>🛡️</span> 256-Bit SSL Encrypted Checkout
                  </div>
                </div>

                <button type="submit" className="confirm-order-btn">
                  Confirm & Pay ${totalAmount} &rarr;
                </button>

                <p className="terms-microcopy">
                  By confirming, you agree to Paradise Nursery's Care & Delivery Terms.
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default CheckoutModal;
