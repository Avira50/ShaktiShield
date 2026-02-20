
import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

// Defensive export to prevent undefined errors
export const PlaceHolderImages: ImagePlaceholder[] = (data as any).placeholderImages || [];
