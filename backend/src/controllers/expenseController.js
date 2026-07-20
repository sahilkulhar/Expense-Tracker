const ExpenseModel = require('../models/expenseModel');
const Joi = require('joi');

const expenseSchema = Joi.object({
  description: Joi.string().max(255).required(),
  amount: Joi.number().precision(2).required(),
  category: Joi.string().max(100).required(),
  date: Joi.date().required()
});

const ctrl = {
  async create(req, res){
    const {error, value} = expenseSchema.validate(req.body);
    if(error) return res.status(400).json({error: error.message});
    try{
      const r = await ExpenseModel.createExpense(value);
      res.status(201).json({id: r.id});
    }catch(err){
      console.error(err);
      res.status(500).json({error: 'internal_error'});
    }
  },

  async list(req, res){
    const {limit, offset, month, year, category} = req.query;
    try{
      const rows = await ExpenseModel.getExpenses({limit: limit||100, offset: offset||0, month, year, category});
      res.json(rows);
    }catch(err){
      console.error(err);
      res.status(500).json({error: 'internal_error'});
    }
  },

  async get(req, res){
    try{
      const row = await ExpenseModel.getExpenseById(req.params.id);
      if(!row) return res.status(404).json({error: 'not_found'});
      res.json(row);
    }catch(err){
      console.error(err);
      res.status(500).json({error: 'internal_error'});
    }
  },

  async update(req, res){
    const {error, value} = expenseSchema.validate(req.body);
    if(error) return res.status(400).json({error: error.message});
    try{
      const changed = await ExpenseModel.updateExpense(req.params.id, value);
      if(!changed) return res.status(404).json({error: 'not_found'});
      res.json({updated: true});
    }catch(err){
      console.error(err);
      res.status(500).json({error: 'internal_error'});
    }
  },

  async remove(req, res){
    try{
      const changed = await ExpenseModel.deleteExpense(req.params.id);
      if(!changed) return res.status(404).json({error: 'not_found'});
      res.json({deleted: true});
    }catch(err){
      console.error(err);
      res.status(500).json({error: 'internal_error'});
    }
  },

  async monthlySummary(req, res){
    const year = Number(req.query.year);
    const month = Number(req.query.month);
    if(!year || !month) return res.status(400).json({error: 'year_and_month_required'});
    try{
      const rows = await ExpenseModel.getMonthlySummary(year, month);
      res.json(rows);
    }catch(err){
      console.error(err);
      res.status(500).json({error: 'internal_error'});
    }
  },

  async categorySummary(req, res){
    const year = Number(req.query.year);
    const month = Number(req.query.month);
    if(!year || !month) return res.status(400).json({error: 'year_and_month_required'});
    try{
      const rows = await ExpenseModel.getCategorySummary(year, month);
      res.json(rows);
    }catch(err){
      console.error(err);
      res.status(500).json({error: 'internal_error'});
    }
  }
};

module.exports = ctrl;
