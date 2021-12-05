// Pomoc:
// On Open: https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/onopen
// On Message: https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/onmessage

// START - WebSocket
const ws = useRef(null);
useEffect(() => {
  ws.current = new WebSocket("ws://{ADRES_SERWERA_TUTAJ}");
  ws.current.onopen = () => console.log("ws onopen");
  ws.current.onclose = () => console.log("ws onclose");
  ws.current.onmessage = (e) => {
    console.log(e);
    // TODO: Przechwyć wiadomość tutaj.
  };
  const currentWS = ws.current;
  return () => currentWS.close();
}, []);
// END - WebSocket
