const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0JVeTVKYi80azZuR2toOEt3R3c2bE9JRDFiY25MZDdpT25vdUY1QkFHbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiLzJQNVhhNENFam05RXhnZVdwZXRDOE9OV0dCSTJMUEx0M2ZOd3BBc00wMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJR2JaajBxVzV2NTBOUXFTN05ZZGZjbjN3b1pWdnZmdjdkMjR3ZEQ5WTFZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJZ0M5ZmdXS2xmaUNBV2FhWW45ZThueUN1aWJMVllDRkE0dTBjbUxuclU4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVCNEtGOFQxeFVJakFxYmZMVGZsdUxxZmZsZDZHRDl1WStuT1lCTDVnMUk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlWTjFneGtZbFdXT2tVZmFxalV0UmVDcUR6N2tSMlo1YU1SNlpMbW8yZ1U9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0g4Y3pENy9EaEJrYUNYcDNrRlh4d3FRYzdnaC9zcVh2RFlIMDRlb2VWTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQnNISFdSSExsNm9lTzlMVmozelBIVWdMZ2trdEFpS3pkOVVvZmk4MjZTOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImpUS1RSYjJZR3NkNHBEZUkyZVRSUEtwVGEvTVBMQXlDZFdWNkFzc0psQ1FhRVFob2dVNytNYlRzVjRRMHBnQVQ0TERITEtReENJdDM0aEV6K3dBSURBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTAsImFkdlNlY3JldEtleSI6IkRIZjYyK3ZBYTNScGc5eW8rNytMdjZFZ3V3MHVyYTlLSjl5eWhVdzhGcGc9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImJaYzgxS1F0VDlPcEF2RnI5VzdVVmciLCJwaG9uZUlkIjoiYjgwZmJkODUtZTkwMy00ZjJiLWI3OTctMTI1NDEwYzcxNzUzIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImpscnlaQm5LcHV2eWV6TU1RSHB6cDkxWVhhcz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJOaXhLSkpsVCtrY2MyWTNzand4aUtXTmZ1TWM9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiR0VHNjZGSFQiLCJtZSI6eyJpZCI6IjI2MzcxNzY3MjA2ODoxN0BzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLwnZe48J2frvCdn7XwnZe98J2Xv/Cdl7zwnZe68J2XrvCdmIUifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ01YTnMvWUNFT3JhaTdVR0dBZ2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IndhYjBpQWpEZmVnV0JnYks1WmRLY0dValVjby9oRzJab2tiQm1qakd5RFk9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkRVOWczNU1QSW9FTmJOV1ZPN1o1aE1LSFA2c2dSbTUvNkF0SU40YXhCVjlsSW51OHVjcEZnOEM5WWtQTEFKV2FPRmlvOWlDUFlwWEtXWWwxS1R3a0JRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJrZXo0TUd5c2RrMzcyMklxazBVdW1jQjZuSG5tbUE0M3ZtcmJJQ0pBRHQ0MEZaY3J2aEJveWY5N0pVOTZLYXBKMjVVMm5nUHgwOUZpRlR6UldBSjJEdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2MzcxNzY3MjA2ODoxN0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJjR205SWdJdzMzb0ZnWUd5dVdYU25CbEkxSEtQNFJ0bWFKR3dabzR4c2cyIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIxOTUzNjU3LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUVCdyJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "k29promax",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "k29promax",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
