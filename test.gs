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
  var sample_text = "*<!here>* @group-ls-mentor 当日以前のシフト変更 がありました。 *以下の日付で出勤ができる方はスレッドにて宣言してください。* *先着1名様に交代して出勤する権利を贈呈します。* メンター名 @m-fumiteru.tsurumaki_NMB ランク：JE/EWC 日程：9月21日 時間帯：17~22";
  var rank = sample_text.match(/ ランク：.*? /)[0].match(/[^ランク： ]+/)[0];
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
}