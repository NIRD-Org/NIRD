import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import API from "@/utils/API";
import { useParams } from "react-router-dom";
import AdminHeader from "@/components/admin/AdminHeader";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const SPCPoa1DetailPage = () => {
  const [poa1Data, setPoa1Data] = useState(null);
  const { id } = useParams();
  const [poaType, setPoaType] = useState("poa1");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get(
          `/api/v1/spc-poa1/get/${id}?poaType=${poaType}`
        );
        if (response.data && response.data.data) {
          setPoa1Data(response.data.data);
          console.log("Fetched POA1 data:", response.data.data); // Log the response data
        } else {
          console.error("No data found in response:", response.data);
          setPoa1Data(null);
        }
      } catch (error) {
        setPoa1Data(null);
        console.error("Error fetching POA1 data:", error);
      }
    };

    fetchData();
  }, [id, poaType]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    const element = document.getElementById("poa1-detail");
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`POA1_Details_${id}.pdf`);
  };

  const getHeaderText = () => {
    return poaType === "poa1"
      ? "First Weekly Plan Of Action"
      : "Weekly Plan Of Action";
  };

  return (
    <div className="w-full md:w-[80vw]">
      <style>
        {`
          @media print {
            .site-header, .site-footer {
              @apply hidden;
            }
            .print-button, .download-button {
              @apply hidden;
            }
            body {
              @apply text-xs leading-snug;
            }
            table {
              @apply width: 100%; border-collapse: collapse;
            }
            th, td {
              @apply padding: 2px; text-xs;
            }
            img {
              @apply max-width: 50px; max-height: 50px;
            }
            .print-header-margin {
              margin-top: 20px;
            }
          }
        `}
      </style>
      <div className="flex justify-between mb-4">
        <div className="flex flex-col ml-5">
          <label className="text-sm text-primary text-start py-2 font-semibold">
            POA Type
          </label>
          <select
            className="border text-sm bg-white p-2 px-4 rounded-md"
            value={poaType}
            onChange={(e) => setPoaType(e.target.value)}
          >
            <option value="poa1">POA1</option>
            <option value="poa2">POA2</option>
            <option value="poa3">POA3</option>
            <option value="poa4">POA4</option>
          </select>
        </div>

        <div className="flex items-center">
          <button
            onClick={handlePrint}
            className="print-button bg-blue-900 text-white px-4 py-2 rounded mr-4"
          >
            Print
          </button>
          <button
            onClick={handleDownloadPdf}
            className="download-button bg-green-900 text-white px-4 py-2 rounded"
          >
            Download as PDF
          </button>
        </div>
      </div>

      {!poa1Data ? (
        <p className="text-center text-red-500">
          Loading data or no data available...
        </p>
      ) : (
        <div id="poa1-detail">
          <AdminHeader className="print-header-margin">
            {getHeaderText()} - Month:{" "}
            {new Date(poa1Data.created_at).toLocaleString("en-IN", {
              month: "long",
            })}{" "}
            {new Date(poa1Data.created_at).getFullYear()} 
          </AdminHeader>
          <Table>
            <TableCaption className="text-sm">
              Details for {poaType.toLocaleUpperCase} ID: {poa1Data?.id}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="px-1">Date</TableHead>
                <TableHead className="px-1">Weekday</TableHead>
                <TableHead className="px-1">Plan</TableHead>

                <TableHead className="px-1">Activity</TableHead>
                <TableHead className="px-1">Tentative Target</TableHead>
                <TableHead className="px-1">Planned Event</TableHead>
                <TableHead className="px-1">State</TableHead>
                <TableHead className="px-1">District</TableHead>
                <TableHead className="px-1">Achievements</TableHead>
                <TableHead className="px-1">Photo</TableHead>
                <TableHead className="px-1">Remarks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {poa1Data?.poaData?.length > 0 ? (
                poa1Data.poaData.map((dayData, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-xs p-2.5">
                      {dayData.date}
                    </TableCell>
                    <TableCell className="text-xs p-2.5">
                      {dayData.weekday}
                    </TableCell>
                    <TableCell className="text-xs p-2.5">
                      {dayData.plan}
                    </TableCell>
                    <TableCell className="text-xs p-2.5">
                      {dayData.activity}
                    </TableCell>
                    <TableCell className="text-xs p-2.5">
                      {dayData.tentativeTarget}
                    </TableCell>
                    <TableCell className="text-xs p-2.5">
                      {dayData.plannedEvent}
                    </TableCell>
                    <TableCell className="text-xs p-2.5">
                      {dayData.state?.name || "N/A"}
                    </TableCell>
                    <TableCell className="text-xs p-2.5">
                      {dayData.district?.name || dayData?.dist_id || "N/A"}
                    </TableCell>
                    <TableCell className="text-xs p-2.5">
                      {dayData.achievements}
                    </TableCell>
                    <TableCell className="text-xs p-2.5">
                      {dayData.photo ? (
                        <img
                          src={dayData.photo}
                          alt="Photo"
                          className="max-w-24"
                        />
                      ) : (
                        "No photo"
                      )}
                    </TableCell>
                    <TableCell className="text-xs p-2.5">
                      {dayData.remarks}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="10" className="text-center text-xs">
                    No {poaType === "poa1" ? "POA1" : "POA2"} data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan="10" className="text-center text-xs">
                  End of {poaType} Details
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      )}
    </div>
  );
};

export default SPCPoa1DetailPage;
