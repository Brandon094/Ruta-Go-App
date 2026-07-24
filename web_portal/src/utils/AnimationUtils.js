/**
 * 🎨 Utils: AnimationUtils
 * Motor central de micro-interacciones para la web.
 * Basado en UIAnimationUtils.java
 */
export const AnimationUtils = {
  /**
   * Clases de Tailwind para animaciones comunes.
   */
  classes: {
    pulse: "animate-pulse",
    bounce: "animate-bounce",
    fadeIn: "animate-in fade-in duration-700",
    slideInBottom: "animate-in slide-in-from-bottom-4 duration-700",
    zoomIn: "animate-in zoom-in-95 duration-300",
    shake: "animate-shake", // Requiere extensión en tailwind.config
  },

  /**
   * Hook simple para conteo numérico animado (Portado de animateNumericText).
   */
  useAnimatedNumber: (target, duration = 1000) => {
    const [current, setCurrent] = React.useState(0);

    React.useEffect(() => {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setCurrent(Math.floor(progress * target));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }, [target, duration]);

    return current;
  }
};
