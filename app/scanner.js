import { state } from './state.js';

export function startScanner(onDetected) {
  if (state.quaggaRunning) return;

  Quagga.init({}, err => {
    if (err) return console.error(err);

    Quagga.start();
    state.quaggaRunning = true;

    Quagga.offDetected();
    Quagga.onDetected(res => {
      const code = res?.codeResult?.code;
      if (!code) return;

      stopScanner();
      onDetected(code);
    });
  });
}

export function stopScanner() {
  if (!state.quaggaRunning) return;
  Quagga.stop();
  state.quaggaRunning = false;
}