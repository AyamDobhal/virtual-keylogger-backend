import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { KeyEvent } from "src/keyEvents/schemas/keyEvent.schema";
import { CreateKeyEventDto } from "./dtos/createKeyEvent.dto";
import { KeyEventResponseDto } from "./dtos/keyEventResponse.dto";

@Injectable()
export class KeyEventService {
	constructor(
		@InjectModel(KeyEvent.name)
		private readonly keyEventModel: Model<KeyEvent>
	) {}

	parseEvent(keyEvent: KeyEvent): KeyEventResponseDto {
		return {
			key: keyEvent.key,
			timestamp:
				keyEvent.timestamp.toDateString() +
				" " +
				keyEvent.timestamp.toLocaleTimeString(),
			lastClear:
				keyEvent.lastClear.toDateString() +
				" " +
				keyEvent.lastClear.toLocaleTimeString(),
			sessionStartTime:
				keyEvent.sessionStartTime.toDateString() +
				" " +
				keyEvent.timestamp.toLocaleTimeString()
		};
	}

	async create(keyEvent: CreateKeyEventDto): Promise<KeyEventResponseDto> {
		const createdKeyEvent = new this.keyEventModel(keyEvent);
		return this.parseEvent(await createdKeyEvent.save());
	}

	async find(query: {
		sessionStartTime?: Date;
		lastClear?: Date;
	}): Promise<Array<KeyEvent>> {
		return this.keyEventModel.find(query).exec();
	}
}
