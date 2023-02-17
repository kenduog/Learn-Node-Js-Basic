import express from "express";
import APIController from "../controller/APIController";
let router = express.Router();

const initAPIRoute = (app) => {
  router.get("/users", APIController.getAllUsers); // method GET -> READ DATA
  router.post("/create-user", APIController.createNewUser); //method POST -> create DATA
  router.put("/update-user", APIController.updateUser); //method PUT -> update user
  router.delete("/delete-user/:userId", APIController.deleteUser); //method DEL -> update user

  return app.use("/api/v1/", router);
};

export default initAPIRoute;
