import { Query } from "mongoose";

export class PaginatedResponse<T extends Query<any, any, any>> {
	constructor(
		public query: T,
		public page: number,
		public pageSize: number = 50
	) {}

	async get() {
		const count = await this.query.clone().countDocuments();
		const totalPages = Math.ceil(count / this.pageSize);
		const results = await this.query
			.skip((this.page - 1) * this.pageSize)
			.limit(this.pageSize);
		return {
			results,
			totalPages
		};
	}
}

export type TPaginatedResponse<T> = {
	results: Array<T>;
	totalPages: number;
};
