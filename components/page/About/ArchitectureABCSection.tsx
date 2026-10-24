import Image, { StaticImageData } from "next/image";
import abImg1 from "@/assets/ab_img_1.png";
import abImg2 from "@/assets/ab_img_2.png";
import abImg3 from "@/assets/ab_img_3.png";
import { ArchitectureABCSectionData } from "@/hooks/api/cms";

interface ArchitectureABCSectionProps {
  data?: ArchitectureABCSectionData;
}

interface DisplayImageItem {
  id: number | string;
  title: string;
  image: string | StaticImageData;
}

const DEFAULT_IMAGES: DisplayImageItem[] = [
  { id: 1, title: "The ABCs of architecture kit", image: abImg1 },
  { id: 2, title: "Wooden architecture letters", image: abImg2 },
  { id: 3, title: "Building structures with letters", image: abImg3 },
];

export function ArchitectureABCSection({ data }: ArchitectureABCSectionProps) {
  const title =
    data?.title ||
    "Before Turrim, there was — \nthe ABCs of architecture";

  const hasCmsImages = data?.images && data.images.length > 0;

  const displayList: DisplayImageItem[] = hasCmsImages
    ? data!.images.map((img, idx) => ({
        id: img.id || idx + 1,
        title: img.title || `Architecture item ${idx + 1}`,
        image: img.imageUrl || DEFAULT_IMAGES[idx % DEFAULT_IMAGES.length].image,
      }))
    : DEFAULT_IMAGES;

  return (
    <section className="w-full bg-white py-10 sm:py-14 md:py-16 lg:py-20 px-4 sm:px-6 md:px-12 lg:px-20">
      <div className="container mx-auto space-y-8 sm:space-y-10 md:space-y-12">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-center font-normal text-[#2D2D2D] leading-snug sm:leading-tight tracking-tight px-2 whitespace-pre-line">
          {title}
        </h2>

        {/* Images Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-sm sm:max-w-none mx-auto">
          {displayList.map((item, index) => {
            const isLastOnTablet =
              index === 2 &&
              "sm:col-span-2 md:col-span-1 sm:max-w-md sm:mx-auto md:max-w-none md:w-full";
            const isStringUrl = typeof item.image === "string";

            return (
              <div
                key={item.id}
                className={`relative aspect-square w-full rounded-2xl md:rounded-3xl overflow-hidden bg-gray-50 shadow-sm group ${
                  isLastOnTablet || ""
                }`}
              >
                {isStringUrl ? (
                  <Image
                    src={item.image as string}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    unoptimized
                  />
                ) : (
                  <Image
                    src={item.image as StaticImageData}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    placeholder="blur"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
