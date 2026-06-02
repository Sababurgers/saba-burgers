import { businessHoursLabel } from "./business-hours";

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  neighborhood: string;
  hours: string;
  phone: string;
  whatsapp: string;
  mapsUrl: string;
  services: string;
}

export const LOCATION: Location = {
  id: "lolleria",
  name: "Saba Burgers",
  address: "C. Ausìás March, 22",
  city: "L'Olleria",
  postalCode: "46850",
  neighborhood: "46850 L'Olleria · Valencia",
  hours: businessHoursLabel(),
  phone: "722 364 407",
  whatsapp: "https://wa.me/34722364407",
  mapsUrl: "https://maps.google.com/?q=C.+Ausiàs+March+22+L'Olleria+Valencia",
  services: "Take away · Reservas",
};

export const LOCATIONS = [LOCATION];
