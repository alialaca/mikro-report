"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportsConfig = void 0;
const sql_1 = require("./utils/sql");
exports.reportsConfig = {
    reports: [
        {
            id: "gunluk-siparis",
            name: "Günlük Sipariş Raporu",
            description: "Her dakika çalışır (test için)",
            cronExpression: "* * * * *",
            query: (0, sql_1.loadSqlQuery)('gunluk-siparis'),
            template: "gunluk-siparis.mjml",
            enabled: true,
            to: "ali@fixpro.com.tr"
        },
        {
            id: "gunluk-satis",
            name: "Günlük Satış Raporu",
            description: "Her akşam 7'de günlük satış verilerini gönderir",
            cronExpression: "0 19 * * *",
            query: (0, sql_1.loadSqlQuery)('gunluk-satis'),
            template: "gunluk-satis.mjml",
            enabled: false,
            to: "ali@fixpro.com.tr"
        }
    ]
};
