var displayArray = [];;

function setup(word, session){
  answerArray = word.split('');
  answerArray.forEach(function(){
    displayArray.push("_")
    console.log(displayArray)
    session.displayArray = displayArray;
  })
}

function play(guessedLetter, session){
  
}

module.exports = {
  setup: setup,
  play: play
}
