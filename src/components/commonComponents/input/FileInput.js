import React, { useState } from 'react'

function FileInput({accept,id,text,handleFunc}) {
    let [file,setFile] = useState(false);

    const onChange = (e) => {
        console.log(e.target.files[0].name);
        setFile(true);
        handleFunc(e.target.files[0]);
    }

  return (
    <>
      <label htmlFor={id} className={`custom-input ${!file && 'label-input'}`}>
        {file?'File Uploaded':text}
      </label>
      <input 
        id={id} 
        accept={accept} 
        type='file' 
        style={{display:'none'}} 
        onChange={onChange}
      />
    </>
  )
}

export default FileInput;
