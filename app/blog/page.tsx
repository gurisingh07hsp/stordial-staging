"use client"
import React from 'react'
import axios from 'axios';
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from 'react';
import { Camera } from 'lucide-react';
import {Card, CardContent,  CardFooter,  CardHeader, } from "@/components/ui/card";
// import Link from 'next/link';

interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  status: string;
  seotitle: string;
  metadescription: string;
  createdAt: Date;
}

const BlogsPage = () => {
    const [posts,setPosts] = useState<Blog[]>([]);

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

  return (
    <section className="py-10">
      <div className="container mx-auto flex flex-col items-center gap-16 lg:px-16">
        <div className="text-center">
          <h2 className="mb-3 text-pretty text-[30px] font-semibold md:mb-4 md:text-[30px] lg:mb-6 lg:max-w-3xl lg:text-[30px]">
            Blog Posts
          </h2>
          <p className="mb-8 text-muted-foreground md:text-base lg:max-w-2xl lg:text-lg">
            Discover the latest Blogs
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {posts.map((post) => (
            <Card key={post._id} className={`grid grid-rows-[auto_auto_1fr_auto] ${post.status !== 'Published' ? 'hidden' : 'block'}`}>
                <div className="aspect-[16/9] w-full h-36">
                    <div
                    className="transition-opacity border-b flex justify-center items-center h-full duration-200 fade-in hover:opacity-70"
                    >
                    {/* <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover object-center"
                    /> */}
                        <div className='h-full w-full flex justify-center items-center object-cover object-center'>
                            <Camera className='w-10 h-10'/>
                        </div>
                    </div>
              </div>
              <CardHeader>
                <h3 className="text-lg font-semibold hover:underline md:text-xl">
                  {/* <a href={post.url} target="_blank">
                  </a> */}
                    {post.title}
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{post.excerpt}</p>
              </CardContent>
              <CardFooter>
                <button
                  onClick={()=>window.location.href = `/blog/${post._id}`}
                  className="flex items-center text-foreground hover:underline"
                >
                  Read more
                  <ArrowRight className="ml-2 size-4" />
                </button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogsPage
