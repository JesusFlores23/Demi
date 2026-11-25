function openPage(){
  document.getElementById('intro').style.display='none';
  document.getElementById('content').style.display='block';
  window.scrollTo({top:0,behavior:'smooth'});
}

function answer(msg){
  document.getElementById('answer').textContent=msg;
}

function configurarFirma(canvasId){
  const canvas=document.getElementById(canvasId);
  const ctx=canvas.getContext('2d');
  canvas.width=600;
  canvas.height=180;
  ctx.strokeStyle='#3c2942';
  ctx.lineWidth=3;
  ctx.lineCap='round';
  ctx.lineJoin='round';
  let dibujando=false;

  function obtenerPosicion(e){
    const rect=canvas.getBoundingClientRect();
    return {
      x:(e.clientX-rect.left)*(canvas.width/rect.width),
      y:(e.clientY-rect.top)*(canvas.height/rect.height)
    };
  }

  canvas.addEventListener('pointerdown',function(e){
    dibujando=true;
    canvas.setPointerCapture(e.pointerId);
    const pos=obtenerPosicion(e);
    ctx.beginPath();
    ctx.moveTo(pos.x,pos.y);
  });

  canvas.addEventListener('pointermove',function(e){
    if(!dibujando)return;
    const pos=obtenerPosicion(e);
    ctx.lineTo(pos.x,pos.y);
    ctx.stroke();
  });

  canvas.addEventListener('pointerup',function(){dibujando=false;});
  canvas.addEventListener('pointercancel',function(){dibujando=false;});
}

function borrarFirma(canvasId){
  const canvas=document.getElementById(canvasId);
  const ctx=canvas.getContext('2d');
  ctx.clearRect(0,0,canvas.width,canvas.height);
}

configurarFirma('firmaDemi');

function imprimirActa(){
  window.print();
}
