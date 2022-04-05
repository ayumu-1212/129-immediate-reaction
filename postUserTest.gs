function doPost(e) {
  sendToSlack(e);
}

function sendToSlack(params) {
  var url = "https://slack.com/api/chat.postMessage";
  
  // 変更するのは、この部分だけ!
  var payload = {
    "token" : "~~~~~~~~~~~~~~~~",
    "channel" : "#開発",
    "text" : "出勤可能です！",
    "thread_ts" : params.parameter.timestamp
  };
  
  var params = {
    "method" : "post",
    "payload" : payload
  };
  
  // Slackに投稿する
  UrlFetchApp.fetch(url, params);
}

