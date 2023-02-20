import AbstractProvider from '../abstract-provider';
import { AxiosInstance, AxiosRequestConfig } from 'axios';
import Result from '../result';

class YahooProvider extends AbstractProvider {
	private endpoint: string = 'https://query1.finance.yahoo.com/v7/finance/quote';

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
				fields: 'regularMarketPrice',
			};
		}

		// Request
		const originalRates: { symbol: string; regularMarketPrice: string }[] = await this.requestHttp('GET', this.endpoint, { params });

		// Loop rates
		originalRates.forEach((originalRate) => {
			const { symbol, regularMarketPrice } = originalRate;

			// Extract currency
			const currency: string = symbol.substring(this.base.length, symbol.indexOf('=X'));
			// Insert
			rates[currency] = String(regularMarketPrice);
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
		return data['quoteResponse']['result'];
	}
}

export default YahooProvider;
