import React from 'react';

interface DownloadButtonProps {
  data: string; // A data será uma string, representando JSON ou CSV
  filename: string; // Nome do arquivo a ser baixado
  fileType: string; // Tipo do arquivo (ex: "application/json" ou "text/csv")
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ data, filename, fileType }) => {
  const handleDownload = () => {
    const blob = new Blob([data], { type: fileType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button 
      className="m-4  bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" 
      onClick={handleDownload}
    >
      Download {filename}
    </button>
  );
};

export default DownloadButton;
