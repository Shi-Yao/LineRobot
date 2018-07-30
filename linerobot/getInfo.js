var getJSON = require('get-json');
var timer;
var pm = [];


module.exports= {
    getInfo:  function () {
        clearTimeout(timer);
        getJSON('http://opendata2.epa.gov.tw/AQI.json', function(error, response) {
          response.forEach(function(e, i) {
            pm[i] = [];
            pm[i][0] = e.County;
            pm[i][1] = e['SiteName'];
            pm[i][2] = e.PM10 *1;
            pm[i][3] = e['PM2.5'] ;
          });
        });
        // timer = setInterval(getInfo, 1800000); //每半小時抓取一次新資料
        return pm;
    },

    // 測試用
    getName : function(firstName,lastName){
        this.firstName = firstName;
        this.lastName = lastName;
        return this.firstName +this.lastName;
        
    }
}
