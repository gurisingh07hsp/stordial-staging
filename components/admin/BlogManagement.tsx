'use client';
import React, { useEffect, useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar,
  Grid3X3,
  List
} from 'lucide-react';
import axios from 'axios';
import { Toaster } from 'react-hot-toast'
import toast from 'react-hot-toast'
import "quill/dist/quill.snow.css";
import type { ReactQuillProps } from "react-quill";


interface BlogPost {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  seotitle: string;
  metadescription: string;
  status: string;
  user: string;
  image: string;
}

interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  status: string;
  seotitle: string;
  metadescription: string;
  user: string;
  image: string;
  createdAt: Date;
}


export default function BlogManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [editingPost, setEditingPost] = useState<BlogPost>({
  title: "",
  excerpt: "",
  content: "",
  image: '',
  category: "Business Trends",
  status: "Draft",
  seotitle: "",
  metadescription: '',
  user: 'Stordial Team'
});
  const [id,setId] = useState('');
  const [posts,setPosts] = useState<Blog[]>([]);
  const [Quill, setQuill] = useState<React.ComponentType<ReactQuillProps> | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [isRun, setIsRun] = useState(false);


  const categories = ['All', 'Business Trends', 'SEO', 'Customer Service', 'Marketing', 'Technology'];
  const statuses = ['All', 'Published', 'Draft', 'Archived'];

    useEffect(() => {
    import("react-quill").then((mod) => {
      setQuill(() => mod.default);
    });
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || post.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });


  const getposts = async() => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/blogs/`);
      if(response.status === 200){
        setPosts(response.data.blogs);
      }
    } catch(error){
      console.error(error);
    }
  }
  useEffect(()=> {
    getposts();
  },[]);

  const addBlog = async() => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/blogs/new`, editingPost, {withCredentials:true});
      if(response.status === 200){
        getposts();
        setEditingPost({
          title: "",
          excerpt: "",
          content: "",
          image: '',
          category: "Business Trends",
          status: "Draft",
          seotitle: '',
          metadescription: '',
          user: 'Stordial Team'
        });
        setLoading(false);
        setFile(null);
        toast.success("Blog Updated Successfully");
        setShowAddModal(false);
      }
    } catch(error) {
      console.error(error);
    }
  }


  const editBlog = async() => {
    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/blogs/${id}`, editingPost, {withCredentials:true});
      if(response.status === 200){
        setId('');
        setShowEditModal(false);
        getposts();
        setFile(null);
        setLoading(false);
        setIsRun(false);
        toast.success("Blog Updated Successfully");
      }
      else{
        toast.error(response.data.message);
      }
    } catch(error){
      console.error(error);
    }
  }

  useEffect(() => {
  if (editingPost.image !== '' && isRun) {
    if (!showEditModal) {
      addBlog();
    } else {
      editBlog();
    }
  }
}, [editingPost.image]);

    const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("files", file);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/uploadimages`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      console.log("Uploaded:", res.data);
      setIsRun(true);
      setEditingPost(prev => ({ ...prev, image: res.data.files[0].url}));

    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if(showEditModal){
      if(file){
        handleUpload();
      }
      else{
        editBlog();
      }
    }
    else{
      if(file){
        handleUpload();
      }
      else{
        addBlog();
      }
    }
  }

    const handleDelete = async(post: Blog) => {
      try {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/blogs/${post._id}`, {withCredentials:true});
        if(response.status === 200){
          toast.success(response.data.message);
          getposts();
        }
        else{
          toast.error(response.data.message);
        }
      } catch(error){
        console.error(error);
      }
  }


  const handleSelectAll = () => {
    if (selectedPosts.length === filteredPosts.length) {
      setSelectedPosts([]);
    } else {
      setSelectedPosts(filteredPosts.map(p => p.title));
    }
  };

  const handleSelectPost = (id: string) => {
    setSelectedPosts(prev => 
      prev.includes(id) 
        ? prev.filter(p => p !== id)
        : [...prev, id]
    );
  };

  const handleDeleteSelected = async() => {
    for(let i=0; i<selectedPosts.length; i++)
    {
      try {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/blogs/${selectedPosts[i]}`, {withCredentials:true});
        if(response.status === 200){
          if(i == selectedPosts.length-1){
            toast.success(`${i+1} Blogs Deleted Successfully` || response.data.message);
            getposts();
          }
        }
        else{
          toast.error(response.data.message);
        }
      } catch(error){
        console.error(error);
      }
    }
    setSelectedPosts([]);
  };

  const handleEditPost = (post: Blog) => {
    setEditingPost(post);
    setId(post._id);
    setShowEditModal(true);
  };


  useEffect(() => {
    if(!showAddModal && !showEditModal){
    setEditingPost({
      title: "",
      excerpt: "",
      content: "",
      image: '',
      category: "Business Trends",
      status: "Draft",
      seotitle: '',
      metadescription: '',
      user: 'Stordial Team'
    });
    setFile(null);
    setIsRun(false);
    setLoading(false);
  }
  }, [showAddModal, showEditModal]);


  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return 'bg-green-100 text-green-800';
      case 'Draft': return 'bg-yellow-100 text-yellow-800';
      case 'Archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleReset = () => {
     setEditingPost({
      title: "",
      excerpt: "",
      content: "",
      image: '',
      category: "Business Trends",
      status: "Draft",
      seotitle: '',
      metadescription: '',
      user: 'Stordial Team'
    });
    setFile(null);
  }


  return (
    <div className="space-y-3 sm:space-y-4">
      <Toaster
              position="top-right"
              reverseOrder={false}
              toastOptions={{
                duration: 4000, // auto-close after 4s
                style: {
                  borderRadius: '8px',
                  background: '#333',
                  color: '#fff',
                },
                success: {
                  style: {
                    background: 'green',
                  },
                },
                error: {
                  style: {
                    background: 'red',
                  },
                },
              }}
            />
      {/* Header */}
      <div className="flex flex-col w-full sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Blog Management</h1>
          <p className="text-sm sm:text-base text-gray-600">Create and manage blog posts and content</p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              title="Grid View"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
            <span className="hidden sm:inline">Create Post</span>
            <span className="sm:hidden">Create</span>
          </button>
        </div>
      </div>


      <div className={`${(showAddModal || showEditModal) ? 'block' : 'hidden'} grid lg:grid-cols-2 w-full border rounded-xl`}>
        <div className='bg-white rounded-s-xl w-[95%] mx-auto lg:mx-0'>
            <div className='p-2'>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {showAddModal ? 'Create New Post' : 'Edit Post'}
              </h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={editingPost.title}
                    onChange={(e) => setEditingPost({...editingPost, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
                  <textarea
                    rows={2}
                    value={editingPost.excerpt}
                    onChange={(e) => setEditingPost({...editingPost, excerpt: e.target.value})} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  {Quill && (
                    <Quill
                      theme="snow"
                      value={editingPost.content}
                      onChange={(val) => setEditingPost({...editingPost, content: val})}
                      className="h-60"
                    />
                  )}
                </div>

                <div>
                  <label className="block lg:mt-14 mt-20 text-sm font-medium text-gray-700 mb-1">Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3 sm:gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                     onChange={(e) => setEditingPost({...editingPost, category: e.target.value})}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm">
                      {categories.filter(c => c !== 'All').map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                    onChange={(e) => setEditingPost({...editingPost, status: e.target.value})}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm">
                      <option value="Draft">Draft</option>
                      <option value="Published">Published</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className='bg-white rounded-r-xl'>
            <div className='p-4'>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                SEO Settings
              </h3>
              <form onSubmit={(e)=>handleSubmit(e)}>
                <div className='bg-zinc-50 pb-7 pt-4 px-4 rounded-xl border'>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SEO Title</label>
                  <input
                    type="text"
                    placeholder='SEO Optimized title...'
                    value={editingPost.seotitle}
                    onChange={(e) => setEditingPost({...editingPost, seotitle: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
                <div className='bg-zinc-50 pb-7 pt-4 px-4 rounded-xl mt-8 border'>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                  <textarea
                    rows={4}
                    placeholder='Brief description for search engines...'
                    value={editingPost.metadescription}
                    onChange={(e) => setEditingPost({...editingPost, metadescription: e.target.value})} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
                <div className='bg-zinc-50 rounded-xl mt-4 p-4 border'>
                    <label className="block text-sm font-medium text-gray-700">Author</label>
                    <select
                    onChange={(e) => setEditingPost({...editingPost, user: e.target.value})}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm">
                      <option value="Stordial Team">Stordial Team</option>
                      <option value="Admin">Admin</option>
                      <option value="User 1">User 1</option>
                      <option value="User 2">User 2</option>
                    </select>
                  </div>
                  <div className="flex flex-col mt-4 sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 py-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setShowEditModal(false);
                      handleReset();
                    }}
                    className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    {showAddModal ? loading ? 'Creating...' : 'Create Post' : loading ? 'Updating...' : 'Update Post'}
                  </button>
                </div>
              </form>
              </div>
          </div>
      </div>



      {/* Filters and Search */}
      <div className="bg-white rounded-xl w-full shadow-sm p-4 sm:p-6 border border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-end">
            <span className="text-xs sm:text-sm text-gray-600">
              {filteredPosts.length} posts found
            </span>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedPosts.length > 0 && (
        <div className="bg-blue-50 rounded-xl w-full p-3 sm:p-4 border border-blue-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <span className="text-xs sm:text-sm font-medium text-blue-800">
              {selectedPosts.length} posts selected
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleDeleteSelected}
                className="flex items-center px-2 sm:px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-xs sm:text-sm"
              >
                <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                <span className="hidden sm:inline">Delete Selected</span>
                <span className="sm:hidden">Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Posts List View */}
      {viewMode === 'list' && (
        <div className="bg-white w-full rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedPosts.length === filteredPosts.length && filteredPosts.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Post
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Category
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    Published
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Status
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPosts.map((post) => (
                  <tr key={post._id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedPosts.includes(post._id)}  
                        onChange={() => handleSelectPost(post._id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-3 sm:ml-4 min-w-0">
                          <div className="text-sm font-medium text-gray-900 truncate">{post.title}</div>
                          <div className="text-xs sm:text-sm text-gray-500 truncate">{post.excerpt.slice(0,10)}</div>
                          <div className="sm:hidden text-xs text-gray-500">
                           {post.category}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden md:table-cell">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                      <div className="flex items-center text-sm text-gray-900">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-gray-400 flex-shrink-0" />
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden md:table-cell">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-1 sm:space-x-2">
                        <button
                          onClick={() => handleEditPost(post)}
                          className="text-blue-600 hover:text-blue-900 p-1"
                          title="Edit"
                        >
                          <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 p-1" title="View">
                          <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                        <button onClick={()=>handleDelete(post)} className="text-red-600 hover:text-red-900 p-1" title="Delete">
                          <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Posts Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredPosts.map((post) => (
            <div key={post._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="relative">
                <div className="absolute top-2 right-2">
                  <input
                    type="checkbox"
                    checked={selectedPosts.includes(post._id)}
                    onChange={() => handleSelectPost(post._id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm sm:text-base font-semibold text-gray-800 line-clamp-2">{post.title}</h3>
                  <div className="flex items-center space-x-1 ml-2">
                    <button
                      onClick={() => handleEditPost(post)}
                      className="text-blue-600 hover:text-blue-900 p-1"
                      title="Edit"
                    >
                      <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-900 p-1" title="View">
                      <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900 p-1" title="Delete">
                      <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>
                
                <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2">{post.excerpt}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {post.category}
                    </span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                      {post.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="bg-white rounded-xl shadow-sm px-4 sm:px-6 py-3 border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="text-xs sm:text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredPosts.length}</span> of{' '}
            <span className="font-medium">{posts.length}</span> results
          </div>
          <div className="flex space-x-1 sm:space-x-2">
            <button className="px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200">
              Previous
            </button>
            <button className="px-2 sm:px-3 py-1 text-xs sm:text-sm text-white bg-blue-600 rounded-md">
              1
            </button>
            <button className="px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 