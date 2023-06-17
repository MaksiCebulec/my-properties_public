const puppeteer = require('puppeteer');
const pool = require('./db');


async function insertDataIntoDB(property) {
    const insertQuery = `
    INSERT INTO "properties" (title, location, photos)
    VALUES ($1, $2, $3)`;


    property.forEach((entry) => {
        const { title, location, photos } = entry;
        const values = [title, location, photos];
        pool.query(insertQuery, values, (err) => {
            if (err) {
                console.error("error: ", err.message);
            }
        });
    });

}

function displayDataDB() {
    console.log("DATABASE:");
    pool.query(`SELECT * FROM "properties";`, (err, res) => {
        if (!err) {
            console.log(res.rows);
        } else {
            console.log(err.message);
        }

    });
}

async function run() {

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    let pageNumber = 1;
    while (pageNumber <= 25) {

        if (pageNumber === 1) {
            await page.goto('https://www.sreality.cz/en/search/for-sale/apartments');
        } else {
            await page.goto(`https://www.sreality.cz/en/search/for-sale/apartments?page=${pageNumber}`);
        }

        await page.waitForTimeout(500);
        const currentURL1 = await page.url();
        console.log(currentURL1);
        await page.screenshot({ path: 'example.png', fullPage: true });
        const property = await page.evaluate((pageNumber) => {
            return Array.from(document.querySelectorAll('.dir-property-list .property'),
                (e) => {
                    const obj = {
                        title: e.querySelector('.info .text-wrap .basic h2 .name').innerText,
                        location: e.querySelector('.info .text-wrap .basic .locality').innerText,
                        photos: Array.from(e.querySelectorAll('.ng-scope ._15Md1MuBeW62jbm5iL0XqR ._2xzMRvpz7TDA2twKCXTS4R ._2vc3VMce92XEJFrv8_jaeN img')).map(img => img.src),
                    }
                    return obj;

                })
        }, pageNumber);

        await insertDataIntoDB(property);
        console.log("+++++++++++++++++++++++");
        pageNumber++;

    }

    // displayDataDB();

    await browser.close();
    pool.end();

}

run();



