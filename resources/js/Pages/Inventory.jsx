import React, { useState } from 'react';
import { Head } from '@inertiajs/react';

export default function Inventory() {
  const [products, setProducts] = useState([
    { id: 1, name: "MacBook Pro 16\"", sku: "MBP16-001", category: "Laptops", stock: 12, price: 46999 },
    { id: 2, name: "Logitech MX Master 3S", sku: "LOG-002", category: "Accessories", stock: 45, price: 999 },
    { id: 3, name: "Dell UltraSharp 27\"", sku: "DELL-003", category: "Monitors", stock: 8, price: 16299 },
    { id: 4, name: "Ergonomic Office Chair", sku: "CHAIR-004", category: "Furniture", stock: 15, price: 12299 },
    { id: 5, name: "Mechanical Keyboard RGB", sku: "KB-005", category: "Accessories", stock: 30, price: 2500 },
    { id: 6, name: "Standing Desk Converter", sku: "DESK-006", category: "Furniture", stock: 5, price: 1999 },
  ]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ name: "", sku: "", category: "Laptops", stock: "", price: "" });

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  const totalValue = products.reduce((a,b) => a + b.stock * b.price, 0);

  const save = () => {
    if (!form.name) return;
    if (editId) setProducts(products.map(p=> p.id===editId ? {...p,...form, stock:+form.stock, price:+form.price}:p));
    else setProducts([...products, {id:Date.now(),...form, stock:+form.stock, price:+form.price}]);
    setShowModal(false); setEditId(null); setForm({ name: "", sku: "", category: "Laptops", stock: "", price: "" });
  };

  return (
    <div className="min-h-screen bg-[#0F1225] text-white flex overflow-hidden">
      <Head title="Inventory" />
      
      {/* SIDEBAR FIXED */}
      <div className="w-64 bg-[#151A30] p-6 flex flex-col justify-between flex-shrink-0">
        <div>
          <h1 className="font-bold text-xl mb-10">💎 InventoryOS</h1>
          <div className="bg-blue-600 p-3 rounded-xl font-bold">📦 Inventory</div>
          <div className="p-3 text-gray-400 mt-2">🛒 Orders</div>
          <div className="p-3 text-gray-400">👥 Customers</div>
          <div className="p-3 text-gray-400">📊 Analytics</div>
          <div className="p-3 text-gray-400">⚙️ Settings</div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">S</div>
          <div><p className="font-bold">Santosidad</p><p className="text-xs text-gray-400">Admin</p></div>
        </div>
      </div>

      {/* MAIN - DITO YUNG FIX */}
      <div className="flex-1 p-8 overflow-y-auto h-screen pb-20">
        <h1 className="text-4xl font-bold">Inventory - Santosidad</h1>
        <p className="text-gray-400 mb-6">Manage and track your products inventory</p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#1A1F3A] p-5 rounded-2xl">Total Products<br/><b className="text-2xl">{products.length}</b></div>
          <div className="bg-[#1A1F3A] p-5 rounded-2xl">Low Stock<br/><b className="text-2xl text-orange-400">{products.filter(p=>p.stock<10).length}</b></div>
          <div className="bg-[#1A1F3A] p-5 rounded-2xl">Total Value<br/><b className="text-2xl">₱{totalValue.toLocaleString()}</b></div>
          <div className="bg-[#1A1F3A] p-5 rounded-2xl">Categories<br/><b className="text-2xl">4</b></div>
        </div>

        <div className="bg-[#151A30] rounded-2xl p-6">
          <div className="flex justify-between mb-6">
            <h2 className="text-xl font-bold">Products</h2>
            <div className="flex gap-2">
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..." className="bg-[#0F1225] border border-gray-700 px-4 py-2 rounded-xl" />
              <button onClick={()=>setShowModal(true)} className="bg-blue-600 px-5 py-2 rounded-xl font-bold">+ Add Product</button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="text-gray-400 text-xs"><tr className="border-b border-gray-800"><th className="text-left p-3">NAME</th><th>SKU</th><th>CATEGORY</th><th>STOCK</th><th>PRICE</th><th>ACTION</th></tr></thead>
              <tbody>
                {filtered.map(p=>(
                  <tr key={p.id} className="border-b border-gray-800/50">
                    <td className="p-4">{p.name}</td>
                    <td className="text-gray-400">{p.sku}</td>
                    <td><span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs">{p.category}</span></td>
                    <td className={p.stock<10?'text-red-400 font-bold':''}>{p.stock}</td>
                    <td>₱{p.price.toLocaleString()}</td>
                    <td className="space-x-2">
                      <button onClick={()=>{setEditId(p.id);setForm(p);setShowModal(true)}} className="border border-blue-500/50 text-blue-400 px-3 py-1 rounded text-sm">Edit</button>
                      <button onClick={()=>{if(confirm('Delete?'))setProducts(products.filter(x=>x.id!==p.id))}} className="border border-red-500/50 text-red-400 px-3 py-1 rounded text-sm">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-400 mt-4">Showing {filtered.length} products - Scroll pababa para makita lahat</p>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1A1F3A] p-6 rounded-2xl w-96 border border-gray-700">
            <h3 className="font-bold text-xl mb-4">{editId?'Edit':'Add'} Product</h3>
            <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Name" className="bg-[#0F1225] border w-full p-3 rounded-xl mb-2" />
            <input value={form.sku} onChange={e=>setForm({...form, sku:e.target.value})} placeholder="SKU" className="bg-[#0F1225] border w-full p-3 rounded-xl mb-2" />
            <input value={form.stock} onChange={e=>setForm({...form, stock:e.target.value})} type="number" placeholder="Stock" className="bg-[#0F1225] border w-full p-3 rounded-xl mb-2" />
            <input value={form.price} onChange={e=>setForm({...form, price:e.target.value})} type="number" placeholder="Price" className="bg-[#0F1225] border w-full p-3 rounded-xl mb-4" />
            <div className="flex justify-end gap-2"><button onClick={()=>setShowModal(false)} className="px-4">Cancel</button><button onClick={save} className="bg-blue-600 px-5 py-2 rounded-xl">Save</button></div>
          </div>
        </div>
      )}
    </div>
  );
}