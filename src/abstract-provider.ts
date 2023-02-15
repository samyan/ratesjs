import { AxiosInstance, AxiosRequestConfig } from 'axios';
import Provider from './contracts/provider';
import Result from './contracts/result';

abstract class AbstractProvider extends Provider {
	private client: AxiosInstance;
	private axiosRequestConfig: AxiosRequestConfig<any>;

	protected base: string;
	protected targets: string[];
	protected types: string[];

	/**
	 * Constructor
	 *
	 * @param {AxiosInstance} client
	 * @param {AxiosRequestConfig<any>} axiosRequestConfig
	 * @memberof AbstractProvider
	 */
	public constructor(client: AxiosInstance, axiosRequestConfig: AxiosRequestConfig<any>) {
		super();

		this.client = client;
		this.axiosRequestConfig = axiosRequestConfig;

		this.base = 'USD';
		this.targets = [];
		this.types = ['latest'];
	}

	/**
	 * Set base
	 *
	 * @param {string} base
	 * @return {*}  {this}
	 * @memberof AbstractProvider
	 */
	public setBase(base: string): this {
		this.base = base;

		return this;
	}

	/**
	 * Set targets
	 *
	 * @param {string[]} targets
	 * @return {*}  {this}
	 * @memberof AbstractProvider
	 */
	public setTargets(targets: string[]): this {
		this.targets = targets;

		return this;
	}

	/**
	 * Get client
	 *
	 * @return {*}  {AxiosInstance}
	 * @memberof AbstractProvider
	 */
	public getClient(): AxiosInstance {
		return this.client;
	}

	/**
	 * Get client config
	 *
	 * @return {*}  {AxiosRequestConfig}
	 * @memberof AbstractProvider
	 */
	public getClientConfig(): AxiosRequestConfig {
		return this.axiosRequestConfig;
	}

	/**
	 * Get result
	 *
	 * @param {string} [type]
	 * @return {*}  {Result}
	 * @memberof AbstractProvider
	 */
	public async getResult(type?: string): Promise<Result> {
		if (type && !this.types.includes(type)) {
			throw new Error(`Request type [${type}] not supported`);
		}

		switch (type || 'latest') {
			case 'latest':
			default:
				return this.getLatest(this.base, this.targets);
		}
	}

	/**
	 * Get types of request
	 *
	 * @return {*}  {string[]}
	 * @memberof AbstractProvider
	 */
	public getTypes(): string[] {
		return this.types;
	}

	/**
	 * Request http
	 *
	 * @protected
	 * @abstract
	 * @param {string} method
	 * @param {string} endpoint
	 * @param {AxiosRequestConfig<any>} options
	 * @return {*}  {any}
	 * @memberof AbstractProvider
	 */
	protected abstract requestHttp(method: string, endpoint: string, options: AxiosRequestConfig<any>): any;
}

export default AbstractProvider;