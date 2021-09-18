function postSlackbot() {
  //SlackAPIで登録したボットのトークンを設定する
  let token = "~~~~~~~~~~~~~";

  //ライブラリから導入したSlackAppを定義し、トークンを設定する
  let slackApp = SlackApp.create(token);

  //Slackボットがメッセージを投稿するチャンネルを定義する
  let channelId = "#開発";

  //Slackボットが投稿するメッセージを定義する
  let message = "SlackボットによるGASからの投稿メッセージです。"
  
  //SlackAppオブジェクトのpostMessageメソッドでボット投稿を行う
  slackApp.postMessage(channelId, message);
}
