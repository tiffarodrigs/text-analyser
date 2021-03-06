//Utility Logic

function noInputtedWord(){
  for(let i=0 ; i < arguments.length ; i++)
  {
    if(arguments[i].trim().length === 0){
    return true;
    }
  }
  return false;
}

// Business Logic

function wordCounter(text) {
 if(noInputtedWord(text)) {
    return 0;
  }
  let wordCount = 0;
  const wordArray = text.split(" ");
  wordArray.forEach(function(element) {
    if (!Number(element)) {
      wordCount++;
    }
  });
  return wordCount;
}

function numberOfOccurrencesInText(word, text) {
  if(noInputtedWord(word,text))
  {
     return 0;
  }
  const wordArray = text.split(" ");
  let wordCount = 0;
  wordArray.forEach(function(element) {
    if (element.toLowerCase().includes(word.toLowerCase())) {
      wordCount++;
    }
  });
  return wordCount;
}

function boldPassage(word, text) {
  if(noInputtedWord(word,text))
  {
     return "";
  }
  let htmlString = "<p>";
  let textArray = text.split(" ");
  textArray.forEach(function(element, index) {
    if (element.toLowerCase().includes(word.toLowerCase())) {
      const splittedWord = element.split(word); // this is an array
      const boldedText = "<b>"+ word +"</b>"; // string
      htmlString = htmlString.concat(splittedWord.join(boldedText));
    } else {
      htmlString = htmlString.concat(element);
    }
    if (index !== (textArray.length - 1)) {
      htmlString = htmlString.concat(" ");
    }
  });
  return htmlString + "</p>";
}

function omitOffensive(text){
let htmlStringOffensive = "<p>";
let offensiveArray=["zoinks", "muppeteer", "biffaroni","loopdaloop"];
let textArray = text.split(" ");
textArray.forEach(function(element,index){
  if(offensiveArray.includes(element.toLowerCase()))
  {
    htmlStringOffensive= htmlStringOffensive.concat(" ");
  }
  else{
  htmlStringOffensive = htmlStringOffensive.concat(element);
  } 
  if (index !== (textArray.length - 1)) {
    htmlStringOffensive = htmlStringOffensive.concat(" ");
  }
});
return htmlStringOffensive + "</p>";

}



function threeMostUsedWord(text){
  let textArray = text.toLowerCase().split(" ");
  let count=0;
  let matchedWord=null;
  let resultArray=[];
  const wordCounter = [];
  let finalArray=[];
  textArray.sort().forEach(function(element)
  {
    if(element!=matchedWord)
    {
    //  if(count>0) {
    //    count++;
    //  }
    if(matchedWord != null){
    wordCounter.push([matchedWord,count]);
    }
      matchedWord=element;
      count=1;
    }
    else
    {
      count++;
    }
  });

   wordCounter.push([matchedWord,count]);
    wordCounter.sort( function(a,b) { return b[1] - a[1]});

    console.log({wordCounter})
   finalArray = wordCounter.splice(0, 3);
   console.log("Most common words:")
   finalArray.forEach(function(element){

    console.log(element[0]+": "+ element[1])
   });
}

function firstInstanceOfWord(word,text)
{
  const textArray=text.split(" ");
  for(var i=0; i<textArray.length ; i++){
    if(textArray[i]=== word){
    return i
    }
  }
  return -1
  //split and store in array
  //iterate the Array using for
  //inside for if word and element matches return

}







// UI Logic
$(document).ready(function(){
  $("form#word-counter").submit(function(event){
    event.preventDefault();
    const passage = $("#text-passage").val();
    const word = $("#word").val();
    const wordCount = wordCounter(passage);
    const occurrencesOfWord = numberOfOccurrencesInText(word, passage);
    const ommitOffensiveWord =omitOffensive(passage);
    const usedWord=threeMostUsedWord(passage);
   
    $("#total-count").html(wordCount);
    $("#selected-count").html(occurrencesOfWord);
    $("#bolded-passage").html(boldPassage(word, passage));
    $("#offensive-passage").html(ommitOffensiveWord)
  });
});