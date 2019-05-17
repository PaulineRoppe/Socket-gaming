module.exports = class Exception extends Error {
  constructor(...params) {
    super(...params);

    this.name = 'Exception';
  }
};
