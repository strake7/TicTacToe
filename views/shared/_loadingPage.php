<?php ?>
<div class="loading-page">
	<div>
        <?php include '_loadingCube.php';?>
        <small data-bind="text:message" class="loading-page-message margin-left15"></small>
	</div>
</div>
<script type="text/javascript">
function LoadingViewModel(){
	this.visible = ko.observable(false);
	this.message = ko.observable();
}
</script>
<style>
.loading-page {
	position: absolute;
	left: 50%;
	top: 40%;
	transform: translateX(-50%) translateY(-50%);
	-webkit-transform: translateX(-50%) translateY(-50%);
	-moz-transform: translateX(-50%) translateY(-50%);
	-ms-transform: translateX(-50%) translateY(-50%);
	-0-transform: translateX(-50%) translateY(-50%);
}

.loading-page>div {
	width: 200px;
	overflow:visible;
	white-space: nowrap;
}

</style>