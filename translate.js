define('webrtc!js!SBIS3.WebRTC.Translator', function(){
    function Translator(locale){
        this.locale = locale;
    }

    Translator.prototype.translate = function(recognitionResult, onResult){
        $.ajax({
            url: 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20161118T134324Z.f2a5606f149fb061.0deb5cf6fe1446776d23193355c808d1aed1c01b',
            data: {
                text: recognitionResult.text,  // text to translate
                lang: recognitionResult.locale + '-' + this.locale
            },
            success: function(result) {
                if(onResult){
                    onResult({id : recognitionResult.id, text : result.text});
                }
            }
        });
    };

    return Translator;
});