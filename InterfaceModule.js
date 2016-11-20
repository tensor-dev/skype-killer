define ("Subtitles", function(){
    function Interface(){
   
}

var myStorage = {};

Interface.prototype.show = function show(par, text, ms){
    this._subs = document.createElement("div");
    this._substrate = document.createElement("div");
    this._div = document.createElement("div");       

    this._substrate.setAttribute("style",
    "width: 50%; height: 25px; position: absolute; left: 25%; bottom: 20px; background-color: black; opacity: 0.4; border-radius: 3px;" +
    "z-index:50; display: block;");
    this._div.setAttribute("style",
    "width: 50%; height: 25px; color: white; text-shadow: 0px 0px 3px black ; align-content: center; text-align: center;" 
    + "position: absolute; bottom: 20px; left: 25%; font-size: 40px; z-index:50; display: block; word-wrap: break-word;");

    this._subs.appendChild(this._substrate);
    this._subs.appendChild(this._div);
    this._div.innerHTML = text;
    this._par = par;
    var a = null;
    if (a = this._par.querySelector("#" + this._id))
        {
        if (a.parentNode == this._par){
            clearTimeout(this._timerId);
            this._par.removeChild(document.getElementById(this._id));
            } else {
                this._id = "subs" + Math.round(Math.random()*1000);
                while(myStorage[this._id]){
                    this._id = "subs" + Math.round(Math.random()*1000);       
                    }
                myStorage[this._id] = true;
            }
        } else {
            this._id = "subs" + Math.round(Math.random()*1000);
            while(myStorage[this._id]){
                this._id = "subs" + Math.round(Math.random()*1000);       
            }
            myStorage[this._id] = true;
        }
    this._subs.setAttribute("id",this._id);
     
    var test = document.createElement("div");
    var test2 = document.createElement("div");
    test.setAttribute("id","test"); 
    test2.setAttribute("id","test2"); 
    var maxWidth = this._par.offsetWidth*0.8;  
    test.setAttribute("style",
    "position: absolute; height: auto; max-width: " + maxWidth + "px; font-size: 40px; visibility: hidden;");
    test2.setAttribute("style",
    "height: auto; width: auto; font-size: 40px; word-wrap: break-word; visibility: hidden;"); //visibility: hidden;
    test2.innerHTML = text;
    test.appendChild(test2);
    document.body.insertBefore(test,document.body.childNodes[0]);    
    var width = document.getElementById("test2").clientWidth;
    var height = document.getElementById("test2").clientHeight;
    document.body.removeChild(document.getElementById("test"));

    this._substrate.style.left = this._div.style.left = this._par.offsetLeft + (this._par.clientWidth - width) / 2 + "px";
    this._substrate.style.height = this._div.style.height = height + 10 + "px";
    this._substrate.style.top = this._par.offsetTop + this._par.offsetHeight * 0.98 - (height + 10) + "px";
    this._div.style.top = this._par.offsetTop + this._par.offsetHeight * 0.98 - (height + 5) + "px";
    this._substrate.style.width = this._div.style.width = width + 15 + "px";
    
        
    this._par.insertBefore(this._subs, this._par.children[0]);

    this._timerId = setTimeout(function (){
        var self = {};
        self._id = this._id;
        self._par = this._par;
        return function(){
            myStorage[self._id] = null;
            self._par.removeChild(document.getElementById(self._id));
        };
    }.apply(this), ms);
}
    return new Interface;
});
