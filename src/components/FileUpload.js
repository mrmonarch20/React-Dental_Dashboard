import React, { useState } from 'react';

const FileUpload = ({ onFilesChange, existingFiles = [] }) => {
  const [files, setFiles] = useState(existingFiles);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    
    selectedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newFile = {
          name: file.name,
          url: event.target.result,
          size: file.size,
          type: file.type
        };
        
        const updatedFiles = [...files, newFile];
        setFiles(updatedFiles);
        onFilesChange(updatedFiles);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  return (
    <div className="form-group">
      <label>Upload Files:</label>
      <input
        type="file"
        multiple
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={handleFileChange}
      />
      
      {files.length > 0 && (
        <div style={{ marginTop: '10px' }}>
          <h4>Files:</h4>
          {files.map((file, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0' }}>
              <span>{file.name}</span>
              <button
                type="button"
                className="btn btn-danger"
                style={{ padding: '2px 8px', fontSize: '12px' }}
                onClick={() => removeFile(index)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;