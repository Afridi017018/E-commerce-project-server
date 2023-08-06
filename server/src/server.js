const app = require('./app');
const { port } = require('./secret');




app.listen(port,()=>{
    console.log(`server is running at: http://localhost:${port}`);
})