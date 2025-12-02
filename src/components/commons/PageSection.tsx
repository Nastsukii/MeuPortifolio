import React, { ReactNode } from 'react';

interface PageSectionProps {
  isBoxed?: boolean;
  bgImage?: string;
  bgColor?: string;
  numColumns?: 1 | 2 | 3 | 4;
  gap?: string;
  maxWidth?: string;
  hPadding?: string;
  vPadding?: string;
  title?: string;
  subtitle?: string;
  ctaBtnText?: string;
  ctaBtnLink?: string;
  ctaContrastBtnText?: string;
  ctaContrastBtnLink?: string;
  ctaContrastBtnPosition?: "left" | "right" | "center";
  children: ReactNode;
  className?: string;
}

export const PageSection = ({
  isBoxed = false,
  bgImage,
  bgColor = "bg-white dark:bg-gray-900",
  numColumns = 1,
  gap = "gap-6",
  maxWidth = "max-w-6xl",
  hPadding = "px-6 md:px-8",
  vPadding = "py-12 md:py-16",
  title,
  subtitle,
  ctaBtnText,
  ctaBtnLink,
  ctaContrastBtnText,
  ctaContrastBtnLink,
  ctaContrastBtnPosition = "center",
  children,
  className = "",
}: PageSectionProps) => {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  const ctaPosition = {
    left: "justify-start",
    right: "justify-end",
    center: "justify-center",
  };

  return (
    <section
      className={`${bgColor} ${vPadding} ${className}`}
      style={bgImage ? { backgroundImage: `url(${bgImage})` } : undefined}
    >
      {bgImage && (
        <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />
      )}
      <div className={`relative ${isBoxed ? `${maxWidth} mx-auto` : ""} ${hPadding}`}>
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className={`grid ${gridCols[numColumns]} ${gap}`}>
          {children}
        </div>

        {(ctaBtnText || ctaContrastBtnText) && (
          <div className={`flex flex-wrap ${ctaPosition[ctaContrastBtnPosition]} gap-4 mt-12`}>
            {ctaBtnText && ctaBtnLink && (
              <a
                href={ctaBtnLink}
                className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                {ctaBtnText}
              </a>
            )}
            {ctaContrastBtnText && ctaContrastBtnLink && (
              <a
                href={ctaContrastBtnLink}
                className="inline-flex items-center px-6 py-3 border-2 border-primary text-primary hover:bg-primary/10 font-semibold rounded-lg transition-colors duration-200"
              >
                {ctaContrastBtnText}
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
