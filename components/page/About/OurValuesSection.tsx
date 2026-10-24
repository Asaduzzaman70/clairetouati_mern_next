import { OurValuesSectionData, ValueCardItem } from "@/hooks/api/cms";

interface OurValuesSectionProps {
  data?: OurValuesSectionData;
}

const DEFAULT_VALUES: ValueCardItem[] = [
  {
    bgColor: "bg-[#FFD600]",
    title: "Remarkable simplicity",
    description: "Structuring complexity into clarity.",
    textColor: "text-[#1A1A2E]",
  },
  {
    bgColor: "bg-[#FF8A50]",
    title: "Playful intelligence",
    description: "Learning by doing, not by force.",
    textColor: "text-[#1A1A2E]",
  },
  {
    bgColor: "bg-[#C8102E]",
    title: "Kindness and integrity",
    description: "Respect and care at every step.",
    textColor: "text-white",
  },
  {
    bgColor: "bg-[#6930C3]",
    title: "Inclusion and accessibility",
    description: "Made for every body and mind.",
    textColor: "text-white",
  },
  {
    bgColor: "bg-[#0056D2]",
    title: "Transmission",
    description: "Knowledge shared, embodied, and transformed.",
    textColor: "text-white",
  },
  {
    bgColor: "bg-[#007F3E]",
    title: "Joyful sustainability",
    description: "Objects designed to last, to be repaired and reused.",
    textColor: "text-white",
  },
];

export function OurValuesSection({ data }: OurValuesSectionProps) {
  const title = data?.title || "Our world in color";
  const items = data?.values && data.values.length > 0 ? data.values : DEFAULT_VALUES;

  return (
    <section className="w-full bg-[#F8F8F8] py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-20">
      <div className="container mx-auto space-y-8 sm:space-y-12 md:space-y-16">
        {/* Header */}
        <div className="text-center space-y-3 sm:space-y-4">
          <span className="text-[11px] sm:text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#4A4A4A]">
            OUR VALUES
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-[#1A1A2E] tracking-tight">
            {title}
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-sm sm:max-w-none mx-auto">
          {items.map((item, index) => {
            const isHexBg =
              item.bgColor?.startsWith("#") || item.bgColor?.startsWith("rgb");
            const isHexText =
              item.textColor?.startsWith("#") || item.textColor?.startsWith("rgb");

            const bgClass = !isHexBg && item.bgColor ? item.bgColor : "";
            const textClass = !isHexText && item.textColor ? item.textColor : "text-white";

            return (
              <div
                key={item.id ?? index}
                style={{
                  backgroundColor: isHexBg ? item.bgColor : undefined,
                  color: isHexText ? item.textColor : undefined,
                }}
                className={`rounded-2xl md:rounded-4xl p-6 sm:p-7 md:p-8 min-h-40 sm:h-48 md:h-56 flex flex-col justify-end space-y-1.5 sm:space-y-2 ${bgClass} ${textClass} transition-transform hover:scale-[1.02] duration-300 shadow-sm`}
              >
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm md:text-base opacity-90 font-medium leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
