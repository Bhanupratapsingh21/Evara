import React from 'react';

// Sample data for the experience cards
const experiences = [
    {
        id: 1,
        img: 'https://res.cloudinary.com/dipywb0lr/image/upload/e_background_removal/f_png/v1746440859/Rectangle_2_2_cdhpil.png',
        title: 'Profile Assumptions',
        description: 'Let others share their impressions and assumptions about you through chat feedback.'
    },
    {
        id: 2,
        img: 'https://res.cloudinary.com/dipywb0lr/image/upload/v1746441810/Rectangle_2_4_-removebg-preview_kuvsyq.png',
        title: 'Self Discovery Journal',
        description: 'Document your true self through front-camera moments and personal reflections.'
    },
    {
        id: 3,
        img: 'https://res.cloudinary.com/dipywb0lr/image/upload/v1746441808/Rectangle_2-removebg-preview_p6h3wu.png',
        title: 'Anonymous Video Chat',
        description: 'Connect with random users through secure video calls while maintaining complete anonymity.'
    },
    {
        id: 4,
        img: 'https://res.cloudinary.com/dipywb0lr/image/upload/e_background_removal/f_png/v1746440860/Rectangle_2_1_q3vdzo.png',
        title: 'Private Messaging',
        description: 'Direct message your connections while keeping your identity protected until you choose to reveal it.'
    }
];

export default function ExperienceSection() {
    return (
        <section className="relative py-16">
            {/* Background Glass Blur + Gradient */}
            <div className="absolute h-[100%] inset-0 bg-gradient-to-b from-[#ffffff] via-[#C18496] to-[#ffffff] backdrop-blur-xl"></div>

            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-900 mb-4">
                It’s a Whole Experience
                </h2>

                {/* Description */}
                <p className="text-md md:text-xl text-center text-[#616161] font-semibold max-w-3xl mx-auto mb-8 md:mb-12">
                Think it’s just random? Think again — it’s real, raw, and way more fun.
                </p>

                <div className="grid md:grid-cols-2 gird-cols-1 md:grid-rows-2 grid-rows-4 gap-6">
                    {experiences.map(exp => (
                        <div
                            key={exp.id}
                            className="bg-white border-black border bg-opacity-70 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg flex flex-col"
                        >
                            {/* Image with 10:5 aspect ratio */}
                            <div className="w-full ">
                                <img
                                    src={exp.img}
                                    alt={exp.title}
                                    className="object-cover w-full h-full"
                                />
                            </div>

                            <div className="p-4 flex-1 flex flex-col">
                                <h3 className="text-xl font-semibold text-gray-800">{exp.title}</h3>
                                <p className="mt-2 text-gray-600 flex-1">{exp.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
