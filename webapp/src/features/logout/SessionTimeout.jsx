import React, { useState, useEffect } from 'react';
import { Modal, Group, Button, Box } from '@mantine/core';
import { useSeidrAuth } from 'seidr-react';

const HALF_HOUR_IN_SECONDS = 1800;
const HOUR_IN_MINUTES = 60;
const FIVE_MINUTES_IN_SECONDS = 300;
const SECOND_IN_MILLISECONDS = 1000;

export default function SessionTimeout() {
  const [seconds, setSeconds] = useState(HALF_HOUR_IN_SECONDS);
  const [minutes, setMinutes] = useState(0);
  const [remainSeconds, setRemainSeconds] = useState(0);
  const [open, setOpen] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const { signout } = useSeidrAuth();

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1);
    }, SECOND_IN_MILLISECONDS);

    setIntervalId(interval);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const displayMinutes = Math.floor(seconds / HOUR_IN_MINUTES);
    const displaySeconds = seconds % HOUR_IN_MINUTES;
    setMinutes(displayMinutes);
    setRemainSeconds(displaySeconds);
  }, [seconds]);

  useEffect(() => {
    if (seconds <= FIVE_MINUTES_IN_SECONDS) {
      setOpen(true);
    }
    if (seconds <= 0) {
      signout();
      clearInterval(intervalId);
    }
  }, [seconds, signout, remainSeconds, intervalId]);

  const handleClose = () => {
    setSeconds(HALF_HOUR_IN_SECONDS);
    setOpen(false);
  };

  const handleReset = () => {
    setSeconds(HALF_HOUR_IN_SECONDS);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOrKeyPress = () => {
      handleReset();
    };

    document.addEventListener('click', handleClickOrKeyPress);
    document.addEventListener('keypress', handleClickOrKeyPress);

    return () => {
      document.removeEventListener('click', handleClickOrKeyPress);
      document.removeEventListener('keypress', handleClickOrKeyPress);
    };
  });

  return (
    <>
      <Modal opened={open} onClose={handleClose} withCloseButton={false} title='Session Timeout Warning' centered>
        You will be automatically logged out when the timer expires.
        <Box pl={2}>
          <p>Timer: {minutes.toString().padStart(2, '0')}:{remainSeconds.toString().padStart(2, '0')}</p>
        </Box>
        <Group position='right'>
          <Button onClick={handleClose}>Continue</Button>
        </Group>
      </Modal>
    </>
  );
};


