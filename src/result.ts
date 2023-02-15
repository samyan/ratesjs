import ResultContract from './contracts/result';

class Result implements ResultContract {
	private base: string;
	private rates: { [key: string]: string };

	/**
	 * Constructor
	 *
	 * @param {string} base
	 * @param {{ [key: string]: string }} rates
	 * @memberof Result
	 */
	public constructor(base: string, rates: { [key: string]: string }) {
		this.base = base;
		this.rates = rates;
	}

	/**
	 * Get base
	 *
	 * @return {*}  {string}
	 * @memberof Result
	 */
	public getBase(): string {
		return this.base;
	}

	/**
	 * Get rates
	 *
	 * @return {*}  {{ [key: string]: string; }}
	 * @memberof Result
	 */
	public getRates(): { [key: string]: string } {
		return this.rates;
	}

	/**
	 * Get rate
	 *
	 * @param {string} currency
	 * @return {*}  {string}
	 * @memberof Result
	 */
	public getRate(currency: string): string {
		if (currency === this.base) {
			return '1';
		}

		// Check if currency exists in rates
		if (!this.rates.hasOwnProperty(currency)) {
			throw new Error(`Currency [${currency}] not exists`);
		}

		return this.rates[currency];
	}
}

export default Result;
