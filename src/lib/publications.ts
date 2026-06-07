export interface Publication {
  title: string;
  authors: string[]; // formatted "F. Last"
  year: number | null;
  venue: string;
  doi: string | null;
  url: string | null;
}
