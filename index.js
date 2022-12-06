function createEmployeeRecord(employeeData) {
  const employee = {
    firstName: employeeData[0],
    familyName: employeeData[1],
    title: employeeData[2],
    payPerHour: employeeData[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
  return employee;
}

function createEmployeeRecords(employeeData) {
  const employeeArray = [];

  for (let i = 0; i<employeeData.length; i++) {
    employeeArray.push(createEmployeeRecord(employeeData[i]));
  }
  return employeeArray;
}

function createTimeInEvent(employeeRecord, dateData) {
  const timeIn = dateData.split(" ");

  employeeRecord.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(timeIn[1]),
    date: timeIn[0],
  });

  return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateData) {
  const timeOut = dateData.split(" ");

  employeeRecord.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(timeOut[1]),
    date: timeOut[0],
  });

  return employeeRecord;
}

function findWorkOnDate (employeeRecord, dateData) {
const timeEvent = employeeRecord.find(time => time.date===dateData)
return timeEvent;
}

function hoursWorkedOnDate(employeeRecord, dateData){
  const timeInEvent = findWorkOnDate(employeeRecord.timeInEvents,dateData)
  const timeOutEvent = findWorkOnDate(employeeRecord.timeOutEvents,dateData)

  const timeDuration = (timeOutEvent.hour - timeInEvent.hour)/100
  return timeDuration
}

function wagesEarnedOnDate(employeeRecord, dateData){
  const payOwed = (employeeRecord.payPerHour * (hoursWorkedOnDate(employeeRecord,dateData)))
  return payOwed
}

function allWagesFor(employeeRecord) {
  const dates = employeeRecord.timeInEvents.map(timeInEvent => timeInEvent.date); //Array of dates by given employee

  let allWages = 0;
  dates.forEach(date => {
      allWages = allWages + wagesEarnedOnDate(employeeRecord, date);
  });

  return allWages;
}

function calculatePayroll(employeeArray){
  let allWages = 0
  employeeArray.forEach(employee => {
      allWages = allWages + allWagesFor(employee)
  })

  return allWages
}