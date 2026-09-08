import { Client}  from 'pg';
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
DROP TABLE IF EXISTS inventory;

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
    ),
    (
        'Microsoft Surface Pro AI PC 12" Snapdragon X Plus 8 core/8GB/256GB (Grey)',
        'laptops',
        1499.99,
        7,
        'grey',
        'Microsoft',
        'The powerful, versatile 2‑in‑1 PC that adapts as your day changes shape.Ultra thin and lightweight with an iconic adjustable kickstand, detachable keyboard and refined finishes, Surface Pro is built to perform beautifully from every angle.Designed as a true 2-in-1, Surface Pro delivers laptop-class performance for demanding multitasking, creative workflows and AI tasks.'
    ),
    (
        'Apple iPhone 17e 256GB (Black)',
        'phones',
        999.99,
        1,
        'black',
        'Apple',
        'iPhone 17e features a beautiful 6.1-inch Super Retina XDR display1, the fast and capable A19 chip and all-day battery life2 and 256GB of storage. iPhone 17e comes with many of the same great features as iPhone 17, at a wallet-friendly price. Quick customisable access to your favourite apps and features, or use visual intelligence to learn about your surroundings.'
    ),
    (
        'Samsung Galaxy S26 Ultra 5G 256GB (Black)',
        'phones',
        1699.99,
        0,
        'black',
        'Samsung',
        'Seize the day, effortlessly, with intelligently intuitive Galaxy AI designed to elevate your everyday moments. From intelligent photo editing7 to instant summaries and smarter search1, the Galaxy 26 Ultra helps you do more, faster. It learns how you work, adapts to your needs, and becomes your ultimate AI assistant - built for the way you live.'
    ),
    (
        'Samsung Galaxy Z Fold8 Ultra 5G 512GB (Black)',
        'phones',
        3299.99,
        3,
        'black',
        'Samsung',
        'The sleek productivity powerhouse designed to fit right in your pocket. Elevate every detail on the stunning front and main display, whether you’re powering through emails, jumping on video calls, or multitasking your apps. Get more done with Galaxy AI that suggests intuitive one-tap actions, from setting reminders, or pinning locations, with follow up screens opening up in multi-window, so you always stay in your zone while multitasking.'
    ),
    (
        'Dell 15 DC15250 15.6" Full HD Laptop (Grey) (Intel Core i7)[512GB]',
        'laptops',
        1699.99,
        2,
        'grey',
        'Dell',
        'Stay powered all day with energy-efficient battery management and ExpressCharge support, giving you an 80% charge in 1 hour. Write and calculate quickly with roomy keypads, separate numeric keypad and calculator hotkey. Keep your wrists comfortable with lifted hinges that provide an ergonomic typing angle. Adaptive thermals keep your PC running efficiently, whether at your desk or working from your lap. Your Dell 15 intelligently adjusts its power and thermals to keep it running smoothly.'
    );
`
main().catch((err) => {
    console.error(err);
    process.exit(1);
});