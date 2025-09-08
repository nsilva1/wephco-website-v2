import React from 'react'
import { Target, Heart } from 'lucide-react'

const VisionAndMission = () => {
  return (
    <div>
        <section className="bg-gray-100 dark:bg-black py-12 font-outfit">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <div className="flex items-center mb-4">
                        <Target className="text-blue-500 w-6 h-6 mr-2" />
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Our Vision</h2>
                    </div>
                    <p className="text-gray-600">
                        We are committed to enriching our clients by delivering exceptional real estate services while keeping them at the heart of everything we do.
                    </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <div className="flex items-center mb-4">
                        <Heart className="text-red-500 w-6 h-6 mr-2" />
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Our Mission</h2>
                    </div>
                    <p className="text-gray-600">
                        To accelerate real estate transition and transparency globally to a sustainable possibility.
                    </p>
                </div>
            </div>
        </div>
    </section>
    </div>
  )
}

export { VisionAndMission }