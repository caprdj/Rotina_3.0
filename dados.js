/* =========================
   DADOS BASE — VIDA FIBRO 3.0
   Separado do HTML para deixar o app leve, rápido e fácil de manter
========================= */

// 1. CATÁLOGOS DO CARDÁPIO
const PROTEINS = [
  { id: "tanto", label: "Tanto faz" },
  { id: "frango", label: "Frango" },
  { id: "boi", label: "Boi" },
  { id: "porco", label: "Porco" },
  { id: "peixe", label: "Peixe" },
  { id: "ovo", label: "Ovo" },
  { id: "queijo", label: "Queijo" },
  { id: "laticinio", label: "Laticínios" },
  { id: "misto", label: "Misto" },
  { id: "veg", label: "Veg / Leguminosas" },
];

const KINDS = [
  { id: "tanto", label: "Tanto faz" },
  { id: "salgado", label: "Salgado" },
  { id: "doce", label: "Doce" },
];

const MEALS = [
  { id: "tanto", label: "Tanto faz" },
  { id: "lanche", label: "Lanche" },
  { id: "principal", label: "Principal" },
  { id: "petisco", label: "Petisco" },
  { id: "salada", label: "Salada" },
  { id: "molho", label: "Molho" },
  { id: "tempero", label: "Tempero" },
  { id: "sopa", label: "Sopa" },
];

const SLOT_DEFS = [
  { key: "cafe", label: "Café da manhã", emoji: "☕" },
  { key: "lanche_manha", label: "Lanche da manhã", emoji: "🍎" },
  { key: "almoco", label: "Almoço", emoji: "🍽️" },
  { key: "lanche_tarde", label: "Lanche da tarde", emoji: "🥪" },
  { key: "jantar", label: "Jantar", emoji: "🍲" },
  { key: "ceia", label: "Ceia", emoji: "🌙" },
];

// 2. CATEGORIAS DO ESTOQUE (Nomes curtos e proporcionais para a tela do celular)
const INVENTORY_ENVS = [
  { id: "hortifruti", label: "🥗 Hortifruti", shopGroup: "feira" },
  { id: "laticinios", label: "🧀 Geladeira", shopGroup: "mercado" },
  { id: "freezer", label: "❄️ Freezer", shopGroup: "mercado" },
  { id: "despensa", label: "📦 Despensa", shopGroup: "mercado" },
  { id: "limpeza", label: "🧼 Limpeza", shopGroup: "mercado" },
  { id: "cuidados", label: "🧴 Cuidados", shopGroup: "farmacia" },
  { id: "remedios", label: "💊 Remédios", shopGroup: "farmacia" }
];

// 3. ESTOQUE INICIAL (com monitor de remédios configurado e limpeza solicitada)
const SEED_INVENTORY = {
  hortifruti: [
    { id: "maca", name: "Maçã", group: "Frutas", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "good" },
    { id: "mamao", name: "Mamão", group: "Frutas", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "good" },
    { id: "banana", name: "Banana prata ou nanica", group: "Frutas", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "moderate" },
    { id: "maracuja", name: "Maracujá", group: "Frutas", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "good" },
    { id: "melao", name: "Melão", group: "Frutas", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "good" },
    { id: "pera", name: "Pera", group: "Frutas", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "good" },
    { id: "kiwi", name: "Kiwi", group: "Frutas", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "good" },
    { id: "manga", name: "Manga", group: "Frutas", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "moderate" },
    { id: "ameixa", name: "Ameixa", group: "Frutas", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "good" },
    { id: "frutas-vermelhas", name: "Frutas vermelhas (frescas ou congeladas)", group: "Frutas", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "good" },
    { id: "cebola", name: "Cebola", group: "Legumes", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "good" },
    { id: "alho", name: "Alho", group: "Legumes", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "good" },
    { id: "pimentao", name: "Pimentão", group: "Legumes", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: null },
    { id: "tomate-cereja", name: "Tomate cereja ou grape", group: "Legumes", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "good" },
    { id: "tomate", name: "Tomate", group: "Legumes", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "good" },
    { id: "cenoura", name: "Cenoura", group: "Legumes", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "good" },
    { id: "inhame", name: "Inhame", group: "Legumes", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "good" },
    { id: "batata", name: "Batata", group: "Legumes", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "moderate" },
    { id: "abobrinha", name: "Abobrinha", group: "Legumes", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "good" },
    { id: "abobora-jap", name: "Abóbora cabotiá/japonesa", group: "Legumes", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "good" },
    { id: "chuchu", name: "Chuchu", group: "Legumes", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "good" },
    { id: "brocolis", name: "Brócolis", group: "Legumes", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "good" },
    { id: "couve-flor", name: "Couve-flor", group: "Legumes", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "good" },
    { id: "batata-doce", name: "Batata-doce", group: "Legumes", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "good" },
    { id: "cogumelos", name: "Cogumelos", group: "Legumes", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "good" },
    { id: "alface", name: "Alface", group: "Verduras & Ervas", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "good" },
    { id: "rucula-agriao", name: "Rúcula ou Agrião", group: "Verduras & Ervas", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "good" },
    { id: "espinafre", name: "Espinafre", group: "Verduras & Ervas", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "good" },
    { id: "cebolinha", name: "Salsinha & Cebolinha", group: "Verduras & Ervas", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "good" }
  ],

  laticinios: [
    { id: "ovo", name: "Ovos", group: "Ovos & Laticínios", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "good" },
    { id: "iogurte-zero", name: "Iogurte natural / zero lactose", group: "Ovos & Laticínios", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "good" },
    { id: "leite-castanha", name: "Leite vegetal / Castanha", group: "Ovos & Laticínios", status: "ok", qty: 0, unit: "L", shoppingToday: false, tagHealth: "good" },
    { id: "leite", name: "Leite", group: "Ovos & Laticínios", status: "ok", qty: 0, unit: "L", shoppingToday: false, tagHealth: "moderate" },
    { id: "queijo-padrao", name: "Queijo minas / padrão", group: "Queijos & Manteiga", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "moderate" },
    { id: "queijo-parmesao", name: "Queijo parmesão", group: "Queijos & Manteiga", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "moderate" },
    { id: "ricota", name: "Ricota", group: "Queijos & Manteiga", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "good" },
    { id: "manteiga", name: "Manteiga", group: "Queijos & Manteiga", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "moderate" }
  ],

  freezer: [
    { id: "arroz-pronto", name: "Arroz pronto (porções)", group: "🍲 Comida Pronta (Salva-vidas)", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "good" },
    { id: "feijao-pronto", name: "Feijão / Leguminosa pronta", group: "🍲 Comida Pronta (Salva-vidas)", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "good" },
    { id: "frango-desfiado", name: "Frango desfiado pronto", group: "🍲 Comida Pronta (Salva-vidas)", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "good" },
    { id: "legumes-prontos", name: "Legumes prontos / Purê congelado", group: "🍲 Comida Pronta (Salva-vidas)", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "good" },
    { id: "paes-congelados", name: "Pães congelados", group: "🍲 Comida Pronta (Salva-vidas)", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "moderate" },
    { id: "filezinho", name: "Filezinho de frango", group: "🥩 Proteínas Cruas", status: "ok", qty: 0, unit: "Kg", shoppingToday: false, tagHealth: "good" },
    { id: "peito-frango", name: "Peito de frango", group: "🥩 Proteínas Cruas", status: "ok", qty: 0, unit: "Kg", shoppingToday: false, tagHealth: "good" },
    { id: "sobrecoxa", name: "Sobrecoxa", group: "🥩 Proteínas Cruas", status: "ok", qty: 0, unit: "Kg", shoppingToday: false, tagHealth: "good" },
    { id: "musculo", name: "Músculo", group: "🥩 Proteínas Cruas", status: "ok", qty: 0, unit: "Kg", shoppingToday: false, tagHealth: "good" },
    { id: "coxao-mole", name: "Coxão mole", group: "🥩 Proteínas Cruas", status: "ok", qty: 0, unit: "Kg", shoppingToday: false, tagHealth: "good" },
    { id: "carne-moida", name: "Carne moída", group: "🥩 Proteínas Cruas", status: "ok", qty: 0, unit: "Kg", shoppingToday: false, tagHealth: "good" },
    { id: "batata-airfryer", name: "Batata p/ airfryer", group: "Outros Congelados", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "moderate" },
    { id: "hamburguer-frango", name: "Hambúrguer de frango", group: "Outros Congelados", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "good" },
    { id: "hamburguer-carne", name: "Hambúrguer de carne", group: "Outros Congelados", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "good" }
  ],

  despensa: [
    { id: "arroz", name: "Arroz", group: "Grãos & Bases", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: null },
    { id: "macarrao", name: "Macarrão", group: "Grãos & Bases", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "moderate" },
    { id: "feijao-vermelho", name: "Feijão vermelho / branco", group: "Grãos & Bases", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "good" },
    { id: "milho-pipoca", name: "Milho (pipoca)", group: "Grãos & Bases", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "good" },
    { id: "grao-de-bico", name: "Grão-de-bico", group: "Grãos & Bases", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "good" },
    { id: "lentilha", name: "Lentilha", group: "Grãos & Bases", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "good" },
    { id: "tapioca", name: "Tapioca", group: "Grãos & Bases", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "moderate" },
    { id: "polvilho", name: "Polvilho", group: "Grãos & Bases", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "moderate" },
    { id: "flocao", name: "Flocão / Milharina", group: "Grãos & Bases", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "good" },
    { id: "cafe-grao", name: "Café grão", group: "Café da Manhã & Lanches", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: null },
    { id: "cafe-capsula", name: "Café cápsula", group: "Café da Manhã & Lanches", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: null },
    { id: "granola", name: "Granola / Castanhas / Chia", group: "Café da Manhã & Lanches", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "good" },
    { id: "farinha-aveia", name: "Farinha / Flocos de aveia", group: "Farinhas & Fermentos", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "good" },
    { id: "fermento-pao", name: "Fermento", group: "Farinhas & Fermentos", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: null },
    { id: "gelatina", name: "Gelatina", group: "Farinhas & Fermentos", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: null },
    { id: "torrada", name: "Torrada", group: "Biscoitos & Torradas", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "moderate" },
    { id: "sal", name: "Sal", group: "Temperos & Conservas", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: null },
    { id: "acucar", name: "Açúcar / Xilitol", group: "Temperos & Conservas", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "avoid" },
    { id: "azeite-unico", name: "Azeite extra-virgem / único", group: "Temperos & Conservas", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "good" },
    { id: "vinagre-alcool", name: "Vinagre", group: "Temperos & Conservas", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: null },
    { id: "louro", name: "Louro / Cúrcuma / Orégano", group: "Temperos & Conservas", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "good" },
    { id: "mostarda-amarela", name: "Mostarda amarela / Dijon", group: "Temperos & Conservas", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: null },
    { id: "mostarda-mel", name: "Mostarda e mel", group: "Temperos & Conservas", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "moderate" },
    { id: "palmito", name: "Palmito", group: "Temperos & Conservas", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "good" },
    { id: "sardinha", name: "Sardinha", group: "Temperos & Conservas", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "good" },
    { id: "atum-natural", name: "Atum ralado natural", group: "Temperos & Conservas", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "good" },
    { id: "milho-enlatado", name: "Milho / Ervilha", group: "Temperos & Conservas", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: null },
    { id: "thine", name: "Tahine", group: "Pastas & Secos", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "good" },
    { id: "spa-vovo", name: "Spa vovó", group: "Pastas & Secos", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: null },
    { id: "quadradinho-70", name: "Quadradinho 70% cacau", group: "Snacks & Doces", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "good" },
    { id: "pacoca-nuts", name: "Paçoca nuts integral", group: "Snacks & Doces", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tagHealth: "good" }
  ],

  limpeza: [
    // Louça & Pia
    { id: "detergente", name: "Detergente lava-louças", group: "🍽️ Louça & Cozinha", status: "ok", qty: 0, unit: "UN", shoppingToday: false },
    { id: "ype-louca", name: "Sabão p/ máquina de lavar louça", group: "🍽️ Louça & Cozinha", status: "ok", qty: 0, unit: "UN", shoppingToday: false },
    { id: "esponja", name: "Esponja de pia", group: "🍽️ Louça & Cozinha", status: "ok", qty: 0, unit: "UN", shoppingToday: false },
    { id: "perfex", name: "Perfex (pano multiuso)", group: "🍽️ Louça & Cozinha", status: "ok", qty: 0, unit: "UN", shoppingToday: false },
    // Lavanderia
    { id: "ariel-liquido", name: "Ariel líquido", group: "🧺 Lavanderia", status: "ok", qty: 0, unit: "UN", shoppingToday: false },
    { id: "amaciante", name: "Amaciante", group: "🧺 Lavanderia", status: "ok", qty: 0, unit: "UN", shoppingToday: false },
    { id: "vanish-liq", name: "Vanish líquido", group: "🧺 Lavanderia", status: "ok", qty: 0, unit: "UN", shoppingToday: false },
    { id: "surf-coco-po", name: "Surf coco pó", group: "🧺 Lavanderia", status: "ok", qty: 0, unit: "UN", shoppingToday: false },
    { id: "sabao-barra", name: "Sabão em barra", group: "🧺 Lavanderia", status: "ok", qty: 0, unit: "UN", shoppingToday: false },
    // Faxina & Kit Diarista
    { id: "agua-sanitaria", name: "Água sanitária", group: "🧹 Faxina & Kit Diarista", status: "ok", qty: 0, unit: "UN", shoppingToday: false },
    { id: "desinfetante", name: "Desinfetante", group: "🧹 Faxina & Kit Diarista", status: "ok", qty: 0, unit: "UN", shoppingToday: false },
    { id: "cif", name: "Cif cremoso", group: "🧹 Faxina & Kit Diarista", status: "ok", qty: 0, unit: "UN", shoppingToday: false },
    { id: "uau-mult", name: "Uau multiuso", group: "🧹 Faxina & Kit Diarista", status: "ok", qty: 0, unit: "UN", shoppingToday: false },
    { id: "desembala-piso", name: "Desembala piso", group: "🧹 Faxina & Kit Diarista", status: "ok", qty: 0, unit: "UN", shoppingToday: false },
    { id: "desembala-vidro", name: "Desembala vidro", group: "🧹 Faxina & Kit Diarista", status: "ok", qty: 0, unit: "UN", shoppingToday: false },
    { id: "desembala-desengo", name: "Desembala desengordurante", group: "🧹 Faxina & Kit Diarista", status: "ok", qty: 0, unit: "UN", shoppingToday: false },
    { id: "desembala-multiuso", name: "Desembala multiuso", group: "🧹 Faxina & Kit Diarista", status: "ok", qty: 0, unit: "UN", shoppingToday: false },
    // Papéis, Sacos & Descartáveis (inclui os do banheiro)
    { id: "papel-higienico", name: "Papel higiênico", group: "🧻 Papéis, Sacos & Descartáveis", status: "ok", qty: 0, unit: "UN", shoppingToday: false },
    { id: "papel-toalha", name: "Papel toalha", group: "🧻 Papéis, Sacos & Descartáveis", status: "ok", qty: 0, unit: "UN", shoppingToday: false },
    { id: "guardanapo", name: "Guardanapo", group: "🧻 Papéis, Sacos & Descartáveis", status: "ok", qty: 0, unit: "UN", shoppingToday: false },
    { id: "saco-lixo-banheiro", name: "Saco de lixo banheiro", group: "🧻 Papéis, Sacos & Descartáveis", status: "ok", qty: 0, unit: "UN", shoppingToday: false },
    { id: "saco-lixo-50l", name: "Saco de lixo 50 L", group: "🧻 Papéis, Sacos & Descartáveis", status: "ok", qty: 0, unit: "UN", shoppingToday: false },
    { id: "saco-sacole", name: "Saco sacolé", group: "🧻 Papéis, Sacos & Descartáveis", status: "ok", qty: 0, unit: "UN", shoppingToday: false },
    { id: "saco-congelar", name: "Saco pra congelar", group: "🧻 Papéis, Sacos & Descartáveis", status: "ok", qty: 0, unit: "UN", shoppingToday: false },
    { id: "plastico-filme", name: "Plástico filme", group: "🧻 Papéis, Sacos & Descartáveis", status: "ok", qty: 0, unit: "UN", shoppingToday: false },
    { id: "papel-aluminio", name: "Papel alumínio", group: "🧻 Papéis, Sacos & Descartáveis", status: "ok", qty: 0, unit: "UN", shoppingToday: false },
    { id: "palito-dente", name: "Palito de dente", group: "🧻 Papéis, Sacos & Descartáveis", status: "ok", qty: 0, unit: "UN", shoppingToday: false },
    { id: "vela", name: "Vela", group: "🧻 Papéis, Sacos & Descartáveis", status: "ok", qty: 0, unit: "UN", shoppingToday: false },
    { id: "fosforo", name: "Fósforo", group: "🧻 Papéis, Sacos & Descartáveis", status: "ok", qty: 0, unit: "UN", shoppingToday: false }
  ],

  cuidados: [
    { id: "shampoo", name: "Shampoo", group: "🚿 Banho & Higiene", status: "ok", qty: 0, unit: "UN", shoppingToday: false },
    { id: "condicionador", name: "Condicionador", group: "🚿 Banho & Higiene", status: "ok", qty: 0, unit: "UN", shoppingToday: false },
    { id: "sabonete-maos", name: "Sabonete para mãos / corpo", group: "🚿 Banho & Higiene", status: "ok", qty: 0, unit: "UN", shoppingToday: false },
    { id: "pastad", name: "Pasta de dente", group: "🚿 Banho & Higiene", status: "ok", qty: 0, unit: "UN", shoppingToday: false },
    { id: "escovad", name: "Escova de dente", group: "🚿 Banho & Higiene", status: "ok", qty: 0, unit: "UN", shoppingToday: false },
    { id: "protd", name: "Protetor diário", group: "🚿 Banho & Higiene", status: "ok", qty: 0, unit: "UN", shoppingToday: false },
    { id: "hidramao", name: "Hidratante Mãos 🫲🏻", group: "✨ Pele & Hidratação", status: "ok", qty: 0, unit: "UN", shoppingToday: false },
    { id: "hidraunha", name: "Hidratante Unhas 💅🏻", group: "✨ Pele & Hidratação", status: "ok", qty: 0, unit: "UN", shoppingToday: false },
    { id: "hidraboca", name: "Hidratante Labial 👄", group: "✨ Pele & Hidratação", status: "ok", qty: 0, unit: "UN", shoppingToday: false }
  ],

  remedios: [
    // Monitorados automaticamente (dosePerDay / period)
    { id: "puran", name: "Puran", group: "⏰ Uso Contínuo (Monitorados)", status: "ok", qty: 30, unit: "comp", shoppingToday: false, tracked: true, dose: 1, period: "dia", boxSizes: [30], alertDays: 7 },
    { id: "bup", name: "Bup", group: "⏰ Uso Contínuo (Monitorados)", status: "ok", qty: 30, unit: "comp", shoppingToday: false, tracked: true, dose: 1, period: "dia", boxSizes: [30, 60], alertDays: 7 },
    { id: "sertralina", name: "Sertralina", group: "⏰ Uso Contínuo (Monitorados)", status: "ok", qty: 30, unit: "comp", shoppingToday: false, tracked: true, dose: 1, period: "dia", boxSizes: [30], alertDays: 7 },
    { id: "kali", name: "Kalist", group: "⏰ Uso Contínuo (Monitorados)", status: "ok", qty: 30, unit: "comp", shoppingToday: false, tracked: true, dose: 1, period: "dia", boxSizes: [30], alertDays: 7 },
    { id: "glifa", name: "Glifage", group: "⏰ Uso Contínuo (Monitorados)", status: "ok", qty: 30, unit: "comp", shoppingToday: false, tracked: true, dose: 3, period: "dia", boxSizes: [30], alertDays: 5 },
    { id: "ruso", name: "Rosuvastatina", group: "⏰ Uso Contínuo (Monitorados)", status: "ok", qty: 30, unit: "comp", shoppingToday: false, tracked: true, dose: 1, period: "dia", boxSizes: [30, 60], alertDays: 7 },
    { id: "quet", name: "Quetiapina", group: "⏰ Uso Contínuo (Monitorados)", status: "ok", qty: 30, unit: "comp", shoppingToday: false, tracked: true, dose: 2, period: "dia", boxSizes: [30], alertDays: 7 },
    { id: "om3", name: "Ômega 3", group: "🌿 Suplementos (Monitorados)", status: "ok", qty: 240, unit: "cáps", shoppingToday: false, tracked: true, dose: 2, period: "dia", boxSizes: [240], alertDays: 10 },
    { id: "vd", name: "Vitamina D", group: "🌿 Suplementos (Monitorados)", status: "ok", qty: 10, unit: "cáps", shoppingToday: false, tracked: true, dose: 1, period: "semana", boxSizes: [10], alertDays: 14 },
    // Uso esporádico (sem monitoramento de dias)
    { id: "dip", name: "Dipirona 1g", group: "🆘 Uso Esporádico", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tracked: false },
    { id: "aciclo", name: "Aciclovir", group: "🆘 Uso Esporádico", status: "ok", qty: 0, unit: "UN", shoppingToday: false, tracked: false }
  ]
};

// 4. TAREFAS DOMÉSTICAS DOS 14 DIAS (Começando na 5ª feira da diarista)
// Níveis: "indispensavel" (🚨), "desejavel" (✨), "pode_esperar" (⏳)
// Esforço: "leve" (🟢), "medio" (🟡), "pesado" (🔴)
// steps: array de micro-etapas clicáveis!
const SEED_DOMESTIC_14 = {
  1: { // 5ª feira (Dia da Diarista!)
    title: "5ª feira — Dia da Diarista (Manutenção pós-faxina)",
    tasks: [
      { id: "d1_1", nome: "🍽 Louça do dia (tirar e colocar na máquina)", nivel: "indispensavel", esforco: "leve", steps: ["Tirar e guardar louça limpa", "Colocar louça do dia para lavar"] },
      { id: "d1_2", nome: "🌿 Regar Maranta e Antúrio", nivel: "indispensavel", esforco: "leve", steps: ["Checar solo e regar se estiverem secos"] },
      { id: "d1_3", nome: "🧽 Trocar kit pia & panos", nivel: "indispensavel", esforco: "leve", steps: ["Esponja e Perfex", "Bate-mão e pano de prato"] },
      { id: "d1_4", nome: "🧺 Recolocar só o essencial nas superfícies", nivel: "indispensavel", esforco: "leve", steps: ["Mesas e bancadas livres"] },
      { id: "d1_5", nome: "☕ Pausa de Autocuidado", nivel: "indispensavel", esforco: "leve", steps: ["Beber água", "Alongar 2 minutos e descansar"] },
      { id: "d1_6", nome: "🧼 Repor essência / aromatizador", nivel: "desejavel", esforco: "leve", steps: ["Encher potinhos aromatizadores"] },
      { id: "d1_7", nome: "🛒 Mercado (Despensa – itens de base)", nivel: "desejavel", esforco: "medio", steps: ["Conferir lista de compras da despensa", "Fazer pedido ou compra de base"] },
      { id: "d1_8", nome: "🍲 Pré-preparo Leve", nivel: "desejavel", esforco: "medio", steps: ["🥬 Lavar e porcionar 1 tipo de verdura (rúcula ou alface)", "🥣 Separar 4–5 potinhos vazios para o fim de semana"] },
      { id: "d1_9", nome: "🛋 Trocar manta da sala", nivel: "pode_esperar", esforco: "leve", steps: ["Trocar se necessário"] },
      { id: "d1_10", nome: "🧊 Revisar geladeira & freezer", nivel: "pode_esperar", esforco: "leve", steps: ["Limpeza rápida de 1 prateleira da geladeira", "Conferir o que entrou/saiu do freezer"] }
    ]
  },
  2: { // 6ª feira (Semana 1)
    title: "6ª feira — Pós-diarista",
    tasks: [
      { id: "d2_1", nome: "🍽 Louça do dia (tirar e lavar na máquina)", nivel: "indispensavel", esforco: "leve", steps: ["Tirar e guardar", "Lavar na máquina"] },
      { id: "d2_2", nome: "🗑 Lixo", nivel: "indispensavel", esforco: "leve", steps: ["Tirar lixo", "Levar para fora", "Colocar saco novo"] },
      { id: "d2_3", nome: "🪴 Plantas", nivel: "indispensavel", esforco: "leve", steps: ["Checar solo e regar só as secas"] },
      { id: "d2_4", nome: "🔥 Fogão rápido", nivel: "desejavel", esforco: "leve", steps: ["Limpeza rápida do tampo e da boca principal"] },
      { id: "d2_5", nome: "🥘 Pré-preparo (Planejamento)", nivel: "desejavel", esforco: "leve", steps: ["Conferir se tem os ingredientes principais", "Anotar na lista o que falta comprar"] },
      { id: "d2_6", nome: "🧹 Cesta 5 min na área de serviço", nivel: "pode_esperar", esforco: "leve", steps: ["Guardar o que está fora do lugar (sem faxina completa)"] },
      { id: "d2_7", nome: "📝 Organizar sacola de retorno / Lavanderia reserva", nivel: "pode_esperar", esforco: "leve", steps: ["Checar sacola de retorno", "Lavanderia só se realmente precisar"] }
    ]
  },
  3: { // Sábado (Semana 1)
    title: "Sábado — Fim de semana (Semana 1)",
    tasks: [
      { id: "d3_1", nome: "🍽 Louça do dia (tirar e lavar na máquina)", nivel: "indispensavel", esforco: "leve", steps: ["Tirar e guardar", "Lavar na máquina"] },
      { id: "d3_2", nome: "🗑 Banheiro rápido (Lixeira + Bate-mão + Espelho)", nivel: "indispensavel", esforco: "leve", steps: ["Tirar lixo do banheiro e pôr saco novo", "Trocar pano bate-mão", "Passar pano rápido no espelho"] },
      { id: "d3_3", nome: "👖 Tirar roupa da corda (se houver)", nivel: "indispensavel", esforco: "leve", steps: ["Recolher, dobrar e guardar"] },
      { id: "d3_4", nome: "👕 Lavanderia (Cama & Banho)", nivel: "desejavel", esforco: "medio", steps: ["Bater lençol + toalha + panos de chão"] },
      { id: "d3_5", nome: "🍲 Pré-preparo Bloco 1 (Divida em etapas!)", nivel: "desejavel", esforco: "pesado", steps: ["🍗 Cozinhar frango e desfiar (2 porções p/ congelar)", "🥩 Refogar carne moída simples (3 porções)", "🥒 Congelar legumes em cubos (abóbora + cenoura)"] },
      { id: "d3_6", nome: "♻️ Recicláveis", nivel: "pode_esperar", esforco: "leve", steps: ["Separar e organizar para descarte"] },
      { id: "d3_7", nome: "📝 Triagem da inbox 10 min", nivel: "pode_esperar", esforco: "leve", steps: ["Descartar, arquivar ou ação rápida"] },
      { id: "d3_8", nome: "🛏 Quarto & cosméticos (1 gaveta)", nivel: "pode_esperar", esforco: "medio", steps: ["Organizar 1 gaveta OU separar 5 itens para doação/descarte"] }
    ]
  },
  4: { // Domingo (Semana 1)
    title: "Domingo — Fim de semana (Semana 1)",
    tasks: [
      { id: "d4_1", nome: "🍽 Louça do dia (tirar e lavar na máquina)", nivel: "indispensavel", esforco: "leve", steps: ["Tirar e guardar", "Lavar na máquina"] },
      { id: "d4_2", nome: "👖 Tirar da corda (se houver)", nivel: "indispensavel", esforco: "leve", steps: ["Dobrar e guardar"] },
      { id: "d4_3", nome: "👕 Lavanderia (Roupa do dia a dia)", nivel: "desejavel", esforco: "medio", steps: ["Colocar roupa do dia a dia para lavar e estender"] },
      { id: "d4_4", nome: "🚽 Banheiro manutenção rápida", nivel: "desejavel", esforco: "medio", steps: ["Pia rápida", "Vaso rápido"] },
      { id: "d4_5", nome: "🍲 Pré-preparo Bloco 2 (Grãos)", nivel: "desejavel", esforco: "medio", steps: ["🫛 Cozinhar lentilha (2 porções)", "🫛 Cozinhar grão-de-bico (2 porções)", "🥣 Congelar proteínas em potinhos"] },
      { id: "d4_6", nome: "🗃 Mesa de trabalho 5 min", nivel: "pode_esperar", esforco: "leve", steps: ["Organizar papéis/objetos", "Passar pano"] }
    ]
  },
  5: { // 2ª feira (Semana 1)
    title: "2ª feira — Início da semana",
    tasks: [
      { id: "d5_1", nome: "🍽 Louça do dia (tirar e lavar na máquina)", nivel: "indispensavel", esforco: "leve", steps: ["Tirar e guardar", "Lavar na máquina"] },
      { id: "d5_2", nome: "🌿 Regar e adubar plantas", nivel: "indispensavel", esforco: "leve", steps: ["Maranta e Antúrio", "Jibóia e Dracena"] },
      { id: "d5_3", nome: "🧻 Mesa de jantar & Bate-mão", nivel: "indispensavel", esforco: "leve", steps: ["Trocar pano bate-mão", "Passar multiuso e pano na mesa de jantar"] },
      { id: "d5_4", nome: "🤖 Robô aspirador (Básico: 2 cômodos)", nivel: "indispensavel", esforco: "leve", steps: ["Rodar na Sala + Escritório"] },
      { id: "d5_5", nome: "👙 Lavanderia & Corda", nivel: "desejavel", esforco: "medio", steps: ["Tirar da corda e guardar (se houver)", "Lavar roupa íntima"] },
      { id: "d5_6", nome: "🥘 Pré-preparo complementar", nivel: "desejavel", esforco: "medio", steps: ["🍚 Cozinhar arroz para a semana", "🍗 Se não fez no FDS: frango desfiado / carne moída", "📝 Atualizar itens no estoque do Freezer"] },
      { id: "d5_7", nome: "🤖 Robô extra (Quarto + Suíte) & Bancada Área", nivel: "pode_esperar", esforco: "medio", steps: ["Rodar robô no Quarto principal + Banheiro suíte", "Passar pano na bancada da área de serviço"] }
    ]
  },
  6: { // 3ª feira (Semana 1)
    title: "3ª feira — Manutenção & Hortifruti",
    tasks: [
      { id: "d6_1", nome: "🍽 Louça do dia (tirar e lavar na máquina)", nivel: "indispensavel", esforco: "leve", steps: ["Tirar e guardar", "Lavar na máquina"] },
      { id: "d6_2", nome: "🚽 Pia + vaso rápido", nivel: "indispensavel", esforco: "medio", steps: ["Desinfetante e escova no vaso", "Pano rápido na pia"] },
      { id: "d6_3", nome: "🪴 Plantas", nivel: "indispensavel", esforco: "leve", steps: ["Checar solo e regar secas"] },
      { id: "d6_4", nome: "🤖 Robô aspirador (3 cômodos)", nivel: "indispensavel", esforco: "leve", steps: ["Cozinha + Área de serviço + Corredor"] },
      { id: "d6_5", nome: "🛒 Hortifruti / Feira (Compra + Higienizar)", nivel: "desejavel", esforco: "medio", steps: ["Compra rápida de hortifruti", "🍉 Lavar e porcionar frutas", "🧼 Higienizar saladas para 3–4 dias", "🍅 Deixar tomate e cebola picados em potinhos"] },
      { id: "d6_6", nome: "🧻 Banheiro complemento (Lixo, papel, espelho)", nivel: "desejavel", esforco: "leve", steps: ["Tirar lixeira do banheiro", "Repor papel e sabonete", "Pano úmido/seco no espelho e bancada"] },
      { id: "d6_7", nome: "👖 Tirar da corda (se houver)", nivel: "pode_esperar", esforco: "leve", steps: ["Dobrar e guardar"] }
    ]
  },
  7: { // 4ª feira (Semana 1)
    title: "4ª feira — Fechamento da 1ª semana",
    tasks: [
      { id: "d7_1", nome: "🍽 Louça do dia (tirar e lavar na máquina)", nivel: "indispensavel", esforco: "leve", steps: ["Tirar e guardar", "Lavar na máquina"] },
      { id: "d7_2", nome: "🧻 Trocar pano bate-mão & Checar Maranta/Dracena", nivel: "indispensavel", esforco: "leve", steps: ["Trocar bate-mão", "Checar Maranta e Dracena"] },
      { id: "d7_3", nome: "🛋 Sala rápida (Manta, almofadas e rack 5 min)", nivel: "indispensavel", esforco: "leve", steps: ["Alinhar manta e almofadas", "Mesa/rack 5 min: tirar excessos e passar pano"] },
      { id: "d7_4", nome: "👕 Lavanderia & Corda", nivel: "desejavel", esforco: "medio", steps: ["Tirar da corda e dobrar", "Lavar roupa do dia a dia"] },
      { id: "d7_5", nome: "🥘 Pré-preparo (Montar potinhos)", nivel: "desejavel", esforco: "leve", steps: ["Montar 1–2 potinhos extras (proteína + legume) com o que já está cozido"] },
      { id: "d7_6", nome: "🪑 Escritório, Cabos & Inbox 10 min", nivel: "pode_esperar", esforco: "leve", steps: ["Organizar superfícies do escritório", "Organizar cabos/carregadores", "Triagem inbox 10 min"] }
    ]
  },
  8: { // 5ª feira (Semana 2 — Quinta SEM diarista)
    title: "5ª feira — Semana sem diarista (Dia 8)",
    tasks: [
      { id: "d8_1", nome: "🍽 Louça do dia (tirar e lavar na máquina)", nivel: "indispensavel", esforco: "leve", steps: ["Tirar e guardar", "Lavar na máquina"] },
      { id: "d8_2", nome: "🧽 Trocar esponja + perfex", nivel: "indispensavel", esforco: "leve", steps: ["Substituir esponja e perfex"] },
      { id: "d8_3", nome: "🌵 Rega + adubo (Cactos & Suculentas)", nivel: "indispensavel", esforco: "leve", steps: ["Rosa do Deserto, Cacto, Suculentas e Sarcostemma (rega espaçada)"] },
      { id: "d8_4", nome: "🔥 Bancada + fogão rápido", nivel: "indispensavel", esforco: "leve", steps: ["Passar pano desengordurante na bancada e fogão"] },
      { id: "d8_5", nome: "🛒 Mercado (Despensa) & Guardar", nivel: "desejavel", esforco: "medio", steps: ["Guardar compras da despensa", "Atualizar itens no Estoque do app"] },
      { id: "d8_6", nome: "🍲 Pré-preparo de Forno", nivel: "desejavel", esforco: "medio", steps: ["🥓 Assar picanha suína e congelar em porções", "🥦 Se tiver energia: assar/congelar abobrinha e brócolis"] },
      { id: "d8_7", nome: "🧼 Limpar robô aspirador & Recicláveis", nivel: "pode_esperar", esforco: "medio", steps: ["Limpar reservatório, filtro (secar 24h), escovas e sensores do robô", "♻️ Enxaguar e achatar recicláveis"] }
    ]
  },
  9: { // 6ª feira (Semana 2)
    title: "6ª feira — Semana sem diarista",
    tasks: [
      { id: "d9_1", nome: "🍽 Louça do dia (tirar e lavar na máquina)", nivel: "indispensavel", esforco: "leve", steps: ["Tirar e guardar", "Lavar na máquina"] },
      { id: "d9_2", nome: "🗑 Lixo & Bate-mão", nivel: "indispensavel", esforco: "leve", steps: ["Tirar lixo e pôr saco novo", "Trocar pano bate-mão"] },
      { id: "d9_3", nome: "🌿 Plantas", nivel: "indispensavel", esforco: "leve", steps: ["Checar solo e regar secas"] },
      { id: "d9_4", nome: "🍲 Pré-preparo (Só logística)", nivel: "desejavel", esforco: "leve", steps: ["🧐 Definir quais 2 porções do freezer serão usadas no fim de semana"] },
      { id: "d9_5", nome: "🧹 Cesta 5 min na área & Recicláveis", nivel: "pode_esperar", esforco: "leve", steps: ["Cesta 5 min na área de serviço", "Checar recicláveis para levar ao ponto", "Lavanderia reserva (só se precisar)"] }
    ]
  },
  10: { // Sábado (Semana 2)
    title: "Sábado — Fim de semana (Semana 2)",
    tasks: [
      { id: "d10_1", nome: "🍽 Louça do dia (tirar e lavar na máquina)", nivel: "indispensavel", esforco: "leve", steps: ["Tirar e guardar", "Lavar na máquina"] },
      { id: "d10_2", nome: "❄️ Freezer (Separar porções FDS)", nivel: "indispensavel", esforco: "leve", steps: ["Separar 2 porções prontas para o fim de semana"] },
      { id: "d10_3", nome: "🛷 Mesa de jantar, Bate-mão & Plantas", nivel: "indispensavel", esforco: "leve", steps: ["Multiuso e pano na mesa de jantar", "Trocar pano bate-mão", "Regar plantas secas"] },
      { id: "d10_4", nome: "🧕 Lavanderia (Lençol + toalha + panos)", nivel: "desejavel", esforco: "medio", steps: ["Colocar roupa de cama e banho na máquina"] },
      { id: "d10_5", nome: "🍲 Pré-preparo (Purê & Legumes)", nivel: "desejavel", esforco: "medio", steps: ["🥔 Preparar purê de batata-doce (porções p/ congelar)", "🥕 Congelar cenoura/abobrinha se faltar"] }
    ]
  },
  11: { // Domingo (Semana 2)
    title: "Domingo — Fim de semana (Semana 2)",
    tasks: [
      { id: "d11_1", nome: "🍽 Louça do dia (tirar e lavar na máquina)", nivel: "indispensavel", esforco: "leve", steps: ["Tirar e guardar", "Lavar na máquina"] },
      { id: "d11_2", nome: "🧹 Bancada 5 min", nivel: "indispensavel", esforco: "leve", steps: ["Passar pano na Bancada A (e B se der)"] },
      { id: "d11_3", nome: "👕 Lavanderia (Roupa do dia a dia)", nivel: "desejavel", esforco: "medio", steps: ["Lavar roupa do dia a dia"] },
      { id: "d11_4", nome: "🍲 Pré-preparo (Revisar proteínas)", nivel: "desejavel", esforco: "medio", steps: ["🥩 Revisar proteínas (frango/carne/lentilha/grão-de-bico) e completar se estiver acabando", "🥣 Separar potinhos para os próximos dias"] },
      { id: "d11_5", nome: "🧊 Geladeira (1 prateleira) & Recicláveis", nivel: "pode_esperar", esforco: "leve", steps: ["Passar pano úmido em 1 prateleira da geladeira", "♻️ Enxaguar e achatar PET/latas"] }
    ]
  },
  12: { // 2ª feira (Semana 2)
    title: "2ª feira — Reta final da quinzena",
    tasks: [
      { id: "d12_1", nome: "🍽 Louça do dia (tirar e lavar na máquina)", nivel: "indispensavel", esforco: "leve", steps: ["Tirar e guardar", "Lavar na máquina"] },
      { id: "d12_2", nome: "🌿 Rega leve & Bate-mão & Mesa", nivel: "indispensavel", esforco: "leve", steps: ["Regar Maranta, antúrio, jibóia e dracena (se secos)", "Trocar pano bate-mão", "Multiuso e pano na mesa de jantar"] },
      { id: "d12_3", nome: "🤖 Robô aspirador (Sala + Escritório)", nivel: "indispensavel", esforco: "leve", steps: ["Rodar robô na Sala e Escritório"] },
      { id: "d12_4", nome: "👙 Lavanderia & Corda", nivel: "desejavel", esforco: "medio", steps: ["Tirar da corda, dobrar e guardar", "Lavar roupa íntima se acumulou"] },
      { id: "d12_5", nome: "🍲 Pré-preparo & Conferência Freezer", nivel: "desejavel", esforco: "medio", steps: ["Conferir se há arroz, frango e carne prontos", "🥦 Fazer 1 legume rápido para repor potinhos (couve ou brócolis)"] },
      { id: "d12_6", nome: "🧹 Bancada Área & 1 Prateleira Geladeira", nivel: "pode_esperar", esforco: "leve", steps: ["Passar pano na bancada da área de serviço", "Organizar 1 prateleira da geladeira"] }
    ]
  },
  13: { // 3ª feira (Semana 2)
    title: "3ª feira — Pré-faxina & Hortifruti",
    tasks: [
      { id: "d13_1", nome: "🍽 Louça do dia (tirar e lavar na máquina)", nivel: "indispensavel", esforco: "leve", steps: ["Tirar e guardar", "Lavar na máquina"] },
      { id: "d13_2", nome: "🧻 Trocar bate-mão & Catar roupas", nivel: "indispensavel", esforco: "leve", steps: ["Trocar pano bate-mão", "Roupas sujas → cesto", "Roupas limpas → guardar"] },
      { id: "d13_3", nome: "🛒 Hortifruti + Higienizar saladas", nivel: "desejavel", esforco: "medio", steps: ["Comprar hortifruti", "🍉 Lavar/porcionar frutas", "🧼 Higienizar saladas para 3–4 dias", "🍅 Picar tomate e cebola p/ potinhos"] },
      { id: "d13_4", nome: "🤖 Robô aspirador (2 cômodos mais pisados)", nivel: "desejavel", esforco: "leve", steps: ["Rodar na Sala + Corredor"] },
      { id: "d13_5", nome: "💄 Cosméticos 5 min & 1 Gaveta", nivel: "pode_esperar", esforco: "leve", steps: ["Cosméticos: descartar vazios e limpar tampo", "Organizar 1 gaveta OU separar 5 itens p/ doação"] }
    ]
  },
  14: { // 4ª feira (Véspera da Diarista!)
    title: "4ª feira — Véspera da Diarista (Preparar casa)",
    tasks: [
      { id: "d14_1", nome: "🍽 Louça do dia (tirar e lavar na máquina)", nivel: "indispensavel", esforco: "leve", steps: ["Tirar e guardar", "Lavar na máquina"] },
      { id: "d14_2", nome: "🧹 Confirmar material de limpeza para amanhã", nivel: "indispensavel", esforco: "leve", steps: ["Conferir sprays Desembala (multiuso, desinfetante, desengordurante)", "Conferir sacos de lixo e produtos da diarista"] },
      { id: "d14_3", nome: "🛏 Separar roupas de cama, toalhas e panos de chão", nivel: "indispensavel", esforco: "leve", steps: ["Deixar jogo de lençol, toalhas e panos separados para troca amanhã"] },
      { id: "d14_4", nome: "🧹 Regra da Cesta 5 min (Liberar superfícies)", nivel: "indispensavel", esforco: "leve", steps: ["Liberar mesa, pia e bancadas para facilitar a limpeza de amanhã"] },
      { id: "d14_5", nome: "🌿 Regar Zamioculca & Checar Suculentas", nivel: "desejavel", esforco: "leve", steps: ["Regar Zamioculca (adubar na 1ª semana do mês)", "Checar suculentas, cacto e rosa do deserto"] },
      { id: "d14_6", nome: "🗑 Lixo & Balanço do Freezer", nivel: "pode_esperar", esforco: "leve", steps: ["Levar lixo e colocar saco novo", "Conferir proteínas/legumes prontos que restaram na quinzena"] }
    ]
  }
};

// 5. EXERCÍCIOS DOS 14 DIAS (Casa e Viagem — Energia Alta e Baixa — Descrições completas do App 2.0)
const SEED_EXERCISES_14 = {
  1: [
    // Casa / alta
    {id:"d1_1",nome:"Esteira 10–15 min",instrucao:"Inicie em velocidade confortável (sem esforço respiratório). Mantenha postura ereta, ombros baixos. Ritmo recomendado: esforço 3–4/10 • Se sentir peso nas pernas, reduza ou finalize antes. • Versão leve: 5 minutos de caminhada MUITO leve (ou apenas alongar se estiver sem energia)",equipamento:"Esteira",energia:"alta",contexto:"casa",categoria:"cardio"},
    {id:"d1_3",nome:"Ponte",instrucao:"Deite-se de barriga para cima, joelhos dobrados e pés paralelos. Ative o abdômen levemente. Ao expirar, eleve o quadril articulando a coluna vértebra por vértebra. Segure 1–2 s no topo. Inspire descendo devagar. • 6–10 repetições. • Variação (boa energia): ponte com elevação de calcanhares ou elevação alternada de pernas. • Benefícios: ativa glúteos + core e reduz rigidez lombar.",equipamento:"Tapete",energia:"alta",contexto:"casa",categoria:"mobilidade"},
    {id:"d1_4",nome:"Agachamento com bola na parede",instrucao:"Fique de costas para a parede com a bola entre a lombar e a parede. Pés afastados à frente do corpo. Ao expirar, desça deslizando pela bola até um ângulo confortável (45°–60°). Suba inspirando. • 6–10 repetições • Benefícios: fortalece quadríceps sem impacto",equipamento:"Bola",energia:"alta",contexto:"casa",categoria:"forca"},
    {id:"d1_5",nome:"Subida no step",instrucao:"Pé direito no step → suba pressionando o calcanhar → traga o outro pé → desça devagar. • 8 repetições cada lado. • Use apoio lateral se precisar. • Benefícios: força funcional e equilíbrio.",equipamento:"Step",energia:"alta",contexto:"casa",categoria:"forca"},
    // Casa / baixa
    {id:"d1_6",nome:"Esteira Leve",instrucao:"Versão leve: 5 minutos de caminhada MUITO leve (ou apenas alongar se estiver sem energia)",equipamento:"Esteira",energia:"baixa",contexto:"casa",categoria:"cardio"},
    {id:"d1_7",nome:"Aquecimento e Respiração",instrucao:"Sente-se ou deite-se confortavelmente. Inspire pelo nariz expandindo costelas e abdômen; expire pela boca esvaziando o abdômen. • Ombros: círculos lentos para frente e para trás • Pescoço: movimentos suaves de cima/baixo e direita/esquerda, sem forçar • Tornozelos: círculos para ativar circulação • Benefício: reduz rigidez e prepara a musculatura",equipamento:"Sem equipamento",energia:"baixa",contexto:"casa",categoria:"respiracao"},
    {id:"d1_8",nome:"Ponte Simples",instrucao:"Deite-se de barriga para cima, joelhos dobrados e pés paralelos. Ative o abdômen levemente. Ao expirar, eleve o quadril articulando a coluna vértebra por vértebra. Segure 1–2 s no topo. Inspire descendo devagar. • 6–10 repetições. • Benefícios: ativa glúteos + core e reduz rigidez lombar.",equipamento:"Tapete",energia:"baixa",contexto:"casa",categoria:"mobilidade"},
    // Viagem
    {id:"d1_viagem_1",nome:"Respiração na cama",instrucao:"Deitada, respiração diafragmática por 3–5 min.",equipamento:"Sem equipamento",energia:"alta",contexto:"viagem",categoria:"respiracao"},
    {id:"d1_viagem_2",nome:"Alongamento na cama",instrucao:"Esticar pernas e braços, movimentos suaves.",equipamento:"Sem equipamento",energia:"alta",contexto:"viagem",categoria:"mobilidade"},
    {id:"d1_viagem_3",nome:"Respiração na cama",instrucao:"Deitada, respiração diafragmática por 3–5 min.",equipamento:"Sem equipamento",energia:"baixa",contexto:"viagem",categoria:"respiracao"},
    {id:"d1_viagem_along_4",nome:"Alongamento na cama",instrucao:"Esticar pernas e braços, movimentos suaves.",equipamento:"Sem equipamento",energia:"baixa",contexto:"viagem",categoria:"mobilidade"}
  ],
  2: [
    // Casa / alta
    {id:"d2_1",nome:"Alongamento da coluna",instrucao:"Sente-se com pernas estendidas (ou flexionadas). Inspire crescendo a coluna; expire desenrolando vértebra por vértebra. • 3–5 repetições. • Benefícios: solta cadeia posterior e reduz rigidez matinal",equipamento:"Tapete",energia:"alta",contexto:"casa",categoria:"alongamento"},
    {id:"d2_2",nome:"Alongamento lateral - Sereia",instrucao:"Sente-se com pernas dobradas para um lado. Incline o tronco lateralmente. Eleve o braço oposto. Respire 15–20 s. • Benefícios: alivia laterais do tronco e lombar.",equipamento:"Tapete",energia:"alta",contexto:"casa",categoria:"alongamento"},
    {id:"d2_3",nome:"Gato–Vaca",instrucao:"Em quatro apoios: inspire arqueando a lombar (Vaca); expire arredondando a coluna (Gato). • 8–10 ciclos. • Benefícios: mobiliza coluna e alivia tensão.",equipamento:"Tapete",energia:"alta",contexto:"casa",categoria:"mobilidade"},
    {id:"d2_4",nome:"Alongamento posterior com faixa",instrucao:"Deite-se e passe a faixa no pé. Eleve a perna até sentir alongar. • 20–30 s cada lado. • Benefícios: reduz tensão lombar e posterior.",equipamento:"Faixa",energia:"alta",contexto:"casa",categoria:"alongamento"},
    {id:"d2_5",nome:"Relaxamento com bola",instrucao:"Opção 1: pernas apoiadas na bola. Opção 2: costas apoiadas na bola. • Respire profundamente por 1–2 min. • Libera tensão e abre o peito.",equipamento:"Bola",energia:"alta",contexto:"casa",categoria:"recuperacao"},
    // Casa / baixa
    {id:"d2_7",nome:"Respiração",instrucao:"Foque em 2 minutos de respiração tranquila.",equipamento:"Sem equipamento",energia:"baixa",contexto:"casa",categoria:"respiracao"},
    {id:"d2_8",nome:"Alongamento da coluna",instrucao:"Sente-se com pernas estendidas (ou flexionadas). Inspire crescendo a coluna; expire desenrolando vértebra por vértebra. • 3–5 repetições. • Benefícios: solta cadeia posterior e reduz rigidez matinal",equipamento:"2 alongamentos à escolha",energia:"baixa",contexto:"casa",categoria:"alongamento"},
    {id:"d2_9",nome:"Alongamento lateral - Sereia",instrucao:"Sente-se com pernas dobradas para um lado. Incline o tronco lateralmente. Eleve o braço oposto. Respire 15–20 s. • Benefícios: alivia laterais do tronco e lombar.",equipamento:"2 alongamentos à escolha",energia:"baixa",contexto:"casa",categoria:"alongamento"},
    {id:"d2_10",nome:"Alongamento posterior com faixa",instrucao:"Deite-se e passe a faixa no pé. Eleve a perna até sentir alongar. • 20–30 s cada lado. • Benefícios: reduz tensão lombar e posterior.",equipamento:"2 alongamentos à escolha",energia:"baixa",contexto:"casa",categoria:"alongamento"},
    // Viagem
    {id:"d2_viagem_resp",nome:"Respiração na cama",instrucao:"Deitada, respiração diafragmática por 3–5 min.",equipamento:"Sem equipamento",energia:"alta",contexto:"viagem",categoria:"respiracao"},
    {id:"d2_viagem_along_cama",nome:"Alongamento na cama",instrucao:"Esticar pernas e braços, movimentos suaves.",equipamento:"Sem equipamento",energia:"alta",contexto:"viagem",categoria:"mobilidade"},
    {id:"d2_viagem_resp2",nome:"Respiração na cama",instrucao:"Deitada, respiração diafragmática por 3–5 min.",equipamento:"Sem equipamento",energia:"baixa",contexto:"viagem",categoria:"respiracao"},
    {id:"d2_viagem_along_cama2",nome:"Alongamento na cama",instrucao:"Esticar pernas e braços, movimentos suaves.",equipamento:"Sem equipamento",energia:"baixa",contexto:"viagem",categoria:"mobilidade"}
  ],
  3: [
    // Casa / alta
    {id:"d3_1",nome:"Esteira 5–10 min",instrucao:"Caminhada leve, coluna ereta. Esforço 2–3/10. • Versão leve: 3–5 min ou eliminar.",equipamento:"Esteira",energia:"alta",contexto:"casa",categoria:"cardio"},
    {id:"d3_2",nome:"Remada",instrucao:"Sente-se no chão com as pernas estendidas (ou flexionadas se ficar mais confortável). Passe a faixa elástica pela sola dos pés e segure as pontas com as mãos • Alternativa: prenda a faixa em algo fixo à altura do peito e fique sentada ou em pé. Coluna ereta, ombros longe das orelhas. Inspire preparando. Ao expirar, puxe os cotovelos para trás, rente ao corpo, como se quisesse juntar as escápulas. Mantenha punhos neutros e braços paralelos ao chão. Inspire retornando lentamente à posição inicial • Repita 8–12 vezes em ritmo controlado • Erros comuns a evitar: Encolher os ombros. Arredondar as costas. Puxar com força excessiva • Benefícios: fortalece parte superior das costas, melhora postura e estabilidade escapular.",equipamento:"Faixa",energia:"alta",contexto:"casa",categoria:"forca"},
    {id:"d3_3",nome:"Bíceps com 1–2 kg",instrucao:"Sente-se ou fique em pé com coluna ereta. Segure um halter em cada mão, braços ao lado do corpo, palmas voltadas para frente. Inspire. Ao expirar, flexione os cotovelos, trazendo os pesos em direção aos ombros sem mover a parte superior dos braços. Inspire descendo lentamente, mantendo controle • Repita 8–10 vezes • Dicas: Cotovelos sempre colados ao tronco. Punhos neutros (não dobre para trás). Movimentos lentos, sem balanço do corpo • Benefícios: ativa bíceps sem sobrecarregar ombros, ajuda em atividades diárias como carregar objetos leves.",equipamento:"Halteres",energia:"alta",contexto:"casa",categoria:"forca"},
    {id:"d3_4",nome:"Compressão de aro",instrucao:"Sente-se em postura ereta. Segure o aro entre as mãos, braços estendidos à frente na altura do peito. Cotovelos levemente flexionados. Inspire. Ao expirar, pressione o aro, ativando o peitoral e músculos dos ombros. Mantenha a pressão por 1–2 segundos. Inspire relaxando lentamente • Repita 8–12 vezes • Erros comuns: Elevar os ombros. Pressionar com força excessiva (evite tremer). Empurrar o pescoço para frente • Benefícios: fortalece peito, estabiliza ombros e melhora consciência postural.",equipamento:"Aro",energia:"alta",contexto:"casa",categoria:"forca"},
    {id:"d3_5",nome:"Equilíbrio no disco",instrucao:"Coloque o disco no chão próximo a uma parede, mesa ou cadeira firme. Suba no disco com um pé de cada vez, mantendo joelhos levemente flexionados. Segure no apoio até sentir segurança. Quando estiver estável, solte o apoio somente se se sentir confiante. Mantendo abdômen levemente ativado, tente permanecer estável por 20–30 segundos. Desça devagar segurando no apoio • Variação mais leve: Fique apenas com um pé no disco e outro no chão. Ou sente-se sobre o disco para ativar o core de forma mais suave • Benefícios: melhora equilíbrio, propriocepção e estabilidade das articulações.",equipamento:"Disco de Equilíbrio",energia:"alta",contexto:"casa",categoria:"equilibrio"},
    // Casa / baixa
    {id:"d3_6",nome:"Caminhada leve 3–5 min",instrucao:"Caminhar 3–5 min OU eliminar a esteira se houver dor/tontura/fadiga forte.",equipamento:"Esteira",energia:"baixa",contexto:"casa",categoria:"cardio"},
    {id:"d3_7",nome:"Remada",instrucao:"Sente-se no chão com as pernas estendidas (ou flexionadas se ficar mais confortável). Passe a faixa elástica pela sola dos pés e segure as pontas com as mãos • Alternativa: prenda a faixa em algo fixo à altura do peito e fique sentada ou em pé. Coluna ereta, ombros longe das orelhas. Inspire preparando. Ao expirar, puxe os cotovelos para trás, rente ao corpo, como se quisesse juntar as escápulas. Mantenha punhos neutros e braços paralelos ao chão. Inspire retornando lentamente à posição inicial • Repita 8–12 vezes em ritmo controlado • Erros comuns a evitar: Encolher os ombros. Arredondar as costas. Puxar com força excessiva • Benefícios: fortalece parte superior das costas, melhora postura e estabilidade escapular.",equipamento:"Faixa",energia:"baixa",contexto:"casa",categoria:"forca"},
    {id:"d3_8",nome:"Compressão de aro",instrucao:"Sente-se em postura ereta. Segure o aro entre as mãos, braços estendidos à frente na altura do peito. Cotovelos levemente flexionados. Inspire. Ao expirar, pressione o aro, ativando o peitoral e músculos dos ombros. Mantenha a pressão por 1–2 segundos. Inspire relaxando lentamente • Repita 8–12 vezes • Erros comuns: Elevar os ombros. Pressionar com força excessiva (evite tremer). Empurrar o pescoço para frente • Benefícios: fortalece peito, estabiliza ombros e melhora consciência postural.",equipamento:"Aro",energia:"baixa",contexto:"casa",categoria:"forca"},
    // Viagem
    {id:"d3_viagem_1",nome:"Respiração na cama",instrucao:"Deitada, respiração diafragmática por 3–5 min.",equipamento:"Sem equipamento",energia:"alta",contexto:"viagem",categoria:"respiracao"},
    {id:"d3_viagem_2",nome:"Alongamento na cama",instrucao:"Esticar pernas e braços, movimentos suaves.",equipamento:"Sem equipamento",energia:"alta",contexto:"viagem",categoria:"mobilidade"},
    {id:"d3_viagem_3",nome:"Respiração na cama",instrucao:"Deitada, respiração diafragmática por 3–5 min.",equipamento:"Sem equipamento",energia:"baixa",contexto:"viagem",categoria:"respiracao"},
    {id:"d3_viagem_4",nome:"Alongamento na cama",instrucao:"Esticar pernas e braços, movimentos suaves.",equipamento:"Sem equipamento",energia:"baixa",contexto:"viagem",categoria:"mobilidade"}
  ],
  4: [
    // Casa / alta
    {id:"d4_1",nome:"1. Alongamento da Coluna",instrucao:"Sente-se com pernas estendidas (ou levemente flexionadas). Inspire crescendo a coluna. Ao expirar, flexione o tronco para frente, desenrolando a coluna. Volte devagar inspirando. • Repita 3–5 vezes. • Objetivo: soltar toda a cadeia posterior e reduzir a rigidez da lombar.",equipamento:"Alongamentos completos (escolha 3 a 5)",energia:"alta",contexto:"casa",categoria:"alongamento"},
    {id:"d4_2",nome:"2. Alongamento Lateral – Sereia",instrucao:"Sente-se com pernas dobradas para um lado. Eleve o braço oposto às pernas. Incline o tronco lateralmente até sentir alongar costelas e cintura. • Respire 15–20 segundos. Repita para o outro lado. • Objetivo: aliviar tensão de tronco, oblíquos e região costal.",equipamento:"Alongamentos completos (escolha 3 a 5)",energia:"alta",contexto:"casa",categoria:"alongamento"},
    {id:"d4_3",nome:"3. Alongamento do Posterior",instrucao:"Deite-se de barriga para cima • Passe a faixa no pé direito • Estenda a perna para cima e puxe suavemente até sentir alongar • Segure 20–25 s • Repita com a outra perna • Objetivo: soltar posteriores e diminuir tensão lombar.",equipamento:"Alongamentos completos (escolha 3 a 5)",energia:"alta",contexto:"casa",categoria:"alongamento"},
    {id:"d4_4",nome:"4. Gato–Vaca",instrucao:"Em quatro apoios, mãos sob ombros. Inspire arqueando lombar (vaca) • Expire arredondando coluna (gato). • Repita 8–10 ciclos lentos. • Objetivo: lubrificar articulações da coluna e aliviar dores de tensão.",equipamento:"Alongamentos completos (escolha 3 a 5)",energia:"alta",contexto:"casa",categoria:"mobilidade"},
    {id:"d4_5",nome:"5. Alongamento de Peitoral na Parede",instrucao:"Apoie a palma da mão na parede, braço estendido • Gire o tronco suavemente para longe da parede • Segure 15–20 s • Troque o lado.",equipamento:"Alongamentos completos (escolha 3 a 5)",energia:"alta",contexto:"casa",categoria:"alongamento"},
    {id:"d4_6",nome:"6. Alongamento de Pescoço",instrucao:"Incline a cabeça para o lado, aproximando a orelha do ombro • Respire 10–15 s • Troque o lado • Depois, leve o queixo ao peito por 10–15 s • Objetivo: aliviar dor cervical, muito comum em dias de fadiga.",equipamento:"Alongamentos completos (escolha 3 a 5)",energia:"alta",contexto:"casa",categoria:"alongamento"},
    {id:"d4_7",nome:"1. Pernas apoiadas na bola",instrucao:"Deite-se de barriga para cima • Apoie as panturrilhas sobre a bola • Braços ao lado do corpo, respiração profunda • Benefício: relaxa a lombar e reduz pressão nas pernas.",equipamento:"Relaxamento com bola (escolha 1 opção)",energia:"alta",contexto:"casa",categoria:"alongamento"},
    {id:"d4_8",nome:"2. Costas apoiadas sobre a bola",instrucao:"Sente-se na bola • Caminhe com os pés para frente até que a parte média das costas esteja apoiada • Abra os braços para os lados, relaxe a cabeça • Respire lentamente • Benefício: alonga peitoral, solta ombros e relaxa toda a coluna anterior.",equipamento:"Relaxamento com bola (escolha 1 opção)",energia:"alta",contexto:"casa",categoria:"alongamento"},
    // Casa / baixa
    {id:"d4_9",nome:"Respiração",instrucao:"Sente-se ou deite-se confortavelmente. Inspire pelo nariz, expandindo abdômen e costelas. Expire pela boca lentamente, soltando ombros e pescoço. • Repita em ritmo suave • Benefícios: reduz cortisol, diminui tensão muscular e prepara o corpo para alongar.",equipamento:"Sem equipamento",energia:"baixa",contexto:"casa",categoria:"respiracao"},
    {id:"d4_10",nome:"1. Alongamento da Coluna",instrucao:"Sente-se com pernas estendidas (ou levemente flexionadas). Inspire crescendo a coluna. Ao expirar, flexione o tronco para frente, desenrolando a coluna. Volte devagar inspirando. • Repita 3–5 vezes. • Objetivo: soltar toda a cadeia posterior e reduzir a rigidez da lombar.",equipamento:"2 alongamentos suaves à escolha",energia:"baixa",contexto:"casa",categoria:"alongamento"},
    {id:"d4_11",nome:"2. Alongamento Lateral – Sereia",instrucao:"Sente-se com pernas dobradas para um lado. Eleve o braço oposto às pernas. Incline o tronco lateralmente até sentir alongar costelas e cintura. • Respire 15–20 segundos. Repita para o outro lado. • Objetivo: aliviar tensão de tronco, oblíquos e região costal.",equipamento:"2 alongamentos suaves à escolha",energia:"baixa",contexto:"casa",categoria:"alongamento"},
    {id:"d4_12",nome:"3. Alongamento do Posterior",instrucao:"Deite-se de barriga para cima • Passe a faixa no pé direito • Estenda a perna para cima e puxe suavemente até sentir alongar • Segure 20–25 s • Repita com a outra perna • Objetivo: soltar posteriores e diminuir tensão lombar.",equipamento:"2 alongamentos suaves à escolha",energia:"baixa",contexto:"casa",categoria:"alongamento"},
    {id:"d4_13",nome:"4. Gato–Vaca",instrucao:"Em quatro apoios, mãos sob ombros. Inspire arqueando lombar (vaca) • Expire arredondando coluna (gato). • Repita 8–10 ciclos lentos. • Objetivo: lubrificar articulações da coluna e aliviar dores de tensão.",equipamento:"2 alongamentos suaves à escolha",energia:"baixa",contexto:"casa",categoria:"mobilidade"},
    {id:"d4_14",nome:"5. Alongamento de Peitoral na Parede",instrucao:"Apoie a palma da mão na parede, braço estendido • Gire o tronco suavemente para longe da parede • Segure 15–20 s • Troque o lado.",equipamento:"2 alongamentos suaves à escolha",energia:"baixa",contexto:"casa",categoria:"alongamento"},
    {id:"d4_15",nome:"6. Alongamento de Pescoço",instrucao:"Incline a cabeça para o lado, aproximando a orelha do ombro • Respire 10–15 s • Troque o lado • Depois, leve o queixo ao peito por 10–15 s • Objetivo: aliviar dor cervical, muito comum em dias de fadiga.",equipamento:"2 alongamentos suaves à escolha",energia:"baixa",contexto:"casa",categoria:"alongamento"},
    // Viagem
    {id:"d4_viagem_resp",nome:"Respiração na cama",instrucao:"Deitada, respiração diafragmática por 3–5 min.",equipamento:"Sem equipamento",energia:"baixa",contexto:"viagem",categoria:"respiracao"},
    {id:"d4_viagem_along_cama",nome:"Alongamento na cama",instrucao:"Esticar pernas e braços, movimentos suaves.",equipamento:"Sem equipamento",energia:"baixa",contexto:"viagem",categoria:"mobilidade"},
    {id:"d4_viagem_resp2",nome:"Respiração na cama",instrucao:"Deitada, respiração diafragmática por 3–5 min.",equipamento:"Sem equipamento",energia:"alta",contexto:"viagem",categoria:"respiracao"},
    {id:"d4_viagem_along_cama2",nome:"Alongamento na cama",instrucao:"Esticar pernas e braços, movimentos suaves.",equipamento:"Sem equipamento",energia:"alta",contexto:"viagem",categoria:"mobilidade"}
  ],
  5: [
    // Casa / alta
    {id:"d5_1",nome:"Esteira 10–15 min",instrucao:"Ritmo confortável, sem esforço respiratório • Esforço recomendado: 3/10 • Mantenha passos curtos e postura ereta • Se sentir peso nas pernas, finalize antes. ✔ Versão leve: Caminhar 5 minutos OU Pular a esteira e fazer apenas alongamentos.",equipamento:"Esteira",energia:"alta",contexto:"casa",categoria:"cardio"},
    {id:"d5_2",nome:"Ponte",instrucao:"Deite-se de barriga para cima, joelhos dobrados e pés paralelos no chão. Ative o abdômen levemente (umbigo “para dentro”). Inspire preparando. Ao expirar, eleve o quadril articulando a coluna vértebra por vértebra. Pare quando formar uma linha ombros–joelhos. Segure 1–2 segundos ativando glúteos. Inspire descendo devagar, reconstruindo a coluna no chão • Repita 6–10 vezes • Variação opcional (se estiver com boa energia): Elevar uma perna por vez no topo da ponte. MANTER quadril estável é mais importante que subir alto. Se a lombar incomodar, volte para a ponte simples • Benefícios: ativa glúteos + core e reduz rigidez lombar.",equipamento:"Tapete",energia:"alta",contexto:"casa",categoria:"mobilidade"},
    {id:"d5_3",nome:"1. Abdução de quadril",instrucao:"Mini band acima dos joelhos • Deitada de lado, pernas flexionadas. Ative o abdômen. Inspire. Ao expirar, abra o joelho superior contra a resistência da mini band. Mantenha os pés juntos. Desça devagar • Repita 8–12 vezes cada lado • Se fizer em pé: Mantenha-se apoiada na parede. Afaste a perna lateralmente devagar.",equipamento:"Mini Band (escolha 1 ou 2)",energia:"alta",contexto:"casa",categoria:"forca"},
    {id:"d5_4",nome:"2. Marcha no lugar",instrucao:"Mini band nos tornozelos • Fique em pé com joelhos levemente flexionados. Puxe o abdômen para dentro. Eleve o pé direito 10 cm do chão e volte. Eleve o pé esquerdo • Faça 10–20 marchas alternadas • Objetivo: ativar glúteos e estabilizar quadris sem impacto.",equipamento:"Mini Band (escolha 1 ou 2)",energia:"alta",contexto:"casa",categoria:"forca"},
    {id:"d5_5",nome:"3. Caminhada lateral",instrucao:"Mini band acima dos joelhos OU tornozelos • Flexione levemente os joelhos (semi-agachamento). Dê um passo curto para a direita, depois junte o outro pé. Ande 6–8 passos para a direita, depois para a esquerda • Faça somente se estiver com energia média/alta.",equipamento:"Mini Band (escolha 1 ou 2)",energia:"alta",contexto:"casa",categoria:"forca"},
    // Casa / baixa
    {id:"d5_6",nome:"Respiração",instrucao:"Sente-se ou deite-se confortavelmente. Inspire pelo nariz, expandindo abdômen e costelas. Expire pela boca lentamente, soltando ombros e pescoço. • Repita em ritmo suave • Benefícios: reduz cortisol, diminui tensão muscular e prepara o corpo para alongar.",equipamento:"Sem equipamento",energia:"baixa",contexto:"casa",categoria:"respiracao"},
    {id:"d5_7",nome:"Ponte Simples",instrucao:"Deite-se de barriga para cima, joelhos dobrados e pés paralelos no chão. Ative o abdômen levemente (umbigo “para dentro”). Inspire preparando. Ao expirar, eleve o quadril articulando a coluna vértebra por vértebra. Pare quando formar uma linha ombros–joelhos. Segure 1–2 segundos ativando glúteos. Inspire descendo devagar, reconstruindo a coluna no chão • Repita 6–10 vezes • Benefícios: ativa glúteos + core e reduz rigidez lombar.",equipamento:"Tapete",energia:"baixa",contexto:"casa",categoria:"mobilidade"},
    {id:"d5_8",nome:"Alongamento Posterior com faixa",instrucao:"Deite-se de barriga para cima • Passe a faixa no pé direito • Estenda a perna para cima e puxe suavemente até sentir alongar • Segure 20–25 s • Repita com a outra perna • Objetivo: soltar posteriores e diminuir tensão lombar.",equipamento:"Alongamento leve (posterior ou coluna)",energia:"baixa",contexto:"casa",categoria:"alongamento"},
    {id:"d5_9",nome:"Alongamento de Coluna",instrucao:"Sente-se com pernas estendidas (ou levemente flexionadas). Inspire crescendo a coluna. Ao expirar, flexione o tronco para frente, desenrolando a coluna. Volte devagar inspirando. • Repita 3–5 vezes. • Objetivo: soltar toda a cadeia posterior e reduzir a rigidez da lombar.",equipamento:"Alongamento leve (posterior ou coluna)",energia:"baixa",contexto:"casa",categoria:"alongamento"},
    // Viagem
    {id:"d5_viagem_resp",nome:"Respiração na cama",instrucao:"Deitada, respiração diafragmática por 3–5 min.",equipamento:"Sem equipamento",energia:"baixa",contexto:"viagem",categoria:"respiracao"},
    {id:"d5_viagem_along_cama",nome:"Alongamento na cama",instrucao:"Esticar pernas e braços, movimentos suaves.",equipamento:"Sem equipamento",energia:"baixa",contexto:"viagem",categoria:"mobilidade"},
    {id:"d5_viagem_resp2",nome:"Respiração na cama",instrucao:"Deitada, respiração diafragmática por 3–5 min.",equipamento:"Sem equipamento",energia:"alta",contexto:"viagem",categoria:"respiracao"},
    {id:"d5_viagem_along_cama2",nome:"Alongamento na cama",instrucao:"Esticar pernas e braços, movimentos suaves.",equipamento:"Sem equipamento",energia:"alta",contexto:"viagem",categoria:"mobilidade"}
  ],
  6: [
    // Casa / alta
    {id:"d6_1",nome:"Esteira leve 5–10 min",instrucao:"Caminhada leve, ritmo calmo • Esforço máximo recomendado: 2–3/10 • Respiração tranquila.",equipamento:"Esteira",energia:"alta",contexto:"casa",categoria:"cardio"},
    {id:"d6_2",nome:"Remada",instrucao:"Sente-se com pernas estendidas OU flexionadas (como for mais confortável) • Passe a faixa nos pés e segure as pontas • Coluna ereta, ombros abaixados • Inspire • Ao expirar, puxe os cotovelos para trás, aproximando as escápulas • Mantenha os cotovelos próximos ao corpo • Inspire retornando devagar • Repita 8–12 vezes • Erros a evitar: Ombros encolhidos • Tranco na faixa • Curvar as costas • Benefícios: fortalece dorsais, melhora postura e reduz dor entre omoplatas.",equipamento:"Faixa",energia:"alta",contexto:"casa",categoria:"forca"},
    {id:"d6_3",nome:"Elevação lateral leve",instrucao:"Em pé ou sentada, coluna alinhada. Segure um halter em cada mão, braços ao lado do corpo. Inspire. Ao expirar, eleve os braços lateralmente até a altura dos ombros (ou menos, se houver desconforto). Cotovelos levemente flexionados. Inspire descendo devagar • Repita 6–10 vezes • Dicas: Mantenha ombros longe das orelhas. Não force amplitude — pare onde for confortável. Se estiver com dor nos ombros, reduza a carga ou elimine o exercício • Benefícios: fortalece deltoides, melhora estabilidade e ajuda em gestos diários (pegar objetos, arrumar cabelo).",equipamento:"Halteres leves (1–2 kg)",energia:"alta",contexto:"casa",categoria:"forca"},
    {id:"d6_4",nome:"Compressão de aro",instrucao:"Sente-se com coluna ereta • Segure o aro com as mãos na altura do peito • Cotovelos suavemente flexionados • Inspire • Ao expirar, pressione o aro com intensidade leve a moderada • Segure 1–2 segundos • Inspire relaxando devagar • Repita 8–10 vezes • Erros a evitar: Força excessiva (tremor) • Empurrar a cabeça para frente • Ombros elevados • Benefícios: ativa peitoral, tríceps e estabilizadores dos ombros sem impacto.",equipamento:"Aro",energia:"alta",contexto:"casa",categoria:"forca"},
    // Casa / baixa
    {id:"d6_5",nome:"Alongamento de Pescoço",instrucao:"Incline a cabeça para a direita, relaxando o ombro esquerdo • Respire por 15–20 s • Troque o lado • Em seguida, leve o queixo ao peito por 15 s • Objetivo: reduzir tensão cervical — muito comum em quem tem fibromialgia.",equipamento:"Alongamento de pescoço ou peitoral",energia:"baixa",contexto:"casa",categoria:"alongamento"},
    {id:"d6_6",nome:"Alongamento de Peitoral",instrucao:"Fique ao lado de uma parede • Apoie a mão direita na parede, braço estendido na altura do ombro • Gire suavemente o tronco para a esquerda até sentir alongar • Segure 15–20 s • Troque o lado • Objetivo: abrir peito, melhorar postura, aliviar ombros.",equipamento:"Alongamento de pescoço ou peitoral",energia:"baixa",contexto:"casa",categoria:"alongamento"},
    {id:"d6_7",nome:"Remada",instrucao:"Sente-se com pernas estendidas OU flexionadas (como for mais confortável) • Passe a faixa nos pés e segure as pontas • Coluna ereta, ombros abaixados • Inspire • Ao expirar, puxe os cotovelos para trás, aproximando as escápulas • Mantenha os cotovelos próximos ao corpo • Inspire retornando devagar • Repita 8–12 vezes • Erros a evitar: Ombros encolhidos • Tranco na faixa • Curvar as costas • Benefícios: fortalece dorsais, melhora postura e reduz dor entre omoplatas.",equipamento:"Alongamento (remada ou aro)",energia:"baixa",contexto:"casa",categoria:"alongamento"},
    {id:"d6_8",nome:"Compressão de Aro",instrucao:"Sente-se com coluna ereta • Segure o aro com as mãos na altura do peito • Cotovelos suavemente flexionados • Inspire • Ao expirar, pressione o aro com intensidade leve a moderada • Segure 1–2 segundos • Inspire relaxando devagar • Repita 8–10 vezes • Erros a evitar: Força excessiva (tremor) • Empurrar a cabeça para frente • Ombros elevados • Benefícios: ativa peitoral, tríceps e estabilizadores dos ombros sem impacto.",equipamento:"Alongamento (remada ou aro)",energia:"baixa",contexto:"casa",categoria:"alongamento"},
    // Viagem
    {id:"d6_viagem_resp",nome:"Respiração na cama",instrucao:"Deitada, respiração diafragmática por 3–5 min.",equipamento:"Sem equipamento",energia:"baixa",contexto:"viagem",categoria:"respiracao"},
    {id:"d6_viagem_along_cama",nome:"Alongamento na cama",instrucao:"Esticar pernas e braços, movimentos suaves.",equipamento:"Sem equipamento",energia:"baixa",contexto:"viagem",categoria:"mobilidade"},
    {id:"d6_viagem_resp2",nome:"Respiração na cama",instrucao:"Deitada, respiração diafragmática por 3–5 min.",equipamento:"Sem equipamento",energia:"alta",contexto:"viagem",categoria:"respiracao"},
    {id:"d6_viagem_along_cama2",nome:"Alongamento na cama",instrucao:"Esticar pernas e braços, movimentos suaves.",equipamento:"Sem equipamento",energia:"alta",contexto:"viagem",categoria:"mobilidade"}
  ],
  7: [
    // Casa / alta
    {id:"d7_1",nome:"1. Alongamento da Coluna",instrucao:"Sente-se com pernas estendidas • Inspire crescendo a coluna • Ao expirar, flexione o tronco para frente desenrolando a coluna • Volte devagar inspirando • Repita 3–5 vezes • Objetivo: soltar coluna, lombar e cadeia posterior.",equipamento:"Sessão de alongamentos (escolha 4 a 6)",energia:"alta",contexto:"casa",categoria:"alongamento"},
    {id:"d7_2",nome:"2. Alongamento Lateral",instrucao:"Sente-se com pernas dobradas para um lado • Eleve o braço oposto • Incline o tronco suavemente para o lado das pernas • Respire 15–20 s • Troque o lado • Objetivo: aliviar tensão de tronco, cintura e região intercostal.",equipamento:"Sessão de alongamentos (escolha 4 a 6)",energia:"alta",contexto:"casa",categoria:"alongamento"},
    {id:"d7_3",nome:"3. Alongamento do Posterior com Faixa",instrucao:"(Opcional — você pode fazer sem faixa também) • Deite-se de barriga para cima • Passe a faixa no pé direito • Estenda a perna para cima • Puxe suavemente até sentir alongar • Segure 20–25 s • Troque a perna • Objetivo: reduzir rigidez dos posteriores e aliviar lombar.",equipamento:"Sessão de alongamentos (escolha 4 a 6)",energia:"alta",contexto:"casa",categoria:"alongamento"},
    {id:"d7_4",nome:"4. Gato–Vaca",instrucao:"Em quatro apoios • Inspire arqueando lombar (vaca) • Expire arredondando coluna (gato) • Repita 8–10 ciclos bem lentos • Objetivo: liberar coluna, aliviar tensões e melhorar mobilidade diária.",equipamento:"Sessão de alongamentos (escolha 4 a 6)",energia:"alta",contexto:"casa",categoria:"mobilidade"},
    {id:"d7_5",nome:"5. Alongamento de Peitoral",instrucao:"Braço estendido na parede • Gire o tronco suavemente para longe • Segure 15–20 s • Troque o lado • Objetivo: abrir peito, reduzir tensão cervical e dorsal.",equipamento:"Sessão de alongamentos (escolha 4 a 6)",energia:"alta",contexto:"casa",categoria:"alongamento"},
    {id:"d7_6",nome:"6. Alongamento de Pescoço",instrucao:"Incline a cabeça para a direita, segurando 15–20 s • Troque o lado • Em seguida, traga o queixo ao peito por 15 s • Objetivo: aliviar dores cervicais e tensão acumulada.",equipamento:"Sessão de alongamentos (escolha 4 a 6)",energia:"alta",contexto:"casa",categoria:"alongamento"},
    {id:"d7_7",nome:"7. Alongamento de Quadril",instrucao:"Ajoelhe-se e sente nos calcanhares • Estenda braços à frente e deite o tronco entre as coxas • Respire 20–30 s • Volte devagar • Objetivo: alongar lombar, quadris e soltar parte superior do corpo.",equipamento:"Sessão de alongamentos (escolha 4 a 6)",energia:"alta",contexto:"casa",categoria:"alongamento"},
    {id:"d7_8",nome:"1. Rotações de ombros",instrucao:"Em pé ou sentada, coluna ereta, pés apoiados no chão • Braços relaxados ao lado do corpo • Queixo paralelo ao chão, olhar à frente • Inspire pelo nariz • Ao expirar, leve os ombros suavemente para frente → para cima → para trás → para baixo, desenhando um círculo. • Inverta o sentido • 5 a 8 círculos para trás + 5 a 8 para frente • Cuidados: Movimento lento, sem “trancos”.",equipamento:"Mobilidade Leve (Inclua 1 ou 2)",energia:"alta",contexto:"casa",categoria:"mobilidade"},
    {id:"d7_9",nome:"2. Círculos de quadril",instrucao:"Em pé, pés afastados na largura do quadril • Joelhos levemente destravados (não deixe totalmente esticados) • Mãos apoiadas na cintura ou em uma cadeira/mesa à frente, se precisar de apoio • Leve o quadril devagar: para a direita → para frente → para a esquerda → para trás, fechando o círculo • Mantenha o tronco relativamente estável, sem jogar o peso para os joelhos • mude o sentido • 5 a 8 círculos em um sentido + 5 a 8 no outro.",equipamento:"Mobilidade Leve (Inclua 1 ou 2)",energia:"alta",contexto:"casa",categoria:"mobilidade"},
    {id:"d7_10",nome:"3. Mobilidade de tornozelos",instrucao:"✔ Opção 1: Sentada na cadeira, coluna ereta • Pés apoiados no chão • Eleve a ponta dos pés, mantendo os calcanhares no chão • Volte a apoiar o pé todo • Depois, eleve os calcanhares, deixando a ponta dos pés no chão • Alterne “ponta sobe / calcanhar sobe” como se estivesse simulando uma marcha parada. ✔ Opção 2: Estenda uma perna à frente (pode manter o calcanhar apoiado no chão ou suspenso, conforme conforto) • Desenhe círculos com a ponta do pé: devagar, em um sentido e depois no outro • Repita com a outra perna • 10 a 15 repetições.",equipamento:"Mobilidade Leve (Inclua 1 ou 2)",energia:"alta",contexto:"casa",categoria:"mobilidade"},
    {id:"d7_11",nome:"4. Torção suave da coluna sentado",instrucao:"Sentada na cadeira, coluna ereta, pés bem apoiados no chão • Mantenha o peso distribuído igualmente nos dois lados do quadril. • Inspire crescendo a coluna (como se quisesse “alongar” o topo da cabeça para o teto) • Ao expirar, gire suavemente o tronco para a direita • Leve a mão esquerda em direção à coxa direita ou à lateral da cadeira • A mão direita pode apoiar no encosto ou na lateral da cadeira, sem “puxar” com força • Mantenha os ombros relaxados, longe das orelhas • Segure a posição por 3 a 5 respirações suaves • Volte devagar ao centro ao inspirar • Repita para o outro lado • 1 a 2 repetições para cada lado • Sustentar 20 a 30 segundos (ou 3 a 5 respirações) em cada lado, conforme tolerância • Objetivo: “lubrificar” articulações sem esforço.",equipamento:"Mobilidade Leve (Inclua 1 ou 2)",energia:"alta",contexto:"casa",categoria:"mobilidade"},
    {id:"d7_12",nome:"Relaxamento Final (opcional)",instrucao:"Deite-se e apoie as pernas na bola OU Deite as costas sobre a bola com apoio dos pés • Respire profundamente 1–2 minutos.",equipamento:"Bola",energia:"alta",contexto:"casa",categoria:"recuperacao"},
    // Casa / baixa
    {id:"d7_13",nome:"Respiração suave",instrucao:"Sente-se ou deite-se em posição confortável • Inspire pelo nariz por 3–4 segundos • Expire pela boca devagar por 4–6 segundos • Deixe ombros, mandíbula e pescoço relaxarem • Continue até perceber o corpo “desligando” • Benefícios: regula o sistema nervoso, reduz dor e rigidez típica da fibromialgia.",equipamento:"Sem equipamento",energia:"baixa",contexto:"casa",categoria:"respiracao"},
    {id:"d7_14",nome:"1. Alongamento da Coluna",instrucao:"Sente-se com pernas estendidas • Inspire crescendo a coluna • Ao expirar, flexione o tronco para frente desenrolando a coluna • Volte devagar inspirando • Repita 3–5 vezes • Objetivo: soltar coluna, lombar e cadeia posterior.",equipamento:"1 alongamento confortável (à escolha)",energia:"baixa",contexto:"casa",categoria:"alongamento"},
    {id:"d7_15",nome:"2. Alongamento Lateral",instrucao:"Sente-se com pernas dobradas para um lado • Eleve o braço oposto • Incline o tronco suavemente para o lado das pernas • Respire 15–20 s • Troque o lado • Objetivo: aliviar tensão de tronco, cintura e região intercostal.",equipamento:"1 alongamento confortável (à escolha)",energia:"baixa",contexto:"casa",categoria:"alongamento"},
    {id:"d7_16",nome:"3. Alongamento do Posterior com Faixa",instrucao:"(Opcional — você pode fazer sem faixa também) • Deite-se de barriga para cima • Passe a faixa no pé direito • Estenda a perna para cima • Puxe suavemente até sentir alongar • Segure 20–25 s • Troque a perna • Objetivo: reduzir rigidez dos posteriores e aliviar lombar.",equipamento:"1 alongamento confortável (à escolha)",energia:"baixa",contexto:"casa",categoria:"alongamento"},
    {id:"d7_17",nome:"4. Gato–Vaca",instrucao:"Em quatro apoios • Inspire arqueando lombar (vaca) • Expire arredondando coluna (gato) • Repita 8–10 ciclos bem lentos • Objetivo: liberar coluna, aliviar tensões e melhorar mobilidade diária.",equipamento:"1 alongamento confortável (à escolha)",energia:"baixa",contexto:"casa",categoria:"alongamento"},
    {id:"d7_18",nome:"5. Alongamento de Peitoral",instrucao:"Braço estendido na parede • Gire o tronco suavemente para longe • Segure 15–20 s • Troque o lado • Objetivo: abrir peito, reduzir tensão cervical e dorsal.",equipamento:"1 alongamento confortável (à escolha)",energia:"baixa",contexto:"casa",categoria:"alongamento"},
    {id:"d7_19",nome:"6. Alongamento de Pescoço",instrucao:"Incline a cabeça para a direita, segurando 15–20 s • Troque o lado • Em seguida, traga o queixo ao peito por 15 s • Objetivo: aliviar dores cervicais e tensão acumulada.",equipamento:"1 alongamento confortável (à escolha)",energia:"baixa",contexto:"casa",categoria:"alongamento"},
    {id:"d7_20",nome:"7. Alongamento de Quadril",instrucao:"Ajoelhe-se e sente nos calcanhares • Estenda braços à frente e deite o tronco entre as coxas • Respire 20–30 s • Volte devagar • Objetivo: alongar lombar, quadris e soltar parte superior do corpo.",equipamento:"1 alongamento confortável (à escolha)",energia:"baixa",contexto:"casa",categoria:"alongamento"},
    // Viagem
    {id:"d7_viagem_resp",nome:"Respiração na cama",instrucao:"Deitada, respiração diafragmática por 3–5 min.",equipamento:"Sem equipamento",energia:"baixa",contexto:"viagem",categoria:"respiracao"},
    {id:"d7_viagem_along_cama",nome:"Alongamento na cama",instrucao:"Esticar pernas e braços, movimentos suaves.",equipamento:"Sem equipamento",energia:"baixa",contexto:"viagem",categoria:"mobilidade"},
    {id:"d7_viagem_resp2",nome:"Respiração na cama",instrucao:"Deitada, respiração diafragmática por 3–5 min.",equipamento:"Sem equipamento",energia:"alta",contexto:"viagem",categoria:"respiracao"},
    {id:"d7_viagem_along_cama2",nome:"Alongamento na cama",instrucao:"Esticar pernas e braços, movimentos suaves.",equipamento:"Sem equipamento",energia:"alta",contexto:"viagem",categoria:"mobilidade"}
  ],
  8: [
    // Casa / alta
    {id:"d8_1",nome:"Esteira 10–15 min",instrucao:"Ritmo confortável, sem esforço respiratório • Coluna ereta, olhar à frente • Esforço recomendado: 3–4/10 • Se cansar, reduza velocidade ✔ Versão leve: Caminhar 5 minutos OU eliminar e fazer apenas alongamento final.",equipamento:"Esteira",energia:"alta",contexto:"casa",categoria:"cardio"},
    {id:"d8_2",nome:"Step-up",instrucao:"Apoie o pé direito inteiro no step • Pressione o calcanhar para elevar o corpo, subindo totalmente • Junte o pé esquerdo no step • Desça devagar com o pé direito, depois o esquerdo • Repita 8 vezes cada perna iniciando alternadamente • Use a parede ou cadeira ao lado para segurança. • Dicas importantes: Mantenha coluna ereta • Não deixe o joelho entrar para dentro • Evite subir rápido — movimento deve ser suave • Benefícios: força de pernas, equilíbrio e funcionalidade (escadas, inclinações).",equipamento:"Step",energia:"alta",contexto:"casa",categoria:"equilibrio"},
    {id:"d8_3",nome:"Ponte",instrucao:"Deite-se de barriga para cima com joelhos dobrados • Ative o abdômen suavemente • Inspire • Ao expirar, eleve o quadril articulando a coluna • Segure 1–2 segundos no topo • Desça devagar desenrolando vértebra por vértebra • Repita 8–12 vezes. ✔ Variação para energia mais alta: Faça ponte com elevação de calcanhares • Ou mantenha a ponte por 5 segundos ativando glúteos. ✔ Para energia baixa: Faça uma ponte mais baixa • Aumente a ênfase no alongamento, não na força. • Benefícios: ativa glúteos, solta lombar, melhora estabilidade pélvica.",equipamento:"Tapete",energia:"alta",contexto:"casa",categoria:"forca"},
    {id:"d8_4",nome:"Agachamento com bola",instrucao:"Coloque a bola entre a lombar e a parede • Pés afastados à frente do corpo (30–40 cm) • Inspire • Ao expirar, desça deslizando pela bola até um ângulo confortável • Pare entre 45° e 60° — sem forçar • Inspire subindo devagar mantendo controle • Repita 6–10 vezes. • Dicas: Peso no calcanhar • Joelhos alinhados à ponta dos pés • Coluna neutra, sem arquear. • Benefícios: fortalece quadríceps sem impacto e com suporte.",equipamento:"Bola",energia:"alta",contexto:"casa",categoria:"forca"},
    // Casa / baixa
    {id:"d8_5",nome:"Esteira (5 min OU só alongar)",instrucao:"Caminhar 5 minutos OU eliminar e fazer apenas alongamento final.",equipamento:"Esteira",energia:"baixa",contexto:"casa",categoria:"cardio"},
    {id:"d8_6",nome:"Respiração e Mobilidade",instrucao:"Inspire profundamente expandindo as costelas • Expire devagar relaxando ombros • Faça círculos de ombros (10x) • Pescoço: inclinações leves e giros suaves • Tornozelos: círculos para ativar circulação.",equipamento:"Sem equipamento",energia:"baixa",contexto:"casa",categoria:"respiracao"},
    {id:"d8_7",nome:"Ponte Simples",instrucao:"Faça uma ponte mais baixa • Aumente a ênfase no alongamento, não na força. • Benefícios: ativa glúteos, solta lombar, melhora estabilidade pélvica.",equipamento:"Tapete",energia:"baixa",contexto:"casa",categoria:"alongamento"},
    {id:"d8_8",nome:"Alongamento posterior com faixa",instrucao:"(Opcional — você pode fazer sem faixa também) • Deite-se de barriga para cima • Passe a faixa no pé direito • Estenda a perna para cima • Puxe suavemente até sentir alongar • Segure 20–25 s • Troque a perna • Objetivo: reduzir rigidez dos posteriores e aliviar lombar.",equipamento:"Alongamento final (opcional)",energia:"baixa",contexto:"casa",categoria:"alongamento"},
    {id:"d8_9",nome:"Torção sentada",instrucao:"Sentada na cadeira, coluna ereta, pés bem apoiados no chão • Mantenha o peso distribuído igualmente nos dois lados do quadril. • Inspire crescendo a coluna (como se quisesse “alongar” o topo da cabeça para o teto) • Ao expirar, gire suavemente o tronco para a direita • Leve a mão esquerda em direção à coxa direita ou à lateral da cadeira • A mão direita pode apoiar no encosto ou na lateral da cadeira, sem “puxar” com força • Mantenha os ombros relaxados, longe das orelhas • Segure a posição por 3 a 5 respirações suaves • Volte devagar ao centro ao inspirar • Repita para o outro lado • 1 a 2 repetições para cada lado • Sustentar 20 a 30 segundos (ou 3 a 5 respirações) em cada lado, conforme tolerância • Objetivo: “lubrificar” articulações sem esforço.",equipamento:"Alongamento final (opcional)",energia:"baixa",contexto:"casa",categoria:"alongamento"},
    {id:"d8_10",nome:"Alongamento Lateral",instrucao:"Sente-se com pernas dobradas para um lado • Eleve o braço oposto • Incline o tronco suavemente para o lado das pernas • Respire 15–20 s • Troque o lado • Objetivo: aliviar tensão de tronco, cintura e região intercostal.",equipamento:"Alongamento final (opcional)",energia:"baixa",contexto:"casa",categoria:"alongamento"},
    // Viagem
    {id:"d8_viagem_resp",nome:"Respiração na cama",instrucao:"Deitada, respiração diafragmática por 3–5 min.",equipamento:"Sem equipamento",energia:"baixa",contexto:"viagem",categoria:"respiracao"},
    {id:"d8_viagem_along_cama",nome:"Alongamento na cama",instrucao:"Esticar pernas e braços, movimentos suaves.",equipamento:"Sem equipamento",energia:"baixa",contexto:"viagem",categoria:"mobilidade"},
    {id:"d8_viagem_resp2",nome:"Respiração na cama",instrucao:"Deitada, respiração diafragmática por 3–5 min.",equipamento:"Sem equipamento",energia:"alta",contexto:"viagem",categoria:"respiracao"},
    {id:"d8_viagem_along_cama2",nome:"Alongamento na cama",instrucao:"Esticar pernas e braços, movimentos suaves.",equipamento:"Sem equipamento",energia:"alta",contexto:"viagem",categoria:"mobilidade"}
  ],
  9: [
    // Casa / alta
    {id:"d9_1",nome:"Alongamento da Coluna",instrucao:"Sente-se com pernas estendidas • Inspire crescendo a coluna • Ao expirar, flexione o tronco para frente desenrolando a coluna • Volte devagar inspirando • Repita 3–5 vezes • Objetivo: soltar coluna, lombar e cadeia posterior.",equipamento:"Tapete",energia:"alta",contexto:"casa",categoria:"alongamento"},
    {id:"d9_2",nome:"Alongamento Lateral",instrucao:"Sente-se com pernas dobradas para um lado • Eleve o braço oposto • Incline o tronco suavemente para o lado das pernas • Respire 15–20 s • Troque o lado • Objetivo: aliviar tensão de tronco, cintura e região intercostal.",equipamento:"Tapete",energia:"alta",contexto:"casa",categoria:"alongamento"},
    {id:"d9_3",nome:"Alongamento Posterior com Faixa",instrucao:"Deite-se de barriga para cima • Passe a faixa no pé direito • Estenda a perna para cima e puxe suavemente até sentir alongar • Segure 20–25 s • Repita com a outra perna • Objetivo: soltar posteriores e diminuir tensão lombar.",equipamento:"Faixa",energia:"alta",contexto:"casa",categoria:"alongamento"},
    {id:"d9_4",nome:"Gato–Vaca",instrucao:"Em quatro apoios • Inspire arqueando lombar (vaca) • Expire arredondando coluna (gato) • Repita 8–10 ciclos bem lentos • Objetivo: liberar coluna, aliviar tensões e melhorar mobilidade diária.",equipamento:"Tapete",energia:"alta",contexto:"casa",categoria:"mobilidade"},
    // Casa / baixa
    {id:"d9_5",nome:"Respiração suave",instrucao:"Sente-se ou deite-se em posição confortável • Inspire pelo nariz por 3–4 segundos • Expire pela boca devagar por 4–6 segundos • Deixe ombros, mandíbula e pescoço relaxarem • Continue até perceber o corpo “desligando” • Benefícios: regula o sistema nervoso, reduz dor e rigidez típica da fibromialgia.",equipamento:"Sem equipamento",energia:"baixa",contexto:"casa",categoria:"respiracao"},
    {id:"d9_6",nome:"Alongamento da Coluna",instrucao:"Sente-se com pernas estendidas • Inspire crescendo a coluna • Ao expirar, flexione o tronco para frente desenrolando a coluna • Volte devagar inspirando • Repita 3–5 vezes • Objetivo: soltar coluna, lombar e cadeia posterior.",equipamento:"2 alongamentos à escolha",energia:"baixa",contexto:"casa",categoria:"alongamento"},
    {id:"d9_7",nome:"Alongamento Lateral",instrucao:"Sente-se com pernas dobradas para um lado • Eleve o braço oposto • Incline o tronco suavemente para o lado das pernas • Respire 15–20 s • Troque o lado • Objetivo: aliviar tensão de tronco, cintura e região intercostal.",equipamento:"2 alongamentos à escolha",energia:"baixa",contexto:"casa",categoria:"alongamento"},
    {id:"d9_8",nome:"Alongamento Posterior com Faixa",instrucao:"Deite-se de barriga para cima • Passe a faixa no pé direito • Estenda a perna para cima e puxe suavemente até sentir alongar • Segure 20–25 s • Repita com a outra perna • Objetivo: soltar posteriores e diminuir tensão lombar.",equipamento:"2 alongamentos à escolha",energia:"baixa",contexto:"casa",categoria:"alongamento"},
    // Viagem
    {id:"d9_viagem_resp",nome:"Respiração na cama",instrucao:"Deitada, respiração diafragmática por 3–5 min.",equipamento:"Sem equipamento",energia:"baixa",contexto:"viagem",categoria:"respiracao"},
    {id:"d9_viagem_along_cama",nome:"Alongamento na cama",instrucao:"Esticar pernas e braços, movimentos suaves.",equipamento:"Sem equipamento",energia:"baixa",contexto:"viagem",categoria:"mobilidade"},
    {id:"d9_viagem_resp2",nome:"Respiração na cama",instrucao:"Deitada, respiração diafragmática por 3–5 min.",equipamento:"Sem equipamento",energia:"alta",contexto:"viagem",categoria:"respiracao"},
    {id:"d9_viagem_along_cama2",nome:"Alongamento na cama",instrucao:"Esticar pernas e braços, movimentos suaves.",equipamento:"Sem equipamento",energia:"alta",contexto:"viagem",categoria:"mobilidade"}
  ],
  10: [
    // Casa / alta
    {id:"d10_1",nome:"Esteira leve",instrucao:"Caminhada leve, ritmo calmo • Esforço máximo recomendado: 2–3/10 • Respiração tranquila.",equipamento:"Esteira",energia:"alta",contexto:"casa",categoria:"cardio"},
    {id:"d10_2",nome:"Remada",instrucao:"Sente-se com pernas estendidas OU flexionadas (como for mais confortável) • Passe a faixa nos pés e segure as pontas • Coluna ereta, ombros abaixados • Inspire • Ao expirar, puxe os cotovelos para trás, aproximando as escápulas • Mantenha os cotovelos próximos ao corpo • Inspire retornando devagar • Repita 8–12 vezes • Erros a evitar: Ombros encolhidos • Tranco na faixa • Curvar as costas • Benefícios: fortalece dorsais, melhora postura e reduz dor entre omoplatas.",equipamento:"Faixa",energia:"alta",contexto:"casa",categoria:"forca"},
    {id:"d10_3",nome:"Bíceps com 1–2 kg",instrucao:"Sente-se ou fique em pé com coluna ereta. Segure um halter em cada mão, braços ao lado do corpo, palmas voltadas para frente. Inspire. Ao expirar, flexione os cotovelos, trazendo os pesos em direção aos ombros sem mover a parte superior dos braços. Inspire descendo lentamente, mantendo controle • Repita 8–10 vezes • Dicas: Cotovelos sempre colados ao tronco. Punhos neutros (não dobre para trás). Movimentos lentos, sem balanço do corpo • Benefícios: ativa bíceps sem sobrecarregar ombros, ajuda em atividades diárias como carregar objetos leves.",equipamento:"Bíceps ou aro",energia:"alta",contexto:"casa",categoria:"forca"},
    {id:"d10_4",nome:"Compressão de Aro",instrucao:"Sente-se com coluna ereta • Segure o aro com as mãos na altura do peito • Cotovelos suavemente flexionados • Inspire • Ao expirar, pressione o aro com intensidade leve a moderada • Segure 1–2 segundos • Inspire relaxando devagar • Repita 8–10 vezes • Erros a evitar: Força excessiva (tremor) • Empurrar a cabeça para frente • Ombros elevados • Benefícios: ativa peitoral, tríceps e estabilizadores dos ombros sem impacto.",equipamento:"Bíceps ou aro",energia:"alta",contexto:"casa",categoria:"forca"},
    {id:"d10_5",nome:"Equilíbrio no disco",instrucao:"Coloque o disco no chão próximo a uma parede, mesa ou cadeira firme. Suba no disco com um pé de cada vez, mantendo joelhos levemente flexionados. Segure no apoio até sentir segurança. Quando estiver estável, solte o apoio somente se se sentir confiante. Mantendo abdômen levemente ativado, tente permanecer estável por 20–30 segundos. Desça devagar segurando no apoio • Variação mais leve: Fique apenas com um pé no disco e outro no chão. Ou sente-se sobre o disco para ativar o core de forma mais suave • Benefícios: melhora equilíbrio, propriocepção e estabilidade das articulações.",equipamento:"Disco de Equilíbrio",energia:"alta",contexto:"casa",categoria:"equilibrio"},
    // Casa / baixa
    {id:"d10_6",nome:"Esteira 3–5 min (opcional)",instrucao:"Caminhe 3 minutos OU elimine a esteira.",equipamento:"Esteira",energia:"baixa",contexto:"casa",categoria:"cardio"},
    {id:"d10_7",nome:"Remada",instrucao:"Sente-se com pernas estendidas OU flexionadas (como for mais confortável) • Passe a faixa nos pés e segure as pontas • Coluna ereta, ombros abaixados • Inspire • Ao expirar, puxe os cotovelos para trás, aproximando as escápulas • Mantenha os cotovelos próximos ao corpo • Inspire retornando devagar • Repita 8–12 vezes • Erros a evitar: Ombros encolhidos • Tranco na faixa • Curvar as costas • Benefícios: fortalece dorsais, melhora postura e reduz dor entre omoplatas.",equipamento:"Faixa",energia:"baixa",contexto:"casa",categoria:"forca"},
    {id:"d10_8",nome:"Compressão de aro",instrucao:"Sente-se com coluna ereta • Segure o aro com as mãos na altura do peito • Cotovelos suavemente flexionados • Inspire • Ao expirar, pressione o aro com intensidade leve a moderada • Segure 1–2 segundos • Inspire relaxando devagar • Repita 8–10 vezes • Erros a evitar: Força excessiva (tremor) • Empurrar a cabeça para frente • Ombros elevados • Benefícios: ativa peitoral, tríceps e estabilizadores dos ombros sem impacto.",equipamento:"Aro",energia:"baixa",contexto:"casa",categoria:"alongamento"},
    // Viagem
    {id:"d10_viagem_resp",nome:"Respiração na cama",instrucao:"Deitada, respiração diafragmática por 3–5 min.",equipamento:"Sem equipamento",energia:"baixa",contexto:"viagem",categoria:"respiracao"},
    {id:"d10_viagem_along_cama",nome:"Alongamento na cama",instrucao:"Esticar pernas e braços, movimentos suaves.",equipamento:"Sem equipamento",energia:"baixa",contexto:"viagem",categoria:"mobilidade"},
    {id:"d10_viagem_resp2",nome:"Respiração na cama",instrucao:"Deitada, respiração diafragmática por 3–5 min.",equipamento:"Sem equipamento",energia:"alta",contexto:"viagem",categoria:"respiracao"},
    {id:"d10_viagem_along_cama2",nome:"Alongamento na cama",instrucao:"Esticar pernas e braços, movimentos suaves.",equipamento:"Sem equipamento",energia:"alta",contexto:"viagem",categoria:"mobilidade"}
  ],
  11: [
    // Casa / alta
    {id:"d11_1",nome:"Alongamento da Coluna",instrucao:"Sente-se com pernas estendidas • Inspire crescendo a coluna • Ao expirar, flexione o tronco para frente desenrolando a coluna • Volte devagar inspirando • Repita 3–5 vezes • Objetivo: soltar coluna, lombar e cadeia posterior.",equipamento:"Sessão de alongamentos (4 a 6)",energia:"alta",contexto:"casa",categoria:"alongamento"},
    {id:"d11_2",nome:"Alongamento Lateral",instrucao:"Sente-se com pernas dobradas para um lado • Eleve o braço oposto • Incline o tronco suavemente para o lado das pernas • Respire 15–20 s • Troque o lado • Objetivo: aliviar tensão de tronco, cintura e região intercostal.",equipamento:"Sessão de alongamentos (4 a 6)",energia:"alta",contexto:"casa",categoria:"alongamento"},
    {id:"d11_3",nome:"Alongamento Posterior com Faixa",instrucao:"Deite-se de barriga para cima • Passe a faixa no pé direito • Estenda a perna para cima e puxe suavemente até sentir alongar • Segure 20–25 s • Repita com a outra perna • Objetivo: soltar posteriores e diminuir tensão lombar.",equipamento:"Sessão de alongamentos (4 a 6)",energia:"alta",contexto:"casa",categoria:"alongamento"},
    {id:"d11_4",nome:"Gato–Vaca",instrucao:"Em quatro apoios • Inspire arqueando lombar (vaca) • Expire arredondando coluna (gato) • Repita 8–10 ciclos bem lentos • Objetivo: liberar coluna, aliviar tensões e melhorar mobilidade diária.",equipamento:"Sessão de alongamentos (4 a 6)",energia:"alta",contexto:"casa",categoria:"mobilidade"},
    {id:"d11_5",nome:"Alongamento de Pescoço",instrucao:"Incline a cabeça para a direita, segurando 15–20 s • Troque o lado • Em seguida, traga o queixo ao peito por 15 s • Objetivo: aliviar dores cervicais e tensão acumulada.",equipamento:"Sessão de alongamentos (4 a 6)",energia:"alta",contexto:"casa",categoria:"alongamento"},
    {id:"d11_6",nome:"Alongamento de Peitoral na Parede",instrucao:"Braço estendido na parede • Gire o tronco suavemente para longe • Segure 15–20 s • Troque o lado • Objetivo: abrir peito, reduzir tensão cervical e dorsal.",equipamento:"Sessão de alongamentos (4 a 6)",energia:"alta",contexto:"casa",categoria:"alongamento"},
    {id:"d11_7",nome:"Criança",instrucao:"Ajoelhe-se e sente-se sobre os calcanhares • Alongue os braços à frente e deite o tronco entre as coxas • Respire profundamente 20–30 s • Alivia: lombar, quadris e parte superior das costas.",equipamento:"Sessão de alongamentos (4 a 6)",energia:"alta",contexto:"casa",categoria:"alongamento"},
    // Casa / baixa
    {id:"d11_8",nome:"Respiração",instrucao:"Inspire pelo nariz por 3–4 segundos • Expire pela boca por 5–6 segundos, relaxando ombros e mandíbula • Sinta as costelas expandirem em 3D (frente, lados e costas) • Repita lentamente, deixando o corpo “desarmar”.",equipamento:"Sem equipamento",energia:"baixa",contexto:"casa",categoria:"respiracao"},
    {id:"d11_9",nome:"Rotação espinhal",instrucao:"Deite-se de barriga para cima • Flexione os joelhos e coloque a bola sob as panturrilhas • Gire lentamente os quadris e as pernas para um dos lados, levando os joelhos em direção ao chão • A bola rolará sob as panturrilhas.",equipamento:"Bola",energia:"baixa",contexto:"casa",categoria:"alongamento"},
    // Viagem
    {id:"d11_viagem_resp",nome:"Respiração na cama",instrucao:"Deitada, respiração diafragmática por 3–5 min.",equipamento:"Sem equipamento",energia:"baixa",contexto:"viagem",categoria:"respiracao"},
    {id:"d11_viagem_along_cama",nome:"Alongamento na cama",instrucao:"Esticar pernas e braços, movimentos suaves.",equipamento:"Sem equipamento",energia:"baixa",contexto:"viagem",categoria:"mobilidade"},
    {id:"d11_viagem_resp2",nome:"Respiração na cama",instrucao:"Deitada, respiração diafragmática por 3–5 min.",equipamento:"Sem equipamento",energia:"alta",contexto:"viagem",categoria:"respiracao"},
    {id:"d11_viagem_along_cama2",nome:"Alongamento na cama",instrucao:"Esticar pernas e braços, movimentos suaves.",equipamento:"Sem equipamento",energia:"alta",contexto:"viagem",categoria:"mobilidade"}
  ],
  12: [
    // Casa / alta
    {id:"d12_1",nome:"Esteira 10–15 min",instrucao:"Ritmo confortável, sem esforço respiratório • Coluna ereta, olhar à frente • Esforço recomendado: 3–4/10 • Se cansar, reduza velocidade ✔ Versão leve: Caminhar 5 minutos OU eliminar e fazer apenas alongamento final.",equipamento:"Esteira",energia:"alta",contexto:"casa",categoria:"cardio"},
    {id:"d12_2",nome:"Ponte",instrucao:"Deite-se de barriga para cima com joelhos dobrados • Ative o abdômen suavemente • Inspire • Ao expirar, eleve o quadril articulando a coluna • Segure 1–2 segundos no topo • Desça devagar desenrolando vértebra por vértebra • Repita 8–12 vezes. ✔ Variação para energia mais alta: Faça ponte com elevação de calcanhares • Ou mantenha a ponte por 5 segundos ativando glúteos. ✔ Para energia baixa: Faça uma ponte mais baixa • Aumente a ênfase no alongamento, não na força. • Benefícios: ativa glúteos, solta lombar, melhora estabilidade pélvica.",equipamento:"Tapete",energia:"alta",contexto:"casa",categoria:"forca"},
    {id:"d12_3",nome:"1. Abdução Deitada",instrucao:"Mini band acima dos joelhos • Deite-se de lado • Pernas flexionadas • Inspire • Ao expirar, abra o joelho de cima, mantendo os pés juntos • Desça devagar • Repita 8–12 vezes cada lado • Foco: glúteo médio (estabilizador da pélvis).",equipamento:"Mini band (escolha 1 ou 2)",energia:"alta",contexto:"casa",categoria:"forca"},
    {id:"d12_4",nome:"2. Marcha",instrucao:"Mini band nos tornozelos • Em pé, joelhos levemente flexionados • Eleve um pé 5–10 cm e retorne • Repita alternando as pernas (10–20 repetições) • Foco: equilíbrio + ativação leve do core.",equipamento:"Mini band (escolha 1 ou 2)",energia:"alta",contexto:"casa",categoria:"forca"},
    {id:"d12_5",nome:"3. Caminhada Lateral",instrucao:"Mini band acima dos joelhos ou tornozelos • Flexão suave de joelhos • Dê passos laterais curtos e controlados • 6–8 passos para a direita, depois para a esquerda • ⚠️ Faça apenas se estiver com energia média/boa.",equipamento:"Mini band (escolha 1 ou 2)",energia:"alta",contexto:"casa",categoria:"forca"},
    // Casa / baixa
    {id:"d12_6",nome:"Esteira 3–5 min (opcional)",instrucao:"Caminhe 3 minutos OU elimine a esteira.",equipamento:"Esteira",energia:"baixa",contexto:"casa",categoria:"cardio"},
    {id:"d12_7",nome:"Respiração",instrucao:"Deitada, respiração diafragmática por 3–5 min.",equipamento:"Sem equipamento",energia:"baixa",contexto:"casa",categoria:"respiracao"},
    {id:"d12_8",nome:"Ponte Simples",instrucao:"Faça uma ponte mais baixa • Aumente a ênfase no alongamento, não na força. • Benefícios: ativa glúteos, solta lombar, melhora estabilidade pélvica.",equipamento:"Tapete",energia:"baixa",contexto:"casa",categoria:"mobilidade"},
    {id:"d12_9",nome:"Alongamento posterior com faixa",instrucao:"Deite-se de barriga para cima • Passe a faixa no pé direito • Estenda a perna para cima e puxe suavemente até sentir alongar • Segure 20–25 s • Repita com a outra perna • Objetivo: soltar posteriores e diminuir tensão lombar.",equipamento:"1 Alongamento Final (opcional)",energia:"baixa",contexto:"casa",categoria:"alongamento"},
    {id:"d12_10",nome:"Alongamento Lateral",instrucao:"Sente-se com pernas dobradas para um lado • Eleve o braço oposto • Incline o tronco suavemente para o lado das pernas • Respire 15–20 s • Troque o lado • Objetivo: aliviar tensão de tronco, cintura e região intercostal.",equipamento:"1 Alongamento Final (opcional)",energia:"baixa",contexto:"casa",categoria:"alongamento"},
    {id:"d12_11",nome:"Torção Sentada",instrucao:"Sentada na cadeira, coluna ereta, pés bem apoiados no chão • Mantenha o peso distribuído igualmente nos dois lados do quadril. • Inspire crescendo a coluna (como se quisesse “alongar” o topo da cabeça para o teto) • Ao expirar, gire suavemente o tronco para a direita • Leve a mão esquerda em direção à coxa direita ou à lateral da cadeira • A mão direita pode apoiar no encosto ou na lateral da cadeira, sem “puxar” com força • Mantenha os ombros relaxados, longe das orelhas • Segure a posição por 3 a 5 respirações suaves • Volte devagar ao centro ao inspirar • Repita para o outro lado • 1 a 2 repetições para cada lado • Sustentar 20 a 30 segundos (ou 3 a 5 respirações) em cada lado, conforme tolerância • Objetivo: “lubrificar” articulações sem esforço.",equipamento:"1 Alongamento Final (opcional)",energia:"baixa",contexto:"casa",categoria:"alongamento"},
    // Viagem
    {id:"d12_viagem_resp",nome:"Respiração na cama",instrucao:"Deitada, respiração diafragmática por 3–5 min.",equipamento:"Sem equipamento",energia:"baixa",contexto:"viagem",categoria:"respiracao"},
    {id:"d12_viagem_along_cama",nome:"Alongamento na cama",instrucao:"Esticar pernas e braços, movimentos suaves.",equipamento:"Sem equipamento",energia:"baixa",contexto:"viagem",categoria:"mobilidade"},
    {id:"d12_viagem_resp2",nome:"Respiração na cama",instrucao:"Deitada, respiração diafragmática por 3–5 min.",equipamento:"Sem equipamento",energia:"alta",contexto:"viagem",categoria:"respiracao"},
    {id:"d12_viagem_along_cama2",nome:"Alongamento na cama",instrucao:"Esticar pernas e braços, movimentos suaves.",equipamento:"Sem equipamento",energia:"alta",contexto:"viagem",categoria:"mobilidade"}
  ],
  13: [
    // Casa / alta
    {id:"d13_1",nome:"Remada",instrucao:"Sente-se com pernas estendidas OU flexionadas (como for mais confortável) • Passe a faixa nos pés e segure as pontas • Coluna ereta, ombros abaixados • Inspire • Ao expirar, puxe os cotovelos para trás, aproximando as escápulas • Mantenha os cotovelos próximos ao corpo • Inspire retornando devagar • Repita 8–12 vezes • Erros a evitar: Ombros encolhidos • Tranco na faixa • Curvar as costas • Benefícios: fortalece dorsais, melhora postura e reduz dor entre omoplatas.",equipamento:"Faixa",energia:"alta",contexto:"casa",categoria:"forca"},
    {id:"d13_2",nome:"Compressão de Aro",instrucao:"Sente-se com coluna ereta • Segure o aro com as mãos na altura do peito • Cotovelos suavemente flexionados • Inspire • Ao expirar, pressione o aro com intensidade leve a moderada • Segure 1–2 segundos • Inspire relaxando devagar • Repita 8–10 vezes • Erros a evitar: Força excessiva (tremor) • Empurrar a cabeça para frente • Ombros elevados • Benefícios: ativa peitoral, tríceps e estabilizadores dos ombros sem impacto.",equipamento:"Aro",energia:"alta",contexto:"casa",categoria:"forca"},
    {id:"d13_3",nome:"Equilíbrio no disco",instrucao:"Coloque o disco no chão próximo a uma parede, mesa ou cadeira firme. Suba no disco com um pé de cada vez, mantendo joelhos levemente flexionados. Segure no apoio até sentir segurança. Quando estiver estável, solte o apoio somente se se sentir confiante. Mantendo abdômen levemente ativado, tente permanecer estável por 20–30 segundos. Desça devagar segurando no apoio • Variação mais leve: Fique apenas com um pé no disco e outro no chão. Ou sente-se sobre o disco para ativar o core de forma mais suave • Benefícios: melhora equilíbrio, propriocepção e estabilidade das articulações.",equipamento:"Disco de equilíbrio",energia:"alta",contexto:"casa",categoria:"equilibrio"},
    // Casa / baixa
    {id:"d13_4",nome:"Remada",instrucao:"Sente-se com pernas estendidas OU flexionadas (como for mais confortável) • Passe a faixa nos pés e segure as pontas • Coluna ereta, ombros abaixados • Inspire • Ao expirar, puxe os cotovelos para trás, aproximando as escápulas • Mantenha os cotovelos próximos ao corpo • Inspire retornando devagar • Repita 8–12 vezes • Erros a evitar: Ombros encolhidos • Tranco na faixa • Curvar as costas • Benefícios: fortalece dorsais, melhora postura e reduz dor entre omoplatas.",equipamento:"Alongamento (remada ou aro)",energia:"baixa",contexto:"casa",categoria:"alongamento"},
    {id:"d13_5",nome:"Compressão de Aro",instrucao:"Sente-se com coluna ereta • Segure o aro com as mãos na altura do peito • Cotovelos suavemente flexionados • Inspire • Ao expirar, pressione o aro com intensidade leve a moderada • Segure 1–2 segundos • Inspire relaxando devagar • Repita 8–10 vezes • Erros a evitar: Força excessiva (tremor) • Empurrar a cabeça para frente • Ombros elevados • Benefícios: ativa peitoral, tríceps e estabilizadores dos ombros sem impacto.",equipamento:"Alongamento (remada ou aro)",energia:"baixa",contexto:"casa",categoria:"alongamento"},
    {id:"d13_6",nome:"Respiração e mobilidade",instrucao:"Inspire profundamente expandindo as costelas • Expire devagar relaxando ombros • Faça círculos de ombros (10x) • Pescoço: inclinações leves e giros suaves • Tornozelos: círculos para ativar circulação.",equipamento:"Sem equipamento",energia:"baixa",contexto:"casa",categoria:"respiracao"},
    {id:"d13_7",nome:"Equilíbrio sentado no disco",instrucao:"Coloque o disco no chão próximo a uma parede, mesa ou cadeira firme. Suba no disco com um pé de cada vez, mantendo joelhos levemente flexionados. Segure no apoio até sentir segurança. Quando estiver estável, solte o apoio somente se se sentir confiante. Mantendo abdômen levemente ativado, tente permanecer estável por 20–30 segundos. Desça devagar segurando no apoio • Variação mais leve: Fique apenas com um pé no disco e outro no chão. Ou sente-se sobre o disco para ativar o core de forma mais suave • Benefícios: melhora equilíbrio, propriocepção e estabilidade das articulações.",equipamento:"Disco de equilíbrio (opcional)",energia:"baixa",contexto:"casa",categoria:"equilibrio"},
    // Viagem
    {id:"d13_viagem_resp",nome:"Respiração na cama",instrucao:"Deitada, respiração diafragmática por 3–5 min.",equipamento:"Sem equipamento",energia:"baixa",contexto:"viagem",categoria:"respiracao"},
    {id:"d13_viagem_along_cama",nome:"Alongamento na cama",instrucao:"Esticar pernas e braços, movimentos suaves.",equipamento:"Sem equipamento",energia:"baixa",contexto:"viagem",categoria:"mobilidade"},
    {id:"d13_viagem_resp2",nome:"Respiração na cama",instrucao:"Deitada, respiração diafragmática por 3–5 min.",equipamento:"Sem equipamento",energia:"alta",contexto:"viagem",categoria:"respiracao"},
    {id:"d13_viagem_along_cama2",nome:"Alongamento na cama",instrucao:"Esticar pernas e braços, movimentos suaves.",equipamento:"Sem equipamento",energia:"alta",contexto:"viagem",categoria:"mobilidade"}
  ],
  14: [
    // Casa / alta
    {id:"d14_1",nome:"Caminhada leve 10–20 min",instrucao:"Ritmo confortável, podendo conversar. ✔ Versão leve: Caminhar 3–5 min OU Não caminhar e focar apenas nos alongamentos.",equipamento:"Esteira",energia:"alta",contexto:"casa",categoria:"cardio"},
    {id:"d14_2",nome:"1. Alongamento de Pescoço",instrucao:"Incline a cabeça para a direita, segurando 15–20 s • Troque o lado • Em seguida, traga o queixo ao peito por 15 s • Objetivo: aliviar dores cervicais e tensão acumulada.",equipamento:"Alongamento curto (1 ou 2 exercícios)",energia:"alta",contexto:"casa",categoria:"alongamento"},
    {id:"d14_3",nome:"2. Alongamento Lateral",instrucao:"Sente-se com pernas dobradas para um lado • Eleve o braço oposto • Incline o tronco suavemente para o lado das pernas • Respire 15–20 s • Troque o lado • Objetivo: aliviar tensão de tronco, cintura e região intercostal.",equipamento:"Alongamento curto (1 ou 2 exercícios)",energia:"alta",contexto:"casa",categoria:"alongamento"},
    {id:"d14_4",nome:"3. Alongamento da coluna",instrucao:"Sente-se com pernas estendidas • Inspire crescendo a coluna • Ao expirar, flexione o tronco para frente desenrolando a coluna • Volte devagar inspirando • Repita 3–5 vezes • Objetivo: soltar coluna, lombar e cadeia posterior.",equipamento:"Alongamento curto (1 ou 2 exercícios)",energia:"alta",contexto:"casa",categoria:"alongamento"},
    // Casa / baixa
    {id:"d14_5",nome:"Respiração suave",instrucao:"Sente-se ou deite-se em posição confortável • Inspire pelo nariz por 3–4 segundos • Expire pela boca devagar por 4–6 segundos • Deixe ombros, mandíbula e pescoço relaxarem • Continue até perceber o corpo “desligando” • Benefícios: regula o sistema nervoso, reduz dor e rigidez típica da fibromialgia.",equipamento:"Sem equipamento",energia:"baixa",contexto:"casa",categoria:"respiracao"},
    {id:"d14_6",nome:"1. Pernas elevadas",instrucao:"Deite-se perto de uma parede e apoie as pernas verticalmente • Respire profundamente 1–2 min.",equipamento:"Relaxamento com ou sem bola",energia:"baixa",contexto:"casa",categoria:"recuperacao"},
    {id:"d14_7",nome:"2. Costas apoiadas na bola (opcional)",instrucao:"Deite-se sobre a bola com apoio nos pés • Deixe a cabeça e braços relaxarem • Respire devagar.",equipamento:"Relaxamento com ou sem bola",energia:"baixa",contexto:"casa",categoria:"alongamento"},
    {id:"d14_8",nome:"1. Alongamento de Pescoço",instrucao:"Incline a cabeça para a direita, segurando 15–20 s • Troque o lado • Em seguida, traga o queixo ao peito por 15 s • Objetivo: aliviar dores cervicais e tensão acumulada.",equipamento:"1 Alongamento Final",energia:"baixa",contexto:"casa",categoria:"alongamento"},
    {id:"d14_9",nome:"2. Alongamento da coluna",instrucao:"Sente-se com pernas estendidas • Inspire crescendo a coluna • Ao expirar, flexione o tronco para frente desenrolando a coluna • Volte devagar inspirando • Repita 3–5 vezes • Objetivo: soltar coluna, lombar e cadeia posterior.",equipamento:"1 Alongamento Final",energia:"baixa",contexto:"casa",categoria:"alongamento"},
    // Viagem
    {id:"d14_viagem_resp",nome:"Respiração na cama",instrucao:"Deitada, respiração diafragmática por 3–5 min.",equipamento:"Sem equipamento",energia:"baixa",contexto:"viagem",categoria:"respiracao"},
    {id:"d14_viagem_along_cama",nome:"Alongamento na cama",instrucao:"Esticar pernas e braços, movimentos suaves.",equipamento:"Sem equipamento",energia:"baixa",contexto:"viagem",categoria:"mobilidade"},
    {id:"d14_viagem_resp2",nome:"Respiração na cama",instrucao:"Deitada, respiração diafragmática por 3–5 min.",equipamento:"Sem equipamento",energia:"alta",contexto:"viagem",categoria:"respiracao"},
    {id:"d14_viagem_along_cama2",nome:"Alongamento na cama",instrucao:"Esticar pernas e braços, movimentos suaves.",equipamento:"Sem equipamento",energia:"alta",contexto:"viagem",categoria:"mobilidade"}
  ]
};

// 6. RECEITAS DO CARDÁPIO (108 Receitas Normalizadas e Corrigidas)
const SEED_RECIPES = [
  {
    id:"r1", name:"Escondidinho de carne picada de peru", kind:"salgado", mealType:"principal", protein:"frango",
    ingredients:["1 kg de batatas descascadas e cortadas em pedaços", "2 colheres de sopa de manteiga", "100 ml de leite (ou quanto baste)", "Sal e noz-moscada a gosto", "500 g de carne picada de peru", "1 cebola média, picada", "2 dentes de alho, picados", "1 tomate maduro picado (ou 100 g de polpa de tomate)", "1/2 pimento vermelho, picado (opcional)", "2 colheres de sopa de azeite", "1 colher de chá de colorau ou páprica doce", "Sal e pimenta-do-reino a gosto", "Salsa ou coentros frescos, picados (para finalizar)", "150 g de queijo mozarela ralado"],
    instructions:"1) Cozinhe as batatas em água com sal até ficarem macias (15–20 min). Amasse e misture manteiga, leite, sal e noz-moscada.\n2) Refogue cebola e alho no azeite, doure a carne de peru, junte tomate, pimento, colorau, sal e pimenta por 10 min. Finalize com salsa.\n3) Monte camadas de purê, carne e purê numa travessa, cubra com queijo e leve ao forno a 200 °C por 20 min.",
    favorite:false, photo:"", link:"https://cookpad.com/pt/receitas/24346747"
  },
  {
    id:"r2", name:"Pão de cebola fofinho e super fácil", kind:"salgado", mealType:"lanche", protein:"veg",
    ingredients:["grão de bico cru com pele", "1 folha de louro", "1 dente de alho", "2 ovos", "1 cebola grande picada", "meia xícara de chá óleo", "2 colheres de chá sal", "6 xícaras de chá farinha de trigo", "1 xícara de chá leite morno", "2 tabletes fermento biológico", "1 gema de ovo", "meia xícara de chá café coado", "orégano a gosto"],
    instructions:"Acessar link do vídeo.", favorite:false, photo:"", link:"https://youtu.be/QLuoU5eTu58?si=Ilk4S1vM_g7zCIe6"
  },
  {
    id:"r3", name:"Cuca de banana com farofa fitness", kind:"doce", mealType:"lanche", protein:"veg",
    ingredients:["# Farofa para Cobertura", "50g de Farinha de aveia", "1/4 de xícara de Xilitol", "1 colher (chá) de Canela", "2 colheres (sopa) de Óleo de coco", "# Bolo", "1 Ovo", "1/2 de xícara de Xilitol", "1 colher (sopa) de Óleo de coco", "100g de Farinha de aveia", "60 ml de Leite de coco", "1 colher (chá) de Fermento", "2 bananas cortadas em tiras"],
    instructions:"Acessar link do vídeo.", favorite:false, photo:"", link:"https://youtu.be/DlC4JaxkKjI?si=C0--QIRTlg0UvgC1"
  },
  {
    id:"r4", name:"Bolo de fubá simples com banana (sem glúten/lactose)", kind:"doce", mealType:"lanche", protein:"veg",
    ingredients:["Ver ingredientes no link."], instructions:"Acessar link.", favorite:false, photo:"", link:"https://youtu.be/gKsy_BjD0Vc?si=56Bi2m0BMun44990"
  },
  {
    id:"r5", name:"Bolo de fubá cremoso de liquidificador", kind:"doce", mealType:"lanche", protein:"veg",
    ingredients:["4 ovos", "2 colheres de sopa de manteiga", "4 xícaras de leite (240 ml cada)", "3 xícaras de açúcar", "1 xícara e 1/2 de fubá", "2 colheres de sopa de trigo", "1 colher de sopa de fermento químico", "1 pacotinho de queijo ralado (100 g)"],
    instructions:"Bata no liquidificador e asse em forma retangular (36x26 cm).", favorite:false, photo:"", link:"https://youtu.be/vpT_id4h9Lg?si=f3WvNSk7UBJorqW1"
  },
  {
    id:"r6", name:"Bolo de café com chocolate (sem farinha)", kind:"doce", mealType:"lanche", protein:"ovo",
    ingredients:["Chocolate Amargo 100g", "Manteiga 85g", "Cacau em pó 6g", "Açúcar 100g", "6 ovos", "Sal 1g"],
    instructions:"Asse em forno a 180 °C por 10 a 12 min. Cobertura: Chocolate amargo 130g, Leite 75g, Grão de café 10g, Chantilly 300g, Açúcar 25g.", favorite:false, photo:"", link:"https://youtu.be/XFB1RGqrq1o?si=bv3XJnUrVykby3wy"
  },
  {
    id:"r7", name:"Biscoito de coco vegano e sem glúten", kind:"doce", mealType:"lanche", protein:"veg",
    ingredients:["1/2 xícara de farinha de amêndoas", "1/2 xícara de coco ralado sem açúcar", "1/2 xícara de açúcar demerara", "1 xícara de farinha de arroz", "Água de coco até dar ponto (~1/2 xícara)"],
    instructions:"Misture os secos, adicione água de coco aos poucos até modelar. Corte os biscoitos e asse a 180°C por 25–30 min.", favorite:false, photo:"", link:"https://catracalivre.com.br/gastronomia/biscoito-de-coco-vegano-para-comer-com-aquele-cafezinho/"
  },
  {
    id:"r8", name:"Broa de fubá sem trigo e sem leite", kind:"doce", mealType:"lanche", protein:"ovo",
    ingredients:["1 xícara de fubá", "1 xícara de amido de milho", "1 ovo", "2 colheres de sopa de manteiga derretida", "1/2 xícara de açúcar demerara", "1 colher de chá de fermento em pó", "3 colheres de sopa de leite de coco"],
    instructions:"Misture tudo, modele e asse por 20 minutos a 180 graus.", favorite:false, photo:"", link:"https://youtu.be/30VuwX-67Nk?si=JXAVDeeDTGuVeIYj"
  },
  {
    id:"r9", name:"Bolo de maçã sem glúten (com tâmaras)", kind:"doce", mealType:"lanche", protein:"ovo",
    ingredients:["3 maçãs", "150g de pasta de tâmaras", "200ml de água", "1 colher de sopa de canela", "1 e 1/2 xícara de aveia", "1/2 xícara de fubá de mandioca", "3/4 xícara de óleo de coco", "4 ovos", "1 colher de chá de baunilha", "Suco de 1 laranja"],
    instructions:"Amoleça a tâmara na água com canela e triture. Bata no processador com os demais ingredientes (menos as maçãs). Envolva as maçãs fatiadas e asse a 180°C por ~1h.", favorite:false, photo:"", link:"https://www.nit.pt/fit/este-bolo-de-maca-delicioso-e-sem-gluten-prepara-se-em-10-minutos"
  },
  {
    id:"r10", name:"Bolo cremoso de fubá", kind:"doce", mealType:"lanche", protein:"veg",
    ingredients:["Acessar link."], instructions:"Acessar link.", favorite:false, photo:"", link:"https://youtu.be/FdEBfu9P8MU?si=6q4k1Eh9hqMy8BuQ"
  },
  {
    id:"r11", name:"Bolo Cremoso de Aipim", kind:"doce", mealType:"lanche", protein:"ovo",
    ingredients:["1 kg de aipim cru ralado", "3 ovos", "200 ml de leite de coco", "100 g de coco ralado em flocos", "2 colheres (sopa) de açúcar", "1 copo de requeijão cremoso"],
    instructions:"Bata o aipim no liquidificador com ovos, leite de coco e requeijão. Misture o coco e o açúcar na tigela e asse até dourar.", favorite:false, photo:"", link:"https://comidinhasdochef.com/bolo-cremoso-de-aipim/"
  },
  {
    id:"r12", name:"Bolo de Fubá receita de vó", kind:"doce", mealType:"lanche", protein:"ovo",
    ingredients:["2 ovos", "2 xícaras de fubá", "1 colher (sopa) de fermento", "1 xícara de farinha de trigo", "2 colheres de manteiga", "1/2 xícara de óleo", "2 xícaras de açúcar", "1 xícara de leite", "1 colher (sopa) de erva-doce"],
    instructions:"Misture todos os ingredientes, incorpore a erva-doce por último e asse em forma de furo central por 25 min.", favorite:false, photo:"", link:"https://receitasdepesos.com.br/receitas/2020/07/10/bolo-de-fuba-uma-receita-de-vo-vem-ver/"
  },
  {
    id:"r13", name:"Bolo de banana com aveia (sem trigo)", kind:"doce", mealType:"lanche", protein:"ovo",
    ingredients:["4 bananas nanicas bem maduras", "2 ovos", "3 colheres (sopa) de manteiga derretida", "1/4 de xícara de açúcar", "1 xícara de aveia em flocos finos", "1 colher (sopa) fermento químico", "1/2 colher (chá) de canela em pó"],
    instructions:"Amasse as bananas, junte ovos, manteiga e açúcar. Adicione aveia e fermento. Asse a 180°C por 30 min.", favorite:false, photo:"", link:"https://catracalivre.com.br/gastronomia/bolo-de-banana-com-aveia-e-sem-farinha-trigo/"
  },
  {
    id:"r14", name:"Bolo Monache (bolo de ricota e amêndoas)", kind:"doce", mealType:"lanche", protein:"laticinio",
    ingredients:["250 g de ricota", "3 ovos", "125 g de açúcar", "130 g de farinha de amêndoa", "1 colher de chá de raspas de limão", "1 colher de chá de extrato de baunilha", "1 pitada de sal"],
    instructions:"Bata ovos e açúcar, incorpore a ricota peneirada, a farinha de amêndoa e raspas de limão. Asse a 170 °C por 35–40 min.", favorite:false, photo:"", link:"https://www.tudogostoso.com.br/noticias/nem-farinha-nem-fermento-um-bolo-muito-fofo-feito-pelas-avos-italianas-e-sua-receita-centenaria-saiba-como-fazer-o-bolo-das-freiras-a19225.htm"
  },
  {
    id:"r15", name:"Bolo Chocolate de Liquidificador", kind:"doce", mealType:"lanche", protein:"ovo",
    ingredients:["1 colher de sopa de baunilha", "1 xícara de chocolate em pó 50%", "2 xícaras de farinha de trigo", "1 colher de sopa de fermento", "3 ovos", "2 xícaras de açúcar", "4 colheres de sopa de manteiga derretida", "1 xícara de leite morno"],
    instructions:"Bata os líquidos no liquidificador, misture na tigela com a farinha peneirada e fermento. Asse a 180ºC por ~50 min.", favorite:false, photo:"", link:"https://receitasdepesos.com.br/receitas/2020/12/19/esse-bolo-chocolate-de-liquidificador-molhadinho-e-muito-facil-de-fazer/"
  },
  { id:"r16", name:"Homus + cenoura ou pepino", kind:"salgado", mealType:"petisco", protein:"veg", ingredients:["homus", "cenoura", "pepino"], instructions:"Sirva o homus com palitos de cenoura e/ou pepino.", favorite:false, photo:"", link:"" },
  { id:"r17", name:"Ovo de codorna", kind:"salgado", mealType:"petisco", protein:"ovo", ingredients:["ovos de codorna", "sal (opcional)"], instructions:"Cozinhe os ovos de codorna e sirva com uma pitadinha de sal.", favorite:false, photo:"", link:"" },
  { id:"r18", name:"Castanhas (nozes/amêndoas)", kind:"salgado", mealType:"lanche", protein:"veg", ingredients:["nozes", "amêndoas"], instructions:"Consuma uma porção pequena de castanhas como café da manhã ou lanche.", favorite:false, photo:"", link:"" },
  { id:"r19", name:"Morango com chia ou castanhas", kind:"doce", mealType:"lanche", protein:"veg", ingredients:["morango", "chia", "castanhas"], instructions:"Sirva morangos com chia e/ou uma porção pequena de castanhas.", favorite:false, photo:"", link:"" },
  { id:"r20", name:"Pera com chia ou castanhas", kind:"doce", mealType:"lanche", protein:"veg", ingredients:["pera", "chia", "castanhas"], instructions:"Sirva pera fatiada com chia e/ou uma porção pequena de castanhas.", favorite:false, photo:"", link:"" },
  { id:"r21", name:"Maçã com chia ou castanhas", kind:"doce", mealType:"lanche", protein:"veg", ingredients:["maçã", "chia", "castanhas"], instructions:"Sirva maçã fatiada com chia e/ou uma porção pequena de castanhas.", favorite:false, photo:"", link:"" },
  { id:"r22", name:"Kiwi com chia ou castanhas", kind:"doce", mealType:"lanche", protein:"veg", ingredients:["kiwi", "chia", "castanhas"], instructions:"Sirva kiwi com chia e/ou uma porção pequena de castanhas.", favorite:false, photo:"", link:"" },
  { id:"r23", name:"Creme de abacate salgado (abacate + limão + sal)", kind:"salgado", mealType:"petisco", protein:"veg", ingredients:["abacate", "limão", "sal"], instructions:"Amasse o abacate e tempere com limão e uma pitada de sal.", favorite:false, photo:"", link:"" },
  { id:"r24", name:"Frango grelhado + legumes no vapor + arroz integral", kind:"salgado", mealType:"principal", protein:"frango", ingredients:["peito de frango", "legumes variados", "arroz integral", "azeite", "sal", "temperos a gosto"], instructions:"Grelhe o frango, cozinhe os legumes no vapor e sirva com arroz integral. Finalize com um fio de azeite.", favorite:false, photo:"", link:"" },
  { id:"r25", name:"Carne moída + abobrinha + tomate (refogado)", kind:"salgado", mealType:"principal", protein:"boi", ingredients:["carne moída", "abobrinha", "tomate", "cebola", "alho", "azeite", "sal"], instructions:"Refogue a carne moída com azeite e temperos. Acrescente abobrinha e tomate e cozinhe até ficar macio.", favorite:false, photo:"", link:"" },
  { id:"r26", name:"Grão-de-bico com abóbora", kind:"salgado", mealType:"principal", protein:"veg", ingredients:["grão-de-bico", "abóbora", "cebola", "alho", "azeite", "sal"], instructions:"Cozinhe o grão-de-bico. Refogue a abóbora com temperos e misture ao grão-de-bico.", favorite:false, photo:"", link:"" },
  { id:"r27", name:"Quinoa + cogumelos + legumes", kind:"salgado", mealType:"principal", protein:"veg", ingredients:["quinoa", "cogumelos", "legumes variados", "azeite", "sal"], instructions:"Cozinhe a quinoa. Salteie cogumelos e legumes no azeite e misture à quinoa.", favorite:false, photo:"", link:"" },
  { id:"r28", name:"Arroz + feijão + bife grelhado + salada", kind:"salgado", mealType:"principal", protein:"boi", ingredients:["arroz", "feijão", "bife", "salada", "azeite", "sal"], instructions:"Sirva arroz e feijão com bife grelhado e salada.", favorite:false, photo:"", link:"" },
  { id:"r29", name:"Purê de inhame + frango desfiado", kind:"salgado", mealType:"principal", protein:"frango", ingredients:["inhame", "frango desfiado", "sal", "temperos a gosto", "azeite"], instructions:"Cozinhe e amasse o inhame até virar purê. Sirva com frango desfiado temperado.", favorite:false, photo:"", link:"" },
  { id:"r30", name:"Bowl seguro (base + proteína + legumes)", kind:"salgado", mealType:"principal", protein:"misto", ingredients:["arroz integral ou quinoa", "frango ou ovo ou atum", "cenoura", "pepino", "abobrinha", "azeite", "gergelim"], instructions:"Escolha uma base, adicione uma proteína, complete com legumes e finalize com azeite e gergelim.", favorite:false, photo:"", link:"" },
  { id:"r31", name:"Sopa de legumes com cúrcuma", kind:"salgado", mealType:"sopa", protein:"veg", ingredients:["legumes variados", "cúrcuma", "azeite", "sal"], instructions:"Cozinhe os legumes e tempere com cúrcuma. Finalize com azeite.", favorite:false, photo:"", link:"" },
  { id:"r32", name:"Sopa cremosa de inhame + frango", kind:"salgado", mealType:"sopa", protein:"frango", ingredients:["inhame", "frango desfiado", "sal", "temperos a gosto"], instructions:"Cozinhe o inhame e bata até ficar cremoso. Acrescente frango desfiado temperado e aqueça.", favorite:false, photo:"", link:"" },
  { id:"r33", name:"Sopa de abóbora + gengibre", kind:"salgado", mealType:"sopa", protein:"veg", ingredients:["abóbora", "gengibre", "sal", "azeite"], instructions:"Cozinhe a abóbora com gengibre e bata até formar um creme. Finalize com azeite.", favorite:false, photo:"", link:"" },
  { id:"r34", name:"Chia hidratada", kind:"doce", mealType:"lanche", protein:"veg", ingredients:["chia", "água ou bebida vegetal"], instructions:"Hidrate a chia em água ou bebida vegetal até formar um gel.", favorite:false, photo:"", link:"" },
  { id:"r35", name:"Tahine", kind:"salgado", mealType:"molho", protein:"veg", ingredients:["tahine"], instructions:"Use tahine como pastinha, molho ou complemento de bowls e lanches.", favorite:false, photo:"", link:"" },
  { id:"r36", name:"Cúrcuma + pimenta-do-reino", kind:"salgado", mealType:"tempero", protein:"veg", ingredients:["cúrcuma", "pimenta-do-reino"], instructions:"Adicione cúrcuma com uma pitada de pimenta-do-reino em preparos do dia a dia.", favorite:false, photo:"", link:"" },
  { id:"r37", name:"Limão + azeite", kind:"salgado", mealType:"molho", protein:"veg", ingredients:["limão", "azeite", "sal"], instructions:"Tempere saladas e legumes com limão e azeite.", favorite:false, photo:"", link:"" },
  { id:"r38", name:"Tapioca + ovo + cúrcuma + azeite", kind:"salgado", mealType:"lanche", protein:"ovo", ingredients:["tapioca", "ovo", "cúrcuma", "azeite", "sal"], instructions:"Faça uma tapioca pequena. Coloque 1 ovo mexido dentro. Tempere com cúrcuma e finalize com azeite.", favorite:false, photo:"", link:"" },
  { id:"r39", name:"Pão de frigideira (polvilho + ovo) — sem lactose", kind:"salgado", mealType:"lanche", protein:"ovo", ingredients:["polvilho", "ovo", "sal"], instructions:"Misture 2 colheres de polvilho com 1 ovo e sal. Leve à frigideira e doure dos dois lados.", favorite:false, photo:"", link:"" },
  { id:"r40", name:"Omelete vegetal com espinafre", kind:"salgado", mealType:"lanche", protein:"ovo", ingredients:["ovo", "espinafre", "cebola", "cúrcuma", "azeite", "sal"], instructions:"Refogue cebola e espinafre no azeite. Junte ovos batidos com cúrcuma e cozinhe até firmar.", favorite:false, photo:"", link:"" },
  { id:"r41", name:"Aveioca sem lactose (aveia + ovo)", kind:"salgado", mealType:"lanche", protein:"ovo", ingredients:["aveia", "ovo", "sal"], instructions:"Misture aveia com 1 ovo até formar uma massa. Doure na frigideira.", favorite:false, photo:"", link:"" },
  { id:"r42", name:"Iogurte zero lactose + chia + morango", kind:"doce", mealType:"lanche", protein:"laticinio", ingredients:["iogurte zero lactose", "chia", "morango"], instructions:"Misture chia no iogurte e finalize com morangos.", favorite:false, photo:"", link:"" },
  { id:"r43", name:"🫓 Tapioca + queijo + tahine (versão base)", kind:"salgado", mealType:"lanche", protein:"queijo", ingredients:["goma de tapioca", "queijo minas ou muçarela", "tahine", "orégano ou páprica"], instructions:"⚠️ RI: manter porção pequena. Preparar a tapioca na frigideira, rechear com 1 fatia de queijo, 1 colher de chá de tahine e finalizar com orégano ou páprica.", favorite:false, photo:"", link:"" },
  { id:"r44", name:"🫓 Tapioca + ovo + cúrcuma (RI)", kind:"salgado", mealType:"lanche", protein:"ovo", ingredients:["goma de tapioca", "ovo", "cúrcuma", "sal", "chia (opcional, para RI)"], instructions:"⚠️ RI: manter porção pequena (2 colheres de sopa de goma). Hidrate a tapioca na frigideira, acrescente 1 ovo batido com cúrcuma e sal, deixe firmar e dobre.", favorite:false, photo:"", link:"" },
  { id:"r45", name:"🫓 Pão de frigideira de polvilho com queijo", kind:"salgado", mealType:"lanche", protein:"ovo", ingredients:["ovo", "polvilho doce ou azedo", "queijo ralado (opcional)", "sal e temperos"], instructions:"Misture ovo, polvilho e queijo até formar massa grossinha. Doure na frigideira antiaderente dos dois lados.", favorite:false, photo:"", link:"" },
  { id:"r46", name:"🫓 Tapioca proteica", kind:"salgado", mealType:"lanche", protein:"ovo", ingredients:["goma de tapioca", "ovo", "queijo", "tahine"], instructions:"⚠️ RI: manter porção pequena. Preparar a tapioca e rechear com ovo mexido rápido, queijo e um pouquinho de tahine.", favorite:false, photo:"", link:"" },
  { id:"r47", name:"🫓 Tapioca salgada tipo bruschetta", kind:"salgado", mealType:"lanche", protein:"queijo", ingredients:["goma de tapioca", "queijo", "tahine", "tomate picado", "orégano", "azeite"], instructions:"⚠️ RI: manter porção pequena. Preparar a tapioca, passar tahine, colocar queijo e tomate picado, finalizar com orégano e fio de azeite.", favorite:false, photo:"", link:"" },
  { id:"r48", name:"🫓 Tapioca com tahine + frango desfiado", kind:"salgado", mealType:"lanche", protein:"frango", ingredients:["goma de tapioca", "frango desfiado pronto", "tahine", "queijo (opcional)"], instructions:"⚠️ RI: manter porção pequena. Rechear a tapioca com frango desfiado, 1 colher de tahine e queijo.", favorite:false, photo:"", link:"" },
  { id:"r49", name:"🫓 Tapioca + homus", kind:"salgado", mealType:"lanche", protein:"veg", ingredients:["goma de tapioca fininha", "homus de grão-de-bico", "limão"], instructions:"⚠️ RI: manter porção pequena. Preparar uma tapioca bem fina e rechear com 2 colheres de homus e limão.", favorite:false, photo:"", link:"" },
  { id:"r50", name:"🍞 Pão de frigideira (farinha de grão-de-bico)", kind:"salgado", mealType:"lanche", protein:"veg", ingredients:["farinha de grão-de-bico", "ovo", "água", "sal", "temperos (cúrcuma, páprica, orégano)"], instructions:"Misture 2 colheres de farinha de grão-de-bico com 1 ovo, água até ponto de massa grossa, sal e temperos. Doure na frigideira. Excelente para RI!", favorite:false, photo:"", link:"" },
  { id:"r51", name:"🌽 Pãozinho de Milharina", kind:"salgado", mealType:"lanche", protein:"ovo", ingredients:["ovo", "milharina ou flocão", "água para hidratar", "chia ou linhaça", "sal", "temperos"], instructions:"Misture 1 ovo, 2 colheres de milharina, 1 colher de água, 1 colher de chia/linhaça, sal e temperos. Asse na frigideira virando para dourar.", favorite:false, photo:"", link:"" },
  { id:"r52", name:"🥞 Panqueca de banana + canela", kind:"doce", mealType:"lanche", protein:"ovo", ingredients:["1/2 banana ou banana pequena", "ovo", "aveia em flocos", "canela em pó", "pasta de amendoim (opcional)"], instructions:"⚠️ RI: usar ½ banana. Amasse a banana, misture 1 ovo e 2 colheres de aveia + canela. Doure em fogo baixo.", favorite:false, photo:"", link:"" },
  { id:"r53", name:"🥚 Ovos mexidos + fruta de baixo IG", kind:"salgado", mealType:"lanche", protein:"ovo", ingredients:["ovos", "sal", "fruta de baixo IG (kiwi, morango, maçã, pera)"], instructions:"Mexa 2 ovos com sal e sirva com 1 fruta de baixo índice glicêmico.", favorite:false, photo:"", link:"" },
  { id:"r54", name:"🥞 Aveioca com cúrcuma", kind:"salgado", mealType:"lanche", protein:"ovo", ingredients:["ovo", "aveia em flocos", "sal", "cúrcuma"], instructions:"Misture 1 ovo com 2 colheres de aveia, sal e cúrcuma. Doure como crepioca.", favorite:false, photo:"", link:"" },
  { id:"r55", name:"🍌 Banana + castanhas (baixa energia)", kind:"doce", mealType:"lanche", protein:"veg", ingredients:["banana pequena", "castanhas (nozes, amêndoas, castanha-do-pará)", "chia"], instructions:"Corte a banana em rodelas, coloque castanhas por cima e 1 colher de chá de chia. Ótima opção para dias de baixa energia.", favorite:false, photo:"", link:"" },
  { id:"r56", name:"🥥 Fruta ao natural + castanha", kind:"doce", mealType:"lanche", protein:"veg", ingredients:["frutas de baixo IG (kiwi, maçã, morango, pera)", "1 castanha"], instructions:"Escolha 1 fruta de baixo índice glicêmico combinada com 1 castanha para segurar a glicemia.", favorite:false, photo:"", link:"" },
  { id:"r57", name:"🥜 Castanha-do-pará / nozes", kind:"salgado", mealType:"lanche", protein:"veg", ingredients:["castanha-do-pará", "nozes ou amêndoas"], instructions:"Comer 1–2 unidades como lanche rápido.", favorite:false, photo:"", link:"" },
  { id:"r58", name:"🥑 Creme de abacate doce (com canela)", kind:"doce", mealType:"petisco", protein:"veg", ingredients:["abacate", "limão", "canela em pó"], instructions:"Amasse cerca de 1/2 abacate, tempere com limão e canela. Lanche super anti-inflamatório.", favorite:false, photo:"", link:"" },
  { id:"r59", name:"🍓 Vitamina de frutas vermelhas + leite vegetal", kind:"doce", mealType:"lanche", protein:"veg", ingredients:["morangos congelados", "leite vegetal", "chia"], instructions:"Bata 1/2 xícara de morangos com leite vegetal e 1 colher de chá de chia.", favorite:false, photo:"", link:"" },
  { id:"r60", name:"🍌 Banana + cacau 100%", kind:"doce", mealType:"lanche", protein:"veg", ingredients:["banana pequena", "cacau 100%", "canela em pó"], instructions:"Amasse a banana pequena, misture cacau 100% e canela.", favorite:false, photo:"", link:"" },
  { id:"r61", name:"Creme de ricota com castanhas e damasco", kind:"salgado", mealType:"petisco", protein:"laticinio", ingredients:["Ricota", "Castanhas", "Damasco"], instructions:"Acessar link do Instagram.", favorite:false, photo:"", link:"https://www.instagram.com/reel/DSVfvIngTO_/?igsh=bGc2Y3ZtMDRscnk0" },
  { id:"r62", name:"Salada verão de pêssego e vagem", kind:"salgado", mealType:"salada", protein:"veg", ingredients:["500g de vagem francesa", "1½ xícara de grão de bico cozido", "1 xícara de tomate cereja", "Manjericão", "3 pêssegos", "2 colheres de sopa de azeite", "1 limão", "1 dente de alho picado", "¼ colher de chá de mostarda Dijon", "Sal e pimenta", "1/4 xícara de amêndoas em lascas"], instructions:"Refogue as vagens por 5 min no azeite e esfrie. Misture o molho (azeite, limão, alho, mostarda, sal). Envolva vagem, grão-de-bico e tomates. Sirva com pêssegos fatiados, amêndoas e manjericão.", favorite:false, photo:"", link:"" },
  { id:"r63", name:"Salada Julienne com molho tahine", kind:"salgado", mealType:"salada", protein:"veg", ingredients:["1 xícara de repolho roxo fatiado fino", "1 xícara de repolho branco fatiado fino", "3 a 4 folhas de couve", "1 cenoura ralada", "1 xícara de lentilha cozida", "Molho: 1/4 xícara de tahine, 1 limão, 2 colheres de azeite, 1 alho, 1 colher de mel/agave, 6 colheres de água, sal"], instructions:"Cozinhe a lentilha. Pique os vegetais bem finos. Emulsione o molho tahine com água aos poucos e misture tudo.", favorite:false, photo:"", link:"" },
  { id:"r64", name:"Salada Thai de frango ao curry", kind:"salgado", mealType:"salada", protein:"frango", ingredients:["400g de peito de frango", "1 cebola", "2 colheres de sopa de curry", "200ml de leite de coco", "1 xícara de água", "Salsinha", "Mix de folhas verdes", "Lascas de coco"], instructions:"Refogue a cebola e o curry, doure o frango em cubos, junte leite de coco e água e cozinhe por 15 min. Deixe esfriar e sirva sobre folhas verdes com lascas de coco.", favorite:false, photo:"", link:"" },
  { id:"r65", name:"Salada de ovos e avocado", kind:"salgado", mealType:"salada", protein:"ovo", ingredients:["5 ovos cozidos (8 min)", "1/2 abacate ou 1 avocado", "1/2 xícara de iogurte natural", "1/2 xícara de cebolinha picada", "1/2 cebola roxa", "Sal, pimenta e 1 colher de chá de páprica", "Folhas de alface"], instructions:"Cozinhe e pique os ovos. Misture com abacate em cubos, iogurte, cebola roxa, cebolinha e temperos. Sirva sobre alface crocante.", favorite:false, photo:"", link:"" },
  { id:"r66", name:"Salpicão de frango fit", kind:"salgado", mealType:"salada", protein:"frango", ingredients:["400g de frango cozido e desfiado", "1/4 xícara de repolho roxo", "1 cenoura ralada", "1/3 xícara de uva passa", "½ xícara de milho", "½ xícara de ervilha", "Mix de folhas verdes", "Molho: 1 pote de iogurte, suco de 1 limão, 1 colher de hortelã, 3 colheres de azeite, sal"], instructions:"Misture o frango desfiado com os vegetais, envolva no molho de iogurte com hortelã e sirva sobre folhas verdes.", favorite:false, photo:"", link:"" },
  { id:"r67", name:"Salada Cobb com frango em ervas", kind:"salgado", mealType:"salada", protein:"frango", ingredients:["3 xícaras de rúcula e folhas", "2 avocados fatiados", "2 ovos cozidos fatiados", "½ xícara de ricota em cubos", "10 morangos", "300g peito de frango temperado com páprica e orégano", "Molho vinagrete: azeite, limão, vinagre de arroz, sal e pimenta"], instructions:"Grelhe o frango em ervas. Monte a travessa com folhas, abacate, ovos, ricota, morangos e o frango. Regue com o vinagrete.", favorite:false, photo:"", link:"" },
  { id:"r68", name:"Salada low carb de couve-flor", kind:"salgado", mealType:"salada", protein:"veg", ingredients:["1 couve-flor pequena cozida al dente", "1 xícara de tomate cereja", "1 cebola roxa", "1 pepino", "1 xícara de salsinha e hortelã", "1/2 xícara de azeitona preta", "Molho pesto ou limão + azeite"], instructions:"Pique a couve-flor cozida em pedaços pequenos, misture com tomate, cebola, pepino, azeitona, ervas e molho pesto.", favorite:false, photo:"", link:"" },
  { id:"r69", name:"Salada italiana de quinoa e grão-de-bico", kind:"salgado", mealType:"salada", protein:"veg", ingredients:["1 xícara de quinoa cozida", "1 xícara de grão-de-bico cozido", "½ xícara de tomates cereja", "Manjericão", "2 fatias de abóbora assada", "Molho balsâmico: azeite, aceto balsâmico, mel, vinagre e sal"], instructions:"Asse a abóbora em fatias finas com parte do molho por 25 min. Misture com a quinoa, grão-de-bico, tomates e manjericão.", favorite:false, photo:"", link:"" },
  { id:"r70", name:"Salada morna de quinoa com legumes assados", kind:"salgado", mealType:"salada", protein:"veg", ingredients:["1 xícara de quinoa cozida", "2 abobrinhas em cubos", "1 berinjela em cubos", "1 colher de alecrim", "3 colheres de azeite", "1 colher de chá de açafrão/cúrcuma", "2 colheres de azeitonas pretas", "1 maço de espinafre baby"], instructions:"Asse abobrinha e berinjela com azeite, cúrcuma e alecrim por 30 min. Junte à quinoa cozida com azeitonas e espinafre.", favorite:false, photo:"", link:"" },
  { id:"r71", name:"Tabule tradicional", kind:"salgado", mealType:"salada", protein:"veg", ingredients:["½ xícara de trigo para quibe (ou quinoa)", "2 tomates em cubos", "1 cebola em cubos", "1 maço de salsinha", "1 maço de hortelã", "1 limão", "1/4 xícara de azeite", "Sal"], instructions:"Hidrate o trigo por 15 min e escorra bem. Misture com tomate, cebola, salsinha, hortelã, limão, azeite e sal.", favorite:false, photo:"", link:"" },
  { id:"r72", name:"Salada de lentilhas e cenoura assada", kind:"salgado", mealType:"salada", protein:"veg", ingredients:["1 xícara de lentilhas cozidas", "2 cenouras em meia-lua", "4 xícaras de espinafre ou rúcula", "½ xícara de hortelã", "½ cebola roxa", "1/4 xícara de sementes de girassol", "Molho: azeite, vinagre, alho, gengibre ralado, cominho e sal"], instructions:"Asse as cenouras por 25 min até caramelizar. Monte com folhas, lentilha, cebola, cenoura, molho de cominho e sementes de girassol.", favorite:false, photo:"", link:"" },
  { id:"r73", name:"Salada Grega (com ricota ou feta)", kind:"salgado", mealType:"salada", protein:"laticinio", ingredients:["1 pepino em cubos", "200g de tomate cereja", "1 cebola roxa em meia-lua", "½ xícara de azeitonas", "150g de queijo ricota ou feta", "Molho: vinagre tinto, limão, mostarda Dijon, alho, orégano, azeite e sal"], instructions:"Misture pepino, tomate, cebola marinada no limão, azeitonas e queijo esfarelado. Regue com o molho.", favorite:false, photo:"", link:"" },
  { id:"r74", name:"Salada cremosa de frango com uvas e amêndoas", kind:"salgado", mealType:"salada", protein:"frango", ingredients:["1 xícara de frango desfiado", "1/2 xícara de amêndoas fatiadas", "1 pote de iogurte natural", "1 colher de sopa de mostarda Dijon", "1 xícara de uvas roxas", "Salsinha, cebolinha e 1 talo de alho-poró", "1 limão, sal e pimenta", "Folhas verdes"], instructions:"Misture o molho de iogurte, mostarda e limão. Envolva o frango, alho-poró, ervas, uvas e amêndoas. Sirva sobre folhas.", favorite:false, photo:"", link:"" },
  { id:"r75", name:"Salada de Ratatouille com quinoa", kind:"salgado", mealType:"salada", protein:"veg", ingredients:["1 xícara de quinoa cozida", "1 cebola roxa", "1 dente de alho", "1 pimentão amarelo", "1 abobrinha", "1 berinjela", "1 xícara de tomate cereja", "4 colheres de azeite", "Salsinha e manjericão"], instructions:"Refogue cebola, alho, pimentão, abobrinha e berinjela em cubos por 10 min. Junte tomates e ervas, deixe amornar e misture à quinoa.", favorite:false, photo:"", link:"" },
  { id:"r76", name:"Salada de multigrãos integrais ao pesto", kind:"salgado", mealType:"salada", protein:"veg", ingredients:["1 xícara de arroz 7 grãos cozido", "1 xícara de grão-de-bico cozido", "1/2 xícara de molho pesto", "1 xícara de tomate cereja", "1 cenoura ralada", "1 abobrinha ralada", "Salsinha, manjericão e 1/2 limão"], instructions:"Misture o arroz e o grão-de-bico cozidos com o pesto, tomate, cenoura e abobrinha raladas. Finalize com limão e manjericão.", favorite:false, photo:"", link:"" },
  { id:"r77", name:"Couscous de couve-flor e laranja", kind:"salgado", mealType:"salada", protein:"veg", ingredients:["1 couve-flor processada em grãos", "1 cebola roxa", "½ xícara de salsinha", "½ xícara de hortelã", "Mix de castanhas", "Raspas e gomos de 1 laranja", "Molho: suco de laranja, azeite, vinagre de maçã, sal e pimenta"], instructions:"Refogue a cebola e a couve-flor processada por 4 min. Esfrie e misture ervas, castanhas, raspas/gomos de laranja e o molho.", favorite:false, photo:"", link:"" },
  { id:"r78", name:"Salada Caesar leve (com grão-de-bico crocante)", kind:"salgado", mealType:"salada", protein:"laticinio", ingredients:["1 alface americana", "1 xícara de grão-de-bico crocante assado", "100g de queijo parmesão em lascas", "Molho: 1 pote de iogurte natural, 1 colher de azeite, 1/2 limão, 1 alho, 1 colher de chá de mostarda Dijon, 1 colher de chá de alcaparras, sal e pimenta"], instructions:"Asse o grão-de-bico com azeite e páprica a 200°C por 25 min. Monte a alface com lascas de parmesão, molho Caesar de iogurte e o grão-de-bico crocante.", favorite:false, photo:"", link:"" },
  { id:"r79", name:"Grão-de-bico crocante (topping ou petisco)", kind:"salgado", mealType:"petisco", protein:"veg", ingredients:["2 xícaras de grão-de-bico cozido e bem seco", "2 a 3 colheres de sopa de azeite", "Sal e páprica picante"], instructions:"Escorra muito bem o grão-de-bico cozido, envolva em azeite, sal e páprica e asse a 200°C por 25 min até ficar crocante.", favorite:false, photo:"", link:"" },
  { id:"r80", name:"Salada de feijão branco e salmão assado", kind:"salgado", mealType:"salada", protein:"peixe", ingredients:["2 xícaras de feijão branco cozido", "400g de salmão", "1/2 maço de salsinha", "Raspas e caldo de 1 limão", "2 colheres de sopa de azeite", "Folhas de rúcula", "Sal e pimenta"], instructions:"Asse o salmão por 25 min e tire em lascas. Misture o feijão branco, rúcula, salsinha, raspas/suco de limão, azeite e o salmão.", favorite:false, photo:"", link:"" },
  { id:"r81", name:"Salada de feijão branco e atum a jato", kind:"salgado", mealType:"salada", protein:"peixe", ingredients:["1 xícara de feijão branco cozido", "1 lata de atum", "1 cebola roxa em meia-lua", "½ limão", "2 colheres de sopa de azeite", "Salsinha e folhas verdes"], instructions:"Solte o atum em lascas, misture com feijão branco, cebola roxa, limão, azeite e salsinha. Sirva sobre folhas verdes.", favorite:false, photo:"", link:"" },
  { id:"r82", name:"Pernil na pressão desfiado (base para salada/refeição)", kind:"salgado", mealType:"principal", protein:"porco", ingredients:["400g de pernil ou lombo em cubos", "1 cebola", "1 ramo de alecrim", "Suco de 1 laranja", "Sal e pimenta", "2 xícaras de água"], instructions:"Sele os cubos de pernil na panela de pressão, refogue cebola, junte laranja, alecrim e água. Cozinhe por 30 min na pressão e desfie.", favorite:false, photo:"", link:"" },
  { id:"r83", name:"Salada de pernil desfiado com manga e rúcula", kind:"salgado", mealType:"salada", protein:"porco", ingredients:["Lombo/pernil suíno desfiado", "1 manga em cubos", "1 maço de mini rúcula", "Molho: 1/4 xícara de azeite, 1/2 limão, 1 dente de alho, sal"], instructions:"Disponha a rúcula, tempere com parte do molho, acrescente o pernil desfiado e os cubos de manga.", favorite:false, photo:"", link:"" },
  { id:"r84", name:"Salada de repolho à moda oriental", kind:"salgado", mealType:"salada", protein:"veg", ingredients:["1 xícara de repolho roxo ralado", "1 xícara de repolho branco ralado", "1 xícara de cenoura ralada", "1 maçã em cubinhos", "2 colheres de sopa de gergelim", "Molho de Missô: 3 colheres de azeite, 2 dentes de alho picados, 1 colher de vinagre de arroz, 1 colher de pasta de missô"], instructions:"Misture os repolhos, cenoura e maçã, regue com o molho de missô emulsionado e finalize com gergelim.", favorite:false, photo:"", link:"" },
  { id:"r85", name:"Salada de fitas de abobrinha com tomate confit e muçarela", kind:"salgado", mealType:"salada", protein:"queijo", ingredients:["2 abobrinhas em fitas finas (descascador)", "1 xícara de tomate confit", "Manjericão", "Queijo muçarela bolinha", "Molho: azeite aromatizado, 1/2 limão e 1 alho"], instructions:"Fatie a abobrinha crua em fitas, envolva no molho de limão e azeite para amaciar e finalize com tomates confit, muçarela e manjericão.", favorite:false, photo:"", link:"" },
  { id:"r86", name:"Espaguete de pupunha low carb com pesto e vegetais", kind:"salgado", mealType:"principal", protein:"veg", ingredients:["200g de espaguete de palmito pupunha", "1 brócolis em floretes pequenos", "1 xícara de tomate cereja", "1 xícara de ervilha", "Molho pesto a gosto"], instructions:"Refogue o brócolis por 5 min no azeite, junte tomate cereja e ervilha. Misture ao palmito pupunha aquecido e regue com molho pesto.", favorite:false, photo:"", link:"" },
  { id:"r87", name:"Salada colorida de brócolis e maionese de avocado", kind:"salgado", mealType:"salada", protein:"veg", ingredients:["1 brócolis cozido al dente", "2 cenouras cozidas em meia-lua", "200g de tomate cereja", "1/2 xícara de amêndoas em lâminas", "Maionese de avocado: 1 avocado, 1/4 xícara de azeite, 1/2 limão, salsinha, 1 alho, sal e água até dar ponto"], instructions:"Bata a maionese de avocado no processador. Envolva o brócolis, a cenoura e os tomates na maionese e finalize com amêndoas.", favorite:false, photo:"", link:"" },
  { id:"r88", name:"Vinagrete de abacaxi", kind:"salgado", mealType:"molho", protein:"veg", ingredients:["4 fatias de abacaxi em cubinhos", "1 tomate sem sementes em cubos", "1 cebola roxa em cubos", "2 colheres de azeite", "1 limão", "Salsinha e sal"], instructions:"Misture todos os ingredientes picados em cubos pequenos, tempere com azeite e limão e sirva gelado.", favorite:false, photo:"", link:"" },
  { id:"r89", name:"Vinagrete de banana-da-terra", kind:"salgado", mealType:"molho", protein:"veg", ingredients:["2 bananas-da-terra em cubinhos", "1 cebola roxa em cubos", "1/2 pimentão vermelho em cubinhos", "1 limão", "2 colheres de azeite", "Salsinha e sal"], instructions:"Misture todos os ingredientes picados e tempere com sal, azeite e limão.", favorite:false, photo:"", link:"" },
  { id:"r90", name:"Salada/Vinagrete de melancia, pepino e ricota", kind:"salgado", mealType:"salada", protein:"laticinio", ingredients:["2 fatias grandes de melancia em cubos", "2 pepinos em cubos", "150g de queijo ricota em cubos", "2 colheres de sopa de hortelã picada", "Azeite e limão"], instructions:"Corte melancia, pepino e ricota em cubos de 1 cm. Misture delicadamente com hortelã, azeite e limão.", favorite:false, photo:"", link:"" },
  { id:"r91", name:"Antepasto de berinjela de forno", kind:"salgado", mealType:"molho", protein:"veg", ingredients:["2 berinjelas em cubos", "1 pimentão vermelho", "1 pimentão amarelo", "1 xícara de nozes", "1 xícara de uvas passas", "1 xícara de azeitonas", "1 cebola roxa", "Salsinha", "Azeite, sal e pimenta"], instructions:"Disponha tudo na assadeira coberto com azeite e papel alumínio. Asse por ~50 min mexendo na metade. Dura 7 dias na geladeira.", favorite:false, photo:"", link:"" },
  { id:"r92", name:"Guacamole rápida", kind:"salgado", mealType:"molho", protein:"veg", ingredients:["3 avocados (ou 1 abacate)", "1 limão", "2 tomates sem sementes em cubos", "1 cebola roxa em cubos", "Salsinha ou coentro", "Azeite, sal e pimenta"], instructions:"Amasse o avocado com limão, junte tomate, cebola, ervas, azeite e sal.", favorite:false, photo:"", link:"" },
  { id:"r93", name:"Vinagrete curinga de limão e alho", kind:"salgado", mealType:"molho", protein:"veg", ingredients:["1/4 xícara de azeite", "1/2 limão", "1 dente de alho inteiro", "1 colher de chá de orégano", "Sal"], instructions:"Coloque tudo num pote com tampa e chacoalhe bem. Dura até 3 dias na geladeira.", favorite:false, photo:"", link:"" },
  { id:"r94", name:"Vinagrete de limão e gengibre", kind:"salgado", mealType:"molho", protein:"veg", ingredients:["1/4 xícara de azeite", "1/2 limão", "3 moedas de gengibre ralado", "Raspas de 1 limão", "Sal"], instructions:"Chacoalhe tudo num pote com tampa. Dura 3 dias na geladeira.", favorite:false, photo:"", link:"" },
  { id:"r95", name:"Vinagrete com mostarda Dijon", kind:"salgado", mealType:"molho", protein:"veg", ingredients:["1/3 xícara de vinagre de vinho tinto", "1 limão", "1 colher de mostarda Dijon", "1 dente de alho", "½ colher de chá de orégano", "½ xícara de azeite", "Sal e pimenta"], instructions:"Chacoalhe todos os ingredientes em um pote de vidro com tampa. Dura 4 dias na geladeira.", favorite:false, photo:"", link:"" },
  { id:"r96", name:"Azeite aromatizado e Tomate Confit", kind:"salgado", mealType:"molho", protein:"veg", ingredients:["500g de tomate cereja", "2 dentes de alho", "3 folhas de louro e 1 ramo de alecrim", "1 xícara de azeite", "Sal e pimenta"], instructions:"Asse tudo a 150°C por cerca de 1 hora. Guarde em pote hermético na geladeira por até 15 dias.", favorite:false, photo:"", link:"" },
  { id:"r97", name:"Molho Pesto a jato", kind:"salgado", mealType:"molho", protein:"queijo", ingredients:["2 xícaras de manjericão", "1/2 xícara de castanha ou nozes", "1/2 xícara de queijo parmesão ralado", "1 dente de alho", "1 xícara de azeite", "Sal"], instructions:"Bata tudo no processador ou liquidificador. Dura 15 dias na geladeira ou 3 meses congelado.", favorite:false, photo:"", link:"" },
  { id:"r98", name:"Pesto de rúcula com hortelã", kind:"salgado", mealType:"molho", protein:"veg", ingredients:["1/2 xícara de azeite", "1 maço de rúcula", "1 xícara de hortelã", "1 limão", "1/2 xícara de amêndoas ou nozes", "Sal"], instructions:"Bata tudo no processador. Dura 15 dias na geladeira ou 3 meses no freezer.", favorite:false, photo:"", link:"" },
  { id:"r99", name:"Molho balsâmico com mel", kind:"salgado", mealType:"molho", protein:"veg", ingredients:["1/2 xícara de azeite", "1 colher de sopa de aceto balsâmico", "1 colher de sopa de mel", "1 colher de sopa de vinagre branco", "1 pitada de sal"], instructions:"Chacoalhe em um pote com tampa. Dura até 5 dias na geladeira.", favorite:false, photo:"", link:"" },
  { id:"r101", name:"Molho cremoso de tahine", kind:"salgado", mealType:"molho", protein:"veg", ingredients:["1/4 xícara de tahine", "1 limão", "2 colheres de sopa de azeite", "1 dente de alho pequeno", "1 colher de sobremesa de mel/agave", "6 colheres de sopa de água", "Sal"], instructions:"Misture o alho amassado, limão, tahine, azeite e mel. Adicione a água aos poucos até ficar cremoso.", favorite:false, photo:"", link:"" },
  { id:"r102", name:"Vinagrete com cominho e gengibre", kind:"salgado", mealType:"molho", protein:"veg", ingredients:["5 colheres de sopa de azeite", "1 colher de chá de sal", "1 colher de sopa de vinagre branco", "1 dente de alho amassado", "1 colher de sobremesa de gengibre ralado", "1 colher de chá de cominho"], instructions:"Chacoalhe bem em um pote com tampa. Dura até 3 dias na geladeira.", favorite:false, photo:"", link:"" },
  { id:"r103", name:"Vinagrete de manga", kind:"salgado", mealType:"molho", protein:"veg", ingredients:["1 manga média em cubinhos", "1/4 xícara de azeite", "2 dentes de alho", "2 colheres de sopa de salsinha", "2 colheres de sopa de vinagre branco", "1 colher de sopa de mel", "Sal"], instructions:"Emulsione os líquidos e temperos e incorpore os cubinhos de manga.", favorite:false, photo:"", link:"" },
  { id:"r104", name:"Molho de iogurte e hortelã", kind:"salgado", mealType:"molho", protein:"laticinio", ingredients:["1 pote de iogurte natural", "Suco de 1 limão", "1 colher de sopa de hortelã picadinha", "3 colheres de sopa de azeite", "Sal"], instructions:"Misture todos os ingredientes num pote. Dura 3 dias na geladeira.", favorite:false, photo:"", link:"" },
  { id:"r105", name:"Molho Caesar natural com alcaparras", kind:"salgado", mealType:"molho", protein:"laticinio", ingredients:["1 pote de iogurte natural", "1 colher de sopa de azeite", "1/2 limão", "1 alho amassado", "1 colher de chá de mostarda Dijon", "1 colher de chá de alcaparras picadas", "Pimenta preta e sal"], instructions:"Misture bem todos os ingredientes.", favorite:false, photo:"", link:"" },
  { id:"r106", name:"Molho de Missô", kind:"salgado", mealType:"molho", protein:"veg", ingredients:["3 colheres de sopa de azeite", "2 dentes de alho picados", "1 colher de sopa de vinagre de arroz", "1 colher de sopa de pasta de missô"], instructions:"Misture até ficar homogêneo.", favorite:false, photo:"", link:"" },
  { id:"r107", name:"Homus clássico", kind:"salgado", mealType:"molho", protein:"veg", ingredients:["1 e 1/2 xícara de grão-de-bico cozido", "2 colheres de sopa de tahine", "2 colheres de sopa de azeite", "1/2 limão", "1 dente de alho", "Sal, pimenta e 2–3 colheres de água"], instructions:"Bata tudo no processador até virar uma pasta homogênea. Dura 7 dias na geladeira ou 3 meses no freezer.", favorite:false, photo:"", link:"" },
  { id:"r108", name:"Homus verdíssimo (com avocado e ervilha)", kind:"salgado", mealType:"molho", protein:"veg", ingredients:["1 xícara de grão-de-bico cozido", "1/2 avocado", "1/2 xícara de ervilha cozida", "2 colheres de sopa de tahine", "2 colheres de sopa de azeite", "Limão, cominho, sal e água se necessário"], instructions:"Bata tudo no processador até ficar cremoso.", favorite:false, photo:"", link:"" }
];
