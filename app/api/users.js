import client from "./client";
import { Platform } from "react-native";

const endpoint = "api/users";

const googleSignin = (userInfo) => {
  return client.post(`${endpoint}/googleSignin`, userInfo);
}

const checkNotification = (userId) => {
  return client.get(`${endpoint}/checkNotification/${userId}`);
}

// const register = (userInfo) => {
//   if (userInfo.image) {
//     const data = new FormData();
//     function getFileExtension(filePath) {
//       return filePath.substring(filePath.lastIndexOf("."));
//     }

//     data.append("nickName", userInfo.nickName);
//   //  data.append("password", userInfo.password);
//     data.append("image", {
//       name: userInfo.nickName + getFileExtension(userInfo.image), /// Add the extension to the file name
//       type: "image/jpeg",
//       uri:
//         Platform.OS === "android"
//           ? userInfo.image
//           : userInfo.image.replace("file://", ""),
//     });
//     client.headers["Content-Type"] = "multipart/form-data";

//     return client.post(`${endpoint}/signup`, data);
//   } else {
//     return client.post(`${endpoint}/signup`, userInfo);
//   }
// };

const updatePersonaldetails = (userInfo) => {
  if (userInfo.image) {
    const data = new FormData();

    function getFileExtension(filePath) {
      return filePath.substring(filePath.lastIndexOf("."));
    }

    data.append("nickName", userInfo.nickName);
    data.append("userId", userInfo.userId);

    data.append("image", {
      name: userInfo.nickName + getFileExtension(userInfo.image), /// Add the extension to the file name
      type: "image/jpeg",
      uri:
        Platform.OS === "android"
          ? userInfo.image
          : userInfo.image.replace("file://", ""),
    });
    client.headers["Content-Type"] = "multipart/form-data";

    return client.put(`${endpoint}/updatePersonaldetails`, data);
  } else {
    return client.put(`${endpoint}/updatePersonaldetails`, userInfo);
  }
};

const updateExpoPushToken = (userId, expoPushToken) => {

   return client.put(`${endpoint}/updateExpoPushToken/${userId}`, {
     expoPushToken,
   });

}


const getPersonalStats = (userId) => {
  return client.get(`${endpoint}/personalStats/${userId}`);
};


export default {
  // register,
  getPersonalStats,
  updatePersonaldetails,
  updateExpoPushToken,
  googleSignin,
  checkNotification,
};
