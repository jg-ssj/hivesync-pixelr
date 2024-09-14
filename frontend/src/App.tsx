import React, { useRef, useState, useEffect } from 'react';
import { Editor } from '@pixlrlte/pixlr-sdk';
import { InfoIcon, X } from 'lucide-react';

export default function Component() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [editor, setEditor] = useState<Editor | null>(null);
  const [showModal, setShowModal] = useState(false);

  const API_URL =
    process.env.NODE_ENV === 'production'
      ? 'https://hivesync-pixelr.vercel.app/api/get-token'
      : 'http://localhost:5000/api/get-token';
    useEffect(()=>
  {
    console.log("holA",API_URL)    
    console.log("holka",process.env.NODE_ENV)
  },[])
  const fetchJwtToken = async () => {
    try {
      console.log('Fetching JWT token from:', API_URL);
      const response = await fetch(API_URL); 
      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }
      const data = await response.json();
      console.log('Received JWT token:', data.token);
      return data.token;
    } catch (error) {
      console.error('Error al obtener el token:', error);
    }
  };

  useEffect(() => {
    const initializeEditor = async () => {
      const token = await fetchJwtToken();
      if (token && iframeRef.current) {
        try {
          const connectedEditor = await Editor.connect(token, iframeRef.current);
          setEditor(connectedEditor);
        } catch (error) {
          console.error('Error connecting to Pixlr Editor:', error);
        }
      }
    };

    initializeEditor();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#19161D] p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-[#45156B] rounded-full filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[#2E2934] rounded-full filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>
      </div>

      {/* Decorative circles */}
      <div className="absolute top-[10%] left-[5%] w-[10vw] h-[10vw] max-w-[100px] max-h-[100px] rounded-full bg-[#45156B] opacity-50"></div>
      <div className="absolute bottom-[5%] right-[5%] w-[15vw] h-[15vw] max-w-[150px] max-h-[150px] rounded-full bg-[#2E2934] opacity-50"></div>
      <div className="absolute top-1/3 right-1/4 w-[8vw] h-[8vw] max-w-[80px] max-h-[80px] rounded-full bg-[#45156B] opacity-30"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[12vw] h-[12vw] max-w-[120px] max-h-[120px] rounded-full bg-[#2E2934] opacity-30"></div>

      {/* Main content */}
      <div className="z-10 w-full max-w-7xl px-4 flex flex-col items-center">
        {/* Improved image layout */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8 mb-12 mt-16">
          <img
            src="/hivesyncLogo.png"
            alt="HiveSync Logo"
            className="w-24 sm:w-28 md:w-32 lg:w-36 transition-transform duration-300 hover:scale-110"
          />
          <img
            src="/logo.png"
            alt="Main Logo"
            className="w-24 sm:w-28 md:w-32 lg:w-36 transition-transform duration-300 hover:scale-110"
          />
          <img
            src="/pixlr.png"
            alt="Pixlr Logo"
            className="w-24 sm:w-28 md:w-32 lg:w-36 transition-transform duration-300 hover:scale-110"
          />
        </div>

        {/* Informative text */}
        <p className="text-white text-lg sm:text-xl md:text-2xl mb-8 text-center font-semibold">
          Arrastra una imagen para empezar a editar
        </p>
        
        {/* Informative text */}
        <p className="text-white text-lg sm:text-xl md:text-2xl mb-8 text-center font-semibold">
          {API_URL}
        </p>

        {/* Adjustable container for iframe */}
        <div className="w-full bg-[#2E2934] rounded-lg p-1 shadow-lg overflow-hidden">
          <iframe
            ref={iframeRef}
            id="pixlr-frame"
            src="about:blank"
            className="w-full h-[600px] sm:h-[700px] lg:h-[800px] overflow-scroll"
            title="Pixlr Editor"
            style={{ overflow: 'auto' }}
          ></iframe>
        </div>

        {/* Additional decorative elements */}
        <div className="mt-8 mb-5 flex justify-center space-x-4">
          <div className="w-2 h-2 md:w-3 md:h-3 bg-[#45156B] rounded-full"></div>
          <div className="w-2 h-2 md:w-3 md:h-3 bg-[#2E2934] rounded-full"></div>
          <div className="w-2 h-2 md:w-3 md:h-3 bg-[#45156B] rounded-full"></div>
        </div>
      </div>

      {/* Top and bottom decorative pattern */}
      <div className="absolute top-0 left-0 right-0 h-2 md:h-4 bg-[#45156B] opacity-50"></div>
      <div className="absolute bottom-0 left-0 right-0 h-2 md:h-4 bg-[#45156B] opacity-50"></div>

      {/* Information button */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed top-4 right-4 p-2 bg-[#2E2934] rounded-full text-white hover:bg-[#45156B] transition-colors duration-200 z-20"
        aria-label="Información importante"
      >
        <InfoIcon size={24} />
      </button>

      {/* Information modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#2E2934] p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-white hover:text-[#45156B]"
              aria-label="Cerrar modal"
            >
              <X size={24} />
            </button>
            <h2 className="text-xl font-bold text-white mb-4">Información importante</h2>
            <p className="text-white text-sm md:text-base">
              Para una mejor experiencia, se recomienda utilizar esta aplicación en dispositivos de escritorio o pantallas grandes, ya que está optimizada para resoluciones mayores. Algunas funcionalidades podrían no mostrarse correctamente en dispositivos móviles.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
