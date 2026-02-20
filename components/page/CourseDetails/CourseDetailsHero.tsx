import Image from 'next/image'

export default function CourseDetailsHero() {
    return (
        <div className="flex flex-col gap-6">
            {/* Hero Image */}
            <div className="relative w-full aspect-21/9 rounded-[20px] overflow-hidden shadow-sm">
                <Image
                    src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                    alt="Mastering Special Needs Education"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Content */}
            <div className="space-y-2 px-1">
                <p className="text-[#618d5e] font-medium text-base pb-2">
                    Professional Development
                </p>
                <h1 className="text-[28px] font-semibold text-foreground leading-[1.1] tracking-tight">
                    Mastering Special Needs Education
                </h1>
                <p className="text-base text-muted-foreground/90 leading-relaxed">
                    Develop practical classroom strategies for inclusive & effective teaching.
                </p>
            </div>
        </div>
    )
}