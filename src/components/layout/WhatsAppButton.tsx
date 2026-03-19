'use client';

import { useState } from 'react';

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <style jsx global>{`
        @keyframes wa-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.5); }
          50% { box-shadow: 0 0 0 12px rgba(37, 211, 102, 0); }
        }
        @keyframes wa-live-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }
        @keyframes wa-slide-in {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes wa-glow {
          0%, 100% { box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3), 0 0 0 0 rgba(37, 211, 102, 0.4); }
          50% { box-shadow: 0 4px 25px rgba(37, 211, 102, 0.5), 0 0 0 8px rgba(37, 211, 102, 0); }
        }
      `}</style>

      <a
        href="https://wa.me/905446732202"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp ile iletişim"
        title="WhatsApp ile iletişim"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
          color: 'white',
          borderRadius: '50px',
          padding: isHovered ? '12px 22px 12px 16px' : '14px',
          textDecoration: 'none',
          cursor: 'pointer',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          animation: 'wa-glow 2.5s ease-in-out infinite',
          border: 'none',
          outline: 'none',
          overflow: 'hidden',
          whiteSpace: 'nowrap' as React.CSSProperties['whiteSpace'],
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        }}
      >
        {/* WhatsApp Icon */}
        <svg
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
          style={{
            flexShrink: 0,
            filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))',
          }}
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.594-.838-6.317-2.236l-.442-.37-3.24 1.085 1.085-3.24-.37-.442A9.944 9.944 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
        </svg>

        {/* Text + Live indicator */}
        {isHovered && (
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              animation: 'wa-slide-in 0.3s ease-out forwards',
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '0.3px',
            }}
          >
            <span>Bize Yazın</span>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '20px',
                padding: '2px 8px 2px 6px',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.5px',
                textTransform: 'uppercase' as React.CSSProperties['textTransform'],
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#ff4444',
                  animation: 'wa-live-dot 1.2s ease-in-out infinite',
                  display: 'inline-block',
                }}
              />
              LIVE
            </span>
          </span>
        )}
      </a>
    </>
  );
}
