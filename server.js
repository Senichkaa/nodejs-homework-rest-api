const app = require("./app");
const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://senichkaa:arsen2003@nodejs.5vry30p.mongodb.net/my-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log(
        "Server running. Database connection successful. Use our API on port: 3000"
      );
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
