(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=e(n);fetch(n.href,s)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const dr="169",ql=0,Fr=1,Xl=2,tl=1,el=2,Li=3,Oi=0,Xe=1,Se=2,tn=0,Xn=1,wo=2,Or=3,Br=4,$l=5,gn=100,Kl=101,Yl=102,Zl=103,Jl=104,Ql=200,th=201,eh=202,ih=203,bo=204,So=205,nh=206,sh=207,ah=208,oh=209,rh=210,ch=211,lh=212,hh=213,dh=214,Eo=0,To=1,Ao=2,Yn=3,Co=4,Ro=5,zo=6,Po=7,ur=0,uh=1,fh=2,en=0,ph=1,mh=2,gh=3,il=4,vh=5,_h=6,xh=7,nl=300,Zn=301,Jn=302,ga=303,ko=304,ba=306,Es=1e3,_n=1001,Io=1002,qe=1003,yh=1004,Ls=1005,ii=1006,Ia=1007,xn=1008,Bi=1009,sl=1010,al=1011,Ts=1012,fr=1013,yn=1014,Si=1015,Cs=1016,pr=1017,mr=1018,Qn=1020,ol=35902,rl=1021,cl=1022,yi=1023,ll=1024,hl=1025,$n=1026,ts=1027,gr=1028,vr=1029,dl=1030,_r=1031,xr=1033,la=33776,ha=33777,da=33778,ua=33779,Lo=35840,Do=35841,Uo=35842,No=35843,Fo=36196,Oo=37492,Bo=37496,Ho=37808,Go=37809,Vo=37810,Wo=37811,jo=37812,qo=37813,Xo=37814,$o=37815,Ko=37816,Yo=37817,Zo=37818,Jo=37819,Qo=37820,tr=37821,fa=36492,er=36494,ir=36495,ul=36283,nr=36284,sr=36285,ar=36286,Mh=3200,wh=3201,yr=0,bh=1,Qi="",ti="srgb",an="srgb-linear",Mr="display-p3",Sa="display-p3-linear",va="linear",ve="srgb",_a="rec709",xa="p3",En=7680,Hr=519,Sh=512,Eh=513,Th=514,fl=515,Ah=516,Ch=517,Rh=518,zh=519,Gr=35044,Vr="300 es",Ui=2e3,ya=2001;class is{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const n=this._listeners[t];if(n!==void 0){const s=n.indexOf(e);s!==-1&&n.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const n=i.slice(0);for(let s=0,o=n.length;s<o;s++)n[s].call(this,t);t.target=null}}}const Ne=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],La=Math.PI/180,or=180/Math.PI;function Rs(){const a=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ne[a&255]+Ne[a>>8&255]+Ne[a>>16&255]+Ne[a>>24&255]+"-"+Ne[t&255]+Ne[t>>8&255]+"-"+Ne[t>>16&15|64]+Ne[t>>24&255]+"-"+Ne[e&63|128]+Ne[e>>8&255]+"-"+Ne[e>>16&255]+Ne[e>>24&255]+Ne[i&255]+Ne[i>>8&255]+Ne[i>>16&255]+Ne[i>>24&255]).toLowerCase()}function je(a,t,e){return Math.max(t,Math.min(e,a))}function Ph(a,t){return(a%t+t)%t}function Da(a,t,e){return(1-e)*a+e*t}function rs(a,t){switch(t.constructor){case Float32Array:return a;case Uint32Array:return a/4294967295;case Uint16Array:return a/65535;case Uint8Array:return a/255;case Int32Array:return Math.max(a/2147483647,-1);case Int16Array:return Math.max(a/32767,-1);case Int8Array:return Math.max(a/127,-1);default:throw new Error("Invalid component type.")}}function Ve(a,t){switch(t.constructor){case Float32Array:return a;case Uint32Array:return Math.round(a*4294967295);case Uint16Array:return Math.round(a*65535);case Uint8Array:return Math.round(a*255);case Int32Array:return Math.round(a*2147483647);case Int16Array:return Math.round(a*32767);case Int8Array:return Math.round(a*127);default:throw new Error("Invalid component type.")}}class Vt{constructor(t=0,e=0){Vt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,n=t.elements;return this.x=n[0]*e+n[3]*i+n[6],this.y=n[1]*e+n[4]*i+n[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(je(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),n=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*i-o*n+t.x,this.y=s*n+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Gt{constructor(t,e,i,n,s,o,r,c,l){Gt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,n,s,o,r,c,l)}set(t,e,i,n,s,o,r,c,l){const h=this.elements;return h[0]=t,h[1]=n,h[2]=r,h[3]=e,h[4]=s,h[5]=c,h[6]=i,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,n=e.elements,s=this.elements,o=i[0],r=i[3],c=i[6],l=i[1],h=i[4],d=i[7],u=i[2],f=i[5],g=i[8],v=n[0],p=n[3],m=n[6],x=n[1],y=n[4],b=n[7],z=n[2],T=n[5],E=n[8];return s[0]=o*v+r*x+c*z,s[3]=o*p+r*y+c*T,s[6]=o*m+r*b+c*E,s[1]=l*v+h*x+d*z,s[4]=l*p+h*y+d*T,s[7]=l*m+h*b+d*E,s[2]=u*v+f*x+g*z,s[5]=u*p+f*y+g*T,s[8]=u*m+f*b+g*E,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],n=t[2],s=t[3],o=t[4],r=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*r*l-i*s*h+i*r*c+n*s*l-n*o*c}invert(){const t=this.elements,e=t[0],i=t[1],n=t[2],s=t[3],o=t[4],r=t[5],c=t[6],l=t[7],h=t[8],d=h*o-r*l,u=r*c-h*s,f=l*s-o*c,g=e*d+i*u+n*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return t[0]=d*v,t[1]=(n*l-h*i)*v,t[2]=(r*i-n*o)*v,t[3]=u*v,t[4]=(h*e-n*c)*v,t[5]=(n*s-r*e)*v,t[6]=f*v,t[7]=(i*c-l*e)*v,t[8]=(o*e-i*s)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,n,s,o,r){const c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*o+l*r)+o+t,-n*l,n*c,-n*(-l*o+c*r)+r+e,0,0,1),this}scale(t,e){return this.premultiply(Ua.makeScale(t,e)),this}rotate(t){return this.premultiply(Ua.makeRotation(-t)),this}translate(t,e){return this.premultiply(Ua.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let n=0;n<9;n++)if(e[n]!==i[n])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Ua=new Gt;function pl(a){for(let t=a.length-1;t>=0;--t)if(a[t]>=65535)return!0;return!1}function Ma(a){return document.createElementNS("http://www.w3.org/1999/xhtml",a)}function kh(){const a=Ma("canvas");return a.style.display="block",a}const Wr={};function pa(a){a in Wr||(Wr[a]=!0,console.warn(a))}function Ih(a,t,e){return new Promise(function(i,n){function s(){switch(a.clientWaitSync(t,a.SYNC_FLUSH_COMMANDS_BIT,0)){case a.WAIT_FAILED:n();break;case a.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:i()}}setTimeout(s,e)})}function Lh(a){const t=a.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Dh(a){const t=a.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const jr=new Gt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),qr=new Gt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),cs={[an]:{transfer:va,primaries:_a,luminanceCoefficients:[.2126,.7152,.0722],toReference:a=>a,fromReference:a=>a},[ti]:{transfer:ve,primaries:_a,luminanceCoefficients:[.2126,.7152,.0722],toReference:a=>a.convertSRGBToLinear(),fromReference:a=>a.convertLinearToSRGB()},[Sa]:{transfer:va,primaries:xa,luminanceCoefficients:[.2289,.6917,.0793],toReference:a=>a.applyMatrix3(qr),fromReference:a=>a.applyMatrix3(jr)},[Mr]:{transfer:ve,primaries:xa,luminanceCoefficients:[.2289,.6917,.0793],toReference:a=>a.convertSRGBToLinear().applyMatrix3(qr),fromReference:a=>a.applyMatrix3(jr).convertLinearToSRGB()}},Uh=new Set([an,Sa]),oe={enabled:!0,_workingColorSpace:an,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(a){if(!Uh.has(a))throw new Error(`Unsupported working color space, "${a}".`);this._workingColorSpace=a},convert:function(a,t,e){if(this.enabled===!1||t===e||!t||!e)return a;const i=cs[t].toReference,n=cs[e].fromReference;return n(i(a))},fromWorkingColorSpace:function(a,t){return this.convert(a,this._workingColorSpace,t)},toWorkingColorSpace:function(a,t){return this.convert(a,t,this._workingColorSpace)},getPrimaries:function(a){return cs[a].primaries},getTransfer:function(a){return a===Qi?va:cs[a].transfer},getLuminanceCoefficients:function(a,t=this._workingColorSpace){return a.fromArray(cs[t].luminanceCoefficients)}};function Kn(a){return a<.04045?a*.0773993808:Math.pow(a*.9478672986+.0521327014,2.4)}function Na(a){return a<.0031308?a*12.92:1.055*Math.pow(a,.41666)-.055}let Tn;class Nh{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Tn===void 0&&(Tn=Ma("canvas")),Tn.width=t.width,Tn.height=t.height;const i=Tn.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=Tn}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Ma("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const n=i.getImageData(0,0,t.width,t.height),s=n.data;for(let o=0;o<s.length;o++)s[o]=Kn(s[o]/255)*255;return i.putImageData(n,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Kn(e[i]/255)*255):e[i]=Kn(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Fh=0;class ml{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Fh++}),this.uuid=Rs(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},n=this.data;if(n!==null){let s;if(Array.isArray(n)){s=[];for(let o=0,r=n.length;o<r;o++)n[o].isDataTexture?s.push(Fa(n[o].image)):s.push(Fa(n[o]))}else s=Fa(n);i.url=s}return e||(t.images[this.uuid]=i),i}}function Fa(a){return typeof HTMLImageElement<"u"&&a instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&a instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&a instanceof ImageBitmap?Nh.getDataURL(a):a.data?{data:Array.from(a.data),width:a.width,height:a.height,type:a.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Oh=0;class Oe extends is{constructor(t=Oe.DEFAULT_IMAGE,e=Oe.DEFAULT_MAPPING,i=_n,n=_n,s=ii,o=xn,r=yi,c=Bi,l=Oe.DEFAULT_ANISOTROPY,h=Qi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Oh++}),this.uuid=Rs(),this.name="",this.source=new ml(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=n,this.magFilter=s,this.minFilter=o,this.anisotropy=l,this.format=r,this.internalFormat=null,this.type=c,this.offset=new Vt(0,0),this.repeat=new Vt(1,1),this.center=new Vt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Gt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==nl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Es:t.x=t.x-Math.floor(t.x);break;case _n:t.x=t.x<0?0:1;break;case Io:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Es:t.y=t.y-Math.floor(t.y);break;case _n:t.y=t.y<0?0:1;break;case Io:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Oe.DEFAULT_IMAGE=null;Oe.DEFAULT_MAPPING=nl;Oe.DEFAULT_ANISOTROPY=1;class de{constructor(t=0,e=0,i=0,n=1){de.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=n}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,n){return this.x=t,this.y=e,this.z=i,this.w=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,n=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*n+o[12]*s,this.y=o[1]*e+o[5]*i+o[9]*n+o[13]*s,this.z=o[2]*e+o[6]*i+o[10]*n+o[14]*s,this.w=o[3]*e+o[7]*i+o[11]*n+o[15]*s,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,n,s;const c=t.elements,l=c[0],h=c[4],d=c[8],u=c[1],f=c[5],g=c[9],v=c[2],p=c[6],m=c[10];if(Math.abs(h-u)<.01&&Math.abs(d-v)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+v)<.1&&Math.abs(g+p)<.1&&Math.abs(l+f+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const y=(l+1)/2,b=(f+1)/2,z=(m+1)/2,T=(h+u)/4,E=(d+v)/4,R=(g+p)/4;return y>b&&y>z?y<.01?(i=0,n=.707106781,s=.707106781):(i=Math.sqrt(y),n=T/i,s=E/i):b>z?b<.01?(i=.707106781,n=0,s=.707106781):(n=Math.sqrt(b),i=T/n,s=R/n):z<.01?(i=.707106781,n=.707106781,s=0):(s=Math.sqrt(z),i=E/s,n=R/s),this.set(i,n,s,e),this}let x=Math.sqrt((p-g)*(p-g)+(d-v)*(d-v)+(u-h)*(u-h));return Math.abs(x)<.001&&(x=1),this.x=(p-g)/x,this.y=(d-v)/x,this.z=(u-h)/x,this.w=Math.acos((l+f+m-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Bh extends is{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new de(0,0,t,e),this.scissorTest=!1,this.viewport=new de(0,0,t,e);const n={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ii,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new Oe(n,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let r=0;r<o;r++)this.textures[r]=s.clone(),this.textures[r].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let n=0,s=this.textures.length;n<s;n++)this.textures[n].image.width=t,this.textures[n].image.height=e,this.textures[n].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,n=t.textures.length;i<n;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new ml(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Mn extends Bh{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class gl extends Oe{constructor(t=null,e=1,i=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:n},this.magFilter=qe,this.minFilter=qe,this.wrapR=_n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Hh extends Oe{constructor(t=null,e=1,i=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:n},this.magFilter=qe,this.minFilter=qe,this.wrapR=_n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class zs{constructor(t=0,e=0,i=0,n=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=n}static slerpFlat(t,e,i,n,s,o,r){let c=i[n+0],l=i[n+1],h=i[n+2],d=i[n+3];const u=s[o+0],f=s[o+1],g=s[o+2],v=s[o+3];if(r===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=d;return}if(r===1){t[e+0]=u,t[e+1]=f,t[e+2]=g,t[e+3]=v;return}if(d!==v||c!==u||l!==f||h!==g){let p=1-r;const m=c*u+l*f+h*g+d*v,x=m>=0?1:-1,y=1-m*m;if(y>Number.EPSILON){const z=Math.sqrt(y),T=Math.atan2(z,m*x);p=Math.sin(p*T)/z,r=Math.sin(r*T)/z}const b=r*x;if(c=c*p+u*b,l=l*p+f*b,h=h*p+g*b,d=d*p+v*b,p===1-r){const z=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=z,l*=z,h*=z,d*=z}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,i,n,s,o){const r=i[n],c=i[n+1],l=i[n+2],h=i[n+3],d=s[o],u=s[o+1],f=s[o+2],g=s[o+3];return t[e]=r*g+h*d+c*f-l*u,t[e+1]=c*g+h*u+l*d-r*f,t[e+2]=l*g+h*f+r*u-c*d,t[e+3]=h*g-r*d-c*u-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,n){return this._x=t,this._y=e,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,n=t._y,s=t._z,o=t._order,r=Math.cos,c=Math.sin,l=r(i/2),h=r(n/2),d=r(s/2),u=c(i/2),f=c(n/2),g=c(s/2);switch(o){case"XYZ":this._x=u*h*d+l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d+u*f*g;break;case"YZX":this._x=u*h*d+l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d-u*f*g;break;case"XZY":this._x=u*h*d-l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d+u*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,n=Math.sin(i);return this._x=t.x*n,this._y=t.y*n,this._z=t.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],n=e[4],s=e[8],o=e[1],r=e[5],c=e[9],l=e[2],h=e[6],d=e[10],u=i+r+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-c)*f,this._y=(s-l)*f,this._z=(o-n)*f}else if(i>r&&i>d){const f=2*Math.sqrt(1+i-r-d);this._w=(h-c)/f,this._x=.25*f,this._y=(n+o)/f,this._z=(s+l)/f}else if(r>d){const f=2*Math.sqrt(1+r-i-d);this._w=(s-l)/f,this._x=(n+o)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+d-i-r);this._w=(o-n)/f,this._x=(s+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(je(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const n=Math.min(1,e/i);return this.slerp(t,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,n=t._y,s=t._z,o=t._w,r=e._x,c=e._y,l=e._z,h=e._w;return this._x=i*h+o*r+n*l-s*c,this._y=n*h+o*c+s*r-i*l,this._z=s*h+o*l+i*c-n*r,this._w=o*h-i*r-n*c-s*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,n=this._y,s=this._z,o=this._w;let r=o*t._w+i*t._x+n*t._y+s*t._z;if(r<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,r=-r):this.copy(t),r>=1)return this._w=o,this._x=i,this._y=n,this._z=s,this;const c=1-r*r;if(c<=Number.EPSILON){const f=1-e;return this._w=f*o+e*this._w,this._x=f*i+e*this._x,this._y=f*n+e*this._y,this._z=f*s+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,r),d=Math.sin((1-e)*h)/l,u=Math.sin(e*h)/l;return this._w=o*d+this._w*u,this._x=i*d+this._x*u,this._y=n*d+this._y*u,this._z=s*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),n=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(n*Math.sin(t),n*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class C{constructor(t=0,e=0,i=0){C.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Xr.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Xr.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,n=this.z,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6]*n,this.y=s[1]*e+s[4]*i+s[7]*n,this.z=s[2]*e+s[5]*i+s[8]*n,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,n=this.z,s=t.elements,o=1/(s[3]*e+s[7]*i+s[11]*n+s[15]);return this.x=(s[0]*e+s[4]*i+s[8]*n+s[12])*o,this.y=(s[1]*e+s[5]*i+s[9]*n+s[13])*o,this.z=(s[2]*e+s[6]*i+s[10]*n+s[14])*o,this}applyQuaternion(t){const e=this.x,i=this.y,n=this.z,s=t.x,o=t.y,r=t.z,c=t.w,l=2*(o*n-r*i),h=2*(r*e-s*n),d=2*(s*i-o*e);return this.x=e+c*l+o*d-r*h,this.y=i+c*h+r*l-s*d,this.z=n+c*d+s*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,n=this.z,s=t.elements;return this.x=s[0]*e+s[4]*i+s[8]*n,this.y=s[1]*e+s[5]*i+s[9]*n,this.z=s[2]*e+s[6]*i+s[10]*n,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,n=t.y,s=t.z,o=e.x,r=e.y,c=e.z;return this.x=n*c-s*r,this.y=s*o-i*c,this.z=i*r-n*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Oa.copy(this).projectOnVector(t),this.sub(Oa)}reflect(t){return this.sub(Oa.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(je(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,n=this.z-t.z;return e*e+i*i+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const n=Math.sin(e)*t;return this.x=n*Math.sin(i),this.y=Math.cos(e)*t,this.z=n*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),n=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=n,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Oa=new C,Xr=new zs;class wn{constructor(t=new C(1/0,1/0,1/0),e=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(fi.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(fi.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=fi.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const s=i.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,r=s.count;o<r;o++)t.isMesh===!0?t.getVertexPosition(o,fi):fi.fromBufferAttribute(s,o),fi.applyMatrix4(t.matrixWorld),this.expandByPoint(fi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ds.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ds.copy(i.boundingBox)),Ds.applyMatrix4(t.matrixWorld),this.union(Ds)}const n=t.children;for(let s=0,o=n.length;s<o;s++)this.expandByObject(n[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,fi),fi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ls),Us.subVectors(this.max,ls),An.subVectors(t.a,ls),Cn.subVectors(t.b,ls),Rn.subVectors(t.c,ls),Gi.subVectors(Cn,An),Vi.subVectors(Rn,Cn),rn.subVectors(An,Rn);let e=[0,-Gi.z,Gi.y,0,-Vi.z,Vi.y,0,-rn.z,rn.y,Gi.z,0,-Gi.x,Vi.z,0,-Vi.x,rn.z,0,-rn.x,-Gi.y,Gi.x,0,-Vi.y,Vi.x,0,-rn.y,rn.x,0];return!Ba(e,An,Cn,Rn,Us)||(e=[1,0,0,0,1,0,0,0,1],!Ba(e,An,Cn,Rn,Us))?!1:(Ns.crossVectors(Gi,Vi),e=[Ns.x,Ns.y,Ns.z],Ba(e,An,Cn,Rn,Us))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,fi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(fi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ai[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ai[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ai[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ai[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ai[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ai[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ai[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ai[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ai),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Ai=[new C,new C,new C,new C,new C,new C,new C,new C],fi=new C,Ds=new wn,An=new C,Cn=new C,Rn=new C,Gi=new C,Vi=new C,rn=new C,ls=new C,Us=new C,Ns=new C,cn=new C;function Ba(a,t,e,i,n){for(let s=0,o=a.length-3;s<=o;s+=3){cn.fromArray(a,s);const r=n.x*Math.abs(cn.x)+n.y*Math.abs(cn.y)+n.z*Math.abs(cn.z),c=t.dot(cn),l=e.dot(cn),h=i.dot(cn);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>r)return!1}return!0}const Gh=new wn,hs=new C,Ha=new C;class ns{constructor(t=new C,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):Gh.setFromPoints(t).getCenter(i);let n=0;for(let s=0,o=t.length;s<o;s++)n=Math.max(n,i.distanceToSquared(t[s]));return this.radius=Math.sqrt(n),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;hs.subVectors(t,this.center);const e=hs.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),n=(i-this.radius)*.5;this.center.addScaledVector(hs,n/i),this.radius+=n}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ha.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(hs.copy(t.center).add(Ha)),this.expandByPoint(hs.copy(t.center).sub(Ha))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Ci=new C,Ga=new C,Fs=new C,Wi=new C,Va=new C,Os=new C,Wa=new C;class vl{constructor(t=new C,e=new C(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Ci)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Ci.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Ci.copy(this.origin).addScaledVector(this.direction,e),Ci.distanceToSquared(t))}distanceSqToSegment(t,e,i,n){Ga.copy(t).add(e).multiplyScalar(.5),Fs.copy(e).sub(t).normalize(),Wi.copy(this.origin).sub(Ga);const s=t.distanceTo(e)*.5,o=-this.direction.dot(Fs),r=Wi.dot(this.direction),c=-Wi.dot(Fs),l=Wi.lengthSq(),h=Math.abs(1-o*o);let d,u,f,g;if(h>0)if(d=o*c-r,u=o*r-c,g=s*h,d>=0)if(u>=-g)if(u<=g){const v=1/h;d*=v,u*=v,f=d*(d+o*u+2*r)+u*(o*d+u+2*c)+l}else u=s,d=Math.max(0,-(o*u+r)),f=-d*d+u*(u+2*c)+l;else u=-s,d=Math.max(0,-(o*u+r)),f=-d*d+u*(u+2*c)+l;else u<=-g?(d=Math.max(0,-(-o*s+r)),u=d>0?-s:Math.min(Math.max(-s,-c),s),f=-d*d+u*(u+2*c)+l):u<=g?(d=0,u=Math.min(Math.max(-s,-c),s),f=u*(u+2*c)+l):(d=Math.max(0,-(o*s+r)),u=d>0?s:Math.min(Math.max(-s,-c),s),f=-d*d+u*(u+2*c)+l);else u=o>0?-s:s,d=Math.max(0,-(o*u+r)),f=-d*d+u*(u+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,d),n&&n.copy(Ga).addScaledVector(Fs,u),f}intersectSphere(t,e){Ci.subVectors(t.center,this.origin);const i=Ci.dot(this.direction),n=Ci.dot(Ci)-i*i,s=t.radius*t.radius;if(n>s)return null;const o=Math.sqrt(s-n),r=i-o,c=i+o;return c<0?null:r<0?this.at(c,e):this.at(r,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,n,s,o,r,c;const l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return l>=0?(i=(t.min.x-u.x)*l,n=(t.max.x-u.x)*l):(i=(t.max.x-u.x)*l,n=(t.min.x-u.x)*l),h>=0?(s=(t.min.y-u.y)*h,o=(t.max.y-u.y)*h):(s=(t.max.y-u.y)*h,o=(t.min.y-u.y)*h),i>o||s>n||((s>i||isNaN(i))&&(i=s),(o<n||isNaN(n))&&(n=o),d>=0?(r=(t.min.z-u.z)*d,c=(t.max.z-u.z)*d):(r=(t.max.z-u.z)*d,c=(t.min.z-u.z)*d),i>c||r>n)||((r>i||i!==i)&&(i=r),(c<n||n!==n)&&(n=c),n<0)?null:this.at(i>=0?i:n,e)}intersectsBox(t){return this.intersectBox(t,Ci)!==null}intersectTriangle(t,e,i,n,s){Va.subVectors(e,t),Os.subVectors(i,t),Wa.crossVectors(Va,Os);let o=this.direction.dot(Wa),r;if(o>0){if(n)return null;r=1}else if(o<0)r=-1,o=-o;else return null;Wi.subVectors(this.origin,t);const c=r*this.direction.dot(Os.crossVectors(Wi,Os));if(c<0)return null;const l=r*this.direction.dot(Va.cross(Wi));if(l<0||c+l>o)return null;const h=-r*Wi.dot(Wa);return h<0?null:this.at(h/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ue{constructor(t,e,i,n,s,o,r,c,l,h,d,u,f,g,v,p){ue.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,n,s,o,r,c,l,h,d,u,f,g,v,p)}set(t,e,i,n,s,o,r,c,l,h,d,u,f,g,v,p){const m=this.elements;return m[0]=t,m[4]=e,m[8]=i,m[12]=n,m[1]=s,m[5]=o,m[9]=r,m[13]=c,m[2]=l,m[6]=h,m[10]=d,m[14]=u,m[3]=f,m[7]=g,m[11]=v,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ue().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,n=1/zn.setFromMatrixColumn(t,0).length(),s=1/zn.setFromMatrixColumn(t,1).length(),o=1/zn.setFromMatrixColumn(t,2).length();return e[0]=i[0]*n,e[1]=i[1]*n,e[2]=i[2]*n,e[3]=0,e[4]=i[4]*s,e[5]=i[5]*s,e[6]=i[6]*s,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,n=t.y,s=t.z,o=Math.cos(i),r=Math.sin(i),c=Math.cos(n),l=Math.sin(n),h=Math.cos(s),d=Math.sin(s);if(t.order==="XYZ"){const u=o*h,f=o*d,g=r*h,v=r*d;e[0]=c*h,e[4]=-c*d,e[8]=l,e[1]=f+g*l,e[5]=u-v*l,e[9]=-r*c,e[2]=v-u*l,e[6]=g+f*l,e[10]=o*c}else if(t.order==="YXZ"){const u=c*h,f=c*d,g=l*h,v=l*d;e[0]=u+v*r,e[4]=g*r-f,e[8]=o*l,e[1]=o*d,e[5]=o*h,e[9]=-r,e[2]=f*r-g,e[6]=v+u*r,e[10]=o*c}else if(t.order==="ZXY"){const u=c*h,f=c*d,g=l*h,v=l*d;e[0]=u-v*r,e[4]=-o*d,e[8]=g+f*r,e[1]=f+g*r,e[5]=o*h,e[9]=v-u*r,e[2]=-o*l,e[6]=r,e[10]=o*c}else if(t.order==="ZYX"){const u=o*h,f=o*d,g=r*h,v=r*d;e[0]=c*h,e[4]=g*l-f,e[8]=u*l+v,e[1]=c*d,e[5]=v*l+u,e[9]=f*l-g,e[2]=-l,e[6]=r*c,e[10]=o*c}else if(t.order==="YZX"){const u=o*c,f=o*l,g=r*c,v=r*l;e[0]=c*h,e[4]=v-u*d,e[8]=g*d+f,e[1]=d,e[5]=o*h,e[9]=-r*h,e[2]=-l*h,e[6]=f*d+g,e[10]=u-v*d}else if(t.order==="XZY"){const u=o*c,f=o*l,g=r*c,v=r*l;e[0]=c*h,e[4]=-d,e[8]=l*h,e[1]=u*d+v,e[5]=o*h,e[9]=f*d-g,e[2]=g*d-f,e[6]=r*h,e[10]=v*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Vh,t,Wh)}lookAt(t,e,i){const n=this.elements;return Ze.subVectors(t,e),Ze.lengthSq()===0&&(Ze.z=1),Ze.normalize(),ji.crossVectors(i,Ze),ji.lengthSq()===0&&(Math.abs(i.z)===1?Ze.x+=1e-4:Ze.z+=1e-4,Ze.normalize(),ji.crossVectors(i,Ze)),ji.normalize(),Bs.crossVectors(Ze,ji),n[0]=ji.x,n[4]=Bs.x,n[8]=Ze.x,n[1]=ji.y,n[5]=Bs.y,n[9]=Ze.y,n[2]=ji.z,n[6]=Bs.z,n[10]=Ze.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,n=e.elements,s=this.elements,o=i[0],r=i[4],c=i[8],l=i[12],h=i[1],d=i[5],u=i[9],f=i[13],g=i[2],v=i[6],p=i[10],m=i[14],x=i[3],y=i[7],b=i[11],z=i[15],T=n[0],E=n[4],R=n[8],U=n[12],_=n[1],w=n[5],L=n[9],O=n[13],q=n[2],Z=n[6],V=n[10],tt=n[14],$=n[3],pt=n[7],mt=n[11],St=n[15];return s[0]=o*T+r*_+c*q+l*$,s[4]=o*E+r*w+c*Z+l*pt,s[8]=o*R+r*L+c*V+l*mt,s[12]=o*U+r*O+c*tt+l*St,s[1]=h*T+d*_+u*q+f*$,s[5]=h*E+d*w+u*Z+f*pt,s[9]=h*R+d*L+u*V+f*mt,s[13]=h*U+d*O+u*tt+f*St,s[2]=g*T+v*_+p*q+m*$,s[6]=g*E+v*w+p*Z+m*pt,s[10]=g*R+v*L+p*V+m*mt,s[14]=g*U+v*O+p*tt+m*St,s[3]=x*T+y*_+b*q+z*$,s[7]=x*E+y*w+b*Z+z*pt,s[11]=x*R+y*L+b*V+z*mt,s[15]=x*U+y*O+b*tt+z*St,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],n=t[8],s=t[12],o=t[1],r=t[5],c=t[9],l=t[13],h=t[2],d=t[6],u=t[10],f=t[14],g=t[3],v=t[7],p=t[11],m=t[15];return g*(+s*c*d-n*l*d-s*r*u+i*l*u+n*r*f-i*c*f)+v*(+e*c*f-e*l*u+s*o*u-n*o*f+n*l*h-s*c*h)+p*(+e*l*d-e*r*f-s*o*d+i*o*f+s*r*h-i*l*h)+m*(-n*r*h-e*c*d+e*r*u+n*o*d-i*o*u+i*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const n=this.elements;return t.isVector3?(n[12]=t.x,n[13]=t.y,n[14]=t.z):(n[12]=t,n[13]=e,n[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],n=t[2],s=t[3],o=t[4],r=t[5],c=t[6],l=t[7],h=t[8],d=t[9],u=t[10],f=t[11],g=t[12],v=t[13],p=t[14],m=t[15],x=d*p*l-v*u*l+v*c*f-r*p*f-d*c*m+r*u*m,y=g*u*l-h*p*l-g*c*f+o*p*f+h*c*m-o*u*m,b=h*v*l-g*d*l+g*r*f-o*v*f-h*r*m+o*d*m,z=g*d*c-h*v*c-g*r*u+o*v*u+h*r*p-o*d*p,T=e*x+i*y+n*b+s*z;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/T;return t[0]=x*E,t[1]=(v*u*s-d*p*s-v*n*f+i*p*f+d*n*m-i*u*m)*E,t[2]=(r*p*s-v*c*s+v*n*l-i*p*l-r*n*m+i*c*m)*E,t[3]=(d*c*s-r*u*s-d*n*l+i*u*l+r*n*f-i*c*f)*E,t[4]=y*E,t[5]=(h*p*s-g*u*s+g*n*f-e*p*f-h*n*m+e*u*m)*E,t[6]=(g*c*s-o*p*s-g*n*l+e*p*l+o*n*m-e*c*m)*E,t[7]=(o*u*s-h*c*s+h*n*l-e*u*l-o*n*f+e*c*f)*E,t[8]=b*E,t[9]=(g*d*s-h*v*s-g*i*f+e*v*f+h*i*m-e*d*m)*E,t[10]=(o*v*s-g*r*s+g*i*l-e*v*l-o*i*m+e*r*m)*E,t[11]=(h*r*s-o*d*s-h*i*l+e*d*l+o*i*f-e*r*f)*E,t[12]=z*E,t[13]=(h*v*n-g*d*n+g*i*u-e*v*u-h*i*p+e*d*p)*E,t[14]=(g*r*n-o*v*n-g*i*c+e*v*c+o*i*p-e*r*p)*E,t[15]=(o*d*n-h*r*n+h*i*c-e*d*c-o*i*u+e*r*u)*E,this}scale(t){const e=this.elements,i=t.x,n=t.y,s=t.z;return e[0]*=i,e[4]*=n,e[8]*=s,e[1]*=i,e[5]*=n,e[9]*=s,e[2]*=i,e[6]*=n,e[10]*=s,e[3]*=i,e[7]*=n,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],n=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,n))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),n=Math.sin(e),s=1-i,o=t.x,r=t.y,c=t.z,l=s*o,h=s*r;return this.set(l*o+i,l*r-n*c,l*c+n*r,0,l*r+n*c,h*r+i,h*c-n*o,0,l*c-n*r,h*c+n*o,s*c*c+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,n,s,o){return this.set(1,i,s,0,t,1,o,0,e,n,1,0,0,0,0,1),this}compose(t,e,i){const n=this.elements,s=e._x,o=e._y,r=e._z,c=e._w,l=s+s,h=o+o,d=r+r,u=s*l,f=s*h,g=s*d,v=o*h,p=o*d,m=r*d,x=c*l,y=c*h,b=c*d,z=i.x,T=i.y,E=i.z;return n[0]=(1-(v+m))*z,n[1]=(f+b)*z,n[2]=(g-y)*z,n[3]=0,n[4]=(f-b)*T,n[5]=(1-(u+m))*T,n[6]=(p+x)*T,n[7]=0,n[8]=(g+y)*E,n[9]=(p-x)*E,n[10]=(1-(u+v))*E,n[11]=0,n[12]=t.x,n[13]=t.y,n[14]=t.z,n[15]=1,this}decompose(t,e,i){const n=this.elements;let s=zn.set(n[0],n[1],n[2]).length();const o=zn.set(n[4],n[5],n[6]).length(),r=zn.set(n[8],n[9],n[10]).length();this.determinant()<0&&(s=-s),t.x=n[12],t.y=n[13],t.z=n[14],pi.copy(this);const l=1/s,h=1/o,d=1/r;return pi.elements[0]*=l,pi.elements[1]*=l,pi.elements[2]*=l,pi.elements[4]*=h,pi.elements[5]*=h,pi.elements[6]*=h,pi.elements[8]*=d,pi.elements[9]*=d,pi.elements[10]*=d,e.setFromRotationMatrix(pi),i.x=s,i.y=o,i.z=r,this}makePerspective(t,e,i,n,s,o,r=Ui){const c=this.elements,l=2*s/(e-t),h=2*s/(i-n),d=(e+t)/(e-t),u=(i+n)/(i-n);let f,g;if(r===Ui)f=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(r===ya)f=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+r);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=u,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,n,s,o,r=Ui){const c=this.elements,l=1/(e-t),h=1/(i-n),d=1/(o-s),u=(e+t)*l,f=(i+n)*h;let g,v;if(r===Ui)g=(o+s)*d,v=-2*d;else if(r===ya)g=s*d,v=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+r);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-u,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=v,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let n=0;n<16;n++)if(e[n]!==i[n])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const zn=new C,pi=new ue,Vh=new C(0,0,0),Wh=new C(1,1,1),ji=new C,Bs=new C,Ze=new C,$r=new ue,Kr=new zs;class Mi{constructor(t=0,e=0,i=0,n=Mi.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=n}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,n=this._order){return this._x=t,this._y=e,this._z=i,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const n=t.elements,s=n[0],o=n[4],r=n[8],c=n[1],l=n[5],h=n[9],d=n[2],u=n[6],f=n[10];switch(e){case"XYZ":this._y=Math.asin(je(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-je(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(r,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(je(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-je(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(je(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(r,f));break;case"XZY":this._z=Math.asin(-je(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(r,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return $r.makeRotationFromQuaternion(t),this.setFromRotationMatrix($r,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Kr.setFromEuler(this),this.setFromQuaternion(Kr,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Mi.DEFAULT_ORDER="XYZ";class _l{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let jh=0;const Yr=new C,Pn=new zs,Ri=new ue,Hs=new C,ds=new C,qh=new C,Xh=new zs,Zr=new C(1,0,0),Jr=new C(0,1,0),Qr=new C(0,0,1),tc={type:"added"},$h={type:"removed"},kn={type:"childadded",child:null},ja={type:"childremoved",child:null};class Ce extends is{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:jh++}),this.uuid=Rs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ce.DEFAULT_UP.clone();const t=new C,e=new Mi,i=new zs,n=new C(1,1,1);function s(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new ue},normalMatrix:{value:new Gt}}),this.matrix=new ue,this.matrixWorld=new ue,this.matrixAutoUpdate=Ce.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ce.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new _l,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Pn.setFromAxisAngle(t,e),this.quaternion.multiply(Pn),this}rotateOnWorldAxis(t,e){return Pn.setFromAxisAngle(t,e),this.quaternion.premultiply(Pn),this}rotateX(t){return this.rotateOnAxis(Zr,t)}rotateY(t){return this.rotateOnAxis(Jr,t)}rotateZ(t){return this.rotateOnAxis(Qr,t)}translateOnAxis(t,e){return Yr.copy(t).applyQuaternion(this.quaternion),this.position.add(Yr.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Zr,t)}translateY(t){return this.translateOnAxis(Jr,t)}translateZ(t){return this.translateOnAxis(Qr,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ri.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Hs.copy(t):Hs.set(t,e,i);const n=this.parent;this.updateWorldMatrix(!0,!1),ds.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ri.lookAt(ds,Hs,this.up):Ri.lookAt(Hs,ds,this.up),this.quaternion.setFromRotationMatrix(Ri),n&&(Ri.extractRotation(n.matrixWorld),Pn.setFromRotationMatrix(Ri),this.quaternion.premultiply(Pn.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(tc),kn.child=t,this.dispatchEvent(kn),kn.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent($h),ja.child=t,this.dispatchEvent(ja),ja.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ri.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ri.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ri),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(tc),kn.child=t,this.dispatchEvent(kn),kn.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,n=this.children.length;i<n;i++){const o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const n=this.children;for(let s=0,o=n.length;s<o;s++)n[s].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ds,t,qh),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ds,Xh,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const n=this.children;for(let s=0,o=n.length;s<o;s++)n[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const n={};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.castShadow===!0&&(n.castShadow=!0),this.receiveShadow===!0&&(n.receiveShadow=!0),this.visible===!1&&(n.visible=!1),this.frustumCulled===!1&&(n.frustumCulled=!1),this.renderOrder!==0&&(n.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(n.matrixAutoUpdate=!1),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(n.type="BatchedMesh",n.perObjectFrustumCulled=this.perObjectFrustumCulled,n.sortObjects=this.sortObjects,n.drawRanges=this._drawRanges,n.reservedRanges=this._reservedRanges,n.visibility=this._visibility,n.active=this._active,n.bounds=this._bounds.map(r=>({boxInitialized:r.boxInitialized,boxMin:r.box.min.toArray(),boxMax:r.box.max.toArray(),sphereInitialized:r.sphereInitialized,sphereRadius:r.sphere.radius,sphereCenter:r.sphere.center.toArray()})),n.maxInstanceCount=this._maxInstanceCount,n.maxVertexCount=this._maxVertexCount,n.maxIndexCount=this._maxIndexCount,n.geometryInitialized=this._geometryInitialized,n.geometryCount=this._geometryCount,n.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(n.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(n.boundingSphere={center:n.boundingSphere.center.toArray(),radius:n.boundingSphere.radius}),this.boundingBox!==null&&(n.boundingBox={min:n.boundingBox.min.toArray(),max:n.boundingBox.max.toArray()}));function s(r,c){return r[c.uuid]===void 0&&(r[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=s(t.geometries,this.geometry);const r=this.geometry.parameters;if(r!==void 0&&r.shapes!==void 0){const c=r.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const d=c[l];s(t.shapes,d)}else s(t.shapes,c)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const r=[];for(let c=0,l=this.material.length;c<l;c++)r.push(s(t.materials,this.material[c]));n.material=r}else n.material=s(t.materials,this.material);if(this.children.length>0){n.children=[];for(let r=0;r<this.children.length;r++)n.children.push(this.children[r].toJSON(t).object)}if(this.animations.length>0){n.animations=[];for(let r=0;r<this.animations.length;r++){const c=this.animations[r];n.animations.push(s(t.animations,c))}}if(e){const r=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),d=o(t.shapes),u=o(t.skeletons),f=o(t.animations),g=o(t.nodes);r.length>0&&(i.geometries=r),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),d.length>0&&(i.shapes=d),u.length>0&&(i.skeletons=u),f.length>0&&(i.animations=f),g.length>0&&(i.nodes=g)}return i.object=n,i;function o(r){const c=[];for(const l in r){const h=r[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const n=t.children[i];this.add(n.clone())}return this}}Ce.DEFAULT_UP=new C(0,1,0);Ce.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ce.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const mi=new C,zi=new C,qa=new C,Pi=new C,In=new C,Ln=new C,ec=new C,Xa=new C,$a=new C,Ka=new C,Ya=new de,Za=new de,Ja=new de;class xi{constructor(t=new C,e=new C,i=new C){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,n){n.subVectors(i,e),mi.subVectors(t,e),n.cross(mi);const s=n.lengthSq();return s>0?n.multiplyScalar(1/Math.sqrt(s)):n.set(0,0,0)}static getBarycoord(t,e,i,n,s){mi.subVectors(n,e),zi.subVectors(i,e),qa.subVectors(t,e);const o=mi.dot(mi),r=mi.dot(zi),c=mi.dot(qa),l=zi.dot(zi),h=zi.dot(qa),d=o*l-r*r;if(d===0)return s.set(0,0,0),null;const u=1/d,f=(l*c-r*h)*u,g=(o*h-r*c)*u;return s.set(1-f-g,g,f)}static containsPoint(t,e,i,n){return this.getBarycoord(t,e,i,n,Pi)===null?!1:Pi.x>=0&&Pi.y>=0&&Pi.x+Pi.y<=1}static getInterpolation(t,e,i,n,s,o,r,c){return this.getBarycoord(t,e,i,n,Pi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Pi.x),c.addScaledVector(o,Pi.y),c.addScaledVector(r,Pi.z),c)}static getInterpolatedAttribute(t,e,i,n,s,o){return Ya.setScalar(0),Za.setScalar(0),Ja.setScalar(0),Ya.fromBufferAttribute(t,e),Za.fromBufferAttribute(t,i),Ja.fromBufferAttribute(t,n),o.setScalar(0),o.addScaledVector(Ya,s.x),o.addScaledVector(Za,s.y),o.addScaledVector(Ja,s.z),o}static isFrontFacing(t,e,i,n){return mi.subVectors(i,e),zi.subVectors(t,e),mi.cross(zi).dot(n)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,n){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[n]),this}setFromAttributeAndIndices(t,e,i,n){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,n),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return mi.subVectors(this.c,this.b),zi.subVectors(this.a,this.b),mi.cross(zi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return xi.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return xi.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,n,s){return xi.getInterpolation(t,this.a,this.b,this.c,e,i,n,s)}containsPoint(t){return xi.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return xi.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,n=this.b,s=this.c;let o,r;In.subVectors(n,i),Ln.subVectors(s,i),Xa.subVectors(t,i);const c=In.dot(Xa),l=Ln.dot(Xa);if(c<=0&&l<=0)return e.copy(i);$a.subVectors(t,n);const h=In.dot($a),d=Ln.dot($a);if(h>=0&&d<=h)return e.copy(n);const u=c*d-h*l;if(u<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(i).addScaledVector(In,o);Ka.subVectors(t,s);const f=In.dot(Ka),g=Ln.dot(Ka);if(g>=0&&f<=g)return e.copy(s);const v=f*l-c*g;if(v<=0&&l>=0&&g<=0)return r=l/(l-g),e.copy(i).addScaledVector(Ln,r);const p=h*g-f*d;if(p<=0&&d-h>=0&&f-g>=0)return ec.subVectors(s,n),r=(d-h)/(d-h+(f-g)),e.copy(n).addScaledVector(ec,r);const m=1/(p+v+u);return o=v*m,r=u*m,e.copy(i).addScaledVector(In,o).addScaledVector(Ln,r)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const xl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},qi={h:0,s:0,l:0},Gs={h:0,s:0,l:0};function Qa(a,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?a+(t-a)*6*e:e<1/2?t:e<2/3?a+(t-a)*6*(2/3-e):a}class st{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const n=t;n&&n.isColor?this.copy(n):typeof n=="number"?this.setHex(n):typeof n=="string"&&this.setStyle(n)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ti){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,oe.toWorkingColorSpace(this,e),this}setRGB(t,e,i,n=oe.workingColorSpace){return this.r=t,this.g=e,this.b=i,oe.toWorkingColorSpace(this,n),this}setHSL(t,e,i,n=oe.workingColorSpace){if(t=Ph(t,1),e=je(e,0,1),i=je(i,0,1),e===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+e):i+e-i*e,o=2*i-s;this.r=Qa(o,s,t+1/3),this.g=Qa(o,s,t),this.b=Qa(o,s,t-1/3)}return oe.toWorkingColorSpace(this,n),this}setStyle(t,e=ti){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let n;if(n=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const o=n[1],r=n[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(r))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=n[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ti){const i=xl[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Kn(t.r),this.g=Kn(t.g),this.b=Kn(t.b),this}copyLinearToSRGB(t){return this.r=Na(t.r),this.g=Na(t.g),this.b=Na(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ti){return oe.fromWorkingColorSpace(Fe.copy(this),t),Math.round(je(Fe.r*255,0,255))*65536+Math.round(je(Fe.g*255,0,255))*256+Math.round(je(Fe.b*255,0,255))}getHexString(t=ti){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=oe.workingColorSpace){oe.fromWorkingColorSpace(Fe.copy(this),e);const i=Fe.r,n=Fe.g,s=Fe.b,o=Math.max(i,n,s),r=Math.min(i,n,s);let c,l;const h=(r+o)/2;if(r===o)c=0,l=0;else{const d=o-r;switch(l=h<=.5?d/(o+r):d/(2-o-r),o){case i:c=(n-s)/d+(n<s?6:0);break;case n:c=(s-i)/d+2;break;case s:c=(i-n)/d+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=oe.workingColorSpace){return oe.fromWorkingColorSpace(Fe.copy(this),e),t.r=Fe.r,t.g=Fe.g,t.b=Fe.b,t}getStyle(t=ti){oe.fromWorkingColorSpace(Fe.copy(this),t);const e=Fe.r,i=Fe.g,n=Fe.b;return t!==ti?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(n*255)})`}offsetHSL(t,e,i){return this.getHSL(qi),this.setHSL(qi.h+t,qi.s+e,qi.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(qi),t.getHSL(Gs);const i=Da(qi.h,Gs.h,e),n=Da(qi.s,Gs.s,e),s=Da(qi.l,Gs.l,e);return this.setHSL(i,n,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,n=this.b,s=t.elements;return this.r=s[0]*e+s[3]*i+s[6]*n,this.g=s[1]*e+s[4]*i+s[7]*n,this.b=s[2]*e+s[5]*i+s[8]*n,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Fe=new st;st.NAMES=xl;let Kh=0;class bn extends is{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Kh++}),this.uuid=Rs(),this.name="",this.type="Material",this.blending=Xn,this.side=Oi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=bo,this.blendDst=So,this.blendEquation=gn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new st(0,0,0),this.blendAlpha=0,this.depthFunc=Yn,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Hr,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=En,this.stencilZFail=En,this.stencilZPass=En,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const n=this[e];if(n===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}n&&n.isColor?n.set(i):n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Xn&&(i.blending=this.blending),this.side!==Oi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==bo&&(i.blendSrc=this.blendSrc),this.blendDst!==So&&(i.blendDst=this.blendDst),this.blendEquation!==gn&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Yn&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Hr&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==En&&(i.stencilFail=this.stencilFail),this.stencilZFail!==En&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==En&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function n(s){const o=[];for(const r in s){const c=s[r];delete c.metadata,o.push(c)}return o}if(e){const s=n(t.textures),o=n(t.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const n=e.length;i=new Array(n);for(let s=0;s!==n;++s)i[s]=e[s].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Ee extends bn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new st(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Mi,this.combine=ur,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const be=new C,Vs=new Vt;class Ae{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Gr,this.updateRanges=[],this.gpuType=Si,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let n=0,s=this.itemSize;n<s;n++)this.array[t+n]=e.array[i+n];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Vs.fromBufferAttribute(this,e),Vs.applyMatrix3(t),this.setXY(e,Vs.x,Vs.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)be.fromBufferAttribute(this,e),be.applyMatrix3(t),this.setXYZ(e,be.x,be.y,be.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)be.fromBufferAttribute(this,e),be.applyMatrix4(t),this.setXYZ(e,be.x,be.y,be.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)be.fromBufferAttribute(this,e),be.applyNormalMatrix(t),this.setXYZ(e,be.x,be.y,be.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)be.fromBufferAttribute(this,e),be.transformDirection(t),this.setXYZ(e,be.x,be.y,be.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=rs(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=Ve(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=rs(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ve(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=rs(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ve(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=rs(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ve(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=rs(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ve(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=Ve(e,this.array),i=Ve(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,n){return t*=this.itemSize,this.normalized&&(e=Ve(e,this.array),i=Ve(i,this.array),n=Ve(n,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=n,this}setXYZW(t,e,i,n,s){return t*=this.itemSize,this.normalized&&(e=Ve(e,this.array),i=Ve(i,this.array),n=Ve(n,this.array),s=Ve(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=n,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Gr&&(t.usage=this.usage),t}}class yl extends Ae{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class Ml extends Ae{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class re extends Ae{constructor(t,e,i){super(new Float32Array(t),e,i)}}let Yh=0;const si=new ue,to=new Ce,Dn=new C,Je=new wn,us=new wn,Pe=new C;class Te extends is{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Yh++}),this.uuid=Rs(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(pl(t)?Ml:yl)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Gt().getNormalMatrix(t);i.applyNormalMatrix(s),i.needsUpdate=!0}const n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(t),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return si.makeRotationFromQuaternion(t),this.applyMatrix4(si),this}rotateX(t){return si.makeRotationX(t),this.applyMatrix4(si),this}rotateY(t){return si.makeRotationY(t),this.applyMatrix4(si),this}rotateZ(t){return si.makeRotationZ(t),this.applyMatrix4(si),this}translate(t,e,i){return si.makeTranslation(t,e,i),this.applyMatrix4(si),this}scale(t,e,i){return si.makeScale(t,e,i),this.applyMatrix4(si),this}lookAt(t){return to.lookAt(t),to.updateMatrix(),this.applyMatrix4(to.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Dn).negate(),this.translate(Dn.x,Dn.y,Dn.z),this}setFromPoints(t){const e=[];for(let i=0,n=t.length;i<n;i++){const s=t[i];e.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new re(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new wn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,n=e.length;i<n;i++){const s=e[i];Je.setFromBufferAttribute(s),this.morphTargetsRelative?(Pe.addVectors(this.boundingBox.min,Je.min),this.boundingBox.expandByPoint(Pe),Pe.addVectors(this.boundingBox.max,Je.max),this.boundingBox.expandByPoint(Pe)):(this.boundingBox.expandByPoint(Je.min),this.boundingBox.expandByPoint(Je.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ns);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(t){const i=this.boundingSphere.center;if(Je.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){const r=e[s];us.setFromBufferAttribute(r),this.morphTargetsRelative?(Pe.addVectors(Je.min,us.min),Je.expandByPoint(Pe),Pe.addVectors(Je.max,us.max),Je.expandByPoint(Pe)):(Je.expandByPoint(us.min),Je.expandByPoint(us.max))}Je.getCenter(i);let n=0;for(let s=0,o=t.count;s<o;s++)Pe.fromBufferAttribute(t,s),n=Math.max(n,i.distanceToSquared(Pe));if(e)for(let s=0,o=e.length;s<o;s++){const r=e[s],c=this.morphTargetsRelative;for(let l=0,h=r.count;l<h;l++)Pe.fromBufferAttribute(r,l),c&&(Dn.fromBufferAttribute(t,l),Pe.add(Dn)),n=Math.max(n,i.distanceToSquared(Pe))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,n=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ae(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),r=[],c=[];for(let R=0;R<i.count;R++)r[R]=new C,c[R]=new C;const l=new C,h=new C,d=new C,u=new Vt,f=new Vt,g=new Vt,v=new C,p=new C;function m(R,U,_){l.fromBufferAttribute(i,R),h.fromBufferAttribute(i,U),d.fromBufferAttribute(i,_),u.fromBufferAttribute(s,R),f.fromBufferAttribute(s,U),g.fromBufferAttribute(s,_),h.sub(l),d.sub(l),f.sub(u),g.sub(u);const w=1/(f.x*g.y-g.x*f.y);isFinite(w)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(w),p.copy(d).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(w),r[R].add(v),r[U].add(v),r[_].add(v),c[R].add(p),c[U].add(p),c[_].add(p))}let x=this.groups;x.length===0&&(x=[{start:0,count:t.count}]);for(let R=0,U=x.length;R<U;++R){const _=x[R],w=_.start,L=_.count;for(let O=w,q=w+L;O<q;O+=3)m(t.getX(O+0),t.getX(O+1),t.getX(O+2))}const y=new C,b=new C,z=new C,T=new C;function E(R){z.fromBufferAttribute(n,R),T.copy(z);const U=r[R];y.copy(U),y.sub(z.multiplyScalar(z.dot(U))).normalize(),b.crossVectors(T,U);const w=b.dot(c[R])<0?-1:1;o.setXYZW(R,y.x,y.y,y.z,w)}for(let R=0,U=x.length;R<U;++R){const _=x[R],w=_.start,L=_.count;for(let O=w,q=w+L;O<q;O+=3)E(t.getX(O+0)),E(t.getX(O+1)),E(t.getX(O+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Ae(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let u=0,f=i.count;u<f;u++)i.setXYZ(u,0,0,0);const n=new C,s=new C,o=new C,r=new C,c=new C,l=new C,h=new C,d=new C;if(t)for(let u=0,f=t.count;u<f;u+=3){const g=t.getX(u+0),v=t.getX(u+1),p=t.getX(u+2);n.fromBufferAttribute(e,g),s.fromBufferAttribute(e,v),o.fromBufferAttribute(e,p),h.subVectors(o,s),d.subVectors(n,s),h.cross(d),r.fromBufferAttribute(i,g),c.fromBufferAttribute(i,v),l.fromBufferAttribute(i,p),r.add(h),c.add(h),l.add(h),i.setXYZ(g,r.x,r.y,r.z),i.setXYZ(v,c.x,c.y,c.z),i.setXYZ(p,l.x,l.y,l.z)}else for(let u=0,f=e.count;u<f;u+=3)n.fromBufferAttribute(e,u+0),s.fromBufferAttribute(e,u+1),o.fromBufferAttribute(e,u+2),h.subVectors(o,s),d.subVectors(n,s),h.cross(d),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Pe.fromBufferAttribute(t,e),Pe.normalize(),t.setXYZ(e,Pe.x,Pe.y,Pe.z)}toNonIndexed(){function t(r,c){const l=r.array,h=r.itemSize,d=r.normalized,u=new l.constructor(c.length*h);let f=0,g=0;for(let v=0,p=c.length;v<p;v++){r.isInterleavedBufferAttribute?f=c[v]*r.data.stride+r.offset:f=c[v]*h;for(let m=0;m<h;m++)u[g++]=l[f++]}return new Ae(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Te,i=this.index.array,n=this.attributes;for(const r in n){const c=n[r],l=t(c,i);e.setAttribute(r,l)}const s=this.morphAttributes;for(const r in s){const c=[],l=s[r];for(let h=0,d=l.length;h<d;h++){const u=l[h],f=t(u,i);c.push(f)}e.morphAttributes[r]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let r=0,c=o.length;r<c;r++){const l=o[r];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const c in i){const l=i[c];t.data.attributes[c]=l.toJSON(t.data)}const n={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let d=0,u=l.length;d<u;d++){const f=l[d];h.push(f.toJSON(t.data))}h.length>0&&(n[c]=h,s=!0)}s&&(t.data.morphAttributes=n,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const r=this.boundingSphere;return r!==null&&(t.data.boundingSphere={center:r.center.toArray(),radius:r.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(e));const n=t.attributes;for(const l in n){const h=n[l];this.setAttribute(l,h.clone(e))}const s=t.morphAttributes;for(const l in s){const h=[],d=s[l];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,h=o.length;l<h;l++){const d=o[l];this.addGroup(d.start,d.count,d.materialIndex)}const r=t.boundingBox;r!==null&&(this.boundingBox=r.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ic=new ue,ln=new vl,Ws=new ns,nc=new C,js=new C,qs=new C,Xs=new C,eo=new C,$s=new C,sc=new C,Ks=new C;class yt extends Ce{constructor(t=new Te,e=new Ee){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=n.length;s<o;s++){const r=n[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[r]=s}}}}getVertexPosition(t,e){const i=this.geometry,n=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(n,t);const r=this.morphTargetInfluences;if(s&&r){$s.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const h=r[c],d=s[c];h!==0&&(eo.fromBufferAttribute(d,t),o?$s.addScaledVector(eo,h):$s.addScaledVector(eo.sub(e),h))}e.add($s)}return e}raycast(t,e){const i=this.geometry,n=this.material,s=this.matrixWorld;n!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ws.copy(i.boundingSphere),Ws.applyMatrix4(s),ln.copy(t.ray).recast(t.near),!(Ws.containsPoint(ln.origin)===!1&&(ln.intersectSphere(Ws,nc)===null||ln.origin.distanceToSquared(nc)>(t.far-t.near)**2))&&(ic.copy(s).invert(),ln.copy(t.ray).applyMatrix4(ic),!(i.boundingBox!==null&&ln.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,ln)))}_computeIntersections(t,e,i){let n;const s=this.geometry,o=this.material,r=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,d=s.attributes.normal,u=s.groups,f=s.drawRange;if(r!==null)if(Array.isArray(o))for(let g=0,v=u.length;g<v;g++){const p=u[g],m=o[p.materialIndex],x=Math.max(p.start,f.start),y=Math.min(r.count,Math.min(p.start+p.count,f.start+f.count));for(let b=x,z=y;b<z;b+=3){const T=r.getX(b),E=r.getX(b+1),R=r.getX(b+2);n=Ys(this,m,t,i,l,h,d,T,E,R),n&&(n.faceIndex=Math.floor(b/3),n.face.materialIndex=p.materialIndex,e.push(n))}}else{const g=Math.max(0,f.start),v=Math.min(r.count,f.start+f.count);for(let p=g,m=v;p<m;p+=3){const x=r.getX(p),y=r.getX(p+1),b=r.getX(p+2);n=Ys(this,o,t,i,l,h,d,x,y,b),n&&(n.faceIndex=Math.floor(p/3),e.push(n))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,v=u.length;g<v;g++){const p=u[g],m=o[p.materialIndex],x=Math.max(p.start,f.start),y=Math.min(c.count,Math.min(p.start+p.count,f.start+f.count));for(let b=x,z=y;b<z;b+=3){const T=b,E=b+1,R=b+2;n=Ys(this,m,t,i,l,h,d,T,E,R),n&&(n.faceIndex=Math.floor(b/3),n.face.materialIndex=p.materialIndex,e.push(n))}}else{const g=Math.max(0,f.start),v=Math.min(c.count,f.start+f.count);for(let p=g,m=v;p<m;p+=3){const x=p,y=p+1,b=p+2;n=Ys(this,o,t,i,l,h,d,x,y,b),n&&(n.faceIndex=Math.floor(p/3),e.push(n))}}}}function Zh(a,t,e,i,n,s,o,r){let c;if(t.side===Xe?c=i.intersectTriangle(o,s,n,!0,r):c=i.intersectTriangle(n,s,o,t.side===Oi,r),c===null)return null;Ks.copy(r),Ks.applyMatrix4(a.matrixWorld);const l=e.ray.origin.distanceTo(Ks);return l<e.near||l>e.far?null:{distance:l,point:Ks.clone(),object:a}}function Ys(a,t,e,i,n,s,o,r,c,l){a.getVertexPosition(r,js),a.getVertexPosition(c,qs),a.getVertexPosition(l,Xs);const h=Zh(a,t,e,i,js,qs,Xs,sc);if(h){const d=new C;xi.getBarycoord(sc,js,qs,Xs,d),n&&(h.uv=xi.getInterpolatedAttribute(n,r,c,l,d,new Vt)),s&&(h.uv1=xi.getInterpolatedAttribute(s,r,c,l,d,new Vt)),o&&(h.normal=xi.getInterpolatedAttribute(o,r,c,l,d,new C),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const u={a:r,b:c,c:l,normal:new C,materialIndex:0};xi.getNormal(js,qs,Xs,u.normal),h.face=u,h.barycoord=d}return h}class hi extends Te{constructor(t=1,e=1,i=1,n=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:n,heightSegments:s,depthSegments:o};const r=this;n=Math.floor(n),s=Math.floor(s),o=Math.floor(o);const c=[],l=[],h=[],d=[];let u=0,f=0;g("z","y","x",-1,-1,i,e,t,o,s,0),g("z","y","x",1,-1,i,e,-t,o,s,1),g("x","z","y",1,1,t,i,e,n,o,2),g("x","z","y",1,-1,t,i,-e,n,o,3),g("x","y","z",1,-1,t,e,i,n,s,4),g("x","y","z",-1,-1,t,e,-i,n,s,5),this.setIndex(c),this.setAttribute("position",new re(l,3)),this.setAttribute("normal",new re(h,3)),this.setAttribute("uv",new re(d,2));function g(v,p,m,x,y,b,z,T,E,R,U){const _=b/E,w=z/R,L=b/2,O=z/2,q=T/2,Z=E+1,V=R+1;let tt=0,$=0;const pt=new C;for(let mt=0;mt<V;mt++){const St=mt*w-O;for(let te=0;te<Z;te++){const ce=te*_-L;pt[v]=ce*x,pt[p]=St*y,pt[m]=q,l.push(pt.x,pt.y,pt.z),pt[v]=0,pt[p]=0,pt[m]=T>0?1:-1,h.push(pt.x,pt.y,pt.z),d.push(te/E),d.push(1-mt/R),tt+=1}}for(let mt=0;mt<R;mt++)for(let St=0;St<E;St++){const te=u+St+Z*mt,ce=u+St+Z*(mt+1),K=u+(St+1)+Z*(mt+1),it=u+(St+1)+Z*mt;c.push(te,ce,it),c.push(ce,K,it),$+=6}r.addGroup(f,$,U),f+=$,u+=tt}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new hi(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function es(a){const t={};for(const e in a){t[e]={};for(const i in a[e]){const n=a[e][i];n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)?n.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=n.clone():Array.isArray(n)?t[e][i]=n.slice():t[e][i]=n}}return t}function Be(a){const t={};for(let e=0;e<a.length;e++){const i=es(a[e]);for(const n in i)t[n]=i[n]}return t}function Jh(a){const t=[];for(let e=0;e<a.length;e++)t.push(a[e].clone());return t}function wl(a){const t=a.getRenderTarget();return t===null?a.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:oe.workingColorSpace}const Qh={clone:es,merge:Be};var td=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ed=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class sn extends bn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=td,this.fragmentShader=ed,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=es(t.uniforms),this.uniformsGroups=Jh(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const n in this.uniforms){const o=this.uniforms[n].value;o&&o.isTexture?e.uniforms[n]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[n]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[n]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[n]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[n]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[n]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[n]={type:"m4",value:o.toArray()}:e.uniforms[n]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const n in this.extensions)this.extensions[n]===!0&&(i[n]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class bl extends Ce{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ue,this.projectionMatrix=new ue,this.projectionMatrixInverse=new ue,this.coordinateSystem=Ui}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Xi=new C,ac=new Vt,oc=new Vt;class ei extends bl{constructor(t=50,e=1,i=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=or*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(La*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return or*2*Math.atan(Math.tan(La*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Xi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Xi.x,Xi.y).multiplyScalar(-t/Xi.z),Xi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Xi.x,Xi.y).multiplyScalar(-t/Xi.z)}getViewSize(t,e){return this.getViewBounds(t,ac,oc),e.subVectors(oc,ac)}setViewOffset(t,e,i,n,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=n,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(La*.5*this.fov)/this.zoom,i=2*e,n=this.aspect*i,s=-.5*n;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*n/c,e-=o.offsetY*i/l,n*=o.width/c,i*=o.height/l}const r=this.filmOffset;r!==0&&(s+=t*r/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+n,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Un=-90,Nn=1;class id extends Ce{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const n=new ei(Un,Nn,t,e);n.layers=this.layers,this.add(n);const s=new ei(Un,Nn,t,e);s.layers=this.layers,this.add(s);const o=new ei(Un,Nn,t,e);o.layers=this.layers,this.add(o);const r=new ei(Un,Nn,t,e);r.layers=this.layers,this.add(r);const c=new ei(Un,Nn,t,e);c.layers=this.layers,this.add(c);const l=new ei(Un,Nn,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,n,s,o,r,c]=e;for(const l of e)this.remove(l);if(t===Ui)i.up.set(0,1,0),i.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),r.up.set(0,1,0),r.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===ya)i.up.set(0,-1,0),i.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),r.up.set(0,-1,0),r.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:n}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,o,r,c,l,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,n),t.render(e,s),t.setRenderTarget(i,1,n),t.render(e,o),t.setRenderTarget(i,2,n),t.render(e,r),t.setRenderTarget(i,3,n),t.render(e,c),t.setRenderTarget(i,4,n),t.render(e,l),i.texture.generateMipmaps=v,t.setRenderTarget(i,5,n),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Sl extends Oe{constructor(t,e,i,n,s,o,r,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:Zn,super(t,e,i,n,s,o,r,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class nd extends Mn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},n=[i,i,i,i,i,i];this.texture=new Sl(n,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:ii}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},n=new hi(5,5,5),s=new sn({name:"CubemapFromEquirect",uniforms:es(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Xe,blending:tn});s.uniforms.tEquirect.value=e;const o=new yt(n,s),r=e.minFilter;return e.minFilter===xn&&(e.minFilter=ii),new id(1,10,this).update(t,o),e.minFilter=r,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,i,n){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,n);t.setRenderTarget(s)}}const io=new C,sd=new C,ad=new Gt;class pn{constructor(t=new C(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,n){return this.normal.set(t,e,i),this.constant=n,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const n=io.subVectors(i,e).cross(sd.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(n,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(io),n=this.normal.dot(i);if(n===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/n;return s<0||s>1?null:e.copy(t.start).addScaledVector(i,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||ad.getNormalMatrix(t),n=this.coplanarPoint(io).applyMatrix4(t),s=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const hn=new ns,Zs=new C;class wr{constructor(t=new pn,e=new pn,i=new pn,n=new pn,s=new pn,o=new pn){this.planes=[t,e,i,n,s,o]}set(t,e,i,n,s,o){const r=this.planes;return r[0].copy(t),r[1].copy(e),r[2].copy(i),r[3].copy(n),r[4].copy(s),r[5].copy(o),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Ui){const i=this.planes,n=t.elements,s=n[0],o=n[1],r=n[2],c=n[3],l=n[4],h=n[5],d=n[6],u=n[7],f=n[8],g=n[9],v=n[10],p=n[11],m=n[12],x=n[13],y=n[14],b=n[15];if(i[0].setComponents(c-s,u-l,p-f,b-m).normalize(),i[1].setComponents(c+s,u+l,p+f,b+m).normalize(),i[2].setComponents(c+o,u+h,p+g,b+x).normalize(),i[3].setComponents(c-o,u-h,p-g,b-x).normalize(),i[4].setComponents(c-r,u-d,p-v,b-y).normalize(),e===Ui)i[5].setComponents(c+r,u+d,p+v,b+y).normalize();else if(e===ya)i[5].setComponents(r,d,v,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),hn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),hn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(hn)}intersectsSprite(t){return hn.center.set(0,0,0),hn.radius=.7071067811865476,hn.applyMatrix4(t.matrixWorld),this.intersectsSphere(hn)}intersectsSphere(t){const e=this.planes,i=t.center,n=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(i)<n)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const n=e[i];if(Zs.x=n.normal.x>0?t.max.x:t.min.x,Zs.y=n.normal.y>0?t.max.y:t.min.y,Zs.z=n.normal.z>0?t.max.z:t.min.z,n.distanceToPoint(Zs)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function El(){let a=null,t=!1,e=null,i=null;function n(s,o){e(s,o),i=a.requestAnimationFrame(n)}return{start:function(){t!==!0&&e!==null&&(i=a.requestAnimationFrame(n),t=!0)},stop:function(){a.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){a=s}}}function od(a){const t=new WeakMap;function e(r,c){const l=r.array,h=r.usage,d=l.byteLength,u=a.createBuffer();a.bindBuffer(c,u),a.bufferData(c,l,h),r.onUploadCallback();let f;if(l instanceof Float32Array)f=a.FLOAT;else if(l instanceof Uint16Array)r.isFloat16BufferAttribute?f=a.HALF_FLOAT:f=a.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=a.SHORT;else if(l instanceof Uint32Array)f=a.UNSIGNED_INT;else if(l instanceof Int32Array)f=a.INT;else if(l instanceof Int8Array)f=a.BYTE;else if(l instanceof Uint8Array)f=a.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=a.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:r.version,size:d}}function i(r,c,l){const h=c.array,d=c.updateRanges;if(a.bindBuffer(l,r),d.length===0)a.bufferSubData(l,0,h);else{d.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<d.length;f++){const g=d[u],v=d[f];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++u,d[u]=v)}d.length=u+1;for(let f=0,g=d.length;f<g;f++){const v=d[f];a.bufferSubData(l,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function n(r){return r.isInterleavedBufferAttribute&&(r=r.data),t.get(r)}function s(r){r.isInterleavedBufferAttribute&&(r=r.data);const c=t.get(r);c&&(a.deleteBuffer(c.buffer),t.delete(r))}function o(r,c){if(r.isInterleavedBufferAttribute&&(r=r.data),r.isGLBufferAttribute){const h=t.get(r);(!h||h.version<r.version)&&t.set(r,{buffer:r.buffer,type:r.type,bytesPerElement:r.elementSize,version:r.version});return}const l=t.get(r);if(l===void 0)t.set(r,e(r,c));else if(l.version<r.version){if(l.size!==r.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,r,c),l.version=r.version}}return{get:n,remove:s,update:o}}class Ea extends Te{constructor(t=1,e=1,i=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:n};const s=t/2,o=e/2,r=Math.floor(i),c=Math.floor(n),l=r+1,h=c+1,d=t/r,u=e/c,f=[],g=[],v=[],p=[];for(let m=0;m<h;m++){const x=m*u-o;for(let y=0;y<l;y++){const b=y*d-s;g.push(b,-x,0),v.push(0,0,1),p.push(y/r),p.push(1-m/c)}}for(let m=0;m<c;m++)for(let x=0;x<r;x++){const y=x+l*m,b=x+l*(m+1),z=x+1+l*(m+1),T=x+1+l*m;f.push(y,b,T),f.push(b,z,T)}this.setIndex(f),this.setAttribute("position",new re(g,3)),this.setAttribute("normal",new re(v,3)),this.setAttribute("uv",new re(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ea(t.width,t.height,t.widthSegments,t.heightSegments)}}var rd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,cd=`#ifdef USE_ALPHAHASH
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
#endif`,ld=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,hd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,dd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ud=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,fd=`#ifdef USE_AOMAP
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
#endif`,pd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,md=`#ifdef USE_BATCHING
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
#endif`,gd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,vd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,_d=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,xd=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,yd=`#ifdef USE_IRIDESCENCE
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
#endif`,Md=`#ifdef USE_BUMPMAP
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
#endif`,wd=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,bd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Sd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ed=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Td=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Ad=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Cd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Rd=`#if defined( USE_COLOR_ALPHA )
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
#endif`,zd=`#define PI 3.141592653589793
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
} // validated`,Pd=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,kd=`vec3 transformedNormal = objectNormal;
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
#endif`,Id=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ld=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Dd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ud=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Nd="gl_FragColor = linearToOutputTexel( gl_FragColor );",Fd=`
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
}`,Od=`#ifdef USE_ENVMAP
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
#endif`,Bd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Hd=`#ifdef USE_ENVMAP
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
#endif`,Gd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Vd=`#ifdef USE_ENVMAP
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
#endif`,Wd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,jd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,qd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Xd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,$d=`#ifdef USE_GRADIENTMAP
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
}`,Kd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Yd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Zd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Jd=`uniform bool receiveShadow;
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
#endif`,Qd=`#ifdef USE_ENVMAP
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
#endif`,tu=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,eu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,iu=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,nu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,su=`PhysicalMaterial material;
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
#endif`,au=`struct PhysicalMaterial {
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
}`,ou=`
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
#endif`,ru=`#if defined( RE_IndirectDiffuse )
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
#endif`,cu=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lu=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,hu=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,du=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,uu=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,fu=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,pu=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,mu=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,gu=`#if defined( USE_POINTS_UV )
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
#endif`,vu=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,_u=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,xu=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,yu=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Mu=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,wu=`#ifdef USE_MORPHTARGETS
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
#endif`,bu=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Su=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Eu=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Tu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Au=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Cu=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Ru=`#ifdef USE_NORMALMAP
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
#endif`,zu=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Pu=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ku=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Iu=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Lu=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Du=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Uu=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Nu=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Fu=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ou=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Bu=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Hu=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Gu=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Vu=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Wu=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,ju=`float getShadowMask() {
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
}`,qu=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Xu=`#ifdef USE_SKINNING
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
#endif`,$u=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ku=`#ifdef USE_SKINNING
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
#endif`,Yu=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Zu=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ju=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Qu=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,tf=`#ifdef USE_TRANSMISSION
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
#endif`,ef=`#ifdef USE_TRANSMISSION
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
#endif`,nf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,sf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,af=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,of=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const rf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,cf=`uniform sampler2D t2D;
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
}`,lf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hf=`#ifdef ENVMAP_TYPE_CUBE
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
}`,df=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,uf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ff=`#include <common>
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
}`,pf=`#if DEPTH_PACKING == 3200
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
}`,mf=`#define DISTANCE
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
}`,gf=`#define DISTANCE
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
}`,vf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,_f=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xf=`uniform float scale;
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
}`,yf=`uniform vec3 diffuse;
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
}`,Mf=`#include <common>
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
}`,wf=`uniform vec3 diffuse;
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
}`,bf=`#define LAMBERT
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
}`,Sf=`#define LAMBERT
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
}`,Ef=`#define MATCAP
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
}`,Tf=`#define MATCAP
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
}`,Af=`#define NORMAL
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
}`,Cf=`#define NORMAL
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
}`,Rf=`#define PHONG
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
}`,zf=`#define PHONG
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
}`,Pf=`#define STANDARD
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
}`,kf=`#define STANDARD
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
}`,If=`#define TOON
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
}`,Lf=`#define TOON
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
}`,Df=`uniform float size;
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
}`,Uf=`uniform vec3 diffuse;
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
}`,Nf=`#include <common>
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
}`,Ff=`uniform vec3 color;
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
}`,Of=`uniform float rotation;
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
}`,Bf=`uniform vec3 diffuse;
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
}`,Ht={alphahash_fragment:rd,alphahash_pars_fragment:cd,alphamap_fragment:ld,alphamap_pars_fragment:hd,alphatest_fragment:dd,alphatest_pars_fragment:ud,aomap_fragment:fd,aomap_pars_fragment:pd,batching_pars_vertex:md,batching_vertex:gd,begin_vertex:vd,beginnormal_vertex:_d,bsdfs:xd,iridescence_fragment:yd,bumpmap_pars_fragment:Md,clipping_planes_fragment:wd,clipping_planes_pars_fragment:bd,clipping_planes_pars_vertex:Sd,clipping_planes_vertex:Ed,color_fragment:Td,color_pars_fragment:Ad,color_pars_vertex:Cd,color_vertex:Rd,common:zd,cube_uv_reflection_fragment:Pd,defaultnormal_vertex:kd,displacementmap_pars_vertex:Id,displacementmap_vertex:Ld,emissivemap_fragment:Dd,emissivemap_pars_fragment:Ud,colorspace_fragment:Nd,colorspace_pars_fragment:Fd,envmap_fragment:Od,envmap_common_pars_fragment:Bd,envmap_pars_fragment:Hd,envmap_pars_vertex:Gd,envmap_physical_pars_fragment:Qd,envmap_vertex:Vd,fog_vertex:Wd,fog_pars_vertex:jd,fog_fragment:qd,fog_pars_fragment:Xd,gradientmap_pars_fragment:$d,lightmap_pars_fragment:Kd,lights_lambert_fragment:Yd,lights_lambert_pars_fragment:Zd,lights_pars_begin:Jd,lights_toon_fragment:tu,lights_toon_pars_fragment:eu,lights_phong_fragment:iu,lights_phong_pars_fragment:nu,lights_physical_fragment:su,lights_physical_pars_fragment:au,lights_fragment_begin:ou,lights_fragment_maps:ru,lights_fragment_end:cu,logdepthbuf_fragment:lu,logdepthbuf_pars_fragment:hu,logdepthbuf_pars_vertex:du,logdepthbuf_vertex:uu,map_fragment:fu,map_pars_fragment:pu,map_particle_fragment:mu,map_particle_pars_fragment:gu,metalnessmap_fragment:vu,metalnessmap_pars_fragment:_u,morphinstance_vertex:xu,morphcolor_vertex:yu,morphnormal_vertex:Mu,morphtarget_pars_vertex:wu,morphtarget_vertex:bu,normal_fragment_begin:Su,normal_fragment_maps:Eu,normal_pars_fragment:Tu,normal_pars_vertex:Au,normal_vertex:Cu,normalmap_pars_fragment:Ru,clearcoat_normal_fragment_begin:zu,clearcoat_normal_fragment_maps:Pu,clearcoat_pars_fragment:ku,iridescence_pars_fragment:Iu,opaque_fragment:Lu,packing:Du,premultiplied_alpha_fragment:Uu,project_vertex:Nu,dithering_fragment:Fu,dithering_pars_fragment:Ou,roughnessmap_fragment:Bu,roughnessmap_pars_fragment:Hu,shadowmap_pars_fragment:Gu,shadowmap_pars_vertex:Vu,shadowmap_vertex:Wu,shadowmask_pars_fragment:ju,skinbase_vertex:qu,skinning_pars_vertex:Xu,skinning_vertex:$u,skinnormal_vertex:Ku,specularmap_fragment:Yu,specularmap_pars_fragment:Zu,tonemapping_fragment:Ju,tonemapping_pars_fragment:Qu,transmission_fragment:tf,transmission_pars_fragment:ef,uv_pars_fragment:nf,uv_pars_vertex:sf,uv_vertex:af,worldpos_vertex:of,background_vert:rf,background_frag:cf,backgroundCube_vert:lf,backgroundCube_frag:hf,cube_vert:df,cube_frag:uf,depth_vert:ff,depth_frag:pf,distanceRGBA_vert:mf,distanceRGBA_frag:gf,equirect_vert:vf,equirect_frag:_f,linedashed_vert:xf,linedashed_frag:yf,meshbasic_vert:Mf,meshbasic_frag:wf,meshlambert_vert:bf,meshlambert_frag:Sf,meshmatcap_vert:Ef,meshmatcap_frag:Tf,meshnormal_vert:Af,meshnormal_frag:Cf,meshphong_vert:Rf,meshphong_frag:zf,meshphysical_vert:Pf,meshphysical_frag:kf,meshtoon_vert:If,meshtoon_frag:Lf,points_vert:Df,points_frag:Uf,shadow_vert:Nf,shadow_frag:Ff,sprite_vert:Of,sprite_frag:Bf},rt={common:{diffuse:{value:new st(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Gt}},envmap:{envMap:{value:null},envMapRotation:{value:new Gt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Gt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Gt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Gt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Gt},normalScale:{value:new Vt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Gt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Gt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Gt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Gt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new st(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new st(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0},uvTransform:{value:new Gt}},sprite:{diffuse:{value:new st(16777215)},opacity:{value:1},center:{value:new Vt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}}},wi={basic:{uniforms:Be([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.fog]),vertexShader:Ht.meshbasic_vert,fragmentShader:Ht.meshbasic_frag},lambert:{uniforms:Be([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,rt.lights,{emissive:{value:new st(0)}}]),vertexShader:Ht.meshlambert_vert,fragmentShader:Ht.meshlambert_frag},phong:{uniforms:Be([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,rt.lights,{emissive:{value:new st(0)},specular:{value:new st(1118481)},shininess:{value:30}}]),vertexShader:Ht.meshphong_vert,fragmentShader:Ht.meshphong_frag},standard:{uniforms:Be([rt.common,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.roughnessmap,rt.metalnessmap,rt.fog,rt.lights,{emissive:{value:new st(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ht.meshphysical_vert,fragmentShader:Ht.meshphysical_frag},toon:{uniforms:Be([rt.common,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.gradientmap,rt.fog,rt.lights,{emissive:{value:new st(0)}}]),vertexShader:Ht.meshtoon_vert,fragmentShader:Ht.meshtoon_frag},matcap:{uniforms:Be([rt.common,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,{matcap:{value:null}}]),vertexShader:Ht.meshmatcap_vert,fragmentShader:Ht.meshmatcap_frag},points:{uniforms:Be([rt.points,rt.fog]),vertexShader:Ht.points_vert,fragmentShader:Ht.points_frag},dashed:{uniforms:Be([rt.common,rt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ht.linedashed_vert,fragmentShader:Ht.linedashed_frag},depth:{uniforms:Be([rt.common,rt.displacementmap]),vertexShader:Ht.depth_vert,fragmentShader:Ht.depth_frag},normal:{uniforms:Be([rt.common,rt.bumpmap,rt.normalmap,rt.displacementmap,{opacity:{value:1}}]),vertexShader:Ht.meshnormal_vert,fragmentShader:Ht.meshnormal_frag},sprite:{uniforms:Be([rt.sprite,rt.fog]),vertexShader:Ht.sprite_vert,fragmentShader:Ht.sprite_frag},background:{uniforms:{uvTransform:{value:new Gt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ht.background_vert,fragmentShader:Ht.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Gt}},vertexShader:Ht.backgroundCube_vert,fragmentShader:Ht.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ht.cube_vert,fragmentShader:Ht.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ht.equirect_vert,fragmentShader:Ht.equirect_frag},distanceRGBA:{uniforms:Be([rt.common,rt.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ht.distanceRGBA_vert,fragmentShader:Ht.distanceRGBA_frag},shadow:{uniforms:Be([rt.lights,rt.fog,{color:{value:new st(0)},opacity:{value:1}}]),vertexShader:Ht.shadow_vert,fragmentShader:Ht.shadow_frag}};wi.physical={uniforms:Be([wi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Gt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Gt},clearcoatNormalScale:{value:new Vt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Gt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Gt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Gt},sheen:{value:0},sheenColor:{value:new st(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Gt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Gt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Gt},transmissionSamplerSize:{value:new Vt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Gt},attenuationDistance:{value:0},attenuationColor:{value:new st(0)},specularColor:{value:new st(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Gt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Gt},anisotropyVector:{value:new Vt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Gt}}]),vertexShader:Ht.meshphysical_vert,fragmentShader:Ht.meshphysical_frag};const Js={r:0,b:0,g:0},dn=new Mi,Hf=new ue;function Gf(a,t,e,i,n,s,o){const r=new st(0);let c=s===!0?0:1,l,h,d=null,u=0,f=null;function g(x){let y=x.isScene===!0?x.background:null;return y&&y.isTexture&&(y=(x.backgroundBlurriness>0?e:t).get(y)),y}function v(x){let y=!1;const b=g(x);b===null?m(r,c):b&&b.isColor&&(m(b,1),y=!0);const z=a.xr.getEnvironmentBlendMode();z==="additive"?i.buffers.color.setClear(0,0,0,1,o):z==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(a.autoClear||y)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),a.clear(a.autoClearColor,a.autoClearDepth,a.autoClearStencil))}function p(x,y){const b=g(y);b&&(b.isCubeTexture||b.mapping===ba)?(h===void 0&&(h=new yt(new hi(1,1,1),new sn({name:"BackgroundCubeMaterial",uniforms:es(wi.backgroundCube.uniforms),vertexShader:wi.backgroundCube.vertexShader,fragmentShader:wi.backgroundCube.fragmentShader,side:Xe,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(z,T,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(h)),dn.copy(y.backgroundRotation),dn.x*=-1,dn.y*=-1,dn.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(dn.y*=-1,dn.z*=-1),h.material.uniforms.envMap.value=b,h.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Hf.makeRotationFromEuler(dn)),h.material.toneMapped=oe.getTransfer(b.colorSpace)!==ve,(d!==b||u!==b.version||f!==a.toneMapping)&&(h.material.needsUpdate=!0,d=b,u=b.version,f=a.toneMapping),h.layers.enableAll(),x.unshift(h,h.geometry,h.material,0,0,null)):b&&b.isTexture&&(l===void 0&&(l=new yt(new Ea(2,2),new sn({name:"BackgroundMaterial",uniforms:es(wi.background.uniforms),vertexShader:wi.background.vertexShader,fragmentShader:wi.background.fragmentShader,side:Oi,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=b,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.toneMapped=oe.getTransfer(b.colorSpace)!==ve,b.matrixAutoUpdate===!0&&b.updateMatrix(),l.material.uniforms.uvTransform.value.copy(b.matrix),(d!==b||u!==b.version||f!==a.toneMapping)&&(l.material.needsUpdate=!0,d=b,u=b.version,f=a.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function m(x,y){x.getRGB(Js,wl(a)),i.buffers.color.setClear(Js.r,Js.g,Js.b,y,o)}return{getClearColor:function(){return r},setClearColor:function(x,y=1){r.set(x),c=y,m(r,c)},getClearAlpha:function(){return c},setClearAlpha:function(x){c=x,m(r,c)},render:v,addToRenderList:p}}function Vf(a,t){const e=a.getParameter(a.MAX_VERTEX_ATTRIBS),i={},n=u(null);let s=n,o=!1;function r(_,w,L,O,q){let Z=!1;const V=d(O,L,w);s!==V&&(s=V,l(s.object)),Z=f(_,O,L,q),Z&&g(_,O,L,q),q!==null&&t.update(q,a.ELEMENT_ARRAY_BUFFER),(Z||o)&&(o=!1,b(_,w,L,O),q!==null&&a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,t.get(q).buffer))}function c(){return a.createVertexArray()}function l(_){return a.bindVertexArray(_)}function h(_){return a.deleteVertexArray(_)}function d(_,w,L){const O=L.wireframe===!0;let q=i[_.id];q===void 0&&(q={},i[_.id]=q);let Z=q[w.id];Z===void 0&&(Z={},q[w.id]=Z);let V=Z[O];return V===void 0&&(V=u(c()),Z[O]=V),V}function u(_){const w=[],L=[],O=[];for(let q=0;q<e;q++)w[q]=0,L[q]=0,O[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:w,enabledAttributes:L,attributeDivisors:O,object:_,attributes:{},index:null}}function f(_,w,L,O){const q=s.attributes,Z=w.attributes;let V=0;const tt=L.getAttributes();for(const $ in tt)if(tt[$].location>=0){const mt=q[$];let St=Z[$];if(St===void 0&&($==="instanceMatrix"&&_.instanceMatrix&&(St=_.instanceMatrix),$==="instanceColor"&&_.instanceColor&&(St=_.instanceColor)),mt===void 0||mt.attribute!==St||St&&mt.data!==St.data)return!0;V++}return s.attributesNum!==V||s.index!==O}function g(_,w,L,O){const q={},Z=w.attributes;let V=0;const tt=L.getAttributes();for(const $ in tt)if(tt[$].location>=0){let mt=Z[$];mt===void 0&&($==="instanceMatrix"&&_.instanceMatrix&&(mt=_.instanceMatrix),$==="instanceColor"&&_.instanceColor&&(mt=_.instanceColor));const St={};St.attribute=mt,mt&&mt.data&&(St.data=mt.data),q[$]=St,V++}s.attributes=q,s.attributesNum=V,s.index=O}function v(){const _=s.newAttributes;for(let w=0,L=_.length;w<L;w++)_[w]=0}function p(_){m(_,0)}function m(_,w){const L=s.newAttributes,O=s.enabledAttributes,q=s.attributeDivisors;L[_]=1,O[_]===0&&(a.enableVertexAttribArray(_),O[_]=1),q[_]!==w&&(a.vertexAttribDivisor(_,w),q[_]=w)}function x(){const _=s.newAttributes,w=s.enabledAttributes;for(let L=0,O=w.length;L<O;L++)w[L]!==_[L]&&(a.disableVertexAttribArray(L),w[L]=0)}function y(_,w,L,O,q,Z,V){V===!0?a.vertexAttribIPointer(_,w,L,q,Z):a.vertexAttribPointer(_,w,L,O,q,Z)}function b(_,w,L,O){v();const q=O.attributes,Z=L.getAttributes(),V=w.defaultAttributeValues;for(const tt in Z){const $=Z[tt];if($.location>=0){let pt=q[tt];if(pt===void 0&&(tt==="instanceMatrix"&&_.instanceMatrix&&(pt=_.instanceMatrix),tt==="instanceColor"&&_.instanceColor&&(pt=_.instanceColor)),pt!==void 0){const mt=pt.normalized,St=pt.itemSize,te=t.get(pt);if(te===void 0)continue;const ce=te.buffer,K=te.type,it=te.bytesPerElement,wt=K===a.INT||K===a.UNSIGNED_INT||pt.gpuType===fr;if(pt.isInterleavedBufferAttribute){const gt=pt.data,Ft=gt.stride,zt=pt.offset;if(gt.isInstancedInterleavedBuffer){for(let $t=0;$t<$.locationSize;$t++)m($.location+$t,gt.meshPerAttribute);_.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=gt.meshPerAttribute*gt.count)}else for(let $t=0;$t<$.locationSize;$t++)p($.location+$t);a.bindBuffer(a.ARRAY_BUFFER,ce);for(let $t=0;$t<$.locationSize;$t++)y($.location+$t,St/$.locationSize,K,mt,Ft*it,(zt+St/$.locationSize*$t)*it,wt)}else{if(pt.isInstancedBufferAttribute){for(let gt=0;gt<$.locationSize;gt++)m($.location+gt,pt.meshPerAttribute);_.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=pt.meshPerAttribute*pt.count)}else for(let gt=0;gt<$.locationSize;gt++)p($.location+gt);a.bindBuffer(a.ARRAY_BUFFER,ce);for(let gt=0;gt<$.locationSize;gt++)y($.location+gt,St/$.locationSize,K,mt,St*it,St/$.locationSize*gt*it,wt)}}else if(V!==void 0){const mt=V[tt];if(mt!==void 0)switch(mt.length){case 2:a.vertexAttrib2fv($.location,mt);break;case 3:a.vertexAttrib3fv($.location,mt);break;case 4:a.vertexAttrib4fv($.location,mt);break;default:a.vertexAttrib1fv($.location,mt)}}}}x()}function z(){R();for(const _ in i){const w=i[_];for(const L in w){const O=w[L];for(const q in O)h(O[q].object),delete O[q];delete w[L]}delete i[_]}}function T(_){if(i[_.id]===void 0)return;const w=i[_.id];for(const L in w){const O=w[L];for(const q in O)h(O[q].object),delete O[q];delete w[L]}delete i[_.id]}function E(_){for(const w in i){const L=i[w];if(L[_.id]===void 0)continue;const O=L[_.id];for(const q in O)h(O[q].object),delete O[q];delete L[_.id]}}function R(){U(),o=!0,s!==n&&(s=n,l(s.object))}function U(){n.geometry=null,n.program=null,n.wireframe=!1}return{setup:r,reset:R,resetDefaultState:U,dispose:z,releaseStatesOfGeometry:T,releaseStatesOfProgram:E,initAttributes:v,enableAttribute:p,disableUnusedAttributes:x}}function Wf(a,t,e){let i;function n(l){i=l}function s(l,h){a.drawArrays(i,l,h),e.update(h,i,1)}function o(l,h,d){d!==0&&(a.drawArraysInstanced(i,l,h,d),e.update(h,i,d))}function r(l,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,h,0,d);let f=0;for(let g=0;g<d;g++)f+=h[g];e.update(f,i,1)}function c(l,h,d,u){if(d===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)o(l[g],h[g],u[g]);else{f.multiDrawArraysInstancedWEBGL(i,l,0,h,0,u,0,d);let g=0;for(let v=0;v<d;v++)g+=h[v];for(let v=0;v<u.length;v++)e.update(g,i,u[v])}}this.setMode=n,this.render=s,this.renderInstances=o,this.renderMultiDraw=r,this.renderMultiDrawInstances=c}function jf(a,t,e,i){let n;function s(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){const E=t.get("EXT_texture_filter_anisotropic");n=a.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function o(E){return!(E!==yi&&i.convert(E)!==a.getParameter(a.IMPLEMENTATION_COLOR_READ_FORMAT))}function r(E){const R=E===Cs&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(E!==Bi&&i.convert(E)!==a.getParameter(a.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==Si&&!R)}function c(E){if(E==="highp"){if(a.getShaderPrecisionFormat(a.VERTEX_SHADER,a.HIGH_FLOAT).precision>0&&a.getShaderPrecisionFormat(a.FRAGMENT_SHADER,a.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&a.getShaderPrecisionFormat(a.VERTEX_SHADER,a.MEDIUM_FLOAT).precision>0&&a.getShaderPrecisionFormat(a.FRAGMENT_SHADER,a.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const d=e.logarithmicDepthBuffer===!0,u=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control");if(u===!0){const E=t.get("EXT_clip_control");E.clipControlEXT(E.LOWER_LEFT_EXT,E.ZERO_TO_ONE_EXT)}const f=a.getParameter(a.MAX_TEXTURE_IMAGE_UNITS),g=a.getParameter(a.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=a.getParameter(a.MAX_TEXTURE_SIZE),p=a.getParameter(a.MAX_CUBE_MAP_TEXTURE_SIZE),m=a.getParameter(a.MAX_VERTEX_ATTRIBS),x=a.getParameter(a.MAX_VERTEX_UNIFORM_VECTORS),y=a.getParameter(a.MAX_VARYING_VECTORS),b=a.getParameter(a.MAX_FRAGMENT_UNIFORM_VECTORS),z=g>0,T=a.getParameter(a.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:r,precision:l,logarithmicDepthBuffer:d,reverseDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:x,maxVaryings:y,maxFragmentUniforms:b,vertexTextures:z,maxSamples:T}}function qf(a){const t=this;let e=null,i=0,n=!1,s=!1;const o=new pn,r=new Gt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||i!==0||n;return n=u,i=d.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){const g=d.clippingPlanes,v=d.clipIntersection,p=d.clipShadows,m=a.get(d);if(!n||g===null||g.length===0||s&&!p)s?h(null):l();else{const x=s?0:i,y=x*4;let b=m.clippingState||null;c.value=b,b=h(g,u,y,f);for(let z=0;z!==y;++z)b[z]=e[z];m.clippingState=b,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=x}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(d,u,f,g){const v=d!==null?d.length:0;let p=null;if(v!==0){if(p=c.value,g!==!0||p===null){const m=f+v*4,x=u.matrixWorldInverse;r.getNormalMatrix(x),(p===null||p.length<m)&&(p=new Float32Array(m));for(let y=0,b=f;y!==v;++y,b+=4)o.copy(d[y]).applyMatrix4(x,r),o.normal.toArray(p,b),p[b+3]=o.constant}c.value=p,c.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,p}}function Xf(a){let t=new WeakMap;function e(o,r){return r===ga?o.mapping=Zn:r===ko&&(o.mapping=Jn),o}function i(o){if(o&&o.isTexture){const r=o.mapping;if(r===ga||r===ko)if(t.has(o)){const c=t.get(o).texture;return e(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new nd(c.height);return l.fromEquirectangularTexture(a,o),t.set(o,l),o.addEventListener("dispose",n),e(l.texture,o.mapping)}else return null}}return o}function n(o){const r=o.target;r.removeEventListener("dispose",n);const c=t.get(r);c!==void 0&&(t.delete(r),c.dispose())}function s(){t=new WeakMap}return{get:i,dispose:s}}class Tl extends bl{constructor(t=-1,e=1,i=1,n=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=n,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,n,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=n,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2;let s=i-t,o=i+t,r=n+e,c=n-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,r-=h*this.view.offsetY,c=r-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,r,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const qn=4,rc=[.125,.215,.35,.446,.526,.582],vn=20,no=new Tl,cc=new st;let so=null,ao=0,oo=0,ro=!1;const mn=(1+Math.sqrt(5))/2,Fn=1/mn,lc=[new C(-mn,Fn,0),new C(mn,Fn,0),new C(-Fn,0,mn),new C(Fn,0,mn),new C(0,mn,-Fn),new C(0,mn,Fn),new C(-1,1,-1),new C(1,1,-1),new C(-1,1,1),new C(1,1,1)];class hc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,n=100){so=this._renderer.getRenderTarget(),ao=this._renderer.getActiveCubeFace(),oo=this._renderer.getActiveMipmapLevel(),ro=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,i,n,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=fc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=uc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(so,ao,oo),this._renderer.xr.enabled=ro,t.scissorTest=!1,Qs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Zn||t.mapping===Jn?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),so=this._renderer.getRenderTarget(),ao=this._renderer.getActiveCubeFace(),oo=this._renderer.getActiveMipmapLevel(),ro=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:ii,minFilter:ii,generateMipmaps:!1,type:Cs,format:yi,colorSpace:an,depthBuffer:!1},n=dc(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=dc(t,e,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=$f(s)),this._blurMaterial=Kf(s,t,e)}return n}_compileMaterial(t){const e=new yt(this._lodPlanes[0],t);this._renderer.compile(e,no)}_sceneToCubeUV(t,e,i,n){const r=new ei(90,1,e,i),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.toneMapping;h.getClearColor(cc),h.toneMapping=en,h.autoClear=!1;const f=new Ee({name:"PMREM.Background",side:Xe,depthWrite:!1,depthTest:!1}),g=new yt(new hi,f);let v=!1;const p=t.background;p?p.isColor&&(f.color.copy(p),t.background=null,v=!0):(f.color.copy(cc),v=!0);for(let m=0;m<6;m++){const x=m%3;x===0?(r.up.set(0,c[m],0),r.lookAt(l[m],0,0)):x===1?(r.up.set(0,0,c[m]),r.lookAt(0,l[m],0)):(r.up.set(0,c[m],0),r.lookAt(0,0,l[m]));const y=this._cubeSize;Qs(n,x*y,m>2?y:0,y,y),h.setRenderTarget(n),v&&h.render(g,r),h.render(t,r)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=u,h.autoClear=d,t.background=p}_textureToCubeUV(t,e){const i=this._renderer,n=t.mapping===Zn||t.mapping===Jn;n?(this._cubemapMaterial===null&&(this._cubemapMaterial=fc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=uc());const s=n?this._cubemapMaterial:this._equirectMaterial,o=new yt(this._lodPlanes[0],s),r=s.uniforms;r.envMap.value=t;const c=this._cubeSize;Qs(e,0,0,3*c,2*c),i.setRenderTarget(e),i.render(o,no)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const n=this._lodPlanes.length;for(let s=1;s<n;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),r=lc[(n-s-1)%lc.length];this._blur(t,s-1,s,o,r)}e.autoClear=i}_blur(t,e,i,n,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,n,"latitudinal",s),this._halfBlur(o,t,i,i,n,"longitudinal",s)}_halfBlur(t,e,i,n,s,o,r){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new yt(this._lodPlanes[n],l),u=l.uniforms,f=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*vn-1),v=s/g,p=isFinite(s)?1+Math.floor(h*v):vn;p>vn&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${vn}`);const m=[];let x=0;for(let E=0;E<vn;++E){const R=E/v,U=Math.exp(-R*R/2);m.push(U),E===0?x+=U:E<p&&(x+=2*U)}for(let E=0;E<m.length;E++)m[E]=m[E]/x;u.envMap.value=t.texture,u.samples.value=p,u.weights.value=m,u.latitudinal.value=o==="latitudinal",r&&(u.poleAxis.value=r);const{_lodMax:y}=this;u.dTheta.value=g,u.mipInt.value=y-i;const b=this._sizeLods[n],z=3*b*(n>y-qn?n-y+qn:0),T=4*(this._cubeSize-b);Qs(e,z,T,3*b,2*b),c.setRenderTarget(e),c.render(d,no)}}function $f(a){const t=[],e=[],i=[];let n=a;const s=a-qn+1+rc.length;for(let o=0;o<s;o++){const r=Math.pow(2,n);e.push(r);let c=1/r;o>a-qn?c=rc[o-a+qn-1]:o===0&&(c=0),i.push(c);const l=1/(r-2),h=-l,d=1+l,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,g=6,v=3,p=2,m=1,x=new Float32Array(v*g*f),y=new Float32Array(p*g*f),b=new Float32Array(m*g*f);for(let T=0;T<f;T++){const E=T%3*2/3-1,R=T>2?0:-1,U=[E,R,0,E+2/3,R,0,E+2/3,R+1,0,E,R,0,E+2/3,R+1,0,E,R+1,0];x.set(U,v*g*T),y.set(u,p*g*T);const _=[T,T,T,T,T,T];b.set(_,m*g*T)}const z=new Te;z.setAttribute("position",new Ae(x,v)),z.setAttribute("uv",new Ae(y,p)),z.setAttribute("faceIndex",new Ae(b,m)),t.push(z),n>qn&&n--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function dc(a,t,e){const i=new Mn(a,t,e);return i.texture.mapping=ba,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Qs(a,t,e,i,n){a.viewport.set(t,e,i,n),a.scissor.set(t,e,i,n)}function Kf(a,t,e){const i=new Float32Array(vn),n=new C(0,1,0);return new sn({name:"SphericalGaussianBlur",defines:{n:vn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${a}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:n}},vertexShader:br(),fragmentShader:`

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
		`,blending:tn,depthTest:!1,depthWrite:!1})}function uc(){return new sn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:br(),fragmentShader:`

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
		`,blending:tn,depthTest:!1,depthWrite:!1})}function fc(){return new sn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:br(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:tn,depthTest:!1,depthWrite:!1})}function br(){return`

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
	`}function Yf(a){let t=new WeakMap,e=null;function i(r){if(r&&r.isTexture){const c=r.mapping,l=c===ga||c===ko,h=c===Zn||c===Jn;if(l||h){let d=t.get(r);const u=d!==void 0?d.texture.pmremVersion:0;if(r.isRenderTargetTexture&&r.pmremVersion!==u)return e===null&&(e=new hc(a)),d=l?e.fromEquirectangular(r,d):e.fromCubemap(r,d),d.texture.pmremVersion=r.pmremVersion,t.set(r,d),d.texture;if(d!==void 0)return d.texture;{const f=r.image;return l&&f&&f.height>0||h&&f&&n(f)?(e===null&&(e=new hc(a)),d=l?e.fromEquirectangular(r):e.fromCubemap(r),d.texture.pmremVersion=r.pmremVersion,t.set(r,d),r.addEventListener("dispose",s),d.texture):null}}}return r}function n(r){let c=0;const l=6;for(let h=0;h<l;h++)r[h]!==void 0&&c++;return c===l}function s(r){const c=r.target;c.removeEventListener("dispose",s);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function Zf(a){const t={};function e(i){if(t[i]!==void 0)return t[i];let n;switch(i){case"WEBGL_depth_texture":n=a.getExtension("WEBGL_depth_texture")||a.getExtension("MOZ_WEBGL_depth_texture")||a.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":n=a.getExtension("EXT_texture_filter_anisotropic")||a.getExtension("MOZ_EXT_texture_filter_anisotropic")||a.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":n=a.getExtension("WEBGL_compressed_texture_s3tc")||a.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||a.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":n=a.getExtension("WEBGL_compressed_texture_pvrtc")||a.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:n=a.getExtension(i)}return t[i]=n,n}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const n=e(i);return n===null&&pa("THREE.WebGLRenderer: "+i+" extension not supported."),n}}}function Jf(a,t,e,i){const n={},s=new WeakMap;function o(d){const u=d.target;u.index!==null&&t.remove(u.index);for(const g in u.attributes)t.remove(u.attributes[g]);for(const g in u.morphAttributes){const v=u.morphAttributes[g];for(let p=0,m=v.length;p<m;p++)t.remove(v[p])}u.removeEventListener("dispose",o),delete n[u.id];const f=s.get(u);f&&(t.remove(f),s.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function r(d,u){return n[u.id]===!0||(u.addEventListener("dispose",o),n[u.id]=!0,e.memory.geometries++),u}function c(d){const u=d.attributes;for(const g in u)t.update(u[g],a.ARRAY_BUFFER);const f=d.morphAttributes;for(const g in f){const v=f[g];for(let p=0,m=v.length;p<m;p++)t.update(v[p],a.ARRAY_BUFFER)}}function l(d){const u=[],f=d.index,g=d.attributes.position;let v=0;if(f!==null){const x=f.array;v=f.version;for(let y=0,b=x.length;y<b;y+=3){const z=x[y+0],T=x[y+1],E=x[y+2];u.push(z,T,T,E,E,z)}}else if(g!==void 0){const x=g.array;v=g.version;for(let y=0,b=x.length/3-1;y<b;y+=3){const z=y+0,T=y+1,E=y+2;u.push(z,T,T,E,E,z)}}else return;const p=new(pl(u)?Ml:yl)(u,1);p.version=v;const m=s.get(d);m&&t.remove(m),s.set(d,p)}function h(d){const u=s.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&l(d)}else l(d);return s.get(d)}return{get:r,update:c,getWireframeAttribute:h}}function Qf(a,t,e){let i;function n(u){i=u}let s,o;function r(u){s=u.type,o=u.bytesPerElement}function c(u,f){a.drawElements(i,f,s,u*o),e.update(f,i,1)}function l(u,f,g){g!==0&&(a.drawElementsInstanced(i,f,s,u*o,g),e.update(f,i,g))}function h(u,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,s,u,0,g);let p=0;for(let m=0;m<g;m++)p+=f[m];e.update(p,i,1)}function d(u,f,g,v){if(g===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<u.length;m++)l(u[m]/o,f[m],v[m]);else{p.multiDrawElementsInstancedWEBGL(i,f,0,s,u,0,v,0,g);let m=0;for(let x=0;x<g;x++)m+=f[x];for(let x=0;x<v.length;x++)e.update(m,i,v[x])}}this.setMode=n,this.setIndex=r,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function tp(a){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,r){switch(e.calls++,o){case a.TRIANGLES:e.triangles+=r*(s/3);break;case a.LINES:e.lines+=r*(s/2);break;case a.LINE_STRIP:e.lines+=r*(s-1);break;case a.LINE_LOOP:e.lines+=r*s;break;case a.POINTS:e.points+=r*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function n(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:n,update:i}}function ep(a,t,e){const i=new WeakMap,n=new de;function s(o,r,c){const l=o.morphTargetInfluences,h=r.morphAttributes.position||r.morphAttributes.normal||r.morphAttributes.color,d=h!==void 0?h.length:0;let u=i.get(r);if(u===void 0||u.count!==d){let _=function(){R.dispose(),i.delete(r),r.removeEventListener("dispose",_)};var f=_;u!==void 0&&u.texture.dispose();const g=r.morphAttributes.position!==void 0,v=r.morphAttributes.normal!==void 0,p=r.morphAttributes.color!==void 0,m=r.morphAttributes.position||[],x=r.morphAttributes.normal||[],y=r.morphAttributes.color||[];let b=0;g===!0&&(b=1),v===!0&&(b=2),p===!0&&(b=3);let z=r.attributes.position.count*b,T=1;z>t.maxTextureSize&&(T=Math.ceil(z/t.maxTextureSize),z=t.maxTextureSize);const E=new Float32Array(z*T*4*d),R=new gl(E,z,T,d);R.type=Si,R.needsUpdate=!0;const U=b*4;for(let w=0;w<d;w++){const L=m[w],O=x[w],q=y[w],Z=z*T*4*w;for(let V=0;V<L.count;V++){const tt=V*U;g===!0&&(n.fromBufferAttribute(L,V),E[Z+tt+0]=n.x,E[Z+tt+1]=n.y,E[Z+tt+2]=n.z,E[Z+tt+3]=0),v===!0&&(n.fromBufferAttribute(O,V),E[Z+tt+4]=n.x,E[Z+tt+5]=n.y,E[Z+tt+6]=n.z,E[Z+tt+7]=0),p===!0&&(n.fromBufferAttribute(q,V),E[Z+tt+8]=n.x,E[Z+tt+9]=n.y,E[Z+tt+10]=n.z,E[Z+tt+11]=q.itemSize===4?n.w:1)}}u={count:d,texture:R,size:new Vt(z,T)},i.set(r,u),r.addEventListener("dispose",_)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(a,"morphTexture",o.morphTexture,e);else{let g=0;for(let p=0;p<l.length;p++)g+=l[p];const v=r.morphTargetsRelative?1:1-g;c.getUniforms().setValue(a,"morphTargetBaseInfluence",v),c.getUniforms().setValue(a,"morphTargetInfluences",l)}c.getUniforms().setValue(a,"morphTargetsTexture",u.texture,e),c.getUniforms().setValue(a,"morphTargetsTextureSize",u.size)}return{update:s}}function ip(a,t,e,i){let n=new WeakMap;function s(c){const l=i.render.frame,h=c.geometry,d=t.get(c,h);if(n.get(d)!==l&&(t.update(d),n.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",r)===!1&&c.addEventListener("dispose",r),n.get(c)!==l&&(e.update(c.instanceMatrix,a.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,a.ARRAY_BUFFER),n.set(c,l))),c.isSkinnedMesh){const u=c.skeleton;n.get(u)!==l&&(u.update(),n.set(u,l))}return d}function o(){n=new WeakMap}function r(c){const l=c.target;l.removeEventListener("dispose",r),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:s,dispose:o}}class Al extends Oe{constructor(t,e,i,n,s,o,r,c,l,h=$n){if(h!==$n&&h!==ts)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===$n&&(i=yn),i===void 0&&h===ts&&(i=Qn),super(null,n,s,o,r,c,h,i,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=r!==void 0?r:qe,this.minFilter=c!==void 0?c:qe,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Cl=new Oe,pc=new Al(1,1),Rl=new gl,zl=new Hh,Pl=new Sl,mc=[],gc=[],vc=new Float32Array(16),_c=new Float32Array(9),xc=new Float32Array(4);function ss(a,t,e){const i=a[0];if(i<=0||i>0)return a;const n=t*e;let s=mc[n];if(s===void 0&&(s=new Float32Array(n),mc[n]=s),t!==0){i.toArray(s,0);for(let o=1,r=0;o!==t;++o)r+=e,a[o].toArray(s,r)}return s}function Re(a,t){if(a.length!==t.length)return!1;for(let e=0,i=a.length;e<i;e++)if(a[e]!==t[e])return!1;return!0}function ze(a,t){for(let e=0,i=t.length;e<i;e++)a[e]=t[e]}function Ta(a,t){let e=gc[t];e===void 0&&(e=new Int32Array(t),gc[t]=e);for(let i=0;i!==t;++i)e[i]=a.allocateTextureUnit();return e}function np(a,t){const e=this.cache;e[0]!==t&&(a.uniform1f(this.addr,t),e[0]=t)}function sp(a,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(a.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;a.uniform2fv(this.addr,t),ze(e,t)}}function ap(a,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(a.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(a.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Re(e,t))return;a.uniform3fv(this.addr,t),ze(e,t)}}function op(a,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(a.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;a.uniform4fv(this.addr,t),ze(e,t)}}function rp(a,t){const e=this.cache,i=t.elements;if(i===void 0){if(Re(e,t))return;a.uniformMatrix2fv(this.addr,!1,t),ze(e,t)}else{if(Re(e,i))return;xc.set(i),a.uniformMatrix2fv(this.addr,!1,xc),ze(e,i)}}function cp(a,t){const e=this.cache,i=t.elements;if(i===void 0){if(Re(e,t))return;a.uniformMatrix3fv(this.addr,!1,t),ze(e,t)}else{if(Re(e,i))return;_c.set(i),a.uniformMatrix3fv(this.addr,!1,_c),ze(e,i)}}function lp(a,t){const e=this.cache,i=t.elements;if(i===void 0){if(Re(e,t))return;a.uniformMatrix4fv(this.addr,!1,t),ze(e,t)}else{if(Re(e,i))return;vc.set(i),a.uniformMatrix4fv(this.addr,!1,vc),ze(e,i)}}function hp(a,t){const e=this.cache;e[0]!==t&&(a.uniform1i(this.addr,t),e[0]=t)}function dp(a,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(a.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;a.uniform2iv(this.addr,t),ze(e,t)}}function up(a,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(a.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Re(e,t))return;a.uniform3iv(this.addr,t),ze(e,t)}}function fp(a,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(a.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;a.uniform4iv(this.addr,t),ze(e,t)}}function pp(a,t){const e=this.cache;e[0]!==t&&(a.uniform1ui(this.addr,t),e[0]=t)}function mp(a,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(a.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;a.uniform2uiv(this.addr,t),ze(e,t)}}function gp(a,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(a.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Re(e,t))return;a.uniform3uiv(this.addr,t),ze(e,t)}}function vp(a,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(a.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;a.uniform4uiv(this.addr,t),ze(e,t)}}function _p(a,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(a.uniform1i(this.addr,n),i[0]=n);let s;this.type===a.SAMPLER_2D_SHADOW?(pc.compareFunction=fl,s=pc):s=Cl,e.setTexture2D(t||s,n)}function xp(a,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(a.uniform1i(this.addr,n),i[0]=n),e.setTexture3D(t||zl,n)}function yp(a,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(a.uniform1i(this.addr,n),i[0]=n),e.setTextureCube(t||Pl,n)}function Mp(a,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(a.uniform1i(this.addr,n),i[0]=n),e.setTexture2DArray(t||Rl,n)}function wp(a){switch(a){case 5126:return np;case 35664:return sp;case 35665:return ap;case 35666:return op;case 35674:return rp;case 35675:return cp;case 35676:return lp;case 5124:case 35670:return hp;case 35667:case 35671:return dp;case 35668:case 35672:return up;case 35669:case 35673:return fp;case 5125:return pp;case 36294:return mp;case 36295:return gp;case 36296:return vp;case 35678:case 36198:case 36298:case 36306:case 35682:return _p;case 35679:case 36299:case 36307:return xp;case 35680:case 36300:case 36308:case 36293:return yp;case 36289:case 36303:case 36311:case 36292:return Mp}}function bp(a,t){a.uniform1fv(this.addr,t)}function Sp(a,t){const e=ss(t,this.size,2);a.uniform2fv(this.addr,e)}function Ep(a,t){const e=ss(t,this.size,3);a.uniform3fv(this.addr,e)}function Tp(a,t){const e=ss(t,this.size,4);a.uniform4fv(this.addr,e)}function Ap(a,t){const e=ss(t,this.size,4);a.uniformMatrix2fv(this.addr,!1,e)}function Cp(a,t){const e=ss(t,this.size,9);a.uniformMatrix3fv(this.addr,!1,e)}function Rp(a,t){const e=ss(t,this.size,16);a.uniformMatrix4fv(this.addr,!1,e)}function zp(a,t){a.uniform1iv(this.addr,t)}function Pp(a,t){a.uniform2iv(this.addr,t)}function kp(a,t){a.uniform3iv(this.addr,t)}function Ip(a,t){a.uniform4iv(this.addr,t)}function Lp(a,t){a.uniform1uiv(this.addr,t)}function Dp(a,t){a.uniform2uiv(this.addr,t)}function Up(a,t){a.uniform3uiv(this.addr,t)}function Np(a,t){a.uniform4uiv(this.addr,t)}function Fp(a,t,e){const i=this.cache,n=t.length,s=Ta(e,n);Re(i,s)||(a.uniform1iv(this.addr,s),ze(i,s));for(let o=0;o!==n;++o)e.setTexture2D(t[o]||Cl,s[o])}function Op(a,t,e){const i=this.cache,n=t.length,s=Ta(e,n);Re(i,s)||(a.uniform1iv(this.addr,s),ze(i,s));for(let o=0;o!==n;++o)e.setTexture3D(t[o]||zl,s[o])}function Bp(a,t,e){const i=this.cache,n=t.length,s=Ta(e,n);Re(i,s)||(a.uniform1iv(this.addr,s),ze(i,s));for(let o=0;o!==n;++o)e.setTextureCube(t[o]||Pl,s[o])}function Hp(a,t,e){const i=this.cache,n=t.length,s=Ta(e,n);Re(i,s)||(a.uniform1iv(this.addr,s),ze(i,s));for(let o=0;o!==n;++o)e.setTexture2DArray(t[o]||Rl,s[o])}function Gp(a){switch(a){case 5126:return bp;case 35664:return Sp;case 35665:return Ep;case 35666:return Tp;case 35674:return Ap;case 35675:return Cp;case 35676:return Rp;case 5124:case 35670:return zp;case 35667:case 35671:return Pp;case 35668:case 35672:return kp;case 35669:case 35673:return Ip;case 5125:return Lp;case 36294:return Dp;case 36295:return Up;case 36296:return Np;case 35678:case 36198:case 36298:case 36306:case 35682:return Fp;case 35679:case 36299:case 36307:return Op;case 35680:case 36300:case 36308:case 36293:return Bp;case 36289:case 36303:case 36311:case 36292:return Hp}}class Vp{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=wp(e.type)}}class Wp{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Gp(e.type)}}class jp{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const n=this.seq;for(let s=0,o=n.length;s!==o;++s){const r=n[s];r.setValue(t,e[r.id],i)}}}const co=/(\w+)(\])?(\[|\.)?/g;function yc(a,t){a.seq.push(t),a.map[t.id]=t}function qp(a,t,e){const i=a.name,n=i.length;for(co.lastIndex=0;;){const s=co.exec(i),o=co.lastIndex;let r=s[1];const c=s[2]==="]",l=s[3];if(c&&(r=r|0),l===void 0||l==="["&&o+2===n){yc(e,l===void 0?new Vp(r,a,t):new Wp(r,a,t));break}else{let d=e.map[r];d===void 0&&(d=new jp(r),yc(e,d)),e=d}}}class ma{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let n=0;n<i;++n){const s=t.getActiveUniform(e,n),o=t.getUniformLocation(e,s.name);qp(s,o,this)}}setValue(t,e,i,n){const s=this.map[e];s!==void 0&&s.setValue(t,i,n)}setOptional(t,e,i){const n=e[i];n!==void 0&&this.setValue(t,i,n)}static upload(t,e,i,n){for(let s=0,o=e.length;s!==o;++s){const r=e[s],c=i[r.id];c.needsUpdate!==!1&&r.setValue(t,c.value,n)}}static seqWithValue(t,e){const i=[];for(let n=0,s=t.length;n!==s;++n){const o=t[n];o.id in e&&i.push(o)}return i}}function Mc(a,t,e){const i=a.createShader(t);return a.shaderSource(i,e),a.compileShader(i),i}const Xp=37297;let $p=0;function Kp(a,t){const e=a.split(`
`),i=[],n=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=n;o<s;o++){const r=o+1;i.push(`${r===t?">":" "} ${r}: ${e[o]}`)}return i.join(`
`)}function Yp(a){const t=oe.getPrimaries(oe.workingColorSpace),e=oe.getPrimaries(a);let i;switch(t===e?i="":t===xa&&e===_a?i="LinearDisplayP3ToLinearSRGB":t===_a&&e===xa&&(i="LinearSRGBToLinearDisplayP3"),a){case an:case Sa:return[i,"LinearTransferOETF"];case ti:case Mr:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",a),[i,"LinearTransferOETF"]}}function wc(a,t,e){const i=a.getShaderParameter(t,a.COMPILE_STATUS),n=a.getShaderInfoLog(t).trim();if(i&&n==="")return"";const s=/ERROR: 0:(\d+)/.exec(n);if(s){const o=parseInt(s[1]);return e.toUpperCase()+`

`+n+`

`+Kp(a.getShaderSource(t),o)}else return n}function Zp(a,t){const e=Yp(t);return`vec4 ${a}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function Jp(a,t){let e;switch(t){case ph:e="Linear";break;case mh:e="Reinhard";break;case gh:e="Cineon";break;case il:e="ACESFilmic";break;case _h:e="AgX";break;case xh:e="Neutral";break;case vh:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+a+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const ta=new C;function Qp(){oe.getLuminanceCoefficients(ta);const a=ta.x.toFixed(4),t=ta.y.toFixed(4),e=ta.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${a}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function tm(a){return[a.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",a.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ys).join(`
`)}function em(a){const t=[];for(const e in a){const i=a[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function im(a,t){const e={},i=a.getProgramParameter(t,a.ACTIVE_ATTRIBUTES);for(let n=0;n<i;n++){const s=a.getActiveAttrib(t,n),o=s.name;let r=1;s.type===a.FLOAT_MAT2&&(r=2),s.type===a.FLOAT_MAT3&&(r=3),s.type===a.FLOAT_MAT4&&(r=4),e[o]={type:s.type,location:a.getAttribLocation(t,o),locationSize:r}}return e}function ys(a){return a!==""}function bc(a,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return a.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Sc(a,t){return a.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const nm=/^[ \t]*#include +<([\w\d./]+)>/gm;function rr(a){return a.replace(nm,am)}const sm=new Map;function am(a,t){let e=Ht[t];if(e===void 0){const i=sm.get(t);if(i!==void 0)e=Ht[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return rr(e)}const om=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ec(a){return a.replace(om,rm)}function rm(a,t,e,i){let n="";for(let s=parseInt(t);s<parseInt(e);s++)n+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return n}function Tc(a){let t=`precision ${a.precision} float;
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
#define LOW_PRECISION`),t}function cm(a){let t="SHADOWMAP_TYPE_BASIC";return a.shadowMapType===tl?t="SHADOWMAP_TYPE_PCF":a.shadowMapType===el?t="SHADOWMAP_TYPE_PCF_SOFT":a.shadowMapType===Li&&(t="SHADOWMAP_TYPE_VSM"),t}function lm(a){let t="ENVMAP_TYPE_CUBE";if(a.envMap)switch(a.envMapMode){case Zn:case Jn:t="ENVMAP_TYPE_CUBE";break;case ba:t="ENVMAP_TYPE_CUBE_UV";break}return t}function hm(a){let t="ENVMAP_MODE_REFLECTION";if(a.envMap)switch(a.envMapMode){case Jn:t="ENVMAP_MODE_REFRACTION";break}return t}function dm(a){let t="ENVMAP_BLENDING_NONE";if(a.envMap)switch(a.combine){case ur:t="ENVMAP_BLENDING_MULTIPLY";break;case uh:t="ENVMAP_BLENDING_MIX";break;case fh:t="ENVMAP_BLENDING_ADD";break}return t}function um(a){const t=a.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:i,maxMip:e}}function fm(a,t,e,i){const n=a.getContext(),s=e.defines;let o=e.vertexShader,r=e.fragmentShader;const c=cm(e),l=lm(e),h=hm(e),d=dm(e),u=um(e),f=tm(e),g=em(s),v=n.createProgram();let p,m,x=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ys).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ys).join(`
`),m.length>0&&(m+=`
`)):(p=[Tc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ys).join(`
`),m=[Tc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==en?"#define TONE_MAPPING":"",e.toneMapping!==en?Ht.tonemapping_pars_fragment:"",e.toneMapping!==en?Jp("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ht.colorspace_pars_fragment,Zp("linearToOutputTexel",e.outputColorSpace),Qp(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ys).join(`
`)),o=rr(o),o=bc(o,e),o=Sc(o,e),r=rr(r),r=bc(r,e),r=Sc(r,e),o=Ec(o),r=Ec(r),e.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",e.glslVersion===Vr?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Vr?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const y=x+p+o,b=x+m+r,z=Mc(n,n.VERTEX_SHADER,y),T=Mc(n,n.FRAGMENT_SHADER,b);n.attachShader(v,z),n.attachShader(v,T),e.index0AttributeName!==void 0?n.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&n.bindAttribLocation(v,0,"position"),n.linkProgram(v);function E(w){if(a.debug.checkShaderErrors){const L=n.getProgramInfoLog(v).trim(),O=n.getShaderInfoLog(z).trim(),q=n.getShaderInfoLog(T).trim();let Z=!0,V=!0;if(n.getProgramParameter(v,n.LINK_STATUS)===!1)if(Z=!1,typeof a.debug.onShaderError=="function")a.debug.onShaderError(n,v,z,T);else{const tt=wc(n,z,"vertex"),$=wc(n,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+n.getError()+" - VALIDATE_STATUS "+n.getProgramParameter(v,n.VALIDATE_STATUS)+`

Material Name: `+w.name+`
Material Type: `+w.type+`

Program Info Log: `+L+`
`+tt+`
`+$)}else L!==""?console.warn("THREE.WebGLProgram: Program Info Log:",L):(O===""||q==="")&&(V=!1);V&&(w.diagnostics={runnable:Z,programLog:L,vertexShader:{log:O,prefix:p},fragmentShader:{log:q,prefix:m}})}n.deleteShader(z),n.deleteShader(T),R=new ma(n,v),U=im(n,v)}let R;this.getUniforms=function(){return R===void 0&&E(this),R};let U;this.getAttributes=function(){return U===void 0&&E(this),U};let _=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return _===!1&&(_=n.getProgramParameter(v,Xp)),_},this.destroy=function(){i.releaseStatesOfProgram(this),n.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=$p++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=z,this.fragmentShader=T,this}let pm=0;class mm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,n=this._getShaderStage(e),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(n)===!1&&(o.add(n),n.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new gm(t),e.set(t,i)),i}}class gm{constructor(t){this.id=pm++,this.code=t,this.usedTimes=0}}function vm(a,t,e,i,n,s,o){const r=new _l,c=new mm,l=new Set,h=[],d=n.logarithmicDepthBuffer,u=n.reverseDepthBuffer,f=n.vertexTextures;let g=n.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(_){return l.add(_),_===0?"uv":`uv${_}`}function m(_,w,L,O,q){const Z=O.fog,V=q.geometry,tt=_.isMeshStandardMaterial?O.environment:null,$=(_.isMeshStandardMaterial?e:t).get(_.envMap||tt),pt=$&&$.mapping===ba?$.image.height:null,mt=v[_.type];_.precision!==null&&(g=n.getMaxPrecision(_.precision),g!==_.precision&&console.warn("THREE.WebGLProgram.getParameters:",_.precision,"not supported, using",g,"instead."));const St=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,te=St!==void 0?St.length:0;let ce=0;V.morphAttributes.position!==void 0&&(ce=1),V.morphAttributes.normal!==void 0&&(ce=2),V.morphAttributes.color!==void 0&&(ce=3);let K,it,wt,gt;if(mt){const Ge=wi[mt];K=Ge.vertexShader,it=Ge.fragmentShader}else K=_.vertexShader,it=_.fragmentShader,c.update(_),wt=c.getVertexShaderID(_),gt=c.getFragmentShaderID(_);const Ft=a.getRenderTarget(),zt=q.isInstancedMesh===!0,$t=q.isBatchedMesh===!0,he=!!_.map,Kt=!!_.matcap,P=!!$,$e=!!_.aoMap,jt=!!_.lightMap,Jt=!!_.bumpMap,It=!!_.normalMap,me=!!_.displacementMap,Nt=!!_.emissiveMap,A=!!_.metalnessMap,M=!!_.roughnessMap,N=_.anisotropy>0,J=_.clearcoat>0,et=_.dispersion>0,Y=_.iridescence>0,Et=_.sheen>0,lt=_.transmission>0,vt=N&&!!_.anisotropyMap,Qt=J&&!!_.clearcoatMap,at=J&&!!_.clearcoatNormalMap,_t=J&&!!_.clearcoatRoughnessMap,Lt=Y&&!!_.iridescenceMap,Dt=Y&&!!_.iridescenceThicknessMap,xt=Et&&!!_.sheenColorMap,qt=Et&&!!_.sheenRoughnessMap,Ot=!!_.specularMap,pe=!!_.specularColorMap,k=!!_.specularIntensityMap,ut=lt&&!!_.transmissionMap,W=lt&&!!_.thicknessMap,Q=!!_.gradientMap,ht=!!_.alphaMap,ft=_.alphaTest>0,Yt=!!_.alphaHash,we=!!_.extensions;let He=en;_.toneMapped&&(Ft===null||Ft.isXRRenderTarget===!0)&&(He=a.toneMapping);const ee={shaderID:mt,shaderType:_.type,shaderName:_.name,vertexShader:K,fragmentShader:it,defines:_.defines,customVertexShaderID:wt,customFragmentShaderID:gt,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:g,batching:$t,batchingColor:$t&&q._colorsTexture!==null,instancing:zt,instancingColor:zt&&q.instanceColor!==null,instancingMorph:zt&&q.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:Ft===null?a.outputColorSpace:Ft.isXRRenderTarget===!0?Ft.texture.colorSpace:an,alphaToCoverage:!!_.alphaToCoverage,map:he,matcap:Kt,envMap:P,envMapMode:P&&$.mapping,envMapCubeUVHeight:pt,aoMap:$e,lightMap:jt,bumpMap:Jt,normalMap:It,displacementMap:f&&me,emissiveMap:Nt,normalMapObjectSpace:It&&_.normalMapType===bh,normalMapTangentSpace:It&&_.normalMapType===yr,metalnessMap:A,roughnessMap:M,anisotropy:N,anisotropyMap:vt,clearcoat:J,clearcoatMap:Qt,clearcoatNormalMap:at,clearcoatRoughnessMap:_t,dispersion:et,iridescence:Y,iridescenceMap:Lt,iridescenceThicknessMap:Dt,sheen:Et,sheenColorMap:xt,sheenRoughnessMap:qt,specularMap:Ot,specularColorMap:pe,specularIntensityMap:k,transmission:lt,transmissionMap:ut,thicknessMap:W,gradientMap:Q,opaque:_.transparent===!1&&_.blending===Xn&&_.alphaToCoverage===!1,alphaMap:ht,alphaTest:ft,alphaHash:Yt,combine:_.combine,mapUv:he&&p(_.map.channel),aoMapUv:$e&&p(_.aoMap.channel),lightMapUv:jt&&p(_.lightMap.channel),bumpMapUv:Jt&&p(_.bumpMap.channel),normalMapUv:It&&p(_.normalMap.channel),displacementMapUv:me&&p(_.displacementMap.channel),emissiveMapUv:Nt&&p(_.emissiveMap.channel),metalnessMapUv:A&&p(_.metalnessMap.channel),roughnessMapUv:M&&p(_.roughnessMap.channel),anisotropyMapUv:vt&&p(_.anisotropyMap.channel),clearcoatMapUv:Qt&&p(_.clearcoatMap.channel),clearcoatNormalMapUv:at&&p(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:_t&&p(_.clearcoatRoughnessMap.channel),iridescenceMapUv:Lt&&p(_.iridescenceMap.channel),iridescenceThicknessMapUv:Dt&&p(_.iridescenceThicknessMap.channel),sheenColorMapUv:xt&&p(_.sheenColorMap.channel),sheenRoughnessMapUv:qt&&p(_.sheenRoughnessMap.channel),specularMapUv:Ot&&p(_.specularMap.channel),specularColorMapUv:pe&&p(_.specularColorMap.channel),specularIntensityMapUv:k&&p(_.specularIntensityMap.channel),transmissionMapUv:ut&&p(_.transmissionMap.channel),thicknessMapUv:W&&p(_.thicknessMap.channel),alphaMapUv:ht&&p(_.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(It||N),vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:q.isPoints===!0&&!!V.attributes.uv&&(he||ht),fog:!!Z,useFog:_.fog===!0,fogExp2:!!Z&&Z.isFogExp2,flatShading:_.flatShading===!0,sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:u,skinning:q.isSkinnedMesh===!0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:te,morphTextureStride:ce,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:_.dithering,shadowMapEnabled:a.shadowMap.enabled&&L.length>0,shadowMapType:a.shadowMap.type,toneMapping:He,decodeVideoTexture:he&&_.map.isVideoTexture===!0&&oe.getTransfer(_.map.colorSpace)===ve,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===Se,flipSided:_.side===Xe,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:we&&_.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(we&&_.extensions.multiDraw===!0||$t)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return ee.vertexUv1s=l.has(1),ee.vertexUv2s=l.has(2),ee.vertexUv3s=l.has(3),l.clear(),ee}function x(_){const w=[];if(_.shaderID?w.push(_.shaderID):(w.push(_.customVertexShaderID),w.push(_.customFragmentShaderID)),_.defines!==void 0)for(const L in _.defines)w.push(L),w.push(_.defines[L]);return _.isRawShaderMaterial===!1&&(y(w,_),b(w,_),w.push(a.outputColorSpace)),w.push(_.customProgramCacheKey),w.join()}function y(_,w){_.push(w.precision),_.push(w.outputColorSpace),_.push(w.envMapMode),_.push(w.envMapCubeUVHeight),_.push(w.mapUv),_.push(w.alphaMapUv),_.push(w.lightMapUv),_.push(w.aoMapUv),_.push(w.bumpMapUv),_.push(w.normalMapUv),_.push(w.displacementMapUv),_.push(w.emissiveMapUv),_.push(w.metalnessMapUv),_.push(w.roughnessMapUv),_.push(w.anisotropyMapUv),_.push(w.clearcoatMapUv),_.push(w.clearcoatNormalMapUv),_.push(w.clearcoatRoughnessMapUv),_.push(w.iridescenceMapUv),_.push(w.iridescenceThicknessMapUv),_.push(w.sheenColorMapUv),_.push(w.sheenRoughnessMapUv),_.push(w.specularMapUv),_.push(w.specularColorMapUv),_.push(w.specularIntensityMapUv),_.push(w.transmissionMapUv),_.push(w.thicknessMapUv),_.push(w.combine),_.push(w.fogExp2),_.push(w.sizeAttenuation),_.push(w.morphTargetsCount),_.push(w.morphAttributeCount),_.push(w.numDirLights),_.push(w.numPointLights),_.push(w.numSpotLights),_.push(w.numSpotLightMaps),_.push(w.numHemiLights),_.push(w.numRectAreaLights),_.push(w.numDirLightShadows),_.push(w.numPointLightShadows),_.push(w.numSpotLightShadows),_.push(w.numSpotLightShadowsWithMaps),_.push(w.numLightProbes),_.push(w.shadowMapType),_.push(w.toneMapping),_.push(w.numClippingPlanes),_.push(w.numClipIntersection),_.push(w.depthPacking)}function b(_,w){r.disableAll(),w.supportsVertexTextures&&r.enable(0),w.instancing&&r.enable(1),w.instancingColor&&r.enable(2),w.instancingMorph&&r.enable(3),w.matcap&&r.enable(4),w.envMap&&r.enable(5),w.normalMapObjectSpace&&r.enable(6),w.normalMapTangentSpace&&r.enable(7),w.clearcoat&&r.enable(8),w.iridescence&&r.enable(9),w.alphaTest&&r.enable(10),w.vertexColors&&r.enable(11),w.vertexAlphas&&r.enable(12),w.vertexUv1s&&r.enable(13),w.vertexUv2s&&r.enable(14),w.vertexUv3s&&r.enable(15),w.vertexTangents&&r.enable(16),w.anisotropy&&r.enable(17),w.alphaHash&&r.enable(18),w.batching&&r.enable(19),w.dispersion&&r.enable(20),w.batchingColor&&r.enable(21),_.push(r.mask),r.disableAll(),w.fog&&r.enable(0),w.useFog&&r.enable(1),w.flatShading&&r.enable(2),w.logarithmicDepthBuffer&&r.enable(3),w.reverseDepthBuffer&&r.enable(4),w.skinning&&r.enable(5),w.morphTargets&&r.enable(6),w.morphNormals&&r.enable(7),w.morphColors&&r.enable(8),w.premultipliedAlpha&&r.enable(9),w.shadowMapEnabled&&r.enable(10),w.doubleSided&&r.enable(11),w.flipSided&&r.enable(12),w.useDepthPacking&&r.enable(13),w.dithering&&r.enable(14),w.transmission&&r.enable(15),w.sheen&&r.enable(16),w.opaque&&r.enable(17),w.pointsUvs&&r.enable(18),w.decodeVideoTexture&&r.enable(19),w.alphaToCoverage&&r.enable(20),_.push(r.mask)}function z(_){const w=v[_.type];let L;if(w){const O=wi[w];L=Qh.clone(O.uniforms)}else L=_.uniforms;return L}function T(_,w){let L;for(let O=0,q=h.length;O<q;O++){const Z=h[O];if(Z.cacheKey===w){L=Z,++L.usedTimes;break}}return L===void 0&&(L=new fm(a,w,_,s),h.push(L)),L}function E(_){if(--_.usedTimes===0){const w=h.indexOf(_);h[w]=h[h.length-1],h.pop(),_.destroy()}}function R(_){c.remove(_)}function U(){c.dispose()}return{getParameters:m,getProgramCacheKey:x,getUniforms:z,acquireProgram:T,releaseProgram:E,releaseShaderCache:R,programs:h,dispose:U}}function _m(){let a=new WeakMap;function t(o){return a.has(o)}function e(o){let r=a.get(o);return r===void 0&&(r={},a.set(o,r)),r}function i(o){a.delete(o)}function n(o,r,c){a.get(o)[r]=c}function s(){a=new WeakMap}return{has:t,get:e,remove:i,update:n,dispose:s}}function xm(a,t){return a.groupOrder!==t.groupOrder?a.groupOrder-t.groupOrder:a.renderOrder!==t.renderOrder?a.renderOrder-t.renderOrder:a.material.id!==t.material.id?a.material.id-t.material.id:a.z!==t.z?a.z-t.z:a.id-t.id}function Ac(a,t){return a.groupOrder!==t.groupOrder?a.groupOrder-t.groupOrder:a.renderOrder!==t.renderOrder?a.renderOrder-t.renderOrder:a.z!==t.z?t.z-a.z:a.id-t.id}function Cc(){const a=[];let t=0;const e=[],i=[],n=[];function s(){t=0,e.length=0,i.length=0,n.length=0}function o(d,u,f,g,v,p){let m=a[t];return m===void 0?(m={id:d.id,object:d,geometry:u,material:f,groupOrder:g,renderOrder:d.renderOrder,z:v,group:p},a[t]=m):(m.id=d.id,m.object=d,m.geometry=u,m.material=f,m.groupOrder=g,m.renderOrder=d.renderOrder,m.z=v,m.group=p),t++,m}function r(d,u,f,g,v,p){const m=o(d,u,f,g,v,p);f.transmission>0?i.push(m):f.transparent===!0?n.push(m):e.push(m)}function c(d,u,f,g,v,p){const m=o(d,u,f,g,v,p);f.transmission>0?i.unshift(m):f.transparent===!0?n.unshift(m):e.unshift(m)}function l(d,u){e.length>1&&e.sort(d||xm),i.length>1&&i.sort(u||Ac),n.length>1&&n.sort(u||Ac)}function h(){for(let d=t,u=a.length;d<u;d++){const f=a[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:i,transparent:n,init:s,push:r,unshift:c,finish:h,sort:l}}function ym(){let a=new WeakMap;function t(i,n){const s=a.get(i);let o;return s===void 0?(o=new Cc,a.set(i,[o])):n>=s.length?(o=new Cc,s.push(o)):o=s[n],o}function e(){a=new WeakMap}return{get:t,dispose:e}}function Mm(){const a={};return{get:function(t){if(a[t.id]!==void 0)return a[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new C,color:new st};break;case"SpotLight":e={position:new C,direction:new C,color:new st,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new C,color:new st,distance:0,decay:0};break;case"HemisphereLight":e={direction:new C,skyColor:new st,groundColor:new st};break;case"RectAreaLight":e={color:new st,position:new C,halfWidth:new C,halfHeight:new C};break}return a[t.id]=e,e}}}function wm(){const a={};return{get:function(t){if(a[t.id]!==void 0)return a[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Vt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Vt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Vt,shadowCameraNear:1,shadowCameraFar:1e3};break}return a[t.id]=e,e}}}let bm=0;function Sm(a,t){return(t.castShadow?2:0)-(a.castShadow?2:0)+(t.map?1:0)-(a.map?1:0)}function Em(a){const t=new Mm,e=wm(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new C);const n=new C,s=new ue,o=new ue;function r(l){let h=0,d=0,u=0;for(let U=0;U<9;U++)i.probe[U].set(0,0,0);let f=0,g=0,v=0,p=0,m=0,x=0,y=0,b=0,z=0,T=0,E=0;l.sort(Sm);for(let U=0,_=l.length;U<_;U++){const w=l[U],L=w.color,O=w.intensity,q=w.distance,Z=w.shadow&&w.shadow.map?w.shadow.map.texture:null;if(w.isAmbientLight)h+=L.r*O,d+=L.g*O,u+=L.b*O;else if(w.isLightProbe){for(let V=0;V<9;V++)i.probe[V].addScaledVector(w.sh.coefficients[V],O);E++}else if(w.isDirectionalLight){const V=t.get(w);if(V.color.copy(w.color).multiplyScalar(w.intensity),w.castShadow){const tt=w.shadow,$=e.get(w);$.shadowIntensity=tt.intensity,$.shadowBias=tt.bias,$.shadowNormalBias=tt.normalBias,$.shadowRadius=tt.radius,$.shadowMapSize=tt.mapSize,i.directionalShadow[f]=$,i.directionalShadowMap[f]=Z,i.directionalShadowMatrix[f]=w.shadow.matrix,x++}i.directional[f]=V,f++}else if(w.isSpotLight){const V=t.get(w);V.position.setFromMatrixPosition(w.matrixWorld),V.color.copy(L).multiplyScalar(O),V.distance=q,V.coneCos=Math.cos(w.angle),V.penumbraCos=Math.cos(w.angle*(1-w.penumbra)),V.decay=w.decay,i.spot[v]=V;const tt=w.shadow;if(w.map&&(i.spotLightMap[z]=w.map,z++,tt.updateMatrices(w),w.castShadow&&T++),i.spotLightMatrix[v]=tt.matrix,w.castShadow){const $=e.get(w);$.shadowIntensity=tt.intensity,$.shadowBias=tt.bias,$.shadowNormalBias=tt.normalBias,$.shadowRadius=tt.radius,$.shadowMapSize=tt.mapSize,i.spotShadow[v]=$,i.spotShadowMap[v]=Z,b++}v++}else if(w.isRectAreaLight){const V=t.get(w);V.color.copy(L).multiplyScalar(O),V.halfWidth.set(w.width*.5,0,0),V.halfHeight.set(0,w.height*.5,0),i.rectArea[p]=V,p++}else if(w.isPointLight){const V=t.get(w);if(V.color.copy(w.color).multiplyScalar(w.intensity),V.distance=w.distance,V.decay=w.decay,w.castShadow){const tt=w.shadow,$=e.get(w);$.shadowIntensity=tt.intensity,$.shadowBias=tt.bias,$.shadowNormalBias=tt.normalBias,$.shadowRadius=tt.radius,$.shadowMapSize=tt.mapSize,$.shadowCameraNear=tt.camera.near,$.shadowCameraFar=tt.camera.far,i.pointShadow[g]=$,i.pointShadowMap[g]=Z,i.pointShadowMatrix[g]=w.shadow.matrix,y++}i.point[g]=V,g++}else if(w.isHemisphereLight){const V=t.get(w);V.skyColor.copy(w.color).multiplyScalar(O),V.groundColor.copy(w.groundColor).multiplyScalar(O),i.hemi[m]=V,m++}}p>0&&(a.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=rt.LTC_FLOAT_1,i.rectAreaLTC2=rt.LTC_FLOAT_2):(i.rectAreaLTC1=rt.LTC_HALF_1,i.rectAreaLTC2=rt.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=d,i.ambient[2]=u;const R=i.hash;(R.directionalLength!==f||R.pointLength!==g||R.spotLength!==v||R.rectAreaLength!==p||R.hemiLength!==m||R.numDirectionalShadows!==x||R.numPointShadows!==y||R.numSpotShadows!==b||R.numSpotMaps!==z||R.numLightProbes!==E)&&(i.directional.length=f,i.spot.length=v,i.rectArea.length=p,i.point.length=g,i.hemi.length=m,i.directionalShadow.length=x,i.directionalShadowMap.length=x,i.pointShadow.length=y,i.pointShadowMap.length=y,i.spotShadow.length=b,i.spotShadowMap.length=b,i.directionalShadowMatrix.length=x,i.pointShadowMatrix.length=y,i.spotLightMatrix.length=b+z-T,i.spotLightMap.length=z,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=E,R.directionalLength=f,R.pointLength=g,R.spotLength=v,R.rectAreaLength=p,R.hemiLength=m,R.numDirectionalShadows=x,R.numPointShadows=y,R.numSpotShadows=b,R.numSpotMaps=z,R.numLightProbes=E,i.version=bm++)}function c(l,h){let d=0,u=0,f=0,g=0,v=0;const p=h.matrixWorldInverse;for(let m=0,x=l.length;m<x;m++){const y=l[m];if(y.isDirectionalLight){const b=i.directional[d];b.direction.setFromMatrixPosition(y.matrixWorld),n.setFromMatrixPosition(y.target.matrixWorld),b.direction.sub(n),b.direction.transformDirection(p),d++}else if(y.isSpotLight){const b=i.spot[f];b.position.setFromMatrixPosition(y.matrixWorld),b.position.applyMatrix4(p),b.direction.setFromMatrixPosition(y.matrixWorld),n.setFromMatrixPosition(y.target.matrixWorld),b.direction.sub(n),b.direction.transformDirection(p),f++}else if(y.isRectAreaLight){const b=i.rectArea[g];b.position.setFromMatrixPosition(y.matrixWorld),b.position.applyMatrix4(p),o.identity(),s.copy(y.matrixWorld),s.premultiply(p),o.extractRotation(s),b.halfWidth.set(y.width*.5,0,0),b.halfHeight.set(0,y.height*.5,0),b.halfWidth.applyMatrix4(o),b.halfHeight.applyMatrix4(o),g++}else if(y.isPointLight){const b=i.point[u];b.position.setFromMatrixPosition(y.matrixWorld),b.position.applyMatrix4(p),u++}else if(y.isHemisphereLight){const b=i.hemi[v];b.direction.setFromMatrixPosition(y.matrixWorld),b.direction.transformDirection(p),v++}}}return{setup:r,setupView:c,state:i}}function Rc(a){const t=new Em(a),e=[],i=[];function n(h){l.camera=h,e.length=0,i.length=0}function s(h){e.push(h)}function o(h){i.push(h)}function r(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:n,state:l,setupLights:r,setupLightsView:c,pushLight:s,pushShadow:o}}function Tm(a){let t=new WeakMap;function e(n,s=0){const o=t.get(n);let r;return o===void 0?(r=new Rc(a),t.set(n,[r])):s>=o.length?(r=new Rc(a),o.push(r)):r=o[s],r}function i(){t=new WeakMap}return{get:e,dispose:i}}class Am extends bn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Mh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Cm extends bn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Rm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,zm=`uniform sampler2D shadow_pass;
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
}`;function Pm(a,t,e){let i=new wr;const n=new Vt,s=new Vt,o=new de,r=new Am({depthPacking:wh}),c=new Cm,l={},h=e.maxTextureSize,d={[Oi]:Xe,[Xe]:Oi,[Se]:Se},u=new sn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Vt},radius:{value:4}},vertexShader:Rm,fragmentShader:zm}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const g=new Te;g.setAttribute("position",new Ae(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new yt(g,u),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=tl;let m=this.type;this.render=function(T,E,R){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||T.length===0)return;const U=a.getRenderTarget(),_=a.getActiveCubeFace(),w=a.getActiveMipmapLevel(),L=a.state;L.setBlending(tn),L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);const O=m!==Li&&this.type===Li,q=m===Li&&this.type!==Li;for(let Z=0,V=T.length;Z<V;Z++){const tt=T[Z],$=tt.shadow;if($===void 0){console.warn("THREE.WebGLShadowMap:",tt,"has no shadow.");continue}if($.autoUpdate===!1&&$.needsUpdate===!1)continue;n.copy($.mapSize);const pt=$.getFrameExtents();if(n.multiply(pt),s.copy($.mapSize),(n.x>h||n.y>h)&&(n.x>h&&(s.x=Math.floor(h/pt.x),n.x=s.x*pt.x,$.mapSize.x=s.x),n.y>h&&(s.y=Math.floor(h/pt.y),n.y=s.y*pt.y,$.mapSize.y=s.y)),$.map===null||O===!0||q===!0){const St=this.type!==Li?{minFilter:qe,magFilter:qe}:{};$.map!==null&&$.map.dispose(),$.map=new Mn(n.x,n.y,St),$.map.texture.name=tt.name+".shadowMap",$.camera.updateProjectionMatrix()}a.setRenderTarget($.map),a.clear();const mt=$.getViewportCount();for(let St=0;St<mt;St++){const te=$.getViewport(St);o.set(s.x*te.x,s.y*te.y,s.x*te.z,s.y*te.w),L.viewport(o),$.updateMatrices(tt,St),i=$.getFrustum(),b(E,R,$.camera,tt,this.type)}$.isPointLightShadow!==!0&&this.type===Li&&x($,R),$.needsUpdate=!1}m=this.type,p.needsUpdate=!1,a.setRenderTarget(U,_,w)};function x(T,E){const R=t.update(v);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Mn(n.x,n.y)),u.uniforms.shadow_pass.value=T.map.texture,u.uniforms.resolution.value=T.mapSize,u.uniforms.radius.value=T.radius,a.setRenderTarget(T.mapPass),a.clear(),a.renderBufferDirect(E,null,R,u,v,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,a.setRenderTarget(T.map),a.clear(),a.renderBufferDirect(E,null,R,f,v,null)}function y(T,E,R,U){let _=null;const w=R.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(w!==void 0)_=w;else if(_=R.isPointLight===!0?c:r,a.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0){const L=_.uuid,O=E.uuid;let q=l[L];q===void 0&&(q={},l[L]=q);let Z=q[O];Z===void 0&&(Z=_.clone(),q[O]=Z,E.addEventListener("dispose",z)),_=Z}if(_.visible=E.visible,_.wireframe=E.wireframe,U===Li?_.side=E.shadowSide!==null?E.shadowSide:E.side:_.side=E.shadowSide!==null?E.shadowSide:d[E.side],_.alphaMap=E.alphaMap,_.alphaTest=E.alphaTest,_.map=E.map,_.clipShadows=E.clipShadows,_.clippingPlanes=E.clippingPlanes,_.clipIntersection=E.clipIntersection,_.displacementMap=E.displacementMap,_.displacementScale=E.displacementScale,_.displacementBias=E.displacementBias,_.wireframeLinewidth=E.wireframeLinewidth,_.linewidth=E.linewidth,R.isPointLight===!0&&_.isMeshDistanceMaterial===!0){const L=a.properties.get(_);L.light=R}return _}function b(T,E,R,U,_){if(T.visible===!1)return;if(T.layers.test(E.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&_===Li)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,T.matrixWorld);const O=t.update(T),q=T.material;if(Array.isArray(q)){const Z=O.groups;for(let V=0,tt=Z.length;V<tt;V++){const $=Z[V],pt=q[$.materialIndex];if(pt&&pt.visible){const mt=y(T,pt,U,_);T.onBeforeShadow(a,T,E,R,O,mt,$),a.renderBufferDirect(R,null,O,mt,T,$),T.onAfterShadow(a,T,E,R,O,mt,$)}}}else if(q.visible){const Z=y(T,q,U,_);T.onBeforeShadow(a,T,E,R,O,Z,null),a.renderBufferDirect(R,null,O,Z,T,null),T.onAfterShadow(a,T,E,R,O,Z,null)}}const L=T.children;for(let O=0,q=L.length;O<q;O++)b(L[O],E,R,U,_)}function z(T){T.target.removeEventListener("dispose",z);for(const R in l){const U=l[R],_=T.target.uuid;_ in U&&(U[_].dispose(),delete U[_])}}}const km={[Eo]:To,[Ao]:zo,[Co]:Po,[Yn]:Ro,[To]:Eo,[zo]:Ao,[Po]:Co,[Ro]:Yn};function Im(a){function t(){let k=!1;const ut=new de;let W=null;const Q=new de(0,0,0,0);return{setMask:function(ht){W!==ht&&!k&&(a.colorMask(ht,ht,ht,ht),W=ht)},setLocked:function(ht){k=ht},setClear:function(ht,ft,Yt,we,He){He===!0&&(ht*=we,ft*=we,Yt*=we),ut.set(ht,ft,Yt,we),Q.equals(ut)===!1&&(a.clearColor(ht,ft,Yt,we),Q.copy(ut))},reset:function(){k=!1,W=null,Q.set(-1,0,0,0)}}}function e(){let k=!1,ut=!1,W=null,Q=null,ht=null;return{setReversed:function(ft){ut=ft},setTest:function(ft){ft?wt(a.DEPTH_TEST):gt(a.DEPTH_TEST)},setMask:function(ft){W!==ft&&!k&&(a.depthMask(ft),W=ft)},setFunc:function(ft){if(ut&&(ft=km[ft]),Q!==ft){switch(ft){case Eo:a.depthFunc(a.NEVER);break;case To:a.depthFunc(a.ALWAYS);break;case Ao:a.depthFunc(a.LESS);break;case Yn:a.depthFunc(a.LEQUAL);break;case Co:a.depthFunc(a.EQUAL);break;case Ro:a.depthFunc(a.GEQUAL);break;case zo:a.depthFunc(a.GREATER);break;case Po:a.depthFunc(a.NOTEQUAL);break;default:a.depthFunc(a.LEQUAL)}Q=ft}},setLocked:function(ft){k=ft},setClear:function(ft){ht!==ft&&(a.clearDepth(ft),ht=ft)},reset:function(){k=!1,W=null,Q=null,ht=null}}}function i(){let k=!1,ut=null,W=null,Q=null,ht=null,ft=null,Yt=null,we=null,He=null;return{setTest:function(ee){k||(ee?wt(a.STENCIL_TEST):gt(a.STENCIL_TEST))},setMask:function(ee){ut!==ee&&!k&&(a.stencilMask(ee),ut=ee)},setFunc:function(ee,Ge,Ti){(W!==ee||Q!==Ge||ht!==Ti)&&(a.stencilFunc(ee,Ge,Ti),W=ee,Q=Ge,ht=Ti)},setOp:function(ee,Ge,Ti){(ft!==ee||Yt!==Ge||we!==Ti)&&(a.stencilOp(ee,Ge,Ti),ft=ee,Yt=Ge,we=Ti)},setLocked:function(ee){k=ee},setClear:function(ee){He!==ee&&(a.clearStencil(ee),He=ee)},reset:function(){k=!1,ut=null,W=null,Q=null,ht=null,ft=null,Yt=null,we=null,He=null}}}const n=new t,s=new e,o=new i,r=new WeakMap,c=new WeakMap;let l={},h={},d=new WeakMap,u=[],f=null,g=!1,v=null,p=null,m=null,x=null,y=null,b=null,z=null,T=new st(0,0,0),E=0,R=!1,U=null,_=null,w=null,L=null,O=null;const q=a.getParameter(a.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Z=!1,V=0;const tt=a.getParameter(a.VERSION);tt.indexOf("WebGL")!==-1?(V=parseFloat(/^WebGL (\d)/.exec(tt)[1]),Z=V>=1):tt.indexOf("OpenGL ES")!==-1&&(V=parseFloat(/^OpenGL ES (\d)/.exec(tt)[1]),Z=V>=2);let $=null,pt={};const mt=a.getParameter(a.SCISSOR_BOX),St=a.getParameter(a.VIEWPORT),te=new de().fromArray(mt),ce=new de().fromArray(St);function K(k,ut,W,Q){const ht=new Uint8Array(4),ft=a.createTexture();a.bindTexture(k,ft),a.texParameteri(k,a.TEXTURE_MIN_FILTER,a.NEAREST),a.texParameteri(k,a.TEXTURE_MAG_FILTER,a.NEAREST);for(let Yt=0;Yt<W;Yt++)k===a.TEXTURE_3D||k===a.TEXTURE_2D_ARRAY?a.texImage3D(ut,0,a.RGBA,1,1,Q,0,a.RGBA,a.UNSIGNED_BYTE,ht):a.texImage2D(ut+Yt,0,a.RGBA,1,1,0,a.RGBA,a.UNSIGNED_BYTE,ht);return ft}const it={};it[a.TEXTURE_2D]=K(a.TEXTURE_2D,a.TEXTURE_2D,1),it[a.TEXTURE_CUBE_MAP]=K(a.TEXTURE_CUBE_MAP,a.TEXTURE_CUBE_MAP_POSITIVE_X,6),it[a.TEXTURE_2D_ARRAY]=K(a.TEXTURE_2D_ARRAY,a.TEXTURE_2D_ARRAY,1,1),it[a.TEXTURE_3D]=K(a.TEXTURE_3D,a.TEXTURE_3D,1,1),n.setClear(0,0,0,1),s.setClear(1),o.setClear(0),wt(a.DEPTH_TEST),s.setFunc(Yn),jt(!1),Jt(Fr),wt(a.CULL_FACE),P(tn);function wt(k){l[k]!==!0&&(a.enable(k),l[k]=!0)}function gt(k){l[k]!==!1&&(a.disable(k),l[k]=!1)}function Ft(k,ut){return h[k]!==ut?(a.bindFramebuffer(k,ut),h[k]=ut,k===a.DRAW_FRAMEBUFFER&&(h[a.FRAMEBUFFER]=ut),k===a.FRAMEBUFFER&&(h[a.DRAW_FRAMEBUFFER]=ut),!0):!1}function zt(k,ut){let W=u,Q=!1;if(k){W=d.get(ut),W===void 0&&(W=[],d.set(ut,W));const ht=k.textures;if(W.length!==ht.length||W[0]!==a.COLOR_ATTACHMENT0){for(let ft=0,Yt=ht.length;ft<Yt;ft++)W[ft]=a.COLOR_ATTACHMENT0+ft;W.length=ht.length,Q=!0}}else W[0]!==a.BACK&&(W[0]=a.BACK,Q=!0);Q&&a.drawBuffers(W)}function $t(k){return f!==k?(a.useProgram(k),f=k,!0):!1}const he={[gn]:a.FUNC_ADD,[Kl]:a.FUNC_SUBTRACT,[Yl]:a.FUNC_REVERSE_SUBTRACT};he[Zl]=a.MIN,he[Jl]=a.MAX;const Kt={[Ql]:a.ZERO,[th]:a.ONE,[eh]:a.SRC_COLOR,[bo]:a.SRC_ALPHA,[rh]:a.SRC_ALPHA_SATURATE,[ah]:a.DST_COLOR,[nh]:a.DST_ALPHA,[ih]:a.ONE_MINUS_SRC_COLOR,[So]:a.ONE_MINUS_SRC_ALPHA,[oh]:a.ONE_MINUS_DST_COLOR,[sh]:a.ONE_MINUS_DST_ALPHA,[ch]:a.CONSTANT_COLOR,[lh]:a.ONE_MINUS_CONSTANT_COLOR,[hh]:a.CONSTANT_ALPHA,[dh]:a.ONE_MINUS_CONSTANT_ALPHA};function P(k,ut,W,Q,ht,ft,Yt,we,He,ee){if(k===tn){g===!0&&(gt(a.BLEND),g=!1);return}if(g===!1&&(wt(a.BLEND),g=!0),k!==$l){if(k!==v||ee!==R){if((p!==gn||y!==gn)&&(a.blendEquation(a.FUNC_ADD),p=gn,y=gn),ee)switch(k){case Xn:a.blendFuncSeparate(a.ONE,a.ONE_MINUS_SRC_ALPHA,a.ONE,a.ONE_MINUS_SRC_ALPHA);break;case wo:a.blendFunc(a.ONE,a.ONE);break;case Or:a.blendFuncSeparate(a.ZERO,a.ONE_MINUS_SRC_COLOR,a.ZERO,a.ONE);break;case Br:a.blendFuncSeparate(a.ZERO,a.SRC_COLOR,a.ZERO,a.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}else switch(k){case Xn:a.blendFuncSeparate(a.SRC_ALPHA,a.ONE_MINUS_SRC_ALPHA,a.ONE,a.ONE_MINUS_SRC_ALPHA);break;case wo:a.blendFunc(a.SRC_ALPHA,a.ONE);break;case Or:a.blendFuncSeparate(a.ZERO,a.ONE_MINUS_SRC_COLOR,a.ZERO,a.ONE);break;case Br:a.blendFunc(a.ZERO,a.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}m=null,x=null,b=null,z=null,T.set(0,0,0),E=0,v=k,R=ee}return}ht=ht||ut,ft=ft||W,Yt=Yt||Q,(ut!==p||ht!==y)&&(a.blendEquationSeparate(he[ut],he[ht]),p=ut,y=ht),(W!==m||Q!==x||ft!==b||Yt!==z)&&(a.blendFuncSeparate(Kt[W],Kt[Q],Kt[ft],Kt[Yt]),m=W,x=Q,b=ft,z=Yt),(we.equals(T)===!1||He!==E)&&(a.blendColor(we.r,we.g,we.b,He),T.copy(we),E=He),v=k,R=!1}function $e(k,ut){k.side===Se?gt(a.CULL_FACE):wt(a.CULL_FACE);let W=k.side===Xe;ut&&(W=!W),jt(W),k.blending===Xn&&k.transparent===!1?P(tn):P(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),s.setFunc(k.depthFunc),s.setTest(k.depthTest),s.setMask(k.depthWrite),n.setMask(k.colorWrite);const Q=k.stencilWrite;o.setTest(Q),Q&&(o.setMask(k.stencilWriteMask),o.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),o.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),me(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?wt(a.SAMPLE_ALPHA_TO_COVERAGE):gt(a.SAMPLE_ALPHA_TO_COVERAGE)}function jt(k){U!==k&&(k?a.frontFace(a.CW):a.frontFace(a.CCW),U=k)}function Jt(k){k!==ql?(wt(a.CULL_FACE),k!==_&&(k===Fr?a.cullFace(a.BACK):k===Xl?a.cullFace(a.FRONT):a.cullFace(a.FRONT_AND_BACK))):gt(a.CULL_FACE),_=k}function It(k){k!==w&&(Z&&a.lineWidth(k),w=k)}function me(k,ut,W){k?(wt(a.POLYGON_OFFSET_FILL),(L!==ut||O!==W)&&(a.polygonOffset(ut,W),L=ut,O=W)):gt(a.POLYGON_OFFSET_FILL)}function Nt(k){k?wt(a.SCISSOR_TEST):gt(a.SCISSOR_TEST)}function A(k){k===void 0&&(k=a.TEXTURE0+q-1),$!==k&&(a.activeTexture(k),$=k)}function M(k,ut,W){W===void 0&&($===null?W=a.TEXTURE0+q-1:W=$);let Q=pt[W];Q===void 0&&(Q={type:void 0,texture:void 0},pt[W]=Q),(Q.type!==k||Q.texture!==ut)&&($!==W&&(a.activeTexture(W),$=W),a.bindTexture(k,ut||it[k]),Q.type=k,Q.texture=ut)}function N(){const k=pt[$];k!==void 0&&k.type!==void 0&&(a.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function J(){try{a.compressedTexImage2D.apply(a,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function et(){try{a.compressedTexImage3D.apply(a,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Y(){try{a.texSubImage2D.apply(a,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Et(){try{a.texSubImage3D.apply(a,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function lt(){try{a.compressedTexSubImage2D.apply(a,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function vt(){try{a.compressedTexSubImage3D.apply(a,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Qt(){try{a.texStorage2D.apply(a,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function at(){try{a.texStorage3D.apply(a,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function _t(){try{a.texImage2D.apply(a,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Lt(){try{a.texImage3D.apply(a,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Dt(k){te.equals(k)===!1&&(a.scissor(k.x,k.y,k.z,k.w),te.copy(k))}function xt(k){ce.equals(k)===!1&&(a.viewport(k.x,k.y,k.z,k.w),ce.copy(k))}function qt(k,ut){let W=c.get(ut);W===void 0&&(W=new WeakMap,c.set(ut,W));let Q=W.get(k);Q===void 0&&(Q=a.getUniformBlockIndex(ut,k.name),W.set(k,Q))}function Ot(k,ut){const Q=c.get(ut).get(k);r.get(ut)!==Q&&(a.uniformBlockBinding(ut,Q,k.__bindingPointIndex),r.set(ut,Q))}function pe(){a.disable(a.BLEND),a.disable(a.CULL_FACE),a.disable(a.DEPTH_TEST),a.disable(a.POLYGON_OFFSET_FILL),a.disable(a.SCISSOR_TEST),a.disable(a.STENCIL_TEST),a.disable(a.SAMPLE_ALPHA_TO_COVERAGE),a.blendEquation(a.FUNC_ADD),a.blendFunc(a.ONE,a.ZERO),a.blendFuncSeparate(a.ONE,a.ZERO,a.ONE,a.ZERO),a.blendColor(0,0,0,0),a.colorMask(!0,!0,!0,!0),a.clearColor(0,0,0,0),a.depthMask(!0),a.depthFunc(a.LESS),a.clearDepth(1),a.stencilMask(4294967295),a.stencilFunc(a.ALWAYS,0,4294967295),a.stencilOp(a.KEEP,a.KEEP,a.KEEP),a.clearStencil(0),a.cullFace(a.BACK),a.frontFace(a.CCW),a.polygonOffset(0,0),a.activeTexture(a.TEXTURE0),a.bindFramebuffer(a.FRAMEBUFFER,null),a.bindFramebuffer(a.DRAW_FRAMEBUFFER,null),a.bindFramebuffer(a.READ_FRAMEBUFFER,null),a.useProgram(null),a.lineWidth(1),a.scissor(0,0,a.canvas.width,a.canvas.height),a.viewport(0,0,a.canvas.width,a.canvas.height),l={},$=null,pt={},h={},d=new WeakMap,u=[],f=null,g=!1,v=null,p=null,m=null,x=null,y=null,b=null,z=null,T=new st(0,0,0),E=0,R=!1,U=null,_=null,w=null,L=null,O=null,te.set(0,0,a.canvas.width,a.canvas.height),ce.set(0,0,a.canvas.width,a.canvas.height),n.reset(),s.reset(),o.reset()}return{buffers:{color:n,depth:s,stencil:o},enable:wt,disable:gt,bindFramebuffer:Ft,drawBuffers:zt,useProgram:$t,setBlending:P,setMaterial:$e,setFlipSided:jt,setCullFace:Jt,setLineWidth:It,setPolygonOffset:me,setScissorTest:Nt,activeTexture:A,bindTexture:M,unbindTexture:N,compressedTexImage2D:J,compressedTexImage3D:et,texImage2D:_t,texImage3D:Lt,updateUBOMapping:qt,uniformBlockBinding:Ot,texStorage2D:Qt,texStorage3D:at,texSubImage2D:Y,texSubImage3D:Et,compressedTexSubImage2D:lt,compressedTexSubImage3D:vt,scissor:Dt,viewport:xt,reset:pe}}function zc(a,t,e,i){const n=Lm(i);switch(e){case rl:return a*t;case ll:return a*t;case hl:return a*t*2;case gr:return a*t/n.components*n.byteLength;case vr:return a*t/n.components*n.byteLength;case dl:return a*t*2/n.components*n.byteLength;case _r:return a*t*2/n.components*n.byteLength;case cl:return a*t*3/n.components*n.byteLength;case yi:return a*t*4/n.components*n.byteLength;case xr:return a*t*4/n.components*n.byteLength;case la:case ha:return Math.floor((a+3)/4)*Math.floor((t+3)/4)*8;case da:case ua:return Math.floor((a+3)/4)*Math.floor((t+3)/4)*16;case Do:case No:return Math.max(a,16)*Math.max(t,8)/4;case Lo:case Uo:return Math.max(a,8)*Math.max(t,8)/2;case Fo:case Oo:return Math.floor((a+3)/4)*Math.floor((t+3)/4)*8;case Bo:return Math.floor((a+3)/4)*Math.floor((t+3)/4)*16;case Ho:return Math.floor((a+3)/4)*Math.floor((t+3)/4)*16;case Go:return Math.floor((a+4)/5)*Math.floor((t+3)/4)*16;case Vo:return Math.floor((a+4)/5)*Math.floor((t+4)/5)*16;case Wo:return Math.floor((a+5)/6)*Math.floor((t+4)/5)*16;case jo:return Math.floor((a+5)/6)*Math.floor((t+5)/6)*16;case qo:return Math.floor((a+7)/8)*Math.floor((t+4)/5)*16;case Xo:return Math.floor((a+7)/8)*Math.floor((t+5)/6)*16;case $o:return Math.floor((a+7)/8)*Math.floor((t+7)/8)*16;case Ko:return Math.floor((a+9)/10)*Math.floor((t+4)/5)*16;case Yo:return Math.floor((a+9)/10)*Math.floor((t+5)/6)*16;case Zo:return Math.floor((a+9)/10)*Math.floor((t+7)/8)*16;case Jo:return Math.floor((a+9)/10)*Math.floor((t+9)/10)*16;case Qo:return Math.floor((a+11)/12)*Math.floor((t+9)/10)*16;case tr:return Math.floor((a+11)/12)*Math.floor((t+11)/12)*16;case fa:case er:case ir:return Math.ceil(a/4)*Math.ceil(t/4)*16;case ul:case nr:return Math.ceil(a/4)*Math.ceil(t/4)*8;case sr:case ar:return Math.ceil(a/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Lm(a){switch(a){case Bi:case sl:return{byteLength:1,components:1};case Ts:case al:case Cs:return{byteLength:2,components:1};case pr:case mr:return{byteLength:2,components:4};case yn:case fr:case Si:return{byteLength:4,components:1};case ol:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${a}.`)}function Dm(a,t,e,i,n,s,o){const r=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Vt,h=new WeakMap;let d;const u=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,M){return f?new OffscreenCanvas(A,M):Ma("canvas")}function v(A,M,N){let J=1;const et=Nt(A);if((et.width>N||et.height>N)&&(J=N/Math.max(et.width,et.height)),J<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const Y=Math.floor(J*et.width),Et=Math.floor(J*et.height);d===void 0&&(d=g(Y,Et));const lt=M?g(Y,Et):d;return lt.width=Y,lt.height=Et,lt.getContext("2d").drawImage(A,0,0,Y,Et),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+et.width+"x"+et.height+") to ("+Y+"x"+Et+")."),lt}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+et.width+"x"+et.height+")."),A;return A}function p(A){return A.generateMipmaps&&A.minFilter!==qe&&A.minFilter!==ii}function m(A){a.generateMipmap(A)}function x(A,M,N,J,et=!1){if(A!==null){if(a[A]!==void 0)return a[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let Y=M;if(M===a.RED&&(N===a.FLOAT&&(Y=a.R32F),N===a.HALF_FLOAT&&(Y=a.R16F),N===a.UNSIGNED_BYTE&&(Y=a.R8)),M===a.RED_INTEGER&&(N===a.UNSIGNED_BYTE&&(Y=a.R8UI),N===a.UNSIGNED_SHORT&&(Y=a.R16UI),N===a.UNSIGNED_INT&&(Y=a.R32UI),N===a.BYTE&&(Y=a.R8I),N===a.SHORT&&(Y=a.R16I),N===a.INT&&(Y=a.R32I)),M===a.RG&&(N===a.FLOAT&&(Y=a.RG32F),N===a.HALF_FLOAT&&(Y=a.RG16F),N===a.UNSIGNED_BYTE&&(Y=a.RG8)),M===a.RG_INTEGER&&(N===a.UNSIGNED_BYTE&&(Y=a.RG8UI),N===a.UNSIGNED_SHORT&&(Y=a.RG16UI),N===a.UNSIGNED_INT&&(Y=a.RG32UI),N===a.BYTE&&(Y=a.RG8I),N===a.SHORT&&(Y=a.RG16I),N===a.INT&&(Y=a.RG32I)),M===a.RGB_INTEGER&&(N===a.UNSIGNED_BYTE&&(Y=a.RGB8UI),N===a.UNSIGNED_SHORT&&(Y=a.RGB16UI),N===a.UNSIGNED_INT&&(Y=a.RGB32UI),N===a.BYTE&&(Y=a.RGB8I),N===a.SHORT&&(Y=a.RGB16I),N===a.INT&&(Y=a.RGB32I)),M===a.RGBA_INTEGER&&(N===a.UNSIGNED_BYTE&&(Y=a.RGBA8UI),N===a.UNSIGNED_SHORT&&(Y=a.RGBA16UI),N===a.UNSIGNED_INT&&(Y=a.RGBA32UI),N===a.BYTE&&(Y=a.RGBA8I),N===a.SHORT&&(Y=a.RGBA16I),N===a.INT&&(Y=a.RGBA32I)),M===a.RGB&&N===a.UNSIGNED_INT_5_9_9_9_REV&&(Y=a.RGB9_E5),M===a.RGBA){const Et=et?va:oe.getTransfer(J);N===a.FLOAT&&(Y=a.RGBA32F),N===a.HALF_FLOAT&&(Y=a.RGBA16F),N===a.UNSIGNED_BYTE&&(Y=Et===ve?a.SRGB8_ALPHA8:a.RGBA8),N===a.UNSIGNED_SHORT_4_4_4_4&&(Y=a.RGBA4),N===a.UNSIGNED_SHORT_5_5_5_1&&(Y=a.RGB5_A1)}return(Y===a.R16F||Y===a.R32F||Y===a.RG16F||Y===a.RG32F||Y===a.RGBA16F||Y===a.RGBA32F)&&t.get("EXT_color_buffer_float"),Y}function y(A,M){let N;return A?M===null||M===yn||M===Qn?N=a.DEPTH24_STENCIL8:M===Si?N=a.DEPTH32F_STENCIL8:M===Ts&&(N=a.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===yn||M===Qn?N=a.DEPTH_COMPONENT24:M===Si?N=a.DEPTH_COMPONENT32F:M===Ts&&(N=a.DEPTH_COMPONENT16),N}function b(A,M){return p(A)===!0||A.isFramebufferTexture&&A.minFilter!==qe&&A.minFilter!==ii?Math.log2(Math.max(M.width,M.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?M.mipmaps.length:1}function z(A){const M=A.target;M.removeEventListener("dispose",z),E(M),M.isVideoTexture&&h.delete(M)}function T(A){const M=A.target;M.removeEventListener("dispose",T),U(M)}function E(A){const M=i.get(A);if(M.__webglInit===void 0)return;const N=A.source,J=u.get(N);if(J){const et=J[M.__cacheKey];et.usedTimes--,et.usedTimes===0&&R(A),Object.keys(J).length===0&&u.delete(N)}i.remove(A)}function R(A){const M=i.get(A);a.deleteTexture(M.__webglTexture);const N=A.source,J=u.get(N);delete J[M.__cacheKey],o.memory.textures--}function U(A){const M=i.get(A);if(A.depthTexture&&A.depthTexture.dispose(),A.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(M.__webglFramebuffer[J]))for(let et=0;et<M.__webglFramebuffer[J].length;et++)a.deleteFramebuffer(M.__webglFramebuffer[J][et]);else a.deleteFramebuffer(M.__webglFramebuffer[J]);M.__webglDepthbuffer&&a.deleteRenderbuffer(M.__webglDepthbuffer[J])}else{if(Array.isArray(M.__webglFramebuffer))for(let J=0;J<M.__webglFramebuffer.length;J++)a.deleteFramebuffer(M.__webglFramebuffer[J]);else a.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&a.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&a.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let J=0;J<M.__webglColorRenderbuffer.length;J++)M.__webglColorRenderbuffer[J]&&a.deleteRenderbuffer(M.__webglColorRenderbuffer[J]);M.__webglDepthRenderbuffer&&a.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const N=A.textures;for(let J=0,et=N.length;J<et;J++){const Y=i.get(N[J]);Y.__webglTexture&&(a.deleteTexture(Y.__webglTexture),o.memory.textures--),i.remove(N[J])}i.remove(A)}let _=0;function w(){_=0}function L(){const A=_;return A>=n.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+n.maxTextures),_+=1,A}function O(A){const M=[];return M.push(A.wrapS),M.push(A.wrapT),M.push(A.wrapR||0),M.push(A.magFilter),M.push(A.minFilter),M.push(A.anisotropy),M.push(A.internalFormat),M.push(A.format),M.push(A.type),M.push(A.generateMipmaps),M.push(A.premultiplyAlpha),M.push(A.flipY),M.push(A.unpackAlignment),M.push(A.colorSpace),M.join()}function q(A,M){const N=i.get(A);if(A.isVideoTexture&&It(A),A.isRenderTargetTexture===!1&&A.version>0&&N.__version!==A.version){const J=A.image;if(J===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ce(N,A,M);return}}e.bindTexture(a.TEXTURE_2D,N.__webglTexture,a.TEXTURE0+M)}function Z(A,M){const N=i.get(A);if(A.version>0&&N.__version!==A.version){ce(N,A,M);return}e.bindTexture(a.TEXTURE_2D_ARRAY,N.__webglTexture,a.TEXTURE0+M)}function V(A,M){const N=i.get(A);if(A.version>0&&N.__version!==A.version){ce(N,A,M);return}e.bindTexture(a.TEXTURE_3D,N.__webglTexture,a.TEXTURE0+M)}function tt(A,M){const N=i.get(A);if(A.version>0&&N.__version!==A.version){K(N,A,M);return}e.bindTexture(a.TEXTURE_CUBE_MAP,N.__webglTexture,a.TEXTURE0+M)}const $={[Es]:a.REPEAT,[_n]:a.CLAMP_TO_EDGE,[Io]:a.MIRRORED_REPEAT},pt={[qe]:a.NEAREST,[yh]:a.NEAREST_MIPMAP_NEAREST,[Ls]:a.NEAREST_MIPMAP_LINEAR,[ii]:a.LINEAR,[Ia]:a.LINEAR_MIPMAP_NEAREST,[xn]:a.LINEAR_MIPMAP_LINEAR},mt={[Sh]:a.NEVER,[zh]:a.ALWAYS,[Eh]:a.LESS,[fl]:a.LEQUAL,[Th]:a.EQUAL,[Rh]:a.GEQUAL,[Ah]:a.GREATER,[Ch]:a.NOTEQUAL};function St(A,M){if(M.type===Si&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===ii||M.magFilter===Ia||M.magFilter===Ls||M.magFilter===xn||M.minFilter===ii||M.minFilter===Ia||M.minFilter===Ls||M.minFilter===xn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),a.texParameteri(A,a.TEXTURE_WRAP_S,$[M.wrapS]),a.texParameteri(A,a.TEXTURE_WRAP_T,$[M.wrapT]),(A===a.TEXTURE_3D||A===a.TEXTURE_2D_ARRAY)&&a.texParameteri(A,a.TEXTURE_WRAP_R,$[M.wrapR]),a.texParameteri(A,a.TEXTURE_MAG_FILTER,pt[M.magFilter]),a.texParameteri(A,a.TEXTURE_MIN_FILTER,pt[M.minFilter]),M.compareFunction&&(a.texParameteri(A,a.TEXTURE_COMPARE_MODE,a.COMPARE_REF_TO_TEXTURE),a.texParameteri(A,a.TEXTURE_COMPARE_FUNC,mt[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===qe||M.minFilter!==Ls&&M.minFilter!==xn||M.type===Si&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||i.get(M).__currentAnisotropy){const N=t.get("EXT_texture_filter_anisotropic");a.texParameterf(A,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,n.getMaxAnisotropy())),i.get(M).__currentAnisotropy=M.anisotropy}}}function te(A,M){let N=!1;A.__webglInit===void 0&&(A.__webglInit=!0,M.addEventListener("dispose",z));const J=M.source;let et=u.get(J);et===void 0&&(et={},u.set(J,et));const Y=O(M);if(Y!==A.__cacheKey){et[Y]===void 0&&(et[Y]={texture:a.createTexture(),usedTimes:0},o.memory.textures++,N=!0),et[Y].usedTimes++;const Et=et[A.__cacheKey];Et!==void 0&&(et[A.__cacheKey].usedTimes--,Et.usedTimes===0&&R(M)),A.__cacheKey=Y,A.__webglTexture=et[Y].texture}return N}function ce(A,M,N){let J=a.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(J=a.TEXTURE_2D_ARRAY),M.isData3DTexture&&(J=a.TEXTURE_3D);const et=te(A,M),Y=M.source;e.bindTexture(J,A.__webglTexture,a.TEXTURE0+N);const Et=i.get(Y);if(Y.version!==Et.__version||et===!0){e.activeTexture(a.TEXTURE0+N);const lt=oe.getPrimaries(oe.workingColorSpace),vt=M.colorSpace===Qi?null:oe.getPrimaries(M.colorSpace),Qt=M.colorSpace===Qi||lt===vt?a.NONE:a.BROWSER_DEFAULT_WEBGL;a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,M.flipY),a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),a.pixelStorei(a.UNPACK_ALIGNMENT,M.unpackAlignment),a.pixelStorei(a.UNPACK_COLORSPACE_CONVERSION_WEBGL,Qt);let at=v(M.image,!1,n.maxTextureSize);at=me(M,at);const _t=s.convert(M.format,M.colorSpace),Lt=s.convert(M.type);let Dt=x(M.internalFormat,_t,Lt,M.colorSpace,M.isVideoTexture);St(J,M);let xt;const qt=M.mipmaps,Ot=M.isVideoTexture!==!0,pe=Et.__version===void 0||et===!0,k=Y.dataReady,ut=b(M,at);if(M.isDepthTexture)Dt=y(M.format===ts,M.type),pe&&(Ot?e.texStorage2D(a.TEXTURE_2D,1,Dt,at.width,at.height):e.texImage2D(a.TEXTURE_2D,0,Dt,at.width,at.height,0,_t,Lt,null));else if(M.isDataTexture)if(qt.length>0){Ot&&pe&&e.texStorage2D(a.TEXTURE_2D,ut,Dt,qt[0].width,qt[0].height);for(let W=0,Q=qt.length;W<Q;W++)xt=qt[W],Ot?k&&e.texSubImage2D(a.TEXTURE_2D,W,0,0,xt.width,xt.height,_t,Lt,xt.data):e.texImage2D(a.TEXTURE_2D,W,Dt,xt.width,xt.height,0,_t,Lt,xt.data);M.generateMipmaps=!1}else Ot?(pe&&e.texStorage2D(a.TEXTURE_2D,ut,Dt,at.width,at.height),k&&e.texSubImage2D(a.TEXTURE_2D,0,0,0,at.width,at.height,_t,Lt,at.data)):e.texImage2D(a.TEXTURE_2D,0,Dt,at.width,at.height,0,_t,Lt,at.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Ot&&pe&&e.texStorage3D(a.TEXTURE_2D_ARRAY,ut,Dt,qt[0].width,qt[0].height,at.depth);for(let W=0,Q=qt.length;W<Q;W++)if(xt=qt[W],M.format!==yi)if(_t!==null)if(Ot){if(k)if(M.layerUpdates.size>0){const ht=zc(xt.width,xt.height,M.format,M.type);for(const ft of M.layerUpdates){const Yt=xt.data.subarray(ft*ht/xt.data.BYTES_PER_ELEMENT,(ft+1)*ht/xt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(a.TEXTURE_2D_ARRAY,W,0,0,ft,xt.width,xt.height,1,_t,Yt,0,0)}M.clearLayerUpdates()}else e.compressedTexSubImage3D(a.TEXTURE_2D_ARRAY,W,0,0,0,xt.width,xt.height,at.depth,_t,xt.data,0,0)}else e.compressedTexImage3D(a.TEXTURE_2D_ARRAY,W,Dt,xt.width,xt.height,at.depth,0,xt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ot?k&&e.texSubImage3D(a.TEXTURE_2D_ARRAY,W,0,0,0,xt.width,xt.height,at.depth,_t,Lt,xt.data):e.texImage3D(a.TEXTURE_2D_ARRAY,W,Dt,xt.width,xt.height,at.depth,0,_t,Lt,xt.data)}else{Ot&&pe&&e.texStorage2D(a.TEXTURE_2D,ut,Dt,qt[0].width,qt[0].height);for(let W=0,Q=qt.length;W<Q;W++)xt=qt[W],M.format!==yi?_t!==null?Ot?k&&e.compressedTexSubImage2D(a.TEXTURE_2D,W,0,0,xt.width,xt.height,_t,xt.data):e.compressedTexImage2D(a.TEXTURE_2D,W,Dt,xt.width,xt.height,0,xt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ot?k&&e.texSubImage2D(a.TEXTURE_2D,W,0,0,xt.width,xt.height,_t,Lt,xt.data):e.texImage2D(a.TEXTURE_2D,W,Dt,xt.width,xt.height,0,_t,Lt,xt.data)}else if(M.isDataArrayTexture)if(Ot){if(pe&&e.texStorage3D(a.TEXTURE_2D_ARRAY,ut,Dt,at.width,at.height,at.depth),k)if(M.layerUpdates.size>0){const W=zc(at.width,at.height,M.format,M.type);for(const Q of M.layerUpdates){const ht=at.data.subarray(Q*W/at.data.BYTES_PER_ELEMENT,(Q+1)*W/at.data.BYTES_PER_ELEMENT);e.texSubImage3D(a.TEXTURE_2D_ARRAY,0,0,0,Q,at.width,at.height,1,_t,Lt,ht)}M.clearLayerUpdates()}else e.texSubImage3D(a.TEXTURE_2D_ARRAY,0,0,0,0,at.width,at.height,at.depth,_t,Lt,at.data)}else e.texImage3D(a.TEXTURE_2D_ARRAY,0,Dt,at.width,at.height,at.depth,0,_t,Lt,at.data);else if(M.isData3DTexture)Ot?(pe&&e.texStorage3D(a.TEXTURE_3D,ut,Dt,at.width,at.height,at.depth),k&&e.texSubImage3D(a.TEXTURE_3D,0,0,0,0,at.width,at.height,at.depth,_t,Lt,at.data)):e.texImage3D(a.TEXTURE_3D,0,Dt,at.width,at.height,at.depth,0,_t,Lt,at.data);else if(M.isFramebufferTexture){if(pe)if(Ot)e.texStorage2D(a.TEXTURE_2D,ut,Dt,at.width,at.height);else{let W=at.width,Q=at.height;for(let ht=0;ht<ut;ht++)e.texImage2D(a.TEXTURE_2D,ht,Dt,W,Q,0,_t,Lt,null),W>>=1,Q>>=1}}else if(qt.length>0){if(Ot&&pe){const W=Nt(qt[0]);e.texStorage2D(a.TEXTURE_2D,ut,Dt,W.width,W.height)}for(let W=0,Q=qt.length;W<Q;W++)xt=qt[W],Ot?k&&e.texSubImage2D(a.TEXTURE_2D,W,0,0,_t,Lt,xt):e.texImage2D(a.TEXTURE_2D,W,Dt,_t,Lt,xt);M.generateMipmaps=!1}else if(Ot){if(pe){const W=Nt(at);e.texStorage2D(a.TEXTURE_2D,ut,Dt,W.width,W.height)}k&&e.texSubImage2D(a.TEXTURE_2D,0,0,0,_t,Lt,at)}else e.texImage2D(a.TEXTURE_2D,0,Dt,_t,Lt,at);p(M)&&m(J),Et.__version=Y.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function K(A,M,N){if(M.image.length!==6)return;const J=te(A,M),et=M.source;e.bindTexture(a.TEXTURE_CUBE_MAP,A.__webglTexture,a.TEXTURE0+N);const Y=i.get(et);if(et.version!==Y.__version||J===!0){e.activeTexture(a.TEXTURE0+N);const Et=oe.getPrimaries(oe.workingColorSpace),lt=M.colorSpace===Qi?null:oe.getPrimaries(M.colorSpace),vt=M.colorSpace===Qi||Et===lt?a.NONE:a.BROWSER_DEFAULT_WEBGL;a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,M.flipY),a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),a.pixelStorei(a.UNPACK_ALIGNMENT,M.unpackAlignment),a.pixelStorei(a.UNPACK_COLORSPACE_CONVERSION_WEBGL,vt);const Qt=M.isCompressedTexture||M.image[0].isCompressedTexture,at=M.image[0]&&M.image[0].isDataTexture,_t=[];for(let Q=0;Q<6;Q++)!Qt&&!at?_t[Q]=v(M.image[Q],!0,n.maxCubemapSize):_t[Q]=at?M.image[Q].image:M.image[Q],_t[Q]=me(M,_t[Q]);const Lt=_t[0],Dt=s.convert(M.format,M.colorSpace),xt=s.convert(M.type),qt=x(M.internalFormat,Dt,xt,M.colorSpace),Ot=M.isVideoTexture!==!0,pe=Y.__version===void 0||J===!0,k=et.dataReady;let ut=b(M,Lt);St(a.TEXTURE_CUBE_MAP,M);let W;if(Qt){Ot&&pe&&e.texStorage2D(a.TEXTURE_CUBE_MAP,ut,qt,Lt.width,Lt.height);for(let Q=0;Q<6;Q++){W=_t[Q].mipmaps;for(let ht=0;ht<W.length;ht++){const ft=W[ht];M.format!==yi?Dt!==null?Ot?k&&e.compressedTexSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ht,0,0,ft.width,ft.height,Dt,ft.data):e.compressedTexImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ht,qt,ft.width,ft.height,0,ft.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ot?k&&e.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ht,0,0,ft.width,ft.height,Dt,xt,ft.data):e.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ht,qt,ft.width,ft.height,0,Dt,xt,ft.data)}}}else{if(W=M.mipmaps,Ot&&pe){W.length>0&&ut++;const Q=Nt(_t[0]);e.texStorage2D(a.TEXTURE_CUBE_MAP,ut,qt,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(at){Ot?k&&e.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,_t[Q].width,_t[Q].height,Dt,xt,_t[Q].data):e.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,qt,_t[Q].width,_t[Q].height,0,Dt,xt,_t[Q].data);for(let ht=0;ht<W.length;ht++){const Yt=W[ht].image[Q].image;Ot?k&&e.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ht+1,0,0,Yt.width,Yt.height,Dt,xt,Yt.data):e.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ht+1,qt,Yt.width,Yt.height,0,Dt,xt,Yt.data)}}else{Ot?k&&e.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Dt,xt,_t[Q]):e.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,qt,Dt,xt,_t[Q]);for(let ht=0;ht<W.length;ht++){const ft=W[ht];Ot?k&&e.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ht+1,0,0,Dt,xt,ft.image[Q]):e.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ht+1,qt,Dt,xt,ft.image[Q])}}}p(M)&&m(a.TEXTURE_CUBE_MAP),Y.__version=et.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function it(A,M,N,J,et,Y){const Et=s.convert(N.format,N.colorSpace),lt=s.convert(N.type),vt=x(N.internalFormat,Et,lt,N.colorSpace);if(!i.get(M).__hasExternalTextures){const at=Math.max(1,M.width>>Y),_t=Math.max(1,M.height>>Y);et===a.TEXTURE_3D||et===a.TEXTURE_2D_ARRAY?e.texImage3D(et,Y,vt,at,_t,M.depth,0,Et,lt,null):e.texImage2D(et,Y,vt,at,_t,0,Et,lt,null)}e.bindFramebuffer(a.FRAMEBUFFER,A),Jt(M)?r.framebufferTexture2DMultisampleEXT(a.FRAMEBUFFER,J,et,i.get(N).__webglTexture,0,jt(M)):(et===a.TEXTURE_2D||et>=a.TEXTURE_CUBE_MAP_POSITIVE_X&&et<=a.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&a.framebufferTexture2D(a.FRAMEBUFFER,J,et,i.get(N).__webglTexture,Y),e.bindFramebuffer(a.FRAMEBUFFER,null)}function wt(A,M,N){if(a.bindRenderbuffer(a.RENDERBUFFER,A),M.depthBuffer){const J=M.depthTexture,et=J&&J.isDepthTexture?J.type:null,Y=y(M.stencilBuffer,et),Et=M.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT,lt=jt(M);Jt(M)?r.renderbufferStorageMultisampleEXT(a.RENDERBUFFER,lt,Y,M.width,M.height):N?a.renderbufferStorageMultisample(a.RENDERBUFFER,lt,Y,M.width,M.height):a.renderbufferStorage(a.RENDERBUFFER,Y,M.width,M.height),a.framebufferRenderbuffer(a.FRAMEBUFFER,Et,a.RENDERBUFFER,A)}else{const J=M.textures;for(let et=0;et<J.length;et++){const Y=J[et],Et=s.convert(Y.format,Y.colorSpace),lt=s.convert(Y.type),vt=x(Y.internalFormat,Et,lt,Y.colorSpace),Qt=jt(M);N&&Jt(M)===!1?a.renderbufferStorageMultisample(a.RENDERBUFFER,Qt,vt,M.width,M.height):Jt(M)?r.renderbufferStorageMultisampleEXT(a.RENDERBUFFER,Qt,vt,M.width,M.height):a.renderbufferStorage(a.RENDERBUFFER,vt,M.width,M.height)}}a.bindRenderbuffer(a.RENDERBUFFER,null)}function gt(A,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(a.FRAMEBUFFER,A),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),q(M.depthTexture,0);const J=i.get(M.depthTexture).__webglTexture,et=jt(M);if(M.depthTexture.format===$n)Jt(M)?r.framebufferTexture2DMultisampleEXT(a.FRAMEBUFFER,a.DEPTH_ATTACHMENT,a.TEXTURE_2D,J,0,et):a.framebufferTexture2D(a.FRAMEBUFFER,a.DEPTH_ATTACHMENT,a.TEXTURE_2D,J,0);else if(M.depthTexture.format===ts)Jt(M)?r.framebufferTexture2DMultisampleEXT(a.FRAMEBUFFER,a.DEPTH_STENCIL_ATTACHMENT,a.TEXTURE_2D,J,0,et):a.framebufferTexture2D(a.FRAMEBUFFER,a.DEPTH_STENCIL_ATTACHMENT,a.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function Ft(A){const M=i.get(A),N=A.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==A.depthTexture){const J=A.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),J){const et=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,J.removeEventListener("dispose",et)};J.addEventListener("dispose",et),M.__depthDisposeCallback=et}M.__boundDepthTexture=J}if(A.depthTexture&&!M.__autoAllocateDepthBuffer){if(N)throw new Error("target.depthTexture not supported in Cube render targets");gt(M.__webglFramebuffer,A)}else if(N){M.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(e.bindFramebuffer(a.FRAMEBUFFER,M.__webglFramebuffer[J]),M.__webglDepthbuffer[J]===void 0)M.__webglDepthbuffer[J]=a.createRenderbuffer(),wt(M.__webglDepthbuffer[J],A,!1);else{const et=A.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT,Y=M.__webglDepthbuffer[J];a.bindRenderbuffer(a.RENDERBUFFER,Y),a.framebufferRenderbuffer(a.FRAMEBUFFER,et,a.RENDERBUFFER,Y)}}else if(e.bindFramebuffer(a.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=a.createRenderbuffer(),wt(M.__webglDepthbuffer,A,!1);else{const J=A.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT,et=M.__webglDepthbuffer;a.bindRenderbuffer(a.RENDERBUFFER,et),a.framebufferRenderbuffer(a.FRAMEBUFFER,J,a.RENDERBUFFER,et)}e.bindFramebuffer(a.FRAMEBUFFER,null)}function zt(A,M,N){const J=i.get(A);M!==void 0&&it(J.__webglFramebuffer,A,A.texture,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,0),N!==void 0&&Ft(A)}function $t(A){const M=A.texture,N=i.get(A),J=i.get(M);A.addEventListener("dispose",T);const et=A.textures,Y=A.isWebGLCubeRenderTarget===!0,Et=et.length>1;if(Et||(J.__webglTexture===void 0&&(J.__webglTexture=a.createTexture()),J.__version=M.version,o.memory.textures++),Y){N.__webglFramebuffer=[];for(let lt=0;lt<6;lt++)if(M.mipmaps&&M.mipmaps.length>0){N.__webglFramebuffer[lt]=[];for(let vt=0;vt<M.mipmaps.length;vt++)N.__webglFramebuffer[lt][vt]=a.createFramebuffer()}else N.__webglFramebuffer[lt]=a.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){N.__webglFramebuffer=[];for(let lt=0;lt<M.mipmaps.length;lt++)N.__webglFramebuffer[lt]=a.createFramebuffer()}else N.__webglFramebuffer=a.createFramebuffer();if(Et)for(let lt=0,vt=et.length;lt<vt;lt++){const Qt=i.get(et[lt]);Qt.__webglTexture===void 0&&(Qt.__webglTexture=a.createTexture(),o.memory.textures++)}if(A.samples>0&&Jt(A)===!1){N.__webglMultisampledFramebuffer=a.createFramebuffer(),N.__webglColorRenderbuffer=[],e.bindFramebuffer(a.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let lt=0;lt<et.length;lt++){const vt=et[lt];N.__webglColorRenderbuffer[lt]=a.createRenderbuffer(),a.bindRenderbuffer(a.RENDERBUFFER,N.__webglColorRenderbuffer[lt]);const Qt=s.convert(vt.format,vt.colorSpace),at=s.convert(vt.type),_t=x(vt.internalFormat,Qt,at,vt.colorSpace,A.isXRRenderTarget===!0),Lt=jt(A);a.renderbufferStorageMultisample(a.RENDERBUFFER,Lt,_t,A.width,A.height),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0+lt,a.RENDERBUFFER,N.__webglColorRenderbuffer[lt])}a.bindRenderbuffer(a.RENDERBUFFER,null),A.depthBuffer&&(N.__webglDepthRenderbuffer=a.createRenderbuffer(),wt(N.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(a.FRAMEBUFFER,null)}}if(Y){e.bindTexture(a.TEXTURE_CUBE_MAP,J.__webglTexture),St(a.TEXTURE_CUBE_MAP,M);for(let lt=0;lt<6;lt++)if(M.mipmaps&&M.mipmaps.length>0)for(let vt=0;vt<M.mipmaps.length;vt++)it(N.__webglFramebuffer[lt][vt],A,M,a.COLOR_ATTACHMENT0,a.TEXTURE_CUBE_MAP_POSITIVE_X+lt,vt);else it(N.__webglFramebuffer[lt],A,M,a.COLOR_ATTACHMENT0,a.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0);p(M)&&m(a.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Et){for(let lt=0,vt=et.length;lt<vt;lt++){const Qt=et[lt],at=i.get(Qt);e.bindTexture(a.TEXTURE_2D,at.__webglTexture),St(a.TEXTURE_2D,Qt),it(N.__webglFramebuffer,A,Qt,a.COLOR_ATTACHMENT0+lt,a.TEXTURE_2D,0),p(Qt)&&m(a.TEXTURE_2D)}e.unbindTexture()}else{let lt=a.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(lt=A.isWebGL3DRenderTarget?a.TEXTURE_3D:a.TEXTURE_2D_ARRAY),e.bindTexture(lt,J.__webglTexture),St(lt,M),M.mipmaps&&M.mipmaps.length>0)for(let vt=0;vt<M.mipmaps.length;vt++)it(N.__webglFramebuffer[vt],A,M,a.COLOR_ATTACHMENT0,lt,vt);else it(N.__webglFramebuffer,A,M,a.COLOR_ATTACHMENT0,lt,0);p(M)&&m(lt),e.unbindTexture()}A.depthBuffer&&Ft(A)}function he(A){const M=A.textures;for(let N=0,J=M.length;N<J;N++){const et=M[N];if(p(et)){const Y=A.isWebGLCubeRenderTarget?a.TEXTURE_CUBE_MAP:a.TEXTURE_2D,Et=i.get(et).__webglTexture;e.bindTexture(Y,Et),m(Y),e.unbindTexture()}}}const Kt=[],P=[];function $e(A){if(A.samples>0){if(Jt(A)===!1){const M=A.textures,N=A.width,J=A.height;let et=a.COLOR_BUFFER_BIT;const Y=A.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT,Et=i.get(A),lt=M.length>1;if(lt)for(let vt=0;vt<M.length;vt++)e.bindFramebuffer(a.FRAMEBUFFER,Et.__webglMultisampledFramebuffer),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0+vt,a.RENDERBUFFER,null),e.bindFramebuffer(a.FRAMEBUFFER,Et.__webglFramebuffer),a.framebufferTexture2D(a.DRAW_FRAMEBUFFER,a.COLOR_ATTACHMENT0+vt,a.TEXTURE_2D,null,0);e.bindFramebuffer(a.READ_FRAMEBUFFER,Et.__webglMultisampledFramebuffer),e.bindFramebuffer(a.DRAW_FRAMEBUFFER,Et.__webglFramebuffer);for(let vt=0;vt<M.length;vt++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(et|=a.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(et|=a.STENCIL_BUFFER_BIT)),lt){a.framebufferRenderbuffer(a.READ_FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.RENDERBUFFER,Et.__webglColorRenderbuffer[vt]);const Qt=i.get(M[vt]).__webglTexture;a.framebufferTexture2D(a.DRAW_FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,Qt,0)}a.blitFramebuffer(0,0,N,J,0,0,N,J,et,a.NEAREST),c===!0&&(Kt.length=0,P.length=0,Kt.push(a.COLOR_ATTACHMENT0+vt),A.depthBuffer&&A.resolveDepthBuffer===!1&&(Kt.push(Y),P.push(Y),a.invalidateFramebuffer(a.DRAW_FRAMEBUFFER,P)),a.invalidateFramebuffer(a.READ_FRAMEBUFFER,Kt))}if(e.bindFramebuffer(a.READ_FRAMEBUFFER,null),e.bindFramebuffer(a.DRAW_FRAMEBUFFER,null),lt)for(let vt=0;vt<M.length;vt++){e.bindFramebuffer(a.FRAMEBUFFER,Et.__webglMultisampledFramebuffer),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0+vt,a.RENDERBUFFER,Et.__webglColorRenderbuffer[vt]);const Qt=i.get(M[vt]).__webglTexture;e.bindFramebuffer(a.FRAMEBUFFER,Et.__webglFramebuffer),a.framebufferTexture2D(a.DRAW_FRAMEBUFFER,a.COLOR_ATTACHMENT0+vt,a.TEXTURE_2D,Qt,0)}e.bindFramebuffer(a.DRAW_FRAMEBUFFER,Et.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&c){const M=A.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT;a.invalidateFramebuffer(a.DRAW_FRAMEBUFFER,[M])}}}function jt(A){return Math.min(n.maxSamples,A.samples)}function Jt(A){const M=i.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function It(A){const M=o.render.frame;h.get(A)!==M&&(h.set(A,M),A.update())}function me(A,M){const N=A.colorSpace,J=A.format,et=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||N!==an&&N!==Qi&&(oe.getTransfer(N)===ve?(J!==yi||et!==Bi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",N)),M}function Nt(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(l.width=A.naturalWidth||A.width,l.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(l.width=A.displayWidth,l.height=A.displayHeight):(l.width=A.width,l.height=A.height),l}this.allocateTextureUnit=L,this.resetTextureUnits=w,this.setTexture2D=q,this.setTexture2DArray=Z,this.setTexture3D=V,this.setTextureCube=tt,this.rebindTextures=zt,this.setupRenderTarget=$t,this.updateRenderTargetMipmap=he,this.updateMultisampleRenderTarget=$e,this.setupDepthRenderbuffer=Ft,this.setupFrameBufferTexture=it,this.useMultisampledRTT=Jt}function Um(a,t){function e(i,n=Qi){let s;const o=oe.getTransfer(n);if(i===Bi)return a.UNSIGNED_BYTE;if(i===pr)return a.UNSIGNED_SHORT_4_4_4_4;if(i===mr)return a.UNSIGNED_SHORT_5_5_5_1;if(i===ol)return a.UNSIGNED_INT_5_9_9_9_REV;if(i===sl)return a.BYTE;if(i===al)return a.SHORT;if(i===Ts)return a.UNSIGNED_SHORT;if(i===fr)return a.INT;if(i===yn)return a.UNSIGNED_INT;if(i===Si)return a.FLOAT;if(i===Cs)return a.HALF_FLOAT;if(i===rl)return a.ALPHA;if(i===cl)return a.RGB;if(i===yi)return a.RGBA;if(i===ll)return a.LUMINANCE;if(i===hl)return a.LUMINANCE_ALPHA;if(i===$n)return a.DEPTH_COMPONENT;if(i===ts)return a.DEPTH_STENCIL;if(i===gr)return a.RED;if(i===vr)return a.RED_INTEGER;if(i===dl)return a.RG;if(i===_r)return a.RG_INTEGER;if(i===xr)return a.RGBA_INTEGER;if(i===la||i===ha||i===da||i===ua)if(o===ve)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===la)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ha)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===da)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===ua)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===la)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ha)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===da)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===ua)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Lo||i===Do||i===Uo||i===No)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Lo)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Do)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Uo)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===No)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Fo||i===Oo||i===Bo)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Fo||i===Oo)return o===ve?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Bo)return o===ve?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Ho||i===Go||i===Vo||i===Wo||i===jo||i===qo||i===Xo||i===$o||i===Ko||i===Yo||i===Zo||i===Jo||i===Qo||i===tr)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Ho)return o===ve?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Go)return o===ve?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Vo)return o===ve?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Wo)return o===ve?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===jo)return o===ve?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===qo)return o===ve?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Xo)return o===ve?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===$o)return o===ve?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Ko)return o===ve?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Yo)return o===ve?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Zo)return o===ve?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Jo)return o===ve?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Qo)return o===ve?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===tr)return o===ve?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===fa||i===er||i===ir)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(i===fa)return o===ve?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===er)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===ir)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===ul||i===nr||i===sr||i===ar)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(i===fa)return s.COMPRESSED_RED_RGTC1_EXT;if(i===nr)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===sr)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===ar)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Qn?a.UNSIGNED_INT_24_8:a[i]!==void 0?a[i]:null}return{convert:e}}class Nm extends ei{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class nt extends Ce{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Fm={type:"move"};class lo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new nt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new nt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new nt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let n=null,s=null,o=null;const r=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const v of t.hand.values()){const p=e.getJointPose(v,i),m=this._getHandJoint(l,v);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;l.inputState.pinching&&u>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&u<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));r!==null&&(n=e.getPose(t.targetRaySpace,i),n===null&&s!==null&&(n=s),n!==null&&(r.matrix.fromArray(n.transform.matrix),r.matrix.decompose(r.position,r.rotation,r.scale),r.matrixWorldNeedsUpdate=!0,n.linearVelocity?(r.hasLinearVelocity=!0,r.linearVelocity.copy(n.linearVelocity)):r.hasLinearVelocity=!1,n.angularVelocity?(r.hasAngularVelocity=!0,r.angularVelocity.copy(n.angularVelocity)):r.hasAngularVelocity=!1,this.dispatchEvent(Fm)))}return r!==null&&(r.visible=n!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new nt;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const Om=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Bm=`
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

}`;class Hm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const n=new Oe,s=t.properties.get(n);s.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new sn({vertexShader:Om,fragmentShader:Bm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new yt(new Ea(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Gm extends is{constructor(t,e){super();const i=this;let n=null,s=1,o=null,r="local-floor",c=1,l=null,h=null,d=null,u=null,f=null,g=null;const v=new Hm,p=e.getContextAttributes();let m=null,x=null;const y=[],b=[],z=new Vt;let T=null;const E=new ei;E.layers.enable(1),E.viewport=new de;const R=new ei;R.layers.enable(2),R.viewport=new de;const U=[E,R],_=new Nm;_.layers.enable(1),_.layers.enable(2);let w=null,L=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let it=y[K];return it===void 0&&(it=new lo,y[K]=it),it.getTargetRaySpace()},this.getControllerGrip=function(K){let it=y[K];return it===void 0&&(it=new lo,y[K]=it),it.getGripSpace()},this.getHand=function(K){let it=y[K];return it===void 0&&(it=new lo,y[K]=it),it.getHandSpace()};function O(K){const it=b.indexOf(K.inputSource);if(it===-1)return;const wt=y[it];wt!==void 0&&(wt.update(K.inputSource,K.frame,l||o),wt.dispatchEvent({type:K.type,data:K.inputSource}))}function q(){n.removeEventListener("select",O),n.removeEventListener("selectstart",O),n.removeEventListener("selectend",O),n.removeEventListener("squeeze",O),n.removeEventListener("squeezestart",O),n.removeEventListener("squeezeend",O),n.removeEventListener("end",q),n.removeEventListener("inputsourceschange",Z);for(let K=0;K<y.length;K++){const it=b[K];it!==null&&(b[K]=null,y[K].disconnect(it))}w=null,L=null,v.reset(),t.setRenderTarget(m),f=null,u=null,d=null,n=null,x=null,ce.stop(),i.isPresenting=!1,t.setPixelRatio(T),t.setSize(z.width,z.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){s=K,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){r=K,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(K){l=K},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return n},this.setSession=async function(K){if(n=K,n!==null){if(m=t.getRenderTarget(),n.addEventListener("select",O),n.addEventListener("selectstart",O),n.addEventListener("selectend",O),n.addEventListener("squeeze",O),n.addEventListener("squeezestart",O),n.addEventListener("squeezeend",O),n.addEventListener("end",q),n.addEventListener("inputsourceschange",Z),p.xrCompatible!==!0&&await e.makeXRCompatible(),T=t.getPixelRatio(),t.getSize(z),n.renderState.layers===void 0){const it={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(n,e,it),n.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new Mn(f.framebufferWidth,f.framebufferHeight,{format:yi,type:Bi,colorSpace:t.outputColorSpace,stencilBuffer:p.stencil})}else{let it=null,wt=null,gt=null;p.depth&&(gt=p.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,it=p.stencil?ts:$n,wt=p.stencil?Qn:yn);const Ft={colorFormat:e.RGBA8,depthFormat:gt,scaleFactor:s};d=new XRWebGLBinding(n,e),u=d.createProjectionLayer(Ft),n.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),x=new Mn(u.textureWidth,u.textureHeight,{format:yi,type:Bi,depthTexture:new Al(u.textureWidth,u.textureHeight,wt,void 0,void 0,void 0,void 0,void 0,void 0,it),stencilBuffer:p.stencil,colorSpace:t.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await n.requestReferenceSpace(r),ce.setContext(n),ce.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function Z(K){for(let it=0;it<K.removed.length;it++){const wt=K.removed[it],gt=b.indexOf(wt);gt>=0&&(b[gt]=null,y[gt].disconnect(wt))}for(let it=0;it<K.added.length;it++){const wt=K.added[it];let gt=b.indexOf(wt);if(gt===-1){for(let zt=0;zt<y.length;zt++)if(zt>=b.length){b.push(wt),gt=zt;break}else if(b[zt]===null){b[zt]=wt,gt=zt;break}if(gt===-1)break}const Ft=y[gt];Ft&&Ft.connect(wt)}}const V=new C,tt=new C;function $(K,it,wt){V.setFromMatrixPosition(it.matrixWorld),tt.setFromMatrixPosition(wt.matrixWorld);const gt=V.distanceTo(tt),Ft=it.projectionMatrix.elements,zt=wt.projectionMatrix.elements,$t=Ft[14]/(Ft[10]-1),he=Ft[14]/(Ft[10]+1),Kt=(Ft[9]+1)/Ft[5],P=(Ft[9]-1)/Ft[5],$e=(Ft[8]-1)/Ft[0],jt=(zt[8]+1)/zt[0],Jt=$t*$e,It=$t*jt,me=gt/(-$e+jt),Nt=me*-$e;if(it.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(Nt),K.translateZ(me),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),Ft[10]===-1)K.projectionMatrix.copy(it.projectionMatrix),K.projectionMatrixInverse.copy(it.projectionMatrixInverse);else{const A=$t+me,M=he+me,N=Jt-Nt,J=It+(gt-Nt),et=Kt*he/M*A,Y=P*he/M*A;K.projectionMatrix.makePerspective(N,J,et,Y,A,M),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function pt(K,it){it===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(it.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(n===null)return;let it=K.near,wt=K.far;v.texture!==null&&(v.depthNear>0&&(it=v.depthNear),v.depthFar>0&&(wt=v.depthFar)),_.near=R.near=E.near=it,_.far=R.far=E.far=wt,(w!==_.near||L!==_.far)&&(n.updateRenderState({depthNear:_.near,depthFar:_.far}),w=_.near,L=_.far);const gt=K.parent,Ft=_.cameras;pt(_,gt);for(let zt=0;zt<Ft.length;zt++)pt(Ft[zt],gt);Ft.length===2?$(_,E,R):_.projectionMatrix.copy(E.projectionMatrix),mt(K,_,gt)};function mt(K,it,wt){wt===null?K.matrix.copy(it.matrixWorld):(K.matrix.copy(wt.matrixWorld),K.matrix.invert(),K.matrix.multiply(it.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(it.projectionMatrix),K.projectionMatrixInverse.copy(it.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=or*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return _},this.getFoveation=function(){if(!(u===null&&f===null))return c},this.setFoveation=function(K){c=K,u!==null&&(u.fixedFoveation=K),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=K)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(_)};let St=null;function te(K,it){if(h=it.getViewerPose(l||o),g=it,h!==null){const wt=h.views;f!==null&&(t.setRenderTargetFramebuffer(x,f.framebuffer),t.setRenderTarget(x));let gt=!1;wt.length!==_.cameras.length&&(_.cameras.length=0,gt=!0);for(let zt=0;zt<wt.length;zt++){const $t=wt[zt];let he=null;if(f!==null)he=f.getViewport($t);else{const P=d.getViewSubImage(u,$t);he=P.viewport,zt===0&&(t.setRenderTargetTextures(x,P.colorTexture,u.ignoreDepthValues?void 0:P.depthStencilTexture),t.setRenderTarget(x))}let Kt=U[zt];Kt===void 0&&(Kt=new ei,Kt.layers.enable(zt),Kt.viewport=new de,U[zt]=Kt),Kt.matrix.fromArray($t.transform.matrix),Kt.matrix.decompose(Kt.position,Kt.quaternion,Kt.scale),Kt.projectionMatrix.fromArray($t.projectionMatrix),Kt.projectionMatrixInverse.copy(Kt.projectionMatrix).invert(),Kt.viewport.set(he.x,he.y,he.width,he.height),zt===0&&(_.matrix.copy(Kt.matrix),_.matrix.decompose(_.position,_.quaternion,_.scale)),gt===!0&&_.cameras.push(Kt)}const Ft=n.enabledFeatures;if(Ft&&Ft.includes("depth-sensing")){const zt=d.getDepthInformation(wt[0]);zt&&zt.isValid&&zt.texture&&v.init(t,zt,n.renderState)}}for(let wt=0;wt<y.length;wt++){const gt=b[wt],Ft=y[wt];gt!==null&&Ft!==void 0&&Ft.update(gt,it,l||o)}St&&St(K,it),it.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:it}),g=null}const ce=new El;ce.setAnimationLoop(te),this.setAnimationLoop=function(K){St=K},this.dispose=function(){}}}const un=new Mi,Vm=new ue;function Wm(a,t){function e(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function i(p,m){m.color.getRGB(p.fogColor.value,wl(a)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function n(p,m,x,y,b){m.isMeshBasicMaterial||m.isMeshLambertMaterial?s(p,m):m.isMeshToonMaterial?(s(p,m),d(p,m)):m.isMeshPhongMaterial?(s(p,m),h(p,m)):m.isMeshStandardMaterial?(s(p,m),u(p,m),m.isMeshPhysicalMaterial&&f(p,m,b)):m.isMeshMatcapMaterial?(s(p,m),g(p,m)):m.isMeshDepthMaterial?s(p,m):m.isMeshDistanceMaterial?(s(p,m),v(p,m)):m.isMeshNormalMaterial?s(p,m):m.isLineBasicMaterial?(o(p,m),m.isLineDashedMaterial&&r(p,m)):m.isPointsMaterial?c(p,m,x,y):m.isSpriteMaterial?l(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,e(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===Xe&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,e(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===Xe&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,e(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,e(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const x=t.get(m),y=x.envMap,b=x.envMapRotation;y&&(p.envMap.value=y,un.copy(b),un.x*=-1,un.y*=-1,un.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(un.y*=-1,un.z*=-1),p.envMapRotation.value.setFromMatrix4(Vm.makeRotationFromEuler(un)),p.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,p.aoMapTransform))}function o(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform))}function r(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function c(p,m,x,y){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*x,p.scale.value=y*.5,m.map&&(p.map.value=m.map,e(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function l(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function h(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function d(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function u(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,x){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Xe&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=x.texture,p.transmissionSamplerSize.value.set(x.width,x.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function v(p,m){const x=t.get(m).light;p.referencePosition.value.setFromMatrixPosition(x.matrixWorld),p.nearDistance.value=x.shadow.camera.near,p.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:n}}function jm(a,t,e,i){let n={},s={},o=[];const r=a.getParameter(a.MAX_UNIFORM_BUFFER_BINDINGS);function c(x,y){const b=y.program;i.uniformBlockBinding(x,b)}function l(x,y){let b=n[x.id];b===void 0&&(g(x),b=h(x),n[x.id]=b,x.addEventListener("dispose",p));const z=y.program;i.updateUBOMapping(x,z);const T=t.render.frame;s[x.id]!==T&&(u(x),s[x.id]=T)}function h(x){const y=d();x.__bindingPointIndex=y;const b=a.createBuffer(),z=x.__size,T=x.usage;return a.bindBuffer(a.UNIFORM_BUFFER,b),a.bufferData(a.UNIFORM_BUFFER,z,T),a.bindBuffer(a.UNIFORM_BUFFER,null),a.bindBufferBase(a.UNIFORM_BUFFER,y,b),b}function d(){for(let x=0;x<r;x++)if(o.indexOf(x)===-1)return o.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(x){const y=n[x.id],b=x.uniforms,z=x.__cache;a.bindBuffer(a.UNIFORM_BUFFER,y);for(let T=0,E=b.length;T<E;T++){const R=Array.isArray(b[T])?b[T]:[b[T]];for(let U=0,_=R.length;U<_;U++){const w=R[U];if(f(w,T,U,z)===!0){const L=w.__offset,O=Array.isArray(w.value)?w.value:[w.value];let q=0;for(let Z=0;Z<O.length;Z++){const V=O[Z],tt=v(V);typeof V=="number"||typeof V=="boolean"?(w.__data[0]=V,a.bufferSubData(a.UNIFORM_BUFFER,L+q,w.__data)):V.isMatrix3?(w.__data[0]=V.elements[0],w.__data[1]=V.elements[1],w.__data[2]=V.elements[2],w.__data[3]=0,w.__data[4]=V.elements[3],w.__data[5]=V.elements[4],w.__data[6]=V.elements[5],w.__data[7]=0,w.__data[8]=V.elements[6],w.__data[9]=V.elements[7],w.__data[10]=V.elements[8],w.__data[11]=0):(V.toArray(w.__data,q),q+=tt.storage/Float32Array.BYTES_PER_ELEMENT)}a.bufferSubData(a.UNIFORM_BUFFER,L,w.__data)}}}a.bindBuffer(a.UNIFORM_BUFFER,null)}function f(x,y,b,z){const T=x.value,E=y+"_"+b;if(z[E]===void 0)return typeof T=="number"||typeof T=="boolean"?z[E]=T:z[E]=T.clone(),!0;{const R=z[E];if(typeof T=="number"||typeof T=="boolean"){if(R!==T)return z[E]=T,!0}else if(R.equals(T)===!1)return R.copy(T),!0}return!1}function g(x){const y=x.uniforms;let b=0;const z=16;for(let E=0,R=y.length;E<R;E++){const U=Array.isArray(y[E])?y[E]:[y[E]];for(let _=0,w=U.length;_<w;_++){const L=U[_],O=Array.isArray(L.value)?L.value:[L.value];for(let q=0,Z=O.length;q<Z;q++){const V=O[q],tt=v(V),$=b%z,pt=$%tt.boundary,mt=$+pt;b+=pt,mt!==0&&z-mt<tt.storage&&(b+=z-mt),L.__data=new Float32Array(tt.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=b,b+=tt.storage}}}const T=b%z;return T>0&&(b+=z-T),x.__size=b,x.__cache={},this}function v(x){const y={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(y.boundary=4,y.storage=4):x.isVector2?(y.boundary=8,y.storage=8):x.isVector3||x.isColor?(y.boundary=16,y.storage=12):x.isVector4?(y.boundary=16,y.storage=16):x.isMatrix3?(y.boundary=48,y.storage=48):x.isMatrix4?(y.boundary=64,y.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),y}function p(x){const y=x.target;y.removeEventListener("dispose",p);const b=o.indexOf(y.__bindingPointIndex);o.splice(b,1),a.deleteBuffer(n[y.id]),delete n[y.id],delete s[y.id]}function m(){for(const x in n)a.deleteBuffer(n[x]);o=[],n={},s={}}return{bind:c,update:l,dispose:m}}class qm{constructor(t={}){const{canvas:e=kh(),context:i=null,depth:n=!0,stencil:s=!1,alpha:o=!1,antialias:r=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1}=t;this.isWebGLRenderer=!0;let u;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");u=i.getContextAttributes().alpha}else u=o;const f=new Uint32Array(4),g=new Int32Array(4);let v=null,p=null;const m=[],x=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ti,this.toneMapping=en,this.toneMappingExposure=1;const y=this;let b=!1,z=0,T=0,E=null,R=-1,U=null;const _=new de,w=new de;let L=null;const O=new st(0);let q=0,Z=e.width,V=e.height,tt=1,$=null,pt=null;const mt=new de(0,0,Z,V),St=new de(0,0,Z,V);let te=!1;const ce=new wr;let K=!1,it=!1;const wt=new ue,gt=new ue,Ft=new C,zt=new de,$t={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let he=!1;function Kt(){return E===null?tt:1}let P=i;function $e(S,I){return e.getContext(S,I)}try{const S={alpha:!0,depth:n,stencil:s,antialias:r,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${dr}`),e.addEventListener("webglcontextlost",Q,!1),e.addEventListener("webglcontextrestored",ht,!1),e.addEventListener("webglcontextcreationerror",ft,!1),P===null){const I="webgl2";if(P=$e(I,S),P===null)throw $e(I)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let jt,Jt,It,me,Nt,A,M,N,J,et,Y,Et,lt,vt,Qt,at,_t,Lt,Dt,xt,qt,Ot,pe,k;function ut(){jt=new Zf(P),jt.init(),Ot=new Um(P,jt),Jt=new jf(P,jt,t,Ot),It=new Im(P),Jt.reverseDepthBuffer&&It.buffers.depth.setReversed(!0),me=new tp(P),Nt=new _m,A=new Dm(P,jt,It,Nt,Jt,Ot,me),M=new Xf(y),N=new Yf(y),J=new od(P),pe=new Vf(P,J),et=new Jf(P,J,me,pe),Y=new ip(P,et,J,me),Dt=new ep(P,Jt,A),at=new qf(Nt),Et=new vm(y,M,N,jt,Jt,pe,at),lt=new Wm(y,Nt),vt=new ym,Qt=new Tm(jt),Lt=new Gf(y,M,N,It,Y,u,c),_t=new Pm(y,Y,Jt),k=new jm(P,me,Jt,It),xt=new Wf(P,jt,me),qt=new Qf(P,jt,me),me.programs=Et.programs,y.capabilities=Jt,y.extensions=jt,y.properties=Nt,y.renderLists=vt,y.shadowMap=_t,y.state=It,y.info=me}ut();const W=new Gm(y,P);this.xr=W,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const S=jt.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=jt.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return tt},this.setPixelRatio=function(S){S!==void 0&&(tt=S,this.setSize(Z,V,!1))},this.getSize=function(S){return S.set(Z,V)},this.setSize=function(S,I,F=!0){if(W.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Z=S,V=I,e.width=Math.floor(S*tt),e.height=Math.floor(I*tt),F===!0&&(e.style.width=S+"px",e.style.height=I+"px"),this.setViewport(0,0,S,I)},this.getDrawingBufferSize=function(S){return S.set(Z*tt,V*tt).floor()},this.setDrawingBufferSize=function(S,I,F){Z=S,V=I,tt=F,e.width=Math.floor(S*F),e.height=Math.floor(I*F),this.setViewport(0,0,S,I)},this.getCurrentViewport=function(S){return S.copy(_)},this.getViewport=function(S){return S.copy(mt)},this.setViewport=function(S,I,F,B){S.isVector4?mt.set(S.x,S.y,S.z,S.w):mt.set(S,I,F,B),It.viewport(_.copy(mt).multiplyScalar(tt).round())},this.getScissor=function(S){return S.copy(St)},this.setScissor=function(S,I,F,B){S.isVector4?St.set(S.x,S.y,S.z,S.w):St.set(S,I,F,B),It.scissor(w.copy(St).multiplyScalar(tt).round())},this.getScissorTest=function(){return te},this.setScissorTest=function(S){It.setScissorTest(te=S)},this.setOpaqueSort=function(S){$=S},this.setTransparentSort=function(S){pt=S},this.getClearColor=function(S){return S.copy(Lt.getClearColor())},this.setClearColor=function(){Lt.setClearColor.apply(Lt,arguments)},this.getClearAlpha=function(){return Lt.getClearAlpha()},this.setClearAlpha=function(){Lt.setClearAlpha.apply(Lt,arguments)},this.clear=function(S=!0,I=!0,F=!0){let B=0;if(S){let D=!1;if(E!==null){const ot=E.texture.format;D=ot===xr||ot===_r||ot===vr}if(D){const ot=E.texture.type,dt=ot===Bi||ot===yn||ot===Ts||ot===Qn||ot===pr||ot===mr,Mt=Lt.getClearColor(),bt=Lt.getClearAlpha(),Rt=Mt.r,Pt=Mt.g,Tt=Mt.b;dt?(f[0]=Rt,f[1]=Pt,f[2]=Tt,f[3]=bt,P.clearBufferuiv(P.COLOR,0,f)):(g[0]=Rt,g[1]=Pt,g[2]=Tt,g[3]=bt,P.clearBufferiv(P.COLOR,0,g))}else B|=P.COLOR_BUFFER_BIT}I&&(B|=P.DEPTH_BUFFER_BIT,P.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),F&&(B|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Q,!1),e.removeEventListener("webglcontextrestored",ht,!1),e.removeEventListener("webglcontextcreationerror",ft,!1),vt.dispose(),Qt.dispose(),Nt.dispose(),M.dispose(),N.dispose(),Y.dispose(),pe.dispose(),k.dispose(),Et.dispose(),W.dispose(),W.removeEventListener("sessionstart",zr),W.removeEventListener("sessionend",Pr),on.stop()};function Q(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function ht(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;const S=me.autoReset,I=_t.enabled,F=_t.autoUpdate,B=_t.needsUpdate,D=_t.type;ut(),me.autoReset=S,_t.enabled=I,_t.autoUpdate=F,_t.needsUpdate=B,_t.type=D}function ft(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Yt(S){const I=S.target;I.removeEventListener("dispose",Yt),we(I)}function we(S){He(S),Nt.remove(S)}function He(S){const I=Nt.get(S).programs;I!==void 0&&(I.forEach(function(F){Et.releaseProgram(F)}),S.isShaderMaterial&&Et.releaseShaderCache(S))}this.renderBufferDirect=function(S,I,F,B,D,ot){I===null&&(I=$t);const dt=D.isMesh&&D.matrixWorld.determinant()<0,Mt=Gl(S,I,F,B,D);It.setMaterial(B,dt);let bt=F.index,Rt=1;if(B.wireframe===!0){if(bt=et.getWireframeAttribute(F),bt===void 0)return;Rt=2}const Pt=F.drawRange,Tt=F.attributes.position;let le=Pt.start*Rt,ge=(Pt.start+Pt.count)*Rt;ot!==null&&(le=Math.max(le,ot.start*Rt),ge=Math.min(ge,(ot.start+ot.count)*Rt)),bt!==null?(le=Math.max(le,0),ge=Math.min(ge,bt.count)):Tt!=null&&(le=Math.max(le,0),ge=Math.min(ge,Tt.count));const xe=ge-le;if(xe<0||xe===1/0)return;pe.setup(D,B,Mt,F,bt);let Ke,se=xt;if(bt!==null&&(Ke=J.get(bt),se=qt,se.setIndex(Ke)),D.isMesh)B.wireframe===!0?(It.setLineWidth(B.wireframeLinewidth*Kt()),se.setMode(P.LINES)):se.setMode(P.TRIANGLES);else if(D.isLine){let Ct=B.linewidth;Ct===void 0&&(Ct=1),It.setLineWidth(Ct*Kt()),D.isLineSegments?se.setMode(P.LINES):D.isLineLoop?se.setMode(P.LINE_LOOP):se.setMode(P.LINE_STRIP)}else D.isPoints?se.setMode(P.POINTS):D.isSprite&&se.setMode(P.TRIANGLES);if(D.isBatchedMesh)if(D._multiDrawInstances!==null)se.renderMultiDrawInstances(D._multiDrawStarts,D._multiDrawCounts,D._multiDrawCount,D._multiDrawInstances);else if(jt.get("WEBGL_multi_draw"))se.renderMultiDraw(D._multiDrawStarts,D._multiDrawCounts,D._multiDrawCount);else{const Ct=D._multiDrawStarts,Le=D._multiDrawCounts,ae=D._multiDrawCount,ui=bt?J.get(bt).bytesPerElement:1,Sn=Nt.get(B).currentProgram.getUniforms();for(let Ye=0;Ye<ae;Ye++)Sn.setValue(P,"_gl_DrawID",Ye),se.render(Ct[Ye]/ui,Le[Ye])}else if(D.isInstancedMesh)se.renderInstances(le,xe,D.count);else if(F.isInstancedBufferGeometry){const Ct=F._maxInstanceCount!==void 0?F._maxInstanceCount:1/0,Le=Math.min(F.instanceCount,Ct);se.renderInstances(le,xe,Le)}else se.render(le,xe)};function ee(S,I,F){S.transparent===!0&&S.side===Se&&S.forceSinglePass===!1?(S.side=Xe,S.needsUpdate=!0,Is(S,I,F),S.side=Oi,S.needsUpdate=!0,Is(S,I,F),S.side=Se):Is(S,I,F)}this.compile=function(S,I,F=null){F===null&&(F=S),p=Qt.get(F),p.init(I),x.push(p),F.traverseVisible(function(D){D.isLight&&D.layers.test(I.layers)&&(p.pushLight(D),D.castShadow&&p.pushShadow(D))}),S!==F&&S.traverseVisible(function(D){D.isLight&&D.layers.test(I.layers)&&(p.pushLight(D),D.castShadow&&p.pushShadow(D))}),p.setupLights();const B=new Set;return S.traverse(function(D){if(!(D.isMesh||D.isPoints||D.isLine||D.isSprite))return;const ot=D.material;if(ot)if(Array.isArray(ot))for(let dt=0;dt<ot.length;dt++){const Mt=ot[dt];ee(Mt,F,D),B.add(Mt)}else ee(ot,F,D),B.add(ot)}),x.pop(),p=null,B},this.compileAsync=function(S,I,F=null){const B=this.compile(S,I,F);return new Promise(D=>{function ot(){if(B.forEach(function(dt){Nt.get(dt).currentProgram.isReady()&&B.delete(dt)}),B.size===0){D(S);return}setTimeout(ot,10)}jt.get("KHR_parallel_shader_compile")!==null?ot():setTimeout(ot,10)})};let Ge=null;function Ti(S){Ge&&Ge(S)}function zr(){on.stop()}function Pr(){on.start()}const on=new El;on.setAnimationLoop(Ti),typeof self<"u"&&on.setContext(self),this.setAnimationLoop=function(S){Ge=S,W.setAnimationLoop(S),S===null?on.stop():on.start()},W.addEventListener("sessionstart",zr),W.addEventListener("sessionend",Pr),this.render=function(S,I){if(I!==void 0&&I.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),W.enabled===!0&&W.isPresenting===!0&&(W.cameraAutoUpdate===!0&&W.updateCamera(I),I=W.getCamera()),S.isScene===!0&&S.onBeforeRender(y,S,I,E),p=Qt.get(S,x.length),p.init(I),x.push(p),gt.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),ce.setFromProjectionMatrix(gt),it=this.localClippingEnabled,K=at.init(this.clippingPlanes,it),v=vt.get(S,m.length),v.init(),m.push(v),W.enabled===!0&&W.isPresenting===!0){const ot=y.xr.getDepthSensingMesh();ot!==null&&Ra(ot,I,-1/0,y.sortObjects)}Ra(S,I,0,y.sortObjects),v.finish(),y.sortObjects===!0&&v.sort($,pt),he=W.enabled===!1||W.isPresenting===!1||W.hasDepthSensing()===!1,he&&Lt.addToRenderList(v,S),this.info.render.frame++,K===!0&&at.beginShadows();const F=p.state.shadowsArray;_t.render(F,S,I),K===!0&&at.endShadows(),this.info.autoReset===!0&&this.info.reset();const B=v.opaque,D=v.transmissive;if(p.setupLights(),I.isArrayCamera){const ot=I.cameras;if(D.length>0)for(let dt=0,Mt=ot.length;dt<Mt;dt++){const bt=ot[dt];Ir(B,D,S,bt)}he&&Lt.render(S);for(let dt=0,Mt=ot.length;dt<Mt;dt++){const bt=ot[dt];kr(v,S,bt,bt.viewport)}}else D.length>0&&Ir(B,D,S,I),he&&Lt.render(S),kr(v,S,I);E!==null&&(A.updateMultisampleRenderTarget(E),A.updateRenderTargetMipmap(E)),S.isScene===!0&&S.onAfterRender(y,S,I),pe.resetDefaultState(),R=-1,U=null,x.pop(),x.length>0?(p=x[x.length-1],K===!0&&at.setGlobalState(y.clippingPlanes,p.state.camera)):p=null,m.pop(),m.length>0?v=m[m.length-1]:v=null};function Ra(S,I,F,B){if(S.visible===!1)return;if(S.layers.test(I.layers)){if(S.isGroup)F=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(I);else if(S.isLight)p.pushLight(S),S.castShadow&&p.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||ce.intersectsSprite(S)){B&&zt.setFromMatrixPosition(S.matrixWorld).applyMatrix4(gt);const dt=Y.update(S),Mt=S.material;Mt.visible&&v.push(S,dt,Mt,F,zt.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||ce.intersectsObject(S))){const dt=Y.update(S),Mt=S.material;if(B&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),zt.copy(S.boundingSphere.center)):(dt.boundingSphere===null&&dt.computeBoundingSphere(),zt.copy(dt.boundingSphere.center)),zt.applyMatrix4(S.matrixWorld).applyMatrix4(gt)),Array.isArray(Mt)){const bt=dt.groups;for(let Rt=0,Pt=bt.length;Rt<Pt;Rt++){const Tt=bt[Rt],le=Mt[Tt.materialIndex];le&&le.visible&&v.push(S,dt,le,F,zt.z,Tt)}}else Mt.visible&&v.push(S,dt,Mt,F,zt.z,null)}}const ot=S.children;for(let dt=0,Mt=ot.length;dt<Mt;dt++)Ra(ot[dt],I,F,B)}function kr(S,I,F,B){const D=S.opaque,ot=S.transmissive,dt=S.transparent;p.setupLightsView(F),K===!0&&at.setGlobalState(y.clippingPlanes,F),B&&It.viewport(_.copy(B)),D.length>0&&ks(D,I,F),ot.length>0&&ks(ot,I,F),dt.length>0&&ks(dt,I,F),It.buffers.depth.setTest(!0),It.buffers.depth.setMask(!0),It.buffers.color.setMask(!0),It.setPolygonOffset(!1)}function Ir(S,I,F,B){if((F.isScene===!0?F.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[B.id]===void 0&&(p.state.transmissionRenderTarget[B.id]=new Mn(1,1,{generateMipmaps:!0,type:jt.has("EXT_color_buffer_half_float")||jt.has("EXT_color_buffer_float")?Cs:Bi,minFilter:xn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:oe.workingColorSpace}));const ot=p.state.transmissionRenderTarget[B.id],dt=B.viewport||_;ot.setSize(dt.z,dt.w);const Mt=y.getRenderTarget();y.setRenderTarget(ot),y.getClearColor(O),q=y.getClearAlpha(),q<1&&y.setClearColor(16777215,.5),y.clear(),he&&Lt.render(F);const bt=y.toneMapping;y.toneMapping=en;const Rt=B.viewport;if(B.viewport!==void 0&&(B.viewport=void 0),p.setupLightsView(B),K===!0&&at.setGlobalState(y.clippingPlanes,B),ks(S,F,B),A.updateMultisampleRenderTarget(ot),A.updateRenderTargetMipmap(ot),jt.has("WEBGL_multisampled_render_to_texture")===!1){let Pt=!1;for(let Tt=0,le=I.length;Tt<le;Tt++){const ge=I[Tt],xe=ge.object,Ke=ge.geometry,se=ge.material,Ct=ge.group;if(se.side===Se&&xe.layers.test(B.layers)){const Le=se.side;se.side=Xe,se.needsUpdate=!0,Lr(xe,F,B,Ke,se,Ct),se.side=Le,se.needsUpdate=!0,Pt=!0}}Pt===!0&&(A.updateMultisampleRenderTarget(ot),A.updateRenderTargetMipmap(ot))}y.setRenderTarget(Mt),y.setClearColor(O,q),Rt!==void 0&&(B.viewport=Rt),y.toneMapping=bt}function ks(S,I,F){const B=I.isScene===!0?I.overrideMaterial:null;for(let D=0,ot=S.length;D<ot;D++){const dt=S[D],Mt=dt.object,bt=dt.geometry,Rt=B===null?dt.material:B,Pt=dt.group;Mt.layers.test(F.layers)&&Lr(Mt,I,F,bt,Rt,Pt)}}function Lr(S,I,F,B,D,ot){S.onBeforeRender(y,I,F,B,D,ot),S.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),D.onBeforeRender(y,I,F,B,S,ot),D.transparent===!0&&D.side===Se&&D.forceSinglePass===!1?(D.side=Xe,D.needsUpdate=!0,y.renderBufferDirect(F,I,B,D,S,ot),D.side=Oi,D.needsUpdate=!0,y.renderBufferDirect(F,I,B,D,S,ot),D.side=Se):y.renderBufferDirect(F,I,B,D,S,ot),S.onAfterRender(y,I,F,B,D,ot)}function Is(S,I,F){I.isScene!==!0&&(I=$t);const B=Nt.get(S),D=p.state.lights,ot=p.state.shadowsArray,dt=D.state.version,Mt=Et.getParameters(S,D.state,ot,I,F),bt=Et.getProgramCacheKey(Mt);let Rt=B.programs;B.environment=S.isMeshStandardMaterial?I.environment:null,B.fog=I.fog,B.envMap=(S.isMeshStandardMaterial?N:M).get(S.envMap||B.environment),B.envMapRotation=B.environment!==null&&S.envMap===null?I.environmentRotation:S.envMapRotation,Rt===void 0&&(S.addEventListener("dispose",Yt),Rt=new Map,B.programs=Rt);let Pt=Rt.get(bt);if(Pt!==void 0){if(B.currentProgram===Pt&&B.lightsStateVersion===dt)return Ur(S,Mt),Pt}else Mt.uniforms=Et.getUniforms(S),S.onBeforeCompile(Mt,y),Pt=Et.acquireProgram(Mt,bt),Rt.set(bt,Pt),B.uniforms=Mt.uniforms;const Tt=B.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Tt.clippingPlanes=at.uniform),Ur(S,Mt),B.needsLights=Wl(S),B.lightsStateVersion=dt,B.needsLights&&(Tt.ambientLightColor.value=D.state.ambient,Tt.lightProbe.value=D.state.probe,Tt.directionalLights.value=D.state.directional,Tt.directionalLightShadows.value=D.state.directionalShadow,Tt.spotLights.value=D.state.spot,Tt.spotLightShadows.value=D.state.spotShadow,Tt.rectAreaLights.value=D.state.rectArea,Tt.ltc_1.value=D.state.rectAreaLTC1,Tt.ltc_2.value=D.state.rectAreaLTC2,Tt.pointLights.value=D.state.point,Tt.pointLightShadows.value=D.state.pointShadow,Tt.hemisphereLights.value=D.state.hemi,Tt.directionalShadowMap.value=D.state.directionalShadowMap,Tt.directionalShadowMatrix.value=D.state.directionalShadowMatrix,Tt.spotShadowMap.value=D.state.spotShadowMap,Tt.spotLightMatrix.value=D.state.spotLightMatrix,Tt.spotLightMap.value=D.state.spotLightMap,Tt.pointShadowMap.value=D.state.pointShadowMap,Tt.pointShadowMatrix.value=D.state.pointShadowMatrix),B.currentProgram=Pt,B.uniformsList=null,Pt}function Dr(S){if(S.uniformsList===null){const I=S.currentProgram.getUniforms();S.uniformsList=ma.seqWithValue(I.seq,S.uniforms)}return S.uniformsList}function Ur(S,I){const F=Nt.get(S);F.outputColorSpace=I.outputColorSpace,F.batching=I.batching,F.batchingColor=I.batchingColor,F.instancing=I.instancing,F.instancingColor=I.instancingColor,F.instancingMorph=I.instancingMorph,F.skinning=I.skinning,F.morphTargets=I.morphTargets,F.morphNormals=I.morphNormals,F.morphColors=I.morphColors,F.morphTargetsCount=I.morphTargetsCount,F.numClippingPlanes=I.numClippingPlanes,F.numIntersection=I.numClipIntersection,F.vertexAlphas=I.vertexAlphas,F.vertexTangents=I.vertexTangents,F.toneMapping=I.toneMapping}function Gl(S,I,F,B,D){I.isScene!==!0&&(I=$t),A.resetTextureUnits();const ot=I.fog,dt=B.isMeshStandardMaterial?I.environment:null,Mt=E===null?y.outputColorSpace:E.isXRRenderTarget===!0?E.texture.colorSpace:an,bt=(B.isMeshStandardMaterial?N:M).get(B.envMap||dt),Rt=B.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,Pt=!!F.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),Tt=!!F.morphAttributes.position,le=!!F.morphAttributes.normal,ge=!!F.morphAttributes.color;let xe=en;B.toneMapped&&(E===null||E.isXRRenderTarget===!0)&&(xe=y.toneMapping);const Ke=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,se=Ke!==void 0?Ke.length:0,Ct=Nt.get(B),Le=p.state.lights;if(K===!0&&(it===!0||S!==U)){const ni=S===U&&B.id===R;at.setState(B,S,ni)}let ae=!1;B.version===Ct.__version?(Ct.needsLights&&Ct.lightsStateVersion!==Le.state.version||Ct.outputColorSpace!==Mt||D.isBatchedMesh&&Ct.batching===!1||!D.isBatchedMesh&&Ct.batching===!0||D.isBatchedMesh&&Ct.batchingColor===!0&&D.colorTexture===null||D.isBatchedMesh&&Ct.batchingColor===!1&&D.colorTexture!==null||D.isInstancedMesh&&Ct.instancing===!1||!D.isInstancedMesh&&Ct.instancing===!0||D.isSkinnedMesh&&Ct.skinning===!1||!D.isSkinnedMesh&&Ct.skinning===!0||D.isInstancedMesh&&Ct.instancingColor===!0&&D.instanceColor===null||D.isInstancedMesh&&Ct.instancingColor===!1&&D.instanceColor!==null||D.isInstancedMesh&&Ct.instancingMorph===!0&&D.morphTexture===null||D.isInstancedMesh&&Ct.instancingMorph===!1&&D.morphTexture!==null||Ct.envMap!==bt||B.fog===!0&&Ct.fog!==ot||Ct.numClippingPlanes!==void 0&&(Ct.numClippingPlanes!==at.numPlanes||Ct.numIntersection!==at.numIntersection)||Ct.vertexAlphas!==Rt||Ct.vertexTangents!==Pt||Ct.morphTargets!==Tt||Ct.morphNormals!==le||Ct.morphColors!==ge||Ct.toneMapping!==xe||Ct.morphTargetsCount!==se)&&(ae=!0):(ae=!0,Ct.__version=B.version);let ui=Ct.currentProgram;ae===!0&&(ui=Is(B,I,D));let Sn=!1,Ye=!1,za=!1;const ye=ui.getUniforms(),Hi=Ct.uniforms;if(It.useProgram(ui.program)&&(Sn=!0,Ye=!0,za=!0),B.id!==R&&(R=B.id,Ye=!0),Sn||U!==S){Jt.reverseDepthBuffer?(wt.copy(S.projectionMatrix),Lh(wt),Dh(wt),ye.setValue(P,"projectionMatrix",wt)):ye.setValue(P,"projectionMatrix",S.projectionMatrix),ye.setValue(P,"viewMatrix",S.matrixWorldInverse);const ni=ye.map.cameraPosition;ni!==void 0&&ni.setValue(P,Ft.setFromMatrixPosition(S.matrixWorld)),Jt.logarithmicDepthBuffer&&ye.setValue(P,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&ye.setValue(P,"isOrthographic",S.isOrthographicCamera===!0),U!==S&&(U=S,Ye=!0,za=!0)}if(D.isSkinnedMesh){ye.setOptional(P,D,"bindMatrix"),ye.setOptional(P,D,"bindMatrixInverse");const ni=D.skeleton;ni&&(ni.boneTexture===null&&ni.computeBoneTexture(),ye.setValue(P,"boneTexture",ni.boneTexture,A))}D.isBatchedMesh&&(ye.setOptional(P,D,"batchingTexture"),ye.setValue(P,"batchingTexture",D._matricesTexture,A),ye.setOptional(P,D,"batchingIdTexture"),ye.setValue(P,"batchingIdTexture",D._indirectTexture,A),ye.setOptional(P,D,"batchingColorTexture"),D._colorsTexture!==null&&ye.setValue(P,"batchingColorTexture",D._colorsTexture,A));const Pa=F.morphAttributes;if((Pa.position!==void 0||Pa.normal!==void 0||Pa.color!==void 0)&&Dt.update(D,F,ui),(Ye||Ct.receiveShadow!==D.receiveShadow)&&(Ct.receiveShadow=D.receiveShadow,ye.setValue(P,"receiveShadow",D.receiveShadow)),B.isMeshGouraudMaterial&&B.envMap!==null&&(Hi.envMap.value=bt,Hi.flipEnvMap.value=bt.isCubeTexture&&bt.isRenderTargetTexture===!1?-1:1),B.isMeshStandardMaterial&&B.envMap===null&&I.environment!==null&&(Hi.envMapIntensity.value=I.environmentIntensity),Ye&&(ye.setValue(P,"toneMappingExposure",y.toneMappingExposure),Ct.needsLights&&Vl(Hi,za),ot&&B.fog===!0&&lt.refreshFogUniforms(Hi,ot),lt.refreshMaterialUniforms(Hi,B,tt,V,p.state.transmissionRenderTarget[S.id]),ma.upload(P,Dr(Ct),Hi,A)),B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(ma.upload(P,Dr(Ct),Hi,A),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&ye.setValue(P,"center",D.center),ye.setValue(P,"modelViewMatrix",D.modelViewMatrix),ye.setValue(P,"normalMatrix",D.normalMatrix),ye.setValue(P,"modelMatrix",D.matrixWorld),B.isShaderMaterial||B.isRawShaderMaterial){const ni=B.uniformsGroups;for(let ka=0,jl=ni.length;ka<jl;ka++){const Nr=ni[ka];k.update(Nr,ui),k.bind(Nr,ui)}}return ui}function Vl(S,I){S.ambientLightColor.needsUpdate=I,S.lightProbe.needsUpdate=I,S.directionalLights.needsUpdate=I,S.directionalLightShadows.needsUpdate=I,S.pointLights.needsUpdate=I,S.pointLightShadows.needsUpdate=I,S.spotLights.needsUpdate=I,S.spotLightShadows.needsUpdate=I,S.rectAreaLights.needsUpdate=I,S.hemisphereLights.needsUpdate=I}function Wl(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return z},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return E},this.setRenderTargetTextures=function(S,I,F){Nt.get(S.texture).__webglTexture=I,Nt.get(S.depthTexture).__webglTexture=F;const B=Nt.get(S);B.__hasExternalTextures=!0,B.__autoAllocateDepthBuffer=F===void 0,B.__autoAllocateDepthBuffer||jt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),B.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(S,I){const F=Nt.get(S);F.__webglFramebuffer=I,F.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(S,I=0,F=0){E=S,z=I,T=F;let B=!0,D=null,ot=!1,dt=!1;if(S){const bt=Nt.get(S);if(bt.__useDefaultFramebuffer!==void 0)It.bindFramebuffer(P.FRAMEBUFFER,null),B=!1;else if(bt.__webglFramebuffer===void 0)A.setupRenderTarget(S);else if(bt.__hasExternalTextures)A.rebindTextures(S,Nt.get(S.texture).__webglTexture,Nt.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const Tt=S.depthTexture;if(bt.__boundDepthTexture!==Tt){if(Tt!==null&&Nt.has(Tt)&&(S.width!==Tt.image.width||S.height!==Tt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");A.setupDepthRenderbuffer(S)}}const Rt=S.texture;(Rt.isData3DTexture||Rt.isDataArrayTexture||Rt.isCompressedArrayTexture)&&(dt=!0);const Pt=Nt.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Pt[I])?D=Pt[I][F]:D=Pt[I],ot=!0):S.samples>0&&A.useMultisampledRTT(S)===!1?D=Nt.get(S).__webglMultisampledFramebuffer:Array.isArray(Pt)?D=Pt[F]:D=Pt,_.copy(S.viewport),w.copy(S.scissor),L=S.scissorTest}else _.copy(mt).multiplyScalar(tt).floor(),w.copy(St).multiplyScalar(tt).floor(),L=te;if(It.bindFramebuffer(P.FRAMEBUFFER,D)&&B&&It.drawBuffers(S,D),It.viewport(_),It.scissor(w),It.setScissorTest(L),ot){const bt=Nt.get(S.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+I,bt.__webglTexture,F)}else if(dt){const bt=Nt.get(S.texture),Rt=I||0;P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,bt.__webglTexture,F||0,Rt)}R=-1},this.readRenderTargetPixels=function(S,I,F,B,D,ot,dt){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Mt=Nt.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&dt!==void 0&&(Mt=Mt[dt]),Mt){It.bindFramebuffer(P.FRAMEBUFFER,Mt);try{const bt=S.texture,Rt=bt.format,Pt=bt.type;if(!Jt.textureFormatReadable(Rt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Jt.textureTypeReadable(Pt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=S.width-B&&F>=0&&F<=S.height-D&&P.readPixels(I,F,B,D,Ot.convert(Rt),Ot.convert(Pt),ot)}finally{const bt=E!==null?Nt.get(E).__webglFramebuffer:null;It.bindFramebuffer(P.FRAMEBUFFER,bt)}}},this.readRenderTargetPixelsAsync=async function(S,I,F,B,D,ot,dt){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Mt=Nt.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&dt!==void 0&&(Mt=Mt[dt]),Mt){const bt=S.texture,Rt=bt.format,Pt=bt.type;if(!Jt.textureFormatReadable(Rt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Jt.textureTypeReadable(Pt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(I>=0&&I<=S.width-B&&F>=0&&F<=S.height-D){It.bindFramebuffer(P.FRAMEBUFFER,Mt);const Tt=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,Tt),P.bufferData(P.PIXEL_PACK_BUFFER,ot.byteLength,P.STREAM_READ),P.readPixels(I,F,B,D,Ot.convert(Rt),Ot.convert(Pt),0);const le=E!==null?Nt.get(E).__webglFramebuffer:null;It.bindFramebuffer(P.FRAMEBUFFER,le);const ge=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await Ih(P,ge,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,Tt),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,ot),P.deleteBuffer(Tt),P.deleteSync(ge),ot}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(S,I=null,F=0){S.isTexture!==!0&&(pa("WebGLRenderer: copyFramebufferToTexture function signature has changed."),I=arguments[0]||null,S=arguments[1]);const B=Math.pow(2,-F),D=Math.floor(S.image.width*B),ot=Math.floor(S.image.height*B),dt=I!==null?I.x:0,Mt=I!==null?I.y:0;A.setTexture2D(S,0),P.copyTexSubImage2D(P.TEXTURE_2D,F,0,0,dt,Mt,D,ot),It.unbindTexture()},this.copyTextureToTexture=function(S,I,F=null,B=null,D=0){S.isTexture!==!0&&(pa("WebGLRenderer: copyTextureToTexture function signature has changed."),B=arguments[0]||null,S=arguments[1],I=arguments[2],D=arguments[3]||0,F=null);let ot,dt,Mt,bt,Rt,Pt;F!==null?(ot=F.max.x-F.min.x,dt=F.max.y-F.min.y,Mt=F.min.x,bt=F.min.y):(ot=S.image.width,dt=S.image.height,Mt=0,bt=0),B!==null?(Rt=B.x,Pt=B.y):(Rt=0,Pt=0);const Tt=Ot.convert(I.format),le=Ot.convert(I.type);A.setTexture2D(I,0),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,I.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,I.unpackAlignment);const ge=P.getParameter(P.UNPACK_ROW_LENGTH),xe=P.getParameter(P.UNPACK_IMAGE_HEIGHT),Ke=P.getParameter(P.UNPACK_SKIP_PIXELS),se=P.getParameter(P.UNPACK_SKIP_ROWS),Ct=P.getParameter(P.UNPACK_SKIP_IMAGES),Le=S.isCompressedTexture?S.mipmaps[D]:S.image;P.pixelStorei(P.UNPACK_ROW_LENGTH,Le.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Le.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Mt),P.pixelStorei(P.UNPACK_SKIP_ROWS,bt),S.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,D,Rt,Pt,ot,dt,Tt,le,Le.data):S.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,D,Rt,Pt,Le.width,Le.height,Tt,Le.data):P.texSubImage2D(P.TEXTURE_2D,D,Rt,Pt,ot,dt,Tt,le,Le),P.pixelStorei(P.UNPACK_ROW_LENGTH,ge),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,xe),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Ke),P.pixelStorei(P.UNPACK_SKIP_ROWS,se),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Ct),D===0&&I.generateMipmaps&&P.generateMipmap(P.TEXTURE_2D),It.unbindTexture()},this.copyTextureToTexture3D=function(S,I,F=null,B=null,D=0){S.isTexture!==!0&&(pa("WebGLRenderer: copyTextureToTexture3D function signature has changed."),F=arguments[0]||null,B=arguments[1]||null,S=arguments[2],I=arguments[3],D=arguments[4]||0);let ot,dt,Mt,bt,Rt,Pt,Tt,le,ge;const xe=S.isCompressedTexture?S.mipmaps[D]:S.image;F!==null?(ot=F.max.x-F.min.x,dt=F.max.y-F.min.y,Mt=F.max.z-F.min.z,bt=F.min.x,Rt=F.min.y,Pt=F.min.z):(ot=xe.width,dt=xe.height,Mt=xe.depth,bt=0,Rt=0,Pt=0),B!==null?(Tt=B.x,le=B.y,ge=B.z):(Tt=0,le=0,ge=0);const Ke=Ot.convert(I.format),se=Ot.convert(I.type);let Ct;if(I.isData3DTexture)A.setTexture3D(I,0),Ct=P.TEXTURE_3D;else if(I.isDataArrayTexture||I.isCompressedArrayTexture)A.setTexture2DArray(I,0),Ct=P.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,I.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,I.unpackAlignment);const Le=P.getParameter(P.UNPACK_ROW_LENGTH),ae=P.getParameter(P.UNPACK_IMAGE_HEIGHT),ui=P.getParameter(P.UNPACK_SKIP_PIXELS),Sn=P.getParameter(P.UNPACK_SKIP_ROWS),Ye=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,xe.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,xe.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,bt),P.pixelStorei(P.UNPACK_SKIP_ROWS,Rt),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Pt),S.isDataTexture||S.isData3DTexture?P.texSubImage3D(Ct,D,Tt,le,ge,ot,dt,Mt,Ke,se,xe.data):I.isCompressedArrayTexture?P.compressedTexSubImage3D(Ct,D,Tt,le,ge,ot,dt,Mt,Ke,xe.data):P.texSubImage3D(Ct,D,Tt,le,ge,ot,dt,Mt,Ke,se,xe),P.pixelStorei(P.UNPACK_ROW_LENGTH,Le),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,ae),P.pixelStorei(P.UNPACK_SKIP_PIXELS,ui),P.pixelStorei(P.UNPACK_SKIP_ROWS,Sn),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Ye),D===0&&I.generateMipmaps&&P.generateMipmap(Ct),It.unbindTexture()},this.initRenderTarget=function(S){Nt.get(S).__webglFramebuffer===void 0&&A.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?A.setTextureCube(S,0):S.isData3DTexture?A.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?A.setTexture2DArray(S,0):A.setTexture2D(S,0),It.unbindTexture()},this.resetState=function(){z=0,T=0,E=null,It.reset(),pe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ui}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===Mr?"display-p3":"srgb",e.unpackColorSpace=oe.workingColorSpace===Sa?"display-p3":"srgb"}}class Sr{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new st(t),this.near=e,this.far=i}clone(){return new Sr(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Xm extends Ce{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Mi,this.environmentIntensity=1,this.environmentRotation=new Mi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class $m extends Oe{constructor(t=null,e=1,i=1,n,s,o,r,c,l=qe,h=qe,d,u){super(null,o,r,c,l,h,n,s,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Pc extends Ae{constructor(t,e,i,n=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=n}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const On=new ue,kc=new ue,ea=[],Ic=new wn,Km=new ue,fs=new yt,ps=new ns;class Ym extends yt{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Pc(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let n=0;n<i;n++)this.setMatrixAt(n,Km)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new wn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,On),Ic.copy(t.boundingBox).applyMatrix4(On),this.boundingBox.union(Ic)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new ns),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,On),ps.copy(t.boundingSphere).applyMatrix4(On),this.boundingSphere.union(ps)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const i=e.morphTargetInfluences,n=this.morphTexture.source.data.data,s=i.length+1,o=t*s+1;for(let r=0;r<i.length;r++)i[r]=n[o+r]}raycast(t,e){const i=this.matrixWorld,n=this.count;if(fs.geometry=this.geometry,fs.material=this.material,fs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ps.copy(this.boundingSphere),ps.applyMatrix4(i),t.ray.intersectsSphere(ps)!==!1))for(let s=0;s<n;s++){this.getMatrixAt(s,On),kc.multiplyMatrices(i,On),fs.matrixWorld=kc,fs.raycast(t,ea);for(let o=0,r=ea.length;o<r;o++){const c=ea[o];c.instanceId=s,c.object=this,e.push(c)}ea.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Pc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const i=e.morphTargetInfluences,n=i.length+1;this.morphTexture===null&&(this.morphTexture=new $m(new Float32Array(n*this.count),n,this.count,gr,Si));const s=this.morphTexture.source.data.data;let o=0;for(let l=0;l<i.length;l++)o+=i[l];const r=this.geometry.morphTargetsRelative?1:1-o,c=n*t;s[c]=r,s.set(i,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Er extends bn{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new st(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Lc=new ue,cr=new vl,ia=new ns,na=new C;class kl extends Ce{constructor(t=new Te,e=new Er){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const i=this.geometry,n=this.matrixWorld,s=t.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ia.copy(i.boundingSphere),ia.applyMatrix4(n),ia.radius+=s,t.ray.intersectsSphere(ia)===!1)return;Lc.copy(n).invert(),cr.copy(t.ray).applyMatrix4(Lc);const r=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=r*r,l=i.index,d=i.attributes.position;if(l!==null){const u=Math.max(0,o.start),f=Math.min(l.count,o.start+o.count);for(let g=u,v=f;g<v;g++){const p=l.getX(g);na.fromBufferAttribute(d,p),Dc(na,p,c,n,t,e,this)}}else{const u=Math.max(0,o.start),f=Math.min(d.count,o.start+o.count);for(let g=u,v=f;g<v;g++)na.fromBufferAttribute(d,g),Dc(na,g,c,n,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=n.length;s<o;s++){const r=n[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[r]=s}}}}}function Dc(a,t,e,i,n,s,o){const r=cr.distanceSqToPoint(a);if(r<e){const c=new C;cr.closestPointToPoint(a,c),c.applyMatrix4(i);const l=n.ray.origin.distanceTo(c);if(l<n.near||l>n.far)return;s.push({distance:l,distanceToRay:Math.sqrt(r),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class Il extends Oe{constructor(t,e,i,n,s,o,r,c,l){super(t,e,i,n,s,o,r,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class as extends Te{constructor(t=1,e=32,i=0,n=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:n},e=Math.max(3,e);const s=[],o=[],r=[],c=[],l=new C,h=new Vt;o.push(0,0,0),r.push(0,0,1),c.push(.5,.5);for(let d=0,u=3;d<=e;d++,u+=3){const f=i+d/e*n;l.x=t*Math.cos(f),l.y=t*Math.sin(f),o.push(l.x,l.y,l.z),r.push(0,0,1),h.x=(o[u]/t+1)/2,h.y=(o[u+1]/t+1)/2,c.push(h.x,h.y)}for(let d=1;d<=e;d++)s.push(d,d+1,0);this.setIndex(s),this.setAttribute("position",new re(o,3)),this.setAttribute("normal",new re(r,3)),this.setAttribute("uv",new re(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new as(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class kt extends Te{constructor(t=1,e=1,i=1,n=32,s=1,o=!1,r=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:n,heightSegments:s,openEnded:o,thetaStart:r,thetaLength:c};const l=this;n=Math.floor(n),s=Math.floor(s);const h=[],d=[],u=[],f=[];let g=0;const v=[],p=i/2;let m=0;x(),o===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new re(d,3)),this.setAttribute("normal",new re(u,3)),this.setAttribute("uv",new re(f,2));function x(){const b=new C,z=new C;let T=0;const E=(e-t)/i;for(let R=0;R<=s;R++){const U=[],_=R/s,w=_*(e-t)+t;for(let L=0;L<=n;L++){const O=L/n,q=O*c+r,Z=Math.sin(q),V=Math.cos(q);z.x=w*Z,z.y=-_*i+p,z.z=w*V,d.push(z.x,z.y,z.z),b.set(Z,E,V).normalize(),u.push(b.x,b.y,b.z),f.push(O,1-_),U.push(g++)}v.push(U)}for(let R=0;R<n;R++)for(let U=0;U<s;U++){const _=v[U][R],w=v[U+1][R],L=v[U+1][R+1],O=v[U][R+1];t>0&&(h.push(_,w,O),T+=3),e>0&&(h.push(w,L,O),T+=3)}l.addGroup(m,T,0),m+=T}function y(b){const z=g,T=new Vt,E=new C;let R=0;const U=b===!0?t:e,_=b===!0?1:-1;for(let L=1;L<=n;L++)d.push(0,p*_,0),u.push(0,_,0),f.push(.5,.5),g++;const w=g;for(let L=0;L<=n;L++){const q=L/n*c+r,Z=Math.cos(q),V=Math.sin(q);E.x=U*V,E.y=p*_,E.z=U*Z,d.push(E.x,E.y,E.z),u.push(0,_,0),T.x=Z*.5+.5,T.y=V*.5*_+.5,f.push(T.x,T.y),g++}for(let L=0;L<n;L++){const O=z+L,q=w+L;b===!0?h.push(q,q+1,O):h.push(q+1,q,O),R+=3}l.addGroup(m,R,b===!0?1:2),m+=R}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new kt(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Zt extends kt{constructor(t=1,e=1,i=32,n=1,s=!1,o=0,r=Math.PI*2){super(0,t,e,i,n,s,o,r),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:n,openEnded:s,thetaStart:o,thetaLength:r}}static fromJSON(t){return new Zt(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ps extends Te{constructor(t=[],e=[],i=1,n=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:n};const s=[],o=[];r(n),l(i),h(),this.setAttribute("position",new re(s,3)),this.setAttribute("normal",new re(s.slice(),3)),this.setAttribute("uv",new re(o,2)),n===0?this.computeVertexNormals():this.normalizeNormals();function r(x){const y=new C,b=new C,z=new C;for(let T=0;T<e.length;T+=3)f(e[T+0],y),f(e[T+1],b),f(e[T+2],z),c(y,b,z,x)}function c(x,y,b,z){const T=z+1,E=[];for(let R=0;R<=T;R++){E[R]=[];const U=x.clone().lerp(b,R/T),_=y.clone().lerp(b,R/T),w=T-R;for(let L=0;L<=w;L++)L===0&&R===T?E[R][L]=U:E[R][L]=U.clone().lerp(_,L/w)}for(let R=0;R<T;R++)for(let U=0;U<2*(T-R)-1;U++){const _=Math.floor(U/2);U%2===0?(u(E[R][_+1]),u(E[R+1][_]),u(E[R][_])):(u(E[R][_+1]),u(E[R+1][_+1]),u(E[R+1][_]))}}function l(x){const y=new C;for(let b=0;b<s.length;b+=3)y.x=s[b+0],y.y=s[b+1],y.z=s[b+2],y.normalize().multiplyScalar(x),s[b+0]=y.x,s[b+1]=y.y,s[b+2]=y.z}function h(){const x=new C;for(let y=0;y<s.length;y+=3){x.x=s[y+0],x.y=s[y+1],x.z=s[y+2];const b=p(x)/2/Math.PI+.5,z=m(x)/Math.PI+.5;o.push(b,1-z)}g(),d()}function d(){for(let x=0;x<o.length;x+=6){const y=o[x+0],b=o[x+2],z=o[x+4],T=Math.max(y,b,z),E=Math.min(y,b,z);T>.9&&E<.1&&(y<.2&&(o[x+0]+=1),b<.2&&(o[x+2]+=1),z<.2&&(o[x+4]+=1))}}function u(x){s.push(x.x,x.y,x.z)}function f(x,y){const b=x*3;y.x=t[b+0],y.y=t[b+1],y.z=t[b+2]}function g(){const x=new C,y=new C,b=new C,z=new C,T=new Vt,E=new Vt,R=new Vt;for(let U=0,_=0;U<s.length;U+=9,_+=6){x.set(s[U+0],s[U+1],s[U+2]),y.set(s[U+3],s[U+4],s[U+5]),b.set(s[U+6],s[U+7],s[U+8]),T.set(o[_+0],o[_+1]),E.set(o[_+2],o[_+3]),R.set(o[_+4],o[_+5]),z.copy(x).add(y).add(b).divideScalar(3);const w=p(z);v(T,_+0,x,w),v(E,_+2,y,w),v(R,_+4,b,w)}}function v(x,y,b,z){z<0&&x.x===1&&(o[y]=x.x-1),b.x===0&&b.z===0&&(o[y]=z/2/Math.PI+.5)}function p(x){return Math.atan2(x.z,-x.x)}function m(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ps(t.vertices,t.indices,t.radius,t.details)}}class vi extends Ps{constructor(t=1,e=0){const i=(1+Math.sqrt(5))/2,n=1/i,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-n,-i,0,-n,i,0,n,-i,0,n,i,-n,-i,0,-n,i,0,n,-i,0,n,i,0,-i,0,-n,i,0,-n,-i,0,n,i,0,n],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,o,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new vi(t.radius,t.detail)}}class os extends Ps{constructor(t=1,e=0){const i=(1+Math.sqrt(5))/2,n=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(n,s,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new os(t.radius,t.detail)}}class Tr extends Ps{constructor(t=1,e=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],n=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,n,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Tr(t.radius,t.detail)}}class Ar extends Te{constructor(t=.5,e=1,i=32,n=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:i,phiSegments:n,thetaStart:s,thetaLength:o},i=Math.max(3,i),n=Math.max(1,n);const r=[],c=[],l=[],h=[];let d=t;const u=(e-t)/n,f=new C,g=new Vt;for(let v=0;v<=n;v++){for(let p=0;p<=i;p++){const m=s+p/i*o;f.x=d*Math.cos(m),f.y=d*Math.sin(m),c.push(f.x,f.y,f.z),l.push(0,0,1),g.x=(f.x/e+1)/2,g.y=(f.y/e+1)/2,h.push(g.x,g.y)}d+=u}for(let v=0;v<n;v++){const p=v*(i+1);for(let m=0;m<i;m++){const x=m+p,y=x,b=x+i+1,z=x+i+2,T=x+1;r.push(y,b,T),r.push(b,z,T)}}this.setIndex(r),this.setAttribute("position",new re(c,3)),this.setAttribute("normal",new re(l,3)),this.setAttribute("uv",new re(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ar(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Xt extends Te{constructor(t=1,e=32,i=16,n=0,s=Math.PI*2,o=0,r=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:n,phiLength:s,thetaStart:o,thetaLength:r},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const c=Math.min(o+r,Math.PI);let l=0;const h=[],d=new C,u=new C,f=[],g=[],v=[],p=[];for(let m=0;m<=i;m++){const x=[],y=m/i;let b=0;m===0&&o===0?b=.5/e:m===i&&c===Math.PI&&(b=-.5/e);for(let z=0;z<=e;z++){const T=z/e;d.x=-t*Math.cos(n+T*s)*Math.sin(o+y*r),d.y=t*Math.cos(o+y*r),d.z=t*Math.sin(n+T*s)*Math.sin(o+y*r),g.push(d.x,d.y,d.z),u.copy(d).normalize(),v.push(u.x,u.y,u.z),p.push(T+b,1-y),x.push(l++)}h.push(x)}for(let m=0;m<i;m++)for(let x=0;x<e;x++){const y=h[m][x+1],b=h[m][x],z=h[m+1][x],T=h[m+1][x+1];(m!==0||o>0)&&f.push(y,b,T),(m!==i-1||c<Math.PI)&&f.push(b,z,T)}this.setIndex(f),this.setAttribute("position",new re(g,3)),this.setAttribute("normal",new re(v,3)),this.setAttribute("uv",new re(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Xt(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class di extends Te{constructor(t=1,e=.4,i=12,n=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:n,arc:s},i=Math.floor(i),n=Math.floor(n);const o=[],r=[],c=[],l=[],h=new C,d=new C,u=new C;for(let f=0;f<=i;f++)for(let g=0;g<=n;g++){const v=g/n*s,p=f/i*Math.PI*2;d.x=(t+e*Math.cos(p))*Math.cos(v),d.y=(t+e*Math.cos(p))*Math.sin(v),d.z=e*Math.sin(p),r.push(d.x,d.y,d.z),h.x=t*Math.cos(v),h.y=t*Math.sin(v),u.subVectors(d,h).normalize(),c.push(u.x,u.y,u.z),l.push(g/n),l.push(f/i)}for(let f=1;f<=i;f++)for(let g=1;g<=n;g++){const v=(n+1)*f+g-1,p=(n+1)*(f-1)+g-1,m=(n+1)*(f-1)+g,x=(n+1)*f+g;o.push(v,p,x),o.push(p,m,x)}this.setIndex(o),this.setAttribute("position",new re(r,3)),this.setAttribute("normal",new re(c,3)),this.setAttribute("uv",new re(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new di(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class ke extends bn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new st(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new st(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=yr,this.normalScale=new Vt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Mi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class wa extends bn{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new st(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new st(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=yr,this.normalScale=new Vt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Mi,this.combine=ur,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Aa extends Ce{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new st(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Zm extends Aa{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ce.DEFAULT_UP),this.updateMatrix(),this.groundColor=new st(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const ho=new ue,Uc=new C,Nc=new C;class Ll{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Vt(512,512),this.map=null,this.mapPass=null,this.matrix=new ue,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new wr,this._frameExtents=new Vt(1,1),this._viewportCount=1,this._viewports=[new de(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;Uc.setFromMatrixPosition(t.matrixWorld),e.position.copy(Uc),Nc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Nc),e.updateMatrixWorld(),ho.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ho),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(ho)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Fc=new ue,ms=new C,uo=new C;class Jm extends Ll{constructor(){super(new ei(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Vt(4,2),this._viewportCount=6,this._viewports=[new de(2,1,1,1),new de(0,1,1,1),new de(3,1,1,1),new de(1,1,1,1),new de(3,0,1,1),new de(1,0,1,1)],this._cubeDirections=[new C(1,0,0),new C(-1,0,0),new C(0,0,1),new C(0,0,-1),new C(0,1,0),new C(0,-1,0)],this._cubeUps=[new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,0,1),new C(0,0,-1)]}updateMatrices(t,e=0){const i=this.camera,n=this.matrix,s=t.distance||i.far;s!==i.far&&(i.far=s,i.updateProjectionMatrix()),ms.setFromMatrixPosition(t.matrixWorld),i.position.copy(ms),uo.copy(i.position),uo.add(this._cubeDirections[e]),i.up.copy(this._cubeUps[e]),i.lookAt(uo),i.updateMatrixWorld(),n.makeTranslation(-ms.x,-ms.y,-ms.z),Fc.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Fc)}}class Ue extends Aa{constructor(t,e,i=0,n=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=n,this.shadow=new Jm}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Qm extends Ll{constructor(){super(new Tl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class t0 extends Aa{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ce.DEFAULT_UP),this.updateMatrix(),this.target=new Ce,this.shadow=new Qm}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class e0 extends Aa{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class i0{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Oc(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Oc();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Oc(){return performance.now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:dr}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=dr);class n0{constructor(t){this.canvas=t,this.keys=new Set,this.pressed=new Set,this.mouseDX=0,this.mouseDY=0,this.locked=!1,this.enabled=!0,this.sensitivity=.0022,this.listeners=[],this.mouseDown=!1,this.touch={active:!1,moveId:null,lookId:null,moveX:0,moveY:0,startX:0,startY:0,lookX:0,lookY:0},this._bind()}on(t){this.listeners.push(t)}_emit(t,e){for(const i of this.listeners)i(t,e)}_bind(){const t=s=>{if(!this.enabled)return;const o=s.code;["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space","Tab"].includes(o)&&s.preventDefault(),this.keys.has(o)||this.pressed.add(o),this.keys.add(o),this._emit("keydown",o)},e=s=>{this.keys.delete(s.code),this._emit("keyup",s.code)};window.addEventListener("keydown",t),window.addEventListener("keyup",e),window.addEventListener("blur",()=>{this.keys.clear(),this.pressed.clear()}),this.canvas.addEventListener("mousedown",s=>{this.enabled&&(this.mouseDown=!0,!this.locked&&s.button===0&&this.requestLock(),this._emit("mousedown",s.button))}),window.addEventListener("mouseup",s=>{this.mouseDown=!1,this._emit("mouseup",s.button)}),document.addEventListener("mousemove",s=>{!this.locked&&!this.mouseDown||(this.mouseDX+=s.movementX||0,this.mouseDY+=s.movementY||0)}),document.addEventListener("pointerlockchange",()=>{this.locked=document.pointerLockElement===this.canvas,this._emit("lockchange",this.locked)}),window.addEventListener("contextmenu",s=>s.preventDefault());const i=this.canvas;i.addEventListener("touchstart",s=>{if(this.enabled){for(const o of s.changedTouches)o.clientX<window.innerWidth*.42&&this.touch.moveId===null?(this.touch.moveId=o.identifier,this.touch.startX=o.clientX,this.touch.startY=o.clientY,this.touch.moveX=0,this.touch.moveY=0):this.touch.lookId===null&&(this.touch.lookId=o.identifier,this.touch.lookX=o.clientX,this.touch.lookY=o.clientY);this.touch.active=!0,this._emit("touchstart",s)}},{passive:!0}),i.addEventListener("touchmove",s=>{for(const o of s.changedTouches)o.identifier===this.touch.moveId?(this.touch.moveX=Math.max(-1,Math.min(1,(o.clientX-this.touch.startX)/60)),this.touch.moveY=Math.max(-1,Math.min(1,(o.clientY-this.touch.startY)/60))):o.identifier===this.touch.lookId&&(this.mouseDX+=(o.clientX-this.touch.lookX)*.55,this.mouseDY+=(o.clientY-this.touch.lookY)*.55,this.touch.lookX=o.clientX,this.touch.lookY=o.clientY)},{passive:!0});const n=s=>{for(const o of s.changedTouches)o.identifier===this.touch.moveId&&(this.touch.moveId=null,this.touch.moveX=0,this.touch.moveY=0),o.identifier===this.touch.lookId&&(this.touch.lookId=null);this.touch.moveId===null&&this.touch.lookId===null&&(this.touch.active=!1)};i.addEventListener("touchend",n,{passive:!0}),i.addEventListener("touchcancel",n,{passive:!0})}requestLock(){if(this.canvas.requestPointerLock)try{const t=this.canvas.requestPointerLock();t&&t.catch&&t.catch(()=>{})}catch{}}exitLock(){if(this.locked)try{document.exitPointerLock&&document.exitPointerLock()}catch{}}isDown(t){return this.keys.has(t)}wasPressed(t){return this.pressed.has(t)}consumeMouse(){const t={x:this.mouseDX,y:this.mouseDY};return this.mouseDX=0,this.mouseDY=0,t}endFrame(){this.pressed.clear()}axes(){let t=0,e=0;(this.isDown("KeyW")||this.isDown("ArrowUp"))&&(e-=1),(this.isDown("KeyS")||this.isDown("ArrowDown"))&&(e+=1),(this.isDown("KeyA")||this.isDown("ArrowLeft"))&&(t-=1),(this.isDown("KeyD")||this.isDown("ArrowRight"))&&(t+=1),this.touch.moveId!==null&&(t+=this.touch.moveX,e+=this.touch.moveY);const i=Math.hypot(t,e);return i>1&&(t/=i,e/=i),{x:t,y:e}}}const nn=Math.PI*2,ie=(a,t,e)=>a<t?t:a>e?e:a,Fi=(a,t,e)=>a+(t-a)*e,_e=(a,t,e)=>{const i=ie((e-a)/(t-a),0,1);return i*i*(3-2*i)},Ut=(a,t,e,i)=>Fi(a,t,1-Math.exp(-e*i)),ne=(a,t,e,i)=>Math.hypot(a-e,t-i);function s0(a,t){let e=(t-a)%nn;return e>Math.PI&&(e-=nn),e<-Math.PI&&(e+=nn),e}function bi(a,t,e,i){return a+s0(a,t)*(1-Math.exp(-e*i))}function a0(a){let t=a>>>0;return function(){t|=0,t=t+1831565813|0;let i=Math.imul(t^t>>>15,1|t);return i=i+Math.imul(i^i>>>7,61|i)^i,((i^i>>>14)>>>0)/4294967296}}class De{constructor(t=1337){this.next=a0(t)}float(t=0,e=1){return t+this.next()*(e-t)}int(t,e){return Math.floor(this.float(t,e+1))}pick(t){return t[Math.floor(this.next()*t.length)]}chance(t){return this.next()<t}sign(){return this.next()<.5?-1:1}}function sa(a,t){let e=Math.imul(a,374761393)+Math.imul(t,668265263);return e=(e^e>>>13)*1274126177,((e^e>>>16)>>>0)/4294967296}function o0(a,t){const e=Math.floor(a),i=Math.floor(t),n=a-e,s=t-i,o=n*n*(3-2*n),r=s*s*(3-2*s),c=sa(e,i),l=sa(e+1,i),h=sa(e,i+1),d=sa(e+1,i+1);return Fi(Fi(c,l,o),Fi(h,d,o),r)*2-1}function ci(a,t,e=4,i=2.03,n=.5){let s=0,o=1,r=0,c=a,l=t;for(let h=0;h<e;h++)s+=o0(c,l)*o,r+=o,o*=n,c*=i,l*=i;return s/r}const r0=360;class c0{constructor(t=8.5){this.time=t/24,this.day=1,this.sunDir=new C,this.ambientColor=new st,this.sunColor=new st,this.fogColor=new st,this.sunIntensity=1,this.ambientIntensity=.5}get hour(){return this.time*24}get isNight(){return this.hour<6.1||this.hour>20.2}get isDusk(){return this.hour>17.4&&this.hour<20.2}get clockString(){const t=Math.floor(this.hour),e=Math.floor((this.hour-t)*60);return`${String(t).padStart(2,"0")}:${String(e).padStart(2,"0")}`}update(t){for(this.time+=t/r0;this.time>=1;)this.time-=1,this.day+=1;this.apply()}setHour(t){this.time=(t%24+24)%24/24,this.apply()}skipTo(t){const e=(t%24+24)%24;e<=this.hour&&(this.day+=1),this.setHour(e)}apply(){const t=this.hour,e=(this.time-.25)*nn,i=Math.sin(e);this.elevation=i;let n;t>=7&&t<=17.8?n=1:t>17.8&&t<20.8?n=1-_e(17.8,20.8,t):t>=5&&t<7?n=_e(5,7,t):n=0;const s=Math.max(0,1-Math.abs(t-18.7)/2.3),o=Math.max(0,1-Math.abs(t-6.1)/1.9),r=Math.max(s,o)*(t>3&&t<22?1:0);this.sunDir.set(Math.cos(e)*.62,Math.max(.34,Math.abs(i)),Math.cos(e)*.3+.2).normalize();const c=new st("#fff5e0"),l=new st("#ff9c5c"),h=new st("#8fa8d8");this.sunColor.copy(c).lerp(l,r*.9).lerp(h,Math.pow(1-n,2.2));const d=new st("#b3c6d6"),u=new st("#a08275"),f=new st("#3d4e6b");this.ambientColor.copy(d).lerp(u,r*.7).lerp(f,Math.pow(1-n,1.6));const g=new st("#c2d6de"),v=new st("#b98a6a"),p=new st("#26344a");this.fogColor.copy(g).lerp(v,r*.85).lerp(p,Math.pow(1-n,1.9)),this.sunIntensity=Fi(.55,1.85,n),this.ambientIntensity=Fi(.34,.6,n)+r*.1,this.dayF=n,this.nightF=1-n,this.duskF=r}}const Wt=780,As=Wt*2,Ie=19.5,Ei=130,Bc=Math.round(As/Ei),Di=312,Ni=Di+1,X={village:{x:0,z:360,name:"Wilcza Dolina",sub:"Wioska pod Mgłą"},trading:{x:175,z:250,name:"Kotlina Kupców",sub:"Targ na starym trakcie"},crossroads:{x:0,z:150,name:"Rozdroże Trzech Dróg",sub:""},forge:{x:330,z:40,name:"Kowalska Góra",sub:"Starożytna kuźnia"},bandits:{x:-420,z:-60,name:"Obozowisko Rudego Wilka",sub:"Zbójecki obóz"},barrow:{x:430,z:-330,name:"Kurhan Szeptu",sub:"Zapomniane grobowce"},ruins:{x:-150,z:-560,name:"Mgliste Wrota",sub:"Siedziba Kaldrasa"},quarry:{x:-330,z:330,name:"Kamieniołom",sub:"Stare wyrobisko"},lake:{x:-500,z:330,name:"Jezioro Milczące",sub:"Zimna woda"},castle:{x:-40,z:-220,name:"Warownia Popiołu",sub:"Ruiny strażnicy"},hermit:{x:-560,z:-200,name:"Pustelnia",sub:"Ciemny Las"},swamp:{x:-200,z:-430,name:"Bagno Wieszczki",sub:"Mgła i zgnilizna"},pass:{x:250,z:-150,name:"Przełęcz Kalmoru",sub:"Przejście przez góry"},circle:{x:470,z:250,name:"Kamienny Krąg",sub:"Polana szeptów"},mine:{x:205,z:-430,name:"Kopalnia Żelazna",sub:"Zawalona sztolnia"},highlands:{x:470,z:-60,name:"Wyżyny Kalmoru",sub:""}},lr=[[0,360,0,150],[0,150,175,250],[0,150,330,40],[0,150,-420,-60],[0,360,-330,330],[0,360,-540,420],[0,150,-40,-220],[0,150,250,-150],[250,-150,430,-330],[250,-150,205,-430],[-40,-220,-200,-430],[-200,-430,-150,-560],[-200,-430,-560,-200],[330,40,470,250],[430,-330,205,-430],[175,250,-330,330],[-540,420,-330,330]],Hc=[{pts:[[360,-520],[400,-300],[392,-60],[352,120],[420,300]],h:128,w:130,seed:1.7},{pts:[[470,-560],[520,-300],[500,-60],[560,220]],h:150,w:140,seed:4.2},{pts:[[180,-540],[300,-430],[430,-330],[520,-200]],h:112,w:115,seed:7.3},{pts:[[-640,210],[-500,80],[-380,-40],[-300,-140]],h:96,w:115,seed:2.9},{pts:[[-620,-420],[-420,-520],[-180,-570],[0,-520]],h:92,w:125,seed:5.1},{pts:[[120,60],[40,-80],[-40,-200]],h:52,w:80,seed:9.4}],l0=[{...X.village,r:62,inner:40,lift:.2},{...X.trading,r:48,inner:30,lift:.3},{...X.forge,r:34,inner:16,lift:16},{...X.barrow,r:40,inner:20,lift:6},{...X.ruins,r:48,inner:26,lift:2.5},{...X.bandits,r:34,inner:18,lift:0},{...X.quarry,r:36,inner:18,lift:-4},{...X.castle,r:44,inner:24,lift:12},{...X.hermit,r:34,inner:16,lift:0},{...X.swamp,r:70,inner:40,lift:-9},{...X.pass,r:46,inner:26,lift:0},{...X.circle,r:34,inner:16,lift:3},{...X.mine,r:30,inner:14,lift:2},{...X.highlands,r:28,inner:13,lift:1}];function Dl(a,t,e,i,n,s){const o=n-e,r=s-i,c=ie(((a-e)*o+(t-i)*r)/(o*o+r*r||1),0,1);return ne(a,t,e+o*c,i+r*c)}function h0(a,t,e){let i=1/0;for(let n=0;n<e.length-1;n++){const s=Dl(a,t,e[n][0],e[n][1],e[n+1][0],e[n+1][1]);s<i&&(i=s)}return i}function Ul(a,t){const e=ci(a*.0026+11.3,t*.0026-7.1,4),i=ci(a*.0105-3.7,t*.0105+5.2,3),n=ci(a*.021+17.4,t*.021-8.8,2),s=ci(a*.045+1.9,t*.045-2.4,2);let o=32+e*17+i*6.4+n*3.1+s*1.5,r=0;for(let p=0;p<Hc.length;p++){const m=Hc[p],x=h0(a,t,m.pts);if(x<m.w){const y=1-_e(0,m.w,x),b=Math.pow(y,1.55);if(b<.002)continue;const z=.62+.66*(ci(a*.017+m.seed,t*.017-m.seed,3)*.5+.5),T=m.h*b*z;T>r&&(r=T)}}if(o+=r,o>96){const p=Math.abs(ci(a*.045+3.3,t*.045-8.1,3));o+=p*_e(96,150,o)*34}const c=Math.hypot(a,t),l=ci(a*.0035+50.2,t*.0035-21.7,2)*.5+.5,h=560+l*120,d=_e(h,772,c);d>0&&(o+=Math.pow(d,1.35)*(150+l*84)+d*9);const u=_e(700,776,c);u>0&&(o=Math.max(o,u*195));const f=ne(a,t,X.lake.x,X.lake.z);if(f<152){const p=1-_e(94,150,f);o=Fi(o,12.4,p*.94)}const g=ne(a,t,X.swamp.x,X.swamp.z);g<220&&(o-=11*_e(220,60,g));const v=ne(a,t,X.village.x,X.village.z);return o-=4.5*_e(230,70,v)*_e(18,62,v),Math.max(o,1.4)}const Gc=l0.map(a=>({...a,target:Math.max(3.2,Ul(a.x,a.z)+a.lift)}));function d0(a,t){let e=Ul(a,t);for(let i=0;i<Gc.length;i++){const n=Gc[i],s=ne(a,t,n.x,n.z);if(s<n.r){const o=_e(n.r,n.inner,s);e=Fi(e,n.target,o)}}return e}const Ms=new Float32Array(Ni*Ni),u0=performance.now();for(let a=0;a<Ni;a++){const t=-Wt+a/Di*As;for(let e=0;e<Ni;e++){const i=-Wt+e/Di*As;Ms[a*Ni+e]=d0(i,t)}}performance.now()-u0;function j(a,t){const e=(a+Wt)/As*Di,i=(t+Wt)/As*Di;let n=Math.floor(e),s=Math.floor(i);n<0&&(n=0),s<0&&(s=0),n>Di-1&&(n=Di-1),s>Di-1&&(s=Di-1);const o=ie(e-n,0,1),r=ie(i-s,0,1),c=Ms[s*Ni+n],l=Ms[s*Ni+n+1],h=Ms[(s+1)*Ni+n],d=Ms[(s+1)*Ni+n+1],u=c+(l-c)*o,f=h+(d-h)*o;return u+(f-u)*r}function Wn(a,t){const i=j(a+3.4,t)-j(a-3.4,t),n=j(a,t+3.4)-j(a,t-3.4);return Math.hypot(i,n)/(2*3.4)}function ri(a,t){return ne(a,t,X.lake.x,X.lake.z)>118?!1:j(a,t)<Ie-.05}function Yi(a,t){let e=1/0;for(const[i,n,s,o]of lr){const r=Dl(a,t,i,n,s,o);r<e&&(e=r)}return e}function Cr(a,t){const e=ci(a*.0042+31.7,t*.0042-12.1,3)*.5+.5,i=ci(a*.016-5.5,t*.016+9.2,2)*.5+.5;return ie(e*.75+i*.45-.28,0,1)}const We={meadow:new st("#8aa062"),meadowDry:new st("#a8a066"),grass:new st("#5d7f42"),grassDark:new st("#415f31"),forest:new st("#34502c"),dirt:new st("#8a7350"),rock:new st("#84817a"),rockDark:new st("#5e5d58"),snow:new st("#e6ecf0"),sand:new st("#9c8f68"),mud:new st("#55503a"),ash:new st("#5c5a55")},f0=new st,p0=new st;function m0(a,t,e,i,n=f0){const s=Cr(a,t),o=ci(a*.09+5,t*.09-2,3)*.5+.5,r=ci(a*.028-9,t*.03+3,2)*.5+.5;n.copy(We.grass).lerp(We.meadow,o).lerp(We.meadowDry,r*.5);const c=ci(a*.006-21.5,t*.006+4.7,3)*.5+.5;n.lerp(We.grassDark,_e(.32,.72,c)*.55),s>.42&&n.lerp(We.forest,_e(.42,.85,s)*.8);const l=Yi(a,t);l<3.4&&n.lerp(We.dirt,_e(3.4,.9,l)*.72);const h=ne(a,t,X.swamp.x,X.swamp.z);h<220&&n.lerp(We.mud,_e(220,70,h)*.72),i>.45&&n.lerp(We.rock,_e(.45,1.2,i)),i>1&&n.lerp(We.rockDark,_e(1,2,i)*.6),e>104&&n.lerp(We.rock,_e(104,148,e)*.75);const d=ne(a,t,X.forge.x,X.forge.z);d<30&&n.lerp(We.ash,_e(30,10,d)*.55);const u=152+r*26;if(e>u&&n.lerp(We.snow,_e(u,u+26,e)*(1-_e(1.5,2.4,i))),e>u+22&&n.lerp(We.snow,.4*(1-_e(1.8,2.6,i))),e<Ie+2.2){const f=ne(a,t,X.lake.x,X.lake.z);f<132&&n.lerp(We.sand,_e(Ie+2.2,Ie-1.2,e)*.8*_e(150,110,f))}return n.lerp(p0.setRGB(n.r*1.06,n.g*1.04,n.b*.98),.18),n}function g0(a,t,e){const i=a*Ei-Wt,n=t*Ei-Wt,s=Ei/e,o=e+1,r=o*o,c=s*2.4+4,l=e*8,h=new Float32Array((r+l)*3),d=new Float32Array((r+l)*3),u=new Float32Array((r+l)*2),f=new Float32Array((r+l)*3),g=new Float32Array(r),v=new st,p=2.5;for(let T=0;T<o;T++)for(let E=0;E<o;E++){const R=T*o+E,U=i+E*s,_=n+T*s,w=j(U,_);g[R]=w,h[R*3]=U,h[R*3+1]=w,h[R*3+2]=_;const L=Wn(U,_);m0(U,_,w,L,v),d[R*3]=v.r,d[R*3+1]=v.g,d[R*3+2]=v.b,u[R*2]=U/22,u[R*2+1]=_/22;const O=j(U-p,_)-j(U+p,_),q=j(U,_-p)-j(U,_+p),Z=Math.hypot(O,2*p,q)||1;f[R*3]=O/Z,f[R*3+1]=2*p/Z,f[R*3+2]=q/Z}const m=[];for(let T=0;T<e;T++)for(let E=0;E<e;E++){const R=T*o+E,U=R+1,_=R+o,w=_+1;m.push(R,_,U,U,_,w)}let x=r;const y=T=>(h[x*3]=h[T*3],h[x*3+1]=g[T]-c,h[x*3+2]=h[T*3+2],d[x*3]=d[T*3],d[x*3+1]=d[T*3+1],d[x*3+2]=d[T*3+2],u[x*2]=u[T*2],u[x*2+1]=u[T*2+1],f[x*3]=f[T*3],f[x*3+1]=f[T*3+1],f[x*3+2]=f[T*3+2],x++),b=[T=>T,T=>e*o+T,T=>T*o,T=>T*o+e];for(const T of b)for(let E=0;E<e;E++){const R=T(E),U=T(E+1),_=y(R),w=y(U);m.push(R,_,U,U,_,w)}const z=new Te;return z.setAttribute("position",new Ae(h.subarray(0,x*3),3)),z.setAttribute("color",new Ae(d.subarray(0,x*3),3)),z.setAttribute("uv",new Ae(u.subarray(0,x*2),2)),z.setAttribute("normal",new Ae(f.subarray(0,x*3),3)),z.setIndex(m),z.computeBoundingSphere(),z}function v0(){try{const t=document.createElement("canvas");t.width=256,t.height=256;const e=t.getContext("2d");if(!e||typeof e.fillRect!="function")return null;e.fillStyle="#f2f3ee",e.fillRect(0,0,256,256);let i=1337;const n=()=>(i=(i*1664525+1013904223)%4294967296,i/4294967296);for(let o=0;o<2600;o++){const r=n()*256,c=n()*256,l=1+n()*2.5,h=1+n()*4;e.fillStyle=`rgba(96,116,66,${.1+n()*.16})`,e.fillRect(r,c,l,h)}for(let o=0;o<900;o++){const r=n()*256,c=n()*256;e.fillStyle=`rgba(236,228,176,${.1+n()*.14})`,e.fillRect(r,c,2+n()*5,1+n()*2)}for(let o=0;o<260;o++){const r=n()*256,c=n()*256;e.fillStyle=`rgba(148,126,92,${.06+n()*.1})`,e.fillRect(r,c,3+n()*9,2+n()*4)}const s=new Il(t);return s.wrapS=Es,s.wrapT=Es,s.colorSpace=ti,s.anisotropy=4,s}catch{return null}}class _0{constructor(t){this.scene=t,this.group=new nt,this.group.name="terrain-chunks",t.add(this.group);const e=v0();this.material=new wa({vertexColors:!0,map:e??null}),this.chunks=new Map,this.queue=[],this.lastLodPos=new Vt(1e9,1e9),this.updatesPerFrame=3,this.stats={built:0,triangles:0};for(let i=0;i<Bc;i++)for(let n=0;n<Bc;n++)this.chunks.set(`${n},${i}`,{cx:n,cz:i,res:0,mesh:null,centerX:n*Ei-Wt+Ei/2,centerZ:i*Ei-Wt+Ei/2})}lodForDistance(t){return t<190?26:t<420?13:7}ensureChunk(t,e){if(t.res===e&&t.mesh)return;t.mesh&&(this.group.remove(t.mesh),t.mesh.geometry.dispose());const i=g0(t.cx,t.cz,e),n=new yt(i,this.material);n.receiveShadow=!0,n.castShadow=!1,n.matrixAutoUpdate=!1,n.updateMatrix(),n.name=`chunk-${t.cx}-${t.cz}`,this.group.add(n),t.mesh=n,t.res=e,this.stats.built+=1}buildInitial(t){for(const e of this.chunks.values()){if(e.centerX<-Wt||e.centerZ<-Wt)continue;const i=Math.hypot(e.centerX-t.x,e.centerZ-t.z);this.ensureChunk(e,i<260?26:7)}}update(t,e){if(Math.hypot(t.x-this.lastLodPos.x,t.z-this.lastLodPos.y)>35){this.lastLodPos.set(t.x,t.z),this.queue=[];for(const s of this.chunks.values()){const o=Math.hypot(s.centerX-t.x,s.centerZ-t.z),r=this.lodForDistance(o);s.res!==r&&this.queue.push({chunk:s,want:r,d:o})}this.queue.sort((s,o)=>s.d-o.d)}let n=this.updatesPerFrame;for(;n>0&&this.queue.length;){const s=this.queue.shift();s.chunk.res!==s.want&&(this.ensureChunk(s.chunk,s.want),n-=1)}}get triangles(){let t=0;for(const e of this.chunks.values())e.mesh&&(t+=e.mesh.geometry.index.count/3);return t}}const li=4;function x0(){const a=X.lake.x,t=X.lake.z,e=150,i=Math.ceil(e*2/li)+1,n=a-e,s=t-e,o=new Uint8Array(i*i);for(let f=0;f<i;f++)for(let g=0;g<i;g++){const v=n+g*li,p=s+f*li;o[f*i+g]=j(v,p)<Ie+.55?1:0}const r=[],c=[],l=[],h=new Int32Array(i*i).fill(-1),d=(f,g)=>{const v=g*i+f;if(h[v]>=0)return h[v];const p=r.length/3;return r.push(n+f*li,0,s+g*li),c.push((n+f*li)/18,(s+g*li)/18),h[v]=p,p};for(let f=0;f<i-1;f++)for(let g=0;g<i-1;g++){const v=o[f*i+g],p=o[f*i+g+1],m=o[(f+1)*i+g],x=o[(f+1)*i+g+1];if(!(v||p||m||x))continue;const y=d(g,f),b=d(g+1,f),z=d(g,f+1),T=d(g+1,f+1);v&&p&&m&&l.push(y,z,b),p&&m&&x&&l.push(b,z,T),p&&x&&l.push(b,z,T)}const u=new Te;return u.setAttribute("position",new re(r,3)),u.setAttribute("uv",new re(c,2)),u.setIndex(l),u.computeVertexNormals(),u.computeBoundingSphere(),u}function y0(){const a=X.lake.x,t=X.lake.z,e=150,i=Math.ceil(e*2/li)+1,n=a-e,s=t-e,o=1.5,r=new Float32Array(i*i);for(let p=0;p<i;p++)for(let m=0;m<i;m++)r[p*i+m]=Ie-j(n+m*li,s+p*li);const c=[],l=[],h=[],d=new st("#2f6579"),u=new st("#e8f6f8"),f=new st,g=(p,m)=>{const x=r[m*i+p],y=Math.max(0,Math.min(1,x/o));return f.copy(u).lerp(d,y),c.push(n+p*li,0,s+m*li),l.push(f.r,f.g,f.b),c.length/3-1};for(let p=0;p<i-1;p++)for(let m=0;m<i-1;m++){const x=r[p*i+m],y=r[p*i+m+1],b=r[(p+1)*i+m],z=r[(p+1)*i+m+1],T=Math.max(x,y,b,z),E=Math.min(x,y,b,z);if(T<=0||E>o)continue;const R=g(m,p),U=g(m+1,p),_=g(m,p+1),w=g(m+1,p+1);h.push(R,_,U,U,_,w)}const v=new Te;return v.setAttribute("position",new re(c,3)),v.setAttribute("color",new re(l,3)),v.setIndex(h),v.computeVertexNormals(),v}function M0(){const a=new nt;a.name="water";const t=new ke({color:"#27586c",transparent:!0,opacity:.94,roughness:.28,metalness:.16,flatShading:!1});t.side=Se;const e=x0(),i=new yt(e,t);i.position.set(0,Ie,0),i.name="lake",a.add(i);const n=new Ee({color:"#ffffff",vertexColors:!0,transparent:!0,opacity:.5,depthWrite:!1}),s=new yt(y0(),n);s.position.set(0,Ie+.07,0),s.name="lake-foam",a.add(s);const o=[],r=j(X.swamp.x,X.swamp.z);for(let d=0;d<7;d++){const u=d/7*Math.PI*2+.6,f=22+d%3*16,g=X.swamp.x+Math.cos(u)*f,v=X.swamp.z+Math.sin(u)*f,p=Math.max(r+.3,j(g,v)+.22),m=new as(8+d%4*3,12),x=new yt(m,t);x.rotation.x=-Math.PI/2,x.rotation.z=u,x.position.set(g,p,v),a.add(x),o.push({mesh:x,level:p})}const c=i.geometry.attributes.position,l=Float32Array.from(c.array);let h=0;return{mesh:a,update(d){h+=d;const u=c.array;for(let f=0;f<c.count;f++){const g=l[f*3],v=l[f*3+2];u[f*3+1]=Math.sin(g*.06+h*.9)*.13+Math.cos(v*.08+h*.7)*.1}c.needsUpdate=!0,i.geometry.computeVertexNormals();for(let f=0;f<o.length;f++)o[f].mesh.position.y=o[f].level+Math.sin(h*.8+f)*.012;n.opacity=.4+Math.sin(h*.9)*.1+Math.sin(h*2.3)*.04,s.position.y=Ie+.07+Math.sin(h*.9)*.02}}}const fo=new Map;function G(a,t={}){const e=a+JSON.stringify(t);if(fo.has(e))return fo.get(e);const i=new ke({color:new st(a),roughness:t.rough??.86,metalness:t.metal??.04,flatShading:t.flat??!0,emissive:t.emissive?new st(t.emissive):new st(0),emissiveIntensity:t.emissiveIntensity??1,transparent:!!t.transparent,opacity:t.opacity??1,side:t.side??Oi});return fo.set(e,i),i}function H(a,t,e=0,i=0,n=0){const s=new yt(a,t);return s.position.set(e,i,n),s.castShadow=!0,s.receiveShadow=!0,s}const At=(a,t,e)=>new hi(a,t,e),Vc=(a,t,e,i=6)=>new kt(a,t,e,i);function po({w:a=5.4,d:t=4.6,h:e=3,wall:i="#b9a17c",roof:n="#5d3f33",rot:s=0}={}){const o=new nt,r=H(At(a,e,t),G(i,{rough:.92}));r.position.y=e/2,o.add(r);const c=G("#4a3527",{rough:.9});for(const m of[-1,1]){const x=H(At(.22,e,.22),c,m*a/2-m*.11,e/2,t/2+.02);o.add(x)}const l=H(At(a+.1,.24,.22),c,0,e-.5,t/2+.03);o.add(l);const h=Math.max(a,t)*.46,d=new Zt(Math.hypot(a,t)*.5+.45,h,4,1),u=H(d,G(n,{rough:.95}),0,e+h/2-.05,0);u.rotation.y=Math.PI/4,u.scale.set(1,1,t/a),o.add(u);const f=H(At(.6,1.5,.6),G("#5a5148"),a*.27,e+h*.42,-t*.18);o.add(f);const g=H(At(.95,1.9,.12),G("#3e2a1c",{rough:.85}),0,.95,t/2+.08);o.add(g);const v=H(new Xt(.06,6,5),G("#c9a24a",{metal:.8,rough:.4}),.3,1,t/2+.16);o.add(v);const p=G("#f3c07a",{emissive:"#ffb45c",emissiveIntensity:.85,rough:.35});for(const m of[-1,1]){const x=H(At(.8,.8,.1),p,m*(a*.3),e*.62,t/2+.07);o.add(x);const y=H(At(.92,.92,.06),G("#40301f"),m*(a*.3),e*.62,t/2+.04);o.add(y)}return o.rotation.y=s,o.userData.footprint={w:a+1.2,d:t+1.2},o}function gs(a=1,{kind:t="oak"}={}){const e=new De(a),i=new nt,n=e.float(.85,1.35);if(t==="pine"){const s=H(new kt(.24,.36,5.6,6),G("#4a3626"),0,2.8,0);i.add(s);const o=G("#3c5c36",{rough:.95});for(let r=0;r<4;r++){const c=2.5-r*.5,l=H(new Zt(c,2.4,7),o,0,3.4+r*1.5,0);l.rotation.y=e.float(0,Math.PI),i.add(l)}}else if(t==="dead"){const s=H(new kt(.16,.42,5,6),G("#3a322a"),0,2.5,0);i.add(s);const o=G("#332c25");for(let r=0;r<4;r++){const c=e.float(0,Math.PI*2),l=e.float(1.4,2.4),h=H(new kt(.05,.14,l,5),o);h.position.set(Math.cos(c)*l*.32,3.2+r*.5,Math.sin(c)*l*.32),h.rotation.set(Math.cos(c)*1.1,0,-Math.sin(c)*1.1),i.add(h)}}else{const s=H(new kt(.3,.44,3.4,6),G("#523a26"),0,1.7,0);i.add(s);const o=G("#4d7a41",{rough:.94}),r=G("#5d8a4c",{rough:.94}),c=3+Math.floor(e.float(0,2.6));for(let l=0;l<c;l++){const h=e.float(0,Math.PI*2),d=e.float(.4,1.5),u=e.float(1.4,2.4),f=H(new os(u,0),l%2?o:r,Math.cos(h)*d,3.4+e.float(0,1.9),Math.sin(h)*d);f.rotation.set(e.float(0,3),e.float(0,3),e.float(0,3)),i.add(f)}}return i.scale.setScalar(n),i.rotation.y=e.float(0,Math.PI*2),i}function w0(a=1){const t=new De(a),e=new nt,i=G(t.chance(.5)?"#4d7040":"#5b8346",{rough:.96}),n=2+Math.floor(t.float(0,2));for(let s=0;s<n;s++){const o=t.float(.5,.95),r=H(new os(o,0),i,t.float(-.5,.5),o*.8,t.float(-.5,.5));r.rotation.set(t.float(0,3),t.float(0,3),t.float(0,3)),e.add(r)}return e}function Zi(a=1,t=1){const e=new De(a),i=new vi(1,0),n=i.attributes.position;for(let o=0;o<n.count;o++)n.setXYZ(o,n.getX(o)*e.float(.7,1.25),n.getY(o)*e.float(.55,1.05),n.getZ(o)*e.float(.7,1.25));i.computeVertexNormals();const s=H(i,G(e.chance(.5)?"#8b8880":"#77746d",{rough:.95}));return s.scale.setScalar(t),s.rotation.set(e.float(0,.4),e.float(0,6.28),e.float(0,.4)),s}function Ca(a={}){const{skin:t="#d3a67e",tunic:e="#6b4a2f",pants:i="#3e342a",boots:n="#2f2823",hair:s="#3b2a1c",cloak:o=null,hood:r=null,beard:c=!1,scar:l=!1,bulk:h=1,eyeColor:d=null,armor:u=null}=a,f=new nt,g=1.12,v=.72*h,p=.6*h,m=new nt;m.position.y=0,f.add(m);const x=H(At(p,v,.34*h),G(e),0,g,0);if(m.add(x),u){const w=H(At(p+.05,v*.8,.38*h),G(u,{metal:.72,rough:.42}),0,g+.02,0);m.add(w);const L=H(At(p+.02,.12,.4*h),G("#3a2a1b"),0,g-v*.44,0);m.add(L)}else{const w=H(At(p+.02,.11,.37*h),G("#4a3524"),0,g-v*.42,0);m.add(w);const L=H(At(.13,.13,.05),G("#b8913f",{metal:.8,rough:.35}),0,g-v*.42,.19);m.add(L)}const y=H(new kt(.09,.11,.13,6),G(t),0,g+v/2+.05,0);m.add(y);const b=new nt;b.position.y=g+v/2+.24,m.add(b);const z=H(new Xt(.21,8,7),G(t),0,0,0);b.add(z);const T=H(new Xt(.225,8,6,0,Math.PI*2,0,Math.PI*.62),G(s),0,.025,0);if(b.add(T),c){const w=H(new Zt(.14,.3,6),G(s),0,-.16,.09);w.rotation.x=Math.PI,b.add(w)}const E=G(d||"#1a1410",{emissive:d||"#000000",emissiveIntensity:d?1.6:0,rough:.2});for(const w of[-1,1]){const L=H(new Xt(.033,6,5),E,w*.085,.02,.19);L.castShadow=!1,b.add(L)}if(l){const w=H(At(.025,.19,.02),G("#8c4b42"),.1,.03,.2);w.rotation.z=.32,b.add(w)}const R=[];for(const w of[-1,1]){const L=new nt;L.position.set(w*(p/2+.09),g+v/2-.08,0);const O=H(new kt(.075,.065,.36,6),G(e),0,-.18,0);L.add(O);const q=H(new kt(.065,.058,.34,6),G(t),0,-.5,0);L.add(q);const Z=H(new Xt(.075,6,5),G(t),0,-.7,0);L.add(Z),m.add(L),R.push(L)}const U=[];for(const w of[-1,1]){const L=new nt;L.position.set(w*.17,.78,0);const O=H(new kt(.1,.09,.42,6),G(i),0,-.21,0);L.add(O);const q=H(new kt(.088,.075,.34,6),G(i),0,-.58,0);L.add(q);const Z=H(At(.17,.1,.28),G(n),0,-.78,.05);L.add(Z),m.add(L),U.push(L)}let _=null;if(o){const w=new kt(.34*h,.46*h,1.05,8,1,!0,Math.PI*.62,Math.PI*1.76);_=H(w,G(o,{side:Se,rough:.92}),0,g-.18,-.03),_.castShadow=!0,m.add(_);const L=new kt(.3*h,.34*h,.16,8,1,!0,Math.PI*.55,Math.PI*1.9),O=H(L,G(o,{side:Se,rough:.9}),0,g+v/2-.02,-.02);m.add(O)}if(r){const w=H(new Zt(.27,.42,7),G(r,{rough:.94}),0,.14,-.03);w.rotation.x=-.15,b.add(w);const L=H(new kt(.3,.34,.16,7),G(r),0,g+v/2+.1,0);m.add(L)}return f.userData.height=1.85*Math.min(1.15,h),{group:f,parts:{body:m,head:b,arms:R,legs:U,torso:x,cloak:_}}}function bs({blade:a="#cdd6dd",guard:t="#b08a3e",grip:e="#3a2a1c",glow:i=null}={}){const n=new nt,s=G(a,{metal:.92,rough:.22,emissive:i||"#000000",emissiveIntensity:i?.7:0}),o=H(At(.075,1.05,.022),s,0,.72,0);n.add(o);const r=H(new Zt(.055,.2,4),s,0,1.33,0);n.add(r);const c=H(At(.3,.06,.08),G(t,{metal:.85,rough:.35}),0,.19,0);n.add(c);const l=H(new kt(.035,.04,.24,6),G(e),0,.05,0);n.add(l);const h=H(new Xt(.055,6,5),G(t,{metal:.85,rough:.35}),0,-.09,0);if(n.add(h),i){const d=new Ue(i,1.4,4.5,2);d.position.y=.8,n.add(d)}return n}function b0(a="#6d5a3d"){const t=new nt,e=H(new kt(.34,.34,.06,8),G(a,{rough:.8}),0,0,0);e.rotation.x=Math.PI/2,t.add(e);const i=H(new Xt(.1,7,6),G("#9c8a6a",{metal:.6,rough:.45}),0,0,.06);t.add(i);const n=H(new di(.34,.028,5,12),G("#4c3d2a",{metal:.5,rough:.5}),0,0,.01);return t.add(n),t}function Nl(a=1){const t=new De(a),e=new nt,i=G(t.chance(.5)?"#4a443c":"#57504a",{rough:.95}),n=G("#332f2a",{rough:.95}),s=new nt;e.add(s);const o=H(At(.44,.44,1.05),i,0,.72,0);s.add(o);const r=H(At(.42,.38,.35),i,0,.72,-.58);s.add(r);const c=H(At(.28,.3,.3),i,0,.85,.58);s.add(c);const l=new nt;l.position.set(0,.9,.78),s.add(l);const h=H(At(.3,.28,.36),i,0,0,0);l.add(h);const d=H(At(.16,.15,.26),n,0,-.06,.28);l.add(d);const u=H(At(.08,.06,.05),G("#1b1815"),0,-.03,.42);l.add(u);for(const v of[-1,1]){const p=H(new Zt(.075,.2,4),n,v*.11,.2,-.02);l.add(p);const m=H(new Xt(.032,5,4),G("#d8a13a",{emissive:"#e0a33c",emissiveIntensity:1.1}),v*.13,.04,.16);m.castShadow=!1,l.add(m)}const f=H(new Zt(.11,.55,5),n,0,.92,-.82);f.rotation.x=-.85,s.add(f);const g=[];for(const[v,p]of[[-1,1],[1,1],[-1,-1],[1,-1]]){const m=new nt;m.position.set(v*.17,.58,p*.34);const x=H(new kt(.065,.055,.55,5),i,0,-.27,0);m.add(x);const y=H(At(.14,.09,.19),n,0,-.55,.03);m.add(y),s.add(m),g.push({pivot:m,front:p>0,side:v})}return e.userData.height=1.15,{group:e,parts:{body:s,head:l,legs:g,tail:f}}}function S0(){const a=new nt,t=new nt;a.add(t);const e=G("#7b776e",{rough:.95}),i=G("#5c5952",{rough:.96}),n=G("#54704a",{rough:.98}),s=G("#8fe0c8",{emissive:"#4fe0b8",emissiveIntensity:1.8,rough:.3}),o=H(new vi(.85,0),e,0,1.85,0);o.scale.set(1,1.15,.85),t.add(o);for(let g=0;g<4;g++){const v=H(At(.07,.5-g*.08,.06),s,-.3+g*.2,1.8+g%2*.2,.72);v.rotation.z=.3-g*.2,t.add(v)}const r=H(new vi(.5,0),i,0,1,0);r.scale.set(1.1,.8,.9),t.add(r);const c=new nt;c.position.set(0,2.75,.08),t.add(c);const l=H(new vi(.42,0),i,0,0,0);l.scale.set(1,.9,.95),c.add(l);for(const g of[-1,1]){const v=H(new Xt(.07,6,5),s,g*.15,.03,.36);v.castShadow=!1,c.add(v)}const h=H(new os(.3,0),n,.3,.25,-.1);c.add(h);const d=[];for(const g of[-1,1]){const v=new nt;v.position.set(g*.95,2.35,0);const p=H(new vi(.34,0),e,0,-.42,0);p.scale.set(1,1.5,1),v.add(p);const m=H(new vi(.3,0),i,0,-1,0);m.scale.set(1,1.35,1),v.add(m);const x=H(new vi(.36,0),e,0,-1.42,0);v.add(x),t.add(v),d.push(v)}const u=[];for(const g of[-1,1]){const v=new nt;v.position.set(g*.34,1,0);const p=H(new vi(.28,0),i,0,-.28,0);p.scale.set(1,1.3,1),v.add(p);const m=H(new vi(.24,0),e,0,-.68,0);m.scale.set(1,1.4,1),v.add(m);const x=H(At(.42,.2,.56),i,0,-1,.06);v.add(x),t.add(v),u.push(v)}const f=new Ue("#6fe0c0",2.2,8,2);return f.position.y=1.9,a.add(f),a.userData.height=3.2,{group:a,parts:{body:t,head:c,arms:d,legs:u,golem:!0}}}function E0(){const a=new nt,t=new nt;a.add(t);const e=G("#4c5a3c",{rough:.9}),i=G("#37422c",{rough:.92}),n=G("#6f8a52",{emissive:"#2f4a22",emissiveIntensity:.5,rough:.5}),s=H(new Xt(.72,9,7),e,0,.95,0);s.scale.set(1.15,.86,1.05),t.add(s);const o=H(new Xt(.5,8,6),i,0,1.05,-.45);o.scale.set(1.2,.7,.9),t.add(o);const r=new nt;r.position.set(0,1.22,.62),t.add(r);const c=H(new Xt(.42,8,6),e,0,0,0);c.scale.set(1.1,.8,1.05),r.add(c);const l=H(At(.42,.12,.16),G("#1c2318"),0,-.12,.36);r.add(l);for(const f of[-1,1]){const g=H(new Xt(.09,6,5),G("#d8e06a",{emissive:"#c8e04a",emissiveIntensity:1.8}),f*.17,.12,.32);g.castShadow=!1,r.add(g);const v=H(new Zt(.09,.34,4),i,f*.26,.34,-.05);v.rotation.z=f*.5,r.add(v)}const h=[];for(const f of[-1,1]){const g=new nt;g.position.set(f*.72,.95,.15);const v=H(Vc(.16,.1,.95,5),e,0,-.45,0);g.add(v);const p=H(new Zt(.16,.34,4),i,0,-.95,.05);p.rotation.x=Math.PI,g.add(p),t.add(g),h.push(g)}const d=[];for(const f of[-1,1]){const g=new nt;g.position.set(f*.38,.5,0);const v=H(Vc(.14,.12,.5,5),i,0,-.25,0);g.add(v);const p=H(At(.3,.12,.44),i,0,-.5,.08);g.add(p),t.add(g),d.push(g)}const u=H(new Xt(.16,6,5),n,.3,1.15,.42);return u.scale.set(1.4,.5,1.1),t.add(u),a.userData.height=1.7,{group:a,parts:{body:t,head:r,arms:h,legs:d,lurker:!0}}}function T0(){const a=G("#cfc6ae",{rough:.72}),t=G("#a99c82",{rough:.8}),e=new nt,i=new nt;e.add(i);const n=H(new kt(.06,.06,.55,5),a,0,1.12,0);i.add(n);for(let u=0;u<4;u++){const f=H(new di(.17-u*.012,.022,4,8,Math.PI*1.35),a,0,1.28-u*.11,0);f.rotation.x=Math.PI/2,f.rotation.z=Math.PI*.32,i.add(f)}const s=H(At(.3,.14,.2),t,0,.8,0);i.add(s);const o=new nt;o.position.y=1.52,i.add(o);const r=H(new Xt(.17,7,6),a,0,0,0);r.scale.set(1,1.05,1.12),o.add(r);const c=H(At(.2,.08,.17),t,0,-.13,.04);o.add(c);const l=G("#7fe0c0",{emissive:"#59e0b6",emissiveIntensity:2.2,rough:.2});for(const u of[-1,1]){const f=H(new Xt(.045,6,5),l,u*.07,.02,.15);f.castShadow=!1,o.add(f)}const h=[];for(const u of[-1,1]){const f=new nt;f.position.set(u*.22,1.36,0);const g=H(new kt(.038,.034,.38,5),a,0,-.19,0);f.add(g);const v=H(new kt(.033,.03,.36,5),a,0,-.55,0);f.add(v);const p=H(At(.09,.1,.06),t,0,-.75,0);f.add(p),i.add(f),h.push(f)}const d=[];for(const u of[-1,1]){const f=new nt;f.position.set(u*.12,.79,0);const g=H(new kt(.048,.042,.42,5),a,0,-.21,0);f.add(g);const v=H(new kt(.042,.036,.4,5),a,0,-.6,0);f.add(v);const p=H(At(.11,.06,.22),t,0,-.81,.05);f.add(p),i.add(f),d.push(f)}return e.userData.height=1.75,{group:e,parts:{body:i,head:o,arms:h,legs:d,skeleton:!0}}}function aa(){const a=new nt;G("#6a6660",{rough:.95});for(let c=0;c<9;c++){const l=c/9*Math.PI*2,h=Zi(c+4,.22);h.position.set(Math.cos(l)*.72,.08,Math.sin(l)*.72),a.add(h)}const t=G("#3f2b1b");for(let c=0;c<4;c++){const l=c/4*Math.PI,h=H(new kt(.09,.11,1.15,5),t,0,.16,0);h.rotation.z=Math.PI/2,h.rotation.y=l,a.add(h)}const e=new Ee({color:"#ffb04a",transparent:!0,opacity:.9}),i=new yt(new Zt(.32,.95,6),e);i.position.y=.6,i.castShadow=!1,a.add(i);const n=new Ee({color:"#ffe1a0",transparent:!0,opacity:.95}),s=new yt(new Zt(.16,.6,5),n);s.position.y=.45,a.add(s);const o=new Ue("#ff9a45",9,17,2);o.position.y=1.15,o.castShadow=!1,a.add(o);let r=0;return{group:a,light:o,update(c){r+=c;const l=.85+Math.sin(r*8.3)*.08+Math.sin(r*3.1)*.06;i.scale.set(l,l*1.1,l),s.scale.set(l,l*1.15,l),o.intensity=7.5+Math.sin(r*6.7)*1.4+Math.sin(r*11.3)*.7}}}function A0(){const a=new nt,t=G("#4a4a4e",{metal:.75,rough:.45}),e=H(At(.5,.55,.5),G("#4a3626"),0,.27,0);a.add(e);const i=H(At(.7,.28,.32),t,0,.68,0);a.add(i);const n=H(new Zt(.16,.42,4),t,.5,.68,0);return n.rotation.z=-Math.PI/2,a.add(n),a}function C0(){const a=new nt,t=G("#5b5650",{rough:.96}),e=H(At(2.1,1.9,1.6),t,0,.95,0);a.add(e);const i=H(At(.8,2.6,.8),t,.5,2.6,-.3);a.add(i);const n=new Ee({color:"#ff7b2a"}),s=new yt(At(.9,.7,.1),n);s.position.set(-.35,1,.82),a.add(s);const o=new Ue("#ff7a35",6,13,2);return o.position.set(0,1.4,1.3),a.add(o),{group:a,light:o}}function Wc(){const a=new nt,t=G("#6d6961",{rough:.95}),e=H(new kt(1.05,1.1,.85,10),t,0,.42,0);a.add(e);const i=new yt(new kt(.86,.86,.06,10),G("#22343c",{rough:.15,metal:.6}));i.position.y=.8,a.add(i);const n=G("#4c3626");for(const r of[-1,1]){const c=H(At(.14,2.1,.14),n,r*.85,1.85,0);a.add(c)}const s=H(At(2,.14,.16),n,0,2.9,0);a.add(s);const o=H(new Zt(1.5,.75,4),G("#5a3f30"),0,3.35,0);return o.rotation.y=Math.PI/4,o.scale.set(1,1,.7),a.add(o),a}function oa(){const a=new nt,t=G("#4e3823",{rough:.94}),e=H(new kt(.11,.13,2.6,6),t,0,1.3,0);a.add(e);const i=[{r:.4,label:0},{r:2.5,label:1},{r:4.4,label:2}];for(const n of i){const s=H(At(1.1,.26,.07),t,Math.cos(n.r)*.5,2.2-n.label*.32,Math.sin(n.r)*.5);s.rotation.y=-n.r,a.add(s)}return a}function vs(a=4,t=3){const e=new De(t),i=new nt,n=G("#58402b",{rough:.95}),s=Math.max(2,Math.round(a/1.1));for(let o=0;o<s;o++){const r=H(At(.11,e.float(1,1.35),.11),n,(o/(s-1)-.5)*a,.58,0);r.rotation.z=e.float(-.05,.05),i.add(r)}for(const o of[.5,.95]){const r=H(At(a,.08,.06),n,0,o,0);i.add(r)}return i}function jc(a="#5b4a35"){const t=new nt,e=G(a,{rough:.96,side:Se}),i=H(new Zt(1.5,2.2,4),e,0,1.1,0);i.rotation.y=Math.PI/4,i.scale.set(1,1,.9),t.add(i);const n=H(new kt(.05,.05,2.6,5),G("#42301f"),0,1.3,0);return t.add(n),t}function Bn(){const a=new nt,t=G("#5a4029",{rough:.9}),e=H(new kt(.36,.32,.9,9),t,0,.45,0);a.add(e);for(const i of[.16,.75]){const n=H(new di(.36,.025,4,10),G("#3c3a36",{metal:.7,rough:.5}),0,i,0);n.rotation.x=Math.PI/2,a.add(n)}return a}function Hn(a=.8){const t=new nt,e=G("#6a4d31",{rough:.94}),i=H(At(a,a,a),e,0,a/2,0);t.add(i);const n=G("#4a3524");for(const[s,o]of[[-1,-1],[1,-1],[-1,1],[1,1]]){const r=H(At(.07,a+.02,.07),n,s*a/2,a/2,o*a/2);t.add(r)}return t}function Qe({locked:a=!1}={}){const t=new nt,e=G("#5b3c22",{rough:.88}),i=G("#8f7a45",{metal:.75,rough:.42}),n=H(At(1,.55,.62),e,0,.28,0);t.add(n);const s=H(new kt(.31,.31,1,8,1,!1,0,Math.PI),e,0,.55,0);s.rotation.z=Math.PI/2,s.rotation.y=Math.PI/2,t.add(s);for(const c of[-.32,.32]){const l=H(At(.09,.6,.66),i,c,.4,0);t.add(l)}const o=H(At(.18,.22,.08),i,0,.42,.33);t.add(o);let r=null;return a||(r=new Ue("#e2b878",1.6,3.6,2),r.position.y=.8,t.add(r)),t.userData.locked=a,t.userData.lid=s,t.userData.glow=r,t}function Gn(a=2.4,t=2){const e=new De(t),i=new hi(.85,a,.7,1,3,1),n=i.attributes.position;for(let o=0;o<n.count;o++)n.setXYZ(o,n.getX(o)+e.float(-.07,.07),n.getY(o),n.getZ(o)+e.float(-.06,.06));i.computeVertexNormals();const s=H(i,G("#66645c",{rough:.96}),0,a/2,0);return s.rotation.y=e.float(0,1),s}function R0(){const a=new nt,t=G("#5f5c55",{rough:.96});for(const s of[-1,1]){const o=H(At(1.1,5.4,1.1),t,s*2.2,2.7,0);a.add(o);const r=H(At(1.4,.4,1.4),t,s*2.2,5.5,0);a.add(r)}const e=H(At(6.4,.9,1.2),t,0,6,0);a.add(e);const i=new yt(At(4.2,.16,.1),new Ee({color:"#7fd8c0"}));i.position.set(0,5.5,.62),a.add(i);const n=new Ue("#5fd0b0",3.5,12,2);return n.position.y=4.6,a.add(n),a}function z0(a=4){const t=new nt,e=G("#6a6760",{rough:.95}),i=H(new kt(.45,.52,a,7),e,0,a/2,0);t.add(i);const n=H(At(1.1,.3,1.1),e,0,a,0);return t.add(n),t}function _s(a="#66d6c4",t=1){const e=new nt,i=new ke({color:a,emissive:a,emissiveIntensity:1.7,transparent:!0,opacity:.88,roughness:.2,metalness:.2,flatShading:!0});for(let s=0;s<3;s++){const o=new yt(new Zt(.22*t,1.1*t,5),i);o.position.set(Math.cos(s*2.1)*.22*t,(.55+Math.random()*.1)*t,Math.sin(s*2.1)*.22*t),o.rotation.z=Math.cos(s*2.1)*.24,o.rotation.x=Math.sin(s*2.1)*.24,o.castShadow=!1,e.add(o)}const n=new Ue(a,2.2,7,2);return n.position.y=.8*t,e.add(n),e}function ki(a=5){const t=new nt,e=Zi(a,.95);t.add(e);const i=G("#8a939c",{metal:.85,rough:.35,emissive:"#3a4d5c",emissiveIntensity:.35}),n=new De(a+9);for(let s=0;s<6;s++){const o=H(new Tr(n.float(.11,.2),0),i),r=n.float(0,Math.PI*2),c=n.float(.3,.85);o.position.set(Math.cos(r)*c,n.float(.2,.9),Math.sin(r)*c),o.rotation.set(n.float(0,3),n.float(0,3),n.float(0,3)),t.add(o)}return t}function gi(a=4){const t=new nt,e=new De(a),i=G("#3f6a35"),n=G("#5f9a4a",{rough:.9}),s=G("#e4c96a",{emissive:"#7a6a22",emissiveIntensity:.5});for(let o=0;o<5;o++){const r=e.float(0,Math.PI*2),c=e.float(0,.4),l=e.float(.3,.52),h=H(new kt(.015,.02,l,4),i,Math.cos(r)*c,l/2,Math.sin(r)*c);t.add(h);const d=H(new Xt(.07,5,4),n,Math.cos(r)*c,l*.6,Math.sin(r)*c);d.scale.set(1.7,.45,1.1),t.add(d);const u=H(new Xt(.06,5,4),s,Math.cos(r)*c,l,Math.sin(r)*c);t.add(u)}return t}function $i(a="#7a2f2f"){const t=new nt,e=H(new kt(.05,.06,3,5),G("#3e2d1d"),0,1.5,0);t.add(e);const i=H(At(.9,1.4,.04),G(a,{rough:.95,side:Se}),.47,2.2,0);t.add(i);const n=H(new Zt(.08,.26,4),G("#9a8b5f",{metal:.7,rough:.4}),0,3.1,0);return t.add(n),t}function fn(a=7){const t=new nt,e=new De(a),i=G("#cfc5ac",{rough:.8});for(let s=0;s<5;s++){const o=H(new kt(.05,.05,e.float(.4,.8),5),i,e.float(-.5,.5),.06,e.float(-.5,.5));o.rotation.set(Math.PI/2+e.float(-.4,.4),e.float(0,3),e.float(-.4,.4)),t.add(o)}const n=H(new Xt(.17,6,5),i,.2,.16,.15);return n.scale.set(1,1.05,1.15),t.add(n),t}function P0(a=8){const t=new nt,e=new De(a),i=G(e.chance(.5)?"#5e5b55":"#696660",{rough:.96}),n=H(At(.7,e.float(.9,1.5),.16),i,0,.55,0);n.rotation.z=e.float(-.12,.12),n.rotation.x=e.float(-.08,.08),t.add(n);const s=H(new Xt(.7,6,4),G("#3f3a30",{rough:1}),0,.05,-.8);return s.scale.set(1,.22,1.4),t.add(s),t}function k0(a="#8b5fd6"){const t=new nt,e=new ke({color:"#4a3a58",emissive:a,emissiveIntensity:1.5,roughness:.5,metalness:.4}),i=new yt(new di(2.4,.18,8,24),e);i.position.y=3,i.castShadow=!1,t.add(i);const n=new yt(new as(2.3,24),new Ee({color:a,transparent:!0,opacity:.22,side:Se}));n.position.y=3,t.add(n);const s=new Ue(a,5,16,2);s.position.y=3,t.add(s);let o=0;return{group:t,update(r){o+=r,n.material.opacity=.16+Math.sin(o*1.8)*.07,i.rotation.z=Math.sin(o*.4)*.05}}}function mo(){const a=new nt,t=G("#6d6a62",{rough:.95}),e=H(new kt(1.2,1.35,.4,8),t,0,.2,0);a.add(e);for(let c=0;c<3;c++){const l=c/3*Math.PI*2,h=H(new kt(.16,.2,1.7,6),t,Math.cos(l)*.62,1.2,Math.sin(l)*.62);a.add(h)}const i=H(new kt(.55,.32,.35,8),t,0,2.1,0);a.add(i);const n=new Ee({color:"#9fe8d8",transparent:!0,opacity:.9}),s=new yt(new Zt(.24,.7,6),n);s.position.y=2.6,a.add(s);const o=new Ue("#7fe8d0",5,12,2);o.position.y=2.7,a.add(o);let r=0;return{group:a,light:o,update(c){r+=c,s.scale.setScalar(.9+Math.sin(r*7)*.08),o.intensity=4.2+Math.sin(r*5.3)*.8}}}function I0(){const a=new nt,t=G("#5b4227",{rough:.9,side:Se}),e=H(new kt(.8,.55,3.2,8,1,!0,0,Math.PI),t,0,.55,0);e.rotation.z=Math.PI/2,e.rotation.y=Math.PI/2,a.add(e);const i=H(At(1,.1,.4),G("#4a3524"),0,.62,0);return a.add(i),a}function L0(){const a=new nt,t=G("#4a3626",{rough:.95}),e=H(new kt(.14,.18,2.4,6),t,0,1.2,0);a.add(e);const i=G("#d3cbb4",{rough:.8}),n=H(At(.44,.36,.5),i,0,2.55,0);a.add(n);const s=H(At(.22,.18,.3),i,0,2.46,.36);a.add(s);for(const o of[-1,1]){const r=H(new Zt(.09,.22,4),i,o*.16,2.82,-.05);a.add(r);const c=H(new Xt(.04,5,4),G("#d24a2a",{emissive:"#ff5324",emissiveIntensity:1.6}),o*.13,2.6,.24);a.add(c)}return a}function Fl(a,t=!1){const e=a[0].index!==null,i=new Set(Object.keys(a[0].attributes)),n=new Set(Object.keys(a[0].morphAttributes)),s={},o={},r=a[0].morphTargetsRelative,c=new Te;let l=0;for(let h=0;h<a.length;++h){const d=a[h];let u=0;if(e!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in d.attributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;s[f]===void 0&&(s[f]=[]),s[f].push(d.attributes[f]),u++}if(u!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(r!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in d.morphAttributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(d.morphAttributes[f])}if(t){let f;if(e)f=d.index.count;else if(d.attributes.position!==void 0)f=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,f,h),l+=f}}if(e){let h=0;const d=[];for(let u=0;u<a.length;++u){const f=a[u].index;for(let g=0;g<f.count;++g)d.push(f.getX(g)+h);h+=a[u].attributes.position.count}c.setIndex(d)}for(const h in s){const d=qc(s[h]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,d)}for(const h in o){const d=o[h][0].length;if(d===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let u=0;u<d;++u){const f=[];for(let v=0;v<o[h].length;++v)f.push(o[h][v][u]);const g=qc(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(g)}}return c}function qc(a){let t,e,i,n=-1,s=0;for(let l=0;l<a.length;++l){const h=a[l];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=h.normalized),i!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(n===-1&&(n=h.gpuType),n!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=h.count*e}const o=new t(s),r=new Ae(o,e,i);let c=0;for(let l=0;l<a.length;++l){const h=a[l];if(h.isInterleavedBufferAttribute){const d=c/e;for(let u=0,f=h.count;u<f;u++)for(let g=0;g<e;g++){const v=h.getComponent(u,g);r.setComponent(u+d,g,v)}}else o.set(h.array,c);c+=h.count*e}return n!==void 0&&(r.gpuType=n),r}const ra=new st;function D0(a,t){let e=a.index?a.toNonIndexed():a.clone();for(const s of Object.keys(e.attributes))["position","normal","uv"].includes(s)||e.deleteAttribute(s);if(!e.attributes.uv){const s=e.attributes.position.count;e.setAttribute("uv",new Ae(new Float32Array(s*2),2))}e.attributes.normal||e.computeVertexNormals();const i=e.attributes.position.count,n=new Float32Array(i*3);ra.set(t);for(let s=0;s<i;s++)n[s*3]=ra.r,n[s*3+1]=ra.g,n[s*3+2]=ra.b;return e.setAttribute("color",new Ae(n,3)),e}function jn(a){const t=[];if(a.updateMatrixWorld(!0),a.traverse(i=>{if(!i.isMesh||!i.geometry)return;const n=i.material?.color?i.material.color.getHexString():"888888",s=D0(i.geometry,"#"+n);s.applyMatrix4(i.matrixWorld),t.push(s)}),t.length===0)return null;const e=Fl(t,!1);for(const i of t)i.dispose();return e}const U0=new wa({vertexColors:!0});class N0{constructor(t){this.scene=t,this.buckets=new Map,this.meshes=[],this.totalParts=0,this._matrix=new ue}key(t,e){const i=Math.floor((t+Wt)/Ei),n=Math.floor((e+Wt)/Ei);return`${i},${n}`}bucket(t,e){const i=this.key(t,e);let n=this.buckets.get(i);return n||(n=[],this.buckets.set(i,n)),n}add(t,e,i,n,s=0,o=1){t.position.set(e,i,n),t.rotation.set(0,s,0),o!==1&&t.scale.setScalar(o);const r=jn(t);r&&(this.bucket(e,n).push(r),this.totalParts+=1,t.traverse(c=>{c.isMesh&&c.geometry?.dispose()}))}addGeometry(t,e,i,n,s=0,o=1){const r=t.clone();this._matrix.makeRotationY(s),this._matrix.scale(new C(o,o,o)),this._matrix.setPosition(e,i,n),r.applyMatrix4(this._matrix),this.bucket(e,n).push(r),this.totalParts+=1}finalize(t=!0){for(const[e,i]of this.buckets){if(!i.length)continue;const n=i.length===1?i[0]:Fl(i,!1);if(i.length>1)for(const o of i)o.dispose();const s=new yt(n,U0);s.castShadow=t,s.receiveShadow=!0,s.matrixAutoUpdate=!1,s.updateMatrix(),s.name=`props-${e}`,s.geometry.computeBoundingSphere(),this.scene.add(s),this.meshes.push(s)}this.buckets.clear()}dispose(){for(const t of this.meshes)this.scene.remove(t),t.geometry.dispose();this.meshes.length=0}}const fe=(a,t,e)=>new hi(a,t,e),ai=(a,t,e,i=6)=>new kt(a,t,e,i);function Bt(a,t,e=0,i=0,n=0){const s=new yt(a,t);return s.position.set(e,i,n),s.castShadow=!0,s.receiveShadow=!0,s}class F0{constructor(t){this.game=t,this.group=new nt,this.group.name="world",this.colliders=[],this.interactables=[],this.nodes=[],this.animated=[],this.propsGroup=new nt,this.propsGroup.name="static-props",this.group.add(this.propsGroup),this.batcher=new N0(this.propsGroup),this.rng=new De(20260413),this.terrain=new _0(this.group),this.water=M0(),this.group.add(this.water.mesh),this._buildVillage(),this._buildTradingPost(),this._buildForgeHill(),this._buildBanditCamp(),this._buildBarrow(),this._buildRuins(),this._buildQuarry(),this._buildLake(),this._buildCastle(),this._buildHermitage(),this._buildSwamp(),this._buildPass(),this._buildCircle(),this._buildMine(),this._buildCrossroads(),this._buildHighlands(),this._buildRoadCamp(),this._scatterNature(),this.batcher.finalize(!0),t.scene.add(this.group),this.terrain.buildInitial(t.player?.pos??new C(0,0,360))}addStatic(t,e,i,n=0,{yOffset:s=0,collide:o=null,whole:r=!1}={}){const c=j(e,i)+s;return r?(t.position.set(e,c,i),t.rotation.y=n,this.group.add(t)):this.batcher.add(t,e,c,i,n),o&&this.colliders.push({x:e,z:i,r:o}),t}addInteractive({id:t,kind:e,x:i,z:n,radius:s=3,label:o,mesh:r,data:c={},cooldown:l=0,rotY:h=0,yOffset:d=0}){const u=r??new nt;u.position.set(i,j(i,n)+d,n),u.rotation.y=h,u.traverse(g=>{g.isMesh&&(g.castShadow=!0,g.receiveShadow=!0)}),this.group.add(u),(e==="resource"||e==="chest")&&this.colliders.push({x:i,z:n,r:e==="chest"?.8:.9});const f={id:t,kind:e,pos:new C(i,j(i,n),n),radius:s,label:o,mesh:u,data:c,cooldown:l,timer:0,available:!0};return this.interactables.push(f),this.nodes.push(f),f}addLight(t,e,i,n,s,o=3){const r=new Ue(t,e,i,2);return r.position.set(n,j(n,s)+o,s),this.group.add(r),r}findNearest(t){let e=null,i=1/0;for(const n of this.interactables){if(!n.available)continue;const s=ne(t.x,t.z,n.pos.x,n.pos.z);s<n.radius&&s<i&&(e=n,i=s)}return e}update(t,e,i){this.water.update(t),e&&this._updateFireflies(t,1-(e.dayF??1));for(const n of this.animated)n.update?.(t);for(const n of this.nodes)!n.available&&n.timer>0&&(n.timer-=t,n.timer<=0&&(n.available=!0,n.mesh&&(n.mesh.visible=!0)));i&&this.terrain.update(i,t)}harvest(t){return t.available?(t.available=!1,t.timer=t.cooldown,t.mesh&&(t.mesh.visible=!1),!0):!1}_buildVillage(){const t=X.village.x,e=X.village.z,i=new De(77),n=[{a:.5,r:34,w:6.2,d:5.2,wall:"#b7a17c"},{a:1.15,r:40,w:5.4,d:4.8,wall:"#a89272"},{a:2.05,r:36,w:6.4,d:5.4,wall:"#bfa987"},{a:2.8,r:42,w:5.2,d:4.6,wall:"#ad9576"},{a:3.6,r:38,w:6,d:5,wall:"#b09a78"},{a:4.3,r:44,w:5.8,d:4.8,wall:"#b7a382"},{a:5.1,r:35,w:5,d:4.4,wall:"#b3a07f"},{a:5.75,r:46,w:6.6,d:5.6,wall:"#a58f70"}];for(const h of n){const d=t+Math.cos(h.a)*h.r,u=e+Math.sin(h.a)*h.r,f=-h.a+Math.PI/2;this.addStatic(po({w:h.w,d:h.d,wall:h.wall,roof:"#5b3d31"}),d,u,f,{collide:Math.max(h.w,h.d)*.5}),this.batcher.add(Bn(),d+Math.cos(h.a+.8)*3.4,j(d,u),u+Math.sin(h.a+.8)*3.4,i.float(0,3)),i.chance(.6)&&this.batcher.add(Hn(.75),d+Math.cos(h.a-.9)*3.2,j(d,u),u+Math.sin(h.a-.9)*3.2,i.float(0,3))}const s=aa();s.group.position.set(t,j(t,e),e),this.group.add(s.group),this.animated.push(s),this.colliders.push({x:t,z:e,r:1.2}),this.addInteractive({id:"campfire_rest",kind:"rest",x:t,z:e,radius:4.2,label:"Odpocznij przy ognisku (do świtu)",mesh:null});for(let h=0;h<4;h++){const d=h/4*Math.PI*2+.5,u=new nt;u.add(Bt(fe(2.6,.18,.55),G("#4e3a25"),0,.5,0));for(const v of[-.95,.95])u.add(Bt(fe(.18,.5,.45),G("#3d2d1d"),v,.25,0));const f=t+Math.cos(d)*4.6,g=e+Math.sin(d)*4.6;this.addStatic(u,f,g,-d,{collide:1.2})}this.addStatic(Wc(),t-9,e+6,.4,{collide:1.5});const o=C0();o.group.position.set(t-24,j(t-24,e-10),e-10),o.group.rotation.y=1.4,this.group.add(o.group),this.animated.push(o),this.colliders.push({x:t-24,z:e-10,r:1.7}),this.addInteractive({id:"village_anvil",kind:"station",x:t-19,z:e-8,radius:3.6,label:"Kuźnia Borysa — rzemiosło",mesh:A0(),data:{station:"forge",name:"Kuźnia Borysa"}});for(let h=0;h<3;h++)this.batcher.add(Hn(.6+h*.1),t-21+h*1.4,j(t-21,e-5),e-5+h%2,h);for(let h=0;h<2;h++){const d=t+16+h*6,u=e+12-h*3,f=new nt;for(const[v,p]of[[-1.5,-1],[1.5,-1],[-1.5,1],[1.5,1]])f.add(Bt(ai(.08,.08,2.5,5),G("#4a3524"),v,1.25,p));const g=Bt(new Zt(2.5,.9,4),G(h===0?"#6b3f4a":"#3f5a4a"),0,2.8,0);g.rotation.y=Math.PI/4,g.scale.set(1,1,.82),f.add(g),f.add(Bt(fe(2.6,.14,1.3),G("#5a4229"),0,.95,0));for(let v=0;v<4;v++){const p=Bt(new Xt(.27,6,5),G(v%2?"#8a7a5a":"#7a6647"),-.95+v*.62,1.16,.2);p.scale.y=1.3,f.add(p)}this.addStatic(f,d,u,.4,{collide:1.8})}for(let h=0;h<6;h++){const d=h*1.1;this.batcher.add(gi(20+h),t+26+Math.cos(d)*3,j(t+26,e-18),e-18+Math.sin(d)*3,d)}const r=new nt;for(let h=0;h<4;h++){const d=vs(4.4,h+2);d.rotation.y=h*Math.PI/2,d.position.set(Math.cos(h*Math.PI/2+Math.PI/4)*4.6,0,Math.sin(h*Math.PI/2+Math.PI/4)*4.6),r.add(d)}this.addStatic(r,t+26,e-18,0),this.addInteractive({id:"village_herbs",kind:"resource",x:t+24,z:e-21,radius:3,label:"Zbierz zioła",mesh:gi(91),cooldown:45,data:{item:"herbs",qty:2}});const c=e-52;for(const h of[-1,1]){const d=new nt;d.add(Bt(ai(.26,.32,5,6),G("#4a3322"),0,2.5,0));const u=new yt(new Zt(.22,.75,5),new Ee({color:"#ffb45c"}));u.position.y=5.1,d.add(u),this.addStatic(d,h*4.4,c,0,{collide:.6}),this.addLight("#ff9a45",4.2,14,h*4.4,c,5)}const l=[.15,.75,1.35,1.95,2.55,3.7,4.3,4.9,5.5,6.1];for(const h of l){const u=t+Math.cos(h)*54,f=e+Math.sin(h)*54;Math.abs(u-t)<7&&f<e||this.batcher.add(vs(12,Math.floor(h*10)),u,j(u,f),f,-h+Math.PI/2)}this.batcher.add($i("#3f5a4a"),t+8,j(t+8,c+6),c+6,-.4),this.batcher.add($i("#6b3f4a"),t-8,j(t-8,c+6),c+6,.5),this.addInteractive({id:"village_chest",kind:"chest",x:t-30,z:e+16,radius:3.2,label:"Stara skrzynia",mesh:Qe(),rotY:.7,data:{loot:[["bread",2],["gold",35],["leather_hood",1]]}})}_buildTradingPost(){const t=X.trading.x,e=X.trading.z,i=new De(303);for(let o=0;o<5;o++){const r=o/5*Math.PI*2+.3,c=t+Math.cos(r)*26,l=e+Math.sin(r)*26;this.addStatic(po({w:5.4,d:4.6,wall:o%2?"#c2ad8a":"#b09a78",roof:o%3?"#5d4034":"#4c3a30"}),c,l,-r+Math.PI/2,{collide:3}),this.batcher.add(Bn(),c+Math.cos(r+1)*3.4,j(c,l),l+Math.sin(r+1)*3.4,i.float(0,3))}const n=new nt;for(const[o,r]of[[-5,-3],[5,-3],[-5,3],[5,3]])n.add(Bt(ai(.16,.16,4.2,6),G("#4a3524"),o,2.1,r));const s=Bt(new Zt(9,2.4,4),G("#6b3f4a"),0,5.2,0);s.rotation.y=Math.PI/4,s.scale.set(1,1,.72),n.add(s);for(let o=-1;o<=1;o++){n.add(Bt(fe(3.2,.16,1.4),G("#5a4229"),o*3.4,1,0));for(let r=0;r<3;r++)n.add(Bt(new Xt(.24,5,4),G(r%2?"#8a7a5a":"#77624a"),o*3.4-1+r,1.2,0))}this.addStatic(n,t,e-4,.2,{collide:5.2});for(let o=0;o<3;o++){const r=.9+o*2,c=t+Math.cos(r)*15,l=e+Math.sin(r)*15,h=new nt;h.add(Bt(fe(3,.5,1.6),G("#5b432a"),0,.9,0));for(const[d,u]of[[-1,-.9],[1,-.9],[-1,.9],[1,.9]]){const f=Bt(ai(.5,.5,.12,10),G("#3f2e1d"),d,.5,u);f.rotation.x=Math.PI/2,h.add(f)}h.add(Bt(fe(1.2,.9,1.2),G("#7a6647"),.6,1.45,0)),this.addStatic(h,c,l,r,{collide:1.8})}this.addStatic(Wc(),t+12,e+12,.2,{collide:1.5}),this.addStatic(oa(),t-14,e+10,.8,{collide:.5});for(let o=0;o<8;o++){const r=o/8*Math.PI*2+.2,c=t+Math.cos(r)*34,l=e+Math.sin(r)*34;Math.abs(c-t)<6&&l<e||this.batcher.add(vs(10,40+o),c,j(c,l),l,-r+Math.PI/2)}this.addInteractive({id:"trading_station",kind:"station",x:t+2,z:e+4,radius:4.2,label:"Targ w Kotlinie — handel",mesh:null,data:{station:"market",name:"Targ w Kotlinie"}}),this.addInteractive({id:"trading_chest",kind:"chest",x:t+22,z:e-16,radius:3.2,label:"Kufer kupiecki",mesh:Qe(),rotY:-.5,data:{loot:[["gold",90],["mana_potion",2],["spark_ring",1]]}});for(let o=0;o<4;o++){const r=o*1.9+.4;this.batcher.add(gi(120+o),t+Math.cos(r)*21,j(t+Math.cos(r)*21,e+Math.sin(r)*21),e+Math.sin(r)*21,r)}this.addLight("#ffb45c",3.4,12,t+2,e+4,3.4)}_buildForgeHill(){const t=X.forge.x,e=X.forge.z,i=j(t,e),n=new nt,s=G("#5a5a58");n.add(Bt(fe(3.4,2.8,2.6),s,0,1.4,0)),n.add(Bt(fe(1.2,3.6,1.2),s,.8,3.8,-.6));const o=new yt(fe(1.5,1.1,.14),new Ee({color:"#59c8e8"}));o.position.set(-.4,1.4,1.32),n.add(o);const r=new Ue("#59c8e8",8,22,2);r.position.set(0,2,1.8),n.add(r),n.position.set(t+5,i,e-4),n.rotation.y=-.9,this.group.add(n),this.animated.push({update:()=>{r.intensity=6.5+Math.sin(performance.now()*.004)*1.6}}),this.colliders.push({x:t+5,z:e-4,r:2.4});const c=new nt;c.add(Bt(fe(1.6,.75,.85),G("#3f444a",{metal:.75,rough:.4}),0,1.05,0)),c.add(Bt(ai(.48,.64,.75,6),G("#4a4a4a"),0,.38,0)),this.addInteractive({id:"ancient_anvil",kind:"station",x:t,z:e+3,radius:4,label:"Starożytna kuźnia — rzemiosło",mesh:c,data:{station:"ancient_forge",name:"Starożytna kuźnia"}});for(let d=0;d<9;d++){const u=d/9*Math.PI*2;this.batcher.add(Gn(2.2+d%3*.6,30+d),t+Math.cos(u)*14,j(t+Math.cos(u)*14,e+Math.sin(u)*14),e+Math.sin(u)*14,u),this.colliders.push({x:t+Math.cos(u)*14,z:e+Math.sin(u)*14,r:.7})}for(let d=0;d<4;d++){const u=.8+d*1.6,f=_s("#6ee0d6",1.2),g=t+Math.cos(u)*9,v=e+Math.sin(u)*9;f.position.set(g,j(g,v),v),this.group.add(f)}const l=new nt;l.add(Zi(741,1.4));const h=_s("#ffd27a",.8);h.position.y=.9,l.add(h),this.addInteractive({id:"forge_shard",kind:"resource",x:t-8,z:e+7,radius:3.2,label:"Wyjmij okruch z kamiennej szczeliny",mesh:l,cooldown:999999,data:{item:"shard_dawn",qty:1,once:!0}}),this.addInteractive({id:"forge_metal",kind:"resource",x:t+10,z:e+6,radius:3,label:"Wykop starożytny metal",mesh:ki(140),cooldown:130,data:{item:"ancient_metal",qty:1}});for(let d=0;d<3;d++){const u=-.6+d*1.9;this.addInteractive({id:`ore_hill_${d}`,kind:"resource",x:t+Math.cos(u)*19,z:e+Math.sin(u)*19,radius:3,label:"Wydobądź rudę żelaza",mesh:ki(40+d),cooldown:55,data:{item:"iron_ore",qty:2}})}}_buildBanditCamp(){const t=X.bandits.x,e=X.bandits.z;for(let n=0;n<5;n++){const s=n/5*Math.PI*2+.4,o=t+Math.cos(s)*(12+n%2*6),r=e+Math.sin(s)*(12+n%2*6);this.addStatic(jc(n%2?"#5b4a35":"#4f4030"),o,r,s,{collide:1.7})}const i=aa();i.group.position.set(t,j(t,e),e),this.group.add(i.group),this.animated.push(i),this.colliders.push({x:t,z:e,r:1.2}),this.batcher.add(L0(),t+12,j(t+12,e+9),e+9,.6),this.batcher.add($i("#7a2f2f"),t-13,j(t-13,e-4),e-4,1.2),this.batcher.add($i("#7a2f2f"),t+3,j(t+3,e+15),e+15,-.4);for(let n=0;n<6;n++){const s=n*1.05;this.batcher.add(Hn(.6+n%3*.15),t+Math.cos(s)*15,j(t+Math.cos(s)*15,e+Math.sin(s)*15),e+Math.sin(s)*15,n),this.batcher.add(Bn(),t+Math.cos(s+.4)*17,j(t+Math.cos(s+.4)*17,e+Math.sin(s+.4)*17),e+Math.sin(s+.4)*17,s)}for(let n=0;n<7;n++){const s=n*.9;this.batcher.add(vs(8,n+5),t+Math.cos(s)*23,j(t+Math.cos(s)*23,e+Math.sin(s)*23),e+Math.sin(s)*23,-s+Math.PI/2)}this.addInteractive({id:"bandit_chest",kind:"chest",x:t-10,z:e-7,radius:3.2,label:"Skrzynia bandytów",mesh:Qe(),rotY:.5,data:{loot:[["stolen_grain",1],["old_key",1],["gold",70],["health_potion",2],["iron_ore",2]]}}),this.addInteractive({id:"bandit_ore",kind:"resource",x:t+18,z:e+14,radius:3,label:"Wydobądź rudę żelaza",mesh:ki(77),cooldown:60,data:{item:"iron_ore",qty:2}}),this.addLight("#ff9a45",4,14,t,e,2.5)}_buildBarrow(){const t=X.barrow.x,e=X.barrow.z,i=j(t,e),n=new yt(new Xt(15,16,16,0,Math.PI*2,0,Math.PI*.5),G("#4d4a41"));n.scale.set(1,.62,1),n.position.set(t,i-.5,e-6),n.receiveShadow=!0,n.castShadow=!0,this.group.add(n),this.colliders.push({x:t,z:e-6,r:8});for(const s of[-1,1])this.batcher.add(Bt(fe(.8,3,.8),G("#5e5a52")),t+s*1.5,j(t+s*1.5,e+9),e+9,0);this.batcher.add(Bt(fe(4,.7,1),G("#5e5a52")),t,i+3.2,e+9,0);for(let s=0;s<8;s++){const o=.3+s*.78,r=t+Math.cos(o)*19,c=e+Math.sin(o)*19;s%2?this.batcher.add(P0(60+s),r,j(r,c),c,o):this.batcher.add(Gn(2+s%3*.5,70+s),r,j(r,c),c,o),this.colliders.push({x:r,z:c,r:.8})}this.batcher.add(fn(4),t-9,j(t-9,e+14),e+14,.4),this.batcher.add(fn(9),t+10,j(t+10,e+11),e+11,1.4),this.addInteractive({id:"barrow_chest",kind:"chest",x:t+4,z:e+15,radius:3.2,label:"Zapomniana skrzynia",mesh:Qe(),rotY:-.7,data:{loot:[["crystal_mana",2],["gold",55],["ancient_metal",1]]}}),this.addInteractive({id:"barrow_metal",kind:"resource",x:t-16,z:e+11,radius:3,label:"Wykop starożytny metal",mesh:ki(123),cooldown:100,data:{item:"ancient_metal",qty:1,rare:!0}}),this.addInteractive({id:"barrow_grave_herb",kind:"resource",x:t+16,z:e-6,radius:3,label:"Zbierz zioła",mesh:gi(31),cooldown:45,data:{item:"herbs",qty:2}})}_buildRuins(){const t=X.ruins.x,e=X.ruins.z,i=j(t,e),n=k0("#8b5fd6");n.group.position.set(t,i,e-8),this.group.add(n.group),this.animated.push(n),this.addStatic(R0(),t,e+12,0,{collide:2.6});for(let s=0;s<8;s++){const o=s/8*Math.PI*2+.3,r=t+Math.cos(o)*26,c=e+Math.sin(o)*26;this.batcher.add(z0(4+s%3*.9),r,j(r,c),c,o),this.colliders.push({x:r,z:c,r:.9})}for(let s=0;s<10;s++){const o=s/10*Math.PI*2,r=t+Math.cos(o)*33,c=e+Math.sin(o)*33,l=new nt;l.add(Bt(fe(6,2+s%3*.9,.9),G("#615e56"),0,1.2,0)),this.addStatic(l,r,c,-o,{collide:2})}for(let s=0;s<4;s++){const o=.8+s*1.6,r=t+Math.cos(o)*20,c=e+Math.sin(o)*20,l=new nt;l.add(Bt(ai(.36,.24,.42,7),G("#4a4a4a"),0,1.7,0)),l.add(Bt(ai(.1,.18,1.6,5),G("#3a3a3a"),0,.8,0));const h=new yt(new Zt(.24,.66,5),new Ee({color:"#a678e8"}));h.position.y=2.15,l.add(h),this.addStatic(l,r,c,0),this.addLight("#9c6fe8",4,16,r,c,2.4)}this.batcher.add(fn(15),t+8,j(t+8,e+5),e+5,.2),this.batcher.add(fn(16),t-9,j(t-9,e-2),e-2,1.2),this.addInteractive({id:"ruins_chest",kind:"chest",x:t+17,z:e+17,radius:3.2,label:"Skrzynia strażnika",mesh:Qe(),rotY:1,data:{loot:[["ancient_metal",1],["gold",90],["might_elixir",1],["crystal_mana",1]]}}),this.addInteractive({id:"ruins_herbs",kind:"resource",x:t-21,z:e+20,radius:3,label:"Zbierz zioła",mesh:gi(55),cooldown:45,data:{item:"herbs",qty:2}})}_buildQuarry(){const t=X.quarry.x,e=X.quarry.z;for(let i=0;i<14;i++){const n=i/14*Math.PI*2,s=11+i%4*4,o=t+Math.cos(n)*s,r=e+Math.sin(n)*s,c=1.5+i%3*.9;this.batcher.add(Zi(200+i,c),o,j(o,r),r,n),this.colliders.push({x:o,z:r,r:c*.8})}for(let i=0;i<4;i++){const n=.5+i*1.6;this.addInteractive({id:`quarry_ore_${i}`,kind:"resource",x:t+Math.cos(n)*7,z:e+Math.sin(n)*7,radius:3.2,label:"Wydobądź rudę żelaza",mesh:ki(300+i),cooldown:50,data:{item:"iron_ore",qty:2}})}this.batcher.add(Hn(1),t+10,j(t+10,e+10),e+10,.3),this.batcher.add(Bn(),t-10,j(t-10,e+8),e+8,.9),this.addInteractive({id:"quarry_chest",kind:"chest",x:t+5,z:e-14,radius:3.2,label:"Skrzynia górników",mesh:Qe(),rotY:.3,data:{loot:[["iron_ore",4],["gold",40],["might_elixir",1]]}})}_buildLake(){const t=X.lake.x,e=X.lake.z,i=new nt;for(let r=0;r<8;r++)i.add(Bt(fe(2.4,.14,.44),G("#5a422a"),0,.2,r*.5-2));for(const r of[-1,1])for(const c of[-2,1.6])i.add(Bt(ai(.11,.11,2.4,5),G("#42301f"),r*1,-.6,c));const n=t+92,s=e-61;i.position.set(n,Ie+.55,s),i.rotation.y=-.58-Math.PI/2,this.group.add(i);const o=I0();o.position.set(t+77,Ie+.15,e-50),o.rotation.y=.8,this.group.add(o);for(let r=0;r<14;r++){const c=r*.45,l=126+r%3*9,h=t+Math.cos(c)*l,d=e+Math.sin(c)*l;!ri(h,d)&&Yi(h,d)>8&&this.batcher.add(Zi(500+r,.8+r%3*.5),h,j(h,d),d,c)}this.addInteractive({id:"lake_herbs",kind:"resource",x:t+80,z:e+100,radius:3,label:"Zbierz zioła",mesh:gi(66),cooldown:45,data:{item:"herbs",qty:3}}),this.addInteractive({id:"lake_fishing",kind:"resource",x:t+102,z:e-67,radius:3.2,label:"Złów rybę (wędka rybacka)",mesh:null,cooldown:40,data:{item:"lake_fish",qty:1}}),this.addInteractive({id:"lake_chest",kind:"chest",x:t+120,z:e+51,radius:3.2,label:"Zamulona skrzynia",mesh:Qe(),rotY:1.4,data:{loot:[["gold",60],["crystal_mana",1],["mana_potion",2]]}})}_buildCastle(){const t=X.castle.x,e=X.castle.z;j(t,e);const i=G("#6a675f"),n=G("#57544e");for(let s=0;s<10;s++){const o=s/10*Math.PI*2,r=t+Math.cos(o)*34,c=e+Math.sin(o)*34;if(s===0)continue;const l=5+s%4*2.4,h=new nt;h.add(Bt(fe(19,l,2),i,0,l/2,0));for(let d=-1;d<=1;d++)h.add(Bt(fe(1.6,1.2,2.2),n,d*6,l+.6,0));this.addStatic(h,r,c,-o+Math.PI/2,{collide:3.2})}for(const[s,o]of[[-28,-26],[30,-22],[0,-34]]){const r=new nt;r.add(Bt(ai(4.4,5,17,10),i,0,8.5,0)),r.add(Bt(ai(5.2,5.2,1.4,10),n,0,17.6,0));const c=Bt(new Zt(5.6,5.5,10),G("#4a3a30"),0,21,0);r.add(c);for(let l=0;l<3;l++){const h=new yt(fe(.9,1.6,.3),new Ee({color:l===1?"#ffb45c":"#1a1a1e"})),d=l*2.1;h.position.set(Math.cos(d)*4.6,9+l*3,Math.sin(d)*4.6),h.rotation.y=-d,r.add(h)}this.addStatic(r,t+s,e+o,0,{collide:4.4})}for(const s of[-1,1])this.addStatic(Bt(fe(2.6,9,3),n),t+s*8,e+34,0,{collide:1.6});this.addStatic(Bt(fe(19,2,3.2),n,0,0,0),t,e+34,0,{yOffset:9.6}),this.batcher.add(aa().group,t,j(t,e-4),e-4,0),this.addLight("#ff8f45",6,22,t,e-4,2.6),this.batcher.add(fn(21),t+10,j(t+10,e+6),e+6,.4),this.batcher.add(fn(22),t-12,j(t-12,e+2),e+2,1.1),this.batcher.add($i("#4a2a3a"),t-6,j(t-6,e+14),e+14,.2),this.batcher.add($i("#4a2a3a"),t+6,j(t+6,e+14),e+14,-.2),this.addInteractive({id:"castle_chest",kind:"chest",x:t-18,z:e-12,radius:3.4,label:"Skrzynia strażnika warowni",mesh:Qe(),rotY:.2,data:{loot:[["watcher_plate",1],["ancient_metal",1],["gold",120],["might_elixir",1]]}}),this.addInteractive({id:"castle_metal",kind:"resource",x:t+20,z:e+6,radius:3,label:"Wykop starożytny metal",mesh:ki(801),cooldown:120,data:{item:"ancient_metal",qty:1}}),this.addInteractive({id:"castle_herbs",kind:"resource",x:t+4,z:e+22,radius:3,label:"Zbierz zioła",mesh:gi(802),cooldown:45,data:{item:"herbs",qty:2}})}_buildHermitage(){const t=X.hermit.x,e=X.hermit.z,i=po({w:4.6,d:4,h:2.6,wall:"#8a7a60",roof:"#3f3a30"});this.addStatic(i,t,e,.6,{collide:2.6});const n=mo();n.group.position.set(t+7,j(t+7,e+6),e+6),this.group.add(n.group),this.animated.push(n),this.colliders.push({x:t+7,z:e+6,r:1.4});for(let s=0;s<5;s++){const o=s*1.3;this.batcher.add(gi(900+s),t+Math.cos(o)*5,j(t+Math.cos(o)*5,e+Math.sin(o)*5-4),e+Math.sin(o)*5-4,o)}for(let s=0;s<10;s++){const o=s*.63,r=14+s%4*6;this.batcher.add(gs(1200+s,{kind:s%3===0?"dead":"pine"}),t+Math.cos(o)*r,j(t+Math.cos(o)*r,e+Math.sin(o)*r),e+Math.sin(o)*r,o)}for(let s=0;s<3;s++)this.batcher.add(vs(4,60+s),t-6+s*4,j(t-6+s*4,e-6),e-6,.1);this.addInteractive({id:"hermit_herbs",kind:"resource",x:t-8,z:e+8,radius:3,label:"Zbierz zioła pustelnika",mesh:gi(950),cooldown:50,data:{item:"herbs",qty:3}}),this.addInteractive({id:"hermit_chest",kind:"chest",x:t+4,z:e-7,radius:3.2,label:"Kufer pustelnika",mesh:Qe(),rotY:-.9,data:{loot:[["seer_bone",1],["mana_potion",2],["gold",55]]}})}_buildSwamp(){const t=X.swamp.x,e=X.swamp.z,i=new De(8123);for(let n=0;n<26;n++){const s=i.float(0,Math.PI*2),o=i.float(10,70),r=t+Math.cos(s)*o,c=e+Math.sin(s)*o;ri(r,c)||this.batcher.add(gs(3e3+n,{kind:(n%4===0,"dead")}),r,j(r,c),c,i.float(0,6))}for(let n=0;n<10;n++){const s=i.float(0,Math.PI*2),o=i.float(8,60),r=t+Math.cos(s)*o,c=e+Math.sin(s)*o;ri(r,c)||this.batcher.add(fn(3100+n),r,j(r,c),c,s)}for(let n=0;n<5;n++){const s=n/5*Math.PI*2,o=t+Math.cos(s)*34,r=e+Math.sin(s)*34;this.batcher.add(Gn(1.6+n%3*.6,3200+n),o,j(o,r),r,s),this.colliders.push({x:o,z:r,r:.7})}for(let n=0;n<4;n++){const s=.9+n*1.4,o=_s("#8fe0ff",.9),r=t+Math.cos(s)*22,c=e+Math.sin(s)*22;o.position.set(r,Math.max(j(r,c),Ie),c),this.group.add(o)}this.addInteractive({id:"swamp_herbs",kind:"resource",x:t+16,z:e-26,radius:3.2,label:"Zbierz bagienne zioła",mesh:gi(3300),cooldown:60,data:{item:"herbs",qty:4}}),this.addInteractive({id:"swamp_chest",kind:"chest",x:t-24,z:e+22,radius:3.4,label:"Zapadnięta skrzynia",mesh:Qe(),rotY:.9,data:{loot:[["crystal_mana",2],["gold",70],["seer_bone",1]]}}),this.addInteractive({id:"swamp_shard",kind:"resource",x:t+4,z:e+44,radius:3.2,label:"Wyciągnij okruch z mułu",mesh:_s("#ffd27a",.9),cooldown:999999,data:{item:"shard_dawn",qty:1,once:!0}})}_buildPass(){const t=X.pass.x,e=X.pass.z,i=new nt;i.add(Bt(ai(3,3.6,11,8),G("#6b675e"),0,5.5,0)),i.add(Bt(ai(3.8,3.8,1.2,8),G("#565249"),0,11.4,0));const n=Bt(new Zt(4,3.4,8),G("#4c4238"),0,13.6,0);i.add(n),this.addStatic(i,t+18,e-12,.3,{collide:3.2});for(let s=0;s<6;s++){const o=s%2?1:-1,r=Math.floor(s/2)-1,c=t+o*13,l=e-24+r*22;this.batcher.add(Gn(3.4+s%3*.8,4e3+s),c,j(c,l),l,s),this.colliders.push({x:c,z:l,r:.9})}for(let s=0;s<8;s++){const o=s*.8;this.batcher.add(Zi(4100+s,1.2+s%4*.7),t+Math.cos(o)*26,j(t+Math.cos(o)*26,e+Math.sin(o)*26),e+Math.sin(o)*26,o)}this.batcher.add($i("#5a3a2a"),t-16,j(t-16,e+14),e+14,.4),this.batcher.add($i("#5a3a2a"),t+16,j(t+16,e+14),e+14,-.4),this.batcher.add(oa(),t-6,j(t-6,e-18),e-18,.5),this.addInteractive({id:"pass_chest",kind:"chest",x:t+20,z:e+8,radius:3.2,label:"Skrzynia celników",mesh:Qe(),rotY:.8,data:{loot:[["gold",85],["health_potion",2],["iron_ore",3]]}}),this.addInteractive({id:"pass_ore",kind:"resource",x:t-26,z:e-22,radius:3,label:"Wydobądź rudę żelaza",mesh:ki(4200),cooldown:60,data:{item:"iron_ore",qty:2}})}_buildCircle(){const t=X.circle.x,e=X.circle.z;for(let n=0;n<12;n++){const s=n/12*Math.PI*2,o=t+Math.cos(s)*12,r=e+Math.sin(s)*12;this.batcher.add(Gn(2.4+n%4*.7,5e3+n),o,j(o,r),r,s),this.colliders.push({x:o,z:r,r:.8})}const i=mo();i.group.position.set(t,j(t,e),e),this.group.add(i.group),this.animated.push(i),this.colliders.push({x:t,z:e,r:1.5});for(let n=0;n<4;n++){const s=.6+n*1.57,o=_s("#9f7cf0",1),r=t+Math.cos(s)*6,c=e+Math.sin(s)*6;o.position.set(r,j(r,c),c),this.group.add(o)}for(let n=0;n<6;n++){const s=n*1.05;this.batcher.add(gi(5100+n),t+Math.cos(s)*18,j(t+Math.cos(s)*18,e+Math.sin(s)*18),e+Math.sin(s)*18,s)}this.addInteractive({id:"circle_shrine",kind:"shrine",x:t,z:e,radius:4.2,label:"Ołtarz kręgu — złóż ofiarę (40 złota)",mesh:null,data:{cost:40,heal:!0}})}_buildMine(){const t=X.mine.x,e=X.mine.z;j(t,e);for(let o=0;o<8;o++){const r=o*.8;this.batcher.add(Zi(6e3+o,1.4+o%3*.8),t+Math.cos(r)*9,j(t+Math.cos(r)*9,e+Math.sin(r)*9),e+Math.sin(r)*9,r)}const i=new nt,n=G("#4a3826");i.add(Bt(fe(.7,4.2,.7),n,-2.2,2.1,0)),i.add(Bt(fe(.7,4.2,.7),n,2.2,2.1,0)),i.add(Bt(fe(5.4,.8,.8),n,0,4.2,0)),i.add(Bt(fe(6.4,5,3),G("#3a3a38"),0,2.5,-1.7));const s=new yt(fe(3.6,3.4,.2),new Ee({color:"#07080a"}));s.position.set(0,1.7,-.1),i.add(s),this.addStatic(i,t,e-6,0,{collide:3.4}),this.addLight("#ff9a45",3.2,12,t+5,e-2,2.4);for(let o=0;o<4;o++){const r=.8+o*1.6;this.addInteractive({id:`mine_ore_${o}`,kind:"resource",x:t+Math.cos(r)*13,z:e+Math.sin(r)*13,radius:3.2,label:"Wydobądź rudę żelaza",mesh:ki(6100+o),cooldown:45,data:{item:"iron_ore",qty:3}})}this.addInteractive({id:"mine_chest",kind:"chest",x:t-12,z:e+4,radius:3.2,label:"Skrzynia górnicza",mesh:Qe(),rotY:-.4,data:{loot:[["iron_ore",5],["ancient_metal",1],["gold",65]]}}),this.batcher.add(Hn(.9),t+7,j(t+7,e+8),e+8,.2),this.batcher.add(Bn(),t-8,j(t-8,e+9),e+9,.6)}_buildCrossroads(){this.addStatic(oa(),0,150,.4,{collide:.5});const t=mo();t.group.position.set(14,j(14,158),158),this.group.add(t.group),this.animated.push(t),this.colliders.push({x:14,z:158,r:1.4}),this.addInteractive({id:"crossroads_shrine",kind:"shrine",x:14,z:158,radius:4,label:"Kapliczka — złóż ofiarę (20 złota)",mesh:null,data:{cost:20}}),this.addInteractive({id:"signpost",kind:"sign",x:0,z:162,radius:3.4,label:"Przeczytaj drogowskaz (mapa)",mesh:null});for(let e=0;e<4;e++){const i=e*1.5;this.batcher.add(gs(7e3+e),26+Math.cos(i)*8,j(26+Math.cos(i)*8,140+Math.sin(i)*8),140+Math.sin(i)*8,i)}}_buildHighlands(){const t=X.highlands.x,e=X.highlands.z,i=G("#6f6a60"),n=new nt;n.add(Bt(fe(7,1.2,7),i,0,.6,0)),n.add(Bt(fe(5.2,2.4,5.2),G("#5d594f"),0,2,0)),n.add(Bt(fe(1.6,1.4,.4),G("#141518"),0,1.9,2.7)),this.addStatic(n,t,e,.4,{collide:3.6});for(let s=0;s<4;s++){const o=.9+s*1.5,r=t+Math.cos(o)*9,c=e+Math.sin(o)*9;this.batcher.add(Gn(2+s%2*.8,8e3+s),r,j(r,c),c,o),this.colliders.push({x:r,z:c,r:.8})}this.batcher.add(oa(),t+6,j(t+6,e+5),e+5,.7),this.addInteractive({id:"highlands_chest",kind:"chest",x:t-5,z:e+6,radius:3,label:"Skrzynia strażnicy",mesh:Qe(),rotY:.9,data:{loot:[["iron_ore",3],["gold",60],["might_elixir",1]]}}),this.addInteractive({id:"highlands_ore",kind:"resource",x:t+10,z:e-8,radius:3,label:"Wydobądź rudę żelaza",mesh:ki(8100),cooldown:55,data:{item:"iron_ore",qty:2}})}_buildRoadCamp(){this.addStatic(jc("#4f4432"),4,253,.8,{collide:1.7});const i=aa();i.group.position.set(0,j(0,250),250),this.group.add(i.group),this.animated.push(i),this.colliders.push({x:0,z:250,r:1.1}),this.batcher.add(Bn(),0-3.5,j(0-3.5,250+1.5),250+1.5,.4),this.batcher.add(Hn(.7),0-4.5,j(0-4.5,250-1.2),250-1.2,.9),this.addLight("#ff9a45",3,12,0,250,2.4),this.addInteractive({id:"road_camp_rest",kind:"rest",x:0,z:250,radius:3.8,label:"Odpocznij przy ogniu (do świtu)",mesh:null})}_scatterNature(){const t=new De(424242),e={village:64,trading:46,forge:30,bandits:30,barrow:34,ruins:40,quarry:26,castle:44,hermit:26,swamp:24,pass:30,circle:24,mine:24,crossroads:18,lake:0,highlands:0},i=Object.entries(X).filter(([v])=>(e[v]??24)>0).map(([v,p])=>({x:p.x,z:p.z,r:e[v]??24}));i.push({x:2,z:342,r:14});const n=(v,p,m=0)=>{for(const x of i)if(ne(v,p,x.x,x.z)<x.r+m)return!0;return!1},s=[];for(let v=0;v<7;v++){const p=v<3?"pine":v<5||v<6?"oak":"pine",m=gs(1100+v*37,{kind:p}),x=jn(m);x&&s.push({geo:x,pine:p==="pine",dead:!1})}const o=jn(gs(999,{kind:"dead"}));o&&s.push({geo:o,pine:!1,dead:!0});const r=[];for(let v=0;v<6;v++){const p=jn(Zi(2e3+v,1));p&&r.push(p)}const c=[];for(let v=0;v<4;v++){const p=jn(w0(3e3+v));p&&c.push(p)}let l=0;const h=5200;for(let v=0;v<h*5&&l<h;v++){const p=t.float(0,Math.PI*2),m=70+Math.pow(t.next(),.62)*690,x=Math.cos(p)*m,y=Math.sin(p)*m;if(ri(x,y)||Yi(x,y)<6||ne(x,y,X.lake.x,X.lake.z)<132&&j(x,y)<Ie+3.4||n(x,y)||Wn(x,y)>1.15)continue;const b=j(x,y);if(b>135)continue;const z=Cr(x,y),T=ne(x,y,X.swamp.x,X.swamp.z)<210;if(z<.3&&!T&&t.next()>.06)continue;const E=T?s[s.length-1]:s[Math.floor(t.next()*s.length)],R=t.float(1,1.85);this.batcher.addGeometry(E.geo,x,b,y,t.float(0,Math.PI*2),R),R>1.3&&this.colliders.push({x,z:y,r:.5*R}),l+=1}let d=0;for(let v=0;v<5200&&d<1500;v++){const p=t.float(0,Math.PI*2),m=60+Math.pow(t.next(),.6)*700,x=Math.cos(p)*m,y=Math.sin(p)*m;if(ri(x,y)||Yi(x,y)<5||n(x,y))continue;const b=j(x,y);if(Wn(x,y)<.5&&b<90&&t.next()>.16)continue;const T=r[Math.floor(t.next()*r.length)],E=t.float(.8,2.2);this.batcher.addGeometry(T,x,b,y,t.float(0,6.28),E),E>1.6&&this.colliders.push({x,z:y,r:E*.55}),d+=1}let u=0;for(let v=0;v<1400&&u<190;v++){const p=t.float(0,Math.PI*2),m=90+Math.pow(t.next(),.55)*680,x=Math.cos(p)*m,y=Math.sin(p)*m;if(ri(x,y)||Yi(x,y)<8||n(x,y,6))continue;const b=j(x,y);if(Wn(x,y)<.35&&b<80)continue;const T=3+Math.floor(t.next()*5);for(let E=0;E<T;E++){const R=1.2+t.float(0,4.2),U=x+t.float(-R,R),_=y+t.float(-R,R);if(ri(U,_))continue;const w=r[Math.floor(t.next()*r.length)],L=t.float(.7,2.6)*(E===0?1.35:1);this.batcher.addGeometry(w,U,j(U,_)-.15,_,t.float(0,6.28),L),L>1.5&&this.colliders.push({x:U,z:_,r:L*.6})}u+=1}let f=0;for(let v=0;v<900&&f<110;v++){const p=t.float(0,Math.PI*2),m=120+Math.pow(t.next(),.5)*640,x=Math.cos(p)*m,y=Math.sin(p)*m;if(ri(x,y)||Yi(x,y)<6||n(x,y))continue;const b=j(x,y);if(b<96)continue;const z=s.find(E=>E.dead);if(!z)break;const T=t.float(.9,1.6);this.batcher.addGeometry(z.geo,x,b,y,t.float(0,6.28),T),T>1.25&&this.colliders.push({x,z:y,r:.35*T}),f+=1}let g=0;for(let v=0;v<2500&&g<950;v++){const p=t.float(0,Math.PI*2),m=60+Math.pow(t.next(),.6)*660,x=Math.cos(p)*m,y=Math.sin(p)*m;if(ri(x,y)||Yi(x,y)<4||n(x,y,-12)||Wn(x,y)>.9)continue;const b=c[Math.floor(t.next()*c.length)];this.batcher.addGeometry(b,x,j(x,y),y,t.float(0,6.28),t.float(.8,1.7)),g+=1}this._scatterGrass(),this._buildFireflies()}_buildFireflies(){const t=new De(77123),e=[],i=[];for(let r=0;r<520;r++){const c=t.float(0,Math.PI*2),l=40+Math.pow(t.next(),.7)*640,h=Math.cos(c)*l,d=Math.sin(c)*l,u=j(h,d);u<Ie+1||j(h,d)>120||(e.push(h,u+.6+t.float(0,1.6),d),i.push(t.float(0,Math.PI*2)))}if(e.length===0)return;const n=new Te;n.setAttribute("position",new re(e,3));const s=new Er({color:"#ffe4a3",size:.26,transparent:!0,opacity:0,depthWrite:!1,blending:wo,sizeAttenuation:!0}),o=new kl(n,s);o.name="fireflies",o.frustumCulled=!1,(this.group??this.scene).add(o),this.fireflies={points:o,mat:s,geo:n,base:Float32Array.from(n.attributes.position.array),phases:i,t:0}}_updateFireflies(t,e){const i=this.fireflies;if(!i)return;i.t+=t;const n=Math.max(0,Math.min(1,(e-.25)/.5))*.95;if(i.mat.opacity+=(n-i.mat.opacity)*Math.min(1,t*2.5),i.mat.opacity<.01)return;const s=i.geo.attributes.position.array,o=i.t;for(let r=0;r<s.length/3;r++){const c=i.phases[r];s[r*3]=i.base[r*3]+Math.sin(o*.6+c)*1.4,s[r*3+1]=i.base[r*3+1]+Math.sin(o*1.1+c*1.7)*.45,s[r*3+2]=i.base[r*3+2]+Math.cos(o*.5+c*1.3)*1.4}i.geo.attributes.position.needsUpdate=!0}_scatterGrass(){const t=new De(999),e=new nt;for(let u=0;u<6;u++){const f=.4+t.float(0,.35),g=new yt(new Zt(.05,f,3),new wa({color:"#6e8f4f"})),v=u/6*Math.PI*2+t.float(-.4,.4),p=t.float(0,.16);g.position.set(Math.cos(v)*p,f/2,Math.sin(v)*p),g.rotation.set(t.float(-.3,.3),t.float(0,3),t.float(-.3,.3)),e.add(g)}const i=jn(e);e.traverse(u=>{u.isMesh&&u.geometry.dispose()});const n=Object.values(X),s=520,o=n.length*s,r=new wa({color:"#6f9150"}),c=new Ym(i,r,o);c.castShadow=!1,c.receiveShadow=!0,c.frustumCulled=!1;const l=new Ce,h=new st;let d=0;for(const u of n)for(let f=0;f<s;f++){const g=t.float(0,Math.PI*2),v=t.float(10,95),p=u.x+Math.cos(g)*v,m=u.z+Math.sin(g)*v;Math.abs(p)>Wt-10||Math.abs(m)>Wt-10||ri(p,m)||Yi(p,m)<3.4||Wn(p,m)>.9||(l.position.set(p,j(p,m)-.04,m),l.rotation.set(0,t.float(0,6.28),0),l.scale.setScalar(t.float(.8,1.7)),l.updateMatrix(),c.setMatrixAt(d,l.matrix),h.setHSL(.22+t.float(-.03,.05),t.float(.3,.52),t.float(.28,.42)),c.setColorAt(d,h),d+=1)}c.count=d,c.instanceMatrix.needsUpdate=!0,c.instanceColor&&(c.instanceColor.needsUpdate=!0),this.group.add(c),this.grassInstanced=c}}function O0(a,t){let e=a;const i=()=>(e=(e*1664525+1013904223)%4294967296,e/4294967296),n=[];for(let s=0;s<t;s++){const o=[],r=4+Math.floor(i()*5);for(let c=0;c<r;c++)o.push({dx:(i()-.5)*2.2,dy:(i()-.5)*.9,r:.45+i()*.75,a:.16+i()*.24});n.push({x:i(),y:i(),r:.5+i()*1.4,warm:i()>.55,puffs:o})}return n}class B0{constructor(t){this.scene=t,this.canvas=document.createElement("canvas"),this.canvas.width=1024,this.canvas.height=512,this.ctx=this.canvas.getContext("2d"),this.texture=new Il(this.canvas),this.texture.colorSpace=ti,this.texture.mapping=ga,this.texture.magFilter=ii,this.texture.minFilter=ii,this.lastTop=null,this.lastHorizon=null,this.clouds=O0(1337,30),this.draw("#4a7cb0","#c8d8dd"),t.background=this.texture}draw(t,e){const i=this.ctx,n=this.canvas.width,s=this.canvas.height,o=new st(t),r=new st(e),c=r.clone().multiplyScalar(.62),l=i.createLinearGradient(0,0,0,s);l.addColorStop(0,`#${o.getHexString()}`),l.addColorStop(.46,`#${o.clone().lerp(r,.65).getHexString()}`),l.addColorStop(.5,`#${r.getHexString()}`),l.addColorStop(.56,`#${r.clone().lerp(c,.6).getHexString()}`),l.addColorStop(1,`#${c.getHexString()}`),i.globalCompositeOperation="source-over",i.fillStyle=l,i.fillRect(0,0,n,s);const h=o.r*.3+o.g*.59+o.b*.11;if(h<.16){const d=Math.min(1,(.16-h)/.12);for(let u=0;u<240;u++){const f=u*197.3%n,g=u*83.7%(s*.46),v=.6+u*37%10/9;i.fillStyle=`rgba(255,255,255,${(.25+u*13%60/100)*d})`,i.fillRect(f,g,v,v)}}if(h>.05){const d=r.clone().lerp(new st("#ffffff"),.45),u=o.clone().lerp(new st("#ffffff"),.72),f=Math.min(.85,.25+h*.9);for(const g of this.clouds){const v=g.warm?d:u,p=g.x*n,m=(.1+g.y*.34)*s,x=g.r*n*.055;for(const y of g.puffs){const b=p+y.dx*x*1.9,z=m+y.dy*x*.55,T=x*y.r,E=i.createRadialGradient(b,z,0,b,z,T),R=f*y.a;E.addColorStop(0,`rgba(${v.r*255|0},${v.g*255|0},${v.b*255|0},${R})`),E.addColorStop(1,"rgba(255,255,255,0)"),i.fillStyle=E,i.beginPath(),i.arc(b,z,T,0,Math.PI*2),i.fill()}}}this.texture.needsUpdate=!0,this.lastTop=t,this.lastHorizon=e}update(t,e){if(t===this.lastTop&&e===this.lastHorizon)return;const i=new st(t),n=new st(this.lastTop??"#000000"),s=new st(e),o=new st(this.lastHorizon??"#000000");Math.abs(i.r-n.r)+Math.abs(i.g-n.g)+Math.abs(i.b-n.b)+Math.abs(s.r-o.r)+Math.abs(s.g-o.g)+Math.abs(s.b-o.b)<.012||this.draw(t,e)}}function H0(a){const t=a.dayF??1,e=a.duskF??0,i=new st("#3d76b4"),n=new st("#bcd6e0"),s=new st("#080f1e"),o=new st("#2b3d50"),r=new st("#3d3f74"),c=new st("#e59a5e"),l=s.clone().lerp(i,t),h=o.clone().lerp(n,t);return e>.01&&(l.lerp(r,e*.7),h.lerp(c,e*.92)),{top:`#${l.getHexString()}`,horizon:`#${h.getHexString()}`}}const xs={common:{name:"Zwykły",color:"#cfc8b8",cls:"rare-common"},rare:{name:"Rzadki",color:"#6fa8d6",cls:"rare-rare"},epic:{name:"Epicki",color:"#b680d8",cls:"rare-epic"},legend:{name:"Legendarny",color:"#ebb55c",cls:"rare-legend"}},Me={rusty_sword:{name:"Rdzawy miecz",icon:"sword",type:"weapon",slot:"weapon",rarity:"common",stats:{attack:6},value:12,desc:"Pamiątka po ojcu. Tępy, ale wciąż potrafi przeciąć skórę bandyty."},wolf_blade:{name:"Wilcze Ostrze",icon:"sword",type:"weapon",slot:"weapon",rarity:"rare",stats:{attack:13,crit:4},value:90,desc:"Kute w Wilczej Dolinie. Krawędź zdobią wygrawerowane ślady pazurów."},iron_axe:{name:"Żelazny Topór",icon:"axe",type:"weapon",slot:"weapon",rarity:"rare",stats:{attack:16,speed:-.2},value:110,desc:"Ciężki, niezgrabny, ale rozłupuje czaszki trupów jak drewno."},dawn_blade:{name:"Klinga Świtu",icon:"shard",type:"weapon",slot:"weapon",rarity:"legend",stats:{attack:28,crit:8,hp:25},value:0,desc:"Ostrze wykute ze starożytnego metalu i trzech okruchów. Świeci, gdy zbliża się mrok.",glow:"#ffd27a"},hunter_bow:{name:"Łuk myśliwski",icon:"bow",type:"weapon",slot:"weapon",rarity:"rare",stats:{attack:11,crit:6},value:80,desc:"Cisowy łuk z Wilczej Doliny. Wymaga cierpliwości, nie siły."},leather_vest:{name:"Skórzana kurtka",icon:"armor",type:"armor",slot:"armor",rarity:"common",stats:{armor:4,hp:10},value:25,desc:"Wytarta skóra, przeszyta rzemykami. Pachnie dymem ogniska."},chainmail:{name:"Kolczuga",icon:"armor",type:"armor",slot:"armor",rarity:"rare",stats:{armor:11,hp:18},value:140,desc:"Każde ogniwo kute osobno. Waży tyle, że słychać cię z daleka."},wolf_cloak:{name:"Płaszcz z wilczej skóry",icon:"armor",type:"armor",slot:"armor",rarity:"epic",stats:{armor:8,hp:22,speed:.45},value:180,desc:"Wilki wyją ciszej, gdy go nosisz. Ciepły nawet w mgle."},watcher_plate:{name:"Płyta Strażnika",icon:"armor",type:"armor",slot:"armor",rarity:"epic",stats:{armor:18,hp:30,mana:-10},value:240,desc:"Zdjęta z zapomnianego strażnika kurhanu. Wciąż chłodna."},leather_hood:{name:"Kaptur podróżny",icon:"helm",type:"helm",slot:"helm",rarity:"common",stats:{armor:2,mana:10},value:18,desc:"Chroni od deszczu i ciekawskich spojrzeń."},watcher_helm:{name:"Hełm Strażnika",icon:"helm",type:"helm",slot:"helm",rarity:"rare",stats:{armor:6,hp:12},value:85,desc:"Pęknięty wizerunek wilka patrzy z żelaznego nausznika."},wolf_amulet:{name:"Amulet Wilka",icon:"amulet",type:"trinket",slot:"trinket",rarity:"rare",stats:{hp:20,attack:2},value:95,desc:"Kieł zawieszony na rzemieniu. Bije ciepłem, gdy coś czai się w ciemności."},spark_ring:{name:"Pierścień Iskry",icon:"ring",type:"trinket",slot:"trinket",rarity:"rare",stats:{mana:30,attack:2},value:90,desc:"W środku drga drobna iskra — nigdy nie gaśnie."},seer_bone:{name:"Kość Wieszczki",icon:"bone",type:"trinket",slot:"trinket",rarity:"epic",stats:{crit:7,mana:20},value:150,desc:"Szept kurhanu zamknięty w żebrze. Mówi tylko wtedy, gdy słuchasz."},health_potion:{name:"Mikstura leczenia",icon:"potion",type:"consumable",rarity:"common",stack:9,value:18,use:{heal:45},desc:"Gorzka, ziołowa. Zamyka rany i przegania zawroty głowy."},mana_potion:{name:"Mikstura many",icon:"potion",type:"consumable",rarity:"common",stack:9,value:20,use:{mana:40},desc:"Zimna jak woda z górskiego strumienia. Rozjaśnia myśli."},might_elixir:{name:"Eliksir mocy",icon:"elixir",type:"consumable",rarity:"rare",stack:5,value:45,use:{buff:{attack:10,duration:30}},desc:"Na 30 sekund ramiona stają się cięższe od stali."},wolf_meat:{name:"Wilcze mięso",icon:"meat",type:"consumable",rarity:"common",stack:9,value:8,use:{heal:18},desc:"Suche i żylaste, ale lepsze niż pusty żołądek."},lake_fish:{name:"Ryba z jeziora",icon:"meat",type:"consumable",rarity:"common",stack:9,value:10,use:{heal:22},desc:"Zimna woda daje tłuste, srebrne ryby. Nad ogniem smakują lepiej niż w plecaku."},bread:{name:"Chleb podróżny",icon:"bread",type:"consumable",rarity:"common",stack:9,value:5,use:{heal:12},desc:"Upieczony o świcie. Wciąż ciepły."},wolf_pelt:{name:"Wilcze futro",icon:"pelt",type:"material",rarity:"common",stack:30,value:14,desc:"Gęste, szare futro. Kowal zapłaci za nie bez targowania."},iron_ore:{name:"Ruda żelaza",icon:"ore",type:"material",rarity:"common",stack:30,value:10,desc:"Bryłka z kamieniołomu. Trzeba ją jeszcze oczyścić."},herbs:{name:"Zioła lecznicze",icon:"herb",type:"material",rarity:"common",stack:30,value:7,desc:"Rosną przy ścieżkach. Pachną miętą i dymem."},ancient_metal:{name:"Starożytny metal",icon:"metal",type:"material",rarity:"rare",stack:12,value:55,desc:"Nie rdzewieje i jest zimny jak kamień w studni."},crystal_mana:{name:"Kryształ many",icon:"crystal",type:"material",rarity:"rare",stack:12,value:40,desc:"W środku krąży światło. Trzymaj go nisko, gdy jesteś w kurhanie."},shard_dawn:{name:"Okruch Ostrza Świtu",icon:"shard",type:"quest",rarity:"legend",stack:3,value:0,desc:"Fragment legendarnej klingi. Trzy okruchy tworzą całość."},old_key:{name:"Zardzewiały klucz",icon:"key",type:"quest",rarity:"rare",stack:1,value:0,desc:"Do czego pasuje? Ktoś w wiosce będzie wiedział."},stolen_grain:{name:"Worek zboża",icon:"grain",type:"quest",rarity:"common",stack:1,value:0,desc:"Zrabowany w Wilczej Dolinie. Wciąż pachnie młócką."}},Ol=[{id:"weapon",label:"Broń",glyph:"sword"},{id:"armor",label:"Zbroja",glyph:"armor"},{id:"helm",label:"Hełm",glyph:"helm"},{id:"trinket",label:"Amulet",glyph:"amulet"}],Bl=[{id:"health_potion",name:"Mikstura leczenia",out:{id:"health_potion",qty:2},cost:8,mats:{herbs:2}},{id:"mana_potion",name:"Mikstura many",out:{id:"mana_potion",qty:2},cost:10,mats:{herbs:1,crystal_mana:1}},{id:"might_elixir",name:"Eliksir mocy",out:{id:"might_elixir",qty:1},cost:20,mats:{herbs:3,crystal_mana:1}},{id:"wolf_blade",name:"Wilcze Ostrze",out:{id:"wolf_blade",qty:1},cost:30,mats:{wolf_pelt:2,iron_ore:2}},{id:"iron_axe",name:"Żelazny Topór",out:{id:"iron_axe",qty:1},cost:40,mats:{iron_ore:3,wolf_pelt:1}},{id:"chainmail",name:"Kolczuga",out:{id:"chainmail",qty:1},cost:60,mats:{iron_ore:4,wolf_pelt:1}},{id:"wolf_amulet",name:"Amulet Wilka",out:{id:"wolf_amulet",qty:1},cost:45,mats:{wolf_pelt:2,crystal_mana:1}},{id:"wolf_cloak",name:"Płaszcz z wilczej skóry",out:{id:"wolf_cloak",qty:1},cost:90,mats:{wolf_pelt:4,iron_ore:1}},{id:"dawn_blade",name:"Klinga Świtu",out:{id:"dawn_blade",qty:1},cost:150,mats:{ancient_metal:2,shard_dawn:3,iron_ore:2},legendary:!0}];function G0(a){const t=Me[a];if(!t?.stats)return"";const e={attack:"Atak",armor:"Pancerz",hp:"Życie",mana:"Mana",crit:"Kryt",speed:"Szybkość"};return Object.entries(t.stats).map(([i,n])=>`${e[i]??i} ${n>0?"+":""}${n}`).join(" · ")}class V0{constructor(){this.gold=0,this.items=new Map,this.equipped={weapon:null,armor:null,helm:null,trinket:null},this.capacity=24}count(t){return this.items.get(t)??0}has(t,e=1){return this.count(t)>=e}isFull(){return this.items.size>=this.capacity}add(t,e=1){const i=Me[t];if(!i||i.type!=="consumable"&&i.type!=="material"&&this.items.has(t)===!1&&this.isFull())return!1;const n=i.stack??1,s=this.items.get(t)??0,o=Math.min(s+e,Math.max(n,s+e));return this.items.set(t,o),!0}remove(t,e=1){const i=this.count(t);return i<e?!1:(i-e<=0?this.items.delete(t):this.items.set(t,i-e),!0)}equip(t){const e=Me[t];if(!e?.slot||!this.has(t))return!1;const i=e.slot,n=this.equipped[i];return this.remove(t,1),this.equipped[i]=t,n&&this.add(n,1),!0}unequip(t){const e=this.equipped[t];return!e||this.isFull()?!1:(this.equipped[t]=null,this.add(e,1),!0)}isEquipped(t){return Object.values(this.equipped).includes(t)}equipStats(){const t={attack:0,armor:0,hp:0,mana:0,crit:0,speed:0};for(const e of Ol){const i=this.equipped[e.id];if(!i)continue;const n=Me[i]?.stats;if(n)for(const[s,o]of Object.entries(n))t[s]=(t[s]??0)+o}return t}list(){return[...this.items.entries()].map(([t,e])=>({id:t,qty:e,def:Me[t]})).filter(t=>t.def)}consumables(){return this.list().filter(t=>t.def.type==="consumable")}serialize(){return{gold:this.gold,items:[...this.items.entries()],equipped:{...this.equipped}}}load(t){t&&(this.gold=t.gold??0,this.items=new Map(t.items??[]),this.equipped={weapon:null,armor:null,helm:null,trinket:null,...t.equipped??{}})}}const ws=[{id:"dawn",name:"Znak Świtu",glyph:"✧",mana:28,cd:8,level:1,desc:"Fala światła rani wszystkich wrogów w promieniu 5 m i leczy cię za 12 punktów."},{id:"frenzy",name:"Wilczy Zew",glyph:"✶",mana:24,cd:18,level:3,desc:"Na 10 sekund zyskujesz +35% obrażeń i +20% szybkości ruchu."},{id:"blink",name:"Blask Świtu",glyph:"☀",mana:40,cd:26,level:5,desc:"Leczy 45% maksymalnego życia i osłania cię na 4 sekundy."}],W0=[{id:"str",name:"Siła",glyph:"S",desc:"Obrażenia broni i siła ciosów"},{id:"agi",name:"Zręczność",glyph:"Z",desc:"Szansa na trafienie krytyczne i szybkość"},{id:"end",name:"Wytrzymałość",glyph:"W",desc:"Życie, pancerz i kondycja"},{id:"foc",name:"Skupienie",glyph:"M",desc:"Mana i moc zaklęć"}];function j0(a){return Math.round(120+a*85+Math.pow(a,1.55)*26)}class go{constructor(t){this.game=t,this.group=new nt,this.inventory=new V0,this.pos=new C(2,j(2,342),342),this.vel=new C,this.yaw=Math.PI,this.radius=.42,this.level=1,this.xp=0,this.attrs={str:5,agi:5,end:5,foc:5},this.points=0,this.hp=100,this.stamina=100,this.mana=40,this.state="idle",this.stateTime=0,this.combo=0,this.attackHitApplied=!1,this.attackCooldown=0,this.dodgeCooldown=0,this.invuln=0,this.hurtFlash=0,this.hitFlash=0,this.dead=!1,this.cooldowns={dawn:0,frenzy:0,blink:0},this.buffs={attack:0,attackTime:0,speedTime:0,shield:0},this.walkPhase=0,this.sprinting=!1,this.staminaLock=!1,this.regenDelay=0,this.lastGroundY=this.pos.y,this.sinceCombat=99,this.totalKills=0,this._buildModel(),this.recalc(),this.hp=this.maxHP,this.mana=this.maxMana,this.stamina=this.maxStamina,this.syncModel()}_buildModel(){const t=Ca({skin:"#dcb08a",tunic:"#4f6350",pants:"#463f36",boots:"#2b241f",hair:"#4a3020",cloak:"#384f44",bulk:1.04,scar:!0,armor:"#7c8577"});this.model=t.group,this.parts=t.parts,this._buildGear();const e=bs({blade:"#d9e2e8",guard:"#b08a3e",grip:"#3a2a1c"});e.position.set(0,-.72,.06),e.rotation.set(-.35,0,.12),e.scale.setScalar(.9),this.weaponMesh=e,this.parts.arms[1].add(e);const i=b0("#5d5341");i.position.set(0,-.7,.02),i.rotation.y=Math.PI/2,i.scale.setScalar(.86),this.parts.arms[0].add(i),this.group.add(this.model),this.group.position.copy(this.pos),this.group.traverse(s=>{s.isMesh&&(s.castShadow=!0,s.receiveShadow=!0)}),this.lantern=new Ue("#ffcf9a",0,13,2),this.lantern.position.set(0,1.5,.25),this.group.add(this.lantern);const n=new yt(new Xt(.07,6,5),new Ee({color:"#ffd9a0",transparent:!0,opacity:.9}));n.position.set(.2,1,.18),n.castShadow=!1,this.group.add(n),this.shadowBlob=new yt(new as(.62,16),new Ee({color:"#000000",transparent:!0,opacity:.24,depthWrite:!1})),this.shadowBlob.rotation.x=-Math.PI/2,this.shadowBlob.position.y=.04,this.group.add(this.shadowBlob)}_buildGear(){const{body:t,arms:e,legs:i,head:n,torso:s}=this.parts,o=new ke({color:"#8d968c",roughness:.42,metalness:.72}),r=new ke({color:"#5f675f",roughness:.5,metalness:.65}),c=new ke({color:"#4a3524",roughness:.9}),l=new ke({color:"#3a2a52",roughness:.35,metalness:.4,emissive:"#a86bf0",emissiveIntensity:.9}),h=new ke({color:"#33503f",roughness:.95,side:Se}),d=new ke({color:"#28402f",roughness:.98,side:Se});for(const T of e){const E=new yt(new Xt(.16,8,6,0,Math.PI*2,0,Math.PI*.62),o);E.position.set(0,.02,0),E.scale.set(1.15,.85,1.15),E.castShadow=!0,T.add(E);const R=new yt(new kt(.085,.075,.2,7),r);R.position.set(0,-.62,0),R.castShadow=!0,T.add(R)}const u=new yt(new hi(.44,.42,.1),o);u.position.set(0,1.2,.19),u.castShadow=!0,t.add(u);const f=new yt(new di(.075,.017,6,12),l);f.position.set(0,1.22,.25),f.castShadow=!1,t.add(f),this.runeMesh=f;const g=new yt(new hi(.1,.68,.06),c);g.position.set(-.12,1.16,.19),g.rotation.z=.5,t.add(g);for(const T of i){const E=new yt(new kt(.105,.09,.26,7),r);E.position.set(0,-.42,.01),E.castShadow=!0,T.add(E)}const v=new yt(new Xt(.235,9,7,0,Math.PI*2,0,Math.PI*.72),new ke({color:"#3d4a41",roughness:.95}));v.position.set(0,.045,-.01),v.castShadow=!0,n.add(v);const p=new yt(new di(.2,.022,6,14),o);p.rotation.x=Math.PI/2,p.position.set(0,.03,0),n.add(p);const m=new nt;m.position.set(0,1.42,-.17),t.add(m);const x=[];let y=m;for(let T=0;T<4;T++){const E=.5-T*.055,R=new nt;R.position.y=T===0?0:-.24;const U=new yt(new hi(E,.26,.025),T===0?h:d);U.position.y=-.12,U.castShadow=!0,R.add(U),y.add(R),y=R,x.push(R)}this.cape={root:m,segments:x},this.parts.cloak&&(this.parts.cloak.visible=!1);const b=new ke({color:"#dbe4ea",roughness:.22,metalness:.92}),z=new ke({color:"#c99a44",roughness:.35,metalness:.85});this._bladeMaterial=b,this._guardMaterial=z}recalc(){const t=this.inventory.equipStats(),e=this.attrs;this.maxHP=Math.round(64+e.end*9+this.level*7+t.hp),this.maxMana=Math.round(22+e.foc*7+this.level*4+t.mana),this.maxStamina=Math.round(96+e.end*3.2),this.attackPower=5+e.str*1.7+this.level*1.3+t.attack,this.armor=e.end*.55+t.armor,this.critChance=ie(.04+e.agi*.014+t.crit*.01,0,.65),this.moveSpeed=5+e.agi*.045+t.speed,this.spellPower=14+e.foc*2.6+this.level*1.6,this.hp=Math.min(this.hp,this.maxHP),this.mana=Math.min(this.mana,this.maxMana),this.stamina=Math.min(this.stamina,this.maxStamina)}get xpNeeded(){return j0(this.level)}gainXp(t){this.xp+=t;let e=0;for(;this.xp>=this.xpNeeded&&(this.xp-=this.xpNeeded,this.level+=1,this.points+=3,e+=1,!(e>8)););e>0&&(this.recalc(),this.hp=this.maxHP,this.mana=this.maxMana,this.stamina=this.maxStamina,this.game.onLevelUp(this.level)),this.game.ui?.refreshHud()}spendPoint(t){return this.points<=0||!(t in this.attrs)?!1:(this.attrs[t]+=1,this.points-=1,this.recalc(),!0)}canAct(){return!this.dead&&this.state!=="dodge"&&this.state!=="hurt"}attack(){return this.dead||this.attackCooldown>0||this.state==="attack"&&this.stateTime<.34||this.state==="dodge"||this.state==="cast"?!1:(this.state="attack",this.stateTime=0,this.attackHitApplied=!1,this.combo=(this.combo+1)%3,this.attackCooldown=.42,this.stamina=Math.max(0,this.stamina-6),this.sinceCombat=0,this.vel.lengthSq()<.6&&(this.yaw=this.game.cameraRig.yaw+Math.PI),this.game.fx.slash(new C(this.pos.x,this.pos.y+.25,this.pos.z),this.yaw,{color:this.combo===2?"#ffd27a":"#f2e6d0",radius:this.combo===2?2.2:1.9,arc:this.combo===2?Math.PI*1.5:Math.PI*1.05}),this.game.audio?.swing(this.combo),!0)}dodge(){if(this.dead||this.dodgeCooldown>0||this.stamina<20||this.state==="dodge")return!1;this.state="dodge",this.stateTime=0,this.invuln=Math.max(this.invuln,.34),this.dodgeCooldown=.72,this.stamina-=20,this.sinceCombat=0;const t=this.vel.lengthSq()>.4?this.vel.clone().normalize():new C(Math.sin(this.yaw),0,Math.cos(this.yaw));return this.dodgeDir=t,this.game.fx.burst(new C(this.pos.x,this.pos.y+.2,this.pos.z),{color:"#cfc6b0",count:8,speed:2.2,up:.9,life:.45,size:.8}),this.game.audio?.dodge(),!0}castSpell(t){const e=ws[t];if(!e||this.dead)return!1;if(this.level<e.level)return this.game.ui?.log(`Zaklęcie „${e.name}” odblokuje się na poziomie ${e.level}.`,"warn"),!1;if(this.cooldowns[e.id]>0)return!1;if(this.mana<e.mana)return this.game.ui?.log("Za mało many.","warn"),!1;if(this.state==="dodge")return!1;if(this.mana-=e.mana,this.cooldowns[e.id]=e.cd,this.state="cast",this.stateTime=0,this.sinceCombat=0,this.game.audio?.cast(),e.id==="dawn"){const i=this.pos.clone().add(new C(0,1,0));this.game.fx.magicBurst(i,"#ffe3a8"),this.game.damageEnemiesInRadius(this.pos,5.2,this.spellPower*1.15,"Znak Świtu"),this.heal(12),this.game.ui?.flashScreen("#ffdca0",.35)}else e.id==="frenzy"?(this.buffs.attack=.35,this.buffs.attackTime=10,this.buffs.speedTime=10,this.game.fx.magicBurst(this.pos.clone().add(new C(0,1,0)),"#ffb45c"),this.game.ui?.log("Wilczy Zew: +35% obrażeń, +20% szybkości.","gold")):e.id==="blink"&&(this.heal(Math.round(this.maxHP*.45)),this.buffs.shield=4,this.game.fx.heal(this.pos,"#fff0c0"),this.game.fx.magicBurst(this.pos.clone().add(new C(0,1,0)),"#fff3c4"),this.game.ui?.log("Blask Świtu otacza cię tarczą.","good"));return!0}useItem(t){const e=Me[t];if(!e?.use||!this.inventory.has(t))return!1;if(e.use.heal){if(this.hp>=this.maxHP)return!1;this.heal(e.use.heal),this.game.fx.heal(this.pos,"#9fe08a")}if(e.use.mana){if(this.mana>=this.maxMana)return!1;this.mana=Math.min(this.maxMana,this.mana+e.use.mana),this.game.fx.heal(this.pos,"#8fc4ff")}return e.use.buff&&(this.buffs.attack=Math.max(this.buffs.attack,e.use.buff.attack/Math.max(1,this.attackPower)),this.buffs.attackTime=e.use.buff.duration,this.game.fx.magicBurst(this.pos.clone().add(new C(0,1,0)),"#ff9a45")),this.inventory.remove(t,1),this.game.audio?.drink(),this.game.ui?.log(`Użyto: ${e.name}.`,"good"),!0}heal(t){const e=this.hp;this.hp=Math.min(this.maxHP,this.hp+t);const i=Math.round(this.hp-e);i>0&&this.game.ui?.floatNumber(this.pos,`+${i}`,"heal")}takeDamage(t,e="wróg"){if(this.dead)return 0;if(this.invuln>0)return this.game.ui?.floatNumber(this.pos,"unik","mana"),0;const i=t*(100/(100+this.armor*2.4)),n=.92+Math.random()*.16;let s=Math.max(1,Math.round(i*n));return this.buffs.shield>0&&(s=Math.round(s*.45)),this.hp-=s,this.sinceCombat=0,this.regenDelay=4.5,this.hurtFlash=.4,this.invuln=.35,this.state="hurt",this.stateTime=0,this.game.ui?.floatNumber(this.pos.clone().add(new C(0,.7,0)),`-${s}`,"player"),this.game.ui?.flashScreen("#c1443a",.32),this.game.cameraRig.addShake(.42),this.game.audio?.hurt(),this.game.fx.sparks(this.pos.clone().add(new C(0,1.1,0)),"#e05a4a",8),this.hp<=0&&(this.hp=0,this.die()),s}die(){this.dead=!0,this.state="dead",this.stateTime=0,this.game.onPlayerDeath()}respawn(){this.dead=!1,this.state="idle",this.hp=this.maxHP,this.mana=this.maxMana,this.stamina=this.maxStamina,this.pos.set(0,j(0,342)+.1,342),this.vel.set(0,0,0),this.invuln=2.5,this.buffs.attackTime=0,this.buffs.speedTime=0,this.recalc()}update(t,e){this.stateTime+=t,this.attackCooldown=Math.max(0,this.attackCooldown-t),this.dodgeCooldown=Math.max(0,this.dodgeCooldown-t),this.invuln=Math.max(0,this.invuln-t),this.hurtFlash=Math.max(0,this.hurtFlash-t),this.regenDelay=Math.max(0,this.regenDelay-t),this.sinceCombat+=t;for(const m of Object.keys(this.cooldowns))this.cooldowns[m]=Math.max(0,this.cooldowns[m]-t);if(this.buffs.attackTime>0&&(this.buffs.attackTime-=t,this.buffs.attackTime<=0&&(this.buffs.attack=0)),this.buffs.speedTime>0&&(this.buffs.speedTime-=t),this.buffs.shield>0&&(this.buffs.shield-=t),this.dead){this._animateDeath(t);return}const i=e?.axes()??{x:0,y:0},n=i.x!==0||i.y!==0,s=this.game.cameraRig,o=s.forward(),r=s.right(),c=new C(o.x*-i.y+r.x*i.x,0,o.z*-i.y+r.z*i.x);c.lengthSq()>1&&c.normalize();const l=(e?.isDown("ShiftLeft")||e?.isDown("ShiftRight"))&&n&&this.stamina>0;this.stamina<=0&&(this.staminaLock=!0),this.staminaLock&&this.stamina>30&&(this.staminaLock=!1),this.sprinting=l&&!this.staminaLock&&this.state!=="attack"&&this.state!=="dodge",this.sprinting?this.stamina=Math.max(0,this.stamina-13*t):this.sinceCombat>1.6&&(this.stamina=Math.min(this.maxStamina,this.stamina+17*t)),this.regenDelay<=0&&this.sinceCombat>3.5?(this.hp=Math.min(this.maxHP,this.hp+this.maxHP*.012*t),this.mana=Math.min(this.maxMana,this.mana+this.maxMana*.035*t)):this.sinceCombat>3.5&&(this.mana=Math.min(this.maxMana,this.mana+this.maxMana*.02*t));let h=this.moveSpeed*(this.sprinting?1.62:1)*(this.buffs.speedTime>0?1.2:1);if(this.state==="attack"&&(h*=.34),this.state==="cast"&&(h*=.2),this.state==="hurt"&&(h*=.15),this.state==="dodge"){const m=ie(1-this.stateTime/.42,0,1),x=12.5*m*m+2;this.vel.x=this.dodgeDir.x*x,this.vel.z=this.dodgeDir.z*x,this.yaw=bi(this.yaw,Math.atan2(this.dodgeDir.x,this.dodgeDir.z),18,t),this.stateTime>.42&&(this.state="idle")}else if(n){const m=c.x*h,x=c.z*h;if(this.vel.x=Ut(this.vel.x,m,13,t),this.vel.z=Ut(this.vel.z,x,13,t),this.state==="idle"||this.state==="attack"){const y=Math.atan2(c.x,c.z);this.yaw=bi(this.yaw,y,this.state==="attack"?6:12,t)}}else this.vel.x=Ut(this.vel.x,0,16,t),this.vel.z=Ut(this.vel.z,0,16,t);(this.state==="attack"||this.state==="cast"||this.state==="hurt")&&this.vel.multiplyScalar(1-Math.min(1,t*5));const d=this.pos.clone();d.x+=this.vel.x*t,d.z+=this.vel.z*t;const u=Math.hypot(d.x,d.z);if(u>Wt-6){const m=(Wt-6)/u;d.x*=m,d.z*=m,this.vel.multiplyScalar(.4)}const f=j(d.x,d.z);ri(d.x,d.z)&&f<Ie-.9?(this.vel.multiplyScalar(.2),this.waterHint=(this.waterHint??0)-t,this.waterHint<=0&&(this.waterHint=6,this.game.ui?.log("Głęboka woda — dalej nie popłynę.","info"))):(this.pos.x=d.x,this.pos.z=d.z);const v=j(this.pos.x,this.pos.z);this.pos.y=Ut(this.pos.y,v,18,t),this._resolveBuildingCollisions(),this._animate(t,n,h);const p=Math.hypot(this.vel.x,this.vel.z);if(n&&p>1.2&&(this.dustTimer=(this.dustTimer??0)-t,this.dustTimer<=0)){this.dustTimer=this.sprinting?.16:.3;const m=new C(this.pos.x,this.pos.y+.06,this.pos.z);this.game.fx?.burst?.(m,{color:"#c8bba4",count:this.sprinting?5:3,speed:.7,up:.55,size:.55,life:.5,gravity:2.2})}this.state==="attack"&&!this.attackHitApplied&&this.stateTime>.17&&(this.attackHitApplied=!0,this._applyMeleeHit()),this.state==="attack"&&this.stateTime>.52&&(this.state="idle"),this.state==="cast"&&this.stateTime>.42&&(this.state="idle"),this.state==="hurt"&&this.stateTime>.3&&(this.state="idle"),this.syncModel()}_applyMeleeHit(){const t=this.combo===2?3:2.6,e=new C(Math.sin(this.yaw),0,Math.cos(this.yaw)),i=[];for(const s of this.game.enemies?.list??[]){if(s.dead||!s.active)continue;const o=new C(s.pos.x-this.pos.x,0,s.pos.z-this.pos.z),r=o.length();r>t+s.def.radius||(o.normalize(),!(e.dot(o)<(this.combo===2?-.3:.28))&&i.push({e:s,d:r}))}i.sort((s,o)=>s.d-o.d);const n=this.combo===2?3:2;for(let s=0;s<Math.min(n,i.length);s++){const o=i[s].e,r=Math.random()<this.critChance;let c=this.attackPower*(this.combo===2?1.35:s===0?1:.75);c*=1+this.buffs.attack,c*=.9+Math.random()*.2,r&&(c*=1.75),o.takeDamage(c,{crit:r,source:"Gracz",knockback:3.2});const l=new C(o.pos.x,o.pos.y+1.1,o.pos.z);this.game.fx.sparks(l,r?"#ffd27a":"#f2e3c4",r?12:6),this.game.cameraRig.addShake(r?.28:.14),this.game.audio?.hit(r)}i.length>0&&this.game.ui?.refreshHud()}_resolveBuildingCollisions(){const t=this.game.world?.colliders??[];for(const e of t){const i=this.pos.x-e.x,n=this.pos.z-e.z,s=Math.hypot(i,n),o=e.r+this.radius;if(s<o&&s>1e-4){const r=(o-s)/s;this.pos.x+=i*r,this.pos.z+=n*r}}}_animate(t,e,i){const n=Math.hypot(this.vel.x,this.vel.z),s=ie(n/Math.max(3,this.moveSpeed),0,2.2);this.walkPhase+=t*(4.2+s*6.5)*(e?1:.4);const{body:o,arms:r,legs:c,head:l,cloak:h}=this.parts;if(o.position.y=Math.sin(this.walkPhase*.7)*.02,this.state==="attack"){const d=ie(this.stateTime/.52,0,1),u=Math.sin(d*Math.PI),f=this.combo===2?-1:1;r[1].rotation.x=-1.9*u+.4,r[1].rotation.z=-.5*u*f,r[0].rotation.x=.5*u,o.rotation.y=-.5*u*f+(this.combo===1?.35*u:0),c[0].rotation.x=.25*u,c[1].rotation.x=-.2*u,l.rotation.y=.2*u*f}else if(this.state==="dodge"){const d=ie(this.stateTime/.42,0,1);o.rotation.x=-d*Math.PI*2,r[0].rotation.x=-1.2,r[1].rotation.x=-1.2,c[0].rotation.x=.8,c[1].rotation.x=.5,o.position.y=Math.sin(d*Math.PI)*.35}else if(this.state==="cast"){const d=ie(this.stateTime/.42,0,1),u=Math.sin(d*Math.PI)*1.1;r[0].rotation.x=-2.4*u,r[1].rotation.x=-2.4*u,r[0].rotation.z=.5*u,r[1].rotation.z=-.5*u,o.rotation.x=-.12*u}else if(this.state==="hurt"){const d=ie(this.stateTime/.3,0,1);o.rotation.x=.35*Math.sin(d*Math.PI),r[0].rotation.x=-.4,r[1].rotation.x=-.2}else if(e){const d=Math.sin(this.walkPhase)*.9*ie(s,.35,1.7);c[0].rotation.x=d,c[1].rotation.x=-d,r[0].rotation.x=-d*.65,r[1].rotation.x=d*.65,r[0].rotation.z=.08,r[1].rotation.z=-.08,o.rotation.x=.05+s*.05,o.rotation.y=0,o.position.y=Math.abs(Math.sin(this.walkPhase))*.055,l.rotation.y=0}else{const d=Math.sin(this.walkPhase*.55);c[0].rotation.x=Ut(c[0].rotation.x,0,10,t),c[1].rotation.x=Ut(c[1].rotation.x,0,10,t),r[0].rotation.x=Ut(r[0].rotation.x,d*.06,6,t),r[1].rotation.x=Ut(r[1].rotation.x,-d*.05,6,t),r[0].rotation.z=Ut(r[0].rotation.z,.1,6,t),r[1].rotation.z=Ut(r[1].rotation.z,-.1,6,t),o.rotation.x=Ut(o.rotation.x,0,8,t),o.rotation.y=Ut(o.rotation.y,0,8,t),l.rotation.y=Ut(l.rotation.y,0,6,t),o.position.y=Math.sin(this.walkPhase*.9)*.012}if(h){const d=ie(n*.06,0,.4);h.rotation.x=Math.PI+Math.sin(this.walkPhase*.9)*.04-d*.5,h.rotation.z=Math.sin(this.walkPhase*.6)*.03}if(this.cape){const d=Math.hypot(this.vel.x,this.vel.z),u=ie(d*.075,0,.5),f=this.walkPhase*.8,g=this.cape.segments;for(let v=0;v<g.length;v++){const p=1+v*.35;g[v].rotation.x=.16+u*(.55+v*.35)+Math.sin(f+v*.7)*.045*p,g[v].rotation.z=Math.sin(f*.8+v*.5)*.05+ie(this.vel.x*.02,-.12,.12)}this.cape.root.rotation.x=-.05-u*.3}if(this.runeMesh){const d=.65+Math.sin(this.walkPhase*1.2)*.18+(this.state==="cast"?1.2:0);this.runeMesh.material.emissiveIntensity=d,this.runeMesh.rotation.z+=t*.6}l&&(l.rotation.x=Math.sin(this.walkPhase*.5)*.02),this.invuln>0&&this.state!=="dodge"?this.model.visible=Math.floor(this.invuln*18)%2===0:this.model.visible=!0}_animateDeath(t){const{body:e}=this.parts;e.rotation.x=Ut(e.rotation.x,-Math.PI/2,3,t),this.model.position.y=Ut(this.model.position.y,.25,3,t),this.shadowBlob.visible=!1}syncModel(){this.group.position.copy(this.pos),this.group.rotation.y=this.yaw;const t=j(this.pos.x,this.pos.z);this.shadowBlob.position.y=t-this.pos.y+.05,this.shadowBlob.visible=!this.dead}serialize(){return{pos:[this.pos.x,this.pos.z],level:this.level,xp:this.xp,attrs:{...this.attrs},points:this.points,hp:this.hp,mana:this.mana,inventory:this.inventory.serialize()}}load(t){t&&(this.level=t.level??1,this.xp=t.xp??0,this.attrs={...this.attrs,...t.attrs??{}},this.points=t.points??0,this.inventory.load(t.inventory),this.recalc(),this.hp=t.hp??this.maxHP,this.mana=t.mana??this.maxMana,this.stamina=this.maxStamina,t.pos&&this.pos.set(t.pos[0],j(t.pos[0],t.pos[1]),t.pos[1]),this.syncModel())}}class q0{constructor(t){this.game=t,this.group=new nt,this.name="Szara";const e=Nl(11);this.model=e.group,this.parts=e.parts,this.group.add(this.model),this.group.traverse(i=>{i.isMesh&&(i.castShadow=!0,i.receiveShadow=!0)}),this.pos=new C,this.vel=new C,this.yaw=0,this.phase=Math.random()*10,this.state="follow",this.target=null,this.attackCooldown=0,this.barkTimer=6+Math.random()*6,this.sitBlend=0,this.growlPulse=0,this.blob=new yt(new as(.55,14),new Ee({color:"#000000",transparent:!0,opacity:.22,depthWrite:!1})),this.blob.rotation.x=-Math.PI/2,this.group.add(this.blob),this._placeNearPlayer(!0)}_placeNearPlayer(t=!1){const e=this.game.player;if(!e)return;const i=(e.yaw??0)+Math.PI*.65,n=e.pos.x+Math.sin(i)*2.2,s=e.pos.z+Math.cos(i)*2.2;this.pos.set(n,j(n,s),s),t&&this.group.position.copy(this.pos)}update(t){const e=this.game.player;if(!e||e.dead){this._animate(t,!1),this.syncModel();return}const i=this.pos.x-e.pos.x,n=this.pos.z-e.pos.z,s=Math.hypot(i,n);if(s>46){this._placeNearPlayer(!0);return}let o=null,r=1/0;for(const f of this.game.enemies?.list??[]){if(f.dead||!f.active||Math.hypot(f.pos.x-e.pos.x,f.pos.z-e.pos.z)>14)continue;const v=Math.hypot(f.pos.x-this.pos.x,f.pos.z-this.pos.z);v<r&&(r=v,o=f)}this.target=o;let c=0,l=0,h=0;if(o){this.state="hunt";const f=o.pos.x-this.pos.x,g=o.pos.z-this.pos.z,v=Math.hypot(f,g)||1,p=1.15+(o.def?.radius??.5);v>p&&(h=e.moveSpeed*1.25,c=f/v,l=g/v),this.attackCooldown=Math.max(0,this.attackCooldown-t),v<=p+.35&&this.attackCooldown<=0&&this._bite(o)}else if(s>2.9){this.state="follow";const f=e.pos.x-this.pos.x,g=e.pos.z-this.pos.z,v=Math.hypot(f,g)||1,p=ie((s-2.9)/9,.25,1.35);h=e.moveSpeed*(.85+p*.6),c=f/v,l=g/v}else this.state="idle",this.barkTimer-=t,this.barkTimer<=0&&(this.barkTimer=14+Math.random()*16,this.growlPulse=1);if(this.growlPulse=Math.max(0,this.growlPulse-t*1.5),this.vel.x=Ut(this.vel.x,c*h,9,t),this.vel.z=Ut(this.vel.z,l*h,9,t),h>.01){const f=this.pos.x+this.vel.x*t,g=this.pos.z+this.vel.z*t,v=j(f,g);ri(f,g)&&v<Ie-.8?this.vel.multiplyScalar(.2):(this.pos.x=f,this.pos.z=g)}if(s<1.5&&s>.001){const f=(1.5-s)/s;this.pos.x+=i*f,this.pos.z+=n*f}const d=j(this.pos.x,this.pos.z);this.pos.y=Ut(this.pos.y,d,16,t);const u=Math.hypot(this.vel.x,this.vel.z);if(u>.35){const f=Math.atan2(this.vel.x,this.vel.z);this.yaw=bi(this.yaw,f,9,t)}else if(o||s<6){const f=o?o.pos:e.pos,g=Math.atan2(f.x-this.pos.x,f.z-this.pos.z);this.yaw=bi(this.yaw,g,4,t)}this._animate(t,u>.35),this.syncModel()}_bite(t){this.attackCooldown=1.4;const i=5+(this.game.player?.level??1)*1.4+Math.random()*3;try{t.takeDamage(i,{source:"Szara",knockback:1.4})}catch{}const n=new C(t.pos.x,t.pos.y+.7,t.pos.z);this.game.fx?.sparks?.(n,"#cfd4c6",5),this.game.audio?.hit?.(!1),this.growlPulse=1}_animate(t,e){const{body:i,head:n,legs:s,tail:o}=this.parts;if(this.phase+=t*(e?10:2.4),e){const l=Math.sin(this.phase)*.75,h=Math.sin(this.phase+Math.PI)*.75;s[0].pivot.rotation.x=l,s[1].pivot.rotation.x=h,s[2].pivot.rotation.x=h*.9,s[3].pivot.rotation.x=l*.9,i.position.y=Math.abs(Math.sin(this.phase))*.05,i.rotation.x=.04,this.sitBlend=Ut(this.sitBlend,0,8,t)}else{for(const h of s)h.pivot.rotation.x=Ut(h.pivot.rotation.x,0,8,t);i.position.y=Ut(i.position.y,Math.sin(this.phase*.8)*.012,6,t),i.rotation.x=Ut(i.rotation.x,0,6,t);const l=this.state==="idle"?1:0;this.sitBlend=Ut(this.sitBlend,l,2.2,t),this.sitBlend>.02&&(i.rotation.x=-.05*this.sitBlend,i.position.y-=.16*this.sitBlend,s[2].pivot.rotation.x=-1.2*this.sitBlend,s[3].pivot.rotation.x=-1.2*this.sitBlend)}const r=this.state==="hunt"?.25:1.9;o.rotation.z=Math.sin(this.phase*r)*(this.state==="hunt"?.08:.35),o.rotation.x=-.85-(this.state==="hunt"?.25:0)+Math.sin(this.phase*.9)*.05;const c=this.state==="hunt"?.12:0;n.rotation.x=Ut(n.rotation.x,-c-this.growlPulse*.2,6,t)}syncModel(){this.group.position.copy(this.pos),this.group.rotation.y=this.yaw;const t=j(this.pos.x,this.pos.z);this.blob.position.y=t-this.pos.y+.03}}class X0{constructor(t,e,i){this.game=t,this.id=e,this.def=i,this.name=i.name,this.role=i.role,this.radius=i.radius??3.6,this.baseY=j(i.pos[0],i.pos[1]),this.pos=new C(i.pos[0],this.baseY,i.pos[1]),this.yaw=i.rot??0,this.phase=Math.random()*nn,this.visible=!i.hidden;const n=Ca(i.visual);this.model=n.group,this.parts=n.parts,this.model.position.copy(this.pos),this.model.rotation.y=this.yaw,this.model.traverse(s=>{s.isMesh&&(s.castShadow=!0,s.receiveShadow=!0,i.ghost&&s.material&&(s.material=s.material.clone(),s.material.transparent=!0,s.material.opacity=.42,s.material.emissive&&(s.material.emissive=new st("#4f8fa8"),s.material.emissiveIntensity=.5),s.castShadow=!1))}),this.model.visible=this.visible,i.ghost&&(this.light=new Ue("#7fd8e8",2.4,8,2),this.light.position.y=1.4,this.model.add(this.light)),t.scene.add(this.model)}setVisible(t){this.visible=t,this.model.visible=t}update(t,e){if(ne(this.pos.x,this.pos.z,e.pos.x,e.pos.z)<9){const c=Math.atan2(e.pos.x-this.pos.x,e.pos.z-this.pos.z);this.yaw=bi(this.yaw,c,3,t)}this.model.rotation.y=this.yaw,this.phase+=t;const{arms:n,body:s,head:o}=this.parts,r=Math.sin(this.phase*1.4)*.018;s.position.y=r,this.def.ghost?(s.position.y=Math.sin(this.phase*.9)*.14,s.rotation.z=Math.sin(this.phase*.5)*.03,n[0].rotation.z=.35+Math.sin(this.phase*.8)*.12,n[1].rotation.z=-.35-Math.sin(this.phase*.8+1)*.12):(n[0].rotation.z=.06+Math.sin(this.phase*.7)*.04,n[1].rotation.z=-.06-Math.sin(this.phase*.7+.5)*.04,n[0].rotation.x=Math.sin(this.phase*.55)*.08,n[1].rotation.x=-Math.sin(this.phase*.55)*.06),o.rotation.y=Math.sin(this.phase*.4)*.22,o.rotation.x=Math.sin(this.phase*.33)*.05}get interactPos(){return new C(this.pos.x,this.pos.y+1,this.pos.z)}}const Rr={wolf:{name:"Wilk z Doliny",model:"wolf",level:1,hp:40,damage:7,speed:4.9,aggro:20,attackRange:2.1,attackCooldown:1.25,xp:20,gold:[0,2],behavior:"beast",radius:.55,scale:1,loot:[{id:"wolf_pelt",chance:.85},{id:"wolf_meat",chance:.45}]},wolf_alpha:{name:"Wilk Alfa",model:"wolf",elite:!0,level:5,hp:190,damage:16,speed:5.2,aggro:26,attackRange:2.5,attackCooldown:1.1,xp:120,gold:[10,24],behavior:"beast",radius:.7,scale:1.45,loot:[{id:"wolf_pelt",chance:1},{id:"wolf_amulet",chance:.25},{id:"wolf_meat",chance:.6}],bossBanner:"Przywódca stada"},bog_lurker:{name:"Bagniak",model:"lurker",level:4,hp:130,damage:14,speed:2.6,aggro:18,attackRange:2.6,attackCooldown:1.7,xp:70,gold:[4,14],behavior:"melee",radius:.8,scale:1.1,loot:[{id:"herbs",chance:.5},{id:"crystal_mana",chance:.15},{id:"health_potion",chance:.15}]},bandit:{name:"Bandyta z Wilczej Bandy",model:"humanoid",visual:{tunic:"#6a3f2c",pants:"#3a3128",cloak:"#4a2f24",hood:"#3d2a20",skin:"#c99a70",hair:"#2b1d13",bulk:1},level:2,hp:62,damage:9,speed:3.5,aggro:18,attackRange:2.3,attackCooldown:1.4,xp:28,gold:[4,13],behavior:"melee",weapon:"iron",radius:.5,loot:[{id:"bread",chance:.25},{id:"health_potion",chance:.1},{id:"iron_ore",chance:.12}]},bandit_archer:{name:"Łucznik z Wilczej Bandy",model:"humanoid",visual:{tunic:"#4e4230",pants:"#38322a",hood:"#3a3226",skin:"#c99a70",hair:"#2b1d13",bulk:.95},level:3,hp:46,damage:12,speed:3,aggro:24,attackRange:19,preferredRange:12,attackCooldown:2.1,xp:34,gold:[6,16],behavior:"ranged",weapon:"bow",radius:.45,loot:[{id:"herbs",chance:.25},{id:"bread",chance:.2}]},bandit_veteran:{name:"Weteran Wilczej Bandy",model:"humanoid",elite:!0,visual:{tunic:"#503529",pants:"#332c24",cloak:"#5a2f24",skin:"#bd8f68",hair:"#2b1d13",beard:!0,armor:"#6a5f4c",bulk:1.14},level:5,hp:210,damage:19,speed:3.6,aggro:22,attackRange:2.7,attackCooldown:1.2,xp:130,gold:[20,40],behavior:"melee",weapon:"axe",radius:.6,loot:[{id:"iron_axe",chance:.2},{id:"iron_ore",chance:.5},{id:"might_elixir",chance:.2}],bossBanner:"Zastępca Rudego Wilka"},bandit_leader:{name:"Rudy Wilk",model:"humanoid",elite:!0,visual:{tunic:"#5d2e22",pants:"#3a3128",cloak:"#7a2f2f",skin:"#c08858",hair:"#a2542a",beard:!0,scar:!0,bulk:1.16,armor:"#7a6a4a"},level:6,hp:300,damage:17,speed:3.7,aggro:22,attackRange:2.6,attackCooldown:1.2,xp:220,gold:[55,85],behavior:"melee",weapon:"axe",radius:.62,loot:[{id:"wolf_amulet",chance:1},{id:"health_potion",chance:1},{id:"shard_dawn",chance:1}],bossBanner:"Przywódca bandy"},skeleton:{name:"Strażnik Kurhanu",model:"skeleton",level:3,hp:84,damage:13,speed:3,aggro:16,attackRange:2.4,attackCooldown:1.5,xp:48,gold:[6,18],behavior:"melee",radius:.5,loot:[{id:"iron_ore",chance:.35},{id:"ancient_metal",chance:.18},{id:"health_potion",chance:.12}]},mine_guard:{name:"Zapomniany Górnik",model:"skeleton",elite:!0,level:5,hp:190,damage:18,speed:3.2,aggro:17,attackRange:2.6,attackCooldown:1.45,xp:120,gold:[12,26],behavior:"melee",radius:.55,scale:1.12,loot:[{id:"iron_ore",chance:.7},{id:"ancient_metal",chance:.3}]},castle_wraith:{name:"Zjawisko z Warowni",model:"wraith",nightOnly:!0,visual:{tint:"#c08fa8"},level:6,hp:150,damage:15,speed:3.4,aggro:24,attackRange:14,preferredRange:9,attackCooldown:2,xp:140,gold:[10,24],behavior:"ranged",radius:.6,loot:[{id:"crystal_mana",chance:.6},{id:"seer_bone",chance:.1}]},wraith:{name:"Wieszczka z Kurhanu",model:"wraith",elite:!0,nightOnly:!0,level:5,hp:240,damage:15,speed:3.3,aggro:24,attackRange:14,preferredRange:9,attackCooldown:2,xp:180,gold:[35,60],behavior:"ranged",radius:.6,loot:[{id:"shard_dawn",chance:1},{id:"crystal_mana",chance:1},{id:"seer_bone",chance:1}],bossBanner:"Szept Kurhanu"},stone_golem:{name:"Kamienny Strażnik",model:"golem",elite:!0,level:6,hp:340,damage:24,speed:2.4,aggro:20,attackRange:3.4,attackCooldown:2.2,xp:200,gold:[30,60],behavior:"melee",radius:.95,scale:1,loot:[{id:"ancient_metal",chance:.5},{id:"iron_ore",chance:.8},{id:"crystal_mana",chance:.3}],bossBanner:"Strażnik kręgu"},kaldras:{name:"Kaldras, Zwiastun Mroku",model:"kaldras",boss:!0,level:9,hp:1500,damage:28,speed:3.5,aggro:34,attackRange:3.4,attackCooldown:1.6,xp:900,gold:[250,350],behavior:"boss",radius:.9,loot:[{id:"watcher_plate",chance:1},{id:"crystal_mana",chance:1},{id:"ancient_metal",chance:1}],bossBanner:"Zwiastun Mroku"}},$0=[[-78,300,"wolf",1],[-120,250,"wolf",1],[96,270,"wolf",1],[60,440,"wolf",2],[-60,470,"wolf",1],[130,400,"wolf",2],[-150,400,"wolf",2],[40,250,"wolf",2],[-40,210,"wolf",2],[80,190,"bandit",2],[230,300,"wolf",3],[270,220,"bandit",3],[130,300,"bandit_archer",3],[210,330,"wolf",3],[-420,-60,"bandit",3],[-380,-110,"bandit",3],[-460,-140,"bandit",4],[-370,-20,"bandit",3],[-490,-40,"bandit",4],[-430,-160,"bandit_leader",6],[-360,-170,"bandit_archer",4],[-500,-190,"bandit_archer",4],[-440,10,"bandit_veteran",5],[-330,-80,"bandit_veteran",5],[180,60,"wolf",3],[150,-40,"wolf_alpha",5],[320,220,"wolf",4],[-280,120,"wolf",3],[-250,480,"wolf",3],[380,470,"wolf_alpha",5],[-600,60,"wolf",4],[-560,520,"wolf",4],[520,420,"wolf",4],[250,-420,"bandit",4],[-330,280,"bandit",4],[-290,360,"bandit",4],[-380,340,"stone_golem",6],[430,-260,"skeleton",4],[380,-370,"skeleton",4],[480,-380,"skeleton",5],[400,-420,"skeleton",5],[430,-330,"wraith",5],[470,-290,"skeleton",5],[-40,-190,"skeleton",5],[-70,-250,"skeleton",5],[10,-260,"skeleton",6],[-30,-230,"castle_wraith",6],[-60,-180,"castle_wraith",6],[-40,-290,"stone_golem",6],[250,-150,"bandit",5],[230,-110,"bandit_archer",5],[290,-190,"bandit_veteran",6],[210,-170,"bandit",5],[300,-120,"bandit_archer",5],[205,-430,"mine_guard",5],[170,-400,"mine_guard",5],[240,-460,"mine_guard",6],[205,-470,"mine_guard",6],[-200,-430,"bog_lurker",4],[-240,-390,"bog_lurker",4],[-160,-470,"bog_lurker",5],[-250,-460,"bog_lurker",5],[-140,-390,"wraith",5],[-300,-480,"bog_lurker",5],[-500,330,"bog_lurker",4],[-450,380,"wolf",4],[-560,260,"bog_lurker",5],[-560,-200,"wolf",4],[-600,-260,"wolf_alpha",6],[-520,-150,"wolf",4],[470,250,"stone_golem",6],[440,210,"stone_golem",6],[510,300,"wolf",5],[-150,-500,"skeleton",6],[-110,-580,"skeleton",6],[-200,-600,"skeleton",7],[-90,-540,"skeleton",6],[-150,-560,"kaldras",9],[620,60,"wolf_alpha",6],[-660,380,"wolf_alpha",6],[560,-480,"skeleton",7],[-620,-420,"bog_lurker",6]],vo={x:X.village.x,z:X.village.z,r:48};function K0(){const a=Ca({skin:"#8d949e",tunic:"#2e333c",pants:"#23272e",boots:"#1b1e23",hair:"#15171a",cloak:"#37182a",bulk:1.7,armor:"#4a515c",eyeColor:"#ff5b3a"}),t=a.group,e=a.parts,i=new ke({color:"#20232a",roughness:.6,metalness:.5,flatShading:!0});for(const r of[-1,1]){const c=new yt(new Zt(.09,.62,5),i);c.position.set(r*.2,.29,-.03),c.rotation.z=r*.55,c.rotation.x=-.2,c.castShadow=!0,e.head.add(c)}const n=new yt(new di(.235,.035,5,10),i);n.rotation.x=Math.PI/2,n.position.y=.06,e.head.add(n);const s=bs({blade:"#6e7681",guard:"#2b2f36",grip:"#1e2126",glow:"#ff5b3a"});s.scale.setScalar(1.85),s.position.set(0,-.72,.1),s.rotation.set(-.3,0,.1),e.arms[1].add(s);const o=new Ue("#ff5b3a",4.5,9,2);return o.position.y=1.6,t.add(o),t.userData.aura=o,{group:t,parts:e}}function Y0(){const a=new nt,t=new nt;a.add(t);const e=new ke({color:"#3a4a58",roughness:.9,transparent:!0,opacity:.82,emissive:"#284a5c",emissiveIntensity:.4,side:Se,flatShading:!0}),i=new yt(new Zt(.62,1.9,8,1,!0),e);i.position.y=1,i.castShadow=!0,t.add(i);const n=new yt(new kt(.3,.42,.7,7),e);n.position.y=1.65,t.add(n);const s=new yt(new Zt(.36,.62,7),e);s.position.y=2.16,t.add(s);const o=new yt(new Xt(.19,8,6),new ke({color:"#cfe8ef",emissive:"#6ec8e0",emissiveIntensity:.8,roughness:.5}));o.position.set(0,2.05,.08),t.add(o);const r=new Ee({color:"#bfefff"});for(const d of[-1,1]){const u=new yt(new Xt(.035,5,4),r);u.position.set(d*.07,2.07,.24),t.add(u)}const c=[];for(const d of[-1,1]){const u=new nt;u.position.set(d*.42,1.85,0);const f=new yt(new kt(.08,.05,1,5),e);f.position.y=-.4,u.add(f);const g=new yt(new Xt(.09,6,5),new Ee({color:"#bfefff",transparent:!0,opacity:.9}));g.position.y=-.95,u.add(g),t.add(u),c.push(u)}const l=new yt(new Zt(.55,.9,8,1,!0),new ke({color:"#2f3f4c",transparent:!0,opacity:.55,side:Se,emissive:"#1f3d4c",emissiveIntensity:.6}));l.position.y=.35,t.add(l);const h=new Ue("#6ec8e0",3.2,9,2);return h.position.y=1.9,a.add(h),{group:a,parts:{body:t,head:t,arms:c,legs:[],wraith:!0,skirt:l}}}function Z0(a){const t=Rr[a];if(t.model==="wolf"){const n=Nl(11);return{group:n.group,parts:{...n.parts,beast:!0}}}if(t.model==="skeleton"){const n=T0(),s=bs({blade:"#b9b29d",guard:"#6b6250",grip:"#3a332a"});return s.scale.setScalar(.85),s.position.set(0,-.75,.05),s.rotation.x=-.3,n.parts.arms[1].add(s),{group:n.group,parts:n.parts}}if(t.model==="wraith")return Y0();if(t.model==="kaldras")return K0();if(t.model==="golem")return S0();if(t.model==="lurker")return E0();const e=Ca(t.visual),i=t.weapon==="axe"?bs({blade:"#b9c2c9",guard:"#6a5a3a",grip:"#3a2a1c"}):bs({blade:"#c9d2d9",guard:"#8a7440",grip:"#3a2a1c"});if(i.scale.setScalar(t.weapon==="axe"?1.15:1),i.position.set(0,-.74,.05),i.rotation.x=-.3,t.weapon!=="bow"&&e.parts.arms[1].add(i),t.weapon==="bow"){const n=new yt(new di(.45,.03,4,12,Math.PI*1.2),new ke({color:"#6a4a2a",roughness:.9}));n.position.set(0,-.7,.1),n.rotation.set(0,Math.PI/2,Math.PI/2),e.parts.arms[0].add(n)}return e}class Xc{constructor(t,e){this.manager=t,this.game=t.game,this.spawn=e;const i=Rr[e.type];this.type=e.type,this.def=i;const n=Math.max(0,e.level-i.level),s=1+n*.16;this.level=e.level,this.maxHP=Math.round(i.hp*s),this.hp=this.maxHP,this.damage=i.damage*(1+n*.13),this.name=i.name+(n>0?` (poz. ${e.level})`:""),this.elite=!!i.elite,this.boss=!!i.boss,this.pos=new C(e.x,j(e.x,e.z),e.z),this.home=this.pos.clone(),this.vel=new C,this.yaw=Math.random()*nn,this.state="idle",this.stateTime=0,this.attackTimer=0,this.attackWindup=0,this.windupActive=!1,this.dead=!1,this.active=!0,this.deathTime=0,this.aggro=!1,this.wanderTarget=null,this.wanderTimer=Math.random()*3,this.staggerTime=0,this.hitFlash=0,this.phase=1,this.specialTimer=4+Math.random()*3,this.alerted=!1,this.nameplateEl=null;const o=Z0(e.type);this.model=o.group,this.parts=o.parts,this.baseY=0,this.model.position.copy(this.pos),this.model.rotation.y=this.yaw,this.model.traverse(r=>{r.isMesh&&(r.castShadow=!0)}),i.model==="wraith"&&(this.model.scale.setScalar(1.02),this.floatBase=.35),i.boss&&this.model.scale.setScalar(1.32),this.game.scene.add(this.model),(i.boss||i.model==="wraith")&&(this.glow=new Ue(i.boss?"#ff5b3a":"#6ec8e0",2.6,8,2),this.glow.position.y=2,this.model.add(this.glow))}get radius(){return this.def.radius??.5}get isNightOnly(){return!!this.def.nightOnly}takeDamage(t,{crit:e=!1,source:i="Gracz",knockback:n=2,magic:s=!1}={}){if(this.dead)return 0;const o=Math.max(1,Math.round(t));this.hp-=o,this.hitFlash=.16,this.aggro=!0,this.stateTime=0;const r=new C(this.pos.x,this.pos.y+(this.def.model==="wolf"?1.3:2.1),this.pos.z);if(this.game.ui?.floatNumber(r,`${o}${e?"!":""}`,e?"crit":s?"mana":""),this.game.audio?.enemyHit(),n>0){const c=new C(this.pos.x-this.game.player.pos.x,0,this.pos.z-this.game.player.pos.z).normalize();this.pos.x+=c.x*n*.08,this.pos.z+=c.z*n*.08,!this.boss&&!this.elite&&(this.staggerTime=Math.min(.4,n*.05),this.vel.x+=c.x*n*.6,this.vel.z+=c.z*n*.6)}return this.game.combatAlert(this),this.hp<=0&&this.die(),o}die(){if(this.dead)return;this.dead=!0,this.hp=0,this.state="dead",this.deathTime=0,this.aggro=!1,this.game.onEnemyKilled(this);const t=new C(this.pos.x,this.pos.y+1,this.pos.z);this.game.fx.burst(t,{color:this.def.model==="skeleton"?"#d8cfb6":this.def.model==="wraith"?"#8fe0ff":"#c1443a",count:this.boss?40:16,speed:this.boss?8:4,up:3,life:.9,size:this.boss?1.4:1}),this.boss?this.game.cameraRig.addShake(1):this.game.cameraRig.addShake(.14)}respawn(){this.hp=this.maxHP,this.dead=!1,this.active=!0,this.state="idle",this.aggro=!1,this.deathTime=0,this.phase=1,this.pos.copy(this.home),this.model.position.copy(this.pos),this.model.visible=!0,this.model.rotation.set(0,this.yaw,0),this.model.scale.setScalar(this.def.boss?1.32:this.def.model==="wraith"?1.02:1),this.model.traverse(t=>{t.isMesh&&t.material&&(t.material.transparent=t.material.transparent||!1)})}_canSeePlayer(){const t=this.game.player;return!t||t.dead?!1:ne(this.pos.x,this.pos.z,t.pos.x,t.pos.z)<this.def.aggro}_playerInVillage(){const t=this.game.player;return ne(t.pos.x,t.pos.z,vo.x,vo.z)<vo.r}update(t){if(!this.active)return;if(this.stateTime+=t,this.dead){this.deathTime+=t,this.model.rotation.x=Ut(this.model.rotation.x,-Math.PI/2.1,4,t),this.model.position.y=Ut(this.model.position.y,j(this.pos.x,this.pos.z)+.1,5,t),this.def.model==="wraith"&&(this.model.position.y+=t*.6,this.model.traverse(h=>{h.isMesh&&h.material?.transparent&&(h.material.opacity=Math.max(0,.8-this.deathTime))})),this.deathTime>1.6&&(this.active=!1,this.model.visible=!1);return}this.attackTimer=Math.max(0,this.attackTimer-t),this.staggerTime=Math.max(0,this.staggerTime-t),this.hitFlash=Math.max(0,this.hitFlash-t);const e=this.game.player,i=ne(this.pos.x,this.pos.z,e.pos.x,e.pos.z),n=this.game.dayNight.isNight;if(this.isNightOnly&&!n){this.hp=0,this.dead=!0,this.active=!1,this.model.visible=!1,this.game.onNightCreatureFade(this);return}this.isNightOnly&&!this.active&&n&&(this.active=!0,this.model.visible=!0,this.hp=this.maxHP,this.dead=!1,this.pos.copy(this.home));const s=this.boss?34:30,o=ne(this.pos.x,this.pos.z,this.home.x,this.home.z);this.aggro||this._canSeePlayer()&&!e.dead&&(this._playerInVillage()&&this.type!=="wolf"||(this.aggro=!0,this.state="chase",this.game.onEnemyAggro(this))),this.aggro&&(o>s||e.dead||this._playerInVillage()&&this.type!=="wolf"&&this.boss===!1)&&(this.aggro=!1,this.state="return"),this.boss?this._updateBoss(t,i):this.aggro?this._chase(t,i):this._idle(t),this.pos.x+=this.vel.x*t,this.pos.z+=this.vel.z*t,this.vel.x=Ut(this.vel.x,0,this.state==="chase"?3.2:6,t),this.vel.z=Ut(this.vel.z,0,this.state==="chase"?3.2:6,t);const r=this.manager.list;for(const h of r){if(h===this||h.dead||!h.active)continue;const d=this.pos.x-h.pos.x,u=this.pos.z-h.pos.z,f=Math.hypot(d,u),g=this.radius+h.radius+.15;if(f>.001&&f<g){const v=(g-f)/f*.5;this.pos.x+=d*v,this.pos.z+=u*v}}const l=j(this.pos.x,this.pos.z)+(this.def.model==="wraith"?.55+Math.sin(this.stateTime*1.7)*.12:0);this.pos.y=Ut(this.pos.y,l,12,t),this.model.position.copy(this.pos),this.model.rotation.y=this.yaw,this.boss||(this.model.rotation.x=Ut(this.model.rotation.x,0,5,t)),this._animate(t,i)}_idle(t){if(this.wanderTimer-=t,this.wanderTimer<=0){this.wanderTimer=3+Math.random()*5;const e=Math.random()*nn,i=Math.random()*6;this.wanderTarget=new C(this.home.x+Math.cos(e)*i,0,this.home.z+Math.sin(e)*i)}if(this.wanderTarget){const e=this.wanderTarget.x-this.pos.x,i=this.wanderTarget.z-this.pos.z,n=Math.hypot(e,i);if(n>.6){const s=this.def.speed*.28;this.vel.x=e/n*s,this.vel.z=i/n*s,this.yaw=bi(this.yaw,Math.atan2(e,i),5,t)}else this.wanderTarget=null}this.state="idle"}_chase(t,e){const i=this.game.player,n=i.pos.x-this.pos.x,s=i.pos.z-this.pos.z,o=Math.max(.001,Math.hypot(n,s));this.state="chase";const r=this.def.behavior==="ranged",c=r?this.def.preferredRange??9:this.def.attackRange*.82;if(this.staggerTime<=0)if(o>c){const l=this.def.speed*(this.state==="attack"?.5:1);this.vel.x=n/o*l,this.vel.z=s/o*l,this.yaw=bi(this.yaw,Math.atan2(n,s),8,t)}else r&&o<c*.62?(this.vel.x=-n/o*this.def.speed*.6,this.vel.z=-s/o*this.def.speed*.6,this.yaw=bi(this.yaw,Math.atan2(n,s),8,t)):this.yaw=bi(this.yaw,Math.atan2(n,s),10,t);this.def.model==="wolf"&&this.specialTimer>0&&(this.specialTimer-=t),this.def.model==="wolf"&&this.specialTimer<=0&&o>3.5&&o<10&&this.staggerTime<=0&&(this.specialTimer=5.5,this.vel.x=n/o*this.def.speed*1.9,this.vel.z=s/o*this.def.speed*1.9,this.game.audio?.growl()),this.attackTimer<=0&&o<=this.def.attackRange&&this.staggerTime<=0&&(this.attackTimer=this.def.attackCooldown,this.attackWindup=.32,this.windupActive=!0,this.state="attack",this.stateTime=0,this.pendingRanged=r),this.windupActive&&(this.attackWindup-=t,this.attackWindup<=0&&(this.windupActive=!1,this._executeAttack()))}_executeAttack(){const t=this.game.player,e=ne(this.pos.x,this.pos.z,t.pos.x,t.pos.z);if(this.pendingRanged){const i=new C(this.pos.x,this.pos.y+1.5,this.pos.z),n=new C(t.pos.x-i.x,t.pos.y+1-i.y,t.pos.z-i.z).normalize();this.def.model==="wraith"?(this.game.fx.orb(i,n,"#a88fe8",13),this.game.audio?.cast()):(this.game.fx.arrow(i,n,30,"enemy"),this.game.audio?.bow()),this.manager.projectilesFromEnemy(this,i,n,this.damage);return}if(e<=this.def.attackRange+.7){const i=Math.random()<.1,n=this.damage*(i?1.5:1);t.takeDamage(n,this.name),this.game.audio?.enemySwing()}}_updateBoss(t,e){const i=this.game.player,n=i.pos.x-this.pos.x,s=i.pos.z-this.pos.z,o=Math.max(.001,Math.hypot(n,s));if(this.phase===1&&this.hp<this.maxHP*.5){this.phase=2,this.game.ui?.log("„Kaldras: Dość tego teatru.”","bad"),this.game.ui?.toast("Kaldras się przemienia","Faza druga — uważaj na ciosy obszarowe"),this.game.cameraRig.addShake(.8),this.game.fx.magicBurst(this.pos.clone().add(new C(0,1.4,0)),"#ff5b3a");for(let r=0;r<2;r++){const c=Math.random()*nn;this.manager.summon("skeleton",this.pos.x+Math.cos(c)*3.5,this.pos.z+Math.sin(c)*3.5,4)}this.damage*=1.12,this.def={...this.def,speed:this.def.speed*1.1}}this.specialTimer-=t,this.state=this.state==="attack"?this.state:"chase",this.specialTimer<=0&&this.staggerTime<=0&&(this.specialTimer=this.phase===2?4.5:6.5,this.attackTimer=1,this.windupActive=!0,this.attackWindup=.85,this.pendingRanged=!1,this.pendingSlam=!0,this.game.ui?.log("Kaldras wznosi miecz — uciekaj!","warn"),this.game.audio?.growl()),this.windupActive?(this.attackWindup-=t,this.attackWindup<=0&&(this.windupActive=!1,this.pendingSlam&&(this.pendingSlam=!1,this.game.fx.shockwave(this.pos,{color:"#ff7a4a",speed:16,life:.6}),this.game.cameraRig.addShake(.9),this.game.audio?.slam(),e<6.5?(i.takeDamage(this.damage*1.5,"Kaldras"),this.game.ui?.log("Cios Kaldrasa trafił!","bad")):(this.game.ui?.log("Uskoczyłeś przed ciosem Kaldrasa.","good"),i.gainXp?.(0))))):o>3.4&&this.staggerTime<=0&&(this.vel.x=n/o*this.def.speed,this.vel.z=s/o*this.def.speed,this.yaw=bi(this.yaw,Math.atan2(n,s),7,t)),!this.windupActive&&this.attackTimer<=0&&o<=this.def.attackRange+1.2&&this.staggerTime<=0&&(this.attackTimer=this.def.attackCooldown*(this.phase===2?.8:1),this.attackWindup=.36,this.windupActive=!0,this.pendingRanged=!1)}_animate(t){const{arms:e=[],legs:i=[],body:n,head:s}=this.parts,o=Math.hypot(this.vel.x,this.vel.z)>.4,r=ie(Math.hypot(this.vel.x,this.vel.z)/Math.max(1,this.def.speed),0,1.6);if(this.walkPhase=(this.walkPhase??0)+t*(3.5+r*7),this.def.model==="wolf"){const l=Math.sin(this.walkPhase*1.4)*.7*r;if(i.forEach((h,d)=>{h.pivot.rotation.x=d%2===0?l:-l}),n.position.y=Math.abs(Math.sin(this.walkPhase*1.4))*.06,this.state==="attack"){const h=ie(this.stateTime/.4,0,1);n.rotation.x=-.4*Math.sin(h*Math.PI)}else n.rotation.x=Ut(n.rotation.x,0,6,t);this.parts.head&&(this.parts.head.rotation.x=Math.sin(this.walkPhase*.5)*.08);return}if(this.def.model==="wraith"){if(n.position.y=Math.sin(this.stateTime*1.4)*.12,e.forEach((l,h)=>{l.rotation.x=-.5+Math.sin(this.stateTime*1.7+h)*.18,l.rotation.z=(h===0?1:-1)*(.25+Math.sin(this.stateTime*1.1)*.1)}),this.state==="attack"){const l=ie(this.stateTime/.5,0,1);n.rotation.y=Math.sin(l*Math.PI)*.3,e[0].rotation.x=-2*Math.sin(l*Math.PI)}return}const c=Math.sin(this.walkPhase)*.8*r;if(i[0]&&i[1]&&(i[0].rotation.x=o?c:Ut(i[0].rotation.x,0,8,t),i[1].rotation.x=o?-c:Ut(i[1].rotation.x,0,8,t)),o&&(e[0].rotation.x=-c*.5,e[1].rotation.x=c*.5,n.position.y=Math.abs(Math.sin(this.walkPhase))*.04),this.state==="attack"||this.windupActive){const l=this.pendingSlam?.85:.32,h=ie(1-Math.max(0,this.attackWindup)/l,0,1),d=Math.sin(h*Math.PI*.9);e[1].rotation.x=-2.5*d,e[1].rotation.z=-.4*d,this.pendingSlam&&(n.rotation.x=-.2*d,e[0].rotation.x=-1.6*d),s.rotation.x=-.2*d}else e[1].rotation.x=Ut(e[1].rotation.x,o?c*.5:0,8,t),e[1].rotation.z=Ut(e[1].rotation.z,0,8,t),e[0].rotation.x=Ut(e[0].rotation.x,o?-c*.5:0,8,t),n.rotation.x=Ut(n.rotation.x,0,8,t),s.rotation.x=Ut(s.rotation.x,0,8,t);this.hitFlash>0?this.model.traverse(l=>{l.isMesh&&l.material&&l.material.emissive&&!l.userData.flashSet&&(l.userData.baseEmissive=l.material.emissive.clone(),l.userData.flashSet=!0),l.isMesh&&l.material?.emissive&&l.material.emissive.setHex(6693410)}):this.model.traverse(l=>{l.isMesh&&l.material?.emissive&&l.userData.flashSet&&(l.material.emissive.copy(l.userData.baseEmissive??new st(0)),l.userData.flashSet=!1)})}}class J0{constructor(t){this.game=t,this.list=[],this.spawnPoints=[],this.respawnQueue=[],this.projectiles=[],this.timeOfDaySeen=null,this._buildSpawns()}_buildSpawns(){for(const[t,e,i,n]of $0){const s=Rr[i],o={x:t,z:e,type:i,level:n,home:{x:t,z:e}};this.spawnPoints.push(o);const r=new Xc(this,o);s.nightOnly&&(r.active=!1,r.model.visible=!1),s.boss&&(r.active=!1,r.model.visible=!1,r.dormant=!0),r.respawnTimer=0,this.list.push(r)}}get alive(){return this.list.filter(t=>t.active&&!t.dead)}update(t){const e=this.game.dayNight.isNight,i=this.list.some(s=>s.def.boss&&!s.dead),n=this.game.player?.pos;if(n)for(const s of this.list){if(!s.dormant||!s.def.boss||s.dead)continue;const o=this.game.quests?.active==="boss"||this.game.quests?.questDone?.("forge"),r=ne(s.pos.x,s.pos.z,n.x,n.z)<130;o&&r&&(s.dormant=!1,s.active=!0,s.model.visible=!0,this.game.ui?.log("Mgła gęstnieje — Kaldras się przebudził.","bad"),this.game.ui?.showLocation("Mgliste Wrota","Zwiastun Mroku czuwa"),this.game.audio?.boss?.())}for(const s of this.list){if(s.summoned&&!i){this.game.scene.remove(s.model),s.active=!1,s.dead=!0,s.summoned=!1;continue}if(n&&s.active){const o=s.boss?420:s.aggro?190:150;if(ne(s.pos.x,s.pos.z,n.x,n.z)>o){s.model.visible&&(s.model.visible=!1),s._asleep=!0;continue}s._asleep&&(s._asleep=!1,s.dead||(s.model.visible=!0))}s.update(t)}for(let s=this.projectiles.length-1;s>=0;s--){const o=this.projectiles[s];if(o.life-=t,o.timer-=t,o.pos.addScaledVector(o.dir,o.speed*t),o.life<=0){this.projectiles.splice(s,1);continue}if(o.pos.y<j(o.pos.x,o.pos.z)+.15){this.game.fx.burst(o.pos,{color:o.color??"#c9c2b0",count:4,speed:1.4,up:1,life:.35}),this.projectiles.splice(s,1);continue}const r=this.game.player;!r.dead&&ne(o.pos.x,o.pos.z,r.pos.x,r.pos.z)<.9&&Math.abs(o.pos.y-(r.pos.y+.9))<1.4&&(r.takeDamage(o.damage,o.source),this.game.fx.burst(o.pos,{color:o.color??"#c1443a",count:6,speed:2,up:1,life:.4}),this.game.audio?.hit(!1),this.projectiles.splice(s,1))}if(e&&this.timeOfDaySeen!=="night"){this.timeOfDaySeen="night";for(const s of this.list)s.isNightOnly&&(s.respawn(),s.active=!0,s.model.visible=!0,s.hp=s.maxHP,s.pos.copy(s.home),s.aggro=!1)}else if(!e&&this.timeOfDaySeen!=="day"){this.timeOfDaySeen="day";for(const s of this.list)s.isNightOnly&&(s.active=!1,s.model.visible=!1,s.aggro=!1)}for(const s of this.list)s.def.boss||s.isNightOnly||!s.dead&&s.active||s.dead&&s.active||(s.respawnTimer===void 0&&(s.respawnTimer=0),s.deathTime>0&&(s.respawnTimer+=t,s.respawnTimer>75&&(s.respawnTimer=0,s.respawn(),s.def.model==="wraith"&&(s.active=!1))))}_spawnAllowed(){return!0}projectilesFromEnemy(t,e,i,n){this.projectiles.push({pos:e.clone(),dir:i.clone(),speed:t.def.model==="wraith"?13:30,damage:n,source:t.name,life:3,timer:0,color:t.def.model==="wraith"?"#a88fe8":"#d8c2a0"})}summon(t,e,i,n){const s={x:e,z:i,type:t,level:n},o=new Xc(this,s);return o.aggro=!0,o.summoned=!0,this.list.push(o),this.game.fx.magicBurst(new C(e,j(e,i)+.8,i),"#8fe0ff"),o}reset(){for(const t of this.list)t.summoned&&(this.game.scene.remove(t.model),t.active=!1);this.list=this.list.filter(t=>!t.summoned);for(const t of this.list){if(t.def.boss){t.active=!1,t.dormant=!0,t.model.visible=!1,t.hp=t.maxHP,t.dead=!1;continue}t.respawn(),t.isNightOnly&&(t.active=!1,t.model.visible=!1)}this.projectiles.length=0}}const ca=new Xt(.075,4,3),$c=new hi(.07,.07,.22),_o=new Map;function Vn(a,t=1){const e=a+t;return _o.has(e)||_o.set(e,new Ee({color:a,transparent:t<1,opacity:t})),_o.get(e)}class Q0{constructor(t){this.scene=t,this.particles=[],this.rings=[],this.projectiles=[],this.decals=[],this.pool=[],this.time=0}_getMesh(t,e,i=1){return new yt(t,Vn(e,i))}burst(t,{color:e="#ffcf7a",count:i=10,speed:n=3.2,up:s=2.2,size:o=1,life:r=.6,gravity:c=9,spread:l=1}={}){for(let h=0;h<i;h++){const d=this._getMesh(ca,e);d.position.copy(t),d.scale.setScalar(o*(.6+Math.random()*.8)),d.castShadow=!1,this.scene.add(d);const u=Math.random()*Math.PI*2,f=Math.random()*n;this.particles.push({mesh:d,vx:Math.cos(u)*f*l,vy:s*(.4+Math.random()),vz:Math.sin(u)*f*l,life:r,maxLife:r,gravity:c,spin:Math.random()*6})}}slash(t,e,{color:i="#ffe3ae",radius:n=1.9,life:s=.22,arc:o=Math.PI*1.1}={}){const r=new di(n,.07,4,14,o),c=this._getMesh(r,i,.95);c.material=c.material.clone(),c.position.copy(t),c.position.y+=1,c.rotation.x=Math.PI/2,c.rotation.z=-e-o*.35,c.castShadow=!1,this.scene.add(c),this.rings.push({mesh:c,life:s,maxLife:s,grow:1.9,spin:7,fade:!0})}shockwave(t,{color:e="#ffd28a",radius:i=1,speed:n=14,life:s=.55,y:o=.1}={}){const r=new Ar(.6,.9,24),c=this._getMesh(r,e,.9);c.material=c.material.clone(),c.position.set(t.x,t.y+o,t.z),c.rotation.x=-Math.PI/2,c.castShadow=!1,this.scene.add(c),this.rings.push({mesh:c,life:s,maxLife:s,grow:n/2.4,fade:!0,expand:n}),this.burst(t,{color:e,count:14,speed:5,up:1.6,life:.5,size:1.1})}sparks(t,e="#ffd27a",i=6){for(let n=0;n<i;n++){const s=this._getMesh($c,e);s.position.copy(t),s.castShadow=!1,this.scene.add(s),this.particles.push({mesh:s,vx:(Math.random()-.5)*6,vy:Math.random()*4+1,vz:(Math.random()-.5)*6,life:.4,maxLife:.4,gravity:14,spin:14,spark:!0})}}heal(t,e="#9fe08a"){for(let i=0;i<16;i++){const n=this._getMesh(ca,e),s=i/16*Math.PI*2;n.position.set(t.x+Math.cos(s)*.7,t.y+.2,t.z+Math.sin(s)*.7),n.castShadow=!1,this.scene.add(n),this.particles.push({mesh:n,vx:Math.cos(s)*.5,vy:2.4,vz:Math.sin(s)*.5,life:1.1,maxLife:1.1,gravity:-.8,spin:3})}}magicBurst(t,e="#8fe0ff"){this.shockwave(t,{color:e,radius:2,speed:18,life:.6,y:.5});for(let i=0;i<3;i++){const n=new di(.8+i*.35,.05,4,18),s=this._getMesh(n,e,.9);s.material=s.material.clone(),s.position.set(t.x,t.y+1+i*.25,t.z),s.castShadow=!1,this.scene.add(s),this.rings.push({mesh:s,life:.45+i*.12,maxLife:.45+i*.12,grow:4.2,fade:!0,spin:i%2?6:-6})}}arrow(t,e,i=26,n="enemy"){const s=new nt,o=new yt(new kt(.022,.022,.75,4),Vn("#8a6b45"));o.rotation.x=Math.PI/2,s.add(o);const r=new yt(new Zt(.06,.18,4),Vn("#b9c2c9"));r.rotation.x=Math.PI/2,r.position.z=.45,s.add(r);const c=new yt(new Zt(.1,.22,4),Vn("#c9c2b0"));c.rotation.x=-Math.PI/2,c.position.z=-.36,s.add(c),s.position.copy(t),s.lookAt(t.clone().add(e)),this.scene.add(s),this.projectiles.push({mesh:s,dir:e.clone().normalize(),speed:i,life:2.4,owner:n,trail:0,gravity:1.4,isArrow:!0})}orb(t,e,i="#b98fe8",n=12){const s=new nt,o=new yt(new os(.24,1),Vn(i,.95));s.add(o);const r=new yt(new Xt(.44,8,6),Vn(i,.28));s.add(r);const c=new Ue(i,2.6,6,2);s.add(c),s.position.copy(t),this.scene.add(s),this.projectiles.push({mesh:s,dir:e.clone().normalize(),speed:n,life:3.2,owner:"enemy",isOrb:!0,color:i,trail:0,gravity:0})}update(t){this.time+=t;for(let e=this.particles.length-1;e>=0;e--){const i=this.particles[e];if(i.life-=t,i.life<=0){this.scene.remove(i.mesh),i.mesh.geometry!==ca&&i.mesh.geometry!==$c&&i.mesh.geometry.dispose(),this.particles.splice(e,1);continue}i.vy-=i.gravity*t,i.mesh.position.x+=i.vx*t,i.mesh.position.y+=i.vy*t,i.mesh.position.z+=i.vz*t,i.mesh.rotation.x+=i.spin*t,i.mesh.rotation.y+=i.spin*t*.7;const n=i.life/i.maxLife;i.mesh.scale.multiplyScalar(.97),i.mesh.visible=n>.05}for(let e=this.rings.length-1;e>=0;e--){const i=this.rings[e];i.life-=t;const n=ie(i.life/i.maxLife,0,1);if(i.life<=0){this.scene.remove(i.mesh),i.mesh.geometry.dispose(),this.rings.splice(e,1);continue}i.mesh.scale.multiplyScalar(1+i.grow*t),i.spin&&(i.mesh.rotation.z+=i.spin*t),i.fade&&(i.mesh.material.transparent=!0,i.mesh.material.opacity=n*.9)}for(let e=this.projectiles.length-1;e>=0;e--){const i=this.projectiles[e];if(i.life-=t,i.life<=0){this.scene.remove(i.mesh),this.projectiles.splice(e,1);continue}i.dir.y-=i.gravity*t*.4,i.mesh.position.addScaledVector(i.dir,i.speed*t),i.mesh.lookAt(i.mesh.position.clone().add(i.dir)),i.isOrb&&(i.mesh.children[0].rotation.x+=t*8,i.trail-=t,i.trail<=0&&(i.trail=.05,this.particles.push({mesh:(()=>{const n=this._getMesh(ca,i.color,.8);return n.position.copy(i.mesh.position),this.scene.add(n),n})(),vx:(Math.random()-.5)*.8,vy:(Math.random()-.5)*.8,vz:(Math.random()-.5)*.8,life:.4,maxLife:.4,gravity:0,spin:4})))}}clear(){for(const t of this.particles)this.scene.remove(t.mesh);for(const t of this.rings)this.scene.remove(t.mesh);for(const t of this.projectiles)this.scene.remove(t.mesh);this.particles.length=0,this.rings.length=0,this.projectiles.length=0}}class tg{constructor(t){this.camera=t,this.yaw=Math.PI,this.pitch=.24,this.distance=5.4,this.targetDistance=5.4,this.pivot=new C,this.shake=0,this.shakeTime=0,this.lookTarget=new C,this.offset=new C,this.initialized=!1,this.fov=62,this.closeness=1,this.currentDistance=5.4}look(t,e,i=.0022){this.yaw-=t*i,this.pitch=ie(this.pitch+e*i,-.42,1.02)}addShake(t){this.shake=Math.min(1.4,this.shake+t)}update(t,e,i=0,n=0){return this._update(t,e,i,n)}_update(t,e,i=0,n=0){this.targetDistance=Fi(this.targetDistance,5.1+Math.min(2.4,i*.14)+n,1-Math.exp(-3*t)),this.distance=Ut(this.distance,this.targetDistance,5.5,t);const s=new C(e.x,e.y+1.55,e.z);this.initialized||(this.pivot.copy(s),this.initialized=!0),this.pivot.x=Ut(this.pivot.x,s.x,14,t),this.pivot.y=Ut(this.pivot.y,s.y,9,t),this.pivot.z=Ut(this.pivot.z,s.z,14,t);const o=Math.cos(this.pitch),r=new C(this.pivot.x+Math.sin(this.yaw)*o*this.distance,this.pivot.y+Math.sin(this.pitch)*this.distance+.35,this.pivot.z+Math.cos(this.yaw)*o*this.distance),c=j(r.x,r.z)+.7;if(r.y<c&&(r.y=c),this.colliders&&this.colliders.length){const u=r.clone().sub(this.pivot),f=7;let g=1;for(let v=1;v<=f;v++){const p=v/f,m=this.pivot.x+u.x*p,x=this.pivot.z+u.z*p;let b=j(m,x)+.5>this.pivot.y+u.y*p+.1;if(!b)for(const z of this.colliders){if(z.r<1.6)continue;const T=m-z.x,E=x-z.z;if(T*T+E*E<z.r*z.r*.9){b=!0;break}}if(b){g=Math.max(.34,(v-1)/f);break}}if(g<1){this.closeness=g,r.copy(this.pivot).add(u.multiplyScalar(g));const v=j(r.x,r.z)+.6;r.y<v&&(r.y=v)}else this.closeness=1}const l=r.clone().sub(this.pivot);let h=0;for(let u=1;u<=8;u++){const f=u/8,g=this.pivot.x+l.x*f,v=this.pivot.z+l.z*f,p=j(g,v)+.9-(this.pivot.y+l.y*f);p>0&&(h=Math.max(h,p/Math.max(.25,f)))}const d=Math.min(h,14);if(this.lift=Ut(this.lift??0,d,d>(this.lift??0)?7:3.5,t),r.y+=this.lift,this.camera.position.copy(r),this.currentDistance=this.camera.position.distanceTo(this.pivot),this.shake>.001){this.shakeTime+=t;const u=this.shake;this.camera.position.x+=Math.sin(this.shakeTime*46)*u*.16,this.camera.position.y+=Math.cos(this.shakeTime*39)*u*.13,this.camera.position.z+=Math.sin(this.shakeTime*53)*u*.16,this.shake=Math.max(0,this.shake-t*2.6)}this.lookTarget.set(this.pivot.x-Math.sin(this.yaw)*1.2,this.pivot.y+Math.sin(-this.pitch)*.4,this.pivot.z-Math.cos(this.yaw)*1.2),this.camera.lookAt(this.lookTarget),this.camera.rotation.z+=Math.sin(this.shakeTime*21)*this.shake*.05,this.camera.fov!==this.fov&&(this.camera.fov=Ut(this.camera.fov,this.fov,4,t),this.camera.updateProjectionMatrix())}forward(){return new C(-Math.sin(this.yaw),0,-Math.cos(this.yaw))}right(){return new C(Math.cos(this.yaw),0,-Math.sin(this.yaw))}}const _i={wolves:{name:"Wilki u bram",giver:"eryn",level:1,intro:"Stary Eryn rozgrzebuje ogień kijem. „Trzy noce z rzędu wilki podchodzą pod płoty. Zabito dwie owce, a pastuch twierdzi, że wśród nich biegł jeden… większy. Zajmij się nimi, zanim stado wejdzie do wioski.”",objectives:[{id:"kill",type:"kill",enemy:"wolf",target:5,text:"Zabij wilki wokół Wilczej Doliny (0/5)"},{id:"return",type:"talk",npc:"eryn",text:"Wróć do Starego Eryna"}],reward:{gold:90,xp:160,items:[["health_potion",2],["bread",1]]},outro:"Eryn kiwa głową. „Pięć? To więcej, niż myślałem. Bierz monety, zasłużyłeś.”",next:"grain"},grain:{name:"Zrabowane zboże",giver:"eryn",level:2,intro:"„Banda Rudego Wilka zabrała nam zapas zboża na zimę. Obozowisko leży na północny zachód, za rozdrożem. Przynieś worek, a jeśli Rudy stanie ci na drodze… cóż, nikt w wiosce nie będzie płakać.”",objectives:[{id:"grain",type:"collect",item:"stolen_grain",target:1,text:"Odzyskaj worek zboża z obozu bandytów"},{id:"leader",type:"kill",enemy:"bandit_leader",target:1,text:"Pokonaj Rudego Wilka"},{id:"return",type:"talk",npc:"eryn",text:"Wróć do Starego Eryna"}],reward:{gold:140,xp:260,items:[["iron_ore",3],["health_potion",2]]},outro:"Eryn przez chwilę milczy. „Rudy Wilk nie żyje. To znaczy, że w dolinie zrobi się spokojniej… albo ktoś inny zajmie jego miejsce.” Wskazuje na północ. „Kurhan Szeptu, na północnym wschodzie. Słyszałeś kiedyś, jak ziemia mówi?”",next:"barrow"},barrow:{name:"Szept Kurhanu",giver:"eryn",level:3,intro:"„W kurhanie na północnym wschodzie pochowano kiedyś wieszczkę. Nocami jej głos niesie się po dolinie i woła imiona tych, którzy umrą. Idź tam po zmroku i ucisz ją. Mówią, że strzeże okruchu ostrza — tego, o którym mówił twój ojciec.”",objectives:[{id:"wraith",type:"kill",enemy:"wraith",target:1,text:"Pokonaj Wieszczkę z Kurhanu (tylko nocą)"},{id:"shard",type:"collect",item:"shard_dawn",target:1,text:"Zdobądź Okruch Ostrza Świtu"},{id:"return",type:"talk",npc:"eryn",text:"Wróć do Starego Eryna"}],reward:{gold:180,xp:340,items:[["crystal_mana",2],["mana_potion",2]]},outro:"Eryn patrzy na okruch w twojej dłoni i po raz pierwszy wygląda na starego. „Trzy okruchy. Tak mówiła przepowiednia: jeden w garści bandyty, jeden w trumnie wieszczki, jeden w kamieniu Kowalskiej Góry. Zanieś je do kuźni, chłopcze. I wykuj ostrze, zanim Kaldras się obudzi.”",next:"forge"},forge:{name:"Starożytne Ostrze",giver:"eryn",level:4,intro:"Borys kowal rozkłada na anvilu trzy okruchy. „Starożytny metal jest w kamieniołomie na zachodzie. Wykuję ci klingę, ale musisz sam przynieść wszystko. Trzy okruchy, dwa kawałki metalu i cierpliwość.”",objectives:[{id:"metal",type:"collect",item:"ancient_metal",target:2,text:"Zdobądź starożytny metal (2)"},{id:"shards",type:"collect",item:"shard_dawn",target:3,text:"Zdobądź trzy okruchy Ostrza Świtu (3)"},{id:"craft",type:"own",item:"dawn_blade",target:1,text:"Wykuj Klingę Świtu w kuźni"}],reward:{gold:200,xp:420,items:[["might_elixir",2]]},outro:"Ostrze wychodzi z ognia białe jak poranek. Borys cofa się o krok. „Nie dotykałem czegoś takiego od trzydziestu lat. Idź. Wrota na północy czekają, a Kaldras nie będzie czekał wiecznie.”",next:"boss"},boss:{name:"Mgliste Wrota",giver:"eryn",level:5,intro:"Eryn stoi na skraju wioski i patrzy na północ, gdzie nad ruinami zbiera się mgła. „Kaldras był kiedyś strażnikiem tych wrót. Potem coś po drugiej stronie zaczęło mu odpowiadać. Zamknij je. Na zawsze.”",objectives:[{id:"kaldras",type:"kill",enemy:"kaldras",target:1,text:"Pokonaj Kaldrasa w Mglistych Wrotach"}],reward:{gold:500,xp:1e3,items:[]},outro:"Mgła opada. Po raz pierwszy od trzydziestu lat Wilcza Dolina widzi świt.",final:!0}},hr=["wolves","grain","barrow","forge","boss"],eg=["Trzydzieści lat temu Kaldras zamknął Mgliste Wrota od zewnątrz i został po ich stronie.","Ostrze Świtu wykuto ze spadającej gwiazdy. Rozpadło się na trzy okruchy, gdy jego właściciel zginął.","Wieszczka z Kurhanu nie jest duchem — to przekleństwo, które zostało po kobiecie, co zbyt długo patrzyła w mgłę.","Rudy Wilk sprzedawał zboże na południe. Ale to nie głód był jego prawdziwym interesem.","Borys kowal pracował przy starożytnej kuźni, zanim spaliła mu się ręka. Nie lubi o tym mówić.","Wilki z Doliny nie atakują bez powodu. Ktoś je niepokoi."],ig=a=>{const t={start:{speaker:"Stary Eryn",text:a.active==="wolves"?"„Wilki wciąż grasują. Ludzie boją się wychodzić po zmroku. Policz je, chłopcze — pięć sztuk i będziemy spać spokojnie.”":a.active==="grain"?"„Obozowisko Rudego Wilka leży na zachód od rozdroża. Worek zboża musi wrócić do wioski. A Rudy… Rudy nie musi.”":a.active==="barrow"?"„Kurhan jest na północnym wschodzie, za rozstajem. Idź tam po zmroku, inaczej wieszczka nie pokaże się wcale.”":a.active==="forge"?"„Borys czeka przy anvilu. Trzy okruchy, dwa kawałki starożytnego metalu. Kowalska Góra ma jedno i drugie, jeśli dobrze szukać.”":a.active==="boss"?"„Mgliste Wrota są na północy, za kamiennym łukiem. Idź i nie oglądaj się za siebie.”":"„Wilcza Dolina nie jest bogata, ale ma dach i ogień. Rozgość się — choć nie na długo, bo mamy problemy.”",choices:[]}},e=t.start,i=a.active;if(i)a.canComplete?(e.choices.push({label:"„Zrobione. Wszystko, jak prosiłeś.”",action:`complete:${i}`,special:!0}),e.choices.push({label:"„Jeszcze nie teraz.”",action:"close"})):(e.choices.push({label:"„Wrócę, gdy skończę.”",action:"close"}),e.choices.push({label:"„Opowiedz mi o Kaldrasie.”",next:"lore"}),a.active==="barrow"&&!a.night&&e.choices.push({label:"„Jak mam walczyć z duchem?”",next:"wraith"}));else{const n=a.availableQuest;n?e.choices.push({label:`„Co się dzieje?” — przyjmij zadanie: ${n.name}`,action:`accept:${n.id}`,special:!0}):a.allDone?e.choices.push({label:"„Wrota są zamknięte. Wioska może odetchnąć.”",action:"close"}):e.choices.push({label:"„Wrócę, gdy będę gotów.”",action:"close"}),e.choices.push({label:"„Opowiedz mi o Kaldrasie.”",next:"lore"}),e.choices.push({label:"„Muszę iść.”",action:"close"})}return t.lore={speaker:"Stary Eryn",text:"„Kaldras był strażnikiem Mglistych Wrót, jeszcze przed twoim urodzeniem. Trzydzieści lat temu mgła zaczęła szeptać. On wszedł między wrota i zamknął je od zewnątrz — własnym ciałem. Myśleliśmy, że to koniec. Nie było. Teraz to, co po drugiej stronie, nosi jego twarz.”",choices:[{label:"„Jak go pokonać?”",next:"howto"},{label:"„Wróćmy do spraw wioski.”",next:"start"}]},t.howto={speaker:"Stary Eryn",text:"„Ostrzem Świtu. Twoja matka nosiła je do końca. Rozpadło się na trzy okruchy — jeden zabrał Rudy Wilk, jeden strzeże wieszczka, jeden leży w kamieniu na Kowalskiej Górze. Kowal Borys wie, co z tym zrobić.”",choices:[{label:"„Rozumiem.”",next:"start"}]},t.wraith={speaker:"Stary Eryn",text:"„Duch nie krwawi. Ale boi się światła i stali, która pamięta ogień. Użyj Znaku Świtu, gdy się zbliży. I nie stój w miejscu — jej szept wysysa siły.”",choices:[{label:"„Dzięki.”",next:"start"}]},t},ng=a=>{const t={start:{speaker:"Borys Kowal",text:a.questDone("barrow")?"„Okruch z kurhanu? Pokaż. Hmm. Zimny jak sedno zimy. Rozłóż wszystko na anvilu — wykuję ci klingę, jakiej ta dolina nie widziała.”":"„Stal się nie tnie, jeśli jej nie szanujesz. Co chcesz, żebym ci zrobił?”",choices:[{label:"Otwórz kuźnię (rzemiosło)",action:"craft"},{label:"„Opowiedz o starożytnej kuźni.”",next:"forge_lore"},{label:"„Muszę iść.”",action:"close"}]},forge_lore:{speaker:"Borys Kowal",text:"„Kowalska Góra to nie moja robota. Ktoś tam kuł metal, zanim ludzie nauczyli się czytać. Została im tylko ta przeklęta kuźnia i kamienie, które świecą w nocy. Spaliłem sobie rękę, próbując ją rozpalić. Nie idź tam bez powodu.”",choices:[{label:"„Zapamiętam.”",next:"start"}]}};return a.hasItem("dawn_blade")&&(t.start.text="„Klinga Świtu. Wyszła lepiej, niż śmiałem marzyć. Uważaj na nią — ostrze pamięta każde cięcie.”"),t},sg=a=>({start:{speaker:"Marena Zielarka",text:a.night?"„Nocą zioła zamykają się, ale mikstury są gotowe. Czego potrzebujesz?”":"„Zioła zbieram o świcie, gdy rosa jeszcze nie opadnie. Mów, co ci dolega.”",choices:[{label:"Kup mikstury",action:"shop:marena"},{label:"„Co wiesz o kurhanie?”",next:"barrow_lore"},{label:"Odpocznij przy ognisku (do świtu)",action:"rest"},{label:"„Muszę iść.”",action:"close"}]},barrow_lore:{speaker:"Marena Zielarka",text:"„Wieszczka z Kurhanu nie jest zła. Była kobietą, która patrzyła w mgłę dłużej, niż powinna. Teraz powtarza to, co usłyszała — imiona. Jeśli usłyszysz swoje, nie odpowiadaj.”",choices:[{label:"„A jeśli odpowiem?”",next:"barrow_lore2"},{label:"„Dzięki.”",next:"start"}]},barrow_lore2:{speaker:"Marena Zielarka",text:"„Wtedy przyjdzie po ciebie. Ale nie martw się — twoje imię jeszcze nie pada w jej szeptach. Jeszcze.”",choices:[{label:"…",next:"start"}]}}),ag=a=>({start:{speaker:"Kupiec Zorzan",text:"„Towar z południa, ceny z północy. Tak się handluje w tej dolinie. Co cię interesuje?”",choices:[{label:"Otwórz sklep",action:"shop:zorzan"},{label:"„Sprzedasz mi coś na bandytów?”",next:"bandits"},{label:"„Skąd przywozisz towar?”",next:"lore"},{label:"„Muszę iść.”",action:"close"}]},bandits:{speaker:"Kupiec Zorzan",text:"„Rudy Wilk kupował ode mnie noże. Dużo noży. Płacił dobrze, więc nie pytałem. Teraz wiem, po co były.”",choices:[{label:"„Zapłacisz za to kiedyś.”",next:"start"}]},lore:{speaker:"Kupiec Zorzan",text:"„Z południa, gdzie nie ma już dróg, tylko mgła. Handluję z tymi, którzy jeszcze wracają. Coraz mniej ich wraca.”",choices:[{label:"„Wróćmy do interesów.”",next:"start"}]}}),og=a=>({start:{speaker:"Strażnik Wilk",text:a.playerLevel<3?"„Nowy? Trzymaj się blisko wioski i nie ufaj wilkom, co nie uciekają. Atakuj z dystansu albo z zaskoczenia.”":"„Widzę, że umiesz machnąć mieczem. Uważaj tylko na tych z łukami — strzelają zanim zdążysz zamachnąć.”",choices:[{label:"„Jak walczyć z bandytami?”",next:"tips"},{label:"„Gdzie znajdę rudę?”",next:"ore"},{label:"„Dzięki.”",action:"close"}]},tips:{speaker:"Strażnik Wilk",text:"„Bandyci walczą w grupie. Zwab jednego na bok, potem drugiego. Unik to twój najlepszy przyjaciel — naciśnij spację, gdy tylko zobaczysz zamach. A gdy zabraknie sił, uciekaj, nie udawaj bohatera.”",choices:[{label:"„Zapamiętam.”",next:"start"}]},ore:{speaker:"Strażnik Wilk",text:"„Ruda leży w kamieniołomie na południu, przy starych wozach. Starożytny metal znajdziesz w kurhanie — ale tam nie chodzi się samemu.”",choices:[{label:"„Dzięki.”",next:"start"}]}}),rg=a=>({start:{speaker:"Iskra",text:"„Uczę się magii od Marianny, ale ona twierdzi, że mam za dużo zapału, a za mało cierpliwości. Ty umiesz czarować? Pokaż coś!”",choices:[{label:"„Pokażę ci Znak Świtu.”",next:"spell"},{label:"„Jakub to twój…?”",next:"family"},{label:"„Muszę iść.”",action:"close"}]},spell:{speaker:"Iskra",text:"„Ojej! To było jak prawdziwe światło! Naucz mnie kiedyś, dobrze? Obiecuję, że nie podpalę wioski. Przynajmniej nie od razu.”",choices:[{label:"„Kiedyś.”",next:"start"}]},family:{speaker:"Iskra",text:"„Jakub był moim bratem. Zginął przy kurhanie dwa lata temu. Mówią, że to wilki... ale wilki nie zostawiają śladów stali na kościach.”",choices:[{label:"„Przykro mi.”",next:"start"}]}}),cg=a=>({start:{speaker:"Cień pod Łukiem",text:"„Znałem twoją matkę. Nosiła ostrze, którego nikt nie potrafił wykować na nowo. Kaldras nie jest potworem — jest strażnikiem, który zapomniał, kogo pilnuje. Oszczędź go, jeśli możesz.”",choices:[{label:"„Kim jesteś?”",next:"who"},{label:"„Muszę iść.”",action:"close"}]},who:{speaker:"Cień pod Łukiem",text:"„Nikim ważnym. Kiedyś nazywano mnie Corem. Teraz jestem tylko mgłą, która pamięta imiona.”",choices:[{label:"…",next:"start"}]}}),lg=()=>({start:{speaker:"Pustelnik Ivar",text:"„Przychodzisz z dołu, z hałasu. Siadaj. W ciemnym lesie nikt nie pyta, po co przyszedł — tylko czy przyniósł własne milczenie.”",choices:[{label:"„Co wiesz o Mglistych Wrotach?”",next:"gates"},{label:"„Mogę odpocząć przy twoim ogniu?”",next:"rest"},{label:"„Muszę iść.”",action:"close"}]},gates:{speaker:"Pustelnik Ivar",text:"„Wrota nie zostały zbudowane po to, by coś wpuszczać. Zbudowano je, żeby coś trzymać w środku. Kaldras stanął w progu i zapomniał, po której stronie stoi. Gdy go spotkasz, nie pytaj go o imię — odpowie cudzym.”",choices:[{label:"„Skąd to wiesz?”",next:"who"},{label:"„Wróćmy do ognia.”",next:"start"}]},who:{speaker:"Pustelnik Ivar",text:"„Byłem przy wrotach, gdy je zamykano. Miałem wtedy inne imię i inne oczy. Zostało mi to, co widzisz: ogień, mech i trzy zdania prawdy na krzyż.”",choices:[{label:"„Rozumiem.”",next:"start"}]},rest:{speaker:"Pustelnik Ivar",text:"„Ogień jest twój, dopóki płonie. Ale pamiętaj — las nie śpi, gdy ty śpisz.”",choices:[{label:"Usiądź przy ogniu",action:"rest"},{label:"„Dziękuję.”",next:"start"}]}}),hg=()=>({start:{speaker:"Kupiec Bogdan",text:"„Kotlina Kupców! Najlepsze ceny od Wilczej Doliny do przełęczy, a i tam nie ma czego szukać. Czego szukasz — stali, ziół, czy może plotki?”",choices:[{label:"„Pokaż towar.”",action:"shop:bogdan"},{label:"„Co słychać na trakcie?”",next:"news"},{label:"„Muszę iść.”",action:"close"}]},news:{speaker:"Kupiec Bogdan",text:"„Na trakcie coraz więcej znaków. Bandyci Rudego Wilka siedzą na północnym zachodzie i liczą każdego, kto idzie z ładunkiem. Za przełęczą ktoś zabił trzy wozy. A nad jeziorem rybacy mówią, że woda w nocy paruje — i to nie od zimna.”",choices:[{label:"„A Kamienny Krąg?”",next:"circle"},{label:"„Wróćmy do interesów.”",next:"start"}]},circle:{speaker:"Kupiec Bogdan",text:"„Kamienny Krąg stoi na wschód od traktu, na polanie, której nikt nie kosi. Kamienie pamiętają więcej niż my. Ja tam nie chodzę — ale towar z kręgu zawsze jest w cenie.”",choices:[{label:"„Ciekawe.”",next:"start"}]}}),Ji={eryn:{name:"Stary Eryn",role:"Starosta Wilczej Doliny",pos:[8,344],rot:-.45,radius:4.2,visual:{tunic:"#5c4a33",pants:"#3a3228",hair:"#b9b0a0",beard:!0,skin:"#c79a71",bulk:1,cloak:"#4a4034"},tree:ig},borys:{name:"Borys Kowal",role:"Kowal",pos:[-16,353],rot:1.6,radius:4.2,visual:{tunic:"#4a3a2c",pants:"#33291f",hair:"#2a1d14",beard:!0,skin:"#b98258",bulk:1.16,armor:"#5b5548",scar:!0},tree:ng},marena:{name:"Marena Zielarka",role:"Zielarka",pos:[23,340],rot:-1.1,radius:4.2,visual:{tunic:"#3f5a42",pants:"#3a3b2e",hair:"#8a6b45",skin:"#d2a67d",bulk:.94,cloak:"#2f4a37"},tree:sg},zorzan:{name:"Kupiec Zorzan",role:"Wędrowny kupiec",pos:[11,371],rot:1,radius:4.2,visual:{tunic:"#5a3f52",pants:"#382e3a",hair:"#241a16",skin:"#c9976d",bulk:1.02,cloak:"#45304a",hood:"#3a2840"},tree:ag},wilk:{name:"Strażnik Wilk",role:"Straż wioski",pos:[4,313],rot:.15,radius:4,visual:{tunic:"#4c4e52",pants:"#33373b",hair:"#3a2b1f",skin:"#cba07a",bulk:1.1,armor:"#5e6367"},tree:og},iskra:{name:"Iskra",role:"Uczennica zielarki",pos:[27,344],rot:2.4,radius:4,visual:{tunic:"#5d6a4c",pants:"#3c4032",hair:"#b8542f",skin:"#e0b48a",bulk:.84},tree:rg},pustelnik:{name:"Pustelnik Ivar",role:"Samotnik z Ciemnego Lasu",pos:[-556,-196],rot:.9,radius:4.4,visual:{tunic:"#46503c",pants:"#33372c",hair:"#c8c2b2",beard:!0,skin:"#c39a76",bulk:.9,cloak:"#37402f",hood:"#3c4636"},tree:lg},kupiec:{name:"Kupiec Bogdan",role:"Handlarz z Kotliny",pos:[172,256],rot:2.2,radius:4.4,visual:{tunic:"#5b4636",pants:"#3a3026",hair:"#2d2119",skin:"#c08a5e",bulk:1.08,cloak:"#6a4a3a",hood:"#4a3628"},tree:hg},duch:{name:"Cień pod Łukiem",role:"Zjawisko",pos:[-148,-534],rot:.4,radius:5,ghost:!0,hidden:!0,visual:{tunic:"#3d4a52",pants:"#2f3a40",hair:"#20282c",skin:"#8fa6ad",bulk:1,cloak:"#2a3a44",eyeColor:"#8fe0ff"},tree:cg}},dg={zorzan:{name:"Kupiec Zorzan",stock:["health_potion","mana_potion","bread","leather_hood","leather_vest","hunter_bow","iron_ore","herbs","health_potion"]},marena:{name:"Marena Zielarka",stock:["health_potion","mana_potion","might_elixir","herbs","herbs","crystal_mana"]},bogdan:{name:"Kupiec Bogdan",stock:["health_potion","mana_potion","bread","iron_ore","ancient_metal","iron_axe","hunter_bow","leather_vest","might_elixir"]}},Kc=["Walka wręcz nagradza cierpliwość — unik w odpowiednim momencie otwiera kontratak.","Nocą wilki są szybsze, a w kurhanie pojawia się coś, czego nie ma w dzień.","Odpoczynek przy ognisku leczy rany i przesuwa czas do świtu.","Zbieraj zioła i rudę — rzemiosło bywa cenniejsze niż złoto.","Krytyczne trafienia zależą od zręczności, ale każde ostrze ma swoją wagę."],Yc={sword:'<path d="M19 4.5l-8.5 10.5-2 2-2-2 2-2L19 4.5z"/><path d="M15.5 8l2 2"/><path d="M6.5 16.5L4 19"/>',axe:'<path d="M13 4c4.5 0 7 2.5 7 5.5S17.5 15 13 15z"/><path d="M13 15l-1 5"/><path d="M11.5 3.5v17"/>',bow:'<path d="M6 4c6.5 4.5 6.5 11.5 0 16"/><path d="M6 4l13 16"/><path d="M15.5 9.5l3.5-1"/>',armor:'<path d="M8.5 4.5L12 6l3.5-1.5L19 8l-2 12H7L5 8z"/><path d="M10 11.5h4"/>',helm:'<path d="M5 13a7 7 0 0 1 14 0v4.5H5z"/><path d="M9.5 17.5v-4M14.5 17.5v-4"/>',amulet:'<circle cx="12" cy="15.5" r="3.8"/><path d="M5.5 4.5c2.2 3.2 4 4.4 6.5 4.4s4.3-1.2 6.5-4.4"/>',ring:'<circle cx="12" cy="14.5" r="4.5"/><path d="M9.4 8.4L12 4l2.6 4.4z"/>',potion:'<path d="M9.5 3.5h5v3.8l3.6 6.3A4.6 4.6 0 0 1 14 20.5h-4a4.6 4.6 0 0 1-4.1-6.9L9.5 7.3z"/><path d="M7.5 14.5h9"/>',elixir:'<path d="M6.5 4h11l-1.8 6.4a4 4 0 0 1-7.4 0z"/><path d="M12 14.5V19"/><path d="M9 20h6"/>',meat:'<path d="M8 17.5a5.5 5.5 0 1 1 7.5-7.5c2.2 0 4 1.8 4 4s-1.8 4-4 4z"/><path d="M17.5 6.5l-2 2"/>',bread:'<ellipse cx="12" cy="12.5" rx="8" ry="5"/><path d="M8.5 10.5v4M12 9.5v6M15.5 10.5v4"/>',pelt:'<path d="M6 4.5c3 1.2 5 .2 6-.8 1 1 3 2 6 .8-1 4.2-2 8-2 12.5-2.2 1-5.8 1-8 0 0-4.5-1-8.3-2-12.5z"/><path d="M9.5 12h1M13.5 12h1"/>',ore:'<path d="M4.5 15.5l3-6.5 4 2 3-4 4.5 6.5-2 5H6.5z"/><path d="M7.5 9l1.5 3M14.5 7l-1 4"/>',herb:'<path d="M12 20.5V9.5"/><path d="M12 12.5c-4 0-6.2-2-6.2-6.2 4 0 6.2 2 6.2 6.2z"/><path d="M12 15.5c4 0 6.2-2 6.2-6.2-4 0-6.2 2-6.2 6.2z"/>',metal:'<path d="M4 17l4.5-8h11.5L15.5 17z"/><path d="M8.5 9l4 8"/>',crystal:'<path d="M12 3.5l5 7-5 10-5-10z"/><path d="M7 10.5h10"/>',shard:'<path d="M12 3l1.9 6.6L20.5 12l-6.6 2.4L12 21l-1.9-6.6L3.5 12l6.6-2.4z"/>',key:'<circle cx="8" cy="8" r="3.6"/><path d="M10.6 10.6L19 19"/><path d="M15.5 15.5l2 2"/><path d="M18 18l1.5 1.5"/>',grain:'<path d="M9 4.5h6l1 3.2c2 2.1 2.2 5.3 2.2 8.3H5.8c0-3 .2-6.2 2.2-8.3z"/><path d="M9 4.5h6"/><path d="M9.5 12.5v3.5M14.5 12.5v3.5"/>',bone:'<path d="M8.5 15.5l7-7"/><circle cx="7" cy="17" r="2.4"/><circle cx="17" cy="7" r="2.4"/>',coin:'<circle cx="12" cy="12" r="7.5"/><path d="M12 8.5v7M10 10h3.2a1.6 1.6 0 0 1 0 3.2H10"/>',star:'<path d="M12 3.5l2.4 5.6 6 .6-4.5 4 1.4 5.9-5.3-3.1-5.3 3.1 1.4-5.9-4.5-4 6-.6z"/>',unknown:'<circle cx="12" cy="12" r="7.5"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3v1.7"/><path d="M12 17h.01"/>'};function Ki(a,t=20,e=""){const i=Yc[a]??Yc.unknown;return`<svg class="ico-svg ${e}" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${i}</svg>`}const oi=a=>Math.round(a).toLocaleString("pl-PL"),Ii=a=>Math.max(0,Math.min(1,a));function ct(a,t=document){return t.querySelector(a)}const Zc=[{...X.village,short:"Wilcza Dolina",color:"#e2b878"},{...X.trading,short:"Kotlina Kupców",color:"#d8b85a"},{...X.crossroads,short:"Rozdroże",color:"#cfc2a4"},{...X.forge,short:"Kowalska Góra",color:"#6ee0d6"},{...X.bandits,short:"Obóz bandytów",color:"#d0705a"},{...X.barrow,short:"Kurhan Szeptu",color:"#b49ae0"},{...X.ruins,short:"Mgliste Wrota",color:"#b977e8"},{...X.quarry,short:"Kamieniołom",color:"#c9c2b0"},{...X.lake,short:"Jezioro Zwierciadło",color:"#7fb8cc"},{...X.castle,short:"Warownia Popiołu",color:"#c08f6a"},{...X.hermit,short:"Pustelnia",color:"#9fc48a"},{...X.swamp,short:"Bagno Wieszczki",color:"#7f9670"},{...X.pass,short:"Przełęcz Kalmoru",color:"#b0a898"},{...X.circle,short:"Kamienny Krąg",color:"#9f7cf0"},{...X.mine,short:"Kopalnia",color:"#a89a80"}];function Jc(a,t){const e=j(a,t),i=Math.hypot(a-X.lake.x,t-X.lake.z),n=Math.hypot(a-X.swamp.x,t-X.swamp.z);if(i<118&&e<Ie+.2)return[42,70,88];if(i<126&&e<Ie+1.8)return[122,112,82];if(n<200)return[74,82,58];if(e>196)return[226,229,231];if(e>154)return[162,160,154];if(e>108)return[116,112,104];const s=Cr(a,t),o=ie((e-22)/40,0,1);let r=[96-o*16,112-o*10,68-o*12];s>.55&&(r=[r[0]*.62+22,r[1]*.66+12,r[2]*.6+10]);const c=.86+e%7*.012;return[r[0]*c,r[1]*c,r[2]*c]}function Qc(a,t,e=2.2){const i=j(a+e,t)-j(a-e,t),n=j(a,t+e)-j(a,t-e);return ie(.72+Math.max(0,.62+(-i-n)*.62)*.42,.55,1.4)}class ug{constructor(t,e){this.game=t,this.root=e,this.logLines=[],this.nameplates=[],this.floatEls=[],this.toastTimer=0,this.locationTimer=0,this.interactText=null,this.mapCanvas=null,this.mapSize=560,this.minimapAcc=0,this.hudAcc=0,this.platesAcc=0,this.infoOpen=!1,this.lastTab="character",this.selectedItem=null,this.shopId=null,this.craftStation="village",this.dialogueOpen=!1,this._buildHud(),this._buildPanels(),this._buildScreens()}_buildHud(){const t=document.createElement("div");t.className="hud",t.innerHTML=`
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
    `,this.root.appendChild(t),this.hud=t,this.worldOverlay=ct("#world-overlay"),this.logEl=ct("#event-log"),this.toastEl=ct("#toast"),this.flashEl=ct("#flash-layer"),this.interactEl=ct("#interact-prompt"),this.locEl=ct("#loc-title");const e=ct("#spells");this.spellEls=ws.map((s,o)=>{const r=document.createElement("div");return r.className="spell locked clickable",r.innerHTML=`<div class="glyph">${s.glyph}</div><div class="key">${["Q","E","R"][o]}</div>
        <div class="cool"></div><div class="cost">${s.mana}</div>`,r.title=`${s.name} — ${s.desc}`,r.addEventListener("click",()=>{this.game.state==="playing"&&this.game.player.castSpell(o)}),e.appendChild(r),r}),this.slotEls=[];const i=ct("#slot-bar");for(let s=0;s<2;s++){const o=document.createElement("div");o.className="quick clickable",o.innerHTML=`<span class="key">${s+1}</span><span class="ico"></span><span class="count"></span>`,o.addEventListener("click",()=>{this.game.state==="playing"&&this.game.useQuickSlot(s)}),i.appendChild(o),this.slotEls.push(o)}const n=ct("#touch-controls");"ontouchstart"in window||(n.style.display="none"),n.addEventListener("click",s=>{const o=s.target.dataset?.touch;if(!o)return;const r=this.game.player;o==="attack"&&r.attack(),o==="dodge"&&r.dodge(),o==="spell0"&&r.castSpell(0)}),this.clockEl=ct("#clock"),this.compassInner=ct("#compass-inner"),this.compassObj=ct("#compass-obj"),this._buildCompassTicks()}_buildCompassTicks(){const t=[["N",0],["NE",45],["E",90],["SE",135],["S",180],["SW",225],["W",270],["NW",315]];this.compassMarks=t.map(([e,i])=>{const n=document.createElement("span");return n.className="tick-mark"+(e.length===1?" card":""),n.textContent=e,n.dataset.deg=i,this.compassInner.appendChild(n),n})}_buildPanels(){const t=document.createElement("div");t.id="panel-layer",this.root.appendChild(t),this.panelLayer=t;const e=document.createElement("div");e.className="modal-layer hidden",e.id="hero-panel",e.innerHTML=`
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
      </div>`,t.appendChild(e),this.heroPanel=e,e.addEventListener("click",r=>{const c=r.target.closest("[data-tab]")?.dataset.tab;if(c){this.lastTab=c,this.renderHeroTab(c),this.game.audio?.uiClick();return}r.target.closest('[data-close="hero"]')&&this.closePanels()}),this.heroBody=ct("#hero-tab-body",e);const i=document.createElement("div");i.className="modal-layer hidden",i.id="shop-panel",i.innerHTML=`
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
      </div>`,this.root.appendChild(s),this.infoPanel=s,t.addEventListener("click",o=>{const r=o.target.closest("[data-menu]")?.dataset.menu;r&&(this.game.audio?.unlock(),this.game.audio?.uiClick(),r==="new"&&this.game.startNew(),r==="continue"&&this.game.loadGame(),r==="controls"&&this.showControls(),r==="about"&&this.showAbout())}),e.addEventListener("click",o=>{const r=o.target.closest("[data-pause]")?.dataset.pause;if(r){if(r==="resume"&&this.game.resumeFromUi(),r==="save"&&this.game.saveGame(!0),r==="controls"&&this.showControls(),r==="mute"){const c=this.game.audio?.toggleMute();o.target.textContent=`Dźwięk: ${c?"wł.":"wył."}`}r==="title"&&this.game.returnToTitle()}}),i.addEventListener("click",o=>{const r=o.target.closest("[data-death]")?.dataset.death;r&&(r==="respawn"&&this.game.respawnPlayer(),r==="title"&&this.game.returnToTitle())}),n.addEventListener("click",o=>{const r=o.target.closest("[data-victory]")?.dataset.victory;r&&(r==="continue"&&this.hideVictory(),r==="title"&&this.game.returnToTitle())}),s.addEventListener("click",o=>{o.target.closest('[data-close="info"]')&&(this.hideInfo(),this.anyScreenOpen()||this.game.resumeFromUi())})}anyPanelOpen(){return[...this.panelLayer.children].some(t=>!t.classList.contains("hidden"))}anyScreenOpen(){return["title-screen","pause-screen","death-screen","victory-screen"].some(t=>!ct("#"+t).classList.contains("hidden"))}closePanels(){for(const t of this.panelLayer.children)t.classList.add("hidden");this.dialogueOpen||this.anyScreenOpen()||this.game.resumeFromUi()}openHero(t="character"){this.lastTab=t,this.heroPanel.classList.remove("hidden"),this.heroPanel.classList.add("show"),this.renderHeroTab(t),this.game.openUI()}renderHeroTab(t){for(const e of this.heroPanel.querySelectorAll("[data-tab]"))e.classList.toggle("active",e.dataset.tab===t);t==="character"&&this.renderCharacter(),t==="inventory"&&this.renderInventory(),t==="quests"&&this.renderQuests()}renderCharacter(){const t=this.game.player,e=t.inventory.equipStats(),i=W0.map(n=>{const s=t.points>0;return`<div class="attr-row">
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
            <div class="stat-row"><span class="k">Doświadczenie</span><span class="v">${oi(t.xp)} / ${oi(t.xpNeeded)}</span></div>
            <div class="stat-row"><span class="k">Życie</span><span class="v">${Math.round(t.hp)} / ${t.maxHP}</span></div>
            <div class="stat-row"><span class="k">Mana</span><span class="v">${Math.round(t.mana)} / ${t.maxMana}</span></div>
            <div class="stat-row"><span class="k">Kondycja</span><span class="v">${Math.round(t.stamina)} / ${t.maxStamina}</span></div>
            <div class="stat-row"><span class="k">Atak</span><span class="v">${t.attackPower.toFixed(1)} ${e.attack?`(+${e.attack})`:""}</span></div>
            <div class="stat-row"><span class="k">Pancerz</span><span class="v">${t.armor.toFixed(1)}</span></div>
            <div class="stat-row"><span class="k">Trafienie krytyczne</span><span class="v">${(t.critChance*100).toFixed(0)}%</span></div>
            <div class="stat-row"><span class="k">Moc zaklęć</span><span class="v">${t.spellPower.toFixed(0)}</span></div>
            <div class="stat-row"><span class="k">Złoto</span><span class="v">${oi(t.inventory.gold)}</span></div>
          </div>
          <div class="card" style="margin-top:14px">
            <h4>Zaklęcia</h4>
            ${ws.map(n=>`<div class="stat-row"><span class="k">${n.glyph} ${n.name}</span><span class="v" style="font-size:11px">${t.level>=n.level?"odblokowane":`poziom ${n.level}`}</span></div>`).join("")}
          </div>
        </div>
      </div>`,this.heroBody.querySelectorAll("[data-attr]").forEach(n=>{n.addEventListener("click",()=>{this.game.player.spendPoint(n.dataset.attr)&&(this.game.audio?.uiClick(),this.renderCharacter(),this.refreshHud())})})}renderInventory(){const e=this.game.player.inventory,i=e.list().sort((l,h)=>{const d={weapon:0,armor:1,helm:2,trinket:3,consumable:4,material:5,quest:6};return(d[l.def.type]??9)-(d[h.def.type]??9)}),n=Ol.map(l=>{const h=e.equipped[l.id],d=h?Me[h]:null;return`<div class="equip-slot ${h?"filled":""}" data-unequip="${l.id}" title="${d?d.name:"Pusty slot"}">
        ${Ki(d?d.icon:l.glyph,26)}<span class="lbl">${d?d.name.slice(0,12):l.label}</span>
      </div>`}).join(""),s=i.map(l=>`<div class="inv-cell ${(xs[l.def.rarity]??xs.common).cls}" data-item="${l.id}" title="${l.def.name}">
        ${Ki(l.def.icon,26)}${l.qty>1?`<span class="cnt">${l.qty}</span>`:""}
      </div>`);for(;s.length<Math.max(12,Math.ceil(s.length/6)*6);)s.push('<div class="inv-cell empty">·</div>');const o=this.selectedItem&&e.has(this.selectedItem)?this.selectedItem:null,r=o?Me[o]:null,c=r?`<div class="item-detail">
          <h3 style="color:${xs[r.rarity].color}"><span class="h-ico">${Ki(r.icon,20)}</span>${r.name}</h3>
          <div class="type">${xs[r.rarity].name} · ${this._typeName(r)}</div>
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
                Złoto: <b style="color:var(--gold)">${oi(e.gold)}</b> szt.<br/>
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
        </div>`:'<div class="empty-note">Brak aktywnego zadania. Porozmawiaj ze Starym Eryn w Wilczej Dolinie.</div>',n=hr.filter(s=>t.questDone(s)).map(s=>{const o=_i[s];return`<div class="quest-entry done"><h4>✔ ${o.name}</h4><div class="q-desc">${o.outro??""}</div></div>`}).join("");this.heroBody.innerHTML=`
      <div class="grid-2">
        <div>
          <div class="card"><h4>W toku</h4>${i}</div>
          <div class="card" style="margin-top:14px"><h4>Ukończone</h4>${n||'<div class="empty-note">Jeszcze nic.</div>'}</div>
        </div>
        <div>
          <div class="card">
            <h4>Wieści z doliny</h4>
            ${eg.map(s=>`<div class="q-obj" style="margin-bottom:9px"><span class="tick">·</span><span>${s}</span></div>`).join("")}
          </div>
          <div class="card" style="margin-top:14px">
            <h4>Wskazówka</h4>
            <p class="panel-note">${Kc[Math.floor(Math.random()*Kc.length)]}</p>
          </div>
        </div>
      </div>`}openShop(t){this.shopId=t,this.shopTab="buy",this.shopPanel.classList.remove("hidden"),this.shopPanel.classList.add("show"),this.renderShop(),this.game.openUI()}renderShop(){const t=dg[this.shopId];if(!t)return;const e=this.game.player.inventory;ct("#shop-title").textContent=t.name,ct("#shop-gold").textContent=`Masz ${oi(e.gold)} złota`;for(const n of this.shopPanel.querySelectorAll("[data-shop-tab]"))n.classList.toggle("active",n.dataset.shopTab===this.shopTab);const i=ct("#shop-body");if(this.shopTab==="buy"){const n={};for(const s of t.stock)n[s]=(n[s]??0)+1;i.innerHTML=`<div class="shop-list">${Object.entries(n).map(([s,o])=>{const r=Me[s],c=Math.round(r.value*1.5);return`<div class="shop-row">
          <div class="ico">${Ki(r.icon,20)}</div>
          <div class="info"><div class="nm">${r.name}</div><div class="sub">${G0(s)||this._typeName(r)}${o>1?` · dostępne: ${o}`:""}</div></div>
          <div class="price">${c} szt.</div>
          <button data-buy="${s}" ${e.gold<c?"disabled":""}>Kup</button>
        </div>`}).join("")}</div>`}else{const n=e.list().filter(s=>s.def.type!=="quest");i.innerHTML=n.length?`<div class="shop-list">${n.map(s=>{const o=Math.max(1,Math.round(s.def.value*.45));return`<div class="shop-row">
              <div class="ico">${Ki(s.def.icon,20)}</div>
              <div class="info"><div class="nm">${s.def.name}${s.qty>1?` ×${s.qty}`:""}</div><div class="sub">${this._typeName(s.def)}</div></div>
              <div class="price">${o} szt.</div>
              <button data-sell="${s.id}">Sprzedaj</button>
            </div>`}).join("")}</div>`:'<div class="empty-note">Nie masz nic na sprzedaż.</div>'}}openCrafting(t="village"){this.craftStation=t,this.craftPanel.classList.remove("hidden"),this.craftPanel.classList.add("show"),this.renderCrafting(),this.game.openUI(),this.game.audio?.uiOpen()}renderCrafting(){const t=this.game.player.inventory,e=this.craftStation==="ancient"||this.craftStation==="ancient_forge"?"Starożytna kuźnia":"Kuźnia Borysa";ct("#craft-sub").textContent=`${e} · złoto: ${oi(t.gold)}`;const i=ct("#craft-body");i.innerHTML=Bl.map(n=>{const o=!!!n.legendary||this.craftStation==="ancient"||this.craftStation==="ancient_forge",r=Object.entries(n.mats).map(([u,f])=>{const g=t.count(u);return`<span style="color:${g>=f?"#8fbf72":"#e08e84"}">${Ki(Me[u].icon,13)} ${Me[u].name} ${g}/${f}</span>`}).join(" · "),c=t.gold>=n.cost,l=Object.entries(n.mats).every(([u,f])=>t.count(u)>=f),h=o&&c&&l,d=Me[n.out.id];return`<div class="shop-row">
        <div class="ico">${Ki(d.icon,20)}</div>
        <div class="info">
          <div class="nm" style="color:${xs[d.rarity].color}">${n.name}${n.out.qty>1?` ×${n.out.qty}`:""}</div>
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
        </div>`,this.root.appendChild(l),this.dialogueEl=l}const r=this.dialogueEl;r.classList.remove("hidden"),this.dialogueOpen=!0,ct(".dialogue-speaker",r).textContent=e?`${t} — ${e}`:t,ct(".dialogue-text",r).textContent=i;const c=ct(".dialogue-choices",r);c.innerHTML="",n.forEach((l,h)=>{const d=document.createElement("button");d.innerHTML=`<span class="arrow">▸</span>${l.label}`,l.special&&d.classList.add("special"),d.addEventListener("click",()=>{this.game.audio?.uiClick(),s(h)}),c.appendChild(d)}),this.dialogueOnClose=o,this.game.openUI(!0)}hideDialogue(){this.dialogueEl&&this.dialogueEl.classList.add("hidden"),this.dialogueOpen=!1}showQuestIntro(t,e){const i=this.questIntro;ct("#qi-name").textContent=t.name,ct("#qi-sub").textContent="Nowe zadanie",ct("#qi-text").textContent=t.intro,ct("#qi-objectives").innerHTML=t.objectives.map(s=>`<div>◇ ${s.text.replace(/\(\d+\/\d+\)$/,"").trim()}</div>`).join(""),i.classList.remove("hidden"),i.classList.add("show");const n=ct("#qi-btn");n.textContent=t.final?"Wyruszam":"Przyjmuję",n.onclick=()=>{i.classList.add("hidden"),i.classList.remove("show"),this.game.audio?.uiClick(),e?.()},this.game.openUI(!0)}showQuestOutro(t,e){const i=this.questIntro;ct("#qi-name").textContent=t.name,ct("#qi-sub").textContent="Zadanie ukończone",ct("#qi-text").textContent=t.outro??"",ct("#qi-objectives").innerHTML=`<div style="color:var(--gold)">Nagroda: ${t.reward.gold} złota · ${t.reward.xp} PD</div>`,i.classList.remove("hidden"),i.classList.add("show");const n=ct("#qi-btn");n.textContent="Kontynuuj",n.onclick=()=>{i.classList.add("hidden"),i.classList.remove("show"),this.game.audio?.uiClick(),e?.()},this.game.openUI(!0)}showControls(){ct("#info-title").textContent="Sterowanie",ct("#info-sub").textContent="Wszystko pod ręką",ct("#info-body").innerHTML=`
      <div class="grid-2">
        <div>
          ${[["W A S D","Ruch postaci"],["Shift","Bieg (zużywa kondycję)"],["Lewy przycisk myszy","Atak (3-ciosowa kombinacja)"],["Spacja","Unik / przewrót (nietykalność)"],["Q / E / R","Zaklęcia: Znak Świtu, Wilczy Zew, Blask Świtu"],["1 / 2","Mikstury z paska szybkiego dostępu"]].map(([t,e])=>`<div class="kbd-row"><kbd>${t}</kbd><span>${e}</span></div>`).join("")}
        </div>
        <div>
          ${[["F","Interakcja: rozmowa, kuźnia, zioła, skrzynie"],["I","Ekwipunek"],["C","Postać i atrybuty"],["K","Zadania"],["M","Mapa świata"],["Esc","Pauza, zapis, wyjście"],["Mysz","Rozglądanie (po kliknięciu w planszę)"]].map(([t,e])=>`<div class="kbd-row"><kbd>${t}</kbd><span>${e}</span></div>`).join("")}
        </div>
      </div>
      <p class="panel-note" style="margin-top:16px">Gra automatycznie zapisuje postęp co jakiś czas oraz po ukończeniu zadania. Na urządzeniach dotykowych lewa strona ekranu to ruch, prawa — rozglądanie.</p>`,this.infoPanel.classList.remove("hidden"),this.infoPanel.classList.add("show"),this.infoOpen=!0,this.game.openUI(!0)}hideInfo(){this.infoPanel.classList.add("hidden"),this.infoPanel.classList.remove("show"),this.infoOpen=!1}showAbout(){ct("#info-title").textContent="Runy Przeznaczenia",ct("#info-sub").textContent="RPG 3D w przeglądarce",ct("#info-body").innerHTML=`
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
      </div>`,this.infoPanel.classList.remove("hidden"),this.infoPanel.classList.add("show"),this.infoOpen=!0,this.game.openUI(!0)}showTitle(){this.titleScreen.classList.remove("hidden");const t=!!localStorage.getItem("runy-przeznaczenia-save")||!!localStorage.getItem("ostrze-switu-save"),e=ct("#btn-continue");e.disabled=!t,ct("#title-foot").innerHTML=t?"Zapis znaleziony · <b>Kontynuuj</b> wróci do ostatniego ogniska":"Gra tworzy zapis automatycznie. <b>Nowa wyprawa</b> zaczyna się w Wilczej Dolinie."}hideTitle(){this.titleScreen.classList.add("hidden")}showPause(){this.pauseScreen.classList.remove("hidden")}hidePause(){this.pauseScreen.classList.add("hidden")}showDeath(t=0){ct("#death-foot").innerHTML=t>0?`Straciłeś ${t} złota.`:"Wioska wciąż czeka.",this.deathScreen.classList.remove("hidden")}hideDeath(){this.deathScreen.classList.add("hidden")}showVictory(t){ct("#victory-text").textContent="Mgła cofa się od wrót, a nad Wilczą Doliną wschodzi słońce. Kaldras upada — nie jako potwór, lecz jako strażnik, który wreszcie może odejść. Wioska będzie opowiadać o tobie przez wiele zim.",ct("#victory-stats").innerHTML=`Poziom ${t.level} · ${t.xp} PD · ${t.gold} złota · ${t.kills} pokonanych wrogów · ${t.quests}/5 zadań`,this.victoryScreen.classList.remove("hidden"),this.game.audio?.victory()}hideVictory(){this.victoryScreen.classList.add("hidden"),this.game.resumeFromUi()}refreshHud(){const t=this.game.player;if(!t)return;ct("#hero-level").textContent=t.level,ct("#hero-sub").textContent=`Wędrowny najemnik · Poziom ${t.level}`,ct("#hero-gold").textContent=`${oi(t.inventory.gold)} szt.`,ct("#bar-hp").style.width=`${Ii(t.hp/t.maxHP)*100}%`,ct("#bar-stam").style.width=`${Ii(t.stamina/t.maxStamina)*100}%`,ct("#bar-mana").style.width=`${Ii(t.mana/t.maxMana)*100}%`,ct("#bar-xp").style.width=`${Ii(t.xp/t.xpNeeded)*100}%`,ct("#label-hp").textContent=`${Math.ceil(t.hp)} / ${t.maxHP}`,ct("#label-stam").textContent=`${Math.ceil(t.stamina)}`,ct("#label-mana").textContent=`${Math.ceil(t.mana)} / ${t.maxMana}`,ct("#label-xp").textContent=`${oi(t.xp)} / ${oi(t.xpNeeded)} PD`,ws.forEach((r,c)=>{const l=this.spellEls[c],h=t.level<r.level;l.classList.toggle("locked",h),l.classList.toggle("ready",!h&&t.cooldowns[r.id]<=0&&t.mana>=r.mana);const d=t.cooldowns[r.id]>0?t.cooldowns[r.id]/r.cd:0;ct(".cool",l).style.transform=`scaleY(${d})`});const e=t.inventory.consumables();this.slotEls.forEach((r,c)=>{const l=e[c];ct(".ico",r).innerHTML=l?Ki(l.def.icon,20):"·",ct(".count",r).textContent=l&&l.qty>1?l.qty:"",r.style.opacity=l?"1":"0.4"});const i=ct("#quest-tracker"),n=this.game.quests.statusLines(),s=this.game.quests.activeQuest;ct("#qt-name").textContent=s?s.name:"Dziennik",ct("#qt-objectives").innerHTML=n.map(r=>`<div class="q-obj ${r.done?"done":""}"><span class="tick">${r.done?"✔":"◇"}</span><span>${r.text}</span></div>`).join("");const o=!!s||n.length>0;i.style.display=o?"block":"none"}update(t){if(this.game.state==="title")return;const e=this.game.player;e&&(this.hudAcc+=t,this.hudAcc>.1&&(this.hudAcc=0,ct("#bar-hp").style.width=`${Ii(e.hp/e.maxHP)*100}%`,ct("#bar-stam").style.width=`${Ii(e.stamina/e.maxStamina)*100}%`,ct("#bar-mana").style.width=`${Ii(e.mana/e.maxMana)*100}%`,ct("#bar-xp").style.width=`${Ii(e.xp/e.xpNeeded)*100}%`,ct("#label-hp").textContent=`${Math.ceil(e.hp)} / ${e.maxHP}`,ct("#label-stam").textContent=`${Math.ceil(e.stamina)}`,ct("#label-mana").textContent=`${Math.ceil(e.mana)} / ${e.maxMana}`,ct("#label-xp").textContent=`${oi(e.xp)} / ${oi(e.xpNeeded)} PD`,ct("#hero-gold").textContent=`${oi(e.inventory.gold)} szt.`,ws.forEach((i,n)=>{const s=this.spellEls[n],o=e.level<i.level;s.classList.toggle("locked",o),s.classList.toggle("ready",!o&&e.cooldowns[i.id]<=0&&e.mana>=i.mana),ct(".cool",s).style.transform=`scaleY(${e.cooldowns[i.id]>0?e.cooldowns[i.id]/i.cd:0})`})),this._updateCompass(),this.platesAcc+=t,this.platesAcc>.05&&(this.platesAcc=0,this._updateNameplates()),this._updateMinimap(t),this.toastTimer>0&&(this.toastTimer-=t,this.toastTimer<=0&&this.toastEl.classList.remove("show")),this.locationTimer>0&&(this.locationTimer-=t,this.locationTimer<=0&&this.locEl.classList.remove("show")))}_updateCompass(){const t=(-this.game.cameraRig.yaw*180/Math.PI%360+360)%360,e=260,i=e/120;for(const s of this.compassMarks){let o=(Number(s.dataset.deg)-t+540)%360-180;const r=e/2+o*i;s.style.left=`${r}px`,s.style.opacity=Math.abs(o)>58?"0":String(1-Math.abs(o)/70)}const n=this.game.questTargetPos?.();if(n){const s=this.game.player.pos,o=(Math.atan2(n.x-s.x,-(n.z-s.z))*180/Math.PI+360)%360,r=Math.hypot(n.x-s.x,n.z-s.z),c=(o-t+540)%360-180,l=Math.abs(c)<20?"▲":c>0?"▶":"◀";this.compassObj.innerHTML=`<span class="arrow">${l}</span>${this.game.quests.targetHint()??"Cel"} · ${Math.round(r)} m`}else this.compassObj.textContent=this.game.quests.targetHint()??""}_updateNameplates(){const t=this.game.camera,e=this.game.player.pos,i=this.game.enemies.list.filter(s=>s.active&&!s.dead).map(s=>({e:s,d:ne(s.pos.x,s.pos.z,e.x,e.z)})).filter(s=>s.d<26).sort((s,o)=>s.d-o.d).slice(0,8).map(s=>s.e);let n=0;for(const s of i){const o=ne(s.pos.x,s.pos.z,e.x,e.z);if(o>26)continue;const c=new C(s.pos.x,s.pos.y+(s.def.model==="wolf"?1.55:2.35)*(s.def.boss?1.3:1),s.pos.z).project(t);if(c.z>1||c.z<-1)continue;const l=(c.x*.5+.5)*window.innerWidth,h=(-c.y*.5+.5)*window.innerHeight;if(l<-80||l>window.innerWidth+80||h<-40||h>window.innerHeight+40)continue;let d=this.nameplates[n];d||(d=document.createElement("div"),d.className="nameplate",d.innerHTML='<div class="np-name"></div><div class="np-bar"><i></i></div>',this.worldOverlay.appendChild(d),this.nameplates.push(d)),n+=1,d.style.display="block",d.style.transform=`translate(-50%, -100%) translate(${l}px, ${h}px)`,d.classList.toggle("elite",s.elite||s.boss);const u=d.firstChild;u.textContent!==s.name&&(u.textContent=s.name),d.lastChild.firstChild.style.width=`${Ii(s.hp/s.maxHP)*100}%`,d.style.opacity=String(ie(1.5-o/26,.2,1))}for(let s=n;s<this.nameplates.length;s++)this.nameplates[s].style.display="none"}_ensureMap(){if(this.mapCanvas)return;const t=this.mapSize,e=document.createElement("canvas");e.width=t,e.height=t;const i=e.getContext("2d"),n=i.createImageData(t,t);for(let s=0;s<t;s++)for(let o=0;o<t;o++){const r=(o+.5)/t*2*Wt-Wt,c=(s+.5)/t*2*Wt-Wt,l=Jc(r,c),h=Qc(r,c,4),d=(s*t+o)*4;n.data[d]=Math.min(255,l[0]*h),n.data[d+1]=Math.min(255,l[1]*h),n.data[d+2]=Math.min(255,l[2]*h),n.data[d+3]=255}i.putImageData(n,0,0),i.strokeStyle="rgba(196,168,116,0.85)",i.lineWidth=Math.max(2,t/260),i.lineJoin="round";for(const[s,o,r,c]of lr)i.beginPath(),i.moveTo((s+Wt)/(2*Wt)*t,(o+Wt)/(2*Wt)*t),i.lineTo((r+Wt)/(2*Wt)*t,(c+Wt)/(2*Wt)*t),i.stroke();this.mapCanvas=e}_renderMinimapTile(t,e,i=96){if(!this.miniCanvas){const o=document.createElement("canvas");o.width=i,o.height=i,this.miniCanvas=o,this.miniCtx=o.getContext("2d"),this.miniImage=this.miniCtx.createImageData(i,i)}const n=this.miniImage;for(let o=0;o<i;o++)for(let r=0;r<i;r++){const c=t.x+((r+.5)/i-.5)*2*e,l=t.z+((o+.5)/i-.5)*2*e,h=Jc(c,l),d=Qc(c,l,1.6),u=(o*i+r)*4;n.data[u]=Math.min(255,h[0]*d),n.data[u+1]=Math.min(255,h[1]*d),n.data[u+2]=Math.min(255,h[2]*d),n.data[u+3]=255}this.miniCtx.putImageData(n,0,0),this.miniCtx.strokeStyle="rgba(196,168,116,0.7)",this.miniCtx.lineWidth=1;const s=(o,r)=>({x:((o-t.x)/(2*e)+.5)*i,y:((r-t.z)/(2*e)+.5)*i});for(const[o,r,c,l]of lr){const h=s(o,r),d=s(c,l);this.miniCtx.beginPath(),this.miniCtx.moveTo(h.x,h.y),this.miniCtx.lineTo(d.x,d.y),this.miniCtx.stroke()}return this.miniCanvas}_worldToMap(t,e,i,n=1){const s=i/(2*Wt);return{x:(t+Wt)*s,y:(e+Wt)*s}}_updateMinimap(t){if(this.minimapAcc+=t,this.minimapAcc<.1)return;this.minimapAcc=0,this._ensureMap();const e=ct("#minimap"),i=e.getContext("2d"),n=e.width,s=this.game.player.pos,o=46;i.clearRect(0,0,n,n),i.save(),i.beginPath(),i.arc(n/2,n/2,n/2,0,Math.PI*2),i.clip(),i.fillStyle="#0b1116",i.fillRect(0,0,n,n);const r=this._renderMinimapTile(s,o);i.imageSmoothingEnabled=!0,i.drawImage(r,0,0,r.width,r.height,0,0,n,n);const c=(d,u)=>({x:n/2+(d-s.x)/o*(n/2),y:n/2+(u-s.z)/o*(n/2)});for(const d of Zc){const u=c(d.x,d.z);Math.hypot(u.x-n/2,u.y-n/2)>n/2-6||(i.fillStyle=d.color,i.beginPath(),i.arc(u.x,u.y,4,0,Math.PI*2),i.fill(),i.strokeStyle="rgba(0,0,0,0.6)",i.lineWidth=1,i.stroke())}for(const d of this.game.enemies.list){if(!d.active||d.dead)continue;const u=c(d.pos.x,d.pos.z);Math.hypot(u.x-n/2,u.y-n/2)>n/2-4||(i.fillStyle=d.boss?"#ff7a4a":d.elite?"#e0a851":"#c05a4a",i.beginPath(),i.arc(u.x,u.y,d.boss?4:2.6,0,Math.PI*2),i.fill())}for(const d of this.game.npcs){if(!d.visible)continue;const u=c(d.pos.x,d.pos.z);i.fillStyle="#8fbf72",i.beginPath(),i.arc(u.x,u.y,2.6,0,Math.PI*2),i.fill()}const l=this.game.questTargetPos?.();if(l){const d=c(l.x,l.z),u=ie(d.x,10,n-10),f=ie(d.y,10,n-10);i.fillStyle="#b977e8",i.beginPath(),i.arc(u,f,5,0,Math.PI*2),i.fill(),i.strokeStyle="#e0c8ff",i.lineWidth=1.5,i.stroke()}const h=this.game.player.yaw;i.save(),i.translate(n/2,n/2),i.rotate(-h+Math.PI),i.fillStyle="#f6efdf",i.beginPath(),i.moveTo(0,-8),i.lineTo(5.5,6),i.lineTo(0,3),i.lineTo(-5.5,6),i.closePath(),i.fill(),i.restore(),i.fillStyle="rgba(226,184,120,0.9)",i.font="bold 12px Inter, sans-serif",i.textAlign="center",i.fillText("N",n/2,16),i.restore()}drawBigMap(){this._ensureMap();const t=ct("#bigmap"),e=t.getContext("2d"),i=t.width,n=t.height;Math.max(i/this.mapSize,n/this.mapSize),e.imageSmoothingEnabled=!0,e.fillStyle="#070a0d",e.fillRect(0,0,i,n);const s=Math.min(i,n),o=(i-s)/2,r=(n-s)/2;e.drawImage(this.mapCanvas,o,r,s,s);const c=(p,m)=>({x:o+(p+Wt)/(2*Wt)*s,y:r+(m+Wt)/(2*Wt)*s}),l=e.createRadialGradient(i/2,n/2,s*.4,i/2,n/2,s*.56);l.addColorStop(0,"rgba(6,8,11,0)"),l.addColorStop(.75,"rgba(6,8,11,0.35)"),l.addColorStop(1,"rgba(6,8,11,0.9)"),e.fillStyle=l,e.fillRect(0,0,i,n),e.textAlign="center";const h=[];for(const p of Zc){const m=c(p.x,p.z);e.fillStyle=p.color,e.beginPath(),e.arc(m.x,m.y,6.5,0,Math.PI*2),e.fill(),e.strokeStyle="rgba(0,0,0,0.55)",e.lineWidth=1.5,e.stroke(),e.font="600 14px Inter, sans-serif";const x=e.measureText(p.short).width,y=[{dx:0,dy:-15},{dx:0,dy:26},{dx:-x/2-12,dy:5},{dx:x/2+12,dy:5}];let b=null;for(const T of y){const E={x:m.x+T.dx-x/2-3,y:m.y+T.dy-13,w:x+6,h:18};if(!h.some(U=>E.x<U.x+U.w&&E.x+E.w>U.x&&E.y<U.y+U.h&&E.y+E.h>U.y)){b={...T,box:E};break}}if(!b)continue;h.push(b.box),e.textAlign=b.dy===5?b.dx<0?"right":"left":"center";const z=b.dy===5?m.x+b.dx:m.x;e.lineWidth=3,e.strokeStyle="rgba(8,10,13,0.85)",e.strokeText(p.short,z,m.y+b.dy),e.fillStyle="#e8dfcd",e.fillText(p.short,z,m.y+b.dy),e.textAlign="center"}const d=this.game.player.pos;for(const p of this.game.enemies.list){if(!p.active||p.dead||!p.boss&&ne(p.pos.x,p.pos.z,d.x,d.z)>170)continue;const m=c(p.pos.x,p.pos.z);e.fillStyle=p.boss?"#ff7a4a":p.elite?"#e0a851":"rgba(206,96,78,0.95)",e.beginPath(),e.arc(m.x,m.y,p.boss?6:3.2,0,Math.PI*2),e.fill()}for(const p of this.game.npcs){if(!p.visible)continue;const m=c(p.pos.x,p.pos.z);e.fillStyle="#8fbf72",e.beginPath(),e.arc(m.x,m.y,3,0,Math.PI*2),e.fill()}const u=this.game.questTargetPos?.();if(u){const p=c(u.x,u.z);e.strokeStyle="#b977e8",e.lineWidth=2.5,e.beginPath(),e.arc(p.x,p.y,14,0,Math.PI*2),e.stroke(),e.fillStyle="#d8bcff",e.font="600 13px Inter, sans-serif",e.fillText("CEL",p.x,p.y-22)}const f=this.game.player.pos,g=c(f.x,f.z);e.save(),e.translate(g.x,g.y),e.rotate(-this.game.player.yaw+Math.PI),e.fillStyle="#f8f1e2",e.beginPath(),e.moveTo(0,-12),e.lineTo(8,9),e.lineTo(0,4),e.lineTo(-8,9),e.closePath(),e.fill(),e.restore(),e.strokeStyle="rgba(226,184,120,0.28)",e.lineWidth=1,e.strokeRect(o+.5,r+.5,s-1,s-1),e.fillStyle="rgba(233,226,212,0.65)",e.font="12px Inter, sans-serif",e.textAlign="left";const v=100/(2*Wt)*s;e.fillText("0",24,n-26),e.fillRect(24,n-22,v,2),e.fillText("100 m",24+v+6,n-22),e.textAlign="right",e.fillText("N ↑",i-24,30)}log(t,e=""){const i=document.createElement("div");for(i.className=`line ${e}`,i.textContent=t,this.logEl.appendChild(i);this.logEl.children.length>7;)this.logEl.removeChild(this.logEl.firstChild);setTimeout(()=>{i.style.transition="opacity 0.6s",i.style.opacity="0",setTimeout(()=>i.remove(),700)},7e3)}toast(t,e=""){this.toastEl.innerHTML=`${t}${e?`<small>${e}</small>`:""}`,this.toastEl.classList.add("show"),this.toastTimer=3.4}floatNumber(t,e,i=""){const n=this.game.camera,s=t.clone().project(n);if(s.z>1)return;const o=(s.x*.5+.5)*window.innerWidth,r=(-s.y*.5+.5)*window.innerHeight,c=document.createElement("div");c.className=`float-num ${i}`,c.textContent=e,c.style.left=`${o+(Math.random()-.5)*26}px`,c.style.top=`${r}px`,this.worldOverlay.appendChild(c),setTimeout(()=>c.remove(),950)}setInteract(t){if(t!==this.interactText){if(this.interactText=t,!t){this.interactEl.classList.remove("show");return}ct("span",this.interactEl).textContent=t,this.interactEl.classList.add("show")}}showLocation(t,e=""){this.locEl.querySelector("span").textContent=t,this.locEl.querySelector("small").textContent=e,this.locEl.classList.add("show"),this.locationTimer=3.6}flashScreen(t,e=.3){this.flashEl.style.transition="none",this.flashEl.style.background=t,this.flashEl.style.opacity=String(e),this.flashEl.offsetWidth,this.flashEl.style.transition="opacity 0.45s ease",this.flashEl.style.opacity="0"}setClock(t,e){this.clockEl&&(this.clockEl.textContent=`${e?"☾":"☀"} ${t}`)}}class xo{constructor(t){this.game=t,this.active=null,this.completed=new Set,this.progress={},this.killCounters={},this.talked={},this.changed=!0}get activeQuest(){return this.active?_i[this.active]:null}questDone(t){return this.completed.has(t)}availableQuest(){for(const t of hr)if(!this.completed.has(t)&&this.active!==t)return this.active?null:{id:t,..._i[t]};return null}accept(t){return!_i[t]||this.active?!1:(this.active=t,this.progress[t]={},this.killCounters[t]={},this.talked[t]={},t==="boss"&&this.game.bossDefeated&&(this.killCounters[t].kaldras=1),this.changed=!0,this.game.ui?.log(`Nowe zadanie: ${_i[t].name}`,"gold"),this.game.ui?.toast(_i[t].name,"Nowe zadanie"),this.game.audio?.quest(),this.game.ui?.refreshHud(),!0)}onKill(t){if(!this.active)return;const i=this.activeQuest.objectives.find(n=>n.type==="kill"&&n.enemy===t);i&&(this.killCounters[this.active][i.id]=(this.killCounters[this.active][i.id]??0)+1,this.changed=!0,this.game.ui?.refreshHud(),this.evaluate(!0))}onTalk(t){this.active&&(this.talked[this.active][`talk_${t}`]=!0,this.changed=!0,this.evaluate(!0))}objectiveState(t){const e=this.active;if(!e)return{done:!1,current:0,target:t.target??1};const i=this.killCounters[e]??{};if((this.progress[e]??{})[t.id])return{done:!0,current:t.target??1,target:t.target??1};if(t.type==="kill"){const s=i[t.id]??0;return{done:s>=(t.target??1),current:Math.min(s,t.target??1),target:t.target??1}}if(t.type==="collect"||t.type==="own"){const s=this.game.player.inventory.count(t.item);return{done:s>=(t.target??1),current:Math.min(s,t.target??1),target:t.target??1}}if(t.type==="talk"){const s=this.talked[e]?.[`talk_${t.npc}`];return{done:!!s,current:s?1:0,target:1}}return{done:!1,current:0,target:1}}canComplete(t=this.active){if(!t)return!1;const e=_i[t];return e?e.objectives.every(i=>this.objectiveState(i).done):!1}evaluate(t=!1){if(!this.active)return;const e=this.activeQuest,i=this.progress[this.active];for(const n of e.objectives){if(i[n.id])continue;this.objectiveState(n).done&&(i[n.id]=!0,this.changed=!0,this.game.ui?.refreshHud(),t&&(this.game.ui?.log(`Cel ukończony: ${n.text.replace(/\s\(\d+\/\d+\)$/,"")}`,"good"),this.game.audio?.objective()))}if(this.canComplete()&&!this._readyAnnounced){this._readyAnnounced=!0;const s=e.giver==="eryn"?"Starego Eryna":"kowala Borysa";e.final||this.game.ui?.toast("Zadanie gotowe",`Wróć do ${s}`),this.game.ui?.refreshHud()}}complete(t=this.active){if(!t||!this.canComplete(t))return!1;const e=_i[t];this.completed.add(t),this.active=null,this._readyAnnounced=!1;const i=this.game.player;i.inventory.gold+=e.reward.gold??0;for(const[n,s]of e.reward.items??[])i.inventory.add(n,s),this.game.ui?.log(`Otrzymano: ${Me[n]?.name??n} ×${s}`,"gold");return i.gainXp(e.reward.xp??0),this.game.ui?.log(`Zadanie ukończone: ${e.name} (+${e.reward.gold} złota, +${e.reward.xp} PD)`,"good"),this.game.ui?.toast(e.name,"Zadanie ukończone"),this.game.audio?.questComplete(),this.game.ui?.refreshHud(),this.game.onQuestCompleted(t),!0}statusLines(){if(!this.active){const e=this.availableQuest();return e?[{text:`Nowe zadanie u Starego Eryna: ${e.name}`,done:!1}]:this.completed.size>=hr.length?[{text:"Wszystkie zadania ukończone.",done:!0}]:[{text:"Porozmawiaj z mieszkańcami wioski.",done:!1}]}return this.activeQuest.objectives.map(e=>{const i=this.objectiveState(e);let n=e.text.replace(/\(\d+\/\d+\)$/,"").trim();return e.target>1&&(n+=` (${i.current}/${i.target})`),{text:n,done:i.done,raw:e}})}currentObjectiveText(){return this.statusLines().filter(e=>!e.done)[0]?.text??"Zadanie gotowe — wróć do zleceniodawcy"}targetHint(){const t=this.activeQuest;if(!t)return this.availableQuest()?"Stary Eryn — Wilcza Dolina":null;if(this.canComplete())return"Wróć do zleceniodawcy";const e=t.objectives.find(i=>!this.objectiveState(i).done);return e?e.type==="talk"?"Wilcza Dolina":e.type==="kill"?{wolf:"Okolice Wilczej Doliny",bandit:"Obozowisko bandytów",bandit_leader:"Obozowisko bandytów",skeleton:"Kurhan / Mgliste Wrota",wraith:"Kurhan Szeptu (noc)",kaldras:"Mgliste Wrota"}[e.enemy]??"Dzicz":e.type==="collect"?{stolen_grain:"Obozowisko bandytów",shard_dawn:"Kurhan / obóz",ancient_metal:"Kamieniołom / kurhan"}[e.item]??"Dzicz":t.name:null}serialize(){return{active:this.active,completed:[...this.completed],progress:this.progress,killCounters:this.killCounters,talked:this.talked}}load(t){t&&(this.active=t.active??null,this.completed=new Set(t.completed??[]),this.progress=t.progress??{},this.killCounters=t.killCounters??{},this.talked=t.talked??{},this._readyAnnounced=!1,this.changed=!0)}}class yo{constructor(t){this.game=t,this.npcId=null,this.nodes=null,this.current=null,this.open=!1}ctx(){const t=this.game,e=t.quests;return{active:e.active,availableQuest:e.availableQuest(),allDone:e.completed.size>=Object.keys(_i).length,canComplete:e.active?e.canComplete(e.active):!1,questDone:i=>e.questDone(i),hasItem:i=>t.player.inventory.has(i),night:t.dayNight.isNight,playerLevel:t.player.level,hour:t.dayNight.hour}}start(t){const e=Ji[t];return e?(this.npcId=t,this.nodes=e.tree(this.ctx()),this.current="start",this.open=!0,this.game.quests.onTalk(t),this.render(),this.game.audio?.uiOpen(),!0):!1}render(){if(!this.open||!this.nodes?.[this.current])return;const t=this.nodes[this.current],e=Ji[this.npcId],i=(t.choices??[]).map((n,s)=>({...n,index:s}));this.game.ui.showDialogue({speaker:t.speaker??e.name,role:e.role,text:t.text,choices:i,onChoose:n=>this.choose(n),onClose:()=>this.close()})}choose(t){const i=this.nodes[this.current]?.choices?.[t];if(i){if(i.action){this.handleAction(i.action);return}i.next&&(this.current=i.next,this.render(),this.game.audio?.uiClick())}}handleAction(t){const[e,i]=t.split(":"),n=this.game;if(e==="close"){this.close();return}if(e==="accept"){const s=_i[i];if(!s)return;n.quests.accept(i),this.game.ui?.hideDialogue(),this.open=!1,this.game.ui?.showQuestIntro(s,()=>{n.resumeFromUi()});return}if(e==="complete"){const s=_i[i];n.quests.complete(i),this.close(),s&&n.ui?.showQuestOutro(s,()=>n.resumeFromUi());return}if(e==="shop"){this.close(),n.ui?.openShop(i);return}if(e==="craft"){this.close(),n.ui?.openCrafting("village");return}if(e==="rest"){this.close(),n.restAtCampfire();return}}close(){this.open=!1,this.npcId=null,this.nodes=null,this.game.ui?.hideDialogue(),this.game.ui?.anyPanelOpen?.()||this.game.resumeFromUi()}}class fg{constructor(){this.ctx=null,this.master=null,this.musicGain=null,this.sfxGain=null,this.enabled=!0,this.musicOn=!0,this.started=!1,this.lastStep=0}unlock(){if(this.ctx){this.ctx.state==="suspended"&&this.ctx.resume();return}const t=window.AudioContext||window.webkitAudioContext;t&&(this.ctx=new t,this.master=this.ctx.createGain(),this.master.gain.value=.55,this.master.connect(this.ctx.destination),this.sfxGain=this.ctx.createGain(),this.sfxGain.gain.value=.8,this.sfxGain.connect(this.master),this.musicGain=this.ctx.createGain(),this.musicGain.gain.value=.12,this.musicGain.connect(this.master),this.noiseBuffer=this._makeNoise(),this._startAmbient())}_makeNoise(){const t=this.ctx.sampleRate*2,e=this.ctx.createBuffer(1,t,this.ctx.sampleRate),i=e.getChannelData(0);for(let n=0;n<t;n++)i[n]=Math.random()*2-1;return e}_startAmbient(){if(!this.ctx)return;const t=this.ctx.createBufferSource();t.buffer=this.noiseBuffer,t.loop=!0;const e=this.ctx.createBiquadFilter();e.type="lowpass",e.frequency.value=480;const i=this.ctx.createGain();i.gain.value=.035,t.connect(e).connect(i).connect(this.musicGain),t.start();const n=this.ctx.createGain();n.gain.value=.12,n.connect(this.musicGain),[55,82.5,110].forEach((s,o)=>{const r=this.ctx.createOscillator();r.type=o===2?"triangle":"sine",r.frequency.value=s;const c=this.ctx.createGain();c.gain.value=.3/(o+1),r.connect(c).connect(n),r.start();const l=this.ctx.createOscillator();l.frequency.value=.05+o*.03;const h=this.ctx.createGain();h.gain.value=.12,l.connect(h).connect(r.frequency),l.start()}),this.started=!0}setVolume(t){this.master&&(this.master.gain.value=t)}toggleMute(){return this.enabled=!this.enabled,this.master&&(this.master.gain.value=this.enabled?.55:0),this.enabled}_tone(t,e,{type:i="sine",gain:n=.2,slide:s=0,delay:o=0}={}){if(!this.ctx||!this.enabled)return;const r=this.ctx.currentTime+o,c=this.ctx.createOscillator(),l=this.ctx.createGain();c.type=i,c.frequency.setValueAtTime(t,r),s&&c.frequency.exponentialRampToValueAtTime(Math.max(20,t+s),r+e),l.gain.setValueAtTime(0,r),l.gain.linearRampToValueAtTime(n,r+.012),l.gain.exponentialRampToValueAtTime(8e-4,r+e),c.connect(l).connect(this.sfxGain),c.start(r),c.stop(r+e+.02)}_noise(t,{filterFreq:e=1200,q:i=1,gain:n=.16,type:s="bandpass",delay:o=0}={}){if(!this.ctx||!this.enabled)return;const r=this.ctx.currentTime+o,c=this.ctx.createBufferSource();c.buffer=this.noiseBuffer;const l=this.ctx.createBiquadFilter();l.type=s,l.frequency.setValueAtTime(e,r),l.frequency.exponentialRampToValueAtTime(Math.max(120,e*.45),r+t),l.Q.value=i;const h=this.ctx.createGain();h.gain.setValueAtTime(n,r),h.gain.exponentialRampToValueAtTime(.001,r+t),c.connect(l).connect(h).connect(this.sfxGain),c.start(r),c.stop(r+t+.02)}swing(t=0){this._noise(.18,{filterFreq:2400+t*500,gain:.12,q:1.6}),this._tone(180+t*40,.12,{type:"triangle",gain:.06,slide:-80})}hit(t=!1){this._noise(.12,{filterFreq:t?900:1500,gain:t?.24:.16,type:"lowpass"}),this._tone(t?140:220,.14,{type:"square",gain:t?.12:.06,slide:-60})}enemyHit(){this._noise(.1,{filterFreq:700,gain:.1,type:"lowpass"})}enemySwing(){this._noise(.2,{filterFreq:1400,gain:.09})}hurt(){this._tone(160,.3,{type:"sawtooth",gain:.14,slide:-70}),this._noise(.2,{filterFreq:400,gain:.12,type:"lowpass"})}dodge(){this._noise(.28,{filterFreq:900,gain:.1,type:"highpass"})}cast(){[520,760,1020].forEach((t,e)=>this._tone(t,.4,{type:"sine",gain:.09,delay:e*.05,slide:120})),this._noise(.3,{filterFreq:2600,gain:.06,type:"highpass"})}bow(){this._noise(.14,{filterFreq:3e3,gain:.1,type:"highpass"})}growl(){this._tone(90,.5,{type:"sawtooth",gain:.1,slide:-30})}slam(){this._tone(70,.55,{type:"sine",gain:.3,slide:-35}),this._noise(.5,{filterFreq:300,gain:.24,type:"lowpass"})}drink(){this._tone(420,.16,{type:"sine",gain:.08,slide:200}),this._tone(620,.2,{type:"sine",gain:.05,delay:.08,slide:160})}uiClick(){this._tone(660,.07,{type:"triangle",gain:.05})}uiOpen(){this._tone(440,.12,{type:"sine",gain:.05,slide:80}),this._tone(590,.14,{type:"sine",gain:.04,delay:.05,slide:60})}quest(){[392,523,659].forEach((t,e)=>this._tone(t,.5,{type:"triangle",gain:.06,delay:e*.09}))}objective(){[523,698].forEach((t,e)=>this._tone(t,.35,{type:"sine",gain:.05,delay:e*.07}))}questComplete(){[392,523,659,784].forEach((t,e)=>this._tone(t,.6,{type:"triangle",gain:.07,delay:e*.11}))}levelUp(){[523,659,784,1046].forEach((t,e)=>this._tone(t,.7,{type:"sine",gain:.09,delay:e*.1}))}coin(){this._tone(1180,.1,{type:"triangle",gain:.06}),this._tone(1560,.12,{type:"triangle",gain:.05,delay:.05})}step(){if(!this.ctx)return;const t=this.ctx.currentTime;t-this.lastStep<.3||(this.lastStep=t,this._noise(.09,{filterFreq:500,gain:.035,type:"lowpass"}))}death(){[330,261,196,130].forEach((t,e)=>this._tone(t,.9,{type:"triangle",gain:.09,delay:e*.16,slide:-20}))}victory(){[523,659,784,1046,1318].forEach((t,e)=>this._tone(t,1.2,{type:"triangle",gain:.08,delay:e*.16}))}}const Mo="runy-przeznaczenia-save",pg="ostrze-switu-save";class mg{constructor(t,e={}){this.canvas=t,this.options=e,this.state="title",this.clock=new i0,this.time=0,this.npcs=[],this.kills=0,this.autosaveTimer=0,this.lastRegion=null,this.titleAngle=0,this.running=!1,this._initRenderer(),this._initScene(),this._initGame(),this._bindInput(),this._bindResize()}_initRenderer(){if(this.options.renderer){this.renderer=this.options.renderer;return}this.renderer=new qm({canvas:this.canvas,antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(2,window.devicePixelRatio||1)),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=el,this.renderer.toneMapping=il,this.renderer.toneMappingExposure=1.4,this.renderer.outputColorSpace=ti}_initScene(){this.scene=new Xm,this.scene.fog=new Sr("#b9d2dc",90,330),this.camera=new ei(62,window.innerWidth/window.innerHeight,.12,900),this.camera.position.set(0,12,58),this.hemi=new Zm("#cfe0ea","#4a4433",.9),this.scene.add(this.hemi),this.sun=new t0("#fff3d6",1.8),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(2048,2048),this.sun.shadow.camera.near=1,this.sun.shadow.camera.far=300,this.sun.shadow.camera.left=-60,this.sun.shadow.camera.right=60,this.sun.shadow.camera.top=60,this.sun.shadow.camera.bottom=-60,this.sun.shadow.bias=-6e-4,this.sun.shadow.normalBias=.045,this.scene.add(this.sun),this.sun.target.position.set(0,0,0),this.scene.add(this.sun.target),this.ambient=new e0("#4a5468",.45),this.scene.add(this.ambient),this.sky=new B0(this.scene);const t=new Te,e=1400,i=new Float32Array(e*3);for(let n=0;n<e;n++){const s=Math.random()*Math.PI*2,o=Math.acos(Math.random()*1.4-.4),r=320;i[n*3]=Math.sin(o)*Math.cos(s)*r,i[n*3+1]=Math.abs(Math.cos(o))*r*.85+30,i[n*3+2]=Math.sin(o)*Math.sin(s)*r}t.setAttribute("position",new Ae(i,3)),this.stars=new kl(t,new Er({color:"#dfe8ff",size:1.7,transparent:!0,opacity:0,fog:!1,depthWrite:!1})),this.stars.frustumCulled=!1,this.scene.add(this.stars),this.cameraRig=new tg(this.camera),this.cameraRig.yaw=0}_ensureCompanion(){if(this.companion&&this.companion.group&&this.companion.group.parent)return this.companion._placeNearPlayer(!0),this.companion;if(this.companion)try{this.scene.remove(this.companion.group)}catch{}return this.companion=new q0(this),this.scene.add(this.companion.group),this.companion}_initGame(){this.dayNight=new c0(8.5),this.audio=new fg,this.fx=new Q0(this.scene),this.player=new go(this),this.player.group.rotation.y=this.player.yaw,this.scene.add(this.player.group),this._ensureCompanion(),this.world=new F0(this),this.enemies=new J0(this),this.quests=new xo(this),this.ui=new ug(this,document.getElementById("ui")),this.dialogue=new yo(this);for(const[t,e]of Object.entries(Ji))this.npcs.push(new X0(this,t,e));this.npcs.forEach(t=>{t.id==="duch"&&t.setVisible(!1)}),this.ui.showTitle(),this.ui.hud.style.display="none",this.dayNight.apply(),this._updateLighting(),this.input=new n0(this.canvas)}_bindInput(){this.input.on((t,e)=>{t==="keydown"&&this._onKeyDown(e),t==="mousedown"&&e===0&&this.state==="playing"&&this.player.attack(),t==="lockchange"&&!e&&this.state==="playing"&&this.ui.anyPanelOpen()})}_onKeyDown(t){if(this.state==="title"){t==="Enter"&&(this.audio.unlock(),localStorage.getItem(Mo)?this.loadGame():this.startNew());return}if(t==="Escape"){if(this.ui.dialogueOpen){this.dialogue.close();return}if(this.ui.infoOpen){this.ui.hideInfo(),this.state==="playing"&&this.pauseGame();return}if(this.ui.anyPanelOpen()){this.ui.closePanels();return}this.state==="playing"?this.pauseGame():this.state==="ui"&&!this.ui.anyScreenOpen()?this.resumeFromUi():this.state==="ui"&&!this.ui.pauseScreen.classList.contains("hidden")&&this.resumeFromUi();return}if(this.state==="playing")switch(t){case"KeyI":case"Tab":this.ui.openHero("inventory");break;case"KeyC":this.ui.openHero("character");break;case"KeyK":this.ui.openHero("quests");break;case"KeyM":this.ui.openMap();break;case"KeyF":this.interact();break;case"KeyQ":this.player.castSpell(0);break;case"KeyE":this.player.castSpell(1);break;case"KeyR":this.player.castSpell(2);break;case"Space":this.player.dodge();break;case"Digit1":this.useQuickSlot(0);break;case"Digit2":this.useQuickSlot(1);break}}_bindResize(){window.addEventListener("resize",()=>{this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)})}startNew(){this.audio.unlock(),this.scene.remove(this.player.group),this.player=new go(this),this.player.yaw=Math.PI,this.scene.add(this.player.group),this._ensureCompanion(),this.quests=new xo(this),this.dialogue=new yo(this),this.enemies.reset(),this.fx.clear(),this.kills=0;const t=this.player.inventory;t.gold=25,t.add("rusty_sword",1),t.equip("rusty_sword"),t.add("leather_vest",1),t.equip("leather_vest"),t.add("health_potion",3),t.add("bread",2),this.player.recalc(),this.player.hp=this.player.maxHP,this.player.mana=this.player.maxMana,this.player.stamina=this.player.maxStamina,this.player.pos.set(2,j(2,342),342),this.player.yaw=Math.PI,this.player.syncModel(),this.dayNight.setHour(8.5),this.cameraRig.yaw=0,this.cameraRig.pitch=.2,this.cameraRig.initialized=!1,this.npcs.forEach(e=>e.setVisible(e.id!=="duch")),this.world.interactables.forEach(e=>{if(e.kind==="chest"&&(e.data.looted=!1,e.mesh)){e.mesh.visible=!0;const i=e.mesh.userData?.lid;i&&(i.rotation.z=Math.PI/2,i.rotation.y=Math.PI/2,i.position.y=.55),e.mesh.userData?.glow&&(e.mesh.userData.glow.visible=!0)}e.available=!0}),this.state="playing",this.ui.hideTitle(),this.ui.hud.style.display="",this.ui.hideDeath(),this.ui.refreshHud(),this.ui.showLocation("Wilcza Dolina","Wioska pod Mgłą"),this.ui.log("Kael budzi się przy bramie Wilczej Doliny. Stary Eryn czeka przy ognisku.","gold"),this.ui.toast("Wilcza Dolina","Idź do ogniska i porozmawiaj z Eryn"),this.input.enabled=!0,this.saveGame(),this.lastRegion="village"}pauseGame(){this.state==="playing"&&(this.state="ui",this.ui.showPause(),this.input.exitLock())}openUI(){this.state==="playing"&&(this.state="ui",this.input.exitLock())}resumeFromUi(){this.ui.anyPanelOpen()||this.ui.dialogueOpen||this.ui.deathScreen.classList.contains("hidden")&&this.ui.victoryScreen.classList.contains("hidden")&&(this.ui.hidePause(),this.state="playing",this.input.enabled=!0,this.clock.getDelta())}returnToTitle(){this.saveGame(),this.state="title",this.ui.hidePause(),this.ui.hideDeath(),this.ui.hideVictory(),this.ui.closePanels(),this.ui.hideDialogue(),this.ui.hud.style.display="none",this.ui.showTitle(),this.input.exitLock()}start(){this.running=!0,this.clock.start();const t=()=>{requestAnimationFrame(t),this.tick()};t()}tick(){const t=Math.min(.05,this.clock.getDelta());this.time+=t,this.state==="playing"?this.updateGame(t):this.state==="dead"?(this.player.update(t,null),this.fx.update(t),this.enemies.list.forEach(e=>e.update(t)),this._updateCamera(t)):this.state==="title"?this._titleCamera(t):this.state==="ui"||this.state,this.state!=="title"&&this.ui.update(t),this.renderer.render(this.scene,this.camera)}updateGame(t){const e=this.input.consumeMouse();if(e.x!==0||e.y!==0){const i=this.input.locked?.0022:.0042;this.cameraRig.look(e.x,e.y,i)}this.dayNight.update(t),this._updateLighting(),this.player.update(t,this.input),this.companion?.update(t),this.enemies.update(t),this.world.update(t,this.time,this.player.pos),this.fx.update(t);for(const i of this.npcs)i.update(t,this.player);this.npcs.forEach(i=>{if(i.id==="duch"){const n=this.quests.questDone("barrow")||this.quests.active==="forge"||this.quests.active==="boss";i.setVisible(n&&ne(this.player.pos.x,this.player.pos.z,i.pos.x,i.pos.z)<40)}}),this._updateCamera(t),this._updateInteractions(),this._updateRegion(),this.player.sprinting&&Math.hypot(this.player.vel.x,this.player.vel.z)>3&&this.audio.step(),this.player.hp<=0&&this.state,this.autosaveTimer+=t,this.autosaveTimer>50&&(this.autosaveTimer=0,this.saveGame())}_updateCamera(t){const e=Math.hypot(this.player.vel.x,this.player.vel.z);this.cameraRig.colliders=this.world?.colliders??null,this.cameraRig.update(t,this.player.pos,e),this.player&&!this.player.dead&&(this.player.model.visible=this.cameraRig.currentDistance>1.75)}_titleCamera(t){this.titleAngle+=t*.045;const e=46,i=Math.cos(this.titleAngle)*e,n=350+Math.sin(this.titleAngle)*e;this.camera.position.set(i,j(i,n)+9.5,n),this.camera.lookAt(0,j(0,350)+3.4,350),this.dayNight.update(t),this._updateLighting(),this.fx.update(t),this.world.update(t,this.time,this.camera.position),this.ui.setClock(this.dayNight.clockString,this.dayNight.isNight)}_updateLighting(){const t=this.dayNight,e=this.player?.pos??new C,i=t.sunDir.clone();i.y<.16&&(i.y=.16+Math.abs(i.y)*.45),i.normalize(),this.sun.position.set(e.x+i.x*70,e.y+Math.max(16,i.y*80),e.z+i.z*70),this.sun.target.position.set(e.x,e.y,e.z),this.sun.target.updateMatrixWorld(),this.sun.color.copy(t.sunColor),this.sun.intensity=t.sunIntensity,this.hemi.color.copy(t.ambientColor),this.hemi.groundColor.set(t.nightF>.5?"#161c24":"#3a3428"),this.hemi.intensity=t.ambientIntensity,this.ambient.intensity=.18+t.ambientIntensity*.3;const n=H0(t);this.sky.update(n.top,n.horizon),this.scene.fog&&(this.scene.fog.color.set(n.horizon).lerp(t.fogColor,.45),this.scene.fog.near=t.nightF>.6?36:90,this.scene.fog.far=t.nightF>.6?150:330),this.stars.material.opacity=ie(t.nightF*1.05,0,.95),this.player?.lantern&&(this.player.lantern.intensity=3.6*ie(t.nightF*1.2,0,1)),this.stars.position.set(e.x,0,e.z),this.ui?.setClock(t.clockString,t.isNight)}_updateInteractions(){if(this.ui.dialogueOpen||this.ui.anyPanelOpen()){this.ui.setInteract(null);return}const t=this._nearestNpc();if(t){this.pendingInteract={type:"npc",npc:t},this.ui.setInteract(`Rozmawiaj: ${t.name}`);return}const e=this.world.findNearest(this.player.pos);if(e){this.pendingInteract={type:"node",node:e},this.ui.setInteract(e.label);return}this.pendingInteract=null,this.ui.setInteract(null)}_nearestNpc(){let t=null,e=1/0;for(const i of this.npcs){if(!i.visible)continue;const n=ne(i.pos.x,i.pos.z,this.player.pos.x,this.player.pos.z);n<(i.radius??4)&&n<e&&(t=i,e=n)}return t}_updateRegion(){const t=this.player.pos,e=[{id:"village",...X.village,r:58},{id:"trading",...X.trading,r:36},{id:"forge",...X.forge,r:26},{id:"bandits",...X.bandits,r:26},{id:"barrow",...X.barrow,r:30},{id:"ruins",...X.ruins,r:36},{id:"quarry",...X.quarry,r:24},{id:"lake",...X.lake,r:90},{id:"castle",...X.castle,r:40},{id:"hermit",...X.hermit,r:26},{id:"swamp",...X.swamp,r:90},{id:"pass",...X.pass,r:40},{id:"circle",...X.circle,r:24},{id:"mine",...X.mine,r:22},{id:"crossroads",...X.crossroads,r:18}];let i=null;for(const s of e)if(ne(t.x,t.z,s.x,s.z)<s.r){i=s;break}const n=i?.id??"wild";if(n!==this.lastRegion)if(this.lastRegion=n,i)this.ui.showLocation(i.name,i.sub);else{const s=this.player.pos.y;this.ui.showLocation(s>120?"Górskie granie":"Dzicz","Wilcza Dolina i okolice")}}interact(){if(this.state!=="playing")return;const t=this._nearestNpc();if(t){this.dialogue.start(t.id),this.pendingInteract=null;return}const e=this.world.findNearest(this.player.pos);e&&this._useNode(e)}_useNode(t){const e=this.player,i=e.inventory;if(t.kind==="station"){this.ui.openCrafting(t.data.station);return}if(t.kind==="sign"){this.ui.openMap();return}if(t.kind==="rest"){this.restAtCampfire();return}if(t.kind==="shrine"){const n=t.data.cost??20;if(i.gold<n){this.ui.log(`Kapliczka milczy. Potrzebujesz ${n} złota.`,"warn");return}i.gold-=n,e.hp=e.maxHP,e.mana=e.maxMana,e.gainXp(40),this.fx.magicBurst(new C(t.pos.x,t.pos.y+1.6,t.pos.z),"#7fe8d0"),this.ui.log("Kapliczka przyjmuje ofiarę. Światło wypełnia twoje ciało. (+40 PD)","good"),this.audio.quest(),this.ui.refreshHud();return}if(t.kind==="resource"){if(this.world.harvest(t)){const n=t.data.item;i.add(n,t.data.qty??1),this.ui.log(`Zebrano: ${Me[n]?.name??n} ×${t.data.qty??1}`,"good"),this.audio.coin(),this.fx.burst(new C(t.pos.x,t.pos.y+.5,t.pos.z),{color:"#cfe08a",count:8,speed:1.6,up:2,life:.6}),this.quests.evaluate(!0),this.ui.refreshHud(),this.ui.anyPanelOpen()&&this.ui.renderInventory?.()}return}if(t.kind==="chest")if(t.data.looted)this.ui.log("Skrzynia jest pusta.","warn");else{t.data.looted=!0;const n=[];for(const[s,o]of t.data.loot??[])s==="gold"?(i.gold+=o,n.push(`${o} złota`)):(i.add(s,o),n.push(`${Me[s]?.name??s}${o>1?` ×${o}`:""}`));if(this.ui.toast("Skrzynia otwarta",n.join(" · ")),this.ui.log(`Skrzynia: ${n.join(", ")}`,"gold"),this.audio.coin(),this.fx.burst(new C(t.pos.x,t.pos.y+.8,t.pos.z),{color:"#ffd27a",count:18,speed:2.6,up:3,life:.8}),this.quests.evaluate(!0),this.ui.refreshHud(),t.mesh){const s=t.mesh.userData?.lid;s&&(s.rotation.z=Math.PI/2-1.15,s.position.y=.78),t.mesh.userData?.glow&&(t.mesh.userData.glow.visible=!1)}}}restAtCampfire(){const t=this.player;this.dayNight.skipTo(6.6),t.hp=t.maxHP,t.mana=t.maxMana,t.stamina=t.maxStamina,t.recalc(),this.world.nodes.forEach(e=>{e.kind==="resource"&&!e.data?.once&&(e.available=!0,e.timer=0,e.mesh&&(e.mesh.visible=!0))}),this.enemies.reset(),t.invuln=2,this.ui.log("Odpoczywałeś przy ognisku do świtu. Rany się zagoiły.","good"),this.ui.toast("Świt","Odpoczynek przywrócił siły"),this.ui.refreshHud(),this.fx.heal(t.pos,"#ffcf7a"),this.saveGame()}damageEnemiesInRadius(t,e,i,n="Zaklęcie"){let s=0;for(const o of this.enemies.list){if(!o.active||o.dead)continue;const r=ne(o.pos.x,o.pos.z,t.x,t.z);if(r>e+o.radius)continue;const c=1-ie(r/(e*1.4),0,.55);o.takeDamage(i*c,{magic:!0,knockback:2.5}),s+=1}return s}combatAlert(t){for(const e of this.enemies.list)e===t||e.dead||!e.active||e.aggro||e.type===t.type&&ne(e.pos.x,e.pos.z,t.pos.x,t.pos.z)<13&&(e.aggro=!0,e.state="chase")}onEnemyAggro(t){t.boss?(this.ui.log("„Kaldras: Kolejny z rodu Kaelów. Jak twój ojciec.”","bad"),this.game?.audio?.growl?.(),this.audio.growl()):t.def.model==="wolf"&&this.audio.growl()}onNightCreatureFade(t){this.ui.log("Wieszczka rozpływa się wraz ze świtem.","warn")}onEnemyKilled(t){this.kills+=1,this.player.totalKills+=1;const e=this.player,i=e.inventory,n=t.def.xp??20,s=1+Math.max(0,t.level-t.def.level)*.12;e.gainXp(Math.round(n*s));const[o,r]=t.def.gold??[0,0],c=Math.round(o+Math.random()*(r-o));c>0&&(i.gold+=c,this.ui.log(`+${c} złota`,"gold"));const l=[];for(const h of t.def.loot??[])Math.random()<=h.chance&&(i.add(h.id,1),l.push(Me[h.id]?.name??h.id));l.length&&this.ui.log(`Łup: ${l.join(", ")}`,"good"),this.quests.onKill(t.type),this.quests.active==="boss"&&this.quests.canComplete("boss")&&setTimeout(()=>{this.quests.active==="boss"&&this.quests.complete("boss")},1400),t.boss?(this.bossDefeated=!0,this.ui.toast("Kaldras pokonany","Mgliste Wrota zamknięte"),this.audio.victory(),this.cameraRig.addShake(1.2),this.fx.magicBurst(t.pos.clone().add(new C(0,2,0)),"#ffd27a")):t.elite&&(this.ui.toast(`${t.name} pokonany`,""),this.audio.questComplete()),this.ui.refreshHud()}onLevelUp(t){this.audio.levelUp(),this.ui.toast(`Poziom ${t}`,"+3 punkty atrybutów — naciśnij C"),this.ui.log(`Awans na poziom ${t}! Otrzymujesz 3 punkty atrybutów.`,"gold"),this.fx.magicBurst(this.player.pos.clone().add(new C(0,1,0)),"#ffe3a8"),this.ui.refreshHud()}onQuestCompleted(t){this.saveGame(),t==="boss"&&setTimeout(()=>{(this.state==="playing"||this.state==="ui")&&(this.state="victory",this.input.exitLock(),this.ui.showVictory({level:this.player.level,xp:Math.round(this.player.xp),gold:Math.floor(this.player.inventory.gold),kills:this.kills,quests:this.quests.completed.size}))},1800)}onPlayerDeath(){if(this.state!=="playing")return;this.state="dead";const t=Math.floor(this.player.inventory.gold*.1);this.player.inventory.gold-=t,this.ui.log("Mgła cię zabrała. Budzisz się w wiosce.","bad"),this.ui.showDeath(t),this.audio.death(),this.input.exitLock(),this.cameraRig.addShake(.6)}respawnPlayer(){this.player.respawn(),this.ui.hideDeath(),this.state="playing",this.ui.refreshHud(),this.ui.log("Wracasz do Wilczej Doliny. Blizny zostaną.","warn");for(const t of this.enemies.list)t.aggro=!1;this.enemies.projectiles.length=0}buyItem(t,e){const i=Me[e];if(!i)return;const n=Math.round(i.value*1.5),s=this.player.inventory;if(s.gold<n){this.ui.log("Za mało złota.","warn");return}if(!s.add(e,1)){this.ui.log("Torba jest pełna.","warn");return}s.gold-=n,this.audio.coin(),this.ui.log(`Kupiono: ${i.name} (-${n} złota)`,"good"),this.ui.refreshHud()}sellItem(t){const e=Me[t],i=this.player.inventory;if(!e||!i.has(t))return;if(i.isEquipped(t)){this.ui.log("Najpierw zdejmij ten przedmiot.","warn");return}const n=Math.max(1,Math.round(e.value*.45));i.remove(t,1),i.gold+=n,this.audio.coin(),this.ui.log(`Sprzedano: ${e.name} (+${n} złota)`,"good"),this.ui.refreshHud()}craftItem(t,e="village"){const i=Bl.find(o=>o.id===t);if(!i)return;const n=this.player.inventory,s=e==="ancient"||e==="ancient_forge";if(i.legendary&&!s){this.ui.log("Klingę Świtu można wykować tylko w Starożytnej Kuźni na Kowalskiej Górze.","warn");return}for(const[o,r]of Object.entries(i.mats))if(!n.has(o,r)){this.ui.log(`Brakuje: ${Me[o]?.name??o}.`,"warn");return}if(n.gold<i.cost){this.ui.log("Za mało złota na pracę kowala.","warn");return}for(const[o,r]of Object.entries(i.mats))n.remove(o,r);n.gold-=i.cost,n.add(i.out.id,i.out.qty),this.audio.questComplete(),this.ui.toast("Wykuto",`${Me[i.out.id].name}${i.out.qty>1?` ×${i.out.qty}`:""}`),this.ui.log(`Wykowano: ${i.out.id?Me[i.out.id].name:i.name}`,"gold"),this.fx.magicBurst(this.player.pos.clone().add(new C(0,1,0)),i.legendary?"#ffd27a":"#ff9a45"),this.quests.evaluate(!0),this.ui.refreshHud(),this.saveGame()}useQuickSlot(t){const i=this.player.inventory.consumables()[t];if(!i){this.ui.log("Brak mikstur w tym slocie.","warn");return}this.player.useItem(i.id)&&this.ui.refreshHud()}questTargetPos(){const t=this.quests,e=t.activeQuest;if(!e)return t.availableQuest()?new C(Ji.eryn.pos[0],0,Ji.eryn.pos[1]):null;if(t.canComplete()){const n=Ji[e.giver]??Ji.eryn;return new C(n.pos[0],0,n.pos[1])}const i=e.objectives.find(n=>!t.objectiveState(n).done);if(!i)return null;if(i.type==="talk"){const n=Ji[i.npc];return n?new C(n.pos[0],0,n.pos[1]):null}if(i.type==="kill"){let n=null,s=1/0;for(const c of this.enemies.list){if(c.dead||!c.active||c.type!==i.enemy)continue;const l=ne(c.pos.x,c.pos.z,this.player.pos.x,this.player.pos.z);l<s&&(s=l,n=c)}if(n)return new C(n.pos.x,0,n.pos.z);const r={wolf:X.village,bandit:X.bandits,bandit_leader:X.bandits,skeleton:X.barrow,wraith:X.barrow,kaldras:X.ruins,wolf_alpha:X.village,bog_lurker:X.swamp,stone_golem:X.circle,mine_guard:X.mine,castle_wraith:X.castle,wolf_rider:X.pass}[i.enemy];return r?new C(r.x,0,r.z):null}if(i.type==="collect"){const s={stolen_grain:X.bandits,shard_dawn:X.barrow,ancient_metal:X.quarry}[i.item]??X.village;return new C(s.x,0,s.z)}if(i.type==="own"){this.player.pos;const n={x:-8.6,z:21.6};return new C(n.x,0,n.z)}return null}saveGame(t=!1){if(!(!this.player||this.state==="title")&&!(this.player.dead&&!t))try{const e={version:1,savedAt:Date.now(),player:this.player.serialize(),quests:this.quests.serialize(),hour:this.dayNight.hour,day:this.dayNight.day,kills:this.kills};localStorage.setItem(Mo,JSON.stringify(e)),t&&(this.ui.toast("Zapisano","Postęp bezpieczny"),this.ui.log("Gra zapisana.","good"))}catch(e){console.warn("Nie udało się zapisać gry",e)}}loadGame(){const t=localStorage.getItem(Mo)??localStorage.getItem(pg);if(!t){this.startNew();return}let e;try{e=JSON.parse(t)}catch{this.startNew();return}this.audio.unlock(),this.scene.remove(this.player.group),this.player=new go(this),this.scene.add(this.player.group),this._ensureCompanion(),this.player.load(e.player),this.player.hp<=0&&(this.player.hp=Math.max(1,Math.round(this.player.maxHP*.5))),this.quests=new xo(this),this.quests.load(e.quests),this.dialogue=new yo(this),this.enemies.reset(),this.fx.clear(),this.kills=e.kills??0,this.dayNight.setHour(e.hour??8.5),this.dayNight.day=e.day??1,this.cameraRig.initialized=!1,this.cameraRig.yaw=this.player.yaw-Math.PI,this.state="playing",this.ui.hideTitle(),this.ui.hud.style.display="",this.ui.hideDeath(),this.ui.refreshHud(),this.ui.log("Wracasz do Wilczej Doliny.","gold"),this.ui.toast("Kontynuacja","Witaj z powrotem, Kaelu"),this.input.enabled=!0,this._updateLighting()}}const Ss=document.getElementById("loading"),gg=document.getElementById("scene");function Hl(a){console.error(a),Ss&&(Ss.innerHTML=`
    <div class="loading-inner">
      <div class="loading-sigil" style="color:#c1443a">⚠</div>
      <h1>Coś poszło nie tak</h1>
      <p class="loading-sub">${String(a?.message??a)}</p>
      <p style="color:#8a8478;font-size:12px;line-height:1.7">
        Gra potrzebuje przeglądarki z obsługą WebGL 2.<br/>
        Spróbuj odświeżyć stronę lub włączyć akcelerację sprzętową.
      </p>
    </div>`,Ss.classList.remove("hidden"))}async function vg(){await new Promise(e=>requestAnimationFrame(()=>setTimeout(e,70)));const a=document.querySelector(".loading-sub");a&&(a.textContent="Budzenie Wilczej Doliny…");let t;try{t=new mg(gg)}catch(e){Hl(e);return}window.__game=t,a&&(a.textContent="Rysowanie mapy okolic…"),await new Promise(e=>setTimeout(e,30));try{t.ui._ensureMap()}catch(e){console.warn("Mapa nie została wygenerowana",e)}t.start(),setTimeout(()=>{Ss.classList.add("hidden"),setTimeout(()=>Ss.remove(),900)},420),window.addEventListener("beforeunload",()=>{t.state!=="title"&&t.saveGame()}),document.addEventListener("visibilitychange",()=>{document.hidden&&t.state==="playing"&&t.pauseGame()})}window.addEventListener("error",a=>{window.__game||Hl(a.error??a.message)});vg();
