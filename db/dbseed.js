import { Client}  from 'pg'
import "dotenv/config";

async function main() {
    console.log("seeding...");
    const client = new Client({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_DB,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT
    })

    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done")
}

const SQL = `
CREATE TABLE IF NOT EXISTS inventory (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    devices TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    stock INTEGER NOT NULL,
    colour TEXT NOT NULL,
    brand TEXT NOT NULL,
    description TEXT NOT NULL
);

INSERT INTO inventory (name, devices, price, stock, colour, brand, description)
VALUES
    (
        'Apple Macbook Pro 13-Inch A18, 256GB/8GB (Pink)',
        'laptops',
        1999.99,
        4,
        'pink',
        'Apple',
        'Ready for whatever your day brings, MacBook Neo flies through everyday tasks and apps. Choose from four stunning colours in a durable aluminium design. With a brilliant 13-inch Liquid Retina display, the A18 Pro chip built for AI and Apple Intelligence and up to 16 hours of battery life, it''s an amazing Mac at a surprising price.'
    );
`

main().catch((err) => {
    console.error(err);
    process.exit(1);
});