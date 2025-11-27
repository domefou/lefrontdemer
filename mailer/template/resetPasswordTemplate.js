const dotenv = require('dotenv');
dotenv.config();

module.exports = ({ nom, resetLink }) => `
<div style="font-family: Arial, sans-serif; background-color: #000; color: #fff; padding: 20px; border-radius: 8px; text-align: center;">
  <!-- Logo -->
  <div style="margin-bottom: 20px;">
    <img src="${process.env.FRONTEND_URL}/logo.png" alt="Logo" width="60" height="60" style="border-radius:50%; margin-bottom:20px;" />
  </div>

  <!-- Titre -->
  <h2 style="color: #FFD700;">Bonjour ${nom},</h2>

  <!-- Message principal -->
  <p>Voici le lien pour réinitialiser votre mot de passe :</p>

  <!-- Bouton lien -->
  <a href="${resetLink}" 
     style="display:inline-block; margin: 20px 0; padding: 12px 24px; background-color: #FFD700; color: #000; text-decoration: none; font-weight: bold; border-radius: 4px;">
    Réinitialiser mon mot de passe
  </a>

  <!-- Expiration -->
  <p style="margin-top: 20px; font-size: 14px; color: #ccc;">
    ⚠️ Ce lien expire dans <strong style="color:#FFD700;">15 minutes</strong>.
  </p>

  <!-- Signature -->
  <p style="margin-top: 30px; color: #FFD700; font-weight: bold;">
    L’équipe du Front de Mer
  </p>
</div>
`;

