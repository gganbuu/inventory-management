import { pool } from "./pool.js";
import bcrypt from "bcryptjs";

export async function signUpPost(username, passwordHash) {
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [username, passwordHash]);
}

// export async function getUserUsername(username) {
//     const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
//     const user = rows[0];
//     return user;
// }

export async function findUserByUsernameWithHash(username) {
    const { rows } = await pool.query(
        "SELECT id, username, password FROM users WHERE username = $1", [username]
    );
    return rows[0] ?? null
}


export async function getUserId(id) {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    const user = rows[0] ?? null;
    return user;
}