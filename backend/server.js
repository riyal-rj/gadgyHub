import app from './app.js';
import {createServer} from 'http'
import { ENV_VARS } from './env/envVars.js';

const server=createServer(app);

const PORT=ENV_VARS.PORT;
server.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`);
})
