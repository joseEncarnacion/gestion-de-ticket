// import React from 'react';

// const getImageUrl = (folder, image) => {
//   return `http://10.0.2.2:5051/api/v1/Images/%20?folderName=${folder}&imageName=${image}`;
// };

// const SearchImage = ({ folder, imageName }) => {
//   const imageUrl = getImageUrl(folder, imageName);

//   return (
//     <div>
//       <img src={imageUrl} alt="Searched" />
//     </div>
//   );
// };

// export default SearchImage;

const SearchImage = ({ folder }) => {
    const getImage = (image) => {
      const apiRoute = `http://10.0.2.2:5051/api/v1/Images/%20?folderName=${folder}&imageName=${image}`;
      return apiRoute;
    };
  
    return {
      getImage,
    };
  };
  
  export default SearchImage;
  
