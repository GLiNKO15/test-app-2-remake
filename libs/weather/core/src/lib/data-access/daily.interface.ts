export interface dailyInterface {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  daily: {
    feels_like: {
      day: number;
      night: number;
      eve: number;
      morn: number;
    };
    temp: {
      day: number;
      min: number;
      max: number;
      night: number;
      eve: number;
      morn: number;
    };
  }[];
}