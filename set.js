const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUpDaUtEeTMzU296WkF0ZGZncCtxcUl5d211YmdFQzk0MTJMWXFBcXdFWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ2crUklMaHJlcEUyT1hQa3NrTXRFRVE5YzlFeGc4Z3BZRGtOS2E5dnhpaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2UFFDVGRlcGxCdFhoU0JLbnY4SGQxeTY1a0NwQ0YwUkZIaGVzRi9PMEVBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJaN3BpbHRGVEVBRm5HSytDZnZ1YlppWS9uRHRMTUJMVWRmdnU2clNaNFZBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjROYjE3Um1HbUhwMFZ5d0F4ZUZjVTFab1pCNjdsZWhOYXJpaEszdjhha1k9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkZCTE5NQk9xNDAycFFxQVJyTW55NUhQeVUrM3Z5ei94VjJJVzIvWHRqekU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUR4Z2FuaXRnTFpKOW45YnozS0lxN0trOG1DQW9EclVxZmRYeWtwa1RHZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRHY1eG9TdHExZ3lpL2NmZmdxTE1KRjMra3ZaVCttREtiSDY3WEdhV0hYST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjB2ekduT2RocUlNdzJSR1pxTExybWgvbzF0YkRtZlpvMkljYlAyRzdFdDRxQTVCTzFrRCtTYjNhU3hLSzhxVU13aHA3UEFxMytqWEdnN05zR2IxUkFRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTI0LCJhZHZTZWNyZXRLZXkiOiIzZ24yWUg2LzN3NG9pVS9FdHBEYkRmc1p6UktqeEdtWkxwOEd2WW16MW5NPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJUM2RxNlZOVFJ1bVJKNWpNVkFsbk9RIiwicGhvbmVJZCI6IjRmM2UwZWM3LTg5MWUtNDVmMi05MWMxLWVmZWVmODYzNjMzMCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJKWHZhZFpmN0sxY3c2V0xibGRVa0RWWnh3ZlE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNHhhYVVyUUcrRGRENjF1bXJYcjZOUHlLWFE0PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlRFUTZDUEs1IiwibWUiOnsiaWQiOiI5MjMwMTY4ODMwODk6NjhAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0lDVWwrY0ZFUFRtdHJZR0dCc2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlpuRW5XT0p6TUUxNmttUlZxdFVVTUNRNTAydTc4WVJNNTBVeUJnemhoRTA9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImYzcXZ1WVpsMExyS240ZlBhM1J0eWN4ZXZiQXhkdmU5S0g1UFVwVm5rbi9RQ2tvZnZsMkhQNFo3WnNGSFU2OGE3OFdBVGIvWlJPQ2kyZlRVVkdRZURRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJKTndRaUpkZlpraTVOa3RHZmFoUzNFMEc4emtZN3IxQjFHR1IydG9wUktNMkl1T1FzTXhFQStyWFA3TjVBNFR5bEpmS2FsbkhPWkx3S25Zd0lUYjdBZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkyMzAxNjg4MzA4OTo2OEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJXWnhKMWppY3pCTmVwSmtWYXJWRkRBa09kTnJ1L0dFVE9kRk1nWU00WVJOIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI0NzU2ODY0fQ==',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "254105915061", 
    A_REACT : process.env.AUTO_REACTION || 'on',     
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
//    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd" : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

