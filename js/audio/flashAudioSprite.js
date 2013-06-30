; (function ($) {
    /**
     * class Spin2win.FlashAudio < Spin2win.Scene
     *
     * A simple slideshow scene class that fades in html content.
     **/
    Sound.FlashAudio = (function (_super) {
        __extends(FlashAudio, _super);

        FlashAudio.name = 'Sound.FlashAudio';

        function FlashAudio(config) {
            config = (config = config || {});

            this._swf = config.swf;
            this._flashElement = config.flashElement;
            this._mp3_src = config.mp3_src;
            this.timer;

            return FlashAudio.__super__.constructor.call(this, config);
        }

        FlashAudio.prototype._render = function () {
             __scope = this;

            //Flash element:
            this._element = $('<div/>').attr(
            {
                id : this._flashElement
            });

            this.flash_player;

            this.GetCanvas().append(this._element);
            //flash embed:
            var swfVersionStr = "10.0.0";
            var xiSwfUrlStr = "/flash/expressInstall.swf";
            var flashvars = {};
            flashvars.src = this._mp3_src;
            var params = {};
            params.quality = "high";
            params.wmode = "transparent";
            params.bgcolor = "#000000";
            params.allowscriptaccess = "always";
            params.allowfullscreen = "true";
            params.scale = "exactfit";

            var attributes = {};
            attributes.id = this._flashElement;
            attributes.name = this._flashElement;
            attributes.align = "middle";
            swfobject.embedSWF(this._swf, this._flashElement,
                1, 1,
                swfVersionStr, xiSwfUrlStr,
                flashvars,
                params,
                attributes);
            return true;
        };

        //Flash calls this function when the flash player has metadata:
        loadFlashContainer = function () {
            //reference flash player to call audio api:
            __scope.flash_player = $("#" + __scope._flashElement).get(0);
        };

        //sound complete from Flash:
        flashSoundComplete = function (){
            __scope.OnComplete();
        };

        FlashAudio.prototype._reset = function () {

        };

        FlashAudio.prototype._start = function (sound) {
            if(!__scope.flash_player)
            {
                this.timer = setInterval(this._start, 300);
            }
            else
            {
                window.clearInterval(__scope.timer);
                try{
                    __scope.flash_player.pauseSound();
                    __scope.flash_player.playSound(sound);
                }
                catch(e){}
            }
        };

        FlashAudio.prototype._stop = function () {
            if(__scope.flash_player)
            {
                 try{
                    __scope.flash_player.pauseSound();
                }
                catch(e){}
            }
        };

        return FlashAudio;
    })(Sound.Audio);
})(jQuery);