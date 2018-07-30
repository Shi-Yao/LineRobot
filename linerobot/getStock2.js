var request = require("request");

var stock = [2454, 2317, 2002, 2330, 2412, 2337];
var stockIndex = 0;
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
var num = '', name = '', price = '',stockInfo=[],tempArray=[];
// ex_ch：上市或上櫃

var obj= {
    getstock2: function () {
        var stockNo = stock[stockIndex];
        var date = new Date();
        var jsonUrl = "http://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=" + today + "&stockNo=" + stockNo;
        if (stockNo){
            request({
                url: jsonUrl,
                method: "GET"
            }, 
                function (error, response, body, callback) {
                if (error || !body) {
                    return;
                } else {
                    // 如果沒有資料，會出現 404 的 html 網頁，此時就重新抓取
                    if (body.indexOf('html') != -1) {
                        console.log('reload');
                    } else {
                        b = JSON.parse(body);
                        // console.log(b);
                        var json = b.data;
                        var title = b.title.split(' ');
                        var data = json[json.length - 1];
                        var count = 0
                        json.forEach(function (e, i) {
                            stockInfo[i] = [];
                            stockInfo[i][0] = stockNo;
                            stockInfo[i][1] = e[0]; // 日期
                            stockInfo[i][2] = e[1]; // 成交股數
                            stockInfo[i][3] = e[2]; // 成交金額
                            stockInfo[i][4] = e[3]; // 開盤價
                            stockInfo[i][5] = e[4]; // 最高價
                            stockInfo[i][6] = e[5]; // 最低價
                            stockInfo[i][7] = e[6]; // 收盤價
                            stockInfo[i][8] = e[7]; // 漲跌價差
                            stockInfo[i][9] = e[8]; // 成交筆數
                            tempArray.push(stockInfo[count]); 
                            count++;
                        });
                        // num = num + title[1] + ',';
                        // name = name + title[2] + ',';
                        // price = price + data[data.length - 3] + ',';
                        stockIndex = stockIndex + 1;
                        // console.log(tempArray);
                        obj.getstock2();
                    }   
                }
            });
        } else {
            console.log(num);
            console.log(name);
            console.log(price);
        }
        // console.log(stockInfo);
        return tempArray;
    }
}

module.exports = obj;