function myFunction() {
  // var values = {"one": 1, "two": 2};
  var values = {"one": {"tete": 4}, "two": 2, "three": 3};
  branch(values);
}

function branch(values) {
  // var invalues = {"one": 1, "two": 2};
  var invalues = {"one": 1, "two": 2, "three": 3};
  if("three" in invalues){
    if(invalues["three"] === 3){
      Logger.log(1); 
    };
  }
}

function testFunction() {
  var values = {"one": [{"tete": 4}], "two": 2, "three": 3};
  Logger.log(values.one[0].tete);
}

function test(json) {
  var sample_text = "*<!here>* @group-ls-mentor 当日以前のシフト変更 がありました。 *以下の日付で出勤ができる方はスレッドにて宣言してください。* *先着1名様に交代して出勤する権利を贈呈します。* メンター名 @m-fumiteru.tsurumaki_NMB ランク：S1 日程：9月21日 時間帯：17~22";
  // var rank = sample_text.match(/ ランク：.*? /)[0].match(/[^ランク： ]+/)[0];
  var rank = sample_text.match(/ ランク：.*? /)[0].match(/[^ランク： ]+/)[0];
  Logger.log(rank);
  var date = sample_text.match(/ 日程：.*? /)[0].match(/[^日程： ]+/)[0];
  var timespan = sample_text.match(/ 時間帯：.*/)[0].match(/[^時間帯： ]+/)[0];
  date = new Date(date.replace(/月/, "/"));
  timespan = timespan.match(/[0-9]+/g);
  if(timespan.length === 4.0){
    timespan.splice(3, 1);
    timespan.splice(1, 1);
  }
  Logger.log(rank);
  Logger.log(date);
  Logger.log(timespan);
};

function getDataFromSS() {
  var ss = SpreadsheetApp.openById('1erELxKMf2_Tp0dsRwUtMmx4BNywPL6NhOX1Ddb_x4Bg');
  var sh = ss.getActiveSheet();
  var lastRow = sh.getRange(1, 1).getNextDataCell(SpreadsheetApp.Direction.DOWN).getRow();
  var ss_values = sh.getRange(1,1, lastRow, 7).getValues();
  var first_row = ss_values[2];
  if(first_row[3]){
    Logger.log(first_row[0].getDate());
  };
  var input_row = [[true, first_row[0], first_row[1], first_row[2]]];
  Logger.log(input_row);
  sh.getRange(2, 4, 1, 4).setValues(input_row);

};

function sendToDM() {
  const message = "これはテストメッセージです";
  const member_id = "UL6MTNLG6" // infratopアカウント
  // const member_id = "U02F8V5LT7B" // testアカウント
  const channel_id = getChannelID_(member_id);
  Logger.log(channel_id);
  const message_options = {
    "method" : "post",
    "payload" : {
      "token": PropertiesService.getScriptProperties().getProperty("infratopSlackUserToken"),
      "channel": channel_id,
      "text": message
    }
  };
  
  //必要scope = chat:write
  const message_url = 'https://slack.com/api/chat.postMessage';
  UrlFetchApp.fetch(message_url, message_options);
  
}

function getChannelID_(member_id) {
 
  const options = {
    "method" : "post",
    "payload" : {
      "token": PropertiesService.getScriptProperties().getProperty("infratopSlackUserToken"),
      "users": member_id
    }
  }
  
  //必要scope = im:write
  const url = 'https://slack.com/api/conversations.open';
  const response = UrlFetchApp.fetch(url, options);
  
  const obj = JSON.parse(response);
  console.log(obj);
  
  return obj.channel.id;
}


function testReaction(json) {
  var send_user_id = "U02EWAXB13L"
  if(json.event.user === send_user_id){
    return true
  }else{
    return false
  }
};