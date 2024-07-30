export interface locationInterface {
  lat: number | null,
  lon: number | null,
  name?: string
}

export interface locationNameInterface extends locationInterface{
  name: string
}