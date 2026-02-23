import { FileText, File, Download } from "lucide-react";

const resources = [
    { id: 1, name: "Inclusive Teaching Strategies.pdf", type: "PDF", size: "2.4 MB", icon: FileText },
    { id: 2, name: "Behavior Management Guideline.pdf", type: "PDF", size: "1.8 MB", icon: FileText },
    { id: 3, name: "Student Engagement Worksheet.xlsx", type: "Excel", size: "1.2 MB", icon: File },
    { id: 4, name: "Course Media Assets.zip", type: "Zip", size: "45.0 MB", icon: File },
];

export default function ResourceTab() {
    return (
        <div className="bg-[#F4F4F4] p-5 rounded-[20px] shadow-sm border border-gray-100/50">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-[#111111] tracking-tight">Resources</h2>
                    <p className="text-[#6B7280] text-sm mt-1">Download course materials and supplementary files</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-2xl border border-gray-100 text-sm font-medium text-[#111111]">
                    {resources.length} Files Available
                </div>
            </div>

            <div className="grid gap-4">
                {resources.map((resource) => (
                    <div
                        key={resource.id}
                        className="group flex items-center justify-between p-4 bg-white rounded-3xl border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-[#4CAF50]/30 hover:translate-y-[-2px]"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#F8F9FA] group-hover:bg-[#4CAF50]/10 transition-colors">
                                <resource.icon className="w-6 h-6 text-[#111111] group-hover:text-[#4CAF50] transition-colors" />
                            </div>
                            <div>
                                <h4 className="text-[15px] font-semibold text-[#111111] group-hover:text-[#4CAF50] transition-colors">
                                    {resource.name}
                                </h4>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-xs font-medium text-[#6B7280]">{resource.type}</span>
                                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                    <span className="text-xs font-medium text-[#6B7280]">{resource.size}</span>
                                </div>
                            </div>
                        </div>

                        <button
                            className="p-3 rounded-2xl bg-[#F8F9FA] text-[#111111] hover:bg-[#4CAF50] hover:text-white transition-all duration-300 flex items-center gap-2 font-medium text-sm group/btn"
                            title="Download File"
                        >
                            <Download className="w-5 h-5 group-hover/btn:animate-bounce" />
                            <span className="hidden md:block">Download</span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
