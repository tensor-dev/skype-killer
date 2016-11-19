define('Recognizer', function() {

   function Recognizer(locale){
     this.recognition = new webkitSpeechRecognition();
     if(locale)
      this.recognition.lang = locale;
     this.recognition.interimResults = false;
     this.recognition.maxAlternatives = 1;
     this.isStarted = false;
     this.id = 0;
     this.onResult = null;
   }

   Recognizer.prototype.start = function(){
     var self = this;
     this.recognition.start();
         this.recognition.onend = function() {
            if(this.isStarted == false){
               this.start();
               this.stop();
            }
            else
            {this.start();}
         }
     this.recognition.onresult = function(event) {
       if (self.onResult) {
          self.onResult({
              text: event.results[0][0].transcript,
              locale: self.locale,
              id: self.id++
          })
      }
     }
   }

   Recognizer.prototype.stop = function(){
     var self = this;
     this.recognition.onresult = function(event) {
       if (self.onResult) {
          self.onResult({
              text: event.results[0][0].transcript,
              locale: self.locale,
              id: self.id++
          })
      }
     }
     this.isStarted = true;
       this.recognition.onend = function()
       {
           this.stop();
       }
   }

   return Recognizer;

});
