
/*window.onload = function () {
  var textline = new ya.speechkit.Textline('my_id', {
        apikey: 'e849ef32-1ef3-4085-83cb-9e0f580689df',
        onInputFinished: function(text) {
          // Финальный текст.
          console.log(text);
        }
      });
}; */

//window.ya.speechkit.settings.apikey = 'e849ef32-1ef3-4085-83cb-9e0f580689df';



var streamer = new ya.speechkit.SpeechRecognition();

window.onload = function () {
	var localeDetect = '';
	    streamer.start({
		  apikey: 'e849ef32-1ef3-4085-83cb-9e0f580689df',
		  initCallback: function () {
		    console.log("Началась запись звука.");
		  },
		  biometry: 'gender,language,group',
		  dataCallback: function (text, done, merge, words, biometry) {

		  		if(done) {
		  			var locale = '';
				    var value = 0;
				    $.each(biometry, function (j, bio) {
				      console.log("Вероятность: " + bio.confidence;
				        if(bio.confidence > value && bio.tag == 'language') {
				    		value = bio.confidence;
				    		locale = bio.class;
				    	}
				    });
			    	localeDetect = locale;
			    	console.log('localDetect: '  + localeDetect);
				    console.log("locale: " + locale);
				    
			  	}
		  },
		  errorCallback: function (err) {
		    console.log("Возникла ошибка: " + err);
		  },
		  // Содержит сведения о ходе процесса распознавания.
		  infoCallback: function (sent_bytes, sent_packages, processed, format) {},
		  // Будет вызвана после остановки распознавания.
		  stopCallback: function () {
		    console.log("Запись звука прекращена.");
		  },
		  particialResults: true,
		  utteranceSilence: 60
		 });
		}

