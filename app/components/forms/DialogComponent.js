import React from 'react';
import Dialog from 'react-native-dialog';

const DialogComponent = ({
  handleCancel,
  handleConfirm,
  titleText,
  descriptionText,
}) => {
  return (
    <Dialog.Container visible={true}>
      <Dialog.Title style={{ color: 'black' }}>{titleText}</Dialog.Title>
      <Dialog.Description style={{ color: 'black' }}>
        {descriptionText}
      </Dialog.Description>
      <Dialog.Button label="No" onPress={handleCancel} />
      <Dialog.Button label="Yes" onPress={handleConfirm} />
    </Dialog.Container>
  );
};

export default DialogComponent;
