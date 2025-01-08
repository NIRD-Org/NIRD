import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "@/utils/API";
import { Download } from "lucide-react";
import ReactPlayer from "react-player";

import GoodPracticesCard from "@/components/GoodPracticesCard";
import GradientLine from "@/components/GradientLine";

/**
 * Inline FilePreview subcomponent.
 * Determines how to preview a file based on its extension:
 * - Videos (mp4, webm, etc.): uses ReactPlayer
 * - Images (jpg, png, etc.): uses <img>
 * - PDFs: uses <embed>
 * - Office docs (doc, xls, ppt, etc.): uses Google Docs Viewer
 * - Fallback: "Cannot preview this file type. Please download."
 */
function FilePreview({ fileUrl }) {
  if (!fileUrl) return null;

  const extension = fileUrl.split(".").pop().toLowerCase();

  // 1) Video preview with ReactPlayer
  if (["mp4", "mov", "webm", "m4v", "ogg"].includes(extension)) {
    return <ReactPlayer url={fileUrl} controls width="100%" height="auto" />;
  }

  // 2) Image preview
  if (["jpg", "jpeg", "png", "gif", "webp", "bmp"].includes(extension)) {
    return (
      <img
        src={fileUrl}
        alt="File Preview"
        className="w-full h-auto object-contain"
      />
    );
  }

  // 3) PDF preview (simple <embed>)
  if (extension === "pdf") {
    return (
      <embed
        src={fileUrl}
        type="application/pdf"
        className="w-full h-[600px]" // adjust height as needed
      />
    );
  }

  // 4) Office documents
  if (["doc", "docx", "xls", "xlsx", "ppt", "pptx"].includes(extension)) {
    const googleUrl = `https://docs.google.com/gview?url=${encodeURIComponent(
      fileUrl
    )}&embedded=true`;
    return (
      <iframe
        src={googleUrl}
        title="Office Preview"
        className="w-full h-[600px]"
      />
    );
  }

  // 5) Fallback if unsupported
  return (
    <div className="text-center text-red-500">
      Cannot preview this file type. Please{" "}
      <a href={fileUrl} download className="text-blue-700 underline">
        download
      </a>
      .
    </div>
  );
}

const GoodPracticeDetails = () => {
  const { id } = useParams();

  const [goodPractice, setGoodPractice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [similarGoodPractices, setSimilarGoodPractices] = useState([]);

  // Fetch the current Good Practice details
  const getGoodPractice = async () => {
    try {
      setLoading(true);
      const { data } = await API.get(`/api/v1/good-practice/${id}`);
      setGoodPractice(data?.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch similar Good Practices
  const getGoodPracticesFilters = async () => {
    try {
      const { data } = await API.get(`/api/v1/good-practice/similar/${id}`);
      setSimilarGoodPractices(data?.data);
    } catch (error) {
      setSimilarGoodPractices([]);
      console.log(error.message);
    }
  };

  useEffect(() => {
    getGoodPractice();
    getGoodPracticesFilters();
  }, [id]);

  if (loading) {
    return (
      <div className="py-10 px-5 md:px-20 lg:py-16 flex items-center justify-center h-screen text-2xl font-semibold text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <div className="py-5 bg-white">
      {/* If data loaded, render details */}
      {goodPractice && (
        <>
          <div className="pt-4 md:pt-10 px-2 md:px-20">
            <h1 className="text-primary text-4xl font-semibold md:text-5xl">
              {goodPractice.activityTitle}
            </h1>
            <p className="w-fit my-7 text-sm md:text-lg md:my-10 rounded-full px-2 md:px-4 py-1 bg-primary text-white">
              {goodPractice.theme_name}
            </p>
          </div>

          <GradientLine />

          {/* Main Content Area */}
          <div className="px-5 md:px-20 py-10 flex flex-col md:flex-row w-full md:h-[100vh] h-full items-start justify-center">
            {/* Left: File preview and Download link */}
            <div className="w-full md:w-4/6 h-full">
              {/* Download link if needed */}
              {goodPractice.document && (
                <a
                  href={goodPractice.document}
                  download={goodPractice.document}
                  className="flex my-1 gap-2 items-center justify-center w-fit text-xl text-sky-900"
                >
                  <Download />
                  Download
                </a>
              )}

              {/* Inline file preview logic */}
              {/* We try to preview the "document" first, falling back to "video" if no doc is present. 
                  Or if you prefer to always show "video" first, just swap the order. */}
              <FilePreview
                fileUrl={goodPractice.document || goodPractice.video}
              />
            </div>

            {/* Right: Location Info */}
            <div className="mt-9 w-full md:w-2/6 h-fit py-6 flex flex-col justify-between bg-gray-200">
              <div className="border bg-gray-200 rounded px-5 py-2">
                <h2 className="text-lg font-semibold">State</h2>
                <p className="text-2xl font-semibold text-sky-900">
                  {goodPractice.state_name}
                </p>
              </div>
              <div className="border bg-gray-200 rounded px-5 py-2">
                <h2 className="text-lg font-semibold">District</h2>
                <p className="text-2xl font-semibold text-sky-900">
                  {goodPractice.dist_name}
                </p>
              </div>
              <div className="border bg-gray-200 rounded px-5 py-2">
                <h2 className="text-lg font-semibold">Block</h2>
                <p className="text-2xl font-semibold text-sky-900">
                  {goodPractice.block_name}
                </p>
              </div>
              <div className="border bg-gray-200 rounded px-5 py-2">
                <h2 className="text-lg font-semibold">Gram Panchayat</h2>
                <p className="text-2xl font-semibold text-sky-900">
                  {goodPractice.gp_name}
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Similar Good Practices */}
      <div className="px-5 md:px-20 py-10 bg-gray-100">
        <h1 className="text-3xl md:text-5xl mb-5 text-center md:text-left text-primary font-bold">
          Other Good Practices
        </h1>
        <div className="px-5 pt-5 md:px-10 md:pb-10 w-fit mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 justify-items-center justify-center gap-20 mb-5">
          {similarGoodPractices && similarGoodPractices.length > 0 ? (
            similarGoodPractices.map((data) => (
              <GoodPracticesCard
                key={data.id}
                id={data.id}
                activity={data.activityTitle}
                block={data.block_name}
                district={data.dist_name}
                gp={data.gp_name}
                image={data.image || data.images?.[0]}
                state={data.state_name}
                theme={data.theme_name}
              />
            ))
          ) : (
            <div className="text-center flex justify-center items-center h-min-screen md:min-h-[50vh]">
              No Good Practices Found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoodPracticeDetails;
