const {onCall,HttpsError}=require('firebase-functions/v2/https');
const {initializeApp}=require('firebase-admin/app');
const {getFirestore,FieldValue}=require('firebase-admin/firestore');
const {getAuth}=require('firebase-admin/auth');
initializeApp();
exports.manageAuthorizedEmail=onCall(async request=>{
 if(!request.auth?.token?.admin)throw new HttpsError('permission-denied','Somente administradores.');
 const email=String(request.data?.email||'').trim().toLowerCase();
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||email.length>254)throw new HttpsError('invalid-argument','E-mail inválido.');
 const allowed=request.data?.allowed;
 if(typeof allowed!=='boolean')throw new HttpsError('invalid-argument','Status inválido.');
 if(email===String(request.auth.token.email||'').toLowerCase()&&!allowed)throw new HttpsError('failed-precondition','Não é permitido revogar o próprio administrador.');
 await getFirestore().collection('authorizedEmails').doc(email).set({allowed,updatedAt:FieldValue.serverTimestamp(),updatedBy:request.auth.uid},{merge:true});
 await getFirestore().collection('adminAudit').add({email,allowed,actor:request.auth.uid,createdAt:FieldValue.serverTimestamp()});
 return {ok:true};
});
// Executar uma única vez, em ambiente administrativo seguro (NUNCA no navegador):
// const {getAuth}=require('firebase-admin/auth'); await getAuth().setCustomUserClaims(uid,{admin:true});
// A autorização de e-mail via regras protege o Firestore, mas NÃO bloqueia a criação
// de identidades no Firebase Auth. Para impedir a criação, configure um blocking trigger
// beforeUserCreated (requer Firebase Authentication com Identity Platform) ou fluxo
// de convite via backend. Não exponha o Admin SDK no frontend.
