const questions=[
  {
    question: "What is the correct way to declare a JavaScript variable?",
    answers:[
        {text:"variable x = 5;",correct:false},
        {text:"var x = 5;",correct:true},
        {text:"x := 5;",correct:false},
        {text:"declare x = 5;",correct:false},

    ]
  },


  {
    question: "Which of the following is a valid JavaScript data type?",
    answers:[
        {text:"string",correct:false},
        {text:"number",correct:false},
        {text:"boolean",correct:false},
        {text:"All of the above",correct:true},

    ]
  }, 


  {
    question: "Which of the following is the correct syntax to create a function in JavaScript?",
    answers:[
        {text:"function = myFunction() {}",correct:false},
        {text:"function myFunction() {}",correct:true},
        {text:"create function myFunction() {}",correct:false},
        {text:"function: myFunction() {}",correct:false},

    ]
  },


  {
    question: "How do you write an 'if' statement in JavaScript to check if 'x' is equal to 10?",
    answers:[
        {text:" if (x = 10)",correct:false},
        {text:"if x == 10",correct:false},
        {text:"if (x == 10)",correct:true},
        {text:"if x = 10",correct:false},

    ]
  },


  {
    question: "How do you add a comment in JavaScript?",
    answers:[
        {text:" *// This is a comment //*",correct:false},
        {text:"// This is a comment",correct:false},
        {text:"/* This is a comment */",correct:false},
        {text:"Both b and c",correct:true},

    ]
  }
  

];

const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let CurrentQuestionIndex=0;
let score=0;

function startQuiz(){
  CurrentQuestionIndex=0;
  score=0;
  nextButton.innerHTML="Next";
  showQuestion();
}

function showQuestion(){
  resetState();
  let currentQuestion=questions[CurrentQuestionIndex]
  let questionNo=CurrentQuestionIndex +1;
  questionElement.innerText= questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer =>{
    const button=document.createElement("button");
    button.innerHTML=answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);

     if(answer.correct){
      button.dataset.correct=answer.correct;
     }
    button.addEventListener("click",selectAnswer);
  });

}

function resetState(){
  nextButton.style.display="none"
  while(answerButtons.firstElementChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e){
  const selectedBtn=e.target;
  const isCorrect=selectedBtn.dataset.correct==="true";
  if(isCorrect){
    selectedBtn.classList.add("correct")
    score++;
  }
  else{
    selectedBtn.classList.add("incorrect")
  }

  Array.from(answerButtons.children).forEach(button =>{
    if(button.dataset.correct==="true"){
      button.classList.add("correct");
    }
    button.disabled=true;
  });
  nextButton.style.display="block";
}

function showScore(){
  resetState();
  questionElement.innerHTML= `You scored ${score} out of
  ${questions.length}!`;
  nextButton.innerHTML="Play Again";
  nextButton.style.display="block";
}
function handleNextButton(){
  CurrentQuestionIndex++;
  if(CurrentQuestionIndex < questions.length){
    showQuestion();
  }
  else{
    showScore();
  }
}

nextButton.addEventListener("click",()=>{
  if(CurrentQuestionIndex < questions.length){
    handleNextButton();
  }
  else{
    startQuiz(); 
  }
});
startQuiz();
 
