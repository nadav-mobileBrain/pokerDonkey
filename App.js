import Screen from "./app/components/Screen";

import React, { useState, useEffect } from "react";
import ImageInputList from "./app/components/forms/ImageInputList";

export default function App() {
  const [imageUris, setImageUris] = useState([]);

  const handleAdd = (uri) => {
    setImageUris([...imageUris, uri]);
  };

  const handleRemove = (uri) => {
    setImageUris(imageUris.filter((imageUri) => imageUri !== uri));
  };

  return (
    <Screen>
      <ImageInputList
        imageUris={imageUris}
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
        // onRemoveImage={(uri) => setImageUris(imageUris.filter((imageUri) => imageUri !== uri))}
        // onAddImage={(uri) => setImageUris([...imageUris, uri])}
      />
    </Screen>
  );
}
