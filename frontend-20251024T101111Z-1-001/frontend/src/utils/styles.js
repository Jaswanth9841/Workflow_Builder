// styles.js
// Reusable style objects and style generators
// --------------------------------------------------

import { COLORS, GRADIENTS, ANIMATION_DURATION } from './constants';

// ============ BUTTON STYLES ============

export const buttonStyles = {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: '600',
    borderRadius: '8px',
    cursor: 'pointer',
    border: 'none',
    transition: `all ${ANIMATION_DURATION.BUTTON_HOVER} ease`,
    outline: 'none',
  },
  
  primary: {
    background: GRADIENTS.PURPLE,
    color: '#ffffff',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  
  secondary: {
    background: '#f3f4f6',
    color: '#374151',
    border: '1px solid #d1d5db',
  },
  
  success: {
    background: GRADIENTS.GREEN,
    color: '#ffffff',
    boxShadow: '0 4px 6px rgba(16, 185, 129, 0.2)',
  },
  
  danger: {
    background: GRADIENTS.RED,
    color: '#ffffff',
    boxShadow: '0 4px 6px rgba(239, 68, 68, 0.2)',
  },
  
  warning: {
    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    color: '#ffffff',
  },
  
  info: {
    background: GRADIENTS.BLUE,
    color: '#ffffff',
  },
  
  ghost: {
    background: 'transparent',
    color: COLORS.PRIMARY,
    border: `2px solid ${COLORS.PRIMARY}`,
  },
  
  link: {
    background: 'transparent',
    color: COLORS.PRIMARY,
    padding: '4px 8px',
    textDecoration: 'underline',
  },
};

// Hover states for buttons
export const buttonHoverStyles = {
  primary: {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
  },
  
  secondary: {
    background: '#e5e7eb',
    borderColor: '#9ca3af',
  },
  
  success: {
    transform: 'scale(1.02)',
  },
  
  danger: {
    transform: 'scale(1.05)',
  },
  
  ghost: {
    background: `${COLORS.PRIMARY}15`,
  },
};

// ============ CARD STYLES ============

export const cardStyles = {
  base: {
    background: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    padding: '16px',
    transition: `all ${ANIMATION_DURATION.THEME_TRANSITION}`,
  },
  
  elevated: {
    background: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    padding: '24px',
  },
  
  bordered: {
    background: '#ffffff',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    padding: '16px',
  },
  
  gradient: {
    background: GRADIENTS.PURPLE,
    borderRadius: '12px',
    padding: '16px',
    color: '#ffffff',
  },
  
  dark: {
    background: '#1f2937',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
    padding: '16px',
    color: '#f3f4f6',
  },
};

// ============ INPUT STYLES ============

export const inputStyles = {
  base: {
    padding: '10px 14px',
    fontSize: '14px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    background: '#ffffff',
    color: '#1f2937',
    outline: 'none',
    transition: `all ${ANIMATION_DURATION.HOVER} ease`,
  },
  
  focus: {
    borderColor: COLORS.PRIMARY,
    boxShadow: `0 0 0 3px ${COLORS.PRIMARY}20`,
  },
  
  error: {
    borderColor: COLORS.ERROR,
    boxShadow: `0 0 0 3px ${COLORS.ERROR}20`,
  },
  
  success: {
    borderColor: COLORS.SUCCESS,
    boxShadow: `0 0 0 3px ${COLORS.SUCCESS}20`,
  },
  
  disabled: {
    background: '#f3f4f6',
    color: '#9ca3af',
    cursor: 'not-allowed',
  },
};

// ============ NODE STYLES ============

export const nodeStyles = {
  base: {
    minWidth: '200px',
    minHeight: '80px',
    borderRadius: '12px',
    padding: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    color: '#ffffff',
    transition: `all ${ANIMATION_DURATION.HOVER} ease`,
  },
  
  header: {
    fontSize: '12px',
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '8px',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
  },
  
  body: {
    fontSize: '13px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    padding: '8px',
    backdropFilter: 'blur(10px)',
  },
  
  deleteButton: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    background: COLORS.ERROR,
    border: '2px solid #ffffff',
    color: '#ffffff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 'bold',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    transition: `all ${ANIMATION_DURATION.HOVER} ease`,
    zIndex: 10,
  },
  
  deleteButtonHover: {
    transform: 'scale(1.1)',
    background: '#dc2626',
  },
};

// ============ HANDLE STYLES ============

export const handleStyles = {
  input: {
    background: '#48bb78',
    width: '12px',
    height: '12px',
    border: '2px solid #ffffff',
    borderRadius: '50%',
    transition: `all ${ANIMATION_DURATION.HOVER} ease`,
  },
  
  output: {
    background: '#4299e1',
    width: '12px',
    height: '12px',
    border: '2px solid #ffffff',
    borderRadius: '50%',
    transition: `all ${ANIMATION_DURATION.HOVER} ease`,
  },
  
  hover: {
    transform: 'scale(1.3)',
  },
  
  connecting: {
    background: COLORS.PRIMARY,
    transform: 'scale(1.5)',
  },
};

// ============ EDGE STYLES ============

export const edgeStyles = {
  default: {
    stroke: '#2d3748',
    strokeWidth: 3,
    transition: `all ${ANIMATION_DURATION.HOVER} ease`,
  },
  
  hover: {
    stroke: COLORS.PRIMARY,
    strokeWidth: 4,
  },
  
  selected: {
    stroke: COLORS.PRIMARY,
    strokeWidth: 4,
  },
  
  animated: {
    strokeDasharray: '5',
    animation: 'dashdraw 0.5s linear infinite',
  },
  
  deleteButton: {
    width: '28px',
    height: '28px',
    background: COLORS.ERROR,
    border: '2px solid #ffffff',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: 'bold',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
    transition: `all ${ANIMATION_DURATION.HOVER} ease`,
  },
  
  deleteButtonHover: {
    background: '#dc2626',
    transform: 'scale(1.1)',
    boxShadow: '0 6px 8px rgba(0, 0, 0, 0.3)',
  },
};

// ============ LAYOUT STYLES ============

export const layoutStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    background: '#f9fafb',
    fontFamily: 'Inter, sans-serif',
  },
  
  header: {
    background: '#ffffff',
    borderBottom: '1px solid #e5e7eb',
    padding: '16px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
  },
  
  sidebar: {
    width: '280px',
    background: '#ffffff',
    borderRight: '1px solid #e5e7eb',
    padding: '16px',
    overflowY: 'auto',
    boxShadow: '2px 0 4px rgba(0, 0, 0, 0.05)',
  },
  
  mainContent: {
    flex: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  
  footer: {
    background: '#ffffff',
    borderTop: '1px solid #e5e7eb',
    padding: '12px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
};

// ============ BADGE STYLES ============

export const badgeStyles = {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '4px 12px',
    fontSize: '12px',
    fontWeight: '600',
    borderRadius: '12px',
    gap: '4px',
  },
  
  primary: {
    background: `${COLORS.PRIMARY}15`,
    color: COLORS.PRIMARY,
  },
  
  success: {
    background: `${COLORS.SUCCESS}15`,
    color: COLORS.SUCCESS,
  },
  
  error: {
    background: `${COLORS.ERROR}15`,
    color: COLORS.ERROR,
  },
  
  warning: {
    background: `${COLORS.WARNING}15`,
    color: COLORS.WARNING,
  },
  
  info: {
    background: `${COLORS.INFO}15`,
    color: COLORS.INFO,
  },
  
  neutral: {
    background: '#f3f4f6',
    color: '#6b7280',
  },
};

// ============ MODAL STYLES ============

export const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(4px)',
  },
  
  content: {
    background: '#ffffff',
    borderRadius: '16px',
    padding: '24px',
    maxWidth: '600px',
    width: '90%',
    maxHeight: '80vh',
    overflow: 'auto',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    animation: 'slideUp 0.2s ease',
  },
  
  header: {
    fontSize: '20px',
    fontWeight: '700',
    marginBottom: '16px',
    color: '#1f2937',
  },
  
  body: {
    fontSize: '14px',
    color: '#4b5563',
    marginBottom: '20px',
  },
  
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '12px',
  },
};

// ============ TOOLTIP STYLES ============

export const tooltipStyles = {
  base: {
    position: 'absolute',
    background: '#1f2937',
    color: '#ffffff',
    padding: '8px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '500',
    whiteSpace: 'nowrap',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
    zIndex: 100,
    pointerEvents: 'none',
  },
  
  arrow: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderStyle: 'solid',
  },
};

// ============ LOADING STYLES ============

export const loadingStyles = {
  spinner: {
    border: '3px solid rgba(0, 0, 0, 0.1)',
    borderTop: `3px solid ${COLORS.PRIMARY}`,
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    animation: 'spin 1s linear infinite',
  },
  
  skeleton: {
    background: 'linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s ease-in-out infinite',
    borderRadius: '4px',
  },
  
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(255, 255, 255, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
};

// ============ ANIMATION KEYFRAMES (for CSS-in-JS) ============

export const animations = {
  slideUp: `
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,
  
  slideDown: `
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,
  
  fadeIn: `
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `,
  
  spin: `
    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `,
  
  shimmer: `
    @keyframes shimmer {
      from {
        background-position: 200% 0;
      }
      to {
        background-position: -200% 0;
      }
    }
  `,
  
  pulse: `
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }
  `,
};

// ============ RESPONSIVE BREAKPOINTS ============

export const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// ============ SHADOW LEVELS ============

export const shadows = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  base: '0 4px 6px rgba(0, 0, 0, 0.1)',
  md: '0 6px 8px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px rgba(0, 0, 0, 0.15)',
  inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
};

