import{r as w,j as e,s as re,g as ne,m as N}from"./index-vcAYm6vD.js";import{N as Se}from"./Navigation-CkWS-LtT.js";import{F as Ce}from"./Footer-BiycIaLE.js";import{W as Ee,V as le,C as Re,S as Te,O as Pe,a as Ne,G as je,P as ke,M as Ae,E as ce,R as ue,b as de,c as pe,U as q,d as Fe,T as Me,L as me}from"./index-CaKo3lIy.js";import{C as Ie,a as ze,D as Be}from"./dumbbell-lPHRCT9P.js";import{H as Le}from"./heart-DhFCiI6H.js";import{C as qe}from"./cpu-Cj_wAsrn.js";import{T as De}from"./theater-DQn9N5p0.js";import{B as _e}from"./beaker-cgrZVnmB.js";import{B as he}from"./book-open-Cck4FFnk.js";import{A as He}from"./arrow-up-DqqWJMn0.js";import"./button-variants-BtDv6DLU.js";import"./useTranslation-FKcwN8er.js";import"./house-ClAQJ8-A.js";import"./users-DshTqfGB.js";import"./calendar-Cyjlwh6t.js";import"./building-C8rHFNgL.js";import"./graduation-cap-P36faES5.js";import"./camera-Bc_Ov7XJ.js";import"./trophy-B-XvrowL.js";import"./chevron-down-D_kuZwQK.js";import"./globe-BWhPOJAF.js";import"./bell-D_AoMh8q.js";import"./phone-CcjDqeo4.js";import"./mail-MYJrtdEn.js";import"./award-Bdl_Spfw.js";import"./map-pin-WXVSP-9y.js";import"./minus-D_KMDVYG.js";import"./plus-CSXBcpgr.js";const Ve=()=>{const r=document.createElement("canvas");r.width=64,r.height=64;const l=r.getContext("2d");if(!l)throw new Error("2D context not available");l.fillStyle="black",l.fillRect(0,0,r.width,r.height);const b=new Me(r);b.minFilter=me,b.magFilter=me,b.generateMipmaps=!1;const S=[];let g=null;const h=64;let C=.1*64;const s=1/h,c=()=>{l.fillStyle="black",l.fillRect(0,0,r.width,r.height)},m=i=>{const u={x:i.x*64,y:(1-i.y)*64};let f=1;const M=y=>Math.sin(y*Math.PI/2),j=y=>-y*(y-2);i.age<h*.3?f=M(i.age/(h*.3)):f=j(1-(i.age-h*.3)/(h*.7))||0,f*=i.force;const R=`${(i.vx+1)/2*255}, ${(i.vy+1)/2*255}, ${f*255}`,T=64*5;l.shadowOffsetX=T,l.shadowOffsetY=T,l.shadowBlur=C,l.shadowColor=`rgba(${R},${.22*f})`,l.beginPath(),l.fillStyle="rgba(255,0,0,1)",l.arc(u.x-T,u.y-T,C,0,Math.PI*2),l.fill()};return{canvas:r,texture:b,addTouch:i=>{let u=0,f=0,M=0;if(g){const j=i.x-g.x,R=i.y-g.y;if(j===0&&R===0)return;const T=j*j+R*R,y=Math.sqrt(T);f=j/(y||1),M=R/(y||1),u=Math.min(T*1e4,1)}g={x:i.x,y:i.y},S.push({x:i.x,y:i.y,age:0,force:u,vx:f,vy:M})},update:()=>{c();for(let i=S.length-1;i>=0;i--){const u=S[i],f=u.force*s*(1-u.age/h);u.x+=u.vx*f,u.y+=u.vy*f,u.age++,u.age>h&&S.splice(i,1)}for(let i=0;i<S.length;i++)m(S[i]);b.needsUpdate=!0},set radiusScale(i){C=.1*64*i},get radiusScale(){return C/(.1*64)},size:64}},Oe=(F,r)=>{const l=`
    uniform sampler2D uTexture;
    uniform float uStrength;
    uniform float uTime;
    uniform float uFreq;

    void mainUv(inout vec2 uv) {
      vec4 tex = texture2D(uTexture, uv);
      float vx = tex.r * 2.0 - 1.0;
      float vy = tex.g * 2.0 - 1.0;
      float intensity = tex.b;

      float wave = 0.5 + 0.5 * sin(uTime * uFreq + intensity * 6.2831853);

      float amt = uStrength * intensity * wave;

      uv += vec2(vx, vy) * amt;
    }
    `;return new pe("LiquidEffect",l,{uniforms:new Map([["uTexture",new q(F)],["uStrength",new q((r==null?void 0:r.strength)??.025)],["uTime",new q(0)],["uFreq",new q((r==null?void 0:r.freq)??4.5)]])})},fe={square:0,circle:1,triangle:2,diamond:3},Ue=`
void main() {
  gl_Position = vec4(position, 1.0);
}
`,Ge=`
precision highp float;

uniform vec3  uColor;
uniform vec2  uResolution;
uniform float uTime;
uniform float uPixelSize;
uniform float uScale;
uniform float uDensity;
uniform float uPixelJitter;
uniform int   uEnableRipples;
uniform float uRippleSpeed;
uniform float uRippleThickness;
uniform float uRippleIntensity;
uniform float uEdgeFade;

uniform int   uShapeType;
const int SHAPE_SQUARE   = 0;
const int SHAPE_CIRCLE   = 1;
const int SHAPE_TRIANGLE = 2;
const int SHAPE_DIAMOND  = 3;

const int   MAX_CLICKS = 10;

uniform vec2  uClickPos  [MAX_CLICKS];
uniform float uClickTimes[MAX_CLICKS];

out vec4 fragColor;

float Bayer2(vec2 a) {
  a = floor(a);
  return fract(a.x / 2. + a.y * a.y * .75);
}
#define Bayer4(a) (Bayer2(.5*(a))*0.25 + Bayer2(a))
#define Bayer8(a) (Bayer4(.5*(a))*0.25 + Bayer2(a))

#define FBM_OCTAVES     5
#define FBM_LACUNARITY  1.25
#define FBM_GAIN        1.0

float hash11(float n){ return fract(sin(n)*43758.5453); }

float vnoise(vec3 p){
  vec3 ip = floor(p);
  vec3 fp = fract(p);
  float n000 = hash11(dot(ip + vec3(0.0,0.0,0.0), vec3(1.0,57.0,113.0)));
  float n100 = hash11(dot(ip + vec3(1.0,0.0,0.0), vec3(1.0,57.0,113.0)));
  float n010 = hash11(dot(ip + vec3(0.0,1.0,0.0), vec3(1.0,57.0,113.0)));
  float n110 = hash11(dot(ip + vec3(1.0,1.0,0.0), vec3(1.0,57.0,113.0)));
  float n001 = hash11(dot(ip + vec3(0.0,0.0,1.0), vec3(1.0,57.0,113.0)));
  float n101 = hash11(dot(ip + vec3(1.0,0.0,1.0), vec3(1.0,57.0,113.0)));
  float n011 = hash11(dot(ip + vec3(0.0,1.0,1.0), vec3(1.0,57.0,113.0)));
  float n111 = hash11(dot(ip + vec3(1.0,1.0,1.0), vec3(1.0,57.0,113.0)));
  vec3 w = fp*fp*fp*(fp*(fp*6.0-15.0)+10.0);
  float x00 = mix(n000, n100, w.x);
  float x10 = mix(n010, n110, w.x);
  float x01 = mix(n001, n101, w.x);
  float x11 = mix(n011, n111, w.x);
  float y0  = mix(x00, x10, w.y);
  float y1  = mix(x01, x11, w.y);
  return mix(y0, y1, w.z) * 2.0 - 1.0;
}

float fbm2(vec2 uv, float t){
  vec3 p = vec3(uv * uScale, t);
  float amp = 1.0;
  float freq = 1.0;
  float sum = 1.0;
  for (int i = 0; i < FBM_OCTAVES; ++i){
    sum  += amp * vnoise(p * freq);
    freq *= FBM_LACUNARITY;
    amp  *= FBM_GAIN;
  }
  return sum * 0.5 + 0.5;
}

float maskCircle(vec2 p, float cov){
  float r = sqrt(cov) * .25;
  float d = length(p - 0.5) - r;
  float aa = 0.5 * fwidth(d);
  return cov * (1.0 - smoothstep(-aa, aa, d * 2.0));
}

float maskTriangle(vec2 p, vec2 id, float cov){
  bool flip = mod(id.x + id.y, 2.0) > 0.5;
  if (flip) p.x = 1.0 - p.x;
  float r = sqrt(cov);
  float d  = p.y - r*(1.0 - p.x);
  float aa = fwidth(d);
  return cov * clamp(0.5 - d/aa, 0.0, 1.0);
}

float maskDiamond(vec2 p, float cov){
  float r = sqrt(cov) * 0.564;
  return step(abs(p.x - 0.49) + abs(p.y - 0.49), r);
}

void main(){
  float pixelSize = uPixelSize;
  vec2 fragCoord = gl_FragCoord.xy - uResolution * .5;
  float aspectRatio = uResolution.x / uResolution.y;

  vec2 pixelId = floor(fragCoord / pixelSize);
  vec2 pixelUV = fract(fragCoord / pixelSize);

  float cellPixelSize = 8.0 * pixelSize;
  vec2 cellId = floor(fragCoord / cellPixelSize);
  vec2 cellCoord = cellId * cellPixelSize;
  vec2 uv = cellCoord / uResolution * vec2(aspectRatio, 1.0);

  float base = fbm2(uv, uTime * 0.05);
  base = base * 0.5 - 0.65;

  float feed = base + (uDensity - 0.5) * 0.3;

  float speed     = uRippleSpeed;
  float thickness = uRippleThickness;
  const float dampT     = 1.0;
  const float dampR     = 10.0;

  if (uEnableRipples == 1) {
    for (int i = 0; i < MAX_CLICKS; ++i){
      vec2 pos = uClickPos[i];
      if (pos.x < 0.0) continue;
      float cellPixelSize = 8.0 * pixelSize;
      vec2 cuv = (((pos - uResolution * .5 - cellPixelSize * .5) / (uResolution))) * vec2(aspectRatio, 1.0);
      float t = max(uTime - uClickTimes[i], 0.0);
      float r = distance(uv, cuv);
      float waveR = speed * t;
      float ring  = exp(-pow((r - waveR) / thickness, 2.0));
      float atten = exp(-dampT * t) * exp(-dampR * r);
      feed = max(feed, ring * atten * uRippleIntensity);
    }
  }

  float bayer = Bayer8(fragCoord / uPixelSize) - 0.5;
  float bw = step(0.5, feed + bayer);

  float h = fract(sin(dot(floor(fragCoord / uPixelSize), vec2(127.1, 311.7))) * 43758.5453);
  float jitterScale = 1.0 + (h - 0.5) * uPixelJitter;
  float coverage = bw * jitterScale;
  float M;
  if      (uShapeType == SHAPE_CIRCLE)   M = maskCircle (pixelUV, coverage);
  else if (uShapeType == SHAPE_TRIANGLE) M = maskTriangle(pixelUV, pixelId, coverage);
  else if (uShapeType == SHAPE_DIAMOND)  M = maskDiamond(pixelUV, coverage);
  else                                   M = coverage;

  if (uEdgeFade > 0.0) {
    vec2 norm = gl_FragCoord.xy / uResolution;
    float edge = min(min(norm.x, norm.y), min(1.0 - norm.x, 1.0 - norm.y));
    float fade = smoothstep(0.0, uEdgeFade, edge);
    M *= fade;
  }

  vec3 color = uColor;
  fragColor = vec4(color, M);
}
`,X=10,Xe=({variant:F="square",pixelSize:r=3,color:l="#D4AF37",className:b,style:S,antialias:g=!0,patternScale:h=2,patternDensity:C=1,liquid:s=!1,liquidStrength:c=.1,liquidRadius:m=1,pixelSizeJitter:E=0,enableRipples:B=!0,rippleIntensityScale:i=1,rippleThickness:u=.1,rippleSpeed:f=.3,liquidWobbleSpeed:M=4.5,autoPauseOffscreen:j=!0,speed:R=.5,transparent:T=!0,edgeFade:y=.5,noiseAmount:H=0})=>{const Y=w.useRef(null),xe=w.useRef({visible:!0}),K=w.useRef(R),p=w.useRef(null),U=w.useRef(null);return w.useEffect(()=>{var $,J,Q;const k=Y.current;if(!k)return;K.current=R;const ve=["antialias","liquid","noiseAmount"],W={antialias:g,liquid:s,noiseAmount:H};let V=!1;if(!p.current)V=!0;else if(U.current){for(const t of ve)if(U.current[t]!==W[t]){V=!0;break}}if(V){if(p.current){const a=p.current;($=a.resizeObserver)==null||$.disconnect(),cancelAnimationFrame(a.raf),(J=a.quad)==null||J.geometry.dispose(),a.material.dispose(),(Q=a.composer)==null||Q.dispose(),a.renderer.dispose(),a.renderer.domElement.parentElement===k&&k.removeChild(a.renderer.domElement),p.current=null}const t=document.createElement("canvas"),I=t.getContext("webgl2",{antialias:g,alpha:!0});if(!I)return;const o=new Ee({canvas:t,context:I,antialias:g,alpha:!0});o.domElement.style.width="100%",o.domElement.style.height="100%",o.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),k.appendChild(o.domElement);const x={uResolution:{value:new le(0,0)},uTime:{value:0},uColor:{value:new Re(l)},uClickPos:{value:Array.from({length:X},()=>new le(-1,-1))},uClickTimes:{value:new Float32Array(X)},uShapeType:{value:fe[F]??0},uPixelSize:{value:r*o.getPixelRatio()},uScale:{value:h},uDensity:{value:C},uPixelJitter:{value:E},uEnableRipples:{value:B?1:0},uRippleSpeed:{value:f},uRippleThickness:{value:u},uRippleIntensity:{value:i},uEdgeFade:{value:y}},D=new Te,L=new Pe(-1,1,1,-1,0,1),Z=new Ne({vertexShader:Ue,fragmentShader:Ge,uniforms:x,transparent:!0,glslVersion:je,depthTest:!1,depthWrite:!1}),ge=new ke(2,2),ee=new Ae(ge,Z);D.add(ee);const te=new Fe,ie=()=>{var v;const a=k.clientWidth||1,n=k.clientHeight||1;o.setSize(a,n,!1),x.uResolution.value.set(o.domElement.width,o.domElement.height),(v=p.current)!=null&&v.composer&&p.current.composer.setSize(o.domElement.width,o.domElement.height),x.uPixelSize.value=r*o.getPixelRatio()};ie();const oe=new ResizeObserver(ie);oe.observe(k);const ae=(()=>{var a;if(typeof window<"u"&&((a=window.crypto)!=null&&a.getRandomValues)){const n=new Uint32Array(1);return window.crypto.getRandomValues(n),n[0]/4294967295}return Math.random()})()*1e3;let d,z,_;if(s){z=Ve(),z.radiusScale=m,d=new ce(o);const a=new ue(D,L);_=Oe(z.texture,{strength:c,freq:M});const n=new de(L,_);n.renderToScreen=!0,d.addPass(a),d.addPass(n)}if(H>0){d||(d=new ce(o),d.addPass(new ue(D,L)));const a=new pe("NoiseEffect","uniform float uTime; uniform float uAmount; float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453);} void mainUv(inout vec2 uv){} void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){ float n=hash(floor(uv*vec2(1920.0,1080.0))+floor(uTime*60.0)); float g=(n-0.5)*uAmount; outputColor=inputColor+vec4(vec3(g),0.0);} ",{uniforms:new Map([["uTime",new q(0)],["uAmount",new q(H)]])}),n=new de(L,a);n.renderToScreen=!0,d&&d.passes.length>0&&d.passes.forEach(v=>v.renderToScreen=!1),d.addPass(n)}d&&d.setSize(o.domElement.width,o.domElement.height);const se=a=>{const n=o.domElement.getBoundingClientRect(),v=o.domElement.width/n.width,P=o.domElement.height/n.height,A=(a.clientX-n.left)*v,be=(n.height-(a.clientY-n.top))*P;return{fx:A,fy:be,w:o.domElement.width,h:o.domElement.height}},ye=a=>{var A;const{fx:n,fy:v}=se(a),P=((A=p.current)==null?void 0:A.clickIx)??0;x.uClickPos.value[P].set(n,v),x.uClickTimes.value[P]=x.uTime.value,p.current&&(p.current.clickIx=(P+1)%X)},we=a=>{if(!z)return;const{fx:n,fy:v,w:P,h:A}=se(a);z.addTouch({x:n/P,y:v/A})};o.domElement.addEventListener("pointerdown",ye,{passive:!0}),o.domElement.addEventListener("pointermove",we,{passive:!0});let O=0;const G=()=>{if(j&&!xe.current.visible){O=requestAnimationFrame(G);return}x.uTime.value=ae+te.getElapsedTime()*K.current,_&&(_.uniforms.get("uTime").value=x.uTime.value),d?(z&&z.update(),d.passes.forEach(a=>{const n=a.effects;n&&n.forEach(v=>{var A;const P=(A=v.uniforms)==null?void 0:A.get("uTime");P&&(P.value=x.uTime.value)})}),d.render()):o.render(D,L),O=requestAnimationFrame(G)};O=requestAnimationFrame(G),p.current={renderer:o,scene:D,camera:L,material:Z,clock:te,clickIx:0,uniforms:x,resizeObserver:oe,raf:O,quad:ee,timeOffset:ae,composer:d,touch:z,liquidEffect:_}}else{const t=p.current;if(t.uniforms.uShapeType.value=fe[F]??0,t.uniforms.uPixelSize.value=r*t.renderer.getPixelRatio(),t.uniforms.uColor.value.set(l),t.uniforms.uScale.value=h,t.uniforms.uDensity.value=C,t.uniforms.uPixelJitter.value=E,t.uniforms.uEnableRipples.value=B?1:0,t.uniforms.uRippleIntensity.value=i,t.uniforms.uRippleThickness.value=u,t.uniforms.uRippleSpeed.value=f,t.uniforms.uEdgeFade.value=y,T?t.renderer.setClearAlpha(0):t.renderer.setClearColor(0,1),t.liquidEffect){const I=t.liquidEffect.uniforms.get("uStrength");I&&(I.value=c);const o=t.liquidEffect.uniforms.get("uFreq");o&&(o.value=M)}t.touch&&(t.touch.radiusScale=m)}return U.current=W,()=>{var I,o,x;if(p.current&&V||!p.current)return;const t=p.current;(I=t.resizeObserver)==null||I.disconnect(),cancelAnimationFrame(t.raf),(o=t.quad)==null||o.geometry.dispose(),t.material.dispose(),(x=t.composer)==null||x.dispose(),t.renderer.dispose(),t.renderer.domElement.parentElement===k&&k.removeChild(t.renderer.domElement),p.current=null}},[g,s,H,r,h,C,B,i,u,f,E,y,T,c,m,M,j,F,l,R]),e.jsx("div",{ref:Y,className:`pixel-blast-container ${b??""}`,style:S,"aria-label":"PixelBlast interactive background"})},Ye=()=>e.jsxs("div",{className:"facilities-banner-wrapper",children:[e.jsx(Xe,{variant:"circle",pixelSize:3,color:"#D4AF37",patternScale:2,patternDensity:1,enableRipples:!0,rippleIntensityScale:1.2,rippleSpeed:.3,speed:.5,edgeFade:.15,transparent:!0,autoPauseOffscreen:!0}),e.jsxs("div",{className:"facilities-banner-content",children:[e.jsxs("h1",{className:"facilities-banner-title",children:["World-Class ",e.jsx("span",{className:"facilities-banner-highlight",children:"Facilities"})]}),e.jsx("p",{className:"facilities-banner-description",children:"Experience learning in state-of-the-art facilities designed to inspire, innovate, and excel in every aspect of education."})]})]}),Ke={BookOpen:he,Beaker:_e,Dumbbell:Be,Theater:De,Cpu:qe,Heart:Le,Coffee:ze,Car:Ie},Rt=()=>{const[F,r]=w.useState([]),[l,b]=w.useState([]),[S,g]=w.useState(!1);w.useEffect(()=>{C();const s=re("royal-academy-facilities",m=>r(m)),c=re("royal-academy-facility-stats",m=>b(m));return()=>{s(),c()}},[]),w.useEffect(()=>{const s=()=>{const c=window.scrollY,m=400,E=window.innerHeight+window.scrollY>=document.body.offsetHeight-1e3;g(c>m||E)};return window.addEventListener("scroll",s),()=>window.removeEventListener("scroll",s)},[]);const h=()=>{window.scrollTo({top:0,behavior:"smooth"})},C=async()=>{try{const s=[{id:"1",icon:"BookOpen",title:"Royal Library",description:"A magnificent 3-story library with over 100,000 books, digital resources, and quiet study spaces.",features:["Digital Archives","Research Stations","Group Study Rooms","Reading Gardens"],image:"bg-gradient-to-br from-blue-600/20 to-purple-600/20"},{id:"2",icon:"Beaker",title:"Science Laboratories",description:"State-of-the-art labs for Biology, Chemistry, Physics, and Environmental Science research.",features:["Advanced Equipment","Safety Systems","Research Facilities","Greenhouse Complex"],image:"bg-gradient-to-br from-green-600/20 to-blue-600/20"},{id:"3",icon:"Cpu",title:"Technology Center",description:"Modern computer labs with latest hardware, robotics workshop, and maker spaces.",features:["3D Printing Lab","Robotics Workshop","Computer Labs","Innovation Studio"],image:"bg-gradient-to-br from-purple-600/20 to-pink-600/20"},{id:"4",icon:"Dumbbell",title:"Athletic Complex",description:"Comprehensive sports facilities including gymnasium, swimming pool, and outdoor fields.",features:["Olympic Pool","Fitness Center","Sports Fields","Indoor Courts"],image:"bg-gradient-to-br from-orange-600/20 to-red-600/20"},{id:"5",icon:"Theater",title:"Performing Arts Center",description:"Professional-grade theater, music halls, and practice rooms for artistic excellence.",features:["Main Theater","Concert Hall","Practice Rooms","Recording Studio"],image:"bg-gradient-to-br from-pink-600/20 to-purple-600/20"},{id:"6",icon:"Heart",title:"Health & Wellness Center",description:"Complete healthcare facility with medical staff, counseling services, and wellness programs.",features:["Medical Clinic","Counseling Center","Wellness Programs","Nutrition Services"],image:"bg-gradient-to-br from-red-600/20 to-pink-600/20"},{id:"7",icon:"Coffee",title:"Student Commons",description:"Central hub for student life with dining facilities, lounges, and collaborative spaces.",features:["Dining Hall","Student Lounges","Collaborative Spaces","Outdoor Terraces"],image:"bg-gradient-to-br from-yellow-600/20 to-orange-600/20"},{id:"8",icon:"Car",title:"Transportation",description:"Safe and reliable transportation services connecting students to the academy.",features:["School Buses","Shuttle Service","Parking Facilities","Bike Storage"],image:"bg-gradient-to-br from-blue-600/20 to-green-600/20"}],c=[{id:"1",value:"150",label:"Acres Campus"},{id:"2",value:"50+",label:"Modern Facilities"},{id:"3",value:"24/7",label:"Security & Support"},{id:"4",value:"100%",label:"WiFi Coverage"}],m=await ne("royal-academy-facilities",s),E=await ne("royal-academy-facility-stats",c);r(m),b(E)}catch(s){console.error("[Facilities] Error loading data:",s)}};return e.jsxs("div",{className:"min-h-screen",children:[e.jsx(Se,{}),e.jsx("div",{className:"pt-20 sm:pt-24",children:e.jsx(Ye,{})}),e.jsx("section",{className:"section-padding bg-gradient-to-r from-royal/5 via-background to-crimson/5",children:e.jsx("div",{className:"container-wide px-4 sm:px-6",children:e.jsx("div",{className:"grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 mb-12 sm:mb-20",children:l.map((s,c)=>e.jsxs(N.div,{initial:{opacity:0,scale:.8},whileInView:{opacity:1,scale:1},whileHover:{scale:1.05,y:-5,rotateY:15},transition:{duration:.3,delay:c*.1,type:"spring",stiffness:300},className:"card-3d p-4 sm:p-8 text-center group cursor-pointer",children:[e.jsx(N.div,{initial:{scale:0},whileInView:{scale:1},transition:{delay:c*.1+.3,type:"spring",stiffness:300},className:"text-2xl sm:text-5xl font-heading font-bold text-gradient-gold mb-2 sm:mb-4",children:s.value}),e.jsx("p",{className:"text-xs sm:text-lg text-muted-foreground",children:s.label})]},s.id))})})}),e.jsx("section",{className:"section-padding bg-gradient-to-b from-background to-muted/20",children:e.jsxs("div",{className:"container-wide px-4 sm:px-6",children:[e.jsxs(N.div,{initial:{opacity:0,y:30},whileInView:{opacity:1,y:0},transition:{duration:.6},className:"text-center mb-12 sm:mb-16",children:[e.jsx("h2",{className:"text-2xl sm:text-4xl font-heading font-bold mb-4 sm:mb-6",children:"Our Facilities"}),e.jsx("p",{className:"text-base sm:text-xl text-muted-foreground px-2 sm:px-0",children:"Discover the spaces where excellence comes to life"})]}),e.jsx("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8",children:F.map((s,c)=>{const m=Ke[s.icon]||he;return e.jsx(N.div,{initial:{opacity:0,y:12},whileInView:{opacity:1,y:0},whileHover:{scale:1.01},transition:{duration:.2,delay:c*.03},className:"card-3d overflow-hidden group cursor-pointer",children:e.jsxs("div",{className:"relative",children:[e.jsxs("div",{className:`h-32 sm:h-44 ${s.image} relative overflow-hidden`,children:[e.jsx("div",{className:"absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"}),e.jsx(N.div,{whileHover:{scale:1.05},transition:{duration:.2},className:"absolute top-3 sm:top-5 left-3 sm:left-5 w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-gold/20 backdrop-blur-md flex items-center justify-center",children:e.jsx(m,{className:"h-6 w-6 sm:h-8 sm:w-8 text-gold"})}),e.jsx(N.div,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},transition:{delay:c*.1+.2},className:"absolute bottom-3 sm:bottom-5 left-3 sm:left-5 right-3 sm:right-5",children:e.jsx("h3",{className:"text-base sm:text-xl font-heading font-bold text-white mb-1",children:s.title})})]}),e.jsxs("div",{className:"p-3 sm:p-5 space-y-2 sm:space-y-3",children:[e.jsx("p",{className:"text-[11px] sm:text-sm text-muted-foreground leading-relaxed",children:s.description}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("h4",{className:"font-semibold text-gold text-xs sm:text-base",children:"Key Features:"}),e.jsx("div",{className:"grid grid-cols-2 gap-1 sm:gap-2",children:s.features.map((E,B)=>e.jsxs(N.div,{initial:{opacity:0,x:-6},whileInView:{opacity:1,x:0},transition:{delay:c*.03+B*.03},className:"flex items-center space-x-2",children:[e.jsx("div",{className:"w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gold"}),e.jsx("span",{className:"text-[11px] sm:text-sm text-muted-foreground",children:E})]},B))})]})]})]})},s.id)})})]})}),e.jsx("section",{className:"section-padding",children:e.jsx("div",{className:"container-wide px-4 sm:px-6",children:e.jsxs(N.div,{initial:{opacity:0,y:30},whileInView:{opacity:1,y:0},whileHover:{scale:1.02},transition:{duration:.6},className:"text-center bg-gradient-to-r from-royal/10 via-crimson/5 to-royal/10 p-8 sm:p-16 rounded-2xl border border-border cursor-pointer",children:[e.jsx("h3",{className:"text-2xl sm:text-4xl font-heading font-bold mb-4 sm:mb-6",children:"Take a Virtual Tour"}),e.jsx("p",{className:"text-base sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto px-2 sm:px-0",children:"Experience our campus from anywhere in the world. Schedule a virtual tour to see our facilities in action."}),e.jsx(N.button,{whileHover:{scale:1.05},whileTap:{scale:.95},className:"btn-hero px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold rounded-lg w-full sm:w-auto",children:"Schedule Virtual Tour"})]})})}),S&&e.jsx(N.button,{initial:{opacity:0,scale:0},animate:{opacity:1,scale:1},exit:{opacity:0,scale:0},onClick:h,className:"fixed bottom-8 right-8 z-50 p-3 rounded-full bg-gold hover:bg-gold/90 text-black shadow-lg hover:shadow-xl transition-all duration-300","aria-label":"Scroll to top",children:e.jsx(He,{className:"h-6 w-6"})}),e.jsx(Ce,{})]})};export{Rt as default};
