import React from 'react';
import { CopyIcon } from '../icons/CopyIcon';

interface CopyButtonProps {
  textToCopy: string;
}

/**
 * Botão para copiar texto para a área de transferência.
 * Utiliza a API `navigator.clipboard`.
 */
export const CopyButton = ({ textToCopy }: CopyButtonProps) => {
  const handleCopy = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          // TODO: Adicionar feedback visual (toast/tooltip) de sucesso futuros
          console.log('Texto copiado com sucesso!');
        })
        .catch(err => {
          console.error('Falha ao copiar texto: ', err);
        });
    }
  };

  return (
    <button 
      onClick={handleCopy} 
      className="inline-flex justify-center items-center hover:scale-110 transition-transform p-1"
      title="Copiar para a área de transferência"
      aria-label="Copiar"
    >
      <CopyIcon title="Clique aqui para copiar" className="fill-white w-5 h-5" />
    </button>
  );
};
