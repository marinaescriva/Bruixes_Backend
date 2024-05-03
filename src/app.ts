import express, { Application } from "express";
import cors from "cors";
import { login , register} from "./controllers/authController";
import { auth } from "./middlewares/auth";
import { superadmin} from "./middlewares/superadmin";
import { getAllUsers, getMyProfile, updateProfile} from "./controllers/userController";


// import { getUsers, getUsersProfile, updateUsersProfile, deleteUser } from "./controllers/usersController";
// import { getServices } from "./controllers/servicesController";
// import { deleteAppointments, getAppointments, getAppointmentsById, postAppointments, updateAppointments } from "./controllers/appointmentsController";
// import { createRoles, deleteRoles, getRoles} from "./controllers/rolesController";
// import { login, register } from "./controllers/authentificationController";



export const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/api/healthy", (req, res) => {
    res.status(200).json({
      succes: true,
      message: "Server is healthy",
    });
  });


    // AUTH

app.post(`/api/auth/login`, login); //funciona
app.post(`/api/auth/register`, register); // funciona

    //USERS 

app.get(`/api/users`,auth, superadmin, getAllUsers); // funciona
app.get(`/api/users/profile`, auth, getMyProfile); //funciona
app.put(`/api/users/profile`, auth, updateProfile); //funciona
// app.delete(`/api/users/:id`, auth, isSuperAdmin , deleteUser);


// GAMES

// TABLES

// RESERVATIONS

// EVENTS

//ROLES
// app.post('/api/roles', createRoles); // extra
// app.get('/api/roles', getRoles); // extra
// // app.put('/api/roles', updateRoles); // extra
// app.delete('/api/roles/:id', deleteRoles); // extra



//CITAS APPOINTMENTS
// app.get(`/api/appointments/:id`, auth, getAppointmentsById);
// app.get(`/api/appointments`, auth, getAppointments); 
// app.post(`/api/appointments`, auth, postAppointments);
// app.put(`/api/appointments`, auth, updateAppointments);
// app.delete(`/api/appointments`, auth, deleteAppointments);

//SERVICES
// app.get(`/api/services`, getServices);


export default app;