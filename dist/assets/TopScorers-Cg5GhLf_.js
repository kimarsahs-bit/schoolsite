var ve=Object.defineProperty;var xe=(r,e,s)=>e in r?ve(r,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):r[e]=s;var l=(r,e,s)=>xe(r,typeof e!="symbol"?e+"":e,s);import{r as v,j as t,m as x,B as _,X as R,A as O,L as we}from"./index-vcAYm6vD.js";import{N as be,A as K}from"./Navigation-CkWS-LtT.js";import{F as ye}from"./Footer-BiycIaLE.js";import{V as b,W as Pe,E as Se,e as Le,S as Ae,F as je,d as ke,R as Fe,b as Q,B as Me,f as Y,g as Ce,h as Te,i as g,P as de,C as M,a as J,D as he,j as w,M as V,k as De,l as Ie,I as me,m as D,n as ee}from"./index-CaKo3lIy.js";import{B as C}from"./book-open-Cck4FFnk.js";import{Z as te}from"./zap-C8pggaKE.js";import{T as se}from"./target-CpfdvN6q.js";import{C as X}from"./crown-CU2Xsw6S.js";import{P as B}from"./plus-CSXBcpgr.js";import{T as oe}from"./trending-up-Dj7ZvY_c.js";import{A as ie}from"./arrow-up-DqqWJMn0.js";import{G as Ne}from"./graduation-cap-P36faES5.js";import{S as re}from"./star-C15iVDB7.js";import{A as ne}from"./award-Bdl_Spfw.js";import{M as ae}from"./medal-C43PF4zz.js";import{T as qe}from"./trophy-B-XvrowL.js";import"./button-variants-BtDv6DLU.js";import"./useTranslation-FKcwN8er.js";import"./house-ClAQJ8-A.js";import"./users-DshTqfGB.js";import"./calendar-Cyjlwh6t.js";import"./building-C8rHFNgL.js";import"./camera-Bc_Ov7XJ.js";import"./chevron-down-D_kuZwQK.js";import"./globe-BWhPOJAF.js";import"./bell-D_AoMh8q.js";import"./phone-CcjDqeo4.js";import"./mail-MYJrtdEn.js";import"./map-pin-WXVSP-9y.js";import"./minus-D_KMDVYG.js";const We={onSpeedUp:()=>{},onSlowDown:()=>{},distortion:"turbulentDistortion",length:400,roadWidth:10,islandWidth:2,lanesPerRoad:4,fov:90,fovSpeedUp:150,speedUp:2,carLightsFade:.4,totalSideLightSticks:20,lightPairsPerRoadWay:40,shoulderLinesWidthPercentage:.05,brokenLinesWidthPercentage:.1,brokenLinesLengthPercentage:.5,lightStickWidth:[.12,.5],lightStickHeight:[1.3,1.7],movingAwaySpeed:[60,80],movingCloserSpeed:[-120,-160],carLightsLength:[400*.03,400*.2],carLightsRadius:[.05,.14],carWidthPercentage:[.3,.5],carShiftX:[-.8,.8],carFloorSeparation:[0,5],colors:{roadColor:526344,islandColor:657930,background:0,shoulderLines:16777215,brokenLines:16777215,leftCars:[14177983,6770850,12732332],rightCars:[242627,941733,3294549],sticks:242627}};function T(r){return Math.sin(r)*.5+.5}const G={uFreq:{value:new g(3,6,10)},uAmp:{value:new g(30,30,20)}},$={uFreq:{value:new b(5,2)},uAmp:{value:new b(25,15)}},H={uFreq:{value:new b(2,3)},uAmp:{value:new b(35,10)}},z={uFreq:{value:new ee(4,8,8,1)},uAmp:{value:new ee(25,5,10,10)}},N={uFreq:{value:new b(4,8)},uAmp:{value:new b(10,20)},uPowY:{value:new b(20,2)}},Ee={mountainDistortion:{uniforms:G,getDistortion:`
      uniform vec3 uAmp;
      uniform vec3 uFreq;
      #define PI 3.14159265358979
      float nsin(float val){
        return sin(val) * 0.5 + 0.5;
      }
      vec3 getDistortion(float progress){
        float movementProgressFix = 0.02;
        return vec3( 
          cos(progress * PI * uFreq.x + uTime) * uAmp.x - cos(movementProgressFix * PI * uFreq.x + uTime) * uAmp.x,
          nsin(progress * PI * uFreq.y + uTime) * uAmp.y - nsin(movementProgressFix * PI * uFreq.y + uTime) * uAmp.y,
          nsin(progress * PI * uFreq.z + uTime) * uAmp.z - nsin(movementProgressFix * PI * uFreq.z + uTime) * uAmp.z
        );
      }
    `,getJS:(r,e)=>{const i=G.uFreq.value,o=G.uAmp.value,a=new g(Math.cos(r*Math.PI*i.x+e)*o.x-Math.cos(.02*Math.PI*i.x+e)*o.x,T(r*Math.PI*i.y+e)*o.y-T(.02*Math.PI*i.y+e)*o.y,T(r*Math.PI*i.z+e)*o.z-T(.02*Math.PI*i.z+e)*o.z),c=new g(2,2,2),d=new g(0,0,-5);return a.multiply(c).add(d)}},xyDistortion:{uniforms:$,getDistortion:`
      uniform vec2 uFreq;
      uniform vec2 uAmp;
      #define PI 3.14159265358979
      vec3 getDistortion(float progress){
        float movementProgressFix = 0.02;
        return vec3( 
          cos(progress * PI * uFreq.x + uTime) * uAmp.x - cos(movementProgressFix * PI * uFreq.x + uTime) * uAmp.x,
          sin(progress * PI * uFreq.y + PI/2. + uTime) * uAmp.y - sin(movementProgressFix * PI * uFreq.y + PI/2. + uTime) * uAmp.y,
          0.
        );
      }
    `,getJS:(r,e)=>{const i=$.uFreq.value,o=$.uAmp.value,a=new g(Math.cos(r*Math.PI*i.x+e)*o.x-Math.cos(.02*Math.PI*i.x+e)*o.x,Math.sin(r*Math.PI*i.y+e+Math.PI/2)*o.y-Math.sin(.02*Math.PI*i.y+e+Math.PI/2)*o.y,0),c=new g(2,.4,1),d=new g(0,0,-3);return a.multiply(c).add(d)}},LongRaceDistortion:{uniforms:H,getDistortion:`
      uniform vec2 uFreq;
      uniform vec2 uAmp;
      #define PI 3.14159265358979
      vec3 getDistortion(float progress){
        float camProgress = 0.0125;
        return vec3( 
          sin(progress * PI * uFreq.x + uTime) * uAmp.x - sin(camProgress * PI * uFreq.x + uTime) * uAmp.x,
          sin(progress * PI * uFreq.y + uTime) * uAmp.y - sin(camProgress * PI * uFreq.y + uTime) * uAmp.y,
          0.
        );
      }
    `,getJS:(r,e)=>{const i=H.uFreq.value,o=H.uAmp.value,a=new g(Math.sin(r*Math.PI*i.x+e)*o.x-Math.sin(.0125*Math.PI*i.x+e)*o.x,Math.sin(r*Math.PI*i.y+e)*o.y-Math.sin(.0125*Math.PI*i.y+e)*o.y,0),c=new g(1,1,0),d=new g(0,0,-5);return a.multiply(c).add(d)}},turbulentDistortion:{uniforms:z,getDistortion:`
      uniform vec4 uFreq;
      uniform vec4 uAmp;
      float nsin(float val){
        return sin(val) * 0.5 + 0.5;
      }
      #define PI 3.14159265358979
      float getDistortionX(float progress){
        return (
          cos(PI * progress * uFreq.r + uTime) * uAmp.r +
          pow(cos(PI * progress * uFreq.g + uTime * (uFreq.g / uFreq.r)), 2. ) * uAmp.g
        );
      }
      float getDistortionY(float progress){
        return (
          -nsin(PI * progress * uFreq.b + uTime) * uAmp.b +
          -pow(nsin(PI * progress * uFreq.a + uTime / (uFreq.b / uFreq.a)), 5.) * uAmp.a
        );
      }
      vec3 getDistortion(float progress){
        return vec3(
          getDistortionX(progress) - getDistortionX(0.0125),
          getDistortionY(progress) - getDistortionY(0.0125),
          0.
        );
      }
    `,getJS:(r,e)=>{const s=z.uFreq.value,i=z.uAmp.value,o=h=>Math.cos(Math.PI*h*s.x+e)*i.x+Math.pow(Math.cos(Math.PI*h*s.y+e*(s.y/s.x)),2)*i.y,a=h=>-T(Math.PI*h*s.z+e)*i.z-Math.pow(T(Math.PI*h*s.w+e/(s.z/s.w)),5)*i.w,c=new g(o(r)-o(r+.007),a(r)-a(r+.007),0),d=new g(-2,-5,0),m=new g(0,0,-10);return c.multiply(d).add(m)}},turbulentDistortionStill:{uniforms:z,getDistortion:`
      uniform vec4 uFreq;
      uniform vec4 uAmp;
      float nsin(float val){
        return sin(val) * 0.5 + 0.5;
      }
      #define PI 3.14159265358979
      float getDistortionX(float progress){
        return (
          cos(PI * progress * uFreq.r) * uAmp.r +
          pow(cos(PI * progress * uFreq.g * (uFreq.g / uFreq.r)), 2. ) * uAmp.g
        );
      }
      float getDistortionY(float progress){
        return (
          -nsin(PI * progress * uFreq.b) * uAmp.b +
          -pow(nsin(PI * progress * uFreq.a / (uFreq.b / uFreq.a)), 5.) * uAmp.a
        );
      }
      vec3 getDistortion(float progress){
        return vec3(
          getDistortionX(progress) - getDistortionX(0.02),
          getDistortionY(progress) - getDistortionY(0.02),
          0.
        );
      }
    `},deepDistortionStill:{uniforms:N,getDistortion:`
      uniform vec4 uFreq;
      uniform vec4 uAmp;
      uniform vec2 uPowY;
      float nsin(float val){
        return sin(val) * 0.5 + 0.5;
      }
      #define PI 3.14159265358979
      float getDistortionX(float progress){
        return (
          sin(progress * PI * uFreq.x) * uAmp.x * 2.
        );
      }
      float getDistortionY(float progress){
        return (
          pow(abs(progress * uPowY.x), uPowY.y) + sin(progress * PI * uFreq.y) * uAmp.y
        );
      }
      vec3 getDistortion(float progress){
        return vec3(
          getDistortionX(progress) - getDistortionX(0.02),
          getDistortionY(progress) - getDistortionY(0.05),
          0.
        );
      }
    `},deepDistortion:{uniforms:N,getDistortion:`
      uniform vec4 uFreq;
      uniform vec4 uAmp;
      uniform vec2 uPowY;
      float nsin(float val){
        return sin(val) * 0.5 + 0.5;
      }
      #define PI 3.14159265358979
      float getDistortionX(float progress){
        return (
          sin(progress * PI * uFreq.x + uTime) * uAmp.x
        );
      }
      float getDistortionY(float progress){
        return (
          pow(abs(progress * uPowY.x), uPowY.y) + sin(progress * PI * uFreq.y + uTime) * uAmp.y
        );
      }
      vec3 getDistortion(float progress){
        return vec3(
          getDistortionX(progress) - getDistortionX(0.02),
          getDistortionY(progress) - getDistortionY(0.02),
          0.
        );
      }
    `,getJS:(r,e)=>{const s=N.uFreq.value,i=N.uAmp.value,o=N.uPowY.value,a=f=>Math.sin(f*Math.PI*s.x+e)*i.x,c=f=>Math.pow(f*o.x,o.y)+Math.sin(f*Math.PI*s.y+e)*i.y,d=new g(a(r)-a(r+.01),c(r)-c(r+.01),0),m=new g(-2,-4,0),h=new g(0,0,-10);return d.multiply(m).add(h)}}},Ue={uDistortionX:{value:new b(80,3)},uDistortionY:{value:new b(-40,2.5)}},ze=`
  #define PI 3.14159265358979
  uniform vec2 uDistortionX;
  uniform vec2 uDistortionY;
  float nsin(float val){
    return sin(val) * 0.5 + 0.5;
  }
  vec3 getDistortion(float progress){
    progress = clamp(progress, 0., 1.);
    float xAmp = uDistortionX.r;
    float xFreq = uDistortionX.g;
    float yAmp = uDistortionY.r;
    float yFreq = uDistortionY.g;
    return vec3( 
      xAmp * nsin(progress * PI * xFreq - PI / 2.),
      yAmp * nsin(progress * PI * yFreq - PI / 2.),
      0.
    );
  }
`;function S(r){return Array.isArray(r)?Math.random()*(r[1]-r[0])+r[0]:Math.random()*r}function ue(r){return Array.isArray(r)?r[Math.floor(Math.random()*r.length)]:r}function le(r,e,s=.1,i=.001){let o=(e-r)*s;return Math.abs(o)<i&&(o=e-r),o}class ce{constructor(e,s,i,o,a){l(this,"webgl");l(this,"options");l(this,"colors");l(this,"speed");l(this,"fade");l(this,"mesh");this.webgl=e,this.options=s,this.colors=i,this.speed=o,this.fade=a}init(){const e=this.options,s=new De(new g(0,0,0),new g(0,0,-1)),i=new Ie(s,40,1,8,!1),o=new me().copy(i);o.instanceCount=e.lightPairsPerRoadWay*2;const a=e.roadWidth/e.lanesPerRoad,c=[],d=[],m=[];let h;Array.isArray(this.colors)?h=this.colors.map(u=>new M(u)):h=[new M(this.colors)];for(let u=0;u<e.lightPairsPerRoadWay;u++){const j=S(e.carLightsRadius),k=S(e.carLightsLength),L=S(this.speed);let I=u%e.lanesPerRoad*a-e.roadWidth/2+a/2;const q=S(e.carWidthPercentage)*a,W=S(e.carShiftX)*a;I+=W;const E=S(e.carFloorSeparation)+j*1.3,U=-S(e.length);c.push(I-q/2),c.push(E),c.push(U),c.push(I+q/2),c.push(E),c.push(U),d.push(j),d.push(k),d.push(L),d.push(j),d.push(k),d.push(L);const A=ue(h);m.push(A.r),m.push(A.g),m.push(A.b),m.push(A.r),m.push(A.g),m.push(A.b)}o.setAttribute("aOffset",new D(new Float32Array(c),3,!1)),o.setAttribute("aMetrics",new D(new Float32Array(d),3,!1)),o.setAttribute("aColor",new D(new Float32Array(m),3,!1));const f=new J({fragmentShader:_e,vertexShader:Re,transparent:!0,uniforms:Object.assign({uTime:{value:0},uTravelLength:{value:e.length},uFade:{value:this.fade}},this.webgl.fogUniforms,(typeof this.options.distortion=="object"?this.options.distortion.uniforms:{})||{})});f.onBeforeCompile=u=>{u.vertexShader=u.vertexShader.replace("#include <getDistortion_vertex>",typeof this.options.distortion=="object"?this.options.distortion.getDistortion:"")};const P=new V(o,f);P.frustumCulled=!1,this.webgl.scene.add(P),this.mesh=P}update(e){this.mesh.material.uniforms.uTime&&(this.mesh.material.uniforms.uTime.value=e)}}const _e=`
  #define USE_FOG;
  ${w.fog_pars_fragment}
  varying vec3 vColor;
  varying vec2 vUv; 
  uniform vec2 uFade;
  void main() {
    vec3 color = vec3(vColor);
    float alpha = smoothstep(uFade.x, uFade.y, vUv.x);
    gl_FragColor = vec4(color, alpha);
    if (gl_FragColor.a < 0.0001) discard;
    ${w.fog_fragment}
  }
`,Re=`
  #define USE_FOG;
  ${w.fog_pars_vertex}
  attribute vec3 aOffset;
  attribute vec3 aMetrics;
  attribute vec3 aColor;
  uniform float uTravelLength;
  uniform float uTime;
  varying vec2 vUv; 
  varying vec3 vColor; 
  #include <getDistortion_vertex>
  void main() {
    vec3 transformed = position.xyz;
    float radius = aMetrics.r;
    float myLength = aMetrics.g;
    float speed = aMetrics.b;

    transformed.xy *= radius;
    transformed.z *= myLength;

    transformed.z += myLength - mod(uTime * speed + aOffset.z, uTravelLength);
    transformed.xy += aOffset.xy;

    float progress = abs(transformed.z / uTravelLength);
    transformed.xyz += getDistortion(progress);

    vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);
    gl_Position = projectionMatrix * mvPosition;
    vUv = uv;
    vColor = aColor;
    ${w.fog_vertex}
  }
`;class Oe{constructor(e,s){l(this,"webgl");l(this,"options");l(this,"mesh");this.webgl=e,this.options=s}init(){const e=this.options,s=new de(1,1),i=new me().copy(s),o=e.totalSideLightSticks;i.instanceCount=o;const a=e.length/(o-1),c=[],d=[],m=[];let h;Array.isArray(e.colors.sticks)?h=e.colors.sticks.map(u=>new M(u)):h=[new M(e.colors.sticks)];for(let u=0;u<o;u++){const j=S(e.lightStickWidth),k=S(e.lightStickHeight);c.push((u-1)*a*2+a*Math.random());const L=ue(h);d.push(L.r),d.push(L.g),d.push(L.b),m.push(j),m.push(k)}i.setAttribute("aOffset",new D(new Float32Array(c),1,!1)),i.setAttribute("aColor",new D(new Float32Array(d),3,!1)),i.setAttribute("aMetrics",new D(new Float32Array(m),2,!1));const f=new J({fragmentShader:Xe,vertexShader:Ye,side:he,uniforms:Object.assign({uTravelLength:{value:e.length},uTime:{value:0}},this.webgl.fogUniforms,(typeof e.distortion=="object"?e.distortion.uniforms:{})||{})});f.onBeforeCompile=u=>{u.vertexShader=u.vertexShader.replace("#include <getDistortion_vertex>",typeof this.options.distortion=="object"?this.options.distortion.getDistortion:"")};const P=new V(i,f);P.frustumCulled=!1,this.webgl.scene.add(P),this.mesh=P}update(e){this.mesh.material.uniforms.uTime&&(this.mesh.material.uniforms.uTime.value=e)}}const Ye=`
  #define USE_FOG;
  ${w.fog_pars_vertex}
  attribute float aOffset;
  attribute vec3 aColor;
  attribute vec2 aMetrics;
  uniform float uTravelLength;
  uniform float uTime;
  varying vec3 vColor;
  mat4 rotationY( in float angle ) {
    return mat4(
      cos(angle),		0,		sin(angle),	0,
      0,		        1.0,	0,			0,
      -sin(angle),	    0,		cos(angle),	0,
      0, 		        0,		0,			1
    );
  }
  #include <getDistortion_vertex>
  void main(){
    vec3 transformed = position.xyz;
    float width = aMetrics.x;
    float height = aMetrics.y;

    transformed.xy *= vec2(width, height);
    float time = mod(uTime * 60. * 2. + aOffset, uTravelLength);

    transformed = (rotationY(3.14/2.) * vec4(transformed,1.)).xyz;
    transformed.z += - uTravelLength + time;

    float progress = abs(transformed.z / uTravelLength);
    transformed.xyz += getDistortion(progress);

    transformed.y += height / 2.;
    transformed.x += -width / 2.;
    vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);
    gl_Position = projectionMatrix * mvPosition;
    vColor = aColor;
    ${w.fog_vertex}
  }
`,Xe=`
  #define USE_FOG;
  ${w.fog_pars_fragment}
  varying vec3 vColor;
  void main(){
    vec3 color = vec3(vColor);
    gl_FragColor = vec4(color,1.);
    ${w.fog_fragment}
  }
`;class Be{constructor(e,s){l(this,"webgl");l(this,"options");l(this,"uTime");l(this,"leftRoadWay");l(this,"rightRoadWay");l(this,"island");this.webgl=e,this.options=s,this.uTime={value:0}}createPlane(e,s,i){const o=this.options,a=100,c=new de(i?o.roadWidth:o.islandWidth,o.length,20,a);let d={uTravelLength:{value:o.length},uColor:{value:new M(i?o.colors.roadColor:o.colors.islandColor)},uTime:this.uTime};i&&(d=Object.assign(d,{uLanes:{value:o.lanesPerRoad},uBrokenLinesColor:{value:new M(o.colors.brokenLines)},uShoulderLinesColor:{value:new M(o.colors.shoulderLines)},uShoulderLinesWidthPercentage:{value:o.shoulderLinesWidthPercentage},uBrokenLinesLengthPercentage:{value:o.brokenLinesLengthPercentage},uBrokenLinesWidthPercentage:{value:o.brokenLinesWidthPercentage}}));const m=new J({fragmentShader:i?Je:Ge,vertexShader:Ve,side:he,uniforms:Object.assign(d,this.webgl.fogUniforms,(typeof o.distortion=="object"?o.distortion.uniforms:{})||{})});m.onBeforeCompile=f=>{f.vertexShader=f.vertexShader.replace("#include <getDistortion_vertex>",typeof this.options.distortion=="object"?this.options.distortion.getDistortion:"")};const h=new V(c,m);return h.rotation.x=-Math.PI/2,h.position.z=-o.length/2,h.position.x+=(this.options.islandWidth/2+o.roadWidth/2)*e,this.webgl.scene.add(h),h}init(){this.leftRoadWay=this.createPlane(-1,this.options.roadWidth,!0),this.rightRoadWay=this.createPlane(1,this.options.roadWidth,!0),this.island=this.createPlane(0,this.options.islandWidth,!1)}update(e){this.uTime.value=e}}const ge=`
  #define USE_FOG;
  varying vec2 vUv; 
  uniform vec3 uColor;
  uniform float uTime;
  #include <roadMarkings_vars>
  ${w.fog_pars_fragment}
  void main() {
    vec2 uv = vUv;
    vec3 color = vec3(uColor);
    #include <roadMarkings_fragment>
    gl_FragColor = vec4(color, 1.);
    ${w.fog_fragment}
  }
`,Ge=ge.replace("#include <roadMarkings_fragment>","").replace("#include <roadMarkings_vars>",""),$e=`
  uniform float uLanes;
  uniform vec3 uBrokenLinesColor;
  uniform vec3 uShoulderLinesColor;
  uniform float uShoulderLinesWidthPercentage;
  uniform float uBrokenLinesWidthPercentage;
  uniform float uBrokenLinesLengthPercentage;
  highp float random(vec2 co) {
    highp float a = 12.9898;
    highp float b = 78.233;
    highp float c = 43758.5453;
    highp float dt = dot(co.xy, vec2(a, b));
    highp float sn = mod(dt, 3.14);
    return fract(sin(sn) * c);
  }
`,He=`
  uv.y = mod(uv.y + uTime * 0.05, 1.);
  float laneWidth = 1.0 / uLanes;
  float brokenLineWidth = laneWidth * uBrokenLinesWidthPercentage;
  float laneEmptySpace = 1. - uBrokenLinesLengthPercentage;

  float brokenLines = step(1.0 - brokenLineWidth, fract(uv.x * 2.0)) * step(laneEmptySpace, fract(uv.y * 10.0));
  float sideLines = step(1.0 - brokenLineWidth, fract((uv.x - laneWidth * (uLanes - 1.0)) * 2.0)) + step(brokenLineWidth, uv.x);

  brokenLines = mix(brokenLines, sideLines, uv.x);
`,Je=ge.replace("#include <roadMarkings_fragment>",He).replace("#include <roadMarkings_vars>",$e),Ve=`
  #define USE_FOG;
  uniform float uTime;
  ${w.fog_pars_vertex}
  uniform float uTravelLength;
  varying vec2 vUv; 
  #include <getDistortion_vertex>
  void main() {
    vec3 transformed = position.xyz;
    vec3 distortion = getDistortion((transformed.y + uTravelLength / 2.) / uTravelLength);
    transformed.x += distortion.x;
    transformed.z += distortion.y;
    transformed.y += -1. * distortion.z;  
    
    vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);
    gl_Position = projectionMatrix * mvPosition;
    vUv = uv;
    ${w.fog_vertex}
  }
`;function Ze(r,e){const s=r.domElement,i=s.clientWidth,o=s.clientHeight,a=s.width!==i||s.height!==o;return a&&e(i,o,!1),a}class Ke{constructor(e,s){l(this,"container");l(this,"options");l(this,"renderer");l(this,"composer");l(this,"camera");l(this,"scene");l(this,"renderPass");l(this,"bloomPass");l(this,"clock");l(this,"assets");l(this,"disposed");l(this,"road");l(this,"leftCarLights");l(this,"rightCarLights");l(this,"leftSticks");l(this,"fogUniforms");l(this,"fovTarget");l(this,"speedUpTarget");l(this,"speedUp");l(this,"timeOffset");this.options=s,this.options.distortion||(this.options.distortion={uniforms:Ue,getDistortion:ze}),this.container=e,this.renderer=new Pe({antialias:!1,alpha:!0}),this.renderer.setSize(e.offsetWidth,e.offsetHeight,!1),this.renderer.setPixelRatio(window.devicePixelRatio),this.composer=new Se(this.renderer),e.appendChild(this.renderer.domElement),this.camera=new Le(s.fov,e.offsetWidth/e.offsetHeight,.1,1e4),this.camera.position.z=-5,this.camera.position.y=8,this.camera.position.x=0,this.scene=new Ae,this.scene.background=null;const i=new je(s.colors.background,s.length*.2,s.length*500);this.scene.fog=i,this.fogUniforms={fogColor:{value:i.color},fogNear:{value:i.near},fogFar:{value:i.far}},this.clock=new ke,this.assets={},this.disposed=!1,this.road=new Be(this,s),this.leftCarLights=new ce(this,s,s.colors.leftCars,s.movingAwaySpeed,new b(0,1-s.carLightsFade)),this.rightCarLights=new ce(this,s,s.colors.rightCars,s.movingCloserSpeed,new b(1,0+s.carLightsFade)),this.leftSticks=new Oe(this,s),this.fovTarget=s.fov,this.speedUpTarget=0,this.speedUp=0,this.timeOffset=0,this.tick=this.tick.bind(this),this.init=this.init.bind(this),this.setSize=this.setSize.bind(this),this.onMouseDown=this.onMouseDown.bind(this),this.onMouseUp=this.onMouseUp.bind(this),this.onTouchStart=this.onTouchStart.bind(this),this.onTouchEnd=this.onTouchEnd.bind(this),this.onContextMenu=this.onContextMenu.bind(this),window.addEventListener("resize",this.onWindowResize.bind(this))}onWindowResize(){const e=this.container.offsetWidth,s=this.container.offsetHeight;this.renderer.setSize(e,s),this.camera.aspect=e/s,this.camera.updateProjectionMatrix(),this.composer.setSize(e,s)}initPasses(){this.renderPass=new Fe(this.scene,this.camera),this.bloomPass=new Q(this.camera,new Me({luminanceThreshold:.2,luminanceSmoothing:0,resolutionScale:1}));const e=new Q(this.camera,new Y({preset:Ce.MEDIUM}));this.renderPass.renderToScreen=!1,this.bloomPass.renderToScreen=!1,e.renderToScreen=!0,this.composer.addPass(this.renderPass),this.composer.addPass(this.bloomPass),this.composer.addPass(e)}loadAssets(){const e=this.assets;return new Promise(s=>{const i=new Te(s),o=new Image,a=new Image;e.smaa={},o.addEventListener("load",function(){e.smaa.search=this,i.itemEnd("smaa-search")}),a.addEventListener("load",function(){e.smaa.area=this,i.itemEnd("smaa-area")}),i.itemStart("smaa-search"),i.itemStart("smaa-area"),o.src=Y.searchImageDataURL,a.src=Y.areaImageDataURL})}init(){this.initPasses();const e=this.options;this.road.init(),this.leftCarLights.init(),this.leftCarLights.mesh.position.setX(-e.roadWidth/2-e.islandWidth/2),this.rightCarLights.init(),this.rightCarLights.mesh.position.setX(e.roadWidth/2+e.islandWidth/2),this.leftSticks.init(),this.leftSticks.mesh.position.setX(-(e.roadWidth+e.islandWidth/2)),this.container.addEventListener("mousedown",this.onMouseDown),this.container.addEventListener("mouseup",this.onMouseUp),this.container.addEventListener("mouseout",this.onMouseUp),this.container.addEventListener("touchstart",this.onTouchStart,{passive:!0}),this.container.addEventListener("touchend",this.onTouchEnd,{passive:!0}),this.container.addEventListener("touchcancel",this.onTouchEnd,{passive:!0}),this.container.addEventListener("contextmenu",this.onContextMenu),this.tick()}onMouseDown(e){this.options.onSpeedUp&&this.options.onSpeedUp(e),this.fovTarget=this.options.fovSpeedUp,this.speedUpTarget=this.options.speedUp}onMouseUp(e){this.options.onSlowDown&&this.options.onSlowDown(e),this.fovTarget=this.options.fov,this.speedUpTarget=0}onTouchStart(e){this.options.onSpeedUp&&this.options.onSpeedUp(e),this.fovTarget=this.options.fovSpeedUp,this.speedUpTarget=this.options.speedUp}onTouchEnd(e){this.options.onSlowDown&&this.options.onSlowDown(e),this.fovTarget=this.options.fov,this.speedUpTarget=0}onContextMenu(e){e.preventDefault()}update(e){const s=Math.exp(-(-60*Math.log2(.9))*e);this.speedUp+=le(this.speedUp,this.speedUpTarget,s,1e-5),this.timeOffset+=this.speedUp*e;const i=this.clock.elapsedTime+this.timeOffset;this.rightCarLights.update(i),this.leftCarLights.update(i),this.leftSticks.update(i),this.road.update(i);let o=!1;const a=le(this.camera.fov,this.fovTarget,s);if(a!==0&&(this.camera.fov+=a*e*6,o=!0),typeof this.options.distortion=="object"&&this.options.distortion.getJS){const c=this.options.distortion.getJS(.025,i);this.camera.lookAt(new g(this.camera.position.x+c.x,this.camera.position.y+c.y,this.camera.position.z+c.z)),o=!0}o&&this.camera.updateProjectionMatrix()}render(e){this.composer.render(e)}dispose(){this.disposed=!0,this.renderer&&this.renderer.dispose(),this.composer&&this.composer.dispose(),this.scene&&this.scene.clear(),window.removeEventListener("resize",this.onWindowResize.bind(this)),this.container&&(this.container.removeEventListener("mousedown",this.onMouseDown),this.container.removeEventListener("mouseup",this.onMouseUp),this.container.removeEventListener("mouseout",this.onMouseUp),this.container.removeEventListener("touchstart",this.onTouchStart),this.container.removeEventListener("touchend",this.onTouchEnd),this.container.removeEventListener("touchcancel",this.onTouchEnd),this.container.removeEventListener("contextmenu",this.onContextMenu))}setSize(e,s,i){this.composer.setSize(e,s,i)}tick(){if(this.disposed||!this)return;if(Ze(this.renderer,this.setSize)){const s=this.renderer.domElement;this.camera.aspect=s.clientWidth/s.clientHeight,this.camera.updateProjectionMatrix()}const e=this.clock.getDelta();this.render(e),this.update(e),requestAnimationFrame(this.tick)}}const Qe=({effectOptions:r={}})=>{const e={...We,...r},s=v.useRef(null),i=v.useRef(null);return v.useEffect(()=>{if(i.current){i.current.dispose();const d=document.getElementById("lights");if(d)for(;d.firstChild;)d.removeChild(d.firstChild)}const o=s.current;if(!o)return;const a={...e};typeof a.distortion=="string"&&(a.distortion=Ee[a.distortion]);const c=new Ke(o,a);return i.current=c,c.loadAssets().then(c.init),()=>{i.current&&i.current.dispose()}},[e]),t.jsx("div",{id:"lights",ref:s})},Tt=()=>{const r={Trophy:qe,Medal:ae,Award:ne,Star:re,GraduationCap:Ne,BookOpen:C,Target:se,TrendingUp:oe,Crown:X,Zap:te,ArrowRight:K,Plus:B,X:R,ArrowUp:ie},e=n=>typeof n=="string"&&r[n]?r[n]:n??C,[s,i]=v.useState("all"),[o,a]=v.useState("2024"),[c,d]=v.useState(!1),[m,h]=v.useState(!1),[f,P]=v.useState(!1),[u,j]=v.useState([{id:"all",name:"All Subjects",icon:C},{id:"science",name:"Science",icon:te},{id:"mathematics",name:"Mathematics",icon:se},{id:"english",name:"English",icon:C},{id:"overall",name:"Overall Performance",icon:X}]),[k,L]=v.useState([{id:"2024",name:"2024"},{id:"2023",name:"2023"},{id:"2022",name:"2022"}]);v.useEffect(()=>{var F;const n=localStorage.getItem("royal-academy-categories"),p=localStorage.getItem("royal-academy-years"),y=localStorage.getItem("royal-academy-top-scorers");if(n){const fe=JSON.parse(n);j([{id:"all",name:"All Subjects",icon:C},...fe])}p&&(L(JSON.parse(p)),a(((F=JSON.parse(p)[0])==null?void 0:F.id)||"2024")),y&&q(JSON.parse(y))},[]),v.useEffect(()=>{const n=()=>{const p=window.scrollY,y=400,F=window.innerHeight+window.scrollY>=document.body.offsetHeight-1e3;P(p>y||F)};return window.addEventListener("scroll",n),()=>window.removeEventListener("scroll",n)},[]);const Z=()=>{window.scrollTo({top:0,behavior:"smooth"})},[I,q]=v.useState([{id:1,name:"Emma Richardson",slug:"emma-richardson",grade:"Grade 12",subject:"overall",score:"98.5%",year:"2024",rank:1,achievements:["Valedictorian","Science Olympiad Gold","Math Competition Winner"],image:"/placeholder-image.svg",description:"Outstanding performance across all subjects with exceptional leadership qualities."},{id:2,name:"James Chen",slug:"james-chen",grade:"Grade 11",subject:"mathematics",score:"99.2%",year:"2024",rank:1,achievements:["International Math Olympiad","Regional Champion","Perfect SAT Math"],image:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face&auto=format&q=80",description:"Mathematical genius with exceptional problem-solving abilities."},{id:3,name:"Sophia Martinez",slug:"sophia-martinez",grade:"Grade 10",subject:"science",score:"97.8%",year:"2024",rank:1,achievements:["Science Fair Winner","Research Publication","Lab Excellence Award"],image:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face&auto=format&q=80",description:"Brilliant scientist with innovative research in environmental studies."},{id:4,name:"Alexander Thompson",slug:"alexander-thompson",grade:"Grade 12",subject:"english",score:"96.7%",year:"2024",rank:1,achievements:["Literary Magazine Editor","Debate Champion","Writing Contest Winner"],image:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face&auto=format&q=80",description:"Exceptional writer and orator with outstanding communication skills."},{id:5,name:"Priya Patel",slug:"priya-patel",grade:"Grade 11",subject:"science",score:"97.1%",year:"2024",rank:2,achievements:["Chemistry Excellence","Lab Research Assistant","STEM Leadership"],image:"https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face&auto=format&q=80",description:"Chemistry enthusiast with groundbreaking laboratory research."},{id:6,name:"Michael Johnson",slug:"michael-johnson",grade:"Grade 10",subject:"mathematics",score:"96.9%",year:"2024",rank:2,achievements:["Calculus Prodigy","Math Tutor","Academic Excellence"],image:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face&auto=format&q=80",description:"Mathematical talent with exceptional analytical thinking."},{id:7,name:"Isabella Rodriguez",slug:"isabella-rodriguez",grade:"Grade 12",subject:"overall",score:"97.9%",year:"2023",rank:1,achievements:["Class Valedictorian","Student Council President","Academic Excellence"],image:"https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face&auto=format&q=80",description:"Exceptional all-around student with strong leadership skills."},{id:8,name:"David Kim",slug:"david-kim",grade:"Grade 11",subject:"science",score:"98.3%",year:"2023",rank:1,achievements:["Physics Olympiad Gold","Research Intern","Innovation Award"],image:"https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face&auto=format&q=80",description:"Physics prodigy with innovative experimental approaches."}]),W=I.filter(n=>{const p=s==="all"||n.subject===s,y=n.year===o;return p&&y}),E=n=>{switch(n){case 1:return t.jsx(X,{className:"h-6 w-6 text-gold"});case 2:return t.jsx(ae,{className:"h-6 w-6 text-gray-400"});case 3:return t.jsx(ne,{className:"h-6 w-6 text-amber-600"});default:return t.jsx(re,{className:"h-6 w-6 text-blue-500"})}},U=n=>{switch(n){case 1:return"from-gold/20 to-yellow-500/20 border-gold/30";case 2:return"from-gray-300/20 to-gray-500/20 border-gray-400/30";case 3:return"from-amber-400/20 to-amber-600/20 border-amber-500/30";default:return"from-blue-400/20 to-blue-600/20 border-blue-500/30"}},A=()=>{const n=u.find(p=>p.id===s);return n?n.name:"All Subjects"},pe=()=>{const n=k.find(p=>p.id===o);return n?n.name:"2024"};return t.jsxs("div",{className:"min-h-screen",children:[t.jsx(be,{}),t.jsxs("section",{className:"relative pt-32 pb-20 overflow-hidden",children:[t.jsx("div",{className:"absolute inset-0 bg-gradient-to-br from-royal/20 via-background to-crimson/20"}),t.jsx("div",{className:"absolute inset-0 opacity-60",children:t.jsx(Qe,{effectOptions:{onSpeedUp:()=>{},onSlowDown:()=>{},distortion:"turbulentDistortion",length:400,roadWidth:10,islandWidth:2,lanesPerRoad:4,fov:90,fovSpeedUp:150,speedUp:2,carLightsFade:.4,totalSideLightSticks:20,lightPairsPerRoadWay:40,shoulderLinesWidthPercentage:.05,brokenLinesWidthPercentage:.1,brokenLinesLengthPercentage:.5,lightStickWidth:[.12,.5],lightStickHeight:[1.3,1.7],movingAwaySpeed:[60,80],movingCloserSpeed:[-120,-160],carLightsLength:[400*.03,400*.2],carLightsRadius:[.05,.14],carWidthPercentage:[.3,.5],carShiftX:[-.8,.8],carFloorSeparation:[0,5],colors:{roadColor:526344,islandColor:657930,background:0,shoulderLines:16777215,brokenLines:16777215,leftCars:[14177983,6770850,12732332],rightCars:[242627,941733,3294549],sticks:242627}}})}),t.jsx("div",{className:"container-wide relative z-10",children:t.jsxs(x.div,{initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{duration:.6},className:"text-center mb-16",children:[t.jsxs("h1",{className:"text-5xl md:text-6xl font-heading font-bold mb-6",children:["Top ",t.jsx("span",{className:"text-gradient-gold",children:"Scorers"})]}),t.jsx("p",{className:"text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed",children:"Celebrating the outstanding academic achievements of our exceptional students"})]})})]}),t.jsx("section",{className:"section-padding bg-gradient-to-r from-royal/5 via-background to-gold/5",children:t.jsxs("div",{className:"container-wide",children:[t.jsxs("div",{className:"flex flex-col lg:flex-row items-center justify-between gap-6 mb-8",children:[t.jsxs("div",{className:"flex flex-col items-center w-full",children:[t.jsxs("div",{className:"flex items-center justify-between w-full mb-3",children:[t.jsx("h3",{className:"text-base sm:text-lg font-heading font-semibold text-gradient-gold",children:"Filter by Subject"}),t.jsx(_,{variant:"outline",size:"sm",onClick:()=>d(!c),className:"border-2 border-gold/30 text-gold hover:text-gold/80 hover:bg-gold/10",children:c?t.jsx(R,{className:"h-4 w-4"}):t.jsx(B,{className:"h-4 w-4"})})]}),t.jsx("div",{className:"w-full mb-2",children:t.jsx("div",{className:"px-4 py-2 bg-card/50 border-2 border-border rounded-lg text-foreground font-medium text-center",children:A()})}),t.jsx(O,{children:c&&t.jsx(x.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},className:"w-full overflow-hidden",children:t.jsx("div",{className:"grid grid-cols-2 gap-2 w-full mt-2",children:u.map((n,p)=>{const y=e(n.icon);return t.jsxs(x.button,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},whileHover:{scale:1.02},whileTap:{scale:.98},transition:{delay:p*.05},onClick:()=>{i(n.id),d(!1)},className:`flex items-center space-x-2 p-3 rounded-lg font-medium transition-all duration-300 text-sm ${s===n.id?"bg-gold text-black shadow-lg border-2 border-gold":"bg-card/50 hover:bg-card text-muted-foreground hover:text-foreground border-2 border-border hover:border-gold/50"}`,children:[t.jsx(y,{className:"h-4 w-4 flex-shrink-0"}),t.jsx("span",{className:"truncate",children:n.name})]},n.id)})})})})]}),t.jsxs("div",{className:"flex flex-col items-center w-full mt-4 lg:mt-0",children:[t.jsxs("div",{className:"flex items-center justify-between w-full mb-3",children:[t.jsx("h3",{className:"text-base sm:text-lg font-heading font-semibold text-gradient-gold",children:"Academic Year"}),t.jsx(_,{variant:"outline",size:"sm",onClick:()=>h(!m),className:"border-2 border-gold/30 text-gold hover:text-gold/80 hover:bg-gold/10",children:m?t.jsx(R,{className:"h-4 w-4"}):t.jsx(B,{className:"h-4 w-4"})})]}),t.jsx("div",{className:"w-full mb-2",children:t.jsx("div",{className:"px-4 py-2 bg-card/50 border-2 border-border rounded-lg text-foreground font-medium text-center",children:pe()})}),t.jsx(O,{children:m&&t.jsx(x.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},className:"w-full overflow-hidden",children:t.jsx("div",{className:"grid grid-cols-3 gap-2 w-full mt-2",children:k.map((n,p)=>t.jsx(x.button,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},whileHover:{scale:1.02},whileTap:{scale:.98},transition:{delay:p*.05},onClick:()=>{a(n.id),h(!1)},className:`p-3 rounded-lg font-semibold transition-all duration-300 text-sm ${o===n.id?"bg-gradient-to-r from-gold to-yellow-500 text-black shadow-lg border-2 border-gold":"bg-card/50 hover:bg-card text-muted-foreground hover:text-foreground border-2 border-border hover:border-gold/50"}`,children:n.name},n.id))})})})]})]}),t.jsx(x.div,{layout:!0,className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",children:t.jsx(O,{children:W.map((n,p)=>t.jsxs(x.div,{layout:!0,initial:{opacity:0,scale:.8,y:20},animate:{opacity:1,scale:1,y:0},exit:{opacity:0,scale:.8,y:-20},whileHover:{scale:1.03,y:-5,rotateY:5},transition:{duration:.3,delay:p*.1,type:"spring",stiffness:300},className:`card-3d overflow-hidden bg-gradient-to-br ${U(n.rank)} backdrop-blur-sm`,children:[t.jsx("div",{className:"absolute -top-2 -right-2 z-10",children:t.jsx(x.div,{whileHover:{rotate:360,scale:1.2},transition:{duration:.6},className:"w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-background to-card border-2 border-gold flex items-center justify-center shadow-lg",children:E(n.rank)})}),t.jsxs("div",{className:"relative h-40 sm:h-48 overflow-hidden",children:[t.jsx("img",{src:n.image,alt:n.name,className:"w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"}),t.jsx("div",{className:"absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"}),t.jsx(x.div,{initial:{scale:0},animate:{scale:1},transition:{delay:.3+p*.1},className:"absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-gold text-black px-2 py-1 sm:px-3 sm:py-1 rounded-full font-bold text-xs sm:text-sm shadow-lg",children:n.score})]}),t.jsxs("div",{className:"p-4 sm:p-6",children:[t.jsxs("div",{className:"flex items-start justify-between mb-3",children:[t.jsxs("div",{children:[t.jsx("h3",{className:"text-lg sm:text-xl font-heading font-bold text-gradient-gold mb-1",children:n.name}),t.jsx("p",{className:"text-muted-foreground text-xs sm:text-sm",children:n.grade})]}),t.jsxs("div",{className:"text-right",children:[t.jsx("div",{className:"text-xs sm:text-sm text-muted-foreground",children:"Rank"}),t.jsxs("div",{className:"text-lg sm:text-xl font-bold text-gold",children:["#",n.rank]})]})]}),t.jsx("p",{className:"text-muted-foreground text-xs sm:text-sm mb-3 leading-relaxed",children:n.description}),t.jsxs("div",{className:"space-y-2 mb-3",children:[t.jsx("h4",{className:"text-xs sm:text-sm font-semibold text-foreground",children:"Key Achievements:"}),t.jsx("div",{className:"flex flex-wrap gap-1 sm:gap-2",children:n.achievements.map((y,F)=>t.jsx(x.span,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},transition:{delay:.5+F*.1},className:"px-2 py-1 bg-muted/30 text-xs rounded-full border border-border",children:y},F))})]}),t.jsx("div",{className:"pt-3 border-t border-border/30",children:t.jsx(we,{to:`/student/${n.slug}`,children:t.jsxs(_,{variant:"outline",size:"sm",className:"w-full bg-gradient-to-r from-gold/10 to-yellow-500/10 hover:from-gold/20 hover:to-yellow-500/20 border-gold/30 text-gold hover:text-gold/80 transition-all duration-300 text-xs sm:text-sm",children:[t.jsx(C,{className:"h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2"}),"Learn More",t.jsx(K,{className:"h-3 w-3 sm:h-4 sm:w-4 ml-1 sm:ml-2"})]})})})]})]},n.id))})}),W.length===0&&t.jsxs(x.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},className:"text-center py-12",children:[t.jsx(oe,{className:"h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground mx-auto mb-4"}),t.jsx("h3",{className:"text-lg sm:text-xl font-heading font-semibold mb-2",children:"No Results Found"}),t.jsx("p",{className:"text-muted-foreground text-sm sm:text-base",children:"No top scorers found for the selected criteria. Try adjusting your filters."})]})]})}),f&&t.jsx(x.button,{initial:{opacity:0,scale:0},animate:{opacity:1,scale:1},exit:{opacity:0,scale:0},onClick:Z,className:"fixed bottom-8 right-8 z-50 p-3 rounded-full bg-gold hover:bg-gold/90 text-black shadow-lg hover:shadow-xl transition-all duration-300","aria-label":"Scroll to top",children:t.jsx(ie,{className:"h-6 w-6"})}),t.jsx(ye,{})]})};export{Tt as default};
