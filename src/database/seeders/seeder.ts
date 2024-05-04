
import { Role } from '../../models/Role';
import { User } from '../../models/User';
import { Juego } from '../../models/Juego';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import { AppDataSource } from "../db";
import { Mesa } from '../../models/Mesa';


const roleSeeder = async () => {
    try {
        await AppDataSource.initialize();

        const roleSuperAdmin = new Role();
        roleSuperAdmin.nombre = 'superadmin';
        roleSuperAdmin.id = 1;
        await roleSuperAdmin.save();

        const roleUser = new Role();
        roleUser.nombre = 'user';
        roleUser.id = 2;

        await roleUser.save();
    }
    catch (error) {
        console.log(error);
    }
};

const userSeeder = async () => {
    try {
       
        await roleSeeder();
       

        const userSuperAdmin = new User();
        userSuperAdmin.nombre = 'superadmin';
        userSuperAdmin.email = 'superadmin@gmail.com';
        userSuperAdmin.password = bcrypt.hashSync('123456', 6);
        userSuperAdmin.idRole = 1;
        userSuperAdmin.isActive = true;
        userSuperAdmin.createdAt = new Date();
        userSuperAdmin.updatedAt = new Date();

       

        await userSuperAdmin.save();

        const userUser = new User();
        userUser.nombre = 'user';
        userUser.email = 'user@gmail.com';
        userUser.password = bcrypt.hashSync('123456', 6);
        userUser.idRole = 2;
        userUser.isActive = true;
        userUser.createdAt = new Date();
        userUser.updatedAt = new Date();

       

        await userUser.save();

        for (let i = 0; i < 20; i++) {
            const generatedUser = new User();
            
            generatedUser.nombre = faker.person.firstName();
            generatedUser.email = faker.internet.email();
            generatedUser.password = bcrypt.hashSync('123456', 6);
            generatedUser.idRole = 2;
            generatedUser.isActive = true;
            generatedUser.createdAt = new Date();
            generatedUser.updatedAt = new Date();
            await generatedUser.save();
        }

    }
    catch (error) {
        console.log(error);
    }
};

const juegoSeeder = async () => {
    try{
        const newJuegoBase = new Juego();
        newJuegoBase.nombre = "Juego de mesa";
        newJuegoBase.jugadores = 4;
        // newJuegoBase.inventario = 1;
        newJuegoBase.isAvailable = true;

        await newJuegoBase.save();

        for (let i = 0; i < 20; i++) {
            const newJuego = new Juego();
            newJuego.nombre = faker.commerce.productName();
            newJuego.jugadores = faker.datatype.number({ min: 1, max: 4 });
            // newJuego.inventario = faker.datatype.number({ min: 1, max: 4 });
            newJuego.isAvailable = true;
            await newJuego.save();
        }

    }catch(error){
        console.log(error);
    }

}

const mesaSeeder = async () => {
    try{
        const newMesaBase = new Mesa();
        newMesaBase.capacidad = 4;
        newMesaBase.isAvailable = true;

        await newMesaBase.save();

        for (let i = 0; i < 20; i++) {
            const newMesa = new Mesa();
            newMesa.capacidad = 4;
            newMesa.isAvailable = true;
            await newMesa.save();
        }

    }catch(error){
        console.log(error);
    }

}

const startSeeder = async () => {
    try{
    await roleSeeder();
    await userSeeder();
    await juegoSeeder();
    await mesaSeeder();

    }catch(error){
        console.log(error);
    }finally{
        await AppDataSource.destroy();
    }
  };
  startSeeder();