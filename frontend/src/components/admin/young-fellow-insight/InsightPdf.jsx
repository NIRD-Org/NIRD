import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable"; 

const DataToPDF = ({ data, children }) => {
  const downloadPDF = async () => {
    console.log("downloadPDF"); 
    const pdf = new jsPDF();

    const headers = [['Field', 'Value']];
    const body = [
      ['Young Fellow Name', data.youngFellowName],
      ['Date of Joining', data.dateOfJoining],
      ['Date of Submission', data.dateOfSubmission],
      ['Achievement', data.achievement],
      ['Failure', data.failure],
      ['Plan of Action', data.planOfAction]
    ];

    const tableStyles = { fillColor: [245, 245, 245] }; 

    const imageUrl = ''; 
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const imageDataUrl = reader.result;
      pdf.addImage(imageDataUrl, 'JPEG', 15, 15, 180, 160);
      pdf.autoTable({
        head: headers,
        body: body,
        startY: 180, 
        styles: tableStyles
      });

      pdf.save(`${data.gp_name}_${data.youngFellowName}_Report.pdf`);
    };
  };

  return (
    <span onClick={downloadPDF}>
      {children}
    </span>
  );
};

export default DataToPDF;
