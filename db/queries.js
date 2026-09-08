import { pool } from './pool.js'


export async function productsPageGet({devices, brand, priceFrom, priceTo} = {}) {
    const clauses = [];
    const values = [];
    // - check all categories with optional chaining so that clauses are only added when query parms exist
    // - $$ match the clause with the correct values, as the last element is always the one most recently pushed, 
    //   length is the correct 'index' for sql query
    if (devices?.length) { 
        values.push(devices);
        clauses.push(`devices = ANY($${values.length})`);
    };
    if (brand?.length) { 
        values.push(brand);
        clauses.push(`brand = ANY($${values.length})`);
    };

    if (priceFrom) { 
        values.push(priceFrom);
        clauses.push(`price >= $${values.length}`);
    };

    if (priceTo) { 
        values.push(priceTo);
        clauses.push(`price <= $${values.length}`);
    };

    // build the query; ternary operator to test whether any clauses exist, 
    // joining and if they do, and returning empty string if they dont 
    const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';

    const { rows } = await pool.query(`SELECT * FROM inventory ${where} ORDER BY name;`, values)
    return rows;
}

export async function itemPageGet(name) {
    const { rows } = await pool.query("SELECT * FROM inventory WHERE name = $1", [name])
    return rows[0];
}