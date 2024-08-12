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
import AdminHeader from "../../AdminHeader";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const YFPoa1DetailPage = () => {
  const [poa1Data, setPoa1Data] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get(`/api/v1/yf-poa1/get/${id}`);
        setPoa1Data(response.data.data);
        console.log("Fetched POA1 data:", response.data.data); // Log the response data
      } catch (error) {
        console.error("Error fetching POA1 data:", error);
      }
    };

    fetchData();
  }, [id]);

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

  if (!poa1Data) return <div>Loading...</div>;

  return (
    <div>
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
      <div className="flex justify-end mb-4">
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
      <div id="poa1-detail">
        <AdminHeader className="print-header-margin">
          First Fortnightly Plan Of Action - Month:{" "}
          {new Date(poa1Data.created_at).toLocaleString("en-IN", {
            month: "long",
          })}{" "}
          2024
        </AdminHeader>
        <Table>
          <TableCaption className="text-sm">
            Details for POA1 ID: {poa1Data?.id}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Weekday</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Planned Event</TableHead>
              <TableHead>State</TableHead>
              <TableHead>District</TableHead>
              <TableHead>Achievements</TableHead>
              <TableHead>Photo</TableHead>
              <TableHead>Remarks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {poa1Data &&
              poa1Data?.poaData?.length > 0 &&
              poa1Data?.poaData?.map((dayData, index) => (
                <TableRow key={index}>
                  <TableCell className="text-xs">
                    {new Date(dayData.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-xs">{dayData.weekday}</TableCell>
                  <TableCell className="text-xs">{dayData.plan}</TableCell>
                  <TableCell className="text-xs">{dayData.action}</TableCell>
                  <TableCell className="text-xs">
                    {dayData.plannedEvent}
                  </TableCell>
                  <TableCell className="text-xs">
                    {dayData.state.name}
                  </TableCell>
                  <TableCell className="text-xs">
                    {dayData.district?.name || "N/A"}
                  </TableCell>
                  <TableCell className="text-xs">
                    {dayData.achievements}
                  </TableCell>
                  <TableCell className="text-xs">
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
                  <TableCell className="text-xs">{dayData.remarks}</TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan="10" className="text-center text-xs">
                End of POA1 Details
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default YFPoa1DetailPage;
