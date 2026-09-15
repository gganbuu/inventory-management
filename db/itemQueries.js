import { pool } from './pool.js'

export async function productFiltersGet() {
    const devices = await pool.query('SELECT DISTINCT devices FROM inventory;');
    const brand = await pool.query('SELECT DISTINCT brand FROM inventory;');
    const devicesArray = devices.rows.flatMap(obj => Object.values(obj))
    const brandArray = brand.rows.flatMap(obj => Object.values(obj))
    return { devices: devicesArray, brand: brandArray }
}

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

export async function createItem({name, devices, price, stock, brand, colour, description}) {
    await pool.query(
        "INSERT INTO inventory (name, devices, price, stock, colour, brand, description) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        [name, devices, price, stock, colour, brand, description]
    )
}

export async function itemPageGet(name) {
    const { rows } = await pool.query("SELECT * FROM inventory WHERE name = $1;", [name])
    return rows[0];
}

export async function editPageGet(id) {
    const { rows } = await pool.query("SELECT * FROM inventory WHERE id = $1;", [id])
    return rows[0];
}

export async function editItemPost({id, name, devices, price, stock, colour, brand, description}) {
    const queryParams = [name, devices, price, stock, colour, brand, description, id]
    await pool.query("UPDATE inventory SET name = $1, devices = $2, price = $3, stock = $4, colour = $5, brand = $6, description = $7 WHERE id = $8", queryParams)
}
    
export async function deleteItemPost(id) {
    pool.query("DELETE FROM inventory WHERE id = $1", [id])
}