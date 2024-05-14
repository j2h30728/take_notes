import { fetchPixelsPhotos } from "@/api/fetchers";
import Card from "@/components/ui/Card";

export default async function PhotoSlide() {
  const { data } = await fetchPixelsPhotos();
  const photos = data.photos;
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <div className="flex w-fit overflow-hidden group">
        <div className="flex pr-6 gap-6 animate-infiniteSlide group-hover">
          {[...photos, ...photos].map((photo) => (
            <Card
              key={photo.id}
              description={<p>photo.photographer</p>}
              imageSrc={photo.src.large2x}
              title={photo.photographer}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
