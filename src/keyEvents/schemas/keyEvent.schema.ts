import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { IKeyEvent } from "../interfaces/keyEvent.interface";

export type KeyEventDocument = HydratedDocument<KeyEvent>;

@Schema()
export class KeyEvent implements IKeyEvent {
	@Prop()
	key: string;

	@Prop()
	timestamp: Date;

	@Prop()
	lastClear: Date;

	@Prop()
	sessionStartTime: Date;
}
export const KeyEventSchema = SchemaFactory.createForClass(KeyEvent);
