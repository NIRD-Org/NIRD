import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "@/utils/API";

const BlogDetails = () => {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true)
  const getBlogPost = async () => {
   
    try {
      const { data } = await API.get(`/api/v1/blog/${id}`);
      setBlog(data.data);
    } catch (error) {
      console.error("Failed to fetch blog post:", error);
    } finally {
        setLoading(false)
    }
  };

  useEffect(() => {
    getBlogPost();
  }, [id]);

  if (!blog && loading) {
    return (
      <div className="text-center mt-10 text-gray-600">
        Loading blog details...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <img
          src={blog?.image } 
          alt={blog?.title}
          className="w-full h-96 object-cover rounded hover:shadow-md"
        />
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{blog?.title}</h1>
      <div className="prose prose-lg text-gray-700">{blog?.content}</div>
    </div>
  );
};

export default BlogDetails;
