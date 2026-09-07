import { pool } from './pool.js'

export async function productsPageGet() {
    const { rows } = await pool.query("SELECT * FROM inventory;")
    return rows;
}

export async function itemPageGet(name) {
    const { rows } = await pool.query("SELECT * FROM inventory WHERE name = $1", [name])
    return rows[0];
}