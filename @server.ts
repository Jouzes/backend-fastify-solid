import {app} from "./src/@app.js";
import {env} from "./src/env/validateEnv.js";

app.listen({host: "0.0.0.0", port: env.PORT}).then(() => {
  console.log("server on");
});