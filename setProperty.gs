function setVal() {
  PropertiesService.getScriptProperties().setProperty("TEST", "token");
  Logger.log(PropertiesService.getScriptProperties().getProperty("TEST"));
}
