angular.module("angularCalc", []);
angular.module("angularCalc").controller("MainController", function($scope){
  $scope.numberList=[0,1,2,3,4,5,6,7,8,9, "+","-", "*","/","="];
  $scope.equationList=[];
  var enteredProblem=[];
  var displayString=" ";
  $scope.display=" Enter Number ";
  $scope.clear= function(){
    displayString="";
    enteredProblem=[];
    $scope.display=" Enter Number";
  }
  $scope.someFunction = function(clickedItem){
    displayString+=clickedItem.toString();
    $scope.display=displayString;
    if(clickedItem==="="){
      turnArrayintoEquation(enteredProblem);
    }
    else{
      enteredProblem.push(clickedItem);
      console.log(enteredProblem);
    }
  }
  function turnArrayintoEquation(equationArray){
    var totalSum=0;
    var firstArgument=0;
    for(var i=0; i<equationArray.length-1; i++){
      if((typeof equationArray[i]==="number" || Number(equationArray[i]!=NaN)) &&
          typeof equationArray[i+1]==="number"){
            equationArray[i+1]=equationArray[i].toString()+equationArray[i+1].toString();
            equationArray[i]=undefined;
          }
    }
    for(var i=0; i<equationArray.length; i++){
      if(equationArray[i]===undefined){
          equationArray.splice(i,1);
          i--;
      }
    }
    firstArgument=Number(equationArray[0]);
    totalSum+=firstArgument;
    for(var i=1; i<equationArray.length; i++){
      var operator=equationArray[i].charAt(0);
      switch(operator){
        case "+":
          totalSum+=Number(equationArray[i].slice(1));
          break;
        case "-":
          totalSum-=Number(equationArray[i].slice(1));
          break;
        case "*":
          totalSum*=Number(equationArray[i].slice(1));
          break;
          case "/":
            totalSum/=Number(equationArray[i].slice(1));
            break;
          // default
          //   console.log("broken switch");
        }
      }
      $scope.equationList.push(displayString + totalSum);
      enteredProblem=[totalSum];
      displayString=totalSum.toString();
      $scope.display=totalSum;
    console.log(equationArray, firstArgument, totalSum);
  }
})
