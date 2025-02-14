CREATE DATABASE aarthika;
USE aarthika;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  aadhar VARCHAR(12) UNIQUE,
  pin VARCHAR(6)
);

-- Inserting 10 sample rows
INSERT INTO users (aadhar, pin) VALUES
('123456789012', '111111'),
('234567890123', '222222'),
('345678901234', '333333'),
('456789012345', '444444'),
('567890123456', '555555'),
('678901234567', '666666'),
('789012345678', '777777'),
('890123456789', '888888'),
('901234567890', '999999'),
('012345678901', '000000');


CREATE TABLE IF NOT EXISTS transactions (transaction_id INT AUTO_INCREMENT PRIMARY KEY, aadhar VARCHAR(12), description VARCHAR(255), amount DECIMAL(10, 2), date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (aadhar) REFERENCES users(aadhar)); CREATE TABLE IF NOT EXISTS goals (goal_id INT AUTO_INCREMENT PRIMARY KEY, aadhar VARCHAR(12), name VARCHAR(255), progress INT DEFAULT 0, FOREIGN KEY (aadhar) REFERENCES users(aadhar));

INSERT INTO transactions (aadhar, description, amount) VALUES ('123456789012', 'Payment for groceries', 1500.50), ('123456789012', 'Salary deposit', 50000.00), ('123456789012', 'Online shopping', 2500.75), ('123456789012', 'Electricity bill', 1200.00), ('123456789012', 'Loan repayment', 5000.00); INSERT INTO goals (aadhar, name, progress) VALUES ('123456789012', 'Build Emergency Fund', 40), ('123456789012', 'Save for a Vacation', 20), ('123456789012', 'Buy a Car', 10);
