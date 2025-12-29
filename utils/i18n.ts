
import { Product } from "../types";

export const TRANSLATIONS = {
  en: {
    nav: { home: "HOME", collection: "COLLECTION", heritage: "HERITAGE" },
    hero: {
      badge: "New Collection 2024",
      title1: "Timeless",
      title2: "Elegance",
      subtitle: "Discover the fusion of Swiss precision and Italian artistry. Designed for those who value every second.",
      cta: "EXPLORE CATALOG",
      story: "OUR STORY"
    },
    cart: {
      title: "Shopping Bag",
      empty: "Your bag is empty",
      startShopping: "START SHOPPING",
      remove: "Remove",
      subtotal: "Subtotal",
      shippingNote: "Shipping and taxes calculated at checkout.",
      checkout: "CHECKOUT"
    },
    checkout: {
      title: "Checkout",
      steps: { shipping: "Shipping", payment: "Payment", review: "Review" },
      shipping: {
        title: "Shipping Address",
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email",
        address: "Address",
        city: "City",
        country: "Country",
        zip: "Zip / Postal Code",
        phone: "Phone"
      },
      payment: {
        title: "Payment Method",
        creditCard: "Credit Card",
        paypal: "PayPal",
        crypto: "Crypto",
        nequi: "Nequi",
        bancolombia: "Bancolombia",
        cardName: "Cardholder Name",
        cardNumber: "Card Number",
        expiry: "Expiry (MM/YY)",
        cvc: "CVC",
        phoneNumber: "Mobile Number",
        accountType: "Account Type",
        accountNumber: "Account Number",
        savings: "Savings",
        current: "Current",
        nequiInstruction: "Enter your Nequi number. You will receive a notification to accept the payment.",
        bancolombiaInstruction: "Enter your account details to proceed with the transfer."
      },
      review: {
        title: "Order Summary",
        items: "Items",
        shippingCost: "Shipping",
        tax: "Tax",
        total: "Total",
        placeOrder: "PLACE ORDER"
      },
      success: {
        title: "Order Confirmed",
        message: "Thank you for your purchase. Your order #SUN8-{id} has been placed successfully.",
        email: "A confirmation email has been sent to {email}.",
        continue: "CONTINUE SHOPPING"
      },
      errors: {
        required: "This field is required",
        processing: "Processing payment..."
      },
      back: "Back",
      next: "Next"
    },
    wishlist: {
      title: "Your Wishlist",
      empty: "Your wishlist is empty",
      moveToCart: "MOVE TO BAG"
    },
    compare: {
      title: "Compare Products",
      add: "Compare",
      remove: "Remove",
      clear: "Clear All",
      view: "Compare Now",
      empty: "Select products to compare",
      limit: "You can compare up to 3 products",
      features: "Features",
      price: "Price",
      category: "Category",
      description: "Description",
      stock: "Availability"
    },
    veo: {
      title: "Cinematic Studio",
      subtitle: "Bring your luxury items to life with AI-powered motion.",
      upload: "Upload Photo",
      promptPlaceholder: "Describe the motion (e.g., A slow cinematic pan, golden light glinting off the surface...)",
      generate: "Animate with Veo",
      generating: "Crafting your masterpiece...",
      download: "Download Video",
      selectKey: "Select API Key",
      apiKeyRequired: "To use Veo video generation, you must select a specific API key.",
      billing: "View Billing Documentation",
      aspectRatio: "Aspect Ratio",
      success: "Video generated successfully"
    },
    product: {
      addToCart: "ADD TO CART",
      features: "Features",
      onlyLeft: "Only {n} left",
      shipping: "Free Worldwide Shipping • 5 Year Warranty",
      view: "View",
      share: "Share Product",
      linkCopied: "Link copied to clipboard"
    },
    filters: {
      title: "Curated Collection",
      subtitle: "Explore our hand-picked selection of horological masterpieces and fine jewelry.",
      all: "All",
      watches: "Watches",
      jewelry: "Jewelry"
    },
    ai: {
      title: "Aura Concierge",
      subtitle: "AI Stylist",
      placeholder: "Ask Aura...",
      disclaimer: "Aura suggests based on current inventory. Verify availability.",
      greeting: "Hello! I am Aura, your personal SUN8 concierge. How can I help you find the perfect piece from our watch and jewelry collection today?"
    },
    admin: {
      title: "Store Manager",
      subtitle: "Manage your inventory and product details.",
      addProduct: "Add New Product",
      editProduct: "Edit Product",
      delete: "Delete",
      save: "Save Changes",
      cancel: "Cancel",
      form: {
        title: "Product Title",
        price: "Price (USD)",
        category: "Category",
        stock: "Stock Quantity",
        description: "Description",
        features: "Features (comma separated)",
        images: "Product Images",
        upload: "Upload Image",
        preview: "Preview"
      },
      confirmDelete: "Are you sure you want to delete this product?"
    },
    footer: {
      tagline: "Redefining luxury for the modern era.",
      shop: "Shop",
      support: "Support",
      newsletter: "Newsletter",
      subscribe: "Subscribe for exclusive access to limited editions.",
      join: "JOIN",
      rights: "SUN8 Luxury Goods. All rights reserved."
    }
  },
  es: {
    nav: { home: "INICIO", collection: "COLECCIÓN", heritage: "LEGADO" },
    hero: {
      badge: "Nueva Colección 2024",
      title1: "Elegancia",
      title2: "Atemporal",
      subtitle: "Descubre la fusión de la precisión suiza y el arte italiano. Diseñado para quienes valoran cada segundo.",
      cta: "EXPLORAR CATÁLOGO",
      story: "NUESTRA HISTORIA"
    },
    cart: {
      title: "Bolsa de Compras",
      empty: "Tu bolsa está vacía",
      startShopping: "IR A LA TIENDA",
      remove: "Eliminar",
      subtotal: "Subtotal",
      shippingNote: "Envío e impuestos calculados al finalizar.",
      checkout: "PAGAR"
    },
    checkout: {
      title: "Finalizar Compra",
      steps: { shipping: "Envío", payment: "Pago", review: "Confirmar" },
      shipping: {
        title: "Dirección de Envío",
        firstName: "Nombre",
        lastName: "Apellido",
        email: "Correo Electrónico",
        address: "Dirección",
        city: "Ciudad",
        country: "País",
        zip: "Código Postal",
        phone: "Teléfono"
      },
      payment: {
        title: "Método de Pago",
        creditCard: "Tarjeta de Crédito",
        paypal: "PayPal",
        crypto: "Criptomonedas",
        nequi: "Nequi",
        bancolombia: "Bancolombia",
        cardName: "Nombre en la Tarjeta",
        cardNumber: "Número de Tarjeta",
        expiry: "Vencimiento (MM/AA)",
        cvc: "CVC",
        phoneNumber: "Número de Celular",
        accountType: "Tipo de Cuenta",
        accountNumber: "Número de Cuenta",
        savings: "Ahorros",
        current: "Corriente",
        nequiInstruction: "Ingresa tu celular Nequi. Recibirás una notificación push para aceptar.",
        bancolombiaInstruction: "Ingresa los datos de tu cuenta para proceder con la transferencia."
      },
      review: {
        title: "Resumen del Pedido",
        items: "Artículos",
        shippingCost: "Envío",
        tax: "Impuestos",
        total: "Total",
        placeOrder: "CONFIRMAR ORDEN"
      },
      success: {
        title: "Orden Confirmada",
        message: "Gracias por tu compra. Tu orden #SUN8-{id} ha sido procesada exitosamente.",
        email: "Se ha enviado un correo de confirmación a {email}.",
        continue: "CONTINUAR COMPRANDO"
      },
      errors: {
        required: "Este campo es obligatorio",
        processing: "Procesando pago..."
      },
      back: "Atrás",
      next: "Siguiente"
    },
    wishlist: {
      title: "Tu Lista de Deseos",
      empty: "Tu lista de deseos está vacía",
      moveToCart: "MOVER A LA BOLSA"
    },
    compare: {
      title: "Comparar Productos",
      add: "Comparar",
      remove: "Quitar",
      clear: "Limpiar",
      view: "Comparar Ahora",
      empty: "Selecciona productos para comparar",
      limit: "Puedes comparar hasta 3 productos",
      features: "Características",
      price: "Precio",
      category: "Categoría",
      description: "Descripción",
      stock: "Disponibilidad"
    },
    veo: {
      title: "Estudio Cinematográfico",
      subtitle: "Da vida a tus artículos de lujo con movimiento impulsado por IA.",
      upload: "Subir Foto",
      promptPlaceholder: "Describe el movimiento (ej: Un paneo cinematográfico lento, luz dorada brillando...)",
      generate: "Animar con Veo",
      generating: "Creando tu obra maestra...",
      download: "Descargar Video",
      selectKey: "Seleccionar Clave API",
      apiKeyRequired: "Para usar la generación de video Veo, debes seleccionar una clave API específica.",
      billing: "Ver Documentación de Facturación",
      aspectRatio: "Relación de Aspecto",
      success: "Video generado exitosamente"
    },
    product: {
      addToCart: "AÑADIR AL CARRITO",
      features: "Características",
      onlyLeft: "Solo quedan {n}",
      shipping: "Envío Global Gratuito • 5 Años de Garantía",
      view: "Ver",
      share: "Compartir Producto",
      linkCopied: "Enlace copiado al portapapeles"
    },
    filters: {
      title: "Colección Curada",
      subtitle: "Explora nuestra selección de obras maestras de relojería y alta joyería.",
      all: "Todo",
      watches: "Relojes",
      jewelry: "Joyería"
    },
    ai: {
      title: "Conserje Aura",
      subtitle: "Estilista IA",
      placeholder: "Pregúntale a Aura...",
      disclaimer: "Aura sugiere basado en inventario actual. Verifique disponibilidad.",
      greeting: "¡Hola! Soy Aura, tu conserje personal de SUN8. ¿Cómo puedo ayudarte a encontrar la pieza perfecta de nuestra colección de relojes y joyería hoy?"
    },
    admin: {
      title: "Gestor de Tienda",
      subtitle: "Administra tu inventario y detalles de productos.",
      addProduct: "Añadir Nuevo Producto",
      editProduct: "Editar Producto",
      delete: "Eliminar",
      save: "Guardar Cambios",
      cancel: "Cancelar",
      form: {
        title: "Título del Producto",
        price: "Precio (USD)",
        category: "Categoría",
        stock: "Cantidad en Stock",
        description: "Descripción",
        features: "Características (separadas por coma)",
        images: "Imágenes del Producto",
        upload: "Subir Imagen",
        preview: "Vista Previa"
      },
      confirmDelete: "¿Estás seguro de que deseas eliminar este producto?"
    },
    footer: {
      tagline: "Redefiniendo el lujo para la era moderna.",
      shop: "Tienda",
      support: "Soporte",
      newsletter: "Boletín",
      subscribe: "Suscríbete para acceso exclusivo a ediciones limitadas.",
      join: "UNIRSE",
      rights: "SUN8 Luxury Goods. Todos los derechos reservados."
    }
  },
  fr: {
    nav: { home: "ACCUEIL", collection: "COLLECTION", heritage: "HÉRITAGE" },
    hero: {
      badge: "Nouvelle Collection 2024",
      title1: "Élégance",
      title2: "Intemporelle",
      subtitle: "Découvrez la fusion de la précision suisse et de l'art italien. Conçu pour ceux qui apprécient chaque seconde.",
      cta: "EXPLORER LE CATALOGUE",
      story: "NOTRE HISTOIRE"
    },
    cart: {
      title: "Panier",
      empty: "Votre panier est vide",
      startShopping: "COMMENCER VOS ACHATS",
      remove: "Retirer",
      subtotal: "Sous-total",
      shippingNote: "Expédition et taxes calculées à la caisse.",
      checkout: "PAYER"
    },
    checkout: {
      title: "Paiement",
      steps: { shipping: "Livraison", payment: "Paiement", review: "Vérification" },
      shipping: {
        title: "Adresse de Livraison",
        firstName: "Prénom",
        lastName: "Nom",
        email: "E-mail",
        address: "Adresse",
        city: "Ville",
        country: "Pays",
        zip: "Code Postal",
        phone: "Téléphone"
      },
      payment: {
        title: "Méthode de Paiement",
        creditCard: "Carte de Crédit",
        paypal: "PayPal",
        crypto: "Crypto",
        nequi: "Nequi",
        bancolombia: "Bancolombia",
        cardName: "Nom du Titulaire",
        cardNumber: "Numéro de Carte",
        expiry: "Expiration (MM/AA)",
        cvc: "CVC",
        phoneNumber: "Numéro de Téléphone",
        accountType: "Type de Compte",
        accountNumber: "Numéro de Compte",
        savings: "Épargne",
        current: "Courant",
        nequiInstruction: "Entrez votre numéro Nequi. Vous recevrez une notification pour accepter.",
        bancolombiaInstruction: "Entrez les détails de votre compte pour procéder au virement."
      },
      review: {
        title: "Récapitulatif",
        items: "Articles",
        shippingCost: "Livraison",
        tax: "Taxes",
        total: "Total",
        placeOrder: "CONFIRMER LA COMMANDE"
      },
      success: {
        title: "Commande Confirmée",
        message: "Merci pour votre achat. Votre commande #SUN8-{id} a été traitée avec succès.",
        email: "Un e-mail de confirmation a été envoyé à {email}.",
        continue: "CONTINUER VOS ACHATS"
      },
      errors: {
        required: "Ce champ est obligatoire",
        processing: "Traitement du paiement..."
      },
      back: "Retour",
      next: "Suivant"
    },
    wishlist: {
      title: "Votre Liste de Souhaits",
      empty: "Votre liste de souhaits est vide",
      moveToCart: "AJOUTER AU PANIER"
    },
    compare: {
      title: "Comparer Produits",
      add: "Comparer",
      remove: "Retirer",
      clear: "Effacer",
      view: "Comparer Maintenant",
      empty: "Sélectionnez des produits à comparer",
      limit: "Vous pouvez comparer jusqu'à 3 produits",
      features: "Caractéristiques",
      price: "Prix",
      category: "Catégorie",
      description: "Description",
      stock: "Disponibilité"
    },
    veo: {
      title: "Studio Cinématographique",
      subtitle: "Donnez vie à vos articles de luxe avec un mouvement alimenté par l'IA.",
      upload: "Télécharger une Photo",
      promptPlaceholder: "Décrivez le mouvement (ex : Un panoramique cinématographique lent...)",
      generate: "Animer avec Veo",
      generating: "Création de votre chef-d'œuvre...",
      download: "Télécharger la Vidéo",
      selectKey: "Sélectionner la Clé API",
      apiKeyRequired: "Pour utiliser la génération vidéo Veo, vous devez sélectionner une clé API spécifique.",
      billing: "Voir la Documentation de Facturation",
      aspectRatio: "Ratio d'Aspect",
      success: "Vidéo générée avec succès"
    },
    product: {
      addToCart: "AJOUTER AU PANIER",
      features: "Caractéristiques",
      onlyLeft: "Plus que {n} restants",
      shipping: "Livraison mondiale gratuite • Garantie 5 ans",
      view: "Voir",
      share: "Partager le produit",
      linkCopied: "Lien copié dans le presse-papiers"
    },
    filters: {
      title: "Collection Soignée",
      subtitle: "Explorez notre sélection de chefs-d'œuvre horlogers.",
      all: "Tout",
      watches: "Montres",
      jewelry: "Bijoux"
    },
    ai: {
      title: "Concierge Aura",
      subtitle: "Styliste IA",
      placeholder: "Demandez à Aura...",
      disclaimer: "Aura suggère en fonction de l'inventaire actuel. Vérifiez la disponibilité.",
      greeting: "Bonjour ! Je suis Aura, votre concierge personnel SUN8. Comment puis-je vous aider à trouver la pièce parfaite parmi notre collection de montres et de bijoux aujourd'hui ?"
    },
    admin: {
      title: "Gestionnaire de Boutique",
      subtitle: "Gérez votre inventaire et les détails des produits.",
      addProduct: "Ajouter Produit",
      editProduct: "Modifier Produit",
      delete: "Supprimer",
      save: "Enregistrer",
      cancel: "Annuler",
      form: {
        title: "Titre du Produit",
        price: "Prix (USD)",
        category: "Catégorie",
        stock: "Stock",
        description: "Description",
        features: "Caractéristiques (séparées par virgule)",
        images: "Images du Produit",
        upload: "Télécharger Image",
        preview: "Aperçu"
      },
      confirmDelete: "Êtes-vous sûr de vouloir supprimer ce produit ?"
    },
    footer: {
      tagline: "Redéfinir le luxe pour l'ère moderne.",
      shop: "Boutique",
      support: "Support",
      newsletter: "Newsletter",
      subscribe: "Abonnez-vous pour un accès exclusif aux éditions limitées.",
      join: "REJOINDRE",
      rights: "SUN8 Luxury Goods. Tous droits réservés."
    }
  }
};

export const getLocalizedProducts = (lang: 'en' | 'es' | 'fr'): Product[] => {
  const isEs = lang === 'es';
  const isFr = lang === 'fr';

  // Helper to translate content
  const t = (en: string, es: string, fr: string) => isEs ? es : (isFr ? fr : en);

  return [
    {
      id: 'w1',
      title: t('The Aurora Chronograph', 'Cronógrafo Aurora', 'Le Chronographe Aurora'),
      price: 12500,
      category: 'watches',
      images: [
        'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1999&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1548171915-e79a380a2a4b?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1614164185128-e4899fb60368?q=80&w=1000&auto=format&fit=crop'
      ],
      stock: 5,
      description: t(
        'A masterpiece of engineering featuring a moonphase complication and 18k gold casing. The Aurora Chronograph represents the pinnacle of our watchmaking expertise.',
        'Una obra maestra de la ingeniería con complicación de fase lunar y caja de oro de 18 quilates. El Cronógrafo Aurora representa la cúspide de nuestra experiencia relojera.',
        'Un chef-d\'œuvre d\'ingénierie doté d\'une complication phase de lune et d\'un boîtier en or 18 carats. Le Chronographe Aurora représente le summum de notre savoir-faire horloger.'
      ),
      features: isEs 
        ? ['Oro 18k', 'Cristal de Zafiro', 'Movimiento Automático', 'Resistencia 50m', 'Fase Lunar']
        : isFr
        ? ['Or 18k', 'Verre Saphir', 'Mouvement Automatique', 'Résistance 50m', 'Phase de Lune']
        : ['18k Gold', 'Sapphire Crystal', 'Automatic Movement', 'Water Resistant 50m', 'Moonphase Complication']
    },
    {
      id: 'w2',
      title: t('Midnight Diver', 'Buzo de Medianoche', 'Plongeur de Minuit'),
      price: 8900,
      category: 'watches',
      images: [
          'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1894&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1539874754764-5a96559165b0?q=80&w=1000&auto=format&fit=crop'
      ],
      stock: 8,
      description: t(
        'Built for the depths, designed for the boardroom. The Midnight Diver features a robust ceramic bezel and our signature luminescent dial.',
        'Construido para las profundidades, diseñado para la sala de juntas. El Buzo de Medianoche cuenta con un robusto bisel de cerámica y nuestra esfera luminiscente exclusiva.',
        'Conçu pour les profondeurs, dessiné pour la salle de réunion. Le Plongeur de Minuit dispose d\'une lunette en céramique robuste et de notre cadran luminescent signature.'
      ),
      features: isEs
        ? ['Titanio', 'Bisel Cerámico', '300m Resistencia', 'Esfera Luminiscente']
        : isFr
        ? ['Titane', 'Lunette Céramique', 'Résistance 300m', 'Cadran Luminescent']
        : ['Titanium', 'Ceramic Bezel', '300m Water Resistance', 'Luminescent Dial']
    },
    {
      id: 'j1',
      title: t('Solare Diamond Pendant', 'Colgante Diamante Solare', 'Pendentif Diamant Solare'),
      price: 4500,
      category: 'jewelry',
      images: [
          'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=1887&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop'
      ],
      stock: 3,
      description: t(
        'A radiant sunburst design encrusted with VVS diamonds set in platinum. This pendant captures the essence of light.',
        'Un diseño radiante de rayos de sol con incrustaciones de diamantes VVS engastados en platino. Este colgante captura la esencia de la luz.',
        'Un design rayonnant incrusté de diamants VVS sertis dans du platine. Ce pendentif capture l\'essence de la lumière.'
      ),
      features: isEs
        ? ['Platino', 'Diamantes VVS', 'Cadena 18"', 'Hecho a Mano']
        : isFr
        ? ['Platine', 'Diamants VVS', 'Chaîne 18"', 'Fait Main']
        : ['Platinum', 'VVS Diamonds', '18" Chain', 'Handcrafted']
    },
    {
      id: 'j2',
      title: t('Eclipse Gold Cuff', 'Brazalete Eclipse Oro', 'Manchette Eclipse Or'),
      price: 3200,
      category: 'jewelry',
      images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070&auto=format&fit=crop'],
      stock: 12,
      description: t(
        'Modern minimalism meets ancient luxury. This hammered 24k gold finish cuff is designed to make a statement without saying a word.',
        'El minimalismo moderno se encuentra con el lujo antiguo. Este brazalete con acabado de oro de 24k martillado está diseñado para destacar sin decir una palabra.',
        'Le minimalisme moderne rencontre le luxe ancien. Cette manchette en finition or 24k martelé est conçue pour faire sensation sans dire un mot.'
      ),
      features: isEs
        ? ['Baño Oro 24k', 'Ajustable', 'Acabado Martillado', 'Unisex']
        : isFr
        ? ['Plaqué Or 24k', 'Ajustable', 'Finition Martelée', 'Unisexe']
        : ['24k Gold Overlay', 'Adjustable Fit', 'Hammered Finish', 'Unisex']
    },
    {
      id: 'w3',
      title: t('Heritage 1960', 'Herencia 1960', 'Héritage 1960'),
      price: 15000,
      category: 'watches',
      images: ['https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=2080&auto=format&fit=crop'],
      stock: 2,
      description: t(
        'A limited edition reissue of our classic pilot watch from the golden age of aviation.',
        'Una reedición de edición limitada de nuestro clásico reloj de piloto de la época dorada de la aviación.',
        'Une réédition en édition limitée de notre montre d\'aviateur classique de l\'âge d\'or de l\'aviation.'
      ),
      features: isEs
        ? ['Correa Piel', 'Esfera Vintage', 'Cuerda Manual', 'Edición Limitada']
        : isFr
        ? ['Bracelet Cuir', 'Cadran Vintage', 'Remontage Manuel', 'Édition Limitée']
        : ['Leather Strap', 'Vintage Dial', 'Manual Wind', 'Limited Edition']
    },
    {
      id: 'j3',
      title: t('Celestial Ring', 'Anillo Celestial', 'Bague Céleste'),
      price: 6700,
      category: 'jewelry',
      images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2070&auto=format&fit=crop'],
      stock: 4,
      description: t(
        'A deep blue sapphire center stone surrounded by a halo of pave diamonds, set in 18k white gold.',
        'Un zafiro azul profundo central rodeado por un halo de diamantes pavé, engastado en oro blanco de 18k.',
        'Un saphir bleu profond central entouré d\'un halo de diamants pavés, serti sur de l\'or blanc 18k.'
      ),
      features: isEs
        ? ['Zafiro Azul', 'Oro Blanco', 'Engaste Pavé', 'Sin Conflictos']
        : isFr
        ? ['Saphir Bleu', 'Or Blanc', 'Serti Pavé', 'Sans Conflit']
        : ['Blue Sapphire', 'White Gold', 'Pave Setting', 'Conflict-Free']
    }
  ];
};
