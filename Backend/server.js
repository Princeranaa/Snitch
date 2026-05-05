import connectDB from "./src/config/db.js";
import app from "./src/app.js";
import { config } from "./src/config/config.js";

const PORT = config.PORT || 4000;

connectDB();

app.listen(PORT, () => {
  console.log(`⚙️  Server is running at port : ${PORT}`);
});
