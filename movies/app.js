var app = require('./src/lib/app');
app.set('views', './src/views');
app.set('view engine', 'pug');

app.listen(3000);
console.log('Express started on port 3000');
