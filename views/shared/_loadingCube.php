<div class="loading-cube">
	<div class="side one"></div>
	<div class="side two"></div>
	<div class="side three"></div>
	<div class="side four"></div>
</div>
<style>/* Loading Cube */
.loading-cube {
	display: inline-block;
	position: relative;
	height: 10px;
	width: 50px;
	transform-style: preserve-3d;
	-webkit-transform-style: preserve-3d;
	-moz-transform-style: preserve-3d;
	-ms-transform-style: preserve-3d;
	-o-transform-style: preserve-3d;
	
	-webkit-animation: rotatingY 2s linear infinite;
	-moz-animation: rotatingY 2s linear infinite;
	-ms-animation: rotatingY 2s linear infinite;
	-o-animation: rotatingY 2s linear infinite;	
}

.loading-cube .side {
	background-color: rgb(50, 50, 50);
	-webkit-box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.5);
	-moz-box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.5);
	-ms-box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.5);
	-o-box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.5);
	height: 10px;
	width: 10px;
	opacity: 0.7;
	position: absolute;
}

.loading-cube .side.one {
	background-color: rgb(242, 24, 25);
	-webkit-transform: rotateX(90deg) translateZ(25px);
	-moz-transform: rotateX(90deg) translateZ(25px);
	-ms-transform: rotateX(90deg) translateZ(25px);
	-o-transform: rotateX(90deg) translateZ(25px);
}

.loading-cube .side.two {
	background-color: rgb(235, 41, 158);
	-webkit-transform: translateZ(25px);
	-moz-transform: translateZ(25px);
	-ms-transform: translateZ(25px);
	-o-transform: translateZ(25px);
}

.loading-cube .side.three {
	background-color: rgb(252, 209, 22);
	-webkit-transform: rotateY(90deg) translateZ(25px);
	-moz-transform: rotateY(90deg) translateZ(25px);
	-ms-transform: rotateY(90deg) translateZ(25px);
	-o-transform: rotateY(90deg) translateZ(25px);
}

.loading-cube .side.four {
	background-color: rgb(44, 45, 213);
	-webkit-transform: rotateY(180deg) translateZ(25px);
	-moz-transform: rotateY(180deg) translateZ(25px);
	-ms-transform: rotateY(180deg) translateZ(25px);
	-o-transform: rotateY(180deg) translateZ(25px);
}
</style>