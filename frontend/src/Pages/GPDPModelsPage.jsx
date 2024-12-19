import React from 'react';

const GPDPModelsPage = () => {
    const gpdpFiles = [
        {
            name: "GPDP Planning Process ",
            url: "https://nirdprbucket.s3.ap-south-1.amazonaws.com/GPDP+SAMPLES/GPDP+planing+Process.pdf"
        },
        {
            name: "GPDP PRI convergence, Process of Uploading on Egram Swraj Portal and special GS ",
            url: "https://nirdprbucket.s3.ap-south-1.amazonaws.com/GPDP+SAMPLES/GPDP+PRI+convergence%2C+Process+of+Uploading+on+Egram+Swraj+Portal+and+special+GS.pdf"
        },
        {
            name: "Model 1: Amsole GPDP 2023-24 ",
            url: "https://nirdprbucket.s3.ap-south-1.amazonaws.com/GPDP+SAMPLES/Amsole+GPDP+23-24+-+Latest.pdf"
        },
        {
            name: "Model 2 : Final GPDP of Madanpur GP BPC MSD WB 2023-24",
            url: "https://nirdprbucket.s3.ap-south-1.amazonaws.com/GPDP+SAMPLES/Final+GPDP+of+Madanpur+GP+_BPC_MSD_WB+zainul+Abedin.pdf"
        },
        {
            name: "Model 3 : Patora GPDP 2023-24",
            url: "https://nirdprbucket.s3.ap-south-1.amazonaws.com/GPDP+SAMPLES/Patora+GPDP+2023-24.pdf"
        },
        {
            name: "Model 4 : Petlawad Jhabua MP GPDP 2023-24",
            url: "https://nirdprbucket.s3.ap-south-1.amazonaws.com/GPDP+SAMPLES/Krishna-Karwad+Petlawad+Jhabua+MP+GPDP+2023-24.pdf"
        }
    ];

    return (
        <div className="container mx-auto px-4 mb-10">
            <h1 className="text-xl font-bold text-center my-4">GPDP Models</h1>
            <p className="text-center text-gray-600 mb-6">
                Explore our comprehensive collection of GPDP models designed to provide insights and practical guidelines for effective local governance and planning.
            </p>
            <div className="flex flex-col items-center">
                {gpdpFiles.map((file, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg p-4 w-full md:w-2/3 lg:w-1/2 mb-4 hover:shadow-xl transition-shadow duration-300">
                        <h2 className="font-semibold">{file.name}</h2>
                        <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 mt-2 inline-block">
                            Download
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GPDPModelsPage;
