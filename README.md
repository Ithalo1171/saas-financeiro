# SmartFin PRO 2.0 — entrada normal restaurada

## O que mudou
- **Entrar** autentica diretamente no Firebase Authentication, sem lista de e-mails autorizados.
- **Criar Nova Conta** cria conta por e-mail e senha (mínimo seis caracteres) e salva o perfil `users/{uid}`.
- **Esqueci minha senha** funciona sem depender do módulo extra `features.js`.
- Os três botões apresentam status e erros de rede, configuração ou credenciais na própria tela. Mesmo se o SDK falhar ao carregar, há uma mensagem visível em vez de clique silencioso.
- Novas regras do Firestore permitem perfis novos e dados privados do próprio usuário, **sem liberar dados de terceiros**.
- Dashboard, transações, metas, relatórios, Academia Financeira, opções de aparência, cartões, orçamentos, notificações, avaliações e recursos PWA foram preservados.

## Publicar na Vercel
1. Faça backup do código e das **regras do Firebase** atuais.
2. Suba para o GitHub os arquivos **dentro da pasta** deste ZIP; o `index.html` deve ficar na raiz do repositório. A Vercel irá publicar normalmente.
3. Abra Firebase Console → **Firestore Database → Rules**, e publique o conteúdo de `firestore.rules` **se esse projeto Firebase for usado apenas pelo SmartFin**. Se outras aplicações usam `usuarios-compradores`, revise antes de substituir as regras.
4. Confira em Firebase Console → **Authentication → Sign-in method** que **E-mail/Senha** está ativado.
5. Teste primeiro em uma implantação Preview, com uma conta antiga e uma conta nova. **Não recrie contas existentes**, apenas faça login.
6. No Chrome, se houver versão antiga salva: recarregue com Ctrl+Shift+R. Se continuar, em DevTools → Application → Service Workers, clique em Unregister e limpe o cache do site antes de recarregar.

## Importante
- O cadastro no **Firebase Authentication** é independente das regras do Firestore. Se as regras antigas ainda estiverem publicadas, usuários podem fazer login/criar Auth, mas não salvar ou acessar dados. Atualizar o GitHub não altera as regras no Firebase.
- O administrador ainda exige a claim `admin: true`, configurada pelo backend. **Não foi concedido acesso administrativo apenas por e-mail**, para evitar uma falha de segurança.
- A nova regra permite que qualquer conta autenticada crie o próprio perfil, conforme solicitado. A lista `authorizedEmails` permanece apenas para uma futura política de convites, sem bloquear login nem cadastro.
- Esta atualização não exclui contas nem altera documentos financeiros existentes.
- O HTML pressupõe conexão para carregar SDK do Firebase via CDN. Se scripts externos forem bloqueados, o erro aparece na tela.
- **Não foi possível testar o Firebase real sem acesso às credenciais da conta.** Foram feitas checagens de sintaxe, estrutura e validação das chamadas no código.
