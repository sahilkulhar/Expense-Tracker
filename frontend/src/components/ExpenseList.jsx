import React from 'react';
import api from '../services/api';

export default function ExpenseList({expenses, onDeleted}){
  const remove = async (id) =>{
    if(!confirm('Delete?')) return;
    await api.delete(`/expenses/${id}`);
    onDeleted();
  };
  return (
    <div>
      <h2>Expenses</h2>
      <table className="table">
        <thead>
          <tr><th>Date</th><th>Description</th><th>Category</th><th>Amount</th><th></th></tr>
        </thead>
        <tbody>
          {expenses.map(e=> (
            <tr key={e.id}>
              <td>{e.date}</td>
              <td>{e.description}</td>
              <td>{e.category}</td>
              <td>{Number(e.amount).toFixed(2)}</td>
              <td><button onClick={()=>remove(e.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
