import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
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
	 * @param {string} protocol
	 * @param {string} host
	 * @param {number} port
	 * @param {{ username: string; password: string }} auth
	 * @memberof CurrencyRates
	 */
	public setProxy(protocol: string, host: string, port: number, auth: { username: string; password: string }): void {
		this.axiosInstance.defaults.proxy = {
			protocol,
			host,
			port,
			auth
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
