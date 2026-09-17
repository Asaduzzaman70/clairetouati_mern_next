import { Product } from "@/components/shared/ProductCard";

// Real product image assets from the Turrim project
import imageBg from "@/assets/image_bg.png";
import abImg1 from "@/assets/ab_img_1.png";
import imageBg2 from "@/assets/image_bg_2.png";
import abImg2 from "@/assets/ab_img_2.png";
import abImg3 from "@/assets/ab_img_3.png";
import imageBg3 from "@/assets/image_bg_3.png";
import imageBg4 from "@/assets/image_bg_4.png";

export interface ProductCategoryOption {
    id: string;
    label: string;
}

export const PRODUCT_CATEGORIES: ProductCategoryOption[] = [
    { id: "all", label: "All Creations" },
    { id: "wooden-sets", label: "Wooden Game Sets" },
    { id: "abc-kits", label: "Architectural ABC" },
    { id: "sensory", label: "Sensory & Therapy" },
    { id: "classroom", label: "Classroom & Bundles" },
];

export const PRODUCTS_DATA: Product[] = [
    {
        id: "turrim-original-discovery",
        title: "Turrim Original Discovery Set",
        subtitle: "The tactile foundation for spatial intelligence",
        description:
            "A modular wooden game combining geometric solids and 3D letters. Designed to awaken curiosity, spatial equilibrium, and tactile joy through free-form stacking.",
        category: "Wooden Game Sets",
        price: 89,
        originalPrice: 105,
        rating: 4.9,
        reviewsCount: 124,
        badge: "Best Seller",
        badgeVariant: "mint",
        image: imageBg,
        features: ["Solid Beechwood", "Montessori Certified", "Ages 3-99"],
        inStock: true,
        href: "/playroom?id=turrim-original-discovery",
    },
    {
        id: "abecedaire-architecture-box",
        title: "L'Abécédaire de l'Architecture",
        subtitle: "Complete pedagogical boxed edition",
        description:
            "The iconic ABCs of architecture coffret containing 29 tactile letter-stamps and 36 game cards for intuitive shape-to-word recognition and drawing.",
        category: "Architectural ABC",
        price: 115,
        originalPrice: 130,
        rating: 5.0,
        reviewsCount: 88,
        badge: "Invented by Claire",
        badgeVariant: "yellow",
        image: abImg1,
        features: ["29 Letter Stamps", "36 Activity Cards", "Pedagogical Guide"],
        inStock: true,
        href: "/playroom?id=abecedaire-architecture-box",
    },
    {
        id: "sensory-motor-therapy-pack",
        title: "Sensory & Motor Learning Pack",
        subtitle: "Created for psychomotor and special-needs therapy",
        description:
            "Specially calibrated weights and textures tailored for psychomotor rehabilitation, non-verbal expression, tactile concentration, and hand-eye coordination.",
        category: "Sensory & Therapy",
        price: 145,
        rating: 4.9,
        reviewsCount: 62,
        badge: "Therapy Certified",
        badgeVariant: "coral",
        image: imageBg2,
        features: ["Ergonomic Grip", "Sensory Spheres", "Used by Therapists"],
        inStock: true,
        href: "/playroom?id=sensory-motor-therapy-pack",
    },
    {
        id: "alphabet-26-sculptures",
        title: "Tactile Alphabet 26-Letter Set",
        subtitle: "The complete three-dimensional alphabet",
        description:
            "Twenty-six architectural wooden alphabet sculptures. Each letter is a stable geometric volume ready to stand, nest, or stack in limitless combinations.",
        category: "Architectural ABC",
        price: 165,
        originalPrice: 190,
        rating: 4.8,
        reviewsCount: 45,
        badge: "Handcrafted",
        badgeVariant: "purple",
        image: abImg2,
        features: ["26 Full 3D Letters", "Natural Pigments", "Display Ready"],
        inStock: true,
        href: "/playroom?id=alphabet-26-sculptures",
    },
    {
        id: "structural-builder-kit",
        title: "Architectural Stacking & Balance Kit",
        subtitle: "Exploration of equilibrium and gravity",
        description:
            "An advanced set of interlocking geometric shapes, bridges, and curves that transform simple letter forms into soaring architectural monuments.",
        category: "Wooden Game Sets",
        price: 98,
        rating: 4.9,
        reviewsCount: 73,
        badge: "Creative Play",
        badgeVariant: "blue",
        image: abImg3,
        features: ["Gravity Balancing", "Interlocking Slots", "Creative Guide"],
        inStock: true,
        href: "/playroom?id=structural-builder-kit",
    },
    {
        id: "bonjour-community-edition",
        title: "Turrim Classroom & Family Bundle",
        subtitle: "Full-scale kit for schools and sensory labs",
        description:
            "Comprehensive classroom kit featuring multi-colored letter sets, balancing domes, and collaborative educational challenges for group learning.",
        category: "Classroom & Bundles",
        price: 240,
        originalPrice: 280,
        rating: 5.0,
        reviewsCount: 39,
        badge: "Educator Pick",
        badgeVariant: "green",
        image: imageBg3,
        features: ["Multi-Student Ready", "Storage Box Included", "Curriculum Access"],
        inStock: true,
        href: "/playroom?id=bonjour-community-edition",
    },
    {
        id: "phrase-builder-edition",
        title: "Word-Building & Sentence Creation Set",
        subtitle: "Interactive spatial typography for young writers",
        description:
            "Enables children to construct words, syntax, and spatial sentences in 3D. Overcomes dysgraphia and reading resistance with tactile letter manipulation.",
        category: "Classroom & Bundles",
        price: 185,
        originalPrice: 210,
        rating: 4.9,
        reviewsCount: 51,
        badge: "Literacy Booster",
        badgeVariant: "yellow",
        image: imageBg4,
        features: ["Phonetic Markers", "Sentence Bridges", "Tactile Spacing"],
        inStock: true,
        href: "/playroom?id=phrase-builder-edition",
    },
    {
        id: "pocket-traveler-discovery",
        title: "Turrim Pocket Traveler Kit",
        subtitle: "Compact on-the-go sensory play",
        description:
            "A travel-ready pocket edition containing essential primary geometric letter solids in a durable organic cotton pouch for travel and quiet moments.",
        category: "Wooden Game Sets",
        price: 49,
        rating: 4.7,
        reviewsCount: 94,
        badge: "Travel Ready",
        badgeVariant: "mint",
        image: abImg1,
        features: ["Pocket-Sized", "Cotton Drawstring Bag", "Ages 3+"],
        inStock: true,
        href: "/playroom?id=pocket-traveler-discovery",
    },
];
