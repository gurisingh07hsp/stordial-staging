import React from 'react'

const Career = () => {
      const jobs = [
    {
      title: "Frontend Developer",
      location: "Remote",
      type: "Full-time",
      description:
        "Build responsive and modern web applications using React, Next.js, and Tailwind CSS.",
    },
    {
      title: "Backend Engineer",
      location: "Remote",
      type: "Full-time",
      description:
        "Design scalable APIs and work with Node.js, Express, and MongoDB.",
    },
    {
      title: "UI/UX Designer",
      location: "Remote",
      type: "Contract",
      description:
        "Create beautiful, user-friendly interfaces and contribute to product design.",
    },
  ];
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Join Our Team 🚀
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Be part of a fast-growing company where your ideas matter. Explore
            open positions and build your career with us.
          </p>
        </div>
      </section>

      {/* Job Openings */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-10">
          Current Openings
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {job.title}
              </h3>
              <p className="text-sm text-gray-500 mb-2">{job.location}</p>
              <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 text-sm rounded-full mb-4">
                {job.type}
              </span>
              <p className="text-gray-600 mb-4">{job.description}</p>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Call To Action */}
      <section className="bg-gray-900 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Didn’t find your role?</h2>
        <p className="text-lg mb-6">
          We’re always looking for passionate people. Send us your resume and
          we’ll get in touch when a role opens up.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl">
          Send Resume
        </button>
      </section>
    </div>
  )
}

export default Career
