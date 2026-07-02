import React from 'react';

function LoginModal({
  showLoginModal,
  setShowLoginModal,
  loginMode,
  setLoginMode,
  loginType,
  setLoginType,
  emailInput,
  setEmailInput,
  passwordInput,
  setPasswordInput,
  handleLogin,
  signupName,
  setSignupName,
  signupEmail,
  setSignupEmail,
  signupPhone,
  setSignupPhone,
  signupPassword,
  setSignupPassword,
  handleSignupSubmit,
  triggerToast
}) {
  if (!showLoginModal) return null;

  const clearLoginForm = () => {
    setEmailInput('');
    setPasswordInput('');
  };

  return (
    <div className="login-modal" onClick={() => { setShowLoginModal(false); setLoginMode('login'); }}>
      <div className="login-box" style={{ position: 'relative' }} onClick={(e) => e.stopPropagation()}>
        <button className="close-profile-modal" onClick={() => { setShowLoginModal(false); setLoginMode('login'); }}>✕</button>
        
        <div style={{ position: 'absolute', top: '20px', right: '55px' }}>
          {loginMode === 'login' ? (
            <button 
              onClick={() => setLoginMode('signup')}
              style={{
                background: 'none',
                border: 'none',
                color: '#ff6b00',
                fontWeight: '700',
                fontSize: '13.5px',
                cursor: 'pointer',
                textDecoration: 'underline',
                transition: '0.2s'
              }}
            >
              Crear cuenta
            </button>
          ) : (
            <button 
              onClick={() => setLoginMode('login')}
              style={{
                background: 'none',
                border: 'none',
                color: '#ff6b00',
                fontWeight: '700',
                fontSize: '13.5px',
                cursor: 'pointer',
                textDecoration: 'underline',
                transition: '0.2s'
              }}
            >
              Iniciar sesión
            </button>
          )}
        </div>

        {loginMode === 'login' ? (
          <>
            <h2>Iniciar Sesión</h2>
            <p>Selecciona tu rol y accede a la plataforma de NGR.</p>
            
            {/* Roles Select tab */}
            <div className="role-selector-container" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              {[
                { id: 'usuario', label: 'Cliente 👤' },
                { id: 'empleado', label: 'Empleado 🧑‍🍳' },
                { id: 'administrador', label: 'Admin ⚙️' }
              ].map(role => (
                <button
                  key={role.id}
                  type="button"
                  className={`role-tab-btn ${loginType === role.id ? 'active-role-tab' : ''}`}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0',
                    background: loginType === role.id ? 'linear-gradient(135deg, #ffc107, #ff6b00)' : 'white',
                    color: loginType === role.id ? 'white' : '#475569',
                    fontWeight: '700',
                    fontSize: '12px',
                    cursor: 'pointer',
                    transition: '0.3s'
                  }}
                  onClick={() => {
                    setLoginType(role.id);
                    setEmailInput('');
                    setPasswordInput('');
                  }}
                >
                  {role.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleLogin} className="email-login">
              <input
                type="email"
                placeholder="Correo Electrónico"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '14px',
                  border: '1px solid #ddd',
                  marginBottom: '15px',
                  outline: 'none'
                }}
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '14px',
                  border: '1px solid #ddd',
                  marginBottom: '20px',
                  outline: 'none'
                }}
              />
              
              <button type="submit" className="continue-btn" style={{
                width: '100%',
                padding: '16px',
                border: 'none',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #ffc107, #ff6b00, #d62828)',
                color: 'white',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer'
              }}>
                Continuar
              </button>
            </form>
          </>
        ) : (
          <>
            <h2>Crear Cuenta</h2>
            <p>Completa tus datos para registrarte como cliente NGR y empezar a acumular puntos.</p>

            <form onSubmit={handleSignupSubmit} className="email-login" style={{ marginTop: '20px' }}>
              <input
                type="text"
                placeholder="Nombre Completo *"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '14px',
                  border: '1px solid #ddd',
                  marginBottom: '15px',
                  outline: 'none'
                }}
              />
              <input
                type="email"
                placeholder="Correo Electrónico *"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '14px',
                  border: '1px solid #ddd',
                  marginBottom: '15px',
                  outline: 'none'
                }}
              />
              <input
                type="tel"
                placeholder="Número de Teléfono (Opcional)"
                value={signupPhone}
                onChange={(e) => setSignupPhone(e.target.value)}
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '14px',
                  border: '1px solid #ddd',
                  marginBottom: '15px',
                  outline: 'none'
                }}
              />
              <input
                type="password"
                placeholder="Contraseña *"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '14px',
                  border: '1px solid #ddd',
                  marginBottom: '20px',
                  outline: 'none'
                }}
              />
              
              <button type="submit" className="continue-btn" style={{
                width: '100%',
                padding: '16px',
                border: 'none',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #ffc107, #ff6b00, #d62828)',
                color: 'white',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer'
              }}>
                Registrarse y Continuar
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginModal;
