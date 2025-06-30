export function crearRecuperar(navegarA) {
  const div = document.createElement('div');
  div.className = 'form-container';
  div.innerHTML = `
    <h2>Recuperar Contraseña</h2>
    <input id="rec-email" type="email" placeholder="Correo electrónico" />
    <button id="btn-recover" class="btn">Enviar enlace</button>
    <div class="form-links">
      <button class="link-btn" id="to-login">Volver al login</button>
    </div>
  `;

  const emailIn = div.querySelector('#rec-email');
  const btnRec  = div.querySelector('#btn-recover');
  const toLogin = div.querySelector('#to-login');

  btnRec.addEventListener('click', async () => {
    const email = emailIn.value.trim();
    if (!email) return alert('Ingresa tu correo');
    try {
      const res = await fetch('http://localhost:3000/auth/recover', {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg);
      alert(data.msg);
      navegarA(window.crearLogin(navegarA));
    } catch (e) {
      alert(e.message);
    }
  });

  toLogin.addEventListener('click', () => {
    navegarA(window.crearLogin(navegarA));
  });

  return div;
}
