import React, { useState, useEffect } from 'react'
import { Search, Filter, Plus, Edit2, Eye, Trash2, Users, Calendar, Building, MapPin } from 'lucide-react'
import axios from 'axios';

interface Job {
    title: string;
    description: string;
    role: string;
    type: string;
    vacancies: string;
    status: string;
}
interface SelectedJob {
    _id: string;
    title: string;
    description: string;
    role: string;
    type: string;
    vacancies: string;
    status: string;
    enteries: {
        name: string;
        email: string;
        phone: string;
        experience: string;
        coverletter: string;
        appliedAt: Date;
    }[];
}

interface Jobs {
    _id: string;
    title: string;
    description: string;
    role: string;
    type: string;
    vacancies: string;
    status: string;
    enteries: {
        name: string;
        email: string;
        phone: string;
        experience: string;
        coverletter: string;
        appliedAt: Date;
    }[];
    createdAt: Date;
}

const CareerManagement = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showApplicationsModal, setShowApplicationsModal] = useState(false)
  const [selectedJob, setSelectedJob] = useState<SelectedJob | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const [jobForm, setJobForm] = useState<Job>({
    title: '',
    description: '',
    role: '',
    type: '',
    vacancies: '',
    status: 'Open'
  })

  const [jobs, setJobs] = useState<Jobs[]>([]);

  const applications = jobs.reduce((acc, job) => acc + job.enteries.length, 0); 

  const getjobs = async() => {
    try{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/jobs/`);
        if(response.status === 200){
            setJobs(response.data.jobs);
        }
    }catch(error){
        console.log(error);
    }
  }

  useEffect(()=>{
    getjobs();
  },[])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setJobForm({
      ...jobForm,
      [e.target.name]: e.target.value
    })
  }

  const handleCreateJob = async() => {
    if (jobForm.title && jobForm.description && jobForm.role && jobForm.vacancies) {
        try{
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/jobs/new`, jobForm, {withCredentials: true});
            if(response.status === 200){
                setJobForm({
                    title: '',
                    description: '',
                    role: '',
                    type: '',
                    vacancies: '',
                    status: 'Open'
                })
                setShowCreateModal(false)
                setSuccessMessage('Job created successfully!')
                setShowSuccess(true)
                setTimeout(() => setShowSuccess(false), 3000)
                getjobs();
            }
            else{
                console.log("error");
            }
        }catch(error){
            console.log(error);
        }
    }
  }

  const handleEditJob = async() => {
    if (selectedJob && jobForm.title && jobForm.description && jobForm.role && jobForm.vacancies) {

        try{
            const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/jobs/${selectedJob._id}`, jobForm, {withCredentials: true});
            if(response.status  === 200){
                setShowEditModal(false)
                setSelectedJob(null)
                setSuccessMessage('Job updated successfully!')
                setShowSuccess(true)
                setTimeout(() => setShowSuccess(false), 3000)
                getjobs();
            }
        }catch(error){
            console.log(error);
        }
    }
  }

  const handleDeleteJob = async(jobId : string) => {
    // setJobs(jobs.filter(job => job._id !== jobId))
    try{
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/jobs/${jobId}`, {withCredentials: true});
        if(response.status === 200){
            setSuccessMessage('Job deleted successfully!')
            setShowSuccess(true)
            setTimeout(() => setShowSuccess(false), 3000);
            getjobs();
        }
    }catch(error){
        console.log(error);
    }
  }

  const openEditModal = (job: SelectedJob) => {
    setSelectedJob(job)
    setJobForm({
      title: job.title,
      description: job.description,
      role: job.role,
      type: job.type,
      vacancies: job.vacancies.toString(),
      status: job.status
    })
    setShowEditModal(true)
  }

  const openApplicationsModal = (job : SelectedJob) => {
    setSelectedJob(job)
    setShowApplicationsModal(true)
  }

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.role.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'All' || job.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const jobApplications = selectedJob ? selectedJob.enteries : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {successMessage}
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex lg:flex-row flex-col lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Career Management</h1>
            <p className="text-gray-600 mt-1">Create and manage job postings and applications</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
            >
              <Plus size={18} />
              Create Job
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Filters */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Status</option>
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>
        </div>
            {/* Job Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Building className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Total Jobs</p>
                    <p className="text-2xl font-bold">{jobs.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Users className="text-green-600" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Open Positions</p>
                    <p className="text-2xl font-bold">{jobs.filter(j => j.status === 'Open').length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-100 p-2 rounded-lg">
                    <Calendar className="text-yellow-600" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Total Applications</p>
                    <p className="text-2xl font-bold">{applications}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <MapPin className="text-purple-600" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Vacancies</p>
                    <p className="text-2xl font-bold">{jobs.reduce((sum, job) => sum + Number(job.vacancies), 0)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Jobs Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border border-gray-200">
                    <tr>
                      <th className="text-left p-4 font-semibold text-gray-900">Job Title</th>
                      <th className="text-left p-4 font-semibold text-gray-900">Role</th>
                      <th className="text-left p-4 font-semibold text-gray-900">Vacancies</th>
                      <th className="text-left p-4 font-semibold text-gray-900">Status</th>
                      <th className="text-left p-4 font-semibold text-gray-900">Applications</th>
                      <th className="text-left p-4 font-semibold text-gray-900">Date Posted</th>
                      <th className="text-left p-4 font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredJobs.map((job) => (
                      <tr key={job._id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="p-4">
                          <div>
                            <div className="font-semibold text-gray-900">{job.title}</div>
                            <div className="text-sm text-gray-600 truncate max-w-xs">{job.description}</div>
                          </div>
                        </td>
                        <td className="p-4 text-gray-700">{job.role}</td>
                        <td className="p-4 text-center text-gray-700">{job.vacancies}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            job.status === 'Open' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {job.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => openApplicationsModal(job)}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                          >
                            {job.enteries.length} applicants
                          </button>
                        </td>
                        <td className="p-4 text-center text-gray-600">{new Date(job.createdAt).toLocaleDateString()}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openEditModal(job)}
                              className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => openApplicationsModal(job)}
                              className="p-1 text-green-600 hover:bg-green-100 rounded"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteJob(job._id)}
                              className="p-1 text-red-600 hover:bg-red-100 rounded"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t border-gray-200 text-sm text-gray-600">
                Showing 1 to {filteredJobs.length} of {jobs.length} results
              </div>
            </div>
      </div>

      {/* Create Job Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Create New Job</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={jobForm.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Frontend Developer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <textarea
                    name="description"
                    value={jobForm.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Job description and requirements"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
                    <input
                      type="text"
                      name="role"
                      value={jobForm.role}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. Developer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                    <select
                      name="type"
                      value={jobForm.type}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select type</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vacancies *</label>
                    <input
                      type="text"
                      name="vacancies"
                      value={jobForm.vacancies}
                      onChange={handleInputChange}
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Number of positions"
                    />
                  </div>
                  <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    name="status"
                    value={jobForm.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateJob}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Create Job
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Job Modal */}
      {showEditModal && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Edit Job: {selectedJob.title}</h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={jobForm.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <textarea
                    name="description"
                    value={jobForm.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
                    <input
                      type="text"
                      name="role"
                      value={jobForm.role}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={jobForm.location}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div> */}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                    <select
                      name="type"
                      value={jobForm.type}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select type</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vacancies *</label>
                    <input
                      type="number"
                      name="vacancies"
                      value={jobForm.vacancies}
                      onChange={handleInputChange}
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    name="status"
                    value={jobForm.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEditJob}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Update Job
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Applications Modal */}
      {showApplicationsModal && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Applications for {selectedJob.title}
                </h3>
                <button
                  onClick={() => setShowApplicationsModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left p-3 font-semibold text-gray-900">Candidate</th>
                      <th className="text-left p-3 font-semibold text-gray-900">Experience</th>
                      <th className="text-left p-3 font-semibold text-gray-900">Applied Date</th>
                      {/* <th className="text-left p-3 font-semibold text-gray-900">Status</th> */}
                      <th className="text-left p-3 font-semibold text-gray-900">Cover Letter</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobApplications.map((app, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="p-3">
                          <div>
                            <div className="font-semibold text-gray-900">{app.name}</div>
                            <div className="text-sm text-gray-600">{app.email}</div>
                            <div className="text-sm text-gray-600">{app.phone}</div>
                          </div>
                        </td>
                        <td className="p-3 text-gray-700">{app.experience} years</td>
                        <td className="p-3 text-gray-600">{new Date(app.appliedAt).toLocaleDateString()}</td>
                        <td className="p-3">
                          <p>{app.coverletter}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {jobApplications.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No applications found for this job.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CareerManagement
