CREATE DATABASE transactionsdb

--transactions
CREATE TABLE transactions(
    id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    amount DECIMAL,
    date DATE,
    type VARCHAR(30),
    category VARCHAR(255)
);

--users
CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

--insert fake users
INSERT INTO users (user_name, user_email, user_password) 
VALUES ('jazmin', 'jazminfeliu@gmail.com','jaz123');

---add FK in transactions TABLE
ALTER TABLE transactions ADD COLUMN user_id UUID REFERENCES users (user_id);

--insert fake transaction
INSERT INTO transactions(description, amount, date, type, category, user_id) 
VALUES ('venta de abono organico','459','5-9-2022','deposit','abonos','c900690a-0767-4b56-91c9-2d7a29b5153b');