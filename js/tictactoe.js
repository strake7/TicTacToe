
/// Tic tac toe view model. Main control for this application
function TttViewModel(){	
	var self = this;
	this.visible = ko.observable(false);
	this.welcomeVm;		
	this.resultsVm;
	this.players = ko.observableArray([]);		
	this.currentPlayer = ko.observable();
	this.grid;
}
TttViewModel.prototype = {
	init: function(){
		this.welcomeVm = new WelcomeViewModel(this);
		this.loadingVm = new LoadingViewModel();
		this.resultsVm = new ResultsViewModel(this);		
		// TODO: load in existing players from local. Continue / new screen
		this.welcomeVm.visible(true); 
		//this.startGame("Player1", "Player2", 3);// debug injections		
	},
	startGame: function(name1, name2, gridSize){
		var base = this;
		this.loadingVm.visible(true);
		this.loadingVm.message("Generating game...");
		this.players([new Player(name1, "X"), new Player(name2, "O")]);             
		this.grid = new Grid(this, gridSize);		
		document.getElementById("game").style.minWidth = 50 * gridSize;	   
		// randomly select starting player.. purposefully delayed to show animation and result		
		setTimeout(function(){ 
			base.loadingVm.message("Randomly selecting starting player...");
			base.currentPlayer(base.players()[Math.floor(Math.random() * ((base.players().length)))]); 
			setTimeout(function(){
				base.loadingVm.message(base.currentPlayer().name() + " is up first!");
				setTimeout(function(){
					base.loadingVm.visible(false);
					base.grid.init();
				    base.visible(true);
				}, 1000);
			}, 1000)
		}, 500);		
	},
	restartGame:function(){
		this.startGame(this.players()[0].name(), this.players()[1].name(), this.grid.size());		
	},
	checkWinningMove: function(lastCell){
	    var base = this,
	        isWinner = this.isWinningMove(lastCell);
        if(isWinner){
        	 base.resultsVm.message(base.currentPlayer().name() + " is victorious!");
        	 base.visible(false);
        	 base.resultsVm.visible(true);             
        }
        else if(this.grid.allCells().filter(function(a){ return !a.owningPlayer();}).length === 0){
            // game over, no players won
            base.resultsVm.message("Tie game!");
            base.visible(false);
            base.resultsVm.visible(true);
        }else	
	    base.nextPlayer(); // not a winning move... lets go on
	},
	isWinningMove: function(gridCell){
        var base = this, 
            arr = [],
            allCells = this.grid.allCells(),
            playerClass = base.currentPlayer().markClass();
            playerCells = allCells.filter(function(a){ return a.getPlayerMarkClass() === playerClass;}); // get marked cells for current user            
        if(playerCells.length < base.grid.size())
        	 // impossible criteria... move on        
            return false;         
        var x = gridCell.coords[0],
            y = gridCell.coords[1];              
        if(x==y){
        	// diagonal checking
            arr = playerCells.filter(function(a){
                return a.coords[0] === a.coords[1];
            });                        
            if(arr.length === base.grid.size())
                return true;
        }        
        if(x+ y === base.grid.size() - 1){
        	// antidiagonal checking 
        	arr = playerCells.filter(function(a){
                return a.coords[0] + a.coords[1] === base.grid.size() - 1;
            });                        
            if(arr.length === base.grid.size())
                return true;
        }
        // vertical checking
        arr = playerCells.filter(function(a){
            return a.coords[0] === x;
        });                        
        if(arr.length === base.grid.size())
            return true;        
        //horizontal checking
        arr = playerCells.filter(function(a){
            return a.coords[1] === y;
        });                        
        if(arr.length === base.grid.size())
            return true;
        return false;
	},	
	nextPlayer: function(){
		var base = this;
	    var idx = base.players().map(function(a){ return a.name();}).indexOf(base.currentPlayer().name());
	    base.currentPlayer(idx === base.players().length-1 ? base.players()[0] : base.players()[idx+1]);		
	}	
}

/// Tic Tac Toe player
function Player(name, mark){	
	this.name = ko.observable(name);	
	this.mark = ko.observable(mark);	
	this.markClass= ko.observable(name + "-mark");
}

/// Object for the tic tac toe grid
function Grid(tttVm, size){
	var self= this;
	this.size = ko.observable(size)
	this.gridArr= ko.observableArray(new Array());
	for(var y = 0; y < size; y++){
		//construct m-array
		this.gridArr().push(x);
		var m = new Array();
		for(var x = 0; x < size; x++){
			m.push(new GridCell(tttVm, x, y));			
		} 
		this.gridArr()[y] = m;
	}
}
Grid.prototype ={
	init: function(){
 	window.onmousemove = function(event) {
 		console.log(event);
 	    var width = screen.width;
 	    var mouseX = event.pageX - (width * 0.5);
 	    var height = screen.height;
 	    var mouseY = event.pageY - (height * 0.5);
 	    var xAngle = (mouseY / height) * 50;
 	    var yAngle = (mouseX / width) * 50;

 	    document.getElementById("grid").style.webkitTransform = "rotateX("+xAngle+"deg) rotateY("+yAngle+"deg)";
 	};
    },
	allCells: function(){
		return this.gridArr().reduce(function(a, b){return a.concat(b);});
	}
}

function GridCell(tttVm, x, y){
	var self = this;
	this.tttVm = tttVm;
	this.coords = [x, y];
	this.owningPlayer = ko.observable();
	this.getPlayerMark = ko.pureComputed(function(){return self.owningPlayer() ? self.owningPlayer().mark() : "";});
	this.getPlayerMarkClass = ko.pureComputed(function(){return self.owningPlayer() ? self.owningPlayer().markClass() : "";});
}
GridCell.prototype.click = function(){
	if(this.owningPlayer())
		return;
	this.owningPlayer(this.tttVm.currentPlayer())
	this.tttVm.checkWinningMove(this);
}

/// Welcome screen view model. Handle validation and 
/// setting up the game
function WelcomeViewModel(tttVm){
	var self = this;
	this.visible = ko.observable(false);
	this.screen = ko.observable(0);
	this.player1Name = ko.observable().extend({ required: true, maxLength:25 });
	this.player2Name = ko.observable().extend({ required: true, maxLength:25, notEqual: self.player1Name });
	this.nextBtn = {
      element: ko.observable(),
      enabled:  ko.pureComputed(function(){return self.nameValidation().length === 0;}),
      click:  function(){
          if(!self.nextBtn.enabled())
      	    return self.nameValidation.showAllMessages();
          self.screen(1);
      }           			  
	};	
	this.prevBtn = {
      element: ko.observable(),
      click:  function(){ self.screen(0); }           			  
	};
	this.startBtn = {
		    element: ko.observable(),
		    enabled:  ko.pureComputed(function(){return self.gridValidation().length === 0;}),
		    click: function(){
	    	   if(!self.startBtn.enabled())
	    		   return self.gridValidation.showAllMessages();
	    	   if(!self.nextBtn.enabled()){ // failsafe
		    	   self.screen(0);
	        	   return self.nameValidation.showAllMessages();
      	   }
      	   self.visible(false);
  		   tttVm.startGame(self.player1Name(), self.player2Name(), parseInt(self.gridSize()));
		    }
		}
	this.gridSize = ko.observable().extend({required:true, min:3, max: 15});
	this.gridValidation = ko.validation.group([this.gridSize]);
	this.nameValidation = ko.validation.group([this.player1Name, this.player2Name]);
}

function ResultsViewModel(tttVm){
	var self = this;
	this.tttVm = tttVm;
	this.visible = ko.observable();	
	this.message = ko.observable();
	this.playAgain = function(){
		this.visible(false);
		self.tttVm.restartGame();
	};
	this.newGame = function(){
		this.visible(false);
		self.tttVm.init();
	};
}