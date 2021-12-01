type InstallPlayerScriptArgs = {
  context: Document;
  onLoadCallback: VoidFunction;
  scriptSrc: string;
  uniqueScriptId: string;
};

function installPlayerScript({ 
  context, 
  onLoadCallback, 
  scriptSrc, 
  uniqueScriptId }: InstallPlayerScriptArgs
): void {
  const jwPlayerScript = context.createElement('script');
  jwPlayerScript.id = uniqueScriptId;
  jwPlayerScript.src = scriptSrc;
  jwPlayerScript.onload = onLoadCallback;

  context.head.appendChild(jwPlayerScript);
}

export default installPlayerScript;
