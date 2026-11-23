import imageSizes from "./project-image-sizes.json";
export type ProjectMedia = {
  id: number;
  type: "image" | "video";
  alt: string;
  caption: string;
};
export type Project = {
  slug: string;
  title: string;
  industry: string;
  scope: string;
  subtitle: string;
  cover: number;
  color: string;
  detailImages: [number, number];
  deskImage: number;
  draft: boolean;
  introduction: string;
  brief: string;
  challenge: string;
  solution: string;
  approach: { title: string; text: string }[];
  media: ProjectMedia[];
};
// One source of truth for the project index and case-study routes.
export const projects: Project[] = [
  {
    slug: "candie", title: "Candie", industry: "Fragrance", scope: "Identity · Packaging · Art direction",
    subtitle: "A little nostalgia. A sugar-sweet world.", cover: 2, color: "#f2b9d2", detailImages: [3,9], deskImage: 5, draft: true,
    introduction: "A fragrance world that borrows the joy of a sweet shop. Candy-shaped bottles, soft colour and playful packaging turn a familiar everyday object into something to collect, gift and keep.",
    brief: "Imagine a fragrance collection with the personality of a favourite sweet. Bring the bottles, individual packs and gift set into one expressive world, with a recognisable identity running through every touchpoint.",
    challenge: "Make the candy reference feel immediate while keeping the fragrance itself at the centre. Give each bottle its own character, then bring those different shapes and colours together as a cohesive collection.",
    solution: "A playful wordmark, glossy finishes and a palette of pink, yellow and mint connect the range. Star-shaped and candy-wrapper windows frame the bottles, letting the product become part of the packaging’s graphic language.",
    approach: [
      { title: "Start with a feeling", text: "Sweet-shop nostalgia sets the tone: soft gradients, rounded forms and small star details create a world that feels cheerful and tactile." },
      { title: "Let the shape speak", text: "LollyPop, Jelly Bean and Gummies each have a distinctive silhouette. The packaging gives those forms room to lead, with a shared identity tying the collection together." },
      { title: "Build the whole world", text: "Candy, dessert glassware and dreamlike settings extend the idea beyond the box. From the gift set to the imagery, every composition carries the same playful spirit." },
    ],
    media: [
      { id: 1, type: "image", alt: "Hand carrying a pastel Candie gift set containing three candy-shaped perfume bottles", caption: "The collection, ready to carry." },
      { id: 2, type: "image", alt: "Front of the Candie gift set with a candy-wrapper shaped window and three perfume bottles", caption: "One box. Three little personalities." },
      { id: 3, type: "image", alt: "Arcade claw lifting the pink and yellow Candie gift set", caption: "A playful take on the product reveal." },
      { id: 4, type: "video", alt: "Candie project motion film", caption: "Candie in motion." },
      { id: 5, type: "image", alt: "Striped pink LollyPop perfume bottle beside its star-window packaging", caption: "LollyPop — a star of its own." },
      { id: 6, type: "image", alt: "Pink LollyPop perfume bottle on a glass cake stand surrounded by sweets", caption: "A sugar-sweet still life." },
      { id: 7, type: "image", alt: "LollyPop packaging floating among clouds, lollipops and marshmallows", caption: "A world with its head in the clouds." },
      { id: 8, type: "image", alt: "Yellow and pink Candie bottles on a red tray with a cocktail glass", caption: "A different kind of dessert." },
      { id: 9, type: "image", alt: "Yellow Jelly Bean perfume bottle in a sundae glass with pastel sweets", caption: "Jelly Bean, served with a little imagination." },
      { id: 10, type: "image", alt: "Yellow Jelly Bean perfume bottle on a pink glass stand with candy", caption: "Colour, shape and a little nostalgia." },
      { id: 11, type: "image", alt: "Front view of pink LollyPop packaging with a star-shaped window", caption: "The window becomes the identity." },
    ],
  },
  {
  "slug": "butter-baby",
  "title": "Butter Baby",
  "industry": "Bakery",
  "scope": "Identity · Packaging · Print",
  "subtitle": "A generous helping of everyday joy.",
  "cover": 5,
  "color": "#f9d95f",
  "detailImages": [
    2,
    7
  ],
  "deskImage": 5,
  "draft": true,
  "introduction": "A warm, tactile identity for the small pleasure of something freshly baked. Butter-yellow packaging, soft handwritten details and a little cloche illustration make every box feel like a gift.",
  "brief": "Create a bakery world that feels personal, generous and easy to recognise, from the first glimpse of a shopfront to the last cookie in the box.",
  "challenge": "Balance an expressive name and playful details with the quiet simplicity that lets the food itself look delicious.",
  "solution": "A flowing wordmark, a butter-dish motif and a warm yellow-and-cream palette carry across boxes, translucent wraps, cards and signage.",
  "approach": [
    {
      "title": "Find the warmth",
      "text": "Start with the familiar textures of a bakery: crinkled foil, warm paper and the soft shapes of something made by hand."
    },
    {
      "title": "Make a small signature",
      "text": "The cloche illustration becomes a repeatable brand detail, paired with loose lettering and a compact monogram."
    },
    {
      "title": "Wrap up the feeling",
      "text": "Use the same thoughtful touches across tissue, takeaway bags and gift boxes, with plenty of space for the treats to shine."
    }
  ],
  "media": [
    {
      "id": 1,
      "type": "image",
      "alt": "Embossed Butter Baby wordmark on butter wrapped in foil",
      "caption": "A buttery first impression."
    },
    {
      "id": 2,
      "type": "image",
      "alt": "Cookies with a translucent Butter Baby card on a plum background",
      "caption": "A little transparency. A lot of personality."
    },
    {
      "id": 3,
      "type": "image",
      "alt": "Cream brand card and apple tart on branded tissue",
      "caption": "The small details make the ritual."
    },
    {
      "id": 4,
      "type": "image",
      "alt": "Cookie in a translucent bag with a yellow butter-dish illustration",
      "caption": "A treat, beautifully wrapped."
    },
    {
      "id": 5,
      "type": "image",
      "alt": "Open yellow Butter Baby box filled with cookies and printed tissue",
      "caption": "Good things come by the box."
    },
    {
      "id": 6,
      "type": "image",
      "alt": "Illuminated Butter Baby storefront signage",
      "caption": "A warm welcome from the street."
    },
    {
      "id": 7,
      "type": "image",
      "alt": "Portrait composition of branded butter in foil",
      "caption": "A mark you can almost taste."
    },
    {
      "id": 8,
      "type": "image",
      "alt": "Cookies and translucent brand card in a portrait composition",
      "caption": "Made to be shared."
    }
  ]
},
  {
  "slug": "main-character-coffee",
  "title": "Main Character Coffee",
  "industry": "Coffee & culture",
  "scope": "Identity · Packaging · Brand experience",
  "subtitle": "Coffee with a little main-character energy.",
  "cover": 7,
  "color": "#b6d5f0",
  "detailImages": [
    2,
    14
  ],
  "deskImage": 4,
  "draft": true,
  "introduction": "A coffee world with a playful point of view. Cherry red, powder blue and soft pink connect expressive cups, takeaway carriers and a mobile coffee bar, turning an everyday stop into a small occasion.",
  "brief": "Imagine a recognisable coffee identity that can live on a cup, travel in a hand and take over a whole coffee trailer.",
  "challenge": "Bring an eclectic set of references together without losing clarity. Make the experience feel expressive at every scale, from a tiny loyalty stamp to a large sign.",
  "solution": "Stripes, heart shapes and a confident wordmark build a flexible graphic language. Photography and playful props give the whole system an unmistakable personality.",
  "approach": [
    {
      "title": "Set the scene",
      "text": "Colour leads the mood: cool blue and candy pink meet bold red for a lively, instantly recognisable combination."
    },
    {
      "title": "Build the everyday pieces",
      "text": "Cups, carriers, loyalty cards and aprons turn the graphic language into objects people can use and keep."
    },
    {
      "title": "Take it into the world",
      "text": "A coffee trailer, tactile signage and styled imagery make the brand feel like a place to step into."
    }
  ],
  "media": [
    {
      "id": 1,
      "type": "image",
      "alt": "Iced coffee with a blue clover lid card, sunglasses and disco ball",
      "caption": "Coffee worth remembering."
    },
    {
      "id": 2,
      "type": "image",
      "alt": "Hand holding iced coffee in a striped sleeve with a flamingo keychain",
      "caption": "A little character to take away."
    },
    {
      "id": 3,
      "type": "image",
      "alt": "Matcha cups, flowers and pink printed cards",
      "caption": "The supporting cast."
    },
    {
      "id": 4,
      "type": "image",
      "alt": "Pink two-cup carrier with red cups and a flamingo toy",
      "caption": "Two is good company."
    },
    {
      "id": 5,
      "type": "image",
      "alt": "Pink foam matcha beside loyalty cards and a retro radio",
      "caption": "A fresh perspective on the coffee break."
    },
    {
      "id": 6,
      "type": "image",
      "alt": "Two hands holding matcha in striped cups",
      "caption": "Made for shared moments."
    },
    {
      "id": 7,
      "type": "image",
      "alt": "Blue Main Character Coffee trailer with a red and pink heart marquee",
      "caption": "The whole world, on wheels."
    },
    {
      "id": 8,
      "type": "image",
      "alt": "Pink coffee carrier against blue clothing",
      "caption": "A brand that travels well."
    },
    {
      "id": 9,
      "type": "image",
      "alt": "Hands holding blue loyalty cards",
      "caption": "A reason to come back."
    },
    {
      "id": 10,
      "type": "image",
      "alt": "Two hot cups with stripes and flamingo details",
      "caption": "A pair of personalities."
    },
    {
      "id": 11,
      "type": "image",
      "alt": "Clear drink carriers with keychains against a pink sweater",
      "caption": "More than a takeaway."
    },
    {
      "id": 12,
      "type": "image",
      "alt": "Marquee sign and sculptural coffee cup beside a wavy mirror",
      "caption": "A corner with character."
    },
    {
      "id": 13,
      "type": "image",
      "alt": "Suspended business cards with red clips and coffee props",
      "caption": "Small pieces of the bigger story."
    },
    {
      "id": 14,
      "type": "image",
      "alt": "Matcha being whisked beside a striped branded apron",
      "caption": "In the making."
    },
    {
      "id": 15,
      "type": "image",
      "alt": "Tray of three iced drinks and flowers outdoors",
      "caption": "Your everyday, with a little extra."
    }
  ]
},
  {
  "slug": "alamari",
  "title": "Alamāri",
  "industry": "Textiles & lifestyle",
  "scope": "Identity · Illustration · Print",
  "subtitle": "A wardrobe of timeless treasures.",
  "cover": 3,
  "color": "#e8b93f",
  "detailImages": [
    2,
    6
  ],
  "deskImage": 7,
  "draft": true,
  "introduction": "An identity built around the wardrobe as a keeper of memories. Graceful lettering, illustrated craft details and rich textile colours create a world that feels intimate, considered and full of stories.",
  "brief": "Develop a visual world for a textile brand that celebrates the emotional connection between what we wear and what we keep.",
  "challenge": "Express a sense of heritage with restraint, allowing the textures, colours and craft of the textiles to remain central.",
  "solution": "A distinctive wordmark and wardrobe illustration anchor the identity. Botanical, animal and embroidery motifs extend it across cards, tags and a simple cloth tote.",
  "approach": [
    {
      "title": "Begin with a memory",
      "text": "The wardrobe becomes the central metaphor: a place for favourite pieces, familiar textures and stories carried forward."
    },
    {
      "title": "Draw the details",
      "text": "A thread-holding tiger, embroidery hoop and draped chair add character to a flexible illustration family."
    },
    {
      "title": "Let the material lead",
      "text": "Restrained layouts on cream paper and cloth make room for colour and textile texture to tell the story."
    }
  ],
  "media": [
    {
      "id": 1,
      "type": "image",
      "alt": "Magenta and marigold Alamāri brand cards over sari fabric and flower petals",
      "caption": "A wardrobe of timeless treasures."
    },
    {
      "id": 2,
      "type": "image",
      "alt": "Cream embossed hangtag resting on green fabric and jasmine",
      "caption": "A considered finishing touch."
    },
    {
      "id": 3,
      "type": "image",
      "alt": "Hand holding an Alamāri card against fuchsia mirror-work fabric",
      "caption": "A name held close."
    },
    {
      "id": 4,
      "type": "image",
      "alt": "Alamāri wordmark bands over a woman wearing a pink sari",
      "caption": "Colour with a story to tell."
    },
    {
      "id": 5,
      "type": "image",
      "alt": "Layered translucent editorial cards with illustrations and photography",
      "caption": "Little pieces of memory."
    },
    {
      "id": 6,
      "type": "image",
      "alt": "Green illustrations of a tiger, embroidery hoop, ornamental creature and draped chair",
      "caption": "A vocabulary of craft and everyday beauty."
    },
    {
      "id": 7,
      "type": "image",
      "alt": "Cream tote with maroon wardrobe illustration and Alamāri wordmark",
      "caption": "Something to carry forward."
    }
  ]
},
  {
  "slug": "the-real-chai-company",
  "title": "The Real Chai Company",
  "industry": "Tea & ritual",
  "scope": "Identity · Packaging · Illustration",
  "subtitle": "Where every cup is a journey.",
  "cover": 6,
  "color": "#a7af78",
  "detailImages": [
    3,
    5
  ],
  "deskImage": 6,
  "draft": true,
  "introduction": "A richly illustrated world for the ritual of chai. Botanical patterns, expressive lettering and warm colours connect the packaging with the everyday pleasure of slowing down over a cup.",
  "brief": "Create a cohesive identity and packaging world that brings the warmth, character and social ritual of chai into every touchpoint.",
  "challenge": "Balance intricate illustration with clear information. Carry the same personality from a cylindrical tea tin to a menu, a brewing card and a storefront.",
  "solution": "Cream, deep red and leafy greens frame an expressive bilingual wordmark. Floral and animal motifs wrap the tins, while ornamental borders and small line illustrations unify the printed pieces.",
  "approach": [
    {
      "title": "Start with the ritual",
      "text": "The idea centres on warmth and connection, using familiar cups, kettles and shared moments as visual cues."
    },
    {
      "title": "Create a living pattern",
      "text": "Flowers, leaves, birds and animals form a detailed pattern that gives the packaging a distinctive presence."
    },
    {
      "title": "Follow the whole journey",
      "text": "Menus, brewing cards, loyalty pieces and environmental graphics extend the identity beyond the product."
    }
  ],
  "media": [
    {
      "id": 1,
      "type": "image",
      "alt": "Cream and red chai menu on a clipboard among green plants",
      "caption": "A menu with a sense of place."
    },
    {
      "id": 2,
      "type": "image",
      "alt": "Illuminated outdoor billboard showing illustrated tea tins on moss",
      "caption": "The packaging, out in the world."
    },
    {
      "id": 3,
      "type": "image",
      "alt": "Close-up of a red box with a cream bilingual chai wordmark",
      "caption": "The name, full of character."
    },
    {
      "id": 4,
      "type": "image",
      "alt": "Brand story panels with chai, biscuits, illustrations and typography",
      "caption": "Real chai. Real connections."
    },
    {
      "id": 5,
      "type": "image",
      "alt": "Two printed brewing cards with illustrated steps and decorative borders",
      "caption": "A guide to the everyday ritual."
    },
    {
      "id": 6,
      "type": "image",
      "alt": "Floral and animal-patterned masala chai tins with red lids",
      "caption": "A little world wrapped around a tin."
    },
    {
      "id": 7,
      "type": "image",
      "alt": "Cream and yellow roller banner with an illustrated couple sharing chai",
      "caption": "An invitation to share a cup."
    },
    {
      "id": 8,
      "type": "image",
      "alt": "Collage of loyalty cards, tea tins, cups and storefront applications",
      "caption": "One identity, many moments."
    },
    {
      "id": 9,
      "type": "image",
      "alt": "Green and cream chai storefront awning with a peacock and kettle illustration",
      "caption": "The ritual begins at the door."
    }
  ]
},
];
export function mediaPath(slug: string, id: number, width = 1920) {
  return `/projects/${slug}/${id}-${width}.webp`;
}

export function mediaSize(slug: string, id: number) {
  return (imageSizes as Record<string, { width: number; height: number }>)[`${slug}/${id}`] ?? {width:1920,height:1080};
}
