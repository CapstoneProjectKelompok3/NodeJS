import { server } from "./main.js";
import "dotenv/config";

server.listen(process.env.SERVER_PORT, () => {
  console.log(`server started http://localhost:${process.env.SERVER_PORT}`);
});
