//Utility Logic
function noInputtedWord(word,text){
  return ((text.trim().length === 0) || (word.trim().length === 0)) 
    
}

// Business Logic

function wordCounter(text) {
  if (text.trim().length === 0) {
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
      htmlString = htmlString.concat("<b>" + element + "</b>");
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



/*function threeMostUsedWord(text) {
  let textArray = text.split(" ");
let sortArray = textArray.sort();
var current = null;
var cnt = 0;
for (var i = 0; i < sortArray.length; i++) {
    if (sortArray[i] != current) {
        if (cnt > 0) {
            console.log(current + ' comes --> ' + cnt + ' times<br>');
        }
        current = sortArray[i];
        cnt = 1;
    } else {
        cnt++;
    }
}
if (cnt > 0) {
    console.log(current + ' comes --> ' + cnt + ' times');
}

}*/
//hi hi
//hi hello

// 1. Split the sentence
// 2. Iterate the array
// 3. if key exists increase the counter.

function getTopThree(input) {
  // return input.split(" ").reduce(function (result, value) {
  //   if(result[value]) {
  //     result[value] = result[value] + 1;
  //   } else {
  //     result[value] = 1;
  //   }
  //   return result;
  // }, {})

  const array = input.split(" ");
  const sortedArray = array.sort();
  let currWord;
  let counter;
  const wordCounter = [];
 // let finalArray=[];
  sortedArray.forEach(function (value) {
    if(currWord !== value){
      if(currWord !== undefined)
      {
        wordCounter.push([currWord,counter]);
      }
      currWord = value;
      counter = 1;
    } else {
      counter = counter + 1;
    }
  })
  wordCounter.push([currWord,counter]);
 wordCounter.sort( function(a,b) { return a[1] - b[1]})
  finalArray = wordCounter.splice(0, 3);
  console.log(finalArray);

}


function threeMostUsedWord(text){
  let textArray = text.split(" ");
  let count=0;
  let matchedWord=null;
  let resultArray=[];
  const wordCounter = [];
  let finalArray=[];
  textArray.sort().forEach(function(element)
  {
    if(element!=matchedWord)
    {
      if(count>0)
      {
        count++;
      }
      matchedWord=element;
      count=1;

     // console.log(matchedWord + ' comesi --> ' + count + ' times');
    }
    else
    {
      count++;
     // console.log(matchedWord + ' comes --> ' + count + ' times');

    }
    wordCounter.push([matchedWord,count]);
    //console.log(wordCounter);
    wordCounter.sort( function(a,b) { return b[1] - a[1]});

  });

   finalArray = wordCounter.splice(0, 3);
   finalArray.forEach(function(element){
     console.log(element);
     //do string manipulation

   });
   






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