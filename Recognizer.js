define('Recognizer', function() {

   function convertLocale(locale) {
      return (locale + '').split('-')[0];
   }

   function Recognizer(locale) {
      this.recognition = new webkitSpeechRecognition();
      if (locale) {
         this.recognition.lang = locale;
      }
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 1;
      this.isStarted = false;
      this.id = 0;
      this.onResult = null;
   }

   Recognizer.prototype.start = function() {
      var self = this;
      this.isStarted = true;
      this.recognition.start();
      this.recognition.onend = function() {
         if (self.isStarted) {
            self.recognition.start();
         }
      };
      this.recognition.onresult = function(event) {
         if (self.onResult) {
            self.onResult({
               text: event.results[0][0].transcript,
               locale: convertLocale(self.recognition.lang),
               id: self.id++
            })
         }
      }
   };

   Recognizer.prototype.stop = function() {
      if (this.isStarted) {
         this.isStarted = false;
         this.recognition.stop();
      }
   }

   return Recognizer;

});
