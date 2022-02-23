import React, { useState } from "react";

function Upload() {
  const [fileInputState, setFileInputState] = useState('')
  const [selectedFile, setSelectedFile] = useState('')
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file)
  }

  const previewFile = (file) => {
    const reader = new FileReader()
  }

  return(
    <div>
      <form>
        <input type="file" name="image" onChange={handleFileInputChange} value={fileInputState} className="form-input" />
        <button className="btn" type="submit" >Upload</button>
      </form>
    </div>
  )
}

export { Upload };