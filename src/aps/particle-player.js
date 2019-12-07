export default (function particlePlayer() {

THREE.BufferGeometryUtils={computeTangents:function(t){var e=t.index,r=t.attributes;if(null!==e&&void 0!==r.position&&void 0!==r.normal&&void 0!==r.uv){var i=e.array,a=r.position.array,s=r.normal.array,o=r.uv.array,n=a.length/3;void 0===r.tangent&&t.addAttribute("tangent",new THREE.BufferAttribute(new Float32Array(4*n),4));for(var l=r.tangent.array,c=[],h=[],u=0;u<n;u++)c[u]=new THREE.Vector3,h[u]=new THREE.Vector3;var m=new THREE.Vector3,f=new THREE.Vector3,d=new THREE.Vector3,p=new THREE.Vector2,E=new THREE.Vector2,y=new THREE.Vector2,v=new THREE.Vector3,g=new THREE.Vector3,P=t.groups;0===P.length&&(P=[{start:0,count:i.length}]),u=0;for(var R=P.length;u<R;++u)for(var T=C=(M=P[u]).start,b=C+M.count;T<b;T+=3)I(i[T+0],i[T+1],i[T+2]);var H,x,A,w=new THREE.Vector3,S=new THREE.Vector3,V=new THREE.Vector3,z=new THREE.Vector3;for(u=0,R=P.length;u<R;++u){var M,C;for(T=C=(M=P[u]).start,b=C+M.count;T<b;T+=3)B(i[T+0]),B(i[T+1]),B(i[T+2])}}else console.warn("THREE.BufferGeometry: Missing required attributes (index, position, normal or uv) in BufferGeometry.computeTangents()");function I(t,e,r){m.fromArray(a,3*t),f.fromArray(a,3*e),d.fromArray(a,3*r),p.fromArray(o,2*t),E.fromArray(o,2*e),y.fromArray(o,2*r);var i=f.x-m.x,s=d.x-m.x,n=f.y-m.y,l=d.y-m.y,u=f.z-m.z,P=d.z-m.z,R=E.x-p.x,T=y.x-p.x,b=E.y-p.y,H=y.y-p.y,x=1/(R*H-T*b);v.set((H*i-b*s)*x,(H*n-b*l)*x,(H*u-b*P)*x),g.set((R*s-T*i)*x,(R*l-T*n)*x,(R*P-T*u)*x),c[t].add(v),c[e].add(v),c[r].add(v),h[t].add(g),h[e].add(g),h[r].add(g)}function B(t){V.fromArray(s,3*t),z.copy(V),x=c[t],w.copy(x),w.sub(V.multiplyScalar(V.dot(x))).normalize(),S.crossVectors(z,x),A=S.dot(h[t]),H=A<0?-1:1,l[4*t]=w.x,l[4*t+1]=w.y,l[4*t+2]=w.z,l[4*t+3]=H}},mergeBufferGeometries:function(t,e){for(var r=null!==t[0].index,i=new Set(Object.keys(t[0].attributes)),a=new Set(Object.keys(t[0].morphAttributes)),s={},o={},n=new THREE.BufferGeometry,l=0,c=0;c<t.length;++c){var h=t[c];if(r!==(null!==h.index))return null;for(var u in h.attributes){if(!i.has(u))return null;void 0===s[u]&&(s[u]=[]),s[u].push(h.attributes[u])}for(var u in h.morphAttributes){if(!a.has(u))return null;void 0===o[u]&&(o[u]=[]),o[u].push(h.morphAttributes[u])}if(n.userData=n.userData||{},n.userData.mergedUserData=n.userData.mergedUserData||[],n.userData.mergedUserData.push(h.userData),e){var m;if(r)m=h.index.count;else{if(void 0===h.attributes.position)return null;m=h.attributes.position.count}n.addGroup(l,m,c),l+=m}}if(r){var f=0,d=[];for(c=0;c<t.length;++c){for(var p=t[c].index,E=0;E<p.count;++E)d.push(p.getX(E)+f);f+=t[c].attributes.position.count}n.setIndex(d)}for(var u in s){var y=this.mergeBufferAttributes(s[u]);if(!y)return null;n.addAttribute(u,y)}for(var u in o){var v=o[u][0].length;if(0===v)break;for(n.morphAttributes=n.morphAttributes||{},n.morphAttributes[u]=[],c=0;c<v;++c){var g=[];for(E=0;E<o[u].length;++E)g.push(o[u][E][c]);var P=this.mergeBufferAttributes(g);if(!P)return null;n.morphAttributes[u].push(P)}}return n},mergeBufferAttributes:function(t){for(var e,r,i,a=0,s=0;s<t.length;++s){var o=t[s];if(o.isInterleavedBufferAttribute)return null;if(void 0===e&&(e=o.array.constructor),e!==o.array.constructor)return null;if(void 0===r&&(r=o.itemSize),r!==o.itemSize)return null;if(void 0===i&&(i=o.normalized),i!==o.normalized)return null;a+=o.array.length}var n=new e(a),l=0;for(s=0;s<t.length;++s)n.set(t[s].array,l),l+=t[s].array.length;return new THREE.BufferAttribute(n,r,i)}};const NUM_PLANE_POSITIONS=12,BLENDINGS={normal:THREE.NormalBlending,additive:THREE.AdditiveBlending,substractive:THREE.SubstractiveBlending,multiply:THREE.MultiplyBlending},SHADERS={flat:THREE.MeshBasicMaterial,lambert:THREE.MeshLambertMaterial,phong:THREE.MeshPhongMaterial,standard:THREE.MeshStandardMaterial},OFFSCREEN_VEC3=new THREE.Vector3(-99999,-99999,-99999);AFRAME.registerComponent("particleplayer",{schema:{blending:{default:"additive",oneOf:["normal","additive","multiply","substractive"]},color:{default:"#fff",type:"color"},count:{default:"100%"},delay:{default:0,type:"int"},dur:{default:1e3,type:"int"},img:{type:"selector"},interpolate:{default:!1},loop:{default:"false"},on:{default:"init"},poolSize:{default:5,type:"int"},protation:{type:"vec3"},pscale:{default:1,type:"float"},scale:{default:1,type:"float"},shader:{default:"flat",oneOf:["flat","lambert","phong","standard"]},src:{type:"string"}},multiple:!0,init:function(){this.frame=0,this.framedata=null,this.indexPool=null,this.lastFrame=0,this.material=null,this.msPerFrame=0,this.numFrames=0,this.numParticles=0,this.originalVertexPositions=[],this.particleCount=0,this.particleSystems=[],this.protation=!1,this.restPositions=[],this.restRotations=[],this.sprite_rotation=!1,this.systems=null,this.useRotation=!1},update:function(t){const e=this.data;if(!e.src)return;t.on!==e.on&&(t.on&&this.el.removeEventListener(t.on,this.start),"play"!==e.on&&this.el.addEventListener(e.on,this.start.bind(this))),this.loadParticlesJSON(CS1.particles[e.src],e.scale),this.numFrames=this.framedata.length,this.numParticles=this.numFrames>0?this.framedata[0].length:0,"%"===e.count[e.count.length-1]?this.particleCount=Math.floor(parseInt(e.count)*this.numParticles/100):this.particleCount=parseInt(e.count),this.particleCount=Math.min(this.numParticles,Math.max(0,this.particleCount)),this.msPerFrame=e.dur/this.numFrames,this.indexPool=new Array(this.numParticles);const r={color:new THREE.Color(e.color),side:THREE.DoubleSide,blending:BLENDINGS[e.blending],map:e.img?(new THREE.TextureLoader).load(e.img.src):null,depthWrite:!1,opacity:e.opacity,transparent:!!e.img||"normal"!==e.blending||e.opacity<1};void 0!==SHADERS[e.shader]?this.material=new SHADERS[e.shader](r):this.material=new SHADERS.flat(r),this.createParticles(e.poolSize),"init"===e.on&&this.start()},loadParticlesJSON:function(t,e){var r;this.restPositions.length=0,this.restRotations.length=0;const i=t,a=i.frames,s=i.precision;this.useRotation=i.rotation,!1!==i.sprite_rotation?this.sprite_rotation={x:i.sprite_rotation[0]/s,y:i.sprite_rotation[1]/s,z:i.sprite_rotation[2]/s}:this.sprite_rotation=!1,this.framedata=new Array(a.length);for(let t=0;t<a.length;t++){this.framedata[t]=new Array(a[t].length);for(let o=0;o<a[t].length;o++){let n=a[t][o];r=0!==n;let l=this.framedata[t][o]={position:r?{x:n[0]/s*e,y:n[1]/s*e,z:n[2]/s*e}:null,alive:r};i.rotation&&(l.rotation=r?{x:n[3]/s,y:n[4]/s,z:n[5]/s}:null),r&&0===t&&(this.restPositions[o]=l.position?{x:l.position.y,y:l.position.y,z:l.position.z}:null,this.restRotations[o]=l.rotation?{x:l.rotation.y,y:l.rotation.y,z:l.rotation.z}:null)}}},createParticles:function(){const t=[];return function(e){const r=this.data;var i=parseInt(this.data.loop);this.particleSystems.length=0,isNaN(i)&&(i="true"===this.data.loop?Number.MAX_VALUE:0);for(let a=0;a<e;a++){let e={active:!1,activeParticleIndices:new Array(this.particleCount),loopCount:0,loopTotal:i,mesh:null,time:0};const s=r.img?r.img.width/r.img.height:1;t.length=0;for(let e=0;e<this.numParticles;e++){let e=new THREE.PlaneBufferGeometry(.1*s*r.pscale,.1*r.pscale);!1!==this.sprite_rotation?(e.rotateX(this.sprite_rotation.x),e.rotateY(this.sprite_rotation.y),e.rotateZ(this.sprite_rotation.z)):(e.rotateX(this.data.protation.x*Math.PI/180),e.rotateY(this.data.protation.y*Math.PI/180),e.rotateZ(this.data.protation.z*Math.PI/180)),t.push(e)}let o=THREE.BufferGeometryUtils.mergeBufferGeometries(t);e.mesh=new THREE.Mesh(o,this.material),e.mesh.visible=!1,this.el.setObject3D(`particleplayer${a}`,e.mesh),copyArray(this.originalVertexPositions,o.attributes.position.array);for(let t=0;t<o.attributes.position.array.length;t++)o.attributes.position.array[t]=-99999;for(let t=0;t<e.activeParticleIndices.length;t++)e.activeParticleIndices[t]=t;this.particleSystems.push(e)}}}(),start:function(t){this.data&&(this.data.delay>0?setTimeout(()=>this.startAfterDelay(t),this.data.delay):this.startAfterDelay(t))},startAfterDelay:function(t){var e,r=-1,i=0,a=t?t.detail.position:null,s=t?t.detail.rotation:null;a instanceof THREE.Vector3||(a=new THREE.Vector3),s instanceof THREE.Euler||(s=new THREE.Euler);for(var o=0;o<this.particleSystems.length;o++){if(this.particleSystems&&!1===this.particleSystems[o].active){r=o;break}this.particleSystems[o].time>i&&(r=o,i=this.particleSystems[o].time)}(e=this.particleSystems[r]).active=!0,e.loopCount=1,e.mesh.visible=!0,e.mesh.position.copy(a),e.mesh.rotation.copy(s),e.time=0,this.resetParticles(e)},doLoop:function(t){t.loopCount++,t.frame=-1,t.time=0,this.resetParticles(t)},resetParticle:function(t,e){const r=t.mesh.geometry;this.restPositions[e]?transformPlane(e,r,this.originalVertexPositions,this.restPositions[e],this.useRotation&&this.restRotations[e]):transformPlane(e,r,this.originalVertexPositions,OFFSCREEN_VEC3)},resetParticles:function(t){var e,r;if(this.particleCount===this.numParticles){for(e=0;e<this.numParticles;e++)this.resetParticle(t,e);return}const i=t.mesh.geometry;for(e=0;e<this.numParticles;e++)e<this.particleCount&&transformPlane(t.activeParticleIndices[e],i,this.originalVertexPositions,OFFSCREEN_VEC3),this.indexPool[e]=e;for(e=0;e<this.particleCount;e++)r=e+Math.floor(Math.random()*(this.numParticles-e)),t.activeParticleIndices[e]=this.indexPool[r],this.indexPool[r]=this.indexPool[e],this.resetParticle(t,t.activeParticleIndices[e])},tick:function(){const t=new THREE.Vector3;return function(e,r){var i,a,s,o,n,l=this.useRotation;for(let e=0;e<this.particleSystems.length;e++){let c=this.particleSystems[e];if(c.active){n=this.data.interpolate&&this.data.dur/this.numFrames>r,i=c.time/this.data.dur*this.numFrames,a=this.framedata[Math.floor(i)],n&&(o=i-Math.floor(i),s=i<this.numFrames-1?this.framedata[Math.floor(i)+1]:null);for(let e=0;e<c.activeParticleIndices.length;e++){let r=c.activeParticleIndices[e],i=l&&a[r].rotation;a[r].alive?n&&s&&s[r].alive?(t.lerpVectors(a[r].position,s[r].position,o),transformPlane(r,c.mesh.geometry,this.originalVertexPositions,t,i)):transformPlane(r,c.mesh.geometry,this.originalVertexPositions,a[r].position,i):transformPlane(r,c.mesh.geometry,this.originalVertexPositions,OFFSCREEN_VEC3)}c.time+=r,c.time>=this.data.dur&&(c.loopCount<c.loopTotal?(this.el.emit("particleplayerloop",null,!1),this.doLoop(c)):(this.el.emit("particleplayerfinished",null,!1),c.active=!1,c.mesh.visible=!1))}}}}(),_transformPlane:transformPlane});const tri=function(){const t=new THREE.Geometry;return t.vertices.push(new THREE.Vector3),t.vertices.push(new THREE.Vector3),t.vertices.push(new THREE.Vector3),t.faces.push(new THREE.Face3(0,1,2)),t}();function transformPlane(t,e,r,i,a){const s=e.attributes.position.array,o=t*NUM_PLANE_POSITIONS;tri.vertices[0].set(r[o+0],r[o+1],r[o+2]),tri.vertices[1].set(r[o+3],r[o+4],r[o+5]),tri.vertices[2].set(r[o+6],r[o+7],r[o+8]),a&&(tri.rotateX(a.x),tri.rotateY(a.y),tri.rotateZ(a.z)),tri.vertices[0].add(i),tri.vertices[1].add(i),tri.vertices[2].add(i),s[o+0]=tri.vertices[0].x,s[o+1]=tri.vertices[0].y,s[o+2]=tri.vertices[0].z,s[o+3]=tri.vertices[1].x,s[o+4]=tri.vertices[1].y,s[o+5]=tri.vertices[1].z,s[o+6]=tri.vertices[2].x,s[o+7]=tri.vertices[2].y,s[o+8]=tri.vertices[2].z,tri.vertices[0].set(r[o+3],r[o+4],r[o+5]),tri.vertices[1].set(r[o+6],r[o+7],r[o+8]),tri.vertices[2].set(r[o+9],r[o+10],r[o+11]),a&&(tri.rotateX(a.x),tri.rotateY(a.y),tri.rotateZ(a.z)),tri.vertices[0].add(i),tri.vertices[1].add(i),tri.vertices[2].add(i),s[o+9]=tri.vertices[2].x,s[o+10]=tri.vertices[2].y,s[o+11]=tri.vertices[2].z,e.attributes.position.needsUpdate=!0}function copyArray(t,e){t.length=0;for(let r=0;r<e.length;r++)t[r]=e[r]}
  
  
})();
