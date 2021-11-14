import{j as _,R as v,r as l,L as y,c as j,a as h,F as k,b as C,d as p,E as m,u as L,H as I,S as O,e as f,f as z}from"./vendor.b8158ac9.js";const N=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const u of r.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&a(u)}).observe(document,{childList:!0,subtree:!0});function i(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerpolicy&&(r.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?r.credentials="include":t.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=i(t);fetch(t.href,r)}};N();const P=async(s,n)=>(await fetch("/api/register/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({user_name:s,user_password:n})})).json(),R=async(s,n)=>(await fetch("/api/login/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({user_name:s,user_password:n})})).json(),B=async s=>(await fetch("/api/logout/")).json(),E=async()=>(await fetch("/api/login-test/")).json(),F=async()=>(await fetch("/api/users/")).json(),M=async s=>(await fetch(`/api/messages/${s}`)).json(),U=async(s,n)=>(await fetch("/api/messages/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message_text:s,message_to_user_id:n})})).json(),g={register:P,login:R,logout:B,loginTest:E,getUsers:F,getMessages:M,sendMessages:U},e=_.exports.jsx,o=_.exports.jsxs,b=_.exports.Fragment,w=v.createContext(),T=s=>{const[n,i]=l.exports.useState(!1);return l.exports.useEffect(()=>{g.loginTest().then(a=>{i(a.loggedin)})},[]),e(w.Provider,{value:{isLoggedIn:n,setIsLoggedIn:i},children:s.children})},W=()=>{const{isLoggedIn:s,setIsLoggedIn:n}=l.exports.useContext(w);return o(b,{children:[o("div",{children:[o("ul",{children:[e("li",{children:e(y,{to:"/",children:"Lista u\u017Cytkownik\xF3w"})}),e("li",{children:e(y,{to:"/login",children:"Logowanie"})}),e("li",{children:e(y,{to:"/register",children:"Rejestracja"})})]}),e("span",{style:{color:s?"green":"crimson"},children:e("b",{children:s?"U\u017Cytkownik jest zalogowany":"U\u017Cytkownik nie jest zalogowany"})}),e("span",{style:{float:"right",marginRight:"1rem",cursor:"pointer"},onClick:i=>{g.logout().then(a=>{n(a.loggedin)})},children:"Wyloguj"})]}),e("hr",{})]})},$=j().shape({user_name:h().required("Nazwa u\u017Cytkownika jest wymagana"),user_password:h().required("Has\u0142o jest wymagane")}),H=()=>{const{isLoggedIn:s,setIsLoggedIn:n}=l.exports.useContext(w);return o("div",{children:[e("h1",{children:"Logowanie"}),e(k,{validationSchema:$,initialValues:{user_name:"",user_password:""},onSubmit:i=>{console.log(i),g.login(i.user_name,i.user_password).then(a=>{n(a.loggedin),alert(a.loggedin?"U\u017Cytkownik zosta\u0142 zalogowany":"Nie uda\u0142o si\u0119 zalogowa\u0107 u\u017Cytkownika")})},children:o(C,{children:[o("div",{children:[e("label",{children:"Nazwa U\u017Cytkownika"}),e(p,{type:"text",name:"user_name"}),e(m,{name:"user_name"})]}),o("div",{children:[e("label",{children:"Has\u0142o"}),e(p,{type:"password",name:"user_password"}),e(m,{name:"user_password"})]}),e("div",{children:e("button",{type:"submit",children:"Zaloguj si\u0119"})})]})})]})},q=j().shape({user_name:h().required("Nazwa u\u017Cytkownika jest wymagana"),user_password:h().required("Has\u0142o jest wymagane")}),A=()=>o("div",{children:[e("h1",{children:"Rejestracja"}),e(k,{validationSchema:q,initialValues:{user_name:"",user_password:""},onSubmit:s=>{console.log(s),g.register(s.user_name,s.user_password).then(n=>{alert(n.register?"Stworzono u\u017Cytkownika":"Nie uda\u0142o si\u0119 stworzy\u0107 u\u017Cytkownika")})},children:o(C,{children:[o("div",{children:[e("label",{children:"Nazwa U\u017Cytkownika"}),e(p,{type:"text",name:"user_name"}),e(m,{name:"user_name"})]}),o("div",{children:[e("label",{children:"Has\u0142o"}),e(p,{type:"password",name:"user_password"}),e(m,{name:"user_password"})]}),e("div",{children:e("button",{type:"submit",children:"Zarejestruj si\u0119"})})]})})]}),J=({user:s})=>o("div",{children:[o("h5",{children:["[ID=",s.user_id,"] ",s.user_name,e("p",{style:{color:s.online?"green":"crimson"},children:s.online?"Online":"Offline"}),e("p",{children:e(y,{to:`/chat/${s.user_id}`,children:"Przejd\u017A do chatu"})})]}),e("hr",{})]}),D=()=>{const{isLoggedIn:s,setIsLoggedIn:n}=l.exports.useContext(w),[i,a]=l.exports.useState([]);l.exports.useEffect(()=>{g.getUsers().then(r=>{r.loggedin!==!1&&(console.log(r.data),a(r.data))})},[]);const t=l.exports.useRef(null);return l.exports.useEffect(()=>{t.current=new WebSocket("ws://localhost:8080"),t.current.onopen=()=>console.log("ws onopen"),t.current.onclose=()=>console.log("ws onclose"),t.current.onmessage=u=>{const c=JSON.parse(u.data);c.status===3&&(console.log(c),a(d=>[...d,c.data]))};const r=t.current;return()=>r.close()},[]),s?o("div",{children:[e("h1",{children:"Lista u\u017Cytkownik\xF3w"}),i.map((r,u)=>e(J,{user:r},`user-list-item-${u}`))]}):e("p",{children:"Zaloguj si\u0119 aby wy\u015Bwietli\u0107 u\u017Cytkownik\xF3w czatu"})},Z=({message:s})=>{const{message_from_user_id:n,message_text:i}=s;return o("div",{children:["Od: ",n," - \u201E",i,"\u201D"]})},V=j().shape({message_text:h().required("Wiadomo\u015B\u0107 nie mo\u017Ce by\u0107 pusta")}),K=()=>{const n=L().id,[i,a]=l.exports.useState([]),{isLoggedIn:t,setIsLoggedIn:r}=l.exports.useContext(w);l.exports.useEffect(()=>{g.getMessages(n).then(c=>{c.loggedin!==!1&&(console.dir(c.data),a(c.data))})},[]);const u=l.exports.useRef(null);return l.exports.useEffect(()=>{u.current=new WebSocket("ws://localhost:8080"),u.current.onopen=()=>console.log("ws onopen"),u.current.onclose=()=>console.log("ws onclose"),u.current.onmessage=d=>{const x=JSON.parse(d.data);x.status===1&&(console.log(x),a(S=>[...S,x.data]))};const c=u.current;return()=>c.close()},[]),t?o(b,{children:[o("div",{children:[o("h1",{children:["Chat ID = ",n]}),o("div",{style:{backgroundColor:"lightgrey",maxHeight:"600px"},children:[i.length===0?e("p",{children:"Brak wiadomo\u015Bci"}):e(b,{}),i.map((c,d)=>e(Z,{message:c},`chat-message-${d}`))]})]}),e("div",{children:e(k,{validationSchema:V,initialValues:{message_text:""},onSubmit:c=>{console.log(c),g.sendMessages(c.message_text,n).then(d=>{console.log(d),d.sending&&console.log("Wiadomo\u015B\u0107 zosta\u0142a wys\u0142ana")})},children:o(C,{children:[o("div",{children:[e("label",{children:"Wiadomo\u015B\u0107"}),e(p,{type:"text",as:"textarea",name:"message_text"}),e(m,{name:"message_text"})]}),e("div",{children:e("button",{type:"submit",children:"Wy\u015Blij wiadomo\u015B\u0107"})})]})})})]}):e("p",{children:"Zaloguj si\u0119 aby wy\u015Bwietli\u0107 chat z tym u\u017Cytkownikiem"})};function G(){return e("div",{children:o(I,{children:[e(W,{}),o(O,{children:[e(f,{path:"/register",component:A}),e(f,{path:"/login",component:H}),e(f,{path:"/chat/:id",component:K}),e(f,{exact:!0,path:"/",children:e(D,{})})]})]})})}z.render(e(v.StrictMode,{children:e(T,{children:e(G,{})})}),document.getElementById("root"));