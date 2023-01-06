import { IKeyEvent } from "../interfaces/keyEvent.interface";

export const KeyEvents: Array<IKeyEvent> = [
	{
		key: "a",
		timestamp: new Date("2020-01-01T00:00:00.000Z"),
		lastClear: new Date("2020-01-01T00:00:00.000Z"),
		sessionStartTime: new Date("2020-01-01T00:00:00.000Z")
	},
	{
		key: "b",
		timestamp: new Date("2020-01-01T00:00:01.000Z"),
		lastClear: new Date("2020-01-01T00:00:01.000Z"),
		sessionStartTime: new Date("2020-01-01T00:00:01.000Z")
	},
	{
		key: "c",
		timestamp: new Date("2020-01-01T00:00:02.000Z"),
		lastClear: new Date("2020-01-01T00:00:02.000Z"),
		sessionStartTime: new Date("2020-01-01T00:00:02.000Z")
	}
];
