import express, { Application } from "express";
import cors from "cors";
import { login , register} from "./controllers/authController";
// import { auth } from "./middlewares/auth";

// import { getUsers, getUsersProfile, updateUsersProfile, deleteUser } from "./controllers/usersController";
// import { getServices } from "./controllers/servicesController";
// import { deleteAppointments, getAppointments, getAppointmentsById, postAppointments, updateAppointments } from "./controllers/appointmentsController";
// import { createRoles, deleteRoles, getRoles} from "./controllers/rolesController";
// import { login, register } from "./controllers/authentificationController";


// import { isSuperAdmin} from "./middlewares/isSuperAdmin";

export const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/api/healthy", (req, res) => {
    res.status(200).json({
      succes: true,
      message: "Server is healthy",
    });
  });

//USERS 
// app.get(`/api/users`, auth, isSuperAdmin, getUsers); // ONLY SUPER_ADMIN
// app.get(`/api/users/profile`, auth, getUsersProfile); 
// app.put(`/api/users/profile`, auth, updateUsersProfile);
// app.delete(`/api/users/:id`, auth, isSuperAdmin , deleteUser);


//ROLES
// app.post('/api/roles', createRoles); // extra
// app.get('/api/roles', getRoles); // extra
// // app.put('/api/roles', updateRoles); // extra
// app.delete('/api/roles/:id', deleteRoles); // extra

// AUTH

app.post(`/api/auth/login`, login);
app.post(`/api/auth/register`, register); 

//CITAS APPOINTMENTS
// app.get(`/api/appointments/:id`, auth, getAppointmentsById);
// app.get(`/api/appointments`, auth, getAppointments); 
// app.post(`/api/appointments`, auth, postAppointments);
// app.put(`/api/appointments`, auth, updateAppointments);
// app.delete(`/api/appointments`, auth, deleteAppointments);

//SERVICES
// app.get(`/api/services`, getServices);


export default app;