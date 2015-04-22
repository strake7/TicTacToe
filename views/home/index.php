<link rel="stylesheet" href="/css/tictactoe.css" />
<?php $_title = 'Tic Tac Toe';?>
<?php ob_start(); ?>
<!-- #Content Region# -->
<div id="welcome" class="centered-x" data-bind="with: welcomeVm, visible: welcomeVm.visible">
	<h1>Welcome!</h1>
	<div data-bind="visible: screen() === 0">
		<form>
			<h4>Enter a name for player 1 and player 2</h4>
			<div>
				<label>Player 1</label> <input type="text" data-bind="value: player1Name" />*
			</div>
			<div>
				<label>Player 2</label> <input type="text" data-bind="value: player2Name" />*
			</div>
			<button data-bind="element: nextBtn.element, click: nextBtn.click">Next</button>
		</form>
	</div>
	<div data-bind="visible: screen() === 1">
		<form>
			<h4>Almost there... What size board are we playing on?</h4>
			<div>
				<label for="gridSize">Enter board size:</label> <input type="number" data-bind="value: gridSize" />*
			</div>
			<br />
			<button type="button" data-bind="element: prevBtn.element, click: prevBtn.click" title="Back to name selection">
				<i class="fa fa-arrow-left"></i>

			</button>
			<button type="submit" title="Start the game" data-bind="element: startBtn.element, click: startBtn.click">Start Game</button>
		</form>
	</div>
</div>
<div data-bind="with:loadingVm, visible: loadingVm.visible">
    <?php include('../shared/_loadingPage.php');?>
</div>
<div id="game" data-bind="if: visible" class="centered-x">
	<div data-bind="with: currentPlayer">
		<h4>
			<span data-bind="text: name"></span> it is your turn!
		</h4>
	</div>
	<div id="grid" class="grid" data-bind="foreach: grid.gridArr">
		<div class="grid-row" data-bind="foreach: $data">
			<div class="grid-cell pointer" data-bind="click: click, html: getPlayerMark, css: getPlayerMarkClass"></div>
		</div>
	</div>
</div>

<div id="results" data-bind="visible: resultsVm.visible, with: resultsVm" class="centered-x">
    <h3 data-bind="text: message"></h3>
    <button data-bind="click: playAgain" title="Play again using the same board and player settings">Play Again</button>
    <button data-bind="click: newGame" title="Create a brand new game">New Game</button>
</div>
<script type="text/javascript">
    var vm = new TttViewModel();
    vm.init();
    ko.applyBindings(vm);
</script>
<?php $_content = ob_get_contents(); ob_end_clean();?>
<?php include('../shared/layout.php');?>
