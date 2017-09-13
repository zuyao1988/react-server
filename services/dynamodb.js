var dynamoose = require('dynamoose');

//var Cat = dynamoose.model('Cat', { id: Number, name: String });
var Schema = dynamoose.Schema;
var dogSchema = new Schema({
  ownerId: {
    type: Number,
    validate: function(v) { return v > 0; },
    hashKey: true
  },
  name: {
    type: String,
    rangeKey: true,
    index: true // name: nameLocalIndex, ProjectionType: ALL
  },
  breed: {
    type: String,
    trim: true,
    required: true,
    index: {
      global: true,
      rangeKey: 'ownerId',
      name: 'BreedIndex',
      project: true, // ProjectionType: ALL
      throughput: 5 // read and write are both 5
    }
  },
  color: {
    lowercase: true,
    type: [String],
    default: ['Brown']
  },
  age: Number
},
{
  throughput: {read: 15, write: 5}
});

var Dog = dynamoose.model('Dog', dogSchema);

var odie = new Dog({
  ownerId: 4,
  name: 'Odie',
  breed: 'Beagle',
  color: ['Tan'],
  cartoon: true
});

odie.save(function (err) {
  if(err) { return console.log(err); }
  console.log('Ta-da!');
});

Dog.create({
  ownerId: 5,
  name: 'Odie5',
  breed: 'Beagle5',
  color: ['Tan5'],
  cartoon: true
}, function(err, odie) {
  if(err) { return console.log(err); }
  console.log('Odie is a ' + odie.breed);
});
