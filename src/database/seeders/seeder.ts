import { Role } from "../../models/Role";
import { User } from "../../models/User";
import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";


// generar roles

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


// generar superadmin

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

 // generar usuarios random
const userSeeder = async () => {

    const user = new User();

    user.nombre = faker.person.firstName();
    user.email = faker.internet.email();
    user.password = bcrypt.hashSync("123456", 6); 
    user.idRole = 2; 
    user.isActive = true;
    user.createdAt = new Date();
    user.updatedAt = new Date();

    await user.save(); 

    return user;
};

// funcion que genera el superadmin y los 20 usuarios falsos
const fakeUsersSeeder = async () => {

    await roleSeeder();

    const userPromises = Array.from({ length: 20 }, () => userSeeder());
    const users = await Promise.all(userPromises);
    
    await superAdminSeeder();

    console.log(users);
    return users;
};

 fakeUsersSeeder().catch(console.error);


 
