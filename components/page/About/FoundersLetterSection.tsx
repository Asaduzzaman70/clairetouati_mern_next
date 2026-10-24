import { FoundersLetterSectionData } from "@/hooks/api/cms";

interface FoundersLetterSectionProps {
  data?: FoundersLetterSectionData;
}

export function FoundersLetterSection({ data }: FoundersLetterSectionProps) {
  const title = data?.title || "Claire's Letter, Founder";
  const quote = data?.quote || "“I created Turrim because curiosity saved me.”";
  const letterBody =
    data?.letterBody ||
    "It is curiosity that helps us rebuild ourselves after failure, reconnect after fear, and learn without apprehension. Whether we discover as children or relearn as adults, nurturing our curiosity means regaining our ability to move forward.";
  const signature = data?.signature || "Claire, founder of Turrim";
  const bgColor = data?.bgColor || "#0056b3";

  return (
    <section
      style={{ backgroundColor: bgColor }}
      className="w-full py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-24 flex justify-center text-white"
    >
      <div className="container max-w-4xl flex flex-col items-center text-center space-y-6 sm:space-y-8 md:space-y-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal font-sans tracking-tight leading-tight">
          {title}
        </h2>

        <p className="text-lg sm:text-xl md:text-2xl italic font-light opacity-95">
          {quote}
        </p>

        <p className="text-sm sm:text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-3xl opacity-90">
          {letterBody}
        </p>

        <div className="pt-2 sm:pt-4">
          <p className="text-sm sm:text-base md:text-lg font-light opacity-80">
            {signature}
          </p>
        </div>
      </div>
    </section>
  );
}
