package com.rsadwick.WebAudio 
{
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.external.ExternalInterface;
	import flash.media.Sound;
	import flash.media.SoundChannel;
	import flash.media.SoundTransform;
	import flash.net.URLRequest;
	
	public class AudioPlayer extends Sprite
	{
		private var src:String;
		private var sound:Sound;
		private var channel:SoundChannel;
		private var soundsTransform:SoundTransform;
		
		public function AudioPlayer(src:String) 
		{
			this.src = src;
			sound = new Sound();
			sound.load(new URLRequest(src));
			channel = new SoundChannel();
			soundsTransform = new SoundTransform();
			
			ExternalInterface.addCallback("play", play);
			ExternalInterface.addCallback("pause", pause);
			ExternalInterface.call("loadFlashContainer");
			ExternalInterface.addCallback("setAudioVolume", setAudioVolume);
			//ExternalInterface.addCallback("getAudioVolume", getAudioVolume);
		}
		
		protected function play():void
		{	
			channel = sound.play();
			channel.soundTransform = soundsTransform;
			channel.addEventListener(Event.SOUND_COMPLETE, onComplete);
		}
		
		protected function pause():void
		{
			channel.stop();
		}
		
		protected function onComplete(e:Event):void
		{
			ExternalInterface.call("flashSoundComplete");
		}
		
		protected function setAudioVolume(volume:Number):void
		{
			channel = sound.play();
			soundsTransform.volume = volume;
			channel.soundTransform = soundsTransform;
		}
	}
}