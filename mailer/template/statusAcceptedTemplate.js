module.exports = ({ nom, date, heure, nbr_couvert, etat }) => `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <h2>Bonjour ${nom},</h2>
    <p>Voici une mise à jour concernant votre réservation :</p>
    <ul>
      <li><strong>Date :</strong> ${date}</li>
      <li><strong>Heure :</strong> ${heure}</li>
      <li><strong>Nombre de couverts :</strong> ${nbr_couvert}</li>
      <li><strong>Statut :</strong> <span style="color: ${etat === 'acceptée' ? 'green' : 'red'};">${etat}</span></li>
      <li><strong>Votre demande a bien été accepté.<br>
       Nous serons ravis de vous accueillir dans notre établissement ,<br>
      et de vous faire vivre une agréable éxperience.</li>
    </ul>
    <p>Nous vous remercions pour votre confiance.</p>
    <p>À bientôt,<br/>L’équipe du <strong>Front de Mer</strong></p>
  </div>
`;
