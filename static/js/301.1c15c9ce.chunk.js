"use strict";(self.webpackChunkresustain_demo=self.webpackChunkresustain_demo||[]).push([[301],{1301:(e,t,i)=>{i.r(t),i.d(t,{default:()=>u});var r=i(5043),n=i(7950),o=i(9252),a=i(7165),l=i(8080);const d=(0,i(8875).I)("div")({name:"DataGridOverlayEditorStyle",class:"gdg-d19meir1",propsAsIs:!1,vars:{"d19meir1-0":[e=>e.targetY,"px"],"d19meir1-1":[e=>e.targetX,"px"],"d19meir1-2":[e=>e.targetWidth,"px"],"d19meir1-3":[e=>e.targetHeight,"px"],"d19meir1-4":[e=>e.targetY+10,"px"],"d19meir1-5":[e=>Math.max(0,(e.targetHeight-28)/2),"px"]}});function s(){const[e,t]=function(){const[e,t]=r.useState();return[null!==e&&void 0!==e?e:void 0,t]}(),[i,n]=r.useState(0),[o,a]=r.useState(!0);r.useLayoutEffect((()=>{if(void 0===e)return;if(!("IntersectionObserver"in window))return;const t=new IntersectionObserver((e=>{0!==e.length&&a(e[0].isIntersecting)}),{threshold:1});return t.observe(e),()=>t.disconnect()}),[e]),r.useEffect((()=>{if(o||void 0===e)return;let t;const i=()=>{const{right:r}=e.getBoundingClientRect();n((e=>Math.min(e+window.innerWidth-r-10,0))),t=requestAnimationFrame(i)};return t=requestAnimationFrame(i),()=>{void 0!==t&&cancelAnimationFrame(t)}}),[e,o]);return{ref:t,style:r.useMemo((()=>({transform:"translateX(".concat(i,"px)")})),[i])}}const u=e=>{var t,i;const{target:u,content:c,onFinishEditing:v,forceEditMode:g,initialValue:m,imageEditorOverride:f,markdownDivCreateNode:h,highlight:p,className:y,theme:E,id:b,cell:k,bloom:C,validateCell:w,getCellRenderer:x,provideEditor:D,isOutsideClick:O}=e,[S,P]=r.useState(g?c:void 0),I=r.useRef(null!==S&&void 0!==S?S:c);I.current=null!==S&&void 0!==S?S:c;const[M,N]=r.useState((()=>void 0===w||!((0,l.Bc)(c)&&!1===(null===w||void 0===w?void 0:w(k,c,I.current))))),R=r.useCallback(((e,t)=>{v(M?e:void 0,t)}),[M,v]),A=r.useCallback((e=>{if(void 0!==w&&void 0!==e&&(0,l.Bc)(e)){const t=w(k,e,I.current);!1===t?N(!1):"object"===typeof t?(e=t,N(!0)):N(!0)}P(e)}),[k,w]),B=r.useRef(!1),F=r.useRef(void 0),H=r.useCallback((()=>{R(S,[0,0]),B.current=!0}),[S,R]),K=r.useCallback(((e,t)=>{var i;R(e,null!==(i=null!==t&&void 0!==t?t:F.current)&&void 0!==i?i:[0,0]),B.current=!0}),[R]),T=r.useCallback((async e=>{let t=!1;"Escape"===e.key?(e.stopPropagation(),e.preventDefault(),F.current=[0,0]):"Enter"!==e.key||e.shiftKey?"Tab"===e.key&&(e.stopPropagation(),e.preventDefault(),F.current=[e.shiftKey?-1:1,0],t=!0):(e.stopPropagation(),e.preventDefault(),F.current=[0,1],t=!0),window.setTimeout((()=>{B.current||void 0===F.current||(R(t?S:void 0,F.current),B.current=!0)}),0)}),[R,S]),V=null!==S&&void 0!==S?S:c,[W,X]=r.useMemo((()=>{var e,t;if((0,l.pg)(c))return[];const i=null===D||void 0===D?void 0:D(c);return void 0!==i?[i,!1]:[null===(e=x(c))||void 0===e||null===(t=e.provideEditor)||void 0===t?void 0:t.call(e,c),!1]}),[c,x,D]),{ref:Y,style:q}=s();let z,G,_=!0,j=!0;if(void 0!==W){_=!0!==W.disablePadding,j=!0!==W.disableStyling;const e=(0,l.zT)(W);e&&(G=W.styleOverride);const t=e?W.editor:W;z=r.createElement(t,{isHighlighted:p,onChange:A,value:V,initialValue:m,onFinishedEditing:K,validatedSelection:(0,l.Bc)(V)?V.selectionRange:void 0,forceEditMode:g,target:u,imageEditorOverride:f,markdownDivCreateNode:h,isValid:M,theme:E})}G={...G,...q};const L=document.getElementById("portal");if(null===L)return console.error('Cannot open Data Grid overlay editor, because portal not found.  Please add `<div id="portal" />` as the last child of your `<body>`.'),null;let J=j?"gdg-style":"gdg-unstyle";M||(J+=" gdg-invalid"),_&&(J+=" gdg-pad");const Q=null!==(t=null===C||void 0===C?void 0:C[0])&&void 0!==t?t:1,U=null!==(i=null===C||void 0===C?void 0:C[1])&&void 0!==i?i:1;return(0,n.createPortal)(r.createElement(a.Dx.Provider,{value:E},r.createElement(o.A,{style:(0,a.zc)(E),className:y,onClickOutside:H,isOutsideClick:O},r.createElement(d,{ref:Y,id:b,className:J,style:G,as:!0===X?"label":void 0,targetX:u.x-Q,targetY:u.y-U,targetWidth:u.width+2*Q,targetHeight:u.height+2*U},r.createElement("div",{className:"gdg-clip-region",onKeyDown:T},z)))),L)}}}]);
//# sourceMappingURL=301.1c15c9ce.chunk.js.map