export default class CustomLogger {
  constructor() {}

  /**
   * Log info message.
   * @param {*string} message
   * @param {*object} object
   */
  logInfo(message, object = "") {
    console.log(message, object);
  }

  /**
   * Log debug message.
   * @param {*string} message
   * @param {*object} object
   */
  logDebug(message, object = "") {
    console.debug(message, object);
  }

  /**
   * Log Error message.
   * @param {*string} message
   * @param {*error} error
   */
  logError(message = "", error) {
    console.error("Error:", message, error);
  }
}
