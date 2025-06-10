require("module-alias/register");
const app = require("@/src/app");
const dbHealthListener = require("@utils/dbHealthListener.utils");

//Add handle and shutdown server gracefully if there is critical error that is not handled

const server = app.listen(3000, async () => {
  await dbHealthListener.listenerHealthSetup();
  console.log(`App berjalan di port 3000`);
});
