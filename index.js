const express = require('express');
require('./services/passport');
require('./services/dynamodb');
const app = express();
require('./routes/authRoutes')(app);



app.get('/', (req, res) => {
	res.send({ hi : 'there' });
});
app.get('/reports/:id', (req, res) => {
	res.send({ hi : 'there' });
});

const PORT = process.env.PORT || 5000

app.listen(PORT);
