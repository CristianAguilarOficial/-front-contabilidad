import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: 'transparent',
        },
        fullScreen: { enable: true, zIndex: 0 },
        particles: {
          color: { value: '#03d800' }, // verde más intenso para detalles
          links: {
            enable: true,
            color: '#3b9f70',
            distance: 150,
            opacity: 0.4,
            width: 1,
          },
          move: { enable: true, speed: 1 },
          number: { value: 25 },
          opacity: { value: 0.5 },
          shape: { type: 'circle' },
          size: { value: 3 },
        },
      }}
    />
  );
}

export default ParticlesBackground;
