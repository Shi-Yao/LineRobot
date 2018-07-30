var linebot = require('linebot');
var express = require('express');
var getJSON = require('get-json');
var cookieParser = require('cookie-parser');
var request = require('request');
var rp = require('request-promise');

// 建立linebot物件
var bot = linebot({
  channelId: 1580153702,
  channelSecret: "74be95ee0597d44681236471ec465d02",
  channelAccessToken: "a7/frNPWyDcK0bmcpAlVeTbPd09tdSpGbxajOrdZBoXHTURXc6aO1pXOlZaYo4I8j3uDwkGG91GsspnVEmkXANfpb/RPLdLuI9hfLfJT++f7g+lJH18CDoQEXATvbQ8zi9sURkjj8RILs86Wj+DafQdB04t89/1O/w1cDnyilFU="
});

// 處理訊息事件
// bot.on('message', function(event) {
//     if (event.message.type = 'text') {
//       var msg = event.message.text;
//       // 
//       event.reply(msg).then(function(data) {
//         // success 
//         console.log(msg);
//       }).catch(function(error) {
//         // error 
//         console.log('error');
//       });
//     }
//   });
var milliseconds = (new Date).getTime();
var timer;
var server_cookie = '';
var cookie = '';
var getStock = '';
var host = "mis.twse.com.tw";
var getStockList = [];
// var getInfo = require('./getInfo');
// var pm = [];
// pm = getInfo.getInfo();
// console.log(getInfo.getName('sada','fgfdgd'));
// 查詢股票機器人
// var getStock = require('./getStock2');
// getStockList = getStock.getstock2();


_bot();
const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);
  
//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
var port = server.address().port;
  console.log("App now running on port", port);
});


function STOCK_ () {
  this.ticker = "";
  this.name = "";
  this.curPrice = 0.0;
  this.high = 0.0;
  this.low = 0.0;
  this.volume = 0;

}

// var msg = 36666;
// var replyMsg = ''; 
// const getContent = function (url) {
//   return new Promise((resolve, reject) => {
//     // select http or https module, depending on reqested url
//     const lib = url.startsWith('https') ? require('https') : require('http');
//     const request = lib.get(url, (response) => {
//       // handle http errors
//       if (response.statusCode < 200 || response.statusCode > 299) {
//         reject(new Error('Failed to load page, status code: ' + response.statusCode));
//       }
//       // temporary data holder
//       const body = [];
//       server_cookie = response.headers["set-cookie"];
//       cookie = server_cookie[0].substring(0, server_cookie[0].indexOf(";"));
//       // getStock = require('./getStock');
//       // getStockList = getStock.getstock(cookie, 2337);
//       var date = new Date();
//       var jsonUrl = "http://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=tse_" + msg + ".tw&json=1&delay=0&_=" + milliseconds;
//       var max_retry = 10
//       var ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36"
//       var stocks = [];

//       var options = {
//         url: jsonUrl,
//         method: 'GET',
//         escaping: true,
//         headers: {
//           'Accept': 'application/json',
//           'User-Agent': ua,
//           'cookie': cookie
//         }
//       };
//       rp(options).then(function (body) {
//         var jsonData = JSON.parse(body);
//         if (jsonData.rtmessage == undefined || jsonData.rtmessage != "OK") {
//           Logger.log("Fail to fetch response");
//           return null;
//         }
//         if (jsonData.msgArray.length == 0){
//           event.reply(replyMsg).then(function (data) {
//             console.log(replyMsg);
//           }).catch(function (error) {
//             console.log('error');
//           });
//         }else{
//           for (var i = 0; i < jsonData.msgArray.length; i++) {
//             var stock = new STOCK_();
//             var respStock = jsonData.msgArray[i];

//             stock.ticker = respStock.c;
//             stock.curPrice = respStock.z;
//             stock.name = respStock.n;
//             stock.high = respStock.h;
//             stock.low = respStock.l;
//             stock.volume = respStock.v;
//             stocks[i] = stock;
//           }
//           console.log(stocks);
//           var temp = stocks[0];
//           if (msg == temp.ticker) {
//             replyMsg += '股票名稱: ' + temp.name + ' 當前股價: ' + temp.curPrice + ' 當日最高: ' + temp.high + ' 當日最低: ' + temp.low +
//               ' 總量: ' + temp.volume + '\n\n';
//           } else {
//             replyMsg = '查無此股票請重新輸入';
//           }

//           event.reply(replyMsg).then(function (data) {
//             console.log(replyMsg);
//           }).catch(function (error) {
//             console.log('error');
//           });
//         }
        
//       });
//     });
//     // handle connection errors of the request
//     request.on('error', (err) => reject(err))
//   })
// };

// getContent("http://" + host + "/stock/index.jsp?lang=zh-tw")
//   .then((body) => console.log(body))
//   .catch((err) => console.error(err));

function _bot() {
  // 查詢PM2.5機器人
  // bot.on('message', function(event) {
  //   if (event.message.type == 'text') {
  //     var msg = event.message.text;
  //     var replyMsg = '';
  //       pm.forEach(function(e, i) {
  //         if (msg.indexOf(e[0]) != -1) {
  //           replyMsg += e[0] + e[1] + '區的PM2.5 數值為 ' + e[3] + '\n';
  //         }else if(msg.indexOf(e[1]) != -1){
  //           replyMsg += e[1] + '的PM2.5 數值為 ' + e[3] + '\n';
  //         }
  //       });

  //     if (replyMsg == '') {
  //       replyMsg = '不知道「'+msg+'」是什麼意思或是輸入地點目前政府沒有提供' + '\n'+'請重新輸入地點';
  //     }

  //     event.reply(replyMsg).then(function(data) {
  //       console.log(replyMsg);
  //     }).catch(function(error) {
  //       console.log('error');
  //     });
  //   }
  // });

// 查詢股票機器人(歷史資料)
  // bot.on('message', function (event) {
  //   if (event.message.type == 'text') {
  //     var msg = event.message.text;
  //     var replyMsg = '';  
  //     getStockList = getStock.getstock2(msg);
  //     getStockList.forEach(function (e, i) {
  //       if (msg == e[0]) {
  //       replyMsg += '日期:' + e[1] + '開盤價' + e[4] + '最高價' + e[5] + '最低價' + e[6] +
  //         '收盤價:' + e[7] + '漲跌價差:' + e[8]  + '\n\n';
  //       } else{
  //         replyMsg = '查無此股票請重新輸入';
  //       }
  //     });

  //     event.reply(replyMsg).then(function (data) {
  //       console.log(replyMsg);
  //     }).catch(function (error) {
  //       console.log('error');
  //     });
  //   }
  // });

// 查詢股票機器人(即時)
  bot.on('message', function (event) {
    if (event.message.type == 'text') {
      var msg = event.message.text;
      var replyMsg = '';  
      const getContent = function (url) {
        return new Promise((resolve, reject) => {
          // select http or https module, depending on reqested url
          const lib = url.startsWith('https') ? require('https') : require('http');
          const request = lib.get(url, (response) => {
            // handle http errors
            if (response.statusCode < 200 || response.statusCode > 299) {
              reject(new Error('Failed to load page, status code: ' + response.statusCode));
            }
            // temporary data holder
            const body = [];
            server_cookie = response.headers["set-cookie"];
            cookie = server_cookie[0].substring(0, server_cookie[0].indexOf(";"));
            getStock = require('./getStock');
            getStockList = getStock.getstock(cookie, msg);
            var date = new Date();
            var jsonUrl = "http://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=tse_" + msg + ".tw&json=1&delay=0&_=" + milliseconds;
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
            rp(options).then(function (body) {
              var jsonData = JSON.parse(body);
              if (jsonData.rtmessage == undefined || jsonData.rtmessage != "OK") {
                Logger.log("Fail to fetch response");
                return null;
              }
              if (jsonData.msgArray.length == 0) {
                replyMsg = '查無此股票請重新輸入';
                event.reply(replyMsg).then(function (data) {
                  console.log(replyMsg);
                }).catch(function (error) {
                  console.log('error');
                });
              } else {
                for (var i = 0; i < jsonData.msgArray.length; i++) {
                  var stock = new STOCK_();
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
                var temp = stocks[0];
                if (msg == temp.ticker) {
                  replyMsg += '股票名稱: ' + temp.name + ' 當前股價: ' + temp.curPrice + ' 當日最高: ' + temp.high + ' 當日最低: ' + temp.low +
                    ' 總量: ' + temp.volume + '\n\n';
                } 

                event.reply(replyMsg).then(function (data) {
                  console.log(replyMsg);
                }).catch(function (error) {
                  console.log('error');
                });
              }
            });
          }); 
          // handle connection errors of the request
          request.on('error', (err) => reject(err))
        })
      };

      getContent("http://" + host + "/stock/index.jsp?lang=zh-tw")
        .then((body) => console.log(body))
        .catch((err) => console.error(err));
    }
  });
}
