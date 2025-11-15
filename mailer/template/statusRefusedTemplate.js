module.exports = ({ nom, date, heure, nbr_couvert, etat }) => `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <h2>Bonjour ${nom},</h2>
    <p>Voici une mise à jour concernant votre réservation :</p>
    <ul>
      <li><strong>Date :</strong> ${date}</li>
      <li><strong>Heure :</strong> ${heure}</li>
      <li><strong>Nombre de couverts :</strong> ${nbr_couvert}</li>
      <li><strong>Statut :</strong> <span style="color: ${etat === 'acceptée' ? 'green' : 'red'};">${etat}</span></li>
      <li><strong>Nous sommes désolé.<br>
       Victime de notre succés le restaurant est complet a la date que vous avez choisi.<br>
      Nous ne pouvons malheureusement pas accordé une réponse favorable a votre réservation. </li>
    </ul>
    <p>Nous vous remercions pour votre confiance.</p>
    <p>À bientôt,<br/>L’équipe du <strong>Front de Mer</strong></p>
  </div>
`;