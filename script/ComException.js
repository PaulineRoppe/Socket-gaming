module.exports = class ComException extends Error {
  constructor(...params) {
    super(...params);

    this.name = 'ComException';
  }
};
