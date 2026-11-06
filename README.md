# SmartFin PRO 2.0 — versão estruturada

## O que foi incluído
- Painéis de orçamentos, cartões, parcelamentos, recorrências, notificações, avaliações da Academia e administração.
- Tema claro, escuro e automático.
- Recuperação de senha por e-mail.
- Exportação CSV (abre no Excel) e impressão/salvar como PDF pelo navegador.
- PWA básico (manifesto, ícone SVG e service worker para arquivos estáticos).

## Publicar na Vercel
Envie o conteúdo desta pasta para a raiz do projeto estático na Vercel. `index.html` é a entrada; `css`, `js`, `icons`, `manifest.webmanifest` e `service-worker.js` precisam manter os caminhos.

## ATENÇÃO — Firebase
Este pacote inclui `firestore.rules` e uma função protegida em `functions/`. **Não publique as regras sem revisar a compatibilidade com seus dados atuais.** As regras substituem as regras existentes e podem bloquear usuários não autorizados.

Para habilitar administração real, um operador com acesso ao console Firebase deve:
1. Definir uma custom claim `admin:true` para o UID da conta `ithalo1171@gmail.com` via Admin SDK em ambiente seguro, e renovar a sessão.
2. Implantar a função `manageAuthorizedEmail` pelo Firebase CLI e aplicar as regras após avaliação.
3. Criar a autorização inicial em `authorizedEmails/ithalo1171@gmail.com` com `{ "allowed": true }`, ou depender da claim admin.
4. Configurar no Firebase Authentication o domínio da Vercel como domínio autorizado para autenticação e recuperação de senha, conforme a configuração atual do projeto.

**Importante:** as regras fornecidas restringem acesso ao Firestore, mas não impedem que um usuário crie uma identidade no Firebase Authentication. Para bloquear cadastros não convidados no próprio Auth é necessário um fluxo backend específico (ou Identity Platform blocking functions). A interface não equivale a segurança.

## Observações
- Recorrências são modelos com lançamento manual para evitar cobranças duplicadas; execução automática exige agendador de backend.
- Compras parceladas geram lançamentos futuros; a visão geral legada soma todos os lançamentos, inclusive futuros. A contabilidade mensal dos orçamentos filtra o mês atual. Recomenda-se revisar a lógica de saldos por competência antes de uso financeiro real.
- Notificações são lidas do Firestore; alertas de orçamento aparecem na tela de orçamento. Envio push e criação automática de notificações requerem backend.
- Certificado é gerado para impressão em PDF e não possui verificação externa.
- PWA depende de HTTPS; cache não fornece acesso offline aos dados financeiros.
- A Academia original armazena conclusão de leitura no localStorage; as notas dos quizzes ficam no Firestore.
- Este código não foi testado contra o seu projeto Firebase de produção; faça backup e teste em ambiente de homologação antes de substituir a versão ativa.
