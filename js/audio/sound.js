;(function($)
{
    // This is a private helper class we use inernally to associate meta data with raw scene objects.
    var AudioWrapper = function(wrapper)
    {
        this.Audio = wrapper;
        this.Frame = $('<div class="frame"></div>').data('Sound.Audio', this);
        this.Frame.append('<div class="overlay"></div>');
    };

    Sound = function(config)
    {
        var __scope = this;

        config = (config = config || {});

        this._container = $(config.container);

        // Wrap so we can keep additional state.
        this._wrappers = $.map(config.wrapper, function(wrapper)
        {
            return new AudioWrapper(wrapper);
        });

        this._stageViewport = $('<div class="viewport"></div>');

        this._container.append(this._stageViewport);

        $.each(this._wrappers, function(i, AudioWrapper)
        {
            __scope._stageViewport.append(AudioWrapper.Audio.GetCanvas());
        });
    };


    Sound.prototype =
    {
        _container: null,
        _sceneCount: 0,
        _wrappers: null,
        _stage: null,
        _stageViewport: null,

        _activateWrapper: function(newAudioWrapper)
        {
            if (null == newAudioWrapper)
                return;

            var __scope = this;

            var lastAudioWrapper = this._activeAudioWrapper;

            if (!newAudioWrapper.Audio.IsRendered())
                newAudioWrapper.Audio.Render();
            else
             newAudioWrapper.Audio.Reset();

            this._activeAudioWrapper = newAudioWrapper;

            if (null != lastAudioWrapper)
                lastAudioWrapper.Audio.Stop();

            $.each(this._wrappers, function(i, AudioWrapper)
            {
                AudioWrapper.Frame[((AudioWrapper == newAudioWrapper) ? 'addClass' : 'removeClass')]('active');
            });
        },

        _getFirstAudioWrapper: function()
        {
            return ((this._wrappers.length == 0) ? null : this._wrappers[0]);
        },

        _getNextAudioWrapper: function()
        {
            var AudioWrapper = null;

            if (null == this._activeAudioWrapper)
                AudioWrapper = this._getFirstAudioWrapper();
            else
            {
                var activeAudioWrapperIndex = this._getAudioWrapperIndex(this._activeAudioWrapper);
                if (null != activeAudioWrapperIndex)
                {
                    var nextAudioWrapperIndex = (activeAudioWrapperIndex + 1);
                    AudioWrapper = ((this._wrappers.length > nextAudioWrapperIndex) ? this._wrappers[nextAudioWrapperIndex] : null);
                }
            }
            return AudioWrapper;
        },
    
    _getAudioWrapperIndex: function(needleAudioWrapper)
    {
        var AudioWrapperIndex = null;
        $.each(this._wrappers, function(i, haystackAudioWrapper)
        {
            if (haystackAudioWrapper == needleAudioWrapper || haystackAudioWrapper.Audio == needleAudioWrapper)
            {
                AudioWrapperIndex = i;
                return false;
            }
        });
        return AudioWrapperIndex;
    },

    Pause: function()
    {
        this._activeAudioWrapper.Audio.Stop();
    },

    Load: function()
    {
        this._activateWrapper(this._getNextAudioWrapper() || this._getFirstAudioWrapper());
    },

    Play: function(sound)
    {
        this._activeAudioWrapper.Audio.Start(sound);
    }
  };
})(jQuery);
