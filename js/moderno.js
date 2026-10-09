// Oscarpes — movimento do site moderno (09/out/2026): entrada ao rolar, partículas leves, telas que seguem o mouse,
// episódios que tocam no próprio cartão, menu do celular. Sem biblioteca.
(function () {
  // entrada ao rolar
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visivel'); io.unobserve(e.target); } }), { threshold: 0.12 });
  document.querySelectorAll('.sobe').forEach((el) => io.observe(el));

  // menu do celular
  const h = document.querySelector('.hamb'), m = document.querySelector('.menu');
  if (h && m) h.addEventListener('click', () => m.classList.toggle('aberto'));

  // telas e celular inclinam com o mouse (só onde há mouse)
  const palco = document.querySelector('.palco');
  if (palco && matchMedia('(hover:hover)').matches) {
    palco.addEventListener('mousemove', (ev) => {
      const r = palco.getBoundingClientRect(), x = (ev.clientX - r.left) / r.width - 0.5, y = (ev.clientY - r.top) / r.height - 0.5;
      palco.querySelector('.celular').style.transform = `translate(-50%,-50%) rotateY(${-8 + x * 14}deg) rotateX(${4 - y * 10}deg)`;
      palco.querySelectorAll('.holo').forEach((el, i) => { el.style.transform = `translate(${x * (i ? -30 : 30)}px,${y * 24}px)`; });
    });
  }
  // telas em órbita do Oscar giram de leve com a rolagem
  const orb = document.querySelectorAll('.orbita');
  if (orb.length) addEventListener('scroll', () => {
    const s = scrollY / 900;
    orb.forEach((el, i) => { el.style.transform = `translateY(${Math.sin(s + i) * 16}px) rotate(${Math.sin(s * .7 + i) * 3}deg)`; });
  }, { passive: true });

  // episódios: toca no cartão (com som), um por vez
  document.querySelectorAll('.ep').forEach((c) => c.addEventListener('click', () => {
    document.querySelectorAll('.ep.tocando').forEach((o) => { if (o !== c) { o.classList.remove('tocando'); const v = o.querySelector('video'); if (v) v.remove(); } });
    if (c.classList.contains('tocando')) return;
    const v = document.createElement('video'); v.src = c.dataset.video; v.controls = true; v.playsInline = true; v.autoplay = true;
    c.appendChild(v); c.classList.add('tocando'); v.play().catch(() => {});
  }));

  // partículas verdes subindo (leves; param em aba escondida e com movimento reduzido)
  const cv = document.getElementById('particulas');
  if (cv && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const ctx = cv.getContext('2d'); let W, H; const N = innerWidth < 700 ? 40 : 80;
    const ps = Array.from({ length: N }, () => ({ x: Math.random(), y: Math.random(), v: .0004 + Math.random() * .0012, r: .6 + Math.random() * 1.8, f: Math.random() * 6 }));
    const tam = () => { W = cv.width = innerWidth * devicePixelRatio; H = cv.height = innerHeight * devicePixelRatio; };
    tam(); addEventListener('resize', tam);
    (function q(t) {
      if (!document.hidden) {
        ctx.clearRect(0, 0, W, H);
        for (const p of ps) {
          p.y -= p.v; if (p.y < -.02) { p.y = 1.02; p.x = Math.random(); }
          const a = .25 + .25 * Math.sin(t / 900 + p.f);
          ctx.beginPath(); ctx.arc((p.x + Math.sin(t / 3000 + p.f) * .01) * W, p.y * H, p.r * devicePixelRatio, 0, 7);
          ctx.fillStyle = `rgba(196,230,80,${a})`; ctx.fill();
        }
      }
      requestAnimationFrame(q);
    })(0);
  }
})();
