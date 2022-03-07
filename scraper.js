/* Puppeteer Scraping */

const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

async function getProfileImage(username){
  /* https://devdocs.io/puppeteer/index#pageevaluatepagefunction-args */

  const url = `https://izoomyou.net/api/v1/resources/user/${username}`;

  return new Promise(async(resolve, reject) =>{
      try {
          const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"] })
          const page = await browser.newPage();
          const response = await page.goto(url);
  
          const text = await response.text();
  
          await browser.close();
          resolve(text);
      } catch (error) {
          reject(error);
      }
  })
}



module.exports = { getProfileImage };
