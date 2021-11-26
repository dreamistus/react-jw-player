function getCurriedOnLoad(existingScript, callback) {
  const previousOnload = existingScript.onload || (() => {});
  return () => {
    previousOnload();
    callback();
  };
}

export default getCurriedOnLoad;
