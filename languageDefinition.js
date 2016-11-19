define('LocaleDetectorModule', function() {
	

	LocaleDetector.onResult = '';

	function LocaleDetector() {}

	LocaleDetector.prototype.detect = function() {
		var streamer = new ya.speechkit.SpeechRecognition();
		var localeDetect = this;
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
				        if(bio.confidence > value && bio.tag == 'language') {
				    		value = bio.confidence;
				    		locale = bio.class;
				    	}
				    });
				    if(localeDetect.onResult) {
				    	localeDetect.onResult(locale);
				    }
				    streamer.stop();
				    
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


	return LocaleDetector;
});
