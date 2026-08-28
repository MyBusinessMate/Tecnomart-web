"use client";

import React, { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  CreditCard,
  QrCode,
  Building,
  Banknote,
  Printer,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  MapPin,
  User,
  Phone,
  Mail,
  Check
} from 'lucide-react';

export default function CheckoutModal() {
  const {
    cart,
    cartSubtotal,
    discountAmount,
    shippingFee,
    totalPayable,
    isCheckoutOpen,
    setIsCheckoutOpen,
    clearCart,
    locationPincode,
  } = useShop();

  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success Invoice
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: 'Hyderabad',
    pincode: locationPincode || '500033',
    notes: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking' | 'cod'
  const [placedOrder, setPlacedOrder] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address) {
      alert('Please fill in your name, phone number, and delivery address.');
      return;
    }
    setStep(2);
  };

  const handlePlaceOrder = () => {
    const orderId = `TM-HYD-${Math.floor(100000 + Math.random() * 900000)}`;
    const order = {
      orderId,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      customer: { ...formData },
      items: [...cart],
      paymentMethod:
        paymentMethod === 'upi'
          ? 'UPI Instant (GPay/PhonePe)'
          : paymentMethod === 'card'
          ? 'Credit / Debit Card'
          : paymentMethod === 'netbanking'
          ? 'Netbanking'
          : 'Cash on Delivery',
      subtotal: cartSubtotal,
      discount: discountAmount,
      shipping: shippingFee,
      total: totalPayable,
    };

    setPlacedOrder(order);
    clearCart();
    setStep(3);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep(1);
    setPlacedOrder(null);
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-neutral-200 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-neutral-950 text-white p-4 sm:p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center font-black text-sm">
                  {step}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black uppercase tracking-wider">
                    {step === 1
                      ? 'Step 1: Delivery Details'
                      : step === 2
                      ? 'Step 2: Choose Payment Method'
                      : 'Order Invoice & Receipt'}
                  </h3>
                  <p className="text-[11px] text-neutral-400 font-medium">
                    TecnoMart Express Hyderabad Fulfillment
                  </p>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-neutral-300 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* STEP 1: SHIPPING ADDRESS */}
            {step === 1 && (
              <form onSubmit={handleShippingSubmit} className="p-5 sm:p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        name="fullName"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full h-10 pl-9 pr-3 text-xs bg-neutral-50 border border-neutral-300 rounded-xl outline-none focus:border-amber-500 font-semibold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                      Mobile Number (For WhatsApp Updates) *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="e.g. 9876543210"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full h-10 pl-9 pr-3 text-xs bg-neutral-50 border border-neutral-300 rounded-xl outline-none focus:border-amber-500 font-semibold"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                      Email Address (For Invoice PDF)
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        name="email"
                        placeholder="rahul@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full h-10 pl-9 pr-3 text-xs bg-neutral-50 border border-neutral-300 rounded-xl outline-none focus:border-amber-500 font-semibold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                      Hyderabad Pincode *
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        name="pincode"
                        required
                        maxLength={6}
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="w-full h-10 pl-9 pr-3 text-xs bg-neutral-50 border border-neutral-300 rounded-xl outline-none focus:border-amber-500 font-semibold"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                    Street Address &amp; Landmark *
                  </label>
                  <textarea
                    name="address"
                    required
                    rows={2}
                    placeholder="Flat / House No., Building Name, Street, Landmark in Hyderabad"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full p-3 text-xs bg-neutral-50 border border-neutral-300 rounded-xl outline-none focus:border-amber-500 font-semibold resize-none"
                  />
                </div>

                {/* Order Preview Box */}
                <div className="p-3.5 bg-amber-50/60 rounded-2xl border border-amber-200/80 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="font-bold text-neutral-800">Order Summary: </span>
                    <span className="font-medium text-neutral-600">
                      {cart.length} item(s) to be dispatched
                    </span>
                  </div>
                  <span className="text-sm font-black text-neutral-950">
                    Total: ₹{totalPayable.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 min-h-[44px] bg-amber-500 hover:bg-amber-600 text-neutral-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Continue to Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: PAYMENT METHOD */}
            {step === 2 && (
              <div className="p-5 sm:p-6 space-y-5">
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase text-neutral-500 tracking-wider">
                    Select Payment Option
                  </h4>

                  {/* Payment Options Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    
                    {/* Option 1: UPI / QR */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-4 rounded-2xl border flex items-start gap-3 transition-all text-left cursor-pointer ${
                        paymentMethod === 'upi'
                          ? 'border-amber-500 bg-amber-50/50 ring-2 ring-amber-500/20 shadow-xs'
                          : 'border-neutral-200 hover:border-neutral-300 bg-white'
                      }`}
                    >
                      <QrCode className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-black text-neutral-950 block">
                          Instant UPI QR Code
                        </span>
                        <span className="text-[11px] text-neutral-500 font-medium block">
                          Google Pay, PhonePe, Paytm, BHIM
                        </span>
                      </div>
                    </button>

                    {/* Option 2: Cards */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-4 rounded-2xl border flex items-start gap-3 transition-all text-left cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'border-amber-500 bg-amber-50/50 ring-2 ring-amber-500/20 shadow-xs'
                          : 'border-neutral-200 hover:border-neutral-300 bg-white'
                      }`}
                    >
                      <CreditCard className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-black text-neutral-950 block">
                          Credit / Debit Card / EMI
                        </span>
                        <span className="text-[11px] text-neutral-500 font-medium block">
                          Visa, Mastercard, RuPay, No-cost EMI
                        </span>
                      </div>
                    </button>

                    {/* Option 3: Netbanking */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('netbanking')}
                      className={`p-4 rounded-2xl border flex items-start gap-3 transition-all text-left cursor-pointer ${
                        paymentMethod === 'netbanking'
                          ? 'border-amber-500 bg-amber-50/50 ring-2 ring-amber-500/20 shadow-xs'
                          : 'border-neutral-200 hover:border-neutral-300 bg-white'
                      }`}
                    >
                      <Building className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-black text-neutral-950 block">
                          Net Banking
                        </span>
                        <span className="text-[11px] text-neutral-500 font-medium block">
                          HDFC, ICICI, SBI, Axis, Kotak
                        </span>
                      </div>
                    </button>

                    {/* Option 4: COD */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-4 rounded-2xl border flex items-start gap-3 transition-all text-left cursor-pointer ${
                        paymentMethod === 'cod'
                          ? 'border-amber-500 bg-amber-50/50 ring-2 ring-amber-500/20 shadow-xs'
                          : 'border-neutral-200 hover:border-neutral-300 bg-white'
                      }`}
                    >
                      <Banknote className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-black text-neutral-950 block">
                          Pay on Delivery (Hyderabad)
                        </span>
                        <span className="text-[11px] text-neutral-500 font-medium block">
                          Cash / Card / UPI upon doorstep delivery
                        </span>
                      </div>
                    </button>
                  </div>

                  {/* Payment Details Container */}
                  {paymentMethod === 'upi' && (
                    <div className="p-4 bg-neutral-900 text-white rounded-2xl text-center space-y-2">
                      <span className="text-xs font-bold text-amber-400 block uppercase tracking-wider">
                        Scan QR Code with any UPI App
                      </span>
                      <div className="w-32 h-32 bg-white mx-auto rounded-xl p-2 flex items-center justify-center">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=tecnomart@upi%26pn=TecnoMart%26am=${totalPayable}`}
                          alt="UPI QR Code"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <p className="text-[11px] text-neutral-300 font-medium">
                        Payable Amount: <span className="font-bold text-white">₹{totalPayable.toLocaleString('en-IN')}</span>
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'card' && (
                    <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-3">
                      <input
                        type="text"
                        placeholder="Card Number (4532 •••• •••• 8890)"
                        className="w-full h-10 px-3 text-xs bg-white border border-neutral-300 rounded-xl outline-none font-medium"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full h-10 px-3 text-xs bg-white border border-neutral-300 rounded-xl outline-none font-medium"
                        />
                        <input
                          type="password"
                          maxLength={3}
                          placeholder="CVV"
                          className="w-full h-10 px-3 text-xs bg-white border border-neutral-300 rounded-xl outline-none font-medium"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-2 text-xs font-bold text-neutral-600 hover:text-neutral-900 flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={handlePlaceOrder}
                    className="px-8 min-h-[46px] bg-amber-500 hover:bg-amber-600 text-neutral-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Complete Order (₹{totalPayable.toLocaleString('en-IN')})</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: ORDER SUCCESS TAX INVOICE RECEIPT */}
            {step === 3 && placedOrder && (
              <div className="p-5 sm:p-8 space-y-6">
                <div className="text-center space-y-2">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-neutral-950 uppercase">
                    Order Placed Successfully!
                  </h3>
                  <p className="text-xs text-neutral-500 font-medium">
                    Order ID: <span className="font-bold text-neutral-900">{placedOrder.orderId}</span> • Dispatched from Tolichowki Store
                  </p>
                </div>

                {/* Printable Invoice Card */}
                <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-200 space-y-4 text-xs font-medium text-neutral-800">
                  <div className="flex justify-between items-start border-b border-neutral-200 pb-3">
                    <div>
                      <span className="font-black text-neutral-950 text-sm block">TECNOMART HYDERABAD</span>
                      <span>Plot 42, Tolichowki Main Rd, Hyderabad</span>
                      <span className="block text-neutral-500">GSTIN: 36ABCDE1234F1Z5</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold block">{placedOrder.date}</span>
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-black rounded uppercase">
                        CONFIRMED
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="font-bold text-neutral-500 uppercase text-[10px] block">Deliver To:</span>
                    <span className="font-bold text-neutral-950 text-xs block">{placedOrder.customer.fullName}</span>
                    <span>{placedOrder.customer.address}, {placedOrder.customer.pincode}</span>
                    <span className="block">Ph: {placedOrder.customer.phone}</span>
                  </div>

                  {/* Items list */}
                  <div className="space-y-1.5 pt-2 border-t border-neutral-200">
                    <span className="font-bold text-neutral-500 uppercase text-[10px] block">Ordered Items:</span>
                    {placedOrder.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span>{item.quantity}x {item.product.name} ({item.selectedConfig?.name || 'Standard'})</span>
                        <span className="font-bold">₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                  </div>

                  {/* Financial Breakdown */}
                  <div className="pt-3 border-t border-neutral-200 space-y-1 text-right">
                    <div>Subtotal: ₹{placedOrder.subtotal.toLocaleString('en-IN')}</div>
                    {placedOrder.discount > 0 && (
                      <div className="text-emerald-700 font-bold">Discount: -₹{placedOrder.discount.toLocaleString('en-IN')}</div>
                    )}
                    <div>Shipping: {placedOrder.shipping === 0 ? 'FREE' : `₹${placedOrder.shipping}`}</div>
                    <div className="text-sm font-black text-neutral-950 pt-1">
                      Total Paid: ₹{placedOrder.total.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                {/* Print & Close Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrint}
                    className="flex-1 min-h-[46px] bg-neutral-950 hover:bg-neutral-800 text-amber-400 font-black text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Tax Invoice / Receipt</span>
                  </button>

                  <button
                    onClick={handleClose}
                    className="px-6 min-h-[46px] bg-amber-500 hover:bg-amber-600 text-neutral-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-md cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
