import { useEffect } from 'react';

export const useBootstrap = () => {
    useEffect(() => {
        // Crear el elemento link para el CSS de Bootstrap
        const bootstrapStyle = document.createElement('link');
        bootstrapStyle.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css';
        bootstrapStyle.rel = 'stylesheet';
        bootstrapStyle.integrity = 'sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65';
        bootstrapStyle.crossOrigin = 'anonymous';
        document.head.appendChild(bootstrapStyle);
    
        // Crear el elemento script para el JS de Bootstrap
        const bootstrapScript = document.createElement('script');
        bootstrapScript.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js';
        bootstrapScript.integrity = 'sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4';
        bootstrapScript.crossOrigin = 'anonymous';
        document.body.appendChild(bootstrapScript);
    
        return () => {
          // Remover el CSS y el JS de Bootstrap al desmontar el componente
          document.head.removeChild(bootstrapStyle);
          document.body.removeChild(bootstrapScript);
        };
      }, []);
}
