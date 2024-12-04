import userRoutes from "./routes/userRoutes.mjs";
import errorMiddleware from "./middlewares/errorMiddleware.mjs";
import bodyParser from "body-parser";

const appRoutes = (app) => {
  app.use("/api/v1/users", userRoutes);
  // Middleware
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(errorMiddleware);
};

export default appRoutes;
