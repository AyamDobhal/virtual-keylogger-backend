import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { KeyEvent } from "src/keyEvents/schemas/keyEvent.schema";
import { CreateKeyEventDto } from "./dtos/createKeyEvent.dto";
import { KeyEventResponseDto } from "./dtos/keyEventResponse.dto";
import { PaginatedResponse, TPaginatedResponse } from "helpers/pagination";

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

	removeMsFromTimestamp(timestamp: string): Date {
		return new Date(timestamp.split(".")[0] + "Z");
	}

	async create(keyEvent: CreateKeyEventDto): Promise<KeyEventResponseDto> {
		keyEvent.timestamp = this.removeMsFromTimestamp(
			new Date(keyEvent.timestamp).toISOString()
		);
		keyEvent.lastClear = this.removeMsFromTimestamp(
			new Date(keyEvent.lastClear).toISOString()
		);
		keyEvent.sessionStartTime = this.removeMsFromTimestamp(
			new Date(keyEvent.sessionStartTime).toISOString()
		);
		const createdKeyEvent = new this.keyEventModel(keyEvent);
		return this.parseEvent(await createdKeyEvent.save());
	}

	async find(query: {
		sessionStartTime?: Date;
		lastClear?: Date;
		page?: number;
		limit?: number;
	}): Promise<TPaginatedResponse<KeyEvent>> {
		const { page, limit } = query;
		delete query.page;
		delete query.limit;
		const data = new Promise<TPaginatedResponse<KeyEvent>>((resolve) => {
			const keyEventQuery = this.keyEventModel.find(query);
			const keyEvents = new PaginatedResponse(
				keyEventQuery,
				page || 1,
				limit || 5
			);
			resolve(keyEvents.get());
		});
		return await data;
	}
}
