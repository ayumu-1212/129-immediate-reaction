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
};