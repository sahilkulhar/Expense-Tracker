-- Schema for Expense Tracker

CREATE DATABASE IF NOT EXISTS expense_tracker;
USE expense_tracker;

CREATE TABLE IF NOT EXISTS expenses (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  description VARCHAR(255) NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  category VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_date (date),
  INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Example: create an index to accelerate queries filtering by YEAR(date) and MONTH(date) via a generated column
ALTER TABLE expenses
  ADD COLUMN date_ym VARCHAR(7) GENERATED ALWAYS AS (DATE_FORMAT(date, '%Y-%m')) STORED,
  ADD INDEX idx_date_ym (date_ym);

