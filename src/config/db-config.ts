import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/modules/users/entities/user.entity";

export function dbConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
        type: "postgres",  // ✅ Use string directly, DO NOT cast as DatabaseType
        host: configService.get<string>("DB_HOST"),
        port: parseInt(configService.get<string>("DB_PORT") ?? "5432"),
        username: configService.get<string>("DB_USERNAME"),
        password: configService.get<string>("DB_PASSWORD"),
        database: configService.get<string>("DB_DATABASE") ?? "kelp_ass",
        entities: [User],
        synchronize: true,
    };
}
