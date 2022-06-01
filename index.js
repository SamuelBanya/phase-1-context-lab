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

  let inEvent = this.timeInEvents.find((e) => {
    return e.date === dateStamp;
  });

  let outEvent = this.timeOutEvents.find((e) => {
    return e.date === dateStamp;
  });

  console.log("inEvent: ", inEvent);
  console.log("outEvent: ", outEvent);

  return (outEvent.hour - inEvent.hour) / 100;
}

function wagesEarnedOnDate(dateStamp) {
  console.log("________________________________________");
  console.log("Inside wagesEarnedOnDate() function: ");

  console.log("dateStamp:", dateStamp);

  console.log("this: ", this);

  // NOTE: This is the 'gotcha', since you ALSO need to use .call() within the
  // function itself so that I can pass in the object accordingly:
  let hoursWorked = hoursWorkedOnDate.call(this, dateStamp);
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

  console.log("eligibleDates: ", eligibleDates);

  // MDN for .reduce():
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
  const payable = eligibleDates.reduce(function (memo, d) {
    return memo + wagesEarnedOnDate.call(this, d);
  }.bind(this), 0); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  console.log("payable: ", payable);

  return payable;
};

function findEmployeeByFirstName(recordArray, firstName) {
  console.log("________________________________________");
  console.log("Inside findEmployeeByFirstName() function");
  console.log("this: ", this);

  let employeeMatch = recordArray.find((e) => {
    console.log("e: ", e);

    return e.firstName === firstName;
  });

  console.log("employeeMatch: ", employeeMatch);

  return employeeMatch;
}

function calculatePayroll(recordArray) {
  console.log("________________________________________");
  console.log("Inside calculatePayroll() function");
  console.log("recordArray: ", recordArray);
  let totalPayroll = 0;
  recordArray.forEach((record) => {
    console.log("record: ", record);
    // NOTE:
    // I had to use .call() here because it wasn't passing in the 'this' object properly without it:
    let employeeWages = allWagesFor.call(record);
    console.log("employeeWages: ", employeeWages);
    totalPayroll += employeeWages;
    console.log("totalPayroll (at the end of current loop iteration): ", totalPayroll);
  });

  console.log("totalPayroll (at the end of the calculatePayroll() function): ", totalPayroll);

  return totalPayroll;
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

let grandTotalOwed = [sRecord, rRecord].reduce((m, e) => m + allWagesFor.call(e), 0);
console.log("grandTotalOwed: ", grandTotalOwed);

console.log("________________________________________");
console.log("Testing findEmployeeByFirstName() function: ");

let src = [
  ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
  ["Natalia", "Romanov", "CEO", 150]
];

let emps = createEmployeeRecords(src);
let loki = findEmployeeByFirstName(emps, "Loki");
console.log("loki.familyName: ", loki.familyName);

console.log("________________________________________");
console.log("Testing calculatePayroll() function: ");
const csvDataEmployees = [
  ["Thor", "Odinsson", "Electrical Engineer", 45],
  ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
  ["Natalia", "Romanov", "CEO", 150],
  ["Darcey", "Lewis", "Intern", 15],
  ["Jarvis", "Stark", "CIO", 125],
  ["Anthony", "Stark", "Angel Investor", 300]
];

const csvTimesIn = [
  ["Thor", ["2018-01-01 0800", "2018-01-02 0800", "2018-01-03 0800"]],
  ["Loki", ["2018-01-01 0700", "2018-01-02 0700", "2018-01-03 0600"]],
  ["Natalia", ["2018-01-03 1700", "2018-01-05 1800", "2018-01-03 1300"]],
  ["Darcey", ["2018-01-01 0700", "2018-01-02 0800", "2018-01-03 0800"]],
  ["Jarvis", ["2018-01-01 0500", "2018-01-02 0500", "2018-01-03 0500"]],
  ["Anthony", ["2018-01-01 1400", "2018-01-02 1400", "2018-01-03 1400"]]
];

const csvTimesOut = [
  ["Thor", ["2018-01-01 1600", "2018-01-02 1800", "2018-01-03 1800"]],
  ["Loki", ["2018-01-01 1700", "2018-01-02 1800", "2018-01-03 1800"]],
  ["Natalia", ["2018-01-03 2300", "2018-01-05 2300", "2018-01-03 2300"]],
  ["Darcey", ["2018-01-01 1300", "2018-01-02 1300", "2018-01-03 1300"]],
  ["Jarvis", ["2018-01-01 1800", "2018-01-02 1800", "2018-01-03 1800"]],
  ["Anthony", ["2018-01-01 1600", "2018-01-02 1600", "2018-01-03 1600"]]
];

let employeeRecords = createEmployeeRecords(csvDataEmployees);

employeeRecords.forEach(function (rec) {
  let timesInRecordRow = csvTimesIn.find(function (row) {
    return rec.firstName === row[0];
  });

  let timesOutRecordRow = csvTimesOut.find(function (row) {
    return rec.firstName === row[0];
  });

  timesInRecordRow[1].forEach(function(timeInStamp){
    createTimeInEvent.call(rec, timeInStamp);
  });

  timesOutRecordRow[1].forEach(function(timeOutStamp){
    createTimeOutEvent.call(rec, timeOutStamp);
  });
});

let totalPayroll = calculatePayroll(employeeRecords);
console.log("totalPayroll: ", totalPayroll);
