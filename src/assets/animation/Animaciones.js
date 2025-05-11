// AnimacionesWeb.js
export const popIn = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 15,
      duration: 0.4,
    },
  },
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: 'easeOut',
    },
  },
};

export const bubbleEffect = {
  whileTap: {
    scale: 1.2,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 10,
    },
  },
};
