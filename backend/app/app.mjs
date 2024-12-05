import userRoutes from "./routes/userRoutes.mjs";
import memberRoutes from "./routes/memberRoutes.mjs";
import errorMiddleware from "./middlewares/errorMiddleware.mjs";
import bodyParser from "body-parser";
import cors from "cors";

const appRoutes = (app) => {
  // Middleware
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(errorMiddleware);

  // User Routes
  app.use("/api/v1/users", userRoutes);
  // Member Routes
  app.use("/api/v1/members", memberRoutes);
};

export default appRoutes;
