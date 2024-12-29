import { endpoints } from './fetch';

export const uploadFile = async (selectedFile) => {
  const formData = new FormData();
  formData.append('file', selectedFile);
  try {
    const reponse = await fetch(endpoints.file, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      body: formData,
    });
    return reponse.json();
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

// export const uploadFiles = async (selectedFiles) => {
//   const formData = new FormData();
//   selectedFiles.forEach((file) => {
//     formData.append('files', file);
//   });
//   return axiosInstance.post(`${endpoints.file}/upload-multiple`, formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   });
// };
