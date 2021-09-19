function doPost(e) {
  if(fromAdjustmentBot(e)) {
    sendToSlack(e);
    data = JSON.parse(e.getContentText('utf-8'));
    sendToTestSlack(data);
  }else if(is129Bot(e)){
    sendToTestSlack(e);
  };
}

function fromAdjustmentBot(e) {
  var send_user_name = "ayumuabe1434"
  if(e.parameter.user_name === send_user_name){
    return true
  }else{
    return false
  }
}

function sendToSlack(e) {
  var url = "https://slack.com/api/chat.postMessage";
  
  // 変更するのは、この部分だけ!
  var payload = {
    "token" : "~~~~~~~~~~~~~~~~",
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

function is129Bot(e) {
  var infratop_team_domain = "infratop";
  var infratop_bot_name = "遅刻欠勤シフト変更申請";
  if(e.parameter.team_domain === infratop_team_domain && bot_name in e.parameter){
    return true
  }else{
    return false
  }
}

function sendToTestSlack(e) {
  var url = "https://slack.com/api/chat.postMessage";
  
  // 変更するのは、この部分だけ!
  var payload = {
    "token" : PropertiesService.getScriptProperties().getProperty("129SlackUserToken"),
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