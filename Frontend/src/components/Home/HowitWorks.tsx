import React from 'react';

interface Data {
    icon: React.ReactNode
    title: string
    description: string
}
interface Propsofsection {
    title: string,
    description: string,
    Data: Data[]
}
const HowItWorksSection = ({ title, description, Data }: Propsofsection) => {

    return (
        <section className="bg-white py-12 md:py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Title */}
                <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-900 mb-4">
                    {title}
                </h2>

                {/* Description */}
                <p className="text-md md:text-lg text-center text-[#616161] font-semibold max-w-3xl mx-auto mb-8 md:mb-12">
                    {description}
                </p>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                    {Data.map((card, index) => (
                        <div
                            key={index}
                            className="bg-white p-4 md:p-5 rounded-xl shadow-md border border-[#BABABA] hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="flex  items-start gap-4">
                                <div className="flex-shrink-0 p-2 rounded-full bg-[#B30738]">
                                    {card.icon}
                                </div>
                                <div className='md:w-[70%]'>
                                    <h3 className="text-lg md:text-xl font-semibold text-left text-gray-900 mb-2">
                                        {card.title}
                                    </h3>
                                    <p className="text-sm md:text-base text-gray-600 text-left">
                                        {card.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;