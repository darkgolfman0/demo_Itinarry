// import React, { useEffect, useState } from 'react'
// import API from '../../../services/apiRoot'
// import { Card, Typography } from 'antd';
// import { EditableTable } from './EditableTable'
// import  SolveEditable  from './SolveEditable'

// import styles from '../../../App.css'

// const { Title } = Typography

// function User_Manage() {
//   const [dataSource, setDataSource] = useState([]);
//   const [name_title, setNameTitle] = useState('');
//   const [display_name, setDisplayName] = useState('');
//   const [role, setRole] = useState('');
//   const [active, setActive] = useState('');

//   useEffect(() => {
//     API.get(`api/usermanage`).then(async (response) => {
//       console.log('api response ==>', response.data)
//       await setDataSource(response.data)
//             setNameTitle(response.data.map(res => res.name_title))
//             setDisplayName(response.data.map(res => res.display_name))
//             setRole(response.data.map(res => res.role))
//             setActive(response.data.map(res => res.active))
//     })
//   }, [])



//   // dataSource.map(res => {
//   //   console.log(res.name_title)
//   // })

//   return (

//     <React.Fragment>
//       {/* <SolveEditable dataSource = {dataSource}/> */}
//       <EditableTable dataSource={dataSource} />

//     </React.Fragment>
//   );
// }
// export default User_Manage;

import React, { useState } from 'react'
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const ImageList = {
    key: "0",
    imageName: "",
    imageStatus: "done",
    url: "",
  }

function getBase64(fileList, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(fileList);
  }

const UploadFiles = (props, state) => {
    const [fileList, setfileList] = useState(ImageList)
    const [url, setUrl] = useState(ImageList.url)
  
    const handleImageChange = info => {
      let fileList = [...info.fileList];
      fileList = fileList.slice(file => {
        getBase64(info.file.originFileObj, url => 
            setUrl(url),
            
          );
        if (file.response){
          file.url = file.response.url;
          file.imageName = file.response.name;
          file.imageStatus = file.response.status;
        }
        return file;
      });
      setfileList({fileList})
      this.props.onChildResult(fileList)
    }
    const propsimg = {
      name: 'file',
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      onChange: this.handleImageChange,
      headers: {
          authorization: 'authorization-text',
      },
      multiple: true
  };

    return (
      <React.Fragment>
          <Upload
              {...propsimg}
              src={this.state.url}
              onChange={this.handleImageChange}
              value={this.state.fileList}
              name={this.state.imageName}
          >
              <Button icon={<UploadOutlined />} style={{ fontSize: "12px" }}  ></Button>
          </Upload>

      </React.Fragment>
    )
}
  


export default UploadFiles