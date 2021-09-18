function doPost(e) {
  if(fromAdjustmentBot(e)) {
    sendToSlack(e);
  }else if(isInfratop(e)){
    sendToTestSlack(e);
  };
}

function fromAdjustmentBot(e) {
  var bot_name = "ayumuabe1434"
  if(e.parameter.user_name === bot_name){
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

function isInfratop(e) {
  var infratop_team_domain = "infratop"
  if(e.parameter.team_domain === infratop_team_domain){
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