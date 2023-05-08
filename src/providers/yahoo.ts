import AbstractProvider from '../abstract-provider';
import { AxiosInstance, AxiosRequestConfig } from 'axios';
import Result from '../result';

class YahooProvider extends AbstractProvider {
	private endpoint: string = 'https://query1.finance.yahoo.com/v7/finance/spark';

	/**
	 * Constructor
	 *
	 * @param {AxiosInstance} client
	 * @memberof BinanceProvider
	 */
	public constructor(client: AxiosInstance) {
		super(client);
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
				symbols.push(`${base}${target}=X`);
			});

			params = {
				symbols: symbols.join(','),
				range: '1d',
				interval: '5m'
			};
		}

		// Request
		const originalRates: { symbol: string; response: any[] }[] = await this.requestHttp('GET', this.endpoint, { params });

		// Loop rates
		originalRates.forEach((originalRate) => {
			// Extracting root fields
			const { symbol, response } = originalRate;

			// Extracting the price
			const {
				meta: { regularMarketPrice },
			} = response[0];

			if (response.length > 0) {
				// Extract currency
				const currency: string = symbol.substring(base.length, symbol.indexOf('=X'));
				// Insert
				rates[currency] = String(regularMarketPrice);
			}
		});

		return new Result(base, rates);
	}

	/**
	 * Request Http
	 *
	 * @param {string} method
	 * @param {string} endpoint
	 * @param {AxiosRequestConfig<any>} [options]
	 * @return {*}  {Promise<any>}
	 * @memberof YahooProvider
	 */
	public async requestHttp(method: string, endpoint: string, options?: AxiosRequestConfig<any>): Promise<any> {
		// Request
		const { data } = await this.getClient().request({ method, url: endpoint, ...options });

		// Parse the response
		return data['spark']['result'];
	}
}

export default YahooProvider;
