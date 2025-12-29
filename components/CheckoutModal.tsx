import React, { useState } from 'react';
import { X, CreditCard, ShoppingBag, CheckCircle, ArrowLeft, Smartphone, Landmark } from 'lucide-react';
import { CartItem, Language, ShippingDetails } from '../types';
import { TRANSLATIONS } from '../utils/i18n';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  language: Language;
  onPlaceOrder: (details: ShippingDetails) => void;
}

type PaymentMethod = 'credit_card' | 'paypal' | 'crypto' | 'nequi' | 'bancolombia';
type Step = 'shipping' | 'payment' | 'review' | 'success';

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, cartItems, language, onPlaceOrder }) => {
  const t = TRANSLATIONS[language].checkout;
  const [step, setStep] = useState<Step>('shipping');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit_card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState('');

  const [shipping, setShipping] = useState<ShippingDetails>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    country: '',
    zip: '',
    phone: ''
  });

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const shippingCost = 0; // Free shipping
  const tax = subtotal * 0.1; // Estimated 10% tax
  const total = subtotal + shippingCost + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShipping(prev => ({ ...prev, [name]: value }));
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (Object.values(shipping).every((val) => (val as string).trim() !== '')) {
      setStep('payment');
    }
  };

  const handlePaymentSubmit = () => {
    setStep('review');
  };

  const handleFinalOrder = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      const newOrderId = Math.floor(Math.random() * 100000).toString();
      setOrderId(newOrderId);
      setStep('success');
      onPlaceOrder(shipping);
    }, 2000);
  };

  const renderProgress = () => {
    const steps = [t.steps.shipping, t.steps.payment, t.steps.review];
    const currentIdx = ['shipping', 'payment', 'review', 'success'].indexOf(step);

    return (
      <div className="flex items-center justify-center mb-8">
        {steps.map((label, idx) => (
          <React.Fragment key={label}>
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                idx <= currentIdx ? 'bg-sun8-gold text-sun8-navy' : 'bg-sun8-navyLight text-sun8-ivory/30'
              }`}>
                {idx < currentIdx ? <CheckCircle size={14} /> : idx + 1}
              </div>
              <span className={`text-[10px] uppercase tracking-wider mt-2 ${idx <= currentIdx ? 'text-sun8-gold' : 'text-sun8-navy/30'}`}>
                {label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div className={`w-12 h-[1px] mx-2 mb-4 ${idx < currentIdx ? 'bg-sun8-gold' : 'bg-sun8-navy/10'}`} />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  const renderShippingStep = () => (
    <form onSubmit={handleShippingSubmit} className="animate-fade-in">
      <h3 className="font-serif text-xl text-sun8-navy mb-6">{t.shipping.title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input required name="firstName" value={shipping.firstName} onChange={handleInputChange} placeholder={t.shipping.firstName} className="p-3 border border-sun8-navy/20 rounded-sm focus:border-sun8-gold outline-none bg-white" />
        <input required name="lastName" value={shipping.lastName} onChange={handleInputChange} placeholder={t.shipping.lastName} className="p-3 border border-sun8-navy/20 rounded-sm focus:border-sun8-gold outline-none bg-white" />
        <input required type="email" name="email" value={shipping.email} onChange={handleInputChange} placeholder={t.shipping.email} className="p-3 border border-sun8-navy/20 rounded-sm focus:border-sun8-gold outline-none bg-white md:col-span-2" />
        <input required name="address" value={shipping.address} onChange={handleInputChange} placeholder={t.shipping.address} className="p-3 border border-sun8-navy/20 rounded-sm focus:border-sun8-gold outline-none bg-white md:col-span-2" />
        <input required name="city" value={shipping.city} onChange={handleInputChange} placeholder={t.shipping.city} className="p-3 border border-sun8-navy/20 rounded-sm focus:border-sun8-gold outline-none bg-white" />
        <input required name="country" value={shipping.country} onChange={handleInputChange} placeholder={t.shipping.country} className="p-3 border border-sun8-navy/20 rounded-sm focus:border-sun8-gold outline-none bg-white" />
        <input required name="zip" value={shipping.zip} onChange={handleInputChange} placeholder={t.shipping.zip} className="p-3 border border-sun8-navy/20 rounded-sm focus:border-sun8-gold outline-none bg-white" />
        <input required name="phone" value={shipping.phone} onChange={handleInputChange} placeholder={t.shipping.phone} className="p-3 border border-sun8-navy/20 rounded-sm focus:border-sun8-gold outline-none bg-white" />
      </div>
      <div className="mt-8 flex justify-end">
        <button type="submit" className="bg-sun8-navy text-white px-8 py-3 font-bold uppercase tracking-widest hover:bg-sun8-gold transition-colors">
          {t.next}
        </button>
      </div>
    </form>
  );

  const renderPaymentStep = () => (
    <div className="animate-fade-in">
      <h3 className="font-serif text-xl text-sun8-navy mb-6">{t.payment.title}</h3>
      
      <div className="grid grid-cols-3 gap-3 mb-8">
        <button 
          onClick={() => setPaymentMethod('credit_card')}
          className={`p-3 border rounded-sm flex flex-col items-center gap-2 transition-all ${paymentMethod === 'credit_card' ? 'border-sun8-gold bg-sun8-gold/5 text-sun8-navy' : 'border-sun8-navy/10 text-sun8-navy/50 hover:border-sun8-navy/30'}`}
        >
          <CreditCard size={20} />
          <span className="text-[10px] font-bold uppercase">{t.payment.creditCard}</span>
        </button>
        
        <button 
          onClick={() => setPaymentMethod('paypal')}
          className={`p-3 border rounded-sm flex flex-col items-center gap-2 transition-all ${paymentMethod === 'paypal' ? 'border-sun8-gold bg-sun8-gold/5 text-sun8-navy' : 'border-sun8-navy/10 text-sun8-navy/50 hover:border-sun8-navy/30'}`}
        >
          <span className="font-serif text-lg italic font-bold">Pay</span>
          <span className="text-[10px] font-bold uppercase">{t.payment.paypal}</span>
        </button>
        
        <button 
          onClick={() => setPaymentMethod('crypto')}
          className={`p-3 border rounded-sm flex flex-col items-center gap-2 transition-all ${paymentMethod === 'crypto' ? 'border-sun8-gold bg-sun8-gold/5 text-sun8-navy' : 'border-sun8-navy/10 text-sun8-navy/50 hover:border-sun8-navy/30'}`}
        >
          <span className="font-bold text-lg">₿</span>
          <span className="text-[10px] font-bold uppercase">{t.payment.crypto}</span>
        </button>

        <button 
            onClick={() => setPaymentMethod('nequi')}
            className={`p-3 border rounded-sm flex flex-col items-center gap-2 transition-all ${paymentMethod === 'nequi' ? 'border-pink-700 bg-pink-50 text-pink-900 shadow-sm' : 'border-sun8-navy/10 text-sun8-navy/50 hover:border-pink-300 hover:text-pink-700'}`}
        >
            <div className="w-6 h-6 bg-[#200020] text-white flex items-center justify-center rounded-full text-[8px] font-bold">N</div>
            <span className="text-[10px] font-bold uppercase">{t.payment.nequi}</span>
        </button>

        <button 
            onClick={() => setPaymentMethod('bancolombia')}
            className={`p-3 border rounded-sm flex flex-col items-center gap-2 transition-all ${paymentMethod === 'bancolombia' ? 'border-yellow-400 bg-yellow-50 text-black shadow-sm' : 'border-sun8-navy/10 text-sun8-navy/50 hover:border-yellow-300 hover:text-yellow-700'}`}
        >
            <div className="w-6 h-6 bg-[#FDDA24] text-black flex items-center justify-center rounded-sm text-[8px] font-bold border border-black">B</div>
            <span className="text-[10px] font-bold uppercase">{t.payment.bancolombia}</span>
        </button>
      </div>

      {paymentMethod === 'credit_card' && (
        <div className="space-y-4">
          <input placeholder={t.payment.cardName} className="w-full p-3 border border-sun8-navy/20 rounded-sm focus:border-sun8-gold outline-none bg-white" />
          <input placeholder={t.payment.cardNumber} className="w-full p-3 border border-sun8-navy/20 rounded-sm focus:border-sun8-gold outline-none bg-white" />
          <div className="grid grid-cols-2 gap-4">
            <input placeholder={t.payment.expiry} className="p-3 border border-sun8-navy/20 rounded-sm focus:border-sun8-gold outline-none bg-white" />
            <input placeholder={t.payment.cvc} className="p-3 border border-sun8-navy/20 rounded-sm focus:border-sun8-gold outline-none bg-white" />
          </div>
        </div>
      )}

      {paymentMethod === 'nequi' && (
          <div className="space-y-4 bg-pink-50 p-6 rounded-sm border border-pink-100">
              <div className="flex items-center gap-3 mb-2">
                  <Smartphone className="text-[#200020]" size={24} />
                  <h4 className="font-bold text-[#200020]">Nequi</h4>
              </div>
              <p className="text-sm text-sun8-navy/70 mb-2">{t.payment.nequiInstruction}</p>
              <input placeholder={t.payment.phoneNumber} type="tel" className="w-full p-3 border border-sun8-navy/20 rounded-sm focus:border-pink-500 outline-none bg-white" />
          </div>
      )}

      {paymentMethod === 'bancolombia' && (
          <div className="space-y-4 bg-yellow-50 p-6 rounded-sm border border-yellow-100">
               <div className="flex items-center gap-3 mb-2">
                  <Landmark className="text-black" size={24} />
                  <h4 className="font-bold text-black">Bancolombia</h4>
              </div>
              <p className="text-sm text-sun8-navy/70 mb-2">{t.payment.bancolombiaInstruction}</p>
              <div className="grid grid-cols-2 gap-4">
                  <select className="p-3 border border-sun8-navy/20 rounded-sm focus:border-yellow-500 outline-none bg-white">
                      <option value="savings">{t.payment.savings}</option>
                      <option value="current">{t.payment.current}</option>
                  </select>
                  <input placeholder={t.payment.accountNumber} type="number" className="p-3 border border-sun8-navy/20 rounded-sm focus:border-yellow-500 outline-none bg-white" />
              </div>
          </div>
      )}

      {paymentMethod === 'paypal' && (
        <div className="bg-gray-50 p-8 text-center border border-dashed border-sun8-navy/20 rounded-sm">
          <p className="text-sun8-navy/60 text-sm">You will be redirected to PayPal to complete your purchase securely.</p>
        </div>
      )}

      {paymentMethod === 'crypto' && (
        <div className="bg-gray-50 p-8 text-center border border-dashed border-sun8-navy/20 rounded-sm">
          <p className="text-sun8-navy/60 text-sm">Scan QR code with your wallet (BTC/ETH/USDT supported).</p>
        </div>
      )}

      <div className="mt-8 flex justify-between">
        <button onClick={() => setStep('shipping')} className="text-sun8-navy/50 hover:text-sun8-navy flex items-center gap-2 font-medium text-sm">
          <ArrowLeft size={16} /> {t.back}
        </button>
        <button onClick={handlePaymentSubmit} className="bg-sun8-navy text-white px-8 py-3 font-bold uppercase tracking-widest hover:bg-sun8-gold transition-colors">
          {t.next}
        </button>
      </div>
    </div>
  );

  const renderReviewStep = () => (
    <div className="animate-fade-in">
       <h3 className="font-serif text-xl text-sun8-navy mb-6">{t.review.title}</h3>
       
       <div className="bg-gray-50 p-6 rounded-sm mb-6">
         <div className="flex justify-between mb-4 text-sm border-b border-sun8-navy/10 pb-4">
            <div className="text-sun8-navy/60">
                <p className="font-bold uppercase text-xs mb-1">{t.steps.shipping}</p>
                <p>{shipping.firstName} {shipping.lastName}</p>
                <p>{shipping.address}</p>
                <p>{shipping.city}, {shipping.country}</p>
            </div>
            <button onClick={() => setStep('shipping')} className="text-sun8-gold underline text-xs">Edit</button>
         </div>
         
         <div className="flex justify-between text-sm">
            <div className="text-sun8-navy/60">
                <p className="font-bold uppercase text-xs mb-1">{t.steps.payment}</p>
                <p className="capitalize">{paymentMethod.replace('_', ' ')}</p>
            </div>
            <button onClick={() => setStep('payment')} className="text-sun8-gold underline text-xs">Edit</button>
         </div>
       </div>

       <div className="space-y-3 mb-6 max-h-48 overflow-y-auto custom-scrollbar">
         {cartItems.map(item => (
            <div key={item.id} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-sm overflow-hidden border border-sun8-navy/10">
                        <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <p className="text-sun8-navy font-medium">{item.title}</p>
                        <p className="text-sun8-navy/40 text-xs">Qty: {item.qty}</p>
                    </div>
                </div>
                <p className="font-medium">${(item.price * item.qty).toLocaleString()}</p>
            </div>
         ))}
       </div>

       <div className="border-t border-sun8-navy/10 pt-4 space-y-2">
            <div className="flex justify-between text-sm text-sun8-navy/60">
                <span>{t.review.items}</span>
                <span>${subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-sun8-navy/60">
                <span>{t.review.shippingCost}</span>
                <span>Free</span>
            </div>
            <div className="flex justify-between text-sm text-sun8-navy/60">
                <span>{t.review.tax} (10%)</span>
                <span>${tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-lg font-serif font-bold text-sun8-navy pt-2 border-t border-sun8-navy/10 mt-2">
                <span>{t.review.total}</span>
                <span>${total.toLocaleString()}</span>
            </div>
       </div>

       <div className="mt-8 flex justify-between">
        <button onClick={() => setStep('payment')} className="text-sun8-navy/50 hover:text-sun8-navy flex items-center gap-2 font-medium text-sm">
          <ArrowLeft size={16} /> {t.back}
        </button>
        <button 
            onClick={handleFinalOrder} 
            disabled={isProcessing}
            className="bg-sun8-gold text-sun8-navy px-8 py-3 font-bold uppercase tracking-widest hover:bg-white hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
        >
            {isProcessing ? t.errors.processing : t.review.placeOrder}
        </button>
      </div>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="flex flex-col items-center justify-center text-center py-12 animate-fade-in">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white mb-6 shadow-lg">
            <CheckCircle size={40} />
        </div>
        <h2 className="font-serif text-3xl text-sun8-navy mb-4">{t.success.title}</h2>
        <p className="text-sun8-navy/60 max-w-md mb-2">
            {t.success.message.replace('{id}', orderId)}
        </p>
        <p className="text-sun8-navy/60 text-sm mb-8">
            {t.success.email.replace('{email}', shipping.email)}
        </p>
        <button 
            onClick={onClose}
            className="bg-sun8-navy text-white px-8 py-3 font-bold uppercase tracking-widest hover:bg-sun8-gold transition-colors"
        >
            {t.success.continue}
        </button>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4 animate-fade-in backdrop-blur-sm">
      <div className="bg-sun8-ivory w-full max-w-2xl rounded-lg shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-white border-b border-sun8-navy/10 flex justify-between items-center">
            <h2 className="font-serif text-xl text-sun8-navy flex items-center gap-2">
                <ShoppingBag size={20} className="text-sun8-gold" />
                {t.title}
            </h2>
            {step !== 'success' && (
                <button onClick={onClose} className="text-sun8-navy/40 hover:text-sun8-navy">
                    <X size={24} />
                </button>
            )}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
            {step !== 'success' && renderProgress()}
            
            {step === 'shipping' && renderShippingStep()}
            {step === 'payment' && renderPaymentStep()}
            {step === 'review' && renderReviewStep()}
            {step === 'success' && renderSuccessStep()}
        </div>
      </div>
    </div>
  );
};