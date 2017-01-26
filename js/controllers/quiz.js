(function(){
	angular
		.module("turtleFacts")
		.controller("quizCtrl", QuizController);

		QuizController.$inject = ['quizMetrics', 'DataService'];

		function QuizController(quizMetrics, DataService){

			var vm = this;

			vm.quizMetrics = quizMetrics;
			vm.dataService = DataService;
			vm.activeQuestion = 0; //default set to zero
			vm.questionAnswered = questionAnswered;
			vm.setActiveQuestion = setActiveQuestion;
			vm.selectAnswer = selectAnswer;
			vm.error = false;
			vm.finalise = false;
			vm.finaliseAnswers= finaliseAnswers;

			var numQuestionsAnswered = 0;

			function setActiveQuestion(index) {
				if(index === undefined) {
					var breakOut = false;
					//-1 as 0 index and referencing the active question
					var quizLength = DataService.quizQuestions.length -1;

					while(!breakOut) {
						vm.activeQuestion = vm.activeQuestion < quizLength?++vm.activeQuestion:0;

						if(vm.activeQuestion === 0) {
							vm.error = true;
						}

						if(DataService.quizQuestions[vm.activeQuestion].selected === null) {
							breakOut = true;
						}
					}
				} else {
					vm.activeQuestion = index;
				}
			}

			function questionAnswered(){

				var quizLength = DataService.quizQuestions.length;

				if(DataService.quizQuestions[vm.activeQuestion].selected !== null){
					numQuestionsAnswered++;
					//check for all questions answered
					if(numQuestionsAnswered >= quizLength) {
						//finalize the quiz. 
						for(var i = 0; i < quizLength; i++) {
							if(DataService.quizQuestions[i].selected === null){
								setActiveQuestion(i);
								return;
							}
						}
						vm.error = false;
						vm.finalise = true;
						return;
					}
				}

				vm.setActiveQuestion();
			}

			function selectAnswer(index) {
				DataService.quizQuestions[vm.activeQuestion].selected = index;
			}

			function finaliseAnswers(){
				vm.finalise = false;
				numQuestionsAnswered = 0;
				vm.activeQuestion = 0;
				quizMetrics.markQuiz("quiz", false);
				quizMetrics.changeState("results", true);
			}
			
		}
})();