import React from 'react';
import Image, { ImageProps } from 'next/image';
import { useState, useEffect } from 'react';

interface OptimizedImageProps extends Omit<ImageProps, 'onError' | 'onLoad'> {
  fallback?: string;
}

/**
 * Componente de Imagem Otimizada
 * Wrapper em torno do Next/Image com suporte a fallback de erro e estado de carregamento (skeleton).
 */
export const OptimizedImage = ({
  src,
  alt,
  fallback = '/img/placeholder.svg',
  className = '',
  width,
  height,
  priority = false,
  ...props
}: OptimizedImageProps) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState(fallback);

  // Verifica se a imagem carrega corretamente
  useEffect(() => {
    const img = new window.Image();
    img.src = src as string;
    img.onload = () => {
      setImgSrc(src as string);
      setLoading(false);
    };
    img.onerror = () => {
      setError(true);
      setLoading(false);
    };
  }, [src]);

  return (
    <div 
      className={`relative w-full h-full ${loading ? 'animate-pulse bg-gray-200 dark:bg-gray-700' : ''}`}
      style={{ width: '100%', height: '100%' }}
    >
      <Image
        src={error ? fallback : imgSrc}
        alt={alt}
        fill
        className={`${className} ${loading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}
        loading={priority ? undefined : 'lazy'}
        priority={priority}
        {...props}
      />
    </div>
  );
};
