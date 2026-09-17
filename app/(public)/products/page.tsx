import { Metadata } from "next";
import ProductsPage from "@/components/page/Products/ProductsPage";
import { TurrimCTA } from "@/components/shared/TurrimCTA";

export const metadata: Metadata = {
    title: "Products & Creations - Turrim | Clairetouati",
    description:
        "Explore the complete handcrafted collection of Turrim 3D educational toys, Montessori wooden alphabet kits, and psychomotor sensory learning tools.",
};

export default function Products() {
    return (
        <div className="flex flex-col bg-zinc-50 font-sans dark:bg-black">
            <ProductsPage />
            <TurrimCTA content="Get Your Turrim Set" />
        </div>
    );
}
