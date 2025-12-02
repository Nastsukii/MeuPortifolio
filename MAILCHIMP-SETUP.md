# 📧 Configuração da Integração Mailchimp

Este documento explica como configurar a integração do formulário de contato com o Mailchimp.

## ✅ O que já foi implementado

- ✅ Instalação do pacote `@mailchimp/mailchimp_marketing`
- ✅ Função Netlify (`mailchimp-subscribe.js`) criada
- ✅ Formulário de contato atualizado para enviar dados ao Mailchimp
- ✅ Tratamento de erros (email duplicado, etc.)

## 🔧 Configuração das Variáveis de Ambiente

Para que a integração funcione, você precisa configurar as seguintes variáveis de ambiente no **Netlify**:

### 1. Acesse o Dashboard do Netlify

1. Faça login em [https://app.netlify.com](https://app.netlify.com)
2. Selecione seu site (landing-page-cirelli)
3. Vá em **Site settings** (Configurações do site)
4. No menu lateral, clique em **Environment variables** (Variáveis de ambiente)

### 2. Adicione as seguintes variáveis

Clique em **Add a variable** e adicione uma por uma:

| Variável | Valor | Descrição |
|----------|-------|-----------|
| `MAILCHIMP_API_KEY` | `sua-api-key-aqui` | Sua chave de API do Mailchimp |
| `MAILCHIMP_SERVER_PREFIX` | `us2` | Prefixo do servidor (extraído da API key) |
| `MAILCHIMP_AUDIENCE_ID` | `seu-audience-id-aqui` | ID da sua lista/audience no Mailchimp |

### 3. Salve as Variáveis

Após adicionar todas as variáveis, clique em **Save**.

### 4. Faça um Novo Deploy

Após salvar as variáveis, você precisa fazer um novo deploy para que as mudanças tenham efeito:

```bash
git add .
git commit -m "feat: Integração com Mailchimp Audience"
git push origin main
```

O Netlify detectará o push e fará o deploy automaticamente.

## 🧪 Como Testar

### Localmente (Desenvolvimento)

1. Crie um arquivo `.env` na raiz do projeto (já está no .gitignore):

```env
MAILCHIMP_API_KEY=sua-api-key-aqui
MAILCHIMP_SERVER_PREFIX=us2
MAILCHIMP_AUDIENCE_ID=seu-audience-id-aqui
```

2. Execute o Netlify Dev:

```bash
netlify dev
```

3. Acesse `http://localhost:8888/contato` e teste o formulário

### Em Produção

1. Acesse seu site em produção
2. Vá até a página de contato
3. Preencha e envie o formulário
4. Verifique no Mailchimp se o contato foi adicionado:
   - Acesse [Mailchimp Dashboard](https://mailchimp.com)
   - Vá em **Audience** → **All contacts**
   - O novo contato deve aparecer com a tag `contato-site`

## 🔍 Logs e Debug

### Ver logs da função no Netlify:

1. No dashboard do Netlify, vá em **Functions**
2. Clique em `mailchimp-subscribe`
3. Veja os logs de execução

### Console do navegador:

Quando alguém enviar o formulário, você verá no console:
- `✅ Mailchimp: success` - Se funcionou
- `✅ Mailchimp: already_subscribed` - Se o email já existe
- `⚠️ Mailchimp falhou (não-crítico):` - Se houver erro (não bloqueia o envio)

## 🎯 Como Funciona

1. **Usuário preenche o formulário** na página `/contato`
2. **Netlify Forms** recebe os dados (você recebe notificação)
3. **Função Mailchimp** adiciona o email ao Audience (paralelo, não bloqueia)
4. **Usuário vê mensagem de sucesso**

### Importante:

- A integração com Mailchimp roda **em paralelo** e não bloqueia o envio
- Se o Mailchimp falhar, o formulário ainda é enviado normalmente
- Emails duplicados são tratados silenciosamente (não geram erro)

## 📋 Configurações do Mailchimp

### Status do Contato:

No código (`mailchimp-subscribe.js` linha 35), o status é:

```javascript
status: 'subscribed'
```

Opções:
- `'subscribed'` - Adiciona diretamente (sem confirmação)
- `'pending'` - Envia email de confirmação (double opt-in)

### Tags:

Os contatos recebem a tag `contato-site` automaticamente, facilitando segmentação.

## 🔒 Segurança

- ✅ API Key nunca é exposta no frontend
- ✅ Função roda no servidor (Netlify Functions)
- ✅ Variáveis de ambiente protegidas
- ✅ Validação de email antes de enviar

## 📚 Documentação Útil

- [Mailchimp Marketing API](https://mailchimp.com/developer/marketing/api/)
- [Netlify Functions](https://docs.netlify.com/functions/overview/)
- [Netlify Environment Variables](https://docs.netlify.com/environment-variables/overview/)

## ❓ Problemas Comuns

### "Invalid API Key"
- Verifique se a API Key está correta no Netlify
- Confirme que o server prefix está correto (us2)

### "Resource Not Found"
- Verifique se o Audience ID está correto
- Confirme no Mailchimp: Audience → Settings → Audience ID

### Contato não aparece no Mailchimp
- Verifique os logs da função no Netlify
- Confirme que as variáveis de ambiente estão configuradas
- Faça um novo deploy após configurar as variáveis

---

**Última atualização:** $(date)
**Desenvolvido por:** Luiz Antonio Comiran Bueno

