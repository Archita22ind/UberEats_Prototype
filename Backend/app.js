const express = require("express");
const cors = require("cors");
const config = require("./Controller/Common/config");
const mongoose = require("mongoose");

const kafka = require("./kafka/client");

const path = require("path");
var bodyParser = require("body-parser");

const passport = require("passport");
const { checkAuth } = require("./Controller/Common/passport");
const { auth } = require("./Controller/Common/passport");

const app = express();
const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: config.AWSAccessKeyId,
  secretAccessKey: config.AWSSecretAccessKey,
});

app.use(express.json());
app.use(cors());
app.use(passport.initialize());

mongoose.connect(config.mongoose.url, config.mongoose.options, (err, res) => {
  if (err) {
    console.log(err);
    console.log("MongoDB connection failed");
  } else {
    console.log("MongoDB connected!!");
  }
});

const uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    acl: "public-read",
    bucket: config.AWSBucket,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname, "/images")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
auth();
var upload = multer({ storage: storage });

app.post("/customerSignIn", function (req, res) {
  kafka.make_request("signInCustomer", req.body, function (err, results) {
    if (err) {
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      res.status(200).json(results);
      res.end();
    }
  });
});

app.post("/customerSignUpInfo", function (req, res) {
  kafka.make_request("registerCustomer", req.body, function (err, results) {
    if (err) {
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      res.status(200).json(results);
      res.end();
    }
  });
});

app.post("/restaurantLoginInfo", function (req, res) {
  kafka.make_request("signInRestaurant", req.body, function (err, results) {
    if (err) {
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      res.status(200).json(results);
      res.end();
    }
  });
});

app.post("/restaurantSignUpInfo", function (req, res) {
  kafka.make_request("registerRestaurant", req.body, function (err, results) {
    if (err) {
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      res.status(200).json(results);
      res.end();
    }
  });
});

app.get("/getProfileInfo", checkAuth, function (req, res) {
  kafka.make_request("profileInfo", req.query, function (err, results) {
    if (err) {
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      res.status(200).json(results);
      res.end();
    }
  });
});

app.post("/getCustomerLocation", checkAuth, function (req, res) {
  kafka.make_request("customerLocation", req.body, function (err, results) {
    if (err) {
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      res.status(200).json(results);
      res.end();
    }
  });
});

app.post(
  "/updateProfileInfo",
  checkAuth,
  uploadS3.single("file"),
  function (req, res) {
    req.body.image = req.file?.location;
    kafka.make_request("updateProfileInfo", req.body, function (err, results) {
      if (err) {
        res.json({
          status: "error",
          msg: "System Error, Try Again.",
        });
      } else {
        res.status(200).json(results);
        res.end();
      }
    });
  }
);

app.get("/restaurantDetailsInfo", checkAuth, function (req, res) {
  kafka.make_request("restaurantDetails", req.query, function (err, results) {
    if (err) {
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      res.status(200).json(results);
      res.end();
    }
  });
});

app.post(
  "/restaurantDetailsInfoUpdate",
  checkAuth,
  uploadS3.single("file"),
  function (req, res) {
    req.body.image = req.file?.location;
    kafka.make_request(
      "restaurantDetailsUpdate",
      req.body,
      function (err, results) {
        if (err) {
          res.json({
            status: "error",
            msg: "System Error, Try Again.",
          });
        } else {
          res.status(200).json(results);
          res.end();
        }
      }
    );
  }
);

app.post(
  "/addFoodItems",
  checkAuth,
  uploadS3.single("file"),
  function (req, res) {
    req.body.image = req.file?.location;
    kafka.make_request("addDish", req.body, function (err, results) {
      if (err) {
        res.json({
          status: "error",
          msg: "System Error, Try Again.",
        });
      } else {
        res.status(200).json(results);
        res.end();
      }
    });
  }
);

app.get("/foodItemsDisplay", checkAuth, function (req, res) {
  kafka.make_request("foodDetails", req.query, function (err, results) {
    if (err) {
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      res.status(200).json(results);
      res.end();
    }
  });
});

app.post(
  "/editFoodItems",
  checkAuth,
  uploadS3.single("file"),
  function (req, res) {
    req.body.image = req.file?.location;
    kafka.make_request("editDish", req.body, function (err, results) {
      if (err) {
        res.json({
          status: "error",
          msg: "System Error, Try Again.",
        });
      } else {
        res.status(200).json(results);
        res.end();
      }
    });
  }
);

app.post("/showCustomerProfile", checkAuth, function (req, res) {
  kafka.make_request("showCustomerProfile", req.body, function (err, results) {
    if (err) {
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      res.status(200).json(results);
      res.end();
    }
  });
});

app.post("/getTypeaheadList", checkAuth, function (req, res) {
  kafka.make_request("typeaheadList", req.body, function (err, results) {
    if (err) {
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      res.status(200).json(results);
      res.end();
    }
  });
});

app.get("/getDeliveryAddress", checkAuth, function (req, res) {
  kafka.make_request("deliveryAddress", req.query, function (err, results) {
    if (err) {
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      res.status(200).json(results);
      res.end();
    }
  });
});

app.post("/getListOfRestaurants", checkAuth, function (req, res) {
  kafka.make_request("listOfRestaurants", req.body, function (err, results) {
    if (err) {
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      res.status(200).json(results);
      res.end();
    }
  });
});

app.post("/createFavouritesList", checkAuth, function (req, res) {
  kafka.make_request("createFavorite", req.body, function (err, results) {
    if (err) {
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      res.status(200).json(results);
      res.end();
    }
  });
});
app.post("/getFavoriteRestaurants", checkAuth, function (req, res) {
  kafka.make_request("favoriteRestaurant", req.body, function (err, results) {
    if (err) {
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      res.status(200).json(results);
      res.end();
    }
  });
});

app.post("/addOrdertoCart", checkAuth, function (req, res) {
  kafka.make_request("addOrdertoCart", req.body, function (err, results) {
    if (err) {
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      res.status(200).json(results);
      res.end();
    }
  });
});

app.post("/showCartDetails", checkAuth, function (req, res) {
  kafka.make_request("cartDetails", req.body, function (err, results) {
    if (err) {
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      res.status(200).json(results);
      res.end();
    }
  });
});
app.post("/updateCartOrderDetails", checkAuth, function (req, res) {
  kafka.make_request("updateCartDetails", req.body, function (err, results) {
    if (err) {
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      res.status(200).json(results);
      res.end();
    }
  });
});

app.get("/getOrderTotal", checkAuth, function (req, res) {
  kafka.make_request("orderTotal", req.query, function (err, results) {
    if (err) {
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      res.status(200).json(results);
      res.end();
    }
  });
});

app.get("/getDeliveryType", checkAuth, function (req, res) {
  kafka.make_request("deliveryType", req.query, function (err, results) {
    if (err) {
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      res.status(200).json(results);
      res.end();
    }
  });
});

app.post("/addDeliveryAddress", checkAuth, function (req, res) {
  kafka.make_request("addDeliveryAddress", req.body, function (err, results) {
    if (err) {
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      res.status(200).json(results);
      res.end();
    }
  });
});

app.post("/bookOrder", checkAuth, function (req, res) {
  kafka.make_request("bookorder", req.body, function (err, results) {
    if (err) {
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      res.status(200).json(results);
      res.end();
    }
  });
});

app.post("/updateOrderStatus", checkAuth, function (req, res) {
  kafka.make_request("orderStatusUpdate", req.body, function (err, results) {
    if (err) {
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      res.status(200).json(results);
      res.end();
    }
  });
});

app.post("/getRestaurantOrders", checkAuth, function (req, res) {
  kafka.make_request("restaurantOrders", req.body, function (err, results) {
    if (err) {
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      res.status(200).json(results);
      res.end();
    }
  });
});

app.post("/showRestaurantOrderDetails", checkAuth, function (req, res) {
  kafka.make_request(
    "restaurantOrderDetails",
    req.body,
    function (err, results) {
      if (err) {
        res.json({
          status: "error",
          msg: "System Error, Try Again.",
        });
      } else {
        res.status(200).json(results);
        res.end();
      }
    }
  );
});

app.post("/getPastOrders", checkAuth, function (req, res) {
  kafka.make_request("pastOrders", req.body, function (err, results) {
    if (err) {
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      res.status(200).json(results);
      res.end();
    }
  });
});

app.post("/getReceiptDetails", checkAuth, function (req, res) {
  kafka.make_request("receiptDetails", req.body, function (err, results) {
    if (err) {
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      res.status(200).json(results);
      res.end();
    }
  });
});

app.post("/createNewOrder", checkAuth, function (req, res) {
  kafka.make_request("newOrder", req.body, function (err, results) {
    if (err) {
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      res.status(200).json(results);
      res.end();
    }
  });
});

const PORT = config.port;
app.listen(PORT, console.log(`Server started on port ${PORT}`));

module.exports = app;
