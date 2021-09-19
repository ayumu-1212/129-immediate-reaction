function doPost(e) {
  var json = JSON.parse(e.postData.getDataAsString());
  immediateReaction(json);
}

function immediateReaction(json) {
  Logger.log(json);
  if(is129Bot(json)){
    var text = json.event.text;
    var sample_text = "*<!here>* @group-ls-mentor 当日以前のシフト変更 がありました。 *以下の日付で出勤ができる方はスレッドにて宣言してください。* *先着1名様に交代して出勤する権利を贈呈します。* メンター名 @m-fumiteru.tsurumaki_NMB ランク：S1 日程：9/21 時間帯：17:00~22:00";
    var rank = text.match(/ ランク：.*? /)[0].match(/[^ランク： ]+/)[0];
    var date = text.match(/ 日程：.*? /)[0].match(/[^日程： ]+/)[0];
    var timespan = text.match(/ 時間帯：.*/)[0].match(/[^時間帯： ]+/)[0];
    date = new Date(date.replace(/月/, "/"));
    timespan = timespan.match(/[0-9]+/g);
    if(timespan.length === 4.0){
      timespan.splice(3, 1);
      timespan.splice(1, 1);
    }
    if(rank === "S0" || rank === "S1" || rank === "S2"){
      Logger.log(rank);
      Logger.log(date);
      Logger.log(timespan);
    }
  };
}

function is129Bot(json) {
  var infratop_team_id = "T0729A1QD";
  var channel_129_id = "C01SQD0DEGP";
  // ボットの特定はまだ、データ取れてから。
  if(json.team_id === infratop_team_id && json.event.channel === channel_129_id){
    return true
  }else{
    return false
  }
}

function sendToTestSlack(e) {
  var url = "https://slack.com/api/chat.postMessage";
  
  // 変更するのは、この部分だけ!
  var payload = {
    "token" : "~~~~~~~~~~~~~~~~",
    "channel" : "#開発",
    "text" : e
  };
  
  var params = {
    "method" : "post",
    "payload" : payload
  };
  
  // Slackに投稿する
  UrlFetchApp.fetch(url, params);
}

function testReaction(json) {
  var send_user_id = "U02EWAXB13L"
  if(json.event.user === send_user_id){
    return true
  }else{
    return false
  }
}

function sendToSlack(e) {
  var url = "https://slack.com/api/chat.postMessage";
  
  // 変更するのは、この部分だけ!
  var payload = {
    "token" : PropertiesService.getScriptProperties().getProperty("129SlackUserToken"),
    "channel" : "#開発",
    "text" : "出勤可能です！",
    "thread_ts" : e.parameter.timestamp
  };
  
  var params = {
    "method" : "post",
    "payload" : payload
  };
  
  // Slackに投稿する
  UrlFetchApp.fetch(url, params);
}

// Slack App のデータreceive調査のときに使用
function receiveData(e) {
  var json  = JSON.parse(e.postData.getDataAsString());

  if (json.type === 'url_verification') {
    return ContentService.createTextOutput(json.challenge);
  }
}