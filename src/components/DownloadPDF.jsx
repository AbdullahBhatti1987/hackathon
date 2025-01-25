const handleDownloadPDF = (filteredData) => {
    const doc = new jsPDF();
    const keys = Object.keys(filteredData[0]);
    const tableData = filteredData.map(item => keys.map(key => item[key]));
  
    doc.autoTable({
      head: [keys], // Table headers
      body: tableData, // Table rows
    });
    doc.save("filtered_data.pdf"); // Save the PDF file
  };
  