class Recognizer {
  constructor(locale){
    this.recognition = new webkitSpeechRecognition();
    this.recognition.lang = locale;
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;
    this.isStarted = false;
  }
  startrecog(foo){
    this.recognition.start();
        this.recognition.onend = function() {
           if(this.isStarted == false){
              startrecog(foo);
              this.stop();
           }
           else
           {this.start();}
        }
    this.recognition.onresult = function(event) {
      var text = event.results[0][0].transcript;
      foo(text);
    }
  }
  stoprecog(foo){
    this.recognition.onresult = function(event) {
      var text = event.results[0][0].transcript;
      foo(text);
    }
    this.isStarted = true;
      this.recognition.onend = function()
      {
          this.stop();
      }
  }
}