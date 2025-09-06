import express from "express";
import { connectMongo, config } from "./config/config";
import ifscRoutes from "./routes/ifsc.route";

async function main() {
  await connectMongo();

  const app = express();
  app.use(express.json());

  app.use("/ifsc", ifscRoutes);

  app.listen(config.port, () => {
    console.log(`Server started at http://localhost:${config.port}`);
  });
}

main().catch(err => {
  console.error("Failed to start server", err);
});
