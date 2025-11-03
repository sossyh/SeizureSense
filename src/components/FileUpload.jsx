import { useState } from 'react';
import { 
  Upload, 
  FileText, 
  Brain, 
  Activity, 
  Shield,
  AlertTriangle,
  CheckCircle2,
  Clock
} from 'lucide-react';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [prediction, setPrediction] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPrediction(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('eeg_file', selectedFile);

      // Simulate API call - replace with your actual endpoint
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock prediction results
      const mockPrediction = {
        prediction: Math.random() > 0.7 ? 'Seizure Activity Detected' : 'Normal EEG Pattern',
        confidence: Math.floor(Math.random() * 15) + 85,
        risk_level: Math.random() > 0.7 ? 'HIGH' : 'LOW',
        analysis_time: '2.3s',
        segments_analyzed: 156,
        frequency_bands: {
          delta: Math.random() * 40 + 10,
          theta: Math.random() * 30 + 5,
          alpha: Math.random() * 25 + 5,
          beta: Math.random() * 20 + 5,
          gamma: Math.random() * 15 + 2
        }
      };
      
      setPrediction(mockPrediction);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'HIGH': return 'text-red-600 bg-red-50 border-red-200';
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'LOW': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRiskIcon = (risk) => {
    switch (risk) {
      case 'HIGH': return <AlertTriangle className="w-5 h-5" />;
      case 'MEDIUM': return <Activity className="w-5 h-5" />;
      case 'LOW': return <CheckCircle2 className="w-5 h-5" />;
      default: return <Shield className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Medical Grade Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-xl">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 font-sans">
                  NeuroScan Analyzer
                </h1>
                <p className="text-sm text-gray-600 font-medium">
                  Advanced EEG Seizure Prediction System
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Shield className="w-4 h-4" />
              <span>HIPAA Compliant</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-blue-100">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  EEG File Analysis
                </h2>
                <p className="text-blue-100 text-lg">
                  Upload patient EEG recordings for seizure detection analysis
                </p>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-xl">
                <Upload className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* File Upload Section */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
                Select EEG Recording
              </label>
              
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-400 transition-colors duration-200 bg-gray-50">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".edf,.csv,.txt,.mat,.json,.xdf"
                  className="hidden"
                  id="eeg-file-input"
                />
                <label htmlFor="eeg-file-input" className="cursor-pointer">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                      <FileText className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-700">
                        Choose EEG File
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Supported formats: EDF, CSV, MAT, JSON, XDF
                      </p>
                    </div>
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200">
                      Browse Files
                    </button>
                  </div>
                </label>
              </div>
            </div>

            {/* File Details */}
            {selectedFile && (
              <div className="mb-8 bg-blue-50 rounded-2xl p-6 border border-blue-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-blue-600" />
                  File Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white rounded-xl p-4 border border-blue-100">
                    <p className="text-gray-500 font-medium">File Name</p>
                    <p className="text-gray-800 font-semibold truncate">{selectedFile.name}</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-blue-100">
                    <p className="text-gray-500 font-medium">File Type</p>
                    <p className="text-gray-800 font-semibold">{selectedFile.type || 'EEG Recording'}</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-blue-100">
                    <p className="text-gray-500 font-medium">File Size</p>
                    <p className="text-gray-800 font-semibold">{formatFileSize(selectedFile.size)}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Upload Button */}
            <button
              onClick={handleUpload}
              disabled={!selectedFile || isUploading}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-3 ${
                !selectedFile || isUploading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
              }`}
            >
              {isUploading ? (
                <>
                  <Clock className="w-6 h-6 animate-spin" />
                  <span>Analyzing EEG Data...</span>
                </>
              ) : (
                <>
                  <Activity className="w-6 h-6" />
                  <span>Analyze for Seizure Activity</span>
                </>
              )}
            </button>

            {/* Prediction Results */}
            {prediction && (
              <div className="mt-8 animate-fade-in">
                <div className={`rounded-2xl p-6 border-2 ${getRiskColor(prediction.risk_level)}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold flex items-center">
                      {getRiskIcon(prediction.risk_level)}
                      <span className="ml-2">Analysis Results</span>
                    </h3>
                    <span className={`px-4 py-2 rounded-full font-bold text-sm ${getRiskColor(prediction.risk_level)}`}>
                      {prediction.risk_level} RISK
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-white bg-opacity-50 rounded-xl p-4">
                        <p className="text-sm text-gray-600">Prediction</p>
                        <p className="text-lg font-semibold">{prediction.prediction}</p>
                      </div>
                      <div className="bg-white bg-opacity-50 rounded-xl p-4">
                        <p className="text-sm text-gray-600">Confidence Level</p>
                        <p className="text-lg font-semibold">{prediction.confidence}%</p>
                      </div>
                      <div className="bg-white bg-opacity-50 rounded-xl p-4">
                        <p className="text-sm text-gray-600">Analysis Time</p>
                        <p className="text-lg font-semibold">{prediction.analysis_time}</p>
                      </div>
                    </div>
                    
                    <div className="bg-white bg-opacity-50 rounded-xl p-4">
                      <p className="text-sm text-gray-600 mb-3">EEG Frequency Bands</p>
                      <div className="space-y-2">
                        {Object.entries(prediction.frequency_bands).map(([band, value]) => (
                          <div key={band} className="flex items-center justify-between">
                            <span className="text-sm font-medium capitalize">{band}</span>
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${Math.min(value, 100)}%` }}
                              ></div>
                            </div>
                            <span className="text-xs font-semibold w-8 text-right">{value.toFixed(1)}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-current border-opacity-20">
                    <p className="text-sm opacity-75">
                      <strong>Note:</strong> {prediction.segments_analyzed} EEG segments analyzed. 
                      This analysis is for clinical support and should be reviewed by a qualified neurologist.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Medical Disclaimer */}
            <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-amber-800 font-medium">
                    Medical Disclaimer
                  </p>
                  <p className="text-xs text-amber-700 mt-1">
                    This tool provides analytical support for healthcare professionals. 
                    All results should be interpreted by qualified medical personnel. 
                    Not for diagnostic use without clinical correlation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default FileUpload;