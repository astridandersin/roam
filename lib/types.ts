export type PlaceKind =
  | "Startup"
  | "VC"
  | "Accelerator"
  | "Founder House"
  | "Entrepreneurship Society"
  | "Big Tech"
  | "Alumni"
  | "Event";

export type Place = {
  id: string;
  name: string;
  kind: PlaceKind;
  /** Owning city id (matches City.id) */
  cityId: string;
  /** First date Roam visited, ISO yyyy-mm-dd */
  firstVisited: string;
  /** Short blurb shown in modal */
  description: string;
  /** Cohort notes: what we learned, who we met */
  notes: string[];
  /** Optional: external site */
  website?: string;
  /** Optional photo paths under /public */
  photos?: string[];
  /** Optional logo monogram if we don't have a real logo */
  monogram?: string;
};

export type City = {
  id: string;
  name: string;
  country: string;
  countryCode: string; // ISO 3166-1 alpha-3
  iata: string;        // airport code shown on the board
  lat: number;
  lng: number;
  /** First date the cohort was on the ground in this city */
  firstVisited: string;
  /** Aaltoes summary line for the city */
  blurb: string;
  /** Optional photo paths (under /public) shown at the top of the city panel */
  photos?: string[];
};
