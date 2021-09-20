function doPost(e) {
  var json = JSON.parse(e.postData.getDataAsString());
  immediateReaction(json);
};

function immediateReaction(json) {
  if(is129Bot(json)){
    var asar = getDataFromJson(json);
    // ランクが適性の場合取得
    if(asar["rank"] === "S0" || asar["rank"] === "S1" || asar["rank"] === "S2"){
      var ss = SpreadsheetApp.openById('1erELxKMf2_Tp0dsRwUtMmx4BNywPL6NhOX1Ddb_x4Bg');
      var sh = ss.getActiveSheet();
      const shLastRow = sh.getRange(1, 1).getNextDataCell(SpreadsheetApp.Direction.DOWN).getRow();
      var ss_values = sh.getRange(1,1, shLastRow, 7).getValues();
      for(let i = 1, this_row; i <= (shLastRow-1); i++){
        this_row = ss_values[i];
        if(
          this_row[0].getMonth() === asar["date"].getMonth() &&
          this_row[0].getDate() === asar["date"].getDate() &&
          this_row[3] === ""
        ){
          if(
            this_row[1]-2 <= asar["timespan"][0] && 
            asar["timespan"][0] <= this_row[1]+2 && 
            this_row[2]-2 <= asar["timespan"][1] && 
            asar["timespan"][1] <= this_row[2]+2 && 
            asar["timespan"][1] - asar["timespan"][0] >= 3
          ){
            var input_row = [[true, asar["date"], asar["timespan"][0], asar["timespan"][1]]];
            sh.getRange(i+1, 4, 1, 4).setValues(input_row);
            // sendToTestSlack("出勤可能です！");
            sendToSlack(json);
            // sendToDM("これはテストです。");
            return
          };
        };
      };
    };
  };
};

function getDataFromJson(json) {
  var text = json.event.text
  // 取得したテキストからランク、日程、時間帯を取得
  var rank = text.match(/ランク：.*/)[0].match(/[^ランク：]+/)[0];
  var date = text.match(/日程：.*/)[0].match(/[^日程：]+/)[0];
  var timespan = text.match(/時間帯：.*/)[0].match(/[^時間帯：]+/)[0];
  date = new Date(date.replace(/月/, "/"));
  timespan = timespan.match(/[0-9]+/g);
  if(timespan.length === 4.0){
    timespan.splice(3, 1);
    timespan.splice(1, 1);
  };
  return {"rank": rank, "date": date, "timespan": timespan}
};

function is129Bot(json) {
  var infratop_team_id = "T0729A1QD";
  var channel_129_id = "C01SQD0DEGP";
  if(json.team_id === infratop_team_id && json.event.channel === channel_129_id){
    return true
  }else if(json.event.user === "U02EWAXB13L"){
    return true
  }else{
    return false
  }
};

function sendToDM(message) {
  const message_url = 'https://slack.com/api/chat.postMessage';

  // const member_id = "UL6MTNLG6" // infratopアカウント
  // const member_id = "U02F8V5LT7B" // testアカウント

  const channel_id = "DL43QCXEG";

  const message_options = {
    "method" : "post",
    "payload" : {
      "token": PropertiesService.getScriptProperties().getProperty("infratopSlackUserToken"),
      "channel": channel_id,
      "text": message
    }
  };
  
  //必要scope = chat:write
  UrlFetchApp.fetch(message_url, message_options);
  
}

function sendToTestSlack(e) {
  var url = "https://slack.com/api/chat.postMessage";
  
  // 変更するのは、この部分だけ!
  var payload = {
    "token" : "~~~~~~~~~~~~~~~~",
    "channel" : "C02F8V5K8P3",
    "text" : e
  };
  
  var params = {
    "method" : "post",
    "payload" : payload
  };
  
  // Slackに投稿する
  UrlFetchApp.fetch(url, params);
};


function sendToSlack(json) {
  var url = "https://slack.com/api/chat.postMessage";
  
  // 変更するのは、この部分だけ!
  var payload = {
    "token" : PropertiesService.getScriptProperties().getProperty("infratopSlackUserToken"),
    "channel" : "C01SQD0DEGP",
    "text" : "出勤可能です",
    "thread_ts" : json.event.ts
  };
  
  var params = {
    "method" : "post",
    "payload" : payload
  };
  
  // Slackに投稿する
  UrlFetchApp.fetch(url, params);
};

// Slack App のデータreceive調査のときに使用
function receiveData(e) {
  var json  = JSON.parse(e.postData.getDataAsString());

  if (json.type === 'url_verification') {
    return ContentService.createTextOutput(json.challenge);
  }
};
