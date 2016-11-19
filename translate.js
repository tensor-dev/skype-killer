define('Translator', function(){
     function Translator(locale){
       this.locale = locale;
       this.onResult = {'id' : '', 'text' : ''};
     };
     
     Translator.prototype.translate = function(recognitionResult){
       var translatevariable = this;
	   $.ajax({
         url: 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20161118T134324Z.f2a5606f149fb061.0deb5cf6fe1446776d23193355c808d1aed1c01b',
         data: {
		 text: recognitionResult.text,  // text to translate
		 lang: recognitionResult.locale + '-' + this.locale
         },
	     success: function(result) {
           translatevariable.onResult.text = result.text;
           translatevariable.onResult.id = recognitionResult.id;
           console.log(translatevariable);
	     }
	   });
     }
	 return Translator;
   
});