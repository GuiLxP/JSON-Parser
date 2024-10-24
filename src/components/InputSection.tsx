import axios from 'axios';

interface InputSectionProps {
  inputData: string;
  setInputData: (data: string) => void;
  conversionType: string;
  setConversionType: (type: string) => void;
  setOutputData: (data: any) => void;
  setErrorMessage: (message: string) => void;
  setCopySuccess: (message: string) => void;
  setIsLoading: (loading: boolean) => void;
  isLoading: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({
  inputData,
  setInputData,
  conversionType,
  setConversionType,
  setOutputData,
  setErrorMessage,
  setCopySuccess,
  setIsLoading,
  isLoading,
}) => {
  const isValidJSON = (data: string) => {
    try {
      JSON.parse(data);
      return true;
    } catch {
      return false;
    }
  };

  const isValidCSV = (data: string) => {
    const rows = data.split('\n');
    return rows.every((row) => row.split(',').length > 1);
  };

  const handleConvert = async () => {
    setErrorMessage('');
    setCopySuccess('');
    let isValid = false;

    if (conversionType === 'csv-to-json') {
      isValid = isValidCSV(inputData);
      if (!isValid) {
        setErrorMessage('Input não é um CSV válido.');
        return;
      }
    } else if (conversionType === 'json-to-csv') {
      isValid = isValidJSON(inputData);
      if (!isValid) {
        setErrorMessage('Input não é um JSON válido.');
        return;
      }
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`http://localhost:3000/convert`, {
        data: inputData,
        type: conversionType,
      });
      setOutputData(response.data);
    } catch (error) {
      console.error('Erro durante a conversão', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConversionChange = (type: string) => {
    setConversionType(type);
    setOutputData(null);
    setErrorMessage('');
    setCopySuccess('');
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl">
      <textarea
        className="w-full p-2 border border-gray-700 bg-gray-800 text-white rounded mb-4 resize-none"
        rows={10}
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
        placeholder="Enter CSV or JSON data"
      />
      <div className="flex flex-wrap justify-center mb-4">
        <label className="flex items-center space-x-2 mr-4">
          <input
            type="radio"
            value="csv-to-json"
            checked={conversionType === 'csv-to-json'}
            onChange={() => handleConversionChange('csv-to-json')}
            className="bg-gray-800"
          />
          <span>CSV to JSON</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="json-to-csv"
            checked={conversionType === 'json-to-csv'}
            onChange={() => handleConversionChange('json-to-csv')}
            className="bg-gray-800"
          />
          <span>JSON to CSV</span>
        </label>
      </div>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        onClick={handleConvert}
        disabled={isLoading}
      >
        {isLoading ? 'Convertendo...' : 'Convert'}
      </button>
    </div>
  );
};

export default InputSection;
