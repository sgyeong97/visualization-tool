
const mongoose = require('mongoose');
const fs = require('fs');

const { url } = require('./db');
// input
// {
//   "571701398":[80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
//   "571701446":[50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50],
//   "571701841":[30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30],
//   "571701876":[60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60],
//   "571701983":[60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60],
//   "571701985":[30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30],
//   "571701986":[40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40],
//   "571701988":[30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30]
// }

// output
// [
//   {
//     id: "571701398",
//     values: [80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80]
//   }
// ]

const run = (collection, obj) => async (mongoose) => {
  const { db } = mongoose.connection;

  const bulk = db.collection(collection).initializeOrderedBulkOp()

  Object.keys(obj).forEach(id => {
    const values = obj[id];
    const linkId = id;
    for (let i=0; i<3; i++) {
      bulk.insert({
        linkId,
        cellId: linkId + '_' + 0 + '_' + i,
        values
      });
    }
  });

  const result = await bulk.execute();
  console.log(result);
}

if (require.main === module) {
  const file = '../data/link.speeds.json';
  const obj = JSON.parse(fs.readFileSync(file, 'utf8'));
  const promise = mongoose.connect(url('simulation_results'), {
    useNewUrlParser: true
  });
  promise
    .then(run('c1', obj))
    .then(() => process.exit(1));
}