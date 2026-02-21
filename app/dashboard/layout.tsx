import DashboardLayout from "@/components/layout/DashboardLayout";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section>
            <DashboardLayout>
                {children}
            </DashboardLayout>
        </section>
    );
}