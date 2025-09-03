import React from 'react'
import { Calendar, Camera, User} from 'lucide-react';
import { Metadata } from "next";

interface Blogdata {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  status: string;
  seotitle: string;
  metadescription: string;
  user: string;
  createdAt: Date;
}

interface BlogPageProps{
    params:{
        id: string;
    }
}

async function getBlog(id: string): Promise<Blogdata> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/blogs/${id}`, {
    cache: "no-store",
  });

  if (res.status !== 200) throw new Error("Failed to fetch blog");
  const data = await res.json();
  return data.blog;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const decodedId = decodeURIComponent(params.id);
  const blog = await getBlog(decodedId);

  return {
    title: blog.seotitle || blog.title,
    description: blog.metadescription || blog.excerpt,
  };
}



const Blog = async({params}: BlogPageProps) => {

    const decodedId = decodeURIComponent(params.id);
    let loading = true;
    const blog = await getBlog(decodedId);
    if(blog){
        loading = false;
    }

  return (
    <div className='w-[90vw] mx-auto'>
        {!loading ? (
            <>
                <div className='lg:w-[40%] w-[100%] flex justify-center items-center h-64 rounded-lg border mt-6'>
                    <Camera className='w-10 h-10'/>
                </div>
                <div className="flex items-center gap-x-6 font-bold text-sm mt-2 ms-3 text-gray-900">
                    <div className='flex items-center'>
                      <User className='w-4 h-4'/>
                      <p className='ms-1'>{blog.user}</p>
                    <p className='ms-6'>Updated on:</p>
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-gray-400 flex-shrink-0" />
                        <span>{new Date(blog?.createdAt || '').toLocaleDateString()}</span>
                    </div>
                </div>
                <h1 className='text-4xl font-bold mt-5'>{blog?.title}</h1>
                <p className='text-[25px] mt-2'>{blog?.excerpt}</p>
                <div
                className="
                    my-6 space-y-4
                    [&_h1]:text-3xl [&_h1]:font-bold
                    [&_h2]:text-2xl [&_h2]:font-bold
                    [&_h3]:text-xl [&_h3]:font-semibold
                    [&_h4]:text-xl [&_h4]:font-medium
                    [&_h5]:text-lg [&_h5]:font-medium
                    [&_h6]:text-base [&_h6]:font-medium
                    [&_p]:text-base [&_p]:leading-relaxed
                    [&_ol]:list-decimal [&_ol]:ml-6
                    [&_ul]:list-disc [&_ul]:ml-6
                    [&_li]:mb-1
                    [&_strong]:font-semibold
                    [&_u]:underline
                    [&_blockquote]:border-l-4 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-600
                    [&_a]:text-blue-600 [&_a]:underline [&_a]:hover:text-blue-800
                    [&_img]:rounded-lg [&_img]:my-4 [&_img]:max-w-full
                "
                dangerouslySetInnerHTML={{ __html: blog?.content || "" }}
                />
            </>
        ) : (
            <div className='h-[100vh] flex justify-center items-center text-2xl'>
                Loading...
            </div>
        )}
        
    </div>
  )
}

export default Blog
