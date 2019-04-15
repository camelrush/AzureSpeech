// クロスブラウザ定義
navigator.mediaDevices.getUserMedia = 
  navigator.mediaDevices.getUserMedia || 
  navigator.mediaDevices.webkitGetUserMedia || 
  navigator.mediaDevices.mozGetUserMedia || 
  navigator.mediaDevices.msGetUserMedia;

$(function(){
  $('#btn_rec').on('click' ,function() {
    navigator.mediaDevices.getUserMedia({audio:true,video:false}).then(handleSuccess);
  });
});

var handleSuccess = function(stream){
  const bufferSize = 1024;
  var context = new AudioContext();
  var source = context.createMediaStreamSource(stream);
  var processor = context.createScriptProcessor(bufferSize ,1 ,1);

  source.connect(processor);
  processor.onaudioprocess = function(e){
    var inputdata = e.inputBuffer.getChannelData(0);
    for (var i=0 ;i<bufferSize ;i++){
      $('#txt_data').append(inputdata[i] + '<br>');
    }
  }
  processor.connect(context.destination);
}
