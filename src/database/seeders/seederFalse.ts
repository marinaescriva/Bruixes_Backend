import { Role } from "../../models/Role";
import { User } from "../../models/User";
import { Juego } from "../../models/Juego";
import { Mesa } from "../../models/Mesa";
import { createConnection } from "typeorm";
import { Connection } from 'typeorm';


import bcrypt from "bcrypt";
import { fakerES, id_ID } from "@faker-js/faker";


// ------------------------
//  como son los 2 roles y generar los 2 roles
//-------------------------
const roleSeeder = async (connection:Connection) => {

    const roleRepository = connection.getRepository(Role);

    const superAdminRole = new Role();
    superAdminRole.id = 1;
    superAdminRole.nombre = "superadmin";
    await roleRepository.save(superAdminRole);

    const userRole = new Role();
    userRole.id = 2;
    userRole.nombre = "user";
    await roleRepository.save(userRole);
};

//-------------------------
//como es un superadmin
//-------------------------

const superAdminSeeder = async (connection:Connection) => {
    
    const userRepository = connection.getRepository(User);

    const superAdmin = new User();

    superAdmin.nombre = "superadmin";
    superAdmin.email = "superadmin@gmail.com";
    superAdmin.password = bcrypt.hashSync("123456", 6);
    superAdmin.idRole = 1;
    superAdmin.isActive = true;
    superAdmin.createdAt = new Date();
    superAdmin.updatedAt = new Date();

    await userRepository.save(superAdmin);

}

//-------------------------
// como es un usuario 
//-------------------------
const userSeeder = async (connection:Connection) => {

    const userRepository = connection.getRepository(User);

    const user = new User();

    user.nombre = fakerES.person.firstName();
    user.email = fakerES.internet.email();
    user.password = bcrypt.hashSync("123456", 6);
    user.idRole = 2;
    user.isActive = true;
    user.createdAt = new Date();
    user.updatedAt = new Date();

    await userRepository.save(user);

    return user;
};

//-------------------------
// funcion que genera el superadmin y los 20 usuarios falsos
//-------------------------
const fakeUsersSeeder = async (connection:Connection) => {
    
    
    const userRepository = connection.getRepository(User);

    await roleSeeder(connection);

    const userPromises = Array.from({ length: 20 }, () => userSeeder(connection));
    const users = await Promise.all(userPromises);

    await superAdminSeeder(connection);

    console.log(users);

    await userRepository.save(users);
    return users;
};

fakeUsersSeeder().catch(console.error);

//-------------------------
// como es un juego random
//-------------------------
const juegoSeeder = async (connection:Connection) => {


    const juegoRepository = connection.getRepository(Juego);

    const juego = new Juego();

    juego.nombre = fakerES.commerce.productName();
    juego.jugadores = fakerES.number.bigInt({ min: 1, max: 8 });
    juego.isAvailable = true;

    await juegoRepository.save(juego);

    return juego;
};

//-------------------------
// funcion que genera 20 juegos random
//-------------------------
const fakeJuegosSeeder = async (connection:Connection) => {

    

    const juegoPromises = Array.from({ length: 20 }, () => juegoSeeder(connection));
    const juegos = await Promise.all(juegoPromises);

    console.log(juegos);
    return juegos;
};

fakeJuegosSeeder().catch(console.error);


//-------------------------
// como es una mesa
//-------------------------
const mesaSeeder = async (connection:Connection) => {

    const mesaRepository = connection.getRepository(Mesa);

    const mesa = new Mesa();

    mesa.capacidad = Math.floor(Math.random() * 8) + 1;
    mesa.isAvailable = true;

    await mesaRepository.save(mesa);

    return mesa;
};

//-------------------------
// funcion que genera 15 mesas
//-------------------------
const fakeMesasSeeder = async (connection:Connection) => {

    

    const mesaPromises = Array.from({ length: 15 }, () => mesaSeeder(connection));
    const mesas = await Promise.all(mesaPromises);

    console.log(mesas);
    return mesas;
};

fakeMesasSeeder().catch(console.error);

const startSeeder = async (connection: Connection) => {
    await roleSeeder(connection);
    await userSeeder(connection);
    await juegoSeeder(connection);
    await mesaSeeder(connection);
    await fakeUsersSeeder(connection);
    await fakeJuegosSeeder(connection);
    await fakeMesasSeeder(connection);
  };

  createConnection().then(async connection => {
    await startSeeder(connection);
}).catch(error => console.log(error));

// ------------------------
//  como es una reserva de mesa
//-------------------------


// const reservaMesaSeeder = async (reservaInstance, mesaInstance) => {

//     const reserva = await Reserva.findOne({ });
//     const mesa = await Mesa.findOne({  });
    
//     await reservaMesaSeeder(reserva, mesa);
    

//     const reservaMesa = new ReservaMesa();

//     reservaMesa.reserva = reservaInstance;
//     reservaMesa.mesa = mesaInstance;

//     await reservaMesa.save();

//     return reservaMesa;
// };
 
// const reservaSeeder = async () => {
    
//     const users = await User.find();
//     const mesas = await Mesa.find();

    
//     for (let i = 0; i < 5; i++) {
//         // Seleccionar un usuario aleatorio
//         const user = users[Math.floor(Math.random() * users.length)];

//         // Seleccionar una mesa aleatoria
//         const mesa = mesas[Math.floor(Math.random() * mesas.length)];

//         // Crear una nueva reserva
//         const reserva = new Reserva();
//         reserva.idUsuario = user.id;
//         reserva.idReservaMesa = mesa.id;

//         // Configurar la fecha y hora de inicio de la reserva (puedes ajustar esto según tus necesidades)
//         reserva.fechaHoraInicio = fakerES.date.between(new Date(), new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000));

//         // Guardar la reserva
//         await reserva.save();
//     }

//     console.log("Reservas creadas exitosamente.");
// };



// const reservaSeeder = async () => {
//     const reserva = new Reserva();

//     // Seleccionar un usuario aleatorio para la reserva
//     const users = await User.find();
//     const user = [Math.floor(Math.random() * users.length)];

//     // const usersCount = await User.count();
//     // const userId= fakerES.datatype.number({ min: 1, max: usersCount });
//     // const user = await User.findOne(userId); //aqui deberia ser id_usuario no??

//     // Seleccionar una mesa aleatoria

//     const mesas = await Mesa.find(); // aqui tiene que ser el modelo de reserva mesa no de mesa porque hay una tabla intermedia (???????????)
//     const mesa = mesas[Math.floor(Math.random() * mesas.length)];

//     const reservaMesa = await reservaMesaSeeder(reserva, mesa);

//     reserva.idReservaMesa = reservaMesa.id;

//     await reserva.save();

//     return reserva;
// };

    // const mesasCount = await Mesa.count();
    // const mesaId = fakerES.number.bigInt({ min: 1, max: mesasCount });
    // const mesa = await Mesa.findOne(mesaId); //aqui deberia ser id_mesa_reserva pero no se como hacerlo


    // Configurar la reserva

// const fakeReservasMesaSeeder = async () => {
//     const reservaMesaPromises = Array.from({ length: 5 }, reservaMesaSeeder);
//     const reservasMesa = await Promise.all(reservaMesaPromises);

//     console.log("Reservas de mesa generadas:", reservasMesa);
//     return reservasMesa;
// };

// fakeReservasMesaSeeder().catch(console.error);
