import Result from './result';

abstract class Provider {
	/**
	 * Get latest currency exchange rates
	 *
	 * @abstract
	 * @param {string} base
	 * @param {string[]} targets
	 * @return {*}  {Promise<Result>}
	 * @memberof Provider
	 */
	public abstract getLatest(base: string, targets: string[]): Promise<Result>;

	/**
	 * Set base currency
	 *
	 * @abstract
	 * @param {string} base
	 * @return {*}  {this}
	 * @memberof Provider
	 */
	public abstract setBase(base: string): this;

	/**
	 * Set targets
	 *
	 * @abstract
	 * @param {string[]} targets
	 * @return {*}  {this}
	 * @memberof Provider
	 */
	public abstract setTargets(targets: string[]): this;

	/**
	 * Get result by type. Call [getTypes] for available types
	 *
	 * @abstract
	 * @param {string} [type]
	 * @return {*}  {Promise<Result>}
	 * @memberof Provider
	 */
	public abstract getResult(type?: string): Promise<Result>;

	/**
	 * Get request types
	 *
	 * @abstract
	 * @return {*}  {string[]}
	 * @memberof Provider
	 */
	public abstract getTypes(): string[];
}

export default Provider;
