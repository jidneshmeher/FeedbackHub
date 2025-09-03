import express from "express";
import cors from "cors";
import { Pool } from "pg";
import bcrypt from "bcryptjs";
import cron from "node-cron";

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

pool.connect()
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(`Error while connecting to database ${err}`));

// --------------------- LOGIN ---------------------
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const sql = 'SELECT * FROM users  WHERE email=$1';
    const result = await pool.query(sql, [email]);

    if (result.rows.length === 0)
      return res.send({ success: false, message: "Invalid credentials" });

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (match) res.send({ success: true, user });
    else res.send({ success: false, message: "Invalid credentials" });
  } catch (err) {
    res.status(500).send(err);
  }
});

// --------------------- SAVE FEEDBACK ---------------------
app.post("/save", async (req, res) => {
  try {
    const { name, email, feedback, currentValue } = req.body;
    const sql = "INSERT INTO feedback (name, email, feedback, rating) VALUES ($1, $2, $3, $4)";
    const result = await pool.query(sql, [name, email, feedback, currentValue]);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

// --------------------- GET FEEDBACK ---------------------
app.get("/getdata", async (req, res) => {
  try {
    const sql = "SELECT * FROM feedback";
    const result = await pool.query(sql);
    res.send(result.rows);
  } catch (err) {
    res.status(500).send(err);
  }
});

// --------------------- DELETE FEEDBACK ---------------------
app.delete("/delete", async (req, res) => {
  try {
    const { name, email, feedback, rating } = req.body;
    const sql = "DELETE FROM feedback WHERE name=$1 AND email=$2 AND feedback=$3 AND rating=$4";
    const result = await pool.query(sql, [name, email, feedback, rating]);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

// --------------------- USER SIGNUP ---------------------
app.post("/user_save", async (req, res) => {
  const { username, email, phone, password, confirmpassword } = req.body;
  try {
    const checkSql = 'SELECT * FROM users  WHERE email=$1';
    const checkResult = await pool.query(checkSql, [email]);

    if (checkResult.rows.length > 0) {
      return res.send({ success: false, message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedConfirm = await bcrypt.hash(confirmpassword, 10);

    const insertSql = `
      INSERT INTO users (username, email, phone, password, confirmpassword)
      VALUES ($1, $2, $3, $4, $5)
    `;
    await pool.query(insertSql, [username, email, phone, hashedPassword, hashedConfirm]);

    res.send({ success: true, message: "Account created" });
  } catch (err) {
    res.status(500).send(err);
  }
});

// --------------------- ADMIN LOGIN ---------------------

app.post("/admin_login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const sql = 'SELECT * FROM admin WHERE username=$1';
    const result = await pool.query(sql, [username]);

    if (result.rows.length === 0)
      return res.send({ success: false, message: "Invalid credentials" });

    const admin = result.rows[0];
    const match = await bcrypt.compare(password, admin.password);

    if (match) res.send({ success: true, admin });
    else res.send({ success: false, message: "Invalid credentials" });
  } catch (err) {
    res.status(500).send(err);
  }
});

// --------------------- HEALTH CHECK ---------------------

app.get('/health', (req, res) => {
  res.status(200).send('Server is alive');
});

const PORT = process.env.PORT || 9999;
app.listen(PORT, () => {
  console.log(`Server ready @ ${PORT}`);
});

if (process.env.NODE_ENV === "production") {
  cron.schedule("*/14 * * * *", async () => {
    try {
      const res = await fetch(`${process.env.BACKEND_URL}/health`);
      if (!res.ok) {
        console.error("Health ping failed, status:", res.status);
      }
    } catch (err) {
      console.error("Health ping failed:", err);
    }
  });
}