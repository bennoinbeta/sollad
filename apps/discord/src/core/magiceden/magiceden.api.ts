import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Collection, CollectionListItem } from './magiceden.types';

export class MagicEdenApi {
  private authKey?: string;

  constructor(authKey?: string) {
    this.authKey = authKey;
  }

  private fetch<T>(
    url: string,
    config: AxiosRequestConfig<T> = {},
  ): Promise<AxiosResponse<T>> {
    let headers = config.headers ?? {};
    if (this.authKey != null) {
      headers = {
        Authorization: `Bearer ${this.authKey}`,
      };
    }

    return axios.get(url, {
      headers,
      ...config,
    });
  }

  public async getCollections(
    launchpad = true,
    offset = 0,
    limit = 10,
  ): Promise<Collection[] | null> {
    const url = `https://api-mainnet.magiceden.dev/v2/${
      launchpad ? 'launchpad/' : ''
    }collections?offset=${offset}&limit=${limit}`;
    const response = await this.fetch<Collection[]>(url);
    return response.data ?? null;
  }

  public async getCollectionList(
    symbol: string,
    offset = 0,
    limit = 10,
  ): Promise<CollectionListItem[]> {
    const url = `https://api-mainnet.magiceden.dev/v2/collections/${symbol}/listings?offset=${offset}&limit=${limit}`;
    const response = await this.fetch<CollectionListItem[]>(url);
    return response.data ?? null;
  }
}
