import { DataSourceOptions, DataSource } from "typeorm";
import * as dotenv from 'dotenv'
import { User } from "src/Entity/user.Entity";
import { Role } from "src/Entity/role.Entity";
dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
    type: "mysql",
    host: process.env.HOST_DB,
    port: +process.env.PORT_DB,
    username: process.env.USERNAME_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE_DB,
    entities: [User, Role],
    migrations: ['dist/db/migrations/*.js'],
    synchronize: true
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
