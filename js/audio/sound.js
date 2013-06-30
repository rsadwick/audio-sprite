;(function($)
{
    // This is a private helper class we use internally to associate meta data with raw scene objects.
    var AudioWrapper = function(scene)
    {
        this.Audio = scene;
        this.Frame = $('<div class="frame"></div>').data('Sound.Audio', this);
        this.Frame.append('<div class="overlay"></div>');
    };

    /**
    * class Sound
    *
    * Provides an user interface for displaying and interacting with multiple [[Sound.Audio]] objects.
    **/
    Sound = function(config)
    {
        var __scope = this;

        config = (config = config || {});

        this._container = $(config.container);

        // Remove anything that may be in the container, such as messaging for users without Javascript.
        //this._container.empty();

        // Wrap all our scenes in our AudioWrapper class so we can keep additional state.
        this._scenes = $.map(config.scenes, function(scene)
        {
            return new AudioWrapper(scene);
        });

        this._stageViewport = $('<div class="viewport"></div>');

        this._container.append(this._stageViewport);

        $.each(this._scenes, function(i, AudioWrapper)
        {
            __scope._stageViewport.append(AudioWrapper.Audio.GetCanvas());
        });
    };


    Sound.prototype =
    {
        _container: null,
        _sceneCount: 0,
        _scenes: null,
        _stage: null,
        _stageViewport: null,

        _activateScene: function(newAudioWrapper)
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

            $.each(this._scenes, function(i, AudioWrapper)
            {
                AudioWrapper.Frame[((AudioWrapper == newAudioWrapper) ? 'addClass' : 'removeClass')]('active');
            });
        },

        _getFirstAudioWrapper: function()
        {
            return ((this._scenes.length == 0) ? null : this._scenes[0]);
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
                    AudioWrapper = ((this._scenes.length > nextAudioWrapperIndex) ? this._scenes[nextAudioWrapperIndex] : null);
                }
            }

            return AudioWrapper;
        },
    
    _getAudioWrapperIndex: function(needleAudioWrapper)
    {
        var AudioWrapperIndex = null;
        $.each(this._scenes, function(i, haystackAudioWrapper)
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
        this._activateScene(this._getNextAudioWrapper() || this._getFirstAudioWrapper());
    },

    Play: function(sound)
    {
        this._activeAudioWrapper.Audio.Start(sound);
    }
  };
})(jQuery);
