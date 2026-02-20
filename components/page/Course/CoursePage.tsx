"use client"

import React from 'react'
import { motion } from 'framer-motion'
import CourseCard from './CourseCard'

const courses = [
    {
        id: "1",
        title: "Mastering Special Needs Education",
        description: "Practical classroom strategies for inclusive & effective teaching.",
        category: "Professional Development",
        rating: 4.8,
        reviews: 24,
        price: 25,
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: "2",
        title: "Teaching Students with Special Needs",
        description: "Build confidence with structured, real-world teaching methods.",
        category: "Teacher Training",
        rating: 4.8,
        reviews: 18,
        price: 25,
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: "3",
        title: "Supporting Every Learner",
        description: "Empower your classroom with adaptive & inclusive approaches.",
        category: "Educator Essentials",
        rating: 4.8,
        reviews: 32,
        price: 25,
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: "4",
        title: "Inclusive Classroom Strategies",
        description: "Create supportive environments that help all students succeed.",
        category: "Professional Skills",
        rating: 4.8,
        reviews: 15,
        price: 25,
        image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: "5",
        title: "Behavior & Learning Support",
        description: "Learn how to effectively guide diverse learning needs.",
        category: "Advanced Teaching",
        rating: 4.8,
        reviews: 21,
        price: 25,
        image: "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: "6",
        title: "Special Needs Teaching Foundations",
        description: "Develop core skills for confident & inclusive teaching.",
        category: "Certification Program",
        rating: 4.8,
        reviews: 27,
        price: 25,
        image: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=800",
    },
]

const CoursePage = () => {
    return (
        <section className="py-20 px-4 md:py-32 bg-white">
            <div className="container mx-auto">
                {/* Header Section */}
                <div className="text-center space-y-4 mb-16 md:mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-[2.5rem] font-black text-foreground tracking-tight"
                    >
                        Empower Your Teaching Skills
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg md:text-xl text-muted-foreground/80 mx-auto"
                    >
                        Explore courses designed for educators supporting special needs students.
                    </motion.p>
                </div>

                {/* Courses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {courses.map((course, index) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <CourseCard course={course} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default CoursePage