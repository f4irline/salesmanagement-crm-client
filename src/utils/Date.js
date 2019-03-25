export const getDate = (date, value) => {
  console.log(`getDate(date: ${date}, value: ${value})`);
  let newDate;
  if (value != null) {
    newDate = new Date(value);
  } else {
    newDate = new Date();
  }
  
  if (date === 'monthFirst') {
    newDate.setDate(1);
  }
  if (date === 'monthLast') {
    newDate.setDate(1);
    newDate.setMonth(newDate.getMonth()+1);
    newDate.setDate(newDate.getDate()-1);
  }
  
  let str = newDate.toISOString();
  return str.slice(0, 10);
};
