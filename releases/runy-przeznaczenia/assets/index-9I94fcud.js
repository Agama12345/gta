(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=e(n);fetch(n.href,s)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const _r="169",oh=0,qr=1,rh=2,pl=1,ml=2,Oi=3,qi=0,Qe=1,we=2,cn=0,Qn=1,wa=2,jr=3,Xr=4,ch=5,En=100,lh=101,hh=102,dh=103,uh=104,fh=200,ph=201,mh=202,gh=203,zo=204,Po=205,vh=206,_h=207,xh=208,yh=209,Mh=210,wh=211,bh=212,Sh=213,Eh=214,ko=0,Io=1,Lo=2,is=3,Do=4,Uo=5,No=6,Fo=7,xr=0,Th=1,Ah=2,ln=0,Ch=1,Rh=2,zh=3,gl=4,Ph=5,kh=6,Ih=7,vl=300,ns=301,ss=302,ba=303,Oo=304,za=306,Ps=1e3,An=1001,Bo=1002,Je=1003,Lh=1004,Hs=1005,li=1006,Ha=1007,Cn=1008,ji=1009,_l=1010,xl=1011,ks=1012,yr=1013,Rn=1014,Ri=1015,Ls=1016,Mr=1017,wr=1018,as=1020,yl=35902,Ml=1021,wl=1022,Si=1023,bl=1024,Sl=1025,ts=1026,os=1027,br=1028,Sr=1029,El=1030,Er=1031,Tr=1033,ma=33776,ga=33777,va=33778,_a=33779,Ho=35840,Go=35841,Vo=35842,Wo=35843,qo=36196,jo=37492,Xo=37496,$o=37808,Ko=37809,Yo=37810,Zo=37811,Jo=37812,Qo=37813,tr=37814,er=37815,ir=37816,nr=37817,sr=37818,ar=37819,or=37820,rr=37821,xa=36492,cr=36494,lr=36495,Tl=36283,hr=36284,dr=36285,ur=36286,Dh=3200,Uh=3201,Ar=0,Nh=1,rn="",ri="srgb",un="srgb-linear",Cr="display-p3",Pa="display-p3-linear",Sa="linear",ye="srgb",Ea="rec709",Ta="p3",Dn=7680,$r=519,Fh=512,Oh=513,Bh=514,Al=515,Hh=516,Gh=517,Vh=518,Wh=519,Kr=35044,Yr="300 es",Vi=2e3,Aa=2001;class ls{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const n=this._listeners[t];if(n!==void 0){const s=n.indexOf(e);s!==-1&&n.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const n=i.slice(0);for(let s=0,o=n.length;s<o;s++)n[s].call(this,t);t.target=null}}}const Be=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ga=Math.PI/180,fr=180/Math.PI;function Ds(){const a=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Be[a&255]+Be[a>>8&255]+Be[a>>16&255]+Be[a>>24&255]+"-"+Be[t&255]+Be[t>>8&255]+"-"+Be[t>>16&15|64]+Be[t>>24&255]+"-"+Be[e&63|128]+Be[e>>8&255]+"-"+Be[e>>16&255]+Be[e>>24&255]+Be[i&255]+Be[i>>8&255]+Be[i>>16&255]+Be[i>>24&255]).toLowerCase()}function Ze(a,t,e){return Math.max(t,Math.min(e,a))}function qh(a,t){return(a%t+t)%t}function Va(a,t,e){return(1-e)*a+e*t}function us(a,t){switch(t.constructor){case Float32Array:return a;case Uint32Array:return a/4294967295;case Uint16Array:return a/65535;case Uint8Array:return a/255;case Int32Array:return Math.max(a/2147483647,-1);case Int16Array:return Math.max(a/32767,-1);case Int8Array:return Math.max(a/127,-1);default:throw new Error("Invalid component type.")}}function Ye(a,t){switch(t.constructor){case Float32Array:return a;case Uint32Array:return Math.round(a*4294967295);case Uint16Array:return Math.round(a*65535);case Uint8Array:return Math.round(a*255);case Int32Array:return Math.round(a*2147483647);case Int16Array:return Math.round(a*32767);case Int8Array:return Math.round(a*127);default:throw new Error("Invalid component type.")}}class jt{constructor(t=0,e=0){jt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,n=t.elements;return this.x=n[0]*e+n[3]*i+n[6],this.y=n[1]*e+n[4]*i+n[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Ze(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),n=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*i-o*n+t.x,this.y=s*n+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Gt{constructor(t,e,i,n,s,o,r,c,l){Gt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,n,s,o,r,c,l)}set(t,e,i,n,s,o,r,c,l){const h=this.elements;return h[0]=t,h[1]=n,h[2]=r,h[3]=e,h[4]=s,h[5]=c,h[6]=i,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,n=e.elements,s=this.elements,o=i[0],r=i[3],c=i[6],l=i[1],h=i[4],d=i[7],u=i[2],f=i[5],g=i[8],v=n[0],p=n[3],m=n[6],y=n[1],x=n[4],w=n[7],R=n[2],E=n[5],T=n[8];return s[0]=o*v+r*y+c*R,s[3]=o*p+r*x+c*E,s[6]=o*m+r*w+c*T,s[1]=l*v+h*y+d*R,s[4]=l*p+h*x+d*E,s[7]=l*m+h*w+d*T,s[2]=u*v+f*y+g*R,s[5]=u*p+f*x+g*E,s[8]=u*m+f*w+g*T,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],n=t[2],s=t[3],o=t[4],r=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*r*l-i*s*h+i*r*c+n*s*l-n*o*c}invert(){const t=this.elements,e=t[0],i=t[1],n=t[2],s=t[3],o=t[4],r=t[5],c=t[6],l=t[7],h=t[8],d=h*o-r*l,u=r*c-h*s,f=l*s-o*c,g=e*d+i*u+n*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return t[0]=d*v,t[1]=(n*l-h*i)*v,t[2]=(r*i-n*o)*v,t[3]=u*v,t[4]=(h*e-n*c)*v,t[5]=(n*s-r*e)*v,t[6]=f*v,t[7]=(i*c-l*e)*v,t[8]=(o*e-i*s)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,n,s,o,r){const c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*o+l*r)+o+t,-n*l,n*c,-n*(-l*o+c*r)+r+e,0,0,1),this}scale(t,e){return this.premultiply(Wa.makeScale(t,e)),this}rotate(t){return this.premultiply(Wa.makeRotation(-t)),this}translate(t,e){return this.premultiply(Wa.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let n=0;n<9;n++)if(e[n]!==i[n])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Wa=new Gt;function Cl(a){for(let t=a.length-1;t>=0;--t)if(a[t]>=65535)return!0;return!1}function Ca(a){return document.createElementNS("http://www.w3.org/1999/xhtml",a)}function jh(){const a=Ca("canvas");return a.style.display="block",a}const Zr={};function ya(a){a in Zr||(Zr[a]=!0,console.warn(a))}function Xh(a,t,e){return new Promise(function(i,n){function s(){switch(a.clientWaitSync(t,a.SYNC_FLUSH_COMMANDS_BIT,0)){case a.WAIT_FAILED:n();break;case a.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:i()}}setTimeout(s,e)})}function $h(a){const t=a.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Kh(a){const t=a.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Jr=new Gt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Qr=new Gt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),fs={[un]:{transfer:Sa,primaries:Ea,luminanceCoefficients:[.2126,.7152,.0722],toReference:a=>a,fromReference:a=>a},[ri]:{transfer:ye,primaries:Ea,luminanceCoefficients:[.2126,.7152,.0722],toReference:a=>a.convertSRGBToLinear(),fromReference:a=>a.convertLinearToSRGB()},[Pa]:{transfer:Sa,primaries:Ta,luminanceCoefficients:[.2289,.6917,.0793],toReference:a=>a.applyMatrix3(Qr),fromReference:a=>a.applyMatrix3(Jr)},[Cr]:{transfer:ye,primaries:Ta,luminanceCoefficients:[.2289,.6917,.0793],toReference:a=>a.convertSRGBToLinear().applyMatrix3(Qr),fromReference:a=>a.applyMatrix3(Jr).convertLinearToSRGB()}},Yh=new Set([un,Pa]),oe={enabled:!0,_workingColorSpace:un,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(a){if(!Yh.has(a))throw new Error(`Unsupported working color space, "${a}".`);this._workingColorSpace=a},convert:function(a,t,e){if(this.enabled===!1||t===e||!t||!e)return a;const i=fs[t].toReference,n=fs[e].fromReference;return n(i(a))},fromWorkingColorSpace:function(a,t){return this.convert(a,this._workingColorSpace,t)},toWorkingColorSpace:function(a,t){return this.convert(a,t,this._workingColorSpace)},getPrimaries:function(a){return fs[a].primaries},getTransfer:function(a){return a===rn?Sa:fs[a].transfer},getLuminanceCoefficients:function(a,t=this._workingColorSpace){return a.fromArray(fs[t].luminanceCoefficients)}};function es(a){return a<.04045?a*.0773993808:Math.pow(a*.9478672986+.0521327014,2.4)}function qa(a){return a<.0031308?a*12.92:1.055*Math.pow(a,.41666)-.055}let Un;class Zh{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Un===void 0&&(Un=Ca("canvas")),Un.width=t.width,Un.height=t.height;const i=Un.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=Un}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Ca("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const n=i.getImageData(0,0,t.width,t.height),s=n.data;for(let o=0;o<s.length;o++)s[o]=es(s[o]/255)*255;return i.putImageData(n,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(es(e[i]/255)*255):e[i]=es(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Jh=0;class Rl{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Jh++}),this.uuid=Ds(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},n=this.data;if(n!==null){let s;if(Array.isArray(n)){s=[];for(let o=0,r=n.length;o<r;o++)n[o].isDataTexture?s.push(ja(n[o].image)):s.push(ja(n[o]))}else s=ja(n);i.url=s}return e||(t.images[this.uuid]=i),i}}function ja(a){return typeof HTMLImageElement<"u"&&a instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&a instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&a instanceof ImageBitmap?Zh.getDataURL(a):a.data?{data:Array.from(a.data),width:a.width,height:a.height,type:a.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Qh=0;class Ve extends ls{constructor(t=Ve.DEFAULT_IMAGE,e=Ve.DEFAULT_MAPPING,i=An,n=An,s=li,o=Cn,r=Si,c=ji,l=Ve.DEFAULT_ANISOTROPY,h=rn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Qh++}),this.uuid=Ds(),this.name="",this.source=new Rl(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=n,this.magFilter=s,this.minFilter=o,this.anisotropy=l,this.format=r,this.internalFormat=null,this.type=c,this.offset=new jt(0,0),this.repeat=new jt(1,1),this.center=new jt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Gt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==vl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ps:t.x=t.x-Math.floor(t.x);break;case An:t.x=t.x<0?0:1;break;case Bo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ps:t.y=t.y-Math.floor(t.y);break;case An:t.y=t.y<0?0:1;break;case Bo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ve.DEFAULT_IMAGE=null;Ve.DEFAULT_MAPPING=vl;Ve.DEFAULT_ANISOTROPY=1;class pe{constructor(t=0,e=0,i=0,n=1){pe.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=n}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,n){return this.x=t,this.y=e,this.z=i,this.w=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,n=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*n+o[12]*s,this.y=o[1]*e+o[5]*i+o[9]*n+o[13]*s,this.z=o[2]*e+o[6]*i+o[10]*n+o[14]*s,this.w=o[3]*e+o[7]*i+o[11]*n+o[15]*s,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,n,s;const c=t.elements,l=c[0],h=c[4],d=c[8],u=c[1],f=c[5],g=c[9],v=c[2],p=c[6],m=c[10];if(Math.abs(h-u)<.01&&Math.abs(d-v)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+v)<.1&&Math.abs(g+p)<.1&&Math.abs(l+f+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const x=(l+1)/2,w=(f+1)/2,R=(m+1)/2,E=(h+u)/4,T=(d+v)/4,A=(g+p)/4;return x>w&&x>R?x<.01?(i=0,n=.707106781,s=.707106781):(i=Math.sqrt(x),n=E/i,s=T/i):w>R?w<.01?(i=.707106781,n=0,s=.707106781):(n=Math.sqrt(w),i=E/n,s=A/n):R<.01?(i=.707106781,n=.707106781,s=0):(s=Math.sqrt(R),i=T/s,n=A/s),this.set(i,n,s,e),this}let y=Math.sqrt((p-g)*(p-g)+(d-v)*(d-v)+(u-h)*(u-h));return Math.abs(y)<.001&&(y=1),this.x=(p-g)/y,this.y=(d-v)/y,this.z=(u-h)/y,this.w=Math.acos((l+f+m-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class td extends ls{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new pe(0,0,t,e),this.scissorTest=!1,this.viewport=new pe(0,0,t,e);const n={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:li,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new Ve(n,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let r=0;r<o;r++)this.textures[r]=s.clone(),this.textures[r].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let n=0,s=this.textures.length;n<s;n++)this.textures[n].image.width=t,this.textures[n].image.height=e,this.textures[n].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,n=t.textures.length;i<n;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Rl(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class zn extends td{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class zl extends Ve{constructor(t=null,e=1,i=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:n},this.magFilter=Je,this.minFilter=Je,this.wrapR=An,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class ed extends Ve{constructor(t=null,e=1,i=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:n},this.magFilter=Je,this.minFilter=Je,this.wrapR=An,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Us{constructor(t=0,e=0,i=0,n=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=n}static slerpFlat(t,e,i,n,s,o,r){let c=i[n+0],l=i[n+1],h=i[n+2],d=i[n+3];const u=s[o+0],f=s[o+1],g=s[o+2],v=s[o+3];if(r===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=d;return}if(r===1){t[e+0]=u,t[e+1]=f,t[e+2]=g,t[e+3]=v;return}if(d!==v||c!==u||l!==f||h!==g){let p=1-r;const m=c*u+l*f+h*g+d*v,y=m>=0?1:-1,x=1-m*m;if(x>Number.EPSILON){const R=Math.sqrt(x),E=Math.atan2(R,m*y);p=Math.sin(p*E)/R,r=Math.sin(r*E)/R}const w=r*y;if(c=c*p+u*w,l=l*p+f*w,h=h*p+g*w,d=d*p+v*w,p===1-r){const R=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=R,l*=R,h*=R,d*=R}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,i,n,s,o){const r=i[n],c=i[n+1],l=i[n+2],h=i[n+3],d=s[o],u=s[o+1],f=s[o+2],g=s[o+3];return t[e]=r*g+h*d+c*f-l*u,t[e+1]=c*g+h*u+l*d-r*f,t[e+2]=l*g+h*f+r*u-c*d,t[e+3]=h*g-r*d-c*u-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,n){return this._x=t,this._y=e,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,n=t._y,s=t._z,o=t._order,r=Math.cos,c=Math.sin,l=r(i/2),h=r(n/2),d=r(s/2),u=c(i/2),f=c(n/2),g=c(s/2);switch(o){case"XYZ":this._x=u*h*d+l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d+u*f*g;break;case"YZX":this._x=u*h*d+l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d-u*f*g;break;case"XZY":this._x=u*h*d-l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d+u*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,n=Math.sin(i);return this._x=t.x*n,this._y=t.y*n,this._z=t.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],n=e[4],s=e[8],o=e[1],r=e[5],c=e[9],l=e[2],h=e[6],d=e[10],u=i+r+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-c)*f,this._y=(s-l)*f,this._z=(o-n)*f}else if(i>r&&i>d){const f=2*Math.sqrt(1+i-r-d);this._w=(h-c)/f,this._x=.25*f,this._y=(n+o)/f,this._z=(s+l)/f}else if(r>d){const f=2*Math.sqrt(1+r-i-d);this._w=(s-l)/f,this._x=(n+o)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+d-i-r);this._w=(o-n)/f,this._x=(s+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ze(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const n=Math.min(1,e/i);return this.slerp(t,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,n=t._y,s=t._z,o=t._w,r=e._x,c=e._y,l=e._z,h=e._w;return this._x=i*h+o*r+n*l-s*c,this._y=n*h+o*c+s*r-i*l,this._z=s*h+o*l+i*c-n*r,this._w=o*h-i*r-n*c-s*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,n=this._y,s=this._z,o=this._w;let r=o*t._w+i*t._x+n*t._y+s*t._z;if(r<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,r=-r):this.copy(t),r>=1)return this._w=o,this._x=i,this._y=n,this._z=s,this;const c=1-r*r;if(c<=Number.EPSILON){const f=1-e;return this._w=f*o+e*this._w,this._x=f*i+e*this._x,this._y=f*n+e*this._y,this._z=f*s+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,r),d=Math.sin((1-e)*h)/l,u=Math.sin(e*h)/l;return this._w=o*d+this._w*u,this._x=i*d+this._x*u,this._y=n*d+this._y*u,this._z=s*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),n=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(n*Math.sin(t),n*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class z{constructor(t=0,e=0,i=0){z.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(tc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(tc.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,n=this.z,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6]*n,this.y=s[1]*e+s[4]*i+s[7]*n,this.z=s[2]*e+s[5]*i+s[8]*n,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,n=this.z,s=t.elements,o=1/(s[3]*e+s[7]*i+s[11]*n+s[15]);return this.x=(s[0]*e+s[4]*i+s[8]*n+s[12])*o,this.y=(s[1]*e+s[5]*i+s[9]*n+s[13])*o,this.z=(s[2]*e+s[6]*i+s[10]*n+s[14])*o,this}applyQuaternion(t){const e=this.x,i=this.y,n=this.z,s=t.x,o=t.y,r=t.z,c=t.w,l=2*(o*n-r*i),h=2*(r*e-s*n),d=2*(s*i-o*e);return this.x=e+c*l+o*d-r*h,this.y=i+c*h+r*l-s*d,this.z=n+c*d+s*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,n=this.z,s=t.elements;return this.x=s[0]*e+s[4]*i+s[8]*n,this.y=s[1]*e+s[5]*i+s[9]*n,this.z=s[2]*e+s[6]*i+s[10]*n,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,n=t.y,s=t.z,o=e.x,r=e.y,c=e.z;return this.x=n*c-s*r,this.y=s*o-i*c,this.z=i*r-n*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Xa.copy(this).projectOnVector(t),this.sub(Xa)}reflect(t){return this.sub(Xa.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Ze(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,n=this.z-t.z;return e*e+i*i+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const n=Math.sin(e)*t;return this.x=n*Math.sin(i),this.y=Math.cos(e)*t,this.z=n*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),n=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=n,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Xa=new z,tc=new Us;class kn{constructor(t=new z(1/0,1/0,1/0),e=new z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(xi.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(xi.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=xi.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const s=i.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,r=s.count;o<r;o++)t.isMesh===!0?t.getVertexPosition(o,xi):xi.fromBufferAttribute(s,o),xi.applyMatrix4(t.matrixWorld),this.expandByPoint(xi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Gs.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Gs.copy(i.boundingBox)),Gs.applyMatrix4(t.matrixWorld),this.union(Gs)}const n=t.children;for(let s=0,o=n.length;s<o;s++)this.expandByObject(n[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,xi),xi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ps),Vs.subVectors(this.max,ps),Nn.subVectors(t.a,ps),Fn.subVectors(t.b,ps),On.subVectors(t.c,ps),$i.subVectors(Fn,Nn),Ki.subVectors(On,Fn),mn.subVectors(Nn,On);let e=[0,-$i.z,$i.y,0,-Ki.z,Ki.y,0,-mn.z,mn.y,$i.z,0,-$i.x,Ki.z,0,-Ki.x,mn.z,0,-mn.x,-$i.y,$i.x,0,-Ki.y,Ki.x,0,-mn.y,mn.x,0];return!$a(e,Nn,Fn,On,Vs)||(e=[1,0,0,0,1,0,0,0,1],!$a(e,Nn,Fn,On,Vs))?!1:(Ws.crossVectors($i,Ki),e=[Ws.x,Ws.y,Ws.z],$a(e,Nn,Fn,On,Vs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,xi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(xi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ki[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ki[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ki[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ki[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ki[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ki[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ki[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ki[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ki),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const ki=[new z,new z,new z,new z,new z,new z,new z,new z],xi=new z,Gs=new kn,Nn=new z,Fn=new z,On=new z,$i=new z,Ki=new z,mn=new z,ps=new z,Vs=new z,Ws=new z,gn=new z;function $a(a,t,e,i,n){for(let s=0,o=a.length-3;s<=o;s+=3){gn.fromArray(a,s);const r=n.x*Math.abs(gn.x)+n.y*Math.abs(gn.y)+n.z*Math.abs(gn.z),c=t.dot(gn),l=e.dot(gn),h=i.dot(gn);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>r)return!1}return!0}const id=new kn,ms=new z,Ka=new z;class hs{constructor(t=new z,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):id.setFromPoints(t).getCenter(i);let n=0;for(let s=0,o=t.length;s<o;s++)n=Math.max(n,i.distanceToSquared(t[s]));return this.radius=Math.sqrt(n),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ms.subVectors(t,this.center);const e=ms.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),n=(i-this.radius)*.5;this.center.addScaledVector(ms,n/i),this.radius+=n}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ka.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ms.copy(t.center).add(Ka)),this.expandByPoint(ms.copy(t.center).sub(Ka))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Ii=new z,Ya=new z,qs=new z,Yi=new z,Za=new z,js=new z,Ja=new z;class Pl{constructor(t=new z,e=new z(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Ii)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Ii.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Ii.copy(this.origin).addScaledVector(this.direction,e),Ii.distanceToSquared(t))}distanceSqToSegment(t,e,i,n){Ya.copy(t).add(e).multiplyScalar(.5),qs.copy(e).sub(t).normalize(),Yi.copy(this.origin).sub(Ya);const s=t.distanceTo(e)*.5,o=-this.direction.dot(qs),r=Yi.dot(this.direction),c=-Yi.dot(qs),l=Yi.lengthSq(),h=Math.abs(1-o*o);let d,u,f,g;if(h>0)if(d=o*c-r,u=o*r-c,g=s*h,d>=0)if(u>=-g)if(u<=g){const v=1/h;d*=v,u*=v,f=d*(d+o*u+2*r)+u*(o*d+u+2*c)+l}else u=s,d=Math.max(0,-(o*u+r)),f=-d*d+u*(u+2*c)+l;else u=-s,d=Math.max(0,-(o*u+r)),f=-d*d+u*(u+2*c)+l;else u<=-g?(d=Math.max(0,-(-o*s+r)),u=d>0?-s:Math.min(Math.max(-s,-c),s),f=-d*d+u*(u+2*c)+l):u<=g?(d=0,u=Math.min(Math.max(-s,-c),s),f=u*(u+2*c)+l):(d=Math.max(0,-(o*s+r)),u=d>0?s:Math.min(Math.max(-s,-c),s),f=-d*d+u*(u+2*c)+l);else u=o>0?-s:s,d=Math.max(0,-(o*u+r)),f=-d*d+u*(u+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,d),n&&n.copy(Ya).addScaledVector(qs,u),f}intersectSphere(t,e){Ii.subVectors(t.center,this.origin);const i=Ii.dot(this.direction),n=Ii.dot(Ii)-i*i,s=t.radius*t.radius;if(n>s)return null;const o=Math.sqrt(s-n),r=i-o,c=i+o;return c<0?null:r<0?this.at(c,e):this.at(r,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,n,s,o,r,c;const l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return l>=0?(i=(t.min.x-u.x)*l,n=(t.max.x-u.x)*l):(i=(t.max.x-u.x)*l,n=(t.min.x-u.x)*l),h>=0?(s=(t.min.y-u.y)*h,o=(t.max.y-u.y)*h):(s=(t.max.y-u.y)*h,o=(t.min.y-u.y)*h),i>o||s>n||((s>i||isNaN(i))&&(i=s),(o<n||isNaN(n))&&(n=o),d>=0?(r=(t.min.z-u.z)*d,c=(t.max.z-u.z)*d):(r=(t.max.z-u.z)*d,c=(t.min.z-u.z)*d),i>c||r>n)||((r>i||i!==i)&&(i=r),(c<n||n!==n)&&(n=c),n<0)?null:this.at(i>=0?i:n,e)}intersectsBox(t){return this.intersectBox(t,Ii)!==null}intersectTriangle(t,e,i,n,s){Za.subVectors(e,t),js.subVectors(i,t),Ja.crossVectors(Za,js);let o=this.direction.dot(Ja),r;if(o>0){if(n)return null;r=1}else if(o<0)r=-1,o=-o;else return null;Yi.subVectors(this.origin,t);const c=r*this.direction.dot(js.crossVectors(Yi,js));if(c<0)return null;const l=r*this.direction.dot(Za.cross(Yi));if(l<0||c+l>o)return null;const h=-r*Yi.dot(Ja);return h<0?null:this.at(h/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class me{constructor(t,e,i,n,s,o,r,c,l,h,d,u,f,g,v,p){me.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,n,s,o,r,c,l,h,d,u,f,g,v,p)}set(t,e,i,n,s,o,r,c,l,h,d,u,f,g,v,p){const m=this.elements;return m[0]=t,m[4]=e,m[8]=i,m[12]=n,m[1]=s,m[5]=o,m[9]=r,m[13]=c,m[2]=l,m[6]=h,m[10]=d,m[14]=u,m[3]=f,m[7]=g,m[11]=v,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new me().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,n=1/Bn.setFromMatrixColumn(t,0).length(),s=1/Bn.setFromMatrixColumn(t,1).length(),o=1/Bn.setFromMatrixColumn(t,2).length();return e[0]=i[0]*n,e[1]=i[1]*n,e[2]=i[2]*n,e[3]=0,e[4]=i[4]*s,e[5]=i[5]*s,e[6]=i[6]*s,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,n=t.y,s=t.z,o=Math.cos(i),r=Math.sin(i),c=Math.cos(n),l=Math.sin(n),h=Math.cos(s),d=Math.sin(s);if(t.order==="XYZ"){const u=o*h,f=o*d,g=r*h,v=r*d;e[0]=c*h,e[4]=-c*d,e[8]=l,e[1]=f+g*l,e[5]=u-v*l,e[9]=-r*c,e[2]=v-u*l,e[6]=g+f*l,e[10]=o*c}else if(t.order==="YXZ"){const u=c*h,f=c*d,g=l*h,v=l*d;e[0]=u+v*r,e[4]=g*r-f,e[8]=o*l,e[1]=o*d,e[5]=o*h,e[9]=-r,e[2]=f*r-g,e[6]=v+u*r,e[10]=o*c}else if(t.order==="ZXY"){const u=c*h,f=c*d,g=l*h,v=l*d;e[0]=u-v*r,e[4]=-o*d,e[8]=g+f*r,e[1]=f+g*r,e[5]=o*h,e[9]=v-u*r,e[2]=-o*l,e[6]=r,e[10]=o*c}else if(t.order==="ZYX"){const u=o*h,f=o*d,g=r*h,v=r*d;e[0]=c*h,e[4]=g*l-f,e[8]=u*l+v,e[1]=c*d,e[5]=v*l+u,e[9]=f*l-g,e[2]=-l,e[6]=r*c,e[10]=o*c}else if(t.order==="YZX"){const u=o*c,f=o*l,g=r*c,v=r*l;e[0]=c*h,e[4]=v-u*d,e[8]=g*d+f,e[1]=d,e[5]=o*h,e[9]=-r*h,e[2]=-l*h,e[6]=f*d+g,e[10]=u-v*d}else if(t.order==="XZY"){const u=o*c,f=o*l,g=r*c,v=r*l;e[0]=c*h,e[4]=-d,e[8]=l*h,e[1]=u*d+v,e[5]=o*h,e[9]=f*d-g,e[2]=g*d-f,e[6]=r*h,e[10]=v*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(nd,t,sd)}lookAt(t,e,i){const n=this.elements;return ni.subVectors(t,e),ni.lengthSq()===0&&(ni.z=1),ni.normalize(),Zi.crossVectors(i,ni),Zi.lengthSq()===0&&(Math.abs(i.z)===1?ni.x+=1e-4:ni.z+=1e-4,ni.normalize(),Zi.crossVectors(i,ni)),Zi.normalize(),Xs.crossVectors(ni,Zi),n[0]=Zi.x,n[4]=Xs.x,n[8]=ni.x,n[1]=Zi.y,n[5]=Xs.y,n[9]=ni.y,n[2]=Zi.z,n[6]=Xs.z,n[10]=ni.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,n=e.elements,s=this.elements,o=i[0],r=i[4],c=i[8],l=i[12],h=i[1],d=i[5],u=i[9],f=i[13],g=i[2],v=i[6],p=i[10],m=i[14],y=i[3],x=i[7],w=i[11],R=i[15],E=n[0],T=n[4],A=n[8],I=n[12],_=n[1],M=n[5],P=n[9],O=n[13],B=n[2],q=n[6],G=n[10],K=n[14],X=n[3],ct=n[7],dt=n[11],Mt=n[15];return s[0]=o*E+r*_+c*B+l*X,s[4]=o*T+r*M+c*q+l*ct,s[8]=o*A+r*P+c*G+l*dt,s[12]=o*I+r*O+c*K+l*Mt,s[1]=h*E+d*_+u*B+f*X,s[5]=h*T+d*M+u*q+f*ct,s[9]=h*A+d*P+u*G+f*dt,s[13]=h*I+d*O+u*K+f*Mt,s[2]=g*E+v*_+p*B+m*X,s[6]=g*T+v*M+p*q+m*ct,s[10]=g*A+v*P+p*G+m*dt,s[14]=g*I+v*O+p*K+m*Mt,s[3]=y*E+x*_+w*B+R*X,s[7]=y*T+x*M+w*q+R*ct,s[11]=y*A+x*P+w*G+R*dt,s[15]=y*I+x*O+w*K+R*Mt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],n=t[8],s=t[12],o=t[1],r=t[5],c=t[9],l=t[13],h=t[2],d=t[6],u=t[10],f=t[14],g=t[3],v=t[7],p=t[11],m=t[15];return g*(+s*c*d-n*l*d-s*r*u+i*l*u+n*r*f-i*c*f)+v*(+e*c*f-e*l*u+s*o*u-n*o*f+n*l*h-s*c*h)+p*(+e*l*d-e*r*f-s*o*d+i*o*f+s*r*h-i*l*h)+m*(-n*r*h-e*c*d+e*r*u+n*o*d-i*o*u+i*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const n=this.elements;return t.isVector3?(n[12]=t.x,n[13]=t.y,n[14]=t.z):(n[12]=t,n[13]=e,n[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],n=t[2],s=t[3],o=t[4],r=t[5],c=t[6],l=t[7],h=t[8],d=t[9],u=t[10],f=t[11],g=t[12],v=t[13],p=t[14],m=t[15],y=d*p*l-v*u*l+v*c*f-r*p*f-d*c*m+r*u*m,x=g*u*l-h*p*l-g*c*f+o*p*f+h*c*m-o*u*m,w=h*v*l-g*d*l+g*r*f-o*v*f-h*r*m+o*d*m,R=g*d*c-h*v*c-g*r*u+o*v*u+h*r*p-o*d*p,E=e*y+i*x+n*w+s*R;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/E;return t[0]=y*T,t[1]=(v*u*s-d*p*s-v*n*f+i*p*f+d*n*m-i*u*m)*T,t[2]=(r*p*s-v*c*s+v*n*l-i*p*l-r*n*m+i*c*m)*T,t[3]=(d*c*s-r*u*s-d*n*l+i*u*l+r*n*f-i*c*f)*T,t[4]=x*T,t[5]=(h*p*s-g*u*s+g*n*f-e*p*f-h*n*m+e*u*m)*T,t[6]=(g*c*s-o*p*s-g*n*l+e*p*l+o*n*m-e*c*m)*T,t[7]=(o*u*s-h*c*s+h*n*l-e*u*l-o*n*f+e*c*f)*T,t[8]=w*T,t[9]=(g*d*s-h*v*s-g*i*f+e*v*f+h*i*m-e*d*m)*T,t[10]=(o*v*s-g*r*s+g*i*l-e*v*l-o*i*m+e*r*m)*T,t[11]=(h*r*s-o*d*s-h*i*l+e*d*l+o*i*f-e*r*f)*T,t[12]=R*T,t[13]=(h*v*n-g*d*n+g*i*u-e*v*u-h*i*p+e*d*p)*T,t[14]=(g*r*n-o*v*n-g*i*c+e*v*c+o*i*p-e*r*p)*T,t[15]=(o*d*n-h*r*n+h*i*c-e*d*c-o*i*u+e*r*u)*T,this}scale(t){const e=this.elements,i=t.x,n=t.y,s=t.z;return e[0]*=i,e[4]*=n,e[8]*=s,e[1]*=i,e[5]*=n,e[9]*=s,e[2]*=i,e[6]*=n,e[10]*=s,e[3]*=i,e[7]*=n,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],n=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,n))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),n=Math.sin(e),s=1-i,o=t.x,r=t.y,c=t.z,l=s*o,h=s*r;return this.set(l*o+i,l*r-n*c,l*c+n*r,0,l*r+n*c,h*r+i,h*c-n*o,0,l*c-n*r,h*c+n*o,s*c*c+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,n,s,o){return this.set(1,i,s,0,t,1,o,0,e,n,1,0,0,0,0,1),this}compose(t,e,i){const n=this.elements,s=e._x,o=e._y,r=e._z,c=e._w,l=s+s,h=o+o,d=r+r,u=s*l,f=s*h,g=s*d,v=o*h,p=o*d,m=r*d,y=c*l,x=c*h,w=c*d,R=i.x,E=i.y,T=i.z;return n[0]=(1-(v+m))*R,n[1]=(f+w)*R,n[2]=(g-x)*R,n[3]=0,n[4]=(f-w)*E,n[5]=(1-(u+m))*E,n[6]=(p+y)*E,n[7]=0,n[8]=(g+x)*T,n[9]=(p-y)*T,n[10]=(1-(u+v))*T,n[11]=0,n[12]=t.x,n[13]=t.y,n[14]=t.z,n[15]=1,this}decompose(t,e,i){const n=this.elements;let s=Bn.set(n[0],n[1],n[2]).length();const o=Bn.set(n[4],n[5],n[6]).length(),r=Bn.set(n[8],n[9],n[10]).length();this.determinant()<0&&(s=-s),t.x=n[12],t.y=n[13],t.z=n[14],yi.copy(this);const l=1/s,h=1/o,d=1/r;return yi.elements[0]*=l,yi.elements[1]*=l,yi.elements[2]*=l,yi.elements[4]*=h,yi.elements[5]*=h,yi.elements[6]*=h,yi.elements[8]*=d,yi.elements[9]*=d,yi.elements[10]*=d,e.setFromRotationMatrix(yi),i.x=s,i.y=o,i.z=r,this}makePerspective(t,e,i,n,s,o,r=Vi){const c=this.elements,l=2*s/(e-t),h=2*s/(i-n),d=(e+t)/(e-t),u=(i+n)/(i-n);let f,g;if(r===Vi)f=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(r===Aa)f=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+r);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=u,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,n,s,o,r=Vi){const c=this.elements,l=1/(e-t),h=1/(i-n),d=1/(o-s),u=(e+t)*l,f=(i+n)*h;let g,v;if(r===Vi)g=(o+s)*d,v=-2*d;else if(r===Aa)g=s*d,v=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+r);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-u,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=v,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let n=0;n<16;n++)if(e[n]!==i[n])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const Bn=new z,yi=new me,nd=new z(0,0,0),sd=new z(1,1,1),Zi=new z,Xs=new z,ni=new z,ec=new me,ic=new Us;class Ei{constructor(t=0,e=0,i=0,n=Ei.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=n}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,n=this._order){return this._x=t,this._y=e,this._z=i,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const n=t.elements,s=n[0],o=n[4],r=n[8],c=n[1],l=n[5],h=n[9],d=n[2],u=n[6],f=n[10];switch(e){case"XYZ":this._y=Math.asin(Ze(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ze(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(r,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ze(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Ze(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Ze(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(r,f));break;case"XZY":this._z=Math.asin(-Ze(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(r,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return ec.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ec,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return ic.setFromEuler(this),this.setFromQuaternion(ic,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ei.DEFAULT_ORDER="XYZ";class kl{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let ad=0;const nc=new z,Hn=new Us,Li=new me,$s=new z,gs=new z,od=new z,rd=new Us,sc=new z(1,0,0),ac=new z(0,1,0),oc=new z(0,0,1),rc={type:"added"},cd={type:"removed"},Gn={type:"childadded",child:null},Qa={type:"childremoved",child:null};class Ie extends ls{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ad++}),this.uuid=Ds(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ie.DEFAULT_UP.clone();const t=new z,e=new Ei,i=new Us,n=new z(1,1,1);function s(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new me},normalMatrix:{value:new Gt}}),this.matrix=new me,this.matrixWorld=new me,this.matrixAutoUpdate=Ie.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ie.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new kl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Hn.setFromAxisAngle(t,e),this.quaternion.multiply(Hn),this}rotateOnWorldAxis(t,e){return Hn.setFromAxisAngle(t,e),this.quaternion.premultiply(Hn),this}rotateX(t){return this.rotateOnAxis(sc,t)}rotateY(t){return this.rotateOnAxis(ac,t)}rotateZ(t){return this.rotateOnAxis(oc,t)}translateOnAxis(t,e){return nc.copy(t).applyQuaternion(this.quaternion),this.position.add(nc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(sc,t)}translateY(t){return this.translateOnAxis(ac,t)}translateZ(t){return this.translateOnAxis(oc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Li.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?$s.copy(t):$s.set(t,e,i);const n=this.parent;this.updateWorldMatrix(!0,!1),gs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Li.lookAt(gs,$s,this.up):Li.lookAt($s,gs,this.up),this.quaternion.setFromRotationMatrix(Li),n&&(Li.extractRotation(n.matrixWorld),Hn.setFromRotationMatrix(Li),this.quaternion.premultiply(Hn.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(rc),Gn.child=t,this.dispatchEvent(Gn),Gn.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(cd),Qa.child=t,this.dispatchEvent(Qa),Qa.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Li.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Li.multiply(t.parent.matrixWorld)),t.applyMatrix4(Li),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(rc),Gn.child=t,this.dispatchEvent(Gn),Gn.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,n=this.children.length;i<n;i++){const o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const n=this.children;for(let s=0,o=n.length;s<o;s++)n[s].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gs,t,od),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gs,rd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const n=this.children;for(let s=0,o=n.length;s<o;s++)n[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const n={};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.castShadow===!0&&(n.castShadow=!0),this.receiveShadow===!0&&(n.receiveShadow=!0),this.visible===!1&&(n.visible=!1),this.frustumCulled===!1&&(n.frustumCulled=!1),this.renderOrder!==0&&(n.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(n.matrixAutoUpdate=!1),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(n.type="BatchedMesh",n.perObjectFrustumCulled=this.perObjectFrustumCulled,n.sortObjects=this.sortObjects,n.drawRanges=this._drawRanges,n.reservedRanges=this._reservedRanges,n.visibility=this._visibility,n.active=this._active,n.bounds=this._bounds.map(r=>({boxInitialized:r.boxInitialized,boxMin:r.box.min.toArray(),boxMax:r.box.max.toArray(),sphereInitialized:r.sphereInitialized,sphereRadius:r.sphere.radius,sphereCenter:r.sphere.center.toArray()})),n.maxInstanceCount=this._maxInstanceCount,n.maxVertexCount=this._maxVertexCount,n.maxIndexCount=this._maxIndexCount,n.geometryInitialized=this._geometryInitialized,n.geometryCount=this._geometryCount,n.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(n.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(n.boundingSphere={center:n.boundingSphere.center.toArray(),radius:n.boundingSphere.radius}),this.boundingBox!==null&&(n.boundingBox={min:n.boundingBox.min.toArray(),max:n.boundingBox.max.toArray()}));function s(r,c){return r[c.uuid]===void 0&&(r[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=s(t.geometries,this.geometry);const r=this.geometry.parameters;if(r!==void 0&&r.shapes!==void 0){const c=r.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const d=c[l];s(t.shapes,d)}else s(t.shapes,c)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const r=[];for(let c=0,l=this.material.length;c<l;c++)r.push(s(t.materials,this.material[c]));n.material=r}else n.material=s(t.materials,this.material);if(this.children.length>0){n.children=[];for(let r=0;r<this.children.length;r++)n.children.push(this.children[r].toJSON(t).object)}if(this.animations.length>0){n.animations=[];for(let r=0;r<this.animations.length;r++){const c=this.animations[r];n.animations.push(s(t.animations,c))}}if(e){const r=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),d=o(t.shapes),u=o(t.skeletons),f=o(t.animations),g=o(t.nodes);r.length>0&&(i.geometries=r),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),d.length>0&&(i.shapes=d),u.length>0&&(i.skeletons=u),f.length>0&&(i.animations=f),g.length>0&&(i.nodes=g)}return i.object=n,i;function o(r){const c=[];for(const l in r){const h=r[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const n=t.children[i];this.add(n.clone())}return this}}Ie.DEFAULT_UP=new z(0,1,0);Ie.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ie.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Mi=new z,Di=new z,to=new z,Ui=new z,Vn=new z,Wn=new z,cc=new z,eo=new z,io=new z,no=new z,so=new pe,ao=new pe,oo=new pe;class bi{constructor(t=new z,e=new z,i=new z){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,n){n.subVectors(i,e),Mi.subVectors(t,e),n.cross(Mi);const s=n.lengthSq();return s>0?n.multiplyScalar(1/Math.sqrt(s)):n.set(0,0,0)}static getBarycoord(t,e,i,n,s){Mi.subVectors(n,e),Di.subVectors(i,e),to.subVectors(t,e);const o=Mi.dot(Mi),r=Mi.dot(Di),c=Mi.dot(to),l=Di.dot(Di),h=Di.dot(to),d=o*l-r*r;if(d===0)return s.set(0,0,0),null;const u=1/d,f=(l*c-r*h)*u,g=(o*h-r*c)*u;return s.set(1-f-g,g,f)}static containsPoint(t,e,i,n){return this.getBarycoord(t,e,i,n,Ui)===null?!1:Ui.x>=0&&Ui.y>=0&&Ui.x+Ui.y<=1}static getInterpolation(t,e,i,n,s,o,r,c){return this.getBarycoord(t,e,i,n,Ui)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Ui.x),c.addScaledVector(o,Ui.y),c.addScaledVector(r,Ui.z),c)}static getInterpolatedAttribute(t,e,i,n,s,o){return so.setScalar(0),ao.setScalar(0),oo.setScalar(0),so.fromBufferAttribute(t,e),ao.fromBufferAttribute(t,i),oo.fromBufferAttribute(t,n),o.setScalar(0),o.addScaledVector(so,s.x),o.addScaledVector(ao,s.y),o.addScaledVector(oo,s.z),o}static isFrontFacing(t,e,i,n){return Mi.subVectors(i,e),Di.subVectors(t,e),Mi.cross(Di).dot(n)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,n){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[n]),this}setFromAttributeAndIndices(t,e,i,n){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,n),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Mi.subVectors(this.c,this.b),Di.subVectors(this.a,this.b),Mi.cross(Di).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return bi.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return bi.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,n,s){return bi.getInterpolation(t,this.a,this.b,this.c,e,i,n,s)}containsPoint(t){return bi.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return bi.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,n=this.b,s=this.c;let o,r;Vn.subVectors(n,i),Wn.subVectors(s,i),eo.subVectors(t,i);const c=Vn.dot(eo),l=Wn.dot(eo);if(c<=0&&l<=0)return e.copy(i);io.subVectors(t,n);const h=Vn.dot(io),d=Wn.dot(io);if(h>=0&&d<=h)return e.copy(n);const u=c*d-h*l;if(u<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(i).addScaledVector(Vn,o);no.subVectors(t,s);const f=Vn.dot(no),g=Wn.dot(no);if(g>=0&&f<=g)return e.copy(s);const v=f*l-c*g;if(v<=0&&l>=0&&g<=0)return r=l/(l-g),e.copy(i).addScaledVector(Wn,r);const p=h*g-f*d;if(p<=0&&d-h>=0&&f-g>=0)return cc.subVectors(s,n),r=(d-h)/(d-h+(f-g)),e.copy(n).addScaledVector(cc,r);const m=1/(p+v+u);return o=v*m,r=u*m,e.copy(i).addScaledVector(Vn,o).addScaledVector(Wn,r)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Il={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ji={h:0,s:0,l:0},Ks={h:0,s:0,l:0};function ro(a,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?a+(t-a)*6*e:e<1/2?t:e<2/3?a+(t-a)*6*(2/3-e):a}class nt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const n=t;n&&n.isColor?this.copy(n):typeof n=="number"?this.setHex(n):typeof n=="string"&&this.setStyle(n)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ri){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,oe.toWorkingColorSpace(this,e),this}setRGB(t,e,i,n=oe.workingColorSpace){return this.r=t,this.g=e,this.b=i,oe.toWorkingColorSpace(this,n),this}setHSL(t,e,i,n=oe.workingColorSpace){if(t=qh(t,1),e=Ze(e,0,1),i=Ze(i,0,1),e===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+e):i+e-i*e,o=2*i-s;this.r=ro(o,s,t+1/3),this.g=ro(o,s,t),this.b=ro(o,s,t-1/3)}return oe.toWorkingColorSpace(this,n),this}setStyle(t,e=ri){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let n;if(n=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const o=n[1],r=n[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=n[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ri){const i=Il[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=es(t.r),this.g=es(t.g),this.b=es(t.b),this}copyLinearToSRGB(t){return this.r=qa(t.r),this.g=qa(t.g),this.b=qa(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ri){return oe.fromWorkingColorSpace(He.copy(this),t),Math.round(Ze(He.r*255,0,255))*65536+Math.round(Ze(He.g*255,0,255))*256+Math.round(Ze(He.b*255,0,255))}getHexString(t=ri){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=oe.workingColorSpace){oe.fromWorkingColorSpace(He.copy(this),e);const i=He.r,n=He.g,s=He.b,o=Math.max(i,n,s),r=Math.min(i,n,s);let c,l;const h=(r+o)/2;if(r===o)c=0,l=0;else{const d=o-r;switch(l=h<=.5?d/(o+r):d/(2-o-r),o){case i:c=(n-s)/d+(n<s?6:0);break;case n:c=(s-i)/d+2;break;case s:c=(i-n)/d+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=oe.workingColorSpace){return oe.fromWorkingColorSpace(He.copy(this),e),t.r=He.r,t.g=He.g,t.b=He.b,t}getStyle(t=ri){oe.fromWorkingColorSpace(He.copy(this),t);const e=He.r,i=He.g,n=He.b;return t!==ri?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(n*255)})`}offsetHSL(t,e,i){return this.getHSL(Ji),this.setHSL(Ji.h+t,Ji.s+e,Ji.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Ji),t.getHSL(Ks);const i=Va(Ji.h,Ks.h,e),n=Va(Ji.s,Ks.s,e),s=Va(Ji.l,Ks.l,e);return this.setHSL(i,n,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,n=this.b,s=t.elements;return this.r=s[0]*e+s[3]*i+s[6]*n,this.g=s[1]*e+s[4]*i+s[7]*n,this.b=s[2]*e+s[5]*i+s[8]*n,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const He=new nt;nt.NAMES=Il;let ld=0;class In extends ls{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ld++}),this.uuid=Ds(),this.name="",this.type="Material",this.blending=Qn,this.side=qi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=zo,this.blendDst=Po,this.blendEquation=En,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new nt(0,0,0),this.blendAlpha=0,this.depthFunc=is,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=$r,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Dn,this.stencilZFail=Dn,this.stencilZPass=Dn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const n=this[e];if(n===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}n&&n.isColor?n.set(i):n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Qn&&(i.blending=this.blending),this.side!==qi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==zo&&(i.blendSrc=this.blendSrc),this.blendDst!==Po&&(i.blendDst=this.blendDst),this.blendEquation!==En&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==is&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==$r&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Dn&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Dn&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Dn&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function n(s){const o=[];for(const r in s){const c=s[r];delete c.metadata,o.push(c)}return o}if(e){const s=n(t.textures),o=n(t.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const n=e.length;i=new Array(n);for(let s=0;s!==n;++s)i[s]=e[s].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Se extends In{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new nt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ei,this.combine=xr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ze=new z,Ys=new jt;class ke{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Kr,this.updateRanges=[],this.gpuType=Ri,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let n=0,s=this.itemSize;n<s;n++)this.array[t+n]=e.array[i+n];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Ys.fromBufferAttribute(this,e),Ys.applyMatrix3(t),this.setXY(e,Ys.x,Ys.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)ze.fromBufferAttribute(this,e),ze.applyMatrix3(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)ze.fromBufferAttribute(this,e),ze.applyMatrix4(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)ze.fromBufferAttribute(this,e),ze.applyNormalMatrix(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)ze.fromBufferAttribute(this,e),ze.transformDirection(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=us(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=Ye(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=us(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ye(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=us(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ye(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=us(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ye(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=us(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ye(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=Ye(e,this.array),i=Ye(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,n){return t*=this.itemSize,this.normalized&&(e=Ye(e,this.array),i=Ye(i,this.array),n=Ye(n,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=n,this}setXYZW(t,e,i,n,s){return t*=this.itemSize,this.normalized&&(e=Ye(e,this.array),i=Ye(i,this.array),n=Ye(n,this.array),s=Ye(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=n,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Kr&&(t.usage=this.usage),t}}class Ll extends ke{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class Dl extends ke{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class le extends ke{constructor(t,e,i){super(new Float32Array(t),e,i)}}let hd=0;const ui=new me,co=new Ie,qn=new z,si=new kn,vs=new kn,Ue=new z;class Ce extends ls{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:hd++}),this.uuid=Ds(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Cl(t)?Dl:Ll)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Gt().getNormalMatrix(t);i.applyNormalMatrix(s),i.needsUpdate=!0}const n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(t),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return ui.makeRotationFromQuaternion(t),this.applyMatrix4(ui),this}rotateX(t){return ui.makeRotationX(t),this.applyMatrix4(ui),this}rotateY(t){return ui.makeRotationY(t),this.applyMatrix4(ui),this}rotateZ(t){return ui.makeRotationZ(t),this.applyMatrix4(ui),this}translate(t,e,i){return ui.makeTranslation(t,e,i),this.applyMatrix4(ui),this}scale(t,e,i){return ui.makeScale(t,e,i),this.applyMatrix4(ui),this}lookAt(t){return co.lookAt(t),co.updateMatrix(),this.applyMatrix4(co.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(qn).negate(),this.translate(qn.x,qn.y,qn.z),this}setFromPoints(t){const e=[];for(let i=0,n=t.length;i<n;i++){const s=t[i];e.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new le(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new kn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new z(-1/0,-1/0,-1/0),new z(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,n=e.length;i<n;i++){const s=e[i];si.setFromBufferAttribute(s),this.morphTargetsRelative?(Ue.addVectors(this.boundingBox.min,si.min),this.boundingBox.expandByPoint(Ue),Ue.addVectors(this.boundingBox.max,si.max),this.boundingBox.expandByPoint(Ue)):(this.boundingBox.expandByPoint(si.min),this.boundingBox.expandByPoint(si.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new hs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new z,1/0);return}if(t){const i=this.boundingSphere.center;if(si.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){const r=e[s];vs.setFromBufferAttribute(r),this.morphTargetsRelative?(Ue.addVectors(si.min,vs.min),si.expandByPoint(Ue),Ue.addVectors(si.max,vs.max),si.expandByPoint(Ue)):(si.expandByPoint(vs.min),si.expandByPoint(vs.max))}si.getCenter(i);let n=0;for(let s=0,o=t.count;s<o;s++)Ue.fromBufferAttribute(t,s),n=Math.max(n,i.distanceToSquared(Ue));if(e)for(let s=0,o=e.length;s<o;s++){const r=e[s],c=this.morphTargetsRelative;for(let l=0,h=r.count;l<h;l++)Ue.fromBufferAttribute(r,l),c&&(qn.fromBufferAttribute(t,l),Ue.add(qn)),n=Math.max(n,i.distanceToSquared(Ue))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,n=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ke(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),r=[],c=[];for(let A=0;A<i.count;A++)r[A]=new z,c[A]=new z;const l=new z,h=new z,d=new z,u=new jt,f=new jt,g=new jt,v=new z,p=new z;function m(A,I,_){l.fromBufferAttribute(i,A),h.fromBufferAttribute(i,I),d.fromBufferAttribute(i,_),u.fromBufferAttribute(s,A),f.fromBufferAttribute(s,I),g.fromBufferAttribute(s,_),h.sub(l),d.sub(l),f.sub(u),g.sub(u);const M=1/(f.x*g.y-g.x*f.y);isFinite(M)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(M),p.copy(d).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(M),r[A].add(v),r[I].add(v),r[_].add(v),c[A].add(p),c[I].add(p),c[_].add(p))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let A=0,I=y.length;A<I;++A){const _=y[A],M=_.start,P=_.count;for(let O=M,B=M+P;O<B;O+=3)m(t.getX(O+0),t.getX(O+1),t.getX(O+2))}const x=new z,w=new z,R=new z,E=new z;function T(A){R.fromBufferAttribute(n,A),E.copy(R);const I=r[A];x.copy(I),x.sub(R.multiplyScalar(R.dot(I))).normalize(),w.crossVectors(E,I);const M=w.dot(c[A])<0?-1:1;o.setXYZW(A,x.x,x.y,x.z,M)}for(let A=0,I=y.length;A<I;++A){const _=y[A],M=_.start,P=_.count;for(let O=M,B=M+P;O<B;O+=3)T(t.getX(O+0)),T(t.getX(O+1)),T(t.getX(O+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new ke(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let u=0,f=i.count;u<f;u++)i.setXYZ(u,0,0,0);const n=new z,s=new z,o=new z,r=new z,c=new z,l=new z,h=new z,d=new z;if(t)for(let u=0,f=t.count;u<f;u+=3){const g=t.getX(u+0),v=t.getX(u+1),p=t.getX(u+2);n.fromBufferAttribute(e,g),s.fromBufferAttribute(e,v),o.fromBufferAttribute(e,p),h.subVectors(o,s),d.subVectors(n,s),h.cross(d),r.fromBufferAttribute(i,g),c.fromBufferAttribute(i,v),l.fromBufferAttribute(i,p),r.add(h),c.add(h),l.add(h),i.setXYZ(g,r.x,r.y,r.z),i.setXYZ(v,c.x,c.y,c.z),i.setXYZ(p,l.x,l.y,l.z)}else for(let u=0,f=e.count;u<f;u+=3)n.fromBufferAttribute(e,u+0),s.fromBufferAttribute(e,u+1),o.fromBufferAttribute(e,u+2),h.subVectors(o,s),d.subVectors(n,s),h.cross(d),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Ue.fromBufferAttribute(t,e),Ue.normalize(),t.setXYZ(e,Ue.x,Ue.y,Ue.z)}toNonIndexed(){function t(r,c){const l=r.array,h=r.itemSize,d=r.normalized,u=new l.constructor(c.length*h);let f=0,g=0;for(let v=0,p=c.length;v<p;v++){r.isInterleavedBufferAttribute?f=c[v]*r.data.stride+r.offset:f=c[v]*h;for(let m=0;m<h;m++)u[g++]=l[f++]}return new ke(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ce,i=this.index.array,n=this.attributes;for(const r in n){const c=n[r],l=t(c,i);e.setAttribute(r,l)}const s=this.morphAttributes;for(const r in s){const c=[],l=s[r];for(let h=0,d=l.length;h<d;h++){const u=l[h],f=t(u,i);c.push(f)}e.morphAttributes[r]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let r=0,c=o.length;r<c;r++){const l=o[r];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const c in i){const l=i[c];t.data.attributes[c]=l.toJSON(t.data)}const n={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let d=0,u=l.length;d<u;d++){const f=l[d];h.push(f.toJSON(t.data))}h.length>0&&(n[c]=h,s=!0)}s&&(t.data.morphAttributes=n,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const r=this.boundingSphere;return r!==null&&(t.data.boundingSphere={center:r.center.toArray(),radius:r.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(e));const n=t.attributes;for(const l in n){const h=n[l];this.setAttribute(l,h.clone(e))}const s=t.morphAttributes;for(const l in s){const h=[],d=s[l];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,h=o.length;l<h;l++){const d=o[l];this.addGroup(d.start,d.count,d.materialIndex)}const r=t.boundingBox;r!==null&&(this.boundingBox=r.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const lc=new me,vn=new Pl,Zs=new hs,hc=new z,Js=new z,Qs=new z,ta=new z,lo=new z,ea=new z,dc=new z,ia=new z;class gt extends Ie{constructor(t=new Ce,e=new Se){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=n.length;s<o;s++){const r=n[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[r]=s}}}}getVertexPosition(t,e){const i=this.geometry,n=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(n,t);const r=this.morphTargetInfluences;if(s&&r){ea.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const h=r[c],d=s[c];h!==0&&(lo.fromBufferAttribute(d,t),o?ea.addScaledVector(lo,h):ea.addScaledVector(lo.sub(e),h))}e.add(ea)}return e}raycast(t,e){const i=this.geometry,n=this.material,s=this.matrixWorld;n!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Zs.copy(i.boundingSphere),Zs.applyMatrix4(s),vn.copy(t.ray).recast(t.near),!(Zs.containsPoint(vn.origin)===!1&&(vn.intersectSphere(Zs,hc)===null||vn.origin.distanceToSquared(hc)>(t.far-t.near)**2))&&(lc.copy(s).invert(),vn.copy(t.ray).applyMatrix4(lc),!(i.boundingBox!==null&&vn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,vn)))}_computeIntersections(t,e,i){let n;const s=this.geometry,o=this.material,r=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,d=s.attributes.normal,u=s.groups,f=s.drawRange;if(r!==null)if(Array.isArray(o))for(let g=0,v=u.length;g<v;g++){const p=u[g],m=o[p.materialIndex],y=Math.max(p.start,f.start),x=Math.min(r.count,Math.min(p.start+p.count,f.start+f.count));for(let w=y,R=x;w<R;w+=3){const E=r.getX(w),T=r.getX(w+1),A=r.getX(w+2);n=na(this,m,t,i,l,h,d,E,T,A),n&&(n.faceIndex=Math.floor(w/3),n.face.materialIndex=p.materialIndex,e.push(n))}}else{const g=Math.max(0,f.start),v=Math.min(r.count,f.start+f.count);for(let p=g,m=v;p<m;p+=3){const y=r.getX(p),x=r.getX(p+1),w=r.getX(p+2);n=na(this,o,t,i,l,h,d,y,x,w),n&&(n.faceIndex=Math.floor(p/3),e.push(n))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,v=u.length;g<v;g++){const p=u[g],m=o[p.materialIndex],y=Math.max(p.start,f.start),x=Math.min(c.count,Math.min(p.start+p.count,f.start+f.count));for(let w=y,R=x;w<R;w+=3){const E=w,T=w+1,A=w+2;n=na(this,m,t,i,l,h,d,E,T,A),n&&(n.faceIndex=Math.floor(w/3),n.face.materialIndex=p.materialIndex,e.push(n))}}else{const g=Math.max(0,f.start),v=Math.min(c.count,f.start+f.count);for(let p=g,m=v;p<m;p+=3){const y=p,x=p+1,w=p+2;n=na(this,o,t,i,l,h,d,y,x,w),n&&(n.faceIndex=Math.floor(p/3),e.push(n))}}}}function dd(a,t,e,i,n,s,o,r){let c;if(t.side===Qe?c=i.intersectTriangle(o,s,n,!0,r):c=i.intersectTriangle(n,s,o,t.side===qi,r),c===null)return null;ia.copy(r),ia.applyMatrix4(a.matrixWorld);const l=e.ray.origin.distanceTo(ia);return l<e.near||l>e.far?null:{distance:l,point:ia.clone(),object:a}}function na(a,t,e,i,n,s,o,r,c,l){a.getVertexPosition(r,Js),a.getVertexPosition(c,Qs),a.getVertexPosition(l,ta);const h=dd(a,t,e,i,Js,Qs,ta,dc);if(h){const d=new z;bi.getBarycoord(dc,Js,Qs,ta,d),n&&(h.uv=bi.getInterpolatedAttribute(n,r,c,l,d,new jt)),s&&(h.uv1=bi.getInterpolatedAttribute(s,r,c,l,d,new jt)),o&&(h.normal=bi.getInterpolatedAttribute(o,r,c,l,d,new z),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const u={a:r,b:c,c:l,normal:new z,materialIndex:0};bi.getNormal(Js,Qs,ta,u.normal),h.face=u,h.barycoord=d}return h}class Xe extends Ce{constructor(t=1,e=1,i=1,n=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:n,heightSegments:s,depthSegments:o};const r=this;n=Math.floor(n),s=Math.floor(s),o=Math.floor(o);const c=[],l=[],h=[],d=[];let u=0,f=0;g("z","y","x",-1,-1,i,e,t,o,s,0),g("z","y","x",1,-1,i,e,-t,o,s,1),g("x","z","y",1,1,t,i,e,n,o,2),g("x","z","y",1,-1,t,i,-e,n,o,3),g("x","y","z",1,-1,t,e,i,n,s,4),g("x","y","z",-1,-1,t,e,-i,n,s,5),this.setIndex(c),this.setAttribute("position",new le(l,3)),this.setAttribute("normal",new le(h,3)),this.setAttribute("uv",new le(d,2));function g(v,p,m,y,x,w,R,E,T,A,I){const _=w/T,M=R/A,P=w/2,O=R/2,B=E/2,q=T+1,G=A+1;let K=0,X=0;const ct=new z;for(let dt=0;dt<G;dt++){const Mt=dt*M-O;for(let ie=0;ie<q;ie++){const he=ie*_-P;ct[v]=he*y,ct[p]=Mt*x,ct[m]=B,l.push(ct.x,ct.y,ct.z),ct[v]=0,ct[p]=0,ct[m]=E>0?1:-1,h.push(ct.x,ct.y,ct.z),d.push(ie/T),d.push(1-dt/A),K+=1}}for(let dt=0;dt<A;dt++)for(let Mt=0;Mt<T;Mt++){const ie=u+Mt+q*dt,he=u+Mt+q*(dt+1),Y=u+(Mt+1)+q*(dt+1),st=u+(Mt+1)+q*dt;c.push(ie,he,st),c.push(he,Y,st),X+=6}r.addGroup(f,X,I),f+=X,u+=K}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Xe(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function rs(a){const t={};for(const e in a){t[e]={};for(const i in a[e]){const n=a[e][i];n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)?n.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=n.clone():Array.isArray(n)?t[e][i]=n.slice():t[e][i]=n}}return t}function qe(a){const t={};for(let e=0;e<a.length;e++){const i=rs(a[e]);for(const n in i)t[n]=i[n]}return t}function ud(a){const t=[];for(let e=0;e<a.length;e++)t.push(a[e].clone());return t}function Ul(a){const t=a.getRenderTarget();return t===null?a.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:oe.workingColorSpace}const fd={clone:rs,merge:qe};var pd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,md=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class dn extends In{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=pd,this.fragmentShader=md,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=rs(t.uniforms),this.uniformsGroups=ud(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const n in this.uniforms){const o=this.uniforms[n].value;o&&o.isTexture?e.uniforms[n]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[n]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[n]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[n]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[n]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[n]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[n]={type:"m4",value:o.toArray()}:e.uniforms[n]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const n in this.extensions)this.extensions[n]===!0&&(i[n]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class Nl extends Ie{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new me,this.projectionMatrix=new me,this.projectionMatrixInverse=new me,this.coordinateSystem=Vi}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Qi=new z,uc=new jt,fc=new jt;class ci extends Nl{constructor(t=50,e=1,i=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=fr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Ga*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return fr*2*Math.atan(Math.tan(Ga*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Qi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Qi.x,Qi.y).multiplyScalar(-t/Qi.z),Qi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Qi.x,Qi.y).multiplyScalar(-t/Qi.z)}getViewSize(t,e){return this.getViewBounds(t,uc,fc),e.subVectors(fc,uc)}setViewOffset(t,e,i,n,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=n,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Ga*.5*this.fov)/this.zoom,i=2*e,n=this.aspect*i,s=-.5*n;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*n/c,e-=o.offsetY*i/l,n*=o.width/c,i*=o.height/l}const r=this.filmOffset;r!==0&&(s+=t*r/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+n,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const jn=-90,Xn=1;class gd extends Ie{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const n=new ci(jn,Xn,t,e);n.layers=this.layers,this.add(n);const s=new ci(jn,Xn,t,e);s.layers=this.layers,this.add(s);const o=new ci(jn,Xn,t,e);o.layers=this.layers,this.add(o);const r=new ci(jn,Xn,t,e);r.layers=this.layers,this.add(r);const c=new ci(jn,Xn,t,e);c.layers=this.layers,this.add(c);const l=new ci(jn,Xn,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,n,s,o,r,c]=e;for(const l of e)this.remove(l);if(t===Vi)i.up.set(0,1,0),i.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),r.up.set(0,1,0),r.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Aa)i.up.set(0,-1,0),i.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),r.up.set(0,-1,0),r.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:n}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,o,r,c,l,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,n),t.render(e,s),t.setRenderTarget(i,1,n),t.render(e,o),t.setRenderTarget(i,2,n),t.render(e,r),t.setRenderTarget(i,3,n),t.render(e,c),t.setRenderTarget(i,4,n),t.render(e,l),i.texture.generateMipmaps=v,t.setRenderTarget(i,5,n),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Fl extends Ve{constructor(t,e,i,n,s,o,r,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:ns,super(t,e,i,n,s,o,r,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class vd extends zn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},n=[i,i,i,i,i,i];this.texture=new Fl(n,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:li}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},n=new Xe(5,5,5),s=new dn({name:"CubemapFromEquirect",uniforms:rs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Qe,blending:cn});s.uniforms.tEquirect.value=e;const o=new gt(n,s),r=e.minFilter;return e.minFilter===Cn&&(e.minFilter=li),new gd(1,10,this).update(t,o),e.minFilter=r,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,i,n){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,n);t.setRenderTarget(s)}}const ho=new z,_d=new z,xd=new Gt;class bn{constructor(t=new z(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,n){return this.normal.set(t,e,i),this.constant=n,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const n=ho.subVectors(i,e).cross(_d.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(n,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(ho),n=this.normal.dot(i);if(n===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/n;return s<0||s>1?null:e.copy(t.start).addScaledVector(i,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||xd.getNormalMatrix(t),n=this.coplanarPoint(ho).applyMatrix4(t),s=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const _n=new hs,sa=new z;class Rr{constructor(t=new bn,e=new bn,i=new bn,n=new bn,s=new bn,o=new bn){this.planes=[t,e,i,n,s,o]}set(t,e,i,n,s,o){const r=this.planes;return r[0].copy(t),r[1].copy(e),r[2].copy(i),r[3].copy(n),r[4].copy(s),r[5].copy(o),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Vi){const i=this.planes,n=t.elements,s=n[0],o=n[1],r=n[2],c=n[3],l=n[4],h=n[5],d=n[6],u=n[7],f=n[8],g=n[9],v=n[10],p=n[11],m=n[12],y=n[13],x=n[14],w=n[15];if(i[0].setComponents(c-s,u-l,p-f,w-m).normalize(),i[1].setComponents(c+s,u+l,p+f,w+m).normalize(),i[2].setComponents(c+o,u+h,p+g,w+y).normalize(),i[3].setComponents(c-o,u-h,p-g,w-y).normalize(),i[4].setComponents(c-r,u-d,p-v,w-x).normalize(),e===Vi)i[5].setComponents(c+r,u+d,p+v,w+x).normalize();else if(e===Aa)i[5].setComponents(r,d,v,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),_n.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),_n.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(_n)}intersectsSprite(t){return _n.center.set(0,0,0),_n.radius=.7071067811865476,_n.applyMatrix4(t.matrixWorld),this.intersectsSphere(_n)}intersectsSphere(t){const e=this.planes,i=t.center,n=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(i)<n)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const n=e[i];if(sa.x=n.normal.x>0?t.max.x:t.min.x,sa.y=n.normal.y>0?t.max.y:t.min.y,sa.z=n.normal.z>0?t.max.z:t.min.z,n.distanceToPoint(sa)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Ol(){let a=null,t=!1,e=null,i=null;function n(s,o){e(s,o),i=a.requestAnimationFrame(n)}return{start:function(){t!==!0&&e!==null&&(i=a.requestAnimationFrame(n),t=!0)},stop:function(){a.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){a=s}}}function yd(a){const t=new WeakMap;function e(r,c){const l=r.array,h=r.usage,d=l.byteLength,u=a.createBuffer();a.bindBuffer(c,u),a.bufferData(c,l,h),r.onUploadCallback();let f;if(l instanceof Float32Array)f=a.FLOAT;else if(l instanceof Uint16Array)r.isFloat16BufferAttribute?f=a.HALF_FLOAT:f=a.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=a.SHORT;else if(l instanceof Uint32Array)f=a.UNSIGNED_INT;else if(l instanceof Int32Array)f=a.INT;else if(l instanceof Int8Array)f=a.BYTE;else if(l instanceof Uint8Array)f=a.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=a.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:r.version,size:d}}function i(r,c,l){const h=c.array,d=c.updateRanges;if(a.bindBuffer(l,r),d.length===0)a.bufferSubData(l,0,h);else{d.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<d.length;f++){const g=d[u],v=d[f];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++u,d[u]=v)}d.length=u+1;for(let f=0,g=d.length;f<g;f++){const v=d[f];a.bufferSubData(l,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function n(r){return r.isInterleavedBufferAttribute&&(r=r.data),t.get(r)}function s(r){r.isInterleavedBufferAttribute&&(r=r.data);const c=t.get(r);c&&(a.deleteBuffer(c.buffer),t.delete(r))}function o(r,c){if(r.isInterleavedBufferAttribute&&(r=r.data),r.isGLBufferAttribute){const h=t.get(r);(!h||h.version<r.version)&&t.set(r,{buffer:r.buffer,type:r.type,bytesPerElement:r.elementSize,version:r.version});return}const l=t.get(r);if(l===void 0)t.set(r,e(r,c));else if(l.version<r.version){if(l.size!==r.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,r,c),l.version=r.version}}return{get:n,remove:s,update:o}}class fn extends Ce{constructor(t=1,e=1,i=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:n};const s=t/2,o=e/2,r=Math.floor(i),c=Math.floor(n),l=r+1,h=c+1,d=t/r,u=e/c,f=[],g=[],v=[],p=[];for(let m=0;m<h;m++){const y=m*u-o;for(let x=0;x<l;x++){const w=x*d-s;g.push(w,-y,0),v.push(0,0,1),p.push(x/r),p.push(1-m/c)}}for(let m=0;m<c;m++)for(let y=0;y<r;y++){const x=y+l*m,w=y+l*(m+1),R=y+1+l*(m+1),E=y+1+l*m;f.push(x,w,E),f.push(w,R,E)}this.setIndex(f),this.setAttribute("position",new le(g,3)),this.setAttribute("normal",new le(v,3)),this.setAttribute("uv",new le(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new fn(t.width,t.height,t.widthSegments,t.heightSegments)}}var Md=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,wd=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,bd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Sd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ed=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Td=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ad=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Cd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Rd=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,zd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Pd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,kd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Id=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Ld=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Dd=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Ud=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Nd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Fd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Od=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Bd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Hd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Gd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Vd=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Wd=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,qd=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,jd=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Xd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,$d=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Kd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Yd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Zd="gl_FragColor = linearToOutputTexel( gl_FragColor );",Jd=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Qd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,tu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,eu=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,iu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,nu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,su=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,au=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ou=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ru=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,cu=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,hu=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,du=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,uu=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,fu=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,pu=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,mu=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,gu=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,vu=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,_u=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,xu=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,yu=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Mu=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,wu=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,bu=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Su=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Eu=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Tu=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Au=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Cu=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ru=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,zu=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Pu=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ku=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Iu=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Lu=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Du=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Uu=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Nu=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Fu=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Ou=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Bu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Gu=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Vu=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Wu=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,qu=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ju=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Xu=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,$u=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ku=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Yu=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Zu=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ju=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Qu=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,tf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ef=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,nf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,sf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,af=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,of=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,rf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,cf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,lf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,hf=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,df=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,uf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ff=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,pf=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,mf=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,gf=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,vf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,_f=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,xf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,yf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Mf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,wf=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Sf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ef=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Tf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Af=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Cf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Rf=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,zf=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Pf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,kf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,If=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Lf=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Df=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Uf=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Nf=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ff=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Of=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Bf=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hf=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Gf=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Vf=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Wf=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qf=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,jf=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Xf=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$f=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Kf=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Yf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Zf=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Jf=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Qf=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,tp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ht={alphahash_fragment:Md,alphahash_pars_fragment:wd,alphamap_fragment:bd,alphamap_pars_fragment:Sd,alphatest_fragment:Ed,alphatest_pars_fragment:Td,aomap_fragment:Ad,aomap_pars_fragment:Cd,batching_pars_vertex:Rd,batching_vertex:zd,begin_vertex:Pd,beginnormal_vertex:kd,bsdfs:Id,iridescence_fragment:Ld,bumpmap_pars_fragment:Dd,clipping_planes_fragment:Ud,clipping_planes_pars_fragment:Nd,clipping_planes_pars_vertex:Fd,clipping_planes_vertex:Od,color_fragment:Bd,color_pars_fragment:Hd,color_pars_vertex:Gd,color_vertex:Vd,common:Wd,cube_uv_reflection_fragment:qd,defaultnormal_vertex:jd,displacementmap_pars_vertex:Xd,displacementmap_vertex:$d,emissivemap_fragment:Kd,emissivemap_pars_fragment:Yd,colorspace_fragment:Zd,colorspace_pars_fragment:Jd,envmap_fragment:Qd,envmap_common_pars_fragment:tu,envmap_pars_fragment:eu,envmap_pars_vertex:iu,envmap_physical_pars_fragment:fu,envmap_vertex:nu,fog_vertex:su,fog_pars_vertex:au,fog_fragment:ou,fog_pars_fragment:ru,gradientmap_pars_fragment:cu,lightmap_pars_fragment:lu,lights_lambert_fragment:hu,lights_lambert_pars_fragment:du,lights_pars_begin:uu,lights_toon_fragment:pu,lights_toon_pars_fragment:mu,lights_phong_fragment:gu,lights_phong_pars_fragment:vu,lights_physical_fragment:_u,lights_physical_pars_fragment:xu,lights_fragment_begin:yu,lights_fragment_maps:Mu,lights_fragment_end:wu,logdepthbuf_fragment:bu,logdepthbuf_pars_fragment:Su,logdepthbuf_pars_vertex:Eu,logdepthbuf_vertex:Tu,map_fragment:Au,map_pars_fragment:Cu,map_particle_fragment:Ru,map_particle_pars_fragment:zu,metalnessmap_fragment:Pu,metalnessmap_pars_fragment:ku,morphinstance_vertex:Iu,morphcolor_vertex:Lu,morphnormal_vertex:Du,morphtarget_pars_vertex:Uu,morphtarget_vertex:Nu,normal_fragment_begin:Fu,normal_fragment_maps:Ou,normal_pars_fragment:Bu,normal_pars_vertex:Hu,normal_vertex:Gu,normalmap_pars_fragment:Vu,clearcoat_normal_fragment_begin:Wu,clearcoat_normal_fragment_maps:qu,clearcoat_pars_fragment:ju,iridescence_pars_fragment:Xu,opaque_fragment:$u,packing:Ku,premultiplied_alpha_fragment:Yu,project_vertex:Zu,dithering_fragment:Ju,dithering_pars_fragment:Qu,roughnessmap_fragment:tf,roughnessmap_pars_fragment:ef,shadowmap_pars_fragment:nf,shadowmap_pars_vertex:sf,shadowmap_vertex:af,shadowmask_pars_fragment:of,skinbase_vertex:rf,skinning_pars_vertex:cf,skinning_vertex:lf,skinnormal_vertex:hf,specularmap_fragment:df,specularmap_pars_fragment:uf,tonemapping_fragment:ff,tonemapping_pars_fragment:pf,transmission_fragment:mf,transmission_pars_fragment:gf,uv_pars_fragment:vf,uv_pars_vertex:_f,uv_vertex:xf,worldpos_vertex:yf,background_vert:Mf,background_frag:wf,backgroundCube_vert:bf,backgroundCube_frag:Sf,cube_vert:Ef,cube_frag:Tf,depth_vert:Af,depth_frag:Cf,distanceRGBA_vert:Rf,distanceRGBA_frag:zf,equirect_vert:Pf,equirect_frag:kf,linedashed_vert:If,linedashed_frag:Lf,meshbasic_vert:Df,meshbasic_frag:Uf,meshlambert_vert:Nf,meshlambert_frag:Ff,meshmatcap_vert:Of,meshmatcap_frag:Bf,meshnormal_vert:Hf,meshnormal_frag:Gf,meshphong_vert:Vf,meshphong_frag:Wf,meshphysical_vert:qf,meshphysical_frag:jf,meshtoon_vert:Xf,meshtoon_frag:$f,points_vert:Kf,points_frag:Yf,shadow_vert:Zf,shadow_frag:Jf,sprite_vert:Qf,sprite_frag:tp},rt={common:{diffuse:{value:new nt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Gt}},envmap:{envMap:{value:null},envMapRotation:{value:new Gt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Gt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Gt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Gt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Gt},normalScale:{value:new jt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Gt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Gt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Gt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Gt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new nt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new nt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0},uvTransform:{value:new Gt}},sprite:{diffuse:{value:new nt(16777215)},opacity:{value:1},center:{value:new jt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}}},Ai={basic:{uniforms:qe([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.fog]),vertexShader:Ht.meshbasic_vert,fragmentShader:Ht.meshbasic_frag},lambert:{uniforms:qe([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,rt.lights,{emissive:{value:new nt(0)}}]),vertexShader:Ht.meshlambert_vert,fragmentShader:Ht.meshlambert_frag},phong:{uniforms:qe([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,rt.lights,{emissive:{value:new nt(0)},specular:{value:new nt(1118481)},shininess:{value:30}}]),vertexShader:Ht.meshphong_vert,fragmentShader:Ht.meshphong_frag},standard:{uniforms:qe([rt.common,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.roughnessmap,rt.metalnessmap,rt.fog,rt.lights,{emissive:{value:new nt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ht.meshphysical_vert,fragmentShader:Ht.meshphysical_frag},toon:{uniforms:qe([rt.common,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.gradientmap,rt.fog,rt.lights,{emissive:{value:new nt(0)}}]),vertexShader:Ht.meshtoon_vert,fragmentShader:Ht.meshtoon_frag},matcap:{uniforms:qe([rt.common,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,{matcap:{value:null}}]),vertexShader:Ht.meshmatcap_vert,fragmentShader:Ht.meshmatcap_frag},points:{uniforms:qe([rt.points,rt.fog]),vertexShader:Ht.points_vert,fragmentShader:Ht.points_frag},dashed:{uniforms:qe([rt.common,rt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ht.linedashed_vert,fragmentShader:Ht.linedashed_frag},depth:{uniforms:qe([rt.common,rt.displacementmap]),vertexShader:Ht.depth_vert,fragmentShader:Ht.depth_frag},normal:{uniforms:qe([rt.common,rt.bumpmap,rt.normalmap,rt.displacementmap,{opacity:{value:1}}]),vertexShader:Ht.meshnormal_vert,fragmentShader:Ht.meshnormal_frag},sprite:{uniforms:qe([rt.sprite,rt.fog]),vertexShader:Ht.sprite_vert,fragmentShader:Ht.sprite_frag},background:{uniforms:{uvTransform:{value:new Gt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ht.background_vert,fragmentShader:Ht.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Gt}},vertexShader:Ht.backgroundCube_vert,fragmentShader:Ht.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ht.cube_vert,fragmentShader:Ht.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ht.equirect_vert,fragmentShader:Ht.equirect_frag},distanceRGBA:{uniforms:qe([rt.common,rt.displacementmap,{referencePosition:{value:new z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ht.distanceRGBA_vert,fragmentShader:Ht.distanceRGBA_frag},shadow:{uniforms:qe([rt.lights,rt.fog,{color:{value:new nt(0)},opacity:{value:1}}]),vertexShader:Ht.shadow_vert,fragmentShader:Ht.shadow_frag}};Ai.physical={uniforms:qe([Ai.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Gt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Gt},clearcoatNormalScale:{value:new jt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Gt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Gt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Gt},sheen:{value:0},sheenColor:{value:new nt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Gt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Gt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Gt},transmissionSamplerSize:{value:new jt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Gt},attenuationDistance:{value:0},attenuationColor:{value:new nt(0)},specularColor:{value:new nt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Gt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Gt},anisotropyVector:{value:new jt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Gt}}]),vertexShader:Ht.meshphysical_vert,fragmentShader:Ht.meshphysical_frag};const aa={r:0,b:0,g:0},xn=new Ei,ep=new me;function ip(a,t,e,i,n,s,o){const r=new nt(0);let c=s===!0?0:1,l,h,d=null,u=0,f=null;function g(y){let x=y.isScene===!0?y.background:null;return x&&x.isTexture&&(x=(y.backgroundBlurriness>0?e:t).get(x)),x}function v(y){let x=!1;const w=g(y);w===null?m(r,c):w&&w.isColor&&(m(w,1),x=!0);const R=a.xr.getEnvironmentBlendMode();R==="additive"?i.buffers.color.setClear(0,0,0,1,o):R==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(a.autoClear||x)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),a.clear(a.autoClearColor,a.autoClearDepth,a.autoClearStencil))}function p(y,x){const w=g(x);w&&(w.isCubeTexture||w.mapping===za)?(h===void 0&&(h=new gt(new Xe(1,1,1),new dn({name:"BackgroundCubeMaterial",uniforms:rs(Ai.backgroundCube.uniforms),vertexShader:Ai.backgroundCube.vertexShader,fragmentShader:Ai.backgroundCube.fragmentShader,side:Qe,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(R,E,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(h)),xn.copy(x.backgroundRotation),xn.x*=-1,xn.y*=-1,xn.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(xn.y*=-1,xn.z*=-1),h.material.uniforms.envMap.value=w,h.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(ep.makeRotationFromEuler(xn)),h.material.toneMapped=oe.getTransfer(w.colorSpace)!==ye,(d!==w||u!==w.version||f!==a.toneMapping)&&(h.material.needsUpdate=!0,d=w,u=w.version,f=a.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):w&&w.isTexture&&(l===void 0&&(l=new gt(new fn(2,2),new dn({name:"BackgroundMaterial",uniforms:rs(Ai.background.uniforms),vertexShader:Ai.background.vertexShader,fragmentShader:Ai.background.fragmentShader,side:qi,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=w,l.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,l.material.toneMapped=oe.getTransfer(w.colorSpace)!==ye,w.matrixAutoUpdate===!0&&w.updateMatrix(),l.material.uniforms.uvTransform.value.copy(w.matrix),(d!==w||u!==w.version||f!==a.toneMapping)&&(l.material.needsUpdate=!0,d=w,u=w.version,f=a.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function m(y,x){y.getRGB(aa,Ul(a)),i.buffers.color.setClear(aa.r,aa.g,aa.b,x,o)}return{getClearColor:function(){return r},setClearColor:function(y,x=1){r.set(y),c=x,m(r,c)},getClearAlpha:function(){return c},setClearAlpha:function(y){c=y,m(r,c)},render:v,addToRenderList:p}}function np(a,t){const e=a.getParameter(a.MAX_VERTEX_ATTRIBS),i={},n=u(null);let s=n,o=!1;function r(_,M,P,O,B){let q=!1;const G=d(O,P,M);s!==G&&(s=G,l(s.object)),q=f(_,O,P,B),q&&g(_,O,P,B),B!==null&&t.update(B,a.ELEMENT_ARRAY_BUFFER),(q||o)&&(o=!1,w(_,M,P,O),B!==null&&a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,t.get(B).buffer))}function c(){return a.createVertexArray()}function l(_){return a.bindVertexArray(_)}function h(_){return a.deleteVertexArray(_)}function d(_,M,P){const O=P.wireframe===!0;let B=i[_.id];B===void 0&&(B={},i[_.id]=B);let q=B[M.id];q===void 0&&(q={},B[M.id]=q);let G=q[O];return G===void 0&&(G=u(c()),q[O]=G),G}function u(_){const M=[],P=[],O=[];for(let B=0;B<e;B++)M[B]=0,P[B]=0,O[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:M,enabledAttributes:P,attributeDivisors:O,object:_,attributes:{},index:null}}function f(_,M,P,O){const B=s.attributes,q=M.attributes;let G=0;const K=P.getAttributes();for(const X in K)if(K[X].location>=0){const dt=B[X];let Mt=q[X];if(Mt===void 0&&(X==="instanceMatrix"&&_.instanceMatrix&&(Mt=_.instanceMatrix),X==="instanceColor"&&_.instanceColor&&(Mt=_.instanceColor)),dt===void 0||dt.attribute!==Mt||Mt&&dt.data!==Mt.data)return!0;G++}return s.attributesNum!==G||s.index!==O}function g(_,M,P,O){const B={},q=M.attributes;let G=0;const K=P.getAttributes();for(const X in K)if(K[X].location>=0){let dt=q[X];dt===void 0&&(X==="instanceMatrix"&&_.instanceMatrix&&(dt=_.instanceMatrix),X==="instanceColor"&&_.instanceColor&&(dt=_.instanceColor));const Mt={};Mt.attribute=dt,dt&&dt.data&&(Mt.data=dt.data),B[X]=Mt,G++}s.attributes=B,s.attributesNum=G,s.index=O}function v(){const _=s.newAttributes;for(let M=0,P=_.length;M<P;M++)_[M]=0}function p(_){m(_,0)}function m(_,M){const P=s.newAttributes,O=s.enabledAttributes,B=s.attributeDivisors;P[_]=1,O[_]===0&&(a.enableVertexAttribArray(_),O[_]=1),B[_]!==M&&(a.vertexAttribDivisor(_,M),B[_]=M)}function y(){const _=s.newAttributes,M=s.enabledAttributes;for(let P=0,O=M.length;P<O;P++)M[P]!==_[P]&&(a.disableVertexAttribArray(P),M[P]=0)}function x(_,M,P,O,B,q,G){G===!0?a.vertexAttribIPointer(_,M,P,B,q):a.vertexAttribPointer(_,M,P,O,B,q)}function w(_,M,P,O){v();const B=O.attributes,q=P.getAttributes(),G=M.defaultAttributeValues;for(const K in q){const X=q[K];if(X.location>=0){let ct=B[K];if(ct===void 0&&(K==="instanceMatrix"&&_.instanceMatrix&&(ct=_.instanceMatrix),K==="instanceColor"&&_.instanceColor&&(ct=_.instanceColor)),ct!==void 0){const dt=ct.normalized,Mt=ct.itemSize,ie=t.get(ct);if(ie===void 0)continue;const he=ie.buffer,Y=ie.type,st=ie.bytesPerElement,bt=Y===a.INT||Y===a.UNSIGNED_INT||ct.gpuType===yr;if(ct.isInterleavedBufferAttribute){const vt=ct.data,Ft=vt.stride,Pt=ct.offset;if(vt.isInstancedInterleavedBuffer){for(let Yt=0;Yt<X.locationSize;Yt++)m(X.location+Yt,vt.meshPerAttribute);_.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=vt.meshPerAttribute*vt.count)}else for(let Yt=0;Yt<X.locationSize;Yt++)p(X.location+Yt);a.bindBuffer(a.ARRAY_BUFFER,he);for(let Yt=0;Yt<X.locationSize;Yt++)x(X.location+Yt,Mt/X.locationSize,Y,dt,Ft*st,(Pt+Mt/X.locationSize*Yt)*st,bt)}else{if(ct.isInstancedBufferAttribute){for(let vt=0;vt<X.locationSize;vt++)m(X.location+vt,ct.meshPerAttribute);_.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=ct.meshPerAttribute*ct.count)}else for(let vt=0;vt<X.locationSize;vt++)p(X.location+vt);a.bindBuffer(a.ARRAY_BUFFER,he);for(let vt=0;vt<X.locationSize;vt++)x(X.location+vt,Mt/X.locationSize,Y,dt,Mt*st,Mt/X.locationSize*vt*st,bt)}}else if(G!==void 0){const dt=G[K];if(dt!==void 0)switch(dt.length){case 2:a.vertexAttrib2fv(X.location,dt);break;case 3:a.vertexAttrib3fv(X.location,dt);break;case 4:a.vertexAttrib4fv(X.location,dt);break;default:a.vertexAttrib1fv(X.location,dt)}}}}y()}function R(){A();for(const _ in i){const M=i[_];for(const P in M){const O=M[P];for(const B in O)h(O[B].object),delete O[B];delete M[P]}delete i[_]}}function E(_){if(i[_.id]===void 0)return;const M=i[_.id];for(const P in M){const O=M[P];for(const B in O)h(O[B].object),delete O[B];delete M[P]}delete i[_.id]}function T(_){for(const M in i){const P=i[M];if(P[_.id]===void 0)continue;const O=P[_.id];for(const B in O)h(O[B].object),delete O[B];delete P[_.id]}}function A(){I(),o=!0,s!==n&&(s=n,l(s.object))}function I(){n.geometry=null,n.program=null,n.wireframe=!1}return{setup:r,reset:A,resetDefaultState:I,dispose:R,releaseStatesOfGeometry:E,releaseStatesOfProgram:T,initAttributes:v,enableAttribute:p,disableUnusedAttributes:y}}function sp(a,t,e){let i;function n(l){i=l}function s(l,h){a.drawArrays(i,l,h),e.update(h,i,1)}function o(l,h,d){d!==0&&(a.drawArraysInstanced(i,l,h,d),e.update(h,i,d))}function r(l,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,h,0,d);let f=0;for(let g=0;g<d;g++)f+=h[g];e.update(f,i,1)}function c(l,h,d,u){if(d===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)o(l[g],h[g],u[g]);else{f.multiDrawArraysInstancedWEBGL(i,l,0,h,0,u,0,d);let g=0;for(let v=0;v<d;v++)g+=h[v];for(let v=0;v<u.length;v++)e.update(g,i,u[v])}}this.setMode=n,this.render=s,this.renderInstances=o,this.renderMultiDraw=r,this.renderMultiDrawInstances=c}function ap(a,t,e,i){let n;function s(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){const T=t.get("EXT_texture_filter_anisotropic");n=a.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function o(T){return!(T!==Si&&i.convert(T)!==a.getParameter(a.IMPLEMENTATION_COLOR_READ_FORMAT))}function r(T){const A=T===Ls&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(T!==ji&&i.convert(T)!==a.getParameter(a.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==Ri&&!A)}function c(T){if(T==="highp"){if(a.getShaderPrecisionFormat(a.VERTEX_SHADER,a.HIGH_FLOAT).precision>0&&a.getShaderPrecisionFormat(a.FRAGMENT_SHADER,a.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&a.getShaderPrecisionFormat(a.VERTEX_SHADER,a.MEDIUM_FLOAT).precision>0&&a.getShaderPrecisionFormat(a.FRAGMENT_SHADER,a.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const d=e.logarithmicDepthBuffer===!0,u=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control");if(u===!0){const T=t.get("EXT_clip_control");T.clipControlEXT(T.LOWER_LEFT_EXT,T.ZERO_TO_ONE_EXT)}const f=a.getParameter(a.MAX_TEXTURE_IMAGE_UNITS),g=a.getParameter(a.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=a.getParameter(a.MAX_TEXTURE_SIZE),p=a.getParameter(a.MAX_CUBE_MAP_TEXTURE_SIZE),m=a.getParameter(a.MAX_VERTEX_ATTRIBS),y=a.getParameter(a.MAX_VERTEX_UNIFORM_VECTORS),x=a.getParameter(a.MAX_VARYING_VECTORS),w=a.getParameter(a.MAX_FRAGMENT_UNIFORM_VECTORS),R=g>0,E=a.getParameter(a.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:r,precision:l,logarithmicDepthBuffer:d,reverseDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:y,maxVaryings:x,maxFragmentUniforms:w,vertexTextures:R,maxSamples:E}}function op(a){const t=this;let e=null,i=0,n=!1,s=!1;const o=new bn,r=new Gt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||i!==0||n;return n=u,i=d.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){const g=d.clippingPlanes,v=d.clipIntersection,p=d.clipShadows,m=a.get(d);if(!n||g===null||g.length===0||s&&!p)s?h(null):l();else{const y=s?0:i,x=y*4;let w=m.clippingState||null;c.value=w,w=h(g,u,x,f);for(let R=0;R!==x;++R)w[R]=e[R];m.clippingState=w,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=y}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(d,u,f,g){const v=d!==null?d.length:0;let p=null;if(v!==0){if(p=c.value,g!==!0||p===null){const m=f+v*4,y=u.matrixWorldInverse;r.getNormalMatrix(y),(p===null||p.length<m)&&(p=new Float32Array(m));for(let x=0,w=f;x!==v;++x,w+=4)o.copy(d[x]).applyMatrix4(y,r),o.normal.toArray(p,w),p[w+3]=o.constant}c.value=p,c.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,p}}function rp(a){let t=new WeakMap;function e(o,r){return r===ba?o.mapping=ns:r===Oo&&(o.mapping=ss),o}function i(o){if(o&&o.isTexture){const r=o.mapping;if(r===ba||r===Oo)if(t.has(o)){const c=t.get(o).texture;return e(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new vd(c.height);return l.fromEquirectangularTexture(a,o),t.set(o,l),o.addEventListener("dispose",n),e(l.texture,o.mapping)}else return null}}return o}function n(o){const r=o.target;r.removeEventListener("dispose",n);const c=t.get(r);c!==void 0&&(t.delete(r),c.dispose())}function s(){t=new WeakMap}return{get:i,dispose:s}}class Bl extends Nl{constructor(t=-1,e=1,i=1,n=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=n,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,n,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=n,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2;let s=i-t,o=i+t,r=n+e,c=n-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,r-=h*this.view.offsetY,c=r-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,r,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Jn=4,pc=[.125,.215,.35,.446,.526,.582],Tn=20,uo=new Bl,mc=new nt;let fo=null,po=0,mo=0,go=!1;const Sn=(1+Math.sqrt(5))/2,$n=1/Sn,gc=[new z(-Sn,$n,0),new z(Sn,$n,0),new z(-$n,0,Sn),new z($n,0,Sn),new z(0,Sn,-$n),new z(0,Sn,$n),new z(-1,1,-1),new z(1,1,-1),new z(-1,1,1),new z(1,1,1)];class vc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,n=100){fo=this._renderer.getRenderTarget(),po=this._renderer.getActiveCubeFace(),mo=this._renderer.getActiveMipmapLevel(),go=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,i,n,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=yc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=xc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(fo,po,mo),this._renderer.xr.enabled=go,t.scissorTest=!1,oa(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ns||t.mapping===ss?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),fo=this._renderer.getRenderTarget(),po=this._renderer.getActiveCubeFace(),mo=this._renderer.getActiveMipmapLevel(),go=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:li,minFilter:li,generateMipmaps:!1,type:Ls,format:Si,colorSpace:un,depthBuffer:!1},n=_c(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=_c(t,e,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=cp(s)),this._blurMaterial=lp(s,t,e)}return n}_compileMaterial(t){const e=new gt(this._lodPlanes[0],t);this._renderer.compile(e,uo)}_sceneToCubeUV(t,e,i,n){const r=new ci(90,1,e,i),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.toneMapping;h.getClearColor(mc),h.toneMapping=ln,h.autoClear=!1;const f=new Se({name:"PMREM.Background",side:Qe,depthWrite:!1,depthTest:!1}),g=new gt(new Xe,f);let v=!1;const p=t.background;p?p.isColor&&(f.color.copy(p),t.background=null,v=!0):(f.color.copy(mc),v=!0);for(let m=0;m<6;m++){const y=m%3;y===0?(r.up.set(0,c[m],0),r.lookAt(l[m],0,0)):y===1?(r.up.set(0,0,c[m]),r.lookAt(0,l[m],0)):(r.up.set(0,c[m],0),r.lookAt(0,0,l[m]));const x=this._cubeSize;oa(n,y*x,m>2?x:0,x,x),h.setRenderTarget(n),v&&h.render(g,r),h.render(t,r)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=u,h.autoClear=d,t.background=p}_textureToCubeUV(t,e){const i=this._renderer,n=t.mapping===ns||t.mapping===ss;n?(this._cubemapMaterial===null&&(this._cubemapMaterial=yc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=xc());const s=n?this._cubemapMaterial:this._equirectMaterial,o=new gt(this._lodPlanes[0],s),r=s.uniforms;r.envMap.value=t;const c=this._cubeSize;oa(e,0,0,3*c,2*c),i.setRenderTarget(e),i.render(o,uo)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const n=this._lodPlanes.length;for(let s=1;s<n;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),r=gc[(n-s-1)%gc.length];this._blur(t,s-1,s,o,r)}e.autoClear=i}_blur(t,e,i,n,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,n,"latitudinal",s),this._halfBlur(o,t,i,i,n,"longitudinal",s)}_halfBlur(t,e,i,n,s,o,r){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new gt(this._lodPlanes[n],l),u=l.uniforms,f=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*Tn-1),v=s/g,p=isFinite(s)?1+Math.floor(h*v):Tn;p>Tn&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Tn}`);const m=[];let y=0;for(let T=0;T<Tn;++T){const A=T/v,I=Math.exp(-A*A/2);m.push(I),T===0?y+=I:T<p&&(y+=2*I)}for(let T=0;T<m.length;T++)m[T]=m[T]/y;u.envMap.value=t.texture,u.samples.value=p,u.weights.value=m,u.latitudinal.value=o==="latitudinal",r&&(u.poleAxis.value=r);const{_lodMax:x}=this;u.dTheta.value=g,u.mipInt.value=x-i;const w=this._sizeLods[n],R=3*w*(n>x-Jn?n-x+Jn:0),E=4*(this._cubeSize-w);oa(e,R,E,3*w,2*w),c.setRenderTarget(e),c.render(d,uo)}}function cp(a){const t=[],e=[],i=[];let n=a;const s=a-Jn+1+pc.length;for(let o=0;o<s;o++){const r=Math.pow(2,n);e.push(r);let c=1/r;o>a-Jn?c=pc[o-a+Jn-1]:o===0&&(c=0),i.push(c);const l=1/(r-2),h=-l,d=1+l,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,g=6,v=3,p=2,m=1,y=new Float32Array(v*g*f),x=new Float32Array(p*g*f),w=new Float32Array(m*g*f);for(let E=0;E<f;E++){const T=E%3*2/3-1,A=E>2?0:-1,I=[T,A,0,T+2/3,A,0,T+2/3,A+1,0,T,A,0,T+2/3,A+1,0,T,A+1,0];y.set(I,v*g*E),x.set(u,p*g*E);const _=[E,E,E,E,E,E];w.set(_,m*g*E)}const R=new Ce;R.setAttribute("position",new ke(y,v)),R.setAttribute("uv",new ke(x,p)),R.setAttribute("faceIndex",new ke(w,m)),t.push(R),n>Jn&&n--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function _c(a,t,e){const i=new zn(a,t,e);return i.texture.mapping=za,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function oa(a,t,e,i,n){a.viewport.set(t,e,i,n),a.scissor.set(t,e,i,n)}function lp(a,t,e){const i=new Float32Array(Tn),n=new z(0,1,0);return new dn({name:"SphericalGaussianBlur",defines:{n:Tn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${a}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:n}},vertexShader:zr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:cn,depthTest:!1,depthWrite:!1})}function xc(){return new dn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:zr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:cn,depthTest:!1,depthWrite:!1})}function yc(){return new dn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:zr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:cn,depthTest:!1,depthWrite:!1})}function zr(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function hp(a){let t=new WeakMap,e=null;function i(r){if(r&&r.isTexture){const c=r.mapping,l=c===ba||c===Oo,h=c===ns||c===ss;if(l||h){let d=t.get(r);const u=d!==void 0?d.texture.pmremVersion:0;if(r.isRenderTargetTexture&&r.pmremVersion!==u)return e===null&&(e=new vc(a)),d=l?e.fromEquirectangular(r,d):e.fromCubemap(r,d),d.texture.pmremVersion=r.pmremVersion,t.set(r,d),d.texture;if(d!==void 0)return d.texture;{const f=r.image;return l&&f&&f.height>0||h&&f&&n(f)?(e===null&&(e=new vc(a)),d=l?e.fromEquirectangular(r):e.fromCubemap(r),d.texture.pmremVersion=r.pmremVersion,t.set(r,d),r.addEventListener("dispose",s),d.texture):null}}}return r}function n(r){let c=0;const l=6;for(let h=0;h<l;h++)r[h]!==void 0&&c++;return c===l}function s(r){const c=r.target;c.removeEventListener("dispose",s);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function dp(a){const t={};function e(i){if(t[i]!==void 0)return t[i];let n;switch(i){case"WEBGL_depth_texture":n=a.getExtension("WEBGL_depth_texture")||a.getExtension("MOZ_WEBGL_depth_texture")||a.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":n=a.getExtension("EXT_texture_filter_anisotropic")||a.getExtension("MOZ_EXT_texture_filter_anisotropic")||a.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":n=a.getExtension("WEBGL_compressed_texture_s3tc")||a.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||a.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":n=a.getExtension("WEBGL_compressed_texture_pvrtc")||a.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:n=a.getExtension(i)}return t[i]=n,n}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const n=e(i);return n===null&&ya("THREE.WebGLRenderer: "+i+" extension not supported."),n}}}function up(a,t,e,i){const n={},s=new WeakMap;function o(d){const u=d.target;u.index!==null&&t.remove(u.index);for(const g in u.attributes)t.remove(u.attributes[g]);for(const g in u.morphAttributes){const v=u.morphAttributes[g];for(let p=0,m=v.length;p<m;p++)t.remove(v[p])}u.removeEventListener("dispose",o),delete n[u.id];const f=s.get(u);f&&(t.remove(f),s.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function r(d,u){return n[u.id]===!0||(u.addEventListener("dispose",o),n[u.id]=!0,e.memory.geometries++),u}function c(d){const u=d.attributes;for(const g in u)t.update(u[g],a.ARRAY_BUFFER);const f=d.morphAttributes;for(const g in f){const v=f[g];for(let p=0,m=v.length;p<m;p++)t.update(v[p],a.ARRAY_BUFFER)}}function l(d){const u=[],f=d.index,g=d.attributes.position;let v=0;if(f!==null){const y=f.array;v=f.version;for(let x=0,w=y.length;x<w;x+=3){const R=y[x+0],E=y[x+1],T=y[x+2];u.push(R,E,E,T,T,R)}}else if(g!==void 0){const y=g.array;v=g.version;for(let x=0,w=y.length/3-1;x<w;x+=3){const R=x+0,E=x+1,T=x+2;u.push(R,E,E,T,T,R)}}else return;const p=new(Cl(u)?Dl:Ll)(u,1);p.version=v;const m=s.get(d);m&&t.remove(m),s.set(d,p)}function h(d){const u=s.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&l(d)}else l(d);return s.get(d)}return{get:r,update:c,getWireframeAttribute:h}}function fp(a,t,e){let i;function n(u){i=u}let s,o;function r(u){s=u.type,o=u.bytesPerElement}function c(u,f){a.drawElements(i,f,s,u*o),e.update(f,i,1)}function l(u,f,g){g!==0&&(a.drawElementsInstanced(i,f,s,u*o,g),e.update(f,i,g))}function h(u,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,s,u,0,g);let p=0;for(let m=0;m<g;m++)p+=f[m];e.update(p,i,1)}function d(u,f,g,v){if(g===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<u.length;m++)l(u[m]/o,f[m],v[m]);else{p.multiDrawElementsInstancedWEBGL(i,f,0,s,u,0,v,0,g);let m=0;for(let y=0;y<g;y++)m+=f[y];for(let y=0;y<v.length;y++)e.update(m,i,v[y])}}this.setMode=n,this.setIndex=r,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function pp(a){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,r){switch(e.calls++,o){case a.TRIANGLES:e.triangles+=r*(s/3);break;case a.LINES:e.lines+=r*(s/2);break;case a.LINE_STRIP:e.lines+=r*(s-1);break;case a.LINE_LOOP:e.lines+=r*s;break;case a.POINTS:e.points+=r*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function n(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:n,update:i}}function mp(a,t,e){const i=new WeakMap,n=new pe;function s(o,r,c){const l=o.morphTargetInfluences,h=r.morphAttributes.position||r.morphAttributes.normal||r.morphAttributes.color,d=h!==void 0?h.length:0;let u=i.get(r);if(u===void 0||u.count!==d){let _=function(){A.dispose(),i.delete(r),r.removeEventListener("dispose",_)};var f=_;u!==void 0&&u.texture.dispose();const g=r.morphAttributes.position!==void 0,v=r.morphAttributes.normal!==void 0,p=r.morphAttributes.color!==void 0,m=r.morphAttributes.position||[],y=r.morphAttributes.normal||[],x=r.morphAttributes.color||[];let w=0;g===!0&&(w=1),v===!0&&(w=2),p===!0&&(w=3);let R=r.attributes.position.count*w,E=1;R>t.maxTextureSize&&(E=Math.ceil(R/t.maxTextureSize),R=t.maxTextureSize);const T=new Float32Array(R*E*4*d),A=new zl(T,R,E,d);A.type=Ri,A.needsUpdate=!0;const I=w*4;for(let M=0;M<d;M++){const P=m[M],O=y[M],B=x[M],q=R*E*4*M;for(let G=0;G<P.count;G++){const K=G*I;g===!0&&(n.fromBufferAttribute(P,G),T[q+K+0]=n.x,T[q+K+1]=n.y,T[q+K+2]=n.z,T[q+K+3]=0),v===!0&&(n.fromBufferAttribute(O,G),T[q+K+4]=n.x,T[q+K+5]=n.y,T[q+K+6]=n.z,T[q+K+7]=0),p===!0&&(n.fromBufferAttribute(B,G),T[q+K+8]=n.x,T[q+K+9]=n.y,T[q+K+10]=n.z,T[q+K+11]=B.itemSize===4?n.w:1)}}u={count:d,texture:A,size:new jt(R,E)},i.set(r,u),r.addEventListener("dispose",_)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(a,"morphTexture",o.morphTexture,e);else{let g=0;for(let p=0;p<l.length;p++)g+=l[p];const v=r.morphTargetsRelative?1:1-g;c.getUniforms().setValue(a,"morphTargetBaseInfluence",v),c.getUniforms().setValue(a,"morphTargetInfluences",l)}c.getUniforms().setValue(a,"morphTargetsTexture",u.texture,e),c.getUniforms().setValue(a,"morphTargetsTextureSize",u.size)}return{update:s}}function gp(a,t,e,i){let n=new WeakMap;function s(c){const l=i.render.frame,h=c.geometry,d=t.get(c,h);if(n.get(d)!==l&&(t.update(d),n.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",r)===!1&&c.addEventListener("dispose",r),n.get(c)!==l&&(e.update(c.instanceMatrix,a.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,a.ARRAY_BUFFER),n.set(c,l))),c.isSkinnedMesh){const u=c.skeleton;n.get(u)!==l&&(u.update(),n.set(u,l))}return d}function o(){n=new WeakMap}function r(c){const l=c.target;l.removeEventListener("dispose",r),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:s,dispose:o}}class Hl extends Ve{constructor(t,e,i,n,s,o,r,c,l,h=ts){if(h!==ts&&h!==os)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===ts&&(i=Rn),i===void 0&&h===os&&(i=as),super(null,n,s,o,r,c,h,i,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=r!==void 0?r:Je,this.minFilter=c!==void 0?c:Je,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Gl=new Ve,Mc=new Hl(1,1),Vl=new zl,Wl=new ed,ql=new Fl,wc=[],bc=[],Sc=new Float32Array(16),Ec=new Float32Array(9),Tc=new Float32Array(4);function ds(a,t,e){const i=a[0];if(i<=0||i>0)return a;const n=t*e;let s=wc[n];if(s===void 0&&(s=new Float32Array(n),wc[n]=s),t!==0){i.toArray(s,0);for(let o=1,r=0;o!==t;++o)r+=e,a[o].toArray(s,r)}return s}function Le(a,t){if(a.length!==t.length)return!1;for(let e=0,i=a.length;e<i;e++)if(a[e]!==t[e])return!1;return!0}function De(a,t){for(let e=0,i=t.length;e<i;e++)a[e]=t[e]}function ka(a,t){let e=bc[t];e===void 0&&(e=new Int32Array(t),bc[t]=e);for(let i=0;i!==t;++i)e[i]=a.allocateTextureUnit();return e}function vp(a,t){const e=this.cache;e[0]!==t&&(a.uniform1f(this.addr,t),e[0]=t)}function _p(a,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(a.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Le(e,t))return;a.uniform2fv(this.addr,t),De(e,t)}}function xp(a,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(a.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(a.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Le(e,t))return;a.uniform3fv(this.addr,t),De(e,t)}}function yp(a,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(a.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Le(e,t))return;a.uniform4fv(this.addr,t),De(e,t)}}function Mp(a,t){const e=this.cache,i=t.elements;if(i===void 0){if(Le(e,t))return;a.uniformMatrix2fv(this.addr,!1,t),De(e,t)}else{if(Le(e,i))return;Tc.set(i),a.uniformMatrix2fv(this.addr,!1,Tc),De(e,i)}}function wp(a,t){const e=this.cache,i=t.elements;if(i===void 0){if(Le(e,t))return;a.uniformMatrix3fv(this.addr,!1,t),De(e,t)}else{if(Le(e,i))return;Ec.set(i),a.uniformMatrix3fv(this.addr,!1,Ec),De(e,i)}}function bp(a,t){const e=this.cache,i=t.elements;if(i===void 0){if(Le(e,t))return;a.uniformMatrix4fv(this.addr,!1,t),De(e,t)}else{if(Le(e,i))return;Sc.set(i),a.uniformMatrix4fv(this.addr,!1,Sc),De(e,i)}}function Sp(a,t){const e=this.cache;e[0]!==t&&(a.uniform1i(this.addr,t),e[0]=t)}function Ep(a,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(a.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Le(e,t))return;a.uniform2iv(this.addr,t),De(e,t)}}function Tp(a,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(a.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Le(e,t))return;a.uniform3iv(this.addr,t),De(e,t)}}function Ap(a,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(a.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Le(e,t))return;a.uniform4iv(this.addr,t),De(e,t)}}function Cp(a,t){const e=this.cache;e[0]!==t&&(a.uniform1ui(this.addr,t),e[0]=t)}function Rp(a,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(a.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Le(e,t))return;a.uniform2uiv(this.addr,t),De(e,t)}}function zp(a,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(a.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Le(e,t))return;a.uniform3uiv(this.addr,t),De(e,t)}}function Pp(a,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(a.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Le(e,t))return;a.uniform4uiv(this.addr,t),De(e,t)}}function kp(a,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(a.uniform1i(this.addr,n),i[0]=n);let s;this.type===a.SAMPLER_2D_SHADOW?(Mc.compareFunction=Al,s=Mc):s=Gl,e.setTexture2D(t||s,n)}function Ip(a,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(a.uniform1i(this.addr,n),i[0]=n),e.setTexture3D(t||Wl,n)}function Lp(a,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(a.uniform1i(this.addr,n),i[0]=n),e.setTextureCube(t||ql,n)}function Dp(a,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(a.uniform1i(this.addr,n),i[0]=n),e.setTexture2DArray(t||Vl,n)}function Up(a){switch(a){case 5126:return vp;case 35664:return _p;case 35665:return xp;case 35666:return yp;case 35674:return Mp;case 35675:return wp;case 35676:return bp;case 5124:case 35670:return Sp;case 35667:case 35671:return Ep;case 35668:case 35672:return Tp;case 35669:case 35673:return Ap;case 5125:return Cp;case 36294:return Rp;case 36295:return zp;case 36296:return Pp;case 35678:case 36198:case 36298:case 36306:case 35682:return kp;case 35679:case 36299:case 36307:return Ip;case 35680:case 36300:case 36308:case 36293:return Lp;case 36289:case 36303:case 36311:case 36292:return Dp}}function Np(a,t){a.uniform1fv(this.addr,t)}function Fp(a,t){const e=ds(t,this.size,2);a.uniform2fv(this.addr,e)}function Op(a,t){const e=ds(t,this.size,3);a.uniform3fv(this.addr,e)}function Bp(a,t){const e=ds(t,this.size,4);a.uniform4fv(this.addr,e)}function Hp(a,t){const e=ds(t,this.size,4);a.uniformMatrix2fv(this.addr,!1,e)}function Gp(a,t){const e=ds(t,this.size,9);a.uniformMatrix3fv(this.addr,!1,e)}function Vp(a,t){const e=ds(t,this.size,16);a.uniformMatrix4fv(this.addr,!1,e)}function Wp(a,t){a.uniform1iv(this.addr,t)}function qp(a,t){a.uniform2iv(this.addr,t)}function jp(a,t){a.uniform3iv(this.addr,t)}function Xp(a,t){a.uniform4iv(this.addr,t)}function $p(a,t){a.uniform1uiv(this.addr,t)}function Kp(a,t){a.uniform2uiv(this.addr,t)}function Yp(a,t){a.uniform3uiv(this.addr,t)}function Zp(a,t){a.uniform4uiv(this.addr,t)}function Jp(a,t,e){const i=this.cache,n=t.length,s=ka(e,n);Le(i,s)||(a.uniform1iv(this.addr,s),De(i,s));for(let o=0;o!==n;++o)e.setTexture2D(t[o]||Gl,s[o])}function Qp(a,t,e){const i=this.cache,n=t.length,s=ka(e,n);Le(i,s)||(a.uniform1iv(this.addr,s),De(i,s));for(let o=0;o!==n;++o)e.setTexture3D(t[o]||Wl,s[o])}function tm(a,t,e){const i=this.cache,n=t.length,s=ka(e,n);Le(i,s)||(a.uniform1iv(this.addr,s),De(i,s));for(let o=0;o!==n;++o)e.setTextureCube(t[o]||ql,s[o])}function em(a,t,e){const i=this.cache,n=t.length,s=ka(e,n);Le(i,s)||(a.uniform1iv(this.addr,s),De(i,s));for(let o=0;o!==n;++o)e.setTexture2DArray(t[o]||Vl,s[o])}function im(a){switch(a){case 5126:return Np;case 35664:return Fp;case 35665:return Op;case 35666:return Bp;case 35674:return Hp;case 35675:return Gp;case 35676:return Vp;case 5124:case 35670:return Wp;case 35667:case 35671:return qp;case 35668:case 35672:return jp;case 35669:case 35673:return Xp;case 5125:return $p;case 36294:return Kp;case 36295:return Yp;case 36296:return Zp;case 35678:case 36198:case 36298:case 36306:case 35682:return Jp;case 35679:case 36299:case 36307:return Qp;case 35680:case 36300:case 36308:case 36293:return tm;case 36289:case 36303:case 36311:case 36292:return em}}class nm{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=Up(e.type)}}class sm{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=im(e.type)}}class am{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const n=this.seq;for(let s=0,o=n.length;s!==o;++s){const r=n[s];r.setValue(t,e[r.id],i)}}}const vo=/(\w+)(\])?(\[|\.)?/g;function Ac(a,t){a.seq.push(t),a.map[t.id]=t}function om(a,t,e){const i=a.name,n=i.length;for(vo.lastIndex=0;;){const s=vo.exec(i),o=vo.lastIndex;let r=s[1];const c=s[2]==="]",l=s[3];if(c&&(r=r|0),l===void 0||l==="["&&o+2===n){Ac(e,l===void 0?new nm(r,a,t):new sm(r,a,t));break}else{let d=e.map[r];d===void 0&&(d=new am(r),Ac(e,d)),e=d}}}class Ma{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let n=0;n<i;++n){const s=t.getActiveUniform(e,n),o=t.getUniformLocation(e,s.name);om(s,o,this)}}setValue(t,e,i,n){const s=this.map[e];s!==void 0&&s.setValue(t,i,n)}setOptional(t,e,i){const n=e[i];n!==void 0&&this.setValue(t,i,n)}static upload(t,e,i,n){for(let s=0,o=e.length;s!==o;++s){const r=e[s],c=i[r.id];c.needsUpdate!==!1&&r.setValue(t,c.value,n)}}static seqWithValue(t,e){const i=[];for(let n=0,s=t.length;n!==s;++n){const o=t[n];o.id in e&&i.push(o)}return i}}function Cc(a,t,e){const i=a.createShader(t);return a.shaderSource(i,e),a.compileShader(i),i}const rm=37297;let cm=0;function lm(a,t){const e=a.split(`
`),i=[],n=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=n;o<s;o++){const r=o+1;i.push(`${r===t?">":" "} ${r}: ${e[o]}`)}return i.join(`
`)}function hm(a){const t=oe.getPrimaries(oe.workingColorSpace),e=oe.getPrimaries(a);let i;switch(t===e?i="":t===Ta&&e===Ea?i="LinearDisplayP3ToLinearSRGB":t===Ea&&e===Ta&&(i="LinearSRGBToLinearDisplayP3"),a){case un:case Pa:return[i,"LinearTransferOETF"];case ri:case Cr:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",a),[i,"LinearTransferOETF"]}}function Rc(a,t,e){const i=a.getShaderParameter(t,a.COMPILE_STATUS),n=a.getShaderInfoLog(t).trim();if(i&&n==="")return"";const s=/ERROR: 0:(\d+)/.exec(n);if(s){const o=parseInt(s[1]);return e.toUpperCase()+`

`+n+`

`+lm(a.getShaderSource(t),o)}else return n}function dm(a,t){const e=hm(t);return`vec4 ${a}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function um(a,t){let e;switch(t){case Ch:e="Linear";break;case Rh:e="Reinhard";break;case zh:e="Cineon";break;case gl:e="ACESFilmic";break;case kh:e="AgX";break;case Ih:e="Neutral";break;case Ph:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+a+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const ra=new z;function fm(){oe.getLuminanceCoefficients(ra);const a=ra.x.toFixed(4),t=ra.y.toFixed(4),e=ra.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${a}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function pm(a){return[a.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",a.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ts).join(`
`)}function mm(a){const t=[];for(const e in a){const i=a[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function gm(a,t){const e={},i=a.getProgramParameter(t,a.ACTIVE_ATTRIBUTES);for(let n=0;n<i;n++){const s=a.getActiveAttrib(t,n),o=s.name;let r=1;s.type===a.FLOAT_MAT2&&(r=2),s.type===a.FLOAT_MAT3&&(r=3),s.type===a.FLOAT_MAT4&&(r=4),e[o]={type:s.type,location:a.getAttribLocation(t,o),locationSize:r}}return e}function Ts(a){return a!==""}function zc(a,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return a.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Pc(a,t){return a.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const vm=/^[ \t]*#include +<([\w\d./]+)>/gm;function pr(a){return a.replace(vm,xm)}const _m=new Map;function xm(a,t){let e=Ht[t];if(e===void 0){const i=_m.get(t);if(i!==void 0)e=Ht[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return pr(e)}const ym=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function kc(a){return a.replace(ym,Mm)}function Mm(a,t,e,i){let n="";for(let s=parseInt(t);s<parseInt(e);s++)n+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return n}function Ic(a){let t=`precision ${a.precision} float;
	precision ${a.precision} int;
	precision ${a.precision} sampler2D;
	precision ${a.precision} samplerCube;
	precision ${a.precision} sampler3D;
	precision ${a.precision} sampler2DArray;
	precision ${a.precision} sampler2DShadow;
	precision ${a.precision} samplerCubeShadow;
	precision ${a.precision} sampler2DArrayShadow;
	precision ${a.precision} isampler2D;
	precision ${a.precision} isampler3D;
	precision ${a.precision} isamplerCube;
	precision ${a.precision} isampler2DArray;
	precision ${a.precision} usampler2D;
	precision ${a.precision} usampler3D;
	precision ${a.precision} usamplerCube;
	precision ${a.precision} usampler2DArray;
	`;return a.precision==="highp"?t+=`
#define HIGH_PRECISION`:a.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:a.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function wm(a){let t="SHADOWMAP_TYPE_BASIC";return a.shadowMapType===pl?t="SHADOWMAP_TYPE_PCF":a.shadowMapType===ml?t="SHADOWMAP_TYPE_PCF_SOFT":a.shadowMapType===Oi&&(t="SHADOWMAP_TYPE_VSM"),t}function bm(a){let t="ENVMAP_TYPE_CUBE";if(a.envMap)switch(a.envMapMode){case ns:case ss:t="ENVMAP_TYPE_CUBE";break;case za:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Sm(a){let t="ENVMAP_MODE_REFLECTION";if(a.envMap)switch(a.envMapMode){case ss:t="ENVMAP_MODE_REFRACTION";break}return t}function Em(a){let t="ENVMAP_BLENDING_NONE";if(a.envMap)switch(a.combine){case xr:t="ENVMAP_BLENDING_MULTIPLY";break;case Th:t="ENVMAP_BLENDING_MIX";break;case Ah:t="ENVMAP_BLENDING_ADD";break}return t}function Tm(a){const t=a.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:i,maxMip:e}}function Am(a,t,e,i){const n=a.getContext(),s=e.defines;let o=e.vertexShader,r=e.fragmentShader;const c=wm(e),l=bm(e),h=Sm(e),d=Em(e),u=Tm(e),f=pm(e),g=mm(s),v=n.createProgram();let p,m,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ts).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ts).join(`
`),m.length>0&&(m+=`
`)):(p=[Ic(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ts).join(`
`),m=[Ic(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ln?"#define TONE_MAPPING":"",e.toneMapping!==ln?Ht.tonemapping_pars_fragment:"",e.toneMapping!==ln?um("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ht.colorspace_pars_fragment,dm("linearToOutputTexel",e.outputColorSpace),fm(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ts).join(`
`)),o=pr(o),o=zc(o,e),o=Pc(o,e),r=pr(r),r=zc(r,e),r=Pc(r,e),o=kc(o),r=kc(r),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",e.glslVersion===Yr?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Yr?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const x=y+p+o,w=y+m+r,R=Cc(n,n.VERTEX_SHADER,x),E=Cc(n,n.FRAGMENT_SHADER,w);n.attachShader(v,R),n.attachShader(v,E),e.index0AttributeName!==void 0?n.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&n.bindAttribLocation(v,0,"position"),n.linkProgram(v);function T(M){if(a.debug.checkShaderErrors){const P=n.getProgramInfoLog(v).trim(),O=n.getShaderInfoLog(R).trim(),B=n.getShaderInfoLog(E).trim();let q=!0,G=!0;if(n.getProgramParameter(v,n.LINK_STATUS)===!1)if(q=!1,typeof a.debug.onShaderError=="function")a.debug.onShaderError(n,v,R,E);else{const K=Rc(n,R,"vertex"),X=Rc(n,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+n.getError()+" - VALIDATE_STATUS "+n.getProgramParameter(v,n.VALIDATE_STATUS)+`

Material Name: `+M.name+`
Material Type: `+M.type+`

Program Info Log: `+P+`
`+K+`
`+X)}else P!==""?console.warn("THREE.WebGLProgram: Program Info Log:",P):(O===""||B==="")&&(G=!1);G&&(M.diagnostics={runnable:q,programLog:P,vertexShader:{log:O,prefix:p},fragmentShader:{log:B,prefix:m}})}n.deleteShader(R),n.deleteShader(E),A=new Ma(n,v),I=gm(n,v)}let A;this.getUniforms=function(){return A===void 0&&T(this),A};let I;this.getAttributes=function(){return I===void 0&&T(this),I};let _=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return _===!1&&(_=n.getProgramParameter(v,rm)),_},this.destroy=function(){i.releaseStatesOfProgram(this),n.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=cm++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=R,this.fragmentShader=E,this}let Cm=0;class Rm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,n=this._getShaderStage(e),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(n)===!1&&(o.add(n),n.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new zm(t),e.set(t,i)),i}}class zm{constructor(t){this.id=Cm++,this.code=t,this.usedTimes=0}}function Pm(a,t,e,i,n,s,o){const r=new kl,c=new Rm,l=new Set,h=[],d=n.logarithmicDepthBuffer,u=n.reverseDepthBuffer,f=n.vertexTextures;let g=n.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(_){return l.add(_),_===0?"uv":`uv${_}`}function m(_,M,P,O,B){const q=O.fog,G=B.geometry,K=_.isMeshStandardMaterial?O.environment:null,X=(_.isMeshStandardMaterial?e:t).get(_.envMap||K),ct=X&&X.mapping===za?X.image.height:null,dt=v[_.type];_.precision!==null&&(g=n.getMaxPrecision(_.precision),g!==_.precision&&console.warn("THREE.WebGLProgram.getParameters:",_.precision,"not supported, using",g,"instead."));const Mt=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,ie=Mt!==void 0?Mt.length:0;let he=0;G.morphAttributes.position!==void 0&&(he=1),G.morphAttributes.normal!==void 0&&(he=2),G.morphAttributes.color!==void 0&&(he=3);let Y,st,bt,vt;if(dt){const Ke=Ai[dt];Y=Ke.vertexShader,st=Ke.fragmentShader}else Y=_.vertexShader,st=_.fragmentShader,c.update(_),bt=c.getVertexShaderID(_),vt=c.getFragmentShaderID(_);const Ft=a.getRenderTarget(),Pt=B.isInstancedMesh===!0,Yt=B.isBatchedMesh===!0,ue=!!_.map,Zt=!!_.matcap,k=!!X,ti=!!_.aoMap,$t=!!_.lightMap,te=!!_.bumpMap,It=!!_.normalMap,_e=!!_.displacementMap,Ut=!!_.emissiveMap,C=!!_.metalnessMap,b=!!_.roughnessMap,H=_.anisotropy>0,J=_.clearcoat>0,it=_.dispersion>0,Z=_.iridescence>0,Tt=_.sheen>0,ht=_.transmission>0,_t=H&&!!_.anisotropyMap,ee=J&&!!_.clearcoatMap,at=J&&!!_.clearcoatNormalMap,xt=J&&!!_.clearcoatRoughnessMap,Lt=Z&&!!_.iridescenceMap,Dt=Z&&!!_.iridescenceThicknessMap,yt=Tt&&!!_.sheenColorMap,Kt=Tt&&!!_.sheenRoughnessMap,Ot=!!_.specularMap,ge=!!_.specularColorMap,D=!!_.specularIntensityMap,pt=ht&&!!_.transmissionMap,$=ht&&!!_.thicknessMap,Q=!!_.gradientMap,ut=!!_.alphaMap,mt=_.alphaTest>0,Jt=!!_.alphaHash,Re=!!_.extensions;let $e=ln;_.toneMapped&&(Ft===null||Ft.isXRRenderTarget===!0)&&($e=a.toneMapping);const ne={shaderID:dt,shaderType:_.type,shaderName:_.name,vertexShader:Y,fragmentShader:st,defines:_.defines,customVertexShaderID:bt,customFragmentShaderID:vt,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:g,batching:Yt,batchingColor:Yt&&B._colorsTexture!==null,instancing:Pt,instancingColor:Pt&&B.instanceColor!==null,instancingMorph:Pt&&B.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:Ft===null?a.outputColorSpace:Ft.isXRRenderTarget===!0?Ft.texture.colorSpace:un,alphaToCoverage:!!_.alphaToCoverage,map:ue,matcap:Zt,envMap:k,envMapMode:k&&X.mapping,envMapCubeUVHeight:ct,aoMap:ti,lightMap:$t,bumpMap:te,normalMap:It,displacementMap:f&&_e,emissiveMap:Ut,normalMapObjectSpace:It&&_.normalMapType===Nh,normalMapTangentSpace:It&&_.normalMapType===Ar,metalnessMap:C,roughnessMap:b,anisotropy:H,anisotropyMap:_t,clearcoat:J,clearcoatMap:ee,clearcoatNormalMap:at,clearcoatRoughnessMap:xt,dispersion:it,iridescence:Z,iridescenceMap:Lt,iridescenceThicknessMap:Dt,sheen:Tt,sheenColorMap:yt,sheenRoughnessMap:Kt,specularMap:Ot,specularColorMap:ge,specularIntensityMap:D,transmission:ht,transmissionMap:pt,thicknessMap:$,gradientMap:Q,opaque:_.transparent===!1&&_.blending===Qn&&_.alphaToCoverage===!1,alphaMap:ut,alphaTest:mt,alphaHash:Jt,combine:_.combine,mapUv:ue&&p(_.map.channel),aoMapUv:ti&&p(_.aoMap.channel),lightMapUv:$t&&p(_.lightMap.channel),bumpMapUv:te&&p(_.bumpMap.channel),normalMapUv:It&&p(_.normalMap.channel),displacementMapUv:_e&&p(_.displacementMap.channel),emissiveMapUv:Ut&&p(_.emissiveMap.channel),metalnessMapUv:C&&p(_.metalnessMap.channel),roughnessMapUv:b&&p(_.roughnessMap.channel),anisotropyMapUv:_t&&p(_.anisotropyMap.channel),clearcoatMapUv:ee&&p(_.clearcoatMap.channel),clearcoatNormalMapUv:at&&p(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:xt&&p(_.clearcoatRoughnessMap.channel),iridescenceMapUv:Lt&&p(_.iridescenceMap.channel),iridescenceThicknessMapUv:Dt&&p(_.iridescenceThicknessMap.channel),sheenColorMapUv:yt&&p(_.sheenColorMap.channel),sheenRoughnessMapUv:Kt&&p(_.sheenRoughnessMap.channel),specularMapUv:Ot&&p(_.specularMap.channel),specularColorMapUv:ge&&p(_.specularColorMap.channel),specularIntensityMapUv:D&&p(_.specularIntensityMap.channel),transmissionMapUv:pt&&p(_.transmissionMap.channel),thicknessMapUv:$&&p(_.thicknessMap.channel),alphaMapUv:ut&&p(_.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(It||H),vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!G.attributes.uv&&(ue||ut),fog:!!q,useFog:_.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:_.flatShading===!0,sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:u,skinning:B.isSkinnedMesh===!0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:ie,morphTextureStride:he,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:_.dithering,shadowMapEnabled:a.shadowMap.enabled&&P.length>0,shadowMapType:a.shadowMap.type,toneMapping:$e,decodeVideoTexture:ue&&_.map.isVideoTexture===!0&&oe.getTransfer(_.map.colorSpace)===ye,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===we,flipSided:_.side===Qe,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:Re&&_.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Re&&_.extensions.multiDraw===!0||Yt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return ne.vertexUv1s=l.has(1),ne.vertexUv2s=l.has(2),ne.vertexUv3s=l.has(3),l.clear(),ne}function y(_){const M=[];if(_.shaderID?M.push(_.shaderID):(M.push(_.customVertexShaderID),M.push(_.customFragmentShaderID)),_.defines!==void 0)for(const P in _.defines)M.push(P),M.push(_.defines[P]);return _.isRawShaderMaterial===!1&&(x(M,_),w(M,_),M.push(a.outputColorSpace)),M.push(_.customProgramCacheKey),M.join()}function x(_,M){_.push(M.precision),_.push(M.outputColorSpace),_.push(M.envMapMode),_.push(M.envMapCubeUVHeight),_.push(M.mapUv),_.push(M.alphaMapUv),_.push(M.lightMapUv),_.push(M.aoMapUv),_.push(M.bumpMapUv),_.push(M.normalMapUv),_.push(M.displacementMapUv),_.push(M.emissiveMapUv),_.push(M.metalnessMapUv),_.push(M.roughnessMapUv),_.push(M.anisotropyMapUv),_.push(M.clearcoatMapUv),_.push(M.clearcoatNormalMapUv),_.push(M.clearcoatRoughnessMapUv),_.push(M.iridescenceMapUv),_.push(M.iridescenceThicknessMapUv),_.push(M.sheenColorMapUv),_.push(M.sheenRoughnessMapUv),_.push(M.specularMapUv),_.push(M.specularColorMapUv),_.push(M.specularIntensityMapUv),_.push(M.transmissionMapUv),_.push(M.thicknessMapUv),_.push(M.combine),_.push(M.fogExp2),_.push(M.sizeAttenuation),_.push(M.morphTargetsCount),_.push(M.morphAttributeCount),_.push(M.numDirLights),_.push(M.numPointLights),_.push(M.numSpotLights),_.push(M.numSpotLightMaps),_.push(M.numHemiLights),_.push(M.numRectAreaLights),_.push(M.numDirLightShadows),_.push(M.numPointLightShadows),_.push(M.numSpotLightShadows),_.push(M.numSpotLightShadowsWithMaps),_.push(M.numLightProbes),_.push(M.shadowMapType),_.push(M.toneMapping),_.push(M.numClippingPlanes),_.push(M.numClipIntersection),_.push(M.depthPacking)}function w(_,M){r.disableAll(),M.supportsVertexTextures&&r.enable(0),M.instancing&&r.enable(1),M.instancingColor&&r.enable(2),M.instancingMorph&&r.enable(3),M.matcap&&r.enable(4),M.envMap&&r.enable(5),M.normalMapObjectSpace&&r.enable(6),M.normalMapTangentSpace&&r.enable(7),M.clearcoat&&r.enable(8),M.iridescence&&r.enable(9),M.alphaTest&&r.enable(10),M.vertexColors&&r.enable(11),M.vertexAlphas&&r.enable(12),M.vertexUv1s&&r.enable(13),M.vertexUv2s&&r.enable(14),M.vertexUv3s&&r.enable(15),M.vertexTangents&&r.enable(16),M.anisotropy&&r.enable(17),M.alphaHash&&r.enable(18),M.batching&&r.enable(19),M.dispersion&&r.enable(20),M.batchingColor&&r.enable(21),_.push(r.mask),r.disableAll(),M.fog&&r.enable(0),M.useFog&&r.enable(1),M.flatShading&&r.enable(2),M.logarithmicDepthBuffer&&r.enable(3),M.reverseDepthBuffer&&r.enable(4),M.skinning&&r.enable(5),M.morphTargets&&r.enable(6),M.morphNormals&&r.enable(7),M.morphColors&&r.enable(8),M.premultipliedAlpha&&r.enable(9),M.shadowMapEnabled&&r.enable(10),M.doubleSided&&r.enable(11),M.flipSided&&r.enable(12),M.useDepthPacking&&r.enable(13),M.dithering&&r.enable(14),M.transmission&&r.enable(15),M.sheen&&r.enable(16),M.opaque&&r.enable(17),M.pointsUvs&&r.enable(18),M.decodeVideoTexture&&r.enable(19),M.alphaToCoverage&&r.enable(20),_.push(r.mask)}function R(_){const M=v[_.type];let P;if(M){const O=Ai[M];P=fd.clone(O.uniforms)}else P=_.uniforms;return P}function E(_,M){let P;for(let O=0,B=h.length;O<B;O++){const q=h[O];if(q.cacheKey===M){P=q,++P.usedTimes;break}}return P===void 0&&(P=new Am(a,M,_,s),h.push(P)),P}function T(_){if(--_.usedTimes===0){const M=h.indexOf(_);h[M]=h[h.length-1],h.pop(),_.destroy()}}function A(_){c.remove(_)}function I(){c.dispose()}return{getParameters:m,getProgramCacheKey:y,getUniforms:R,acquireProgram:E,releaseProgram:T,releaseShaderCache:A,programs:h,dispose:I}}function km(){let a=new WeakMap;function t(o){return a.has(o)}function e(o){let r=a.get(o);return r===void 0&&(r={},a.set(o,r)),r}function i(o){a.delete(o)}function n(o,r,c){a.get(o)[r]=c}function s(){a=new WeakMap}return{has:t,get:e,remove:i,update:n,dispose:s}}function Im(a,t){return a.groupOrder!==t.groupOrder?a.groupOrder-t.groupOrder:a.renderOrder!==t.renderOrder?a.renderOrder-t.renderOrder:a.material.id!==t.material.id?a.material.id-t.material.id:a.z!==t.z?a.z-t.z:a.id-t.id}function Lc(a,t){return a.groupOrder!==t.groupOrder?a.groupOrder-t.groupOrder:a.renderOrder!==t.renderOrder?a.renderOrder-t.renderOrder:a.z!==t.z?t.z-a.z:a.id-t.id}function Dc(){const a=[];let t=0;const e=[],i=[],n=[];function s(){t=0,e.length=0,i.length=0,n.length=0}function o(d,u,f,g,v,p){let m=a[t];return m===void 0?(m={id:d.id,object:d,geometry:u,material:f,groupOrder:g,renderOrder:d.renderOrder,z:v,group:p},a[t]=m):(m.id=d.id,m.object=d,m.geometry=u,m.material=f,m.groupOrder=g,m.renderOrder=d.renderOrder,m.z=v,m.group=p),t++,m}function r(d,u,f,g,v,p){const m=o(d,u,f,g,v,p);f.transmission>0?i.push(m):f.transparent===!0?n.push(m):e.push(m)}function c(d,u,f,g,v,p){const m=o(d,u,f,g,v,p);f.transmission>0?i.unshift(m):f.transparent===!0?n.unshift(m):e.unshift(m)}function l(d,u){e.length>1&&e.sort(d||Im),i.length>1&&i.sort(u||Lc),n.length>1&&n.sort(u||Lc)}function h(){for(let d=t,u=a.length;d<u;d++){const f=a[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:i,transparent:n,init:s,push:r,unshift:c,finish:h,sort:l}}function Lm(){let a=new WeakMap;function t(i,n){const s=a.get(i);let o;return s===void 0?(o=new Dc,a.set(i,[o])):n>=s.length?(o=new Dc,s.push(o)):o=s[n],o}function e(){a=new WeakMap}return{get:t,dispose:e}}function Dm(){const a={};return{get:function(t){if(a[t.id]!==void 0)return a[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new z,color:new nt};break;case"SpotLight":e={position:new z,direction:new z,color:new nt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new z,color:new nt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new z,skyColor:new nt,groundColor:new nt};break;case"RectAreaLight":e={color:new nt,position:new z,halfWidth:new z,halfHeight:new z};break}return a[t.id]=e,e}}}function Um(){const a={};return{get:function(t){if(a[t.id]!==void 0)return a[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new jt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new jt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new jt,shadowCameraNear:1,shadowCameraFar:1e3};break}return a[t.id]=e,e}}}let Nm=0;function Fm(a,t){return(t.castShadow?2:0)-(a.castShadow?2:0)+(t.map?1:0)-(a.map?1:0)}function Om(a){const t=new Dm,e=Um(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new z);const n=new z,s=new me,o=new me;function r(l){let h=0,d=0,u=0;for(let I=0;I<9;I++)i.probe[I].set(0,0,0);let f=0,g=0,v=0,p=0,m=0,y=0,x=0,w=0,R=0,E=0,T=0;l.sort(Fm);for(let I=0,_=l.length;I<_;I++){const M=l[I],P=M.color,O=M.intensity,B=M.distance,q=M.shadow&&M.shadow.map?M.shadow.map.texture:null;if(M.isAmbientLight)h+=P.r*O,d+=P.g*O,u+=P.b*O;else if(M.isLightProbe){for(let G=0;G<9;G++)i.probe[G].addScaledVector(M.sh.coefficients[G],O);T++}else if(M.isDirectionalLight){const G=t.get(M);if(G.color.copy(M.color).multiplyScalar(M.intensity),M.castShadow){const K=M.shadow,X=e.get(M);X.shadowIntensity=K.intensity,X.shadowBias=K.bias,X.shadowNormalBias=K.normalBias,X.shadowRadius=K.radius,X.shadowMapSize=K.mapSize,i.directionalShadow[f]=X,i.directionalShadowMap[f]=q,i.directionalShadowMatrix[f]=M.shadow.matrix,y++}i.directional[f]=G,f++}else if(M.isSpotLight){const G=t.get(M);G.position.setFromMatrixPosition(M.matrixWorld),G.color.copy(P).multiplyScalar(O),G.distance=B,G.coneCos=Math.cos(M.angle),G.penumbraCos=Math.cos(M.angle*(1-M.penumbra)),G.decay=M.decay,i.spot[v]=G;const K=M.shadow;if(M.map&&(i.spotLightMap[R]=M.map,R++,K.updateMatrices(M),M.castShadow&&E++),i.spotLightMatrix[v]=K.matrix,M.castShadow){const X=e.get(M);X.shadowIntensity=K.intensity,X.shadowBias=K.bias,X.shadowNormalBias=K.normalBias,X.shadowRadius=K.radius,X.shadowMapSize=K.mapSize,i.spotShadow[v]=X,i.spotShadowMap[v]=q,w++}v++}else if(M.isRectAreaLight){const G=t.get(M);G.color.copy(P).multiplyScalar(O),G.halfWidth.set(M.width*.5,0,0),G.halfHeight.set(0,M.height*.5,0),i.rectArea[p]=G,p++}else if(M.isPointLight){const G=t.get(M);if(G.color.copy(M.color).multiplyScalar(M.intensity),G.distance=M.distance,G.decay=M.decay,M.castShadow){const K=M.shadow,X=e.get(M);X.shadowIntensity=K.intensity,X.shadowBias=K.bias,X.shadowNormalBias=K.normalBias,X.shadowRadius=K.radius,X.shadowMapSize=K.mapSize,X.shadowCameraNear=K.camera.near,X.shadowCameraFar=K.camera.far,i.pointShadow[g]=X,i.pointShadowMap[g]=q,i.pointShadowMatrix[g]=M.shadow.matrix,x++}i.point[g]=G,g++}else if(M.isHemisphereLight){const G=t.get(M);G.skyColor.copy(M.color).multiplyScalar(O),G.groundColor.copy(M.groundColor).multiplyScalar(O),i.hemi[m]=G,m++}}p>0&&(a.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=rt.LTC_FLOAT_1,i.rectAreaLTC2=rt.LTC_FLOAT_2):(i.rectAreaLTC1=rt.LTC_HALF_1,i.rectAreaLTC2=rt.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=d,i.ambient[2]=u;const A=i.hash;(A.directionalLength!==f||A.pointLength!==g||A.spotLength!==v||A.rectAreaLength!==p||A.hemiLength!==m||A.numDirectionalShadows!==y||A.numPointShadows!==x||A.numSpotShadows!==w||A.numSpotMaps!==R||A.numLightProbes!==T)&&(i.directional.length=f,i.spot.length=v,i.rectArea.length=p,i.point.length=g,i.hemi.length=m,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=x,i.pointShadowMap.length=x,i.spotShadow.length=w,i.spotShadowMap.length=w,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=x,i.spotLightMatrix.length=w+R-E,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=E,i.numLightProbes=T,A.directionalLength=f,A.pointLength=g,A.spotLength=v,A.rectAreaLength=p,A.hemiLength=m,A.numDirectionalShadows=y,A.numPointShadows=x,A.numSpotShadows=w,A.numSpotMaps=R,A.numLightProbes=T,i.version=Nm++)}function c(l,h){let d=0,u=0,f=0,g=0,v=0;const p=h.matrixWorldInverse;for(let m=0,y=l.length;m<y;m++){const x=l[m];if(x.isDirectionalLight){const w=i.directional[d];w.direction.setFromMatrixPosition(x.matrixWorld),n.setFromMatrixPosition(x.target.matrixWorld),w.direction.sub(n),w.direction.transformDirection(p),d++}else if(x.isSpotLight){const w=i.spot[f];w.position.setFromMatrixPosition(x.matrixWorld),w.position.applyMatrix4(p),w.direction.setFromMatrixPosition(x.matrixWorld),n.setFromMatrixPosition(x.target.matrixWorld),w.direction.sub(n),w.direction.transformDirection(p),f++}else if(x.isRectAreaLight){const w=i.rectArea[g];w.position.setFromMatrixPosition(x.matrixWorld),w.position.applyMatrix4(p),o.identity(),s.copy(x.matrixWorld),s.premultiply(p),o.extractRotation(s),w.halfWidth.set(x.width*.5,0,0),w.halfHeight.set(0,x.height*.5,0),w.halfWidth.applyMatrix4(o),w.halfHeight.applyMatrix4(o),g++}else if(x.isPointLight){const w=i.point[u];w.position.setFromMatrixPosition(x.matrixWorld),w.position.applyMatrix4(p),u++}else if(x.isHemisphereLight){const w=i.hemi[v];w.direction.setFromMatrixPosition(x.matrixWorld),w.direction.transformDirection(p),v++}}}return{setup:r,setupView:c,state:i}}function Uc(a){const t=new Om(a),e=[],i=[];function n(h){l.camera=h,e.length=0,i.length=0}function s(h){e.push(h)}function o(h){i.push(h)}function r(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:n,state:l,setupLights:r,setupLightsView:c,pushLight:s,pushShadow:o}}function Bm(a){let t=new WeakMap;function e(n,s=0){const o=t.get(n);let r;return o===void 0?(r=new Uc(a),t.set(n,[r])):s>=o.length?(r=new Uc(a),o.push(r)):r=o[s],r}function i(){t=new WeakMap}return{get:e,dispose:i}}class Hm extends In{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Dh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Gm extends In{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Vm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Wm=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function qm(a,t,e){let i=new Rr;const n=new jt,s=new jt,o=new pe,r=new Hm({depthPacking:Uh}),c=new Gm,l={},h=e.maxTextureSize,d={[qi]:Qe,[Qe]:qi,[we]:we},u=new dn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new jt},radius:{value:4}},vertexShader:Vm,fragmentShader:Wm}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const g=new Ce;g.setAttribute("position",new ke(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new gt(g,u),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=pl;let m=this.type;this.render=function(E,T,A){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||E.length===0)return;const I=a.getRenderTarget(),_=a.getActiveCubeFace(),M=a.getActiveMipmapLevel(),P=a.state;P.setBlending(cn),P.buffers.color.setClear(1,1,1,1),P.buffers.depth.setTest(!0),P.setScissorTest(!1);const O=m!==Oi&&this.type===Oi,B=m===Oi&&this.type!==Oi;for(let q=0,G=E.length;q<G;q++){const K=E[q],X=K.shadow;if(X===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;n.copy(X.mapSize);const ct=X.getFrameExtents();if(n.multiply(ct),s.copy(X.mapSize),(n.x>h||n.y>h)&&(n.x>h&&(s.x=Math.floor(h/ct.x),n.x=s.x*ct.x,X.mapSize.x=s.x),n.y>h&&(s.y=Math.floor(h/ct.y),n.y=s.y*ct.y,X.mapSize.y=s.y)),X.map===null||O===!0||B===!0){const Mt=this.type!==Oi?{minFilter:Je,magFilter:Je}:{};X.map!==null&&X.map.dispose(),X.map=new zn(n.x,n.y,Mt),X.map.texture.name=K.name+".shadowMap",X.camera.updateProjectionMatrix()}a.setRenderTarget(X.map),a.clear();const dt=X.getViewportCount();for(let Mt=0;Mt<dt;Mt++){const ie=X.getViewport(Mt);o.set(s.x*ie.x,s.y*ie.y,s.x*ie.z,s.y*ie.w),P.viewport(o),X.updateMatrices(K,Mt),i=X.getFrustum(),w(T,A,X.camera,K,this.type)}X.isPointLightShadow!==!0&&this.type===Oi&&y(X,A),X.needsUpdate=!1}m=this.type,p.needsUpdate=!1,a.setRenderTarget(I,_,M)};function y(E,T){const A=t.update(v);u.defines.VSM_SAMPLES!==E.blurSamples&&(u.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new zn(n.x,n.y)),u.uniforms.shadow_pass.value=E.map.texture,u.uniforms.resolution.value=E.mapSize,u.uniforms.radius.value=E.radius,a.setRenderTarget(E.mapPass),a.clear(),a.renderBufferDirect(T,null,A,u,v,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,a.setRenderTarget(E.map),a.clear(),a.renderBufferDirect(T,null,A,f,v,null)}function x(E,T,A,I){let _=null;const M=A.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(M!==void 0)_=M;else if(_=A.isPointLight===!0?c:r,a.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const P=_.uuid,O=T.uuid;let B=l[P];B===void 0&&(B={},l[P]=B);let q=B[O];q===void 0&&(q=_.clone(),B[O]=q,T.addEventListener("dispose",R)),_=q}if(_.visible=T.visible,_.wireframe=T.wireframe,I===Oi?_.side=T.shadowSide!==null?T.shadowSide:T.side:_.side=T.shadowSide!==null?T.shadowSide:d[T.side],_.alphaMap=T.alphaMap,_.alphaTest=T.alphaTest,_.map=T.map,_.clipShadows=T.clipShadows,_.clippingPlanes=T.clippingPlanes,_.clipIntersection=T.clipIntersection,_.displacementMap=T.displacementMap,_.displacementScale=T.displacementScale,_.displacementBias=T.displacementBias,_.wireframeLinewidth=T.wireframeLinewidth,_.linewidth=T.linewidth,A.isPointLight===!0&&_.isMeshDistanceMaterial===!0){const P=a.properties.get(_);P.light=A}return _}function w(E,T,A,I,_){if(E.visible===!1)return;if(E.layers.test(T.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&_===Oi)&&(!E.frustumCulled||i.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,E.matrixWorld);const O=t.update(E),B=E.material;if(Array.isArray(B)){const q=O.groups;for(let G=0,K=q.length;G<K;G++){const X=q[G],ct=B[X.materialIndex];if(ct&&ct.visible){const dt=x(E,ct,I,_);E.onBeforeShadow(a,E,T,A,O,dt,X),a.renderBufferDirect(A,null,O,dt,E,X),E.onAfterShadow(a,E,T,A,O,dt,X)}}}else if(B.visible){const q=x(E,B,I,_);E.onBeforeShadow(a,E,T,A,O,q,null),a.renderBufferDirect(A,null,O,q,E,null),E.onAfterShadow(a,E,T,A,O,q,null)}}const P=E.children;for(let O=0,B=P.length;O<B;O++)w(P[O],T,A,I,_)}function R(E){E.target.removeEventListener("dispose",R);for(const A in l){const I=l[A],_=E.target.uuid;_ in I&&(I[_].dispose(),delete I[_])}}}const jm={[ko]:Io,[Lo]:No,[Do]:Fo,[is]:Uo,[Io]:ko,[No]:Lo,[Fo]:Do,[Uo]:is};function Xm(a){function t(){let D=!1;const pt=new pe;let $=null;const Q=new pe(0,0,0,0);return{setMask:function(ut){$!==ut&&!D&&(a.colorMask(ut,ut,ut,ut),$=ut)},setLocked:function(ut){D=ut},setClear:function(ut,mt,Jt,Re,$e){$e===!0&&(ut*=Re,mt*=Re,Jt*=Re),pt.set(ut,mt,Jt,Re),Q.equals(pt)===!1&&(a.clearColor(ut,mt,Jt,Re),Q.copy(pt))},reset:function(){D=!1,$=null,Q.set(-1,0,0,0)}}}function e(){let D=!1,pt=!1,$=null,Q=null,ut=null;return{setReversed:function(mt){pt=mt},setTest:function(mt){mt?bt(a.DEPTH_TEST):vt(a.DEPTH_TEST)},setMask:function(mt){$!==mt&&!D&&(a.depthMask(mt),$=mt)},setFunc:function(mt){if(pt&&(mt=jm[mt]),Q!==mt){switch(mt){case ko:a.depthFunc(a.NEVER);break;case Io:a.depthFunc(a.ALWAYS);break;case Lo:a.depthFunc(a.LESS);break;case is:a.depthFunc(a.LEQUAL);break;case Do:a.depthFunc(a.EQUAL);break;case Uo:a.depthFunc(a.GEQUAL);break;case No:a.depthFunc(a.GREATER);break;case Fo:a.depthFunc(a.NOTEQUAL);break;default:a.depthFunc(a.LEQUAL)}Q=mt}},setLocked:function(mt){D=mt},setClear:function(mt){ut!==mt&&(a.clearDepth(mt),ut=mt)},reset:function(){D=!1,$=null,Q=null,ut=null}}}function i(){let D=!1,pt=null,$=null,Q=null,ut=null,mt=null,Jt=null,Re=null,$e=null;return{setTest:function(ne){D||(ne?bt(a.STENCIL_TEST):vt(a.STENCIL_TEST))},setMask:function(ne){pt!==ne&&!D&&(a.stencilMask(ne),pt=ne)},setFunc:function(ne,Ke,Pi){($!==ne||Q!==Ke||ut!==Pi)&&(a.stencilFunc(ne,Ke,Pi),$=ne,Q=Ke,ut=Pi)},setOp:function(ne,Ke,Pi){(mt!==ne||Jt!==Ke||Re!==Pi)&&(a.stencilOp(ne,Ke,Pi),mt=ne,Jt=Ke,Re=Pi)},setLocked:function(ne){D=ne},setClear:function(ne){$e!==ne&&(a.clearStencil(ne),$e=ne)},reset:function(){D=!1,pt=null,$=null,Q=null,ut=null,mt=null,Jt=null,Re=null,$e=null}}}const n=new t,s=new e,o=new i,r=new WeakMap,c=new WeakMap;let l={},h={},d=new WeakMap,u=[],f=null,g=!1,v=null,p=null,m=null,y=null,x=null,w=null,R=null,E=new nt(0,0,0),T=0,A=!1,I=null,_=null,M=null,P=null,O=null;const B=a.getParameter(a.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,G=0;const K=a.getParameter(a.VERSION);K.indexOf("WebGL")!==-1?(G=parseFloat(/^WebGL (\d)/.exec(K)[1]),q=G>=1):K.indexOf("OpenGL ES")!==-1&&(G=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),q=G>=2);let X=null,ct={};const dt=a.getParameter(a.SCISSOR_BOX),Mt=a.getParameter(a.VIEWPORT),ie=new pe().fromArray(dt),he=new pe().fromArray(Mt);function Y(D,pt,$,Q){const ut=new Uint8Array(4),mt=a.createTexture();a.bindTexture(D,mt),a.texParameteri(D,a.TEXTURE_MIN_FILTER,a.NEAREST),a.texParameteri(D,a.TEXTURE_MAG_FILTER,a.NEAREST);for(let Jt=0;Jt<$;Jt++)D===a.TEXTURE_3D||D===a.TEXTURE_2D_ARRAY?a.texImage3D(pt,0,a.RGBA,1,1,Q,0,a.RGBA,a.UNSIGNED_BYTE,ut):a.texImage2D(pt+Jt,0,a.RGBA,1,1,0,a.RGBA,a.UNSIGNED_BYTE,ut);return mt}const st={};st[a.TEXTURE_2D]=Y(a.TEXTURE_2D,a.TEXTURE_2D,1),st[a.TEXTURE_CUBE_MAP]=Y(a.TEXTURE_CUBE_MAP,a.TEXTURE_CUBE_MAP_POSITIVE_X,6),st[a.TEXTURE_2D_ARRAY]=Y(a.TEXTURE_2D_ARRAY,a.TEXTURE_2D_ARRAY,1,1),st[a.TEXTURE_3D]=Y(a.TEXTURE_3D,a.TEXTURE_3D,1,1),n.setClear(0,0,0,1),s.setClear(1),o.setClear(0),bt(a.DEPTH_TEST),s.setFunc(is),$t(!1),te(qr),bt(a.CULL_FACE),k(cn);function bt(D){l[D]!==!0&&(a.enable(D),l[D]=!0)}function vt(D){l[D]!==!1&&(a.disable(D),l[D]=!1)}function Ft(D,pt){return h[D]!==pt?(a.bindFramebuffer(D,pt),h[D]=pt,D===a.DRAW_FRAMEBUFFER&&(h[a.FRAMEBUFFER]=pt),D===a.FRAMEBUFFER&&(h[a.DRAW_FRAMEBUFFER]=pt),!0):!1}function Pt(D,pt){let $=u,Q=!1;if(D){$=d.get(pt),$===void 0&&($=[],d.set(pt,$));const ut=D.textures;if($.length!==ut.length||$[0]!==a.COLOR_ATTACHMENT0){for(let mt=0,Jt=ut.length;mt<Jt;mt++)$[mt]=a.COLOR_ATTACHMENT0+mt;$.length=ut.length,Q=!0}}else $[0]!==a.BACK&&($[0]=a.BACK,Q=!0);Q&&a.drawBuffers($)}function Yt(D){return f!==D?(a.useProgram(D),f=D,!0):!1}const ue={[En]:a.FUNC_ADD,[lh]:a.FUNC_SUBTRACT,[hh]:a.FUNC_REVERSE_SUBTRACT};ue[dh]=a.MIN,ue[uh]=a.MAX;const Zt={[fh]:a.ZERO,[ph]:a.ONE,[mh]:a.SRC_COLOR,[zo]:a.SRC_ALPHA,[Mh]:a.SRC_ALPHA_SATURATE,[xh]:a.DST_COLOR,[vh]:a.DST_ALPHA,[gh]:a.ONE_MINUS_SRC_COLOR,[Po]:a.ONE_MINUS_SRC_ALPHA,[yh]:a.ONE_MINUS_DST_COLOR,[_h]:a.ONE_MINUS_DST_ALPHA,[wh]:a.CONSTANT_COLOR,[bh]:a.ONE_MINUS_CONSTANT_COLOR,[Sh]:a.CONSTANT_ALPHA,[Eh]:a.ONE_MINUS_CONSTANT_ALPHA};function k(D,pt,$,Q,ut,mt,Jt,Re,$e,ne){if(D===cn){g===!0&&(vt(a.BLEND),g=!1);return}if(g===!1&&(bt(a.BLEND),g=!0),D!==ch){if(D!==v||ne!==A){if((p!==En||x!==En)&&(a.blendEquation(a.FUNC_ADD),p=En,x=En),ne)switch(D){case Qn:a.blendFuncSeparate(a.ONE,a.ONE_MINUS_SRC_ALPHA,a.ONE,a.ONE_MINUS_SRC_ALPHA);break;case wa:a.blendFunc(a.ONE,a.ONE);break;case jr:a.blendFuncSeparate(a.ZERO,a.ONE_MINUS_SRC_COLOR,a.ZERO,a.ONE);break;case Xr:a.blendFuncSeparate(a.ZERO,a.SRC_COLOR,a.ZERO,a.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case Qn:a.blendFuncSeparate(a.SRC_ALPHA,a.ONE_MINUS_SRC_ALPHA,a.ONE,a.ONE_MINUS_SRC_ALPHA);break;case wa:a.blendFunc(a.SRC_ALPHA,a.ONE);break;case jr:a.blendFuncSeparate(a.ZERO,a.ONE_MINUS_SRC_COLOR,a.ZERO,a.ONE);break;case Xr:a.blendFunc(a.ZERO,a.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}m=null,y=null,w=null,R=null,E.set(0,0,0),T=0,v=D,A=ne}return}ut=ut||pt,mt=mt||$,Jt=Jt||Q,(pt!==p||ut!==x)&&(a.blendEquationSeparate(ue[pt],ue[ut]),p=pt,x=ut),($!==m||Q!==y||mt!==w||Jt!==R)&&(a.blendFuncSeparate(Zt[$],Zt[Q],Zt[mt],Zt[Jt]),m=$,y=Q,w=mt,R=Jt),(Re.equals(E)===!1||$e!==T)&&(a.blendColor(Re.r,Re.g,Re.b,$e),E.copy(Re),T=$e),v=D,A=!1}function ti(D,pt){D.side===we?vt(a.CULL_FACE):bt(a.CULL_FACE);let $=D.side===Qe;pt&&($=!$),$t($),D.blending===Qn&&D.transparent===!1?k(cn):k(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),s.setFunc(D.depthFunc),s.setTest(D.depthTest),s.setMask(D.depthWrite),n.setMask(D.colorWrite);const Q=D.stencilWrite;o.setTest(Q),Q&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),_e(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?bt(a.SAMPLE_ALPHA_TO_COVERAGE):vt(a.SAMPLE_ALPHA_TO_COVERAGE)}function $t(D){I!==D&&(D?a.frontFace(a.CW):a.frontFace(a.CCW),I=D)}function te(D){D!==oh?(bt(a.CULL_FACE),D!==_&&(D===qr?a.cullFace(a.BACK):D===rh?a.cullFace(a.FRONT):a.cullFace(a.FRONT_AND_BACK))):vt(a.CULL_FACE),_=D}function It(D){D!==M&&(q&&a.lineWidth(D),M=D)}function _e(D,pt,$){D?(bt(a.POLYGON_OFFSET_FILL),(P!==pt||O!==$)&&(a.polygonOffset(pt,$),P=pt,O=$)):vt(a.POLYGON_OFFSET_FILL)}function Ut(D){D?bt(a.SCISSOR_TEST):vt(a.SCISSOR_TEST)}function C(D){D===void 0&&(D=a.TEXTURE0+B-1),X!==D&&(a.activeTexture(D),X=D)}function b(D,pt,$){$===void 0&&(X===null?$=a.TEXTURE0+B-1:$=X);let Q=ct[$];Q===void 0&&(Q={type:void 0,texture:void 0},ct[$]=Q),(Q.type!==D||Q.texture!==pt)&&(X!==$&&(a.activeTexture($),X=$),a.bindTexture(D,pt||st[D]),Q.type=D,Q.texture=pt)}function H(){const D=ct[X];D!==void 0&&D.type!==void 0&&(a.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function J(){try{a.compressedTexImage2D.apply(a,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function it(){try{a.compressedTexImage3D.apply(a,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Z(){try{a.texSubImage2D.apply(a,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Tt(){try{a.texSubImage3D.apply(a,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ht(){try{a.compressedTexSubImage2D.apply(a,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function _t(){try{a.compressedTexSubImage3D.apply(a,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ee(){try{a.texStorage2D.apply(a,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function at(){try{a.texStorage3D.apply(a,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function xt(){try{a.texImage2D.apply(a,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Lt(){try{a.texImage3D.apply(a,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Dt(D){ie.equals(D)===!1&&(a.scissor(D.x,D.y,D.z,D.w),ie.copy(D))}function yt(D){he.equals(D)===!1&&(a.viewport(D.x,D.y,D.z,D.w),he.copy(D))}function Kt(D,pt){let $=c.get(pt);$===void 0&&($=new WeakMap,c.set(pt,$));let Q=$.get(D);Q===void 0&&(Q=a.getUniformBlockIndex(pt,D.name),$.set(D,Q))}function Ot(D,pt){const Q=c.get(pt).get(D);r.get(pt)!==Q&&(a.uniformBlockBinding(pt,Q,D.__bindingPointIndex),r.set(pt,Q))}function ge(){a.disable(a.BLEND),a.disable(a.CULL_FACE),a.disable(a.DEPTH_TEST),a.disable(a.POLYGON_OFFSET_FILL),a.disable(a.SCISSOR_TEST),a.disable(a.STENCIL_TEST),a.disable(a.SAMPLE_ALPHA_TO_COVERAGE),a.blendEquation(a.FUNC_ADD),a.blendFunc(a.ONE,a.ZERO),a.blendFuncSeparate(a.ONE,a.ZERO,a.ONE,a.ZERO),a.blendColor(0,0,0,0),a.colorMask(!0,!0,!0,!0),a.clearColor(0,0,0,0),a.depthMask(!0),a.depthFunc(a.LESS),a.clearDepth(1),a.stencilMask(4294967295),a.stencilFunc(a.ALWAYS,0,4294967295),a.stencilOp(a.KEEP,a.KEEP,a.KEEP),a.clearStencil(0),a.cullFace(a.BACK),a.frontFace(a.CCW),a.polygonOffset(0,0),a.activeTexture(a.TEXTURE0),a.bindFramebuffer(a.FRAMEBUFFER,null),a.bindFramebuffer(a.DRAW_FRAMEBUFFER,null),a.bindFramebuffer(a.READ_FRAMEBUFFER,null),a.useProgram(null),a.lineWidth(1),a.scissor(0,0,a.canvas.width,a.canvas.height),a.viewport(0,0,a.canvas.width,a.canvas.height),l={},X=null,ct={},h={},d=new WeakMap,u=[],f=null,g=!1,v=null,p=null,m=null,y=null,x=null,w=null,R=null,E=new nt(0,0,0),T=0,A=!1,I=null,_=null,M=null,P=null,O=null,ie.set(0,0,a.canvas.width,a.canvas.height),he.set(0,0,a.canvas.width,a.canvas.height),n.reset(),s.reset(),o.reset()}return{buffers:{color:n,depth:s,stencil:o},enable:bt,disable:vt,bindFramebuffer:Ft,drawBuffers:Pt,useProgram:Yt,setBlending:k,setMaterial:ti,setFlipSided:$t,setCullFace:te,setLineWidth:It,setPolygonOffset:_e,setScissorTest:Ut,activeTexture:C,bindTexture:b,unbindTexture:H,compressedTexImage2D:J,compressedTexImage3D:it,texImage2D:xt,texImage3D:Lt,updateUBOMapping:Kt,uniformBlockBinding:Ot,texStorage2D:ee,texStorage3D:at,texSubImage2D:Z,texSubImage3D:Tt,compressedTexSubImage2D:ht,compressedTexSubImage3D:_t,scissor:Dt,viewport:yt,reset:ge}}function Nc(a,t,e,i){const n=$m(i);switch(e){case Ml:return a*t;case bl:return a*t;case Sl:return a*t*2;case br:return a*t/n.components*n.byteLength;case Sr:return a*t/n.components*n.byteLength;case El:return a*t*2/n.components*n.byteLength;case Er:return a*t*2/n.components*n.byteLength;case wl:return a*t*3/n.components*n.byteLength;case Si:return a*t*4/n.components*n.byteLength;case Tr:return a*t*4/n.components*n.byteLength;case ma:case ga:return Math.floor((a+3)/4)*Math.floor((t+3)/4)*8;case va:case _a:return Math.floor((a+3)/4)*Math.floor((t+3)/4)*16;case Go:case Wo:return Math.max(a,16)*Math.max(t,8)/4;case Ho:case Vo:return Math.max(a,8)*Math.max(t,8)/2;case qo:case jo:return Math.floor((a+3)/4)*Math.floor((t+3)/4)*8;case Xo:return Math.floor((a+3)/4)*Math.floor((t+3)/4)*16;case $o:return Math.floor((a+3)/4)*Math.floor((t+3)/4)*16;case Ko:return Math.floor((a+4)/5)*Math.floor((t+3)/4)*16;case Yo:return Math.floor((a+4)/5)*Math.floor((t+4)/5)*16;case Zo:return Math.floor((a+5)/6)*Math.floor((t+4)/5)*16;case Jo:return Math.floor((a+5)/6)*Math.floor((t+5)/6)*16;case Qo:return Math.floor((a+7)/8)*Math.floor((t+4)/5)*16;case tr:return Math.floor((a+7)/8)*Math.floor((t+5)/6)*16;case er:return Math.floor((a+7)/8)*Math.floor((t+7)/8)*16;case ir:return Math.floor((a+9)/10)*Math.floor((t+4)/5)*16;case nr:return Math.floor((a+9)/10)*Math.floor((t+5)/6)*16;case sr:return Math.floor((a+9)/10)*Math.floor((t+7)/8)*16;case ar:return Math.floor((a+9)/10)*Math.floor((t+9)/10)*16;case or:return Math.floor((a+11)/12)*Math.floor((t+9)/10)*16;case rr:return Math.floor((a+11)/12)*Math.floor((t+11)/12)*16;case xa:case cr:case lr:return Math.ceil(a/4)*Math.ceil(t/4)*16;case Tl:case hr:return Math.ceil(a/4)*Math.ceil(t/4)*8;case dr:case ur:return Math.ceil(a/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function $m(a){switch(a){case ji:case _l:return{byteLength:1,components:1};case ks:case xl:case Ls:return{byteLength:2,components:1};case Mr:case wr:return{byteLength:2,components:4};case Rn:case yr:case Ri:return{byteLength:4,components:1};case yl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${a}.`)}function Km(a,t,e,i,n,s,o){const r=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new jt,h=new WeakMap;let d;const u=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(C,b){return f?new OffscreenCanvas(C,b):Ca("canvas")}function v(C,b,H){let J=1;const it=Ut(C);if((it.width>H||it.height>H)&&(J=H/Math.max(it.width,it.height)),J<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const Z=Math.floor(J*it.width),Tt=Math.floor(J*it.height);d===void 0&&(d=g(Z,Tt));const ht=b?g(Z,Tt):d;return ht.width=Z,ht.height=Tt,ht.getContext("2d").drawImage(C,0,0,Z,Tt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+it.width+"x"+it.height+") to ("+Z+"x"+Tt+")."),ht}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+it.width+"x"+it.height+")."),C;return C}function p(C){return C.generateMipmaps&&C.minFilter!==Je&&C.minFilter!==li}function m(C){a.generateMipmap(C)}function y(C,b,H,J,it=!1){if(C!==null){if(a[C]!==void 0)return a[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let Z=b;if(b===a.RED&&(H===a.FLOAT&&(Z=a.R32F),H===a.HALF_FLOAT&&(Z=a.R16F),H===a.UNSIGNED_BYTE&&(Z=a.R8)),b===a.RED_INTEGER&&(H===a.UNSIGNED_BYTE&&(Z=a.R8UI),H===a.UNSIGNED_SHORT&&(Z=a.R16UI),H===a.UNSIGNED_INT&&(Z=a.R32UI),H===a.BYTE&&(Z=a.R8I),H===a.SHORT&&(Z=a.R16I),H===a.INT&&(Z=a.R32I)),b===a.RG&&(H===a.FLOAT&&(Z=a.RG32F),H===a.HALF_FLOAT&&(Z=a.RG16F),H===a.UNSIGNED_BYTE&&(Z=a.RG8)),b===a.RG_INTEGER&&(H===a.UNSIGNED_BYTE&&(Z=a.RG8UI),H===a.UNSIGNED_SHORT&&(Z=a.RG16UI),H===a.UNSIGNED_INT&&(Z=a.RG32UI),H===a.BYTE&&(Z=a.RG8I),H===a.SHORT&&(Z=a.RG16I),H===a.INT&&(Z=a.RG32I)),b===a.RGB_INTEGER&&(H===a.UNSIGNED_BYTE&&(Z=a.RGB8UI),H===a.UNSIGNED_SHORT&&(Z=a.RGB16UI),H===a.UNSIGNED_INT&&(Z=a.RGB32UI),H===a.BYTE&&(Z=a.RGB8I),H===a.SHORT&&(Z=a.RGB16I),H===a.INT&&(Z=a.RGB32I)),b===a.RGBA_INTEGER&&(H===a.UNSIGNED_BYTE&&(Z=a.RGBA8UI),H===a.UNSIGNED_SHORT&&(Z=a.RGBA16UI),H===a.UNSIGNED_INT&&(Z=a.RGBA32UI),H===a.BYTE&&(Z=a.RGBA8I),H===a.SHORT&&(Z=a.RGBA16I),H===a.INT&&(Z=a.RGBA32I)),b===a.RGB&&H===a.UNSIGNED_INT_5_9_9_9_REV&&(Z=a.RGB9_E5),b===a.RGBA){const Tt=it?Sa:oe.getTransfer(J);H===a.FLOAT&&(Z=a.RGBA32F),H===a.HALF_FLOAT&&(Z=a.RGBA16F),H===a.UNSIGNED_BYTE&&(Z=Tt===ye?a.SRGB8_ALPHA8:a.RGBA8),H===a.UNSIGNED_SHORT_4_4_4_4&&(Z=a.RGBA4),H===a.UNSIGNED_SHORT_5_5_5_1&&(Z=a.RGB5_A1)}return(Z===a.R16F||Z===a.R32F||Z===a.RG16F||Z===a.RG32F||Z===a.RGBA16F||Z===a.RGBA32F)&&t.get("EXT_color_buffer_float"),Z}function x(C,b){let H;return C?b===null||b===Rn||b===as?H=a.DEPTH24_STENCIL8:b===Ri?H=a.DEPTH32F_STENCIL8:b===ks&&(H=a.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===Rn||b===as?H=a.DEPTH_COMPONENT24:b===Ri?H=a.DEPTH_COMPONENT32F:b===ks&&(H=a.DEPTH_COMPONENT16),H}function w(C,b){return p(C)===!0||C.isFramebufferTexture&&C.minFilter!==Je&&C.minFilter!==li?Math.log2(Math.max(b.width,b.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?b.mipmaps.length:1}function R(C){const b=C.target;b.removeEventListener("dispose",R),T(b),b.isVideoTexture&&h.delete(b)}function E(C){const b=C.target;b.removeEventListener("dispose",E),I(b)}function T(C){const b=i.get(C);if(b.__webglInit===void 0)return;const H=C.source,J=u.get(H);if(J){const it=J[b.__cacheKey];it.usedTimes--,it.usedTimes===0&&A(C),Object.keys(J).length===0&&u.delete(H)}i.remove(C)}function A(C){const b=i.get(C);a.deleteTexture(b.__webglTexture);const H=C.source,J=u.get(H);delete J[b.__cacheKey],o.memory.textures--}function I(C){const b=i.get(C);if(C.depthTexture&&C.depthTexture.dispose(),C.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(b.__webglFramebuffer[J]))for(let it=0;it<b.__webglFramebuffer[J].length;it++)a.deleteFramebuffer(b.__webglFramebuffer[J][it]);else a.deleteFramebuffer(b.__webglFramebuffer[J]);b.__webglDepthbuffer&&a.deleteRenderbuffer(b.__webglDepthbuffer[J])}else{if(Array.isArray(b.__webglFramebuffer))for(let J=0;J<b.__webglFramebuffer.length;J++)a.deleteFramebuffer(b.__webglFramebuffer[J]);else a.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&a.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&a.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let J=0;J<b.__webglColorRenderbuffer.length;J++)b.__webglColorRenderbuffer[J]&&a.deleteRenderbuffer(b.__webglColorRenderbuffer[J]);b.__webglDepthRenderbuffer&&a.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const H=C.textures;for(let J=0,it=H.length;J<it;J++){const Z=i.get(H[J]);Z.__webglTexture&&(a.deleteTexture(Z.__webglTexture),o.memory.textures--),i.remove(H[J])}i.remove(C)}let _=0;function M(){_=0}function P(){const C=_;return C>=n.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+n.maxTextures),_+=1,C}function O(C){const b=[];return b.push(C.wrapS),b.push(C.wrapT),b.push(C.wrapR||0),b.push(C.magFilter),b.push(C.minFilter),b.push(C.anisotropy),b.push(C.internalFormat),b.push(C.format),b.push(C.type),b.push(C.generateMipmaps),b.push(C.premultiplyAlpha),b.push(C.flipY),b.push(C.unpackAlignment),b.push(C.colorSpace),b.join()}function B(C,b){const H=i.get(C);if(C.isVideoTexture&&It(C),C.isRenderTargetTexture===!1&&C.version>0&&H.__version!==C.version){const J=C.image;if(J===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{he(H,C,b);return}}e.bindTexture(a.TEXTURE_2D,H.__webglTexture,a.TEXTURE0+b)}function q(C,b){const H=i.get(C);if(C.version>0&&H.__version!==C.version){he(H,C,b);return}e.bindTexture(a.TEXTURE_2D_ARRAY,H.__webglTexture,a.TEXTURE0+b)}function G(C,b){const H=i.get(C);if(C.version>0&&H.__version!==C.version){he(H,C,b);return}e.bindTexture(a.TEXTURE_3D,H.__webglTexture,a.TEXTURE0+b)}function K(C,b){const H=i.get(C);if(C.version>0&&H.__version!==C.version){Y(H,C,b);return}e.bindTexture(a.TEXTURE_CUBE_MAP,H.__webglTexture,a.TEXTURE0+b)}const X={[Ps]:a.REPEAT,[An]:a.CLAMP_TO_EDGE,[Bo]:a.MIRRORED_REPEAT},ct={[Je]:a.NEAREST,[Lh]:a.NEAREST_MIPMAP_NEAREST,[Hs]:a.NEAREST_MIPMAP_LINEAR,[li]:a.LINEAR,[Ha]:a.LINEAR_MIPMAP_NEAREST,[Cn]:a.LINEAR_MIPMAP_LINEAR},dt={[Fh]:a.NEVER,[Wh]:a.ALWAYS,[Oh]:a.LESS,[Al]:a.LEQUAL,[Bh]:a.EQUAL,[Vh]:a.GEQUAL,[Hh]:a.GREATER,[Gh]:a.NOTEQUAL};function Mt(C,b){if(b.type===Ri&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===li||b.magFilter===Ha||b.magFilter===Hs||b.magFilter===Cn||b.minFilter===li||b.minFilter===Ha||b.minFilter===Hs||b.minFilter===Cn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),a.texParameteri(C,a.TEXTURE_WRAP_S,X[b.wrapS]),a.texParameteri(C,a.TEXTURE_WRAP_T,X[b.wrapT]),(C===a.TEXTURE_3D||C===a.TEXTURE_2D_ARRAY)&&a.texParameteri(C,a.TEXTURE_WRAP_R,X[b.wrapR]),a.texParameteri(C,a.TEXTURE_MAG_FILTER,ct[b.magFilter]),a.texParameteri(C,a.TEXTURE_MIN_FILTER,ct[b.minFilter]),b.compareFunction&&(a.texParameteri(C,a.TEXTURE_COMPARE_MODE,a.COMPARE_REF_TO_TEXTURE),a.texParameteri(C,a.TEXTURE_COMPARE_FUNC,dt[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===Je||b.minFilter!==Hs&&b.minFilter!==Cn||b.type===Ri&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||i.get(b).__currentAnisotropy){const H=t.get("EXT_texture_filter_anisotropic");a.texParameterf(C,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,n.getMaxAnisotropy())),i.get(b).__currentAnisotropy=b.anisotropy}}}function ie(C,b){let H=!1;C.__webglInit===void 0&&(C.__webglInit=!0,b.addEventListener("dispose",R));const J=b.source;let it=u.get(J);it===void 0&&(it={},u.set(J,it));const Z=O(b);if(Z!==C.__cacheKey){it[Z]===void 0&&(it[Z]={texture:a.createTexture(),usedTimes:0},o.memory.textures++,H=!0),it[Z].usedTimes++;const Tt=it[C.__cacheKey];Tt!==void 0&&(it[C.__cacheKey].usedTimes--,Tt.usedTimes===0&&A(b)),C.__cacheKey=Z,C.__webglTexture=it[Z].texture}return H}function he(C,b,H){let J=a.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(J=a.TEXTURE_2D_ARRAY),b.isData3DTexture&&(J=a.TEXTURE_3D);const it=ie(C,b),Z=b.source;e.bindTexture(J,C.__webglTexture,a.TEXTURE0+H);const Tt=i.get(Z);if(Z.version!==Tt.__version||it===!0){e.activeTexture(a.TEXTURE0+H);const ht=oe.getPrimaries(oe.workingColorSpace),_t=b.colorSpace===rn?null:oe.getPrimaries(b.colorSpace),ee=b.colorSpace===rn||ht===_t?a.NONE:a.BROWSER_DEFAULT_WEBGL;a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,b.flipY),a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),a.pixelStorei(a.UNPACK_ALIGNMENT,b.unpackAlignment),a.pixelStorei(a.UNPACK_COLORSPACE_CONVERSION_WEBGL,ee);let at=v(b.image,!1,n.maxTextureSize);at=_e(b,at);const xt=s.convert(b.format,b.colorSpace),Lt=s.convert(b.type);let Dt=y(b.internalFormat,xt,Lt,b.colorSpace,b.isVideoTexture);Mt(J,b);let yt;const Kt=b.mipmaps,Ot=b.isVideoTexture!==!0,ge=Tt.__version===void 0||it===!0,D=Z.dataReady,pt=w(b,at);if(b.isDepthTexture)Dt=x(b.format===os,b.type),ge&&(Ot?e.texStorage2D(a.TEXTURE_2D,1,Dt,at.width,at.height):e.texImage2D(a.TEXTURE_2D,0,Dt,at.width,at.height,0,xt,Lt,null));else if(b.isDataTexture)if(Kt.length>0){Ot&&ge&&e.texStorage2D(a.TEXTURE_2D,pt,Dt,Kt[0].width,Kt[0].height);for(let $=0,Q=Kt.length;$<Q;$++)yt=Kt[$],Ot?D&&e.texSubImage2D(a.TEXTURE_2D,$,0,0,yt.width,yt.height,xt,Lt,yt.data):e.texImage2D(a.TEXTURE_2D,$,Dt,yt.width,yt.height,0,xt,Lt,yt.data);b.generateMipmaps=!1}else Ot?(ge&&e.texStorage2D(a.TEXTURE_2D,pt,Dt,at.width,at.height),D&&e.texSubImage2D(a.TEXTURE_2D,0,0,0,at.width,at.height,xt,Lt,at.data)):e.texImage2D(a.TEXTURE_2D,0,Dt,at.width,at.height,0,xt,Lt,at.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Ot&&ge&&e.texStorage3D(a.TEXTURE_2D_ARRAY,pt,Dt,Kt[0].width,Kt[0].height,at.depth);for(let $=0,Q=Kt.length;$<Q;$++)if(yt=Kt[$],b.format!==Si)if(xt!==null)if(Ot){if(D)if(b.layerUpdates.size>0){const ut=Nc(yt.width,yt.height,b.format,b.type);for(const mt of b.layerUpdates){const Jt=yt.data.subarray(mt*ut/yt.data.BYTES_PER_ELEMENT,(mt+1)*ut/yt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(a.TEXTURE_2D_ARRAY,$,0,0,mt,yt.width,yt.height,1,xt,Jt,0,0)}b.clearLayerUpdates()}else e.compressedTexSubImage3D(a.TEXTURE_2D_ARRAY,$,0,0,0,yt.width,yt.height,at.depth,xt,yt.data,0,0)}else e.compressedTexImage3D(a.TEXTURE_2D_ARRAY,$,Dt,yt.width,yt.height,at.depth,0,yt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ot?D&&e.texSubImage3D(a.TEXTURE_2D_ARRAY,$,0,0,0,yt.width,yt.height,at.depth,xt,Lt,yt.data):e.texImage3D(a.TEXTURE_2D_ARRAY,$,Dt,yt.width,yt.height,at.depth,0,xt,Lt,yt.data)}else{Ot&&ge&&e.texStorage2D(a.TEXTURE_2D,pt,Dt,Kt[0].width,Kt[0].height);for(let $=0,Q=Kt.length;$<Q;$++)yt=Kt[$],b.format!==Si?xt!==null?Ot?D&&e.compressedTexSubImage2D(a.TEXTURE_2D,$,0,0,yt.width,yt.height,xt,yt.data):e.compressedTexImage2D(a.TEXTURE_2D,$,Dt,yt.width,yt.height,0,yt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ot?D&&e.texSubImage2D(a.TEXTURE_2D,$,0,0,yt.width,yt.height,xt,Lt,yt.data):e.texImage2D(a.TEXTURE_2D,$,Dt,yt.width,yt.height,0,xt,Lt,yt.data)}else if(b.isDataArrayTexture)if(Ot){if(ge&&e.texStorage3D(a.TEXTURE_2D_ARRAY,pt,Dt,at.width,at.height,at.depth),D)if(b.layerUpdates.size>0){const $=Nc(at.width,at.height,b.format,b.type);for(const Q of b.layerUpdates){const ut=at.data.subarray(Q*$/at.data.BYTES_PER_ELEMENT,(Q+1)*$/at.data.BYTES_PER_ELEMENT);e.texSubImage3D(a.TEXTURE_2D_ARRAY,0,0,0,Q,at.width,at.height,1,xt,Lt,ut)}b.clearLayerUpdates()}else e.texSubImage3D(a.TEXTURE_2D_ARRAY,0,0,0,0,at.width,at.height,at.depth,xt,Lt,at.data)}else e.texImage3D(a.TEXTURE_2D_ARRAY,0,Dt,at.width,at.height,at.depth,0,xt,Lt,at.data);else if(b.isData3DTexture)Ot?(ge&&e.texStorage3D(a.TEXTURE_3D,pt,Dt,at.width,at.height,at.depth),D&&e.texSubImage3D(a.TEXTURE_3D,0,0,0,0,at.width,at.height,at.depth,xt,Lt,at.data)):e.texImage3D(a.TEXTURE_3D,0,Dt,at.width,at.height,at.depth,0,xt,Lt,at.data);else if(b.isFramebufferTexture){if(ge)if(Ot)e.texStorage2D(a.TEXTURE_2D,pt,Dt,at.width,at.height);else{let $=at.width,Q=at.height;for(let ut=0;ut<pt;ut++)e.texImage2D(a.TEXTURE_2D,ut,Dt,$,Q,0,xt,Lt,null),$>>=1,Q>>=1}}else if(Kt.length>0){if(Ot&&ge){const $=Ut(Kt[0]);e.texStorage2D(a.TEXTURE_2D,pt,Dt,$.width,$.height)}for(let $=0,Q=Kt.length;$<Q;$++)yt=Kt[$],Ot?D&&e.texSubImage2D(a.TEXTURE_2D,$,0,0,xt,Lt,yt):e.texImage2D(a.TEXTURE_2D,$,Dt,xt,Lt,yt);b.generateMipmaps=!1}else if(Ot){if(ge){const $=Ut(at);e.texStorage2D(a.TEXTURE_2D,pt,Dt,$.width,$.height)}D&&e.texSubImage2D(a.TEXTURE_2D,0,0,0,xt,Lt,at)}else e.texImage2D(a.TEXTURE_2D,0,Dt,xt,Lt,at);p(b)&&m(J),Tt.__version=Z.version,b.onUpdate&&b.onUpdate(b)}C.__version=b.version}function Y(C,b,H){if(b.image.length!==6)return;const J=ie(C,b),it=b.source;e.bindTexture(a.TEXTURE_CUBE_MAP,C.__webglTexture,a.TEXTURE0+H);const Z=i.get(it);if(it.version!==Z.__version||J===!0){e.activeTexture(a.TEXTURE0+H);const Tt=oe.getPrimaries(oe.workingColorSpace),ht=b.colorSpace===rn?null:oe.getPrimaries(b.colorSpace),_t=b.colorSpace===rn||Tt===ht?a.NONE:a.BROWSER_DEFAULT_WEBGL;a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,b.flipY),a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),a.pixelStorei(a.UNPACK_ALIGNMENT,b.unpackAlignment),a.pixelStorei(a.UNPACK_COLORSPACE_CONVERSION_WEBGL,_t);const ee=b.isCompressedTexture||b.image[0].isCompressedTexture,at=b.image[0]&&b.image[0].isDataTexture,xt=[];for(let Q=0;Q<6;Q++)!ee&&!at?xt[Q]=v(b.image[Q],!0,n.maxCubemapSize):xt[Q]=at?b.image[Q].image:b.image[Q],xt[Q]=_e(b,xt[Q]);const Lt=xt[0],Dt=s.convert(b.format,b.colorSpace),yt=s.convert(b.type),Kt=y(b.internalFormat,Dt,yt,b.colorSpace),Ot=b.isVideoTexture!==!0,ge=Z.__version===void 0||J===!0,D=it.dataReady;let pt=w(b,Lt);Mt(a.TEXTURE_CUBE_MAP,b);let $;if(ee){Ot&&ge&&e.texStorage2D(a.TEXTURE_CUBE_MAP,pt,Kt,Lt.width,Lt.height);for(let Q=0;Q<6;Q++){$=xt[Q].mipmaps;for(let ut=0;ut<$.length;ut++){const mt=$[ut];b.format!==Si?Dt!==null?Ot?D&&e.compressedTexSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ut,0,0,mt.width,mt.height,Dt,mt.data):e.compressedTexImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ut,Kt,mt.width,mt.height,0,mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ot?D&&e.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ut,0,0,mt.width,mt.height,Dt,yt,mt.data):e.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ut,Kt,mt.width,mt.height,0,Dt,yt,mt.data)}}}else{if($=b.mipmaps,Ot&&ge){$.length>0&&pt++;const Q=Ut(xt[0]);e.texStorage2D(a.TEXTURE_CUBE_MAP,pt,Kt,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(at){Ot?D&&e.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,xt[Q].width,xt[Q].height,Dt,yt,xt[Q].data):e.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Kt,xt[Q].width,xt[Q].height,0,Dt,yt,xt[Q].data);for(let ut=0;ut<$.length;ut++){const Jt=$[ut].image[Q].image;Ot?D&&e.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ut+1,0,0,Jt.width,Jt.height,Dt,yt,Jt.data):e.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ut+1,Kt,Jt.width,Jt.height,0,Dt,yt,Jt.data)}}else{Ot?D&&e.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Dt,yt,xt[Q]):e.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Kt,Dt,yt,xt[Q]);for(let ut=0;ut<$.length;ut++){const mt=$[ut];Ot?D&&e.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ut+1,0,0,Dt,yt,mt.image[Q]):e.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ut+1,Kt,Dt,yt,mt.image[Q])}}}p(b)&&m(a.TEXTURE_CUBE_MAP),Z.__version=it.version,b.onUpdate&&b.onUpdate(b)}C.__version=b.version}function st(C,b,H,J,it,Z){const Tt=s.convert(H.format,H.colorSpace),ht=s.convert(H.type),_t=y(H.internalFormat,Tt,ht,H.colorSpace);if(!i.get(b).__hasExternalTextures){const at=Math.max(1,b.width>>Z),xt=Math.max(1,b.height>>Z);it===a.TEXTURE_3D||it===a.TEXTURE_2D_ARRAY?e.texImage3D(it,Z,_t,at,xt,b.depth,0,Tt,ht,null):e.texImage2D(it,Z,_t,at,xt,0,Tt,ht,null)}e.bindFramebuffer(a.FRAMEBUFFER,C),te(b)?r.framebufferTexture2DMultisampleEXT(a.FRAMEBUFFER,J,it,i.get(H).__webglTexture,0,$t(b)):(it===a.TEXTURE_2D||it>=a.TEXTURE_CUBE_MAP_POSITIVE_X&&it<=a.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&a.framebufferTexture2D(a.FRAMEBUFFER,J,it,i.get(H).__webglTexture,Z),e.bindFramebuffer(a.FRAMEBUFFER,null)}function bt(C,b,H){if(a.bindRenderbuffer(a.RENDERBUFFER,C),b.depthBuffer){const J=b.depthTexture,it=J&&J.isDepthTexture?J.type:null,Z=x(b.stencilBuffer,it),Tt=b.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT,ht=$t(b);te(b)?r.renderbufferStorageMultisampleEXT(a.RENDERBUFFER,ht,Z,b.width,b.height):H?a.renderbufferStorageMultisample(a.RENDERBUFFER,ht,Z,b.width,b.height):a.renderbufferStorage(a.RENDERBUFFER,Z,b.width,b.height),a.framebufferRenderbuffer(a.FRAMEBUFFER,Tt,a.RENDERBUFFER,C)}else{const J=b.textures;for(let it=0;it<J.length;it++){const Z=J[it],Tt=s.convert(Z.format,Z.colorSpace),ht=s.convert(Z.type),_t=y(Z.internalFormat,Tt,ht,Z.colorSpace),ee=$t(b);H&&te(b)===!1?a.renderbufferStorageMultisample(a.RENDERBUFFER,ee,_t,b.width,b.height):te(b)?r.renderbufferStorageMultisampleEXT(a.RENDERBUFFER,ee,_t,b.width,b.height):a.renderbufferStorage(a.RENDERBUFFER,_t,b.width,b.height)}}a.bindRenderbuffer(a.RENDERBUFFER,null)}function vt(C,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(a.FRAMEBUFFER,C),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(b.depthTexture).__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),B(b.depthTexture,0);const J=i.get(b.depthTexture).__webglTexture,it=$t(b);if(b.depthTexture.format===ts)te(b)?r.framebufferTexture2DMultisampleEXT(a.FRAMEBUFFER,a.DEPTH_ATTACHMENT,a.TEXTURE_2D,J,0,it):a.framebufferTexture2D(a.FRAMEBUFFER,a.DEPTH_ATTACHMENT,a.TEXTURE_2D,J,0);else if(b.depthTexture.format===os)te(b)?r.framebufferTexture2DMultisampleEXT(a.FRAMEBUFFER,a.DEPTH_STENCIL_ATTACHMENT,a.TEXTURE_2D,J,0,it):a.framebufferTexture2D(a.FRAMEBUFFER,a.DEPTH_STENCIL_ATTACHMENT,a.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function Ft(C){const b=i.get(C),H=C.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==C.depthTexture){const J=C.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),J){const it=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,J.removeEventListener("dispose",it)};J.addEventListener("dispose",it),b.__depthDisposeCallback=it}b.__boundDepthTexture=J}if(C.depthTexture&&!b.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");vt(b.__webglFramebuffer,C)}else if(H){b.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(e.bindFramebuffer(a.FRAMEBUFFER,b.__webglFramebuffer[J]),b.__webglDepthbuffer[J]===void 0)b.__webglDepthbuffer[J]=a.createRenderbuffer(),bt(b.__webglDepthbuffer[J],C,!1);else{const it=C.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT,Z=b.__webglDepthbuffer[J];a.bindRenderbuffer(a.RENDERBUFFER,Z),a.framebufferRenderbuffer(a.FRAMEBUFFER,it,a.RENDERBUFFER,Z)}}else if(e.bindFramebuffer(a.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=a.createRenderbuffer(),bt(b.__webglDepthbuffer,C,!1);else{const J=C.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT,it=b.__webglDepthbuffer;a.bindRenderbuffer(a.RENDERBUFFER,it),a.framebufferRenderbuffer(a.FRAMEBUFFER,J,a.RENDERBUFFER,it)}e.bindFramebuffer(a.FRAMEBUFFER,null)}function Pt(C,b,H){const J=i.get(C);b!==void 0&&st(J.__webglFramebuffer,C,C.texture,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,0),H!==void 0&&Ft(C)}function Yt(C){const b=C.texture,H=i.get(C),J=i.get(b);C.addEventListener("dispose",E);const it=C.textures,Z=C.isWebGLCubeRenderTarget===!0,Tt=it.length>1;if(Tt||(J.__webglTexture===void 0&&(J.__webglTexture=a.createTexture()),J.__version=b.version,o.memory.textures++),Z){H.__webglFramebuffer=[];for(let ht=0;ht<6;ht++)if(b.mipmaps&&b.mipmaps.length>0){H.__webglFramebuffer[ht]=[];for(let _t=0;_t<b.mipmaps.length;_t++)H.__webglFramebuffer[ht][_t]=a.createFramebuffer()}else H.__webglFramebuffer[ht]=a.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){H.__webglFramebuffer=[];for(let ht=0;ht<b.mipmaps.length;ht++)H.__webglFramebuffer[ht]=a.createFramebuffer()}else H.__webglFramebuffer=a.createFramebuffer();if(Tt)for(let ht=0,_t=it.length;ht<_t;ht++){const ee=i.get(it[ht]);ee.__webglTexture===void 0&&(ee.__webglTexture=a.createTexture(),o.memory.textures++)}if(C.samples>0&&te(C)===!1){H.__webglMultisampledFramebuffer=a.createFramebuffer(),H.__webglColorRenderbuffer=[],e.bindFramebuffer(a.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let ht=0;ht<it.length;ht++){const _t=it[ht];H.__webglColorRenderbuffer[ht]=a.createRenderbuffer(),a.bindRenderbuffer(a.RENDERBUFFER,H.__webglColorRenderbuffer[ht]);const ee=s.convert(_t.format,_t.colorSpace),at=s.convert(_t.type),xt=y(_t.internalFormat,ee,at,_t.colorSpace,C.isXRRenderTarget===!0),Lt=$t(C);a.renderbufferStorageMultisample(a.RENDERBUFFER,Lt,xt,C.width,C.height),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0+ht,a.RENDERBUFFER,H.__webglColorRenderbuffer[ht])}a.bindRenderbuffer(a.RENDERBUFFER,null),C.depthBuffer&&(H.__webglDepthRenderbuffer=a.createRenderbuffer(),bt(H.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(a.FRAMEBUFFER,null)}}if(Z){e.bindTexture(a.TEXTURE_CUBE_MAP,J.__webglTexture),Mt(a.TEXTURE_CUBE_MAP,b);for(let ht=0;ht<6;ht++)if(b.mipmaps&&b.mipmaps.length>0)for(let _t=0;_t<b.mipmaps.length;_t++)st(H.__webglFramebuffer[ht][_t],C,b,a.COLOR_ATTACHMENT0,a.TEXTURE_CUBE_MAP_POSITIVE_X+ht,_t);else st(H.__webglFramebuffer[ht],C,b,a.COLOR_ATTACHMENT0,a.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0);p(b)&&m(a.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Tt){for(let ht=0,_t=it.length;ht<_t;ht++){const ee=it[ht],at=i.get(ee);e.bindTexture(a.TEXTURE_2D,at.__webglTexture),Mt(a.TEXTURE_2D,ee),st(H.__webglFramebuffer,C,ee,a.COLOR_ATTACHMENT0+ht,a.TEXTURE_2D,0),p(ee)&&m(a.TEXTURE_2D)}e.unbindTexture()}else{let ht=a.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ht=C.isWebGL3DRenderTarget?a.TEXTURE_3D:a.TEXTURE_2D_ARRAY),e.bindTexture(ht,J.__webglTexture),Mt(ht,b),b.mipmaps&&b.mipmaps.length>0)for(let _t=0;_t<b.mipmaps.length;_t++)st(H.__webglFramebuffer[_t],C,b,a.COLOR_ATTACHMENT0,ht,_t);else st(H.__webglFramebuffer,C,b,a.COLOR_ATTACHMENT0,ht,0);p(b)&&m(ht),e.unbindTexture()}C.depthBuffer&&Ft(C)}function ue(C){const b=C.textures;for(let H=0,J=b.length;H<J;H++){const it=b[H];if(p(it)){const Z=C.isWebGLCubeRenderTarget?a.TEXTURE_CUBE_MAP:a.TEXTURE_2D,Tt=i.get(it).__webglTexture;e.bindTexture(Z,Tt),m(Z),e.unbindTexture()}}}const Zt=[],k=[];function ti(C){if(C.samples>0){if(te(C)===!1){const b=C.textures,H=C.width,J=C.height;let it=a.COLOR_BUFFER_BIT;const Z=C.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT,Tt=i.get(C),ht=b.length>1;if(ht)for(let _t=0;_t<b.length;_t++)e.bindFramebuffer(a.FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0+_t,a.RENDERBUFFER,null),e.bindFramebuffer(a.FRAMEBUFFER,Tt.__webglFramebuffer),a.framebufferTexture2D(a.DRAW_FRAMEBUFFER,a.COLOR_ATTACHMENT0+_t,a.TEXTURE_2D,null,0);e.bindFramebuffer(a.READ_FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),e.bindFramebuffer(a.DRAW_FRAMEBUFFER,Tt.__webglFramebuffer);for(let _t=0;_t<b.length;_t++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(it|=a.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(it|=a.STENCIL_BUFFER_BIT)),ht){a.framebufferRenderbuffer(a.READ_FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.RENDERBUFFER,Tt.__webglColorRenderbuffer[_t]);const ee=i.get(b[_t]).__webglTexture;a.framebufferTexture2D(a.DRAW_FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,ee,0)}a.blitFramebuffer(0,0,H,J,0,0,H,J,it,a.NEAREST),c===!0&&(Zt.length=0,k.length=0,Zt.push(a.COLOR_ATTACHMENT0+_t),C.depthBuffer&&C.resolveDepthBuffer===!1&&(Zt.push(Z),k.push(Z),a.invalidateFramebuffer(a.DRAW_FRAMEBUFFER,k)),a.invalidateFramebuffer(a.READ_FRAMEBUFFER,Zt))}if(e.bindFramebuffer(a.READ_FRAMEBUFFER,null),e.bindFramebuffer(a.DRAW_FRAMEBUFFER,null),ht)for(let _t=0;_t<b.length;_t++){e.bindFramebuffer(a.FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0+_t,a.RENDERBUFFER,Tt.__webglColorRenderbuffer[_t]);const ee=i.get(b[_t]).__webglTexture;e.bindFramebuffer(a.FRAMEBUFFER,Tt.__webglFramebuffer),a.framebufferTexture2D(a.DRAW_FRAMEBUFFER,a.COLOR_ATTACHMENT0+_t,a.TEXTURE_2D,ee,0)}e.bindFramebuffer(a.DRAW_FRAMEBUFFER,Tt.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&c){const b=C.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT;a.invalidateFramebuffer(a.DRAW_FRAMEBUFFER,[b])}}}function $t(C){return Math.min(n.maxSamples,C.samples)}function te(C){const b=i.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function It(C){const b=o.render.frame;h.get(C)!==b&&(h.set(C,b),C.update())}function _e(C,b){const H=C.colorSpace,J=C.format,it=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||H!==un&&H!==rn&&(oe.getTransfer(H)===ye?(J!==Si||it!==ji)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),b}function Ut(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=P,this.resetTextureUnits=M,this.setTexture2D=B,this.setTexture2DArray=q,this.setTexture3D=G,this.setTextureCube=K,this.rebindTextures=Pt,this.setupRenderTarget=Yt,this.updateRenderTargetMipmap=ue,this.updateMultisampleRenderTarget=ti,this.setupDepthRenderbuffer=Ft,this.setupFrameBufferTexture=st,this.useMultisampledRTT=te}function Ym(a,t){function e(i,n=rn){let s;const o=oe.getTransfer(n);if(i===ji)return a.UNSIGNED_BYTE;if(i===Mr)return a.UNSIGNED_SHORT_4_4_4_4;if(i===wr)return a.UNSIGNED_SHORT_5_5_5_1;if(i===yl)return a.UNSIGNED_INT_5_9_9_9_REV;if(i===_l)return a.BYTE;if(i===xl)return a.SHORT;if(i===ks)return a.UNSIGNED_SHORT;if(i===yr)return a.INT;if(i===Rn)return a.UNSIGNED_INT;if(i===Ri)return a.FLOAT;if(i===Ls)return a.HALF_FLOAT;if(i===Ml)return a.ALPHA;if(i===wl)return a.RGB;if(i===Si)return a.RGBA;if(i===bl)return a.LUMINANCE;if(i===Sl)return a.LUMINANCE_ALPHA;if(i===ts)return a.DEPTH_COMPONENT;if(i===os)return a.DEPTH_STENCIL;if(i===br)return a.RED;if(i===Sr)return a.RED_INTEGER;if(i===El)return a.RG;if(i===Er)return a.RG_INTEGER;if(i===Tr)return a.RGBA_INTEGER;if(i===ma||i===ga||i===va||i===_a)if(o===ye)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===ma)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ga)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===va)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===_a)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===ma)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ga)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===va)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===_a)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ho||i===Go||i===Vo||i===Wo)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Ho)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Go)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Vo)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Wo)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===qo||i===jo||i===Xo)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(i===qo||i===jo)return o===ye?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Xo)return o===ye?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===$o||i===Ko||i===Yo||i===Zo||i===Jo||i===Qo||i===tr||i===er||i===ir||i===nr||i===sr||i===ar||i===or||i===rr)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(i===$o)return o===ye?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ko)return o===ye?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Yo)return o===ye?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Zo)return o===ye?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Jo)return o===ye?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Qo)return o===ye?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===tr)return o===ye?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===er)return o===ye?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===ir)return o===ye?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===nr)return o===ye?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===sr)return o===ye?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ar)return o===ye?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===or)return o===ye?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===rr)return o===ye?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===xa||i===cr||i===lr)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(i===xa)return o===ye?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===cr)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===lr)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Tl||i===hr||i===dr||i===ur)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(i===xa)return s.COMPRESSED_RED_RGTC1_EXT;if(i===hr)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===dr)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===ur)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===as?a.UNSIGNED_INT_24_8:a[i]!==void 0?a[i]:null}return{convert:e}}class Zm extends ci{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class et extends Ie{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Jm={type:"move"};class _o{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new et,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new et,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new et,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new z),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let n=null,s=null,o=null;const r=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const v of t.hand.values()){const p=e.getJointPose(v,i),m=this._getHandJoint(l,v);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;l.inputState.pinching&&u>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&u<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));r!==null&&(n=e.getPose(t.targetRaySpace,i),n===null&&s!==null&&(n=s),n!==null&&(r.matrix.fromArray(n.transform.matrix),r.matrix.decompose(r.position,r.rotation,r.scale),r.matrixWorldNeedsUpdate=!0,n.linearVelocity?(r.hasLinearVelocity=!0,r.linearVelocity.copy(n.linearVelocity)):r.hasLinearVelocity=!1,n.angularVelocity?(r.hasAngularVelocity=!0,r.angularVelocity.copy(n.angularVelocity)):r.hasAngularVelocity=!1,this.dispatchEvent(Jm)))}return r!==null&&(r.visible=n!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new et;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const Qm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,t0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class e0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const n=new Ve,s=t.properties.get(n);s.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new dn({vertexShader:Qm,fragmentShader:t0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new gt(new fn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class i0 extends ls{constructor(t,e){super();const i=this;let n=null,s=1,o=null,r="local-floor",c=1,l=null,h=null,d=null,u=null,f=null,g=null;const v=new e0,p=e.getContextAttributes();let m=null,y=null;const x=[],w=[],R=new jt;let E=null;const T=new ci;T.layers.enable(1),T.viewport=new pe;const A=new ci;A.layers.enable(2),A.viewport=new pe;const I=[T,A],_=new Zm;_.layers.enable(1),_.layers.enable(2);let M=null,P=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let st=x[Y];return st===void 0&&(st=new _o,x[Y]=st),st.getTargetRaySpace()},this.getControllerGrip=function(Y){let st=x[Y];return st===void 0&&(st=new _o,x[Y]=st),st.getGripSpace()},this.getHand=function(Y){let st=x[Y];return st===void 0&&(st=new _o,x[Y]=st),st.getHandSpace()};function O(Y){const st=w.indexOf(Y.inputSource);if(st===-1)return;const bt=x[st];bt!==void 0&&(bt.update(Y.inputSource,Y.frame,l||o),bt.dispatchEvent({type:Y.type,data:Y.inputSource}))}function B(){n.removeEventListener("select",O),n.removeEventListener("selectstart",O),n.removeEventListener("selectend",O),n.removeEventListener("squeeze",O),n.removeEventListener("squeezestart",O),n.removeEventListener("squeezeend",O),n.removeEventListener("end",B),n.removeEventListener("inputsourceschange",q);for(let Y=0;Y<x.length;Y++){const st=w[Y];st!==null&&(w[Y]=null,x[Y].disconnect(st))}M=null,P=null,v.reset(),t.setRenderTarget(m),f=null,u=null,d=null,n=null,y=null,he.stop(),i.isPresenting=!1,t.setPixelRatio(E),t.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){s=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){r=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(Y){l=Y},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return n},this.setSession=async function(Y){if(n=Y,n!==null){if(m=t.getRenderTarget(),n.addEventListener("select",O),n.addEventListener("selectstart",O),n.addEventListener("selectend",O),n.addEventListener("squeeze",O),n.addEventListener("squeezestart",O),n.addEventListener("squeezeend",O),n.addEventListener("end",B),n.addEventListener("inputsourceschange",q),p.xrCompatible!==!0&&await e.makeXRCompatible(),E=t.getPixelRatio(),t.getSize(R),n.renderState.layers===void 0){const st={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(n,e,st),n.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new zn(f.framebufferWidth,f.framebufferHeight,{format:Si,type:ji,colorSpace:t.outputColorSpace,stencilBuffer:p.stencil})}else{let st=null,bt=null,vt=null;p.depth&&(vt=p.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,st=p.stencil?os:ts,bt=p.stencil?as:Rn);const Ft={colorFormat:e.RGBA8,depthFormat:vt,scaleFactor:s};d=new XRWebGLBinding(n,e),u=d.createProjectionLayer(Ft),n.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),y=new zn(u.textureWidth,u.textureHeight,{format:Si,type:ji,depthTexture:new Hl(u.textureWidth,u.textureHeight,bt,void 0,void 0,void 0,void 0,void 0,void 0,st),stencilBuffer:p.stencil,colorSpace:t.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await n.requestReferenceSpace(r),he.setContext(n),he.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function q(Y){for(let st=0;st<Y.removed.length;st++){const bt=Y.removed[st],vt=w.indexOf(bt);vt>=0&&(w[vt]=null,x[vt].disconnect(bt))}for(let st=0;st<Y.added.length;st++){const bt=Y.added[st];let vt=w.indexOf(bt);if(vt===-1){for(let Pt=0;Pt<x.length;Pt++)if(Pt>=w.length){w.push(bt),vt=Pt;break}else if(w[Pt]===null){w[Pt]=bt,vt=Pt;break}if(vt===-1)break}const Ft=x[vt];Ft&&Ft.connect(bt)}}const G=new z,K=new z;function X(Y,st,bt){G.setFromMatrixPosition(st.matrixWorld),K.setFromMatrixPosition(bt.matrixWorld);const vt=G.distanceTo(K),Ft=st.projectionMatrix.elements,Pt=bt.projectionMatrix.elements,Yt=Ft[14]/(Ft[10]-1),ue=Ft[14]/(Ft[10]+1),Zt=(Ft[9]+1)/Ft[5],k=(Ft[9]-1)/Ft[5],ti=(Ft[8]-1)/Ft[0],$t=(Pt[8]+1)/Pt[0],te=Yt*ti,It=Yt*$t,_e=vt/(-ti+$t),Ut=_e*-ti;if(st.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Ut),Y.translateZ(_e),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),Ft[10]===-1)Y.projectionMatrix.copy(st.projectionMatrix),Y.projectionMatrixInverse.copy(st.projectionMatrixInverse);else{const C=Yt+_e,b=ue+_e,H=te-Ut,J=It+(vt-Ut),it=Zt*ue/b*C,Z=k*ue/b*C;Y.projectionMatrix.makePerspective(H,J,it,Z,C,b),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function ct(Y,st){st===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(st.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(n===null)return;let st=Y.near,bt=Y.far;v.texture!==null&&(v.depthNear>0&&(st=v.depthNear),v.depthFar>0&&(bt=v.depthFar)),_.near=A.near=T.near=st,_.far=A.far=T.far=bt,(M!==_.near||P!==_.far)&&(n.updateRenderState({depthNear:_.near,depthFar:_.far}),M=_.near,P=_.far);const vt=Y.parent,Ft=_.cameras;ct(_,vt);for(let Pt=0;Pt<Ft.length;Pt++)ct(Ft[Pt],vt);Ft.length===2?X(_,T,A):_.projectionMatrix.copy(T.projectionMatrix),dt(Y,_,vt)};function dt(Y,st,bt){bt===null?Y.matrix.copy(st.matrixWorld):(Y.matrix.copy(bt.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(st.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(st.projectionMatrix),Y.projectionMatrixInverse.copy(st.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=fr*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return _},this.getFoveation=function(){if(!(u===null&&f===null))return c},this.setFoveation=function(Y){c=Y,u!==null&&(u.fixedFoveation=Y),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Y)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(_)};let Mt=null;function ie(Y,st){if(h=st.getViewerPose(l||o),g=st,h!==null){const bt=h.views;f!==null&&(t.setRenderTargetFramebuffer(y,f.framebuffer),t.setRenderTarget(y));let vt=!1;bt.length!==_.cameras.length&&(_.cameras.length=0,vt=!0);for(let Pt=0;Pt<bt.length;Pt++){const Yt=bt[Pt];let ue=null;if(f!==null)ue=f.getViewport(Yt);else{const k=d.getViewSubImage(u,Yt);ue=k.viewport,Pt===0&&(t.setRenderTargetTextures(y,k.colorTexture,u.ignoreDepthValues?void 0:k.depthStencilTexture),t.setRenderTarget(y))}let Zt=I[Pt];Zt===void 0&&(Zt=new ci,Zt.layers.enable(Pt),Zt.viewport=new pe,I[Pt]=Zt),Zt.matrix.fromArray(Yt.transform.matrix),Zt.matrix.decompose(Zt.position,Zt.quaternion,Zt.scale),Zt.projectionMatrix.fromArray(Yt.projectionMatrix),Zt.projectionMatrixInverse.copy(Zt.projectionMatrix).invert(),Zt.viewport.set(ue.x,ue.y,ue.width,ue.height),Pt===0&&(_.matrix.copy(Zt.matrix),_.matrix.decompose(_.position,_.quaternion,_.scale)),vt===!0&&_.cameras.push(Zt)}const Ft=n.enabledFeatures;if(Ft&&Ft.includes("depth-sensing")){const Pt=d.getDepthInformation(bt[0]);Pt&&Pt.isValid&&Pt.texture&&v.init(t,Pt,n.renderState)}}for(let bt=0;bt<x.length;bt++){const vt=w[bt],Ft=x[bt];vt!==null&&Ft!==void 0&&Ft.update(vt,st,l||o)}Mt&&Mt(Y,st),st.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:st}),g=null}const he=new Ol;he.setAnimationLoop(ie),this.setAnimationLoop=function(Y){Mt=Y},this.dispose=function(){}}}const yn=new Ei,n0=new me;function s0(a,t){function e(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function i(p,m){m.color.getRGB(p.fogColor.value,Ul(a)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function n(p,m,y,x,w){m.isMeshBasicMaterial||m.isMeshLambertMaterial?s(p,m):m.isMeshToonMaterial?(s(p,m),d(p,m)):m.isMeshPhongMaterial?(s(p,m),h(p,m)):m.isMeshStandardMaterial?(s(p,m),u(p,m),m.isMeshPhysicalMaterial&&f(p,m,w)):m.isMeshMatcapMaterial?(s(p,m),g(p,m)):m.isMeshDepthMaterial?s(p,m):m.isMeshDistanceMaterial?(s(p,m),v(p,m)):m.isMeshNormalMaterial?s(p,m):m.isLineBasicMaterial?(o(p,m),m.isLineDashedMaterial&&r(p,m)):m.isPointsMaterial?c(p,m,y,x):m.isSpriteMaterial?l(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,e(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===Qe&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,e(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===Qe&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,e(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,e(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const y=t.get(m),x=y.envMap,w=y.envMapRotation;x&&(p.envMap.value=x,yn.copy(w),yn.x*=-1,yn.y*=-1,yn.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(yn.y*=-1,yn.z*=-1),p.envMapRotation.value.setFromMatrix4(n0.makeRotationFromEuler(yn)),p.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,p.aoMapTransform))}function o(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform))}function r(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function c(p,m,y,x){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*y,p.scale.value=x*.5,m.map&&(p.map.value=m.map,e(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function l(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function h(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function d(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function u(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,y){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Qe&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=y.texture,p.transmissionSamplerSize.value.set(y.width,y.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function v(p,m){const y=t.get(m).light;p.referencePosition.value.setFromMatrixPosition(y.matrixWorld),p.nearDistance.value=y.shadow.camera.near,p.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:n}}function a0(a,t,e,i){let n={},s={},o=[];const r=a.getParameter(a.MAX_UNIFORM_BUFFER_BINDINGS);function c(y,x){const w=x.program;i.uniformBlockBinding(y,w)}function l(y,x){let w=n[y.id];w===void 0&&(g(y),w=h(y),n[y.id]=w,y.addEventListener("dispose",p));const R=x.program;i.updateUBOMapping(y,R);const E=t.render.frame;s[y.id]!==E&&(u(y),s[y.id]=E)}function h(y){const x=d();y.__bindingPointIndex=x;const w=a.createBuffer(),R=y.__size,E=y.usage;return a.bindBuffer(a.UNIFORM_BUFFER,w),a.bufferData(a.UNIFORM_BUFFER,R,E),a.bindBuffer(a.UNIFORM_BUFFER,null),a.bindBufferBase(a.UNIFORM_BUFFER,x,w),w}function d(){for(let y=0;y<r;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(y){const x=n[y.id],w=y.uniforms,R=y.__cache;a.bindBuffer(a.UNIFORM_BUFFER,x);for(let E=0,T=w.length;E<T;E++){const A=Array.isArray(w[E])?w[E]:[w[E]];for(let I=0,_=A.length;I<_;I++){const M=A[I];if(f(M,E,I,R)===!0){const P=M.__offset,O=Array.isArray(M.value)?M.value:[M.value];let B=0;for(let q=0;q<O.length;q++){const G=O[q],K=v(G);typeof G=="number"||typeof G=="boolean"?(M.__data[0]=G,a.bufferSubData(a.UNIFORM_BUFFER,P+B,M.__data)):G.isMatrix3?(M.__data[0]=G.elements[0],M.__data[1]=G.elements[1],M.__data[2]=G.elements[2],M.__data[3]=0,M.__data[4]=G.elements[3],M.__data[5]=G.elements[4],M.__data[6]=G.elements[5],M.__data[7]=0,M.__data[8]=G.elements[6],M.__data[9]=G.elements[7],M.__data[10]=G.elements[8],M.__data[11]=0):(G.toArray(M.__data,B),B+=K.storage/Float32Array.BYTES_PER_ELEMENT)}a.bufferSubData(a.UNIFORM_BUFFER,P,M.__data)}}}a.bindBuffer(a.UNIFORM_BUFFER,null)}function f(y,x,w,R){const E=y.value,T=x+"_"+w;if(R[T]===void 0)return typeof E=="number"||typeof E=="boolean"?R[T]=E:R[T]=E.clone(),!0;{const A=R[T];if(typeof E=="number"||typeof E=="boolean"){if(A!==E)return R[T]=E,!0}else if(A.equals(E)===!1)return A.copy(E),!0}return!1}function g(y){const x=y.uniforms;let w=0;const R=16;for(let T=0,A=x.length;T<A;T++){const I=Array.isArray(x[T])?x[T]:[x[T]];for(let _=0,M=I.length;_<M;_++){const P=I[_],O=Array.isArray(P.value)?P.value:[P.value];for(let B=0,q=O.length;B<q;B++){const G=O[B],K=v(G),X=w%R,ct=X%K.boundary,dt=X+ct;w+=ct,dt!==0&&R-dt<K.storage&&(w+=R-dt),P.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),P.__offset=w,w+=K.storage}}}const E=w%R;return E>0&&(w+=R-E),y.__size=w,y.__cache={},this}function v(y){const x={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(x.boundary=4,x.storage=4):y.isVector2?(x.boundary=8,x.storage=8):y.isVector3||y.isColor?(x.boundary=16,x.storage=12):y.isVector4?(x.boundary=16,x.storage=16):y.isMatrix3?(x.boundary=48,x.storage=48):y.isMatrix4?(x.boundary=64,x.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),x}function p(y){const x=y.target;x.removeEventListener("dispose",p);const w=o.indexOf(x.__bindingPointIndex);o.splice(w,1),a.deleteBuffer(n[x.id]),delete n[x.id],delete s[x.id]}function m(){for(const y in n)a.deleteBuffer(n[y]);o=[],n={},s={}}return{bind:c,update:l,dispose:m}}class o0{constructor(t={}){const{canvas:e=jh(),context:i=null,depth:n=!0,stencil:s=!1,alpha:o=!1,antialias:r=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1}=t;this.isWebGLRenderer=!0;let u;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");u=i.getContextAttributes().alpha}else u=o;const f=new Uint32Array(4),g=new Int32Array(4);let v=null,p=null;const m=[],y=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ri,this.toneMapping=ln,this.toneMappingExposure=1;const x=this;let w=!1,R=0,E=0,T=null,A=-1,I=null;const _=new pe,M=new pe;let P=null;const O=new nt(0);let B=0,q=e.width,G=e.height,K=1,X=null,ct=null;const dt=new pe(0,0,q,G),Mt=new pe(0,0,q,G);let ie=!1;const he=new Rr;let Y=!1,st=!1;const bt=new me,vt=new me,Ft=new z,Pt=new pe,Yt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ue=!1;function Zt(){return T===null?K:1}let k=i;function ti(S,U){return e.getContext(S,U)}try{const S={alpha:!0,depth:n,stencil:s,antialias:r,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${_r}`),e.addEventListener("webglcontextlost",Q,!1),e.addEventListener("webglcontextrestored",ut,!1),e.addEventListener("webglcontextcreationerror",mt,!1),k===null){const U="webgl2";if(k=ti(U,S),k===null)throw ti(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let $t,te,It,_e,Ut,C,b,H,J,it,Z,Tt,ht,_t,ee,at,xt,Lt,Dt,yt,Kt,Ot,ge,D;function pt(){$t=new dp(k),$t.init(),Ot=new Ym(k,$t),te=new ap(k,$t,t,Ot),It=new Xm(k),te.reverseDepthBuffer&&It.buffers.depth.setReversed(!0),_e=new pp(k),Ut=new km,C=new Km(k,$t,It,Ut,te,Ot,_e),b=new rp(x),H=new hp(x),J=new yd(k),ge=new np(k,J),it=new up(k,J,_e,ge),Z=new gp(k,it,J,_e),Dt=new mp(k,te,C),at=new op(Ut),Tt=new Pm(x,b,H,$t,te,ge,at),ht=new s0(x,Ut),_t=new Lm,ee=new Bm($t),Lt=new ip(x,b,H,It,Z,u,c),xt=new qm(x,Z,te),D=new a0(k,_e,te,It),yt=new sp(k,$t,_e),Kt=new fp(k,$t,_e),_e.programs=Tt.programs,x.capabilities=te,x.extensions=$t,x.properties=Ut,x.renderLists=_t,x.shadowMap=xt,x.state=It,x.info=_e}pt();const $=new i0(x,k);this.xr=$,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){const S=$t.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=$t.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(S){S!==void 0&&(K=S,this.setSize(q,G,!1))},this.getSize=function(S){return S.set(q,G)},this.setSize=function(S,U,V=!0){if($.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}q=S,G=U,e.width=Math.floor(S*K),e.height=Math.floor(U*K),V===!0&&(e.style.width=S+"px",e.style.height=U+"px"),this.setViewport(0,0,S,U)},this.getDrawingBufferSize=function(S){return S.set(q*K,G*K).floor()},this.setDrawingBufferSize=function(S,U,V){q=S,G=U,K=V,e.width=Math.floor(S*V),e.height=Math.floor(U*V),this.setViewport(0,0,S,U)},this.getCurrentViewport=function(S){return S.copy(_)},this.getViewport=function(S){return S.copy(dt)},this.setViewport=function(S,U,V,W){S.isVector4?dt.set(S.x,S.y,S.z,S.w):dt.set(S,U,V,W),It.viewport(_.copy(dt).multiplyScalar(K).round())},this.getScissor=function(S){return S.copy(Mt)},this.setScissor=function(S,U,V,W){S.isVector4?Mt.set(S.x,S.y,S.z,S.w):Mt.set(S,U,V,W),It.scissor(M.copy(Mt).multiplyScalar(K).round())},this.getScissorTest=function(){return ie},this.setScissorTest=function(S){It.setScissorTest(ie=S)},this.setOpaqueSort=function(S){X=S},this.setTransparentSort=function(S){ct=S},this.getClearColor=function(S){return S.copy(Lt.getClearColor())},this.setClearColor=function(){Lt.setClearColor.apply(Lt,arguments)},this.getClearAlpha=function(){return Lt.getClearAlpha()},this.setClearAlpha=function(){Lt.setClearAlpha.apply(Lt,arguments)},this.clear=function(S=!0,U=!0,V=!0){let W=0;if(S){let N=!1;if(T!==null){const ot=T.texture.format;N=ot===Tr||ot===Er||ot===Sr}if(N){const ot=T.texture.type,ft=ot===ji||ot===Rn||ot===ks||ot===as||ot===Mr||ot===wr,wt=Lt.getClearColor(),Et=Lt.getClearAlpha(),zt=wt.r,kt=wt.g,At=wt.b;ft?(f[0]=zt,f[1]=kt,f[2]=At,f[3]=Et,k.clearBufferuiv(k.COLOR,0,f)):(g[0]=zt,g[1]=kt,g[2]=At,g[3]=Et,k.clearBufferiv(k.COLOR,0,g))}else W|=k.COLOR_BUFFER_BIT}U&&(W|=k.DEPTH_BUFFER_BIT,k.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),V&&(W|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Q,!1),e.removeEventListener("webglcontextrestored",ut,!1),e.removeEventListener("webglcontextcreationerror",mt,!1),_t.dispose(),ee.dispose(),Ut.dispose(),b.dispose(),H.dispose(),Z.dispose(),ge.dispose(),D.dispose(),Tt.dispose(),$.dispose(),$.removeEventListener("sessionstart",Nr),$.removeEventListener("sessionend",Fr),pn.stop()};function Q(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),w=!0}function ut(){console.log("THREE.WebGLRenderer: Context Restored."),w=!1;const S=_e.autoReset,U=xt.enabled,V=xt.autoUpdate,W=xt.needsUpdate,N=xt.type;pt(),_e.autoReset=S,xt.enabled=U,xt.autoUpdate=V,xt.needsUpdate=W,xt.type=N}function mt(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Jt(S){const U=S.target;U.removeEventListener("dispose",Jt),Re(U)}function Re(S){$e(S),Ut.remove(S)}function $e(S){const U=Ut.get(S).programs;U!==void 0&&(U.forEach(function(V){Tt.releaseProgram(V)}),S.isShaderMaterial&&Tt.releaseShaderCache(S))}this.renderBufferDirect=function(S,U,V,W,N,ot){U===null&&(U=Yt);const ft=N.isMesh&&N.matrixWorld.determinant()<0,wt=ih(S,U,V,W,N);It.setMaterial(W,ft);let Et=V.index,zt=1;if(W.wireframe===!0){if(Et=it.getWireframeAttribute(V),Et===void 0)return;zt=2}const kt=V.drawRange,At=V.attributes.position;let de=kt.start*zt,xe=(kt.start+kt.count)*zt;ot!==null&&(de=Math.max(de,ot.start*zt),xe=Math.min(xe,(ot.start+ot.count)*zt)),Et!==null?(de=Math.max(de,0),xe=Math.min(xe,Et.count)):At!=null&&(de=Math.max(de,0),xe=Math.min(xe,At.count));const be=xe-de;if(be<0||be===1/0)return;ge.setup(N,W,wt,V,Et);let ei,se=yt;if(Et!==null&&(ei=J.get(Et),se=Kt,se.setIndex(ei)),N.isMesh)W.wireframe===!0?(It.setLineWidth(W.wireframeLinewidth*Zt()),se.setMode(k.LINES)):se.setMode(k.TRIANGLES);else if(N.isLine){let Ct=W.linewidth;Ct===void 0&&(Ct=1),It.setLineWidth(Ct*Zt()),N.isLineSegments?se.setMode(k.LINES):N.isLineLoop?se.setMode(k.LINE_LOOP):se.setMode(k.LINE_STRIP)}else N.isPoints?se.setMode(k.POINTS):N.isSprite&&se.setMode(k.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)se.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if($t.get("WEBGL_multi_draw"))se.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{const Ct=N._multiDrawStarts,Fe=N._multiDrawCounts,ae=N._multiDrawCount,_i=Et?J.get(Et).bytesPerElement:1,Ln=Ut.get(W).currentProgram.getUniforms();for(let ii=0;ii<ae;ii++)Ln.setValue(k,"_gl_DrawID",ii),se.render(Ct[ii]/_i,Fe[ii])}else if(N.isInstancedMesh)se.renderInstances(de,be,N.count);else if(V.isInstancedBufferGeometry){const Ct=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,Fe=Math.min(V.instanceCount,Ct);se.renderInstances(de,be,Fe)}else se.render(de,be)};function ne(S,U,V){S.transparent===!0&&S.side===we&&S.forceSinglePass===!1?(S.side=Qe,S.needsUpdate=!0,Bs(S,U,V),S.side=qi,S.needsUpdate=!0,Bs(S,U,V),S.side=we):Bs(S,U,V)}this.compile=function(S,U,V=null){V===null&&(V=S),p=ee.get(V),p.init(U),y.push(p),V.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),S!==V&&S.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),p.setupLights();const W=new Set;return S.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;const ot=N.material;if(ot)if(Array.isArray(ot))for(let ft=0;ft<ot.length;ft++){const wt=ot[ft];ne(wt,V,N),W.add(wt)}else ne(ot,V,N),W.add(ot)}),y.pop(),p=null,W},this.compileAsync=function(S,U,V=null){const W=this.compile(S,U,V);return new Promise(N=>{function ot(){if(W.forEach(function(ft){Ut.get(ft).currentProgram.isReady()&&W.delete(ft)}),W.size===0){N(S);return}setTimeout(ot,10)}$t.get("KHR_parallel_shader_compile")!==null?ot():setTimeout(ot,10)})};let Ke=null;function Pi(S){Ke&&Ke(S)}function Nr(){pn.stop()}function Fr(){pn.start()}const pn=new Ol;pn.setAnimationLoop(Pi),typeof self<"u"&&pn.setContext(self),this.setAnimationLoop=function(S){Ke=S,$.setAnimationLoop(S),S===null?pn.stop():pn.start()},$.addEventListener("sessionstart",Nr),$.addEventListener("sessionend",Fr),this.render=function(S,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),$.enabled===!0&&$.isPresenting===!0&&($.cameraAutoUpdate===!0&&$.updateCamera(U),U=$.getCamera()),S.isScene===!0&&S.onBeforeRender(x,S,U,T),p=ee.get(S,y.length),p.init(U),y.push(p),vt.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),he.setFromProjectionMatrix(vt),st=this.localClippingEnabled,Y=at.init(this.clippingPlanes,st),v=_t.get(S,m.length),v.init(),m.push(v),$.enabled===!0&&$.isPresenting===!0){const ot=x.xr.getDepthSensingMesh();ot!==null&&Na(ot,U,-1/0,x.sortObjects)}Na(S,U,0,x.sortObjects),v.finish(),x.sortObjects===!0&&v.sort(X,ct),ue=$.enabled===!1||$.isPresenting===!1||$.hasDepthSensing()===!1,ue&&Lt.addToRenderList(v,S),this.info.render.frame++,Y===!0&&at.beginShadows();const V=p.state.shadowsArray;xt.render(V,S,U),Y===!0&&at.endShadows(),this.info.autoReset===!0&&this.info.reset();const W=v.opaque,N=v.transmissive;if(p.setupLights(),U.isArrayCamera){const ot=U.cameras;if(N.length>0)for(let ft=0,wt=ot.length;ft<wt;ft++){const Et=ot[ft];Br(W,N,S,Et)}ue&&Lt.render(S);for(let ft=0,wt=ot.length;ft<wt;ft++){const Et=ot[ft];Or(v,S,Et,Et.viewport)}}else N.length>0&&Br(W,N,S,U),ue&&Lt.render(S),Or(v,S,U);T!==null&&(C.updateMultisampleRenderTarget(T),C.updateRenderTargetMipmap(T)),S.isScene===!0&&S.onAfterRender(x,S,U),ge.resetDefaultState(),A=-1,I=null,y.pop(),y.length>0?(p=y[y.length-1],Y===!0&&at.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,m.pop(),m.length>0?v=m[m.length-1]:v=null};function Na(S,U,V,W){if(S.visible===!1)return;if(S.layers.test(U.layers)){if(S.isGroup)V=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(U);else if(S.isLight)p.pushLight(S),S.castShadow&&p.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||he.intersectsSprite(S)){W&&Pt.setFromMatrixPosition(S.matrixWorld).applyMatrix4(vt);const ft=Z.update(S),wt=S.material;wt.visible&&v.push(S,ft,wt,V,Pt.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||he.intersectsObject(S))){const ft=Z.update(S),wt=S.material;if(W&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Pt.copy(S.boundingSphere.center)):(ft.boundingSphere===null&&ft.computeBoundingSphere(),Pt.copy(ft.boundingSphere.center)),Pt.applyMatrix4(S.matrixWorld).applyMatrix4(vt)),Array.isArray(wt)){const Et=ft.groups;for(let zt=0,kt=Et.length;zt<kt;zt++){const At=Et[zt],de=wt[At.materialIndex];de&&de.visible&&v.push(S,ft,de,V,Pt.z,At)}}else wt.visible&&v.push(S,ft,wt,V,Pt.z,null)}}const ot=S.children;for(let ft=0,wt=ot.length;ft<wt;ft++)Na(ot[ft],U,V,W)}function Or(S,U,V,W){const N=S.opaque,ot=S.transmissive,ft=S.transparent;p.setupLightsView(V),Y===!0&&at.setGlobalState(x.clippingPlanes,V),W&&It.viewport(_.copy(W)),N.length>0&&Os(N,U,V),ot.length>0&&Os(ot,U,V),ft.length>0&&Os(ft,U,V),It.buffers.depth.setTest(!0),It.buffers.depth.setMask(!0),It.buffers.color.setMask(!0),It.setPolygonOffset(!1)}function Br(S,U,V,W){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[W.id]===void 0&&(p.state.transmissionRenderTarget[W.id]=new zn(1,1,{generateMipmaps:!0,type:$t.has("EXT_color_buffer_half_float")||$t.has("EXT_color_buffer_float")?Ls:ji,minFilter:Cn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:oe.workingColorSpace}));const ot=p.state.transmissionRenderTarget[W.id],ft=W.viewport||_;ot.setSize(ft.z,ft.w);const wt=x.getRenderTarget();x.setRenderTarget(ot),x.getClearColor(O),B=x.getClearAlpha(),B<1&&x.setClearColor(16777215,.5),x.clear(),ue&&Lt.render(V);const Et=x.toneMapping;x.toneMapping=ln;const zt=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),p.setupLightsView(W),Y===!0&&at.setGlobalState(x.clippingPlanes,W),Os(S,V,W),C.updateMultisampleRenderTarget(ot),C.updateRenderTargetMipmap(ot),$t.has("WEBGL_multisampled_render_to_texture")===!1){let kt=!1;for(let At=0,de=U.length;At<de;At++){const xe=U[At],be=xe.object,ei=xe.geometry,se=xe.material,Ct=xe.group;if(se.side===we&&be.layers.test(W.layers)){const Fe=se.side;se.side=Qe,se.needsUpdate=!0,Hr(be,V,W,ei,se,Ct),se.side=Fe,se.needsUpdate=!0,kt=!0}}kt===!0&&(C.updateMultisampleRenderTarget(ot),C.updateRenderTargetMipmap(ot))}x.setRenderTarget(wt),x.setClearColor(O,B),zt!==void 0&&(W.viewport=zt),x.toneMapping=Et}function Os(S,U,V){const W=U.isScene===!0?U.overrideMaterial:null;for(let N=0,ot=S.length;N<ot;N++){const ft=S[N],wt=ft.object,Et=ft.geometry,zt=W===null?ft.material:W,kt=ft.group;wt.layers.test(V.layers)&&Hr(wt,U,V,Et,zt,kt)}}function Hr(S,U,V,W,N,ot){S.onBeforeRender(x,U,V,W,N,ot),S.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),N.onBeforeRender(x,U,V,W,S,ot),N.transparent===!0&&N.side===we&&N.forceSinglePass===!1?(N.side=Qe,N.needsUpdate=!0,x.renderBufferDirect(V,U,W,N,S,ot),N.side=qi,N.needsUpdate=!0,x.renderBufferDirect(V,U,W,N,S,ot),N.side=we):x.renderBufferDirect(V,U,W,N,S,ot),S.onAfterRender(x,U,V,W,N,ot)}function Bs(S,U,V){U.isScene!==!0&&(U=Yt);const W=Ut.get(S),N=p.state.lights,ot=p.state.shadowsArray,ft=N.state.version,wt=Tt.getParameters(S,N.state,ot,U,V),Et=Tt.getProgramCacheKey(wt);let zt=W.programs;W.environment=S.isMeshStandardMaterial?U.environment:null,W.fog=U.fog,W.envMap=(S.isMeshStandardMaterial?H:b).get(S.envMap||W.environment),W.envMapRotation=W.environment!==null&&S.envMap===null?U.environmentRotation:S.envMapRotation,zt===void 0&&(S.addEventListener("dispose",Jt),zt=new Map,W.programs=zt);let kt=zt.get(Et);if(kt!==void 0){if(W.currentProgram===kt&&W.lightsStateVersion===ft)return Vr(S,wt),kt}else wt.uniforms=Tt.getUniforms(S),S.onBeforeCompile(wt,x),kt=Tt.acquireProgram(wt,Et),zt.set(Et,kt),W.uniforms=wt.uniforms;const At=W.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(At.clippingPlanes=at.uniform),Vr(S,wt),W.needsLights=sh(S),W.lightsStateVersion=ft,W.needsLights&&(At.ambientLightColor.value=N.state.ambient,At.lightProbe.value=N.state.probe,At.directionalLights.value=N.state.directional,At.directionalLightShadows.value=N.state.directionalShadow,At.spotLights.value=N.state.spot,At.spotLightShadows.value=N.state.spotShadow,At.rectAreaLights.value=N.state.rectArea,At.ltc_1.value=N.state.rectAreaLTC1,At.ltc_2.value=N.state.rectAreaLTC2,At.pointLights.value=N.state.point,At.pointLightShadows.value=N.state.pointShadow,At.hemisphereLights.value=N.state.hemi,At.directionalShadowMap.value=N.state.directionalShadowMap,At.directionalShadowMatrix.value=N.state.directionalShadowMatrix,At.spotShadowMap.value=N.state.spotShadowMap,At.spotLightMatrix.value=N.state.spotLightMatrix,At.spotLightMap.value=N.state.spotLightMap,At.pointShadowMap.value=N.state.pointShadowMap,At.pointShadowMatrix.value=N.state.pointShadowMatrix),W.currentProgram=kt,W.uniformsList=null,kt}function Gr(S){if(S.uniformsList===null){const U=S.currentProgram.getUniforms();S.uniformsList=Ma.seqWithValue(U.seq,S.uniforms)}return S.uniformsList}function Vr(S,U){const V=Ut.get(S);V.outputColorSpace=U.outputColorSpace,V.batching=U.batching,V.batchingColor=U.batchingColor,V.instancing=U.instancing,V.instancingColor=U.instancingColor,V.instancingMorph=U.instancingMorph,V.skinning=U.skinning,V.morphTargets=U.morphTargets,V.morphNormals=U.morphNormals,V.morphColors=U.morphColors,V.morphTargetsCount=U.morphTargetsCount,V.numClippingPlanes=U.numClippingPlanes,V.numIntersection=U.numClipIntersection,V.vertexAlphas=U.vertexAlphas,V.vertexTangents=U.vertexTangents,V.toneMapping=U.toneMapping}function ih(S,U,V,W,N){U.isScene!==!0&&(U=Yt),C.resetTextureUnits();const ot=U.fog,ft=W.isMeshStandardMaterial?U.environment:null,wt=T===null?x.outputColorSpace:T.isXRRenderTarget===!0?T.texture.colorSpace:un,Et=(W.isMeshStandardMaterial?H:b).get(W.envMap||ft),zt=W.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,kt=!!V.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),At=!!V.morphAttributes.position,de=!!V.morphAttributes.normal,xe=!!V.morphAttributes.color;let be=ln;W.toneMapped&&(T===null||T.isXRRenderTarget===!0)&&(be=x.toneMapping);const ei=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,se=ei!==void 0?ei.length:0,Ct=Ut.get(W),Fe=p.state.lights;if(Y===!0&&(st===!0||S!==I)){const di=S===I&&W.id===A;at.setState(W,S,di)}let ae=!1;W.version===Ct.__version?(Ct.needsLights&&Ct.lightsStateVersion!==Fe.state.version||Ct.outputColorSpace!==wt||N.isBatchedMesh&&Ct.batching===!1||!N.isBatchedMesh&&Ct.batching===!0||N.isBatchedMesh&&Ct.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&Ct.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&Ct.instancing===!1||!N.isInstancedMesh&&Ct.instancing===!0||N.isSkinnedMesh&&Ct.skinning===!1||!N.isSkinnedMesh&&Ct.skinning===!0||N.isInstancedMesh&&Ct.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&Ct.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&Ct.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&Ct.instancingMorph===!1&&N.morphTexture!==null||Ct.envMap!==Et||W.fog===!0&&Ct.fog!==ot||Ct.numClippingPlanes!==void 0&&(Ct.numClippingPlanes!==at.numPlanes||Ct.numIntersection!==at.numIntersection)||Ct.vertexAlphas!==zt||Ct.vertexTangents!==kt||Ct.morphTargets!==At||Ct.morphNormals!==de||Ct.morphColors!==xe||Ct.toneMapping!==be||Ct.morphTargetsCount!==se)&&(ae=!0):(ae=!0,Ct.__version=W.version);let _i=Ct.currentProgram;ae===!0&&(_i=Bs(W,U,N));let Ln=!1,ii=!1,Fa=!1;const Ee=_i.getUniforms(),Xi=Ct.uniforms;if(It.useProgram(_i.program)&&(Ln=!0,ii=!0,Fa=!0),W.id!==A&&(A=W.id,ii=!0),Ln||I!==S){te.reverseDepthBuffer?(bt.copy(S.projectionMatrix),$h(bt),Kh(bt),Ee.setValue(k,"projectionMatrix",bt)):Ee.setValue(k,"projectionMatrix",S.projectionMatrix),Ee.setValue(k,"viewMatrix",S.matrixWorldInverse);const di=Ee.map.cameraPosition;di!==void 0&&di.setValue(k,Ft.setFromMatrixPosition(S.matrixWorld)),te.logarithmicDepthBuffer&&Ee.setValue(k,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&Ee.setValue(k,"isOrthographic",S.isOrthographicCamera===!0),I!==S&&(I=S,ii=!0,Fa=!0)}if(N.isSkinnedMesh){Ee.setOptional(k,N,"bindMatrix"),Ee.setOptional(k,N,"bindMatrixInverse");const di=N.skeleton;di&&(di.boneTexture===null&&di.computeBoneTexture(),Ee.setValue(k,"boneTexture",di.boneTexture,C))}N.isBatchedMesh&&(Ee.setOptional(k,N,"batchingTexture"),Ee.setValue(k,"batchingTexture",N._matricesTexture,C),Ee.setOptional(k,N,"batchingIdTexture"),Ee.setValue(k,"batchingIdTexture",N._indirectTexture,C),Ee.setOptional(k,N,"batchingColorTexture"),N._colorsTexture!==null&&Ee.setValue(k,"batchingColorTexture",N._colorsTexture,C));const Oa=V.morphAttributes;if((Oa.position!==void 0||Oa.normal!==void 0||Oa.color!==void 0)&&Dt.update(N,V,_i),(ii||Ct.receiveShadow!==N.receiveShadow)&&(Ct.receiveShadow=N.receiveShadow,Ee.setValue(k,"receiveShadow",N.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(Xi.envMap.value=Et,Xi.flipEnvMap.value=Et.isCubeTexture&&Et.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&U.environment!==null&&(Xi.envMapIntensity.value=U.environmentIntensity),ii&&(Ee.setValue(k,"toneMappingExposure",x.toneMappingExposure),Ct.needsLights&&nh(Xi,Fa),ot&&W.fog===!0&&ht.refreshFogUniforms(Xi,ot),ht.refreshMaterialUniforms(Xi,W,K,G,p.state.transmissionRenderTarget[S.id]),Ma.upload(k,Gr(Ct),Xi,C)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Ma.upload(k,Gr(Ct),Xi,C),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&Ee.setValue(k,"center",N.center),Ee.setValue(k,"modelViewMatrix",N.modelViewMatrix),Ee.setValue(k,"normalMatrix",N.normalMatrix),Ee.setValue(k,"modelMatrix",N.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const di=W.uniformsGroups;for(let Ba=0,ah=di.length;Ba<ah;Ba++){const Wr=di[Ba];D.update(Wr,_i),D.bind(Wr,_i)}}return _i}function nh(S,U){S.ambientLightColor.needsUpdate=U,S.lightProbe.needsUpdate=U,S.directionalLights.needsUpdate=U,S.directionalLightShadows.needsUpdate=U,S.pointLights.needsUpdate=U,S.pointLightShadows.needsUpdate=U,S.spotLights.needsUpdate=U,S.spotLightShadows.needsUpdate=U,S.rectAreaLights.needsUpdate=U,S.hemisphereLights.needsUpdate=U}function sh(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return T},this.setRenderTargetTextures=function(S,U,V){Ut.get(S.texture).__webglTexture=U,Ut.get(S.depthTexture).__webglTexture=V;const W=Ut.get(S);W.__hasExternalTextures=!0,W.__autoAllocateDepthBuffer=V===void 0,W.__autoAllocateDepthBuffer||$t.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),W.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(S,U){const V=Ut.get(S);V.__webglFramebuffer=U,V.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(S,U=0,V=0){T=S,R=U,E=V;let W=!0,N=null,ot=!1,ft=!1;if(S){const Et=Ut.get(S);if(Et.__useDefaultFramebuffer!==void 0)It.bindFramebuffer(k.FRAMEBUFFER,null),W=!1;else if(Et.__webglFramebuffer===void 0)C.setupRenderTarget(S);else if(Et.__hasExternalTextures)C.rebindTextures(S,Ut.get(S.texture).__webglTexture,Ut.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const At=S.depthTexture;if(Et.__boundDepthTexture!==At){if(At!==null&&Ut.has(At)&&(S.width!==At.image.width||S.height!==At.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");C.setupDepthRenderbuffer(S)}}const zt=S.texture;(zt.isData3DTexture||zt.isDataArrayTexture||zt.isCompressedArrayTexture)&&(ft=!0);const kt=Ut.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(kt[U])?N=kt[U][V]:N=kt[U],ot=!0):S.samples>0&&C.useMultisampledRTT(S)===!1?N=Ut.get(S).__webglMultisampledFramebuffer:Array.isArray(kt)?N=kt[V]:N=kt,_.copy(S.viewport),M.copy(S.scissor),P=S.scissorTest}else _.copy(dt).multiplyScalar(K).floor(),M.copy(Mt).multiplyScalar(K).floor(),P=ie;if(It.bindFramebuffer(k.FRAMEBUFFER,N)&&W&&It.drawBuffers(S,N),It.viewport(_),It.scissor(M),It.setScissorTest(P),ot){const Et=Ut.get(S.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+U,Et.__webglTexture,V)}else if(ft){const Et=Ut.get(S.texture),zt=U||0;k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,Et.__webglTexture,V||0,zt)}A=-1},this.readRenderTargetPixels=function(S,U,V,W,N,ot,ft){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let wt=Ut.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ft!==void 0&&(wt=wt[ft]),wt){It.bindFramebuffer(k.FRAMEBUFFER,wt);try{const Et=S.texture,zt=Et.format,kt=Et.type;if(!te.textureFormatReadable(zt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!te.textureTypeReadable(kt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=S.width-W&&V>=0&&V<=S.height-N&&k.readPixels(U,V,W,N,Ot.convert(zt),Ot.convert(kt),ot)}finally{const Et=T!==null?Ut.get(T).__webglFramebuffer:null;It.bindFramebuffer(k.FRAMEBUFFER,Et)}}},this.readRenderTargetPixelsAsync=async function(S,U,V,W,N,ot,ft){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let wt=Ut.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ft!==void 0&&(wt=wt[ft]),wt){const Et=S.texture,zt=Et.format,kt=Et.type;if(!te.textureFormatReadable(zt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!te.textureTypeReadable(kt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=S.width-W&&V>=0&&V<=S.height-N){It.bindFramebuffer(k.FRAMEBUFFER,wt);const At=k.createBuffer();k.bindBuffer(k.PIXEL_PACK_BUFFER,At),k.bufferData(k.PIXEL_PACK_BUFFER,ot.byteLength,k.STREAM_READ),k.readPixels(U,V,W,N,Ot.convert(zt),Ot.convert(kt),0);const de=T!==null?Ut.get(T).__webglFramebuffer:null;It.bindFramebuffer(k.FRAMEBUFFER,de);const xe=k.fenceSync(k.SYNC_GPU_COMMANDS_COMPLETE,0);return k.flush(),await Xh(k,xe,4),k.bindBuffer(k.PIXEL_PACK_BUFFER,At),k.getBufferSubData(k.PIXEL_PACK_BUFFER,0,ot),k.deleteBuffer(At),k.deleteSync(xe),ot}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(S,U=null,V=0){S.isTexture!==!0&&(ya("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,S=arguments[1]);const W=Math.pow(2,-V),N=Math.floor(S.image.width*W),ot=Math.floor(S.image.height*W),ft=U!==null?U.x:0,wt=U!==null?U.y:0;C.setTexture2D(S,0),k.copyTexSubImage2D(k.TEXTURE_2D,V,0,0,ft,wt,N,ot),It.unbindTexture()},this.copyTextureToTexture=function(S,U,V=null,W=null,N=0){S.isTexture!==!0&&(ya("WebGLRenderer: copyTextureToTexture function signature has changed."),W=arguments[0]||null,S=arguments[1],U=arguments[2],N=arguments[3]||0,V=null);let ot,ft,wt,Et,zt,kt;V!==null?(ot=V.max.x-V.min.x,ft=V.max.y-V.min.y,wt=V.min.x,Et=V.min.y):(ot=S.image.width,ft=S.image.height,wt=0,Et=0),W!==null?(zt=W.x,kt=W.y):(zt=0,kt=0);const At=Ot.convert(U.format),de=Ot.convert(U.type);C.setTexture2D(U,0),k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,U.flipY),k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),k.pixelStorei(k.UNPACK_ALIGNMENT,U.unpackAlignment);const xe=k.getParameter(k.UNPACK_ROW_LENGTH),be=k.getParameter(k.UNPACK_IMAGE_HEIGHT),ei=k.getParameter(k.UNPACK_SKIP_PIXELS),se=k.getParameter(k.UNPACK_SKIP_ROWS),Ct=k.getParameter(k.UNPACK_SKIP_IMAGES),Fe=S.isCompressedTexture?S.mipmaps[N]:S.image;k.pixelStorei(k.UNPACK_ROW_LENGTH,Fe.width),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,Fe.height),k.pixelStorei(k.UNPACK_SKIP_PIXELS,wt),k.pixelStorei(k.UNPACK_SKIP_ROWS,Et),S.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,N,zt,kt,ot,ft,At,de,Fe.data):S.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,N,zt,kt,Fe.width,Fe.height,At,Fe.data):k.texSubImage2D(k.TEXTURE_2D,N,zt,kt,ot,ft,At,de,Fe),k.pixelStorei(k.UNPACK_ROW_LENGTH,xe),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,be),k.pixelStorei(k.UNPACK_SKIP_PIXELS,ei),k.pixelStorei(k.UNPACK_SKIP_ROWS,se),k.pixelStorei(k.UNPACK_SKIP_IMAGES,Ct),N===0&&U.generateMipmaps&&k.generateMipmap(k.TEXTURE_2D),It.unbindTexture()},this.copyTextureToTexture3D=function(S,U,V=null,W=null,N=0){S.isTexture!==!0&&(ya("WebGLRenderer: copyTextureToTexture3D function signature has changed."),V=arguments[0]||null,W=arguments[1]||null,S=arguments[2],U=arguments[3],N=arguments[4]||0);let ot,ft,wt,Et,zt,kt,At,de,xe;const be=S.isCompressedTexture?S.mipmaps[N]:S.image;V!==null?(ot=V.max.x-V.min.x,ft=V.max.y-V.min.y,wt=V.max.z-V.min.z,Et=V.min.x,zt=V.min.y,kt=V.min.z):(ot=be.width,ft=be.height,wt=be.depth,Et=0,zt=0,kt=0),W!==null?(At=W.x,de=W.y,xe=W.z):(At=0,de=0,xe=0);const ei=Ot.convert(U.format),se=Ot.convert(U.type);let Ct;if(U.isData3DTexture)C.setTexture3D(U,0),Ct=k.TEXTURE_3D;else if(U.isDataArrayTexture||U.isCompressedArrayTexture)C.setTexture2DArray(U,0),Ct=k.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,U.flipY),k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),k.pixelStorei(k.UNPACK_ALIGNMENT,U.unpackAlignment);const Fe=k.getParameter(k.UNPACK_ROW_LENGTH),ae=k.getParameter(k.UNPACK_IMAGE_HEIGHT),_i=k.getParameter(k.UNPACK_SKIP_PIXELS),Ln=k.getParameter(k.UNPACK_SKIP_ROWS),ii=k.getParameter(k.UNPACK_SKIP_IMAGES);k.pixelStorei(k.UNPACK_ROW_LENGTH,be.width),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,be.height),k.pixelStorei(k.UNPACK_SKIP_PIXELS,Et),k.pixelStorei(k.UNPACK_SKIP_ROWS,zt),k.pixelStorei(k.UNPACK_SKIP_IMAGES,kt),S.isDataTexture||S.isData3DTexture?k.texSubImage3D(Ct,N,At,de,xe,ot,ft,wt,ei,se,be.data):U.isCompressedArrayTexture?k.compressedTexSubImage3D(Ct,N,At,de,xe,ot,ft,wt,ei,be.data):k.texSubImage3D(Ct,N,At,de,xe,ot,ft,wt,ei,se,be),k.pixelStorei(k.UNPACK_ROW_LENGTH,Fe),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,ae),k.pixelStorei(k.UNPACK_SKIP_PIXELS,_i),k.pixelStorei(k.UNPACK_SKIP_ROWS,Ln),k.pixelStorei(k.UNPACK_SKIP_IMAGES,ii),N===0&&U.generateMipmaps&&k.generateMipmap(Ct),It.unbindTexture()},this.initRenderTarget=function(S){Ut.get(S).__webglFramebuffer===void 0&&C.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?C.setTextureCube(S,0):S.isData3DTexture?C.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?C.setTexture2DArray(S,0):C.setTexture2D(S,0),It.unbindTexture()},this.resetState=function(){R=0,E=0,T=null,It.reset(),ge.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Vi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===Cr?"display-p3":"srgb",e.unpackColorSpace=oe.workingColorSpace===Pa?"display-p3":"srgb"}}class Pr{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new nt(t),this.near=e,this.far=i}clone(){return new Pr(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class r0 extends Ie{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ei,this.environmentIntensity=1,this.environmentRotation=new Ei,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class c0 extends Ve{constructor(t=null,e=1,i=1,n,s,o,r,c,l=Je,h=Je,d,u){super(null,o,r,c,l,h,n,s,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Fc extends ke{constructor(t,e,i,n=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=n}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Kn=new me,Oc=new me,ca=[],Bc=new kn,l0=new me,_s=new gt,xs=new hs;class h0 extends gt{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Fc(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let n=0;n<i;n++)this.setMatrixAt(n,l0)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new kn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,Kn),Bc.copy(t.boundingBox).applyMatrix4(Kn),this.boundingBox.union(Bc)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new hs),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,Kn),xs.copy(t.boundingSphere).applyMatrix4(Kn),this.boundingSphere.union(xs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const i=e.morphTargetInfluences,n=this.morphTexture.source.data.data,s=i.length+1,o=t*s+1;for(let r=0;r<i.length;r++)i[r]=n[o+r]}raycast(t,e){const i=this.matrixWorld,n=this.count;if(_s.geometry=this.geometry,_s.material=this.material,_s.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),xs.copy(this.boundingSphere),xs.applyMatrix4(i),t.ray.intersectsSphere(xs)!==!1))for(let s=0;s<n;s++){this.getMatrixAt(s,Kn),Oc.multiplyMatrices(i,Kn),_s.matrixWorld=Oc,_s.raycast(t,ca);for(let o=0,r=ca.length;o<r;o++){const c=ca[o];c.instanceId=s,c.object=this,e.push(c)}ca.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Fc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const i=e.morphTargetInfluences,n=i.length+1;this.morphTexture===null&&(this.morphTexture=new c0(new Float32Array(n*this.count),n,this.count,br,Ri));const s=this.morphTexture.source.data.data;let o=0;for(let l=0;l<i.length;l++)o+=i[l];const r=this.geometry.morphTargetsRelative?1:1-o,c=n*t;s[c]=r,s.set(i,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Ia extends In{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new nt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Hc=new me,mr=new Pl,la=new hs,ha=new z;class kr extends Ie{constructor(t=new Ce,e=new Ia){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const i=this.geometry,n=this.matrixWorld,s=t.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),la.copy(i.boundingSphere),la.applyMatrix4(n),la.radius+=s,t.ray.intersectsSphere(la)===!1)return;Hc.copy(n).invert(),mr.copy(t.ray).applyMatrix4(Hc);const r=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=r*r,l=i.index,d=i.attributes.position;if(l!==null){const u=Math.max(0,o.start),f=Math.min(l.count,o.start+o.count);for(let g=u,v=f;g<v;g++){const p=l.getX(g);ha.fromBufferAttribute(d,p),Gc(ha,p,c,n,t,e,this)}}else{const u=Math.max(0,o.start),f=Math.min(d.count,o.start+o.count);for(let g=u,v=f;g<v;g++)ha.fromBufferAttribute(d,g),Gc(ha,g,c,n,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=n.length;s<o;s++){const r=n[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[r]=s}}}}}function Gc(a,t,e,i,n,s,o){const r=mr.distanceSqToPoint(a);if(r<e){const c=new z;mr.closestPointToPoint(a,c),c.applyMatrix4(i);const l=n.ray.origin.distanceTo(c);if(l<n.near||l>n.far)return;s.push({distance:l,distanceToRay:Math.sqrt(r),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class jl extends Ve{constructor(t,e,i,n,s,o,r,c,l){super(t,e,i,n,s,o,r,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ns extends Ce{constructor(t=1,e=32,i=0,n=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:n},e=Math.max(3,e);const s=[],o=[],r=[],c=[],l=new z,h=new jt;o.push(0,0,0),r.push(0,0,1),c.push(.5,.5);for(let d=0,u=3;d<=e;d++,u+=3){const f=i+d/e*n;l.x=t*Math.cos(f),l.y=t*Math.sin(f),o.push(l.x,l.y,l.z),r.push(0,0,1),h.x=(o[u]/t+1)/2,h.y=(o[u+1]/t+1)/2,c.push(h.x,h.y)}for(let d=1;d<=e;d++)s.push(d,d+1,0);this.setIndex(s),this.setAttribute("position",new le(o,3)),this.setAttribute("normal",new le(r,3)),this.setAttribute("uv",new le(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ns(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Wt extends Ce{constructor(t=1,e=1,i=1,n=32,s=1,o=!1,r=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:n,heightSegments:s,openEnded:o,thetaStart:r,thetaLength:c};const l=this;n=Math.floor(n),s=Math.floor(s);const h=[],d=[],u=[],f=[];let g=0;const v=[],p=i/2;let m=0;y(),o===!1&&(t>0&&x(!0),e>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new le(d,3)),this.setAttribute("normal",new le(u,3)),this.setAttribute("uv",new le(f,2));function y(){const w=new z,R=new z;let E=0;const T=(e-t)/i;for(let A=0;A<=s;A++){const I=[],_=A/s,M=_*(e-t)+t;for(let P=0;P<=n;P++){const O=P/n,B=O*c+r,q=Math.sin(B),G=Math.cos(B);R.x=M*q,R.y=-_*i+p,R.z=M*G,d.push(R.x,R.y,R.z),w.set(q,T,G).normalize(),u.push(w.x,w.y,w.z),f.push(O,1-_),I.push(g++)}v.push(I)}for(let A=0;A<n;A++)for(let I=0;I<s;I++){const _=v[I][A],M=v[I+1][A],P=v[I+1][A+1],O=v[I][A+1];t>0&&(h.push(_,M,O),E+=3),e>0&&(h.push(M,P,O),E+=3)}l.addGroup(m,E,0),m+=E}function x(w){const R=g,E=new jt,T=new z;let A=0;const I=w===!0?t:e,_=w===!0?1:-1;for(let P=1;P<=n;P++)d.push(0,p*_,0),u.push(0,_,0),f.push(.5,.5),g++;const M=g;for(let P=0;P<=n;P++){const B=P/n*c+r,q=Math.cos(B),G=Math.sin(B);T.x=I*G,T.y=p*_,T.z=I*q,d.push(T.x,T.y,T.z),u.push(0,_,0),E.x=q*.5+.5,E.y=G*.5*_+.5,f.push(E.x,E.y),g++}for(let P=0;P<n;P++){const O=R+P,B=M+P;w===!0?h.push(B,B+1,O):h.push(B+1,B,O),A+=3}l.addGroup(m,A,w===!0?1:2),m+=A}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Wt(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Bt extends Wt{constructor(t=1,e=1,i=32,n=1,s=!1,o=0,r=Math.PI*2){super(0,t,e,i,n,s,o,r),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:n,openEnded:s,thetaStart:o,thetaLength:r}}static fromJSON(t){return new Bt(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Fs extends Ce{constructor(t=[],e=[],i=1,n=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:n};const s=[],o=[];r(n),l(i),h(),this.setAttribute("position",new le(s,3)),this.setAttribute("normal",new le(s.slice(),3)),this.setAttribute("uv",new le(o,2)),n===0?this.computeVertexNormals():this.normalizeNormals();function r(y){const x=new z,w=new z,R=new z;for(let E=0;E<e.length;E+=3)f(e[E+0],x),f(e[E+1],w),f(e[E+2],R),c(x,w,R,y)}function c(y,x,w,R){const E=R+1,T=[];for(let A=0;A<=E;A++){T[A]=[];const I=y.clone().lerp(w,A/E),_=x.clone().lerp(w,A/E),M=E-A;for(let P=0;P<=M;P++)P===0&&A===E?T[A][P]=I:T[A][P]=I.clone().lerp(_,P/M)}for(let A=0;A<E;A++)for(let I=0;I<2*(E-A)-1;I++){const _=Math.floor(I/2);I%2===0?(u(T[A][_+1]),u(T[A+1][_]),u(T[A][_])):(u(T[A][_+1]),u(T[A+1][_+1]),u(T[A+1][_]))}}function l(y){const x=new z;for(let w=0;w<s.length;w+=3)x.x=s[w+0],x.y=s[w+1],x.z=s[w+2],x.normalize().multiplyScalar(y),s[w+0]=x.x,s[w+1]=x.y,s[w+2]=x.z}function h(){const y=new z;for(let x=0;x<s.length;x+=3){y.x=s[x+0],y.y=s[x+1],y.z=s[x+2];const w=p(y)/2/Math.PI+.5,R=m(y)/Math.PI+.5;o.push(w,1-R)}g(),d()}function d(){for(let y=0;y<o.length;y+=6){const x=o[y+0],w=o[y+2],R=o[y+4],E=Math.max(x,w,R),T=Math.min(x,w,R);E>.9&&T<.1&&(x<.2&&(o[y+0]+=1),w<.2&&(o[y+2]+=1),R<.2&&(o[y+4]+=1))}}function u(y){s.push(y.x,y.y,y.z)}function f(y,x){const w=y*3;x.x=t[w+0],x.y=t[w+1],x.z=t[w+2]}function g(){const y=new z,x=new z,w=new z,R=new z,E=new jt,T=new jt,A=new jt;for(let I=0,_=0;I<s.length;I+=9,_+=6){y.set(s[I+0],s[I+1],s[I+2]),x.set(s[I+3],s[I+4],s[I+5]),w.set(s[I+6],s[I+7],s[I+8]),E.set(o[_+0],o[_+1]),T.set(o[_+2],o[_+3]),A.set(o[_+4],o[_+5]),R.copy(y).add(x).add(w).divideScalar(3);const M=p(R);v(E,_+0,y,M),v(T,_+2,x,M),v(A,_+4,w,M)}}function v(y,x,w,R){R<0&&y.x===1&&(o[x]=y.x-1),w.x===0&&w.z===0&&(o[x]=R/2/Math.PI+.5)}function p(y){return Math.atan2(y.z,-y.x)}function m(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Fs(t.vertices,t.indices,t.radius,t.details)}}class mi extends Fs{constructor(t=1,e=0){const i=(1+Math.sqrt(5))/2,n=1/i,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-n,-i,0,-n,i,0,n,-i,0,n,i,-n,-i,0,-n,i,0,n,-i,0,n,i,0,-i,0,-n,i,0,-n,-i,0,n,i,0,n],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,o,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new mi(t.radius,t.detail)}}class Pn extends Fs{constructor(t=1,e=0){const i=(1+Math.sqrt(5))/2,n=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(n,s,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Pn(t.radius,t.detail)}}class Ir extends Fs{constructor(t=1,e=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],n=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,n,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Ir(t.radius,t.detail)}}class Lr extends Ce{constructor(t=.5,e=1,i=32,n=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:i,phiSegments:n,thetaStart:s,thetaLength:o},i=Math.max(3,i),n=Math.max(1,n);const r=[],c=[],l=[],h=[];let d=t;const u=(e-t)/n,f=new z,g=new jt;for(let v=0;v<=n;v++){for(let p=0;p<=i;p++){const m=s+p/i*o;f.x=d*Math.cos(m),f.y=d*Math.sin(m),c.push(f.x,f.y,f.z),l.push(0,0,1),g.x=(f.x/e+1)/2,g.y=(f.y/e+1)/2,h.push(g.x,g.y)}d+=u}for(let v=0;v<n;v++){const p=v*(i+1);for(let m=0;m<i;m++){const y=m+p,x=y,w=y+i+1,R=y+i+2,E=y+1;r.push(x,w,E),r.push(w,R,E)}}this.setIndex(r),this.setAttribute("position",new le(c,3)),this.setAttribute("normal",new le(l,3)),this.setAttribute("uv",new le(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Lr(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class qt extends Ce{constructor(t=1,e=32,i=16,n=0,s=Math.PI*2,o=0,r=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:n,phiLength:s,thetaStart:o,thetaLength:r},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const c=Math.min(o+r,Math.PI);let l=0;const h=[],d=new z,u=new z,f=[],g=[],v=[],p=[];for(let m=0;m<=i;m++){const y=[],x=m/i;let w=0;m===0&&o===0?w=.5/e:m===i&&c===Math.PI&&(w=-.5/e);for(let R=0;R<=e;R++){const E=R/e;d.x=-t*Math.cos(n+E*s)*Math.sin(o+x*r),d.y=t*Math.cos(o+x*r),d.z=t*Math.sin(n+E*s)*Math.sin(o+x*r),g.push(d.x,d.y,d.z),u.copy(d).normalize(),v.push(u.x,u.y,u.z),p.push(E+w,1-x),y.push(l++)}h.push(y)}for(let m=0;m<i;m++)for(let y=0;y<e;y++){const x=h[m][y+1],w=h[m][y],R=h[m+1][y],E=h[m+1][y+1];(m!==0||o>0)&&f.push(x,w,E),(m!==i-1||c<Math.PI)&&f.push(w,R,E)}this.setIndex(f),this.setAttribute("position",new le(g,3)),this.setAttribute("normal",new le(v,3)),this.setAttribute("uv",new le(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new qt(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class hi extends Ce{constructor(t=1,e=.4,i=12,n=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:n,arc:s},i=Math.floor(i),n=Math.floor(n);const o=[],r=[],c=[],l=[],h=new z,d=new z,u=new z;for(let f=0;f<=i;f++)for(let g=0;g<=n;g++){const v=g/n*s,p=f/i*Math.PI*2;d.x=(t+e*Math.cos(p))*Math.cos(v),d.y=(t+e*Math.cos(p))*Math.sin(v),d.z=e*Math.sin(p),r.push(d.x,d.y,d.z),h.x=t*Math.cos(v),h.y=t*Math.sin(v),u.subVectors(d,h).normalize(),c.push(u.x,u.y,u.z),l.push(g/n),l.push(f/i)}for(let f=1;f<=i;f++)for(let g=1;g<=n;g++){const v=(n+1)*f+g-1,p=(n+1)*(f-1)+g-1,m=(n+1)*(f-1)+g,y=(n+1)*f+g;o.push(v,p,y),o.push(p,m,y)}this.setIndex(o),this.setAttribute("position",new le(r,3)),this.setAttribute("normal",new le(c,3)),this.setAttribute("uv",new le(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new hi(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Pe extends In{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new nt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new nt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ar,this.normalScale=new jt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ei,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Ra extends In{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new nt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new nt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ar,this.normalScale=new jt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ei,this.combine=xr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class La extends Ie{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new nt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class d0 extends La{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ie.DEFAULT_UP),this.updateMatrix(),this.groundColor=new nt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const xo=new me,Vc=new z,Wc=new z;class Xl{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new jt(512,512),this.map=null,this.mapPass=null,this.matrix=new me,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Rr,this._frameExtents=new jt(1,1),this._viewportCount=1,this._viewports=[new pe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;Vc.setFromMatrixPosition(t.matrixWorld),e.position.copy(Vc),Wc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Wc),e.updateMatrixWorld(),xo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(xo),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(xo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const qc=new me,ys=new z,yo=new z;class u0 extends Xl{constructor(){super(new ci(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new jt(4,2),this._viewportCount=6,this._viewports=[new pe(2,1,1,1),new pe(0,1,1,1),new pe(3,1,1,1),new pe(1,1,1,1),new pe(3,0,1,1),new pe(1,0,1,1)],this._cubeDirections=[new z(1,0,0),new z(-1,0,0),new z(0,0,1),new z(0,0,-1),new z(0,1,0),new z(0,-1,0)],this._cubeUps=[new z(0,1,0),new z(0,1,0),new z(0,1,0),new z(0,1,0),new z(0,0,1),new z(0,0,-1)]}updateMatrices(t,e=0){const i=this.camera,n=this.matrix,s=t.distance||i.far;s!==i.far&&(i.far=s,i.updateProjectionMatrix()),ys.setFromMatrixPosition(t.matrixWorld),i.position.copy(ys),yo.copy(i.position),yo.add(this._cubeDirections[e]),i.up.copy(this._cubeUps[e]),i.lookAt(yo),i.updateMatrixWorld(),n.makeTranslation(-ys.x,-ys.y,-ys.z),qc.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(qc)}}class Ne extends La{constructor(t,e,i=0,n=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=n,this.shadow=new u0}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class f0 extends Xl{constructor(){super(new Bl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class p0 extends La{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ie.DEFAULT_UP),this.updateMatrix(),this.target=new Ie,this.shadow=new f0}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class m0 extends La{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class g0{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=jc(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=jc();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function jc(){return performance.now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:_r}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=_r);class v0{constructor(t){this.canvas=t,this.keys=new Set,this.pressed=new Set,this.mouseDX=0,this.mouseDY=0,this.locked=!1,this.enabled=!0,this.sensitivity=.0022,this.listeners=[],this.mouseDown=!1,this.touch={active:!1,moveId:null,lookId:null,moveX:0,moveY:0,startX:0,startY:0,lookX:0,lookY:0},this._bind()}on(t){this.listeners.push(t)}_emit(t,e){for(const i of this.listeners)i(t,e)}_bind(){const t=s=>{if(!this.enabled)return;const o=s.code;["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space","Tab"].includes(o)&&s.preventDefault(),this.keys.has(o)||this.pressed.add(o),this.keys.add(o),this._emit("keydown",o)},e=s=>{this.keys.delete(s.code),this._emit("keyup",s.code)};window.addEventListener("keydown",t),window.addEventListener("keyup",e),window.addEventListener("blur",()=>{this.keys.clear(),this.pressed.clear()}),this.canvas.addEventListener("mousedown",s=>{this.enabled&&(this.mouseDown=!0,!this.locked&&s.button===0&&this.requestLock(),this._emit("mousedown",s.button))}),window.addEventListener("mouseup",s=>{this.mouseDown=!1,this._emit("mouseup",s.button)}),document.addEventListener("mousemove",s=>{!this.locked&&!this.mouseDown||(this.mouseDX+=s.movementX||0,this.mouseDY+=s.movementY||0)}),document.addEventListener("pointerlockchange",()=>{this.locked=document.pointerLockElement===this.canvas,this._emit("lockchange",this.locked)}),window.addEventListener("contextmenu",s=>s.preventDefault());const i=this.canvas;i.addEventListener("touchstart",s=>{if(this.enabled){for(const o of s.changedTouches)o.clientX<window.innerWidth*.42&&this.touch.moveId===null?(this.touch.moveId=o.identifier,this.touch.startX=o.clientX,this.touch.startY=o.clientY,this.touch.moveX=0,this.touch.moveY=0):this.touch.lookId===null&&(this.touch.lookId=o.identifier,this.touch.lookX=o.clientX,this.touch.lookY=o.clientY);this.touch.active=!0,this._emit("touchstart",s)}},{passive:!0}),i.addEventListener("touchmove",s=>{for(const o of s.changedTouches)o.identifier===this.touch.moveId?(this.touch.moveX=Math.max(-1,Math.min(1,(o.clientX-this.touch.startX)/60)),this.touch.moveY=Math.max(-1,Math.min(1,(o.clientY-this.touch.startY)/60))):o.identifier===this.touch.lookId&&(this.mouseDX+=(o.clientX-this.touch.lookX)*.55,this.mouseDY+=(o.clientY-this.touch.lookY)*.55,this.touch.lookX=o.clientX,this.touch.lookY=o.clientY)},{passive:!0});const n=s=>{for(const o of s.changedTouches)o.identifier===this.touch.moveId&&(this.touch.moveId=null,this.touch.moveX=0,this.touch.moveY=0),o.identifier===this.touch.lookId&&(this.touch.lookId=null);this.touch.moveId===null&&this.touch.lookId===null&&(this.touch.active=!1)};i.addEventListener("touchend",n,{passive:!0}),i.addEventListener("touchcancel",n,{passive:!0})}requestLock(){if(this.canvas.requestPointerLock)try{const t=this.canvas.requestPointerLock();t&&t.catch&&t.catch(()=>{})}catch{}}exitLock(){if(this.locked)try{document.exitPointerLock&&document.exitPointerLock()}catch{}}isDown(t){return this.keys.has(t)}wasPressed(t){return this.pressed.has(t)}consumeMouse(){const t={x:this.mouseDX,y:this.mouseDY};return this.mouseDX=0,this.mouseDY=0,t}endFrame(){this.pressed.clear()}axes(){let t=0,e=0;(this.isDown("KeyW")||this.isDown("ArrowUp"))&&(e-=1),(this.isDown("KeyS")||this.isDown("ArrowDown"))&&(e+=1),(this.isDown("KeyA")||this.isDown("ArrowLeft"))&&(t-=1),(this.isDown("KeyD")||this.isDown("ArrowRight"))&&(t+=1),this.touch.moveId!==null&&(t+=this.touch.moveX,e+=this.touch.moveY);const i=Math.hypot(t,e);return i>1&&(t/=i,e/=i),{x:t,y:e}}}const hn=Math.PI*2,Xt=(a,t,e)=>a<t?t:a>e?e:a,vi=(a,t,e)=>a+(t-a)*e,ve=(a,t,e)=>{const i=Xt((e-a)/(t-a),0,1);return i*i*(3-2*i)},Rt=(a,t,e,i)=>vi(a,t,1-Math.exp(-e*i)),re=(a,t,e,i)=>Math.hypot(a-e,t-i);function _0(a,t){let e=(t-a)%hn;return e>Math.PI&&(e-=hn),e<-Math.PI&&(e+=hn),e}function Ci(a,t,e,i){return a+_0(a,t)*(1-Math.exp(-e*i))}function x0(a){let t=a>>>0;return function(){t|=0,t=t+1831565813|0;let i=Math.imul(t^t>>>15,1|t);return i=i+Math.imul(i^i>>>7,61|i)^i,((i^i>>>14)>>>0)/4294967296}}class Te{constructor(t=1337){this.next=x0(t)}float(t=0,e=1){return t+this.next()*(e-t)}int(t,e){return Math.floor(this.float(t,e+1))}pick(t){return t[Math.floor(this.next()*t.length)]}chance(t){return this.next()<t}sign(){return this.next()<.5?-1:1}}function da(a,t){let e=Math.imul(a,374761393)+Math.imul(t,668265263);return e=(e^e>>>13)*1274126177,((e^e>>>16)>>>0)/4294967296}function y0(a,t){const e=Math.floor(a),i=Math.floor(t),n=a-e,s=t-i,o=n*n*(3-2*n),r=s*s*(3-2*s),c=da(e,i),l=da(e+1,i),h=da(e,i+1),d=da(e+1,i+1);return vi(vi(c,l,o),vi(h,d,o),r)*2-1}function je(a,t,e=4,i=2.03,n=.5){let s=0,o=1,r=0,c=a,l=t;for(let h=0;h<e;h++)s+=y0(c,l)*o,r+=o,o*=n,c*=i,l*=i;return s/r}const M0=360;class w0{constructor(t=8.5){this.time=t/24,this.day=1,this.sunDir=new z,this.ambientColor=new nt,this.sunColor=new nt,this.fogColor=new nt,this.sunIntensity=1,this.ambientIntensity=.5}get hour(){return this.time*24}get isNight(){return this.hour<6.1||this.hour>20.2}get isDusk(){return this.hour>17.4&&this.hour<20.2}get clockString(){const t=Math.floor(this.hour),e=Math.floor((this.hour-t)*60);return`${String(t).padStart(2,"0")}:${String(e).padStart(2,"0")}`}update(t){for(this.time+=t/M0;this.time>=1;)this.time-=1,this.day+=1;this.apply()}setHour(t){this.time=(t%24+24)%24/24,this.apply()}skipTo(t){const e=(t%24+24)%24;e<=this.hour&&(this.day+=1),this.setHour(e)}apply(){const t=this.hour,e=(this.time-.25)*hn,i=Math.sin(e);this.elevation=i;let n;t>=7&&t<=17.8?n=1:t>17.8&&t<20.8?n=1-ve(17.8,20.8,t):t>=5&&t<7?n=ve(5,7,t):n=0;const s=Math.max(0,1-Math.abs(t-18.7)/2.3),o=Math.max(0,1-Math.abs(t-6.1)/1.9),r=Math.max(s,o)*(t>3&&t<22?1:0);this.sunDir.set(Math.cos(e)*.62,Math.max(.34,Math.abs(i)),Math.cos(e)*.3+.2).normalize();const c=new nt("#fff5e0"),l=new nt("#ff9c5c"),h=new nt("#8fa8d8");this.sunColor.copy(c).lerp(l,r*.9).lerp(h,Math.pow(1-n,2.2));const d=new nt("#b3c6d6"),u=new nt("#a08275"),f=new nt("#3d4e6b");this.ambientColor.copy(d).lerp(u,r*.7).lerp(f,Math.pow(1-n,1.6));const g=new nt("#c2d6de"),v=new nt("#b98a6a"),p=new nt("#26344a");this.fogColor.copy(g).lerp(v,r*.85).lerp(p,Math.pow(1-n,1.9)),this.sunIntensity=vi(.55,1.85,n),this.ambientIntensity=vi(.34,.6,n)+r*.1,this.dayF=n,this.nightF=1-n,this.duskF=r}}const ce=2.6,Da=1.35,Vt=2500,cs=Vt*2,Qt=19.5*Da,zi=250,Xc=Math.round(cs/zi),Hi=Math.round(cs/8),Wi=Hi+1,Dr=640,$l=Dr*ce,$c=(Dr-40)*ce,Me={village:{x:0,z:360,name:"Wilcza Dolina",sub:"Wioska pod Mgłą"},trading:{x:175,z:250,name:"Kotlina Kupców",sub:"Targ na starym trakcie"},crossroads:{x:0,z:150,name:"Rozdroże Trzech Dróg",sub:""},forge:{x:330,z:40,name:"Kowalska Góra",sub:"Starożytna kuźnia"},bandits:{x:-420,z:-60,name:"Obozowisko Rudego Wilka",sub:"Zbójecki obóz"},barrow:{x:430,z:-330,name:"Kurhan Szeptu",sub:"Zapomniane grobowce"},ruins:{x:-150,z:-560,name:"Mgliste Wrota",sub:"Siedziba Kaldrasa"},quarry:{x:-330,z:330,name:"Kamieniołom",sub:"Stare wyrobisko"},lake:{x:-500,z:330,name:"Jezioro Milczące",sub:"Zimna woda"},castle:{x:-40,z:-220,name:"Warownia Popiołu",sub:"Ruiny strażnicy"},hermit:{x:-560,z:-200,name:"Pustelnia",sub:"Ciemny Las"},swamp:{x:-200,z:-430,name:"Bagno Wieszczki",sub:"Mgła i zgnilizna"},pass:{x:250,z:-150,name:"Przełęcz Kalmoru",sub:"Przejście przez góry"},circle:{x:470,z:250,name:"Kamienny Krąg",sub:"Polana szeptów"},mine:{x:205,z:-430,name:"Kopalnia Żelazna",sub:"Zawalona sztolnia"},highlands:{x:470,z:-60,name:"Wyżyny Kalmoru",sub:""},lighthouse:{x:430,z:470,name:"Latarnia na Cyplu",sub:"Ostatnie światło przed morzem"},wreck:{x:640,z:250,name:"Wrak „Zimnej Fali”",sub:"Resztki statku na mieliźnie"},fisherhut:{x:0,z:620,name:"Chaty Rybaków",sub:"Drewno, sieci i sól"},island:{x:700,z:-430,name:"Samotna Skała",sub:"Wyspa na horyzoncie"}},tt=Object.fromEntries(Object.entries(Me).map(([a,t])=>[a,{...t,x:t.x*ce,z:t.z*ce}])),b0=[[0,360,0,150],[0,150,175,250],[0,150,330,40],[0,150,-420,-60],[0,360,-330,330],[0,360,-540,420],[0,150,-40,-220],[0,150,250,-150],[250,-150,430,-330],[250,-150,205,-430],[-40,-220,-200,-430],[-200,-430,-150,-560],[-200,-430,-560,-200],[330,40,470,250],[430,-330,205,-430],[175,250,-330,330],[-540,420,-330,330],[175,250,430,470],[430,470,640,250],[0,360,0,620]],gr=b0.map(([a,t,e,i])=>[a*ce,t*ce,e*ce,i*ce]),Kc=[{pts:[[360,-520],[400,-300],[392,-60],[352,120],[420,300]],h:128,w:130,seed:1.7},{pts:[[470,-560],[520,-300],[500,-60],[560,220]],h:150,w:140,seed:4.2},{pts:[[180,-540],[300,-430],[430,-330],[520,-200]],h:112,w:115,seed:7.3},{pts:[[-640,210],[-500,80],[-380,-40],[-300,-140]],h:96,w:115,seed:2.9},{pts:[[-620,-420],[-420,-520],[-180,-570],[0,-520]],h:92,w:125,seed:5.1},{pts:[[120,60],[40,-80],[-40,-200]],h:52,w:80,seed:9.4},{pts:[[300,470],[430,560],[540,600]],h:78,w:92,seed:3.3},{pts:[[-470,380],[-600,460],[-680,540]],h:64,w:86,seed:6.6}],Yc=[{x:700,z:-430,r:46,h:44,seed:2.1},{x:690,z:330,r:30,h:34,seed:8.4},{x:-690,z:-520,r:26,h:30,seed:5.7}],S0=[[540,-360],[610,-392],[660,-412],[700,-430]],E0=[{...Me.village,r:62,inner:40,lift:.2},{...Me.trading,r:48,inner:30,lift:.3},{...Me.forge,r:34,inner:16,lift:16},{...Me.barrow,r:40,inner:20,lift:6},{...Me.ruins,r:48,inner:26,lift:2.5},{...Me.bandits,r:34,inner:18,lift:0},{...Me.quarry,r:36,inner:18,lift:-4},{...Me.castle,r:44,inner:24,lift:12},{...Me.hermit,r:34,inner:16,lift:0},{...Me.swamp,r:70,inner:40,lift:9.5},{...Me.pass,r:46,inner:26,lift:0},{...Me.circle,r:34,inner:16,lift:3},{...Me.mine,r:30,inner:14,lift:2},{...Me.highlands,r:28,inner:13,lift:1},{...Me.lighthouse,r:44,inner:24,lift:5},{...Me.wreck,r:40,inner:22,lift:-1.4},{...Me.fisherhut,r:52,inner:30,lift:.4}],Zc=1.45,T0=E0.map(a=>({x:a.x*ce,z:a.z*ce,r:a.r*Zc,inner:a.inner*Zc,lift:a.lift}));function Kl(a,t,e,i,n,s){const o=n-e,r=s-i,c=Xt(((a-e)*o+(t-i)*r)/(o*o+r*r||1),0,1);return re(a,t,e+o*c,i+r*c)}function Jc(a,t,e){let i=1/0;for(let n=0;n<e.length-1;n++){const s=Kl(a,t,e[n][0],e[n][1],e[n+1][0],e[n+1][1]);s<i&&(i=s)}return i}function Yl(a,t){const e=je(a*.0026+11.3,t*.0026-7.1,4),i=je(a*.0105-3.7,t*.0105+5.2,3),n=je(a*.021+17.4,t*.021-8.8,2),s=je(a*.045+1.9,t*.045-2.4,2);let o=32+e*17+i*6.4+n*3.1+s*1.5,r=0;for(let v=0;v<Kc.length;v++){const p=Kc[v],m=Jc(a,t,p.pts);if(m<p.w){const y=1-ve(0,p.w,m),x=Math.pow(y,1.55);if(x<.002)continue;const w=.62+.66*(je(a*.017+p.seed,t*.017-p.seed,3)*.5+.5),R=p.h*x*w;R>r&&(r=R)}}if(o+=r,o>96){const v=Math.abs(je(a*.045+3.3,t*.045-8.1,3));o+=v*ve(96,150,o)*34}const c=Math.hypot(a,t),l=je(a*.0035+50.2,t*.0035-21.7,3)*.5+.5,h=Dr+l*62;if(c>h-40){const v=ve(h-40,h+26,c),p=ve(h,h+150,c),m=vi(o,21+l*6+je(a*.03,t*.03,2)*2.2,v);o=vi(m,-30+l*9,p)}for(let v=0;v<Yc.length;v++){const p=Yc[v],m=re(a,t,p.x,p.z);if(m<p.r*2.2){const y=1-ve(p.r*.3,p.r*1.85,m),x=p.h*Math.pow(y,1.4)*(.75+.45*(je(a*.05+p.seed,t*.05,2)*.5+.5));o=Math.max(o,-16+x)}}const d=Jc(a,t,S0);if(d<18){const v=1-ve(0,18,d),p=20.6+(je(a*.06+7.1,t*.06-3.3,2)*.5+.5)*2.6;o=Math.max(o,vi(o,p,v))}const u=re(a,t,Me.lake.x,Me.lake.z);if(u<152){const v=1-ve(94,150,u);o=vi(o,12.4,v*.94)}const f=re(a,t,Me.swamp.x,Me.swamp.z);f<220&&(o-=3.5*ve(220,60,f));const g=re(a,t,Me.village.x,Me.village.z);return o-=4.5*ve(230,70,g)*ve(18,62,g),Math.max(o,-34)}const Qc=T0.map(a=>{const t=Math.max(3.2,Yl(a.x/ce,a.z/ce)+a.lift);return{...a,target:t*Da}});function A0(a,t){const e=a/ce,i=t/ce;let n=Yl(e,i)*Da;for(let s=0;s<Qc.length;s++){const o=Qc[s],r=re(a,t,o.x,o.z);if(r<o.r){const c=ve(o.r,o.inner,r);n=vi(n,o.target,c)}}return n}const As=new Float32Array(Wi*Wi),C0=performance.now();for(let a=0;a<Wi;a++){const t=-Vt+a/Hi*cs;for(let e=0;e<Wi;e++){const i=-Vt+e/Hi*cs;As[a*Wi+e]=A0(i,t)}}performance.now()-C0;function j(a,t){const e=(a+Vt)/cs*Hi,i=(t+Vt)/cs*Hi;let n=Math.floor(e),s=Math.floor(i);n<0&&(n=0),s<0&&(s=0),n>Hi-1&&(n=Hi-1),s>Hi-1&&(s=Hi-1);const o=Xt(e-n,0,1),r=Xt(i-s,0,1),c=As[s*Wi+n],l=As[s*Wi+n+1],h=As[(s+1)*Wi+n],d=As[(s+1)*Wi+n+1];return o+r<=1?c+o*(l-c)+r*(h-c):d+(1-o)*(h-d)+(1-r)*(l-d)}function on(a,t){const i=j(a+6,t)-j(a-6,t),n=j(a,t+6)-j(a,t-6);return Math.hypot(i,n)/(2*6)}function oi(a,t){return j(a,t)<Qt-.05}function R0(a,t){return Math.max(0,Qt-j(a,t))}function Ti(a,t){let e=1/0;for(const[i,n,s,o]of gr){const r=Kl(a,t,i,n,s,o);r<e&&(e=r)}return e}function Is(a,t){const e=je(a*.0042+31.7,t*.0042-12.1,3)*.5+.5,i=je(a*.016-5.5,t*.016+9.2,2)*.5+.5;return Xt(e*.75+i*.45-.28,0,1)}const We={meadow:new nt("#8aa062"),meadowDry:new nt("#a8a066"),grass:new nt("#5d7f42"),grassDark:new nt("#415f31"),forest:new nt("#34502c"),dirt:new nt("#8a7350"),rock:new nt("#84817a"),rockDark:new nt("#5e5d58"),snow:new nt("#e6ecf0"),sand:new nt("#9c8f68"),mud:new nt("#55503a"),ash:new nt("#5c5a55"),seaFloor:new nt("#3b4a4a")},z0=new nt,P0=new nt;function k0(a,t,e,i,n=z0){const s=ce,o=Da,r=Is(a,t),c=je(a*.09+5,t*.09-2,3)*.5+.5,l=je(a*.028-9,t*.03+3,2)*.5+.5;n.copy(We.grass).lerp(We.meadow,c).lerp(We.meadowDry,l*.5);const h=je(a*.006-21.5,t*.006+4.7,3)*.5+.5;n.lerp(We.grassDark,ve(.32,.72,h)*.55),r>.42&&n.lerp(We.forest,ve(.42,.85,r)*.8);const d=Ti(a,t);d<7.8&&n.lerp(We.dirt,ve(7.8,2,d)*.72);const u=re(a,t,tt.swamp.x,tt.swamp.z);u<220*s&&n.lerp(We.mud,ve(220*s,70*s,u)*.72),i>.6&&n.lerp(We.rock,ve(.6,1.6,i)),i>1.35&&n.lerp(We.rockDark,ve(1.35,2.7,i)*.6);const f=104*o;e>f&&n.lerp(We.rock,ve(f,148*o,e)*.75);const g=re(a,t,tt.forge.x,tt.forge.z);g<30*s&&n.lerp(We.ash,ve(30*s,10*s,g)*.55);const v=(152+l*26)*o;e>v&&n.lerp(We.snow,ve(v,v+26*o,e)*(1-ve(2,3.2,i))),e>v+22*o&&n.lerp(We.snow,.42*(1-ve(2.4,3.4,i)));const p=Qt+2.6;if(e<p){const m=ve(p,Qt-1.4,e);n.lerp(We.sand,m*.88)}if(e<Qt-2.5){const m=ve(Qt-2.5,Qt-22,e);n.lerp(We.seaFloor,m*.92)}return n.lerp(P0.setRGB(n.r*1.06,n.g*1.04,n.b*.98),.18),n}function I0(a,t,e){const i=a*zi-Vt,n=t*zi-Vt,s=zi/e,o=e+1,r=o*o,c=s*1.05+2.5,l=e*8,h=new Float32Array((r+l)*3),d=new Float32Array((r+l)*3),u=new Float32Array((r+l)*2),f=new Float32Array((r+l)*3),g=new Float32Array(r),v=new nt,p=2.5;for(let E=0;E<o;E++)for(let T=0;T<o;T++){const A=E*o+T,I=i+T*s,_=n+E*s,M=j(I,_);g[A]=M,h[A*3]=I,h[A*3+1]=M,h[A*3+2]=_;const P=on(I,_);k0(I,_,M,P,v),d[A*3]=v.r,d[A*3+1]=v.g,d[A*3+2]=v.b,u[A*2]=I/22,u[A*2+1]=_/22;const O=j(I-p,_)-j(I+p,_),B=j(I,_-p)-j(I,_+p),q=Math.hypot(O,2*p,B)||1;f[A*3]=O/q,f[A*3+1]=2*p/q,f[A*3+2]=B/q}const m=[];for(let E=0;E<e;E++)for(let T=0;T<e;T++){const A=E*o+T,I=A+1,_=A+o,M=_+1;m.push(A,_,I,I,_,M)}let y=r;const x=E=>(h[y*3]=h[E*3],h[y*3+1]=g[E]-c,h[y*3+2]=h[E*3+2],d[y*3]=d[E*3],d[y*3+1]=d[E*3+1],d[y*3+2]=d[E*3+2],u[y*2]=u[E*2],u[y*2+1]=u[E*2+1],f[y*3]=f[E*3],f[y*3+1]=f[E*3+1],f[y*3+2]=f[E*3+2],y++),w=[E=>E,E=>e*o+E,E=>E*o,E=>E*o+e];for(const E of w)for(let T=0;T<e;T++){const A=E(T),I=E(T+1),_=x(A),M=x(I);m.push(A,_,I,I,_,M)}const R=new Ce;return R.setAttribute("position",new ke(h.subarray(0,y*3),3)),R.setAttribute("color",new ke(d.subarray(0,y*3),3)),R.setAttribute("uv",new ke(u.subarray(0,y*2),2)),R.setAttribute("normal",new ke(f.subarray(0,y*3),3)),R.setIndex(m),R.computeBoundingSphere(),R}function L0(){try{const t=document.createElement("canvas");t.width=256,t.height=256;const e=t.getContext("2d");if(!e||typeof e.fillRect!="function")return null;e.fillStyle="#f2f3ee",e.fillRect(0,0,256,256);let i=1337;const n=()=>(i=(i*1664525+1013904223)%4294967296,i/4294967296);for(let o=0;o<2600;o++){const r=n()*256,c=n()*256,l=1+n()*2.5,h=1+n()*4;e.fillStyle=`rgba(96,116,66,${.1+n()*.16})`,e.fillRect(r,c,l,h)}for(let o=0;o<900;o++){const r=n()*256,c=n()*256;e.fillStyle=`rgba(236,228,176,${.1+n()*.14})`,e.fillRect(r,c,2+n()*5,1+n()*2)}for(let o=0;o<260;o++){const r=n()*256,c=n()*256;e.fillStyle=`rgba(148,126,92,${.06+n()*.1})`,e.fillRect(r,c,3+n()*9,2+n()*4)}const s=new jl(t);return s.wrapS=Ps,s.wrapT=Ps,s.colorSpace=ri,s.anisotropy=4,s}catch{return null}}class D0{constructor(t){this.scene=t,this.group=new et,this.group.name="terrain-chunks",t.add(this.group);const e=L0();this.material=new Ra({vertexColors:!0,map:e??null}),this.chunks=new Map,this.queue=[],this.lastLodPos=new jt(1e9,1e9),this.updatesPerFrame=2,this.stats={built:0,triangles:0};for(let i=0;i<Xc;i++)for(let n=0;n<Xc;n++)this.chunks.set(`${n},${i}`,{cx:n,cz:i,res:0,mesh:null,centerX:n*zi-Vt+zi/2,centerZ:i*zi-Vt+zi/2})}lodForDistance(t){return t<260?50:t<560?25:12}ensureChunk(t,e){if(t.res===e&&t.mesh)return;t.mesh&&(this.group.remove(t.mesh),t.mesh.geometry.dispose());const i=I0(t.cx,t.cz,e),n=new gt(i,this.material);n.receiveShadow=!0,n.castShadow=!1,n.matrixAutoUpdate=!1,n.updateMatrix(),n.name=`chunk-${t.cx}-${t.cz}`,this.group.add(n),t.mesh=n,t.res=e,this.stats.built+=1}buildInitial(t){for(const e of this.chunks.values()){if(e.centerX<-Vt||e.centerZ<-Vt)continue;const i=Math.hypot(e.centerX-t.x,e.centerZ-t.z);this.ensureChunk(e,i<340?50:12)}}update(t,e){if(Math.hypot(t.x-this.lastLodPos.x,t.z-this.lastLodPos.y)>35){this.lastLodPos.set(t.x,t.z),this.queue=[];for(const s of this.chunks.values()){const o=Math.hypot(s.centerX-t.x,s.centerZ-t.z),r=this.lodForDistance(o);s.res!==r&&this.queue.push({chunk:s,want:r,d:o})}this.queue.sort((s,o)=>s.d-o.d)}let n=this.updatesPerFrame;for(;n>0&&this.queue.length;){const s=this.queue.shift();s.chunk.res!==s.want&&(this.ensureChunk(s.chunk,s.want),n-=1)}}get triangles(){let t=0;for(const e of this.chunks.values())e.mesh&&(t+=e.mesh.geometry.index.count/3);return t}}const tl=112;function U0(){const a=Vt*2.9,t=new fn(a,a,tl,tl);return t.rotateX(-Math.PI/2),t}function N0(){const t=[],e=[],i=[],n=new nt("#eaf6f8"),s=new nt("#9fc6cd"),o=new nt,r=[];for(let l=0;l<620;l++){const h=l/620*Math.PI*2,d=Math.cos(h),u=Math.sin(h);let f=-1,g=Qt-8;for(let y=Vt*.99;y>60;y-=7)if(j(d*y,u*y)>Qt-.35){let w=y,R=y+7;for(let E=0;E<6;E++){const T=(w+R)*.5;j(d*T,u*T)>Qt-.35?w=T:R=T}f=w,g=R;break}if(f<0){r.push(null);continue}const v=f-2.2,p=g+13,m=t.length/3;t.push(d*p,0,u*p,d*v,0,u*v),o.copy(n).lerp(s,.15),e.push(o.r,o.g,o.b),o.copy(s).multiplyScalar(.82),e.push(o.r,o.g,o.b),r.push({outer:p,inner:v,base:m})}for(let l=0;l<620;l++){const h=r[l],d=r[(l+1)%620];!h||!d||i.push(h.base,h.base+1,d.base,d.base,h.base+1,d.base+1)}const c=new Ce;return c.setAttribute("position",new le(t,3)),c.setAttribute("color",new le(e,3)),c.setIndex(i),c.computeVertexNormals(),c.computeBoundingSphere(),c}function el(a,t,e,i){const n=Math.ceil(e*2/i)+1,s=a-e,o=t-e,r=1.8,c=new Float32Array(n*n);for(let y=0;y<n;y++)for(let x=0;x<n;x++)c[y*n+x]=Qt-j(s+x*i,o+y*i);const l=[],h=[],d=[],u=new nt("#2f6579"),f=new nt("#e8f6f8"),g=new nt,v=new Int32Array(n*n).fill(-1),p=(y,x)=>{const w=x*n+y;if(v[w]>=0)return v[w];const R=c[w],E=Math.max(0,Math.min(1,R/r));g.copy(f).lerp(u,E);const T=l.length/3;return l.push(s+y*i,0,o+x*i),h.push(g.r,g.g,g.b),v[w]=T,T};for(let y=0;y<n-1;y++)for(let x=0;x<n-1;x++){const w=c[y*n+x],R=c[y*n+x+1],E=c[(y+1)*n+x],T=c[(y+1)*n+x+1],A=Math.max(w,R,E,T),I=Math.min(w,R,E,T);if(A<=.02||I>r)continue;const _=p(x,y),M=p(x+1,y),P=p(x,y+1),O=p(x+1,y+1);d.push(_,P,M,M,P,O)}const m=new Ce;return m.setAttribute("position",new le(l,3)),m.setAttribute("color",new le(h,3)),m.setIndex(d),m.computeVertexNormals(),m.computeBoundingSphere(),m}function F0(){const a=new et;a.name="water";const t=new Pe({color:"#28576e",transparent:!0,opacity:.9,roughness:.2,metalness:.22,flatShading:!1});t.side=we;const e=U0(),i=new gt(e,t);i.position.y=Qt,i.name="sea",i.receiveShadow=!1,a.add(i);const n=new Se({color:"#ffffff",vertexColors:!0,transparent:!0,opacity:.46,depthWrite:!1}),s=new gt(N0(),n);s.position.y=Qt+.09,s.name="coast-foam",a.add(s);const o=new gt(el(tt.lake.x,tt.lake.z,190*ce,12),n);o.position.y=Qt+.1,a.add(o);const r=j(tt.swamp.x,tt.swamp.z),c=new gt(el(tt.swamp.x,tt.swamp.z,150*ce,14),n);c.position.y=Math.max(r+.3,Qt+.06),a.add(c);const l=Float32Array.from(e.attributes.position.array),h=e.attributes.position,d=(g,v,p)=>Math.sin(g*.055+p*.85)*.19+Math.cos(v*.071+p*.62)*.15+Math.sin((g+v)*.021+p*1.31)*.24;for(let g=0;g<h.count;g++)h.array[g*3+1]=d(l[g*3],l[g*3+2],0);h.needsUpdate=!0,e.computeVertexNormals();let u=0,f=0;return{mesh:a,sea:i,level:Qt,update(g){u+=g,f+=1;const v=h.array;for(let m=0;m<h.count;m++)v[m*3+1]=d(l[m*3],l[m*3+2],u);h.needsUpdate=!0,f%3===0&&e.computeVertexNormals(),n.opacity=.4+Math.sin(u*.9)*.1+Math.sin(u*2.3)*.04;const p=Math.sin(u*.9)*.03;s.position.y=Qt+.09+p,o.position.y=Qt+.1+p,c.position.y=Math.max(r+.3,Qt+.06)+p,t.opacity=.88+Math.sin(u*.4)*.02}}}const Mo=new Map;function F(a,t={}){const e=a+JSON.stringify(t);if(Mo.has(e))return Mo.get(e);const i=new Pe({color:new nt(a),roughness:t.rough??.86,metalness:t.metal??.04,flatShading:t.flat??!0,emissive:t.emissive?new nt(t.emissive):new nt(0),emissiveIntensity:t.emissiveIntensity??1,transparent:!!t.transparent,opacity:t.opacity??1,side:t.side??qi});return Mo.set(e,i),i}function L(a,t,e=0,i=0,n=0){const s=new gt(a,t);return s.position.set(e,i,n),s.castShadow=!0,s.receiveShadow=!0,s}const St=(a,t,e)=>new Xe(a,t,e),Oe=(a,t,e,i=6)=>new Wt(a,t,e,i),gi=(a,t,e,i=6)=>new Wt(a,t,e,i,1,!0);function ua({w:a=5.4,d:t=4.6,h:e=3,wall:i="#b9a17c",roof:n="#5d3f33",rot:s=0}={}){const o=new et,r=L(St(a,e,t),F(i,{rough:.92}));r.position.y=e/2,o.add(r);const c=F("#4a3527",{rough:.9});for(const m of[-1,1]){const y=L(St(.22,e,.22),c,m*a/2-m*.11,e/2,t/2+.02);o.add(y)}const l=L(St(a+.1,.24,.22),c,0,e-.5,t/2+.03);o.add(l);const h=Math.max(a,t)*.46,d=new Bt(Math.hypot(a,t)*.5+.45,h,4,1),u=L(d,F(n,{rough:.95}),0,e+h/2-.05,0);u.rotation.y=Math.PI/4,u.scale.set(1,1,t/a),o.add(u);const f=L(St(.6,1.5,.6),F("#5a5148"),a*.27,e+h*.42,-t*.18);o.add(f);const g=L(St(.95,1.9,.12),F("#3e2a1c",{rough:.85}),0,.95,t/2+.08);o.add(g);const v=L(new qt(.06,6,5),F("#c9a24a",{metal:.8,rough:.4}),.3,1,t/2+.16);o.add(v);const p=F("#f3c07a",{emissive:"#ffb45c",emissiveIntensity:.85,rough:.35});for(const m of[-1,1]){const y=L(St(.8,.8,.1),p,m*(a*.3),e*.62,t/2+.07);o.add(y);const x=L(St(.92,.92,.06),F("#40301f"),m*(a*.3),e*.62,t/2+.04);o.add(x)}return o.rotation.y=s,o.userData.footprint={w:a+1.2,d:t+1.2},o}function il(a,{height:t=6,rTop:e=.26,rBottom:i=.46,color:n="#4a3626",lean:s=.05}={}){const o=new et,r=F(n,{rough:.95}),c=L(gi(e,i,t,6),r,0,t/2,0);c.rotation.z=a.float(-s,s),c.rotation.x=a.float(-s,s),o.add(c);const l=3+Math.floor(a.float(0,2));for(let h=0;h<l;h++){const d=h/l*Math.PI*2+a.float(-.4,.4),u=i*3.4,f=L(new Bt(i*.55,u,5),r,Math.cos(d)*i*1.1,.12,Math.sin(d)*i*1.1);f.rotation.set(Math.PI/2-.35,-d,.35),o.add(f)}return o}function Ms(a=1,{kind:t="oak"}={}){const e=new Te(a),i=new et,n=e.float(.9,1.35);if(t==="pine"){const s=e.float(7.4,10.5),o=F(e.chance(.5)?"#4b3728":"#423124",{rough:.96}),r=L(gi(.17,.34,s,6),o,0,s/2,0);r.rotation.z=e.float(-.045,.045),i.add(r);for(let u=0;u<3;u++){const f=e.float(0,Math.PI*2),g=e.float(s*.32,s*.62),v=L(gi(.03,.075,e.float(.5,1),4),F("#3b2c20"),Math.cos(f)*.24,g,Math.sin(f)*.24);v.rotation.set(Math.PI/2.1,0,-f),i.add(v)}const c=4+Math.floor(e.float(0,1.99)),l=F("#32512e",{rough:.97}),h=F("#3d6136",{rough:.97});for(let u=0;u<c;u++){const f=u/c,g=(1.9-f*1.35)*e.float(.88,1.12),v=(2.6-f*1.1)*e.float(.9,1.1),p=s*.34+s*.66*(u/c)*.92,m=L(new Bt(g,v,7),u%2?h:l,0,p,0);m.rotation.y=e.float(0,Math.PI),m.rotation.z=e.float(-.05,.05),i.add(m)}const d=L(new Bt(.42,1.5,6),l,0,s+.35,0);i.add(d)}else if(t==="birch"){const s=e.float(7,9.6),o=F("#d9d6c8",{rough:.85}),r=L(gi(.11,.2,s,6),o,0,s/2,0);r.rotation.z=e.float(-.07,.07),i.add(r);const c=F("#2c2823",{rough:.9});for(let d=0;d<3;d++){const u=e.float(s*.12,s*.8),f=L(gi(.135,.14,e.float(.05,.12),6),c,0,u,0);f.rotation.z=r.rotation.z,i.add(f)}const l=F("#7c9a4e",{rough:.95}),h=F("#93ad5c",{rough:.95});for(let d=0;d<5;d++){const u=e.float(0,Math.PI*2),f=e.float(.3,1.5),g=e.float(.9,1.6),v=L(new Pn(g,0),d%2?l:h,Math.cos(u)*f,s*.72+e.float(-.4,1.7),Math.sin(u)*f);v.rotation.set(e.float(0,3),e.float(0,3),e.float(0,3)),v.scale.y=.82,i.add(v)}}else if(t==="dead"){const s=il(e,{height:5.6,rTop:.13,rBottom:.36,color:"#3a322a",lean:.08});i.add(s);const o=F("#332c25",{rough:.96});for(let r=0;r<6;r++){const c=e.float(0,Math.PI*2),l=e.float(1.6,3.2),h=e.float(2.4,5.2),d=L(gi(.025,.11,l,4),o,Math.cos(c)*l*.28,h,Math.sin(c)*l*.28);d.rotation.set(Math.PI/2-e.float(.5,1.1),0,-c),i.add(d)}}else{const s=e.float(4.2,5.8);i.add(il(e,{height:s,rTop:.3,rBottom:.56,color:e.chance(.5)?"#523a26":"#4631225".slice(0,7)}));const o=F("#463122",{rough:.95});for(let d=0;d<3;d++){const u=d/3*Math.PI*2+e.float(-.5,.5),f=e.float(1.7,2.7),g=L(gi(.09,.19,f,5),o,Math.cos(u)*f*.3,s*.86+e.float(0,.5),Math.sin(u)*f*.3);g.rotation.set(Math.PI/2-e.float(.45,.85),0,-u),i.add(g)}const r=F("#4a7440",{rough:.96}),c=F("#5d8a4c",{rough:.96}),l=F("#3f6638",{rough:.96}),h=5+Math.floor(e.float(0,2));for(let d=0;d<h;d++){const u=e.float(0,Math.PI*2),f=e.float(.3,2.1),g=e.float(1.5,2.6),v=[r,c,l][d%3],p=L(new Pn(g,0),v,Math.cos(u)*f,s*.95+e.float(-.2,2.1),Math.sin(u)*f);p.rotation.set(e.float(0,3),e.float(0,3),e.float(0,3)),p.scale.set(1,e.float(.7,.95),1),i.add(p)}}return i.scale.setScalar(n),i.rotation.y=e.float(0,Math.PI*2),i}function O0(a=1){const t=new Te(a),e=new et,i=["#43663a","#4f7a41","#3a5a33"],n=3+Math.floor(t.float(0,3));for(let s=0;s<n;s++){const o=F(i[s%i.length],{rough:.97}),r=t.float(.45,.95),c=L(new Pn(r,0),o,t.float(-.55,.55),r*.72,t.float(-.55,.55));c.rotation.set(t.float(0,3),t.float(0,3),t.float(0,3)),c.scale.y=t.float(.7,.95),e.add(c)}for(let s=0;s<2;s++){const o=t.float(0,Math.PI*2),r=L(Oe(.015,.035,t.float(.7,1.2),4),F("#3c2e21"),Math.cos(o)*.3,.55,Math.sin(o)*.3);r.rotation.set(t.float(-.4,.4),0,Math.cos(o)*.5),e.add(r)}return e}function B0(a=1){const t=new Te(a),e=new et,i=F(t.chance(.5)?"#3f6a37":"#4d7a3f",{rough:.98}),n=6+Math.floor(t.float(0,3));for(let s=0;s<n;s++){const o=s/n*Math.PI*2+t.float(-.3,.3),r=t.float(.7,1.15),c=t.float(.5,1),l=L(new Bt(.13,r,4),i,0,r*.42,0);l.scale.z=.28,l.rotation.set(c*Math.cos(o),o,c*Math.sin(o)),l.position.x=Math.cos(o)*r*.28,l.position.z=Math.sin(o)*r*.28,l.castShadow=!1,e.add(l)}return e}function H0(a=1){const t=new Te(a),e=new et,i=F("#6f7b3c",{rough:1}),n=F("#8a7a45",{rough:1}),s=4+Math.floor(t.float(0,3));for(let o=0;o<s;o++){const r=t.float(.9,1.9),c=t.float(0,Math.PI*2),l=t.float(0,.28),h=Math.cos(c)*l,d=Math.sin(c)*l,u=L(gi(.012,.022,r,3),i,h,r/2,d);if(u.rotation.z=t.float(-.12,.12),u.castShadow=!1,e.add(u),t.chance(.45)){const f=L(new Bt(.045,.26,4),n,h,r+.1,d);f.castShadow=!1,e.add(f)}}return e}function Bi(a=1,t=1){const e=new Te(a),i=new et,n=F(e.chance(.5)?"#8b8880":"#78756e",{rough:.96}),s=new mi(1,0),o=s.attributes.position,r=e.float(.7,1.25),c=e.float(.5,1),l=e.float(.7,1.25);for(let u=0;u<o.count;u++)o.setXYZ(u,o.getX(u)*r*e.float(.85,1.15),o.getY(u)*c,o.getZ(u)*l*e.float(.85,1.15));s.computeVertexNormals();const h=L(s,n);h.rotation.set(e.float(-.12,.12),e.float(0,6.28),e.float(-.12,.12)),i.add(h);const d=Math.floor(e.float(0,2));for(let u=0;u<d;u++){const f=e.float(0,Math.PI*2),g=e.float(.16,.4),v=L(new mi(g,0),n,Math.cos(f)*e.float(.6,1.1),g*.4,Math.sin(f)*e.float(.6,1.1));v.rotation.set(e.float(0,3),e.float(0,3),e.float(0,3)),i.add(v)}if(e.chance(.45)){const u=new qt(e.float(.35,.6),5,2,0,Math.PI*2,0,Math.PI*.5),f=L(u,F("#54663a",{rough:1}),e.float(-.15,.15),c*.72,e.float(-.15,.15));f.scale.y=.32,i.add(f)}return i.scale.setScalar(t),i}function G0(){const a=new et,t=F("#e8e6df",{rough:.8}),e=F("#b9bcc0",{rough:.85}),i=L(new qt(.16,6,5),t,0,0,0);i.scale.set(1,.85,2.1),a.add(i);const n=L(new qt(.1,6,5),t,0,.03,.26);a.add(n);const s=L(new Bt(.03,.14,4),F("#c9a03e"),0,.02,.4);s.rotation.x=Math.PI/2,a.add(s);for(const r of[-1,1]){const c=L(new Xe(.62,.03,.22),e,r*.34,.04,-.02);c.rotation.z=r*.12,a.add(c);const l=L(new Xe(.22,.03,.16),F("#4a4d52"),r*.68,.04,-.02);a.add(l)}const o=L(new Xe(.16,.03,.24),e,0,.02,-.34);return a.add(o),a.traverse(r=>{r.isMesh&&(r.castShadow=!1,r.receiveShadow=!1)}),a}function Ua(a={}){const{skin:t="#d3a67e",tunic:e="#6b4a2f",pants:i="#3e342a",boots:n="#2f2823",hair:s="#3b2a1c",cloak:o=null,hood:r=null,beard:c=!1,scar:l=!1,bulk:h=1,eyeColor:d=null,armor:u=null}=a,f=new et,g=1.12,v=.72*h,p=.6*h,m=new et;m.position.y=0,f.add(m);const y=L(St(p,v,.34*h),F(e),0,g,0);if(m.add(y),u){const B=L(St(p+.05,v*.8,.38*h),F(u,{metal:.72,rough:.42}),0,g+.02,0);m.add(B);const q=L(St(p+.02,.12,.4*h),F("#3a2a1b"),0,g-v*.44,0);m.add(q)}else{const B=L(St(p+.02,.11,.37*h),F("#4a3524"),0,g-v*.42,0);m.add(B);const q=L(St(.13,.13,.05),F("#b8913f",{metal:.8,rough:.35}),0,g-v*.42,.19);m.add(q)}const x=L(new Wt(.09,.11,.13,6),F(t),0,g+v/2+.05,0);m.add(x);const w=new et;w.position.y=g+v/2+.24,m.add(w);const R=L(new qt(.21,8,7),F(t),0,0,0);w.add(R);const E=L(new qt(.225,8,6,0,Math.PI*2,0,Math.PI*.62),F(s),0,.025,0);if(w.add(E),c){const B=L(new Bt(.14,.3,6),F(s),0,-.16,.09);B.rotation.x=Math.PI,w.add(B)}const T=F(d||"#1a1410",{emissive:d||"#000000",emissiveIntensity:d?1.6:0,rough:.2});for(const B of[-1,1]){const q=L(new qt(.033,6,5),T,B*.085,.02,.19);q.castShadow=!1,w.add(q)}if(l){const B=L(St(.025,.19,.02),F("#8c4b42"),.1,.03,.2);B.rotation.z=.32,w.add(B)}const A=[],I=[],_=[];for(const B of[-1,1]){const q=new et;q.position.set(B*(p/2+.09),g+v/2-.08,0);const G=L(gi(.075,.065,.36,6),F(e),0,-.18,0);q.add(G);const K=new et;K.position.y=-.36,q.add(K);const X=L(gi(.065,.058,.34,6),F(t),0,-.17,0);K.add(X);const ct=L(new qt(.075,6,5),F(t),0,-.36,0);K.add(ct);const dt=new et;dt.position.set(0,-.36,0),K.add(dt),m.add(q),A.push(q),I.push(K),_.push(dt)}const M=[],P=[];for(const B of[-1,1]){const q=new et;q.position.set(B*.17,.78,0);const G=L(gi(.1,.09,.42,6),F(i),0,-.21,0);q.add(G);const K=new et;K.position.y=-.42,q.add(K);const X=L(gi(.088,.075,.34,6),F(i),0,-.17,0);K.add(X);const ct=L(St(.17,.1,.28),F(n),0,-.36,.05);K.add(ct),m.add(q),M.push(q),P.push(K)}let O=null;if(o){const B=new Wt(.34*h,.46*h,1.05,8,1,!0,Math.PI*.62,Math.PI*1.76);O=L(B,F(o,{side:we,rough:.92}),0,g-.18,-.03),O.castShadow=!0,m.add(O);const q=new Wt(.3*h,.34*h,.16,8,1,!0,Math.PI*.55,Math.PI*1.9),G=L(q,F(o,{side:we,rough:.9}),0,g+v/2-.02,-.02);m.add(G)}if(r){const B=L(new Bt(.27,.42,7),F(r,{rough:.94}),0,.14,-.03);B.rotation.x=-.15,w.add(B);const q=L(new Wt(.3,.34,.16,7),F(r),0,g+v/2+.1,0);m.add(q)}return f.userData.height=1.85*Math.min(1.15,h),{group:f,parts:{body:m,head:w,arms:A,legs:M,forearms:I,hands:_,shins:P,torso:y,cloak:O}}}function Rs({blade:a="#cdd6dd",guard:t="#b08a3e",grip:e="#3a2a1c",glow:i=null}={}){const n=new et,s=F(a,{metal:.92,rough:.22,emissive:i||"#000000",emissiveIntensity:i?.7:0}),o=L(St(.075,1.05,.022),s,0,.72,0);n.add(o);const r=L(new Bt(.055,.2,4),s,0,1.33,0);n.add(r);const c=L(St(.3,.06,.08),F(t,{metal:.85,rough:.35}),0,.19,0);n.add(c);const l=L(new Wt(.035,.04,.24,6),F(e),0,.05,0);n.add(l);const h=L(new qt(.055,6,5),F(t,{metal:.85,rough:.35}),0,-.09,0);if(n.add(h),i){const d=new Ne(i,1.4,4.5,2);d.position.y=.8,n.add(d)}return n}function V0(a="#6d5a3d"){const t=new et,e=L(new Wt(.34,.34,.06,8),F(a,{rough:.8}),0,0,0);e.rotation.x=Math.PI/2,t.add(e);const i=L(new qt(.1,7,6),F("#9c8a6a",{metal:.6,rough:.45}),0,0,.06);t.add(i);const n=L(new hi(.34,.028,5,12),F("#4c3d2a",{metal:.5,rough:.5}),0,0,.01);return t.add(n),t}function Zl(a=1){const t=new Te(a),e=new et,i=F(t.chance(.5)?"#4a443c":"#57504a",{rough:.95}),n=F("#332f2a",{rough:.95}),s=new et;e.add(s);const o=L(St(.44,.44,1.05),i,0,.72,0);s.add(o);const r=L(St(.42,.38,.35),i,0,.72,-.58);s.add(r);const c=L(St(.28,.3,.3),i,0,.85,.58);s.add(c);const l=new et;l.position.set(0,.9,.78),s.add(l);const h=L(St(.3,.28,.36),i,0,0,0);l.add(h);const d=L(St(.16,.15,.26),n,0,-.06,.28);l.add(d);const u=L(St(.08,.06,.05),F("#1b1815"),0,-.03,.42);l.add(u);for(const v of[-1,1]){const p=L(new Bt(.075,.2,4),n,v*.11,.2,-.02);l.add(p);const m=L(new qt(.032,5,4),F("#d8a13a",{emissive:"#e0a33c",emissiveIntensity:1.1}),v*.13,.04,.16);m.castShadow=!1,l.add(m)}const f=L(new Bt(.11,.55,5),n,0,.92,-.82);f.rotation.x=-.85,s.add(f);const g=[];for(const[v,p]of[[-1,1],[1,1],[-1,-1],[1,-1]]){const m=new et;m.position.set(v*.17,.58,p*.34);const y=L(new Wt(.065,.055,.55,5),i,0,-.27,0);m.add(y);const x=L(St(.14,.09,.19),n,0,-.55,.03);m.add(x),s.add(m),g.push({pivot:m,front:p>0,side:v})}return e.userData.height=1.15,{group:e,parts:{body:s,head:l,legs:g,tail:f}}}function W0(){const a=new et,t=new et;a.add(t);const e=F("#7b776e",{rough:.95}),i=F("#5c5952",{rough:.96}),n=F("#54704a",{rough:.98}),s=F("#8fe0c8",{emissive:"#4fe0b8",emissiveIntensity:1.8,rough:.3}),o=L(new mi(.85,0),e,0,1.85,0);o.scale.set(1,1.15,.85),t.add(o);for(let g=0;g<4;g++){const v=L(St(.07,.5-g*.08,.06),s,-.3+g*.2,1.8+g%2*.2,.72);v.rotation.z=.3-g*.2,t.add(v)}const r=L(new mi(.5,0),i,0,1,0);r.scale.set(1.1,.8,.9),t.add(r);const c=new et;c.position.set(0,2.75,.08),t.add(c);const l=L(new mi(.42,0),i,0,0,0);l.scale.set(1,.9,.95),c.add(l);for(const g of[-1,1]){const v=L(new qt(.07,6,5),s,g*.15,.03,.36);v.castShadow=!1,c.add(v)}const h=L(new Pn(.3,0),n,.3,.25,-.1);c.add(h);const d=[];for(const g of[-1,1]){const v=new et;v.position.set(g*.95,2.35,0);const p=L(new mi(.34,0),e,0,-.42,0);p.scale.set(1,1.5,1),v.add(p);const m=L(new mi(.3,0),i,0,-1,0);m.scale.set(1,1.35,1),v.add(m);const y=L(new mi(.36,0),e,0,-1.42,0);v.add(y),t.add(v),d.push(v)}const u=[];for(const g of[-1,1]){const v=new et;v.position.set(g*.34,1,0);const p=L(new mi(.28,0),i,0,-.28,0);p.scale.set(1,1.3,1),v.add(p);const m=L(new mi(.24,0),e,0,-.68,0);m.scale.set(1,1.4,1),v.add(m);const y=L(St(.42,.2,.56),i,0,-1,.06);v.add(y),t.add(v),u.push(v)}const f=new Ne("#6fe0c0",2.2,8,2);return f.position.y=1.9,a.add(f),a.userData.height=3.2,{group:a,parts:{body:t,head:c,arms:d,legs:u,golem:!0}}}function q0(){const a=new et,t=new et;a.add(t);const e=F("#4c5a3c",{rough:.9}),i=F("#37422c",{rough:.92}),n=F("#6f8a52",{emissive:"#2f4a22",emissiveIntensity:.5,rough:.5}),s=L(new qt(.72,9,7),e,0,.95,0);s.scale.set(1.15,.86,1.05),t.add(s);const o=L(new qt(.5,8,6),i,0,1.05,-.45);o.scale.set(1.2,.7,.9),t.add(o);const r=new et;r.position.set(0,1.22,.62),t.add(r);const c=L(new qt(.42,8,6),e,0,0,0);c.scale.set(1.1,.8,1.05),r.add(c);const l=L(St(.42,.12,.16),F("#1c2318"),0,-.12,.36);r.add(l);for(const f of[-1,1]){const g=L(new qt(.09,6,5),F("#d8e06a",{emissive:"#c8e04a",emissiveIntensity:1.8}),f*.17,.12,.32);g.castShadow=!1,r.add(g);const v=L(new Bt(.09,.34,4),i,f*.26,.34,-.05);v.rotation.z=f*.5,r.add(v)}const h=[];for(const f of[-1,1]){const g=new et;g.position.set(f*.72,.95,.15);const v=L(Oe(.16,.1,.95,5),e,0,-.45,0);g.add(v);const p=L(new Bt(.16,.34,4),i,0,-.95,.05);p.rotation.x=Math.PI,g.add(p),t.add(g),h.push(g)}const d=[];for(const f of[-1,1]){const g=new et;g.position.set(f*.38,.5,0);const v=L(Oe(.14,.12,.5,5),i,0,-.25,0);g.add(v);const p=L(St(.3,.12,.44),i,0,-.5,.08);g.add(p),t.add(g),d.push(g)}const u=L(new qt(.16,6,5),n,.3,1.15,.42);return u.scale.set(1.4,.5,1.1),t.add(u),a.userData.height=1.7,{group:a,parts:{body:t,head:r,arms:h,legs:d,lurker:!0}}}function j0(){const a=F("#cfc6ae",{rough:.72}),t=F("#a99c82",{rough:.8}),e=new et,i=new et;e.add(i);const n=L(new Wt(.06,.06,.55,5),a,0,1.12,0);i.add(n);for(let u=0;u<4;u++){const f=L(new hi(.17-u*.012,.022,4,8,Math.PI*1.35),a,0,1.28-u*.11,0);f.rotation.x=Math.PI/2,f.rotation.z=Math.PI*.32,i.add(f)}const s=L(St(.3,.14,.2),t,0,.8,0);i.add(s);const o=new et;o.position.y=1.52,i.add(o);const r=L(new qt(.17,7,6),a,0,0,0);r.scale.set(1,1.05,1.12),o.add(r);const c=L(St(.2,.08,.17),t,0,-.13,.04);o.add(c);const l=F("#7fe0c0",{emissive:"#59e0b6",emissiveIntensity:2.2,rough:.2});for(const u of[-1,1]){const f=L(new qt(.045,6,5),l,u*.07,.02,.15);f.castShadow=!1,o.add(f)}const h=[];for(const u of[-1,1]){const f=new et;f.position.set(u*.22,1.36,0);const g=L(new Wt(.038,.034,.38,5),a,0,-.19,0);f.add(g);const v=L(new Wt(.033,.03,.36,5),a,0,-.55,0);f.add(v);const p=L(St(.09,.1,.06),t,0,-.75,0);f.add(p),i.add(f),h.push(f)}const d=[];for(const u of[-1,1]){const f=new et;f.position.set(u*.12,.79,0);const g=L(new Wt(.048,.042,.42,5),a,0,-.21,0);f.add(g);const v=L(new Wt(.042,.036,.4,5),a,0,-.6,0);f.add(v);const p=L(St(.11,.06,.22),t,0,-.81,.05);f.add(p),i.add(f),d.push(f)}return e.userData.height=1.75,{group:e,parts:{body:i,head:o,arms:h,legs:d,skeleton:!0}}}function ws(){const a=new et;F("#6a6660",{rough:.95});for(let c=0;c<9;c++){const l=c/9*Math.PI*2,h=Bi(c+4,.22);h.position.set(Math.cos(l)*.72,.08,Math.sin(l)*.72),a.add(h)}const t=F("#3f2b1b");for(let c=0;c<4;c++){const l=c/4*Math.PI,h=L(new Wt(.09,.11,1.15,5),t,0,.16,0);h.rotation.z=Math.PI/2,h.rotation.y=l,a.add(h)}const e=new Se({color:"#ffb04a",transparent:!0,opacity:.9}),i=new gt(new Bt(.32,.95,6),e);i.position.y=.6,i.castShadow=!1,a.add(i);const n=new Se({color:"#ffe1a0",transparent:!0,opacity:.95}),s=new gt(new Bt(.16,.6,5),n);s.position.y=.45,a.add(s);const o=new Ne("#ff9a45",9,17,2);o.position.y=1.15,o.castShadow=!1,a.add(o);let r=0;return{group:a,light:o,update(c){r+=c;const l=.85+Math.sin(r*8.3)*.08+Math.sin(r*3.1)*.06;i.scale.set(l,l*1.1,l),s.scale.set(l,l*1.15,l),o.intensity=7.5+Math.sin(r*6.7)*1.4+Math.sin(r*11.3)*.7}}}function X0(){const a=new et,t=F("#4a4a4e",{metal:.75,rough:.45}),e=L(St(.5,.55,.5),F("#4a3626"),0,.27,0);a.add(e);const i=L(St(.7,.28,.32),t,0,.68,0);a.add(i);const n=L(new Bt(.16,.42,4),t,.5,.68,0);return n.rotation.z=-Math.PI/2,a.add(n),a}function $0(){const a=new et,t=F("#5b5650",{rough:.96}),e=L(St(2.1,1.9,1.6),t,0,.95,0);a.add(e);const i=L(St(.8,2.6,.8),t,.5,2.6,-.3);a.add(i);const n=new Se({color:"#ff7b2a"}),s=new gt(St(.9,.7,.1),n);s.position.set(-.35,1,.82),a.add(s);const o=new Ne("#ff7a35",6,13,2);return o.position.set(0,1.4,1.3),a.add(o),{group:a,light:o}}function nl(){const a=new et,t=F("#6d6961",{rough:.95}),e=L(new Wt(1.05,1.1,.85,10),t,0,.42,0);a.add(e);const i=new gt(new Wt(.86,.86,.06,10),F("#22343c",{rough:.15,metal:.6}));i.position.y=.8,a.add(i);const n=F("#4c3626");for(const r of[-1,1]){const c=L(St(.14,2.1,.14),n,r*.85,1.85,0);a.add(c)}const s=L(St(2,.14,.16),n,0,2.9,0);a.add(s);const o=L(new Bt(1.5,.75,4),F("#5a3f30"),0,3.35,0);return o.rotation.y=Math.PI/4,o.scale.set(1,1,.7),a.add(o),a}function bs(){const a=new et,t=F("#4e3823",{rough:.94}),e=L(new Wt(.11,.13,2.6,6),t,0,1.3,0);a.add(e);const i=[{r:.4,label:0},{r:2.5,label:1},{r:4.4,label:2}];for(const n of i){const s=L(St(1.1,.26,.07),t,Math.cos(n.r)*.5,2.2-n.label*.32,Math.sin(n.r)*.5);s.rotation.y=-n.r,a.add(s)}return a}function Yn(a=4,t=3){const e=new Te(t),i=new et,n=F("#58402b",{rough:.95}),s=Math.max(2,Math.round(a/1.1));for(let o=0;o<s;o++){const r=L(St(.11,e.float(1,1.35),.11),n,(o/(s-1)-.5)*a,.58,0);r.rotation.z=e.float(-.05,.05),i.add(r)}for(const o of[.5,.95]){const r=L(St(a,.08,.06),n,0,o,0);i.add(r)}return i}function sl(a="#5b4a35"){const t=new et,e=F(a,{rough:.96,side:we}),i=L(new Bt(1.5,2.2,4),e,0,1.1,0);i.rotation.y=Math.PI/4,i.scale.set(1,1,.9),t.add(i);const n=L(new Wt(.05,.05,2.6,5),F("#42301f"),0,1.3,0);return t.add(n),t}function Mn(){const a=new et,t=F("#5a4029",{rough:.9}),e=L(new Wt(.36,.32,.9,9),t,0,.45,0);a.add(e);for(const i of[.16,.75]){const n=L(new hi(.36,.025,4,10),F("#3c3a36",{metal:.7,rough:.5}),0,i,0);n.rotation.x=Math.PI/2,a.add(n)}return a}function tn(a=.8){const t=new et,e=F("#6a4d31",{rough:.94}),i=L(St(a,a,a),e,0,a/2,0);t.add(i);const n=F("#4a3524");for(const[s,o]of[[-1,-1],[1,-1],[-1,1],[1,1]]){const r=L(St(.07,a+.02,.07),n,s*a/2,a/2,o*a/2);t.add(r)}return t}function Ge({locked:a=!1}={}){const t=new et,e=F("#5b3c22",{rough:.88}),i=F("#8f7a45",{metal:.75,rough:.42}),n=L(St(1,.55,.62),e,0,.28,0);t.add(n);const s=L(new Wt(.31,.31,1,8,1,!1,0,Math.PI),e,0,.55,0);s.rotation.z=Math.PI/2,s.rotation.y=Math.PI/2,t.add(s);for(const c of[-.32,.32]){const l=L(St(.09,.6,.66),i,c,.4,0);t.add(l)}const o=L(St(.18,.22,.08),i,0,.42,.33);t.add(o);let r=null;return a||(r=new Ne("#e2b878",1.6,3.6,2),r.position.y=.8,t.add(r)),t.userData.locked=a,t.userData.lid=s,t.userData.glow=r,t}function en(a=2.4,t=2){const e=new Te(t),i=new Xe(.85,a,.7,1,3,1),n=i.attributes.position;for(let o=0;o<n.count;o++)n.setXYZ(o,n.getX(o)+e.float(-.07,.07),n.getY(o),n.getZ(o)+e.float(-.06,.06));i.computeVertexNormals();const s=L(i,F("#66645c",{rough:.96}),0,a/2,0);return s.rotation.y=e.float(0,1),s}function K0(){const a=new et,t=F("#5f5c55",{rough:.96});for(const s of[-1,1]){const o=L(St(1.1,5.4,1.1),t,s*2.2,2.7,0);a.add(o);const r=L(St(1.4,.4,1.4),t,s*2.2,5.5,0);a.add(r)}const e=L(St(6.4,.9,1.2),t,0,6,0);a.add(e);const i=new gt(St(4.2,.16,.1),new Se({color:"#7fd8c0"}));i.position.set(0,5.5,.62),a.add(i);const n=new Ne("#5fd0b0",3.5,12,2);return n.position.y=4.6,a.add(n),a}function Y0(a=4){const t=new et,e=F("#6a6760",{rough:.95}),i=L(new Wt(.45,.52,a,7),e,0,a/2,0);t.add(i);const n=L(St(1.1,.3,1.1),e,0,a,0);return t.add(n),t}function Ss(a="#66d6c4",t=1){const e=new et,i=new Pe({color:a,emissive:a,emissiveIntensity:1.7,transparent:!0,opacity:.88,roughness:.2,metalness:.2,flatShading:!0});for(let s=0;s<3;s++){const o=new gt(new Bt(.22*t,1.1*t,5),i);o.position.set(Math.cos(s*2.1)*.22*t,(.55+Math.random()*.1)*t,Math.sin(s*2.1)*.22*t),o.rotation.z=Math.cos(s*2.1)*.24,o.rotation.x=Math.sin(s*2.1)*.24,o.castShadow=!1,e.add(o)}const n=new Ne(a,2.2,7,2);return n.position.y=.8*t,e.add(n),e}function Ni(a=5){const t=new et,e=Bi(a,.95);t.add(e);const i=F("#8a939c",{metal:.85,rough:.35,emissive:"#3a4d5c",emissiveIntensity:.35}),n=new Te(a+9);for(let s=0;s<6;s++){const o=L(new Ir(n.float(.11,.2),0),i),r=n.float(0,Math.PI*2),c=n.float(.3,.85);o.position.set(Math.cos(r)*c,n.float(.2,.9),Math.sin(r)*c),o.rotation.set(n.float(0,3),n.float(0,3),n.float(0,3)),t.add(o)}return t}function fi(a=4){const t=new et,e=new Te(a),i=F("#3f6a35"),n=F("#5f9a4a",{rough:.9}),s=F("#e4c96a",{emissive:"#7a6a22",emissiveIntensity:.5});for(let o=0;o<5;o++){const r=e.float(0,Math.PI*2),c=e.float(0,.4),l=e.float(.3,.52),h=L(new Wt(.015,.02,l,4),i,Math.cos(r)*c,l/2,Math.sin(r)*c);t.add(h);const d=L(new qt(.07,5,4),n,Math.cos(r)*c,l*.6,Math.sin(r)*c);d.scale.set(1.7,.45,1.1),t.add(d);const u=L(new qt(.06,5,4),s,Math.cos(r)*c,l,Math.sin(r)*c);t.add(u)}return t}function nn(a="#7a2f2f"){const t=new et,e=L(new Wt(.05,.06,3,5),F("#3e2d1d"),0,1.5,0);t.add(e);const i=L(St(.9,1.4,.04),F(a,{rough:.95,side:we}),.47,2.2,0);t.add(i);const n=L(new Bt(.08,.26,4),F("#9a8b5f",{metal:.7,rough:.4}),0,3.1,0);return t.add(n),t}function wn(a=7){const t=new et,e=new Te(a),i=F("#cfc5ac",{rough:.8});for(let s=0;s<5;s++){const o=L(new Wt(.05,.05,e.float(.4,.8),5),i,e.float(-.5,.5),.06,e.float(-.5,.5));o.rotation.set(Math.PI/2+e.float(-.4,.4),e.float(0,3),e.float(-.4,.4)),t.add(o)}const n=L(new qt(.17,6,5),i,.2,.16,.15);return n.scale.set(1,1.05,1.15),t.add(n),t}function Z0(a=8){const t=new et,e=new Te(a),i=F(e.chance(.5)?"#5e5b55":"#696660",{rough:.96}),n=L(St(.7,e.float(.9,1.5),.16),i,0,.55,0);n.rotation.z=e.float(-.12,.12),n.rotation.x=e.float(-.08,.08),t.add(n);const s=L(new qt(.7,6,4),F("#3f3a30",{rough:1}),0,.05,-.8);return s.scale.set(1,.22,1.4),t.add(s),t}function J0(a="#8b5fd6"){const t=new et,e=new Pe({color:"#4a3a58",emissive:a,emissiveIntensity:1.5,roughness:.5,metalness:.4}),i=new gt(new hi(2.4,.18,8,24),e);i.position.y=3,i.castShadow=!1,t.add(i);const n=new gt(new Ns(2.3,24),new Se({color:a,transparent:!0,opacity:.22,side:we}));n.position.y=3,t.add(n);const s=new Ne(a,5,16,2);s.position.y=3,t.add(s);let o=0;return{group:t,update(r){o+=r,n.material.opacity=.16+Math.sin(o*1.8)*.07,i.rotation.z=Math.sin(o*.4)*.05}}}function wo(){const a=new et,t=F("#6d6a62",{rough:.95}),e=L(new Wt(1.2,1.35,.4,8),t,0,.2,0);a.add(e);for(let c=0;c<3;c++){const l=c/3*Math.PI*2,h=L(new Wt(.16,.2,1.7,6),t,Math.cos(l)*.62,1.2,Math.sin(l)*.62);a.add(h)}const i=L(new Wt(.55,.32,.35,8),t,0,2.1,0);a.add(i);const n=new Se({color:"#9fe8d8",transparent:!0,opacity:.9}),s=new gt(new Bt(.24,.7,6),n);s.position.y=2.6,a.add(s);const o=new Ne("#7fe8d0",5,12,2);o.position.y=2.7,a.add(o);let r=0;return{group:a,light:o,update(c){r+=c,s.scale.setScalar(.9+Math.sin(r*7)*.08),o.intensity=4.2+Math.sin(r*5.3)*.8}}}function Q0(){const a=new et,t=F("#5b4227",{rough:.9,side:we}),e=L(new Wt(.8,.55,3.2,8,1,!0,0,Math.PI),t,0,.55,0);e.rotation.z=Math.PI/2,e.rotation.y=Math.PI/2,a.add(e);const i=L(St(1,.1,.4),F("#4a3524"),0,.62,0);return a.add(i),a}function tg(){const a=new et,t=F("#4a3626",{rough:.95}),e=L(new Wt(.14,.18,2.4,6),t,0,1.2,0);a.add(e);const i=F("#d3cbb4",{rough:.8}),n=L(St(.44,.36,.5),i,0,2.55,0);a.add(n);const s=L(St(.22,.18,.3),i,0,2.46,.36);a.add(s);for(const o of[-1,1]){const r=L(new Bt(.09,.22,4),i,o*.16,2.82,-.05);a.add(r);const c=L(new qt(.04,5,4),F("#d24a2a",{emissive:"#ff5324",emissiveIntensity:1.6}),o*.13,2.6,.24);a.add(c)}return a}function eg({h:a=17}={}){const t=new et,e=F("#8d8a80",{rough:.92}),i=F("#d8d3c4",{rough:.88}),n=F("#8c3b31",{rough:.9}),s=L(Oe(3.6,4.3,2.4,10),e,0,1.2,0);t.add(s);const o=6;for(let v=0;v<o;v++){const p=2.4+v*a/o,m=3-(v+1)/o*1.15,y=3-v/o*1.15,x=L(Oe(m,y,a/o,10),v%2?i:n,0,p+a/o/2,0);t.add(x)}const r=2.4+a,c=L(Oe(2.5,2.5,.28,10),F("#4a453c"),0,r+.14,0);t.add(c);for(let v=0;v<10;v++){const p=v/10*Math.PI*2;t.add(L(Oe(.05,.05,.8,4),F("#3d3931"),Math.cos(p)*2.36,r+.66,Math.sin(p)*2.36))}const l=L(new hi(2.36,.05,4,12),F("#3d3931"),0,r+1.05,0);l.rotation.x=Math.PI/2,t.add(l);const h=new Pe({color:"#ffd79a",emissive:"#ffbe63",emissiveIntensity:1.6,roughness:.25,transparent:!0,opacity:.9}),d=new gt(Oe(1.35,1.35,1.7,8),h);d.position.y=r+1.1,t.add(d);for(let v=0;v<6;v++){const p=v/6*Math.PI*2;t.add(L(St(.09,1.8,.09),F("#3a362e"),Math.cos(p)*1.32,r+1.1,Math.sin(p)*1.32))}const u=L(new Bt(1.75,1.3,8),F("#4a3630"),0,r+2.6,0);t.add(u);const f=L(new qt(.16,6,5),F("#6d5a2e",{metal:.7,rough:.35}),0,r+3.3,0);t.add(f);const g=L(St(1,2,.16),F("#3a281c"),0,3.4,3.2);return t.add(g),t.userData.lanternY=r+1.1,t}function ig(){const a=new et,t=F("#4a3a2a",{rough:.95}),e=F("#33261b",{rough:.96}),i=new et;for(let l=0;l<7;l++){const h=-5.2+l*1.5,d=3.6-Math.abs(h)*.32,u=L(St(d,.24,1.5),l%2?t:e,0,-.9-Math.abs(h)*.06,h);u.rotation.z=.06,i.add(u)}for(const l of[-1,1])for(let h=0;h<5;h++){const d=-4+h*2,u=1.9-Math.abs(d)*.14;i.add(L(St(.16,u,2),e,l*(1.7-Math.abs(d)*.14),-.1+u/2,d))}const n=L(new Bt(.9,3.2,5),t,0,.4,5.6);n.rotation.x=Math.PI/2.3,i.add(n);const s=L(Oe(.16,.26,7.5,6),e,.3,2.6,-.4);s.rotation.z=.42,i.add(s);const o=L(Oe(.08,.1,4.4,5),e,1.1,4.6,-.9);o.rotation.z=Math.PI/2.1,i.add(o);const r=L(new fn(3.2,2.2,3,2),F("#b7ae95",{rough:1,side:we}),.9,3.4,-.7);r.rotation.y=.2,r.rotation.z=.15,i.add(r),i.rotation.set(.16,.5,-.28),a.add(i);const c=L(Oe(.42,.46,1,8),F("#5a4028"),3.4,.5,2.2);return c.rotation.z=Math.PI/2.2,a.add(c),a}function al(){const a=new et,t=F("#4d3a26",{rough:.95}),e=F("#b8ab8c",{rough:1});for(const s of[-1,1])for(const o of[-1,1]){const r=L(Oe(.08,.1,2.1,5),t,s*1.1,1.05,o*.5);r.rotation.z=s*.04,a.add(r)}const i=L(Oe(.06,.06,2.3,5),t,0,2.05,-.5);i.rotation.z=Math.PI/2,a.add(i);const n=L(Oe(.06,.06,2.3,5),t,0,2.05,.5);n.rotation.z=Math.PI/2,a.add(n);for(let s=0;s<6;s++){const o=-.9+s*.36,r=L(Oe(.012,.012,.45,3),e,o,1.83,s%2?.5:-.5);r.castShadow=!1,a.add(r);const c=L(new qt(.12,5,4),F("#8d9aa0",{rough:.5,metal:.25}),o,1.5,s%2?.5:-.5);c.scale.set(.45,1,1.6),a.add(c)}return a}function ng(){const a=new et,t=F("#4a3624",{rough:.95});for(const n of[-1,1]){const s=L(Oe(.09,.11,2.4,5),t,n*1.3,1.2,0);a.add(s)}const e=L(Oe(.07,.07,2.6,5),t,0,2.3,0);e.rotation.z=Math.PI/2,a.add(e);const i=L(new fn(2.4,1.9,6,5),F("#7d7a63",{rough:1,side:we,transparent:!0,opacity:.82}),0,1.25,0);return a.add(i),a}function Jl(a,t=!1){const e=a[0].index!==null,i=new Set(Object.keys(a[0].attributes)),n=new Set(Object.keys(a[0].morphAttributes)),s={},o={},r=a[0].morphTargetsRelative,c=new Ce;let l=0;for(let h=0;h<a.length;++h){const d=a[h];let u=0;if(e!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in d.attributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;s[f]===void 0&&(s[f]=[]),s[f].push(d.attributes[f]),u++}if(u!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(r!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in d.morphAttributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(d.morphAttributes[f])}if(t){let f;if(e)f=d.index.count;else if(d.attributes.position!==void 0)f=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,f,h),l+=f}}if(e){let h=0;const d=[];for(let u=0;u<a.length;++u){const f=a[u].index;for(let g=0;g<f.count;++g)d.push(f.getX(g)+h);h+=a[u].attributes.position.count}c.setIndex(d)}for(const h in s){const d=ol(s[h]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,d)}for(const h in o){const d=o[h][0].length;if(d===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let u=0;u<d;++u){const f=[];for(let v=0;v<o[h].length;++v)f.push(o[h][v][u]);const g=ol(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(g)}}return c}function ol(a){let t,e,i,n=-1,s=0;for(let l=0;l<a.length;++l){const h=a[l];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=h.normalized),i!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(n===-1&&(n=h.gpuType),n!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=h.count*e}const o=new t(s),r=new ke(o,e,i);let c=0;for(let l=0;l<a.length;++l){const h=a[l];if(h.isInterleavedBufferAttribute){const d=c/e;for(let u=0,f=h.count;u<f;u++)for(let g=0;g<e;g++){const v=h.getComponent(u,g);r.setComponent(u+d,g,v)}}else o.set(h.array,c);c+=h.count*e}return n!==void 0&&(r.gpuType=n),r}const fa=new nt;function sg(a,t){let e=a.index?a.toNonIndexed():a.clone();for(const s of Object.keys(e.attributes))["position","normal"].includes(s)||e.deleteAttribute(s);e.attributes.normal||e.computeVertexNormals();const i=e.attributes.position.count,n=new Float32Array(i*3);fa.set(t);for(let s=0;s<i;s++)n[s*3]=fa.r,n[s*3+1]=fa.g,n[s*3+2]=fa.b;return e.setAttribute("color",new ke(n,3)),e}function an(a){const t=[];if(a.updateMatrixWorld(!0),a.traverse(i=>{if(!i.isMesh||!i.geometry)return;const n=i.material?.color?i.material.color.getHexString():"888888",s=sg(i.geometry,"#"+n);s.applyMatrix4(i.matrixWorld),t.push(s)}),t.length===0)return null;const e=Jl(t,!1);for(const i of t)i.dispose();return e}const ag=new Ra({vertexColors:!0});class og{constructor(t){this.scene=t,this.buckets=new Map,this.meshes=[],this.totalParts=0,this._matrix=new me}key(t,e){const i=Math.floor((t+Vt)/zi),n=Math.floor((e+Vt)/zi);return`${i},${n}`}bucket(t,e){const i=this.key(t,e);let n=this.buckets.get(i);return n||(n=[],this.buckets.set(i,n)),n}add(t,e,i,n,s=0,o=1){t.position.set(e,i,n),t.rotation.set(0,s,0),o!==1&&t.scale.setScalar(o);const r=an(t);r&&(this.bucket(e,n).push(r),this.totalParts+=1,t.traverse(c=>{c.isMesh&&c.geometry?.dispose()}))}addGeometry(t,e,i,n,s=0,o=1){const r=t.clone();this._matrix.makeRotationY(s),this._matrix.scale(new z(o,o,o)),this._matrix.setPosition(e,i,n),r.applyMatrix4(this._matrix),this.bucket(e,n).push(r),this.totalParts+=1}finalize(t=!0){for(const[e,i]of this.buckets){if(!i.length)continue;const n=i.length===1?i[0]:Jl(i,!1);if(i.length>1)for(const o of i)o.dispose();const s=new gt(n,ag);s.castShadow=t,s.receiveShadow=!0,s.matrixAutoUpdate=!1,s.updateMatrix(),s.name=`props-${e}`,s.geometry.computeBoundingSphere(),this.scene.add(s),this.meshes.push(s)}this.buckets.clear()}dispose(){for(const t of this.meshes)this.scene.remove(t),t.geometry.dispose();this.meshes.length=0}}const fe=(a,t,e)=>new Xe(a,t,e),ai=(a,t,e,i=6)=>new Wt(a,t,e,i);function Nt(a,t,e=0,i=0,n=0){const s=new gt(a,t);return s.position.set(e,i,n),s.castShadow=!0,s.receiveShadow=!0,s}class rg{constructor(t){this.game=t,this.group=new et,this.group.name="world",this.colliders=[],this.interactables=[],this.nodes=[],this.animated=[],this.propsGroup=new et,this.propsGroup.name="static-props",this.group.add(this.propsGroup),this.batcher=new og(this.propsGroup),this.rng=new Te(20260413),this.terrain=new D0(this.group),this.water=F0(),this.group.add(this.water.mesh),this._buildVillage(),this._buildTradingPost(),this._buildForgeHill(),this._buildBanditCamp(),this._buildBarrow(),this._buildRuins(),this._buildQuarry(),this._buildLake(),this._buildCastle(),this._buildHermitage(),this._buildSwamp(),this._buildPass(),this._buildCircle(),this._buildMine(),this._buildCrossroads(),this._buildHighlands(),this._buildRoadCamp(),this._buildCoast(),this._scatterNature(),this.batcher.finalize(!0),t.scene.add(this.group),this.terrain.buildInitial(t.player?.pos??new z(0,0,360))}addStatic(t,e,i,n=0,{yOffset:s=0,collide:o=null,whole:r=!1}={}){const c=j(e,i)+s;return r?(t.position.set(e,c,i),t.rotation.y=n,this.group.add(t)):this.batcher.add(t,e,c,i,n),o&&this.colliders.push({x:e,z:i,r:o}),t}addInteractive({id:t,kind:e,x:i,z:n,radius:s=3,label:o,mesh:r,data:c={},cooldown:l=0,rotY:h=0,yOffset:d=0}){const u=r??new et;u.position.set(i,j(i,n)+d,n),u.rotation.y=h,u.traverse(g=>{g.isMesh&&(g.castShadow=!0,g.receiveShadow=!0)}),this.group.add(u),(e==="resource"||e==="chest")&&this.colliders.push({x:i,z:n,r:e==="chest"?.8:.9});const f={id:t,kind:e,pos:new z(i,j(i,n),n),radius:s,label:o,mesh:u,data:c,cooldown:l,timer:0,available:!0};return this.interactables.push(f),this.nodes.push(f),f}addLight(t,e,i,n,s,o=3){const r=new Ne(t,e,i,2);return r.position.set(n,j(n,s)+o,s),this.group.add(r),r}findNearest(t){let e=null,i=1/0;for(const n of this.interactables){if(!n.available)continue;const s=re(t.x,t.z,n.pos.x,n.pos.z);s<n.radius&&s<i&&(e=n,i=s)}return e}update(t,e,i){if(this.water.update(t),this._updateGulls(t),this.beacon){const n=1-(e?.dayF??1);this.beacon.beamMat.opacity=Math.max(0,n-.22)*.38,this.beacon.lamp.intensity=1.2+n*7}e&&this._updateFireflies(t,1-(e.dayF??1));for(const n of this.animated)n.update?.(t);for(const n of this.nodes)!n.available&&n.timer>0&&(n.timer-=t,n.timer<=0&&(n.available=!0,n.mesh&&(n.mesh.visible=!0)));i&&this.terrain.update(i,t)}harvest(t){return t.available?(t.available=!1,t.timer=t.cooldown,t.mesh&&(t.mesh.visible=!1),!0):!1}_buildVillage(){const t=tt.village.x,e=tt.village.z,i=new Te(77),n=[{a:.5,r:34,w:6.2,d:5.2,wall:"#b7a17c"},{a:1.15,r:40,w:5.4,d:4.8,wall:"#a89272"},{a:2.05,r:36,w:6.4,d:5.4,wall:"#bfa987"},{a:2.8,r:42,w:5.2,d:4.6,wall:"#ad9576"},{a:3.6,r:38,w:6,d:5,wall:"#b09a78"},{a:4.3,r:44,w:5.8,d:4.8,wall:"#b7a382"},{a:5.1,r:35,w:5,d:4.4,wall:"#b3a07f"},{a:5.75,r:46,w:6.6,d:5.6,wall:"#a58f70"}];for(const h of n){const d=t+Math.cos(h.a)*h.r,u=e+Math.sin(h.a)*h.r,f=-h.a+Math.PI/2;this.addStatic(ua({w:h.w,d:h.d,wall:h.wall,roof:"#5b3d31"}),d,u,f,{collide:Math.max(h.w,h.d)*.5}),this.batcher.add(Mn(),d+Math.cos(h.a+.8)*3.4,j(d,u),u+Math.sin(h.a+.8)*3.4,i.float(0,3)),i.chance(.6)&&this.batcher.add(tn(.75),d+Math.cos(h.a-.9)*3.2,j(d,u),u+Math.sin(h.a-.9)*3.2,i.float(0,3))}const s=ws();s.group.position.set(t,j(t,e),e),this.group.add(s.group),this.animated.push(s),this.colliders.push({x:t,z:e,r:1.2}),this.addInteractive({id:"campfire_rest",kind:"rest",x:t,z:e,radius:4.2,label:"Odpocznij przy ognisku (do świtu)",mesh:null});for(let h=0;h<4;h++){const d=h/4*Math.PI*2+.5,u=new et;u.add(Nt(fe(2.6,.18,.55),F("#4e3a25"),0,.5,0));for(const v of[-.95,.95])u.add(Nt(fe(.18,.5,.45),F("#3d2d1d"),v,.25,0));const f=t+Math.cos(d)*4.6,g=e+Math.sin(d)*4.6;this.addStatic(u,f,g,-d,{collide:1.2})}this.addStatic(nl(),t-9,e+6,.4,{collide:1.5});const o=$0();o.group.position.set(t-24,j(t-24,e-10),e-10),o.group.rotation.y=1.4,this.group.add(o.group),this.animated.push(o),this.colliders.push({x:t-24,z:e-10,r:1.7}),this.addInteractive({id:"village_anvil",kind:"station",x:t-19,z:e-8,radius:3.6,label:"Kuźnia Borysa — rzemiosło",mesh:X0(),data:{station:"forge",name:"Kuźnia Borysa"}});for(let h=0;h<3;h++)this.batcher.add(tn(.6+h*.1),t-21+h*1.4,j(t-21,e-5),e-5+h%2,h);for(let h=0;h<2;h++){const d=t+16+h*6,u=e+12-h*3,f=new et;for(const[v,p]of[[-1.5,-1],[1.5,-1],[-1.5,1],[1.5,1]])f.add(Nt(ai(.08,.08,2.5,5),F("#4a3524"),v,1.25,p));const g=Nt(new Bt(2.5,.9,4),F(h===0?"#6b3f4a":"#3f5a4a"),0,2.8,0);g.rotation.y=Math.PI/4,g.scale.set(1,1,.82),f.add(g),f.add(Nt(fe(2.6,.14,1.3),F("#5a4229"),0,.95,0));for(let v=0;v<4;v++){const p=Nt(new qt(.27,6,5),F(v%2?"#8a7a5a":"#7a6647"),-.95+v*.62,1.16,.2);p.scale.y=1.3,f.add(p)}this.addStatic(f,d,u,.4,{collide:1.8})}for(let h=0;h<6;h++){const d=h*1.1;this.batcher.add(fi(20+h),t+26+Math.cos(d)*3,j(t+26,e-18),e-18+Math.sin(d)*3,d)}const r=new et;for(let h=0;h<4;h++){const d=Yn(4.4,h+2);d.rotation.y=h*Math.PI/2,d.position.set(Math.cos(h*Math.PI/2+Math.PI/4)*4.6,0,Math.sin(h*Math.PI/2+Math.PI/4)*4.6),r.add(d)}this.addStatic(r,t+26,e-18,0),this.addInteractive({id:"village_herbs",kind:"resource",x:t+24,z:e-21,radius:3,label:"Zbierz zioła",mesh:fi(91),cooldown:45,data:{item:"herbs",qty:2}});const c=e-52;for(const h of[-1,1]){const d=new et;d.add(Nt(ai(.26,.32,5,6),F("#4a3322"),0,2.5,0));const u=new gt(new Bt(.22,.75,5),new Se({color:"#ffb45c"}));u.position.y=5.1,d.add(u),this.addStatic(d,h*4.4,c,0,{collide:.6}),this.addLight("#ff9a45",4.2,14,h*4.4,c,5)}const l=[.15,.75,1.35,1.95,2.55,3.7,4.3,4.9,5.5,6.1];for(const h of l){const u=t+Math.cos(h)*54,f=e+Math.sin(h)*54;Math.abs(u-t)<7&&f<e||this.batcher.add(Yn(12,Math.floor(h*10)),u,j(u,f),f,-h+Math.PI/2)}this.batcher.add(nn("#3f5a4a"),t+8,j(t+8,c+6),c+6,-.4),this.batcher.add(nn("#6b3f4a"),t-8,j(t-8,c+6),c+6,.5),this.addInteractive({id:"village_chest",kind:"chest",x:t-30,z:e+16,radius:3.2,label:"Stara skrzynia",mesh:Ge(),rotY:.7,data:{loot:[["bread",2],["gold",35],["leather_hood",1]]}})}_buildTradingPost(){const t=tt.trading.x,e=tt.trading.z,i=new Te(303);for(let o=0;o<5;o++){const r=o/5*Math.PI*2+.3,c=t+Math.cos(r)*26,l=e+Math.sin(r)*26;this.addStatic(ua({w:5.4,d:4.6,wall:o%2?"#c2ad8a":"#b09a78",roof:o%3?"#5d4034":"#4c3a30"}),c,l,-r+Math.PI/2,{collide:3}),this.batcher.add(Mn(),c+Math.cos(r+1)*3.4,j(c,l),l+Math.sin(r+1)*3.4,i.float(0,3))}const n=new et;for(const[o,r]of[[-5,-3],[5,-3],[-5,3],[5,3]])n.add(Nt(ai(.16,.16,4.2,6),F("#4a3524"),o,2.1,r));const s=Nt(new Bt(9,2.4,4),F("#6b3f4a"),0,5.2,0);s.rotation.y=Math.PI/4,s.scale.set(1,1,.72),n.add(s);for(let o=-1;o<=1;o++){n.add(Nt(fe(3.2,.16,1.4),F("#5a4229"),o*3.4,1,0));for(let r=0;r<3;r++)n.add(Nt(new qt(.24,5,4),F(r%2?"#8a7a5a":"#77624a"),o*3.4-1+r,1.2,0))}this.addStatic(n,t,e-4,.2,{collide:5.2});for(let o=0;o<3;o++){const r=.9+o*2,c=t+Math.cos(r)*15,l=e+Math.sin(r)*15,h=new et;h.add(Nt(fe(3,.5,1.6),F("#5b432a"),0,.9,0));for(const[d,u]of[[-1,-.9],[1,-.9],[-1,.9],[1,.9]]){const f=Nt(ai(.5,.5,.12,10),F("#3f2e1d"),d,.5,u);f.rotation.x=Math.PI/2,h.add(f)}h.add(Nt(fe(1.2,.9,1.2),F("#7a6647"),.6,1.45,0)),this.addStatic(h,c,l,r,{collide:1.8})}this.addStatic(nl(),t+12,e+12,.2,{collide:1.5}),this.addStatic(bs(),t-14,e+10,.8,{collide:.5});for(let o=0;o<8;o++){const r=o/8*Math.PI*2+.2,c=t+Math.cos(r)*34,l=e+Math.sin(r)*34;Math.abs(c-t)<6&&l<e||this.batcher.add(Yn(10,40+o),c,j(c,l),l,-r+Math.PI/2)}this.addInteractive({id:"trading_station",kind:"station",x:t+2,z:e+4,radius:4.2,label:"Targ w Kotlinie — handel",mesh:null,data:{station:"market",name:"Targ w Kotlinie"}}),this.addInteractive({id:"trading_chest",kind:"chest",x:t+22,z:e-16,radius:3.2,label:"Kufer kupiecki",mesh:Ge(),rotY:-.5,data:{loot:[["gold",90],["mana_potion",2],["spark_ring",1]]}});for(let o=0;o<4;o++){const r=o*1.9+.4;this.batcher.add(fi(120+o),t+Math.cos(r)*21,j(t+Math.cos(r)*21,e+Math.sin(r)*21),e+Math.sin(r)*21,r)}this.addLight("#ffb45c",3.4,12,t+2,e+4,3.4)}_buildForgeHill(){const t=tt.forge.x,e=tt.forge.z,i=j(t,e),n=new et,s=F("#5a5a58");n.add(Nt(fe(3.4,2.8,2.6),s,0,1.4,0)),n.add(Nt(fe(1.2,3.6,1.2),s,.8,3.8,-.6));const o=new gt(fe(1.5,1.1,.14),new Se({color:"#59c8e8"}));o.position.set(-.4,1.4,1.32),n.add(o);const r=new Ne("#59c8e8",8,22,2);r.position.set(0,2,1.8),n.add(r),n.position.set(t+5,i,e-4),n.rotation.y=-.9,this.group.add(n),this.animated.push({update:()=>{r.intensity=6.5+Math.sin(performance.now()*.004)*1.6}}),this.colliders.push({x:t+5,z:e-4,r:2.4});const c=new et;c.add(Nt(fe(1.6,.75,.85),F("#3f444a",{metal:.75,rough:.4}),0,1.05,0)),c.add(Nt(ai(.48,.64,.75,6),F("#4a4a4a"),0,.38,0)),this.addInteractive({id:"ancient_anvil",kind:"station",x:t,z:e+3,radius:4,label:"Starożytna kuźnia — rzemiosło",mesh:c,data:{station:"ancient_forge",name:"Starożytna kuźnia"}});for(let d=0;d<9;d++){const u=d/9*Math.PI*2;this.batcher.add(en(2.2+d%3*.6,30+d),t+Math.cos(u)*14,j(t+Math.cos(u)*14,e+Math.sin(u)*14),e+Math.sin(u)*14,u),this.colliders.push({x:t+Math.cos(u)*14,z:e+Math.sin(u)*14,r:.7})}for(let d=0;d<4;d++){const u=.8+d*1.6,f=Ss("#6ee0d6",1.2),g=t+Math.cos(u)*9,v=e+Math.sin(u)*9;f.position.set(g,j(g,v),v),this.group.add(f)}const l=new et;l.add(Bi(741,1.4));const h=Ss("#ffd27a",.8);h.position.y=.9,l.add(h),this.addInteractive({id:"forge_shard",kind:"resource",x:t-8,z:e+7,radius:3.2,label:"Wyjmij okruch z kamiennej szczeliny",mesh:l,cooldown:999999,data:{item:"shard_dawn",qty:1,once:!0}}),this.addInteractive({id:"forge_metal",kind:"resource",x:t+10,z:e+6,radius:3,label:"Wykop starożytny metal",mesh:Ni(140),cooldown:130,data:{item:"ancient_metal",qty:1}});for(let d=0;d<3;d++){const u=-.6+d*1.9;this.addInteractive({id:`ore_hill_${d}`,kind:"resource",x:t+Math.cos(u)*19,z:e+Math.sin(u)*19,radius:3,label:"Wydobądź rudę żelaza",mesh:Ni(40+d),cooldown:55,data:{item:"iron_ore",qty:2}})}}_buildBanditCamp(){const t=tt.bandits.x,e=tt.bandits.z;for(let n=0;n<5;n++){const s=n/5*Math.PI*2+.4,o=t+Math.cos(s)*(12+n%2*6),r=e+Math.sin(s)*(12+n%2*6);this.addStatic(sl(n%2?"#5b4a35":"#4f4030"),o,r,s,{collide:1.7})}const i=ws();i.group.position.set(t,j(t,e),e),this.group.add(i.group),this.animated.push(i),this.colliders.push({x:t,z:e,r:1.2}),this.batcher.add(tg(),t+12,j(t+12,e+9),e+9,.6),this.batcher.add(nn("#7a2f2f"),t-13,j(t-13,e-4),e-4,1.2),this.batcher.add(nn("#7a2f2f"),t+3,j(t+3,e+15),e+15,-.4);for(let n=0;n<6;n++){const s=n*1.05;this.batcher.add(tn(.6+n%3*.15),t+Math.cos(s)*15,j(t+Math.cos(s)*15,e+Math.sin(s)*15),e+Math.sin(s)*15,n),this.batcher.add(Mn(),t+Math.cos(s+.4)*17,j(t+Math.cos(s+.4)*17,e+Math.sin(s+.4)*17),e+Math.sin(s+.4)*17,s)}for(let n=0;n<7;n++){const s=n*.9;this.batcher.add(Yn(8,n+5),t+Math.cos(s)*23,j(t+Math.cos(s)*23,e+Math.sin(s)*23),e+Math.sin(s)*23,-s+Math.PI/2)}this.addInteractive({id:"bandit_chest",kind:"chest",x:t-10,z:e-7,radius:3.2,label:"Skrzynia bandytów",mesh:Ge(),rotY:.5,data:{loot:[["stolen_grain",1],["old_key",1],["gold",70],["health_potion",2],["iron_ore",2]]}}),this.addInteractive({id:"bandit_ore",kind:"resource",x:t+18,z:e+14,radius:3,label:"Wydobądź rudę żelaza",mesh:Ni(77),cooldown:60,data:{item:"iron_ore",qty:2}}),this.addLight("#ff9a45",4,14,t,e,2.5)}_buildBarrow(){const t=tt.barrow.x,e=tt.barrow.z,i=j(t,e),n=new gt(new qt(15,16,16,0,Math.PI*2,0,Math.PI*.5),F("#4d4a41"));n.scale.set(1,.62,1),n.position.set(t,i-.5,e-6),n.receiveShadow=!0,n.castShadow=!0,this.group.add(n),this.colliders.push({x:t,z:e-6,r:8});for(const s of[-1,1])this.batcher.add(Nt(fe(.8,3,.8),F("#5e5a52")),t+s*1.5,j(t+s*1.5,e+9),e+9,0);this.batcher.add(Nt(fe(4,.7,1),F("#5e5a52")),t,i+3.2,e+9,0);for(let s=0;s<8;s++){const o=.3+s*.78,r=t+Math.cos(o)*19,c=e+Math.sin(o)*19;s%2?this.batcher.add(Z0(60+s),r,j(r,c),c,o):this.batcher.add(en(2+s%3*.5,70+s),r,j(r,c),c,o),this.colliders.push({x:r,z:c,r:.8})}this.batcher.add(wn(4),t-9,j(t-9,e+14),e+14,.4),this.batcher.add(wn(9),t+10,j(t+10,e+11),e+11,1.4),this.addInteractive({id:"barrow_chest",kind:"chest",x:t+4,z:e+15,radius:3.2,label:"Zapomniana skrzynia",mesh:Ge(),rotY:-.7,data:{loot:[["crystal_mana",2],["gold",55],["ancient_metal",1]]}}),this.addInteractive({id:"barrow_metal",kind:"resource",x:t-16,z:e+11,radius:3,label:"Wykop starożytny metal",mesh:Ni(123),cooldown:100,data:{item:"ancient_metal",qty:1,rare:!0}}),this.addInteractive({id:"barrow_grave_herb",kind:"resource",x:t+16,z:e-6,radius:3,label:"Zbierz zioła",mesh:fi(31),cooldown:45,data:{item:"herbs",qty:2}})}_buildRuins(){const t=tt.ruins.x,e=tt.ruins.z,i=j(t,e),n=J0("#8b5fd6");n.group.position.set(t,i,e-8),this.group.add(n.group),this.animated.push(n),this.addStatic(K0(),t,e+12,0,{collide:2.6});for(let s=0;s<8;s++){const o=s/8*Math.PI*2+.3,r=t+Math.cos(o)*26,c=e+Math.sin(o)*26;this.batcher.add(Y0(4+s%3*.9),r,j(r,c),c,o),this.colliders.push({x:r,z:c,r:.9})}for(let s=0;s<10;s++){const o=s/10*Math.PI*2,r=t+Math.cos(o)*33,c=e+Math.sin(o)*33,l=new et;l.add(Nt(fe(6,2+s%3*.9,.9),F("#615e56"),0,1.2,0)),this.addStatic(l,r,c,-o,{collide:2})}for(let s=0;s<4;s++){const o=.8+s*1.6,r=t+Math.cos(o)*20,c=e+Math.sin(o)*20,l=new et;l.add(Nt(ai(.36,.24,.42,7),F("#4a4a4a"),0,1.7,0)),l.add(Nt(ai(.1,.18,1.6,5),F("#3a3a3a"),0,.8,0));const h=new gt(new Bt(.24,.66,5),new Se({color:"#a678e8"}));h.position.y=2.15,l.add(h),this.addStatic(l,r,c,0),this.addLight("#9c6fe8",4,16,r,c,2.4)}this.batcher.add(wn(15),t+8,j(t+8,e+5),e+5,.2),this.batcher.add(wn(16),t-9,j(t-9,e-2),e-2,1.2),this.addInteractive({id:"ruins_chest",kind:"chest",x:t+17,z:e+17,radius:3.2,label:"Skrzynia strażnika",mesh:Ge(),rotY:1,data:{loot:[["ancient_metal",1],["gold",90],["might_elixir",1],["crystal_mana",1]]}}),this.addInteractive({id:"ruins_herbs",kind:"resource",x:t-21,z:e+20,radius:3,label:"Zbierz zioła",mesh:fi(55),cooldown:45,data:{item:"herbs",qty:2}})}_buildQuarry(){const t=tt.quarry.x,e=tt.quarry.z;for(let i=0;i<14;i++){const n=i/14*Math.PI*2,s=11+i%4*4,o=t+Math.cos(n)*s,r=e+Math.sin(n)*s,c=1.5+i%3*.9;this.batcher.add(Bi(200+i,c),o,j(o,r),r,n),this.colliders.push({x:o,z:r,r:c*.8})}for(let i=0;i<4;i++){const n=.5+i*1.6;this.addInteractive({id:`quarry_ore_${i}`,kind:"resource",x:t+Math.cos(n)*7,z:e+Math.sin(n)*7,radius:3.2,label:"Wydobądź rudę żelaza",mesh:Ni(300+i),cooldown:50,data:{item:"iron_ore",qty:2}})}this.batcher.add(tn(1),t+10,j(t+10,e+10),e+10,.3),this.batcher.add(Mn(),t-10,j(t-10,e+8),e+8,.9),this.addInteractive({id:"quarry_chest",kind:"chest",x:t+5,z:e-14,radius:3.2,label:"Skrzynia górników",mesh:Ge(),rotY:.3,data:{loot:[["iron_ore",4],["gold",40],["might_elixir",1]]}})}_buildLake(){const t=tt.lake.x,e=tt.lake.z,i=ce,n=new et;for(let c=0;c<8;c++)n.add(Nt(fe(2.4,.14,.44),F("#5a422a"),0,.2,c*.5-2));for(const c of[-1,1])for(const l of[-2,1.6])n.add(Nt(ai(.11,.11,2.4,5),F("#42301f"),c*1,-.6,l));const s=t+92*i,o=e-61*i;n.position.set(s,Qt+.55,o),n.rotation.y=-.58-Math.PI/2,this.group.add(n);const r=Q0();r.position.set(t+77*i,Qt+.15,e-50*i),r.rotation.y=.8,this.group.add(r);for(let c=0;c<14;c++){const l=c*.45,h=126*i+c%3*20,d=t+Math.cos(l)*h,u=e+Math.sin(l)*h;!oi(d,u)&&Ti(d,u)>8&&this.batcher.add(Bi(500+c,.8+c%3*.5),d,j(d,u),u,l)}this.addInteractive({id:"lake_herbs",kind:"resource",x:t+80*i,z:e+100*i,radius:3,label:"Zbierz zioła",mesh:fi(66),cooldown:45,data:{item:"herbs",qty:3}}),this.addInteractive({id:"lake_fishing",kind:"resource",x:t+102*i,z:e-67*i,radius:3.2,label:"Złów rybę (wędka rybacka)",mesh:null,cooldown:40,data:{item:"lake_fish",qty:1}}),this.addInteractive({id:"lake_chest",kind:"chest",x:t+120*i,z:e+51*i,radius:3.2,label:"Zamulona skrzynia",mesh:Ge(),rotY:1.4,data:{loot:[["gold",60],["crystal_mana",1],["mana_potion",2]]}})}_buildCastle(){const t=tt.castle.x,e=tt.castle.z;j(t,e);const i=F("#6a675f"),n=F("#57544e");for(let s=0;s<10;s++){const o=s/10*Math.PI*2,r=t+Math.cos(o)*34,c=e+Math.sin(o)*34;if(s===0)continue;const l=5+s%4*2.4,h=new et;h.add(Nt(fe(19,l,2),i,0,l/2,0));for(let d=-1;d<=1;d++)h.add(Nt(fe(1.6,1.2,2.2),n,d*6,l+.6,0));this.addStatic(h,r,c,-o+Math.PI/2,{collide:3.2})}for(const[s,o]of[[-28,-26],[30,-22],[0,-34]]){const r=new et;r.add(Nt(ai(4.4,5,17,10),i,0,8.5,0)),r.add(Nt(ai(5.2,5.2,1.4,10),n,0,17.6,0));const c=Nt(new Bt(5.6,5.5,10),F("#4a3a30"),0,21,0);r.add(c);for(let l=0;l<3;l++){const h=new gt(fe(.9,1.6,.3),new Se({color:l===1?"#ffb45c":"#1a1a1e"})),d=l*2.1;h.position.set(Math.cos(d)*4.6,9+l*3,Math.sin(d)*4.6),h.rotation.y=-d,r.add(h)}this.addStatic(r,t+s,e+o,0,{collide:4.4})}for(const s of[-1,1])this.addStatic(Nt(fe(2.6,9,3),n),t+s*8,e+34,0,{collide:1.6});this.addStatic(Nt(fe(19,2,3.2),n,0,0,0),t,e+34,0,{yOffset:9.6}),this.batcher.add(ws().group,t,j(t,e-4),e-4,0),this.addLight("#ff8f45",6,22,t,e-4,2.6),this.batcher.add(wn(21),t+10,j(t+10,e+6),e+6,.4),this.batcher.add(wn(22),t-12,j(t-12,e+2),e+2,1.1),this.batcher.add(nn("#4a2a3a"),t-6,j(t-6,e+14),e+14,.2),this.batcher.add(nn("#4a2a3a"),t+6,j(t+6,e+14),e+14,-.2),this.addInteractive({id:"castle_chest",kind:"chest",x:t-18,z:e-12,radius:3.4,label:"Skrzynia strażnika warowni",mesh:Ge(),rotY:.2,data:{loot:[["watcher_plate",1],["ancient_metal",1],["gold",120],["might_elixir",1]]}}),this.addInteractive({id:"castle_metal",kind:"resource",x:t+20,z:e+6,radius:3,label:"Wykop starożytny metal",mesh:Ni(801),cooldown:120,data:{item:"ancient_metal",qty:1}}),this.addInteractive({id:"castle_herbs",kind:"resource",x:t+4,z:e+22,radius:3,label:"Zbierz zioła",mesh:fi(802),cooldown:45,data:{item:"herbs",qty:2}})}_buildHermitage(){const t=tt.hermit.x,e=tt.hermit.z,i=ua({w:4.6,d:4,h:2.6,wall:"#8a7a60",roof:"#3f3a30"});this.addStatic(i,t,e,.6,{collide:2.6});const n=wo();n.group.position.set(t+7,j(t+7,e+6),e+6),this.group.add(n.group),this.animated.push(n),this.colliders.push({x:t+7,z:e+6,r:1.4});for(let s=0;s<5;s++){const o=s*1.3;this.batcher.add(fi(900+s),t+Math.cos(o)*5,j(t+Math.cos(o)*5,e+Math.sin(o)*5-4),e+Math.sin(o)*5-4,o)}for(let s=0;s<10;s++){const o=s*.63,r=14+s%4*6;this.batcher.add(Ms(1200+s,{kind:s%3===0?"dead":"pine"}),t+Math.cos(o)*r,j(t+Math.cos(o)*r,e+Math.sin(o)*r),e+Math.sin(o)*r,o)}for(let s=0;s<3;s++)this.batcher.add(Yn(4,60+s),t-6+s*4,j(t-6+s*4,e-6),e-6,.1);this.addInteractive({id:"hermit_herbs",kind:"resource",x:t-8,z:e+8,radius:3,label:"Zbierz zioła pustelnika",mesh:fi(950),cooldown:50,data:{item:"herbs",qty:3}}),this.addInteractive({id:"hermit_chest",kind:"chest",x:t+4,z:e-7,radius:3.2,label:"Kufer pustelnika",mesh:Ge(),rotY:-.9,data:{loot:[["seer_bone",1],["mana_potion",2],["gold",55]]}})}_buildSwamp(){const t=tt.swamp.x,e=tt.swamp.z,i=new Te(8123);for(let n=0;n<26;n++){const s=i.float(0,Math.PI*2),o=i.float(10,70),r=t+Math.cos(s)*o,c=e+Math.sin(s)*o;oi(r,c)||this.batcher.add(Ms(3e3+n,{kind:(n%4===0,"dead")}),r,j(r,c),c,i.float(0,6))}for(let n=0;n<10;n++){const s=i.float(0,Math.PI*2),o=i.float(8,60),r=t+Math.cos(s)*o,c=e+Math.sin(s)*o;oi(r,c)||this.batcher.add(wn(3100+n),r,j(r,c),c,s)}for(let n=0;n<5;n++){const s=n/5*Math.PI*2,o=t+Math.cos(s)*34,r=e+Math.sin(s)*34;this.batcher.add(en(1.6+n%3*.6,3200+n),o,j(o,r),r,s),this.colliders.push({x:o,z:r,r:.7})}for(let n=0;n<4;n++){const s=.9+n*1.4,o=Ss("#8fe0ff",.9),r=t+Math.cos(s)*22,c=e+Math.sin(s)*22;o.position.set(r,Math.max(j(r,c),Qt),c),this.group.add(o)}this.addInteractive({id:"swamp_herbs",kind:"resource",x:t+16,z:e-26,radius:3.2,label:"Zbierz bagienne zioła",mesh:fi(3300),cooldown:60,data:{item:"herbs",qty:4}}),this.addInteractive({id:"swamp_chest",kind:"chest",x:t-24,z:e+22,radius:3.4,label:"Zapadnięta skrzynia",mesh:Ge(),rotY:.9,data:{loot:[["crystal_mana",2],["gold",70],["seer_bone",1]]}}),this.addInteractive({id:"swamp_shard",kind:"resource",x:t+4,z:e+44,radius:3.2,label:"Wyciągnij okruch z mułu",mesh:Ss("#ffd27a",.9),cooldown:999999,data:{item:"shard_dawn",qty:1,once:!0}})}_buildPass(){const t=tt.pass.x,e=tt.pass.z,i=new et;i.add(Nt(ai(3,3.6,11,8),F("#6b675e"),0,5.5,0)),i.add(Nt(ai(3.8,3.8,1.2,8),F("#565249"),0,11.4,0));const n=Nt(new Bt(4,3.4,8),F("#4c4238"),0,13.6,0);i.add(n),this.addStatic(i,t+18,e-12,.3,{collide:3.2});for(let s=0;s<6;s++){const o=s%2?1:-1,r=Math.floor(s/2)-1,c=t+o*13,l=e-24+r*22;this.batcher.add(en(3.4+s%3*.8,4e3+s),c,j(c,l),l,s),this.colliders.push({x:c,z:l,r:.9})}for(let s=0;s<8;s++){const o=s*.8;this.batcher.add(Bi(4100+s,1.2+s%4*.7),t+Math.cos(o)*26,j(t+Math.cos(o)*26,e+Math.sin(o)*26),e+Math.sin(o)*26,o)}this.batcher.add(nn("#5a3a2a"),t-16,j(t-16,e+14),e+14,.4),this.batcher.add(nn("#5a3a2a"),t+16,j(t+16,e+14),e+14,-.4),this.batcher.add(bs(),t-6,j(t-6,e-18),e-18,.5),this.addInteractive({id:"pass_chest",kind:"chest",x:t+20,z:e+8,radius:3.2,label:"Skrzynia celników",mesh:Ge(),rotY:.8,data:{loot:[["gold",85],["health_potion",2],["iron_ore",3]]}}),this.addInteractive({id:"pass_ore",kind:"resource",x:t-26,z:e-22,radius:3,label:"Wydobądź rudę żelaza",mesh:Ni(4200),cooldown:60,data:{item:"iron_ore",qty:2}})}_buildCircle(){const t=tt.circle.x,e=tt.circle.z;for(let n=0;n<12;n++){const s=n/12*Math.PI*2,o=t+Math.cos(s)*12,r=e+Math.sin(s)*12;this.batcher.add(en(2.4+n%4*.7,5e3+n),o,j(o,r),r,s),this.colliders.push({x:o,z:r,r:.8})}const i=wo();i.group.position.set(t,j(t,e),e),this.group.add(i.group),this.animated.push(i),this.colliders.push({x:t,z:e,r:1.5});for(let n=0;n<4;n++){const s=.6+n*1.57,o=Ss("#9f7cf0",1),r=t+Math.cos(s)*6,c=e+Math.sin(s)*6;o.position.set(r,j(r,c),c),this.group.add(o)}for(let n=0;n<6;n++){const s=n*1.05;this.batcher.add(fi(5100+n),t+Math.cos(s)*18,j(t+Math.cos(s)*18,e+Math.sin(s)*18),e+Math.sin(s)*18,s)}this.addInteractive({id:"circle_shrine",kind:"shrine",x:t,z:e,radius:4.2,label:"Ołtarz kręgu — złóż ofiarę (40 złota)",mesh:null,data:{cost:40,heal:!0}})}_buildMine(){const t=tt.mine.x,e=tt.mine.z;j(t,e);for(let o=0;o<8;o++){const r=o*.8;this.batcher.add(Bi(6e3+o,1.4+o%3*.8),t+Math.cos(r)*9,j(t+Math.cos(r)*9,e+Math.sin(r)*9),e+Math.sin(r)*9,r)}const i=new et,n=F("#4a3826");i.add(Nt(fe(.7,4.2,.7),n,-2.2,2.1,0)),i.add(Nt(fe(.7,4.2,.7),n,2.2,2.1,0)),i.add(Nt(fe(5.4,.8,.8),n,0,4.2,0)),i.add(Nt(fe(6.4,5,3),F("#3a3a38"),0,2.5,-1.7));const s=new gt(fe(3.6,3.4,.2),new Se({color:"#07080a"}));s.position.set(0,1.7,-.1),i.add(s),this.addStatic(i,t,e-6,0,{collide:3.4}),this.addLight("#ff9a45",3.2,12,t+5,e-2,2.4);for(let o=0;o<4;o++){const r=.8+o*1.6;this.addInteractive({id:`mine_ore_${o}`,kind:"resource",x:t+Math.cos(r)*13,z:e+Math.sin(r)*13,radius:3.2,label:"Wydobądź rudę żelaza",mesh:Ni(6100+o),cooldown:45,data:{item:"iron_ore",qty:3}})}this.addInteractive({id:"mine_chest",kind:"chest",x:t-12,z:e+4,radius:3.2,label:"Skrzynia górnicza",mesh:Ge(),rotY:-.4,data:{loot:[["iron_ore",5],["ancient_metal",1],["gold",65]]}}),this.batcher.add(tn(.9),t+7,j(t+7,e+8),e+8,.2),this.batcher.add(Mn(),t-8,j(t-8,e+9),e+9,.6)}_buildCrossroads(){this.addStatic(bs(),0,150,.4,{collide:.5});const t=wo();t.group.position.set(14,j(14,158),158),this.group.add(t.group),this.animated.push(t),this.colliders.push({x:14,z:158,r:1.4}),this.addInteractive({id:"crossroads_shrine",kind:"shrine",x:14,z:158,radius:4,label:"Kapliczka — złóż ofiarę (20 złota)",mesh:null,data:{cost:20}}),this.addInteractive({id:"signpost",kind:"sign",x:0,z:162,radius:3.4,label:"Przeczytaj drogowskaz (mapa)",mesh:null});for(let e=0;e<4;e++){const i=e*1.5;this.batcher.add(Ms(7e3+e),26+Math.cos(i)*8,j(26+Math.cos(i)*8,140+Math.sin(i)*8),140+Math.sin(i)*8,i)}}_buildHighlands(){const t=tt.highlands.x,e=tt.highlands.z,i=F("#6f6a60"),n=new et;n.add(Nt(fe(7,1.2,7),i,0,.6,0)),n.add(Nt(fe(5.2,2.4,5.2),F("#5d594f"),0,2,0)),n.add(Nt(fe(1.6,1.4,.4),F("#141518"),0,1.9,2.7)),this.addStatic(n,t,e,.4,{collide:3.6});for(let s=0;s<4;s++){const o=.9+s*1.5,r=t+Math.cos(o)*9,c=e+Math.sin(o)*9;this.batcher.add(en(2+s%2*.8,8e3+s),r,j(r,c),c,o),this.colliders.push({x:r,z:c,r:.8})}this.batcher.add(bs(),t+6,j(t+6,e+5),e+5,.7),this.addInteractive({id:"highlands_chest",kind:"chest",x:t-5,z:e+6,radius:3,label:"Skrzynia strażnicy",mesh:Ge(),rotY:.9,data:{loot:[["iron_ore",3],["gold",60],["might_elixir",1]]}}),this.addInteractive({id:"highlands_ore",kind:"resource",x:t+10,z:e-8,radius:3,label:"Wydobądź rudę żelaza",mesh:Ni(8100),cooldown:55,data:{item:"iron_ore",qty:2}})}_buildRoadCamp(){this.addStatic(sl("#4f4432"),4,253,.8,{collide:1.7});const i=ws();i.group.position.set(0,j(0,250),250),this.group.add(i.group),this.animated.push(i),this.colliders.push({x:0,z:250,r:1.1}),this.batcher.add(Mn(),0-3.5,j(0-3.5,250+1.5),250+1.5,.4),this.batcher.add(tn(.7),0-4.5,j(0-4.5,250-1.2),250-1.2,.9),this.addLight("#ff9a45",3,12,0,250,2.4),this.addInteractive({id:"road_camp_rest",kind:"rest",x:0,z:250,radius:3.8,label:"Odpocznij przy ogniu (do świtu)",mesh:null})}_buildCoast(){const t=tt.lighthouse.x,e=tt.lighthouse.z,i=eg({h:17});i.position.set(t,j(t,e)-.3,e),i.rotation.y=Math.atan2(-t,-e),this.group.add(i),this.colliders.push({x:t,z:e,r:4.4});const n=j(t,e)-.3+(i.userData.lanternY??20),s=new Ne("#ffcf8f",5.5,90,2);s.position.set(t,n,e),this.group.add(s);const o=new Bt(7,66,12,1,!0);o.translate(0,-33,0),o.rotateX(Math.PI/2);const r=new Se({color:"#ffe0a8",transparent:!0,opacity:0,depthWrite:!1,blending:wa,side:we}),c=new gt(o,r);c.position.set(t,n,e),c.rotation.x=-.06,this.group.add(c),this.beacon={beam:c,beamMat:r,lamp:s},this.animated.push({update:R=>{c.rotation.y+=R*.55}}),this.addInteractive({id:"lighthouse_chest",kind:"chest",x:t+7,z:e+4,radius:3.2,label:"Skrzynia latarnika",mesh:Ge(),rotY:.7,data:{loot:[["gold",90],["health_potion",2],["iron_ore",3]]}}),this.addStatic(Yn(6,12),t-9,e+8,.4),this.addStatic(bs(),t-4,e-9,1.1);const l=tt.wreck.x,h=tt.wreck.z,d=ig();d.position.set(l,j(l,h)+.2,h),d.rotation.y=-.9,this.group.add(d),this.colliders.push({x:l,z:h,r:5}),this.addInteractive({id:"wreck_chest",kind:"chest",x:l+4.5,z:h-3.2,radius:3.2,label:"Skrzynia ze wraku",mesh:Ge(),rotY:-.5,data:{loot:[["gold",120],["crystal_mana",1],["leather_vest",1]]}}),this.addInteractive({id:"wreck_flotsam",kind:"resource",x:l-6,z:h+5,radius:3.4,label:"Zbierz drewno z wraku",mesh:tn(.7),cooldown:70,data:{item:"wood",qty:4}});for(let R=0;R<7;R++){const E=R*1.7,T=l+Math.cos(E)*(7+R),A=h+Math.sin(E)*(7+R);j(T,A)>Qt-.5&&this.batcher.add(Bi(900+R,.7+R%3*.4),T,j(T,A),A,E)}const u=tt.fisherhut.x,f=tt.fisherhut.z,g=[{dx:-9,dz:4,w:6.2,d:5,rot:.35,wall:"#a89a7c"},{dx:8,dz:10,w:5,d:4.2,rot:-1.1,wall:"#9d9179"},{dx:3,dz:-12,w:4.6,d:4,rot:2.2,wall:"#b0a184"}];for(const R of g){const E=ua({w:R.w,d:R.d,h:2.7,wall:R.wall,roof:"#4a3a2e",rot:R.rot});this.addStatic(E,u+R.dx,f+R.dz,R.rot,{collide:3.6})}this.addStatic(al(),u-3,f+9,.2),this.addStatic(al(),u+11,f-2,1.5),this.addStatic(ng(),u-12,f-6,.9),this.addStatic(Mn(),u+2.5,f+6,0),this.addStatic(tn(.8),u-1.5,f+5.5,.6);const v=ws();this.addStatic(v.group,u+6,f+3,0,{whole:!0}),this.animated.push(v),this.addInteractive({id:"fisher_rest",kind:"rest",x:u+6,z:f+3,radius:3.6,label:"Odpocznij przy ogniu rybaków",mesh:null,data:{}}),this.addInteractive({id:"fisher_fish",kind:"resource",x:u-14,z:f+12,radius:3.4,label:"Złów rybę z pomostu",mesh:null,cooldown:40,data:{item:"lake_fish",qty:1}}),this.addInteractive({id:"fisher_herbs",kind:"resource",x:u+16,z:f+6,radius:3,label:"Zbierz zioła nadmorskie",mesh:fi(88),cooldown:45,data:{item:"herbs",qty:2}});const p=new et;for(let R=0;R<12;R++)p.add(Nt(fe(2.6,.16,.9),F("#5a422a"),0,.2,R*.95));for(const R of[-1,1])for(let E=0;E<4;E++)p.add(Nt(ai(.13,.13,3.2,5),F("#42301f"),R*1.15,-1.2,E*3.2));const m=u-16,y=f+20;p.position.set(m,Math.max(j(m,y),Qt)+.5,y),p.rotation.y=Math.atan2(u-m,f-y),this.group.add(p);const x=tt.island.x,w=tt.island.z;j(x,w)>Qt&&(this.addStatic(en(3.4,21),x,w,.4),this.addStatic(en(2.6,33),x+4,w+3,1.7),this.addInteractive({id:"island_chest",kind:"chest",x:x+2,z:w-3,radius:3.2,label:"Zamknięta skrzynia",mesh:Ge({locked:!1}),rotY:2.4,data:{loot:[["gold",180],["ancient_metal",1],["mana_potion",2]]}}))}_scatterNature(){const t=ce,e=new Te(424242),i={village:64,trading:46,forge:30,bandits:30,barrow:34,ruins:40,quarry:26,castle:44,hermit:26,swamp:24,pass:30,circle:24,mine:24,crossroads:18,lake:0,highlands:0,lighthouse:30,wreck:26,fisherhut:40,island:20},n=Object.entries(tt).filter(([A])=>(i[A]??24)>0).map(([A,I])=>({x:I.x,z:I.z,r:(i[A]??24)*1.45}));n.push({x:2*t,z:342*t,r:14*1.45});const s=(A,I,_=0)=>{for(const M of n)if(re(A,I,M.x,M.z)<M.r+_)return!0;return!1},o=$c,r=A=>A[Math.floor(e.next()*A.length)],c=[];for(let A=0;A<8;A++){const I=A<3?"pine":A<5?"oak":A<7?"birch":"pine",_=Ms(1100+A*37,{kind:I}),M=an(_);M&&c.push({geo:M,pine:I==="pine",dead:!1})}const l=an(Ms(999,{kind:"dead"}));l&&c.push({geo:l,pine:!1,dead:!0});const h=c.filter(A=>!A.dead&&!A.pine),d=c.filter(A=>!A.dead&&A.pine),u=[];for(let A=0;A<7;A++){const I=an(Bi(2e3+A,1));I&&u.push(I)}const f=[];for(let A=0;A<5;A++){const I=an(O0(3e3+A));I&&f.push(I)}const g=[];for(let A=0;A<3;A++){const I=an(B0(3500+A));I&&g.push(I)}const v=[];for(let A=0;A<3;A++){const I=an(H0(4e3+A));I&&v.push(I)}let p=0;const m=7e3;for(let A=0;A<m*6&&p<m;A++){const I=e.float(0,Math.PI*2),_=90+Math.pow(e.next(),.6)*(o-90),M=Math.cos(I)*_,P=Math.sin(I)*_;if(oi(M,P)||Ti(M,P)<9||s(M,P)||on(M,P)>1.6)continue;const O=j(M,P);if(O>182)continue;const B=Is(M,P),q=re(M,P,tt.swamp.x,tt.swamp.z)<210*t;if(B<.3&&!q&&e.next()>.055)continue;const G=O>95||O>55&&e.chance(.45),K=q?e.chance(.7)?c[c.length-1]:r(h):r(G?d:h);if(!K)continue;const X=e.float(1,1.95);this.batcher.addGeometry(K.geo,M,O,P,e.float(0,Math.PI*2),X),X>1.3&&this.colliders.push({x:M,z:P,r:.5*X}),p+=1}let y=0;for(let A=0;A<11e3&&y<2e3;A++){const I=e.float(0,Math.PI*2),_=70+Math.pow(e.next(),.55)*(o-70),M=Math.cos(I)*_,P=Math.sin(I)*_;if(oi(M,P)||Ti(M,P)<8||s(M,P))continue;const O=j(M,P);if(on(M,P)<.6&&O<120&&e.next()>.16)continue;const q=r(u),G=e.float(.8,2.4);this.batcher.addGeometry(q,M,O,P,e.float(0,6.28),G),G>1.6&&this.colliders.push({x:M,z:P,r:G*.55}),y+=1}let x=0;for(let A=0;A<2800&&x<340;A++){const I=e.float(0,Math.PI*2),_=100+Math.pow(e.next(),.5)*(o-100),M=Math.cos(I)*_,P=Math.sin(I)*_;if(oi(M,P)||Ti(M,P)<12||s(M,P,8))continue;const O=j(M,P);if(on(M,P)<.45&&O<110)continue;const q=3+Math.floor(e.next()*5);for(let G=0;G<q;G++){const K=1.5+e.float(0,5.5),X=M+e.float(-K,K),ct=P+e.float(-K,K);if(oi(X,ct))continue;const dt=r(u),Mt=e.float(.7,2.9)*(G===0?1.35:1);this.batcher.addGeometry(dt,X,j(X,ct)-.15,ct,e.float(0,6.28),Mt),Mt>1.5&&this.colliders.push({x:X,z:ct,r:Mt*.6})}x+=1}let w=0;for(let A=0;A<2200&&w<260;A++){const I=e.float(0,Math.PI*2),_=150+Math.pow(e.next(),.5)*(o-150),M=Math.cos(I)*_,P=Math.sin(I)*_;if(oi(M,P)||Ti(M,P)<9||s(M,P))continue;const O=j(M,P);if(O<130)continue;const B=c.find(G=>G.dead);if(!B)break;const q=e.float(.9,1.7);this.batcher.addGeometry(B.geo,M,O,P,e.float(0,6.28),q),q>1.25&&this.colliders.push({x:M,z:P,r:.35*q}),w+=1}let R=0;for(let A=0;A<8e3&&R<2200;A++){const I=e.float(0,Math.PI*2),_=70+Math.pow(e.next(),.55)*(o-70),M=Math.cos(I)*_,P=Math.sin(I)*_;if(oi(M,P)||Ti(M,P)<6||s(M,P,-12)||on(M,P)>1.2)continue;const O=r(f);this.batcher.addGeometry(O,M,j(M,P),P,e.float(0,6.28),e.float(.8,1.8)),R+=1}let E=0;for(let A=0;A<6e3&&E<1600;A++){const I=e.float(0,Math.PI*2),_=90+Math.pow(e.next(),.55)*(o-90),M=Math.cos(I)*_,P=Math.sin(I)*_;if(oi(M,P)||Ti(M,P)<5||s(M,P,-10)||Is(M,P)<.45||on(M,P)>1.3)continue;const O=r(g);this.batcher.addGeometry(O,M,j(M,P),P,e.float(0,6.28),e.float(.7,1.5)),E+=1}let T=0;for(let A=0;A<8e3&&T<1300;A++){const I=e.float(0,Math.PI*2),_=200+Math.pow(e.next(),.5)*(o-200),M=Math.cos(I)*_,P=Math.sin(I)*_,O=j(M,P);if(O>Qt+1.9||O<Qt-1.4||s(M,P,-20))continue;const B=r(v);this.batcher.addGeometry(B,M,O,P,e.float(0,6.28),e.float(.8,1.6)),T+=1}this._scatterGrass(),this._buildFireflies(),this._buildGulls()}_buildGulls(){const t=new Te(555);this.gulls=[];const e=new et;e.name="gulls";for(let i=0;i<26;i++){const n=t.float(0,Math.PI*2),s=$l*t.float(.72,1.02),o=Math.cos(n)*s,r=Math.sin(n)*s,c=G0();c.position.set(o,Qt+t.float(16,46),r),c.scale.setScalar(t.float(.8,1.3)),e.add(c),this.gulls.push({mesh:c,cx:o,cz:r,radius:t.float(24,80),speed:t.float(.12,.3)*(t.chance(.5)?1:-1),phase:t.float(0,Math.PI*2),y:c.position.y})}this.group.add(e)}_updateGulls(t){if(!this.gulls)return;this.gullTime=(this.gullTime??0)+t;const e=this.gullTime;for(const i of this.gulls){const n=i.phase+e*i.speed,s=i.cx+Math.cos(n)*i.radius,o=i.cz+Math.sin(n)*i.radius;i.mesh.position.set(s,i.y+Math.sin(e*.7+i.phase)*2.4,o),i.mesh.rotation.y=-n+(i.speed>0?Math.PI:0),i.mesh.rotation.z=Math.sin(e*1.6+i.phase)*.22}}_buildFireflies(){const t=new Te(77123),e=[],i=[];for(let r=0;r<1100;r++){const c=t.float(0,Math.PI*2),l=60+Math.pow(t.next(),.7)*($c-60),h=Math.cos(c)*l,d=Math.sin(c)*l,u=j(h,d);u<Qt+1||j(h,d)>150||(e.push(h,u+.6+t.float(0,1.6),d),i.push(t.float(0,Math.PI*2)))}if(e.length===0)return;const n=new Ce;n.setAttribute("position",new le(e,3));const s=new Ia({color:"#ffe4a3",size:.26,transparent:!0,opacity:0,depthWrite:!1,blending:wa,sizeAttenuation:!0}),o=new kr(n,s);o.name="fireflies",o.frustumCulled=!1,(this.group??this.scene).add(o),this.fireflies={points:o,mat:s,geo:n,base:Float32Array.from(n.attributes.position.array),phases:i,t:0}}_updateFireflies(t,e){const i=this.fireflies;if(!i)return;i.t+=t;const n=Math.max(0,Math.min(1,(e-.25)/.5))*.95;if(i.mat.opacity+=(n-i.mat.opacity)*Math.min(1,t*2.5),i.mat.opacity<.01)return;const s=i.geo.attributes.position.array,o=i.t;for(let r=0;r<s.length/3;r++){const c=i.phases[r];s[r*3]=i.base[r*3]+Math.sin(o*.6+c)*1.4,s[r*3+1]=i.base[r*3+1]+Math.sin(o*1.1+c*1.7)*.45,s[r*3+2]=i.base[r*3+2]+Math.cos(o*.5+c*1.3)*1.4}i.geo.attributes.position.needsUpdate=!0}_scatterGrass(){const t=new Te(999),e=new et;for(let u=0;u<6;u++){const f=.4+t.float(0,.35),g=new gt(new Bt(.05,f,3),new Ra({color:"#6e8f4f"})),v=u/6*Math.PI*2+t.float(-.4,.4),p=t.float(0,.16);g.position.set(Math.cos(v)*p,f/2,Math.sin(v)*p),g.rotation.set(t.float(-.3,.3),t.float(0,3),t.float(-.3,.3)),e.add(g)}const i=an(e);e.traverse(u=>{u.isMesh&&u.geometry.dispose()});const n=Object.values(tt),s=520,o=n.length*s,r=new Ra({color:"#6f9150"}),c=new h0(i,r,o);c.castShadow=!1,c.receiveShadow=!0,c.frustumCulled=!1;const l=new Ie,h=new nt;let d=0;for(const u of n)for(let f=0;f<s;f++){const g=t.float(0,Math.PI*2),v=t.float(10*ce,105*ce),p=u.x+Math.cos(g)*v,m=u.z+Math.sin(g)*v;Math.abs(p)>Vt-10||Math.abs(m)>Vt-10||oi(p,m)||Ti(p,m)<8||on(p,m)>1.2||(l.position.set(p,j(p,m)-.04,m),l.rotation.set(0,t.float(0,6.28),0),l.scale.setScalar(t.float(.8,1.7)),l.updateMatrix(),c.setMatrixAt(d,l.matrix),h.setHSL(.22+t.float(-.03,.05),t.float(.3,.52),t.float(.28,.42)),c.setColorAt(d,h),d+=1)}c.count=d,c.instanceMatrix.needsUpdate=!0,c.instanceColor&&(c.instanceColor.needsUpdate=!0),this.group.add(c),this.grassInstanced=c}}function cg(a,t){let e=a;const i=()=>(e=(e*1664525+1013904223)%4294967296,e/4294967296),n=[];for(let s=0;s<t;s++){const o=[],r=4+Math.floor(i()*5);for(let c=0;c<r;c++)o.push({dx:(i()-.5)*2.2,dy:(i()-.5)*.9,r:.45+i()*.75,a:.16+i()*.24});n.push({x:i(),y:i(),r:.5+i()*1.4,warm:i()>.55,puffs:o})}return n}class lg{constructor(t){this.scene=t,this.canvas=document.createElement("canvas"),this.canvas.width=1024,this.canvas.height=512,this.ctx=this.canvas.getContext("2d"),this.texture=new jl(this.canvas),this.texture.colorSpace=ri,this.texture.mapping=ba,this.texture.magFilter=li,this.texture.minFilter=li,this.lastTop=null,this.lastHorizon=null,this.clouds=cg(1337,30),this.draw("#4a7cb0","#c8d8dd"),t.background=this.texture}draw(t,e){const i=this.ctx,n=this.canvas.width,s=this.canvas.height,o=new nt(t),r=new nt(e),c=r.clone().multiplyScalar(.62),l=i.createLinearGradient(0,0,0,s);l.addColorStop(0,`#${o.getHexString()}`),l.addColorStop(.46,`#${o.clone().lerp(r,.65).getHexString()}`),l.addColorStop(.5,`#${r.getHexString()}`),l.addColorStop(.56,`#${r.clone().lerp(c,.6).getHexString()}`),l.addColorStop(1,`#${c.getHexString()}`),i.globalCompositeOperation="source-over",i.fillStyle=l,i.fillRect(0,0,n,s);const h=o.r*.3+o.g*.59+o.b*.11;if(h<.16){const d=Math.min(1,(.16-h)/.12);for(let u=0;u<240;u++){const f=u*197.3%n,g=u*83.7%(s*.46),v=.6+u*37%10/9;i.fillStyle=`rgba(255,255,255,${(.25+u*13%60/100)*d})`,i.fillRect(f,g,v,v)}}if(h>.05){const d=r.clone().lerp(new nt("#ffffff"),.45),u=o.clone().lerp(new nt("#ffffff"),.72),f=Math.min(.85,.25+h*.9);for(const g of this.clouds){const v=g.warm?d:u,p=g.x*n,m=(.1+g.y*.34)*s,y=g.r*n*.055;for(const x of g.puffs){const w=p+x.dx*y*1.9,R=m+x.dy*y*.55,E=y*x.r,T=i.createRadialGradient(w,R,0,w,R,E),A=f*x.a;T.addColorStop(0,`rgba(${v.r*255|0},${v.g*255|0},${v.b*255|0},${A})`),T.addColorStop(1,"rgba(255,255,255,0)"),i.fillStyle=T,i.beginPath(),i.arc(w,R,E,0,Math.PI*2),i.fill()}}}this.texture.needsUpdate=!0,this.lastTop=t,this.lastHorizon=e}update(t,e){if(t===this.lastTop&&e===this.lastHorizon)return;const i=new nt(t),n=new nt(this.lastTop??"#000000"),s=new nt(e),o=new nt(this.lastHorizon??"#000000");Math.abs(i.r-n.r)+Math.abs(i.g-n.g)+Math.abs(i.b-n.b)+Math.abs(s.r-o.r)+Math.abs(s.g-o.g)+Math.abs(s.b-o.b)<.012||this.draw(t,e)}}function hg(a){const t=a.dayF??1,e=a.duskF??0,i=new nt("#3d76b4"),n=new nt("#bcd6e0"),s=new nt("#080f1e"),o=new nt("#2b3d50"),r=new nt("#3d3f74"),c=new nt("#e59a5e"),l=s.clone().lerp(i,t),h=o.clone().lerp(n,t);return e>.01&&(l.lerp(r,e*.7),h.lerp(c,e*.92)),{top:`#${l.getHexString()}`,horizon:`#${h.getHexString()}`}}const Es={common:{name:"Zwykły",color:"#cfc8b8",cls:"rare-common"},rare:{name:"Rzadki",color:"#6fa8d6",cls:"rare-rare"},epic:{name:"Epicki",color:"#b680d8",cls:"rare-epic"},legend:{name:"Legendarny",color:"#ebb55c",cls:"rare-legend"}},Ae={rusty_sword:{name:"Rdzawy miecz",icon:"sword",type:"weapon",slot:"weapon",rarity:"common",stats:{attack:6},value:12,desc:"Pamiątka po ojcu. Tępy, ale wciąż potrafi przeciąć skórę bandyty."},wolf_blade:{name:"Wilcze Ostrze",icon:"sword",type:"weapon",slot:"weapon",rarity:"rare",stats:{attack:13,crit:4},value:90,desc:"Kute w Wilczej Dolinie. Krawędź zdobią wygrawerowane ślady pazurów."},iron_axe:{name:"Żelazny Topór",icon:"axe",type:"weapon",slot:"weapon",rarity:"rare",stats:{attack:16,speed:-.2},value:110,desc:"Ciężki, niezgrabny, ale rozłupuje czaszki trupów jak drewno."},dawn_blade:{name:"Klinga Świtu",icon:"shard",type:"weapon",slot:"weapon",rarity:"legend",stats:{attack:28,crit:8,hp:25},value:0,desc:"Ostrze wykute ze starożytnego metalu i trzech okruchów. Świeci, gdy zbliża się mrok.",glow:"#ffd27a"},hunter_bow:{name:"Łuk myśliwski",icon:"bow",type:"weapon",slot:"weapon",rarity:"rare",stats:{attack:11,crit:6},value:80,desc:"Cisowy łuk z Wilczej Doliny. Wymaga cierpliwości, nie siły."},leather_vest:{name:"Skórzana kurtka",icon:"armor",type:"armor",slot:"armor",rarity:"common",stats:{armor:4,hp:10},value:25,desc:"Wytarta skóra, przeszyta rzemykami. Pachnie dymem ogniska."},chainmail:{name:"Kolczuga",icon:"armor",type:"armor",slot:"armor",rarity:"rare",stats:{armor:11,hp:18},value:140,desc:"Każde ogniwo kute osobno. Waży tyle, że słychać cię z daleka."},wolf_cloak:{name:"Płaszcz z wilczej skóry",icon:"armor",type:"armor",slot:"armor",rarity:"epic",stats:{armor:8,hp:22,speed:.45},value:180,desc:"Wilki wyją ciszej, gdy go nosisz. Ciepły nawet w mgle."},watcher_plate:{name:"Płyta Strażnika",icon:"armor",type:"armor",slot:"armor",rarity:"epic",stats:{armor:18,hp:30,mana:-10},value:240,desc:"Zdjęta z zapomnianego strażnika kurhanu. Wciąż chłodna."},leather_hood:{name:"Kaptur podróżny",icon:"helm",type:"helm",slot:"helm",rarity:"common",stats:{armor:2,mana:10},value:18,desc:"Chroni od deszczu i ciekawskich spojrzeń."},watcher_helm:{name:"Hełm Strażnika",icon:"helm",type:"helm",slot:"helm",rarity:"rare",stats:{armor:6,hp:12},value:85,desc:"Pęknięty wizerunek wilka patrzy z żelaznego nausznika."},wolf_amulet:{name:"Amulet Wilka",icon:"amulet",type:"trinket",slot:"trinket",rarity:"rare",stats:{hp:20,attack:2},value:95,desc:"Kieł zawieszony na rzemieniu. Bije ciepłem, gdy coś czai się w ciemności."},spark_ring:{name:"Pierścień Iskry",icon:"ring",type:"trinket",slot:"trinket",rarity:"rare",stats:{mana:30,attack:2},value:90,desc:"W środku drga drobna iskra — nigdy nie gaśnie."},seer_bone:{name:"Kość Wieszczki",icon:"bone",type:"trinket",slot:"trinket",rarity:"epic",stats:{crit:7,mana:20},value:150,desc:"Szept kurhanu zamknięty w żebrze. Mówi tylko wtedy, gdy słuchasz."},health_potion:{name:"Mikstura leczenia",icon:"potion",type:"consumable",rarity:"common",stack:9,value:18,use:{heal:45},desc:"Gorzka, ziołowa. Zamyka rany i przegania zawroty głowy."},mana_potion:{name:"Mikstura many",icon:"potion",type:"consumable",rarity:"common",stack:9,value:20,use:{mana:40},desc:"Zimna jak woda z górskiego strumienia. Rozjaśnia myśli."},might_elixir:{name:"Eliksir mocy",icon:"elixir",type:"consumable",rarity:"rare",stack:5,value:45,use:{buff:{attack:10,duration:30}},desc:"Na 30 sekund ramiona stają się cięższe od stali."},wolf_meat:{name:"Wilcze mięso",icon:"meat",type:"consumable",rarity:"common",stack:9,value:8,use:{heal:18},desc:"Suche i żylaste, ale lepsze niż pusty żołądek."},lake_fish:{name:"Ryba z jeziora",icon:"meat",type:"consumable",rarity:"common",stack:9,value:10,use:{heal:22},desc:"Zimna woda daje tłuste, srebrne ryby. Nad ogniem smakują lepiej niż w plecaku."},bread:{name:"Chleb podróżny",icon:"bread",type:"consumable",rarity:"common",stack:9,value:5,use:{heal:12},desc:"Upieczony o świcie. Wciąż ciepły."},wolf_pelt:{name:"Wilcze futro",icon:"pelt",type:"material",rarity:"common",stack:30,value:14,desc:"Gęste, szare futro. Kowal zapłaci za nie bez targowania."},iron_ore:{name:"Ruda żelaza",icon:"ore",type:"material",rarity:"common",stack:30,value:10,desc:"Bryłka z kamieniołomu. Trzeba ją jeszcze oczyścić."},herbs:{name:"Zioła lecznicze",icon:"herb",type:"material",rarity:"common",stack:30,value:7,desc:"Rosną przy ścieżkach. Pachną miętą i dymem."},ancient_metal:{name:"Starożytny metal",icon:"metal",type:"material",rarity:"rare",stack:12,value:55,desc:"Nie rdzewieje i jest zimny jak kamień w studni."},crystal_mana:{name:"Kryształ many",icon:"crystal",type:"material",rarity:"rare",stack:12,value:40,desc:"W środku krąży światło. Trzymaj go nisko, gdy jesteś w kurhanie."},shard_dawn:{name:"Okruch Ostrza Świtu",icon:"shard",type:"quest",rarity:"legend",stack:3,value:0,desc:"Fragment legendarnej klingi. Trzy okruchy tworzą całość."},old_key:{name:"Zardzewiały klucz",icon:"key",type:"quest",rarity:"rare",stack:1,value:0,desc:"Do czego pasuje? Ktoś w wiosce będzie wiedział."},stolen_grain:{name:"Worek zboża",icon:"grain",type:"quest",rarity:"common",stack:1,value:0,desc:"Zrabowany w Wilczej Dolinie. Wciąż pachnie młócką."}},Ql=[{id:"weapon",label:"Broń",glyph:"sword"},{id:"armor",label:"Zbroja",glyph:"armor"},{id:"helm",label:"Hełm",glyph:"helm"},{id:"trinket",label:"Amulet",glyph:"amulet"}],th=[{id:"health_potion",name:"Mikstura leczenia",out:{id:"health_potion",qty:2},cost:8,mats:{herbs:2}},{id:"mana_potion",name:"Mikstura many",out:{id:"mana_potion",qty:2},cost:10,mats:{herbs:1,crystal_mana:1}},{id:"might_elixir",name:"Eliksir mocy",out:{id:"might_elixir",qty:1},cost:20,mats:{herbs:3,crystal_mana:1}},{id:"wolf_blade",name:"Wilcze Ostrze",out:{id:"wolf_blade",qty:1},cost:30,mats:{wolf_pelt:2,iron_ore:2}},{id:"iron_axe",name:"Żelazny Topór",out:{id:"iron_axe",qty:1},cost:40,mats:{iron_ore:3,wolf_pelt:1}},{id:"chainmail",name:"Kolczuga",out:{id:"chainmail",qty:1},cost:60,mats:{iron_ore:4,wolf_pelt:1}},{id:"wolf_amulet",name:"Amulet Wilka",out:{id:"wolf_amulet",qty:1},cost:45,mats:{wolf_pelt:2,crystal_mana:1}},{id:"wolf_cloak",name:"Płaszcz z wilczej skóry",out:{id:"wolf_cloak",qty:1},cost:90,mats:{wolf_pelt:4,iron_ore:1}},{id:"dawn_blade",name:"Klinga Świtu",out:{id:"dawn_blade",qty:1},cost:150,mats:{ancient_metal:2,shard_dawn:3,iron_ore:2},legendary:!0}];function dg(a){const t=Ae[a];if(!t?.stats)return"";const e={attack:"Atak",armor:"Pancerz",hp:"Życie",mana:"Mana",crit:"Kryt",speed:"Szybkość"};return Object.entries(t.stats).map(([i,n])=>`${e[i]??i} ${n>0?"+":""}${n}`).join(" · ")}class ug{constructor(){this.gold=0,this.items=new Map,this.equipped={weapon:null,armor:null,helm:null,trinket:null},this.capacity=24}count(t){return this.items.get(t)??0}has(t,e=1){return this.count(t)>=e}isFull(){return this.items.size>=this.capacity}add(t,e=1){const i=Ae[t];if(!i||i.type!=="consumable"&&i.type!=="material"&&this.items.has(t)===!1&&this.isFull())return!1;const n=i.stack??1,s=this.items.get(t)??0,o=Math.min(s+e,Math.max(n,s+e));return this.items.set(t,o),!0}remove(t,e=1){const i=this.count(t);return i<e?!1:(i-e<=0?this.items.delete(t):this.items.set(t,i-e),!0)}equip(t){const e=Ae[t];if(!e?.slot||!this.has(t))return!1;const i=e.slot,n=this.equipped[i];return this.remove(t,1),this.equipped[i]=t,n&&this.add(n,1),!0}unequip(t){const e=this.equipped[t];return!e||this.isFull()?!1:(this.equipped[t]=null,this.add(e,1),!0)}isEquipped(t){return Object.values(this.equipped).includes(t)}equipStats(){const t={attack:0,armor:0,hp:0,mana:0,crit:0,speed:0};for(const e of Ql){const i=this.equipped[e.id];if(!i)continue;const n=Ae[i]?.stats;if(n)for(const[s,o]of Object.entries(n))t[s]=(t[s]??0)+o}return t}list(){return[...this.items.entries()].map(([t,e])=>({id:t,qty:e,def:Ae[t]})).filter(t=>t.def)}consumables(){return this.list().filter(t=>t.def.type==="consumable")}serialize(){return{gold:this.gold,items:[...this.items.entries()],equipped:{...this.equipped}}}load(t){t&&(this.gold=t.gold??0,this.items=new Map(t.items??[]),this.equipped={weapon:null,armor:null,helm:null,trinket:null,...t.equipped??{}})}}const Cs=[{id:"dawn",name:"Znak Świtu",glyph:"✧",mana:28,cd:8,level:1,desc:"Fala światła rani wszystkich wrogów w promieniu 5 m i leczy cię za 12 punktów."},{id:"frenzy",name:"Wilczy Zew",glyph:"✶",mana:24,cd:18,level:3,desc:"Na 10 sekund zyskujesz +35% obrażeń i +20% szybkości ruchu."},{id:"blink",name:"Blask Świtu",glyph:"☀",mana:40,cd:26,level:5,desc:"Leczy 45% maksymalnego życia i osłania cię na 4 sekundy."}],fg=[{id:"str",name:"Siła",glyph:"S",desc:"Obrażenia broni i siła ciosów"},{id:"agi",name:"Zręczność",glyph:"Z",desc:"Szansa na trafienie krytyczne i szybkość"},{id:"end",name:"Wytrzymałość",glyph:"W",desc:"Życie, pancerz i kondycja"},{id:"foc",name:"Skupienie",glyph:"M",desc:"Mana i moc zaklęć"}];function pg(a){return Math.round(120+a*85+Math.pow(a,1.55)*26)}class bo{constructor(t){this.game=t,this.group=new et,this.inventory=new ug;const e=2*ce,i=342*ce;this.pos=new z(e,j(e,i),i),this.vel=new z,this.yaw=Math.PI,this.radius=.42,this.level=1,this.xp=0,this.attrs={str:5,agi:5,end:5,foc:5},this.points=0,this.hp=100,this.stamina=100,this.mana=40,this.state="idle",this.stateTime=0,this.combo=0,this.attackHitApplied=!1,this.attackCooldown=0,this.dodgeCooldown=0,this.invuln=0,this.hurtFlash=0,this.hitFlash=0,this.dead=!1,this.cooldowns={dawn:0,frenzy:0,blink:0},this.buffs={attack:0,attackTime:0,speedTime:0,shield:0},this.walkPhase=0,this.sprinting=!1,this.staminaLock=!1,this.regenDelay=0,this.lastGroundY=this.pos.y,this.sinceCombat=99,this.totalKills=0,this._buildModel(),this.recalc(),this.hp=this.maxHP,this.mana=this.maxMana,this.stamina=this.maxStamina,this.syncModel()}_buildModel(){const t=Ua({skin:"#dcb08a",tunic:"#4f6350",pants:"#463f36",boots:"#2b241f",hair:"#4a3020",cloak:"#384f44",bulk:1.04,scar:!0,armor:"#7c8577"});this.model=t.group,this.parts=t.parts,this._buildGear();const e=Rs({blade:"#d9e2e8",guard:"#b08a3e",grip:"#3a2a1c"});e.position.set(0,-.02,.06),e.rotation.set(-.35,0,.12),e.scale.setScalar(.9),this.weaponMesh=e,this.parts.hands[1].add(e);const i=V0("#5d5341");i.position.set(0,-.02,.02),i.rotation.y=Math.PI/2,i.scale.setScalar(.86),this.parts.hands[0].add(i),this.group.add(this.model),this.group.position.copy(this.pos),this.group.traverse(s=>{s.isMesh&&(s.castShadow=!0,s.receiveShadow=!0)}),this.lantern=new Ne("#ffcf9a",0,13,2),this.lantern.position.set(0,1.5,.25),this.group.add(this.lantern);const n=new gt(new qt(.07,6,5),new Se({color:"#ffd9a0",transparent:!0,opacity:.9}));n.position.set(.2,1,.18),n.castShadow=!1,this.group.add(n),this.shadowBlob=new gt(new Ns(.62,16),new Se({color:"#000000",transparent:!0,opacity:.24,depthWrite:!1})),this.shadowBlob.rotation.x=-Math.PI/2,this.shadowBlob.position.y=.04,this.group.add(this.shadowBlob)}_buildGear(){const{body:t,arms:e,legs:i,head:n,torso:s}=this.parts,o=new Pe({color:"#8d968c",roughness:.42,metalness:.72}),r=new Pe({color:"#5f675f",roughness:.5,metalness:.65}),c=new Pe({color:"#4a3524",roughness:.9}),l=new Pe({color:"#3a2a52",roughness:.35,metalness:.4,emissive:"#a86bf0",emissiveIntensity:.9}),h=new Pe({color:"#33503f",roughness:.95,side:we}),d=new Pe({color:"#28402f",roughness:.98,side:we});for(const E of e){const T=new gt(new qt(.16,8,6,0,Math.PI*2,0,Math.PI*.62),o);T.position.set(0,.02,0),T.scale.set(1.15,.85,1.15),T.castShadow=!0,E.add(T);const A=new gt(new Wt(.085,.075,.2,7),r);A.position.set(0,-.62,0),A.castShadow=!0,E.add(A)}const u=new gt(new Xe(.44,.42,.1),o);u.position.set(0,1.2,.19),u.castShadow=!0,t.add(u);const f=new gt(new hi(.075,.017,6,12),l);f.position.set(0,1.22,.25),f.castShadow=!1,t.add(f),this.runeMesh=f;const g=new gt(new Xe(.1,.68,.06),c);g.position.set(-.12,1.16,.19),g.rotation.z=.5,t.add(g);for(const E of i){const T=new gt(new Wt(.105,.09,.26,7),r);T.position.set(0,-.42,.01),T.castShadow=!0,E.add(T)}const v=new gt(new qt(.235,9,7,0,Math.PI*2,0,Math.PI*.72),new Pe({color:"#3d4a41",roughness:.95}));v.position.set(0,.045,-.01),v.castShadow=!0,n.add(v);const p=new gt(new hi(.2,.022,6,14),o);p.rotation.x=Math.PI/2,p.position.set(0,.03,0),n.add(p);const m=new et;m.position.set(0,1.42,-.17),t.add(m);const y=[];let x=m;for(let E=0;E<4;E++){const T=.5-E*.055,A=new et;A.position.y=E===0?0:-.24;const I=new gt(new Xe(T,.26,.025),E===0?h:d);I.position.y=-.12,I.castShadow=!0,A.add(I),x.add(A),x=A,y.push(A)}this.cape={root:m,segments:y},this.parts.cloak&&(this.parts.cloak.visible=!1);const w=new Pe({color:"#dbe4ea",roughness:.22,metalness:.92}),R=new Pe({color:"#c99a44",roughness:.35,metalness:.85});this._bladeMaterial=w,this._guardMaterial=R}recalc(){const t=this.inventory.equipStats(),e=this.attrs;this.maxHP=Math.round(64+e.end*9+this.level*7+t.hp),this.maxMana=Math.round(22+e.foc*7+this.level*4+t.mana),this.maxStamina=Math.round(96+e.end*3.2),this.attackPower=5+e.str*1.7+this.level*1.3+t.attack,this.armor=e.end*.55+t.armor,this.critChance=Xt(.04+e.agi*.014+t.crit*.01,0,.65),this.moveSpeed=6.3+e.agi*.055+t.speed,this.spellPower=14+e.foc*2.6+this.level*1.6,this.hp=Math.min(this.hp,this.maxHP),this.mana=Math.min(this.mana,this.maxMana),this.stamina=Math.min(this.stamina,this.maxStamina)}get xpNeeded(){return pg(this.level)}gainXp(t){this.xp+=t;let e=0;for(;this.xp>=this.xpNeeded&&(this.xp-=this.xpNeeded,this.level+=1,this.points+=3,e+=1,!(e>8)););e>0&&(this.recalc(),this.hp=this.maxHP,this.mana=this.maxMana,this.stamina=this.maxStamina,this.game.onLevelUp(this.level)),this.game.ui?.refreshHud()}spendPoint(t){return this.points<=0||!(t in this.attrs)?!1:(this.attrs[t]+=1,this.points-=1,this.recalc(),!0)}canAct(){return!this.dead&&this.state!=="dodge"&&this.state!=="hurt"}attack(){return this.dead||this.attackCooldown>0||this.state==="attack"&&this.stateTime<.34||this.state==="dodge"||this.state==="cast"?!1:(this.state="attack",this.stateTime=0,this.attackHitApplied=!1,this.combo=(this.combo+1)%3,this.attackCooldown=.42,this.stamina=Math.max(0,this.stamina-6),this.sinceCombat=0,this.vel.lengthSq()<.6&&(this.yaw=this.game.cameraRig.yaw+Math.PI),this.game.fx.slash(new z(this.pos.x,this.pos.y+.25,this.pos.z),this.yaw,{color:this.combo===2?"#ffd27a":"#f2e6d0",radius:this.combo===2?2.2:1.9,arc:this.combo===2?Math.PI*1.5:Math.PI*1.05}),this.game.audio?.swing(this.combo),!0)}dodge(){if(this.dead||this.dodgeCooldown>0||this.stamina<20||this.state==="dodge")return!1;this.state="dodge",this.stateTime=0,this.invuln=Math.max(this.invuln,.34),this.dodgeCooldown=.72,this.stamina-=20,this.sinceCombat=0;const t=this.vel.lengthSq()>.4?this.vel.clone().normalize():new z(Math.sin(this.yaw),0,Math.cos(this.yaw));return this.dodgeDir=t,this.game.fx.burst(new z(this.pos.x,this.pos.y+.2,this.pos.z),{color:"#cfc6b0",count:8,speed:2.2,up:.9,life:.45,size:.8}),this.game.audio?.dodge(),!0}castSpell(t){const e=Cs[t];if(!e||this.dead)return!1;if(this.level<e.level)return this.game.ui?.log(`Zaklęcie „${e.name}” odblokuje się na poziomie ${e.level}.`,"warn"),!1;if(this.cooldowns[e.id]>0)return!1;if(this.mana<e.mana)return this.game.ui?.log("Za mało many.","warn"),!1;if(this.state==="dodge")return!1;if(this.mana-=e.mana,this.cooldowns[e.id]=e.cd,this.state="cast",this.stateTime=0,this.sinceCombat=0,this.game.audio?.cast(),e.id==="dawn"){const i=this.pos.clone().add(new z(0,1,0));this.game.fx.magicBurst(i,"#ffe3a8"),this.game.damageEnemiesInRadius(this.pos,5.2,this.spellPower*1.15,"Znak Świtu"),this.heal(12),this.game.ui?.flashScreen("#ffdca0",.35)}else e.id==="frenzy"?(this.buffs.attack=.35,this.buffs.attackTime=10,this.buffs.speedTime=10,this.game.fx.magicBurst(this.pos.clone().add(new z(0,1,0)),"#ffb45c"),this.game.ui?.log("Wilczy Zew: +35% obrażeń, +20% szybkości.","gold")):e.id==="blink"&&(this.heal(Math.round(this.maxHP*.45)),this.buffs.shield=4,this.game.fx.heal(this.pos,"#fff0c0"),this.game.fx.magicBurst(this.pos.clone().add(new z(0,1,0)),"#fff3c4"),this.game.ui?.log("Blask Świtu otacza cię tarczą.","good"));return!0}useItem(t){const e=Ae[t];if(!e?.use||!this.inventory.has(t))return!1;if(e.use.heal){if(this.hp>=this.maxHP)return!1;this.heal(e.use.heal),this.game.fx.heal(this.pos,"#9fe08a")}if(e.use.mana){if(this.mana>=this.maxMana)return!1;this.mana=Math.min(this.maxMana,this.mana+e.use.mana),this.game.fx.heal(this.pos,"#8fc4ff")}return e.use.buff&&(this.buffs.attack=Math.max(this.buffs.attack,e.use.buff.attack/Math.max(1,this.attackPower)),this.buffs.attackTime=e.use.buff.duration,this.game.fx.magicBurst(this.pos.clone().add(new z(0,1,0)),"#ff9a45")),this.inventory.remove(t,1),this.game.audio?.drink(),this.game.ui?.log(`Użyto: ${e.name}.`,"good"),!0}heal(t){const e=this.hp;this.hp=Math.min(this.maxHP,this.hp+t);const i=Math.round(this.hp-e);i>0&&this.game.ui?.floatNumber(this.pos,`+${i}`,"heal")}takeDamage(t,e="wróg"){if(this.dead)return 0;if(this.invuln>0)return this.game.ui?.floatNumber(this.pos,"unik","mana"),0;const i=t*(100/(100+this.armor*2.4)),n=.92+Math.random()*.16;let s=Math.max(1,Math.round(i*n));return this.buffs.shield>0&&(s=Math.round(s*.45)),this.hp-=s,this.sinceCombat=0,this.regenDelay=4.5,this.hurtFlash=.4,this.invuln=.35,this.state="hurt",this.stateTime=0,this.game.ui?.floatNumber(this.pos.clone().add(new z(0,.7,0)),`-${s}`,"player"),this.game.ui?.flashScreen("#c1443a",.32),this.game.cameraRig.addShake(.42),this.game.audio?.hurt(),this.game.fx.sparks(this.pos.clone().add(new z(0,1.1,0)),"#e05a4a",8),this.hp<=0&&(this.hp=0,this.die()),s}die(){this.dead=!0,this.state="dead",this.stateTime=0,this.game.onPlayerDeath()}respawn(){this.dead=!1,this.state="idle",this.hp=this.maxHP,this.mana=this.maxMana,this.stamina=this.maxStamina,this.pos.set(0,j(0,342)+.1,342),this.vel.set(0,0,0),this.invuln=2.5,this.buffs.attackTime=0,this.buffs.speedTime=0,this.recalc()}update(t,e){this.stateTime+=t,this.attackCooldown=Math.max(0,this.attackCooldown-t),this.dodgeCooldown=Math.max(0,this.dodgeCooldown-t),this.invuln=Math.max(0,this.invuln-t),this.hurtFlash=Math.max(0,this.hurtFlash-t),this.regenDelay=Math.max(0,this.regenDelay-t),this.sinceCombat+=t;for(const y of Object.keys(this.cooldowns))this.cooldowns[y]=Math.max(0,this.cooldowns[y]-t);if(this.buffs.attackTime>0&&(this.buffs.attackTime-=t,this.buffs.attackTime<=0&&(this.buffs.attack=0)),this.buffs.speedTime>0&&(this.buffs.speedTime-=t),this.buffs.shield>0&&(this.buffs.shield-=t),this.dead){this._animateDeath(t);return}const i=e?.axes()??{x:0,y:0},n=i.x!==0||i.y!==0,s=this.game.cameraRig,o=s.forward(),r=s.right(),c=new z(o.x*-i.y+r.x*i.x,0,o.z*-i.y+r.z*i.x);c.lengthSq()>1&&c.normalize();const l=(e?.isDown("ShiftLeft")||e?.isDown("ShiftRight"))&&n&&this.stamina>0;this.stamina<=0&&(this.staminaLock=!0),this.staminaLock&&this.stamina>30&&(this.staminaLock=!1),this.sprinting=l&&!this.staminaLock&&this.state!=="attack"&&this.state!=="dodge",this.sprinting?this.stamina=Math.max(0,this.stamina-13*t):this.sinceCombat>1.6&&(this.stamina=Math.min(this.maxStamina,this.stamina+17*t)),this.regenDelay<=0&&this.sinceCombat>3.5?(this.hp=Math.min(this.maxHP,this.hp+this.maxHP*.012*t),this.mana=Math.min(this.maxMana,this.mana+this.maxMana*.035*t)):this.sinceCombat>3.5&&(this.mana=Math.min(this.maxMana,this.mana+this.maxMana*.02*t));let h=this.moveSpeed*(this.sprinting?1.62:1)*(this.buffs.speedTime>0?1.2:1);if(this.state==="attack"&&(h*=.34),this.state==="cast"&&(h*=.2),this.state==="hurt"&&(h*=.15),this.state==="dodge"){const y=Xt(1-this.stateTime/.42,0,1),x=12.5*y*y+2;this.vel.x=this.dodgeDir.x*x,this.vel.z=this.dodgeDir.z*x,this.yaw=Ci(this.yaw,Math.atan2(this.dodgeDir.x,this.dodgeDir.z),18,t),this.stateTime>.42&&(this.state="idle")}else if(n){const y=c.x*h,x=c.z*h;if(this.vel.x=Rt(this.vel.x,y,13,t),this.vel.z=Rt(this.vel.z,x,13,t),this.state==="idle"||this.state==="attack"){const w=Math.atan2(c.x,c.z);this.yaw=Ci(this.yaw,w,this.state==="attack"?6:12,t)}}else this.vel.x=Rt(this.vel.x,0,16,t),this.vel.z=Rt(this.vel.z,0,16,t);(this.state==="attack"||this.state==="cast"||this.state==="hurt")&&this.vel.multiplyScalar(1-Math.min(1,t*5));const d=this.pos.clone();d.x+=this.vel.x*t,d.z+=this.vel.z*t;const u=Math.hypot(d.x,d.z);if(u>Vt-6){const y=(Vt-6)/u;d.x*=y,d.z*=y,this.vel.multiplyScalar(.4)}const f=j(d.x,d.z);oi(d.x,d.z)&&f<Qt-.9?(this.vel.multiplyScalar(.2),this.waterHint=(this.waterHint??0)-t,this.waterHint<=0&&(this.waterHint=6,this.game.ui?.log("Głęboka woda — dalej nie popłynę.","info"))):(this.pos.x=d.x,this.pos.z=d.z);const v=j(this.pos.x,this.pos.z);if(this.pos.y=Rt(this.pos.y,v,18,t),this._resolveBuildingCollisions(),this._animate(t,n,h),Math.hypot(this.vel.x,this.vel.z)>.9){const y=Math.floor(this.walkPhase/Math.PI);y!==this.lastFootstep&&(this.lastFootstep=y,this.game.audio?.step(this._surfaceUnderfoot()))}const m=Math.hypot(this.vel.x,this.vel.z);if(n&&m>1.2&&(this.dustTimer=(this.dustTimer??0)-t,this.dustTimer<=0)){this.dustTimer=this.sprinting?.16:.3;const y=new z(this.pos.x,this.pos.y+.06,this.pos.z);this.game.fx?.burst?.(y,{color:"#c8bba4",count:this.sprinting?5:3,speed:.7,up:.55,size:.55,life:.5,gravity:2.2})}this.state==="attack"&&!this.attackHitApplied&&this.stateTime>.17&&(this.attackHitApplied=!0,this._applyMeleeHit()),this.state==="attack"&&this.stateTime>.52&&(this.state="idle"),this.state==="cast"&&this.stateTime>.42&&(this.state="idle"),this.state==="hurt"&&this.stateTime>.3&&(this.state="idle"),this.syncModel()}_applyMeleeHit(){const t=this.combo===2?3:2.6,e=new z(Math.sin(this.yaw),0,Math.cos(this.yaw)),i=[];for(const s of this.game.enemies?.list??[]){if(s.dead||!s.active)continue;const o=new z(s.pos.x-this.pos.x,0,s.pos.z-this.pos.z),r=o.length();r>t+s.def.radius||(o.normalize(),!(e.dot(o)<(this.combo===2?-.3:.28))&&i.push({e:s,d:r}))}i.sort((s,o)=>s.d-o.d);const n=this.combo===2?3:2;for(let s=0;s<Math.min(n,i.length);s++){const o=i[s].e,r=Math.random()<this.critChance;let c=this.attackPower*(this.combo===2?1.35:s===0?1:.75);c*=1+this.buffs.attack,c*=.9+Math.random()*.2,r&&(c*=1.75),o.takeDamage(c,{crit:r,source:"Gracz",knockback:3.2});const l=new z(o.pos.x,o.pos.y+1.1,o.pos.z);this.game.fx.sparks(l,r?"#ffd27a":"#f2e3c4",r?12:6),this.game.cameraRig.addShake(r?.28:.14),this.game.audio?.hit(r)}i.length>0&&this.game.ui?.refreshHud()}_resolveBuildingCollisions(){const t=this.game.world?.colliders??[];for(const e of t){const i=this.pos.x-e.x,n=this.pos.z-e.z,s=Math.hypot(i,n),o=e.r+this.radius;if(s<o&&s>1e-4){const r=(o-s)/s;this.pos.x+=i*r,this.pos.z+=n*r}}}_animate(t,e,i){const n=Math.hypot(this.vel.x,this.vel.z),s=Xt(n/Math.max(3,this.moveSpeed),0,2.2),o=e?3.4+s*4.6:1.1;this.walkPhase+=t*o*(e?1:.5),this.animPhase=(this.animPhase??0)+t;const{body:r,arms:c,legs:l,head:h,cloak:d}=this.parts,u=this.parts.forearms??[],f=this.parts.shins??[];let v=Math.sin(this.animPhase*1.7)*.012,p=0,m=0,y=0;if(this.state==="attack"){const w=Xt(this.stateTime/.52,0,1),R=Xt(w/.28,0,1),E=Xt((w-.28)/.34,0,1),T=Xt((w-.62)/.38,0,1),A=this.combo===2?-1:1,I=Math.sin(E*Math.PI);c[1].rotation.x=-2.1*R+3.1*E-.8*T,c[1].rotation.z=(-.55*R+.25*E)*A,c[1].rotation.y=.5*R*A-.7*E*A,u[1]&&(u[1].rotation.x=-.9*R+(.35-.9*E)),c[0].rotation.x=.35*R+.5*E-.3*T,c[0].rotation.z=.35*R,u[0]&&(u[0].rotation.x=-.7*R-.2*E),y=-.55*I*A+(this.combo===1?.3*I:0),p=.12*E-.1*R,m=-.12*I*A,v=-.03*E,l[0].rotation.x=.28*R-.15*E,l[1].rotation.x=-.22*R+.2*E,f[0]&&(f[0].rotation.x=-.35*E),f[1]&&(f[1].rotation.x=-.2*R),h.rotation.y=.25*I*A,h.rotation.x=-.06*R}else if(this.state==="dodge"){const x=Xt(this.stateTime/.42,0,1);r.rotation.x=-x*Math.PI*2,c[0].rotation.x=-1.2,c[1].rotation.x=-1.2,u[0]&&(u[0].rotation.x=-1),u[1]&&(u[1].rotation.x=-1),l[0].rotation.x=.9,l[1].rotation.x=.55,f[0]&&(f[0].rotation.x=-1.3),f[1]&&(f[1].rotation.x=-1),r.position.y=Math.sin(x*Math.PI)*.35}else if(this.state==="cast"){const x=Xt(this.stateTime/.42,0,1),w=Math.sin(x*Math.PI)*1.1;c[0].rotation.x=-2.4*w,c[1].rotation.x=-2.4*w,c[0].rotation.z=.5*w,c[1].rotation.z=-.5*w,u[0]&&(u[0].rotation.x=-.5*w),u[1]&&(u[1].rotation.x=-.5*w),p=-.12*w,c[0].rotation.x=-2.4*w}else if(this.state==="hurt"){const x=Xt(this.stateTime/.3,0,1);p=.35*Math.sin(x*Math.PI),c[0].rotation.x=-.4,c[1].rotation.x=-.2,f[0]&&(f[0].rotation.x=-.3*Math.sin(x*Math.PI)),l[0].rotation.x=-.2*Math.sin(x*Math.PI)}else if(e){const x=Xt(.32+s*.5,.35,1.15),w=this.walkPhase,R=Math.sin(w),E=Math.sin(w+Math.PI);l[0].rotation.x=R*x,l[1].rotation.x=E*x,f[0]&&(f[0].rotation.x=-Math.max(0,-Math.sin(w-.5))*x*1.25-.06),f[1]&&(f[1].rotation.x=-Math.max(0,-Math.sin(w+Math.PI-.5))*x*1.25-.06),c[0].rotation.x=E*x*.62,c[1].rotation.x=R*x*.62,c[0].rotation.z=.1+Math.abs(E)*.04,c[1].rotation.z=-.1-Math.abs(R)*.04,u[0]&&(u[0].rotation.x=-.35-Math.max(0,E)*.3),u[1]&&(u[1].rotation.x=-.35-Math.max(0,R)*.3),v=Math.abs(Math.sin(w))*(.03+s*.035)-.015,m=Math.sin(w)*.035*x,y=-R*.09*x,p=.03+s*.07,h.rotation.y=R*.05,h.rotation.x=-.02-s*.03}else{const x=Math.sin(this.animPhase*1.15),w=Math.sin(this.animPhase*.42);l[0].rotation.x=Rt(l[0].rotation.x,.02,8,t),l[1].rotation.x=Rt(l[1].rotation.x,-.02,8,t),f[0]&&(f[0].rotation.x=Rt(f[0].rotation.x,-.04,8,t)),f[1]&&(f[1].rotation.x=Rt(f[1].rotation.x,-.02,8,t)),c[0].rotation.x=Rt(c[0].rotation.x,x*.05-.05,5,t),c[1].rotation.x=Rt(c[1].rotation.x,-x*.04-.05,5,t),c[0].rotation.z=Rt(c[0].rotation.z,.12+w*.02,5,t),c[1].rotation.z=Rt(c[1].rotation.z,-.12-w*.02,5,t),u[0]&&(u[0].rotation.x=Rt(u[0].rotation.x,-.22,5,t)),u[1]&&(u[1].rotation.x=Rt(u[1].rotation.x,-.18,5,t)),m=w*.018,y=Rt(r.rotation.y,0,4,t)*0+w*.02,h.rotation.y=Rt(h.rotation.y,w*.12,3,t),h.rotation.x=Rt(h.rotation.x,x*.02,3,t)}if(r.rotation.y=Rt(r.rotation.y,y,14,t),r.rotation.z=Rt(r.rotation.z,m,14,t),this.state!=="dodge"&&(r.rotation.x=Rt(r.rotation.x,p,14,t)),r.position.y=v,d){const x=Xt(n*.06,0,.4);d.rotation.x=Math.PI+Math.sin(this.walkPhase*.9)*.04-x*.5,d.rotation.z=Math.sin(this.walkPhase*.6)*.03}if(this.cape){const x=Xt(n*.075,0,.5),w=this.walkPhase*.8,R=this.cape.segments;for(let E=0;E<R.length;E++){const T=1+E*.35;R[E].rotation.x=.16+x*(.55+E*.35)+Math.sin(w+E*.7)*.045*T,R[E].rotation.z=Math.sin(w*.8+E*.5)*.05+Xt(this.vel.x*.02,-.12,.12)}this.cape.root.rotation.x=-.05-x*.3}if(this.runeMesh){const x=.65+Math.sin(this.walkPhase*1.2)*.18+(this.state==="cast"?1.2:0);this.runeMesh.material.emissiveIntensity=x,this.runeMesh.rotation.z+=t*.6}this.invuln>0&&this.state!=="dodge"?this.model.visible=Math.floor(this.invuln*18)%2===0:this.model.visible=!0}_surfaceUnderfoot(){const{x:t,z:e}=this.pos;if(R0(t,e)>.06)return"water";if(Ti(t,e)<5)return"dirt";const n=j(t,e);return on(t,e)>.85?"stone":n>200?"snow":"grass"}_animateDeath(t){const{body:e}=this.parts;e.rotation.x=Rt(e.rotation.x,-Math.PI/2,3,t),this.model.position.y=Rt(this.model.position.y,.25,3,t),this.shadowBlob.visible=!1}syncModel(){this.group.position.copy(this.pos),this.group.rotation.y=this.yaw;const t=j(this.pos.x,this.pos.z);this.shadowBlob.position.y=t-this.pos.y+.05,this.shadowBlob.visible=!this.dead}serialize(){return{pos:[this.pos.x,this.pos.z],level:this.level,xp:this.xp,attrs:{...this.attrs},points:this.points,hp:this.hp,mana:this.mana,inventory:this.inventory.serialize()}}load(t){t&&(this.level=t.level??1,this.xp=t.xp??0,this.attrs={...this.attrs,...t.attrs??{}},this.points=t.points??0,this.inventory.load(t.inventory),this.recalc(),this.hp=t.hp??this.maxHP,this.mana=t.mana??this.maxMana,this.stamina=this.maxStamina,t.pos&&this.pos.set(t.pos[0],j(t.pos[0],t.pos[1]),t.pos[1]),this.syncModel())}}class mg{constructor(t){this.game=t,this.group=new et,this.name="Szara";const e=Zl(11);this.model=e.group,this.parts=e.parts,this.group.add(this.model),this.group.traverse(i=>{i.isMesh&&(i.castShadow=!0,i.receiveShadow=!0)}),this.pos=new z,this.vel=new z,this.yaw=0,this.phase=Math.random()*10,this.state="follow",this.target=null,this.attackCooldown=0,this.barkTimer=6+Math.random()*6,this.sitBlend=0,this.growlPulse=0,this.blob=new gt(new Ns(.55,14),new Se({color:"#000000",transparent:!0,opacity:.22,depthWrite:!1})),this.blob.rotation.x=-Math.PI/2,this.group.add(this.blob),this._placeNearPlayer(!0)}_placeNearPlayer(t=!1){const e=this.game.player;if(!e)return;const i=(e.yaw??0)+Math.PI*.65,n=e.pos.x+Math.sin(i)*2.2,s=e.pos.z+Math.cos(i)*2.2;this.pos.set(n,j(n,s),s),t&&this.group.position.copy(this.pos)}update(t){const e=this.game.player;if(!e||e.dead){this._animate(t,!1),this.syncModel();return}const i=this.pos.x-e.pos.x,n=this.pos.z-e.pos.z,s=Math.hypot(i,n);if(s>46){this._placeNearPlayer(!0);return}let o=null,r=1/0;for(const f of this.game.enemies?.list??[]){if(f.dead||!f.active||Math.hypot(f.pos.x-e.pos.x,f.pos.z-e.pos.z)>14)continue;const v=Math.hypot(f.pos.x-this.pos.x,f.pos.z-this.pos.z);v<r&&(r=v,o=f)}this.target=o;let c=0,l=0,h=0;if(o){this.state="hunt";const f=o.pos.x-this.pos.x,g=o.pos.z-this.pos.z,v=Math.hypot(f,g)||1,p=1.15+(o.def?.radius??.5);v>p&&(h=e.moveSpeed*1.25,c=f/v,l=g/v),this.attackCooldown=Math.max(0,this.attackCooldown-t),v<=p+.35&&this.attackCooldown<=0&&this._bite(o)}else if(s>2.9){this.state="follow";const f=e.pos.x-this.pos.x,g=e.pos.z-this.pos.z,v=Math.hypot(f,g)||1,p=Xt((s-2.9)/9,.25,1.35);h=e.moveSpeed*(.85+p*.6),c=f/v,l=g/v}else this.state="idle",this.barkTimer-=t,this.barkTimer<=0&&(this.barkTimer=14+Math.random()*16,this.growlPulse=1);if(this.growlPulse=Math.max(0,this.growlPulse-t*1.5),this.vel.x=Rt(this.vel.x,c*h,9,t),this.vel.z=Rt(this.vel.z,l*h,9,t),h>.01){const f=this.pos.x+this.vel.x*t,g=this.pos.z+this.vel.z*t,v=j(f,g);oi(f,g)&&v<Qt-.8?this.vel.multiplyScalar(.2):(this.pos.x=f,this.pos.z=g)}if(s<1.5&&s>.001){const f=(1.5-s)/s;this.pos.x+=i*f,this.pos.z+=n*f}const d=j(this.pos.x,this.pos.z);this.pos.y=Rt(this.pos.y,d,16,t);const u=Math.hypot(this.vel.x,this.vel.z);if(u>.35){const f=Math.atan2(this.vel.x,this.vel.z);this.yaw=Ci(this.yaw,f,9,t)}else if(o||s<6){const f=o?o.pos:e.pos,g=Math.atan2(f.x-this.pos.x,f.z-this.pos.z);this.yaw=Ci(this.yaw,g,4,t)}this._animate(t,u>.35),this.syncModel()}_bite(t){this.attackCooldown=1.4;const i=5+(this.game.player?.level??1)*1.4+Math.random()*3;try{t.takeDamage(i,{source:"Szara",knockback:1.4})}catch{}const n=new z(t.pos.x,t.pos.y+.7,t.pos.z);this.game.fx?.sparks?.(n,"#cfd4c6",5),this.game.audio?.hit?.(!1),this.growlPulse=1}_animate(t,e){const{body:i,head:n,legs:s,tail:o}=this.parts;if(this.phase+=t*(e?10:2.4),e){const l=Math.sin(this.phase)*.75,h=Math.sin(this.phase+Math.PI)*.75;s[0].pivot.rotation.x=l,s[1].pivot.rotation.x=h,s[2].pivot.rotation.x=h*.9,s[3].pivot.rotation.x=l*.9,i.position.y=Math.abs(Math.sin(this.phase))*.05,i.rotation.x=.04,this.sitBlend=Rt(this.sitBlend,0,8,t)}else{for(const h of s)h.pivot.rotation.x=Rt(h.pivot.rotation.x,0,8,t);i.position.y=Rt(i.position.y,Math.sin(this.phase*.8)*.012,6,t),i.rotation.x=Rt(i.rotation.x,0,6,t);const l=this.state==="idle"?1:0;this.sitBlend=Rt(this.sitBlend,l,2.2,t),this.sitBlend>.02&&(i.rotation.x=-.05*this.sitBlend,i.position.y-=.16*this.sitBlend,s[2].pivot.rotation.x=-1.2*this.sitBlend,s[3].pivot.rotation.x=-1.2*this.sitBlend)}const r=this.state==="hunt"?.25:1.9;o.rotation.z=Math.sin(this.phase*r)*(this.state==="hunt"?.08:.35),o.rotation.x=-.85-(this.state==="hunt"?.25:0)+Math.sin(this.phase*.9)*.05;const c=this.state==="hunt"?.12:0;n.rotation.x=Rt(n.rotation.x,-c-this.growlPulse*.2,6,t)}syncModel(){this.group.position.copy(this.pos),this.group.rotation.y=this.yaw;const t=j(this.pos.x,this.pos.z);this.blob.position.y=t-this.pos.y+.03}}class gg{constructor(t,e,i){this.game=t,this.id=e,this.def=i,this.name=i.name,this.role=i.role,this.radius=i.radius??3.6,this.baseY=j(i.pos[0],i.pos[1]),this.pos=new z(i.pos[0],this.baseY,i.pos[1]),this.yaw=i.rot??0,this.phase=Math.random()*hn,this.visible=!i.hidden;const n=Ua(i.visual);this.model=n.group,this.parts=n.parts,this.model.position.copy(this.pos),this.model.rotation.y=this.yaw,this.model.traverse(s=>{s.isMesh&&(s.castShadow=!0,s.receiveShadow=!0,i.ghost&&s.material&&(s.material=s.material.clone(),s.material.transparent=!0,s.material.opacity=.42,s.material.emissive&&(s.material.emissive=new nt("#4f8fa8"),s.material.emissiveIntensity=.5),s.castShadow=!1))}),this.model.visible=this.visible,i.ghost&&(this.light=new Ne("#7fd8e8",2.4,8,2),this.light.position.y=1.4,this.model.add(this.light)),t.scene.add(this.model)}setVisible(t){this.visible=t,this.model.visible=t}update(t,e){if(re(this.pos.x,this.pos.z,e.pos.x,e.pos.z)<9){const c=Math.atan2(e.pos.x-this.pos.x,e.pos.z-this.pos.z);this.yaw=Ci(this.yaw,c,3,t)}this.model.rotation.y=this.yaw,this.phase+=t;const{arms:n,body:s,head:o}=this.parts,r=Math.sin(this.phase*1.4)*.018;s.position.y=r,this.def.ghost?(s.position.y=Math.sin(this.phase*.9)*.14,s.rotation.z=Math.sin(this.phase*.5)*.03,n[0].rotation.z=.35+Math.sin(this.phase*.8)*.12,n[1].rotation.z=-.35-Math.sin(this.phase*.8+1)*.12):(n[0].rotation.z=.06+Math.sin(this.phase*.7)*.04,n[1].rotation.z=-.06-Math.sin(this.phase*.7+.5)*.04,n[0].rotation.x=Math.sin(this.phase*.55)*.08,n[1].rotation.x=-Math.sin(this.phase*.55)*.06),o.rotation.y=Math.sin(this.phase*.4)*.22,o.rotation.x=Math.sin(this.phase*.33)*.05}get interactPos(){return new z(this.pos.x,this.pos.y+1,this.pos.z)}}const Ur={wolf:{name:"Wilk z Doliny",model:"wolf",level:1,hp:40,damage:7,speed:4.9,aggro:20,attackRange:2.1,attackCooldown:1.25,xp:20,gold:[0,2],behavior:"beast",radius:.55,scale:1,loot:[{id:"wolf_pelt",chance:.85},{id:"wolf_meat",chance:.45}]},wolf_alpha:{name:"Wilk Alfa",model:"wolf",elite:!0,level:5,hp:190,damage:16,speed:5.2,aggro:26,attackRange:2.5,attackCooldown:1.1,xp:120,gold:[10,24],behavior:"beast",radius:.7,scale:1.45,loot:[{id:"wolf_pelt",chance:1},{id:"wolf_amulet",chance:.25},{id:"wolf_meat",chance:.6}],bossBanner:"Przywódca stada"},bog_lurker:{name:"Bagniak",model:"lurker",level:4,hp:130,damage:14,speed:2.6,aggro:18,attackRange:2.6,attackCooldown:1.7,xp:70,gold:[4,14],behavior:"melee",radius:.8,scale:1.1,loot:[{id:"herbs",chance:.5},{id:"crystal_mana",chance:.15},{id:"health_potion",chance:.15}]},bandit:{name:"Bandyta z Wilczej Bandy",model:"humanoid",visual:{tunic:"#6a3f2c",pants:"#3a3128",cloak:"#4a2f24",hood:"#3d2a20",skin:"#c99a70",hair:"#2b1d13",bulk:1},level:2,hp:62,damage:9,speed:3.5,aggro:18,attackRange:2.3,attackCooldown:1.4,xp:28,gold:[4,13],behavior:"melee",weapon:"iron",radius:.5,loot:[{id:"bread",chance:.25},{id:"health_potion",chance:.1},{id:"iron_ore",chance:.12}]},bandit_archer:{name:"Łucznik z Wilczej Bandy",model:"humanoid",visual:{tunic:"#4e4230",pants:"#38322a",hood:"#3a3226",skin:"#c99a70",hair:"#2b1d13",bulk:.95},level:3,hp:46,damage:12,speed:3,aggro:24,attackRange:19,preferredRange:12,attackCooldown:2.1,xp:34,gold:[6,16],behavior:"ranged",weapon:"bow",radius:.45,loot:[{id:"herbs",chance:.25},{id:"bread",chance:.2}]},bandit_veteran:{name:"Weteran Wilczej Bandy",model:"humanoid",elite:!0,visual:{tunic:"#503529",pants:"#332c24",cloak:"#5a2f24",skin:"#bd8f68",hair:"#2b1d13",beard:!0,armor:"#6a5f4c",bulk:1.14},level:5,hp:210,damage:19,speed:3.6,aggro:22,attackRange:2.7,attackCooldown:1.2,xp:130,gold:[20,40],behavior:"melee",weapon:"axe",radius:.6,loot:[{id:"iron_axe",chance:.2},{id:"iron_ore",chance:.5},{id:"might_elixir",chance:.2}],bossBanner:"Zastępca Rudego Wilka"},bandit_leader:{name:"Rudy Wilk",model:"humanoid",elite:!0,visual:{tunic:"#5d2e22",pants:"#3a3128",cloak:"#7a2f2f",skin:"#c08858",hair:"#a2542a",beard:!0,scar:!0,bulk:1.16,armor:"#7a6a4a"},level:6,hp:300,damage:17,speed:3.7,aggro:22,attackRange:2.6,attackCooldown:1.2,xp:220,gold:[55,85],behavior:"melee",weapon:"axe",radius:.62,loot:[{id:"wolf_amulet",chance:1},{id:"health_potion",chance:1},{id:"shard_dawn",chance:1}],bossBanner:"Przywódca bandy"},skeleton:{name:"Strażnik Kurhanu",model:"skeleton",level:3,hp:84,damage:13,speed:3,aggro:16,attackRange:2.4,attackCooldown:1.5,xp:48,gold:[6,18],behavior:"melee",radius:.5,loot:[{id:"iron_ore",chance:.35},{id:"ancient_metal",chance:.18},{id:"health_potion",chance:.12}]},mine_guard:{name:"Zapomniany Górnik",model:"skeleton",elite:!0,level:5,hp:190,damage:18,speed:3.2,aggro:17,attackRange:2.6,attackCooldown:1.45,xp:120,gold:[12,26],behavior:"melee",radius:.55,scale:1.12,loot:[{id:"iron_ore",chance:.7},{id:"ancient_metal",chance:.3}]},castle_wraith:{name:"Zjawisko z Warowni",model:"wraith",nightOnly:!0,visual:{tint:"#c08fa8"},level:6,hp:150,damage:15,speed:3.4,aggro:24,attackRange:14,preferredRange:9,attackCooldown:2,xp:140,gold:[10,24],behavior:"ranged",radius:.6,loot:[{id:"crystal_mana",chance:.6},{id:"seer_bone",chance:.1}]},wraith:{name:"Wieszczka z Kurhanu",model:"wraith",elite:!0,nightOnly:!0,level:5,hp:240,damage:15,speed:3.3,aggro:24,attackRange:14,preferredRange:9,attackCooldown:2,xp:180,gold:[35,60],behavior:"ranged",radius:.6,loot:[{id:"shard_dawn",chance:1},{id:"crystal_mana",chance:1},{id:"seer_bone",chance:1}],bossBanner:"Szept Kurhanu"},stone_golem:{name:"Kamienny Strażnik",model:"golem",elite:!0,level:6,hp:340,damage:24,speed:2.4,aggro:20,attackRange:3.4,attackCooldown:2.2,xp:200,gold:[30,60],behavior:"melee",radius:.95,scale:1,loot:[{id:"ancient_metal",chance:.5},{id:"iron_ore",chance:.8},{id:"crystal_mana",chance:.3}],bossBanner:"Strażnik kręgu"},kaldras:{name:"Kaldras, Zwiastun Mroku",model:"kaldras",boss:!0,level:9,hp:1500,damage:28,speed:3.5,aggro:34,attackRange:3.4,attackCooldown:1.6,xp:900,gold:[250,350],behavior:"boss",radius:.9,loot:[{id:"watcher_plate",chance:1},{id:"crystal_mana",chance:1},{id:"ancient_metal",chance:1}],bossBanner:"Zwiastun Mroku"}},vg=[[-78,300,"wolf",1],[-120,250,"wolf",1],[96,270,"wolf",1],[60,440,"wolf",2],[-60,470,"wolf",1],[130,400,"wolf",2],[-150,400,"wolf",2],[40,250,"wolf",2],[-40,210,"wolf",2],[80,190,"bandit",2],[230,300,"wolf",3],[270,220,"bandit",3],[130,300,"bandit_archer",3],[210,330,"wolf",3],[-420,-60,"bandit",3],[-380,-110,"bandit",3],[-460,-140,"bandit",4],[-370,-20,"bandit",3],[-490,-40,"bandit",4],[-430,-160,"bandit_leader",6],[-360,-170,"bandit_archer",4],[-500,-190,"bandit_archer",4],[-440,10,"bandit_veteran",5],[-330,-80,"bandit_veteran",5],[180,60,"wolf",3],[150,-40,"wolf_alpha",5],[320,220,"wolf",4],[-280,120,"wolf",3],[-250,480,"wolf",3],[380,470,"wolf_alpha",5],[-600,60,"wolf",4],[-560,520,"wolf",4],[520,420,"wolf",4],[250,-420,"bandit",4],[-330,280,"bandit",4],[-290,360,"bandit",4],[-380,340,"stone_golem",6],[430,-260,"skeleton",4],[380,-370,"skeleton",4],[480,-380,"skeleton",5],[400,-420,"skeleton",5],[430,-330,"wraith",5],[470,-290,"skeleton",5],[-40,-190,"skeleton",5],[-70,-250,"skeleton",5],[10,-260,"skeleton",6],[-30,-230,"castle_wraith",6],[-60,-180,"castle_wraith",6],[-40,-290,"stone_golem",6],[250,-150,"bandit",5],[230,-110,"bandit_archer",5],[290,-190,"bandit_veteran",6],[210,-170,"bandit",5],[300,-120,"bandit_archer",5],[205,-430,"mine_guard",5],[170,-400,"mine_guard",5],[240,-460,"mine_guard",6],[205,-470,"mine_guard",6],[-200,-430,"bog_lurker",4],[-240,-390,"bog_lurker",4],[-160,-470,"bog_lurker",5],[-250,-460,"bog_lurker",5],[-140,-390,"wraith",5],[-300,-480,"bog_lurker",5],[-500,330,"bog_lurker",4],[-450,380,"wolf",4],[-560,260,"bog_lurker",5],[-560,-200,"wolf",4],[-600,-260,"wolf_alpha",6],[-520,-150,"wolf",4],[470,250,"stone_golem",6],[440,210,"stone_golem",6],[510,300,"wolf",5],[-150,-500,"skeleton",6],[-110,-580,"skeleton",6],[-200,-600,"skeleton",7],[-90,-540,"skeleton",6],[-150,-560,"kaldras",9],[620,60,"wolf_alpha",6],[-660,380,"wolf_alpha",6],[560,-480,"skeleton",7],[-620,-420,"bog_lurker",6]],_g=vg.map(([a,t,e,i])=>[a*ce,t*ce,e,i]),So={x:tt.village.x,z:tt.village.z,r:48*ce};function xg(){const a=Ua({skin:"#8d949e",tunic:"#2e333c",pants:"#23272e",boots:"#1b1e23",hair:"#15171a",cloak:"#37182a",bulk:1.7,armor:"#4a515c",eyeColor:"#ff5b3a"}),t=a.group,e=a.parts,i=new Pe({color:"#20232a",roughness:.6,metalness:.5,flatShading:!0});for(const r of[-1,1]){const c=new gt(new Bt(.09,.62,5),i);c.position.set(r*.2,.29,-.03),c.rotation.z=r*.55,c.rotation.x=-.2,c.castShadow=!0,e.head.add(c)}const n=new gt(new hi(.235,.035,5,10),i);n.rotation.x=Math.PI/2,n.position.y=.06,e.head.add(n);const s=Rs({blade:"#6e7681",guard:"#2b2f36",grip:"#1e2126",glow:"#ff5b3a"});s.scale.setScalar(1.85),s.position.set(0,-.02,.1),s.rotation.set(-.3,0,.1),(e.hands?.[1]??e.arms[1]).add(s);const o=new Ne("#ff5b3a",4.5,9,2);return o.position.y=1.6,t.add(o),t.userData.aura=o,{group:t,parts:e}}function yg(){const a=new et,t=new et;a.add(t);const e=new Pe({color:"#3a4a58",roughness:.9,transparent:!0,opacity:.82,emissive:"#284a5c",emissiveIntensity:.4,side:we,flatShading:!0}),i=new gt(new Bt(.62,1.9,8,1,!0),e);i.position.y=1,i.castShadow=!0,t.add(i);const n=new gt(new Wt(.3,.42,.7,7),e);n.position.y=1.65,t.add(n);const s=new gt(new Bt(.36,.62,7),e);s.position.y=2.16,t.add(s);const o=new gt(new qt(.19,8,6),new Pe({color:"#cfe8ef",emissive:"#6ec8e0",emissiveIntensity:.8,roughness:.5}));o.position.set(0,2.05,.08),t.add(o);const r=new Se({color:"#bfefff"});for(const d of[-1,1]){const u=new gt(new qt(.035,5,4),r);u.position.set(d*.07,2.07,.24),t.add(u)}const c=[];for(const d of[-1,1]){const u=new et;u.position.set(d*.42,1.85,0);const f=new gt(new Wt(.08,.05,1,5),e);f.position.y=-.4,u.add(f);const g=new gt(new qt(.09,6,5),new Se({color:"#bfefff",transparent:!0,opacity:.9}));g.position.y=-.95,u.add(g),t.add(u),c.push(u)}const l=new gt(new Bt(.55,.9,8,1,!0),new Pe({color:"#2f3f4c",transparent:!0,opacity:.55,side:we,emissive:"#1f3d4c",emissiveIntensity:.6}));l.position.y=.35,t.add(l);const h=new Ne("#6ec8e0",3.2,9,2);return h.position.y=1.9,a.add(h),{group:a,parts:{body:t,head:t,arms:c,legs:[],wraith:!0,skirt:l}}}function Mg(a){const t=Ur[a];if(t.model==="wolf"){const n=Zl(11);return{group:n.group,parts:{...n.parts,beast:!0}}}if(t.model==="skeleton"){const n=j0(),s=Rs({blade:"#b9b29d",guard:"#6b6250",grip:"#3a332a"});return s.scale.setScalar(.85),s.position.set(0,-.02,.05),s.rotation.x=-.3,(n.parts.hands?.[1]??n.parts.arms[1]).add(s),{group:n.group,parts:n.parts}}if(t.model==="wraith")return yg();if(t.model==="kaldras")return xg();if(t.model==="golem")return W0();if(t.model==="lurker")return q0();const e=Ua(t.visual),i=t.weapon==="axe"?Rs({blade:"#b9c2c9",guard:"#6a5a3a",grip:"#3a2a1c"}):Rs({blade:"#c9d2d9",guard:"#8a7440",grip:"#3a2a1c"});if(i.scale.setScalar(t.weapon==="axe"?1.15:1),i.position.set(0,-.02,.05),i.rotation.x=-.3,t.weapon!=="bow"&&(e.parts.hands?.[1]??e.parts.arms[1]).add(i),t.weapon==="bow"){const n=new gt(new hi(.45,.03,4,12,Math.PI*1.2),new Pe({color:"#6a4a2a",roughness:.9}));n.position.set(0,-.02,.1),n.rotation.set(0,Math.PI/2,Math.PI/2),(e.parts.hands?.[0]??e.parts.arms[0]).add(n)}return e}class rl{constructor(t,e){this.manager=t,this.game=t.game,this.spawn=e;const i=Ur[e.type];this.type=e.type,this.def=i;const n=Math.max(0,e.level-i.level),s=1+n*.16;this.level=e.level,this.maxHP=Math.round(i.hp*s),this.hp=this.maxHP,this.damage=i.damage*(1+n*.13),this.name=i.name+(n>0?` (poz. ${e.level})`:""),this.elite=!!i.elite,this.boss=!!i.boss,this.pos=new z(e.x,j(e.x,e.z),e.z),this.home=this.pos.clone(),this.vel=new z,this.yaw=Math.random()*hn,this.state="idle",this.stateTime=0,this.attackTimer=0,this.attackWindup=0,this.windupActive=!1,this.dead=!1,this.active=!0,this.deathTime=0,this.aggro=!1,this.wanderTarget=null,this.wanderTimer=Math.random()*3,this.staggerTime=0,this.hitFlash=0,this.phase=1,this.specialTimer=4+Math.random()*3,this.alerted=!1,this.nameplateEl=null;const o=Mg(e.type);this.model=o.group,this.parts=o.parts,this.baseY=0,this.model.position.copy(this.pos),this.model.rotation.y=this.yaw,this.model.traverse(r=>{r.isMesh&&(r.castShadow=!0)}),i.model==="wraith"&&(this.model.scale.setScalar(1.02),this.floatBase=.35),i.boss&&this.model.scale.setScalar(1.32),this.game.scene.add(this.model),(i.boss||i.model==="wraith")&&(this.glow=new Ne(i.boss?"#ff5b3a":"#6ec8e0",2.6,8,2),this.glow.position.y=2,this.model.add(this.glow))}get radius(){return this.def.radius??.5}get isNightOnly(){return!!this.def.nightOnly}takeDamage(t,{crit:e=!1,source:i="Gracz",knockback:n=2,magic:s=!1}={}){if(this.dead)return 0;const o=Math.max(1,Math.round(t));this.hp-=o,this.hitFlash=.16,this.aggro=!0,this.stateTime=0;const r=new z(this.pos.x,this.pos.y+(this.def.model==="wolf"?1.3:2.1),this.pos.z);if(this.game.ui?.floatNumber(r,`${o}${e?"!":""}`,e?"crit":s?"mana":""),this.game.audio?.enemyHit(),n>0){const c=new z(this.pos.x-this.game.player.pos.x,0,this.pos.z-this.game.player.pos.z).normalize();this.pos.x+=c.x*n*.08,this.pos.z+=c.z*n*.08,!this.boss&&!this.elite&&(this.staggerTime=Math.min(.4,n*.05),this.vel.x+=c.x*n*.6,this.vel.z+=c.z*n*.6)}return this.game.combatAlert(this),this.hp<=0&&this.die(),o}die(){if(this.dead)return;this.dead=!0,this.hp=0,this.state="dead",this.deathTime=0,this.aggro=!1,this.game.onEnemyKilled(this);const t=new z(this.pos.x,this.pos.y+1,this.pos.z);this.game.fx.burst(t,{color:this.def.model==="skeleton"?"#d8cfb6":this.def.model==="wraith"?"#8fe0ff":"#c1443a",count:this.boss?40:16,speed:this.boss?8:4,up:3,life:.9,size:this.boss?1.4:1}),this.boss?this.game.cameraRig.addShake(1):this.game.cameraRig.addShake(.14)}respawn(){this.hp=this.maxHP,this.dead=!1,this.active=!0,this.state="idle",this.aggro=!1,this.deathTime=0,this.phase=1,this.pos.copy(this.home),this.model.position.copy(this.pos),this.model.visible=!0,this.model.rotation.set(0,this.yaw,0),this.model.scale.setScalar(this.def.boss?1.32:this.def.model==="wraith"?1.02:1),this.model.traverse(t=>{t.isMesh&&t.material&&(t.material.transparent=t.material.transparent||!1)})}_canSeePlayer(){const t=this.game.player;return!t||t.dead?!1:re(this.pos.x,this.pos.z,t.pos.x,t.pos.z)<this.def.aggro}_playerInVillage(){const t=this.game.player;return re(t.pos.x,t.pos.z,So.x,So.z)<So.r}update(t){if(!this.active)return;if(this.stateTime+=t,this.dead){this.deathTime+=t,this.model.rotation.x=Rt(this.model.rotation.x,-Math.PI/2.1,4,t),this.model.position.y=Rt(this.model.position.y,j(this.pos.x,this.pos.z)+.1,5,t),this.def.model==="wraith"&&(this.model.position.y+=t*.6,this.model.traverse(h=>{h.isMesh&&h.material?.transparent&&(h.material.opacity=Math.max(0,.8-this.deathTime))})),this.deathTime>1.6&&(this.active=!1,this.model.visible=!1);return}this.attackTimer=Math.max(0,this.attackTimer-t),this.staggerTime=Math.max(0,this.staggerTime-t),this.hitFlash=Math.max(0,this.hitFlash-t);const e=this.game.player,i=re(this.pos.x,this.pos.z,e.pos.x,e.pos.z),n=this.game.dayNight.isNight;if(this.isNightOnly&&!n){this.hp=0,this.dead=!0,this.active=!1,this.model.visible=!1,this.game.onNightCreatureFade(this);return}this.isNightOnly&&!this.active&&n&&(this.active=!0,this.model.visible=!0,this.hp=this.maxHP,this.dead=!1,this.pos.copy(this.home));const s=this.boss?34:30,o=re(this.pos.x,this.pos.z,this.home.x,this.home.z);this.aggro||this._canSeePlayer()&&!e.dead&&(this._playerInVillage()&&this.type!=="wolf"||(this.aggro=!0,this.state="chase",this.game.onEnemyAggro(this))),this.aggro&&(o>s||e.dead||this._playerInVillage()&&this.type!=="wolf"&&this.boss===!1)&&(this.aggro=!1,this.state="return"),this.boss?this._updateBoss(t,i):this.aggro?this._chase(t,i):this._idle(t),this.pos.x+=this.vel.x*t,this.pos.z+=this.vel.z*t,this.vel.x=Rt(this.vel.x,0,this.state==="chase"?3.2:6,t),this.vel.z=Rt(this.vel.z,0,this.state==="chase"?3.2:6,t);const r=this.manager.list;for(const h of r){if(h===this||h.dead||!h.active)continue;const d=this.pos.x-h.pos.x,u=this.pos.z-h.pos.z,f=Math.hypot(d,u),g=this.radius+h.radius+.15;if(f>.001&&f<g){const v=(g-f)/f*.5;this.pos.x+=d*v,this.pos.z+=u*v}}const l=j(this.pos.x,this.pos.z)+(this.def.model==="wraith"?.55+Math.sin(this.stateTime*1.7)*.12:0);this.pos.y=Rt(this.pos.y,l,12,t),this.model.position.copy(this.pos),this.model.rotation.y=this.yaw,this.boss||(this.model.rotation.x=Rt(this.model.rotation.x,0,5,t)),this._animate(t,i)}_idle(t){if(this.wanderTimer-=t,this.wanderTimer<=0){this.wanderTimer=3+Math.random()*5;const e=Math.random()*hn,i=Math.random()*6;this.wanderTarget=new z(this.home.x+Math.cos(e)*i,0,this.home.z+Math.sin(e)*i)}if(this.wanderTarget){const e=this.wanderTarget.x-this.pos.x,i=this.wanderTarget.z-this.pos.z,n=Math.hypot(e,i);if(n>.6){const s=this.def.speed*.28;this.vel.x=e/n*s,this.vel.z=i/n*s,this.yaw=Ci(this.yaw,Math.atan2(e,i),5,t)}else this.wanderTarget=null}this.state="idle"}_chase(t,e){const i=this.game.player,n=i.pos.x-this.pos.x,s=i.pos.z-this.pos.z,o=Math.max(.001,Math.hypot(n,s));this.state="chase";const r=this.def.behavior==="ranged",c=r?this.def.preferredRange??9:this.def.attackRange*.82;if(this.staggerTime<=0)if(o>c){const l=this.def.speed*(this.state==="attack"?.5:1);this.vel.x=n/o*l,this.vel.z=s/o*l,this.yaw=Ci(this.yaw,Math.atan2(n,s),8,t)}else r&&o<c*.62?(this.vel.x=-n/o*this.def.speed*.6,this.vel.z=-s/o*this.def.speed*.6,this.yaw=Ci(this.yaw,Math.atan2(n,s),8,t)):this.yaw=Ci(this.yaw,Math.atan2(n,s),10,t);this.def.model==="wolf"&&this.specialTimer>0&&(this.specialTimer-=t),this.def.model==="wolf"&&this.specialTimer<=0&&o>3.5&&o<10&&this.staggerTime<=0&&(this.specialTimer=5.5,this.vel.x=n/o*this.def.speed*1.9,this.vel.z=s/o*this.def.speed*1.9,this.game.audio?.growl()),this.attackTimer<=0&&o<=this.def.attackRange&&this.staggerTime<=0&&(this.attackTimer=this.def.attackCooldown,this.attackWindup=.32,this.windupActive=!0,this.state="attack",this.stateTime=0,this.pendingRanged=r),this.windupActive&&(this.attackWindup-=t,this.attackWindup<=0&&(this.windupActive=!1,this._executeAttack()))}_executeAttack(){const t=this.game.player,e=re(this.pos.x,this.pos.z,t.pos.x,t.pos.z);if(this.pendingRanged){const i=new z(this.pos.x,this.pos.y+1.5,this.pos.z),n=new z(t.pos.x-i.x,t.pos.y+1-i.y,t.pos.z-i.z).normalize();this.def.model==="wraith"?(this.game.fx.orb(i,n,"#a88fe8",13),this.game.audio?.cast()):(this.game.fx.arrow(i,n,30,"enemy"),this.game.audio?.bow()),this.manager.projectilesFromEnemy(this,i,n,this.damage);return}if(e<=this.def.attackRange+.7){const i=Math.random()<.1,n=this.damage*(i?1.5:1);t.takeDamage(n,this.name),this.game.audio?.enemySwing()}}_updateBoss(t,e){const i=this.game.player,n=i.pos.x-this.pos.x,s=i.pos.z-this.pos.z,o=Math.max(.001,Math.hypot(n,s));if(this.phase===1&&this.hp<this.maxHP*.5){this.phase=2,this.game.ui?.log("„Kaldras: Dość tego teatru.”","bad"),this.game.ui?.toast("Kaldras się przemienia","Faza druga — uważaj na ciosy obszarowe"),this.game.cameraRig.addShake(.8),this.game.fx.magicBurst(this.pos.clone().add(new z(0,1.4,0)),"#ff5b3a");for(let r=0;r<2;r++){const c=Math.random()*hn;this.manager.summon("skeleton",this.pos.x+Math.cos(c)*3.5,this.pos.z+Math.sin(c)*3.5,4)}this.damage*=1.12,this.def={...this.def,speed:this.def.speed*1.1}}this.specialTimer-=t,this.state=this.state==="attack"?this.state:"chase",this.specialTimer<=0&&this.staggerTime<=0&&(this.specialTimer=this.phase===2?4.5:6.5,this.attackTimer=1,this.windupActive=!0,this.attackWindup=.85,this.pendingRanged=!1,this.pendingSlam=!0,this.game.ui?.log("Kaldras wznosi miecz — uciekaj!","warn"),this.game.audio?.growl()),this.windupActive?(this.attackWindup-=t,this.attackWindup<=0&&(this.windupActive=!1,this.pendingSlam&&(this.pendingSlam=!1,this.game.fx.shockwave(this.pos,{color:"#ff7a4a",speed:16,life:.6}),this.game.cameraRig.addShake(.9),this.game.audio?.slam(),e<6.5?(i.takeDamage(this.damage*1.5,"Kaldras"),this.game.ui?.log("Cios Kaldrasa trafił!","bad")):(this.game.ui?.log("Uskoczyłeś przed ciosem Kaldrasa.","good"),i.gainXp?.(0))))):o>3.4&&this.staggerTime<=0&&(this.vel.x=n/o*this.def.speed,this.vel.z=s/o*this.def.speed,this.yaw=Ci(this.yaw,Math.atan2(n,s),7,t)),!this.windupActive&&this.attackTimer<=0&&o<=this.def.attackRange+1.2&&this.staggerTime<=0&&(this.attackTimer=this.def.attackCooldown*(this.phase===2?.8:1),this.attackWindup=.36,this.windupActive=!0,this.pendingRanged=!1)}_animate(t){const{arms:e=[],legs:i=[],body:n,head:s}=this.parts,o=Math.hypot(this.vel.x,this.vel.z)>.4,r=Xt(Math.hypot(this.vel.x,this.vel.z)/Math.max(1,this.def.speed),0,1.6);if(this.walkPhase=(this.walkPhase??0)+t*(3.5+r*7),this.def.model==="wolf"){const h=Math.sin(this.walkPhase*1.4)*.7*r;if(i.forEach((d,u)=>{d.pivot.rotation.x=u%2===0?h:-h}),n.position.y=Math.abs(Math.sin(this.walkPhase*1.4))*.06,this.state==="attack"){const d=Xt(this.stateTime/.4,0,1);n.rotation.x=-.4*Math.sin(d*Math.PI)}else n.rotation.x=Rt(n.rotation.x,0,6,t);this.parts.head&&(this.parts.head.rotation.x=Math.sin(this.walkPhase*.5)*.08);return}if(this.def.model==="wraith"){if(n.position.y=Math.sin(this.stateTime*1.4)*.12,e.forEach((h,d)=>{h.rotation.x=-.5+Math.sin(this.stateTime*1.7+d)*.18,h.rotation.z=(d===0?1:-1)*(.25+Math.sin(this.stateTime*1.1)*.1)}),this.state==="attack"){const h=Xt(this.stateTime/.5,0,1);n.rotation.y=Math.sin(h*Math.PI)*.3,e[0].rotation.x=-2*Math.sin(h*Math.PI)}return}const c=Math.sin(this.walkPhase)*.8*r,l=this.parts.shins??[];if(i[0]&&i[1]&&(i[0].rotation.x=o?c:Rt(i[0].rotation.x,0,8,t),i[1].rotation.x=o?-c:Rt(i[1].rotation.x,0,8,t)),l[0]&&l[1]){const h=this.walkPhase,d=-Math.max(0,-Math.sin(h-.5))*1.1*r-.05,u=-Math.max(0,-Math.sin(h+Math.PI-.5))*1.1*r-.05;l[0].rotation.x=o?d:Rt(l[0].rotation.x,0,8,t),l[1].rotation.x=o?u:Rt(l[1].rotation.x,0,8,t)}if(o&&(e[0].rotation.x=-c*.5,e[1].rotation.x=c*.5,n.position.y=Math.abs(Math.sin(this.walkPhase))*.04),this.state==="attack"||this.windupActive){const h=this.pendingSlam?.85:.32,d=Xt(1-Math.max(0,this.attackWindup)/h,0,1),u=Math.sin(d*Math.PI*.9);e[1].rotation.x=-2.5*u,e[1].rotation.z=-.4*u;const f=this.parts.forearms??[];f[1]&&(f[1].rotation.x=-1.1*u),this.pendingSlam&&(n.rotation.x=-.2*u,e[0].rotation.x=-1.6*u),s.rotation.x=-.2*u}else e[1].rotation.x=Rt(e[1].rotation.x,o?c*.5:0,8,t),e[1].rotation.z=Rt(e[1].rotation.z,0,8,t),e[0].rotation.x=Rt(e[0].rotation.x,o?-c*.5:0,8,t),n.rotation.x=Rt(n.rotation.x,0,8,t),s.rotation.x=Rt(s.rotation.x,0,8,t);this.hitFlash>0?this.model.traverse(h=>{h.isMesh&&h.material&&h.material.emissive&&!h.userData.flashSet&&(h.userData.baseEmissive=h.material.emissive.clone(),h.userData.flashSet=!0),h.isMesh&&h.material?.emissive&&h.material.emissive.setHex(6693410)}):this.model.traverse(h=>{h.isMesh&&h.material?.emissive&&h.userData.flashSet&&(h.material.emissive.copy(h.userData.baseEmissive??new nt(0)),h.userData.flashSet=!1)})}}class wg{constructor(t){this.game=t,this.list=[],this.spawnPoints=[],this.respawnQueue=[],this.projectiles=[],this.timeOfDaySeen=null,this._buildSpawns()}_buildSpawns(){for(const[t,e,i,n]of _g){const s=Ur[i],o={x:t,z:e,type:i,level:n,home:{x:t,z:e}};this.spawnPoints.push(o);const r=new rl(this,o);s.nightOnly&&(r.active=!1,r.model.visible=!1),s.boss&&(r.active=!1,r.model.visible=!1,r.dormant=!0),r.respawnTimer=0,this.list.push(r)}}get alive(){return this.list.filter(t=>t.active&&!t.dead)}update(t){const e=this.game.dayNight.isNight,i=this.list.some(s=>s.def.boss&&!s.dead),n=this.game.player?.pos;if(n)for(const s of this.list){if(!s.dormant||!s.def.boss||s.dead)continue;const o=this.game.quests?.active==="boss"||this.game.quests?.questDone?.("forge"),r=re(s.pos.x,s.pos.z,n.x,n.z)<130;o&&r&&(s.dormant=!1,s.active=!0,s.model.visible=!0,this.game.ui?.log("Mgła gęstnieje — Kaldras się przebudził.","bad"),this.game.ui?.showLocation("Mgliste Wrota","Zwiastun Mroku czuwa"),this.game.audio?.boss?.())}for(const s of this.list){if(s.summoned&&!i){this.game.scene.remove(s.model),s.active=!1,s.dead=!0,s.summoned=!1;continue}if(n&&s.active){const o=s.boss?420:s.aggro?190:150;if(re(s.pos.x,s.pos.z,n.x,n.z)>o){s.model.visible&&(s.model.visible=!1),s._asleep=!0;continue}s._asleep&&(s._asleep=!1,s.dead||(s.model.visible=!0))}s.update(t)}for(let s=this.projectiles.length-1;s>=0;s--){const o=this.projectiles[s];if(o.life-=t,o.timer-=t,o.pos.addScaledVector(o.dir,o.speed*t),o.life<=0){this.projectiles.splice(s,1);continue}if(o.pos.y<j(o.pos.x,o.pos.z)+.15){this.game.fx.burst(o.pos,{color:o.color??"#c9c2b0",count:4,speed:1.4,up:1,life:.35}),this.projectiles.splice(s,1);continue}const r=this.game.player;!r.dead&&re(o.pos.x,o.pos.z,r.pos.x,r.pos.z)<.9&&Math.abs(o.pos.y-(r.pos.y+.9))<1.4&&(r.takeDamage(o.damage,o.source),this.game.fx.burst(o.pos,{color:o.color??"#c1443a",count:6,speed:2,up:1,life:.4}),this.game.audio?.hit(!1),this.projectiles.splice(s,1))}if(e&&this.timeOfDaySeen!=="night"){this.timeOfDaySeen="night";for(const s of this.list)s.isNightOnly&&(s.respawn(),s.active=!0,s.model.visible=!0,s.hp=s.maxHP,s.pos.copy(s.home),s.aggro=!1)}else if(!e&&this.timeOfDaySeen!=="day"){this.timeOfDaySeen="day";for(const s of this.list)s.isNightOnly&&(s.active=!1,s.model.visible=!1,s.aggro=!1)}for(const s of this.list)s.def.boss||s.isNightOnly||!s.dead&&s.active||s.dead&&s.active||(s.respawnTimer===void 0&&(s.respawnTimer=0),s.deathTime>0&&(s.respawnTimer+=t,s.respawnTimer>75&&(s.respawnTimer=0,s.respawn(),s.def.model==="wraith"&&(s.active=!1))))}_spawnAllowed(){return!0}projectilesFromEnemy(t,e,i,n){this.projectiles.push({pos:e.clone(),dir:i.clone(),speed:t.def.model==="wraith"?13:30,damage:n,source:t.name,life:3,timer:0,color:t.def.model==="wraith"?"#a88fe8":"#d8c2a0"})}summon(t,e,i,n){const s={x:e,z:i,type:t,level:n},o=new rl(this,s);return o.aggro=!0,o.summoned=!0,this.list.push(o),this.game.fx.magicBurst(new z(e,j(e,i)+.8,i),"#8fe0ff"),o}reset(){for(const t of this.list)t.summoned&&(this.game.scene.remove(t.model),t.active=!1);this.list=this.list.filter(t=>!t.summoned);for(const t of this.list){if(t.def.boss){t.active=!1,t.dormant=!0,t.model.visible=!1,t.hp=t.maxHP,t.dead=!1;continue}t.respawn(),t.isNightOnly&&(t.active=!1,t.model.visible=!1)}this.projectiles.length=0}}const pa=new qt(.075,4,3),cl=new Xe(.07,.07,.22),Eo=new Map;function Zn(a,t=1){const e=a+t;return Eo.has(e)||Eo.set(e,new Se({color:a,transparent:t<1,opacity:t})),Eo.get(e)}class bg{constructor(t){this.scene=t,this.particles=[],this.rings=[],this.projectiles=[],this.decals=[],this.pool=[],this.time=0}_getMesh(t,e,i=1){return new gt(t,Zn(e,i))}burst(t,{color:e="#ffcf7a",count:i=10,speed:n=3.2,up:s=2.2,size:o=1,life:r=.6,gravity:c=9,spread:l=1}={}){for(let h=0;h<i;h++){const d=this._getMesh(pa,e);d.position.copy(t),d.scale.setScalar(o*(.6+Math.random()*.8)),d.castShadow=!1,this.scene.add(d);const u=Math.random()*Math.PI*2,f=Math.random()*n;this.particles.push({mesh:d,vx:Math.cos(u)*f*l,vy:s*(.4+Math.random()),vz:Math.sin(u)*f*l,life:r,maxLife:r,gravity:c,spin:Math.random()*6})}}slash(t,e,{color:i="#ffe3ae",radius:n=1.9,life:s=.22,arc:o=Math.PI*1.1}={}){const r=new hi(n,.07,4,14,o),c=this._getMesh(r,i,.95);c.material=c.material.clone(),c.position.copy(t),c.position.y+=1,c.rotation.x=Math.PI/2,c.rotation.z=-e-o*.35,c.castShadow=!1,this.scene.add(c),this.rings.push({mesh:c,life:s,maxLife:s,grow:1.9,spin:7,fade:!0})}shockwave(t,{color:e="#ffd28a",radius:i=1,speed:n=14,life:s=.55,y:o=.1}={}){const r=new Lr(.6,.9,24),c=this._getMesh(r,e,.9);c.material=c.material.clone(),c.position.set(t.x,t.y+o,t.z),c.rotation.x=-Math.PI/2,c.castShadow=!1,this.scene.add(c),this.rings.push({mesh:c,life:s,maxLife:s,grow:n/2.4,fade:!0,expand:n}),this.burst(t,{color:e,count:14,speed:5,up:1.6,life:.5,size:1.1})}sparks(t,e="#ffd27a",i=6){for(let n=0;n<i;n++){const s=this._getMesh(cl,e);s.position.copy(t),s.castShadow=!1,this.scene.add(s),this.particles.push({mesh:s,vx:(Math.random()-.5)*6,vy:Math.random()*4+1,vz:(Math.random()-.5)*6,life:.4,maxLife:.4,gravity:14,spin:14,spark:!0})}}heal(t,e="#9fe08a"){for(let i=0;i<16;i++){const n=this._getMesh(pa,e),s=i/16*Math.PI*2;n.position.set(t.x+Math.cos(s)*.7,t.y+.2,t.z+Math.sin(s)*.7),n.castShadow=!1,this.scene.add(n),this.particles.push({mesh:n,vx:Math.cos(s)*.5,vy:2.4,vz:Math.sin(s)*.5,life:1.1,maxLife:1.1,gravity:-.8,spin:3})}}magicBurst(t,e="#8fe0ff"){this.shockwave(t,{color:e,radius:2,speed:18,life:.6,y:.5});for(let i=0;i<3;i++){const n=new hi(.8+i*.35,.05,4,18),s=this._getMesh(n,e,.9);s.material=s.material.clone(),s.position.set(t.x,t.y+1+i*.25,t.z),s.castShadow=!1,this.scene.add(s),this.rings.push({mesh:s,life:.45+i*.12,maxLife:.45+i*.12,grow:4.2,fade:!0,spin:i%2?6:-6})}}arrow(t,e,i=26,n="enemy"){const s=new et,o=new gt(new Wt(.022,.022,.75,4),Zn("#8a6b45"));o.rotation.x=Math.PI/2,s.add(o);const r=new gt(new Bt(.06,.18,4),Zn("#b9c2c9"));r.rotation.x=Math.PI/2,r.position.z=.45,s.add(r);const c=new gt(new Bt(.1,.22,4),Zn("#c9c2b0"));c.rotation.x=-Math.PI/2,c.position.z=-.36,s.add(c),s.position.copy(t),s.lookAt(t.clone().add(e)),this.scene.add(s),this.projectiles.push({mesh:s,dir:e.clone().normalize(),speed:i,life:2.4,owner:n,trail:0,gravity:1.4,isArrow:!0})}orb(t,e,i="#b98fe8",n=12){const s=new et,o=new gt(new Pn(.24,1),Zn(i,.95));s.add(o);const r=new gt(new qt(.44,8,6),Zn(i,.28));s.add(r);const c=new Ne(i,2.6,6,2);s.add(c),s.position.copy(t),this.scene.add(s),this.projectiles.push({mesh:s,dir:e.clone().normalize(),speed:n,life:3.2,owner:"enemy",isOrb:!0,color:i,trail:0,gravity:0})}update(t){this.time+=t;for(let e=this.particles.length-1;e>=0;e--){const i=this.particles[e];if(i.life-=t,i.life<=0){this.scene.remove(i.mesh),i.mesh.geometry!==pa&&i.mesh.geometry!==cl&&i.mesh.geometry.dispose(),this.particles.splice(e,1);continue}i.vy-=i.gravity*t,i.mesh.position.x+=i.vx*t,i.mesh.position.y+=i.vy*t,i.mesh.position.z+=i.vz*t,i.mesh.rotation.x+=i.spin*t,i.mesh.rotation.y+=i.spin*t*.7;const n=i.life/i.maxLife;i.mesh.scale.multiplyScalar(.97),i.mesh.visible=n>.05}for(let e=this.rings.length-1;e>=0;e--){const i=this.rings[e];i.life-=t;const n=Xt(i.life/i.maxLife,0,1);if(i.life<=0){this.scene.remove(i.mesh),i.mesh.geometry.dispose(),this.rings.splice(e,1);continue}i.mesh.scale.multiplyScalar(1+i.grow*t),i.spin&&(i.mesh.rotation.z+=i.spin*t),i.fade&&(i.mesh.material.transparent=!0,i.mesh.material.opacity=n*.9)}for(let e=this.projectiles.length-1;e>=0;e--){const i=this.projectiles[e];if(i.life-=t,i.life<=0){this.scene.remove(i.mesh),this.projectiles.splice(e,1);continue}i.dir.y-=i.gravity*t*.4,i.mesh.position.addScaledVector(i.dir,i.speed*t),i.mesh.lookAt(i.mesh.position.clone().add(i.dir)),i.isOrb&&(i.mesh.children[0].rotation.x+=t*8,i.trail-=t,i.trail<=0&&(i.trail=.05,this.particles.push({mesh:(()=>{const n=this._getMesh(pa,i.color,.8);return n.position.copy(i.mesh.position),this.scene.add(n),n})(),vx:(Math.random()-.5)*.8,vy:(Math.random()-.5)*.8,vz:(Math.random()-.5)*.8,life:.4,maxLife:.4,gravity:0,spin:4})))}}clear(){for(const t of this.particles)this.scene.remove(t.mesh);for(const t of this.rings)this.scene.remove(t.mesh);for(const t of this.projectiles)this.scene.remove(t.mesh);this.particles.length=0,this.rings.length=0,this.projectiles.length=0}}class Sg{constructor(t){this.camera=t,this.yaw=Math.PI,this.pitch=.24,this.distance=5.4,this.targetDistance=5.4,this.pivot=new z,this.shake=0,this.shakeTime=0,this.lookTarget=new z,this.offset=new z,this.initialized=!1,this.fov=62,this.closeness=1,this.currentDistance=5.4}look(t,e,i=.0022){this.yaw-=t*i,this.pitch=Xt(this.pitch+e*i,-.42,1.02)}addShake(t){this.shake=Math.min(1.4,this.shake+t)}update(t,e,i=0,n=0){return this._update(t,e,i,n)}_update(t,e,i=0,n=0){this.targetDistance=vi(this.targetDistance,5.1+Math.min(2.4,i*.14)+n,1-Math.exp(-3*t)),this.distance=Rt(this.distance,this.targetDistance,5.5,t);const s=new z(e.x,e.y+1.55,e.z);this.initialized||(this.pivot.copy(s),this.initialized=!0),this.pivot.x=Rt(this.pivot.x,s.x,14,t),this.pivot.y=Rt(this.pivot.y,s.y,9,t),this.pivot.z=Rt(this.pivot.z,s.z,14,t);const o=Math.cos(this.pitch),r=new z(this.pivot.x+Math.sin(this.yaw)*o*this.distance,this.pivot.y+Math.sin(this.pitch)*this.distance+.35,this.pivot.z+Math.cos(this.yaw)*o*this.distance),c=j(r.x,r.z)+.7;if(r.y<c&&(r.y=c),this.colliders&&this.colliders.length){const u=r.clone().sub(this.pivot),f=7;let g=1;for(let v=1;v<=f;v++){const p=v/f,m=this.pivot.x+u.x*p,y=this.pivot.z+u.z*p;let w=j(m,y)+.5>this.pivot.y+u.y*p+.1;if(!w)for(const R of this.colliders){if(R.r<1.6)continue;const E=m-R.x,T=y-R.z;if(E*E+T*T<R.r*R.r*.9){w=!0;break}}if(w){g=Math.max(.34,(v-1)/f);break}}if(g<1){this.closeness=g,r.copy(this.pivot).add(u.multiplyScalar(g));const v=j(r.x,r.z)+.6;r.y<v&&(r.y=v)}else this.closeness=1}const l=r.clone().sub(this.pivot);let h=0;for(let u=1;u<=8;u++){const f=u/8,g=this.pivot.x+l.x*f,v=this.pivot.z+l.z*f,p=j(g,v)+.9-(this.pivot.y+l.y*f);p>0&&(h=Math.max(h,p/Math.max(.25,f)))}const d=Math.min(h,14);if(this.lift=Rt(this.lift??0,d,d>(this.lift??0)?7:3.5,t),r.y+=this.lift,this.camera.position.copy(r),this.currentDistance=this.camera.position.distanceTo(this.pivot),this.shake>.001){this.shakeTime+=t;const u=this.shake;this.camera.position.x+=Math.sin(this.shakeTime*46)*u*.16,this.camera.position.y+=Math.cos(this.shakeTime*39)*u*.13,this.camera.position.z+=Math.sin(this.shakeTime*53)*u*.16,this.shake=Math.max(0,this.shake-t*2.6)}this.lookTarget.set(this.pivot.x-Math.sin(this.yaw)*1.2,this.pivot.y+Math.sin(-this.pitch)*.4,this.pivot.z-Math.cos(this.yaw)*1.2),this.camera.lookAt(this.lookTarget),this.camera.rotation.z+=Math.sin(this.shakeTime*21)*this.shake*.05,this.camera.fov!==this.fov&&(this.camera.fov=Rt(this.camera.fov,this.fov,4,t),this.camera.updateProjectionMatrix())}forward(){return new z(-Math.sin(this.yaw),0,-Math.cos(this.yaw))}right(){return new z(Math.cos(this.yaw),0,-Math.sin(this.yaw))}}const wi={wolves:{name:"Wilki u bram",giver:"eryn",level:1,intro:"Stary Eryn rozgrzebuje ogień kijem. „Trzy noce z rzędu wilki podchodzą pod płoty. Zabito dwie owce, a pastuch twierdzi, że wśród nich biegł jeden… większy. Zajmij się nimi, zanim stado wejdzie do wioski.”",objectives:[{id:"kill",type:"kill",enemy:"wolf",target:5,text:"Zabij wilki wokół Wilczej Doliny (0/5)"},{id:"return",type:"talk",npc:"eryn",text:"Wróć do Starego Eryna"}],reward:{gold:90,xp:160,items:[["health_potion",2],["bread",1]]},outro:"Eryn kiwa głową. „Pięć? To więcej, niż myślałem. Bierz monety, zasłużyłeś.”",next:"grain"},grain:{name:"Zrabowane zboże",giver:"eryn",level:2,intro:"„Banda Rudego Wilka zabrała nam zapas zboża na zimę. Obozowisko leży na północny zachód, za rozdrożem. Przynieś worek, a jeśli Rudy stanie ci na drodze… cóż, nikt w wiosce nie będzie płakać.”",objectives:[{id:"grain",type:"collect",item:"stolen_grain",target:1,text:"Odzyskaj worek zboża z obozu bandytów"},{id:"leader",type:"kill",enemy:"bandit_leader",target:1,text:"Pokonaj Rudego Wilka"},{id:"return",type:"talk",npc:"eryn",text:"Wróć do Starego Eryna"}],reward:{gold:140,xp:260,items:[["iron_ore",3],["health_potion",2]]},outro:"Eryn przez chwilę milczy. „Rudy Wilk nie żyje. To znaczy, że w dolinie zrobi się spokojniej… albo ktoś inny zajmie jego miejsce.” Wskazuje na północ. „Kurhan Szeptu, na północnym wschodzie. Słyszałeś kiedyś, jak ziemia mówi?”",next:"barrow"},barrow:{name:"Szept Kurhanu",giver:"eryn",level:3,intro:"„W kurhanie na północnym wschodzie pochowano kiedyś wieszczkę. Nocami jej głos niesie się po dolinie i woła imiona tych, którzy umrą. Idź tam po zmroku i ucisz ją. Mówią, że strzeże okruchu ostrza — tego, o którym mówił twój ojciec.”",objectives:[{id:"wraith",type:"kill",enemy:"wraith",target:1,text:"Pokonaj Wieszczkę z Kurhanu (tylko nocą)"},{id:"shard",type:"collect",item:"shard_dawn",target:1,text:"Zdobądź Okruch Ostrza Świtu"},{id:"return",type:"talk",npc:"eryn",text:"Wróć do Starego Eryna"}],reward:{gold:180,xp:340,items:[["crystal_mana",2],["mana_potion",2]]},outro:"Eryn patrzy na okruch w twojej dłoni i po raz pierwszy wygląda na starego. „Trzy okruchy. Tak mówiła przepowiednia: jeden w garści bandyty, jeden w trumnie wieszczki, jeden w kamieniu Kowalskiej Góry. Zanieś je do kuźni, chłopcze. I wykuj ostrze, zanim Kaldras się obudzi.”",next:"forge"},forge:{name:"Starożytne Ostrze",giver:"eryn",level:4,intro:"Borys kowal rozkłada na anvilu trzy okruchy. „Starożytny metal jest w kamieniołomie na zachodzie. Wykuję ci klingę, ale musisz sam przynieść wszystko. Trzy okruchy, dwa kawałki metalu i cierpliwość.”",objectives:[{id:"metal",type:"collect",item:"ancient_metal",target:2,text:"Zdobądź starożytny metal (2)"},{id:"shards",type:"collect",item:"shard_dawn",target:3,text:"Zdobądź trzy okruchy Ostrza Świtu (3)"},{id:"craft",type:"own",item:"dawn_blade",target:1,text:"Wykuj Klingę Świtu w kuźni"}],reward:{gold:200,xp:420,items:[["might_elixir",2]]},outro:"Ostrze wychodzi z ognia białe jak poranek. Borys cofa się o krok. „Nie dotykałem czegoś takiego od trzydziestu lat. Idź. Wrota na północy czekają, a Kaldras nie będzie czekał wiecznie.”",next:"boss"},boss:{name:"Mgliste Wrota",giver:"eryn",level:5,intro:"Eryn stoi na skraju wioski i patrzy na północ, gdzie nad ruinami zbiera się mgła. „Kaldras był kiedyś strażnikiem tych wrót. Potem coś po drugiej stronie zaczęło mu odpowiadać. Zamknij je. Na zawsze.”",objectives:[{id:"kaldras",type:"kill",enemy:"kaldras",target:1,text:"Pokonaj Kaldrasa w Mglistych Wrotach"}],reward:{gold:500,xp:1e3,items:[]},outro:"Mgła opada. Po raz pierwszy od trzydziestu lat Wilcza Dolina widzi świt.",final:!0}},vr=["wolves","grain","barrow","forge","boss"],Eg=["Trzydzieści lat temu Kaldras zamknął Mgliste Wrota od zewnątrz i został po ich stronie.","Ostrze Świtu wykuto ze spadającej gwiazdy. Rozpadło się na trzy okruchy, gdy jego właściciel zginął.","Wieszczka z Kurhanu nie jest duchem — to przekleństwo, które zostało po kobiecie, co zbyt długo patrzyła w mgłę.","Rudy Wilk sprzedawał zboże na południe. Ale to nie głód był jego prawdziwym interesem.","Borys kowal pracował przy starożytnej kuźni, zanim spaliła mu się ręka. Nie lubi o tym mówić.","Wilki z Doliny nie atakują bez powodu. Ktoś je niepokoi."],Tg=a=>{const t={start:{speaker:"Stary Eryn",text:a.active==="wolves"?"„Wilki wciąż grasują. Ludzie boją się wychodzić po zmroku. Policz je, chłopcze — pięć sztuk i będziemy spać spokojnie.”":a.active==="grain"?"„Obozowisko Rudego Wilka leży na zachód od rozdroża. Worek zboża musi wrócić do wioski. A Rudy… Rudy nie musi.”":a.active==="barrow"?"„Kurhan jest na północnym wschodzie, za rozstajem. Idź tam po zmroku, inaczej wieszczka nie pokaże się wcale.”":a.active==="forge"?"„Borys czeka przy anvilu. Trzy okruchy, dwa kawałki starożytnego metalu. Kowalska Góra ma jedno i drugie, jeśli dobrze szukać.”":a.active==="boss"?"„Mgliste Wrota są na północy, za kamiennym łukiem. Idź i nie oglądaj się za siebie.”":"„Wilcza Dolina nie jest bogata, ale ma dach i ogień. Rozgość się — choć nie na długo, bo mamy problemy.”",choices:[]}},e=t.start,i=a.active;if(i)a.canComplete?(e.choices.push({label:"„Zrobione. Wszystko, jak prosiłeś.”",action:`complete:${i}`,special:!0}),e.choices.push({label:"„Jeszcze nie teraz.”",action:"close"})):(e.choices.push({label:"„Wrócę, gdy skończę.”",action:"close"}),e.choices.push({label:"„Opowiedz mi o Kaldrasie.”",next:"lore"}),a.active==="barrow"&&!a.night&&e.choices.push({label:"„Jak mam walczyć z duchem?”",next:"wraith"}));else{const n=a.availableQuest;n?e.choices.push({label:`„Co się dzieje?” — przyjmij zadanie: ${n.name}`,action:`accept:${n.id}`,special:!0}):a.allDone?e.choices.push({label:"„Wrota są zamknięte. Wioska może odetchnąć.”",action:"close"}):e.choices.push({label:"„Wrócę, gdy będę gotów.”",action:"close"}),e.choices.push({label:"„Opowiedz mi o Kaldrasie.”",next:"lore"}),e.choices.push({label:"„Muszę iść.”",action:"close"})}return t.lore={speaker:"Stary Eryn",text:"„Kaldras był strażnikiem Mglistych Wrót, jeszcze przed twoim urodzeniem. Trzydzieści lat temu mgła zaczęła szeptać. On wszedł między wrota i zamknął je od zewnątrz — własnym ciałem. Myśleliśmy, że to koniec. Nie było. Teraz to, co po drugiej stronie, nosi jego twarz.”",choices:[{label:"„Jak go pokonać?”",next:"howto"},{label:"„Wróćmy do spraw wioski.”",next:"start"}]},t.howto={speaker:"Stary Eryn",text:"„Ostrzem Świtu. Twoja matka nosiła je do końca. Rozpadło się na trzy okruchy — jeden zabrał Rudy Wilk, jeden strzeże wieszczka, jeden leży w kamieniu na Kowalskiej Górze. Kowal Borys wie, co z tym zrobić.”",choices:[{label:"„Rozumiem.”",next:"start"}]},t.wraith={speaker:"Stary Eryn",text:"„Duch nie krwawi. Ale boi się światła i stali, która pamięta ogień. Użyj Znaku Świtu, gdy się zbliży. I nie stój w miejscu — jej szept wysysa siły.”",choices:[{label:"„Dzięki.”",next:"start"}]},t},Ag=a=>{const t={start:{speaker:"Borys Kowal",text:a.questDone("barrow")?"„Okruch z kurhanu? Pokaż. Hmm. Zimny jak sedno zimy. Rozłóż wszystko na anvilu — wykuję ci klingę, jakiej ta dolina nie widziała.”":"„Stal się nie tnie, jeśli jej nie szanujesz. Co chcesz, żebym ci zrobił?”",choices:[{label:"Otwórz kuźnię (rzemiosło)",action:"craft"},{label:"„Opowiedz o starożytnej kuźni.”",next:"forge_lore"},{label:"„Muszę iść.”",action:"close"}]},forge_lore:{speaker:"Borys Kowal",text:"„Kowalska Góra to nie moja robota. Ktoś tam kuł metal, zanim ludzie nauczyli się czytać. Została im tylko ta przeklęta kuźnia i kamienie, które świecą w nocy. Spaliłem sobie rękę, próbując ją rozpalić. Nie idź tam bez powodu.”",choices:[{label:"„Zapamiętam.”",next:"start"}]}};return a.hasItem("dawn_blade")&&(t.start.text="„Klinga Świtu. Wyszła lepiej, niż śmiałem marzyć. Uważaj na nią — ostrze pamięta każde cięcie.”"),t},Cg=a=>({start:{speaker:"Marena Zielarka",text:a.night?"„Nocą zioła zamykają się, ale mikstury są gotowe. Czego potrzebujesz?”":"„Zioła zbieram o świcie, gdy rosa jeszcze nie opadnie. Mów, co ci dolega.”",choices:[{label:"Kup mikstury",action:"shop:marena"},{label:"„Co wiesz o kurhanie?”",next:"barrow_lore"},{label:"Odpocznij przy ognisku (do świtu)",action:"rest"},{label:"„Muszę iść.”",action:"close"}]},barrow_lore:{speaker:"Marena Zielarka",text:"„Wieszczka z Kurhanu nie jest zła. Była kobietą, która patrzyła w mgłę dłużej, niż powinna. Teraz powtarza to, co usłyszała — imiona. Jeśli usłyszysz swoje, nie odpowiadaj.”",choices:[{label:"„A jeśli odpowiem?”",next:"barrow_lore2"},{label:"„Dzięki.”",next:"start"}]},barrow_lore2:{speaker:"Marena Zielarka",text:"„Wtedy przyjdzie po ciebie. Ale nie martw się — twoje imię jeszcze nie pada w jej szeptach. Jeszcze.”",choices:[{label:"…",next:"start"}]}}),Rg=a=>({start:{speaker:"Kupiec Zorzan",text:"„Towar z południa, ceny z północy. Tak się handluje w tej dolinie. Co cię interesuje?”",choices:[{label:"Otwórz sklep",action:"shop:zorzan"},{label:"„Sprzedasz mi coś na bandytów?”",next:"bandits"},{label:"„Skąd przywozisz towar?”",next:"lore"},{label:"„Muszę iść.”",action:"close"}]},bandits:{speaker:"Kupiec Zorzan",text:"„Rudy Wilk kupował ode mnie noże. Dużo noży. Płacił dobrze, więc nie pytałem. Teraz wiem, po co były.”",choices:[{label:"„Zapłacisz za to kiedyś.”",next:"start"}]},lore:{speaker:"Kupiec Zorzan",text:"„Z południa, gdzie nie ma już dróg, tylko mgła. Handluję z tymi, którzy jeszcze wracają. Coraz mniej ich wraca.”",choices:[{label:"„Wróćmy do interesów.”",next:"start"}]}}),zg=a=>({start:{speaker:"Strażnik Wilk",text:a.playerLevel<3?"„Nowy? Trzymaj się blisko wioski i nie ufaj wilkom, co nie uciekają. Atakuj z dystansu albo z zaskoczenia.”":"„Widzę, że umiesz machnąć mieczem. Uważaj tylko na tych z łukami — strzelają zanim zdążysz zamachnąć.”",choices:[{label:"„Jak walczyć z bandytami?”",next:"tips"},{label:"„Gdzie znajdę rudę?”",next:"ore"},{label:"„Dzięki.”",action:"close"}]},tips:{speaker:"Strażnik Wilk",text:"„Bandyci walczą w grupie. Zwab jednego na bok, potem drugiego. Unik to twój najlepszy przyjaciel — naciśnij spację, gdy tylko zobaczysz zamach. A gdy zabraknie sił, uciekaj, nie udawaj bohatera.”",choices:[{label:"„Zapamiętam.”",next:"start"}]},ore:{speaker:"Strażnik Wilk",text:"„Ruda leży w kamieniołomie na południu, przy starych wozach. Starożytny metal znajdziesz w kurhanie — ale tam nie chodzi się samemu.”",choices:[{label:"„Dzięki.”",next:"start"}]}}),Pg=a=>({start:{speaker:"Iskra",text:"„Uczę się magii od Marianny, ale ona twierdzi, że mam za dużo zapału, a za mało cierpliwości. Ty umiesz czarować? Pokaż coś!”",choices:[{label:"„Pokażę ci Znak Świtu.”",next:"spell"},{label:"„Jakub to twój…?”",next:"family"},{label:"„Muszę iść.”",action:"close"}]},spell:{speaker:"Iskra",text:"„Ojej! To było jak prawdziwe światło! Naucz mnie kiedyś, dobrze? Obiecuję, że nie podpalę wioski. Przynajmniej nie od razu.”",choices:[{label:"„Kiedyś.”",next:"start"}]},family:{speaker:"Iskra",text:"„Jakub był moim bratem. Zginął przy kurhanie dwa lata temu. Mówią, że to wilki... ale wilki nie zostawiają śladów stali na kościach.”",choices:[{label:"„Przykro mi.”",next:"start"}]}}),kg=a=>({start:{speaker:"Cień pod Łukiem",text:"„Znałem twoją matkę. Nosiła ostrze, którego nikt nie potrafił wykować na nowo. Kaldras nie jest potworem — jest strażnikiem, który zapomniał, kogo pilnuje. Oszczędź go, jeśli możesz.”",choices:[{label:"„Kim jesteś?”",next:"who"},{label:"„Muszę iść.”",action:"close"}]},who:{speaker:"Cień pod Łukiem",text:"„Nikim ważnym. Kiedyś nazywano mnie Corem. Teraz jestem tylko mgłą, która pamięta imiona.”",choices:[{label:"…",next:"start"}]}}),Ig=()=>({start:{speaker:"Pustelnik Ivar",text:"„Przychodzisz z dołu, z hałasu. Siadaj. W ciemnym lesie nikt nie pyta, po co przyszedł — tylko czy przyniósł własne milczenie.”",choices:[{label:"„Co wiesz o Mglistych Wrotach?”",next:"gates"},{label:"„Mogę odpocząć przy twoim ogniu?”",next:"rest"},{label:"„Muszę iść.”",action:"close"}]},gates:{speaker:"Pustelnik Ivar",text:"„Wrota nie zostały zbudowane po to, by coś wpuszczać. Zbudowano je, żeby coś trzymać w środku. Kaldras stanął w progu i zapomniał, po której stronie stoi. Gdy go spotkasz, nie pytaj go o imię — odpowie cudzym.”",choices:[{label:"„Skąd to wiesz?”",next:"who"},{label:"„Wróćmy do ognia.”",next:"start"}]},who:{speaker:"Pustelnik Ivar",text:"„Byłem przy wrotach, gdy je zamykano. Miałem wtedy inne imię i inne oczy. Zostało mi to, co widzisz: ogień, mech i trzy zdania prawdy na krzyż.”",choices:[{label:"„Rozumiem.”",next:"start"}]},rest:{speaker:"Pustelnik Ivar",text:"„Ogień jest twój, dopóki płonie. Ale pamiętaj — las nie śpi, gdy ty śpisz.”",choices:[{label:"Usiądź przy ogniu",action:"rest"},{label:"„Dziękuję.”",next:"start"}]}}),Lg=()=>({start:{speaker:"Kupiec Bogdan",text:"„Kotlina Kupców! Najlepsze ceny od Wilczej Doliny do przełęczy, a i tam nie ma czego szukać. Czego szukasz — stali, ziół, czy może plotki?”",choices:[{label:"„Pokaż towar.”",action:"shop:bogdan"},{label:"„Co słychać na trakcie?”",next:"news"},{label:"„Muszę iść.”",action:"close"}]},news:{speaker:"Kupiec Bogdan",text:"„Na trakcie coraz więcej znaków. Bandyci Rudego Wilka siedzą na północnym zachodzie i liczą każdego, kto idzie z ładunkiem. Za przełęczą ktoś zabił trzy wozy. A nad jeziorem rybacy mówią, że woda w nocy paruje — i to nie od zimna.”",choices:[{label:"„A Kamienny Krąg?”",next:"circle"},{label:"„Wróćmy do interesów.”",next:"start"}]},circle:{speaker:"Kupiec Bogdan",text:"„Kamienny Krąg stoi na wschód od traktu, na polanie, której nikt nie kosi. Kamienie pamiętają więcej niż my. Ja tam nie chodzę — ale towar z kręgu zawsze jest w cenie.”",choices:[{label:"„Ciekawe.”",next:"start"}]}}),Gi={eryn:{name:"Stary Eryn",role:"Starosta Wilczej Doliny",pos:[8,344],rot:-.45,radius:4.2,visual:{tunic:"#5c4a33",pants:"#3a3228",hair:"#b9b0a0",beard:!0,skin:"#c79a71",bulk:1,cloak:"#4a4034"},tree:Tg},borys:{name:"Borys Kowal",role:"Kowal",pos:[-16,353],rot:1.6,radius:4.2,visual:{tunic:"#4a3a2c",pants:"#33291f",hair:"#2a1d14",beard:!0,skin:"#b98258",bulk:1.16,armor:"#5b5548",scar:!0},tree:Ag},marena:{name:"Marena Zielarka",role:"Zielarka",pos:[23,340],rot:-1.1,radius:4.2,visual:{tunic:"#3f5a42",pants:"#3a3b2e",hair:"#8a6b45",skin:"#d2a67d",bulk:.94,cloak:"#2f4a37"},tree:Cg},zorzan:{name:"Kupiec Zorzan",role:"Wędrowny kupiec",pos:[11,371],rot:1,radius:4.2,visual:{tunic:"#5a3f52",pants:"#382e3a",hair:"#241a16",skin:"#c9976d",bulk:1.02,cloak:"#45304a",hood:"#3a2840"},tree:Rg},wilk:{name:"Strażnik Wilk",role:"Straż wioski",pos:[4,313],rot:.15,radius:4,visual:{tunic:"#4c4e52",pants:"#33373b",hair:"#3a2b1f",skin:"#cba07a",bulk:1.1,armor:"#5e6367"},tree:zg},iskra:{name:"Iskra",role:"Uczennica zielarki",pos:[27,344],rot:2.4,radius:4,visual:{tunic:"#5d6a4c",pants:"#3c4032",hair:"#b8542f",skin:"#e0b48a",bulk:.84},tree:Pg},pustelnik:{name:"Pustelnik Ivar",role:"Samotnik z Ciemnego Lasu",pos:[-556,-196],rot:.9,radius:4.4,visual:{tunic:"#46503c",pants:"#33372c",hair:"#c8c2b2",beard:!0,skin:"#c39a76",bulk:.9,cloak:"#37402f",hood:"#3c4636"},tree:Ig},kupiec:{name:"Kupiec Bogdan",role:"Handlarz z Kotliny",pos:[172,256],rot:2.2,radius:4.4,visual:{tunic:"#5b4636",pants:"#3a3026",hair:"#2d2119",skin:"#c08a5e",bulk:1.08,cloak:"#6a4a3a",hood:"#4a3628"},tree:Lg},duch:{name:"Cień pod Łukiem",role:"Zjawisko",pos:[-148,-534],rot:.4,radius:5,ghost:!0,hidden:!0,visual:{tunic:"#3d4a52",pants:"#2f3a40",hair:"#20282c",skin:"#8fa6ad",bulk:1,cloak:"#2a3a44",eyeColor:"#8fe0ff"},tree:kg}},Dg={zorzan:{name:"Kupiec Zorzan",stock:["health_potion","mana_potion","bread","leather_hood","leather_vest","hunter_bow","iron_ore","herbs","health_potion"]},marena:{name:"Marena Zielarka",stock:["health_potion","mana_potion","might_elixir","herbs","herbs","crystal_mana"]},bogdan:{name:"Kupiec Bogdan",stock:["health_potion","mana_potion","bread","iron_ore","ancient_metal","iron_axe","hunter_bow","leather_vest","might_elixir"]}},ll=["Walka wręcz nagradza cierpliwość — unik w odpowiednim momencie otwiera kontratak.","Nocą wilki są szybsze, a w kurhanie pojawia się coś, czego nie ma w dzień.","Odpoczynek przy ognisku leczy rany i przesuwa czas do świtu.","Zbieraj zioła i rudę — rzemiosło bywa cenniejsze niż złoto.","Krytyczne trafienia zależą od zręczności, ale każde ostrze ma swoją wagę."];for(const a of Object.values(Gi))Array.isArray(a.pos)&&(a.pos=[a.pos[0]*ce,a.pos[1]*ce]),Array.isArray(a.home)&&(a.home=[a.home[0]*ce,a.home[1]*ce]);const hl={sword:'<path d="M19 4.5l-8.5 10.5-2 2-2-2 2-2L19 4.5z"/><path d="M15.5 8l2 2"/><path d="M6.5 16.5L4 19"/>',axe:'<path d="M13 4c4.5 0 7 2.5 7 5.5S17.5 15 13 15z"/><path d="M13 15l-1 5"/><path d="M11.5 3.5v17"/>',bow:'<path d="M6 4c6.5 4.5 6.5 11.5 0 16"/><path d="M6 4l13 16"/><path d="M15.5 9.5l3.5-1"/>',armor:'<path d="M8.5 4.5L12 6l3.5-1.5L19 8l-2 12H7L5 8z"/><path d="M10 11.5h4"/>',helm:'<path d="M5 13a7 7 0 0 1 14 0v4.5H5z"/><path d="M9.5 17.5v-4M14.5 17.5v-4"/>',amulet:'<circle cx="12" cy="15.5" r="3.8"/><path d="M5.5 4.5c2.2 3.2 4 4.4 6.5 4.4s4.3-1.2 6.5-4.4"/>',ring:'<circle cx="12" cy="14.5" r="4.5"/><path d="M9.4 8.4L12 4l2.6 4.4z"/>',potion:'<path d="M9.5 3.5h5v3.8l3.6 6.3A4.6 4.6 0 0 1 14 20.5h-4a4.6 4.6 0 0 1-4.1-6.9L9.5 7.3z"/><path d="M7.5 14.5h9"/>',elixir:'<path d="M6.5 4h11l-1.8 6.4a4 4 0 0 1-7.4 0z"/><path d="M12 14.5V19"/><path d="M9 20h6"/>',meat:'<path d="M8 17.5a5.5 5.5 0 1 1 7.5-7.5c2.2 0 4 1.8 4 4s-1.8 4-4 4z"/><path d="M17.5 6.5l-2 2"/>',bread:'<ellipse cx="12" cy="12.5" rx="8" ry="5"/><path d="M8.5 10.5v4M12 9.5v6M15.5 10.5v4"/>',pelt:'<path d="M6 4.5c3 1.2 5 .2 6-.8 1 1 3 2 6 .8-1 4.2-2 8-2 12.5-2.2 1-5.8 1-8 0 0-4.5-1-8.3-2-12.5z"/><path d="M9.5 12h1M13.5 12h1"/>',ore:'<path d="M4.5 15.5l3-6.5 4 2 3-4 4.5 6.5-2 5H6.5z"/><path d="M7.5 9l1.5 3M14.5 7l-1 4"/>',herb:'<path d="M12 20.5V9.5"/><path d="M12 12.5c-4 0-6.2-2-6.2-6.2 4 0 6.2 2 6.2 6.2z"/><path d="M12 15.5c4 0 6.2-2 6.2-6.2-4 0-6.2 2-6.2 6.2z"/>',metal:'<path d="M4 17l4.5-8h11.5L15.5 17z"/><path d="M8.5 9l4 8"/>',crystal:'<path d="M12 3.5l5 7-5 10-5-10z"/><path d="M7 10.5h10"/>',shard:'<path d="M12 3l1.9 6.6L20.5 12l-6.6 2.4L12 21l-1.9-6.6L3.5 12l6.6-2.4z"/>',key:'<circle cx="8" cy="8" r="3.6"/><path d="M10.6 10.6L19 19"/><path d="M15.5 15.5l2 2"/><path d="M18 18l1.5 1.5"/>',grain:'<path d="M9 4.5h6l1 3.2c2 2.1 2.2 5.3 2.2 8.3H5.8c0-3 .2-6.2 2.2-8.3z"/><path d="M9 4.5h6"/><path d="M9.5 12.5v3.5M14.5 12.5v3.5"/>',bone:'<path d="M8.5 15.5l7-7"/><circle cx="7" cy="17" r="2.4"/><circle cx="17" cy="7" r="2.4"/>',coin:'<circle cx="12" cy="12" r="7.5"/><path d="M12 8.5v7M10 10h3.2a1.6 1.6 0 0 1 0 3.2H10"/>',star:'<path d="M12 3.5l2.4 5.6 6 .6-4.5 4 1.4 5.9-5.3-3.1-5.3 3.1 1.4-5.9-4.5-4 6-.6z"/>',unknown:'<circle cx="12" cy="12" r="7.5"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3v1.7"/><path d="M12 17h.01"/>'};function sn(a,t=20,e=""){const i=hl[a]??hl.unknown;return`<svg class="ico-svg ${e}" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${i}</svg>`}const pi=a=>Math.round(a).toLocaleString("pl-PL"),Fi=a=>Math.max(0,Math.min(1,a));function lt(a,t=document){return t.querySelector(a)}const dl=[{...tt.village,short:"Wilcza Dolina",color:"#e2b878"},{...tt.trading,short:"Kotlina Kupców",color:"#d8b85a"},{...tt.crossroads,short:"Rozdroże",color:"#cfc2a4"},{...tt.forge,short:"Kowalska Góra",color:"#6ee0d6"},{...tt.bandits,short:"Obóz bandytów",color:"#d0705a"},{...tt.barrow,short:"Kurhan Szeptu",color:"#b49ae0"},{...tt.ruins,short:"Mgliste Wrota",color:"#b977e8"},{...tt.quarry,short:"Kamieniołom",color:"#c9c2b0"},{...tt.lake,short:"Jezioro Zwierciadło",color:"#7fb8cc"},{...tt.castle,short:"Warownia Popiołu",color:"#c08f6a"},{...tt.hermit,short:"Pustelnia",color:"#9fc48a"},{...tt.swamp,short:"Bagno Wieszczki",color:"#7f9670"},{...tt.pass,short:"Przełęcz Kalmoru",color:"#b0a898"},{...tt.circle,short:"Kamienny Krąg",color:"#9f7cf0"},{...tt.mine,short:"Kopalnia",color:"#a89a80"}];function ul(a,t){const e=j(a,t),i=Math.hypot(a-tt.lake.x,t-tt.lake.z),n=Math.hypot(a-tt.swamp.x,t-tt.swamp.z);if(i<118&&e<Qt+.2)return[42,70,88];if(i<126&&e<Qt+1.8)return[122,112,82];if(n<200)return[74,82,58];if(e>196)return[226,229,231];if(e>154)return[162,160,154];if(e>108)return[116,112,104];const s=Is(a,t),o=Xt((e-22)/40,0,1);let r=[96-o*16,112-o*10,68-o*12];s>.55&&(r=[r[0]*.62+22,r[1]*.66+12,r[2]*.6+10]);const c=.86+e%7*.012;return[r[0]*c,r[1]*c,r[2]*c]}function fl(a,t,e=2.2){const i=j(a+e,t)-j(a-e,t),n=j(a,t+e)-j(a,t-e);return Xt(.72+Math.max(0,.62+(-i-n)*.62)*.42,.55,1.4)}class Ug{constructor(t,e){this.game=t,this.root=e,this.logLines=[],this.nameplates=[],this.floatEls=[],this.toastTimer=0,this.locationTimer=0,this.interactText=null,this.mapCanvas=null,this.mapSize=560,this.minimapAcc=0,this.hudAcc=0,this.platesAcc=0,this.infoOpen=!1,this.lastTab="character",this.selectedItem=null,this.shopId=null,this.craftStation="village",this.dialogueOpen=!1,this._buildHud(),this._buildPanels(),this._buildScreens()}_buildHud(){const t=document.createElement("div");t.className="hud",t.innerHTML=`
      <div class="compass">
        <div class="compass-strip" id="compass">
          <div class="inner" id="compass-inner"></div>
          <div class="needle"></div>
        </div>
        <div class="compass-obj" id="compass-obj"></div>
      </div>

      <div class="help-hint">
        <b>WASD</b> ruch · <b>Shift</b> bieg<br/>
        <b>LPM</b> atak · <b>Spacja</b> unik<br/>
        <b>Q/E/R</b> zaklęcia · <b>F</b> interakcja<br/>
        <b>I</b> ekwipunek · <b>C</b> postać · <b>K</b> zadania<br/>
        <b>M</b> mapa · <b>Esc</b> pauza
      </div>

      <div class="clock" id="clock">☀ 08:30</div>

      <div class="quest-tracker" id="quest-tracker">
        <h4>Zadanie</h4>
        <div class="q-name" id="qt-name"></div>
        <div id="qt-objectives"></div>
      </div>

      <div class="minimap-wrap">
        <canvas id="minimap" width="264" height="264"></canvas>
        <div class="rim"></div>
      </div>

      <div class="loc-title" id="loc-title"><span></span><small></small></div>

      <div class="event-log" id="event-log"></div>

      <div class="interact-prompt" id="interact-prompt"><kbd>F</kbd><span></span></div>

      <div class="slot-bar" id="slot-bar"></div>
      <div class="spells" id="spells"></div>

      <div class="hero-frame">
        <div class="hero-top">
          <div class="hero-level" id="hero-level">1</div>
          <div>
            <div class="hero-name">Kael</div>
            <div class="hero-sub" id="hero-sub">Wędrowny najemnik · Poziom 1</div>
          </div>
          <div class="hero-gold" id="hero-gold">0 szt.</div>
        </div>
        <div class="bar hp"><i id="bar-hp"></i><span class="bar-label" id="label-hp">100 / 100</span></div>
        <div class="bar stam"><i id="bar-stam"></i><span class="bar-label" style="font-size:9px" id="label-stam"></span></div>
        <div class="bar mana"><i id="bar-mana"></i><span class="bar-label" style="font-size:9px" id="label-mana"></span></div>
        <div class="bar xp"><i id="bar-xp"></i><span class="bar-label" style="font-size:8px" id="label-xp"></span></div>
      </div>

      <div class="toast" id="toast"></div>
      <div class="world-overlay" id="world-overlay"></div>
      <div class="flash-layer" id="flash-layer"></div>
      <div class="touch-controls" id="touch-controls">
        <button data-touch="attack">⚔</button>
        <button data-touch="dodge">⤾</button>
        <button data-touch="spell0">✧</button>
      </div>
    `,this.root.appendChild(t),this.hud=t,this.worldOverlay=lt("#world-overlay"),this.logEl=lt("#event-log"),this.toastEl=lt("#toast"),this.flashEl=lt("#flash-layer"),this.interactEl=lt("#interact-prompt"),this.locEl=lt("#loc-title");const e=lt("#spells");this.spellEls=Cs.map((s,o)=>{const r=document.createElement("div");return r.className="spell locked clickable",r.innerHTML=`<div class="glyph">${s.glyph}</div><div class="key">${["Q","E","R"][o]}</div>
        <div class="cool"></div><div class="cost">${s.mana}</div>`,r.title=`${s.name} — ${s.desc}`,r.addEventListener("click",()=>{this.game.state==="playing"&&this.game.player.castSpell(o)}),e.appendChild(r),r}),this.slotEls=[];const i=lt("#slot-bar");for(let s=0;s<2;s++){const o=document.createElement("div");o.className="quick clickable",o.innerHTML=`<span class="key">${s+1}</span><span class="ico"></span><span class="count"></span>`,o.addEventListener("click",()=>{this.game.state==="playing"&&this.game.useQuickSlot(s)}),i.appendChild(o),this.slotEls.push(o)}const n=lt("#touch-controls");"ontouchstart"in window||(n.style.display="none"),n.addEventListener("click",s=>{const o=s.target.dataset?.touch;if(!o)return;const r=this.game.player;o==="attack"&&r.attack(),o==="dodge"&&r.dodge(),o==="spell0"&&r.castSpell(0)}),this.clockEl=lt("#clock"),this.compassInner=lt("#compass-inner"),this.compassObj=lt("#compass-obj"),this._buildCompassTicks()}_buildCompassTicks(){const t=[["N",0],["NE",45],["E",90],["SE",135],["S",180],["SW",225],["W",270],["NW",315]];this.compassMarks=t.map(([e,i])=>{const n=document.createElement("span");return n.className="tick-mark"+(e.length===1?" card":""),n.textContent=e,n.dataset.deg=i,this.compassInner.appendChild(n),n})}_buildPanels(){const t=document.createElement("div");t.id="panel-layer",this.root.appendChild(t),this.panelLayer=t;const e=document.createElement("div");e.className="modal-layer hidden",e.id="hero-panel",e.innerHTML=`
      <div class="panel">
        <div class="panel-head">
          <div>
            <h2>Kael</h2>
            <div class="sub" id="hero-panel-sub">Wędrowny najemnik</div>
          </div>
          <div class="spacer"></div>
          <button class="close-x" data-close="hero">✕</button>
        </div>
        <div class="panel-body">
          <div class="tabs">
            <button data-tab="character">Postać</button>
            <button data-tab="inventory">Ekwipunek</button>
            <button data-tab="quests">Zadania</button>
          </div>
          <div id="hero-tab-body"></div>
        </div>
      </div>`,t.appendChild(e),this.heroPanel=e,e.addEventListener("click",r=>{const c=r.target.closest("[data-tab]")?.dataset.tab;if(c){this.lastTab=c,this.renderHeroTab(c),this.game.audio?.uiClick();return}r.target.closest('[data-close="hero"]')&&this.closePanels()}),this.heroBody=lt("#hero-tab-body",e);const i=document.createElement("div");i.className="modal-layer hidden",i.id="shop-panel",i.innerHTML=`
      <div class="panel" style="width:min(720px,94vw)">
        <div class="panel-head">
          <div><h2 id="shop-title">Sklep</h2><div class="sub" id="shop-gold"></div></div>
          <div class="spacer"></div>
          <button class="close-x" data-close="shop">✕</button>
        </div>
        <div class="panel-body">
          <div class="tabs">
            <button data-shop-tab="buy" class="active">Kup</button>
            <button data-shop-tab="sell">Sprzedaj</button>
          </div>
          <div id="shop-body"></div>
        </div>
      </div>`,t.appendChild(i),this.shopPanel=i,i.addEventListener("click",r=>{if(r.target.closest('[data-close="shop"]')){this.closePanels();return}const c=r.target.closest("[data-shop-tab]")?.dataset.shopTab;if(c){this.shopTab=c,this.renderShop();return}const l=r.target.closest("[data-buy]");if(l){this.game.buyItem(this.shopId,l.dataset.buy),this.renderShop();return}const h=r.target.closest("[data-sell]");h&&(this.game.sellItem(h.dataset.sell),this.renderShop())});const n=document.createElement("div");n.className="modal-layer hidden",n.id="craft-panel",n.innerHTML=`
      <div class="panel" style="width:min(760px,94vw)">
        <div class="panel-head">
          <div><h2>Rzemiosło</h2><div class="sub" id="craft-sub"></div></div>
          <div class="spacer"></div>
          <button class="close-x" data-close="craft">✕</button>
        </div>
        <div class="panel-body"><div class="craft-list" id="craft-body"></div></div>
      </div>`,t.appendChild(n),this.craftPanel=n,n.addEventListener("click",r=>{r.target.closest('[data-close="craft"]')&&this.closePanels();const c=r.target.closest("[data-craft]");c&&(this.game.craftItem(c.dataset.craft,this.craftStation),this.renderCrafting())});const s=document.createElement("div");s.className="modal-layer hidden",s.id="map-panel",s.innerHTML=`
      <div class="panel" style="width:min(900px,95vw)">
        <div class="panel-head">
          <div><h2>Mapa Krainy</h2><div class="sub">Mgła skrywa północ — ale nie przed tobą</div></div>
          <div class="spacer"></div>
          <button class="close-x" data-close="map">✕</button>
        </div>
        <div class="panel-body">
          <div class="map-canvas-wrap"><canvas id="bigmap" width="1024" height="640"></canvas></div>
          <div class="map-legend">
            <span><i style="background:#e9e2d4"></i> Ty</span>
            <span><i style="background:#e2b878"></i> Miejsca</span>
            <span><i style="background:#d0705a"></i> Wrogowie</span>
            <span><i style="background:#8fbf72"></i> Mieszkańcy</span>
            <span><i style="background:#8b5fd6"></i> Cel zadania</span>
          </div>
        </div>
      </div>`,t.appendChild(s),this.mapPanel=s,s.addEventListener("click",r=>{r.target.closest('[data-close="map"]')&&this.closePanels()});const o=document.createElement("div");o.className="modal-layer hidden",o.id="quest-intro",o.innerHTML=`
      <div class="panel" style="width:min(620px,94vw)">
        <div class="panel-head">
          <div><h2 id="qi-name">Zadanie</h2><div class="sub" id="qi-sub">Nowe zadanie</div></div>
        </div>
        <div class="panel-body">
          <p style="font-size:13.5px;line-height:1.85;color:#cfc6b6;font-style:italic" id="qi-text"></p>
          <div style="margin:18px 0 6px;font-family:var(--font-display);font-size:11px;letter-spacing:.14em;color:var(--gold);text-transform:uppercase">Cele</div>
          <div id="qi-objectives" style="font-size:12.5px;line-height:1.9;color:#b9b1a2"></div>
          <div style="margin-top:20px;text-align:right"><button class="primary" id="qi-btn">Przyjmuję</button></div>
        </div>
      </div>`,t.appendChild(o),this.questIntro=o}_buildScreens(){const t=document.createElement("div");t.className="menu-screen",t.id="title-screen",t.innerHTML=`
      <div class="menu-inner">
        <div class="menu-sigil"><img class="rune-icon" src="./icon-128.png" alt="" /></div>
        <h1 class="menu-title">Runy Przeznaczenia</h1>
        <div class="menu-tagline">RPG · Wilcza Dolina · Mgliste Wrota</div>
        <div class="menu-buttons">
          <button class="primary" data-menu="new">Nowa wyprawa</button>
          <button data-menu="continue" id="btn-continue">Kontynuuj</button>
          <button data-menu="controls">Sterowanie</button>
          <button data-menu="about">O grze</button>
        </div>
        <div class="menu-foot" id="title-foot"></div>
      </div>`,this.root.appendChild(t),this.titleScreen=t;const e=document.createElement("div");e.className="menu-screen hidden",e.id="pause-screen",e.innerHTML=`
      <div class="menu-inner">
        <div class="menu-sigil">❖</div>
        <h1 class="menu-title" style="font-size:clamp(26px,4.5vw,40px)">Pauza</h1>
        <div class="menu-tagline">Wilcza Dolina czeka</div>
        <div class="menu-buttons">
          <button class="primary" data-pause="resume">Powrót do gry</button>
          <button data-pause="save">Zapisz grę</button>
          <button data-pause="controls">Sterowanie</button>
          <button data-pause="mute">Dźwięk: wł.</button>
          <button data-pause="title">Wyjdź do menu</button>
        </div>
      </div>`,this.root.appendChild(e),this.pauseScreen=e;const i=document.createElement("div");i.className="menu-screen hidden",i.id="death-screen",i.innerHTML=`
      <div class="menu-inner">
        <div class="menu-sigil" style="color:#c1443a">☠</div>
        <h1 class="menu-title" style="font-size:clamp(28px,5vw,46px);background:linear-gradient(180deg,#e6b0a0,#8a3a30);-webkit-background-clip:text;background-clip:text">Zginąłeś</h1>
        <p class="victory-text">Mgła zamknęła się nad tobą. Ale Wilcza Dolina wciąż potrzebuje ostrza.</p>
        <div class="menu-buttons">
          <button class="primary" data-death="respawn">Powstań w wiosce</button>
          <button data-death="title">Wróć do menu</button>
        </div>
        <div class="menu-foot" id="death-foot"></div>
      </div>`,this.root.appendChild(i),this.deathScreen=i;const n=document.createElement("div");n.className="menu-screen hidden",n.id="victory-screen",n.innerHTML=`
      <div class="menu-inner">
        <div class="menu-sigil">☀</div>
        <h1 class="menu-title victory-title">Świt</h1>
        <p class="victory-text" id="victory-text"></p>
        <div class="menu-foot" id="victory-stats" style="margin-bottom:22px"></div>
        <div class="menu-buttons">
          <button class="primary" data-victory="continue">Wróć do świata</button>
          <button data-victory="title">Zakończ</button>
        </div>
      </div>`,this.root.appendChild(n),this.victoryScreen=n;const s=document.createElement("div");s.className="modal-layer hidden",s.id="info-panel",s.innerHTML=`
      <div class="panel" style="width:min(640px,94vw)">
        <div class="panel-head">
          <div><h2 id="info-title">Sterowanie</h2><div class="sub" id="info-sub"></div></div>
          <div class="spacer"></div>
          <button class="close-x" data-close="info">✕</button>
        </div>
        <div class="panel-body" id="info-body"></div>
      </div>`,this.root.appendChild(s),this.infoPanel=s,t.addEventListener("click",o=>{const r=o.target.closest("[data-menu]")?.dataset.menu;r&&(this.game.audio?.unlock(),this.game.audio?.uiClick(),r==="new"&&this.game.startNew(),r==="continue"&&this.game.loadGame(),r==="controls"&&this.showControls(),r==="about"&&this.showAbout())}),e.addEventListener("click",o=>{const r=o.target.closest("[data-pause]")?.dataset.pause;if(r){if(r==="resume"&&this.game.resumeFromUi(),r==="save"&&this.game.saveGame(!0),r==="controls"&&this.showControls(),r==="mute"){const c=this.game.audio?.toggleMute();o.target.textContent=`Dźwięk: ${c?"wł.":"wył."}`}r==="title"&&this.game.returnToTitle()}}),i.addEventListener("click",o=>{const r=o.target.closest("[data-death]")?.dataset.death;r&&(r==="respawn"&&this.game.respawnPlayer(),r==="title"&&this.game.returnToTitle())}),n.addEventListener("click",o=>{const r=o.target.closest("[data-victory]")?.dataset.victory;r&&(r==="continue"&&this.hideVictory(),r==="title"&&this.game.returnToTitle())}),s.addEventListener("click",o=>{o.target.closest('[data-close="info"]')&&(this.hideInfo(),this.anyScreenOpen()||this.game.resumeFromUi())})}anyPanelOpen(){return[...this.panelLayer.children].some(t=>!t.classList.contains("hidden"))}anyScreenOpen(){return["title-screen","pause-screen","death-screen","victory-screen"].some(t=>!lt("#"+t).classList.contains("hidden"))}closePanels(){for(const t of this.panelLayer.children)t.classList.add("hidden");this.dialogueOpen||this.anyScreenOpen()||this.game.resumeFromUi()}openHero(t="character"){this.lastTab=t,this.heroPanel.classList.remove("hidden"),this.heroPanel.classList.add("show"),this.renderHeroTab(t),this.game.openUI()}renderHeroTab(t){for(const e of this.heroPanel.querySelectorAll("[data-tab]"))e.classList.toggle("active",e.dataset.tab===t);t==="character"&&this.renderCharacter(),t==="inventory"&&this.renderInventory(),t==="quests"&&this.renderQuests()}renderCharacter(){const t=this.game.player,e=t.inventory.equipStats(),i=fg.map(n=>{const s=t.points>0;return`<div class="attr-row">
        <div class="attr-glyph">${n.glyph}</div>
        <div class="attr-info"><div class="an">${n.name}</div><div class="ad">${n.desc}</div></div>
        <div class="attr-val">${t.attrs[n.id]}</div>
        ${s?`<button class="attr-plus" data-attr="${n.id}">+</button>`:""}
      </div>`}).join("");this.heroBody.innerHTML=`
      <div class="grid-2">
        <div>
          <div class="card">
            <h4>Atrybuty</h4>
            <div class="points-left">${t.points>0?`Punkty do rozdania: <b>${t.points}</b>`:"Brak wolnych punktów"}</div>
            ${i}
          </div>
          <div class="card" style="margin-top:14px">
            <h4>Pochodzenie</h4>
            <p class="panel-note">Kael z Wilczej Doliny. Ojciec zginął pod Mglistymi Wrotami, matka nosiła Ostrze Świtu, dopóki nie rozpadło się na okruchy. Wychowałeś się na wilczym mięsie i opowieściach o świetle.</p>
          </div>
        </div>
        <div>
          <div class="card">
            <h4>Statystyki</h4>
            <div class="stat-row"><span class="k">Poziom</span><span class="v">${t.level}</span></div>
            <div class="stat-row"><span class="k">Doświadczenie</span><span class="v">${pi(t.xp)} / ${pi(t.xpNeeded)}</span></div>
            <div class="stat-row"><span class="k">Życie</span><span class="v">${Math.round(t.hp)} / ${t.maxHP}</span></div>
            <div class="stat-row"><span class="k">Mana</span><span class="v">${Math.round(t.mana)} / ${t.maxMana}</span></div>
            <div class="stat-row"><span class="k">Kondycja</span><span class="v">${Math.round(t.stamina)} / ${t.maxStamina}</span></div>
            <div class="stat-row"><span class="k">Atak</span><span class="v">${t.attackPower.toFixed(1)} ${e.attack?`(+${e.attack})`:""}</span></div>
            <div class="stat-row"><span class="k">Pancerz</span><span class="v">${t.armor.toFixed(1)}</span></div>
            <div class="stat-row"><span class="k">Trafienie krytyczne</span><span class="v">${(t.critChance*100).toFixed(0)}%</span></div>
            <div class="stat-row"><span class="k">Moc zaklęć</span><span class="v">${t.spellPower.toFixed(0)}</span></div>
            <div class="stat-row"><span class="k">Złoto</span><span class="v">${pi(t.inventory.gold)}</span></div>
          </div>
          <div class="card" style="margin-top:14px">
            <h4>Zaklęcia</h4>
            ${Cs.map(n=>`<div class="stat-row"><span class="k">${n.glyph} ${n.name}</span><span class="v" style="font-size:11px">${t.level>=n.level?"odblokowane":`poziom ${n.level}`}</span></div>`).join("")}
          </div>
        </div>
      </div>`,this.heroBody.querySelectorAll("[data-attr]").forEach(n=>{n.addEventListener("click",()=>{this.game.player.spendPoint(n.dataset.attr)&&(this.game.audio?.uiClick(),this.renderCharacter(),this.refreshHud())})})}renderInventory(){const e=this.game.player.inventory,i=e.list().sort((l,h)=>{const d={weapon:0,armor:1,helm:2,trinket:3,consumable:4,material:5,quest:6};return(d[l.def.type]??9)-(d[h.def.type]??9)}),n=Ql.map(l=>{const h=e.equipped[l.id],d=h?Ae[h]:null;return`<div class="equip-slot ${h?"filled":""}" data-unequip="${l.id}" title="${d?d.name:"Pusty slot"}">
        ${sn(d?d.icon:l.glyph,26)}<span class="lbl">${d?d.name.slice(0,12):l.label}</span>
      </div>`}).join(""),s=i.map(l=>`<div class="inv-cell ${(Es[l.def.rarity]??Es.common).cls}" data-item="${l.id}" title="${l.def.name}">
        ${sn(l.def.icon,26)}${l.qty>1?`<span class="cnt">${l.qty}</span>`:""}
      </div>`);for(;s.length<Math.max(12,Math.ceil(s.length/6)*6);)s.push('<div class="inv-cell empty">·</div>');const o=this.selectedItem&&e.has(this.selectedItem)?this.selectedItem:null,r=o?Ae[o]:null,c=r?`<div class="item-detail">
          <h3 style="color:${Es[r.rarity].color}"><span class="h-ico">${sn(r.icon,20)}</span>${r.name}</h3>
          <div class="type">${Es[r.rarity].name} · ${this._typeName(r)}</div>
          <div style="margin-top:10px">${Object.entries(r.stats??{}).map(([l,h])=>`<div class="stat">${this._statName(l)}: ${h>0?"+":""}${h}</div>`).join("")}</div>
          ${r.use?`<div class="stat">Efekt: ${r.use.heal?`+${r.use.heal} życia`:""}${r.use.mana?`+${r.use.mana} many`:""}${r.use.buff?`+${r.use.buff.attack}% obrażeń na ${r.use.buff.duration}s`:""}</div>`:""}
          <div class="desc">${r.desc}</div>
          <div class="actions">
            ${r.slot?`<button class="primary" data-equip="${o}">Załóż</button>`:""}
            ${r.use?`<button data-use="${o}">Użyj</button>`:""}
          </div>
        </div>`:'<div class="empty-note">Wybierz przedmiot, aby zobaczyć szczegóły.</div>';this.heroBody.innerHTML=`
      <div class="grid-2">
        <div>
          <div class="card">
            <h4>Założone</h4>
            <div class="equip-slots">
              <div class="equip-col">${n}</div>
              <div class="panel-note">
                Kliknij slot, aby zdjąć przedmiot.<br/>
                Złoto: <b style="color:var(--gold)">${pi(e.gold)}</b> szt.<br/>
                Miejsca: ${e.items.size} / ${e.capacity}
              </div>
            </div>
          </div>
          <div class="card" style="margin-top:14px">
            <h4>Torba</h4>
            <div class="inv-grid">${s.join("")}</div>
          </div>
        </div>
        <div>${c}</div>
      </div>`,this.heroBody.querySelectorAll("[data-item]").forEach(l=>{l.addEventListener("click",()=>{this.selectedItem=l.dataset.item,this.renderInventory(),this.game.audio?.uiClick()})}),this.heroBody.querySelectorAll("[data-unequip]").forEach(l=>{l.addEventListener("click",()=>{this.game.player.inventory.equipped[l.dataset.unequip]&&(this.game.player.inventory.unequip(l.dataset.unequip),this.game.player.recalc(),this.renderInventory(),this.refreshHud())})}),this.heroBody.querySelectorAll("[data-equip]").forEach(l=>{l.addEventListener("click",()=>{this.game.player.inventory.equip(l.dataset.equip)&&(this.game.player.recalc(),this.game.audio?.uiClick(),this.renderInventory(),this.refreshHud())})}),this.heroBody.querySelectorAll("[data-use]").forEach(l=>{l.addEventListener("click",()=>{this.game.player.useItem(l.dataset.use)&&(this.renderInventory(),this.refreshHud())})})}_typeName(t){return{weapon:"Broń",armor:"Zbroja",helm:"Hełm",trinket:"Amulet",consumable:"Mikstura",material:"Materiał",quest:"Przedmiot fabularny"}[t.type]??t.type}_statName(t){return{attack:"Atak",armor:"Pancerz",hp:"Życie",mana:"Mana",crit:"Kryt",speed:"Szybkość"}[t]??t}renderQuests(){const t=this.game.quests,e=t.activeQuest,i=e?`<div class="quest-entry active">
          <h4>${e.name}</h4>
          <div class="q-desc">${e.intro}</div>
          ${e.objectives.map(s=>{const o=t.objectiveState(s);let r=s.text.replace(/\(\d+\/\d+\)$/,"").trim();return(s.target??1)>1&&(r+=` — ${o.current}/${o.target}`),`<div class="q-obj ${o.done?"done":""}"><span class="tick">${o.done?"✔":"◇"}</span><span>${r}</span></div>`}).join("")}
          <div class="reward">Nagroda: ${e.reward.gold} złota · ${e.reward.xp} PD${e.reward.items?.length?" · przedmioty":""}</div>
        </div>`:'<div class="empty-note">Brak aktywnego zadania. Porozmawiaj ze Starym Eryn w Wilczej Dolinie.</div>',n=vr.filter(s=>t.questDone(s)).map(s=>{const o=wi[s];return`<div class="quest-entry done"><h4>✔ ${o.name}</h4><div class="q-desc">${o.outro??""}</div></div>`}).join("");this.heroBody.innerHTML=`
      <div class="grid-2">
        <div>
          <div class="card"><h4>W toku</h4>${i}</div>
          <div class="card" style="margin-top:14px"><h4>Ukończone</h4>${n||'<div class="empty-note">Jeszcze nic.</div>'}</div>
        </div>
        <div>
          <div class="card">
            <h4>Wieści z doliny</h4>
            ${Eg.map(s=>`<div class="q-obj" style="margin-bottom:9px"><span class="tick">·</span><span>${s}</span></div>`).join("")}
          </div>
          <div class="card" style="margin-top:14px">
            <h4>Wskazówka</h4>
            <p class="panel-note">${ll[Math.floor(Math.random()*ll.length)]}</p>
          </div>
        </div>
      </div>`}openShop(t){this.shopId=t,this.shopTab="buy",this.shopPanel.classList.remove("hidden"),this.shopPanel.classList.add("show"),this.renderShop(),this.game.openUI()}renderShop(){const t=Dg[this.shopId];if(!t)return;const e=this.game.player.inventory;lt("#shop-title").textContent=t.name,lt("#shop-gold").textContent=`Masz ${pi(e.gold)} złota`;for(const n of this.shopPanel.querySelectorAll("[data-shop-tab]"))n.classList.toggle("active",n.dataset.shopTab===this.shopTab);const i=lt("#shop-body");if(this.shopTab==="buy"){const n={};for(const s of t.stock)n[s]=(n[s]??0)+1;i.innerHTML=`<div class="shop-list">${Object.entries(n).map(([s,o])=>{const r=Ae[s],c=Math.round(r.value*1.5);return`<div class="shop-row">
          <div class="ico">${sn(r.icon,20)}</div>
          <div class="info"><div class="nm">${r.name}</div><div class="sub">${dg(s)||this._typeName(r)}${o>1?` · dostępne: ${o}`:""}</div></div>
          <div class="price">${c} szt.</div>
          <button data-buy="${s}" ${e.gold<c?"disabled":""}>Kup</button>
        </div>`}).join("")}</div>`}else{const n=e.list().filter(s=>s.def.type!=="quest");i.innerHTML=n.length?`<div class="shop-list">${n.map(s=>{const o=Math.max(1,Math.round(s.def.value*.45));return`<div class="shop-row">
              <div class="ico">${sn(s.def.icon,20)}</div>
              <div class="info"><div class="nm">${s.def.name}${s.qty>1?` ×${s.qty}`:""}</div><div class="sub">${this._typeName(s.def)}</div></div>
              <div class="price">${o} szt.</div>
              <button data-sell="${s.id}">Sprzedaj</button>
            </div>`}).join("")}</div>`:'<div class="empty-note">Nie masz nic na sprzedaż.</div>'}}openCrafting(t="village"){this.craftStation=t,this.craftPanel.classList.remove("hidden"),this.craftPanel.classList.add("show"),this.renderCrafting(),this.game.openUI(),this.game.audio?.uiOpen()}renderCrafting(){const t=this.game.player.inventory,e=this.craftStation==="ancient"||this.craftStation==="ancient_forge"?"Starożytna kuźnia":"Kuźnia Borysa";lt("#craft-sub").textContent=`${e} · złoto: ${pi(t.gold)}`;const i=lt("#craft-body");i.innerHTML=th.map(n=>{const o=!!!n.legendary||this.craftStation==="ancient"||this.craftStation==="ancient_forge",r=Object.entries(n.mats).map(([u,f])=>{const g=t.count(u);return`<span style="color:${g>=f?"#8fbf72":"#e08e84"}">${sn(Ae[u].icon,13)} ${Ae[u].name} ${g}/${f}</span>`}).join(" · "),c=t.gold>=n.cost,l=Object.entries(n.mats).every(([u,f])=>t.count(u)>=f),h=o&&c&&l,d=Ae[n.out.id];return`<div class="shop-row">
        <div class="ico">${sn(d.icon,20)}</div>
        <div class="info">
          <div class="nm" style="color:${Es[d.rarity].color}">${n.name}${n.out.qty>1?` ×${n.out.qty}`:""}</div>
          <div class="sub">${r}</div>
          <div class="sub" style="color:${c?"var(--text-dim)":"#e08e84"}">Koszt: ${n.cost} szt. złota</div>
          ${o?"":'<div class="sub" style="color:#e0a851">Wymaga Starożytnej Kuźni na Kowalskiej Górze</div>'}
        </div>
        <button data-craft="${n.id}" ${h?"":"disabled"}>Wykuj</button>
      </div>`}).join("")}openMap(){this.mapPanel.classList.remove("hidden"),this.mapPanel.classList.add("show"),this.drawBigMap(),this.game.openUI()}showDialogue({speaker:t,role:e,text:i,choices:n,onChoose:s,onClose:o}){if(!this.dialogueEl){const l=document.createElement("div");l.className="dialogue-layer",l.innerHTML=`
        <div class="dialogue-box">
          <div class="dialogue-speaker"></div>
          <div class="dialogue-text"></div>
          <div class="dialogue-choices"></div>
          <div class="dialogue-hint">ESC — zakończ rozmowę</div>
        </div>`,this.root.appendChild(l),this.dialogueEl=l}const r=this.dialogueEl;r.classList.remove("hidden"),this.dialogueOpen=!0,lt(".dialogue-speaker",r).textContent=e?`${t} — ${e}`:t,lt(".dialogue-text",r).textContent=i;const c=lt(".dialogue-choices",r);c.innerHTML="",n.forEach((l,h)=>{const d=document.createElement("button");d.innerHTML=`<span class="arrow">▸</span>${l.label}`,l.special&&d.classList.add("special"),d.addEventListener("click",()=>{this.game.audio?.uiClick(),s(h)}),c.appendChild(d)}),this.dialogueOnClose=o,this.game.openUI(!0)}hideDialogue(){this.dialogueEl&&this.dialogueEl.classList.add("hidden"),this.dialogueOpen=!1}showQuestIntro(t,e){const i=this.questIntro;lt("#qi-name").textContent=t.name,lt("#qi-sub").textContent="Nowe zadanie",lt("#qi-text").textContent=t.intro,lt("#qi-objectives").innerHTML=t.objectives.map(s=>`<div>◇ ${s.text.replace(/\(\d+\/\d+\)$/,"").trim()}</div>`).join(""),i.classList.remove("hidden"),i.classList.add("show");const n=lt("#qi-btn");n.textContent=t.final?"Wyruszam":"Przyjmuję",n.onclick=()=>{i.classList.add("hidden"),i.classList.remove("show"),this.game.audio?.uiClick(),e?.()},this.game.openUI(!0)}showQuestOutro(t,e){const i=this.questIntro;lt("#qi-name").textContent=t.name,lt("#qi-sub").textContent="Zadanie ukończone",lt("#qi-text").textContent=t.outro??"",lt("#qi-objectives").innerHTML=`<div style="color:var(--gold)">Nagroda: ${t.reward.gold} złota · ${t.reward.xp} PD</div>`,i.classList.remove("hidden"),i.classList.add("show");const n=lt("#qi-btn");n.textContent="Kontynuuj",n.onclick=()=>{i.classList.add("hidden"),i.classList.remove("show"),this.game.audio?.uiClick(),e?.()},this.game.openUI(!0)}showControls(){lt("#info-title").textContent="Sterowanie",lt("#info-sub").textContent="Wszystko pod ręką",lt("#info-body").innerHTML=`
      <div class="grid-2">
        <div>
          ${[["W A S D","Ruch postaci"],["Shift","Bieg (zużywa kondycję)"],["Lewy przycisk myszy","Atak (3-ciosowa kombinacja)"],["Spacja","Unik / przewrót (nietykalność)"],["Q / E / R","Zaklęcia: Znak Świtu, Wilczy Zew, Blask Świtu"],["1 / 2","Mikstury z paska szybkiego dostępu"]].map(([t,e])=>`<div class="kbd-row"><kbd>${t}</kbd><span>${e}</span></div>`).join("")}
        </div>
        <div>
          ${[["F","Interakcja: rozmowa, kuźnia, zioła, skrzynie"],["I","Ekwipunek"],["C","Postać i atrybuty"],["K","Zadania"],["M","Mapa świata"],["Esc","Pauza, zapis, wyjście"],["Mysz","Rozglądanie (po kliknięciu w planszę)"]].map(([t,e])=>`<div class="kbd-row"><kbd>${t}</kbd><span>${e}</span></div>`).join("")}
        </div>
      </div>
      <p class="panel-note" style="margin-top:16px">Gra automatycznie zapisuje postęp co jakiś czas oraz po ukończeniu zadania. Na urządzeniach dotykowych lewa strona ekranu to ruch, prawa — rozglądanie.</p>`,this.infoPanel.classList.remove("hidden"),this.infoPanel.classList.add("show"),this.infoOpen=!0,this.game.openUI(!0)}hideInfo(){this.infoPanel.classList.add("hidden"),this.infoPanel.classList.remove("show"),this.infoOpen=!1}showAbout(){lt("#info-title").textContent="Runy Przeznaczenia",lt("#info-sub").textContent="RPG 3D w przeglądarce",lt("#info-body").innerHTML=`
      <p class="panel-note" style="font-size:13px;line-height:1.9">
      Trójwymiarowa gra RPG osadzona w Wilczej Dolinie — małej osadzie na skraju mgły.
      Wcielasz się w Kaela, syna kowala i nosiciela rozerwanej legendy o Ostrem Świtu.
      Odnajdź trzy okruchy ostrza, zanim Kaldras otworzy Mgliste Wrota.
      </p>
      <div class="grid-2" style="margin-top:16px">
        <div class="card"><h4>Co jest w grze</h4>
          <div class="stat-row"><span class="k">Świat 3D</span><span class="v">proceduralny teren, cykl dnia i nocy</span></div>
          <div class="stat-row"><span class="k">Walka</span><span class="v">kombinacje, uniki, krytyki, 3 zaklęcia</span></div>
          <div class="stat-row"><span class="k">Rozwój</span><span class="v">poziomy, atrybuty, ekwipunek</span></div>
          <div class="stat-row"><span class="k">Fabuła</span><span class="v">5 zadań, dialogi, wybory</span></div>
          <div class="stat-row"><span class="k">Rzemiosło</span><span class="v">kuźnia, mikstury, legendarna klinga</span></div>
        </div>
        <div class="card"><h4>Podpowiedź</h4>
          <p class="panel-note">Zacznij od rozmowy ze Starym Eryn przy ognisku w Wilczej Dolinie.
          Nocą w kurhanie pojawia się coś, czego nie ma w dzień. A prawdziwa kuźnia leży na Kowalskiej Górze.</p>
        </div>
      </div>`,this.infoPanel.classList.remove("hidden"),this.infoPanel.classList.add("show"),this.infoOpen=!0,this.game.openUI(!0)}showTitle(){this.titleScreen.classList.remove("hidden");const t=!!localStorage.getItem("runy-przeznaczenia-save")||!!localStorage.getItem("ostrze-switu-save"),e=lt("#btn-continue");e.disabled=!t,lt("#title-foot").innerHTML=t?"Zapis znaleziony · <b>Kontynuuj</b> wróci do ostatniego ogniska":"Gra tworzy zapis automatycznie. <b>Nowa wyprawa</b> zaczyna się w Wilczej Dolinie."}hideTitle(){this.titleScreen.classList.add("hidden")}showPause(){this.pauseScreen.classList.remove("hidden")}hidePause(){this.pauseScreen.classList.add("hidden")}showDeath(t=0){lt("#death-foot").innerHTML=t>0?`Straciłeś ${t} złota.`:"Wioska wciąż czeka.",this.deathScreen.classList.remove("hidden")}hideDeath(){this.deathScreen.classList.add("hidden")}showVictory(t){lt("#victory-text").textContent="Mgła cofa się od wrót, a nad Wilczą Doliną wschodzi słońce. Kaldras upada — nie jako potwór, lecz jako strażnik, który wreszcie może odejść. Wioska będzie opowiadać o tobie przez wiele zim.",lt("#victory-stats").innerHTML=`Poziom ${t.level} · ${t.xp} PD · ${t.gold} złota · ${t.kills} pokonanych wrogów · ${t.quests}/5 zadań`,this.victoryScreen.classList.remove("hidden"),this.game.audio?.victory()}hideVictory(){this.victoryScreen.classList.add("hidden"),this.game.resumeFromUi()}refreshHud(){const t=this.game.player;if(!t)return;lt("#hero-level").textContent=t.level,lt("#hero-sub").textContent=`Wędrowny najemnik · Poziom ${t.level}`,lt("#hero-gold").textContent=`${pi(t.inventory.gold)} szt.`,lt("#bar-hp").style.width=`${Fi(t.hp/t.maxHP)*100}%`,lt("#bar-stam").style.width=`${Fi(t.stamina/t.maxStamina)*100}%`,lt("#bar-mana").style.width=`${Fi(t.mana/t.maxMana)*100}%`,lt("#bar-xp").style.width=`${Fi(t.xp/t.xpNeeded)*100}%`,lt("#label-hp").textContent=`${Math.ceil(t.hp)} / ${t.maxHP}`,lt("#label-stam").textContent=`${Math.ceil(t.stamina)}`,lt("#label-mana").textContent=`${Math.ceil(t.mana)} / ${t.maxMana}`,lt("#label-xp").textContent=`${pi(t.xp)} / ${pi(t.xpNeeded)} PD`,Cs.forEach((r,c)=>{const l=this.spellEls[c],h=t.level<r.level;l.classList.toggle("locked",h),l.classList.toggle("ready",!h&&t.cooldowns[r.id]<=0&&t.mana>=r.mana);const d=t.cooldowns[r.id]>0?t.cooldowns[r.id]/r.cd:0;lt(".cool",l).style.transform=`scaleY(${d})`});const e=t.inventory.consumables();this.slotEls.forEach((r,c)=>{const l=e[c];lt(".ico",r).innerHTML=l?sn(l.def.icon,20):"·",lt(".count",r).textContent=l&&l.qty>1?l.qty:"",r.style.opacity=l?"1":"0.4"});const i=lt("#quest-tracker"),n=this.game.quests.statusLines(),s=this.game.quests.activeQuest;lt("#qt-name").textContent=s?s.name:"Dziennik",lt("#qt-objectives").innerHTML=n.map(r=>`<div class="q-obj ${r.done?"done":""}"><span class="tick">${r.done?"✔":"◇"}</span><span>${r.text}</span></div>`).join("");const o=!!s||n.length>0;i.style.display=o?"block":"none"}update(t){if(this.game.state==="title")return;const e=this.game.player;e&&(this.hudAcc+=t,this.hudAcc>.1&&(this.hudAcc=0,lt("#bar-hp").style.width=`${Fi(e.hp/e.maxHP)*100}%`,lt("#bar-stam").style.width=`${Fi(e.stamina/e.maxStamina)*100}%`,lt("#bar-mana").style.width=`${Fi(e.mana/e.maxMana)*100}%`,lt("#bar-xp").style.width=`${Fi(e.xp/e.xpNeeded)*100}%`,lt("#label-hp").textContent=`${Math.ceil(e.hp)} / ${e.maxHP}`,lt("#label-stam").textContent=`${Math.ceil(e.stamina)}`,lt("#label-mana").textContent=`${Math.ceil(e.mana)} / ${e.maxMana}`,lt("#label-xp").textContent=`${pi(e.xp)} / ${pi(e.xpNeeded)} PD`,lt("#hero-gold").textContent=`${pi(e.inventory.gold)} szt.`,Cs.forEach((i,n)=>{const s=this.spellEls[n],o=e.level<i.level;s.classList.toggle("locked",o),s.classList.toggle("ready",!o&&e.cooldowns[i.id]<=0&&e.mana>=i.mana),lt(".cool",s).style.transform=`scaleY(${e.cooldowns[i.id]>0?e.cooldowns[i.id]/i.cd:0})`})),this._updateCompass(),this.platesAcc+=t,this.platesAcc>.05&&(this.platesAcc=0,this._updateNameplates()),this._updateMinimap(t),this.toastTimer>0&&(this.toastTimer-=t,this.toastTimer<=0&&this.toastEl.classList.remove("show")),this.locationTimer>0&&(this.locationTimer-=t,this.locationTimer<=0&&this.locEl.classList.remove("show")))}_updateCompass(){const t=(-this.game.cameraRig.yaw*180/Math.PI%360+360)%360,e=260,i=e/120;for(const s of this.compassMarks){let o=(Number(s.dataset.deg)-t+540)%360-180;const r=e/2+o*i;s.style.left=`${r}px`,s.style.opacity=Math.abs(o)>58?"0":String(1-Math.abs(o)/70)}const n=this.game.questTargetPos?.();if(n){const s=this.game.player.pos,o=(Math.atan2(n.x-s.x,-(n.z-s.z))*180/Math.PI+360)%360,r=Math.hypot(n.x-s.x,n.z-s.z),c=(o-t+540)%360-180,l=Math.abs(c)<20?"▲":c>0?"▶":"◀";this.compassObj.innerHTML=`<span class="arrow">${l}</span>${this.game.quests.targetHint()??"Cel"} · ${Math.round(r)} m`}else this.compassObj.textContent=this.game.quests.targetHint()??""}_updateNameplates(){const t=this.game.camera,e=this.game.player.pos,i=this.game.enemies.list.filter(s=>s.active&&!s.dead).map(s=>({e:s,d:re(s.pos.x,s.pos.z,e.x,e.z)})).filter(s=>s.d<26).sort((s,o)=>s.d-o.d).slice(0,8).map(s=>s.e);let n=0;for(const s of i){const o=re(s.pos.x,s.pos.z,e.x,e.z);if(o>26)continue;const c=new z(s.pos.x,s.pos.y+(s.def.model==="wolf"?1.55:2.35)*(s.def.boss?1.3:1),s.pos.z).project(t);if(c.z>1||c.z<-1)continue;const l=(c.x*.5+.5)*window.innerWidth,h=(-c.y*.5+.5)*window.innerHeight;if(l<-80||l>window.innerWidth+80||h<-40||h>window.innerHeight+40)continue;let d=this.nameplates[n];d||(d=document.createElement("div"),d.className="nameplate",d.innerHTML='<div class="np-name"></div><div class="np-bar"><i></i></div>',this.worldOverlay.appendChild(d),this.nameplates.push(d)),n+=1,d.style.display="block",d.style.transform=`translate(-50%, -100%) translate(${l}px, ${h}px)`,d.classList.toggle("elite",s.elite||s.boss);const u=d.firstChild;u.textContent!==s.name&&(u.textContent=s.name),d.lastChild.firstChild.style.width=`${Fi(s.hp/s.maxHP)*100}%`,d.style.opacity=String(Xt(1.5-o/26,.2,1))}for(let s=n;s<this.nameplates.length;s++)this.nameplates[s].style.display="none"}_ensureMap(){if(this.mapCanvas)return;const t=this.mapSize,e=document.createElement("canvas");e.width=t,e.height=t;const i=e.getContext("2d"),n=i.createImageData(t,t);for(let s=0;s<t;s++)for(let o=0;o<t;o++){const r=(o+.5)/t*2*Vt-Vt,c=(s+.5)/t*2*Vt-Vt,l=ul(r,c),h=fl(r,c,4),d=(s*t+o)*4;n.data[d]=Math.min(255,l[0]*h),n.data[d+1]=Math.min(255,l[1]*h),n.data[d+2]=Math.min(255,l[2]*h),n.data[d+3]=255}i.putImageData(n,0,0),i.strokeStyle="rgba(196,168,116,0.85)",i.lineWidth=Math.max(2,t/260),i.lineJoin="round";for(const[s,o,r,c]of gr)i.beginPath(),i.moveTo((s+Vt)/(2*Vt)*t,(o+Vt)/(2*Vt)*t),i.lineTo((r+Vt)/(2*Vt)*t,(c+Vt)/(2*Vt)*t),i.stroke();this.mapCanvas=e}_renderMinimapTile(t,e,i=96){if(!this.miniCanvas){const o=document.createElement("canvas");o.width=i,o.height=i,this.miniCanvas=o,this.miniCtx=o.getContext("2d"),this.miniImage=this.miniCtx.createImageData(i,i)}const n=this.miniImage;for(let o=0;o<i;o++)for(let r=0;r<i;r++){const c=t.x+((r+.5)/i-.5)*2*e,l=t.z+((o+.5)/i-.5)*2*e,h=ul(c,l),d=fl(c,l,1.6),u=(o*i+r)*4;n.data[u]=Math.min(255,h[0]*d),n.data[u+1]=Math.min(255,h[1]*d),n.data[u+2]=Math.min(255,h[2]*d),n.data[u+3]=255}this.miniCtx.putImageData(n,0,0),this.miniCtx.strokeStyle="rgba(196,168,116,0.7)",this.miniCtx.lineWidth=1;const s=(o,r)=>({x:((o-t.x)/(2*e)+.5)*i,y:((r-t.z)/(2*e)+.5)*i});for(const[o,r,c,l]of gr){const h=s(o,r),d=s(c,l);this.miniCtx.beginPath(),this.miniCtx.moveTo(h.x,h.y),this.miniCtx.lineTo(d.x,d.y),this.miniCtx.stroke()}return this.miniCanvas}_worldToMap(t,e,i,n=1){const s=i/(2*Vt);return{x:(t+Vt)*s,y:(e+Vt)*s}}_updateMinimap(t){if(this.minimapAcc+=t,this.minimapAcc<.1)return;this.minimapAcc=0,this._ensureMap();const e=lt("#minimap"),i=e.getContext("2d"),n=e.width,s=this.game.player.pos,o=46;i.clearRect(0,0,n,n),i.save(),i.beginPath(),i.arc(n/2,n/2,n/2,0,Math.PI*2),i.clip(),i.fillStyle="#0b1116",i.fillRect(0,0,n,n);const r=this._renderMinimapTile(s,o);i.imageSmoothingEnabled=!0,i.drawImage(r,0,0,r.width,r.height,0,0,n,n);const c=(d,u)=>({x:n/2+(d-s.x)/o*(n/2),y:n/2+(u-s.z)/o*(n/2)});for(const d of dl){const u=c(d.x,d.z);Math.hypot(u.x-n/2,u.y-n/2)>n/2-6||(i.fillStyle=d.color,i.beginPath(),i.arc(u.x,u.y,4,0,Math.PI*2),i.fill(),i.strokeStyle="rgba(0,0,0,0.6)",i.lineWidth=1,i.stroke())}for(const d of this.game.enemies.list){if(!d.active||d.dead)continue;const u=c(d.pos.x,d.pos.z);Math.hypot(u.x-n/2,u.y-n/2)>n/2-4||(i.fillStyle=d.boss?"#ff7a4a":d.elite?"#e0a851":"#c05a4a",i.beginPath(),i.arc(u.x,u.y,d.boss?4:2.6,0,Math.PI*2),i.fill())}for(const d of this.game.npcs){if(!d.visible)continue;const u=c(d.pos.x,d.pos.z);i.fillStyle="#8fbf72",i.beginPath(),i.arc(u.x,u.y,2.6,0,Math.PI*2),i.fill()}const l=this.game.questTargetPos?.();if(l){const d=c(l.x,l.z),u=Xt(d.x,10,n-10),f=Xt(d.y,10,n-10);i.fillStyle="#b977e8",i.beginPath(),i.arc(u,f,5,0,Math.PI*2),i.fill(),i.strokeStyle="#e0c8ff",i.lineWidth=1.5,i.stroke()}const h=this.game.player.yaw;i.save(),i.translate(n/2,n/2),i.rotate(-h+Math.PI),i.fillStyle="#f6efdf",i.beginPath(),i.moveTo(0,-8),i.lineTo(5.5,6),i.lineTo(0,3),i.lineTo(-5.5,6),i.closePath(),i.fill(),i.restore(),i.fillStyle="rgba(226,184,120,0.9)",i.font="bold 12px Inter, sans-serif",i.textAlign="center",i.fillText("N",n/2,16),i.restore()}drawBigMap(){this._ensureMap();const t=lt("#bigmap"),e=t.getContext("2d"),i=t.width,n=t.height;Math.max(i/this.mapSize,n/this.mapSize),e.imageSmoothingEnabled=!0,e.fillStyle="#070a0d",e.fillRect(0,0,i,n);const s=Math.min(i,n),o=(i-s)/2,r=(n-s)/2;e.drawImage(this.mapCanvas,o,r,s,s);const c=(p,m)=>({x:o+(p+Vt)/(2*Vt)*s,y:r+(m+Vt)/(2*Vt)*s}),l=e.createRadialGradient(i/2,n/2,s*.4,i/2,n/2,s*.56);l.addColorStop(0,"rgba(6,8,11,0)"),l.addColorStop(.75,"rgba(6,8,11,0.35)"),l.addColorStop(1,"rgba(6,8,11,0.9)"),e.fillStyle=l,e.fillRect(0,0,i,n),e.textAlign="center";const h=[];for(const p of dl){const m=c(p.x,p.z);e.fillStyle=p.color,e.beginPath(),e.arc(m.x,m.y,6.5,0,Math.PI*2),e.fill(),e.strokeStyle="rgba(0,0,0,0.55)",e.lineWidth=1.5,e.stroke(),e.font="600 14px Inter, sans-serif";const y=e.measureText(p.short).width,x=[{dx:0,dy:-15},{dx:0,dy:26},{dx:-y/2-12,dy:5},{dx:y/2+12,dy:5}];let w=null;for(const E of x){const T={x:m.x+E.dx-y/2-3,y:m.y+E.dy-13,w:y+6,h:18};if(!h.some(I=>T.x<I.x+I.w&&T.x+T.w>I.x&&T.y<I.y+I.h&&T.y+T.h>I.y)){w={...E,box:T};break}}if(!w)continue;h.push(w.box),e.textAlign=w.dy===5?w.dx<0?"right":"left":"center";const R=w.dy===5?m.x+w.dx:m.x;e.lineWidth=3,e.strokeStyle="rgba(8,10,13,0.85)",e.strokeText(p.short,R,m.y+w.dy),e.fillStyle="#e8dfcd",e.fillText(p.short,R,m.y+w.dy),e.textAlign="center"}const d=this.game.player.pos;for(const p of this.game.enemies.list){if(!p.active||p.dead||!p.boss&&re(p.pos.x,p.pos.z,d.x,d.z)>170)continue;const m=c(p.pos.x,p.pos.z);e.fillStyle=p.boss?"#ff7a4a":p.elite?"#e0a851":"rgba(206,96,78,0.95)",e.beginPath(),e.arc(m.x,m.y,p.boss?6:3.2,0,Math.PI*2),e.fill()}for(const p of this.game.npcs){if(!p.visible)continue;const m=c(p.pos.x,p.pos.z);e.fillStyle="#8fbf72",e.beginPath(),e.arc(m.x,m.y,3,0,Math.PI*2),e.fill()}const u=this.game.questTargetPos?.();if(u){const p=c(u.x,u.z);e.strokeStyle="#b977e8",e.lineWidth=2.5,e.beginPath(),e.arc(p.x,p.y,14,0,Math.PI*2),e.stroke(),e.fillStyle="#d8bcff",e.font="600 13px Inter, sans-serif",e.fillText("CEL",p.x,p.y-22)}const f=this.game.player.pos,g=c(f.x,f.z);e.save(),e.translate(g.x,g.y),e.rotate(-this.game.player.yaw+Math.PI),e.fillStyle="#f8f1e2",e.beginPath(),e.moveTo(0,-12),e.lineTo(8,9),e.lineTo(0,4),e.lineTo(-8,9),e.closePath(),e.fill(),e.restore(),e.strokeStyle="rgba(226,184,120,0.28)",e.lineWidth=1,e.strokeRect(o+.5,r+.5,s-1,s-1),e.fillStyle="rgba(233,226,212,0.65)",e.font="12px Inter, sans-serif",e.textAlign="left";const v=100/(2*Vt)*s;e.fillText("0",24,n-26),e.fillRect(24,n-22,v,2),e.fillText("100 m",24+v+6,n-22),e.textAlign="right",e.fillText("N ↑",i-24,30)}log(t,e=""){const i=document.createElement("div");for(i.className=`line ${e}`,i.textContent=t,this.logEl.appendChild(i);this.logEl.children.length>7;)this.logEl.removeChild(this.logEl.firstChild);setTimeout(()=>{i.style.transition="opacity 0.6s",i.style.opacity="0",setTimeout(()=>i.remove(),700)},7e3)}toast(t,e=""){this.toastEl.innerHTML=`${t}${e?`<small>${e}</small>`:""}`,this.toastEl.classList.add("show"),this.toastTimer=3.4}floatNumber(t,e,i=""){const n=this.game.camera,s=t.clone().project(n);if(s.z>1)return;const o=(s.x*.5+.5)*window.innerWidth,r=(-s.y*.5+.5)*window.innerHeight,c=document.createElement("div");c.className=`float-num ${i}`,c.textContent=e,c.style.left=`${o+(Math.random()-.5)*26}px`,c.style.top=`${r}px`,this.worldOverlay.appendChild(c),setTimeout(()=>c.remove(),950)}setInteract(t){if(t!==this.interactText){if(this.interactText=t,!t){this.interactEl.classList.remove("show");return}lt("span",this.interactEl).textContent=t,this.interactEl.classList.add("show")}}showLocation(t,e=""){this.locEl.querySelector("span").textContent=t,this.locEl.querySelector("small").textContent=e,this.locEl.classList.add("show"),this.locationTimer=3.6}flashScreen(t,e=.3){this.flashEl.style.transition="none",this.flashEl.style.background=t,this.flashEl.style.opacity=String(e),this.flashEl.offsetWidth,this.flashEl.style.transition="opacity 0.45s ease",this.flashEl.style.opacity="0"}setClock(t,e){this.clockEl&&(this.clockEl.textContent=`${e?"☾":"☀"} ${t}`)}}class To{constructor(t){this.game=t,this.active=null,this.completed=new Set,this.progress={},this.killCounters={},this.talked={},this.changed=!0}get activeQuest(){return this.active?wi[this.active]:null}questDone(t){return this.completed.has(t)}availableQuest(){for(const t of vr)if(!this.completed.has(t)&&this.active!==t)return this.active?null:{id:t,...wi[t]};return null}accept(t){return!wi[t]||this.active?!1:(this.active=t,this.progress[t]={},this.killCounters[t]={},this.talked[t]={},t==="boss"&&this.game.bossDefeated&&(this.killCounters[t].kaldras=1),this.changed=!0,this.game.ui?.log(`Nowe zadanie: ${wi[t].name}`,"gold"),this.game.ui?.toast(wi[t].name,"Nowe zadanie"),this.game.audio?.quest(),this.game.ui?.refreshHud(),!0)}onKill(t){if(!this.active)return;const i=this.activeQuest.objectives.find(n=>n.type==="kill"&&n.enemy===t);i&&(this.killCounters[this.active][i.id]=(this.killCounters[this.active][i.id]??0)+1,this.changed=!0,this.game.ui?.refreshHud(),this.evaluate(!0))}onTalk(t){this.active&&(this.talked[this.active][`talk_${t}`]=!0,this.changed=!0,this.evaluate(!0))}objectiveState(t){const e=this.active;if(!e)return{done:!1,current:0,target:t.target??1};const i=this.killCounters[e]??{};if((this.progress[e]??{})[t.id])return{done:!0,current:t.target??1,target:t.target??1};if(t.type==="kill"){const s=i[t.id]??0;return{done:s>=(t.target??1),current:Math.min(s,t.target??1),target:t.target??1}}if(t.type==="collect"||t.type==="own"){const s=this.game.player.inventory.count(t.item);return{done:s>=(t.target??1),current:Math.min(s,t.target??1),target:t.target??1}}if(t.type==="talk"){const s=this.talked[e]?.[`talk_${t.npc}`];return{done:!!s,current:s?1:0,target:1}}return{done:!1,current:0,target:1}}canComplete(t=this.active){if(!t)return!1;const e=wi[t];return e?e.objectives.every(i=>this.objectiveState(i).done):!1}evaluate(t=!1){if(!this.active)return;const e=this.activeQuest,i=this.progress[this.active];for(const n of e.objectives){if(i[n.id])continue;this.objectiveState(n).done&&(i[n.id]=!0,this.changed=!0,this.game.ui?.refreshHud(),t&&(this.game.ui?.log(`Cel ukończony: ${n.text.replace(/\s\(\d+\/\d+\)$/,"")}`,"good"),this.game.audio?.objective()))}if(this.canComplete()&&!this._readyAnnounced){this._readyAnnounced=!0;const s=e.giver==="eryn"?"Starego Eryna":"kowala Borysa";e.final||this.game.ui?.toast("Zadanie gotowe",`Wróć do ${s}`),this.game.ui?.refreshHud()}}complete(t=this.active){if(!t||!this.canComplete(t))return!1;const e=wi[t];this.completed.add(t),this.active=null,this._readyAnnounced=!1;const i=this.game.player;i.inventory.gold+=e.reward.gold??0;for(const[n,s]of e.reward.items??[])i.inventory.add(n,s),this.game.ui?.log(`Otrzymano: ${Ae[n]?.name??n} ×${s}`,"gold");return i.gainXp(e.reward.xp??0),this.game.ui?.log(`Zadanie ukończone: ${e.name} (+${e.reward.gold} złota, +${e.reward.xp} PD)`,"good"),this.game.ui?.toast(e.name,"Zadanie ukończone"),this.game.audio?.questComplete(),this.game.ui?.refreshHud(),this.game.onQuestCompleted(t),!0}statusLines(){if(!this.active){const e=this.availableQuest();return e?[{text:`Nowe zadanie u Starego Eryna: ${e.name}`,done:!1}]:this.completed.size>=vr.length?[{text:"Wszystkie zadania ukończone.",done:!0}]:[{text:"Porozmawiaj z mieszkańcami wioski.",done:!1}]}return this.activeQuest.objectives.map(e=>{const i=this.objectiveState(e);let n=e.text.replace(/\(\d+\/\d+\)$/,"").trim();return e.target>1&&(n+=` (${i.current}/${i.target})`),{text:n,done:i.done,raw:e}})}currentObjectiveText(){return this.statusLines().filter(e=>!e.done)[0]?.text??"Zadanie gotowe — wróć do zleceniodawcy"}targetHint(){const t=this.activeQuest;if(!t)return this.availableQuest()?"Stary Eryn — Wilcza Dolina":null;if(this.canComplete())return"Wróć do zleceniodawcy";const e=t.objectives.find(i=>!this.objectiveState(i).done);return e?e.type==="talk"?"Wilcza Dolina":e.type==="kill"?{wolf:"Okolice Wilczej Doliny",bandit:"Obozowisko bandytów",bandit_leader:"Obozowisko bandytów",skeleton:"Kurhan / Mgliste Wrota",wraith:"Kurhan Szeptu (noc)",kaldras:"Mgliste Wrota"}[e.enemy]??"Dzicz":e.type==="collect"?{stolen_grain:"Obozowisko bandytów",shard_dawn:"Kurhan / obóz",ancient_metal:"Kamieniołom / kurhan"}[e.item]??"Dzicz":t.name:null}serialize(){return{active:this.active,completed:[...this.completed],progress:this.progress,killCounters:this.killCounters,talked:this.talked}}load(t){t&&(this.active=t.active??null,this.completed=new Set(t.completed??[]),this.progress=t.progress??{},this.killCounters=t.killCounters??{},this.talked=t.talked??{},this._readyAnnounced=!1,this.changed=!0)}}class Ao{constructor(t){this.game=t,this.npcId=null,this.nodes=null,this.current=null,this.open=!1}ctx(){const t=this.game,e=t.quests;return{active:e.active,availableQuest:e.availableQuest(),allDone:e.completed.size>=Object.keys(wi).length,canComplete:e.active?e.canComplete(e.active):!1,questDone:i=>e.questDone(i),hasItem:i=>t.player.inventory.has(i),night:t.dayNight.isNight,playerLevel:t.player.level,hour:t.dayNight.hour}}start(t){const e=Gi[t];return e?(this.npcId=t,this.nodes=e.tree(this.ctx()),this.current="start",this.open=!0,this.game.quests.onTalk(t),this.render(),this.game.audio?.uiOpen(),!0):!1}render(){if(!this.open||!this.nodes?.[this.current])return;const t=this.nodes[this.current],e=Gi[this.npcId],i=(t.choices??[]).map((n,s)=>({...n,index:s}));this.game.voice?.speak(t.text,this.npcId),this.game.ui.showDialogue({speaker:t.speaker??e.name,role:e.role,text:t.text,choices:i,onChoose:n=>this.choose(n),onClose:()=>this.close()})}choose(t){const i=this.nodes[this.current]?.choices?.[t];if(i){if(i.action){this.handleAction(i.action);return}i.next&&(this.current=i.next,this.render(),this.game.audio?.uiClick())}}handleAction(t){const[e,i]=t.split(":"),n=this.game;if(e==="close"){this.close();return}if(e==="accept"){const s=wi[i];if(!s)return;n.quests.accept(i),this.game.ui?.hideDialogue(),this.open=!1,this.game.ui?.showQuestIntro(s,()=>{n.resumeFromUi()});return}if(e==="complete"){const s=wi[i];n.quests.complete(i),this.close(),s&&n.ui?.showQuestOutro(s,()=>n.resumeFromUi());return}if(e==="shop"){this.close(),n.ui?.openShop(i);return}if(e==="craft"){this.close(),n.ui?.openCrafting("village");return}if(e==="rest"){this.close(),n.restAtCampfire();return}}close(){this.open=!1,this.npcId=null,this.nodes=null,this.game.voice?.stop(),this.game.ui?.hideDialogue(),this.game.ui?.anyPanelOpen?.()||this.game.resumeFromUi()}}class Ng{constructor(){this.ctx=null,this.master=null,this.musicGain=null,this.sfxGain=null,this.ambientGain=null,this.enabled=!0,this.musicOn=!0,this.started=!1,this.lastStep=0,this.env={night:0,sea:0,forest:0,fire:0,rain:0,wind:.5,underwater:0},this._timers={bird:2,owl:9,wolf:16,cricket:1.5,fire:.6,wave:3,drip:5},this._firePos=null,this.listener={x:0,z:0,yaw:0}}unlock(){if(this.ctx){this.ctx.state==="suspended"&&this.ctx.resume();return}const t=window.AudioContext||window.webkitAudioContext;t&&(this.ctx=new t,this.master=this.ctx.createGain(),this.master.gain.value=.55,this.master.connect(this.ctx.destination),this.sfxGain=this.ctx.createGain(),this.sfxGain.gain.value=.8,this.sfxGain.connect(this.master),this.musicGain=this.ctx.createGain(),this.musicGain.gain.value=.12,this.musicGain.connect(this.master),this.ambientGain=this.ctx.createGain(),this.ambientGain.gain.value=.5,this.ambientGain.connect(this.master),this.reverb=this.ctx.createConvolver(),this.reverb.buffer=this._makeImpulse(1.9,2.6),this.reverbGain=this.ctx.createGain(),this.reverbGain.gain.value=.22,this.reverb.connect(this.reverbGain).connect(this.master),this.noiseBuffer=this._makeNoise(),this._startAmbient())}_makeNoise(){const t=this.ctx.sampleRate*2,e=this.ctx.createBuffer(1,t,this.ctx.sampleRate),i=e.getChannelData(0);for(let n=0;n<t;n++)i[n]=Math.random()*2-1;return e}_makeImpulse(t,e){const i=this.ctx.sampleRate,n=Math.floor(i*t),s=this.ctx.createBuffer(2,n,i);for(let o=0;o<2;o++){const r=s.getChannelData(o);for(let c=0;c<n;c++){const l=c/n;r[c]=(Math.random()*2-1)*Math.pow(1-l,e)}}return s}_loopNoise(t,e,i,n){const s=this.ctx.createBufferSource();s.buffer=this.noiseBuffer,s.loop=!0;const o=this.ctx.createBiquadFilter();o.type=t,o.frequency.value=e,o.Q.value=i;const r=this.ctx.createGain();return r.gain.value=n,s.connect(o).connect(r).connect(this.ambientGain),s.start(),{src:s,filter:o,gain:r}}_startAmbient(){if(!this.ctx)return;this.wind=this._loopNoise("lowpass",520,.7,.05);const t=this.ctx.createOscillator();t.frequency.value=.06;const e=this.ctx.createGain();e.gain.value=240,t.connect(e).connect(this.wind.filter.frequency),t.start(),this.sea=this._loopNoise("bandpass",420,.6,0);const i=this.ctx.createOscillator();i.frequency.value=.11;const n=this.ctx.createGain();n.gain.value=.5,i.connect(n).connect(this.sea.gain.gain),i.start(),this.night=this._loopNoise("lowpass",260,.9,0),this.nightBed=this.ctx.createGain(),this.nightBed.gain.value=0,this.rain=this._loopNoise("highpass",1800,.4,0),this.rain2=this._loopNoise("bandpass",5200,.5,0);const s=this.ctx.createGain();s.gain.value=.12,s.connect(this.musicGain),[55,82.5,110].forEach((o,r)=>{const c=this.ctx.createOscillator();c.type=r===2?"triangle":"sine",c.frequency.value=o;const l=this.ctx.createGain();l.gain.value=.3/(r+1),c.connect(l).connect(s),c.start();const h=this.ctx.createOscillator();h.frequency.value=.05+r*.03;const d=this.ctx.createGain();d.gain.value=.12,h.connect(d).connect(c.frequency),h.start()}),this.started=!0}setVolume(t){this.master&&(this.master.gain.value=t)}toggleMute(){return this.enabled=!this.enabled,this.master&&(this.master.gain.value=this.enabled?.55:0),this.enabled}setListener(t,e,i=0){this.listener.x=t,this.listener.z=e,this.listener.yaw=i}setEnvironment(t){Object.assign(this.env,t)}_panner(t){if(!this.ctx.createStereoPanner)return null;const e=this.ctx.createStereoPanner();return e.pan.value=Math.max(-1,Math.min(1,t)),e}_panFor(t,e){if(t==null||e==null)return 0;const i=t-this.listener.x,n=e-this.listener.z,s=Math.hypot(i,n)||1,o=Math.cos(-this.listener.yaw),r=Math.sin(-this.listener.yaw),c=i*o-n*r;return Math.max(-1,Math.min(1,c/s))*Math.min(1,s/25)}update(t,e={}){if(!this.ctx)return;this.setEnvironment(e);const i=this.env,n=this.ctx.currentTime;this.time=(this.time??0)+t,this.sea.gain.gain.setTargetAtTime(.02+i.sea*.16,n,.6),this.sea.filter.frequency.setTargetAtTime(360+i.sea*420,n,.8),this.wind.gain.gain.setTargetAtTime(.03+i.wind*.06,n,1.2),this.rain.gain.gain.setTargetAtTime(i.rain*.1,n,1.5),this.rain2.gain.gain.setTargetAtTime(i.rain*.035,n,1.5);const s=this._timers;if(s.bird-=t,s.bird<=0){s.bird=1.2+Math.random()*4.5;const o=1-i.night;o>.35&&(i.forest>.15||Math.random()<.4)&&this.birdChirp(o)}s.cricket-=t,s.cricket<=0&&(s.cricket=.7+Math.random()*2.2,i.night>.5&&i.forest>.1&&this.cricket(i.night)),s.owl-=t,s.owl<=0&&(s.owl=14+Math.random()*26,i.night>.6&&this.owl()),s.wolf-=t,s.wolf<=0&&(s.wolf=26+Math.random()*50,i.night>.45&&i.forest>.2&&this.distantHowl()),s.wave-=t,s.wave<=0&&(s.wave=2.4+Math.random()*3.4,i.sea>.05&&this.waveWash(i.sea)),s.fire-=t,s.fire<=0&&(s.fire=.25+Math.random()*.9,i.fire>.02&&this.crackle(i.fire)),s.drip-=t,s.drip<=0&&(s.drip=3+Math.random()*7,i.rain>.3&&this.drip())}_tone(t,e,{type:i="sine",gain:n=.2,slide:s=0,delay:o=0,pan:r=0,reverb:c=0}={}){if(!this.ctx||!this.enabled)return;const l=this.ctx.currentTime+o,h=this.ctx.createOscillator(),d=this.ctx.createGain();h.type=i,h.frequency.setValueAtTime(t,l),s&&h.frequency.exponentialRampToValueAtTime(Math.max(20,t+s),l+e),d.gain.setValueAtTime(0,l),d.gain.linearRampToValueAtTime(n,l+.012),d.gain.exponentialRampToValueAtTime(8e-4,l+e);let u=h;if(r){const f=this._panner(r);f?(h.connect(d).connect(f),f.connect(this.sfxGain),c&&f.connect(this.reverb)):h.connect(d).connect(this.sfxGain)}else h.connect(d).connect(this.sfxGain),c&&d.connect(this.reverb);return h.start(l),h.stop(l+e+.02),u}_noise(t,{filterFreq:e=1200,q:i=1,gain:n=.16,type:s="bandpass",delay:o=0,pan:r=0,attack:c=.005,reverb:l=0}={}){if(!this.ctx||!this.enabled)return;const h=this.ctx.currentTime+o,d=this.ctx.createBufferSource();d.buffer=this.noiseBuffer,d.playbackRate.value=.85+Math.random()*.35;const u=this.ctx.createBiquadFilter();u.type=s,u.frequency.setValueAtTime(e,h),u.frequency.exponentialRampToValueAtTime(Math.max(120,e*.45),h+t),u.Q.value=i;const f=this.ctx.createGain();f.gain.setValueAtTime(1e-4,h),f.gain.linearRampToValueAtTime(n,h+c),f.gain.exponentialRampToValueAtTime(8e-4,h+t),d.connect(u).connect(f);const g=r?this._panner(r):null;g?(f.connect(g),g.connect(this.sfxGain)):f.connect(this.sfxGain),l&&f.connect(this.reverb),d.start(h),d.stop(h+t+.02)}swing(t=0){this._noise(.2,{filterFreq:2600+t*600,gain:.13,q:1.4}),this._noise(.1,{filterFreq:900,gain:.05,type:"highpass",delay:.03}),this._tone(170+t*40,.11,{type:"triangle",gain:.05,slide:-70})}hit(t=!1){this._noise(.13,{filterFreq:t?700:1300,gain:t?.26:.17,type:"lowpass",reverb:.4}),this._tone(t?130:210,.16,{type:"square",gain:t?.12:.06,slide:-60}),this._noise(.07,{filterFreq:2600,gain:.07,delay:.02})}parry(){this._tone(1760,.5,{type:"triangle",gain:.07,slide:-420,reverb:.6}),this._tone(2637,.42,{type:"sine",gain:.05,slide:-600,delay:.01,reverb:.6}),this._noise(.12,{filterFreq:5200,gain:.09,type:"highpass"})}enemyHit(){this._noise(.11,{filterFreq:640,gain:.11,type:"lowpass"})}enemySwing(){this._noise(.22,{filterFreq:1200,gain:.1,pan:.3})}hurt(){this._tone(150,.34,{type:"sawtooth",gain:.14,slide:-60}),this._noise(.22,{filterFreq:380,gain:.13,type:"lowpass"})}dodge(){this._noise(.3,{filterFreq:900,gain:.1,type:"highpass"}),this._noise(.12,{filterFreq:400,gain:.06,type:"lowpass",delay:.24})}cast(){[520,760,1020].forEach((t,e)=>this._tone(t,.4,{type:"sine",gain:.09,delay:e*.05,slide:120,reverb:.5})),this._noise(.34,{filterFreq:2600,gain:.06,type:"highpass",reverb:.6})}bow(){this._noise(.14,{filterFreq:3200,gain:.1,type:"highpass"})}growl(){this._tone(86,.55,{type:"sawtooth",gain:.1,slide:-26,pan:.2}),this._noise(.4,{filterFreq:300,gain:.05,type:"lowpass",pan:.2})}slam(){this._tone(64,.6,{type:"sine",gain:.3,slide:-30,reverb:.5}),this._noise(.55,{filterFreq:280,gain:.25,type:"lowpass",reverb:.5})}drink(){this._tone(420,.16,{type:"sine",gain:.08,slide:200}),this._tone(620,.2,{type:"sine",gain:.05,delay:.08,slide:160})}birdChirp(t=1){const e=2100+Math.random()*1600,i=(Math.random()*2-1)*.8,n=2+Math.floor(Math.random()*3);for(let s=0;s<n;s++){const o=e*(.9+Math.random()*.35);this._tone(o,.07,{type:"sine",gain:.028*t,slide:o*(Math.random()<.5?.35:-.3),delay:s*(.07+Math.random()*.06),pan:i})}}cricket(t=1){const e=(Math.random()*2-1)*.9,i=4200+Math.random()*900;for(let n=0;n<3;n++)this._tone(i,.022,{type:"square",gain:.012*t,delay:n*.055,pan:e})}owl(){const t=(Math.random()*2-1)*.8;this._tone(330,.34,{type:"sine",gain:.028,slide:-40,pan:t,reverb:.6}),this._tone(292,.42,{type:"sine",gain:.024,slide:-30,delay:.42,pan:t,reverb:.6})}distantHowl(){const t=(Math.random()*2-1)*.85,e=320+Math.random()*60;this._tone(e,.9,{type:"sine",gain:.03,slide:130,pan:t,reverb:.9}),this._tone(e*1.5,1.2,{type:"sine",gain:.018,slide:-90,delay:.5,pan:t,reverb:.9})}waveWash(t=1){this._noise(1.6+Math.random()*1.2,{filterFreq:900+Math.random()*500,gain:.05*t,type:"lowpass",attack:.6,reverb:.3,pan:(Math.random()*2-1)*.5})}crackle(t=1){this._noise(.05+Math.random()*.09,{filterFreq:1800+Math.random()*2600,gain:.02+.05*t,q:.8,attack:.002,pan:this._panFor(this._firePos?.x,this._firePos?.z)})}drip(){this._tone(1200+Math.random()*900,.09,{type:"sine",gain:.03,slide:-500,pan:(Math.random()*2-1)*.7,reverb:.7})}step(t="grass"){if(!this.ctx)return;const e=this.ctx.currentTime,i=t==="water"?.24:.26;if(!(e-this.lastStep<i))switch(this.lastStep=e,t){case"water":this._noise(.26,{filterFreq:1500,gain:.09,type:"highpass",attack:.01}),this._noise(.18,{filterFreq:500,gain:.05,type:"lowpass",delay:.03});break;case"stone":this._noise(.07,{filterFreq:2400,gain:.055,q:2.2,attack:.002}),this._tone(190,.06,{type:"square",gain:.02,slide:-60});break;case"wood":this._tone(170,.09,{type:"triangle",gain:.045,slide:-70}),this._noise(.06,{filterFreq:900,gain:.035});break;case"dirt":this._noise(.11,{filterFreq:800,gain:.05,type:"lowpass",attack:.004});break;case"snow":this._noise(.16,{filterFreq:3200,gain:.04,type:"highpass",attack:.02});break;default:this._noise(.13,{filterFreq:1600,gain:.045,type:"bandpass",q:.6,attack:.008}),this._noise(.09,{filterFreq:420,gain:.03,type:"lowpass",delay:.01})}}uiClick(){this._tone(660,.07,{type:"triangle",gain:.05})}uiOpen(){this._tone(440,.12,{type:"sine",gain:.05,slide:80}),this._tone(590,.14,{type:"sine",gain:.04,delay:.05,slide:60})}quest(){[392,523,659].forEach((t,e)=>this._tone(t,.5,{type:"triangle",gain:.06,delay:e*.09,reverb:.4}))}objective(){[523,698].forEach((t,e)=>this._tone(t,.35,{type:"sine",gain:.05,delay:e*.07}))}questComplete(){[392,523,659,784].forEach((t,e)=>this._tone(t,.6,{type:"triangle",gain:.07,delay:e*.11,reverb:.4}))}levelUp(){[523,659,784,1046].forEach((t,e)=>this._tone(t,.7,{type:"sine",gain:.09,delay:e*.1,reverb:.5}))}coin(){this._tone(1180,.1,{type:"triangle",gain:.06}),this._tone(1560,.12,{type:"triangle",gain:.05,delay:.05})}death(){[330,261,196,130].forEach((t,e)=>this._tone(t,.9,{type:"triangle",gain:.09,delay:e*.16,slide:-20,reverb:.6}))}victory(){[523,659,784,1046,1318].forEach((t,e)=>this._tone(t,1.2,{type:"triangle",gain:.08,delay:e*.16,reverb:.6}))}}const Fg={eryn:{pitch:.72,rate:.86,hint:"męski"},borys:{pitch:.6,rate:.9,hint:"męski"},marena:{pitch:1.24,rate:.98,hint:"żeński"},bogdan:{pitch:.85,rate:1.05,hint:"męski"},hagar:{pitch:.66,rate:.82,hint:"męski"},rudolf:{pitch:.78,rate:.94,hint:"męski"},duch:{pitch:1.05,rate:.72,hint:"żeński"},kaldras:{pitch:.45,rate:.78,hint:"męski"},narrator:{pitch:.9,rate:.92,hint:"męski"}},Og={pitch:.92,rate:.95,hint:"męski"};class Bg{constructor(t){if(this.game=t,this.supported=typeof window<"u"&&"speechSynthesis"in window&&typeof window.SpeechSynthesisUtterance=="function",this.enabled=!0,this.voice=null,this.polish=!1,this.voicesReady=!1,this.current=null,this.lastText="",this._resolveVoices=this._resolveVoices.bind(this),!!this.supported)try{this._resolveVoices(),window.speechSynthesis.addEventListener?.("voiceschanged",this._resolveVoices),setTimeout(()=>this._resolveVoices(),600),setTimeout(()=>this._resolveVoices(),2e3)}catch{this.supported=!1}}_resolveVoices(){if(!this.supported)return;let t=[];try{t=window.speechSynthesis.getVoices()||[]}catch{t=[]}if(!t.length)return;const e=t.filter(i=>(i.lang||"").toLowerCase().startsWith("pl"));this._all=t,this.polish=e.length>0,this.voice=e[0]??t.find(i=>(i.lang||"").toLowerCase().startsWith("en"))??t[0],this.voicesReady=!0,this.onReady?.(this)}get available(){return this.supported&&this.voicesReady&&!!this.voice}status(){return this.supported?this.voicesReady?this.polish?`Głos: ${this.voice.name}`:"Brak polskiego głosu w systemie — dialogi są tylko pisane.":"Wczytywanie głosów…":"Synteza mowy niedostępna w tej przeglądarce."}_pickVoice(t){const i=(this._all||[]).filter(o=>(o.lang||"").toLowerCase().startsWith("pl"));if(!i.length)return this.voice;const n=i.find(o=>/female|paulina|zofia|aria|kobieta/i.test(o.name)),s=i.find(o=>/male|marek|adam|jacek|mezczyzna|mężczyzna/i.test(o.name));return t.hint==="żeński"&&n?n:t.hint==="męski"&&s?s:i[0]}_clean(t){return String(t??"").replace(/[„”"«»]/g,"").replace(/—|–/g,", ").replace(/\.\.\./g,"…").replace(/\s+/g," ").trim()}speak(t,e="narrator"){if(!this.supported||!this.enabled)return!1;const i=this._clean(t);if(!i||i===this.lastText)return!1;this.lastText=i;const n=Fg[e]??Og;try{window.speechSynthesis.cancel();const s=new window.SpeechSynthesisUtterance(i.slice(0,480));s.lang=this.polish?"pl-PL":this.voice?.lang||"pl-PL";const o=this._pickVoice(n);return o&&(s.voice=o),s.pitch=n.pitch,s.rate=n.rate,s.volume=1,s.onstart=()=>{this.speaking=!0},s.onend=()=>{this.speaking=!1,this.current=null},s.onerror=()=>{this.speaking=!1,this.current=null},this.current=s,window.speechSynthesis.speak(s),!0}catch{return!1}}say(t,e){this.speak(t,e)}stop(){if(this.lastText="",!!this.supported){try{window.speechSynthesis.cancel()}catch{}this.speaking=!1,this.current=null}}toggle(){return this.enabled=!this.enabled,this.enabled?this.lastText="":this.stop(),this.enabled}}const Co={clear:{rain:0,fog:1,label:"Pogodnie"},overcast:{rain:0,fog:.72,label:"Zachmurzenie"},rain:{rain:1,fog:.55,label:"Deszcz"},storm:{rain:1.35,fog:.42,label:"Burza"},mist:{rain:0,fog:.35,label:"Mgła"}};class Hg{constructor(t){this.scene=t,this.rng=new Te(90210),this.state="clear",this.target="clear",this.blend=1,this.timer=150+this.rng.float(0,120),this.rain=0,this.fogScale=1,this.label=Co.clear.label;const e=2600,i=new Float32Array(e*3),n=new Float32Array(e);this.span=70;for(let c=0;c<e;c++)i[c*3]=this.rng.float(-this.span,this.span),i[c*3+1]=this.rng.float(0,46),i[c*3+2]=this.rng.float(-this.span,this.span),n[c]=this.rng.float(24,40);const s=new Ce;s.setAttribute("position",new ke(i,3));const o=new Ia({color:"#c8d8e8",size:.09,transparent:!0,opacity:0,depthWrite:!1,sizeAttenuation:!0});this.points=new kr(s,o),this.points.frustumCulled=!1,this.points.name="rain",this.speeds=n,t.add(this.points),this.mistGroup=new et,this.mistGroup.name="mist";const r=new Se({color:"#cfd8dc",transparent:!0,opacity:0,depthWrite:!1,side:we});this.mistMat=r,this.mistPuffs=[];for(let c=0;c<14;c++){const l=new gt(new fn(90,26),r);l.rotation.x=-Math.PI/2,l.position.set(this.rng.float(-60,60),this.rng.float(1,5),this.rng.float(-60,60)),this.mistGroup.add(l),this.mistPuffs.push(l)}t.add(this.mistGroup)}_pickNext(){const t=this.rng.next();return t<.4?"clear":t<.66?"overcast":t<.86?"rain":t<.95?"mist":"storm"}update(t,e){this.timer-=t,this.timer<=0&&(this.state=this.target,this.target=this._pickNext(),this.blend=0,this.timer=90+this.rng.float(0,160)),this.blend<1&&(this.blend=Math.min(1,this.blend+t/12));const i=Co[this.state],n=Co[this.target],s=this.blend*this.blend*(3-2*this.blend);this.rain=i.rain+(n.rain-i.rain)*s,this.fogScale=i.fog+(n.fog-i.fog)*s,this.label=(s>.5?n:i).label;const o=this.points.geometry.attributes.position,r=o.array,c=e?.position.x??0,l=e?.position.z??0,h=e?.position.y??10,d=1+this.rain*.6;for(let f=0;f<this.speeds.length;f++)r[f*3+1]-=this.speeds[f]*d*t,r[f*3]+=t*3.4,r[f*3]>this.span&&(r[f*3]-=this.span*2),r[f*3+1]<-6&&(r[f*3+1]+=52,r[f*3]=this.rng.float(-this.span,this.span),r[f*3+2]=this.rng.float(-this.span,this.span));o.needsUpdate=!0,this.points.position.set(c,h+14,l),this.points.material.opacity=Math.min(.55,this.rain*.42);const u=Math.max(0,this.rain<.05?1-this.fogScale:0);this.mistMat.opacity=u*.3,this.mistGroup.position.set(c,h-6,l);for(let f=0;f<this.mistPuffs.length;f++){const g=this.mistPuffs[f];g.position.x+=Math.sin(this.timer*.1+f)*t*1.6,g.position.z+=Math.cos(this.timer*.08+f)*t*1.2}}}const Ro="runy-przeznaczenia-save",Gg="ostrze-switu-save";class Vg{constructor(t,e={}){this.canvas=t,this.options=e,this.state="title",this.clock=new g0,this.time=0,this.npcs=[],this.kills=0,this.autosaveTimer=0,this.lastRegion=null,this.titleAngle=0,this.running=!1,this._initRenderer(),this._initScene(),this._initGame(),this._bindInput(),this._bindResize()}_initRenderer(){if(this.options.renderer){this.renderer=this.options.renderer;return}this.renderer=new o0({canvas:this.canvas,antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(2,window.devicePixelRatio||1)),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=ml,this.renderer.toneMapping=gl,this.renderer.toneMappingExposure=1.4,this.renderer.outputColorSpace=ri}_initScene(){this.scene=new r0,this.scene.fog=new Pr("#b9d2dc",140,1150),this.camera=new ci(62,window.innerWidth/window.innerHeight,.12,3200),this.camera.position.set(0,12,58),this.hemi=new d0("#cfe0ea","#4a4433",.9),this.scene.add(this.hemi),this.sun=new p0("#fff3d6",1.8),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(2048,2048),this.sun.shadow.camera.near=1,this.sun.shadow.camera.far=300,this.sun.shadow.camera.left=-60,this.sun.shadow.camera.right=60,this.sun.shadow.camera.top=60,this.sun.shadow.camera.bottom=-60,this.sun.shadow.bias=-6e-4,this.sun.shadow.normalBias=.045,this.scene.add(this.sun),this.sun.target.position.set(0,0,0),this.scene.add(this.sun.target),this.ambient=new m0("#4a5468",.45),this.scene.add(this.ambient),this.sky=new lg(this.scene),this.weather=new Hg(this.scene);const t=new Ce,e=1400,i=new Float32Array(e*3);for(let n=0;n<e;n++){const s=Math.random()*Math.PI*2,o=Math.acos(Math.random()*1.4-.4),r=320;i[n*3]=Math.sin(o)*Math.cos(s)*r,i[n*3+1]=Math.abs(Math.cos(o))*r*.85+30,i[n*3+2]=Math.sin(o)*Math.sin(s)*r}t.setAttribute("position",new ke(i,3)),this.stars=new kr(t,new Ia({color:"#dfe8ff",size:1.7,transparent:!0,opacity:0,fog:!1,depthWrite:!1})),this.stars.frustumCulled=!1,this.scene.add(this.stars),this.cameraRig=new Sg(this.camera),this.cameraRig.yaw=0}_ensureCompanion(){if(this.companion&&this.companion.group&&this.companion.group.parent)return this.companion._placeNearPlayer(!0),this.companion;if(this.companion)try{this.scene.remove(this.companion.group)}catch{}return this.companion=new mg(this),this.scene.add(this.companion.group),this.companion}_initGame(){this.dayNight=new w0(8.5),this.audio=new Ng,this.voice=new Bg(this),this.fx=new bg(this.scene),this.player=new bo(this),this.player.group.rotation.y=this.player.yaw,this.scene.add(this.player.group),this._ensureCompanion(),this.world=new rg(this),this.enemies=new wg(this),this.quests=new To(this),this.ui=new Ug(this,document.getElementById("ui")),this.dialogue=new Ao(this);for(const[t,e]of Object.entries(Gi))this.npcs.push(new gg(this,t,e));this.npcs.forEach(t=>{t.id==="duch"&&t.setVisible(!1)}),this.ui.showTitle(),this.ui.hud.style.display="none",this.dayNight.apply(),this._updateLighting(),this.input=new v0(this.canvas)}_bindInput(){this.input.on((t,e)=>{t==="keydown"&&this._onKeyDown(e),t==="mousedown"&&e===0&&this.state==="playing"&&this.player.attack(),t==="lockchange"&&!e&&this.state==="playing"&&this.ui.anyPanelOpen()})}_onKeyDown(t){if(this.state==="title"){t==="Enter"&&(this.audio.unlock(),localStorage.getItem(Ro)?this.loadGame():this.startNew());return}if(t==="Escape"){if(this.ui.dialogueOpen){this.dialogue.close();return}if(this.ui.infoOpen){this.ui.hideInfo(),this.state==="playing"&&this.pauseGame();return}if(this.ui.anyPanelOpen()){this.ui.closePanels();return}this.state==="playing"?this.pauseGame():this.state==="ui"&&!this.ui.anyScreenOpen()?this.resumeFromUi():this.state==="ui"&&!this.ui.pauseScreen.classList.contains("hidden")&&this.resumeFromUi();return}if(this.state==="playing")switch(t){case"KeyI":case"Tab":this.ui.openHero("inventory");break;case"KeyC":this.ui.openHero("character");break;case"KeyK":this.ui.openHero("quests");break;case"KeyM":this.ui.openMap();break;case"KeyV":this.toggleVoice();break;case"KeyF":this.interact();break;case"KeyQ":this.player.castSpell(0);break;case"KeyE":this.player.castSpell(1);break;case"KeyR":this.player.castSpell(2);break;case"Space":this.player.dodge();break;case"Digit1":this.useQuickSlot(0);break;case"Digit2":this.useQuickSlot(1);break}}_bindResize(){window.addEventListener("resize",()=>{this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)})}startNew(){this.audio.unlock(),this.scene.remove(this.player.group),this.player=new bo(this),this.player.yaw=Math.PI,this.scene.add(this.player.group),this._ensureCompanion(),this.quests=new To(this),this.dialogue=new Ao(this),this.enemies.reset(),this.fx.clear(),this.kills=0;const t=this.player.inventory;t.gold=25,t.add("rusty_sword",1),t.equip("rusty_sword"),t.add("leather_vest",1),t.equip("leather_vest"),t.add("health_potion",3),t.add("bread",2),this.player.recalc(),this.player.hp=this.player.maxHP,this.player.mana=this.player.maxMana,this.player.stamina=this.player.maxStamina,this.player.pos.set(2,j(2,342),342),this.player.yaw=Math.PI,this.player.syncModel(),this.dayNight.setHour(8.5),this.cameraRig.yaw=0,this.cameraRig.pitch=.2,this.cameraRig.initialized=!1,this.npcs.forEach(e=>e.setVisible(e.id!=="duch")),this.world.interactables.forEach(e=>{if(e.kind==="chest"&&(e.data.looted=!1,e.mesh)){e.mesh.visible=!0;const i=e.mesh.userData?.lid;i&&(i.rotation.z=Math.PI/2,i.rotation.y=Math.PI/2,i.position.y=.55),e.mesh.userData?.glow&&(e.mesh.userData.glow.visible=!0)}e.available=!0}),this.state="playing",this.ui.hideTitle(),this.ui.hud.style.display="",this.ui.hideDeath(),this.ui.refreshHud(),this.ui.showLocation("Wilcza Dolina","Wioska pod Mgłą"),this.ui.log("Kael budzi się przy bramie Wilczej Doliny. Stary Eryn czeka przy ognisku.","gold"),this.ui.toast("Wilcza Dolina","Idź do ogniska i porozmawiaj z Eryn"),this.input.enabled=!0,this.saveGame(),this.lastRegion="village"}pauseGame(){this.state==="playing"&&(this.state="ui",this.ui.showPause(),this.input.exitLock())}openUI(){this.state==="playing"&&(this.state="ui",this.input.exitLock())}resumeFromUi(){this.ui.anyPanelOpen()||this.ui.dialogueOpen||this.ui.deathScreen.classList.contains("hidden")&&this.ui.victoryScreen.classList.contains("hidden")&&(this.ui.hidePause(),this.state="playing",this.input.enabled=!0,this.clock.getDelta())}returnToTitle(){this.saveGame(),this.state="title",this.ui.hidePause(),this.ui.hideDeath(),this.ui.hideVictory(),this.ui.closePanels(),this.ui.hideDialogue(),this.ui.hud.style.display="none",this.ui.showTitle(),this.input.exitLock()}start(){this.running=!0,this.clock.start();const t=()=>{requestAnimationFrame(t),this.tick()};t()}tick(){const t=Math.min(.05,this.clock.getDelta());this.time+=t,this.state==="playing"?this.updateGame(t):this.state==="dead"?(this.player.update(t,null),this.fx.update(t),this.enemies.list.forEach(e=>e.update(t)),this._updateCamera(t)):this.state==="title"?this._titleCamera(t):this.state==="ui"||this.state,this.state!=="title"&&this.ui.update(t),this.renderer.render(this.scene,this.camera)}updateGame(t){const e=this.input.consumeMouse();if(e.x!==0||e.y!==0){const i=this.input.locked?.0022:.0042;this.cameraRig.look(e.x,e.y,i)}this.dayNight.update(t),this._updateLighting(),this.player.update(t,this.input),this.companion?.update(t),this.enemies.update(t),this.world.update(t,this.time,this.player.pos),this.fx.update(t);for(const i of this.npcs)i.update(t,this.player);this.npcs.forEach(i=>{if(i.id==="duch"){const n=this.quests.questDone("barrow")||this.quests.active==="forge"||this.quests.active==="boss";i.setVisible(n&&re(this.player.pos.x,this.player.pos.z,i.pos.x,i.pos.z)<40)}}),this._updateCamera(t),this._updateInteractions(),this._updateRegion(),this.weather?.update(t,this.camera),this._updateAudio(t),this.player.hp<=0&&this.state,this.autosaveTimer+=t,this.autosaveTimer>50&&(this.autosaveTimer=0,this.saveGame())}toggleVoice(){const t=this.voice?.toggle?.();if(t===void 0)return;const e=t?`Głosy włączone — ${this.voice.status()}`:"Głosy wyłączone. Klawisz V włącza je ponownie.";this.ui?.log(e,"info")}_updateAudio(t){const e=this.audio;if(!e||!e.ctx)return;const i=this.player.pos;e.setListener(i.x,i.z,this.player.yaw);const n=Math.hypot(i.x,i.z),s=Xt((n-($l-620))/620,0,1),o=Is(i.x,i.z),r=Xt((j(i.x,i.z)-45)/170,0,1);let c=0,l=null;for(const h of this.world.interactables){if(h.kind!=="rest")continue;const d=re(i.x,i.z,h.pos.x,h.pos.z);d<18&&(c=Math.max(c,1-d/18),l=h.pos)}e._firePos=l,e.update(t,{night:this.dayNight.nightF??(this.dayNight.isNight?1:0),sea:s,forest:o,fire:c,wind:.35+r*.65,rain:this.weather?.rain??0})}_updateCamera(t){const e=Math.hypot(this.player.vel.x,this.player.vel.z);this.cameraRig.colliders=this.world?.colliders??null,this.cameraRig.update(t,this.player.pos,e),this.player&&!this.player.dead&&(this.player.model.visible=this.cameraRig.currentDistance>1.75)}_titleCamera(t){this.titleAngle+=t*.045;const e=46,i=Math.cos(this.titleAngle)*e,n=350+Math.sin(this.titleAngle)*e;this.camera.position.set(i,j(i,n)+9.5,n),this.camera.lookAt(0,j(0,350)+3.4,350),this.dayNight.update(t),this._updateLighting(),this.fx.update(t),this.world.update(t,this.time,this.camera.position),this.ui.setClock(this.dayNight.clockString,this.dayNight.isNight)}_updateLighting(){const t=this.dayNight,e=this.player?.pos??new z,i=t.sunDir.clone();i.y<.16&&(i.y=.16+Math.abs(i.y)*.45),i.normalize(),this.sun.position.set(e.x+i.x*70,e.y+Math.max(16,i.y*80),e.z+i.z*70),this.sun.target.position.set(e.x,e.y,e.z),this.sun.target.updateMatrixWorld(),this.sun.color.copy(t.sunColor),this.sun.intensity=t.sunIntensity,this.hemi.color.copy(t.ambientColor),this.hemi.groundColor.set(t.nightF>.5?"#161c24":"#3a3428"),this.hemi.intensity=t.ambientIntensity,this.ambient.intensity=.18+t.ambientIntensity*.3;const n=hg(t);this.sky.update(n.top,n.horizon),this.scene.fog&&(this.scene.fog.color.set(n.horizon).lerp(t.fogColor,.45),this.scene.fog.near=t.nightF>.6?45:140,this.scene.fog.far=(t.nightF>.6?320:1150)*(this.weather?.fogScale??1)),this.stars.material.opacity=Xt(t.nightF*1.05,0,.95),this.player?.lantern&&(this.player.lantern.intensity=3.6*Xt(t.nightF*1.2,0,1)),this.stars.position.set(e.x,0,e.z),this.ui?.setClock(t.clockString,t.isNight)}_updateInteractions(){if(this.ui.dialogueOpen||this.ui.anyPanelOpen()){this.ui.setInteract(null);return}const t=this._nearestNpc();if(t){this.pendingInteract={type:"npc",npc:t},this.ui.setInteract(`Rozmawiaj: ${t.name}`);return}const e=this.world.findNearest(this.player.pos);if(e){this.pendingInteract={type:"node",node:e},this.ui.setInteract(e.label);return}this.pendingInteract=null,this.ui.setInteract(null)}_nearestNpc(){let t=null,e=1/0;for(const i of this.npcs){if(!i.visible)continue;const n=re(i.pos.x,i.pos.z,this.player.pos.x,this.player.pos.z);n<(i.radius??4)&&n<e&&(t=i,e=n)}return t}_updateRegion(){const t=this.player.pos,e=[{id:"village",...tt.village,r:58},{id:"trading",...tt.trading,r:36},{id:"forge",...tt.forge,r:26},{id:"bandits",...tt.bandits,r:26},{id:"barrow",...tt.barrow,r:30},{id:"ruins",...tt.ruins,r:36},{id:"quarry",...tt.quarry,r:24},{id:"lake",...tt.lake,r:90},{id:"castle",...tt.castle,r:40},{id:"hermit",...tt.hermit,r:26},{id:"swamp",...tt.swamp,r:90},{id:"pass",...tt.pass,r:40},{id:"circle",...tt.circle,r:24},{id:"mine",...tt.mine,r:22},{id:"crossroads",...tt.crossroads,r:18}];let i=null;for(const s of e)if(re(t.x,t.z,s.x,s.z)<s.r){i=s;break}const n=i?.id??"wild";if(n!==this.lastRegion)if(this.lastRegion=n,i)this.ui.showLocation(i.name,i.sub);else{const s=this.player.pos.y;this.ui.showLocation(s>120?"Górskie granie":"Dzicz","Wilcza Dolina i okolice")}}interact(){if(this.state!=="playing")return;const t=this._nearestNpc();if(t){this.dialogue.start(t.id),this.pendingInteract=null;return}const e=this.world.findNearest(this.player.pos);e&&this._useNode(e)}_useNode(t){const e=this.player,i=e.inventory;if(t.kind==="station"){this.ui.openCrafting(t.data.station);return}if(t.kind==="sign"){this.ui.openMap();return}if(t.kind==="rest"){this.restAtCampfire();return}if(t.kind==="shrine"){const n=t.data.cost??20;if(i.gold<n){this.ui.log(`Kapliczka milczy. Potrzebujesz ${n} złota.`,"warn");return}i.gold-=n,e.hp=e.maxHP,e.mana=e.maxMana,e.gainXp(40),this.fx.magicBurst(new z(t.pos.x,t.pos.y+1.6,t.pos.z),"#7fe8d0"),this.ui.log("Kapliczka przyjmuje ofiarę. Światło wypełnia twoje ciało. (+40 PD)","good"),this.audio.quest(),this.ui.refreshHud();return}if(t.kind==="resource"){if(this.world.harvest(t)){const n=t.data.item;i.add(n,t.data.qty??1),this.ui.log(`Zebrano: ${Ae[n]?.name??n} ×${t.data.qty??1}`,"good"),this.audio.coin(),this.fx.burst(new z(t.pos.x,t.pos.y+.5,t.pos.z),{color:"#cfe08a",count:8,speed:1.6,up:2,life:.6}),this.quests.evaluate(!0),this.ui.refreshHud(),this.ui.anyPanelOpen()&&this.ui.renderInventory?.()}return}if(t.kind==="chest")if(t.data.looted)this.ui.log("Skrzynia jest pusta.","warn");else{t.data.looted=!0;const n=[];for(const[s,o]of t.data.loot??[])s==="gold"?(i.gold+=o,n.push(`${o} złota`)):(i.add(s,o),n.push(`${Ae[s]?.name??s}${o>1?` ×${o}`:""}`));if(this.ui.toast("Skrzynia otwarta",n.join(" · ")),this.ui.log(`Skrzynia: ${n.join(", ")}`,"gold"),this.audio.coin(),this.fx.burst(new z(t.pos.x,t.pos.y+.8,t.pos.z),{color:"#ffd27a",count:18,speed:2.6,up:3,life:.8}),this.quests.evaluate(!0),this.ui.refreshHud(),t.mesh){const s=t.mesh.userData?.lid;s&&(s.rotation.z=Math.PI/2-1.15,s.position.y=.78),t.mesh.userData?.glow&&(t.mesh.userData.glow.visible=!1)}}}restAtCampfire(){const t=this.player;this.dayNight.skipTo(6.6),t.hp=t.maxHP,t.mana=t.maxMana,t.stamina=t.maxStamina,t.recalc(),this.world.nodes.forEach(e=>{e.kind==="resource"&&!e.data?.once&&(e.available=!0,e.timer=0,e.mesh&&(e.mesh.visible=!0))}),this.enemies.reset(),t.invuln=2,this.ui.log("Odpoczywałeś przy ognisku do świtu. Rany się zagoiły.","good"),this.ui.toast("Świt","Odpoczynek przywrócił siły"),this.ui.refreshHud(),this.fx.heal(t.pos,"#ffcf7a"),this.saveGame()}damageEnemiesInRadius(t,e,i,n="Zaklęcie"){let s=0;for(const o of this.enemies.list){if(!o.active||o.dead)continue;const r=re(o.pos.x,o.pos.z,t.x,t.z);if(r>e+o.radius)continue;const c=1-Xt(r/(e*1.4),0,.55);o.takeDamage(i*c,{magic:!0,knockback:2.5}),s+=1}return s}combatAlert(t){for(const e of this.enemies.list)e===t||e.dead||!e.active||e.aggro||e.type===t.type&&re(e.pos.x,e.pos.z,t.pos.x,t.pos.z)<13&&(e.aggro=!0,e.state="chase")}onEnemyAggro(t){t.boss?(this.ui.log("„Kaldras: Kolejny z rodu Kaelów. Jak twój ojciec.”","bad"),this.game?.audio?.growl?.(),this.audio.growl()):t.def.model==="wolf"&&this.audio.growl()}onNightCreatureFade(t){this.ui.log("Wieszczka rozpływa się wraz ze świtem.","warn")}onEnemyKilled(t){this.kills+=1,this.player.totalKills+=1;const e=this.player,i=e.inventory,n=t.def.xp??20,s=1+Math.max(0,t.level-t.def.level)*.12;e.gainXp(Math.round(n*s));const[o,r]=t.def.gold??[0,0],c=Math.round(o+Math.random()*(r-o));c>0&&(i.gold+=c,this.ui.log(`+${c} złota`,"gold"));const l=[];for(const h of t.def.loot??[])Math.random()<=h.chance&&(i.add(h.id,1),l.push(Ae[h.id]?.name??h.id));l.length&&this.ui.log(`Łup: ${l.join(", ")}`,"good"),this.quests.onKill(t.type),this.quests.active==="boss"&&this.quests.canComplete("boss")&&setTimeout(()=>{this.quests.active==="boss"&&this.quests.complete("boss")},1400),t.boss?(this.bossDefeated=!0,this.ui.toast("Kaldras pokonany","Mgliste Wrota zamknięte"),this.audio.victory(),this.cameraRig.addShake(1.2),this.fx.magicBurst(t.pos.clone().add(new z(0,2,0)),"#ffd27a")):t.elite&&(this.ui.toast(`${t.name} pokonany`,""),this.audio.questComplete()),this.ui.refreshHud()}onLevelUp(t){this.audio.levelUp(),this.ui.toast(`Poziom ${t}`,"+3 punkty atrybutów — naciśnij C"),this.ui.log(`Awans na poziom ${t}! Otrzymujesz 3 punkty atrybutów.`,"gold"),this.fx.magicBurst(this.player.pos.clone().add(new z(0,1,0)),"#ffe3a8"),this.ui.refreshHud()}onQuestCompleted(t){this.saveGame(),t==="boss"&&setTimeout(()=>{(this.state==="playing"||this.state==="ui")&&(this.state="victory",this.input.exitLock(),this.ui.showVictory({level:this.player.level,xp:Math.round(this.player.xp),gold:Math.floor(this.player.inventory.gold),kills:this.kills,quests:this.quests.completed.size}))},1800)}onPlayerDeath(){if(this.state!=="playing")return;this.state="dead";const t=Math.floor(this.player.inventory.gold*.1);this.player.inventory.gold-=t,this.ui.log("Mgła cię zabrała. Budzisz się w wiosce.","bad"),this.ui.showDeath(t),this.audio.death(),this.input.exitLock(),this.cameraRig.addShake(.6)}respawnPlayer(){this.player.respawn(),this.ui.hideDeath(),this.state="playing",this.ui.refreshHud(),this.ui.log("Wracasz do Wilczej Doliny. Blizny zostaną.","warn");for(const t of this.enemies.list)t.aggro=!1;this.enemies.projectiles.length=0}buyItem(t,e){const i=Ae[e];if(!i)return;const n=Math.round(i.value*1.5),s=this.player.inventory;if(s.gold<n){this.ui.log("Za mało złota.","warn");return}if(!s.add(e,1)){this.ui.log("Torba jest pełna.","warn");return}s.gold-=n,this.audio.coin(),this.ui.log(`Kupiono: ${i.name} (-${n} złota)`,"good"),this.ui.refreshHud()}sellItem(t){const e=Ae[t],i=this.player.inventory;if(!e||!i.has(t))return;if(i.isEquipped(t)){this.ui.log("Najpierw zdejmij ten przedmiot.","warn");return}const n=Math.max(1,Math.round(e.value*.45));i.remove(t,1),i.gold+=n,this.audio.coin(),this.ui.log(`Sprzedano: ${e.name} (+${n} złota)`,"good"),this.ui.refreshHud()}craftItem(t,e="village"){const i=th.find(o=>o.id===t);if(!i)return;const n=this.player.inventory,s=e==="ancient"||e==="ancient_forge";if(i.legendary&&!s){this.ui.log("Klingę Świtu można wykować tylko w Starożytnej Kuźni na Kowalskiej Górze.","warn");return}for(const[o,r]of Object.entries(i.mats))if(!n.has(o,r)){this.ui.log(`Brakuje: ${Ae[o]?.name??o}.`,"warn");return}if(n.gold<i.cost){this.ui.log("Za mało złota na pracę kowala.","warn");return}for(const[o,r]of Object.entries(i.mats))n.remove(o,r);n.gold-=i.cost,n.add(i.out.id,i.out.qty),this.audio.questComplete(),this.ui.toast("Wykuto",`${Ae[i.out.id].name}${i.out.qty>1?` ×${i.out.qty}`:""}`),this.ui.log(`Wykowano: ${i.out.id?Ae[i.out.id].name:i.name}`,"gold"),this.fx.magicBurst(this.player.pos.clone().add(new z(0,1,0)),i.legendary?"#ffd27a":"#ff9a45"),this.quests.evaluate(!0),this.ui.refreshHud(),this.saveGame()}useQuickSlot(t){const i=this.player.inventory.consumables()[t];if(!i){this.ui.log("Brak mikstur w tym slocie.","warn");return}this.player.useItem(i.id)&&this.ui.refreshHud()}questTargetPos(){const t=this.quests,e=t.activeQuest;if(!e)return t.availableQuest()?new z(Gi.eryn.pos[0],0,Gi.eryn.pos[1]):null;if(t.canComplete()){const n=Gi[e.giver]??Gi.eryn;return new z(n.pos[0],0,n.pos[1])}const i=e.objectives.find(n=>!t.objectiveState(n).done);if(!i)return null;if(i.type==="talk"){const n=Gi[i.npc];return n?new z(n.pos[0],0,n.pos[1]):null}if(i.type==="kill"){let n=null,s=1/0;for(const c of this.enemies.list){if(c.dead||!c.active||c.type!==i.enemy)continue;const l=re(c.pos.x,c.pos.z,this.player.pos.x,this.player.pos.z);l<s&&(s=l,n=c)}if(n)return new z(n.pos.x,0,n.pos.z);const r={wolf:tt.village,bandit:tt.bandits,bandit_leader:tt.bandits,skeleton:tt.barrow,wraith:tt.barrow,kaldras:tt.ruins,wolf_alpha:tt.village,bog_lurker:tt.swamp,stone_golem:tt.circle,mine_guard:tt.mine,castle_wraith:tt.castle,wolf_rider:tt.pass}[i.enemy];return r?new z(r.x,0,r.z):null}if(i.type==="collect"){const s={stolen_grain:tt.bandits,shard_dawn:tt.barrow,ancient_metal:tt.quarry}[i.item]??tt.village;return new z(s.x,0,s.z)}if(i.type==="own"){this.player.pos;const n={x:-8.6,z:21.6};return new z(n.x,0,n.z)}return null}saveGame(t=!1){if(!(!this.player||this.state==="title")&&!(this.player.dead&&!t))try{const e={version:1,savedAt:Date.now(),player:this.player.serialize(),quests:this.quests.serialize(),hour:this.dayNight.hour,day:this.dayNight.day,kills:this.kills};localStorage.setItem(Ro,JSON.stringify(e)),t&&(this.ui.toast("Zapisano","Postęp bezpieczny"),this.ui.log("Gra zapisana.","good"))}catch(e){console.warn("Nie udało się zapisać gry",e)}}loadGame(){const t=localStorage.getItem(Ro)??localStorage.getItem(Gg);if(!t){this.startNew();return}let e;try{e=JSON.parse(t)}catch{this.startNew();return}this.audio.unlock(),this.scene.remove(this.player.group),this.player=new bo(this),this.scene.add(this.player.group),this._ensureCompanion(),this.player.load(e.player),this.player.hp<=0&&(this.player.hp=Math.max(1,Math.round(this.player.maxHP*.5))),this.quests=new To(this),this.quests.load(e.quests),this.dialogue=new Ao(this),this.enemies.reset(),this.fx.clear(),this.kills=e.kills??0,this.dayNight.setHour(e.hour??8.5),this.dayNight.day=e.day??1,this.cameraRig.initialized=!1,this.cameraRig.yaw=this.player.yaw-Math.PI,this.state="playing",this.ui.hideTitle(),this.ui.hud.style.display="",this.ui.hideDeath(),this.ui.refreshHud(),this.ui.log("Wracasz do Wilczej Doliny.","gold"),this.ui.toast("Kontynuacja","Witaj z powrotem, Kaelu"),this.input.enabled=!0,this._updateLighting()}}const zs=document.getElementById("loading"),Wg=document.getElementById("scene");function eh(a){console.error(a),zs&&(zs.innerHTML=`
    <div class="loading-inner">
      <div class="loading-sigil" style="color:#c1443a">⚠</div>
      <h1>Coś poszło nie tak</h1>
      <p class="loading-sub">${String(a?.message??a)}</p>
      <p style="color:#8a8478;font-size:12px;line-height:1.7">
        Gra potrzebuje przeglądarki z obsługą WebGL 2.<br/>
        Spróbuj odświeżyć stronę lub włączyć akcelerację sprzętową.
      </p>
    </div>`,zs.classList.remove("hidden"))}async function qg(){await new Promise(e=>requestAnimationFrame(()=>setTimeout(e,70)));const a=document.querySelector(".loading-sub");a&&(a.textContent="Budzenie Wilczej Doliny…");let t;try{t=new Vg(Wg)}catch(e){eh(e);return}window.__game=t,a&&(a.textContent="Rysowanie mapy okolic…"),await new Promise(e=>setTimeout(e,30));try{t.ui._ensureMap()}catch(e){console.warn("Mapa nie została wygenerowana",e)}t.start(),setTimeout(()=>{zs.classList.add("hidden"),setTimeout(()=>zs.remove(),900)},420),window.addEventListener("beforeunload",()=>{t.state!=="title"&&t.saveGame()}),document.addEventListener("visibilitychange",()=>{document.hidden&&t.state==="playing"&&t.pauseGame()})}window.addEventListener("error",a=>{window.__game||eh(a.error??a.message)});qg();
