; (function ($) {
    Sound.Html5AudioSprite = (function (_super) {
        __extends(Html5AudioSprite, _super);

        Html5AudioSprite.name = 'Sound.Html5AudioSprite';

        function Html5AudioSprite(config) {

            audio = this;
            this._currentSound = null;
            this._mp3 = config.mp3_src;
            this._ogg = config.ogg_src;
            this._src = null;

            return Html5AudioSprite.__super__.constructor.call(this, config);
        }

        Html5AudioSprite.prototype._render = function () {
            this._audio = new Audio();
            this._audio.preload = 'auto';
            //probably, maybe stuff that isn't consistant enough to implement
           /* if(this._audio.canPlayType)
            {
                //mp3
                var mp3 = this._audio.canPlayType('audio/mpeg');
                if("" != mp3)
                {
                    this._src = this._mp3;
                }

                //ogg
                var ogg = this._audio.canPlayType('audio/ogg; codecs="vorbis"');;
                if ( "" != ogg)
                {
                    this._src = this._ogg;
                }
            }*/

            this._audio.src = this._mp3;
            this._audio.load();
            this._audio.play();
            this._audio.pause();

            this._audio.addEventListener("canplay", function(){
                //needed for iOS:
                this.play();
                this.pause();
            });

            this._audio.addEventListener("timeupdate", this.OnTimeUpdate);
            return true;
        };

        Html5AudioSprite.prototype._reset = function () {

        };

        Html5AudioSprite.prototype._start = function (sound) {
            this._currentSound = sound;
            try
            {
                this._audio.currentTime = sound.start;
                this._audio.play();
            }
            catch(e){
                setTimeout(this._audio.play, 2000);
            }
        };

        Html5AudioSprite.prototype._stop = function () {
            this._audio.pause();
        };

        Html5AudioSprite.prototype.OnTimeUpdate = function()
        {
            try
            {
                if(this.currentTime >= audio._currentSound.end)
                {
                    if(audio._currentSound.loop)
                        this.currentTime = audio._currentSound.start;
                    else
                        this.pause();
                }
            }
            catch(e){}
        }

        return Html5AudioSprite;
    })(Sound.Audio);
})(jQuery);