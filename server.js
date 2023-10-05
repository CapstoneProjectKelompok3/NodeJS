import app from "./main.js";
import "dotenv/config";

app.listen(process.env.SERVER_PORT, () => {
  console.log(`server started http://localhost:${process.env.SERVER_PORT}`);
});
