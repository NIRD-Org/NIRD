import API from "@/utils/API";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  // Fetch all blog posts
  const getAllBlogs = async () => {
    try {
      const { data } = await API.get("/api/v1/blog/all");
      setBlogs(data.data);
    } catch (error) {
      console.error("Failed to fetch blog posts:", error);
    }
  };

  // Delete a blog post
  const deleteBlogPost = async (id) => {
    try {
      await API.delete(`/api/v1/blog/${id}`);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error("Failed to delete blog post:", error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Activities and Achievements of SoEPR
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs &&
          blogs.length > 0 &&
          blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-lg border border-gray-300 hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-800 hover:text-orange-500 transition-colors duration-200">
                  {blog.title}
                </h2>
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                  {blog.content}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => navigate(`/admin/superadmin/blog/${blog._id}`)}
                    className="text-orange-500 font-medium hover:underline"
                  >
                    Read More
                  </button>
                  <button
                    onClick={() => deleteBlogPost(blog._id)}
                    className="text-red-500 font-medium hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllBlogs;
