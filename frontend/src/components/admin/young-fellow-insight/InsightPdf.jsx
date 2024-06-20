import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { NirdDownloadIcon } from "../Icons";

const DataToPDF = ({ data, children }) => {
  const downloadPDF = () => {
    console.log("downlaosdPd");  const pdf = new jsPDF();
    const headers = [['Field', 'Value']];
    const body = [
      ['Young Fellow Name', data.youngFellowName],
      ['Date of Joining', data.dateOfJoining],
      ['Date of Submission', data.dateOfSubmission],
      ['Achievement', data.achievement],
      ['Failure', data.failure],
      ['Plan of Action', data.planOfAction]
    ];

    const tableStyles = { margin: { top: 20 }, alternateRowStyles: { fillColor: [245, 245, 245] } };

    pdf.autoTable({
      head: headers,
      body: body,
      startY: 20,
      styles: tableStyles
    });

    pdf.save(`${data.gp_name}_${data.youngFellowName}_Report.pdf`);
  };

  return (
    <span onClick={downloadPDF}>
        {children}
    </span>
  );
};

export default DataToPDF;
