// authMiddleware.js
function requireAuth(req, res, next) {
  if (req.session.user_id) {
    // O usuário está autenticado, você pode definir o objeto do usuário na sessão, se necessário
    req.user = {
      id: req.session.user_id, // Substitua por como você define o ID do usuário na sessão
    };
    next();
  } else {
    // O usuário não está autenticado, redirecione para a página de login
    res.redirect('/login');
  }
}

module.exports = requireAuth;
