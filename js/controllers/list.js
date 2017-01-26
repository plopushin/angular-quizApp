(function(){
	angular
		//fetch the turtleFacts module
		.module("turtleFacts")
		.controller("listCtrl", ListController);

        //what do we want to put in?
        ListController.$inject = ['quizMetrics', 'DataService'];

		//$scope to bind things on
		function ListController(quizMetrics, DataService) {
			//vm = view model
			var vm = this;

            vm.quizMetrics = quizMetrics; //gets access from quizMetrics
			vm.data = DataService.turtlesData;
			vm.activeTurtle = {};
            vm.changeActiveTurtle = changeActiveTurtle;
            vm.activateQuiz = activateQuiz;
            vm.search = "";

            //METHODS
			
			function changeActiveTurtle(index){
				//set active turtle to info in current index
				vm.activeTurtle = index;
			}

            function activateQuiz(){
                //take what is passed in ListController
                quizMetrics.changeState("quiz", true);
            }
		}

		
})();