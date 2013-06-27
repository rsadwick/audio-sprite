package com.rsadwick.WebAudio 
{
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.TimerEvent;
	import flash.external.ExternalInterface;
	import flash.media.Sound;
	import flash.media.SoundChannel;
	import flash.media.SoundTransform;
	import flash.net.URLRequest;
	import flash.utils.Timer;
	
	public class AudioPlayer extends Sprite
	{
		private var src:String;
		private var sound:Sound;
		private var channel:SoundChannel;
		private var soundsTransform:SoundTransform;
		private var timer:Timer;
		private var position:Object;
		
		public function AudioPlayer(src:String) 
		{
			this.src = src;
			sound = new Sound();
			sound.load(new URLRequest(src));
			channel = new SoundChannel();
			soundsTransform = new SoundTransform();
			timer = new Timer(200);
			timer.addEventListener(TimerEvent.TIMER, progress);
			
			ExternalInterface.addCallback("playSound", playSound);
			ExternalInterface.addCallback("pauseSound", pauseSound);
			ExternalInterface.call("loadFlashContainer");
		}
		
		protected function playSound(position:Object):void
		{
			timer.removeEventListener(TimerEvent.TIMER, progress);
			timer.stop();
			timer.addEventListener(TimerEvent.TIMER, progress);
			this.position = position;
			timer.start();
			channel = sound.play(position.start * 1000);
			channel.soundTransform = soundsTransform;
			channel.addEventListener(Event.SOUND_COMPLETE, onComplete);
		}
		
		protected function progress(e:TimerEvent):void 
		{
			if (channel.position / 1000 >= position.end)
			{
				if (position.loop) {					
					channel.stop();
					channel = sound.play((position.start + 0.0) * 1000);
				}
				else
					channel.stop();	
			}
		}
		
		protected function pauseSound():void
		{
			channel.stop();
		}
		
		protected function onComplete(e:Event):void
		{
			ExternalInterface.call("flashSoundComplete");
		}
	}
}