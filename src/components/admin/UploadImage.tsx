import React, { useState, useEffect, useRef } from "react";
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { createUpload } from "@/api/admin/common";

interface UploadImageProps {
  onChange: (fileIds: number[]) => void;
  defaultList?: any[];
  multiple?: boolean,
  maxCount?: number
}

const UploadImage: React.FC<UploadImageProps> = ({ onChange, defaultList = [], multiple = false, maxCount = null }) => {
  const [loading, setLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>(defaultList); // File đã upload thành công

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined style={{fontSize: 20}} /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Tải lên</div>
    </button>
  );
  

  // Gửi file lên server
  const customUpload: UploadProps["customRequest"] = async ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append("file", file as Blob);

    try {
      setLoading(true);
      const response = await createUpload(formData);
      const { path, filename, id } = response.data;
      const url = `${path}/${filename}`;

      const newFile = { uid: id, name: filename, status: "done", url };
      let uploadIds = [...uploadedFiles, newFile].map(item => item.uid);
      onChange(uploadIds)

      setUploadedFiles((prevFiles) => [...prevFiles, newFile]);

      onSuccess?.(response.data);
    } catch (error: any) {
      console.log("Upload thất bại!");
      onError?.(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = (file: any) => {
    const updatedFileList = uploadedFiles.filter((item) => item.uid !== file.uid);
    let uploadIds = updatedFileList.map(item => item.uid);
    onChange(uploadIds)
    setUploadedFiles(updatedFileList);
  };

  return (
    <Upload
      listType="picture-card"
      fileList={uploadedFiles}
      customRequest={customUpload}
      onRemove={handleRemove}
      maxCount={10}
      multiple={multiple}
      accept="image/*"
    >
      { (multiple ? (!maxCount || uploadedFiles.length < maxCount) : (uploadedFiles.length === 0))  && uploadButton }
    </Upload>
  );
};

export default UploadImage;
