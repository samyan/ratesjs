import AbstractProvider from '../abstract-provider';
import { AxiosInstance, AxiosRequestConfig } from 'axios';
import Result from '../result';

class BinanceProvider extends AbstractProvider {
	private endpoint: string = 'https://api.binance.com/api/v3/ticker/price';

	/**
	 * Constructor
	 *
	 * @param {AxiosInstance} client
	 * @param {AxiosRequestConfig<any>} clientConfig
	 * @memberof BinanceProvider
	 */
	public constructor(client: AxiosInstance, clientConfig: AxiosRequestConfig<any>) {
		super(client, clientConfig);
	}

	/**
	 * Get latest
	 *
	 * @param {string} base
	 * @param {string[]} targets
	 * @return {*}  {Promise<Result>}
	 * @memberof BinanceProvider
	 */
	public async getLatest(base: string, targets: string[]): Promise<Result> {
		const symbols: string[] = [];
		const rates: { [key: string]: string } = {};
		let params: any = {};

		if (targets.length > 0) {
			// Loop currencies and construct the symbol
			targets.forEach((target: string) => {
				symbols.push(`${target}${base}`);
			});

			params = {
				symbols: JSON.stringify(symbols),
			};
		}

		// Request
		const originalRates: { symbol: string; price: string }[] = await this.requestHttp('GET', this.endpoint, { params });

		// Loop rates
		originalRates.forEach((originalRate) => {
			const { symbol, price } = originalRate;

			// Extract currency
			const currency: string = symbol.substring(0, symbol.indexOf(this.base));
			// Insert
			rates[currency] = price;
		});

		return new Result(base, rates);
	}

	/**
	 * Request Http
	 *
	 * @param {string} method
	 * @param {string} endpoint
	 * @param {AxiosRequestConfig<any>} options
	 * @return {*}  {Promise<any>}
	 * @memberof BinanceProvider
	 */
	public async requestHttp(method: string, endpoint: string, options: AxiosRequestConfig<any>): Promise<any> {
		// Request
		const response = await this.getClient().request({ method, url: endpoint, ...options });

		// Parse the response
		return response.data;
	}
}

export default BinanceProvider;
