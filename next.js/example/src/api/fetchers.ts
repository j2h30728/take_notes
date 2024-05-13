import { apiPixelsRequester } from "./apiRequester";
import { Photo, PixelsPhotos } from "@/types/pixels";

export const fetchPixelsPhotos = () => apiPixelsRequester.get<PixelsPhotos>("curated");
export const fetchPixelsDetailPhoto = (id: string) => apiPixelsRequester.get<Photo>(`photos/${id}`);
