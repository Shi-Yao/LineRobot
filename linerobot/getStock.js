var request = require("request");
var session = require('express-session');
var express = require('express');
var rp = require('request-promise');

var milliseconds = (new Date).getTime();
var date = new Date();
var y = date.getFullYear();
var m = date.getMonth() + 1;
var d = date.getDate();

if (m < 10) {
    m = '0' + m;
}
if (d < 10) {
    d = '0' + d;
}

var today = y + '' + m + '' + d;
var num = '', name = '', price = '';
// ex_ch：上市或上櫃
fun = {
    getstock: function (cookie, msg_stockNo, event) {
        var date = new Date();
        var jsonUrl = "http://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=tse_" + msg_stockNo + ".tw&json=1&delay=0&_=" + milliseconds;
        var max_retry = 10
        var ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36"
        var stocks = [];

        var options = {
            url: jsonUrl,
            method: 'GET',
            escaping: true,
            headers: {
                'Accept': 'application/json',
                'User-Agent': ua,
                'cookie': cookie
            }
        };  

        // const getContent = function (url, options) {
        //     // return new pending promise
        //     return new Promise((resolve, reject) => {
        //         // select http or https module, depending on reqested url
        //         const lib = url.startsWith('https') ? require('https') : require('http');
        //         const request = lib.get(url, (response) => {
        //             // handle http errors
        //             if (response.statusCode < 200 || response.statusCode > 299) {
        //                 reject(new Error('Failed to load page, status code: ' + response.statusCode));
        //             }
        //             // temporary data holder
        //             const body = [];
        //             // on every content chunk, push it to the data array
        //             response.on('data', (chunk) => body.push(chunk));
        //             // we are done, resolve promise with those joined chunks
        //             response.on('end', () => resolve(body.join('')));
        //         });
        //         // handle connection errors of the request
        //         request.on('error', (err) => reject(err))
        //     })
        // };

        rp(options).then(function (body){
            var jsonData = JSON.parse(body);
            if (jsonData.rtmessage == undefined || jsonData.rtmessage != "OK") {
                Logger.log("Fail to fetch response");
                return null;
            }
            // console.log(jsonData);
            for (var i = 0; i < jsonData.msgArray.length; i++) {
                var stock = new fun.STOCK_();
                var respStock = jsonData.msgArray[i];

                stock.ticker = respStock.c;
                stock.curPrice = respStock.z;
                stock.name = respStock.n;
                stock.high = respStock.h;
                stock.low = respStock.l;
                stock.volume = respStock.v;
                stocks[i] = stock;
            }
            console.log(stocks);
            
        });

        // getContent(jsonUrl, options)
        //     .then((html) => console.log(html))
        //     .catch((err) => console.error(err));

        // request(options, function (err, response, body){
        //     var jsonData = JSON.parse(body);
        //     if (jsonData.rtmessage == undefined || jsonData.rtmessage != "OK") {
        //         Logger.log("Fail to fetch response");
        //         return null;
        //     }
        //     // console.log(jsonData);
        //     for (var i = 0; i < jsonData.msgArray.length; i++) {
        //         var stock = new fun.STOCK_();
        //         var respStock = jsonData.msgArray[i];

        //         stock.ticker = respStock.c;
        //         stock.curPrice = respStock.z;
        //         stock.name = respStock.n;
        //         stock.high = respStock.h;
        //         stock.low = respStock.l;
        //         stock.volume = respStock.v;
        //         stocks[i] = stock;
        //     }
        //     console.log(stocks);
        //     var replyMsg = '';  
        //     var temp = stocks[0];
        //     if (msg_stockNo == temp.ticker) {
        //         replyMsg += '股票名稱:' + temp.name + '當前股價:' + temp.curPrice + '當日最高:' + temp.high + '當日最低:' + temp.low +
        //             '總量:' + temp.volume + '\n\n';
        //     } else {
        //         replyMsg = '查無此股票請重新輸入';
        //     }

        //     event.reply(replyMsg).then(function (data) {
        //         console.log(replyMsg);
        //     }).catch(function (error) {
        //         console.log('error');
        //     });
        //     // return stocks;
        // });
    },


    STOCK_: function () {
        this.ticker = "";
        this.name = "";
        this.curPrice = 0.0;
        this.high = 0.0;
        this.low = 0.0;
        this.volume = 0;

    }
}

module.exports = fun;
