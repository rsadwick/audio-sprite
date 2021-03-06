package  
{
	import com.rsadwick.WebAudio.AudioPlayer;
	import com.rsadwick.WebAudio.FlashVars;
	import flash.display.Sprite;
	import flash.external.ExternalInterface;
	import flash.system.Security;

	public class Player extends Sprite
	{
		private var flashVars:Object;
		private var player:AudioPlayer;
		
		public function Player() 
		{
			Security.allowDomain('*');
			flashVars = (this.loaderInfo.parameters);
			var modal:FlashVars = new FlashVars(flashVars);
			player = new AudioPlayer(modal.getParams().src);
		}
	}
}