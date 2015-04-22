<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<!-- Always force latest IE rendering engine (even in intranet) & Chrome Frame -->
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title><?php echo $_title; ?></title>
<meta name="description" content="Two player nxn game of tic-tac-toe">
<meta name="author" content="Strake">
<meta name="viewport" content="width=device-width; initial-scale=1.0">
<!-- TODO: favicon.ico & apple-touch-icon.png in the root and delete these references -->
<link rel="shortcut icon" href="/favicon.ico">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">

<link rel="stylesheet" href="/css/common.css">
<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/knockout/3.3.0/knockout-debug.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/knockout-validation/2.0.2/knockout.validation.js"></script>
<script type="text/javascript" src="/js/knockout.extensions.js"></script>
<script type="text/javascript" src="/js/tictactoe.js"></script>
</head>
<body>
    <?php echo $_content; ?> 
    <footer>
		<p>&copy; Copyright by Strake</p>
	</footer>
</body>
</html>
