const dynamoose = require('dynamoose');
const { Schema } = dynamoose; //const Schema = dynamoose.Schema;
const uuidv1 = require('uuid/v1');

const userSchema = new Schema(
	{
		id: {
			type: String,
			hashKey: true,
			default: uuidv1()
		},
		googleId: {
			type: String
		},
		facebookId: {
			type: String
		},
		credits: {
			type: Number,
			default: 0
		}
	},
	{
		useDocumentTypes: true,
		throughput: { read: 15, write: 5 }
	}
);

dynamoose.model('users', userSchema);
