import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { KeyEventModule } from "./keyEvents/keyEvent.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: ".env"
		}),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				uri:
					configService.get<string>("NODE_ENV") === "production"
						? configService.get<string>("MONGO_URI")
						: configService.get<string>("MONGO_URI_DEV")
			}),
			inject: [ConfigService]
		}),
		KeyEventModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
