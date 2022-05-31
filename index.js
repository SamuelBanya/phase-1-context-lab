/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
*/

function createEmployeeRecord(elementArray) {
  console.log("________________________________________");
  console.log("Inside createEmployeeRecord() function: ");
  let employeeRecordObj = {};

  let timeInEvents = [];
  let timeOutEvents = [];

  employeeRecordObj["firstName"] = elementArray[0];
  employeeRecordObj["familyName"] = elementArray[1];
  employeeRecordObj["title"] = elementArray[2];
  employeeRecordObj["payPerHour"] = elementArray[3];
  employeeRecordObj["timeInEvents"] = timeInEvents;
  employeeRecordObj["timeOutEvents"] = timeOutEvents;

  console.log("employeeRecordObj: ", employeeRecordObj);

  return employeeRecordObj;
}

function createEmployeeRecords(embeddedArray) {
  console.log("________________________________________");
  console.log("Inside createEmployeeRecords() function: ");

  let employeeRecordObjArray = [];
  embeddedArray.forEach((individualArray) => {
    console.log("individualArray: ", individualArray);
    let employeeRecordObj = createEmployeeRecord(individualArray);

    employeeRecordObjArray.push(employeeRecordObj);
  });

  console.log("employeeRecordObjArray: ", employeeRecordObjArray);

  return employeeRecordObjArray;
}

function createTimeInEvent(dateStamp) {
  console.log("________________________________________");
  console.log("Inside createTimeInEvent() function: ");
}

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

// TESTING SECTION:
console.log("________________________________________");
console.log("Testing createEmployeeRecord() function: ");
let testEmployee = createEmployeeRecord(["Gray", "Worm", "Security", 1]);

console.log("________________________________________");
console.log("Testing createEmployeeRecords() function: ");
let twoRows = [
  ["moe", "sizlak", "barkeep", 2],
  ["bartholomew", "simpson", "scamp", 3]
];

createEmployeeRecords(twoRows);

console.log("________________________________________");
console.log("Testing createTimeInEvent() function: ");
