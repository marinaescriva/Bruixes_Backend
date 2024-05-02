import { Role } from "../../models/Role";
import { User } from "../../models/User";
import { Juego } from "../../models/Juego";
import bcrypt from "bcrypt";
import { fakerES } from "@faker-js/faker";


// ------------------------
//  como son los 2 roles y generar los 2 roles
//-------------------------
const roleSeeder = async () => {

    const superAdminRole = new Role();
    superAdminRole.id = 1;
    superAdminRole.nombre = "superadmin";
    await superAdminRole.save();

    const userRole = new Role();
    userRole.id = 2;
    userRole.nombre = "user";
    await userRole.save();

};

//-------------------------
//como es un superadmin
//-------------------------

const superAdminSeeder = async () => {
    const superAdmin = new User();

    superAdmin.nombre = "superadmin";
    superAdmin.email = "superadmin@gmail.com";
    superAdmin.password = bcrypt.hashSync("123456", 6);
    superAdmin.idRole = 1;
    superAdmin.isActive = true;
    superAdmin.createdAt = new Date();
    superAdmin.updatedAt = new Date();

    await superAdmin.save();

}

//-------------------------
// como es un usuario 
//-------------------------
const userSeeder = async () => {

    const user = new User();

    user.nombre = fakerES.person.firstName();
    user.email = fakerES.internet.email();
    user.password = bcrypt.hashSync("123456", 6);
    user.idRole = 2;
    user.isActive = true;
    user.createdAt = new Date();
    user.updatedAt = new Date();

    await user.save();

    return user;
};

//-------------------------
// funcion que genera el superadmin y los 20 usuarios falsos
//-------------------------
const fakeUsersSeeder = async () => {

    await roleSeeder();

    const userPromises = Array.from({ length: 20 }, () => userSeeder());
    const users = await Promise.all(userPromises);

    await superAdminSeeder();

    console.log(users);
    return users;
};

fakeUsersSeeder().catch(console.error);

//-------------------------
// como es un juego random
//-------------------------
const juegoSeeder = async () => {

    const juego = new Juego();

    juego.nombre = fakerES.commerce.productName();
    juego.jugadores = fakerES.number.bigInt({ min: 1, max: 8 });
    juego.isAvailable = true;

    await juego.save();

    return juego;
};

//-------------------------
// funcion que genera 20 juegos random
//-------------------------
const fakeJuegosSeeder = async () => {

    const juegoPromises = Array.from({ length: 20 }, () => juegoSeeder());
    const juegos = await Promise.all(juegoPromises);

    console.log(juegos);
    return juegos;
};

fakeJuegosSeeder().catch(console.error);


