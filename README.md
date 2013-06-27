# Audio Sprite

Create audio sprites for use with mobile & desktop devices.

Provides both html5 and flash audio wrappers.  This way you can use the same audio sprites and code for your desktop and mobile version.

## Caveats

- Todo

# Usage

Create an object of the timing in your audio file:


```javascript
  var sounds = {
    'roll': {"start" : 0, "end" : 2.0, "loop" : true},
    'drumroll': {"start" : 2.7, "end" : 6.1, "loop" : true},
    'drumend': {"start" : 6.3, "end" : 9.5, "loop" : false},
    'win': {"start" : 7.8, "end" : 9.5, "loop" : false}
  }
```

If you need Flash and HTML5 audio, you can do some feature/user agent detection (whatever floats your boat) to use the wrapper that is needed:

```javascript
    var browserAudio = null;
    if(!Modernizr.canvas)
    {
        browserAudio = new Sound.Html5AudioSprite({ mp3_src : "../example/s2w.mp3?v=5", ogg_src : "../example/s2w.ogg?v=4" });
    }
    else
    {
        browserAudio = new Sound.FlashAudio({ mp3_src: "../example/s2w.mp3?v=3", swf : "../flash/audioplayer.swf?v=2", flashElement : "slots" });
    }
```

Then load the audio file.  Remember that iOS needs to call .Load on a touch event.  .Play also needs to happen on a touch event or nothing will play:

```javascript
    $('#load').on('click', function(){
        audioSprite.Load();
    })

    $('#roll').on('click', function(){
        audioSprite.Play(sounds.roll);
    })
```