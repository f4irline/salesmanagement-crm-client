export const getDate = (date, value) => {
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

export const daysBetween = ( date1, date2 ) => {   //Get 1 day in milliseconds   
  var one_day=1000*60*60*24;    // Convert both dates to milliseconds
  var date1_ms = new Date(date1).getTime();   
  var date2_ms = new Date(date2).getTime();    // Calculate the difference in milliseconds  
  var difference_ms = date2_ms - date1_ms;        // Convert back to days and return   
  return Math.round(difference_ms/one_day); 
};  