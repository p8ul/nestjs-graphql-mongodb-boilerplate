import { parse } from 'dotenv';
import * as fs from 'fs';
export interface IConfig {
  [key: string]: string;
}

export class ConfigService {
  private readonly envConfig: IConfig;
  constructor() {
    const config = parse(fs.readFileSync('.env'));
    this.envConfig = config;
  }
  get(key: string) {
    return this.envConfig[key];
  }
}
