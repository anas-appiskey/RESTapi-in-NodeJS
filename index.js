const express = require('express');
const path = require('path')
const app = express();
const members = require('./Members');
const router = require('./routes/api/members');

// app.get('/', (req,res)=>{
//  res.sendFile(path.join(__dirname,'public','index.html'))
// });

// const logger = (req,res,next) =>{
//     console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
//     next();
// }
// app.use(logger);

app.use(express.json())
app.use(express.urlencoded({extended:false}));

//set static folder
app.use(express.static(path.join(__dirname,'public')))
app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=> console.log(`server Started on port ${PORT}`));