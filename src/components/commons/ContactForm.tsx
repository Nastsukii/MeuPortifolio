"use client";
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const ContactForm = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validação do Nome
    if (!formData.name.trim()) {
      newErrors.name = t('contact.errors.nameRequired') || 'Nome é obrigatório';
    } else if (/\d/.test(formData.name)) {
      newErrors.name = t('contact.errors.nameWithNumbers') || 'Nome não pode conter números';
    } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(formData.name)) {
      newErrors.name = t('contact.errors.nameInvalidChars') || 'Nome contém caracteres inválidos';
    }

    // Validação do Email
    if (!formData.email.trim()) {
      newErrors.email = t('contact.errors.emailRequired') || 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('contact.errors.emailInvalid') || 'Email inválido';
    }

    // Validação da Mensagem
    if (!formData.message.trim()) {
      newErrors.message = t('contact.errors.messageRequired') || 'Mensagem é obrigatória';
    } else if (formData.message.trim().length > 500) {
      newErrors.message = t('contact.errors.messageTooLong') || 'Mensagem muito longa (máximo 500 caracteres)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validar email em tempo real
    if (name === 'email' && value.length > 0) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setErrors(prev => ({ ...prev, email: t('contact.errors.emailInvalid') || 'Email inválido' }));
      } else {
        setErrors(prev => ({ ...prev, email: undefined }));
      }
    } else if (name === 'email' && value.length === 0) {
      // Limpar erro quando campo estiver vazio
      setErrors(prev => ({ ...prev, email: undefined }));
    }
    
    // Clear error when user starts typing (outros campos)
    if (name !== 'email' && errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Enviar dados para Netlify Forms (notificação por email)
      const netlifyResponse = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'contato',
          'name': formData.name,
          'email': formData.email,
          'message': formData.message
        }).toString()
      });

      // 2. Adicionar contato ao Mailchimp (executar em paralelo, não bloquear o envio)
      fetch('/.netlify/functions/mailchimp-subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message
        })
      })
        .then(response => response.json())
        .then(data => {
          console.log('✅ Mailchimp:', data.status || 'success');
        })
        .catch(error => {
          console.warn('⚠️ Mailchimp falhou (não-crítico):', error);
        });

      if (netlifyResponse.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert('Erro ao enviar mensagem. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      alert('Erro ao enviar mensagem. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {t('contact.success.title') || 'Mensagem Enviada!'}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {t('contact.success.message') || 'Obrigado pelo seu contato! Responderei em breve.'}
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 px-6 rounded-lg transition-colors duration-200 neon-shadow"
          >
            {t('contact.success.sendAnother') || 'Enviar Outra Mensagem'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {t('contact.sendMessage')}
      </h3>
      <form 
        name="contato"
        method="POST"
        data-netlify="true"
        onSubmit={handleSubmit} 
        className="space-y-6"
      >
        {/* Campo oculto para Netlify identificar o formulário */}
        <input type="hidden" name="form-name" value="contato" />

        {/* Campo Nome */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('contact.name')} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200 ${
              errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder={t('contact.namePlaceholder')}
            required
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        {/* Campo E-mail */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('contact.email')} <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duração-200 ${
              errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder={t('contact.emailPlaceholder')}
            required
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Campo Mensagem */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('contact.message')} <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={5}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200 ${
              errors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder={t('contact.messagePlaceholder')}
            required
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-500">{errors.message}</p>
          )}
        </div>

        {/* Botão de Enviar */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/60 text-primary-foreground font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed neon-shadow"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Enviando...
            </span>
          ) : (
            t('contact.sendButton')
          )}
        </button>
      </form>
    </div>
  );
};
