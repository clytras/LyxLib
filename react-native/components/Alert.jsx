import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { showOverlay, dismissOverlay } from '../helpers/rnn';


let lastAlertComponentId = '';
let onShowPromise = null;

export function showAlert(props) {
  return new Promise(resolve => {
    showOverlay('Alert', props);
    onShowPromise = resolve;
  });
}

export function closeAlert() {
  return new Promise(async resolve => {
    if(lastAlertComponentId) {
      try {
        await dismissOverlay(lastAlertComponentId);
      } catch(error) {}
      lastAlertComponentId = '';
    }
    resolve();
  });
}

export default function({
  componentId,
  showProgress = false,
  title,
  message,
  customView,
  closeOnTouchOutside = true,
  closeOnHardwareBackPress = true,
  showCancelButton = false,
  showConfirmButton = true,
  cancelText,
  confirmText,
  confirmButtonColor = '#AEDEF4',
  cancelButtonColor = '#D0D0D0',
  contentContainerStyle = {},

  onConfirmPressed,
  onCancelPressed
}) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if(onShowPromise) {
      setTimeout(() => {
        onShowPromise();
        onShowPromise = null;
      }, 50);
    }
  }, []);

  useEffect(() => {
    lastAlertComponentId = componentId;
  }, [componentId]);

  const handleConfirmPress = () => {
    setShow(false);
    onConfirmPressed && onConfirmPressed();
  }

  const handleCancelPress = () => {
    setShow(false);
    onCancelPressed && onCancelPressed();
  }

  const handleDismiss = () => {
    dismissOverlay(componentId);
  }

  return (
    <AwesomeAlert
      show={show}
      showProgress={showProgress}
      title={title}
      message={message}
      customView={customView}
      closeOnTouchOutside={closeOnTouchOutside}
      closeOnHardwareBackPress={closeOnHardwareBackPress}
      showCancelButton={showCancelButton}
      showConfirmButton={showConfirmButton}
      cancelText={cancelText}
      confirmText={confirmText}
      confirmButtonColor={confirmButtonColor}
      cancelButtonColor={cancelButtonColor}
      contentContainerStyle={[styles.contentContainerStyle, contentContainerStyle]}
      onCancelPressed={handleCancelPress}
      onConfirmPressed={handleConfirmPress}
      onDismiss={handleDismiss}
    />
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    width: '90%'
  }
});
