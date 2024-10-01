import { useState } from 'react';
import InputSection from './components/InputSection';
import OutputSection from './components/OutputSection';
import { useSpring } from '@react-spring/web';

function App() {
  const [inputData, setInputData] = useState('');
  const [conversionType, setConversionType] = useState('csv-to-json');
  const [outputData, setOutputData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fadeProps = useSpring({
    opacity: outputData ? 1 : 0,
    transform: outputData ? 'translateY(0)' : 'translateY(-20px)',
    config: { tension: 200, friction: 20 },
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">CSV/JSON Parser</h1>
      <InputSection
        inputData={inputData}
        setInputData={setInputData}
        conversionType={conversionType}
        setConversionType={setConversionType}
        setOutputData={setOutputData}
        setErrorMessage={setErrorMessage}
        setCopySuccess={setCopySuccess}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
      />
      <OutputSection
        outputData={outputData}
        conversionType={conversionType}
        fadeProps={fadeProps}
        copySuccess={copySuccess}
        setCopySuccess={setCopySuccess}
      />
      {errorMessage && (
        <p className="text-red-500 mt-4">{errorMessage}</p>
      )}
    </div>
  );
}

export default App;
