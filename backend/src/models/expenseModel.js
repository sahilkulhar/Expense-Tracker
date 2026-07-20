const db = require('./db');

const ExpenseModel = {
  async createExpense({description, amount, category, date}){
    const sql = `INSERT INTO expenses (description, amount, category, date) VALUES (?, ?, ?, ?)`;
    const [result] = await db.execute(sql, [description, amount, category, date]);
    return { id: result.insertId };
  },

  async getExpenses({limit=100, offset=0, month, year, category}){
    let base = `SELECT id, description, amount, category, date, created_at FROM expenses`;
    const clauses = [];
    const params = [];
    if(month && year){
      clauses.push(`YEAR(date) = ? AND MONTH(date) = ?`);
      params.push(year, month);
    } else if (year){
      clauses.push(`YEAR(date) = ?`);
      params.push(year);
    }
    if(category){
      clauses.push(`category = ?`);
      params.push(category);
    }
    if(clauses.length) base += ` WHERE ` + clauses.join(' AND ');
    base += ` ORDER BY date DESC LIMIT ? OFFSET ?`;
    params.push(Number(limit), Number(offset));
    const [rows] = await db.execute(base, params);
    return rows;
  },

  async getExpenseById(id){
    const [rows] = await db.execute(`SELECT * FROM expenses WHERE id = ?`, [id]);
    return rows[0];
  },

  async updateExpense(id, {description, amount, category, date}){
    const sql = `UPDATE expenses SET description = ?, amount = ?, category = ?, date = ? WHERE id = ?`;
    const [res] = await db.execute(sql, [description, amount, category, date, id]);
    return res.affectedRows;
  },

  async deleteExpense(id){
    const [res] = await db.execute(`DELETE FROM expenses WHERE id = ?`, [id]);
    return res.affectedRows;
  },

  // Optimized monthly summary using indexes on date
  async getMonthlySummary(year, month){
    const sql = `SELECT DATE_FORMAT(date, '%Y-%m') as month, SUM(amount) as total FROM expenses WHERE YEAR(date) = ? AND MONTH(date) = ? GROUP BY month`;
    const [rows] = await db.execute(sql, [year, month]);
    return rows;
  },

  // Category breakdown for a given month/year
  async getCategorySummary(year, month){
    const sql = `SELECT category, SUM(amount) as total FROM expenses WHERE YEAR(date) = ? AND MONTH(date) = ? GROUP BY category ORDER BY total DESC`;
    const [rows] = await db.execute(sql, [year, month]);
    return rows;
  }
};

module.exports = ExpenseModel;
