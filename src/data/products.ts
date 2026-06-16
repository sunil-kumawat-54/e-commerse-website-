export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  details: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "The Architect Tote",
    price: 485,
    category: "Bags",
    description: "A structured carry-all crafted from full-grain vegetable-tanned leather. Features hand-stitched waxed thread seams and solid brass hardware that patinas beautifully with age.",
    image: "/images/product-01.jpg",
    details: ["Full-grain leather", "Waxed thread stitching", "Brass hardware", "16\" x 12\" x 5\""]
  },
  {
    id: 2,
    name: "Heritage Bifold",
    price: 165,
    category: "Wallets",
    description: "The quintessential wallet. Eight card slots, two bill compartments, and a refined profile that slips effortlessly into any pocket. Hand-burnished edges.",
    image: "/images/product-02.jpg",
    details: ["8 card slots", "2 bill compartments", "Hand-burnished edges", "4.5\" x 3.5\""]
  },
  {
    id: 3,
    name: "Saddle Messenger",
    price: 395,
    category: "Bags",
    description: "A crossbody companion for the daily commute. Adjustable wide strap distributes weight evenly. Flap closure with hidden magnetic snap.",
    image: "/images/product-03.jpg",
    details: ["Adjustable strap", "Magnetic closure", "Interior pocket", "13\" x 9\" x 4\""]
  },
  {
    id: 4,
    name: "Artisan Belt",
    price: 145,
    category: "Accessories",
    description: "Cut from a single strap of bridle leather, this belt features a solid brass buckle and hand-stitched keeper. Built to last decades, not seasons.",
    image: "/images/product-04.jpg",
    details: ["Bridle leather", "Solid brass buckle", "Hand-stitched keeper", "1.5\" width"]
  },
  {
    id: 5,
    name: "Weekender Duffle",
    price: 685,
    category: "Travel",
    description: "The only travel bag you'll ever need. Structured cylindrical body with reinforced leather handles and a removable shoulder strap. Lined in cotton canvas.",
    image: "/images/product-05.jpg",
    details: ["Cotton canvas lining", "Removable strap", "Reinforced handles", "20\" x 11\" x 11\""]
  },
  {
    id: 6,
    name: "Minimal Card Sleeve",
    price: 85,
    category: "Wallets",
    description: "Streamlined essentials. Three card slots and a center pocket for folded bills. The perfect front-pocket companion for the modern minimalist.",
    image: "/images/product-06.jpg",
    details: ["3 card slots", "Center pocket", "Front-pocket fit", "4\" x 2.75\""]
  },
  {
    id: 7,
    name: "Roll-Top Backpack",
    price: 545,
    category: "Bags",
    description: "Architectural form meets daily function. The roll-top closure expands to accommodate extra cargo, while the structured back panel maintains its shape.",
    image: "/images/product-07.jpg",
    details: ["Roll-top closure", "Padded laptop sleeve", "Expandable volume", "18\" x 12\" x 6\""]
  },
  {
    id: 8,
    name: "Executive Briefcase",
    price: 625,
    category: "Bags",
    description: "Command the boardroom. Structured rectangular body with dual brass clasp closures and a leather-wrapped handle. Interior organizer panel included.",
    image: "/images/product-08.jpg",
    details: ["Organizer panel", "Brass clasps", "Leather-wrapped handle", "15\" x 11\" x 4\""]
  },
  {
    id: 9,
    name: "Chronograph Strap",
    price: 95,
    category: "Accessories",
    description: "Hand-stitched leather watch strap with deployant clasp. Available in widths from 18mm to 22mm. The perfect upgrade for any timepiece.",
    image: "/images/product-09.jpg",
    details: ["Deployant clasp", "Quick-release bars", "18-22mm widths", "Hand-stitched"]
  },
  {
    id: 10,
    name: "Passport Folio",
    price: 125,
    category: "Travel",
    description: "Travel with distinction. Holds your passport, boarding passes, and up to four cards. The snap closure keeps everything secure in transit.",
    image: "/images/product-10.jpg",
    details: ["Passport slot", "4 card pockets", "Snap closure", "5.5\" x 4\""]
  },
  {
    id: 11,
    name: "Evening Clutch",
    price: 285,
    category: "Bags",
    description: "An envelope of refined leather for your essentials. The minimalist silhouette conceals a surprisingly spacious interior. Magnetic snap closure.",
    image: "/images/product-11.jpg",
    details: ["Envelope design", "Magnetic snap", "Interior zip pocket", "11\" x 6\""]
  },
  {
    id: 12,
    name: "Key Keeper",
    price: 55,
    category: "Accessories",
    description: "A compact home for your keys. The snap flap prevents pocket jingle, while the brass ring accommodates multiple key sets with ease.",
    image: "/images/product-12.jpg",
    details: ["Snap flap", "Brass ring", "Compact design", "2.5\" x 2\""]
  }
];

export const categories = ["All", "Bags", "Wallets", "Accessories", "Travel"];
