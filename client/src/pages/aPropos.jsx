import { Helmet } from "react-helmet-async";
import banerPropos from "../assets/image/banner002.png";
import Layout from "../components/layout";
import "../styles/desktop/aPropos.scss"
import "../styles/mobile/aPropos.scss"

const Propos = () => {

    return (
        <Layout>
            <Helmet>
                <title>À propos - Le Front de Mer</title>
                <meta
                    name="description"
                    content="Découvrez l’histoire et la philosophie du restaurant Le Front de Mer aux Sables d’Olonne : une cuisine maison, des produits frais et une ambiance chaleureuse au bord de l’océan."
                />
            </Helmet>

            <div className="container_propos">


                <div className="baner_propos">
                    <img src={banerPropos} className="img_banner" alt="vue sur mer au soleil couchant" />
                </div>


                <div className="intro_propos">

                    <h2>À propos de notre restaurant</h2>
                    <p >Bienvenue dans notre univers gourmand, où chaque plat est préparé avec passion,
                        authenticité et une touche de créativité. Nous sommes un restaurant dédié à
                        vous offrir une expérience culinaire chaleureuse, conviviale et savoureuse.
                        Notre cuisine s’inspire de produits frais, de recettes maison et d’un amour
                        sincère pour le goût.</p>

                </div>

                <div className="location_propos">

                    <div className="location_text">
                        <p>
                            Situés au cœur de la ville, nous avons créé un lieu où se mêlent ambiance accueillante,
                            service attentionné et plaisirs gourmands. Que ce soit pour un déjeuner rapide, un dîner
                            entre amis ou une célébration spéciale, notre équipe est là pour faire de chaque moment une
                            découverte culinaire.
                        </p>

                        <a href="https://www.google.com/maps/place/Rte+Bleue,+85100+Les+Sables-d'Olonne/@46.4911339,-1.8077001,17z/data=!3m1!4b1!4m6!3m5!1s0x4804679cdf30678b:0xbd97a5814048ef62!8m2!3d46.4911302!4d-1.8051252!16s%2Fg%2F1tj4gf2v?hl=fr&entry=ttu&g_ep=EgoyMDI1MTAyOS4yIKXMDSoASAFQAw%3D%3D"
                            target="_blank"
                            rel="noreferrer">
                            Rte Bleue, 85100 Les Sables-d'Olonne</a>
                    </div>

                    <div className="location_map">
                        <iframe
                            title="Localisation du restaurant Le Front de Mer"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2762.807973486659!2d-1.8077001484599783!3d46.49113387915167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4804679cdf30678b%3A0xbd97a5814048ef62!2sRte%20Bleue%2C%2085100%20Les%20Sables-d&#39;Olonne!5e0!3m2!1sfr!2sfr!4v1696357976595!5m2!1sfr!2sfr"
                            width="100%"
                            height="300"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>

                </div>

                <div className="droits_propos">
                    <h2 >Droit d’utilisations</h2>
                    <p>Les images utilisées sur ce site proviennent de Pixabay, une banque de photos libres de droits.
                        Toutes les photos sont utilisées conformément à la licence Pixabay, qui permet une utilisation gratuite à des fins commerciales sans attribution obligatoire.
                        Toutefois, par respect des créateurs, nous saluons leur talent et les remercions pour leur contribution visuelle.</p>

                    <p>Lien :<a href="https://pixabay.com/fr/"
                        target="_blank"
                        rel="noreferrer">Pixabay.com</a></p>
                </div>


            </div>

        </Layout>

    );
};

export default Propos;