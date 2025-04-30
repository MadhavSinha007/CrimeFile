import { useState } from 'react';
import { jsPDF } from 'jspdf';

function ResultDisplay({ result, error, imagePreview }) {
  const [expandedSections, setExpandedSections] = useState({});
  const [isDownloading, setIsDownloading] = useState(false);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const generatePDFReport = () => {
    setIsDownloading(true);
    const doc = new jsPDF();

    // Title
    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.setFillColor(0, 0, 0);
    doc.rect(0, 0, 210, 297, 'F'); // Black background
    doc.setTextColor(255, 255, 255);
    doc.text('Criminal Verification Report', 20, 20);

    // Header
    doc.setFontSize(12);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 30);
    doc.text(`Scan ID: #CR-${Math.floor(100000 + Math.random() * 900000)}`, 20, 36);

    // Add Image (if available)
    let y = 50;
    if (imagePreview && result?.matchFound) {
      try {
        // Add image with fixed dimensions (e.g., 80x80 mm)
        doc.addImage(imagePreview, 'JPEG', 20, y, 80, 80);
        doc.setFontSize(10);
        doc.text('Subject Image', 20, y + 85);
        y += 95; // Adjust y position after image
      } catch (e) {
        console.error('Failed to add image to PDF:', e);
        doc.setFontSize(10);
        doc.text('Image not available', 20, y);
        y += 10;
      }
    }

    // Content
    doc.setFontSize(14);
    if (!result || error) {
      doc.text('No results available.', 20, y);
      y += 10;
    } else if (!result.matchFound) {
      doc.text('No Criminal Match Found', 20, y);
      y += 10;
      doc.setFontSize(10);
      doc.text('Confidence: 23%', 20, y);
      y += 10;
      doc.text('Analysis Details:', 20, y);
      y += 6;
      doc.text(`- Algorithm Version: FaceMatch 4.2.1`, 20, y);
      y += 6;
      doc.text(`- Database Status: Updated`, 20, y);
    } else if (result.matchFound && result.criminalData) {
      const { criminalData } = result;
      doc.text('Criminal Match Found', 20, y);
      y += 10;
      doc.setFontSize(10);
      doc.text(`Confidence: 88%`, 20, y);
      y += 10;
      doc.text(`Name: ${criminalData.name || 'Unknown'}`, 20, y);
      y += 6;
      doc.text(`Age: ${criminalData.age || 'Unknown'}`, 20, y);
      y += 6;
      doc.text(`Status: ${criminalData.status || 'Unknown'}`, 20, y);
      y += 6;
      doc.text(`Crime Type: ${criminalData.crimeType || 'Unknown'}`, 20, y);
      y += 6;
      doc.text(`Last Known Location: ${criminalData.lastKnownLocation || 'Unknown'}`, 20, y);
      y += 10;
      doc.text('Crime Story:', 20, y);
      y += 6;
      const storyLines = doc.splitTextToSize(criminalData.story || 'No story available.', 170);
      doc.text(storyLines, 20, y);
      y += storyLines.length * 6 + 6;
      doc.text(`Officer Assigned: ${criminalData.officerAssigned || 'Unknown'}`, 20, y);
      y += 6;
      doc.text(`Victims: ${criminalData.victims || 'Unknown'}`, 20, y);
      y += 6;
      doc.text(`Notable Operations: ${criminalData.notableOperations || 'None'}`, 20, y);
      y += 6;
      doc.text(`Known Associates: ${criminalData.knownAssociates || 'None'}`, 20, y);
    }

    // Check if content exceeds page height
    if (y > 260) {
      doc.addPage();
      doc.setFillColor(0, 0, 0);
      doc.rect(0, 0, 210, 297, 'F'); // Black background for new page
      y = 20;
    }

    // Footer
    doc.setFontSize(8);
    doc.text('© 2025 Criminal Face Verification System | Confidential', 20, 270);
    doc.text('For demonstration purposes only.', 20, 275);

    // Save the PDF
    doc.save(`Criminal_Verification_Report_${Date.now()}.pdf`);
    setTimeout(() => setIsDownloading(false), 1000); // Reset animation state
  };

  return (
    <div className="md:col-span-2">
      {error && (
        <div className="w-full bg-black/20 backdrop-blur-lg text-white p-5 rounded-lg mb-6 border-l-4 border-white/50 animate-fade-in">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="font-medium">{error}</p>
          </div>
        </div>
      )}

      {!result && !error && (
        <div className="bg-black/20 backdrop-blur-lg rounded-2xl p-8 border border-white/10 h-full flex flex-col items-center justify-center text-center">
          <div className="mb-6">
            <svg className="h-16 w-16 text-white/30 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-3 relative group inline-flex">
            Advanced Facial Recognition System
            <span className="absolute left-0 bottom-0 w-full h-px bg-white transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
          </h2>
          <p className="text-white/70 max-w-md mb-6">
            Upload an image to match against our global criminal database. Results include comprehensive criminal profiles and activity reports.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-lg">
            <div className="bg-black/30 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-white">98.7%</div>
              <div className="text-xs text-white/70">Accuracy Rate</div>
            </div>
            <div className="bg-black/30 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-white">2.1M+</div>
              <div className="text-xs text-white/70">Criminal Records</div>
            </div>
            <div className="bg-black/30 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-white">0.5s</div>
              <div className="text-xs text-white/70">Average Response</div>
            </div>
          </div>
        </div>
      )}

      {result && (
        <div className="w-full bg-black/20 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:shadow-lg transition-all duration-300 animate-fade-in h-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-bold relative group inline-flex ${result.matchFound ? 'text-white' : 'text-white/50'}`}>
              {result.matchFound ? 'Criminal Match Found' : 'No Criminal Match Found'}
              <span className="absolute left-0 bottom-0 w-full h-px bg-white transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </h2>
            <div className="flex items-center">
              <span className="text-xs text-white/50 mr-2">Confidence:</span>
              <div className="bg-black/40 rounded-full h-2 w-24">
                <div 
                  className="bg-white h-full rounded-full"
                  style={{ width: result.matchFound ? '88%' : '23%' }}
                ></div>
              </div>
              <span className="text-xs text-white/50 ml-2">{result.matchFound ? '88%' : '23%'}</span>
            </div>
          </div>

          {result.matchFound && result.criminalData && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <div className="border border-white/20 p-2 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-glow hover:border-white/50 relative group">
                    <img
                      src={imagePreview}
                      alt="Identified Criminal"
                      className="w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute bottom-2 left-2 right-2 bg-black/70 text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Facial features analyzed: 128 points
                    </div>
                  </div>
                  <div className="mt-4 bg-black/30 rounded-lg p-4 border-l-4 border-white/50 relative">
                    <div className="absolute top-2 right-2 flex space-x-1">
                      <div className="h-2 w-2 rounded-full bg-red-500"></div>
                      <div className="h-2 w-2 rounded-full bg-white/40"></div>
                    </div>
                    <h4 className="text-sm font-semibold mb-2 relative group inline-flex">
                      CONFIDENTIAL
                      <span className="absolute left-0 bottom-0 w-full h-px bg-white transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                    </h4>
                    <p className="text-sm text-white/70">
                      The uploaded image has been identified as potentially matching a known criminal. Data is AI-generated for demonstration purposes only.
                    </p>
                  </div>
                </div>

                <div className="md:w-2/3 space-y-4">
                  <div className="bg-black/30 p-5 rounded-lg transition-all duration-300 hover:bg-black/40">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-xl font-bold text-white relative group inline-flex">
                        {result.criminalData.name}
                        <span className="absolute left-0 bottom-0 w-full h-px bg-white transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                      </h3>
                      <div className="bg-black/50 px-3 py-1 rounded-full text-xs font-medium">
                        ID: #CR-{Math.floor(100000 + Math.random() * 900000)}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="bg-black/50 p-3 rounded-lg transition-all duration-300 hover:bg-black/60 group">
                        <span className="font-semibold text-white/70 group-hover:text-white/90 transition-colors duration-300">Age:</span>{' '}
                        <span className="text-white">{result.criminalData.age}</span>
                      </div>
                      <div className="bg-black/50 p-3 rounded-lg transition-all duration-300 hover:bg-black/60 group">
                        <span className="font-semibold text-white/70 group-hover:text-white/90 transition-colors duration-300">Status:</span>{' '}
                        <span className={`${
                          result.criminalData.status.toLowerCase().includes("wanted") ? "text-red-400" :
                          result.criminalData.status.toLowerCase().includes("deceased") ? "text-white/50" : "text-white"
                        }`}>
                          {result.criminalData.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/30 p-5 rounded-lg transition-all duration-300 hover:bg-black/40">
                    <p className="text-white/70 font-semibold mb-1 relative group inline-flex">
                      Crime Type:
                      <span className="absolute left-0 bottom-0 w-full h-px bg-white transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                    </p>
                    <p className="text-white">{result.criminalData.crimeType}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-black/30 p-5 rounded-lg transition-all duration-300 hover:bg-black/40">
                      <p className="text-white/70 font-semibold mb-1 relative group inline-flex">
                        Threat Level:
                        <span className="absolute left-0 bottom-0 w-full h-px bg-white transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                      </p>
                      <div className="flex items-center">
                        <div className="w-full bg-black/50 rounded-full h-2 mr-2">
                          <div 
                            className="bg-red-500 h-full rounded-full"
                            style={{ width: '85%' }}  
                          ></div>
                        </div>
                        <span className="text-red-400 font-medium">High</span>
                      </div>
                    </div>

                    {result.criminalData.lastKnownLocation && (
                      <div className="bg-black/30 p-5 rounded-lg transition-all duration-300 hover:bg-black/40">
                        <p className="text-white/70 font-semibold mb-1 relative group inline-flex">
                          Last Known Location:
                          <span className="absolute left-0 bottom-0 w-full h-px bg-white transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                        </p>
                        <div className="flex items-center">
                          <svg className="h-4 w-4 mr-2 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-white">{result.criminalData.lastKnownLocation}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div
                  className="bg-black/30 p-5 rounded-lg cursor-pointer transition-all duration-300 hover:bg-black/40"
                  onClick={() => toggleSection('story')}
                >
                  <h4 className="text-lg font-bold text-white relative group flex justify-between items-center">
                    <span className="relative group inline-flex">
                      Crime Story
                      <span className="absolute left-0 bottom-0 w-full h-px bg-white transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 transform transition-transform duration-300 ${
                        expandedSections.story ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </h4>
                  {expandedSections.story && (
                    <div className="text-white/80 mt-3 space-y-2 animate-fade-in">
                      <div className="flex items-center mb-2">
                        <div className="h-1 w-1 rounded-full bg-white mr-1"></div>
                        <div className="h-1 w-1 rounded-full bg-white mr-1"></div>
                        <div className="h-1 w-1 rounded-full bg-white mr-2"></div>
                        <span className="text-xs text-white/50">CLASSIFIED INFORMATION</span>
                      </div>
                      <p>{result.criminalData.story}</p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    className="bg-black/30 p-5 rounded-lg cursor-pointer transition-all duration-300 hover:bg-black/40"
                    onClick={() => toggleSection('officer')}
                  >
                    <h4 className="text-lg font-bold text-white relative group flex justify-between items-center">
                      <span className="relative group inline-flex">
                        Officer Assigned
                        <span className="absolute left-0 bottom-0 w-full h-px bg-white transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 transform transition-transform duration-300 ${
                          expandedSections.officer ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </h4>
                    {expandedSections.officer && (
                      <div className="text-white/80 mt-3 animate-fade-in">
                        <div className="bg-black/40 p-3 rounded-lg border border-white/10 flex items-center">
                          <svg className="h-5 w-5 mr-2 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <p>{result.criminalData.officerAssigned}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div
                    className="bg-black/30 p-5 rounded-lg cursor-pointer transition-all duration-300 hover:bg-black/40"
                    onClick={() => toggleSection('victims')}
                  >
                    <h4 className="text-lg font-bold text-white relative group flex justify-between items-center">
                      <span className="relative group inline-flex">
                        Victims
                        <span className="absolute left-0 bottom-0 w-full h-px bg-white transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 transform transition-transform duration-300 ${
                          expandedSections.victims ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </h4>
                    {expandedSections.victims && (
                      <div className="text-white/80 mt-3 animate-fade-in">
                        <div className="bg-black/40 p-3 rounded-lg border border-white/10">
                          <p>{result.criminalData.victims}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {result.criminalData.notableOperations && (
                  <div
                    className="bg-black/30 p-5 rounded-lg cursor-pointer transition-all duration-300 hover:bg-black/40"
                    onClick={() => toggleSection('operations')}
                  >
                    <h4 className="text-lg font-bold text-white relative group flex justify-between items-center">
                      <span className="relative group inline-flex">
                        Notable Operations
                        <span className="absolute left-0 bottom-0 w-full h-px bg-white transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 transform transition-transform duration-300 ${
                          expandedSections.operations ? 'rotate-180' : ''
                        }`}
                        fill="=none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </h4>
                    {expandedSections.operations && (
                      <div className="text-white/80 mt-3 space-y-2 animate-fade-in">
                        <div className="bg-black/40 p-3 rounded-lg border border-white/10">
                          <p>{result.criminalData.notableOperations}</p>
                        </div>
                        <div className="flex items-center justify-end">
                          <div className="text-xs text-white/50 flex items-center">
                            <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            Classified Level 3
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {result.criminalData.knownAssociates && (
                  <div
                    className="bg-black/30 p-5 rounded-lg cursor-pointer transition-all duration-300 hover:bg-black/40"
                    onClick={() => toggleSection('associates')}
                  >
                    <h4 className="text-lg font-bold text-white relative group flex justify-between items-center">
                      <span className="relative group inline-flex">
                        Known Associates
                        <span className="absolute left-0 bottom-0 w-full h-px bg-white transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 transform transition-transform duration-300 ${
                          expandedSections.associates ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </h4>
                    {expandedSections.associates && (
                      <div className="text-white/80 mt-3 animate-fade-in">
                        <div className="bg-black/40 p-3 rounded-lg border border-white/10">
                          <p>{result.criminalData.knownAssociates}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="bg-black/30 p-5 rounded-lg">
                  <h4 className="text-lg font-bold text-white mb-3 relative group inline-flex">
                    Download Report
                    <span className="absolute left-0 bottom-0 w-full h-px bg-white transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    <button 
                      onClick={generatePDFReport}
                      disabled={isDownloading}
                      className={`relative bg-white/10 hover:bg-white/20 border border-white/20 text-white py-2 rounded-lg flex items-center justify-center transition-all duration-300 ${
                        isDownloading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {isDownloading ? (
                        <div className="flex items-center">
                          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          <span>Generating...</span>
                        </div>
                      ) : (
                        <>
                          <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                          </svg>
                          Export Report
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {result.responseText && !result.criminalData && (
            <div className="bg-black/30 p-6 rounded-lg border border-white/20">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-black/50 p-4 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-white/50"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <p className="text-white/80 text-center text-lg mb-6">{result.responseText}</p>
              
              <div className="bg-black/40 p-4 rounded-lg border border-white/10">
                <h4 className="text-sm font-bold mb-2 text-white/70 relative group inline-flex">
                  Analysis Details
                  <span className="absolute left-0 bottom-0 w-full h-px bg-white transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs text-white/60">
                  <div className="bg-black/30 p-2 rounded">
                    <span className="font-medium block">Scan ID:</span>
                    <span>#{Math.floor(1000000 + Math.random() * 9000000)}</span>
                  </div>
                  <div className="bg-black/30 p-2 rounded">
                    <span className="font-medium block">Timestamp:</span>
                    <span>{new Date().toLocaleString()}</span>
                  </div>
                  <div className="bg-black/30 p-2 rounded">
                    <span className="font-medium block">Algorithm Version:</span>
                    <span>FaceMatch 4.2.1</span>
                  </div>
                  <div className="bg-black/30 p-2 rounded">
                    <span className="font-medium block">Database Status:</span>
                    <span className="text-green-400">Updated</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ResultDisplay;