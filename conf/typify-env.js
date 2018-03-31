module.exports = (env) => Object.entries(env).reduce((obj, [key, val]) => {
  return {
    ...obj,
    [key]: parseFloat(val) || // First of all, try to parse a number from the value
          ((val === 'true' || val === 'false') ? val === 'true' : // If it fails, check if the value is a boolean
            val), // Lastly, leave the value as it is (a string)
  };
}, {});
