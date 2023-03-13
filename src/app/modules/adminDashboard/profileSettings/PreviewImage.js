import React, { useState } from "react";

const PreviewImage = ({ file }, isUrl = false, url = "") => {
  const [preview, setPreview] = useState(null);
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    setPreview(reader.result);
  };
  return (
    <div className="image-preview">
      {preview ? <img src={preview} /> : "loading...."}
    </div>
  );
};

export default PreviewImage;
