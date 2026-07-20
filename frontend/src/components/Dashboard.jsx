import React, {useEffect, useState} from 'react';
import api from '../services/api';
import {Pie, Bar} from 'react-chartjs-2';
import {Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend} from 'chart.js';
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function Dashboard(){
  const [categoryData, setCategoryData] = useState({labels:[], datasets:[]});
  const [monthlyData, setMonthlyData] = useState({labels:[], datasets:[]});

  useEffect(()=>{
    const load = async ()=>{
      const year = new Date().getFullYear();
      const month = new Date().getMonth()+1;
      const cat = await api.get(`/expenses/summary/categories?year=${year}&month=${month}`);
      const mon = await api.get(`/expenses/summary/monthly?year=${year}&month=${month}`);
      setCategoryData({labels: cat.data.map(r=>r.category), datasets: [{data: cat.data.map(r=>r.total), backgroundColor: ['#4dc9f6','#f67019','#f53794','#537bc4']} ]});
      setMonthlyData({labels: mon.data.map(r=>r.month), datasets: [{label:'Total', data: mon.data.map(r=>r.total), backgroundColor: '#4caf50'}]});
    };
    load();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <div style={{display:'flex', gap:20}}>
        <div style={{width:300}}>
          <h3>By Category (this month)</h3>
          <Pie data={categoryData} />
        </div>
        <div style={{flex:1}}>
          <h3>Monthly</h3>
          <Bar data={monthlyData} />
        </div>
      </div>
    </div>
  );
}
