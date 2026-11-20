// PERSONALIZE THESE THREE VALUES
const CONFIG = {
  name: "Priya Maurya",
  password: "2007", // Change to your own 4-digit passcode
  birthdayMessage: "Happy Birthday! You are kind, sweet, and full of light."
};
document.querySelectorAll(".person-name").forEach(el=>el.textContent=CONFIG.name);
document.getElementById("qrName").textContent=CONFIG.name;
const screens=[...document.querySelectorAll(".screen")];
function show(id){screens.forEach(s=>s.classList.toggle("active",s.id===id));}
function nextFrom(btn){btn.addEventListener("click",()=>show(btn.dataset.next));}
document.querySelectorAll("[data-next]").forEach(nextFrom);

// QR code points to this page once it is hosted. Local file URLs only work on this device.
const qrTarget = location.protocol==="file:" ? "Publish this site online to activate the QR code" : location.href;
if(window.QRCode) new QRCode(document.getElementById("qrcode"),{text:qrTarget,width:112,height:112,colorDark:"#7d234b",colorLight:"#ffffff",correctLevel:QRCode.CorrectLevel.H});
document.getElementById("openSurprise").addEventListener("click",()=>show("passScreen"));

let entered="";
const dots=[...document.querySelectorAll("#dots i")], error=document.getElementById("passError");
function updateDots(){dots.forEach((d,i)=>d.classList.toggle("filled",i<entered.length));}
function checkPass(){if(entered===CONFIG.password){error.classList.remove("show");entered="";updateDots();show("introScreen");}else{error.classList.add("show");entered="";updateDots();}}
document.getElementById("keypad").addEventListener("click",e=>{
 const b=e.target.closest("button");if(!b)return;
 if(b.dataset.action==="clear"){entered=entered.slice(0,-1);}
 else if(b.dataset.action==="enter"){checkPass();return;}
 else if(entered.length<4){entered+=b.textContent.trim();if(entered.length===4){updateDots();setTimeout(checkPass,250);return;}}
 updateDots();
});
document.addEventListener("keydown",e=>{if(!document.getElementById("passScreen").classList.contains("active"))return;if(/^[0-9]$/.test(e.key)&&entered.length<4){entered+=e.key;updateDots();if(entered.length===4)setTimeout(checkPass,250);}if(e.key==="Backspace"){entered=entered.slice(0,-1);updateDots();}if(e.key==="Enter")checkPass();});

let noCount=0;document.getElementById("noButton").addEventListener("click",()=>{noCount++;document.getElementById("noHint").textContent=noCount===1?"A little yes might make the magic begin ♡":"Come on, let's celebrate!";if(noCount>1)show("balloonScreen");});

let popped=0;document.querySelectorAll(".balloon").forEach(b=>b.addEventListener("click",()=>{
 if(b.classList.contains("popped"))return;b.classList.add("popped");popped++;
 document.getElementById("balloonCount").textContent=`${popped} / 4 POPPED`;
 document.getElementById("balloonMessage").textContent=["One wish sent!","Two wishes sent!","Three wishes sent!","All your wishes are on their way! ♡"][popped-1];
 if(popped===4)setTimeout(()=>show("cakeScreen"),1100);
}));
function blow(){document.getElementById("flame").classList.add("out");document.getElementById("cakeMessage").textContent="Your wish is on its way! ♡";document.getElementById("blowCandle").disabled=true;setTimeout(()=>show("bouquetScreen"),1500);}
document.getElementById("blowCandle").addEventListener("click",blow);
document.getElementById("flame").addEventListener("click",blow);
document.getElementById("openLetter").addEventListener("click",()=>show("letterScreen"));
document.getElementById("openGift").addEventListener("click",e=>{e.currentTarget.classList.add("opened");setTimeout(()=>show("finalScreen"),650);});
document.getElementById("restart").addEventListener("click",()=>{popped=0;document.querySelectorAll(".balloon").forEach(b=>b.classList.remove("popped"));document.getElementById("balloonCount").textContent="0 / 4 POPPED";document.getElementById("flame").classList.remove("out");document.getElementById("blowCandle").disabled=false;document.getElementById("cakeMessage").textContent="";document.getElementById("openGift").classList.remove("opened");show("qrScreen");});

// Optional music: browsers require a user gesture before audio can play.
const music=document.getElementById("music"),soundToggle=document.getElementById("soundToggle");let musicOn=false;
soundToggle.addEventListener("click",async()=>{if(!musicOn){try{await music.play();musicOn=true;soundToggle.textContent="♫";}catch(e){soundToggle.textContent="♪";}}else{music.pause();musicOn=false;soundToggle.textContent="♪";}});
