; (function ($) {
    Sound.Audio = (function () {
        Audio.name = 'Sound.Audio';

        function Audio(config) {
            config = (config = config || {});
        };

        Audio.prototype._canvas = null;
        Audio.prototype._isRendered = false;

        // This private method must be implemented by all Sound.Audio subclasses.
        Audio.prototype._render = function () {
            throw "_render() is not implemented in " + this.constructor.name;
        };

        // This private method must be implemented by all Sound.Audio subclasses.
        Audio.prototype._reset = function () {
            throw "_reset() is not implemented in " + this.constructor.name;
        };

        // This private method must be implemented by all Sound.Audio subclasses.
        Audio.prototype._start = function () {
            throw "_start() is not implemented in " + this.constructor.name;
        };

        // This private method must be implemented by all Sound.Audio subclasses.
        Audio.prototype._stop = function () {
            throw "_stop() is not implemented in " + this.constructor.name;
        };

        Audio.prototype.GetCanvas = function () {
            if (null == this._canvas) {
                this._canvas = $('<div class="canvas"></div>');
            }
            return this._canvas;
        };

        Audio.prototype.IsRendered = function () {
            return this._isRendered;
        };

        Audio.prototype.Render = function () {
            if (this.IsRendered()) {
                return;
            }

            this._isRendered = this._render();

            if (this.IsRendered()) {
                this.Reset();
            }
        };

        Audio.prototype.Reset = function () {
            this._reset();
        };

        Audio.prototype.Start = function (sound) {
            this._start(sound);
        };

        Audio.prototype.Stop = function () {
            this._stop();
        };

        return Audio;
    })();
})(jQuery);
