abstract class Result {
	/**
	 * Get base currency
	 *
	 * @abstract
	 * @return {*}  {string}
	 * @memberof Result
	 */
	public abstract getBase(): string;

	/**
	 * Get rates
	 *
	 * @abstract
	 * @return {*}  {{ [key: string]: string }}
	 * @memberof Result
	 */
	public abstract getRates(): { [key: string]: string };

	/**
	 * Get rate of currency
	 *
	 * @abstract
	 * @param {string} currency
	 * @return {*}  {string}
	 * @memberof Result
	 */
	public abstract getRate(currency: string): string;
}

export default Result;
