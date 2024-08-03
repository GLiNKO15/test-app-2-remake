export interface hourlyInterface {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  hourly: {
    clouds: number;
    humidity: number;
    pop: number;
    pressure: number;
    temp: number;
    visibility: number;
  }[]
}