import { FileText, File, Download } from "lucide-react";

const resources = [
    { id: 1, name: "Inclusive Teaching Strategies.pdf", type: "PDF", size: "2.4 MB", icon: FileText },
    { id: 2, name: "Behavior Management Guideline.pdf", type: "PDF", size: "1.8 MB", icon: FileText },
    { id: 3, name: "Student Engagement Worksheet.xlsx", type: "Excel", size: "1.2 MB", icon: File },
    { id: 4, name: "Course Media Assets.zip", type: "Zip", size: "45.0 MB", icon: File },
];

export default function ResourceTab() {
    return (
        <div className="bg-[#F4F4F4] p-4 sm:p-5 md:p-6 rounded-2xl md:rounded-4xl shadow-sm border border-gray-100/50 w-full overflow-hidden">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 sm:mb-6">
                <div className="min-w-0">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#111111] tracking-tight">Resources</h2>
                    <p className="text-[#6B7280] text-xs sm:text-sm mt-0.5 sm:mt-1">Download course materials and supplementary files</p>
                </div>
                <div className="bg-white px-3 py-1.5 rounded-full border border-gray-100 text-xs font-medium text-[#111111] self-start sm:self-auto shrink-0 shadow-xs">
                    {resources.length} Files Available
                </div>
            </div>

            {/* Resource Cards */}
            <div className="flex flex-col gap-2.5 sm:gap-3 w-full">
                {resources.map((resource) => (
                    <div
                        key={resource.id}
                        className="group flex items-center justify-between p-3 sm:p-3.5 bg-white rounded-xl sm:rounded-2xl border border-gray-100 transition-all duration-200 hover:shadow-sm gap-2.5 sm:gap-3 w-full min-w-0"
                    >
                        <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0 flex-1">
                            <div className="w-9 h-9 sm:w-11 sm:h-11 shrink-0 flex items-center justify-center rounded-lg sm:rounded-xl bg-[#F8F9FA] group-hover:bg-[#4CAF50]/10 transition-colors">
                                <resource.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#111111] group-hover:text-[#4CAF50] transition-colors" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <h4 className="text-xs sm:text-sm font-semibold text-[#111111] group-hover:text-[#4CAF50] transition-colors truncate block">
                                    {resource.name}
                                </h4>
                                <div className="flex items-center gap-1.5 mt-0.5 text-[11px] sm:text-xs text-[#6B7280]">
                                    <span className="font-medium">{resource.type}</span>
                                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                    <span className="font-medium">{resource.size}</span>
                                </div>
                            </div>
                        </div>

                        <button
                            className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-[#F8F9FA] text-[#111111] hover:bg-[#4CAF50] hover:text-white transition-all duration-200 flex items-center gap-1.5 font-medium text-xs shrink-0 cursor-pointer"
                            title="Download File"
                            aria-label={`Download ${resource.name}`}
                        >
                            <Download className="w-4 h-4" />
                            <span className="hidden md:inline">Download</span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
