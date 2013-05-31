package com.rsadwick.WebAudio 
{
	import flash.display.Sprite;
	/**
	 * ...
	 * @author Ryan Sadwick
	 */
	public class FlashVars extends Sprite
	{
		protected var paramObj:Object;
		public function FlashVars((params:Object) 
		{
			stage.scaleMode = StageScaleMode.NO_SCALE;
			try 
			{
				this.paramObj = params;
			} 
			catch (error:Error) 
			{
				//tf.appendText(error.toString());
			}
		}
		
		public function getParams():Object
		{
			return paramObj;
		}
		
	}

}