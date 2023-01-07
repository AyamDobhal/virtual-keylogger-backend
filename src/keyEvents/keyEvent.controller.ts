import { Body, Controller, Get, Post, Query, Res } from "@nestjs/common";
import { KeyEventService } from "./keyEvent.service";
import { CreateKeyEventDto } from "./dtos/createKeyEvent.dto";
import { Response } from "express";

@Controller("keyEvents")
export class KeyEventController {
	constructor(private readonly keyEventService: KeyEventService) {}

	@Post("")
	async create(@Res() res: Response, @Body() body: CreateKeyEventDto) {
		const createdKeyEvent = await this.keyEventService.create(body);
		res.status(201).json(createdKeyEvent);
		console.log("New key event created:");
		console.table(createdKeyEvent);
	}

	@Get("")
	async find(
		@Res() res: Response,
		@Query()
		query: {
			sessionStartTime?: Date;
			lastClear?: Date;
			page?: number;
			limit?: number;
		}
	) {
		const keyEvents = await this.keyEventService.find(query);
		return res.status(200).json(keyEvents);
	}
}
