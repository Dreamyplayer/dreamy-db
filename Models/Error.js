"use strict";

class DreamyError extends Error {
  constructor(message, name = "DreamyError") {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = name;
    this.message = message;
  }
}

module.exports = DreamyError;
