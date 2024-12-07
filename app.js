const express = require('express');
const app = express();

const port = process.env.port || 5000;

app.use(express.static('.'));
app.use(express.json());
app.get('/', (req,res)=>{

    res.sendFile(__dirname + 'index.html');
});
app.post('/submit',(req,res)=>{
res.send(req.body);
console.log(req.body);
});




app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
});