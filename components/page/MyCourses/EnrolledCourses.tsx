"use client";

import { motion } from "framer-motion";
import { CourseCard, type Course } from "../../shared/CourseCard";

const enrolledCourses: Course[] = [
    {
        id: 1,
        title: "Mastering Special Needs Education",
        category: "Teacher training",
        rating: 4.8,
        reviews: 24,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
        progress: 70,
        duration: "10 weeks",
        lessons: "24 lessons",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Mastering Special Needs Education",
        category: "Teacher training",
        rating: 4.8,
        reviews: 24,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
        progress: 70,
        duration: "10 weeks",
        lessons: "24 lessons",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Mastering Special Needs Education",
        category: "Teacher training",
        rating: 4.8,
        reviews: 24,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
        progress: 70,
        duration: "10 weeks",
        lessons: "24 lessons",
        image: "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 4,
        title: "Mastering Special Needs Education",
        category: "Teacher training",
        rating: 4.8,
        reviews: 24,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
        progress: 70,
        duration: "10 weeks",
        lessons: "24 lessons",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 5,
        title: "Mastering Special Needs Education",
        category: "Teacher training",
        rating: 4.8,
        reviews: 24,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
        progress: 70,
        duration: "10 weeks",
        lessons: "24 lessons",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 6,
        title: "Mastering Special Needs Education",
        category: "Teacher training",
        rating: 4.8,
        reviews: 24,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
        progress: 70,
        duration: "10 weeks",
        lessons: "24 lessons",
        image: "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=1000&auto=format&fit=crop"
    }
];

export default function EnrolledCourses() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {enrolledCourses.map((course, index) => (
                <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                    <CourseCard course={course} />
                </motion.div>
            ))}
        </div>
    );
}
