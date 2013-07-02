# Audio Sprite

An audio sprite is an audio file that has all your sound effects inside.  Think of it as a sprite sheet but with audio.

Provides both html5 and flash audio wrappers.  This way you can use the same audio sprites and code for your desktop and mobile version.

## Caveats

Mobile devices

The implementation of HTML5 audio varies from device to device.  This is one of the only ways I could find to get a consistent experience.  While bundling up
sound effects into one file will increase your initial load time, it makes it only one call just like a CSS sprite sheet.  Once loaded, the effects can be played on demand.

- iOS has to call .Load on a touch event.  Use a different touch event to call .Play or the audio will not play on the first .Play call
- iOS won't load/play audio without a touch event activated by the user.
- iOS cannot play more than one audio stream at the same time..
- Android is not the best at playing media.  You may need to try different audio encoding to get it to work.
- Feature detection isn't the greatest for detecting whether or not an mp3 or ogg can play.  In my tests, Chrome and Firefox both returned inconsistent results
with the "CAN PLAY" method.  It returns "maybe", "probably", empty string.  Chrome kept returning "probably" on both ogg and mp3.  Boo!

# Usage

Create an object of the timing in your audio file.  Give it a reference name, start, end, and if it loops:

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
    (Modernizr.canvas) ? browserAudio = new Sound.Html5AudioSprite({
        mp3_src : "../example/s2w.mp3?v=5",
        ogg_src : "../example/s2w.ogg?v=4" }) :

    browserAudio = new Sound.FlashAudio({
        mp3_src: "../example/s2w.mp3?v=3",
        swf : "../flash/audioplayer.swf?v=2",
        flashElement : "slots" });

    var audioSprite = new Sound({
        container: $('#sound'),
        wrapper:
        [
            browserAudio
        ]
    });
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

## Implementation

For the game I was developing, I didn't want to have two different sets of audio code.  So I created one audio sprite for all the game's sound effects.
The game also had to work on IE8, so I created a wrapper that could play both HTML5 and Flash.

As for Firefox, I had to use Flash since it doesn't natively play mp3s (I realize that is changing in future releases).