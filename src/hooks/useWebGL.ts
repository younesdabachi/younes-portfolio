/** Détecte une seule fois si WebGL est disponible sur cet appareil. */
export function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      canvas.getContext('webgl2') ?? canvas.getContext('webgl')
    );
  } catch {
    return false;
  }
}
