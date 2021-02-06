import React, { useEffect, useState } from 'react'
import {Upload,message} from 'antd';
import {LoadingOutlined, PlusOutlined } from '@ant-design/icons';


function getBase64(fileList, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(fileList);
}
function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

const UploadFile = (props) => {
    const [loading, setLoading] = useState(false)
    const [fileList, setFileList] = useState(props.parrentUploadFileList)
    const [urlImage, setUrlImage] = useState(props.parrentUploadFileList)
    useEffect(() => setUrlImage(props.parrentUploadFileList),[props.parrentUploadFileList])

    // const handleImageChange = info =>{
    //   let fileList = [...info.fileList];
    //     fileList = fileList.slice();
    //     fileList = fileList.map(file => {
    //       getBase64(info.file.originFileObj, z => setThumbUrlImage(thumbUrlImage),);
    //       if (file.response){
    //         file.sizeImage = file.size
    //         file.thumbUrlImage = file.thumbUrl
    //         file.nameImage =file.name
    //         file.uidImage = file.uid
    //       }
    //           return file;
    //       })
    //     setFileList(fileList)
    //   props.onUploadFileListResult(fileList)
    // };
    // const onChange = ({ fileList: newFileList }) => {
    //   setFileList(newFileList);
    // }
    const onhandleImageChange = info => {
        if (info.file.status === 'uploading') {
            setLoading(true)
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, urlImage  =>
              setUrlImage(urlImage),
              setLoading(false)
            );
        }
        console.log(info)
        // props.onUploadFileListResult(fileList)
    };
  
    useEffect (() => props.onUploadFileListResult(urlImage), [urlImage])
   
    const uploadButton = (
      <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>Upload</div>
      </div>
  );

    console.log('urlImage >>',urlImage);

      return (
        <React.Fragment>
           <Upload
                tabIndex={1}
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={true}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={onhandleImageChange}
            >
                {uploadButton}
            </Upload>
        </React.Fragment>
          
      );
      
}
export default UploadFile