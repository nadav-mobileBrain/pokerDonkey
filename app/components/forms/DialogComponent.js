import React from 'react'
import Dialog from 'react-native-dialog';

 const DialogComponent=({handleCancel,handleConfirm,titleText,descriptionText})=>{
  return (
         <Dialog.Container visible={true}>
            <Dialog.Title>{titleText}</Dialog.Title>
            <Dialog.Description>
                 {descriptionText}
            </Dialog.Description>
            <Dialog.Button label="No" onPress={handleCancel} />
            <Dialog.Button label="Yes" onPress={handleConfirm} />
          </Dialog.Container>
    );
  }


export default DialogComponent;


