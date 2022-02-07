import { Component, OnInit, ReflectiveInjector } from '@angular/core';
import { interval, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {
  
  users = [
    {firstName: 'Ateeq', lastName: 'Mirza', age: 36, gender: 'male'},
    {firstName: 'Virat', lastName: 'Kohli', age: 34, gender: 'male'},
    {firstName: 'Nora', lastName: 'Fatehi', age: 24, gender: 'female'},
    {firstName: 'Kirsten', lastName: 'Wood', age: 18, gender: 'female'},
    {firstName: 'Joss', lastName: 'Buttler', age: 34, gender: 'male'},
  ];
  constructor() { }
  ngOnInit(): void {
    //this.testMapFunction();
    //this.testFilterFunction();
    //this.testReduceFunction();
    this.findAgeWiseUserCount();

    //this.createIntervalObservable();
    this.operatorExamples();
    this.promiseExample();
    this.promiseAllExample();
  }

  promiseAllExample(){
    const promFunction1 = new Promise((resolve, reject)=>{
      resolve('Function-1 completed')
    })
    const promFunction2 = new Promise((resolve, reject)=>{
      resolve('Function-2 completed')
    })
    const promFunction3 = new Promise((resolve, reject)=>{
      resolve('Function-3 completed')
    })

    //Runs all promises in parallel and returns sucess when all resolves
    Promise.all([promFunction1, promFunction2, promFunction3])
    .then((msgs)=>{console.log(msgs)});

    //Returns as soon as one of the promise is resolved
    Promise.race([promFunction1, promFunction2, promFunction3])
    .then((msg)=>{console.log(msg)});
  }

  promiseExample(){
    let additionPromise = new Promise((resolve, reject) => {
       let result = 1 + 2;
       if(result == 3){
         resolve(result);
       }else{
         reject(result);
       }
    });
    additionPromise
    .then((msg) => {console.log('Promise Success...expected 3 and got '+msg)})
    .then((msg) => {console.log('Doing more stuff with result: '+msg)})
    .catch((msg) => {console.log('Promise Failed, expected 2 and got '+ msg)});
  }

  findYoungestFemale(){
    const userObservavle = of(this.users);

    
  }

  operatorExamples(){
    const nums = of(1, 2, 3);
    nums.subscribe(v=>console.log(v));
    const squareValues = map((val: number) => val * val);
    const squaredNums = squareValues(nums);
    squaredNums.subscribe(x => console.log(`Square value = ${x}`));
  }
  createIntervalObservable(){
    const counterObservable = interval(1000); //time period in miliseconds
    counterObservable.subscribe(n => console.log(`Its been ${n+1} seconds since subscribing`));
  }

  findAgeWiseUserCount(){
    let initalCount = [0];
    const countOutput = this.users.reduce(function (countList, currentUser){
      if(countList[currentUser.age]){
        countList[currentUser.age]++;
      }else{
        countList[currentUser.age] = 1;
      }
      return countList;
    }, initalCount);

    console.log(countOutput);
  }

  testReduceFunction(){
    //.reduce function calls specified function(or inlineFunction) for each array item and returns 
    //accumulated result which is then passed to next item call.
    //Initial value for this accumulated result variable can be done using second parameter of reduce function.
    const gradeArray = [10, 45, 90, 35, 70, 80];

    //reduce function to find sum of all items
    const gradesSum = gradeArray.reduce(function(sumResult, currentItem) {
      sumResult = sumResult + currentItem;
      return sumResult;
    }, //Callback function
    0 //initialValue for sumResult
    );
    console.log(gradesSum);

    //reduce function to find 
    const maxGradeResult = gradeArray.reduce(function(maxGrade, currentGrade){
      if(currentGrade > maxGrade){
        maxGrade = currentGrade;
      }
      return maxGrade;
    }, 0);
    console.log(maxGradeResult);
  }

  testFilterFunction(){
    //.filter() method filters the array based on filter criteria specified in the function/inlinefunction
    //only items which match filter criteria will be returned.
    const gradeArray = [10, 45, 20, 35, 70, 80];
    const passingGrades = gradeArray.filter(this.isPassingGrade);
    console.log(passingGrades);

    const failedGrades = gradeArray.filter((g) => g< 45); //using inline/arrow function code
    console.log(failedGrades);
  }
   isPassingGrade(grade: number){
      return grade>=45;
   }

  testMapFunction(){
    //.map function basically transforms each item of the array using the function/inlinefunction passed
    //and returns transformed value for each item. Resulting array will be of same size
    const gradeArray = [10, 45, 20, 35]
    console.log('original array = ', gradeArray);

    const upgradedGrades = gradeArray.map(this.increaseByFive);
    console.log(upgradedGrades);

    const binaryFormatGrades = gradeArray.map(this.binaryFormat);
    console.log(binaryFormatGrades);

    const doubleGrades = gradeArray.map((g)=> g*2); //using inline/arrow function code
    console.log(doubleGrades);
  }
  increaseByFive(grade: number){
    return grade+5;
  }
  binaryFormat(grade: number){
    return grade.toString(2);
  }

}
