import img1 from "@/assets/matcha_images/1.jpg";
import img2 from "@/assets/matcha_images/2.jpg";
import img3 from "@/assets/matcha_images/3.jpg";
import img4 from "@/assets/matcha_images/4.jpg";
import img5 from "@/assets/matcha_images/5.jpg";
import img6 from "@/assets/matcha_images/6.jpg";
import img7 from "@/assets/matcha_images/7.jpg";
import img8 from "@/assets/matcha_images/8.jpg";
import img9 from "@/assets/matcha_images/9.jpg";
import img10 from "@/assets/matcha_images/10.jpg";

export interface MatchaPlace {
  id: string;
  name: string;
  rating: number;
  priceRange: "$" | "$$" | "$$$" | "$$$$";
  distance: number; // in miles
  matchScore: number; // 0-100
  address: string;
  lat: number;
  lng: number;
  image: string;
  tags: string[];
  heartsCount?: number; // NEW: Number of hearts for this place
  isHearted?: boolean; // NEW: Whether current user has hearted this place
}

export const mockMatchaPlaces: MatchaPlace[] = [
  {
    id: "1",
    name: "Zen Matcha House",
    rating: 4.8,
    priceRange: "$$",
    distance: 0.3,
    matchScore: 95,
    address: "123 Green St, Sydney NSW",
    lat: -33.8688,
    lng: 151.2093,
    image: img1,
    tags: ["ceremonial grade", "organic", "wifi"],
    heartsCount: 42
  },
  {
    id: "2", 
    name: "Emerald Tea Lounge",
    rating: 4.6,
    priceRange: "$$$",
    distance: 0.7,
    matchScore: 88,
    address: "456 Matcha Ave, Sydney NSW",
    lat: -33.864,
    lng: 151.215,
    image: img2,
    tags: ["premium blends", "quiet atmosphere", "desserts"],
    heartsCount: 35
  },
  {
    id: "3",
    name: "Green Leaf Cafe",
    rating: 4.4,
    priceRange: "$",
    distance: 1.2,
    matchScore: 82,
    address: "789 Tea Rd, Sydney NSW",
    lat: -33.872,
    lng: 151.2006,
    image: img3,
    tags: ["affordable", "casual", "takeout"],
    heartsCount: 28
  },
  {
    id: "4",
    name: "Traditional Matcha Studio",
    rating: 4.9,
    priceRange: "$$$$",
    distance: 1.8,
    matchScore: 90,
    address: "321 Ceremony Way, Sydney NSW",
    lat: -33.86,
    lng: 151.19,
    image: img4,
    tags: ["tea ceremony", "authentic", "premium"],
    heartsCount: 67
  },
  {
    id: "5",
    name: "Modern Matcha Co.",
    rating: 4.2,
    priceRange: "$$",
    distance: 2.1,
    matchScore: 75,
    address: "654 Innovation St, Sydney NSW",
    lat: -33.88,
    lng: 151.22,
    image: img5,
    tags: ["modern twist", "instagram-worthy", "fusion"],
    heartsCount: 19
  },
  {
    id: "6",
    name: "Uji Garden Cafe",
    rating: 4.7,
    priceRange: "$$$",
    distance: 2.4,
    matchScore: 86,
    address: "88 Bamboo Ln, Sydney NSW",
    lat: -33.858,
    lng: 151.226,
    image: img6,
    tags: ["garden seating", "matcha parfait", "weekend brunch"],
    heartsCount: 53
  },
  {
    id: "7",
    name: "Matcha Cloud Bar",
    rating: 4.3,
    priceRange: "$$",
    distance: 3.1,
    matchScore: 79,
    address: "19 Cloud St, Sydney NSW",
    lat: -33.852,
    lng: 151.205,
    image: img7,
    tags: ["nitro matcha", "late-night", "good lighting"],
    heartsCount: 22
  },
  {
    id: "8",
    name: "Harbor Matcha",
    rating: 4.5,
    priceRange: "$$$",
    distance: 3.6,
    matchScore: 84,
    address: "5 Quay Rd, Sydney NSW",
    lat: -33.856,
    lng: 151.214,
    image: img8,
    tags: ["harbor view", "seasonal menu", "study-friendly"],
    heartsCount: 38
  },
  {
    id: "9",
    name: "Kumo Tea Lab",
    rating: 4.1,
    priceRange: "$",
    distance: 4.2,
    matchScore: 73,
    address: "210 Lantern St, Sydney NSW",
    lat: -33.879,
    lng: 151.198,
    image: img9,
    tags: ["budget-friendly", "grab-and-go", "smoothies"],
    heartsCount: 14
  },
  {
    id: "10",
    name: "Sakura Matcha Studio",
    rating: 4.8,
    priceRange: "$$$$",
    distance: 4.9,
    matchScore: 92,
    address: "777 Blossom Ave, Sydney NSW",
    lat: -33.865,
    lng: 151.235,
    image: img10,
    tags: ["chef tasting", "ceremony sets", "reservation-only"],
    heartsCount: 71
  }
];