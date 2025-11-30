const dotenv = require('dotenv');
dotenv.config();

module.exports = ({ nom, date, heure, nbr_couvert, etat }) => `
  <div style="font-family: Arial, sans-serif; background-color: #000; color: #fff; padding: 20px; border-radius: 8px;">
  <!-- Logo -->
  <div style="text-align: center; margin-bottom: 20px;">
    <img src="${process.env.FRONTEND_URL}/logo.png" alt="Logo" width="60" height="60" style="border-radius:50%; margin-bottom:20px;" />
  </div>

  <!-- Titre -->
  <h2 style="color: #FFD700; text-align: center;">Bonjour ${nom},</h2>

  <!-- Message principal -->
  <p style="text-align: center;">
    Voici une mise à jour concernant votre réservation :
  </p>

  <!-- Détails réservation -->
  <ul style="list-style: none; padding: 0; text-align: center;">
    <li><strong style="color:#FFD700;">Date :</strong> ${date}</li>
    <li><strong style="color:#FFD700;">Heure :</strong> ${heure}</li>
    <li><strong style="color:#FFD700;">Nombre de couverts :</strong> ${nbr_couvert}</li>
    <li>
      <strong style="color:#FFD700;">Statut :</strong> 
      <span style="color: ${etat === 'acceptée' ? '#32CD32' : '#FF4500'};">${etat}</span>
    </li>
    <li style="margin-top: 10px;">
      <strong style="color:#FFD700;">Message :</strong><br/>
      Nous sommes désolé votre demande n'a pas pu être acceptée a la date demandé,<br/>
      veuillez nous en éxcuser, nous vous invitons à nous recontacter pour<br/>
      convenir d'une autre date.<br/>
      Nous serons ravis de vous accueillir dans notre établissement,<br/>
      et de vous faire vivre une agréable expérience.
    </li>
  </ul>

  <!-- Remerciements -->
  <p style="text-align: center; margin-top: 20px;">
    Nous vous remercions pour votre confiance.
  </p>

  <!-- Signature -->
  <p style="text-align: center; color: #FFD700; font-weight: bold;">
    À bientôt,<br/>L’équipe du Front de Mer
  </p>
</div>
`;