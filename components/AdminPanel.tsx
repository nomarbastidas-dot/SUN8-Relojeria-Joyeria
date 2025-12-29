import React, { useState, useRef } from 'react';
import { X, Plus, Save, Trash2, Upload, Image as ImageIcon, Edit2 } from 'lucide-react';
import { Product, Language } from '../types';
import { TRANSLATIONS } from '../utils/i18n';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddProduct: (p: Product) => void;
  onUpdateProduct: (p: Product) => void;
  onDeleteProduct: (id: string) => void;
  language: Language;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ 
    isOpen, 
    onClose, 
    products, 
    onAddProduct, 
    onUpdateProduct, 
    onDeleteProduct,
    language 
}) => {
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = TRANSLATIONS[language].admin;

  if (!isOpen) return null;

  const handleNewProduct = () => {
    setEditingProduct({
        id: `new_${Date.now()}`,
        title: '',
        price: 0,
        category: 'watches',
        description: '',
        features: [],
        images: [],
        stock: 1
    });
  };

  const handleSave = () => {
    if (!editingProduct || !editingProduct.title) return;
    
    // Ensure fallback image if none provided
    const finalProduct = {
        ...editingProduct,
        images: editingProduct.images && editingProduct.images.length > 0 
            ? editingProduct.images 
            : ["https://images.unsplash.com/photo-1594534475808-b18fc33b045e?q=80&w=800&auto=format&fit=crop"]
    } as Product;

    // Check if it's an update or create
    const exists = products.some(p => p.id === finalProduct.id);
    if (exists) {
        onUpdateProduct(finalProduct);
    } else {
        onAddProduct(finalProduct);
    }
    setEditingProduct(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm(t.confirmDelete)) {
        onDeleteProduct(id);
        if (editingProduct?.id === id) {
            setEditingProduct(null);
        }
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingProduct) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result as string;
            setEditingProduct(prev => ({
                ...prev,
                images: prev?.images ? [...prev.images, base64] : [base64]
            }));
        };
        reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number) => {
    if (!editingProduct?.images) return;
    const newImages = [...editingProduct.images];
    newImages.splice(index, 1);
    setEditingProduct(prev => ({ ...prev, images: newImages }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-sun8-navyLight/95 flex items-center justify-center p-4 animate-fade-in backdrop-blur-sm">
      <div className="bg-white w-full max-w-6xl h-[90vh] rounded-lg shadow-2xl flex overflow-hidden">
        
        {/* Sidebar: List */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col bg-gray-50">
            <div className="p-6 border-b border-gray-200 bg-white">
                <h2 className="font-serif text-2xl text-sun8-navy mb-2">{t.title}</h2>
                <p className="text-sm text-gray-500">{t.subtitle}</p>
                <button 
                    onClick={handleNewProduct}
                    className="mt-4 w-full bg-sun8-navy text-white py-3 rounded-sm font-bold uppercase tracking-wide flex items-center justify-center gap-2 hover:bg-sun8-gold transition-colors"
                >
                    <Plus size={18} /> {t.addProduct}
                </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {products.map(p => (
                    <div 
                        key={p.id} 
                        onClick={() => setEditingProduct(p)}
                        className={`p-4 rounded-lg border transition-all cursor-pointer flex gap-3 ${editingProduct?.id === p.id ? 'border-sun8-gold bg-white shadow-md' : 'border-transparent bg-white hover:border-gray-300'}`}
                    >
                        <div className="w-12 h-12 bg-gray-200 rounded-sm overflow-hidden flex-shrink-0">
                            <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sun8-navy truncate">{p.title}</h4>
                            <p className="text-xs text-gray-500">${p.price.toLocaleString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Main: Editor */}
        <div className="flex-1 flex flex-col bg-white overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-bold text-lg text-sun8-navy">
                    {editingProduct ? (products.some(p=>p.id===editingProduct.id) ? t.editProduct : t.addProduct) : "Select a product"}
                </h3>
                <button onClick={onClose} className="text-gray-400 hover:text-sun8-navy">
                    <X size={24} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                {editingProduct ? (
                    <div className="space-y-6 max-w-3xl mx-auto">
                        {/* Images */}
                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-500 mb-3">{t.form.images}</label>
                            <div className="flex flex-wrap gap-4">
                                {editingProduct.images?.map((img, idx) => (
                                    <div key={idx} className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200 group">
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                        <button 
                                            onClick={() => removeImage(idx)}
                                            className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                                <button 
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:border-sun8-gold hover:text-sun8-gold transition-colors"
                                >
                                    <Upload size={20} />
                                    <span className="text-[10px] mt-1">{t.form.upload}</span>
                                </button>
                                <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    onChange={handleImageUpload} 
                                    className="hidden" 
                                    accept="image/*" 
                                />
                            </div>
                        </div>

                        {/* Basic Info */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">{t.form.title}</label>
                                <input 
                                    value={editingProduct.title || ''}
                                    onChange={e => setEditingProduct({...editingProduct, title: e.target.value})}
                                    className="w-full p-3 border border-gray-300 rounded focus:border-sun8-gold outline-none" 
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">{t.form.price}</label>
                                <input 
                                    type="number"
                                    value={editingProduct.price || ''}
                                    onChange={e => setEditingProduct({...editingProduct, price: Number(e.target.value)})}
                                    className="w-full p-3 border border-gray-300 rounded focus:border-sun8-gold outline-none" 
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">{t.form.category}</label>
                                <select 
                                    value={editingProduct.category || 'watches'}
                                    onChange={e => setEditingProduct({...editingProduct, category: e.target.value as any})}
                                    className="w-full p-3 border border-gray-300 rounded focus:border-sun8-gold outline-none" 
                                >
                                    <option value="watches">Watches</option>
                                    <option value="jewelry">Jewelry</option>
                                </select>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-500 mb-2">{t.form.description}</label>
                            <textarea 
                                value={editingProduct.description || ''}
                                onChange={e => setEditingProduct({...editingProduct, description: e.target.value})}
                                className="w-full p-3 border border-gray-300 rounded focus:border-sun8-gold outline-none h-32 resize-none" 
                            />
                        </div>

                        {/* Features & Stock */}
                        <div className="grid grid-cols-3 gap-6">
                             <div className="col-span-2">
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">{t.form.features}</label>
                                <input 
                                    value={editingProduct.features?.join(', ') || ''}
                                    onChange={e => setEditingProduct({...editingProduct, features: e.target.value.split(',').map(s => s.trim())})}
                                    placeholder="Sapphire Crystal, 18k Gold..."
                                    className="w-full p-3 border border-gray-300 rounded focus:border-sun8-gold outline-none" 
                                />
                             </div>
                             <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">{t.form.stock}</label>
                                <input 
                                    type="number"
                                    value={editingProduct.stock || 0}
                                    onChange={e => setEditingProduct({...editingProduct, stock: Number(e.target.value)})}
                                    className="w-full p-3 border border-gray-300 rounded focus:border-sun8-gold outline-none" 
                                />
                            </div>
                        </div>

                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400">
                        <Edit2 size={48} className="mb-4 opacity-20" />
                        <p>Select a product to edit or create a new one.</p>
                    </div>
                )}
            </div>

            {/* Footer Actions */}
            {editingProduct && (
                <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
                    {products.some(p => p.id === editingProduct.id) && (
                        <button 
                            onClick={() => handleDelete(editingProduct.id!)}
                            className="text-red-500 hover:text-red-700 text-sm font-bold flex items-center gap-2"
                        >
                            <Trash2 size={16} /> {t.delete}
                        </button>
                    )}
                    <div className="flex gap-4 ml-auto">
                        <button 
                            onClick={() => setEditingProduct(null)}
                            className="px-6 py-3 rounded border border-gray-300 text-gray-600 font-bold hover:bg-gray-100 transition-colors"
                        >
                            {t.cancel}
                        </button>
                        <button 
                            onClick={handleSave}
                            className="px-8 py-3 rounded bg-sun8-navy text-white font-bold hover:bg-sun8-gold transition-colors flex items-center gap-2 shadow-lg"
                        >
                            <Save size={18} /> {t.save}
                        </button>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};