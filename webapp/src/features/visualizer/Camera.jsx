import { Box, Button, Card, Title } from '@mantine/core';
import React, { useRef, useState, useEffect } from "react";

export function Camera() {
  const cameraRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [stream, setStream] = useState(null);

  const startCamera = async () => {
    try {
      const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(videoStream);

      if (cameraRef.current) {
        cameraRef.current.srcObject = videoStream;
        setIsCameraOn(true);
      }
    } catch (error) {
      console.error('Error starting camera:', error);
    }
  };

  const stopCamera = () => {
    if (cameraRef.current) {
      const tracks = cameraRef.current.srcObject.getTracks();

      tracks.forEach(track => track.stop());
      cameraRef.current.srcObject = null;
      setIsCameraOn(false);
    }
  };

  const takePicture = async () => {
    try {
      if (cameraRef.current) {
        const imageCapture = new ImageCapture(stream.getTracks()[0]);
        const photoBlob = await imageCapture.takePhoto();
        const imageUrl = URL.createObjectURL(photoBlob);
        console.log('Picture taken:', imageUrl);
      }
    } catch (error) {
      console.error('Error taking picture:', error);
    }
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        console.log('Current location:', latitude, longitude);
      },
      error => console.error('Error getting location:', error),
    );
  };

  useEffect(() => {
    return () => {
      // Cleanup when component unmounts
      stopCamera();
    };
  }, [stream]);

  return (
    <Card>
      <div>
        {isCameraOn ? (
          <video ref={cameraRef} autoPlay playsInline />
        ) : (
          <div>Camera is off</div>
        )}
        <Button onClick={isCameraOn ? stopCamera : startCamera}>
          {isCameraOn ? 'Turn Off Camera' : 'Turn On Camera'}
        </Button>
        <Button onClick={takePicture}>Take Picture</Button>
        <Button onClick={getLocation}>Get Location</Button>
      </div>
    </Card>
  );
}


/*
import { Button, Card, Title } from '@mantine/core';
import React, { useRef } from "react";

export function Camera() {
  const cameraRef = useRef(null);

  const takePicture = async () => {
    try {
      if (cameraRef.current) {
        const stream = cameraRef.current.srcObject;
        const tracks = stream.getTracks();

        const imageCapture = new ImageCapture(tracks[0]);
        const photoBlob = await imageCapture.takePhoto();
        const imageUrl = URL.createObjectURL(photoBlob);
        console.log('Picture taken:', imageUrl);
      }
    } catch (error) {
      console.error('Error taking picture:', error);
    }
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        console.log('Current location:', latitude, longitude);
      },
      error => console.error('Error getting location:', error),
    );
  };

  const initCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (cameraRef.current) {
        cameraRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error initializing camera:', error);
    }
  };

  React.useEffect(() => {
    initCamera();
  }, []);

  return (
    <Card>
      <div>
        <video ref={cameraRef} autoPlay />
        <Button onClick={takePicture}>Take Picture</Button>
        <Button onClick={getLocation}>Get Location</Button>
      </div>
    </Card>
  );
}
*/
