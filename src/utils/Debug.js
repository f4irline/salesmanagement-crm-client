export const print = (component, func, msg) => {
  if (msg !== undefined) {
    console.log(new Date().toUTCString(), ` - [${component}]: [${func}], msg:`);
    console.log(msg);
  } else {
    console.log(new Date().toUTCString(), ` - [${component}]: [${func}]`);
  }
};