import { type ICollectionItem } from "@/app/helpers/data";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import { useState, useEffect } from "react";

interface CollectionItemProps {
  item: ICollectionItem;
  index: number;
}

const alphabet = "abcdefghijklmnopqrstuvwxyz";
const CollectionItem: React.FC<CollectionItemProps> = ({ item, index }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Close lightbox on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };

    if (selectedImage) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when lightbox is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const handleCloseLightbox = () => {
    setSelectedImage(null);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleCloseLightbox();
    }
  };

  return (
    <>
      <div className="flex flex-col gap-6 w-full">
        <div
          key={item.id}
          className="grid grid-cols-[auto_auto_auto] items-center gap-3 w-fit"
        >
          <div>{index + 1}</div>
          <div>●</div>
          <div className="text-center">{item.name}</div>
        </div>
        {item.description}
        <Swiper
          modules={[FreeMode]}
          freeMode={true}
          spaceBetween={12}
          slidesPerView="auto"
          className="w-full"
        >
          {item.image.map((image: string, indexInner: number) => (
            <SwiperSlide
              key={`${item.id}-${indexInner}`}
              style={{ width: "auto" }}
            >
              <div className="flex flex-col gap-3">
                <img
                  className="h-96 w-auto object-contain cursor-pointer hover:opacity-90 transition-opacity"
                  src={image}
                  alt={item.name}
                  onClick={() => handleImageClick(image)}
                />
                <div className="">
                  fig. ({index + 1}){alphabet[indexInner]}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={handleOverlayClick}
        >
          <div className="relative w-[80vw] h-[80vh] max-w-[80vw] max-h-[80vh] flex items-center justify-center overflow-hidden">
            <div className="relative w-full h-full flex items-center justify-center">
              <button
                onClick={handleCloseLightbox}
                className="absolute top-0 right-0 bg-black text-white hover:text-gray-300 transition-colors z-20 cursor-pointer   p-2 flex items-center justify-center"
                aria-label="Close lightbox"
              >
                (Exit)
              </button>
              <img
                src={selectedImage}
                alt={item.name}
                className="w-[80vw] h-[80vh]  object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CollectionItem;
