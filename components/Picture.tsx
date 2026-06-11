import React from 'react';

type PictureSource = {
  sources: Record<string, string>; // formato -> srcset (ex.: { avif: "...", webp: "..." })
  img: { src: string; w: number; h: number };
};

interface PictureProps {
  source: PictureSource;
  alt: string;
  sizes: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
}

// <picture> com AVIF -> WebP (srcset responsivo). O wrapper usa display:contents
// (classe "contents") para ser transparente ao layout: o <img> interno se comporta
// exatamente como antes, preservando o estilo/posicionamento existente.
const Picture: React.FC<PictureProps> = ({
  source, alt, sizes, className, width, height, loading = 'lazy', fetchPriority,
}) => (
  <picture className="contents">
    {source.sources.avif && <source type="image/avif" srcSet={source.sources.avif} sizes={sizes} />}
    {source.sources.webp && <source type="image/webp" srcSet={source.sources.webp} sizes={sizes} />}
    <img
      src={source.img.src}
      alt={alt}
      sizes={sizes}
      width={width ?? source.img.w}
      height={height ?? source.img.h}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      className={className}
    />
  </picture>
);

export default Picture;
