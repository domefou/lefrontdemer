
module.exports = ({ nom, resetLink }) => `
  <p>Bonjour ${nom},</p>
  <p>Voici le lien pour réinitialiser votre mot de passe :</p>
  <a href="${resetLink}">Réinitialiser mon mot de passe</a>
  <p>Ce lien expire dans 15 minutes.</p>
`;

