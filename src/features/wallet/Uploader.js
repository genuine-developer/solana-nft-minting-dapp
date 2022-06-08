import React from "react";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";

const Uploader = ({handleImageChange}) => {
  return (
    <Dropzone
      multiple={false}
      onChangeStatus={handleImageChange}
      accept="image/*"
      inputContent="Upload"
    />
  );
};

export default Uploader;
