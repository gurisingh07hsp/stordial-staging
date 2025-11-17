'use client'
import React, {useState, useEffect} from 'react'
import axios from 'axios';

interface job {
  _id: string;
  title: string;
  description: string;
  type: string;
  status: string;
  createdAt: Date;
}
const CareerPage = () => {
    const [showModal, setShowModal] = useState(false)
  const [selectedJob, setSelectedJob] = useState<job | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  // const [showResumeModal, setShowResumeModal] = useState(false)
  // const [uploadSuccess, setUploadSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    coverletter: ''
  })

  const [jobs, setJobs] = useState<job[]>([]);


    const getjobs = async() => {
    try{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/jobs/`);
        if(response.status === 200){
            setJobs(response.data.jobs);
            console.log(response.data);
        }
    }catch(error){
        console.log(error);
    }
  }

  useEffect(()=>{
    getjobs();
  },[])

  const handleApplyClick = (job: job) => {
    setSelectedJob(job)
    setShowModal(true)
    setShowSuccess(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async() => {
    // Simulate form submission
    if (formData.name && formData.email && formData.phone && formData.experience) {
      try{
        const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/jobs/apply/${selectedJob?._id}`, formData);
        if(response.status === 200){
          setShowSuccess(true)
          setTimeout(() => {
            setShowModal(false)
            setShowSuccess(false)
            setFormData({
              name: '',
              email: '',
              phone: '',
              experience: '',
              coverletter: ''
            })
          }, 2000)
        }
      }catch(error){
        console.log(error);
      }
      // setShowSuccess(true)
      // setTimeout(() => {
      //   setShowModal(false)
      //   setShowSuccess(false)
      //   setFormData({
      //     name: '',
      //     email: '',
      //     phone: '',
      //     experience: '',
      //     coverLetter: ''
      //   })
      // }, 2000)
    }
  }

  // const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0]
  //   if (file) {
  //     // Simulate file upload
  //     setUploadSuccess(true)
  //     setTimeout(() => {
  //       setShowResumeModal(false)
  //       setUploadSuccess(false)
  //     }, 2000)
  //   }
  // }

  const closeModal = () => {
    setShowModal(false)
    setShowSuccess(false)
    setFormData({
      name: '',
      email: '',
      phone: '',
      experience: '',
      coverletter: ''
    })
  }

  // const closeResumeModal = () => {
  //   setShowResumeModal(false)
  //   setUploadSuccess(false)
  // }
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
              <p className="text-sm text-gray-500 mb-2">Remote</p>
              <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 text-sm rounded-full mb-4">
                {job.type}
              </span>
              <span className={`ms-6 inline-block ${job.status == 'Open' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'} px-3 py-1 text-sm rounded-full mb-4`}>
                {job.status}
              </span>
              <p className="text-gray-600 mb-4">{job.description}</p>
              <button 
                onClick={() => handleApplyClick(job)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Call To Action */}
      {/* <section className="bg-gray-900 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Didn&apos;t find your role?</h2>
        <p className="text-lg mb-6">
          We&apos;re always looking for passionate people. Send us your resume and
          we&apos;ll get in touch when a role opens up.
        </p>
        <button 
          onClick={() => setShowResumeModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
        >
          Send Resume
        </button>
      </section> */}

      {/* Application Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Apply for {selectedJob?.title}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              {!showSuccess ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Years of Experience *
                    </label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select experience</option>
                      <option value="0-1">0-1 years</option>
                      <option value="1-3">1-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5+">5+ years</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cover Letter
                    </label>
                    <textarea
                      name="coverLetter"
                      value={formData.coverletter}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Tell us why you're perfect for this role..."
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Submit Application
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Application Submitted Successfully!</h3>
                  <p className="text-gray-600">Thank you for your interest. We&apos;ll review your application and get back to you soon.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Resume Upload Modal */}
      {/* {showResumeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Upload Resume</h3>
                <button
                  onClick={closeResumeModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              {!uploadSuccess ? (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    <p className="text-gray-600 mb-2">Choose your resume file</p>
                    <p className="text-sm text-gray-500">PDF, DOC, or DOCX (Max 5MB)</p>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label
                      htmlFor="resume-upload"
                      className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition"
                    >
                      Browse Files
                    </label>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Resume Uploaded Successfully!</h3>
                  <p className="text-gray-600">We&apos;ve received your resume and will contact you when suitable positions are available.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )} */}
    </div>
  )
}

export default CareerPage
