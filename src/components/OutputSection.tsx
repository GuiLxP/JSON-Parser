import { animated } from '@react-spring/web';
import DownloadButton from './DownloadButton'; // Importe o DownloadButton

interface OutputSectionProps {
  outputData: any;
  conversionType: string;
  fadeProps: any;
  copySuccess: string;
  setCopySuccess: (message: string) => void;
}

const OutputSection: React.FC<OutputSectionProps> = ({
  outputData,
  conversionType,
  fadeProps,
  copySuccess,
  setCopySuccess,
}) => {
  const handleCopy = () => {
    const textToCopy =
      conversionType === 'csv-to-json'
        ? JSON.stringify(outputData, null, 2)
        : outputData;

    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setCopySuccess('Copiado para área de transferência!');
      })
      .catch(() => {
        setCopySuccess('Falha ao copiar.');
      });
  };

  const outputString =
    conversionType === 'csv-to-json'
      ? JSON.stringify(outputData, null, 2)
      : outputData;

  const filename =
    conversionType === 'csv-to-json' ? 'data.json' : 'data.csv';

  const fileType =
    conversionType === 'csv-to-json' ? 'application/json' : 'text/csv';

  return (
    <>
      {outputData && (
        <animated.div style={fadeProps} className="mt-4 w-full max-w-2xl">
          <pre className="bg-gray-800 text-white p-4 border border-gray-700 rounded overflow-hidden text-ellipsis">
            {outputString}
          </pre>
          <button
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 overflow-hidden text-ellipsis"
            onClick={handleCopy}
          >
            Copiar Resposta
          </button>
          <DownloadButton data={outputString} filename={filename} fileType={fileType} />
          {copySuccess && (
            <p className="text-sm text-gray-400 mt-2">{copySuccess}</p>
          )}
        </animated.div>
      )}
    </>
  );
};

export default OutputSection;
