/* script de la création de database avec insertion de data*/
CREATE TABLE IF NOT EXISTS produits (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  prix DECIMAL(10,2) NOT NULL,
  description TEXT
);

INSERT INTO produits (nom, prix, description) VALUES
  ('Marteau', 12.99, 'Un marteau solide pour tous vos travaux'),
  ('Tournevis', 5.49, 'Tournevis cruciforme en acier trempé');
