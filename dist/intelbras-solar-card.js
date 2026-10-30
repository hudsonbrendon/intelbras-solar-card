function t(t,e,i,s){var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}};const r=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:a,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:h,getOwnPropertySymbols:d,getPrototypeOf:p}=Object,u=globalThis,_=u.trustedTypes,f=_?_.emptyScript:"",m=u.reactiveElementPolyfillSupport,g=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!a(t,e),$={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let b=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const n=s?.call(this);o?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(g("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(g("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(g("properties"))){const t=this.properties,e=[...h(t),...d(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),o=e.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=s;const n=o.fromAttribute(e,t.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(t,e,i,s=!1,o){if(void 0!==t){const n=this.constructor;if(!1===s&&(o=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??y)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==o||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[g("elementProperties")]=new Map,b[g("finalized")]=new Map,m?.({ReactiveElement:b}),(u.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,x=t=>t,A=w.trustedTypes,k=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+E,C=`<${P}>`,M=document,O=()=>M.createComment(""),U=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,N="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,I=/-->/g,j=/>/g,H=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),z=/'/g,L=/"/g,D=/^(?:script|style|textarea|title)$/i,B=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),W=B(1),F=B(2),q=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),G=new WeakMap,X=M.createTreeWalker(M,129);function J(t,e){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(e):e}const K=(t,e)=>{const i=t.length-1,s=[];let o,n=2===e?"<svg>":3===e?"<math>":"",r=R;for(let e=0;e<i;e++){const i=t[e];let a,c,l=-1,h=0;for(;h<i.length&&(r.lastIndex=h,c=r.exec(i),null!==c);)h=r.lastIndex,r===R?"!--"===c[1]?r=I:void 0!==c[1]?r=j:void 0!==c[2]?(D.test(c[2])&&(o=RegExp("</"+c[2],"g")),r=H):void 0!==c[3]&&(r=H):r===H?">"===c[0]?(r=o??R,l=-1):void 0===c[1]?l=-2:(l=r.lastIndex-c[2].length,a=c[1],r=void 0===c[3]?H:'"'===c[3]?L:z):r===L||r===z?r=H:r===I||r===j?r=R:(r=H,o=void 0);const d=r===H&&t[e+1].startsWith("/>")?" ":"";n+=r===R?i+C:l>=0?(s.push(a),i.slice(0,l)+S+i.slice(l)+E+d):i+E+(-2===l?e:d)}return[J(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Y{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0;const r=t.length-1,a=this.parts,[c,l]=K(t,e);if(this.el=Y.createElement(c,i),X.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=X.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(S)){const e=l[n++],i=s.getAttribute(t).split(E),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:r[2],strings:i,ctor:"."===r[1]?it:"?"===r[1]?st:"@"===r[1]?ot:et}),s.removeAttribute(t)}else t.startsWith(E)&&(a.push({type:6,index:o}),s.removeAttribute(t));if(D.test(s.tagName)){const t=s.textContent.split(E),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],O()),X.nextNode(),a.push({type:2,index:++o});s.append(t[e],O())}}}else if(8===s.nodeType)if(s.data===P)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(E,t+1));)a.push({type:7,index:o}),t+=E.length-1}o++}}static createElement(t,e){const i=M.createElement("template");return i.innerHTML=t,i}}function Z(t,e,i=t,s){if(e===q)return e;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const n=U(e)?void 0:e._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(t),o._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(e=Z(t,o._$AS(t,e.values),o,s)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??M).importNode(e,!0);X.currentNode=s;let o=X.nextNode(),n=0,r=0,a=i[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new tt(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new nt(o,this,t)),this._$AV.push(e),a=i[++r]}n!==a?.index&&(o=X.nextNode(),n++)}return X.currentNode=M,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),U(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Y.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Q(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=G.get(t.strings);return void 0===e&&G.set(t.strings,e=new Y(t)),e}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new tt(this.O(O()),this.O(O()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=x(t).nextSibling;x(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}let et=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(t,e=this,i,s){const o=this.strings;let n=!1;if(void 0===o)t=Z(this,t,e,0),n=!U(t)||t!==this._$AH&&t!==q,n&&(this._$AH=t);else{const s=t;let r,a;for(t=o[0],r=0;r<o.length-1;r++)a=Z(this,s[i+r],e,r),a===q&&(a=this._$AH[r]),n||=!U(a)||a!==this._$AH[r],a===V?t=V:t!==V&&(t+=(a??"")+o[r+1]),this._$AH[r]=a}n&&!s&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}};class it extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class st extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class ot extends et{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??V)===q)return;const i=this._$AH,s=t===V&&i!==V||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==V&&(i===V||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const rt=w.litHtmlPolyfillSupport;rt?.(Y,tt),(w.litHtmlVersions??=[]).push("3.3.3");const at=globalThis;class ct extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let o=s._$litPart$;if(void 0===o){const t=i?.renderBefore??null;s._$litPart$=o=new tt(e.insertBefore(O(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}ct._$litElement$=!0,ct.finalized=!0,at.litElementHydrateSupport?.({LitElement:ct});const lt=at.litElementPolyfillSupport;lt?.({LitElement:ct}),(at.litElementVersions??=[]).push("4.2.2");const ht={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:y},dt=(t=ht,e,i)=>{const{kind:s,metadata:o}=i;let n=globalThis.litPropertyMetadata.get(o);if(void 0===n&&globalThis.litPropertyMetadata.set(o,n=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),n.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const o=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,o,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];e.call(this,i),this.requestUpdate(s,o,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function pt(t){return(e,i)=>"object"==typeof i?dt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ut(t,e){const i=56+92*e,s=84-56*e;return`${(s+(236+56*e-s)*t).toFixed(1)},${i.toFixed(1)}`}function _t(t,e,i,s){return`${ut(t,e)} ${ut(i,e)} ${ut(i,s)} ${ut(t,s)}`}const ft=(.72-.06)/2,mt=Array.from({length:8},(t,e)=>{const i=.08+e%4*.215,s=.14+Math.floor(e/4)*(ft+.06);return{u0:i,v0:s,u1:i+.195,v1:s+ft}}),gt=({u0:t,v0:e,u1:i,v1:s})=>{const o=(t+i)/2,n=e+(s-e)/3,r=e+2*(s-e)/3;return F`
    <polygon class="cell" points="${_t(t,e,i,s)}" />
    <g class="cell-lines">
      <polyline points="${ut(o,e)} ${ut(o,s)}" />
      <polyline points="${ut(t,n)} ${ut(i,n)}" />
      <polyline points="${ut(t,r)} ${ut(i,r)}" />
    </g>
  `};function vt(t){return F`
    <svg class="solar ${t}" viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg"
         role="img" aria-label="solar panels">
      <defs>
        <clipPath id="isc-panels-clip">
          ${mt.map(t=>F`<polygon points="${_t(t.u0,t.v0,t.u1,t.v1)}" />`)}
        </clipPath>
        <linearGradient id="isc-shine-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#ffffff" stop-opacity="0" />
          <stop offset="0.5" stop-color="#ffffff" stop-opacity="0.75" />
          <stop offset="1" stop-color="#ffffff" stop-opacity="0" />
        </linearGradient>
      </defs>

      <!-- shadow -->
      <ellipse cx="160" cy="188" rx="136" ry="7" fill="rgba(0,0,0,0.12)" />

      <!-- sky: sun by day, moon at night -->
      <g class="sun">
        <g class="sun-rays" stroke-width="2.4" stroke-linecap="round">
          <line x1="282" y1="10" x2="282" y2="15" /><line x1="282" y1="45" x2="282" y2="50" />
          <line x1="262" y1="30" x2="267" y2="30" /><line x1="297" y1="30" x2="302" y2="30" />
          <line x1="268" y1="16" x2="271.5" y2="19.5" /><line x1="292.5" y1="40.5" x2="296" y2="44" />
          <line x1="268" y1="44" x2="271.5" y2="40.5" /><line x1="292.5" y1="19.5" x2="296" y2="16" />
        </g>
        <circle class="sun-core" cx="282" cy="30" r="10" />
      </g>
      <g class="moon">
        <path d="M286 18 a12 12 0 1 0 8 20 a9.5 9.5 0 1 1 -8 -20 z" />
        <circle class="star" cx="246" cy="18" r="1.4" />
        <circle class="star s2" cx="304" cy="54" r="1.1" />
        <circle class="star s3" cx="262" cy="46" r="1" />
      </g>

      <!-- wall under the eave -->
      <rect x="48" y="156" width="224" height="26" fill="var(--isc-wall)"
            stroke="var(--isc-outline)" stroke-width="1.2" />

      <!-- roof plane, ridge and eave -->
      <polygon points="84,56 236,56 292,148 28,148" fill="var(--isc-roof)"
               stroke="var(--isc-outline)" stroke-width="1.5" stroke-linejoin="round" />
      <rect x="22" y="146" width="276" height="10" rx="3" fill="var(--isc-roof-dark)"
            stroke="var(--isc-outline)" stroke-width="1.2" />
      <line x1="80" y1="56" x2="240" y2="56" stroke="var(--isc-outline)" stroke-width="3"
            stroke-linecap="round" />

      <!-- PV array -->
      <g class="panels" stroke-linejoin="round">${mt.map(gt)}</g>
      <g clip-path="url(#isc-panels-clip)">
        <rect class="shine" x="-60" y="50" width="56" height="110" fill="url(#isc-shine-grad)" />
      </g>

      <!-- fault sign over the ridge -->
      <g class="warn">
        <path d="M160 24 l13 22 h-26 z" fill="var(--isc-error)" />
        <rect x="158.7" y="30.5" width="2.6" height="8" rx="1" fill="#fff" />
        <circle cx="160" cy="42" r="1.5" fill="#fff" />
      </g>
    </svg>
  `}const yt="intelbras-solar-card",$t="intelbras_solar_local",bt=new Set(["running","alarm_run","derating_run","dispatch_run"]),wt=new Set(["starting","initial_standby"]),xt=new Set(["fault","communication_fault","emergency_stop"]),At=new Map(Object.entries({work_state:"work_state",ac_power:"ac_power",dc_power:"dc_power",nominal_power:"nominal_power",energy_today:"energy_today",energy_month:"energy_month",energy_year:"energy_year",energy_total:"energy_total",temperature:"temperature",efficiency:"efficiency",grid_voltage:"grid_voltage",grid_frequency:"grid_frequency",mppt1_power:"mppt1_power",mppt1_voltage:"mppt1_voltage",mppt2_power:"mppt2_power",mppt2_voltage:"mppt2_voltage",running_time_today:"running_time_today",active_alarms:"active_alarms",fault_code:"fault_code",producing:"producing",fault:"fault",online:"online",power_limit_enabled:"power_limit_enabled",power_limit:"power_limit",sync_clock:"sync_clock",reboot_datalogger:"reboot_datalogger",wifi_signal:"wifi_signal",plant_status:"plant_status",peak_power_today:"peak_power_today",specific_yield_today:"specific_yield_today",savings_today:"savings_today",co2_avoided:"co2_avoided",trees_saved:"trees_saved",installed_capacity:"installed_capacity"}).map(([t,e])=>[e,t]));function kt(t,e){const i={},s=t?.entities;if(s&&t){let o;if(e.device){const i=function(t,e){const i=t.devices?.[e];return new Set(i?.config_entries??[])}(t,e.device);o=new Set([e.device]);for(const e of Object.values(t.devices??{}))(e.config_entries??[]).some(t=>i.has(t))&&o.add(e.id)}for(const t of Object.values(s)){if(t.platform!==$t||!t.translation_key)continue;if(o&&(!t.device_id||!o.has(t.device_id)))continue;const e=At.get(t.translation_key);e&&!i[e]&&(i[e]=t.entity_id)}}return{...i,...e.entities??{}}}function St(t,e){if(!e||!t)return null;const i=Number(t.states[e]?.state);return Number.isFinite(i)?i:null}var Et={common:{name:"Intelbras Solar Card",description:"Card animado para inversores solares Intelbras: potência ao vivo, energia, strings, status e ações.",not_available:"Inversor indisponível",missing_entity:"Defina `device` com o inversor Intelbras (ou `entities.work_state`).",invalid_config:"Configuração inválida",more_info:"Mais informações",of_nominal:"{percent}% de {nominal} kW",limit:"Limite",limit_on:"Limite de potência {percent}%",limit_off:"Sem limite de potência",sync_clock:"Sincronizar relógio",restart_datalogger:"Reiniciar datalogger",confirm_restart:"Reiniciar o datalogger WiNet-S? O monitoramento para por cerca de um minuto; o inversor continua gerando.",confirm_limit_off:"Remover o limite de potência do inversor?",confirm_limit_on:"Ativar o limite de potência do inversor?",alarms:"{count} alarmes ativos",fault_code:"Código de falha {code}"},status:{producing:"Gerando",limited:"Gerando com limitação",starting:"Iniciando",standby:"Standby",night:"Noite",fault:"Falha",unavailable:"Indisponível"},stat:{energy_today:"Hoje",energy_month:"Mês",energy_year:"Ano",energy_total:"Total",peak_power_today:"Pico hoje",specific_yield_today:"Produtividade",savings_today:"Economia hoje",co2_avoided:"CO₂ evitado",running_time_today:"Gerando hoje",temperature:"Temperatura",efficiency:"Eficiência"},editor:{device:"Dispositivo do inversor",name:"Nome",show_name:"Mostrar nome",show_status:"Mostrar status",show_toolbar:"Mostrar barra de ações",show_strings:"Mostrar strings MPPT",compact_view:"Modo compacto"}};const Pt={en:{common:{name:"Intelbras Solar Card",description:"Animated card for Intelbras solar inverters: live power, energy, strings, status and actions.",not_available:"Inverter not available",missing_entity:"Set `device` to the Intelbras inverter (or `entities.work_state`).",invalid_config:"Invalid configuration",more_info:"More info",of_nominal:"{percent}% of {nominal} kW",limit:"Limit",limit_on:"Power limit {percent}%",limit_off:"No power limit",sync_clock:"Sync clock",restart_datalogger:"Restart datalogger",confirm_restart:"Restart the WiNet-S datalogger? Monitoring stops for about a minute; the inverter keeps producing.",confirm_limit_off:"Remove the export/power limit of the inverter?",confirm_limit_on:"Enable the inverter power limit?",alarms:"{count} active alarms",fault_code:"Fault code {code}"},status:{producing:"Producing",limited:"Producing (limited)",starting:"Starting",standby:"Standby",night:"Night",fault:"Fault",unavailable:"Unavailable"},stat:{energy_today:"Today",energy_month:"Month",energy_year:"Year",energy_total:"Total",peak_power_today:"Peak today",specific_yield_today:"Yield",savings_today:"Saved today",co2_avoided:"CO₂ avoided",running_time_today:"Producing today",temperature:"Temperature",efficiency:"Efficiency"},editor:{device:"Inverter device",name:"Name",show_name:"Show name",show_status:"Show status",show_toolbar:"Show toolbar",show_strings:"Show MPPT strings",compact_view:"Compact view"}},"pt-BR":Et,pt:Et};function Ct(t,e){let i=t;for(const t of e){if(!i||"object"!=typeof i||!(t in i))return;i=i[t]}return"string"==typeof i?i:void 0}function Mt(t,e="en",i={}){const s=t.split(".");return(Ct(Pt[e],s)??Ct(Pt[e.split("-")[0]],s)??Ct(Pt.en,s)??t).replace(/\{(\w+)\}/g,(t,e)=>e in i?String(i[e]):`{${e}}`)}const Ot=((t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new n(i,t,s)})`
  :host {
    --isc-background: var(--ha-card-background, var(--card-background-color, transparent));
    --isc-primary-text-color: var(--primary-text-color);
    --isc-secondary-text-color: var(--secondary-text-color);
    --isc-divider-color: var(--entities-divider-color, var(--divider-color));
    --isc-ok: var(--success-color, #43a047);
    --isc-warning: var(--warning-color, #ffa600);
    --isc-error: var(--error-color, #db4437);
    --isc-spacing: 10px;
    /* illustration palette (themes / card-mod can override) */
    --isc-sun: #ffb300;
    --isc-roof: #e9eaec;
    --isc-roof-dark: #cfd2d6;
    --isc-wall: #f6f7f8;
    --isc-cell: #c3c8ce;
    --isc-cell-night: #9ea4ab;
    --isc-cell-line: #ffffff;
    --isc-outline: #9aa0a6;
    --isc-load: 0;
    --isc-shine-duration: 5s;
    display: flex;
    flex: 1;
    flex-direction: column;
  }
  :host([dark-mode]) {
    --isc-roof: #3a3f47;
    --isc-roof-dark: #2a2e34;
    --isc-wall: #4a4f58;
    --isc-cell: #262a30;
    --isc-cell-night: #1b1e22;
    --isc-cell-line: #4a4f58;
    --isc-outline: #6b7178;
  }

  ha-card {
    background: var(--isc-background);
    display: flex;
    flex-direction: column;
    flex: 1;
    position: relative;
    overflow: hidden;
  }
  .preview {
    position: relative;
    text-align: center;
  }
  .preview.not-available {
    filter: grayscale(1);
  }

  /* ── header ─────────────────────────────────────────────────────────── */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .tips {
    display: flex;
    gap: var(--isc-spacing);
    flex-grow: 1;
    flex-wrap: wrap;
    align-items: center;
    padding: var(--isc-spacing);
    color: var(--isc-secondary-text-color);
    font-size: 0.95rem;
  }
  .tip {
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    line-height: 1;
    white-space: nowrap;
  }
  .tip ha-icon {
    --mdc-icon-size: 18px;
  }
  .tip.energy ha-icon {
    color: var(--isc-sun);
  }
  .tip.alarm {
    color: var(--isc-warning);
  }
  .more-info {
    color: var(--isc-secondary-text-color);
    margin: 2px;
  }

  /* ── illustration ───────────────────────────────────────────────────── */
  .hero {
    display: block;
    margin: 0 auto;
    cursor: pointer;
    width: min(86%, 340px);
  }
  .solar {
    width: 100%;
    height: auto;
    overflow: visible;
  }
  .solar .cell {
    fill: var(--isc-cell);
    stroke: var(--isc-outline);
    stroke-width: 1.2;
    transition: fill 0.6s ease;
  }
  .solar .cell-lines {
    fill: none;
    stroke: var(--isc-cell-line);
    stroke-width: 0.9;
    opacity: 0.8;
  }
  .solar .sun-core {
    fill: var(--isc-outline);
    transition: fill 0.6s ease;
  }
  .solar .sun-rays {
    stroke: var(--isc-outline);
    transform-origin: 282px 30px;
  }
  .solar .moon,
  .solar .warn,
  .solar .shine {
    opacity: 0;
  }
  .solar .moon path,
  .solar .star {
    fill: var(--isc-outline);
  }

  /* producing / limited: sun turns, a shine sweeps the array (faster with more power) */
  .solar.producing .sun-core,
  .solar.limited .sun-core,
  .solar.starting .sun-core {
    fill: var(--isc-sun);
  }
  .solar.producing .sun-rays,
  .solar.limited .sun-rays,
  .solar.starting .sun-rays {
    stroke: var(--isc-sun);
  }
  .solar.producing .sun-rays,
  .solar.limited .sun-rays {
    animation: spin 24s linear infinite;
  }
  .solar.producing .shine,
  .solar.limited .shine {
    animation: shine var(--isc-shine-duration) ease-in-out infinite;
  }
  /* starting: rays breathe */
  .solar.starting .sun-rays {
    animation: breathe 1.6s ease-in-out infinite;
  }
  /* night: moon + stars, darker cells */
  .solar.night .sun {
    opacity: 0;
  }
  .solar.night .moon {
    opacity: 1;
  }
  .solar.night .cell {
    fill: var(--isc-cell-night);
  }
  .solar.night .star {
    animation: twinkle 3s ease-in-out infinite;
  }
  .solar.night .s2 {
    animation-delay: 1s;
  }
  .solar.night .s3 {
    animation-delay: 2s;
  }
  /* fault: warning sign blinks over the ridge */
  .solar.fault .warn {
    opacity: 1;
    animation: breathe 1.2s ease-in-out infinite;
  }
  .solar.unavailable {
    opacity: 0.45;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes shine {
    0% {
      transform: translateX(0) skewX(-20deg);
      opacity: 0;
    }
    15% {
      opacity: 1;
    }
    70%,
    100% {
      transform: translateX(400px) skewX(-20deg);
      opacity: 0;
    }
  }
  @keyframes breathe {
    0%,
    100% {
      opacity: 0.4;
    }
    50% {
      opacity: 1;
    }
  }
  @keyframes twinkle {
    0%,
    100% {
      opacity: 0.3;
    }
    50% {
      opacity: 1;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .solar * {
      animation: none !important;
    }
  }

  /* ── metadata ───────────────────────────────────────────────────────── */
  .metadata {
    margin: var(--isc-spacing) auto;
  }
  .plant-name {
    text-align: center;
    font-weight: bold;
    color: var(--isc-primary-text-color);
    font-size: 16px;
  }
  .status {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    color: var(--isc-secondary-text-color);
  }
  .status.fault {
    color: var(--isc-error);
  }
  .status.limited {
    color: var(--isc-warning);
  }
  .power {
    margin-top: 6px;
    font-size: 28px;
    font-weight: 500;
    color: var(--isc-primary-text-color);
    cursor: pointer;
  }
  .load {
    width: min(70%, 260px);
    margin: 6px auto 0;
  }
  .load-bar {
    height: 6px;
    border-radius: 3px;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.06));
    overflow: hidden;
  }
  .load-fill {
    height: 100%;
    border-radius: 3px;
    background: var(--isc-sun);
    transition: width 0.6s ease;
  }
  .load-text {
    margin-top: 4px;
    font-size: 0.8rem;
    color: var(--isc-secondary-text-color);
  }

  /* ── MPPT strings ───────────────────────────────────────────────────── */
  .strings {
    display: flex;
    justify-content: center;
    gap: 8px;
    flex-wrap: wrap;
    margin: 0 var(--isc-spacing) var(--isc-spacing);
  }
  .string {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: 14px;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
    color: var(--isc-secondary-text-color);
    font-size: 0.85rem;
    cursor: pointer;
  }
  .string ha-icon {
    --mdc-icon-size: 16px;
  }
  .string b {
    color: var(--isc-primary-text-color);
    font-weight: 500;
  }

  /* ── stats ──────────────────────────────────────────────────────────── */
  .stats {
    border-top: 1px solid var(--isc-divider-color);
    display: flex;
    justify-content: space-evenly;
    color: var(--isc-secondary-text-color);
  }
  .stats-block {
    cursor: pointer;
    padding: var(--isc-spacing) 4px;
    text-align: center;
    border-right: 1px solid var(--isc-divider-color);
    flex-grow: 1;
    min-width: 0;
  }
  .stats-block:last-of-type {
    border-right: 0;
  }
  .stats-value {
    font-size: 20px;
    color: var(--isc-primary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .stats-subtitle {
    font-size: 0.85rem;
  }

  /* ── toolbar ────────────────────────────────────────────────────────── */
  .toolbar {
    min-height: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    padding: 5px;
    border-top: 1px solid var(--isc-divider-color);
  }
  .toolbar .fill-gap {
    flex-grow: 1;
  }
  .toolbar ha-icon-button {
    color: var(--isc-secondary-text-color);
    width: 44px;
    height: 44px;
    --mdc-icon-button-size: 44px;
  }
  .toolbar ha-icon-button ha-icon {
    display: flex;
  }
  .toolbar .text-button {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: 0;
    background: transparent;
    color: var(--isc-secondary-text-color);
    font: inherit;
    padding: 12px 10px;
    cursor: pointer;
    border-radius: 8px;
  }
  .toolbar .text-button:hover {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
  }
  .toolbar .text-button.active ha-icon {
    color: var(--isc-warning);
  }
  .toolbar .text-button.danger {
    color: var(--isc-error);
  }
  .toolbar .text-button ha-icon {
    --mdc-icon-size: 20px;
  }
`;console.info("%c INTELBRAS-SOLAR-CARD %c v0.1.0 ","color: white; background: #00a335; font-weight: 700;","color: white; background: #23272e; font-weight: 700;");const Ut={default:[{key:"energy_today",subtitle:"stat.energy_today"},{key:"energy_month",subtitle:"stat.energy_month"},{key:"energy_total",subtitle:"stat.energy_total"}],night:[{key:"energy_today",subtitle:"stat.energy_today"},{key:"peak_power_today",subtitle:"stat.peak_power_today"},{key:"energy_total",subtitle:"stat.energy_total"}]};let Tt=class extends ct{constructor(){super(...arguments),this._entities={}}static{this.styles=Ot}static getStubConfig(t){const e=Object.values(t?.entities??{}).find(t=>t.platform===$t&&"work_state"===t.translation_key);return e?.device_id?{type:`custom:${yt}`,device:e.device_id}:e?{type:`custom:${yt}`,entities:{work_state:e.entity_id}}:{type:`custom:${yt}`}}static getConfigForm(){return{schema:[{name:"device",selector:{device:{filter:{integration:$t}}}},{name:"name",selector:{text:{}}},{type:"grid",name:"",schema:[{name:"show_name",selector:{boolean:{}}},{name:"show_status",selector:{boolean:{}}},{name:"show_strings",selector:{boolean:{}}},{name:"show_toolbar",selector:{boolean:{}}},{name:"compact_view",selector:{boolean:{}}}]}],computeLabel:t=>Mt(`editor.${t.name}`)}}setConfig(t){if(!t)throw new Error(Mt("common.invalid_config"));if(!t.device&&!t.entities?.work_state)throw new Error(Mt("common.missing_entity"));this._config={show_name:!0,show_status:!0,show_toolbar:!0,show_strings:!0,compact_view:!1,...t},this._entities=kt(this.hass,this._config)}getCardSize(){return this._config?.compact_view?3:8}getGridOptions(){return this._config?.compact_view?{columns:6,rows:3,min_columns:4,min_rows:2}:{columns:6,rows:8,min_columns:4,min_rows:6}}willUpdate(t){if(!t.has("hass")||!this._config)return;const e=t.get("hass");e&&e.entities===this.hass?.entities&&this._entities.work_state||(this._entities=kt(this.hass,this._config)),e&&e.themes?.darkMode===this.hass?.themes?.darkMode||this.toggleAttribute("dark-mode",Boolean(this.hass?.themes?.darkMode))}shouldUpdate(t){if(t.has("_config"))return!0;const e=t.get("hass");if(!e||!this.hass)return!0;return[...Object.values(this._entities),"sun.sun"].some(t=>t&&e.states[t]!==this.hass.states[t])}get _lang(){return t=this.hass,e=this._config?.language,e??t?.locale?.language??t?.language??"en";var t,e}_state(t){const e=this._entities[t];return e?this.hass?.states[e]:void 0}_format(t){if(!t||"unknown"===t.state||"unavailable"===t.state)return"—";if(this.hass?.formatEntityState)try{return this.hass.formatEntityState(t)}catch{}const e=t.attributes.unit_of_measurement;return e?`${t.state} ${e}`:t.state}_moreInfo(t){const e=t??this._entities.ac_power??this._entities.work_state;var i,s;e&&(i="hass-more-info",s={entityId:e},this.dispatchEvent(new CustomEvent(i,{detail:s,bubbles:!0,composed:!0})))}_press(t,e){const i=this._entities[t];i&&this.hass&&(e&&!window.confirm(Mt(e,this._lang))||this.hass.callService("button","press",{entity_id:i}))}_toggleLimit(){const t=this._state("power_limit_enabled");if(!t||!this.hass)return;const e="on"===t.state;window.confirm(Mt(e?"common.confirm_limit_off":"common.confirm_limit_on",this._lang))&&this.hass.callService("switch",e?"turn_off":"turn_on",{entity_id:t.entity_id})}_runShortcut(t){if(!this.hass)return;if(t.key)return void this._press(t.key);if(!t.service)return;const[e,i]=t.service.split(".");this.hass.callService(e,i,t.service_data,t.target)}render(){if(!this._config)return V;const t=function(t,e){if(!t)return"unavailable";const i=e.work_state?t.states[e.work_state]:void 0,s=e.online?t.states[e.online]?.state:void 0;if(!i||"unavailable"===i.state||"off"===s)return"unavailable";const o=e.fault?t.states[e.fault]?.state:void 0;if(xt.has(i.state)||"on"===o)return"fault";const n=St(t,e.ac_power)??0;return bt.has(i.state)&&n>0?"derating_run"===i.state?"limited":"producing":wt.has(i.state)?"starting":function(t){return"below_horizon"===t.states["sun.sun"]?.state}(t)?"night":"standby"}(this.hass,this._entities);if("unavailable"===t)return this._renderUnavailable();const e=function(t,e){const i=St(t,e.ac_power),s=St(t,e.nominal_power);return null!==i&&s?Math.max(0,Math.min(1,i/(1e3*s))):0}(this.hass,this._entities),i=`--isc-load:${e.toFixed(2)};--isc-shine-duration:${(6.5-3.5*e).toFixed(2)}s`;return W`
      <ha-card style=${i}>
        <div class="preview">
          <div class="header">
            <div class="tips">${this._renderTips()}</div>
            <ha-icon-button
              class="more-info"
              .label=${Mt("common.more_info",this._lang)}
              @click=${()=>this._moreInfo(this._entities.work_state)}
            >
              <ha-icon icon="mdi:dots-vertical"></ha-icon>
            </ha-icon-button>
          </div>
          ${this._config.compact_view?V:W`<div class="hero" @click=${()=>this._moreInfo()}>${vt(t)}</div>`}
          <div class="metadata">${this._renderName()} ${this._renderStatus(t,e)}</div>
          ${this._renderStrings(t)} ${this._renderStats(t)}
        </div>
        ${this._renderToolbar(t)}
      </ha-card>
    `}_renderUnavailable(){return W`
      <ha-card>
        <div class="preview not-available">
          ${this._config.compact_view?V:W`<div class="hero">${vt("unavailable")}</div>`}
          <div class="metadata">
            <div class="status">${Mt("common.not_available",this._lang)}</div>
          </div>
        </div>
      </ha-card>
    `}_tip(t,e,i=""){const s=this._state(t);return s?W`
      <div class="tip ${i}" title=${String(s.attributes.friendly_name??"")}
           @click=${()=>this._moreInfo(s.entity_id)}>
        <ha-icon icon=${e}></ha-icon>
        <span>${this._format(s)}</span>
      </div>
    `:V}_renderTips(){const t=St(this.hass,this._entities.active_alarms)??0;return W`
      ${this._tip("energy_today","mdi:solar-power-variant","energy")}
      ${this._tip("temperature","mdi:thermometer")}
      ${this._tip("wifi_signal","mdi:wifi")}
      ${t>0?W`<div class="tip alarm" @click=${()=>this._moreInfo(this._entities.active_alarms)}>
            <ha-icon icon="mdi:alert"></ha-icon>
            <span>${Mt("common.alarms",this._lang,{count:t})}</span>
          </div>`:V}
    `}_renderName(){if(!this._config.show_name)return V;const t=this._config.device?this.hass?.devices?.[this._config.device]:void 0,e=this._config.name??t?.name??"Intelbras Solar";return W`<div class="plant-name">${e}</div>`}_renderStatus(t,e){if(!this._config.show_status)return V;const i=this._state("work_state"),s=i&&this.hass?.formatEntityState&&"night"!==t?this._format(i):Mt(`status.${t}`,this._lang),o=this._state("ac_power"),n=St(this.hass,this._entities.nominal_power);return W`
      <div class="status ${t}"><span>${s}</span></div>
      ${o&&"night"!==t&&"fault"!==t?W`
            <div class="power" @click=${()=>this._moreInfo(o.entity_id)}>${this._format(o)}</div>
            ${n?W`<div class="load">
                  <div class="load-bar"><div class="load-fill" style="width:${(100*e).toFixed(1)}%"></div></div>
                  <div class="load-text">
                    ${Mt("common.of_nominal",this._lang,{percent:Math.round(100*e),nominal:String(n).replace(".",this._lang.startsWith("pt")?",":".")})}
                  </div>
                </div>`:V}
          `:V}
    `}_renderStrings(t){if(this._config.compact_view||!this._config.show_strings)return V;if("night"===t||"fault"===t)return V;const e=[["MPPT1","mppt1_power","mppt1_voltage"],["MPPT2","mppt2_power","mppt2_voltage"]].filter(([,t])=>this._entities[t]);return e.length?W`
      <div class="strings">
        ${e.map(([t,e,i])=>W`
            <div class="string" @click=${()=>this._moreInfo(this._entities[e])}>
              <ha-icon icon="mdi:solar-panel"></ha-icon>${t}
              <b>${this._format(this._state(e))}</b>${this._entities[i]?W`· ${this._format(this._state(i))}`:V}
            </div>
          `)}
      </div>
    `:V}_renderStats(t){if(this._config.compact_view)return V;const e=this._config.stats??{},i=(e[t]??e.default??Ut[t]??Ut.default).map(t=>{const e=t.entity??(t.key?this._entities[t.key]:void 0),i=e?this.hass?.states[e]:void 0;if(!i)return V;let s=this._format(i);t.attribute?s=String(i.attributes[t.attribute]??"—"):t.unit&&(s=`${i.state} ${t.unit}`);const o=t.subtitle?.startsWith("stat.")?Mt(t.subtitle,this._lang):t.subtitle??"";return W`
          <div class="stats-block" @click=${()=>this._moreInfo(e)}>
            <div class="stats-value">${s}</div>
            <div class="stats-subtitle">${o}</div>
          </div>
        `}).filter(t=>t!==V);return i.length?W`<div class="stats">${i}</div>`:V}_iconButton(t,e,i,s){if(!this._entities[t])return V;const o=Mt(i,this._lang);return W`
      <ha-icon-button .label=${o} title=${o} @click=${()=>this._press(t,s)}>
        <ha-icon icon=${e}></ha-icon>
      </ha-icon-button>
    `}_renderToolbar(t){if(!this._config.show_toolbar)return V;const e=(this._config.shortcuts??[]).map(t=>W`
        <ha-icon-button .label=${t.name??""} title=${t.name??""} @click=${()=>this._runShortcut(t)}>
          <ha-icon icon=${t.icon??"mdi:flash"}></ha-icon>
        </ha-icon-button>
      `),i=this._iconButton("reboot_datalogger","mdi:restart","common.restart_datalogger","common.confirm_restart");if("fault"===t){const t=this._state("fault_code");return W`
        <div class="toolbar">
          <button class="text-button danger" @click=${()=>this._moreInfo(this._entities.fault_code)}>
            <ha-icon icon="mdi:alert-circle"></ha-icon>
            ${Mt("common.fault_code",this._lang,{code:t?.state??"?"})}
          </button>
          <div class="fill-gap"></div>
          ${i} ${e}
        </div>
      `}const s=this._state("power_limit_enabled"),o=this._state("power_limit"),n="on"===s?.state;return W`
      <div class="toolbar">
        ${s?W`
              <button class="text-button ${n?"active":""}" @click=${()=>this._toggleLimit()}>
                <ha-icon icon=${n?"mdi:speedometer-medium":"mdi:speedometer"}></ha-icon>
                ${n?Mt("common.limit_on",this._lang,{percent:o?Math.round(Number(o.state)):"?"}):Mt("common.limit_off",this._lang)}
              </button>
            `:V}
        ${this._entities.power_limit?W`<ha-icon-button .label=${Mt("common.limit",this._lang)} title=${Mt("common.limit",this._lang)}
              @click=${()=>this._moreInfo(this._entities.power_limit)}>
              <ha-icon icon="mdi:tune-variant"></ha-icon>
            </ha-icon-button>`:V}
        ${this._iconButton("sync_clock","mdi:clock-check-outline","common.sync_clock")} ${i}
        <div class="fill-gap"></div>
        ${e}
      </div>
    `}};t([pt({attribute:!1})],Tt.prototype,"hass",void 0),t([function(t){return pt({...t,state:!0,attribute:!1})}()],Tt.prototype,"_config",void 0),Tt=t([(t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)})(yt)],Tt),window.customCards=window.customCards||[],window.customCards.push({type:yt,name:Mt("common.name"),description:Mt("common.description"),preview:!0,documentationURL:"https://github.com/hudsonbrendon/intelbras-solar-card",getEntitySuggestion:(t,e)=>{const i=t.entities?.[e];return i&&i.platform===$t&&"work_state"===i.translation_key?{config:i.device_id?{type:`custom:${yt}`,device:i.device_id}:{type:`custom:${yt}`,entities:{work_state:e}}}:null}});export{Tt as IntelbrasSolarCard};
//# sourceMappingURL=intelbras-solar-card.js.map
