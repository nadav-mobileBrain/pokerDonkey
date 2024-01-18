import client from "./client";

const endpoint = "api/users/";

const register = (userInfo) => {
  if (userInfo.image) {
    const data = new FormData();
    function getFileExtension(filePath) {
      return filePath.substring(filePath.lastIndexOf("."));
    }

    data.append("nickName", userInfo.nickName);
    data.append("password", userInfo.password);
    data.append("image", {
      name: userInfo.nickName + getFileExtension(userInfo.image), /// Add the extension to the file name
      type: "image/jpeg",
      uri:
        Platform.OS === "android"
          ? userInfo.image
          : userInfo.image.replace("file://", ""),
    });
    client.headers["Content-Type"] = "multipart/form-data";

    return client.post("api/users/signup", data);
  } else {
    return client.post("api/users/signup", userInfo);
  }
};
export default {
  register,
};
