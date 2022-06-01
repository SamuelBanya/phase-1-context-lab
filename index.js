function createEmployeeRecord(elementArray) {
  console.log("________________________________________");
  console.log("Inside createEmployeeRecord() function: ");

  console.log("elementArray: ", elementArray);

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

  console.log("embeddedArray: ", embeddedArray);

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

  console.log("dateStamp: ", dateStamp);

  let dateStampArray = dateStamp.split(" ");
  let datePortion = dateStampArray[0];
  let hourPortion = dateStampArray[1];

  let dateStampObj = {};

  dateStampObj["type"] = "TimeIn";
  dateStampObj["date"] = datePortion;
  dateStampObj["hour"] = parseInt(hourPortion);

  console.log("this: ", this);

  let timeInEventsArray = this["timeInEvents"];

  console.log("timeInEventsArray: ", timeInEventsArray);

  console.log("dateStampObj: ", dateStampObj);

  // NOTE: This action itself is for whatever reason happening way faster than expected
  // So the console.log() output will appear weird with this in mind since the first
  // instance's 'timeInEvents' array will appears to ALREADY have values
  timeInEventsArray.push(dateStampObj);

  console.log("this: ", this);

  return this;
}

function createTimeOutEvent(dateStamp) {
  console.log("________________________________________");
  console.log("Inside createTimeOutEvent() function: ");

  console.log("dateStamp: ", dateStamp);

  let dateStampArray = dateStamp.split(" ");
  let datePortion = dateStampArray[0];
  let hourPortion = dateStampArray[1];

  let dateStampObj = {};

  dateStampObj["type"] = "TimeOut";
  dateStampObj["date"] = datePortion;
  dateStampObj["hour"] = parseInt(hourPortion);

  console.log("this: ", this);

  let timeOutEventsArray = this["timeOutEvents"];

  console.log("timeOutEventsArray: ", timeOutEventsArray);

  console.log("dateStampObj: ", dateStampObj);

  // NOTE: This action itself is for whatever reason happening way faster than expected
  // So the console.log() output will appear weird with this in mind since the first
  // instance's 'timeInEvents' array will appears to ALREADY have values
  timeOutEventsArray.push(dateStampObj);

  console.log("this: ", this);

  return this;
}

function hoursWorkedOnDate(dateStamp) {
  console.log("________________________________________");
  console.log("Inside hoursWorkedOnDate() function: ");
  // The two issue: that I see in terms of edge cases is the following:
  // 1. For each time in event, there is a corresponding time out event
  // Therefore, the easiest way to think about this is to literally have a loop
  // variable 'i' to account for this scenario across both loops

  console.log("dateStamp: ", dateStamp);

  console.log("this: ", this);

  let timeEventsArrayLength = this["timeInEvents"].length;
  // NOTE:
  // Here I am accounting for the weird edge case where there are multiple
  // time in and time out events for a single person, so I will add all of these
  // hours together into the 'totalHoursWorkedArray' array, and just return
  // the hours worked accordingly:
  let totalHoursWorkedArray = [];
  let totalHoursWorked = 0;

  console.log("timeEventsArrayLength", timeEventsArrayLength);

  for (let i = 0; i < timeEventsArrayLength; i++) {
    console.log("i: ", i);

    let timeInHour = this["timeInEvents"][i]["hour"];
    let timeOutHour = this["timeOutEvents"][i]["hour"];
    let timeDifference = timeOutHour - timeInHour;

    console.log("timeInHour: ", timeInHour);
    console.log("timeHourHour: ", timeOutHour);
    console.log("timeDifference: ", timeDifference);

    timeDifference = timeDifference.toString();

    if (timeDifference.length > 2) {
      // Slice off everything but the last two zeros:
      timeDifference = timeDifference.slice(0, timeDifference.length - 2);
    }

    let hoursWorked = parseInt(timeDifference, 10);

    totalHoursWorkedArray.push(hoursWorked);
  }

  // Here we are cycling through the array of hour differences that were obtained
  // so that we can sum them up later, which is super useful for the edge case
  // involving multiple time stamps for an individual on a single day:
  totalHoursWorkedArray.forEach((value) => {
    console.log("value: ", value);
      totalHoursWorked += value;
  });

  console.log("totalHoursWorked: ", totalHoursWorked);

  return totalHoursWorked;
}

function wagesEarnedOnDate(dateStamp) {
  console.log("________________________________________");
  console.log("Inside wagesEarnedOnDate() function: ");

  console.log("dateStamp:", dateStamp);

  console.log("this: ", this);

  // NOTE: This is the 'gotcha', since you ALSO need to use .call() within the
  // function itself so that I can pass in the object accordingly:
  let hoursWorked = hoursWorkedOnDate.call(this);
  let payPerHour = this["payPerHour"];
  let wagesEarned = hoursWorked * payPerHour;

  console.log("hoursWorked: ", hoursWorked);
  console.log("payPerHour: ", payPerHour);
  console.log("wagesEarned: ", wagesEarned);

  return wagesEarned;
}

const allWagesFor = function () {
  console.log("________________________________________");
  console.log("Inside allWagesFor() function: ");

  console.log("this: ", this);

  // As this is pretty complex, I'm writing this out:
  // MDN for .map():
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map

  // We look at the 'this' object's 'timeInEvents' array
  // We then use .map() to cycle through each element in teh array
  const eligibleDates = this.timeInEvents.map(function (e) {
    // We then return the event's '.date' property, and store this as another result
    // for the 'eligibleDates' array that we created earlier:
    return e.date;
  });


  // MDN for .reduce():
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
  const payable = eligibleDates.reduce(function (memo, d) {
    return memo + wagesEarnedOnDate.call(this, d);
  }.bind(this), 0); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};

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

let bpRecord = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3]);
createTimeInEvent.call(bpRecord, "2014-02-28 1400");

console.log("________________________________________");
console.log("Testing createTimeOutEvent() function: ");

let timeOutRecord = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3]);
createTimeOutEvent.call(timeOutRecord, "2014-02-28 1400");

console.log("________________________________________");
console.log("Testing hoursWorkedOn() function: ");

let cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 1000]);
createTimeInEvent.call(cRecord, "2044-03-15 0900");
createTimeOutEvent.call(cRecord, "2044-03-15 1100");
hoursWorkedOnDate.call(cRecord, "2044-03-15");

console.log("________________________________________");
console.log("Testing wagesEarnedOn() function: ");

let newCRecord = createEmployeeRecord(["Julius", "Caesar", "General", 27]);
createTimeInEvent.call(newCRecord, "2044-03-15 0900");
createTimeOutEvent.call(newCRecord, "2044-03-15 1100");
wagesEarnedOnDate.call(newCRecord, "2044-03-15");

console.log("________________________________________");
console.log("Testing allWagesFor() function: ");

let newerCRecord = createEmployeeRecord(["Julius", "Caesar", "General", 27]);
createTimeInEvent.call(newerCRecord, "2044-03-14 0900");
createTimeOutEvent.call(newerCRecord, "2044-03-14 2100");
createTimeInEvent.call(newerCRecord, "2044-03-15 0900");
createTimeOutEvent.call(newerCRecord, "2044-03-15 1100");
// This should earn '378'
allWagesFor.call(newerCRecord);

// Weird edge case that's not mentioned in the function itself but the test
// for some reason wants to test for:
// 'An array of multiple employees':
console.log("________________________________________");
console.log("Testing allWagesFor() function's edge case scenario for array of arrays containing time in AND time out events: ");

let rRecord = createEmployeeRecord(["Rafiki", "", "Aide", 10]);

let sRecord = createEmployeeRecord(["Simba", "", "King", 100]);

let sTimeData = [
  ["2019-01-01 0900", "2019-01-01 1300"], // 4 * 100 = 400
  ["2019-01-02 1000", "2019-01-02 1300"]  // 3 * 100 = 300 ===> 700 total
];

let rTimeData = [
  ["2019-01-11 0900", "2019-01-11 1300"], // 4 * 10 = 40
  ["2019-01-12 1000", "2019-01-12 1300"]  // 3 * 10 = 40 ===> 70 total ||=> 770
];

sTimeData.forEach(function (d) {
  let [dIn, dOut] = d;
  createTimeInEvent.call(sRecord, dIn);
  createTimeOutEvent.call(sRecord, dOut);
});

rTimeData.forEach(function (d, i) {
  let [dIn, dOut] = d;
  createTimeInEvent.call(rRecord, dIn);
  createTimeOutEvent.call(rRecord, dOut);
});

// TODO:
// Figure out why the math is just not adding up for this edge case:
let grandTotalOwed = [sRecord, rRecord].reduce((m, e) => m + allWagesFor.call(e), 0);
console.log("grandTotalOwed: ", grandTotalOwed);
// expect(grandTotalOwed).to.equal(770)
