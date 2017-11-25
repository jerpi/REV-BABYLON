"use strict";

const PAINTINGS = [
    [
        {
            src: 'assets/akov/arcimboldo_vertumne_p.jpg',
            artist : 'Giuseppe Arcimboldo',
            name: 'Vertumne',
            description: 'Vertumne ou Vertumnus est un tableau peint par Giuseppe Arcimboldo en 1590. Il mesure 70 cm de haut sur 58 cm de large. Il est conservé au château de Skokloster en Suède.'
        },
        {
            src: 'assets/akov/botticelli_naissance_venus_a.jpg',
            artist : 'Sandro Botticelli',
            name: 'La Naissance de Vénus',
            description: 'La Naissance de Vénus est un tableau majeur de Sandro Botticelli, peint vers 1484-1485 et conservé à la Galerie des Offices. Il a été peint selon la technique de la tempera.'
        },
        {
            src: 'assets/akov/cezanne_dr_gachet_p.jpg',
            artist : 'Paul Cézanne',
            name: 'La maison du docteur Gachet à Auvers',
            description: 'Paul Cézanne peint en 1873 La maison du docteur Gachet à Auvers.',
        },
        {
            src: 'assets/akov/chagall_mariee_p.jpg',
            artist : 'Marc Chagall',
            name: 'La Mariée',
            description: 'La Mariée est un tableau  peint en 1950 par Marc Chagall. Comme dans la plupart de ses oeuvres, Chagall mèle ici monde réel et monde imaginaire .'
        },
        {
            src: 'assets/akov/dali_tentation-saint-antoine_a.jpg',
            artist : 'Salvador Dalí',
            name: 'La Tentation de saint Antoine',
            description: 'La Tentation de saint Antoine est un tableau surréaliste réalisé par le peintre Salvador Dalí en 1946. C\'est une huile sur toile de 90 × 119,5 cm. conservée à Bruxelles aux Musées royaux des beaux-arts de Belgique.'
        },
        {
            src: 'assets/akov/delacroix-la_liberte_guidant_le_peuple.jpg',
            artist : 'Eugène Delacroix',
            name: 'La Liberté guidant le peuple',
            description: 'La Liberté guidant le peuple est une huile sur toile d\'Eugène Delacroix réalisée en 1830, inspirée de la révolution des Trois Glorieuses qui s\'est passée en 1830.'
        },
        {
            src: 'assets/akov/gericault_Le_Radeau_de_La_Meduse_a.jpg',
            artist : 'Théodore Géricault',
            name: 'Le Radeau de La Méduse',
            description: 'Le Radeau de La Méduse est une peinture à l\'huile sur toile, réalisée entre 1818 et 1819 par le peintre et lithographe romantique français Théodore Géricault'
        },
        {
            src: 'assets/akov/goya_3mai_a.jpg',
            artist : 'Francisco de Goya',
            name: 'Tres de mayo',
            description: 'Tres de mayo (nom complet en espagnol : El tres de mayo de 1808 en Madrid, soit « Le trois mai 1808 à Madrid ») est un tableau renommé du peintre espagnol Francisco de Goya. Peinte en 1814 et conservée au musée du Prado à Madrid, cette toile est également connue sous le nom Les Fusillades du 3 mai ou en espagnol sous les noms de Los fusilamientos de la montaña del Príncipe Pío.'
        },
    ],
    [
        {
            src: 'assets/akov/hokusai_grande_vague_a.jpg',
            artist : 'Hokusai',
            name: 'La Grande Vague de Kanagawa',
            description: 'La Grande Vague de Kanagawa, plus connue sous le nom de La Vague, est une célèbre estampe japonaise du peintre japonais spécialiste de l\'ukiyo-e, Hokusai, publiée en 1830 ou en 1831 pendant l\'époque d\'Edo.'
        },
        {
            src: 'assets/akov/Jan_van_Eyck_001_arnolfini_epoux_p.jpg',
            artist : 'Jan van Eyck',
            name: 'Les Époux Arnolfini',
            description: 'Les Époux Arnolfini est le nom donné à une peinture sur bois (82,2 × 60 cm) du peintre primitif flamand Jan van Eyck datant de 1434, conservé à la National Gallery de Londres.   '
        },
        {
            src: 'assets/akov/JLD_jeudepaume_a.jpg',
            artist : 'Jacques-Louis David',
            name: 'Le Serment du Jeu de paume',
            description: 'Le Serment du Jeu de paume est un tableau inachevé de Jacques-Louis David composé entre 1791 et 1792. Cette toile ambitieuse devait immortaliser l\'événement qui s\'était déroulé dans la salle du Jeu de paume à Versailles.',
        },
        {
            src: 'assets/akov/kandinsky-jaune-rouge-bleu_a.jpg',
            artist : 'Vassily Kandinsky',
            name: 'Jaune-Rouge-Bleu',
            description: 'Etabli à Weimar de 1922 à 1925, Kandinsky, sous l’invitation de l’architecte Walter Gropius, s’associe à l’équipe des professeurs du Bauhaus. Sa peinture devient rigoureusement géométrique. En 1925 le Bauhaus quitte Weimar pour Dessau. La peinture de Kandinsky renoue alors avec la ligne courbe, les dégradés de couleur nuancent à nouveau ses compositions. Jaune-rouge-bleu, est l’œuvre la plus importante de cette période.'
        },
        {
            src: 'assets/akov/magritte-pipe.jpg',
            artist : 'René Magritte',
            name: 'La Trahison des images',
            description: 'La Trahison des images ou aussi à voir au musée d’art moderne de Bruxelles, est un des tableaux les plus célèbres de René Magritte. Il représente une pipe, accompagnée de la légende suivante : « Ceci n’est pas une pipe. ».'
        },
        {
            src: 'assets/akov/manet_LeDejeunerSurLherbe_a.jpg',
            artist : 'Édouard Manet',
            name: 'Le Déjeuner sur l\'herbe',
            description: 'Le Déjeuner sur l\'herbe est un tableau d\'Édouard Manet achevé en 1863, d\'abord intitulé Le Bain, puis La Partie carrée.'
        },
        {
            src: 'assets/akov/matisse_nu_bleuII_p.jpg',
            artist : 'Henri Matisse',
            name: 'Nu bleu II',
            description: 'Nu bleu II fait partie d\'une série des Nus bleus d\'Henri Matisse réalisée en 1952 et conservée à Paris au musée national d\'art moderne.'
        },
        {
            src: 'assets/akov/michel_ange_creation_dadam_a.jpg',
            artist : 'Michel-Ange',
            name: 'La Création d\'Adam',
            description: 'La Création d\'Adam est l\'une des neuf fresques inspirées du livre de la Genèse, peintes par Michel-Ange sur la partie centrale de la voûte du plafond de la chapelle Sixtine, dans la cité du Vatican.'
        },
    ],
    [
        {
            src: 'assets/akov/modigliani_jeune-bonne_p.jpg',
            artist: 'Amedeo Modigliani',
            name: 'Jeune bonne',
            description: 'Se considérant initialement comme sculpteur, ce n\'est qu\'à partir de 1914 qu\'Amedeo Modigliani se consacre exclusivement au dessin et à la peinture de portraits et de nus. Ses œuvres, aux formes étirées et aux visages sans regard ressemblant à des masques, demeurent emblématiques de l\'art moderne de cette époque.',
        },
        {
            src: 'assets/akov/monet_gare-saint-lazare_a.jpg',
            artist : 'Claude Monet',
            name: 'La Gare Saint-Lazare',
            description: 'La Gare Saint-Lazare est une série de douze toiles représentant la gare parisienne de Saint-Lazare, réalisées par Claude Monet, lorsqu\'il s\'intéressa à la vie moderne de son temps après s\'être inspiré des paysages ruraux.'
        },
        {
            src: 'assets/akov/munch_cri_p.jpg',
            artist : 'Edvard Munch',
            name: 'Le Cri',
            description: 'Le Cri est une œuvre expressionniste de l\'artiste norvégien Edvard Munch dont il existe cinq versions réalisées entre 1893 et 1917.',
        },
        {
            src: 'assets/akov/picasso_demoiselles-avignon.jpg',
            artist : 'Pablo Picasso',
            name: 'Les Demoiselles d\'Avignon',
            description: 'Les Demoiselles d\'Avignon est le dernier titre d\'une peinture à l\'huile sur toile, de très grand format, réalisée à Paris par Pablo Picasso en 1907.'
        },
        {
            src: 'assets/akov/raphael_ecole-athenes_a.jpg',
            artist : 'Raphaël',
            name: 'L\'École d\'Athènes',
            description: 'L\'École d\'Athènes est une fresque du peintre italien Raphaël, exposée dans la Chambre de la Signature des musées du Vatican. Cette fresque symbolique présente les figures majeures de la pensée antique.'
        },
        {
            src: 'assets/akov/rembrandt_croix_p.jpg',
            artist : 'Rembrandt',
            name: 'Le Christ en croix',
            description: 'Rembrandt livre un Christ qui n’est plus qu’un pauvre homme cloué sur la Croix, loin des corps glorieux et impassibles voulus par la tradition. Le visage ne correspond plus à un archétype, il devient individualisé. Les recherches sur l’expression des passions que mène Rembrandt, en particulier par la gravure, trouvent ici un parfait champ d’application.'
        },
        {
            src: 'assets/akov/renoir_Bal_du_Moulin_de_la_Galette_1876_a.jpg',
            artist : 'Auguste Renoir',
            name: 'Bal du moulin de la Galette',
            description: 'Le Bal du moulin de la Galette est une huile sur toile du peintre impressionniste français Auguste Renoir réalisée en 1876. Le tableau est actuellement conservé au musée d\'Orsay, à Paris.'
        },
        {
            src: 'assets/akov/rousseau_le_reve_a.jpg',
            artist : 'Henri Rousseau',
            name: 'Le Rêve',
            description: 'Le Rêve est un tableau du Douanier Rousseau peint en 1910. Il est actuellement conservé au Museum of Modern Art de New York.'
        },
    ],
];
