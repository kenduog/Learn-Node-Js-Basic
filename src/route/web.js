import express from "express";
import homeController from "../controller/homeController";
import multer from "multer";
import path from "path";
var appRoot = require("app-root-path");
let router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, appRoot + "/src/public/img/");
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter });

let uploadMultiple = multer({
  storage: storage,
  fileFilter: imageFilter,
}).array("multiple_images", 3);

const initWebRoute = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/detail/user/:userId", homeController.getDetailPage);

  router.post("/create-new-user", homeController.createNewUser);
  router.post("/delete-user", homeController.deleteUser);
  router.get("/edit-user/:userId", homeController.getEditPage);
  router.post("/update-user", homeController.postUpdateUser);

  router.get("/upload", homeController.getUploadFilePage);
  router.post(
    "/upload-profile-pic",
    upload.single("profile_pic"),
    homeController.handleUploadFilePage
  );
  router.post(
    "/upload-multiple-images",
    (req, res, next) => {
      uploadMultiple(req, res, (err) => {
        if (
          err instanceof multer.MulterError &&
          err.code === "LIMIT_UNEXPECTED_FILE"
        ) {
          res.send(
            `LIMIT_UNEXPECTED_FILE <br><a href="/upload">You can upload again</a>`
          );
        } else if (err) {
          res.send(err);
        } else {
          next();
        }
      });
    },
    homeController.handleUploadMltipleFiles
  );

  return app.use("/", router);
};

export default initWebRoute;
