export const print = (component, func, msg) => {
  if (msg !== undefined) {
    console.log(new Date().toUTCString(), ` - [${component}]: [${func}], msg: ${msg}`);
  } else {
    console.log(new Date().toUTCString(), ` - [${component}]: [${func}]`);
  }
};