<div class="modal fade" id="logsModal" role="dialog" aria-labelledby="myModalLabel">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title">Logs</h4>
				</div>
				<div class="modal-body">
				    <div style="margin-top: 10px; max-height: 500px; overflow-y: scroll;">
				    		
				    			<h4></h4>
				    			Time spent
				    			<input type="number" id="timeSpent" step="0.5">
				    			<input type="hidden" id ="xtaskPhase"  >
				    			<input type="hidden" id ="xtaskName" >
				    			
				    			<div class="containerList" id="toBeLog">
								</div>
				    	
					</div>
				</div>
				<div class="modal-footer">
					<button onclick="addLog()">add</button>
				</div>
			</div><!-- /.modal-content -->
		</div><!-- /.modal-dialog -->
	</div><!-- /.modal -->