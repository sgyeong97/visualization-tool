
const {
  Init, Data, Set, Status, Road,
} = require('./msg');

const encode = require('./encode-msg');

module.exports = {
  makeInit(obj) {
    return encode(Init, obj);
  },
  makeData(obj) {
    return encode(Data, obj);
  },
  makeStatus(obj) {
    return encode(Status, obj);
  },
  makeSet(obj) {
    return encode(Set, obj);
  },
  makeRoad(obj) {
    return encode(Road, obj);
  }
};
