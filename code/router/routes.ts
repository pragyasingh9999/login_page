import { Router, Request, Response, NextFunction } from "express";
import { client } from '../client';
import { secretKey } from '../secretkey'
const jwt = require('jsonwebtoken');

const database = client.db("Credentials");
const info = database.collection("newlogins");
const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send(`
  <html>
  <head>
    <title>Login</title>
  </head>
  <body>
    <div class="login-container">
      <h1>LogIn Page</h1>
      <form method="POST" action="/login">
        <div>
          <label for="userID">UserID:</label>
          <input type="text" id="userID" name="userID" required>
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" name="password" required>
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  </body>
</html>`);
});

router.post('/login', async (req: Request, res: Response) => {
  const { userID, password } = req.body;
  const query = { "userID": userID };
  const user = await info.findOne(query);

  if (user) {
    
    if (user.password === password) {
      const token = jwt.sign({ userID: user.userID, name: user.name }, secretKey);
      
      res.set('Authorization', `Bearer ${token}`);
      res.redirect(`/protected?token=${encodeURIComponent(token)}`);

    } else {
      res.json("wrong password");
    }
  }
  else {
    res.json("invalid userId");
  }

});

router.get('/protected', authenticateToken, (req: Request, res:Response)=>{
  res.json({message: 'Protected resource accessed'});

});

function authenticateToken(req:Request , res: Response, _next: NextFunction){
  const authHeader= req.headers['authorization'];
  const token  = req.query.token || (authHeader && authHeader.split(' ')[1]);
  if(token == null){
      return res.sendStatus(401);
  }
  jwt.verify(token, secretKey, (err: any, user: string )=>{
      if(err){
          return res.sendStatus(403);
      }   
      _next();
  })
}

export { router };