//API Logics here

var express = require("express");
var mongoClient = require("mongodb").MongoClient;
var cors = require("cors");

var app = express();
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var conString = "mongodb://127.0.0.1:27017";

//API Routes

app.get("/home", (req, res) => {
  res.send(`<code>Welcome To Home Page</code>`);
  res.end();
});

app.get("/users", (req, res) => {
  mongoClient.connect(conString).then((clientObj) => {
    var database = clientObj.db("db-todo-project");
    database
      .collection("tblusers")
      .find({})
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});

app.post("/register-user", (req, res) => {
  var user = {
    //UserId : req.body.UserId,
    UserName: req.body.UserName,
    Password: req.body.Password,
    Email: req.body.Email,
    Mobile: req.body.Mobile,
  };
  mongoClient.connect(conString).then((clientObj) => {
    var database = clientObj.db("db-todo-project");
    //creating table
    database
      .collection("tblusers")
      .insertOne(user)
      .then(() => {
        console.log(`User Registered..`);
        res.end();
      });
  });
});

app.put("/edit-user/:username", (req, res) => {
  mongoClient.connect(conString).then((clientObj) => {
    var database = clientObj.db("db-todo-project");
    database
      .collection("tblusers")
      .updateOne(
        { UserName: req.params.username },
        {
          $set: {
            //UserId:req.body.UserId,
            UserName: req.body.UserName,
            Password: req.params.Password,
            Email: req.body.Email,
            Mobile: req.body.Mobile,
          },
        }
      )
      .then(() => {
        console.log(`Details updated successfully...`);
        res.end();
      });
  });
});

app.delete("/delete-user/:username", (req, res) => {
  mongoClient.connect(conString).then((clientObj) => {
    var database = clientObj.db("db-todo-project");
    database
      .collection("tblusers")
      .deleteOne({ UserName: req.params.username })
      .then((deleteobj) => {
        console.log(`User Deleted`);
        res.end();
      });
  });
});

//routes for appointments

app.get("/all-appointment", (req, res) => {
  mongoClient.connect(conString).then((clientObj) => {
    var database = clientObj.db("todo-appointment");
    database
      .collection("tblappointments")
      .find({})
      .toArray()
      .then((doc) => {
        res.send(doc);
        res.end();
      });
  });
});

app.get("/appointment/:username", (req, res) => {
  mongoClient.connect(conString).then((appointmentObj) => {
    var database = appointmentObj.db("todo-appointment");
    database
      .collection("tblappointments")
      .find({ UserName: req.params.username })
      .toArray()
      .then((apointmentdoc) => {
        res.send(apointmentdoc);
        res.end();
      });
  });
});

app.get("/get-appointment/:id", (req, res) => {
  mongoClient.connect(conString).then((appointmentObj) => {
    var database = appointmentObj.db("todo-appointment");
    database
      .collection("tblappointments")
      .find({ Appointment_Id: parseInt(req.params.id) })
      .toArray()
      .then((apointmentdoc) => {
        res.send(apointmentdoc);
        res.end();
      });
  });
});

app.post("/add-appointment", (req, res) => {
  var appointment = {
    Appointment_Id: parseInt(req.body.Appointment_Id),
    Title: req.body.Title,
    Description: req.body.Description,
    Date: new Date(req.body.Date),
    UserName: req.body.UserName,
  };

  mongoClient.connect(conString).then((addapointment) => {
    var database = addapointment.db("todo-appointment");
    database
      .collection("tblappointments")
      .insertOne(appointment)
      .then((addapointment) => {
        console.log(`Appointment Added...`);
        res.send(addapointment);
        res.end();
      });
  });
});

app.put("/edit-appointment/:id", (req, res) => {
  mongoClient.connect(conString).then((editAppointment) => {
    var database = editAppointment.db("todo-appointment");
    database
      .collection("tblappointments")
      .updateOne(
        { Appointment_Id: parseInt(req.params.id) },
        {
          $set: {
            Appointment_Id: parseInt(req.body.Appointment_Id),
            Title: req.body.Title,
            Description: req.body.Description,
            Date: new Date(req.body.Date),
            //UserId : req.body.UserId
          },
        }
      )
      .then((update) => {
        console.log(`Appointment Details Updated`);
        //res.send(update);
        res.end();
      });
  });
});

app.delete("/delete-appointment/:id", (req, res) => {
  mongoClient.connect(conString).then((clientObj) => {
    var database = clientObj.db("todo-appointment");
    database
      .collection("tblappointments")
      .deleteOne({ Appointment_Id: parseInt(req.params.id) })
      .then(() => {
        console.log(`Appointment Deleted...`);
        //res.send();
        res.end();
      });
  });
});

app.get("*", (req, res) => {
  res.send(`<code>Page your requested is not available..</code>`);
  res.end();
});

app.listen(5252);
console.log(`Server Started : http://127.0.0.1:5252`);
