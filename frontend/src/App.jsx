import React, {useEffect, useState} from 'react';
import Dashboard from './components/Dashboard';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import api from './services/api';

export default function App(){
  const [expenses, setExpenses] = useState([]);

  const load = async () => {
    const res = await api.get('/expenses');
    setExpenses(res.data || []);
  };

  useEffect(()=>{ load(); }, []);

  return (
    <div className="app">
      <h1>Expense Tracker</h1>
      <div className="grid">
        <div className="panel">
          <ExpenseForm onSaved={load} />
        </div>
        <div className="panel">
          <Dashboard/>
        </div>
      </div>
      <ExpenseList expenses={expenses} onDeleted={load} />
    </div>
  );
}
