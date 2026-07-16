import {app} from "./src/app.js";

app.listen({host: "0.0.0.0", port: 3333}).then(() => {
  console.log("server on");
});