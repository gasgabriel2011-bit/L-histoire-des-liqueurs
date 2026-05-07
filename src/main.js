import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const modelUrl = new URL('../20_liquor_bottles.glb', import.meta.url);

const bottleProfiles = [
  {
    modelName: 'Cointreau',
    name: 'Cointreau',
    family: 'Triple sec',
    origin: 'Angers, France',
    abv: 'env. 40 %',
    base: "Écorces d'orange douce et amère",
    serve: 'Sidecar, Margarita, glace claire',
    mood: 'Agrume net, finale sèche',
    when: '1849, maison fondée à Angers',
    why: "Pour capter l'éclat sec de l'orange",
    place: 'France, vallée de la Loire',
    ritual: 'Sidecar, Margarita, glaçon clair',
    story:
      "Cointreau appartient à cette famille de liqueurs qui ont changé le bar moderne. La maison naît à Angers au XIXe siècle, puis impose une orange précise, lumineuse, plus sèche que sucrée. Dans un verre, elle sert de trait d'union entre l'acidité, l'alcool et le parfum.",
    notes: ['orange amère', 'zeste confit', 'finale sèche'],
    accent: '#f08a3c',
  },
  {
    modelName: 'Olmeca',
    name: 'Olmeca',
    family: 'Tequila',
    origin: 'Jalisco, Mexique',
    abv: 'env. 38 à 40 %',
    base: 'Agave bleu',
    serve: 'Paloma, Margarita, sel fin',
    mood: 'Agave vif, poivre blanc',
    when: "Héritage d'agave mexicain",
    why: "Pour garder la verdeur de l'agave",
    place: 'Los Altos de Jalisco',
    ritual: 'Paloma, citron vert, sel',
    story:
      "Olmeca vient de l'imaginaire solaire de Jalisco, là où l'agave bleu donne des spiritueux tendus, végétaux et francs. Sa place dans la collection rappelle que beaucoup de liqueurs de cocktail ont besoin d'une base vive pour trouver leur relief.",
    notes: ['agave cuit', 'citron vert', 'poivre'],
    accent: '#4aa76d',
  },
  {
    modelName: 'Becherovka',
    name: 'Becherovka',
    family: 'Liqueur aux herbes',
    origin: 'Karlovy Vary, Tchéquie',
    abv: 'env. 38 %',
    base: 'Herbes, épices, alcool neutre',
    serve: 'Frais, tonic, zeste de citron',
    mood: 'Cannelle, girofle, amertume douce',
    when: '1807, ville thermale',
    why: 'Pour lier herboristerie et apéritif',
    place: 'Karlovy Vary',
    ritual: 'Tonic sec, citron',
    story:
      "Becherovka a l'allure d'un remède devenu rituel. Née dans une ville d'eaux, elle mélange amertume, chaleur d'épices et fraîcheur herbacée. Son charme tient à ce balancement entre pharmacie ancienne et apéritif très actuel.",
    notes: ['cannelle', 'clou de girofle', 'herbes fraîches'],
    accent: '#46a979',
  },
  {
    modelName: 'Sortilege',
    name: 'Sortilège',
    family: 'Liqueur whisky érable',
    origin: 'Québec, Canada',
    abv: 'env. 30 %',
    base: "Whisky canadien et sirop d'érable",
    serve: 'Glace, café, dessert',
    mood: 'Érable sombre, bois doux',
    when: 'Recette québécoise moderne',
    why: "Pour marier whisky et érable",
    place: 'Québec',
    ritual: 'Sur glace, en fin de repas',
    story:
      "Sortilège raconte un Québec gourmand : le whisky apporte la charpente, l'érable donne la rondeur et la mémoire des cabanes à sucre. C'est une liqueur de chaleur lente, faite pour les fins de soirée et les desserts sobres.",
    notes: ['érable', 'vanille', 'chêne blond'],
    accent: '#b86b37',
  },
  {
    modelName: 'Havana_Club',
    name: 'Havana Club',
    family: 'Rhum',
    origin: 'Cuba',
    abv: 'env. 40 %',
    base: 'Mélasse de canne à sucre',
    serve: 'Daiquiri, Cuba libre, menthe',
    mood: 'Canne claire, vanille, épices',
    when: '1934, esprit cubain',
    why: 'Pour porter la fraîcheur des cocktails',
    place: 'Cuba',
    ritual: 'Daiquiri très froid',
    story:
      "Havana Club amène la collection vers le rhum de cocktail, celui qui tient une note de canne et laisse les agrumes respirer. Il évoque les comptoirs de La Havane, les verres courts, les recettes simples où la précision compte plus que l'apparat.",
    notes: ['canne', 'vanille', 'banane mûre'],
    accent: '#e8b43e',
  },
  {
    modelName: 'Kahlua',
    name: 'Kahlúa',
    family: 'Liqueur de café',
    origin: 'Veracruz, Mexique',
    abv: 'env. 16 à 20 %',
    base: 'Café arabica et rhum',
    serve: 'Espresso Martini, White Russian',
    mood: 'Café noir, caramel, cacao',
    when: '1936, café mexicain',
    why: 'Pour donner du grain au sucre',
    place: 'Veracruz',
    ritual: 'Espresso Martini',
    story:
      "Kahlúa est une liqueur de nuit : café, rhum, sucre brun et une profondeur qui transforme un cocktail en dessert sec. Elle a traversé les bars grâce à une idée très lisible, faire entrer la torréfaction dans le verre.",
    notes: ['café', 'caramel brun', 'cacao'],
    accent: '#9b5a42',
  },
  {
    modelName: 'Molinari_Sambuka',
    name: 'Molinari Sambuca',
    family: 'Sambuca',
    origin: 'Italie',
    abv: 'env. 40 %',
    base: 'Anis étoilé et sucre',
    serve: 'Très frais, avec trois grains de café',
    mood: 'Anis large, sucre blanc',
    when: '1945, après-guerre italienne',
    why: "Pour donner à l'anis une robe de fête",
    place: 'Civitavecchia, Italie',
    ritual: 'Con la mosca, grains de café',
    story:
      "Molinari a donné à la sambuca une signature immédiatement reconnaissable. L'anis y devient ample, presque lumineux, avec une douceur assumée. C'est une bouteille de rituel, souvent servie glacée ou avec le parfum sec du café.",
    notes: ['anis étoilé', 'sucre', 'café torréfié'],
    accent: '#d9d4b5',
  },
  {
    modelName: 'Pernod',
    name: 'Pernod',
    family: 'Anisé',
    origin: 'France',
    abv: 'env. 40 %',
    base: 'Anis, plantes, réglisse',
    serve: 'Allongé avec eau fraîche',
    mood: 'Anis vert, fenouil, fraîcheur',
    when: '1805, filiation absinthe',
    why: "Pour garder l'esprit anisé sans absinthe",
    place: 'Pontarlier puis Marseille',
    ritual: 'Eau fraîche, verre haut',
    story:
      "Pernod garde la mémoire française des anisés, entre absinthe historique et apéritif de terrasse. L'eau le trouble, le parfum se déploie, et le verre devient lent. Sa force vient de cette transformation visible, presque cérémonielle.",
    notes: ['anis vert', 'fenouil', 'réglisse'],
    accent: '#c8c94c',
  },
  {
    modelName: 'Chivas',
    name: 'Chivas Regal',
    family: 'Scotch whisky',
    origin: 'Écosse',
    abv: 'env. 40 %',
    base: "Assemblage de whiskies d'orge et de grain",
    serve: 'Highball, glace, eau pétillante',
    mood: 'Miel, pomme, malt doux',
    when: '1909, blend de prestige',
    why: "Pour lisser la puissance de l'Écosse",
    place: 'Speyside',
    ritual: 'Highball très frais',
    story:
      "Chivas Regal représente l'art du blend : chercher une texture souple, relier des malts, arrondir les angles sans perdre le grain. Dans cette ronde de bouteilles, il apporte le velours et la patience du bois.",
    notes: ['miel', 'pomme mûre', 'noisette'],
    accent: '#d19a47',
  },
  {
    modelName: 'Crema_di_Limoncino',
    name: 'Crema di Limoncino',
    family: 'Crème de citron',
    origin: 'Italie',
    abv: 'env. 17 %',
    base: 'Citron, crème, alcool',
    serve: 'Très frais, verre givré',
    mood: 'Citron doux, crème fraîche',
    when: 'Tradition de limoncino',
    why: 'Pour adoucir le citron sans le cacher',
    place: 'Italie',
    ritual: 'Sortie du congélateur',
    story:
      "La crema di limoncino prend le citron italien et lui ajoute une texture lactée, presque pâtissière. Là où le limoncello tranche, la crème enveloppe. C'est une liqueur de dessert, solaire mais douce.",
    notes: ['citron', 'crème', 'sucre glacé'],
    accent: '#f1d33f',
  },
  {
    modelName: 'Baileys',
    name: 'Baileys',
    family: 'Crème irlandaise',
    origin: 'Irlande',
    abv: 'env. 17 %',
    base: 'Whiskey irlandais et crème',
    serve: 'Glace, café, dessert',
    mood: 'Crème, cacao, whiskey doux',
    when: '1974, Dublin',
    why: 'Pour rendre le whiskey plus velouté',
    place: 'Irlande',
    ritual: 'Sur glace, verre bas',
    story:
      "Baileys a transformé la crème irlandaise en icône internationale. Sa réussite tient à un contraste simple : la chaleur du whiskey, la rondeur du lait, le cacao qui relie le tout. C'est une liqueur confortable, mais jamais timide.",
    notes: ['crème', 'cacao', 'vanille'],
    accent: '#c98963',
  },
  {
    modelName: 'Absolut_Vodka',
    name: 'Absolut Vodka',
    family: 'Vodka',
    origin: 'Åhus, Suède',
    abv: 'env. 40 %',
    base: "Blé d'hiver",
    serve: 'Martini, tonic, cocktail sec',
    mood: 'Net, céréale fine, poivre léger',
    when: '1879, distillation continue',
    why: 'Pour offrir une base claire au cocktail',
    place: 'Åhus, Suède',
    ritual: 'Martini très froid',
    story:
      "Absolut incarne la vodka comme page blanche exigeante. Le style est volontairement net, presque architectural, afin de laisser les aromates, les jus et les liqueurs prendre la lumière sans déséquilibrer le verre.",
    notes: ['céréale', 'poivre blanc', 'finale propre'],
    accent: '#66a8d8',
  },
  {
    modelName: 'Jagermeister',
    name: 'Jägermeister',
    family: 'Liqueur aux herbes',
    origin: 'Wolfenbüttel, Allemagne',
    abv: 'env. 35 %',
    base: 'Herbes, racines, épices',
    serve: 'Glacé, verre court',
    mood: 'Herbes sombres, réglisse, orange',
    when: '1935, recette allemande',
    why: "Pour condenser l'amertume en rituel",
    place: 'Basse-Saxe',
    ritual: 'Sortie du congélateur',
    story:
      "Jägermeister est une liqueur dense, construite autour d'herbes et d'épices qui donnent une amertume profonde. Elle joue le froid, le verre court, le service direct. Derrière l'image festive, il y a un vrai profil d'amaro du Nord.",
    notes: ['réglisse', 'orange amère', 'racines'],
    accent: '#5f9b55',
  },
  {
    modelName: 'Martel',
    name: 'Martell',
    family: 'Cognac',
    origin: 'Cognac, France',
    abv: 'env. 40 %',
    base: 'Eaux-de-vie de vin',
    serve: 'Tulipe, glace large, cocktail noble',
    mood: 'Fruits secs, bois, fleur blanche',
    when: '1715, maison charentaise',
    why: 'Pour faire vieillir le vin en lumière',
    place: 'Charente',
    ritual: 'Verre tulipe, temps calme',
    story:
      "Martell inscrit la collection dans le temps long du cognac. La bouteille parle de distillation, de chêne, de patience et d'assemblage. On y cherche moins le choc que la persistance, cette chaleur qui reste quand le verre est reposé.",
    notes: ['abricot sec', 'chêne', 'épices douces'],
    accent: '#bb7039',
  },
  {
    modelName: 'Malibu',
    name: 'Malibu',
    family: 'Liqueur au rhum',
    origin: 'Caraïbes',
    abv: 'env. 21 %',
    base: 'Rhum et noix de coco',
    serve: 'Ananas, glace pilée, long drink',
    mood: 'Coco, vanille, soleil',
    when: 'Années 1980, bar tropical',
    why: 'Pour rendre le rhum instantanément solaire',
    place: 'Caraïbes',
    ritual: 'Ananas, citron vert, glace pilée',
    story:
      "Malibu assume le plaisir direct : coco, rhum, fruits, glace. Son intérêt est sa lisibilité. En une note, elle transporte le cocktail vers le bord de mer et rappelle que la liqueur est aussi affaire de décor mental.",
    notes: ['noix de coco', 'vanille', 'ananas'],
    accent: '#efce7b',
  },
  {
    modelName: 'Ramazzotti',
    name: 'Ramazzotti',
    family: 'Amaro',
    origin: 'Milan, Italie',
    abv: 'env. 30 %',
    base: 'Herbes, oranges, épices',
    serve: 'Spritz, soda, orange',
    mood: 'Orange amère, gentiane, cola',
    when: '1815, Milan',
    why: "Pour ouvrir l'appétit avec amertume",
    place: 'Lombardie',
    ritual: 'Soda, orange, glace',
    story:
      "Ramazzotti est un amaro urbain, né à Milan, avec une amertume accessible et une note d'orange qui le rend très souple. Il fonctionne comme apéritif, digestif ou colonne vertébrale d'un spritz sombre.",
    notes: ['orange amère', 'gentiane', 'épices'],
    accent: '#e06936',
  },
  {
    modelName: 'Beefeater',
    name: 'Beefeater',
    family: 'London dry gin',
    origin: 'Londres, Royaume-Uni',
    abv: 'env. 40 %',
    base: 'Alcool de grain et botaniques',
    serve: 'Gin tonic, Martini, zeste',
    mood: 'Genièvre, agrumes, racine sèche',
    when: '1863, Londres',
    why: 'Pour donner une colonne vertébrale sèche',
    place: 'London dry',
    ritual: 'Tonic vif, zeste de citron',
    story:
      "Beefeater apporte la ligne droite du gin londonien : genièvre, agrumes, racines, finale sèche. Dans l'univers des liqueurs, il agit comme un contrepoint, une structure nette qui évite au sucre de prendre toute la place.",
    notes: ['genièvre', 'citron', 'angélique'],
    accent: '#d64a43',
  },
  {
    modelName: 'Jameson',
    name: 'Jameson',
    family: 'Irish whiskey',
    origin: 'Dublin, Irlande',
    abv: 'env. 40 %',
    base: 'Orge maltée et non maltée',
    serve: 'Highball, ginger ale, glace',
    mood: 'Céréale douce, pomme, vanille',
    when: '1780, Dublin',
    why: 'Pour chercher la douceur irlandaise',
    place: 'Irlande',
    ritual: 'Ginger ale, citron vert',
    story:
      "Jameson est souvent le whiskey de la conversation facile : souple, fruité, chaleureux sans être lourd. Il se glisse dans les highballs, les cafés et les mélanges où une liqueur a besoin d'une base accueillante.",
    notes: ['pomme', 'vanille', 'céréale'],
    accent: '#74a95d',
  },
  {
    modelName: "Jack_Daniel's",
    name: "Jack Daniel's",
    family: 'Tennessee whiskey',
    origin: 'Lynchburg, États-Unis',
    abv: 'env. 40 %',
    base: 'Maïs, seigle, orge maltée',
    serve: 'Old fashioned, cola, glace',
    mood: 'Maïs doux, charbon, vanille',
    when: '1866, Tennessee',
    why: 'Pour filtrer le whiskey sur charbon',
    place: 'Lynchburg',
    ritual: 'Verre bas, glaçon large',
    story:
      "Jack Daniel's marque le passage par le Tennessee : maïs, vanille, chêne et cette filtration au charbon qui signe le style. Dans un cocktail, il donne une présence américaine, carrée, légèrement fumée.",
    notes: ['vanille', 'caramel', 'bois toasté'],
    accent: '#c99c4d',
  },
  {
    modelName: 'Curacao',
    name: 'Curaçao',
    family: "Liqueur d'orange",
    origin: 'Curaçao, Caraïbes',
    abv: 'env. 20 à 40 %',
    base: "Écorces de laraha et d'orange",
    serve: 'Tiki, sour, trait coloré',
    mood: 'Orange confite, zeste, sucre clair',
    when: 'Tradition caribéenne',
    why: "Pour parfumer l'orange avec couleur",
    place: 'Île de Curaçao',
    ritual: 'Cocktail tropical, verre givré',
    story:
      "Le curaçao vient d'une orange devenue symbole : le laraha, amer et parfumé. Bleu, blanc ou ambré selon les styles, il donne aux cocktails une couleur franche et un parfum d'agrume confit.",
    notes: ['orange confite', 'zeste', 'sucre léger'],
    accent: '#2ba4ce',
  },
];

const researchedProfiles = {
  Cointreau: {
    story:
      "Cointreau est l'une des signatures qui ont rendu le triple sec indispensable au bar moderne. La maison naît à Angers au XIXe siècle, puis affine une liqueur limpide où les écorces d'orange douce et amère donnent du relief sans lourdeur. Son intérêt n'est pas seulement le sucre : c'est la tension, l'éclat et cette façon de raccorder spiritueux, agrumes et acidité dans un cocktail.",
    detail: {
      taste:
        "Attaque claire sur le zeste, puis orange amère, sucre très tenu et finale sèche. Le parfum reste net, presque cristallin, sans impression sirupeuse.",
      heritage:
        "La distillerie Cointreau est créée en 1849. Les premières bouteilles de la formule d'orange moderne arrivent dans les années 1870 et s'installent ensuite dans les grands classiques du bar.",
      craft:
        "La personnalité vient du contraste entre écorces douces et amères, travaillées avec un alcool neutre. La liqueur reste incolore malgré l'imaginaire très orange de sa bouteille.",
      service:
        "Parfait dans une Margarita, un Sidecar, un Cosmopolitan ou simplement sur glace. Il faut le doser comme une lumière : assez pour parfumer, jamais au point d'écraser.",
    },
    notes: ['orange amère', 'zeste frais', 'finale sèche', 'cocktail iconique'],
  },
  Olmeca: {
    story:
      "Olmeca fait entrer la collection dans le paysage minéral de Jalisco : agave bleu, fours, pierre volcanique et chaleur sèche. La tequila apporte une verticalité que les liqueurs seules n'ont pas toujours : une base végétale, poivrée, presque saline, capable de faire respirer un cocktail très fruité ou très sucré.",
    detail: {
      taste:
        "Profil vif, avec agave cuit, citron vert, poivre blanc et une pointe herbacée. La finale garde une sensation sèche qui donne envie d'un agrume.",
      heritage:
        "La marque est associée à Jalisco et à la ville d'Arandas. Elle s'inscrit dans une famille de tequilas où la matière première, l'agave bleu, reste le centre du récit.",
      craft:
        "L'univers Olmeca met en avant la cuisson lente des piñas et l'usage de la tahona, une meule de pierre volcanique, dans une partie du travail de l'agave.",
      service:
        "À servir en Paloma avec pamplemousse, en Margarita sèche, ou simplement avec citron vert et sel fin. Sa verdeur évite les mélanges trop mous.",
    },
    notes: ['agave cuit', 'citron vert', 'poivre blanc', 'sel fin'],
  },
  Becherovka: {
    story:
      "Becherovka a l'allure d'un remède de ville thermale devenu rituel d'apéritif. À Karlovy Vary, la recette traverse deux siècles avec son mélange d'herbes, d'épices et d'amertume douce. Elle raconte une Europe centrale plus fraîche qu'on ne l'imagine : cannelle, gingembre, clou de girofle, puis une finale qui nettoie le palais.",
    detail: {
      taste:
        "Chaleur de cannelle et de gingembre, amertume herbacée, douceur mesurée. Le nez est épicé, mais la bouche reste tonique et digestive.",
      heritage:
        "Née en 1807 à Karlovy Vary, l'ancienne Karlsbader Becherbitter garde une image de digestif thermal. Elle est devenue l'un des grands exports tchèques.",
      craft:
        "La recette repose sur plus de vingt plantes et épices. La tradition veut que seuls quelques gardiens connaissent l'assemblage complet.",
      service:
        "Très froide en verre court, ou allongée de tonic dans le Beton. Un zeste de citron lui donne une tension plus contemporaine.",
    },
    notes: ['cannelle', 'gingembre', 'clou de girofle', 'tonic sec'],
  },
  Sortilege: {
    story:
      "Sortilège est une bouteille de cabane à sucre en habit de soirée : whisky canadien, sirop d'érable québécois et une douceur qui ne cherche pas à masquer le bois. Elle fonctionne parce que l'érable n'est pas traité comme un simple parfum, mais comme une texture : ample, dorée, presque fumante.",
    detail: {
      taste:
        "Érable franc, caramel blond, vanille et une touche de seigle. La bouche est ronde, mais le whisky apporte juste assez d'épice pour tenir la finale.",
      heritage:
        "La liqueur s'appuie sur deux marqueurs très canadiens : le whisky et le sirop d'érable du Québec. Son imaginaire vient autant du froid que du dessert.",
      craft:
        "La version originale assemble whisky canadien et sirop d'érable pur. Certaines fiches techniques évoquent un whisky de seigle canadien vieilli au moins trois ans.",
      service:
        "Sur glace, dans un café, avec un dessert peu sucré ou en twist d'Old Fashioned. Il faut le garder frais pour éviter l'excès de rondeur.",
    },
    notes: ['érable', 'seigle', 'caramel blond', 'bois doux'],
  },
  Havana_Club: {
    story:
      "Havana Club porte toute l'ambiguïté romanesque du rhum cubain : une marque née à Cárdenas, une histoire bouleversée par la révolution, puis un nom devenu symbole de cocktail à travers le monde. Dans la collection, il apporte la canne, la chaleur, et cette élégance simple qui fait qu'un Daiquiri peut sembler plus sophistiqué qu'un long discours.",
    detail: {
      taste:
        "Canne claire, vanille légère, banane mûre et épices douces. Le profil reste assez sec pour laisser le citron vert et la menthe prendre leur place.",
      heritage:
        "Créée en 1934 par la famille Arechabala, la marque est ensuite nationalisée à Cuba. Son histoire moderne est aussi marquée par un conflit de marque avec Bacardi.",
      craft:
        "Le style cubain cherche souvent la légèreté, l'assemblage et la buvabilité. La mélasse de canne donne la base, le vieillissement apporte le ton doré.",
      service:
        "Daiquiri très froid, Cuba Libre propre, Mojito sans excès de sucre. Son meilleur rôle est de donner du mouvement aux agrumes.",
    },
    notes: ['canne', 'vanille', 'citron vert', 'rhum cubain'],
  },
  Kahlua: {
    story:
      "Kahlúa transforme le café en liqueur de nuit : Veracruz, arabica, rhum, sucre brun et une profondeur presque pâtissière. Elle a traversé les décennies parce qu'elle parle immédiatement au nez : torréfaction, caramel, cacao. Dans un cocktail, elle donne du grain, du contraste et cette impression de dessert sec.",
    detail: {
      taste:
        "Café noir, caramel brun, cacao, pointe de vanille. La bouche est suave, mais la torréfaction évite l'impression de simple sirop.",
      heritage:
        "Produite à partir de 1936 au Mexique, Kahlúa est liée à Veracruz et au café arabica. Son nom renvoie à une racine nahuatl associée aux Acolhua.",
      craft:
        "La recette associe rhum, sucre et café. Elle contient naturellement un peu de caféine, ce qui explique son énergie particulière dans les cocktails au café.",
      service:
        "Espresso Martini, White Russian, Black Russian ou trait sur glace vanille. Elle aime le froid, la crème et les contrastes amers.",
    },
    notes: ['café arabica', 'caramel brun', 'cacao', 'rhum'],
  },
  Molinari_Sambuka: {
    story:
      "Molinari Sambuca est l'Italie de l'après-guerre en version transparente : Civitavecchia, anis étoilé, cafés romains et tables de la Dolce Vita. La bouteille a quelque chose de théâtral, mais son profil est très direct : une grande vague d'anis, du sucre blanc, puis le parfum sec des grains de café.",
    detail: {
      taste:
        "Anis étoilé large, sucre net, touches de réglisse et finale fraîche. Avec le café, elle gagne un relief torréfié qui casse la douceur.",
      heritage:
        "Angelo Molinari crée sa Sambuca Extra en 1945 à Civitavecchia. Dans les années 1950 et 1960, elle s'installe dans les cafés et restaurants de Rome.",
      craft:
        "La maison met en avant une recette secrète à base d'anis étoilé. La force de Molinari vient de la pureté aromatique autant que du rituel de service.",
      service:
        "Très froide, dans le café, ou con la mosca avec quelques grains. Le feu existe dans le folklore, mais un service frais et simple est souvent plus élégant.",
    },
    notes: ['anis étoilé', 'réglisse', 'sucre blanc', 'grains de café'],
  },
  Pernod: {
    story:
      "Pernod garde la mémoire française des anisés, entre absinthe historique et apéritif de terrasse. Le geste est essentiel : on verse, on allonge d'eau fraîche, le verre se trouble et le parfum s'ouvre. C'est une bouteille de transformation, moins spectaculaire par son étiquette que par ce nuage laiteux qui apparaît dans le verre.",
    detail: {
      taste:
        "Anis étoilé, fenouil, menthe légère, herbes sèches et très peu de réglisse. La finale est fraîche, presque verte.",
      heritage:
        "Les racines remontent à Henri-Louis Pernod et à Pontarlier en 1805. Le Pernod moderne descend de cette tradition anisée, adaptée après l'interdiction de l'absinthe.",
      craft:
        "La maison décrit un assemblage autour de l'anis étoilé, du fenouil et d'autres plantes aromatiques. L'anéthol provoque le trouble quand l'eau arrive.",
      service:
        "Eau très fraîche, glaçons à part ou ajoutés après dilution. Il accompagne bien les moments lents, les olives, le fenouil et les poissons grillés.",
    },
    notes: ['anis étoilé', 'fenouil', 'herbes', 'eau fraîche'],
  },
  Chivas: {
    story:
      "Chivas Regal représente l'art du blend écossais : relier des whiskies de grain et de malt pour chercher une texture souple, régulière, presque veloutée. Là où un single malt peut parler fort, Chivas travaille la continuité : miel, pomme, noisette, bois poli. C'est une bouteille de salon plus que de démonstration.",
    detail: {
      taste:
        "Miel, pomme mûre, céréale douce, noisette et bois blond. La bouche privilégie l'arrondi, avec une finale propre et légèrement épicée.",
      heritage:
        "Chivas Regal apparaît en 1909 comme whisky de luxe de 25 ans. La version 12 ans devient ensuite un repère mondial du scotch premium.",
      craft:
        "Le blend assemble des whiskies écossais de styles différents. L'enjeu est moins la puissance que l'équilibre et la constance d'une maison.",
      service:
        "Highball très frais, eau pétillante, gros glaçon ou verre tulipe. Il gagne à être servi sans décor trop sucré.",
    },
    notes: ['miel', 'pomme', 'noisette', 'blend écossais'],
  },
  Crema_di_Limoncino: {
    story:
      "La crema di limoncino est la cousine douce du limoncello : même soleil de citron italien, mais enveloppé de crème. Le citron n'y tranche pas, il fond. La bouteille raconte les fins de repas froides, les verres sortis du congélateur et une gourmandise presque pâtissière.",
    detail: {
      taste:
        "Citron jaune, crème fraîche, sucre glacé et zeste doux. La texture est le sujet principal : ronde, froide, presque dessert.",
      heritage:
        "Le limoncello vient surtout d'Italie du Sud, autour de Naples, Salerne, Amalfi, Sicile ou Gargano. La version crème remplace le sirop clair par une base lactée.",
      craft:
        "Le limoncello classique extrait les huiles du zeste dans l'alcool. La crema di limoncino ajoute une matière laitière et descend souvent autour de 17 %.",
      service:
        "À garder très froid, idéalement en petit verre givré. Très bon avec sablé, panettone, fruits rouges ou simple espresso.",
    },
    notes: ['citron', 'crème', 'zeste doux', 'verre givré'],
  },
  Baileys: {
    story:
      "Baileys a rendu la crème irlandaise immédiatement lisible : whiskey, crème, cacao, vanille et une texture parfaitement stable. Son histoire est moderne, presque marketing, mais la réussite est réelle : transformer deux produits irlandais puissants en une liqueur mondiale, confortable, ronde et reconnaissable en une seconde.",
    detail: {
      taste:
        "Crème, cacao, vanille, caramel et chaleur douce du whiskey. La bouche est dense, mais le chocolat garde une petite amertume utile.",
      heritage:
        "Lancé en 1974, Baileys est considéré comme l'Irish cream originelle. Le nom vient d'un restaurant londonien, même si l'identité de la boisson est irlandaise.",
      craft:
        "La crème et le whiskey sont émulsionnés pour rester stables. La recette ajoute cacao, sucre, vanille, caramel et d'autres arômes tenus secrets.",
      service:
        "Sur glace, dans un café, avec chocolat noir ou en dessert liquide. Il fonctionne mieux froid, servi court, sans surcharge.",
    },
    notes: ['crème', 'cacao', 'vanille', 'whiskey irlandais'],
  },
  Absolut_Vodka: {
    story:
      "Absolut joue la vodka comme architecture : une bouteille claire, une origine précise à Åhus, du blé d'hiver et l'idée d'un alcool net qui laisse les autres ingrédients parler. Dans cette collection très parfumée, elle sert de silence utile : elle allonge, structure et donne de la tenue aux agrumes, herbes et liqueurs.",
    detail: {
      taste:
        "Profil propre, céréale fine, poivre blanc léger et finale sèche. L'intérêt est dans la netteté plus que dans l'exubérance aromatique.",
      heritage:
        "La maison remonte à Lars Olsson Smith et à 1879. La marque Absolut Vodka arrive sur le marché mondial en 1979 et devient célèbre par sa bouteille et ses campagnes visuelles.",
      craft:
        "La production est associée à Åhus, en Suède, avec du blé d'hiver. Le style recherche une base régulière, claire et très contrôlée.",
      service:
        "Martini, tonic sec, cocktail aux herbes ou trait glacé. Elle gagne à être très froide et accompagnée d'ingrédients précis.",
    },
    notes: ['céréale fine', 'poivre blanc', 'vodka suédoise', 'base nette'],
  },
  Jagermeister: {
    story:
      "Jägermeister est souvent réduit à la fête, alors qu'il appartient d'abord à la famille des digestifs amers. Sa force vient d'un profil sombre : herbes, racines, écorces, réglisse, orange amère. Servi glacé, il devient plus droit, presque médicinal, avec une intensité qui tient mieux qu'on ne l'attend.",
    detail: {
      taste:
        "Réglisse, orange amère, racines, cannelle et notes résineuses. Le froid resserre la douceur et fait ressortir l'amertume.",
      heritage:
        "Développé en 1934 par Curt Mast à Wolfenbüttel, le nom signifie littéralement maître chasseur. La bouteille verte est devenue un signe mondial.",
      craft:
        "La recette est célèbre pour ses 56 herbes et épices. Elle reste stable depuis la création de la boisson et donne un digestif dense à 35 %.",
      service:
        "Sorti du congélateur en verre court, ou en touche amère dans un cocktail sombre. Il faut éviter les mélanges trop sucrés qui l'alourdissent.",
    },
    notes: ['réglisse', 'orange amère', 'racines', '56 plantes'],
  },
  Martel: {
    story:
      "Martell inscrit la collection dans le temps long du cognac : la Charente, le fleuve, les eaux-de-vie, le bois et l'assemblage patient. Fondée en 1715, la maison parle moins de fraîcheur immédiate que de persistance : fruits secs, fleur blanche, chêne, épices douces et chaleur qui reste après le verre.",
    detail: {
      taste:
        "Abricot sec, raisin blond, chêne fin, fleur blanche et épices douces. La texture est souple, avec une finale chaude mais polie.",
      heritage:
        "Jean Martell fonde la maison en 1715 à Cognac. Elle est la plus ancienne des grandes maisons souvent citées aux côtés de Hennessy, Rémy Martin et Courvoisier.",
      craft:
        "La maison a longtemps valorisé les eaux-de-vie des Borderies et les fûts de chêne de Tronçais, recherchés pour leur finesse.",
      service:
        "Verre tulipe, temps calme, ou cocktail noble comme un Sidecar. Un gros glaçon peut ouvrir le bois sans effacer le fruit.",
    },
    notes: ['abricot sec', 'chêne', 'fleur blanche', 'cognac'],
  },
  Malibu: {
    story:
      "Malibu assume le plaisir direct : coco, rhum blanc, ananas, glace. La bouteille est née pour rendre la Piña Colada plus simple à préparer, et elle garde ce rôle solaire. Elle ne cherche pas la profondeur d'un vieux rhum ; elle apporte une image nette, presque instantanée, de cocktail tropical.",
    detail: {
      taste:
        "Noix de coco douce, vanille, sucre clair et une petite chaleur de rhum. Avec l'ananas, elle devient plus vive et moins confiserie.",
      heritage:
        "Créée en 1978, la marque est aujourd'hui associée à la Barbade et à Pernod Ricard. Son nom évoque la Californie, mais son imaginaire publicitaire est caribéen.",
      craft:
        "Malibu est une liqueur à base de rhum blanc et de coco. La production s'est déplacée vers la Barbade lorsque la marque a grandi.",
      service:
        "Ananas frais, citron vert, glace pilée, ou long drink très simple. Le secret est l'acidité : elle donne de l'élégance à la coco.",
    },
    notes: ['noix de coco', 'ananas', 'rhum blanc', 'glace pilée'],
  },
  Ramazzotti: {
    story:
      "Ramazzotti est un amaro urbain : Milan, 1815, une recette de 33 herbes, épices, fleurs et fruits, puis un équilibre entre orange douce, gentiane, rhubarbe et chaleur méditerranéenne. C'est moins austère que certains amari, plus rond, avec une amertume qui arrive en douceur.",
    detail: {
      taste:
        "Orange amère, gentiane, rhubarbe, herbes méditerranéennes et épices chaudes. La finale évoque parfois cola, réglisse et chocolat noir.",
      heritage:
        "Ausano Ramazzotti crée l'amaro en 1815 à Milan. La marque le présente comme l'une des premières grandes maisons italiennes d'amaro.",
      craft:
        "La recette secrète assemble 33 ingrédients, dont orange, quinquina, rhubarbe, gentiane, romarin, origan, hysope, myrrhe et curcuma.",
      service:
        "Sur glace avec orange, en spritz sombre, avec soda ou dans un Negroni chocolaté. Il aime les bulles et les zestes.",
    },
    notes: ['orange amère', 'gentiane', 'rhubarbe', '33 plantes'],
  },
  Beefeater: {
    story:
      "Beefeater apporte la ligne droite du London dry gin : genièvre, agrumes, racines, coriandre, réglisse discrète. Sa présence dans la collection empêche le sucre de prendre toute la place. Il est sec, lisible, presque graphique, avec ce parfum de gin qui donne de la colonne vertébrale aux cocktails.",
    detail: {
      taste:
        "Genièvre net, citron, orange de Séville, coriandre et racines sèches. La bouche est franche, avec une finale longue sur les botaniques.",
      heritage:
        "James Burrough développe son style de gin à Londres au XIXe siècle. Le nom Beefeater renvoie aux Yeomen of the Guard, figures de la Tour de Londres.",
      craft:
        "La recette classique met en avant neuf botaniques : genièvre, angélique, coriandre, réglisse, amande, iris, orange de Séville et citron.",
      service:
        "Gin tonic sec, Martini, Gimlet ou Collins. Un zeste de citron suffit souvent : le gin a déjà sa structure.",
    },
    notes: ['genièvre', 'citron', 'coriandre', 'London dry'],
  },
  Jameson: {
    story:
      "Jameson est le whiskey de la conversation facile, mais son histoire est plus solide que son image décontractée. Né à Dublin en 1780, il porte la tradition irlandaise du blend, du pot still et d'une texture souple. Il donne aux cocktails une chaleur céréalière sans fumée lourde.",
    detail: {
      taste:
        "Pomme, céréale douce, vanille, poire et chêne léger. La finale reste ronde, accessible, avec une pointe d'épice.",
      heritage:
        "John Jameson fonde sa distillerie à Bow Street en 1780. La production moderne se fait surtout à Midleton, dans le comté de Cork.",
      craft:
        "Jameson assemble whiskey de grain et single pot still, avec orge maltée et non maltée. L'orge est séchée en four fermé, sans fumée tourbée marquée.",
      service:
        "Highball au ginger ale, café irlandais, sour ou simple glaçon. Sa douceur supporte bien le citron et le gingembre.",
    },
    notes: ['pomme', 'céréale', 'vanille', 'pot still'],
  },
  "Jack_Daniel's": {
    story:
      "Jack Daniel's est une image américaine immédiatement reconnaissable : Lynchburg, bouteille carrée, maïs doux, charbon d'érable et Tennessee whiskey. Derrière le folklore, il y a un profil très utile en cocktail : vanille, caramel, bois toasté, une douceur qui tient face au cola comme aux bitters.",
    detail: {
      taste:
        "Maïs doux, vanille, caramel, bois toasté et une légère note fumée. La finale reste souple, avec une touche de charbon.",
      heritage:
        "La distillerie de Lynchburg est liée à Jack Daniel et à Nathan Green, souvent cité comme mentor et maître distillateur. Brown-Forman possède la marque depuis 1956.",
      craft:
        "Le style Tennessee whiskey passe par le Lincoln County Process : une filtration sur charbon d'érable avant vieillissement en fûts neufs brûlés.",
      service:
        "Old Fashioned simple, Whiskey Sour, cola propre ou gros glaçon. Les bitters et l'orange équilibrent bien sa douceur.",
    },
    notes: ['vanille', 'caramel', 'charbon d’érable', 'Tennessee'],
  },
  Curacao: {
    story:
      "Le curaçao est l'autre grand récit de l'orange : celui de la laraha, agrume amer de l'île de Curaçao, dont la peau séchée devient parfum. Bleu, ambré ou transparent, il donne aux cocktails un signal immédiat. Sa couleur peut être ludique, mais son meilleur intérêt reste le zeste, entre amertume et confit.",
    detail: {
      taste:
        "Orange confite, zeste amer, sucre clair et légère note florale. Les versions bleues ajoutent surtout la couleur, pas une saveur différente majeure.",
      heritage:
        "La liqueur apparaît dans l'univers colonial néerlandais et l'histoire des distilleries comme Bols. Senior & Co continue de revendiquer l'usage de laraha de Curaçao.",
      craft:
        "Le parfum vient des peaux séchées de laraha, héritière locale de l'orange amère de Séville. Les degrés peuvent varier largement selon les marques.",
      service:
        "Tiki, Blue Lagoon, Margarita colorée ou sour tropical. À doser avec précision : la couleur va vite, le sucre aussi.",
    },
    notes: ['laraha', 'orange confite', 'zeste amer', 'bleu curaçao'],
  },
};

bottleProfiles.forEach((profile) => {
  Object.assign(profile, researchedProfiles[profile.modelName] ?? {});
});

const sourceCatalog = {
  ibaList: { label: 'IBA, liste officielle', url: 'https://iba-world.com/iba-official-cocktail-list/' },
  margarita: { label: 'IBA, Margarita', url: 'https://iba-world.com/iba-cocktail/margarita/' },
  paloma: { label: 'IBA, Paloma', url: 'https://iba-world.com/iba-cocktail/paloma/' },
  sidecar: { label: 'IBA, Sidecar', url: 'https://iba-world.com/iba-cocktail/sidecar/' },
  whiteLady: { label: 'IBA, White Lady', url: 'https://iba-world.com/iba-cocktail/white-lady/' },
  daiquiri: { label: 'IBA, Daiquiri', url: 'https://iba-world.com/iba-cocktail/daiquiri/' },
  mojito: { label: 'IBA, Mojito', url: 'https://iba-world.com/iba-cocktail/mojito/' },
  cubaLibre: { label: 'IBA, Cuba Libre', url: 'https://iba-world.com/iba-cocktail/cuba-libre/' },
  espressoMartini: { label: 'IBA, Espresso Martini', url: 'https://iba-world.com/iba-cocktail/espresso-martini/' },
  blackRussian: { label: 'IBA, Black Russian', url: 'https://iba-world.com/iba-cocktail/black-russian/' },
  dryMartini: { label: 'IBA, Dry Martini', url: 'https://iba-world.com/iba-cocktail/dry-martini/' },
  vesper: { label: 'IBA, Vesper', url: 'https://iba-world.com/iba-cocktail/vesper/' },
  lemonDrop: { label: 'IBA, Lemon Drop Martini', url: 'https://iba-world.com/iba-cocktail/lemon-drop-martini/' },
  negroni: { label: 'IBA, Negroni', url: 'https://iba-world.com/iba-cocktail/negroni/' },
  ginFizz: { label: 'IBA, Gin Fizz', url: 'https://iba-world.com/iba-cocktail/gin-fizz/' },
  beesKnees: { label: "IBA, Bee's Knees", url: 'https://iba-world.com/iba-cocktail/bees-knees/' },
  bramble: { label: 'IBA, Bramble', url: 'https://iba-world.com/iba-cocktail/bramble/' },
  irishCoffee: { label: 'IBA, Irish Coffee', url: 'https://iba-world.com/iba-cocktail/irish-coffee/' },
  whiskeySour: { label: 'IBA, Whiskey Sour', url: 'https://iba-world.com/iba-cocktail/whiskey-sour/' },
  oldFashioned: { label: 'IBA, Old Fashioned', url: 'https://iba-world.com/iba-cocktail/old-fashioned/' },
  newYorkSour: { label: 'IBA, New York Sour', url: 'https://iba-world.com/iba-cocktail/new-york-sour/' },
  sazerac: { label: 'IBA, Sazerac', url: 'https://iba-world.com/iba-cocktail/sazerac/' },
  rustyNail: { label: 'IBA, Rusty Nail', url: 'https://iba-world.com/iba-cocktail/rusty-nail/' },
  becherovkaBeton: { label: 'Becherovka, BeTon', url: 'https://www.becherovka.com/en/cocktails/original-beton/' },
  becherovkaEspresso: { label: 'Becherovka, Espresso BeTon', url: 'https://www.becherovka.com/en/cocktails/espresso-beton/' },
  baileys: { label: 'Baileys, cocktails', url: 'https://www.baileys.com/en-us/recipes/cocktails' },
  jamesonGinger: { label: 'Jameson, Ginger & Lime', url: 'https://www.jamesonwhiskey.com/en-US/drinks/jameson-ginger-and-lime' },
};

const cocktailProfiles = {
  Cointreau: {
    intro:
      "Cointreau aime les verres courts, l'acidité nette et les spiritueux qui ont besoin d'un trait d'orange pour se mettre en place.",
    pairings: ['citron vert', 'cognac', 'tequila blanco', 'sel fin', 'verre givré'],
    sources: [sourceCatalog.margarita, sourceCatalog.sidecar, sourceCatalog.whiteLady],
    ideas: [
      {
        name: 'Margarita sèche',
        style: 'Classique',
        ingredients: ['tequila', 'Cointreau', 'citron vert', 'demi-bord de sel'],
        method: 'Secouer très froid, servir en coupe ou sur gros glaçon.',
      },
      {
        name: 'Sidecar clair',
        style: 'Cognac',
        ingredients: ['cognac', 'Cointreau', 'citron jaune'],
        method: 'Secouer, filtrer finement, garder le sucre très discret.',
      },
      {
        name: 'White Lady nerveuse',
        style: 'Gin',
        ingredients: ['gin sec', 'Cointreau', 'citron jaune'],
        method: 'Secouer fort pour obtenir une texture satinée et une finale vive.',
      },
    ],
  },
  Olmeca: {
    intro:
      "La tequila donne de la verticalité : agave, sel, agrumes et bulles. Les meilleurs mélanges restent frais et pas trop sucrés.",
    pairings: ['pamplemousse rose', 'citron vert', 'sel', 'ananas grillé', 'piment doux'],
    sources: [sourceCatalog.paloma, sourceCatalog.margarita, sourceCatalog.ibaList],
    ideas: [
      {
        name: 'Paloma saline',
        style: 'Highball',
        ingredients: ['tequila', 'pamplemousse pétillant', 'citron vert', 'pincée de sel'],
        method: 'Construire sur glace et remuer juste assez pour garder les bulles.',
      },
      {
        name: 'Margarita vive',
        style: 'Secoué',
        ingredients: ['tequila', 'triple sec', 'citron vert', 'sel fin'],
        method: 'Secouer court, servir très froid avec un bord salé partiel.',
      },
      {
        name: 'Agave tonic',
        style: 'Long drink',
        ingredients: ['tequila', 'tonic sec', 'citron vert', 'trait de sirop d’agave'],
        method: 'Verser sur glace haute, finir avec un zeste ou une tranche fine.',
      },
    ],
  },
  Becherovka: {
    intro:
      "Becherovka fonctionne comme une amertume épicée : tonic, café, agrumes et glace lui donnent un côté très moderne.",
    pairings: ['tonic sec', 'citron', 'espresso', 'orange', 'gingembre'],
    sources: [sourceCatalog.becherovkaBeton, sourceCatalog.becherovkaEspresso, sourceCatalog.ibaList],
    ideas: [
      {
        name: 'BeTon original',
        style: 'Signature',
        ingredients: ['Becherovka', 'tonic', 'glace', 'citron'],
        method: 'Construire dans un verre haut, remuer doucement, garder très frais.',
      },
      {
        name: 'Espresso BeTon',
        style: 'Amer café',
        ingredients: ['Becherovka', 'tonic', 'espresso court', 'lime'],
        method: 'Ajouter l’espresso en dernier pour une couche aromatique sombre.',
      },
      {
        name: 'Sour thermal',
        style: 'Secoué',
        ingredients: ['Becherovka', 'citron', 'sirop léger', 'blanc d’œuf optionnel'],
        method: 'Secouer fort, servir en petit verre pour arrondir les épices.',
      },
    ],
  },
  Sortilege: {
    intro:
      "Sortilège transforme un verre en dessert contrôlé. Le plus important est de l’équilibrer avec café, citron ou amertume.",
    pairings: ['café filtre', 'citron jaune', 'bitters aromatiques', 'noix de pécan', 'glace large'],
    sources: [sourceCatalog.oldFashioned, sourceCatalog.whiskeySour, sourceCatalog.ibaList],
    ideas: [
      {
        name: 'Maple Old Fashioned',
        style: 'Remué',
        ingredients: ['whiskey', 'Sortilège', 'bitters', 'zeste d’orange'],
        method: 'Remuer sur glace, servir sur gros glaçon avec une orange exprimée.',
      },
      {
        name: 'Café érable',
        style: 'Chaud',
        ingredients: ['café noir', 'Sortilège', 'crème légèrement fouettée'],
        method: 'Verser dans une tasse chaude et laisser la crème flotter au-dessus.',
      },
      {
        name: 'Sour cabane',
        style: 'Secoué',
        ingredients: ['Sortilège', 'citron', 'whiskey', 'blanc d’œuf optionnel'],
        method: 'Secouer avec glace, filtrer, finir avec une pointe de muscade.',
      },
    ],
  },
  Havana_Club: {
    intro:
      "Havana Club est parfait quand le cocktail doit rester simple : rhum, citron vert, menthe, sucre tenu et beaucoup de froid.",
    pairings: ['citron vert', 'menthe', 'cola', 'miel', 'ananas frais'],
    sources: [sourceCatalog.daiquiri, sourceCatalog.mojito, sourceCatalog.cubaLibre],
    ideas: [
      {
        name: 'Daiquiri net',
        style: 'Classique',
        ingredients: ['rhum cubain', 'citron vert', 'sucre très fin'],
        method: 'Dissoudre le sucre, secouer très froid, filtrer en coupe.',
      },
      {
        name: 'Mojito sec',
        style: 'Highball',
        ingredients: ['rhum', 'menthe', 'citron vert', 'sucre', 'eau gazeuse'],
        method: 'Presser doucement la menthe, ajouter glace et bulles sans surcharger.',
      },
      {
        name: 'Cuba libre propre',
        style: 'Long drink',
        ingredients: ['rhum', 'cola', 'citron vert', 'glace haute'],
        method: 'Construire dans un verre haut avec beaucoup de glace et un vrai trait de citron vert.',
      },
    ],
  },
  Kahlua: {
    intro:
      "Kahlúa donne de la profondeur café. Elle est meilleure quand le froid, la vodka ou la crème évitent l’effet sirop.",
    pairings: ['espresso', 'vodka', 'crème froide', 'cacao amer', 'orange'],
    sources: [sourceCatalog.espressoMartini, sourceCatalog.blackRussian, sourceCatalog.baileys],
    ideas: [
      {
        name: 'Espresso Martini',
        style: 'Secoué',
        ingredients: ['vodka', 'Kahlúa', 'espresso', 'sirop léger'],
        method: 'Secouer fort pour créer une mousse fine, servir immédiatement.',
      },
      {
        name: 'White Russian court',
        style: 'Sur glace',
        ingredients: ['vodka', 'Kahlúa', 'crème froide'],
        method: 'Construire sur gros glaçon et mélanger lentement pour garder les strates.',
      },
      {
        name: 'Café tonic sombre',
        style: 'Highball',
        ingredients: ['Kahlúa', 'espresso refroidi', 'tonic', 'zeste d’orange'],
        method: 'Verser sur glace, compléter au tonic pour une amertume légère.',
      },
    ],
  },
  Molinari_Sambuka: {
    intro:
      "La sambuca est très aromatique. Elle marche mieux en petites doses, avec café, citron ou glace très froide.",
    pairings: ['espresso', 'grains de café', 'citron', 'eau gazeuse', 'chocolat noir'],
    sources: [sourceCatalog.ibaList, sourceCatalog.espressoMartini, sourceCatalog.blackRussian],
    ideas: [
      {
        name: 'Con la mosca',
        style: 'Rituel',
        ingredients: ['sambuca', 'trois grains de café'],
        method: 'Servir très froid, croquer un grain pour casser la douceur anisée.',
      },
      {
        name: 'Anis sour',
        style: 'Secoué',
        ingredients: ['sambuca', 'citron jaune', 'eau fraîche', 'sirop minuscule'],
        method: 'Secouer court et allonger d’un trait d’eau pour ouvrir l’anis.',
      },
      {
        name: 'Espresso anisé',
        style: 'Café',
        ingredients: ['espresso', 'sambuca', 'glaçon clair'],
        method: 'Verser sur glace, remuer, servir comme un digestif de fin de repas.',
      },
    ],
  },
  Pernod: {
    intro:
      "Pernod est une transformation visuelle autant qu’un goût : l’eau fraîche ouvre l’anis et rend le verre plus lent.",
    pairings: ['eau très fraîche', 'amande', 'menthe', 'olive verte', 'poisson grillé'],
    sources: [sourceCatalog.sazerac, sourceCatalog.ibaList, sourceCatalog.ginFizz],
    ideas: [
      {
        name: 'Pernod glacé',
        style: 'Apéritif',
        ingredients: ['Pernod', 'eau fraîche', 'glaçons à part'],
        method: 'Allonger lentement pour laisser apparaître le trouble laiteux.',
      },
      {
        name: 'Mauresque fine',
        style: 'Anisé doux',
        ingredients: ['Pernod', 'sirop d’orgeat', 'eau fraîche'],
        method: 'Doser l’orgeat en touche courte pour garder l’anis en premier.',
      },
      {
        name: 'Rinçage Sazerac',
        style: 'Aromatique',
        ingredients: ['Pernod', 'whiskey ou cognac', 'sucre', 'bitters'],
        method: 'Rincer le verre au Pernod avant de servir le cocktail remué.',
      },
    ],
  },
  Chivas: {
    intro:
      "Chivas a une texture douce qui aime les highballs précis, le miel, le gingembre et les recettes remuées.",
    pairings: ['eau pétillante', 'miel', 'gingembre', 'citron', 'verre haut glacé'],
    sources: [sourceCatalog.rustyNail, sourceCatalog.whiskeySour, sourceCatalog.oldFashioned],
    ideas: [
      {
        name: 'Scotch highball',
        style: 'Long drink',
        ingredients: ['Chivas', 'eau pétillante très froide', 'zeste de citron'],
        method: 'Construire sur glace haute, remuer une seule fois pour garder les bulles.',
      },
      {
        name: 'Penicillin doux',
        style: 'Secoué',
        ingredients: ['Chivas', 'citron', 'miel gingembre', 'trait de whisky fumé optionnel'],
        method: 'Secouer, servir sur glaçon large, garder le fumé en finition.',
      },
      {
        name: 'Rusty Nail souple',
        style: 'Remué',
        ingredients: ['Chivas', 'liqueur de whisky au miel', 'zeste de citron'],
        method: 'Remuer sur glace, servir bas et très froid.',
      },
    ],
  },
  Crema_di_Limoncino: {
    intro:
      "La crème de citron est faite pour les verres dessert. Elle demande du froid, des bulles ou de l’espresso pour éviter la lourdeur.",
    pairings: ['prosecco', 'sorbet citron', 'espresso', 'fruits rouges', 'biscuit sec'],
    sources: [sourceCatalog.lemonDrop, sourceCatalog.ibaList, sourceCatalog.espressoMartini],
    ideas: [
      {
        name: 'Limoncino spritz',
        style: 'Bulles',
        ingredients: ['crema di limoncino', 'prosecco', 'eau gazeuse', 'zeste de citron'],
        method: 'Construire sur glace, remuer doucement, servir avant que la crème ne chauffe.',
      },
      {
        name: 'Sgroppino crème',
        style: 'Dessert',
        ingredients: ['sorbet citron', 'vodka', 'crema di limoncino', 'prosecco'],
        method: 'Fouetter rapidement et servir en petit verre très froid.',
      },
      {
        name: 'Affogato citron',
        style: 'Café',
        ingredients: ['glace vanille', 'espresso', 'trait de limoncino'],
        method: 'Verser l’espresso puis la liqueur, finir avec zeste fin.',
      },
    ],
  },
  Baileys: {
    intro:
      "Baileys est une texture autant qu’un alcool. Il marche très bien avec café, chocolat, glace et vodka neutre.",
    pairings: ['espresso', 'chocolat noir', 'vodka', 'glace vanille', 'noisette'],
    sources: [sourceCatalog.baileys, sourceCatalog.irishCoffee, sourceCatalog.espressoMartini],
    ideas: [
      {
        name: 'Irish cream coffee',
        style: 'Chaud',
        ingredients: ['café noir', 'Baileys', 'crème légère optionnelle'],
        method: 'Verser dans une tasse chaude, garder le café assez amer.',
      },
      {
        name: 'White Russian Baileys',
        style: 'Sur glace',
        ingredients: ['vodka', 'liqueur de café', 'Baileys'],
        method: 'Construire sur glace large et remuer doucement pour une texture marbrée.',
      },
      {
        name: 'Espresso crème',
        style: 'Secoué',
        ingredients: ['Baileys', 'espresso', 'vodka', 'cacao amer'],
        method: 'Secouer très froid et poudrer d’un voile de cacao.',
      },
    ],
  },
  Absolut_Vodka: {
    intro:
      "Absolut sert de base claire : elle allonge, refroidit et laisse les agrumes ou les aromates prendre la lumière.",
    pairings: ['vermouth sec', 'citron', 'espresso', 'tonic', 'concombre'],
    sources: [sourceCatalog.dryMartini, sourceCatalog.vesper, sourceCatalog.lemonDrop],
    ideas: [
      {
        name: 'Vodka Martini',
        style: 'Remué',
        ingredients: ['vodka', 'vermouth sec', 'zeste de citron ou olive'],
        method: 'Remuer longtemps sur glace et servir dans un verre très froid.',
      },
      {
        name: 'Vesper claire',
        style: 'Secoué',
        ingredients: ['gin', 'vodka', 'apéritif blanc', 'zeste de citron'],
        method: 'Secouer au froid intense et filtrer sans glace.',
      },
      {
        name: 'Lemon Drop net',
        style: 'Agrume',
        ingredients: ['vodka', 'triple sec', 'citron', 'sucre fin'],
        method: 'Secouer et garder le sucre seulement en bordure légère.',
      },
    ],
  },
  Jagermeister: {
    intro:
      "Jägermeister devient plus élégant quand il est froid, allongé, ou utilisé comme bitter épicé dans une recette sombre.",
    pairings: ['ginger beer', 'citron vert', 'café froid', 'orange amère', 'chocolat'],
    sources: [sourceCatalog.whiskeySour, sourceCatalog.blackRussian, sourceCatalog.ibaList],
    ideas: [
      {
        name: 'Jäger Mule',
        style: 'Highball',
        ingredients: ['Jägermeister', 'ginger beer', 'citron vert', 'glace'],
        method: 'Construire très froid, finir avec un quartier de citron vert pressé.',
      },
      {
        name: 'Herbal sour',
        style: 'Secoué',
        ingredients: ['Jägermeister', 'citron', 'sirop léger', 'blanc d’œuf optionnel'],
        method: 'Secouer fort pour adoucir les racines et ouvrir l’orange amère.',
      },
      {
        name: 'Cold brew hunter',
        style: 'Café',
        ingredients: ['Jägermeister', 'cold brew', 'trait de sirop', 'zeste d’orange'],
        method: 'Remuer sur glace et servir bas, presque comme un digestif glacé.',
      },
    ],
  },
  Martel: {
    intro:
      "Martell appelle des cocktails nobles : agrume propre, sucre retenu, bitters et un service qui laisse le cognac respirer.",
    pairings: ['citron jaune', 'triple sec', 'amaretto', 'bitters', 'zeste d’orange'],
    sources: [sourceCatalog.sidecar, sourceCatalog.sazerac, sourceCatalog.ibaList],
    ideas: [
      {
        name: 'Sidecar Martell',
        style: 'Classique',
        ingredients: ['cognac', 'triple sec', 'citron jaune'],
        method: 'Secouer et servir en coupe, bord sucré très léger si besoin.',
      },
      {
        name: 'Sazerac cognac',
        style: 'Remué',
        ingredients: ['cognac', 'sucre', 'bitters Peychaud', 'rinçage anisé'],
        method: 'Remuer, servir sans glace avec un zeste de citron exprimé.',
      },
      {
        name: 'French connection',
        style: 'Digestif',
        ingredients: ['cognac', 'amaretto', 'gros glaçon'],
        method: 'Construire directement dans le verre et remuer lentement.',
      },
    ],
  },
  Malibu: {
    intro:
      "Malibu assume la coco. L’acidité, l’ananas et la glace pilée sont ses meilleurs garde-fous contre le trop sucré.",
    pairings: ['ananas', 'citron vert', 'menthe', 'eau de coco', 'glace pilée'],
    sources: [sourceCatalog.daiquiri, sourceCatalog.cubaLibre, sourceCatalog.ibaList],
    ideas: [
      {
        name: 'Malibu pineapple',
        style: 'Long drink',
        ingredients: ['Malibu', 'jus d’ananas', 'citron vert', 'glace'],
        method: 'Construire sur glace et finir avec un trait de citron vert.',
      },
      {
        name: 'Piña légère',
        style: 'Tropical',
        ingredients: ['Malibu', 'rhum blanc', 'ananas', 'lait de coco'],
        method: 'Secouer ou mixer brièvement, servir avec glace pilée.',
      },
      {
        name: 'Coco Daiquiri',
        style: 'Secoué',
        ingredients: ['rhum', 'Malibu', 'citron vert', 'sirop très léger'],
        method: 'Secouer très froid pour garder la coco nette et l’agrume dominant.',
      },
    ],
  },
  Ramazzotti: {
    intro:
      "Ramazzotti donne une amertume ronde, parfaite pour les spritz sombres, les verres au soda et les twists de Negroni.",
    pairings: ['orange', 'prosecco', 'soda', 'vermouth rouge', 'chocolat noir'],
    sources: [sourceCatalog.negroni, sourceCatalog.ibaList, sourceCatalog.cubaLibre],
    ideas: [
      {
        name: 'Amaro spritz',
        style: 'Apéritif',
        ingredients: ['Ramazzotti', 'prosecco', 'eau gazeuse', 'orange'],
        method: 'Construire dans un grand verre à vin avec beaucoup de glace.',
      },
      {
        name: 'Ramazzotti soda',
        style: 'Long drink',
        ingredients: ['Ramazzotti', 'soda très froid', 'zeste d’orange'],
        method: 'Allonger directement, remuer une fois et servir très frais.',
      },
      {
        name: 'Negroni amaro',
        style: 'Remué',
        ingredients: ['gin', 'Ramazzotti', 'vermouth rouge', 'zeste d’orange'],
        method: 'Remuer sur glace, garder un ratio plus doux qu’un Negroni classique.',
      },
    ],
  },
  Beefeater: {
    intro:
      "Beefeater apporte une ligne sèche : genièvre, citron, herbes et amertume. Il structure très bien les cocktails fruités.",
    pairings: ['tonic sec', 'citron', 'basilic', 'miel', 'mûre'],
    sources: [sourceCatalog.negroni, sourceCatalog.ginFizz, sourceCatalog.beesKnees],
    ideas: [
      {
        name: 'Gin tonic tendu',
        style: 'Highball',
        ingredients: ['Beefeater', 'tonic sec', 'zeste de citron'],
        method: 'Construire sur glace haute et éviter les garnitures trop sucrées.',
      },
      {
        name: 'Negroni droit',
        style: 'Remué',
        ingredients: ['gin', 'bitter rouge', 'vermouth rouge'],
        method: 'Remuer, servir bas avec une demi-tranche d’orange.',
      },
      {
        name: "Bee's Knees",
        style: 'Miel',
        ingredients: ['gin', 'miel', 'citron', 'orange'],
        method: 'Dissoudre le miel dans les jus, secouer, filtrer en coupe.',
      },
    ],
  },
  Jameson: {
    intro:
      "Jameson est parfait en highball : gingembre, citron vert, café chaud et sours accessibles sans lourdeur fumée.",
    pairings: ['ginger ale', 'citron vert', 'café chaud', 'citron jaune', 'miel'],
    sources: [sourceCatalog.jamesonGinger, sourceCatalog.irishCoffee, sourceCatalog.whiskeySour],
    ideas: [
      {
        name: 'Ginger & Lime',
        style: 'Signature',
        ingredients: ['Jameson', 'ginger ale', 'citron vert', 'glace'],
        method: 'Construire dans un verre haut, presser le citron vert en dernier.',
      },
      {
        name: 'Irish Coffee',
        style: 'Chaud',
        ingredients: ['Jameson', 'café chaud', 'sucre', 'crème froide'],
        method: 'Sucrer le café, ajouter le whiskey, faire flotter la crème.',
      },
      {
        name: 'Irish Sour',
        style: 'Secoué',
        ingredients: ['Jameson', 'citron', 'sirop', 'blanc d’œuf optionnel'],
        method: 'Secouer fort, servir sur glace ou en coupe selon l’envie.',
      },
    ],
  },
  "Jack_Daniel's": {
    intro:
      "Jack Daniel's aime les recettes américaines : bitters, citron, cola propre et glace large pour cadrer sa vanille.",
    pairings: ['cola', 'citron jaune', 'bitters', 'orange', 'ginger ale'],
    sources: [sourceCatalog.oldFashioned, sourceCatalog.whiskeySour, sourceCatalog.newYorkSour],
    ideas: [
      {
        name: 'Old Fashioned Tennessee',
        style: 'Remué',
        ingredients: ["Jack Daniel's", 'sucre', 'bitters', 'orange'],
        method: 'Dissoudre le sucre, ajouter whiskey et glace, remuer lentement.',
      },
      {
        name: 'Whiskey Sour',
        style: 'Secoué',
        ingredients: ["Jack Daniel's", 'citron', 'sirop', 'blanc d’œuf optionnel'],
        method: 'Secouer avec énergie et servir sur glace avec un zeste.',
      },
      {
        name: 'Lemonade Lynchburg',
        style: 'Long drink',
        ingredients: ["Jack Daniel's", 'triple sec', 'citron', 'limonade'],
        method: 'Construire sur glace haute pour un profil frais et vanillé.',
      },
    ],
  },
  Curacao: {
    intro:
      "Le curaçao est un signal d’orange et de couleur. Il faut le doser court pour garder le cocktail net.",
    pairings: ['rhum', 'tequila', 'citron vert', 'ananas', 'glace pilée'],
    sources: [sourceCatalog.margarita, sourceCatalog.daiquiri, sourceCatalog.ibaList],
    ideas: [
      {
        name: 'Margarita bleue',
        style: 'Coloré',
        ingredients: ['tequila', 'curaçao', 'citron vert', 'sel fin'],
        method: 'Secouer et servir sur glace pour une couleur franche mais un goût sec.',
      },
      {
        name: 'Blue Lagoon sec',
        style: 'Long drink',
        ingredients: ['vodka', 'curaçao', 'citron', 'eau gazeuse'],
        method: 'Allonger au soda plutôt qu’à la limonade pour limiter le sucre.',
      },
      {
        name: 'Tiki orange',
        style: 'Tropical',
        ingredients: ['rhum', 'curaçao', 'citron vert', 'ananas'],
        method: 'Secouer avec glace pilée, servir en verre court et parfumé.',
      },
    ],
  },
};

function getCocktailProfile(profile) {
  return cocktailProfiles[profile.modelName] ?? {
    intro:
      "Une base simple pour explorer la bouteille active en cocktail : un classique, un highball et un service plus libre.",
    pairings: profile.notes,
    sources: [sourceCatalog.ibaList],
    ideas: [
      {
        name: `${profile.name} frais`,
        style: 'Simple',
        ingredients: [profile.name, 'glace', profile.serve],
        method: 'Servir très froid et garder un dosage court pour lire la bouteille.',
      },
    ],
  };
}

const glassMaterialProfiles = {
  Cointreau: {
    opacity: 0.96,
    transmission: 0.42,
    thickness: 1.05,
    attenuationDistance: 1.35,
    attenuationColor: 0xffead2,
  },
  Molinari_Sambuka: {
    opacity: 0.97,
    transmission: 0.36,
    thickness: 1.18,
    attenuationDistance: 1.1,
    attenuationColor: 0xfff2d8,
  },
  Crema_di_Limoncino: {
    opacity: 0.98,
    transmission: 0.28,
    thickness: 1.25,
    attenuationDistance: 0.9,
    attenuationColor: 0xffe6a3,
  },
  Absolut_Vodka: {
    opacity: 0.97,
    transmission: 0.34,
    thickness: 1.22,
    attenuationDistance: 1.0,
    attenuationColor: 0xd8edf6,
  },
  Malibu: {
    opacity: 0.98,
    transmission: 0.3,
    thickness: 1.2,
    attenuationDistance: 1.0,
    attenuationColor: 0xffedd4,
  },
  Curacao: {
    opacity: 0.96,
    transmission: 0.38,
    thickness: 1.15,
    attenuationDistance: 1.1,
    attenuationColor: 0x69d8ff,
  },
};

const defaultGlassMaterialProfile = {
  opacity: 0.93,
  transmission: 0.64,
  thickness: 0.82,
  attenuationDistance: 2.2,
  attenuationColor: 0xfff1de,
};

const canvas = document.querySelector('#scene');
const loaderPanel = document.querySelector('#loader');
const loadPercent = document.querySelector('#loadPercent');
const rootElement = document.documentElement;
const stage = document.querySelector('.stage');

const elements = {
  ghostTitle: document.querySelector('#ghostTitle'),
  counter: document.querySelector('#bottleCounter'),
  family: document.querySelector('#bottleFamily'),
  name: document.querySelector('#bottleName'),
  story: document.querySelector('#bottleStory'),
  when: document.querySelector('#orbitWhen'),
  why: document.querySelector('#orbitWhy'),
  place: document.querySelector('#orbitPlace'),
  ritual: document.querySelector('#orbitRitual'),
  mood: document.querySelector('#specMood'),
  abv: document.querySelector('#specAbv'),
  origin: document.querySelector('#specOrigin'),
  base: document.querySelector('#specBase'),
  serve: document.querySelector('#specServe'),
  noteList: document.querySelector('#noteList'),
  detailTaste: document.querySelector('#detailTaste'),
  detailHeritage: document.querySelector('#detailHeritage'),
  detailCraft: document.querySelector('#detailCraft'),
  detailService: document.querySelector('#detailService'),
  dots: document.querySelector('#bottleDots'),
  previous: document.querySelector('#previousBottle'),
  next: document.querySelector('#nextBottle'),
  detailClose: document.querySelector('#detailClose'),
  installButton: document.querySelector('#installButton'),
  immersiveButton: document.querySelector('#immersiveButton'),
  cocktailBottleName: document.querySelector('#cocktailBottleName'),
  cocktailIntro: document.querySelector('#cocktailIntro'),
  cocktailCards: document.querySelector('#cocktailCards'),
  cocktailPairings: document.querySelector('#cocktailPairings'),
  cocktailSources: document.querySelector('#cocktailSources'),
};

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x120d0d, 0.045);

const camera = new THREE.PerspectiveCamera(34, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 2.3, 13.5);

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
  powerPreference: 'low-power',
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.4));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;

const ambient = new THREE.HemisphereLight(0xfff3dc, 0x261413, 1.8);
scene.add(ambient);

const keyLight = new THREE.SpotLight(0xffd6a3, 4.5, 30, Math.PI * 0.18, 0.55, 1.1);
keyLight.position.set(-5, 8, 8);
keyLight.castShadow = true;
keyLight.shadow.mapSize.set(1024, 1024);
scene.add(keyLight);

const rimLight = new THREE.DirectionalLight(0x9fd8c3, 2.2);
rimLight.position.set(6, 4, -5);
scene.add(rimLight);

const warmEdge = new THREE.PointLight(0xd9833f, 2.2, 15, 1.8);
warmEdge.position.set(0, 2, 5.5);
scene.add(warmEdge);

const floorMaterial = new THREE.MeshStandardMaterial({
  color: 0x18100f,
  roughness: 0.72,
  metalness: 0.12,
});
const floor = new THREE.Mesh(new THREE.CylinderGeometry(8.8, 8.8, 0.05, 160), floorMaterial);
floor.position.y = -1.82;
floor.receiveShadow = true;
scene.add(floor);

const ringMaterial = new THREE.MeshBasicMaterial({
  color: 0xd8a15a,
  transparent: true,
  opacity: 0.55,
});
const ringMesh = new THREE.Mesh(new THREE.TorusGeometry(6.4, 0.018, 12, 180), ringMaterial);
ringMesh.rotation.x = Math.PI / 2;
ringMesh.position.y = -1.76;
scene.add(ringMesh);

const innerRing = new THREE.Mesh(
  new THREE.TorusGeometry(2.35, 0.01, 8, 140),
  new THREE.MeshBasicMaterial({ color: 0x7ab598, transparent: true, opacity: 0.36 }),
);
innerRing.rotation.x = Math.PI / 2;
innerRing.position.y = -1.72;
scene.add(innerRing);

const plinth = new THREE.Mesh(
  new THREE.CylinderGeometry(1.28, 1.52, 0.18, 96),
  new THREE.MeshPhysicalMaterial({
    color: 0x2a1a17,
    roughness: 0.38,
    metalness: 0.18,
    clearcoat: 0.35,
    clearcoatRoughness: 0.2,
  }),
);
plinth.position.y = -1.66;
plinth.receiveShadow = true;
scene.add(plinth);

const timer = new THREE.Timer();
timer.connect(document);
const gltfLoader = new GLTFLoader();
const bottleObjects = [];
const pointer = new THREE.Vector2();
const deviceTilt = new THREE.Vector2();
const targetDeviceTilt = new THREE.Vector2();
const motionTilt = new THREE.Vector2();
const cameraLookTarget = new THREE.Vector3();
const raycaster = new THREE.Raycaster();
const rayTarget = new THREE.Vector3(0, 0.25, 0);
const collectionFogColor = new THREE.Color(0x120d0d);
const detailFogColor = new THREE.Color(0xfbf9f2);

let activeIndex = 0;
let visualIndex = 0;
let targetIndex = 0;
let currentRotation = 0;
let targetRotation = 0;
let dragStartX = 0;
let dragStartY = 0;
let dragOffset = 0;
let isDragging = false;
let dragStartedAt = 0;
let dragHasNavigated = false;
let dragStartTargetIndex = 0;
let dragStepEstimate = 0;
let detailRotation = 0;
let detailStartRotation = 0;
let detailDragMoved = false;
let wheelRemainder = 0;
let lastWheelAt = 0;
let lastHapticAt = 0;
let hasLoaded = false;
let viewMode = 'collection';
let frameAccumulator = 0;
let isForceSettling = false;
let deferredInstallPrompt = null;
let orientationAccessRequested = false;
let orientationListening = false;
let motionAccessRequested = false;
let motionListening = false;
let lastOrientationAt = 0;
let lastMotionAt = 0;
let previousMotionX = 0;
let lastMotionNavigationAt = 0;
let immersiveEnabled = false;

const getStep = () => (Math.PI * 2) / Math.max(bottleObjects.length, 1);
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const wrapIndex = (index) => {
  const length = bottleObjects.length || bottleProfiles.length || 1;
  return ((index % length) + length) % length;
};
const isDetailMode = () => viewMode === 'detail';
const getAngleDistance = (a, b) => Math.abs(Math.atan2(Math.sin(a - b), Math.cos(a - b)));

function getIndexDelta(from, to) {
  if (!bottleObjects.length) return to - from;

  let delta = wrapIndex(to) - wrapIndex(from);
  const half = bottleObjects.length / 2;

  if (delta > half) delta -= bottleObjects.length;
  if (delta < -half) delta += bottleObjects.length;

  return delta;
}

function getDragPixelsPerBottle() {
  return clamp(window.innerWidth * 0.095, 36, 112);
}

function setSettlingState(force = isForceSettling) {
  const settling = !isDetailMode() && activeIndex !== targetIndex;
  isForceSettling = Boolean(force && settling);
  stage.classList.toggle('is-settling', settling);
  stage.classList.toggle('is-force-settling', isForceSettling);
}

function pulseHaptic(kind = 'tick') {
  if (!('vibrate' in navigator)) return;

  const now = performance.now();
  const minGap = kind === 'commit' ? 70 : 34;
  if (now - lastHapticAt < minGap) return;

  lastHapticAt = now;
  const patterns = {
    tick: [6],
    commit: [12, 18, 8],
    soft: [4],
  };
  navigator.vibrate(patterns[kind] ?? patterns.tick);
}

function getScreenAngle() {
  return window.screen?.orientation?.angle ?? window.orientation ?? 0;
}

function onDeviceOrientation(event) {
  if (!immersiveEnabled) return;
  if (event.gamma == null && event.beta == null) return;

  lastOrientationAt = performance.now();

  const gamma = event.gamma ?? 0;
  const beta = event.beta ?? 45;
  const angle = getScreenAngle();
  let sideways = gamma;
  let forward = beta - 45;

  if (Math.abs(angle) === 90) {
    sideways = angle > 0 ? beta - 45 : 45 - beta;
    forward = angle > 0 ? -gamma : gamma;
  }

  targetDeviceTilt.x = clamp(sideways / 24, -1, 1);
  targetDeviceTilt.y = clamp(forward / 34, -1, 1);
}

function enableDeviceOrientation() {
  if (orientationListening || !('DeviceOrientationEvent' in window)) return;

  orientationListening = true;
  window.addEventListener('deviceorientation', onDeviceOrientation, { passive: true });
}

function onDeviceMotion(event) {
  if (!immersiveEnabled) return;
  const acceleration = event.accelerationIncludingGravity;
  if (!acceleration) return;

  const now = performance.now();
  lastMotionAt = now;

  const x = clamp((acceleration.x ?? 0) / 7.5, -1, 1);
  const y = clamp(((acceleration.y ?? 0) - 2.5) / 7.5, -1, 1);

  if (now - lastOrientationAt > 520) {
    motionTilt.x = THREE.MathUtils.lerp(motionTilt.x, x, 0.24);
    motionTilt.y = THREE.MathUtils.lerp(motionTilt.y, y, 0.2);
    targetDeviceTilt.x = motionTilt.x;
    targetDeviceTilt.y = motionTilt.y;
  }

  const rotationRate = event.rotationRate ?? {};
  const rotationImpulse = ((rotationRate.gamma ?? rotationRate.beta ?? 0) / 130) || 0;
  const lateralJerk = x - previousMotionX;
  const gesture = rotationImpulse + lateralJerk * 1.45;

  if (
    !isDragging &&
    !isDetailMode() &&
    Math.abs(gesture) > 0.95 &&
    now - lastMotionNavigationAt > 850
  ) {
    lastMotionNavigationAt = now;
    moveActive(gesture > 0 ? -1 : 1, { force: false });
    pulseHaptic('commit');
  }

  if (isDetailMode() && Math.abs(rotationImpulse) > 0.05) {
    detailRotation += clamp(rotationImpulse, -0.5, 0.5) * 0.035;
  }

  previousMotionX = x;
}

function enableDeviceMotion() {
  if (motionListening || !('DeviceMotionEvent' in window)) return;

  motionListening = true;
  window.addEventListener('devicemotion', onDeviceMotion, { passive: true });
}

function requestDeviceMotionAccess() {
  if (motionAccessRequested || !('DeviceMotionEvent' in window)) return;

  motionAccessRequested = true;
  const permissionRequest = window.DeviceMotionEvent.requestPermission;

  if (typeof permissionRequest === 'function') {
    permissionRequest.call(window.DeviceMotionEvent).then((state) => {
      if (state === 'granted') enableDeviceMotion();
    }).catch(() => {});
    return;
  }

  enableDeviceMotion();
}

function requestDeviceOrientationAccess() {
  if (orientationAccessRequested) return;

  orientationAccessRequested = true;
  requestDeviceMotionAccess();

  if (!('DeviceOrientationEvent' in window)) return;

  const permissionRequest = window.DeviceOrientationEvent.requestPermission;

  if (typeof permissionRequest === 'function') {
    permissionRequest.call(window.DeviceOrientationEvent).then((state) => {
      if (state === 'granted') enableDeviceOrientation();
    }).catch(() => {});
    return;
  }

  enableDeviceOrientation();
}

function updateImmersiveButton() {
  if (!elements.immersiveButton) return;

  elements.immersiveButton.classList.toggle('is-active', immersiveEnabled);
  elements.immersiveButton.setAttribute('aria-pressed', immersiveEnabled ? 'true' : 'false');
  elements.immersiveButton.textContent = immersiveEnabled ? 'Immersion active' : 'Immersion';
}

function setImmersiveMode(enabled) {
  immersiveEnabled = enabled;
  stage.classList.toggle('is-immersive', immersiveEnabled);
  document.body.classList.toggle('is-immersive', immersiveEnabled);
  updateImmersiveButton();
}

function toggleImmersiveMode() {
  setImmersiveMode(!immersiveEnabled);

  if (immersiveEnabled) {
    requestDeviceOrientationAccess();
    pulseHaptic('commit');
    return;
  }

  targetDeviceTilt.set(0, 0);
  motionTilt.set(0, 0);
  previousMotionX = 0;
  pulseHaptic('soft');
}

function updateDeviceTilt(delta) {
  if (!immersiveEnabled) {
    targetDeviceTilt.set(0, 0);
  } else if (performance.now() - Math.max(lastOrientationAt, lastMotionAt) > 1600) {
    const now = performance.now() * 0.001;
    targetDeviceTilt.x = Math.sin(now * 0.72) * 0.12;
    targetDeviceTilt.y = Math.cos(now * 0.84) * 0.08;
  }

  deviceTilt.x = THREE.MathUtils.damp(deviceTilt.x, targetDeviceTilt.x, immersiveEnabled ? 6.2 : 4.2, delta);
  deviceTilt.y = THREE.MathUtils.damp(deviceTilt.y, targetDeviceTilt.y, immersiveEnabled ? 6.2 : 4.2, delta);
}

function getBottleFacingRotation(holder, index) {
  const parallaxStrength = immersiveEnabled ? (isDetailMode() ? 0.48 : index === visualIndex ? 0.34 : 0.12) : 0;
  return (holder.userData.frontRotation ?? 0) + deviceTilt.x * parallaxStrength;
}

function hexToRgbString(hex) {
  const value = hex.replace('#', '').trim();
  const normalized = value.length === 3 ? value.split('').map((char) => char + char).join('') : value;
  const intValue = Number.parseInt(normalized, 16);

  if (!Number.isFinite(intValue)) return '217 131 63';

  return `${(intValue >> 16) & 255} ${(intValue >> 8) & 255} ${intValue & 255}`;
}

function setLoadingProgress(progress) {
  const percent = Number.isFinite(progress) ? Math.round(progress * 100) : 0;
  loadPercent.textContent = `${clamp(percent, 0, 100)}%`;
}

function buildDots() {
  elements.dots.innerHTML = '';
  bottleProfiles.forEach((profile, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'dot';
    button.setAttribute('aria-label', profile.name);
    button.title = profile.name;
    button.addEventListener('click', () => setActive(index));
    elements.dots.append(button);
  });
}

function updateDots() {
  [...elements.dots.children].forEach((button, index) => {
    button.classList.toggle('is-active', index === activeIndex);
  });
}

function appendTextList(parent, items) {
  parent.replaceChildren();

  items.forEach((text) => {
    const item = document.createElement('li');
    item.textContent = text;
    parent.append(item);
  });
}

function appendSourceList(parent, sources) {
  parent.replaceChildren();

  sources.forEach((source) => {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.href = source.url;
    link.target = '_blank';
    link.rel = 'noreferrer';
    link.textContent = source.label;
    item.append(link);
    parent.append(item);
  });
}

function renderCocktailCard(idea) {
  const card = document.createElement('article');
  card.className = 'cocktail-card';

  const style = document.createElement('p');
  style.className = 'cocktail-card-style';
  style.textContent = idea.style;

  const title = document.createElement('h3');
  title.textContent = idea.name;

  const ingredients = document.createElement('ul');
  ingredients.className = 'cocktail-ingredients';
  appendTextList(ingredients, idea.ingredients);

  const method = document.createElement('p');
  method.className = 'cocktail-method';
  method.textContent = idea.method;

  card.append(style, title, ingredients, method);
  return card;
}

function updateCocktailSection(profile) {
  const cocktail = getCocktailProfile(profile);

  elements.cocktailBottleName.textContent = profile.name;
  elements.cocktailIntro.textContent = cocktail.intro;
  elements.cocktailCards.replaceChildren(...cocktail.ideas.map(renderCocktailCard));
  appendTextList(elements.cocktailPairings, cocktail.pairings);
  appendSourceList(elements.cocktailSources, cocktail.sources);
}

function updateText(profile) {
  const detail = profile.detail ?? {};

  rootElement.style.setProperty('--accent', profile.accent);
  rootElement.style.setProperty('--accent-soft', `${profile.accent}33`);
  rootElement.style.setProperty('--accent-rgb', hexToRgbString(profile.accent));
  elements.ghostTitle.textContent = profile.name;
  elements.counter.textContent = String(activeIndex + 1).padStart(2, '0');
  elements.family.textContent = profile.family;
  elements.name.textContent = profile.name;
  elements.story.textContent = profile.story;
  elements.when.textContent = profile.when;
  elements.why.textContent = profile.why;
  elements.place.textContent = profile.place;
  elements.ritual.textContent = profile.ritual;
  elements.mood.textContent = profile.mood;
  elements.abv.textContent = profile.abv;
  elements.origin.textContent = profile.origin;
  elements.base.textContent = profile.base;
  elements.serve.textContent = profile.serve;
  elements.detailTaste.textContent = detail.taste ?? profile.mood;
  elements.detailHeritage.textContent = detail.heritage ?? profile.when;
  elements.detailCraft.textContent = detail.craft ?? profile.base;
  elements.detailService.textContent = detail.service ?? profile.serve;
  elements.noteList.innerHTML = '';

  profile.notes.forEach((note) => {
    const item = document.createElement('li');
    item.textContent = note;
    elements.noteList.append(item);
  });

  updateCocktailSection(profile);
  updateDots();
}

function resolveShortestTarget(index) {
  const step = getStep();
  const desired = -index * step;
  const fullTurn = Math.PI * 2;
  return desired + Math.round((currentRotation - desired) / fullTurn) * fullTurn;
}

function setActive(index, options = {}) {
  if (!bottleObjects.length) return;
  const previousTargetIndex = targetIndex;
  targetIndex = wrapIndex(index);
  const targetChanged = previousTargetIndex !== targetIndex;
  targetRotation = resolveShortestTarget(targetIndex);
  const movedSteps = Math.abs(getIndexDelta(previousTargetIndex, targetIndex));
  const force = options.force || movedSteps > 1;

  if (options.immediate || isDetailMode()) {
    activeIndex = targetIndex;
    visualIndex = targetIndex;
    updateText(bottleProfiles[activeIndex]);
    if (!options.silent) pulseHaptic('commit');
    isForceSettling = false;
  } else if (targetChanged && !options.silent) {
    pulseHaptic('tick');
  }

  setSettlingState(force);
}

function moveActive(direction, options = {}) {
  setActive(targetIndex + direction, options);
}

function setSceneMode(mode) {
  viewMode = mode;
  const detail = isDetailMode();

  stage.classList.toggle('is-detail', detail);
  document.body.classList.toggle('is-detail', detail);
  elements.detailClose.setAttribute('aria-hidden', detail ? 'false' : 'true');
  setSettlingState(false);
}

function enterDetail(index = activeIndex) {
  if (!bottleObjects.length) return;

  setActive(index, { immediate: true });
  detailRotation = 0;
  detailStartRotation = 0;
  detailDragMoved = false;
  dragOffset = 0;
  bottleObjects[activeIndex].userData.spin.rotation.y = bottleObjects[activeIndex].userData.frontRotation ?? 0;
  setSceneMode('detail');
}

function exitDetail() {
  if (!isDetailMode()) return;

  detailRotation = 0;
  detailStartRotation = 0;
  detailDragMoved = false;
  setSceneMode('collection');
}

function findBottleHolder(object) {
  let current = object;

  while (current) {
    const index = bottleObjects.indexOf(current);
    if (index !== -1) return { holder: current, index };
    current = current.parent;
  }

  return null;
}

function pickBottle(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  const x = ((clientX - rect.left) / rect.width) * 2 - 1;
  const y = -((clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera({ x, y }, camera);
  const intersections = raycaster.intersectObjects(
    bottleObjects.filter((holder) => holder.visible),
    true,
  );

  for (const intersection of intersections) {
    const result = findBottleHolder(intersection.object);
    if (result) return result.index;
  }

  return null;
}

function tuneBottleMaterial(material, profile) {
  if (material.name !== 'Atlas') return;

  const tuning = glassMaterialProfiles[profile.modelName] ?? defaultGlassMaterialProfile;

  material.transparent = true;
  material.opacity = tuning.opacity;
  material.depthWrite = false;
  material.alphaTest = 0.015;
  material.envMapIntensity = 1;

  if ('transmission' in material) {
    material.transmission = tuning.transmission;
    material.thickness = tuning.thickness;
    material.ior = material.ior || 1.45;
    material.attenuationDistance = tuning.attenuationDistance;
    material.attenuationColor = new THREE.Color(tuning.attenuationColor);
  }

  if ('roughness' in material) {
    material.roughness = Math.max(material.roughness ?? 0, 0.34);
  }
}

function cloneMaterialTree(object, profile) {
  object.traverse((child) => {
    if (!child.isMesh) return;

    child.castShadow = true;
    child.receiveShadow = true;
    child.frustumCulled = false;
    child.renderOrder = 2;

    if (Array.isArray(child.material)) {
      child.material = child.material.map((material) => material.clone());
    } else if (child.material) {
      child.material = child.material.clone();
    }

    const materials = Array.isArray(child.material) ? child.material : [child.material];
    materials.forEach((material) => {
      if (!material) return;
      material.side = THREE.DoubleSide;
      material.envMapIntensity = 0.8;
      if (material.map) {
        material.map.colorSpace = THREE.SRGBColorSpace;
        material.map.anisotropy = renderer.capabilities.getMaxAnisotropy();
      }
      if (material.transparent) {
        material.depthWrite = false;
      }
      tuneBottleMaterial(material, profile);
      material.needsUpdate = true;
    });
  });
}

function makeBottleHolder(sourceObject, profile) {
  const clone = sourceObject.clone(true);
  const matrix = sourceObject.matrixWorld.clone();
  const sourcePosition = sourceObject.getWorldPosition(new THREE.Vector3());
  matrix.decompose(clone.position, clone.quaternion, clone.scale);
  cloneMaterialTree(clone, profile);

  const spin = new THREE.Group();
  spin.add(clone);

  const holder = new THREE.Group();
  holder.add(spin);
  holder.userData.profile = profile;
  holder.userData.spin = spin;
  holder.userData.seed = Math.random() * Math.PI * 2;
  holder.userData.frontRotation = -Math.atan2(sourcePosition.x, sourcePosition.z);

  holder.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(spin);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  clone.position.sub(center);

  const targetHeight = window.innerWidth < 760 ? 2.6 : 3.65;
  const scale = targetHeight / Math.max(size.y, 0.001);
  holder.scale.setScalar(scale);
  holder.userData.baseScale = scale;
  holder.userData.height = size.y * scale;

  return holder;
}

function buildBottles(gltf) {
  gltf.scene.updateMatrixWorld(true);
  const rootNode = gltf.scene.getObjectByName('RootNode');
  const sourceChildren = rootNode?.children ?? [];
  const sourceByName = new Map(sourceChildren.map((child) => [child.name, child]));

  bottleProfiles.forEach((profile) => {
    const source = sourceByName.get(profile.modelName);
    if (!source) {
      console.warn(`Bouteille introuvable dans le modèle 3D: ${profile.modelName}`);
      return;
    }

    const holder = makeBottleHolder(source, profile);
    scene.add(holder);
    bottleObjects.push(holder);
  });

  buildDots();
  setActive(0, { immediate: true, silent: true });
}

function syncVisualBottleToRotation(step) {
  const nextVisualIndex = wrapIndex(Math.round(-currentRotation / step));

  if (nextVisualIndex === visualIndex) return;

  visualIndex = nextVisualIndex;
  pulseHaptic('tick');
}

function commitSettledBottle() {
  if (isDragging || isDetailMode() || activeIndex === targetIndex) return;
  if (getAngleDistance(currentRotation, targetRotation) > 0.018 || Math.abs(dragOffset) > 0.001) return;

  activeIndex = targetIndex;
  visualIndex = targetIndex;
  updateText(bottleProfiles[activeIndex]);
  pulseHaptic('commit');
  setSettlingState(false);
}

function updateSceneMood(delta) {
  const detail = isDetailMode();
  const fogColor = detail ? detailFogColor : collectionFogColor;

  scene.fog.color.lerp(fogColor, 1 - Math.exp(-4.6 * delta));
  scene.fog.density = THREE.MathUtils.damp(scene.fog.density, detail ? 0.008 : 0.045, 4.6, delta);
  renderer.toneMappingExposure = THREE.MathUtils.damp(
    renderer.toneMappingExposure,
    detail ? 1.16 : 1.05,
    4.6,
    delta,
  );

  ambient.intensity = THREE.MathUtils.damp(ambient.intensity, detail ? 2.2 : 1.8, 4.6, delta);
  keyLight.intensity = THREE.MathUtils.damp(keyLight.intensity, detail ? 5.2 : 4.5, 4.6, delta);
  rimLight.intensity = THREE.MathUtils.damp(rimLight.intensity, detail ? 1.35 : 2.2, 4.6, delta);

  const immersiveStrength = immersiveEnabled ? 1 : 0;
  const keyTargetX = -5 + deviceTilt.x * (detail ? 1.4 : 2.1) * immersiveStrength;
  const keyTargetY = 8 + deviceTilt.y * (detail ? 0.9 : 1.2) * immersiveStrength;
  const rimTargetX = 6 - deviceTilt.x * (detail ? 1.5 : 2.8) * immersiveStrength;
  const rimTargetY = 4 + deviceTilt.y * 1.1 * immersiveStrength;

  keyLight.position.x = THREE.MathUtils.damp(keyLight.position.x, keyTargetX, 4.2, delta);
  keyLight.position.y = THREE.MathUtils.damp(keyLight.position.y, keyTargetY, 4.2, delta);
  rimLight.position.x = THREE.MathUtils.damp(rimLight.position.x, rimTargetX, 4.2, delta);
  rimLight.position.y = THREE.MathUtils.damp(rimLight.position.y, rimTargetY, 4.2, delta);
  warmEdge.position.y = THREE.MathUtils.damp(warmEdge.position.y, 2 + deviceTilt.y * 0.6 * immersiveStrength, 4.2, delta);
  warmEdge.position.z = THREE.MathUtils.damp(warmEdge.position.z, 5.5 - Math.abs(deviceTilt.x) * 0.7 * immersiveStrength, 4.2, delta);

  floor.visible = !detail;
  ringMesh.visible = !detail;
  innerRing.visible = !detail;
  plinth.visible = !detail;
}

function updateDetailBottlePosition(delta) {
  const mobile = window.innerWidth < 760;
  const compactMobile = window.innerWidth < 560 || window.innerHeight < 720;
  const targetScaleMultiplier = mobile ? (compactMobile ? 0.9 : 1) : 1.32;
  const time = performance.now() * 0.001;
  const immersiveStrength = immersiveEnabled ? 1 : 0;

  bottleObjects.forEach((holder, index) => {
    if (index !== activeIndex) {
      holder.visible = false;
      return;
    }

    holder.visible = true;
    const floatY = Math.sin(time * 1.18 + holder.userData.seed) * 0.025 * immersiveStrength;
    const targetX = deviceTilt.x * (mobile ? 0.22 : 0.16) * immersiveStrength;
    const targetY = (mobile ? (compactMobile ? 0.74 : 0.58) : -0.08) + deviceTilt.y * 0.1 * immersiveStrength + floatY;

    holder.position.x = THREE.MathUtils.damp(holder.position.x, targetX, 5.6, delta);
    holder.position.y = THREE.MathUtils.damp(holder.position.y, targetY, 5.6, delta);
    holder.position.z = THREE.MathUtils.damp(holder.position.z, 0, 5.6, delta);
    holder.scale.setScalar(
      THREE.MathUtils.damp(holder.scale.x, holder.userData.baseScale * targetScaleMultiplier, 7.2, delta),
    );
    holder.lookAt(camera.position.x, holder.position.y + 0.35, camera.position.z);
    holder.userData.spin.rotation.y = THREE.MathUtils.damp(
      holder.userData.spin.rotation.y,
      getBottleFacingRotation(holder, index) + detailRotation,
      9,
      delta,
    );
    holder.userData.spin.rotation.z = THREE.MathUtils.damp(
      holder.userData.spin.rotation.z,
      (-deviceTilt.x * 0.06 + Math.sin(time * 0.9 + holder.userData.seed) * 0.014) * immersiveStrength,
      5.4,
      delta,
    );
  });

  warmEdge.color.set(bottleProfiles[activeIndex].accent);
  warmEdge.position.x = THREE.MathUtils.damp(warmEdge.position.x, deviceTilt.x * 0.75 * immersiveStrength, 4, delta);
}

function updateBottlePositions(delta) {
  if (!bottleObjects.length) return;

  if (isDetailMode()) {
    updateDetailBottlePosition(delta);
    return;
  }

  const step = getStep();
  const radius = window.innerWidth < 760 ? 4.4 : 6.45;
  const time = performance.now() * 0.001;
  const immersiveStrength = immersiveEnabled ? 1 : 0;
  currentRotation = THREE.MathUtils.damp(currentRotation, targetRotation + dragOffset, 8.8, delta);
  syncVisualBottleToRotation(step);
  commitSettledBottle();

  bottleObjects.forEach((holder, index) => {
    const angle = index * step + currentRotation;
    const frontness = (Math.cos(angle) + 1) * 0.5;
    const side = Math.sin(angle);
    const yLift = Math.sin(frontness * Math.PI) * 0.16;
    const depthScale = THREE.MathUtils.lerp(0.54, 1.16, frontness);
    const activeBoost = index === visualIndex ? 1.12 : 1;
    const floatY = Math.sin(time * 1.1 + holder.userData.seed) * frontness * 0.04 * immersiveStrength;
    const sensorX = deviceTilt.x * frontness * (index === visualIndex ? 0.34 : 0.18) * immersiveStrength;
    const sensorY = deviceTilt.y * frontness * 0.12 * immersiveStrength;

    holder.position.set(Math.sin(angle) * radius + sensorX, -0.12 + yLift + sensorY + floatY, Math.cos(angle) * radius * 0.48);
    holder.scale.setScalar(holder.userData.baseScale * depthScale * activeBoost);
    holder.visible = frontness > 0.02;
    holder.lookAt(camera.position.x, holder.position.y + 0.35, camera.position.z);
    holder.userData.spin.rotation.y = THREE.MathUtils.damp(
      holder.userData.spin.rotation.y,
      getBottleFacingRotation(holder, index),
      8.4,
      delta,
    );
    holder.userData.spin.rotation.z = THREE.MathUtils.damp(
      holder.userData.spin.rotation.z,
      -deviceTilt.x * frontness * 0.045 * immersiveStrength,
      5.2,
      delta,
    );
  });

  const active = bottleObjects[visualIndex];
  if (active) {
    warmEdge.color.set(bottleProfiles[visualIndex].accent);
    warmEdge.position.x = THREE.MathUtils.damp(warmEdge.position.x, active.position.x * 0.28 + deviceTilt.x * 0.7 * immersiveStrength, 4, delta);
  }

  ringMesh.rotation.z += delta * 0.035;
  innerRing.rotation.z -= delta * 0.055;
}

function updateCamera(delta) {
  const mobile = window.innerWidth < 760;
  const compactMobile = window.innerWidth < 560 || window.innerHeight < 720;

  if (isDetailMode()) {
    const targetY = mobile ? (compactMobile ? 1.9 : 1.76) : 2.02;
    const targetZ = mobile ? (compactMobile ? 10.9 : 10.2) : 8.2;
    const targetX = deviceTilt.x * (mobile ? 0.92 : 0.28);

    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 4.4, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY + deviceTilt.y * 0.38, 4.4, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 4.4, delta);
    cameraLookTarget.set(deviceTilt.x * 0.34, (mobile ? 0.72 : 0.25) + deviceTilt.y * 0.2, 0);
    camera.lookAt(cameraLookTarget);
    return;
  }

  const targetX = pointer.x * (mobile ? 0.25 : 0.58) + deviceTilt.x * (mobile ? 1.18 : 0.3);
  const targetY = (mobile ? 1.9 : 2.3) + pointer.y * 0.28 + deviceTilt.y * (mobile ? 0.42 : 0.22);
  const targetZ = mobile ? 12.2 : 13.5;

  camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 3.8, delta);
  camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 3.8, delta);
  camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 3.8, delta);
  cameraLookTarget.set(deviceTilt.x * (mobile ? 0.42 : 0.26), 0.25 + deviceTilt.y * 0.2, 0);
  camera.lookAt(cameraLookTarget);
}

function animate() {
  timer.update();
  const delta = Math.min(timer.getDelta(), 0.033);
  frameAccumulator += delta;

  if (frameAccumulator >= 1 / 45) {
    const frameDelta = Math.min(frameAccumulator, 0.05);
    updateDeviceTilt(frameDelta);
    updateCamera(frameDelta);
    updateSceneMood(frameDelta);
    updateBottlePositions(frameDelta);
    renderer.render(scene, camera);
    frameAccumulator %= 1 / 45;
  }

  requestAnimationFrame(animate);
}

function onResize() {
  const { innerWidth, innerHeight } = window;
  camera.aspect = innerWidth / innerHeight;
  camera.fov = innerWidth < 560 ? 46 : innerWidth < 760 ? 42 : 34;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.4));
  renderer.setSize(innerWidth, innerHeight);

  bottleObjects.forEach((holder) => {
    const targetHeight = innerWidth < 760 ? 2.6 : 3.65;
    const originalHeight = holder.userData.height / holder.userData.baseScale;
    holder.userData.baseScale = targetHeight / Math.max(originalHeight, 0.001);
  });
}

function onPointerMove(event) {
  pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
  pointer.y = -(event.clientY / window.innerHeight - 0.5) * 2;

  if (!isDragging) return;
  if (event.buttons !== 1) {
    onPointerUp(event);
    return;
  }

  if (isDetailMode()) {
    const deltaX = event.clientX - dragStartX;
    detailDragMoved = detailDragMoved || Math.abs(deltaX) > 3;
    detailRotation = detailStartRotation + deltaX * 0.012;
    return;
  }

  const deltaX = event.clientX - dragStartX;
  const step = getStep();
  const rawSteps = -deltaX / getDragPixelsPerBottle();
  const nextSteps = clamp(Math.round(rawSteps), -7, 7);
  const residualSteps = rawSteps - nextSteps;

  dragStepEstimate = nextSteps;
  dragHasNavigated = dragHasNavigated || Math.abs(deltaX) > 14;
  dragOffset = clamp(-residualSteps * step, -step * 0.46, step * 0.46);

  if (nextSteps !== getIndexDelta(dragStartTargetIndex, targetIndex)) {
    setActive(dragStartTargetIndex + nextSteps, {
      force: Math.abs(nextSteps) > 1,
    });
  }
}

function onPointerDown(event) {
  if (event.button !== 0 || event.target !== canvas) return;

  isDragging = true;
  dragStartX = event.clientX;
  dragStartY = event.clientY;
  dragOffset = 0;
  dragStartedAt = performance.now();
  dragHasNavigated = false;
  dragStartTargetIndex = targetIndex;
  dragStepEstimate = 0;
  detailStartRotation = detailRotation;
  detailDragMoved = false;
  canvas.setPointerCapture?.(event.pointerId);
  document.body.classList.add('is-dragging');
}

function onPointerUp(event) {
  const wasClick =
    isDragging &&
    event?.clientX != null &&
    !dragHasNavigated &&
    !detailDragMoved &&
    performance.now() - dragStartedAt < 520 &&
    Math.hypot(event.clientX - dragStartX, event.clientY - dragStartY) < 9;

  if (event?.pointerId && canvas.hasPointerCapture?.(event.pointerId)) {
    canvas.releasePointerCapture(event.pointerId);
  }

  isDragging = false;
  if (!isDetailMode() && dragHasNavigated) {
    setActive(dragStartTargetIndex + dragStepEstimate, {
      force: Math.abs(dragStepEstimate) > 1,
    });
  }
  dragOffset = 0;
  dragHasNavigated = false;
  dragStepEstimate = 0;
  document.body.classList.remove('is-dragging');

  if (wasClick && !isDetailMode()) {
    const pickedIndex = pickBottle(event.clientX, event.clientY);
    if (pickedIndex != null) enterDetail(pickedIndex);
  }
}

function getProjectedBottleCenter() {
  const holder = bottleObjects[isDetailMode() ? activeIndex : visualIndex];
  if (!holder) return null;

  holder.updateWorldMatrix(true, false);
  const center = holder.getWorldPosition(new THREE.Vector3());
  center.project(camera);

  return {
    x: (center.x * 0.5 + 0.5) * window.innerWidth,
    y: (-center.y * 0.5 + 0.5) * window.innerHeight,
  };
}

function isWheelNearBottle(event) {
  const rect = canvas.getBoundingClientRect();
  const localX = event.clientX - rect.left;
  const localY = event.clientY - rect.top;
  const projected = getProjectedBottleCenter();
  const mobile = window.innerWidth < 760;
  const detail = isDetailMode();
  const centerX = projected ? projected.x - rect.left : rect.width * 0.5;
  const centerY = projected ? projected.y - rect.top : rect.height * (detail ? 0.5 : 0.56);
  const radiusX = clamp(rect.width * (detail ? (mobile ? 0.34 : 0.24) : (mobile ? 0.36 : 0.26)), 110, mobile ? 210 : 300);
  const radiusY = clamp(rect.height * (detail ? (mobile ? 0.34 : 0.38) : (mobile ? 0.42 : 0.46)), 170, mobile ? 330 : 410);
  const normalizedX = (localX - centerX) / radiusX;
  const normalizedY = (localY - centerY) / radiusY;

  return normalizedX * normalizedX + normalizedY * normalizedY <= 1;
}

function onWheel(event) {
  const intent = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;

  if (!isWheelNearBottle(event)) {
    wheelRemainder = 0;
    return;
  }

  event.preventDefault();

  if (isDetailMode()) {
    if (Math.abs(intent) < 1) return;
    detailRotation += intent * 0.0028;
    return;
  }

  const now = performance.now();
  if (now - lastWheelAt > 180) wheelRemainder = 0;
  lastWheelAt = now;

  if (Math.abs(intent) < 1) return;

  wheelRemainder += intent;
  const stepSize = 58;
  const wheelSteps = clamp(Math.trunc(wheelRemainder / stepSize), -5, 5);

  if (wheelSteps === 0) return;

  moveActive(wheelSteps, { force: Math.abs(wheelSteps) > 1 });
  wheelRemainder -= wheelSteps * stepSize;
}

function onKeyDown(event) {
  if (event.key === 'Escape') {
    exitDetail();
    return;
  }

  if (isDetailMode()) {
    if (event.key === 'ArrowRight') {
      detailRotation += 0.24;
    }
    if (event.key === 'ArrowLeft') {
      detailRotation -= 0.24;
    }
    return;
  }

  if (event.key === 'ArrowRight') {
    moveActive(1);
  }
  if (event.key === 'ArrowLeft') {
    moveActive(-1);
  }
}

function isStandaloneDisplay() {
  return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
}

function updateInstallButton() {
  if (!elements.installButton) return;
  elements.installButton.hidden = !deferredInstallPrompt || isStandaloneDisplay();
}

async function onInstallClick() {
  if (!deferredInstallPrompt) return;

  deferredInstallPrompt.prompt();
  const choice = await deferredInstallPrompt.userChoice;

  if (choice.outcome === 'accepted') {
    deferredInstallPrompt = null;
    updateInstallButton();
  }
}

function registerInstallFlow() {
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    updateInstallButton();
  });

  window.addEventListener('appinstalled', () => {
    deferredInstallPrompt = null;
    updateInstallButton();
  });

  updateInstallButton();
}

function registerServiceWorker() {
  if (!('serviceWorker' in navigator) || !window.isSecureContext) return;

  if (import.meta.env.DEV) {
    const registrationsPromise = navigator.serviceWorker.getRegistrations?.();
    registrationsPromise?.then((registrations) => {
      registrations.forEach((registration) => registration.unregister());
    }).catch(() => {});
    return;
  }

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}

function bindEvents() {
  window.addEventListener('resize', onResize);
  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerdown', onPointerDown);
  window.addEventListener('pointerup', onPointerUp);
  window.addEventListener('pointercancel', onPointerUp);
  window.addEventListener('blur', onPointerUp);
  canvas.addEventListener('wheel', onWheel, { passive: false });
  window.addEventListener('keydown', onKeyDown);
  elements.previous.addEventListener('click', () => moveActive(-1));
  elements.next.addEventListener('click', () => moveActive(1));
  elements.detailClose.addEventListener('click', exitDetail);
  elements.installButton?.addEventListener('click', onInstallClick);
  elements.immersiveButton?.addEventListener('click', toggleImmersiveMode);
}

function hideLoader() {
  hasLoaded = true;
  loaderPanel.classList.add('is-hidden');
  setTimeout(() => {
    loaderPanel.remove();
  }, 700);
}

function showLoadError(error) {
  console.error(error);
  loaderPanel.classList.add('has-error');
  loaderPanel.querySelector('p').textContent = 'Impossible de charger le modèle 3D';
  loadPercent.textContent = '';
}

registerInstallFlow();
registerServiceWorker();
bindEvents();
onResize();
updateImmersiveButton();
buildDots();
updateText(bottleProfiles[0]);
animate();

gltfLoader.load(
  modelUrl.href,
  (gltf) => {
    buildBottles(gltf);
    setLoadingProgress(1);
    hideLoader();
  },
  (event) => {
    if (!event.lengthComputable || hasLoaded) return;
    setLoadingProgress(event.loaded / event.total);
  },
  showLoadError,
);
