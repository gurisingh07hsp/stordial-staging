"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Calendar, User } from "lucide-react";

interface Blogdata {
  _id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  status: string;
  user: string;
  createdAt: Date;
}

export default function SimilarBlogs({
  similarBlogs,
  currentBlogId,
}: {
  similarBlogs: Blogdata[];
  currentBlogId: string;
}) {
  const router = useRouter();

  similarBlogs = similarBlogs.filter(blog=> blog._id !== currentBlogId && blog.status === 'Published');

  return (
    <div className="lg:w-[25vw] h-[500px] w-full lg:mt-0 mt-10 border rounded-lg">
      <h2 className="p-4 font-semibold text-lg">Related Blogs</h2>
      {similarBlogs.length > 0 ? (
        similarBlogs.map((similarBlog, index) => (
          <div
            key={index}
            onClick={() => router.push(`/blog/${similarBlog._id}`)}
            className={`${
              similarBlog._id === currentBlogId || similarBlog.status !== "Published"
                ? "hidden"
                : "block"
            } px-4 mt-4 cursor-pointer hover:bg-gray-50`}
          >
            <h3 className="text-md font-semibold">{similarBlog.title}</h3>
            <p className="mt-2 text-gray-500">{similarBlog.excerpt.slice(0, 70)}</p>
            <div className="flex items-center text-gray-500 mt-2">
              <User className="w-3 h-3" />
              <p className="ms-1 text-sm">{similarBlog.user}</p>
              <p className="ms-10 text-sm">Updated on:</p>
              <Calendar className="w-3 h-3 ms-2 mr-1 text-sm flex-shrink-0" />
              <p className="text-sm">
                {new Date(similarBlog?.createdAt || "").toLocaleDateString("en-US", {year: "numeric",month: "short",day: "numeric",})}
              </p>
            </div>
            <hr className="mt-4" />
          </div>
        ))
      ) : (
        <p className="p-4 text-center mt-20">No related articles found.</p>
      )}
    </div>
  );
}
