function doPost(e) {
  var para = sendToSlack(e);
  sendToSlack(para, para['ts']);
  sendToSlack(para['ts']);
}

function sendToSlack(message, thread_ts=null) {
  var url = "https://slack.com/api/chat.postMessage";
  
  // 変更するのは、この部分だけ!
  var payload = {
    "token" : "~~~~~~~~~~~~~~~~",
    "channel" : "#開発",
    "text" : message
  };

  if(thread_ts){
    payload["thread_ts"] = thread_ts;
  }
  
  var params = {
    "method" : "post",
    "payload" : payload
  };
  
  // Slackに投稿する
  var response = UrlFetchApp.fetch(url, params);
  return JSON.parse(response.getContentText('utf-8'));
}

