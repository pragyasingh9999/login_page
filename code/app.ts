import * as express from 'express';
import { router } from './router/routes';


const app= express();
const port= 8000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', router);

app.listen(port, ()=>{
  console.log(`App started on port  ${port}`);
})