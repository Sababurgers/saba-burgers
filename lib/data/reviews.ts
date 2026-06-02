export interface Review {
  id: string;
  author: string;
  initial: string;
  date: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
}

export const REVIEWS: Review[] = [
  {
    id: "r-1",
    author: "Marta P.",
    initial: "M",
    date: "hace 3 días",
    rating: 5,
    text: "La mejor smashburger de la Vall, sin discusión. Volvemos cada finde.",
  },
  {
    id: "r-2",
    author: "Jordi M.",
    initial: "J",
    date: "hace 1 semana",
    rating: 5,
    text: "El pan, la carne, la salsa. Todo a punto. Recomiendo La Saba con doble queso.",
  },
  {
    id: "r-3",
    author: "Alba R.",
    initial: "A",
    date: "hace 2 semanas",
    rating: 5,
    text: "Vinimos desde Valencia solo para probarlas. Vale el viaje hasta L'Olleria.",
  },
];

export const REVIEW_STATS = {
  average: 4.8,
  total: 1247,
  source: "Google",
};
