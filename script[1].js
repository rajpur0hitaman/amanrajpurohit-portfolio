const VIDEO="https://player.cloudinary.com/embed/?cloud_name=syz3hyeu&public_id=fa676365-b791-4ce3-a965-49cee639bfaa_876DC2F&autoplay=true&controls=true";

const loader=document.getElementById("loader");
setTimeout(()=>loader.classList.add("done"),900);

const canvas=document.getElementById("space"),ctx=canvas.getContext("2d");
let w=0,h=0,dpr=1,particles=[],mx=0,my=0,tx=0,ty=0;
function resize(){
  w=innerWidth;h=innerHeight;dpr=Math.min(devicePixelRatio||1,2);
  canvas.width=w*dpr;canvas.height=h*dpr;canvas.style.width=w+"px";canvas.style.height=h+"px";
  ctx.setTransform(dpr,0,0,dpr,0,0);
  particles=Array.from({length:Math.min(900,Math.floor(w*h/1100))},()=>({x:(Math.random()-.5)*14,y:(Math.random()-.5)*9,z:.5+Math.random()*10,s:.4+Math.random()*1.4}));
}
function frame(){
  mx+=(tx-mx)*.035;my+=(ty-my)*.035;ctx.clearRect(0,0,w,h);
  const cx=w/2+mx*80,cy=h/2+my*40,f=Math.min(w,h)*.72;
  for(const p of particles){
    p.z-=.014;if(p.z<.45){p.z=10;p.x=(Math.random()-.5)*14;p.y=(Math.random()-.5)*9}
    const x=cx+(p.x+mx*.5)*f/p.z,y=cy+(p.y+my*.3)*f/p.z,a=Math.max(0,.5-p.z*.04);
    ctx.beginPath();ctx.arc(x,y,Math.max(.35,p.s/p.z),0,Math.PI*2);ctx.fillStyle=`rgba(255,255,255,${a})`;ctx.fill();
  }
  requestAnimationFrame(frame);
}
if(matchMedia("(pointer:fine)").matches){
  addEventListener("mousemove",e=>{tx=(e.clientX/w-.5)*.7;ty=(e.clientY/h-.5)*.45});
}
addEventListener("resize",resize);resize();frame();

const hero=document.getElementById("hero3d"),front=document.querySelector(".front");
if(matchMedia("(pointer:fine)").matches){
  addEventListener("mousemove",e=>{
    const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;
    hero.style.transform=`rotateY(${x*4}deg) rotateX(${-y*3}deg)`;
    front.style.transform=`rotateY(${-22+x*7}deg) rotateX(${7-y*5}deg) rotateZ(2deg)`;
  });
}

const modal=document.getElementById("modal"),video=document.getElementById("video");
function openVideo(){video.src=VIDEO;modal.classList.add("open");document.body.style.overflow="hidden"}
function closeVideo(){modal.classList.remove("open");video.src="";document.body.style.overflow=""}
document.querySelectorAll("[data-video]").forEach(x=>x.addEventListener("click",openVideo));
document.getElementById("close").onclick=closeVideo;
modal.addEventListener("click",e=>{if(e.target===modal)closeVideo()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeVideo()});