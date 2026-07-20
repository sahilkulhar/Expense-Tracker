import React, {useState} from 'react';
import api from '../services/api';

export default function ExpenseForm({onSaved}){
  const [form, setForm] = useState({description:'', amount:'', category:'', date:''});
  const save = async (e)=>{
    e.preventDefault();
    await api.post('/expenses', {...form, amount: Number(form.amount)});
    setForm({description:'', amount:'', category:'', date:''});
    onSaved && onSaved();
  };
  return (
    <form onSubmit={save} className="form">
      <h2>Add Expense</h2>
      <label>Description<input value={form.description} onChange={e=>setForm({...form, description:e.target.value})} required/></label>
      <label>Amount<input type="number" step="0.01" value={form.amount} onChange={e=>setForm({...form, amount:e.target.value})} required/></label>
      <label>Category<input value={form.category} onChange={e=>setForm({...form, category:e.target.value})} required/></label>
      <label>Date<input type="date" value={form.date} onChange={e=>setForm({...form, date:e.target.value})} required/></label>
      <button type="submit">Save</button>
    </form>
  );
}
