import React, { useState, useEffect, useRef } from "react";
import { Image, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { toast } from 'react-toastify'
import { createUpload } from "@/api/admin/common";
import type { UploadFile } from 'antd';


interface UploadImageProps {
  onChange: (fileIds: number[]) => void;
  defaultList?: any[];
  multiple?: boolean,
  maxCount?: number
}

const UploadImage: React.FC<UploadImageProps> = ({ onChange, defaultList = [], multiple = false, maxCount = null }) => {
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<any[]>(defaultList);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    if (defaultList.length > 0) {
      setFileList(defaultList);
    }
  }, [defaultList]);

  const handlePreview = async (file: UploadFile) => {
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleRemove = (file: any) => {
    const updatedFileList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(updatedFileList);
    onChange(updatedFileList.map(item => item.uid));
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadFiles = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) {
      return
    }

    if(maxCount && fileList.length + files.length > maxCount) {
      toast.warning(`Tối đa là ${maxCount} ảnh.`)
      return 
    }
    try {
      setLoading(true);
      const fileArray = Array.from(files);
      const uploadPromises = fileArray.map((file) => {
        const formData = new FormData();
        formData.append("file", file);
        return createUpload(formData);
      });

      const responses = await Promise.all(uploadPromises);
      const newImages = responses.map((response) => {
        const { data } = response

        return {
          uid: data.id,
          url: `${data.data.endpoint_url}/${data.path}/${data.filename}`,
        }
      });

      const updatedFileList = multiple ? [...fileList,...newImages] : newImages
      const ids = updatedFileList.map(item => item.uid)
      onChange(ids)
      setFileList(updatedFileList)
    } catch (error: any) {
      console.log("Upload thất bại!", error);
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = () => {
    if (!loading && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div>
      <div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleUploadFiles}
          multiple={multiple}
          accept="image/*"
          style={{ display: "none" }}
        />
        <Button
          type="primary"
          icon={<UploadOutlined />}
          onClick={handleButtonClick}
          loading={loading}
          style={{marginBottom: 10}}
        >
          { loading ? 'Đang tải lên' : 'Tải lên'}
        </Button>
      </div>
      <div>
        <Upload
          listType="picture-card"
          fileList={fileList}
          onRemove={handleRemove}
          onPreview={handlePreview}
        />
        {previewImage && (
          <Image
            wrapperStyle={{ display: 'none' }}
            alt=""
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(''),
            }}
            src={previewImage}
          />
      )}
      </div>
    </div>
    
  );
};

export default UploadImage;
