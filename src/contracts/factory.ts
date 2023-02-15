import Provider from './provider';

abstract class Factory {
	/**
	 * Set proxy
	 *
	 * @abstract
	 * @memberof Factory
	 */
	public abstract setProxy: (protocol: string, host: string, port: number, auth: { username: string; password: string }) => void;

	/**
	 * Get provider
	 *
	 * @abstract
	 * @memberof Factory
	 */
	public abstract getProvider: (provider?: string) => Provider;
}

export default Factory;
