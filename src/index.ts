import axios, { AxiosInstance } from 'axios';
import { HttpsProxyAgent } from 'https-proxy-agent';
import Factory from './contracts/factory';
import Provider from './contracts/provider';
import BinanceProvider from './providers/binance';
import YahooProvider from './providers/yahoo';

class CurrencyRates implements Factory {
	private axiosInstance: AxiosInstance;
	private providers: string[];
	private defaultProvider: string;

	/**
	 * Constructor
	 *
	 * @memberof CurrencyRates
	 */
	public constructor() {
        this.axiosInstance = axios.create();

		this.providers = ['yahoo', 'binance'];
		this.defaultProvider = 'binance';
	}

	/**
	 * Set proxy
	 *
	 * @param {string} endpoint
	 * @memberof CurrencyRates
	 */
	public setProxy(endpoint: string): void {
		if (endpoint.indexOf('https')) {
			this.axiosInstance.defaults.httpsAgent = new HttpsProxyAgent(endpoint);
		} else if (endpoint.indexOf('http')) {
			this.axiosInstance.defaults.httpAgent = new HttpsProxyAgent(endpoint);
		} else {
			throw new Error('Unknown proxy protocol');
		}
	}

	/**
	 * Get default provider
	 *
	 * @return {*}  {string}
	 * @memberof CurrencyRates
	 */
	public getDefaultProvider(): string {
		return this.defaultProvider;
	}

	/**
	 * Get provider
	 *
	 * @param string|null $provider
	 * @return \samyan\CurrencyRates\Contracts\Provider
	 */
	public getProvider(provider?: string): Provider {
		const defaultProvider: string = provider ?? this.defaultProvider;

		if (!this.providers.includes(defaultProvider)) {
			throw new Error(`Provider [${provider}] not supported`);
		}

		switch (defaultProvider) {
			default:
			case 'binance':
				return new BinanceProvider(this.axiosInstance);
			case 'yahoo':
				return new YahooProvider(this.axiosInstance);
		}
	}
}

export default CurrencyRates;
