import { Module } from "@nestjs/common";
import { KeyEventService } from "./keyEvent.service";
import { KeyEventController } from "./keyEvent.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { KeyEvent, KeyEventSchema } from "./schemas/keyEvent.schema";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: KeyEvent.name, schema: KeyEventSchema }
		])
	],
	controllers: [KeyEventController],
	providers: [KeyEventService],
	exports: [KeyEventService]
})
export class KeyEventModule {}
