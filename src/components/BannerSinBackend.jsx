import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function BannerSinBackend({
  mensaje = 'Página sin backend desviado',
}) {
  const controls = useAnimation();
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [positions, setPositions] = useState({ startX: 0, endX: 0 });

  useEffect(() => {
    const containerWidth = containerRef.current.offsetWidth;
    const textWidth = textRef.current.offsetWidth;

    const startX = containerWidth;
    const endX = -textWidth;

    setPositions({ startX, endX });

    controls.start({
      x: [startX, endX],
      transition: {
        duration: 12,
        ease: 'linear',
        repeat: Infinity,
      },
    });
  }, [controls, mensaje]); // <- Se vuelve a calcular si cambia el mensaje

  return (
    <div
      ref={containerRef}
      className="relative w-full h-12 bg-yellow-200 overflow-hidden flex items-center"
    >
      <motion.div
        ref={textRef}
        className="absolute whitespace-nowrap font-semibold text-black text-lg"
        animate={controls}
      >
        {mensaje}
      </motion.div>
    </div>
  );
}
