package  
{
	import com.rsadwick.WebAudio.FlashVars;
	/**
	 * ...
	 * @author Ryan Sadwick
	 */
	public class AudioPlayer 
	{
		private var flashVars:Object;
		public function AudioPlayer() 
		{
			flashVars = (this.loaderInfo.parameters);
			
			var modal:FlashVars = new FlashVars(flashVars);
		}
		
	}

}