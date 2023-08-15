
export type VacationType = {
  id: number;
  destination: string;
  description: string;
  startOn: Date;
  endOn: Date;
  price: number;
  imageFile: any;
  imageName: string;
}

export type FilterType = "All" | "Fav" | "Future" | "Active"
