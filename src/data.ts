import { Service, PortfolioProject } from './types';

export const SERVICES: Service[] = [
  {
    id: 'video-editing',
    title: 'Professional Video Editing',
    description: 'Cinematic storytelling, precise pacing, sound design, and color grading for high-end commercials, YouTube videos, and social content.',
    longDescription: 'We transform raw footage into captivating cinematic narratives. Our holistic post-production covers flawless standard trimming, multi-cam synchronization, dynamic sound design, spatial audio mixing, professional color profiles (LUTs), and advanced motion graphics.',
    category: 'editing',
    iconName: 'Video',
    deliverables: ['Cinematic Color Grading', 'Immersive Sound Design & SFX', 'YouTube & Ads Optimizations', 'Dynamic Motion Typography']
  },
  {
    id: 'photo-editing',
    title: 'Photo Editing & Retouching',
    description: 'High-end beauty, fashion, and product retouching. Flawless skin work, frequency separation, and dramatic commercial lighting correction.',
    longDescription: 'Industry-standard editorial post-processing. We utilize non-destructive frequency separation, dodge and burn, flawless color balancing, composite matching, and premium skin retouching to ensure your brand photos look jaw-dropping and high-end.',
    category: 'editing',
    iconName: 'Camera',
    deliverables: ['Professional Skin Retouching', 'Dynamic Product Colorization', 'Studio Lighting Manipulation', 'E-commerce & Print Optimization']
  },
  {
    id: 'brand-identity',
    title: 'Brand Identity Design',
    description: 'Comprehensive design frameworks matching your business goals. Style guidelines, typography libraries, and sensory palettes.',
    longDescription: 'We build consistent brand ecosystems that resonate with premium audiences. From distinct color psychology boards to typographic scale rules and detailed identity manual booklets, we guarantee perfect consistency across all channels.',
    category: 'design',
    iconName: 'Layers',
    deliverables: ['Brand Guideline Playbooks', 'Custom Typography Pairing', 'Comprehensive Visual Assets', 'Corporate Collateral Designs']
  },
  {
    id: 'logo-design',
    title: 'Logo Design & Monograms',
    description: 'Minimalist, memorable, and custom vector logos. Crafting distinctive core symbols that establish immediate authority.',
    longDescription: 'Every great brand starts with a memorable symbol. We combine golden-ratio geometry, custom typography, and deep creative concept iteration to forge logos that are modern, elegant, scalable, and instantly iconic.',
    category: 'design',
    iconName: 'Palette',
    deliverables: ['Original Vector Formats', 'Responsive Logo Variations', 'Exclusive Typography/Monogram', 'Comprehensive Brand Mockups']
  },
  {
    id: 'social-media',
    title: 'Social Media Graphics',
    description: 'Vibrant, high-conversion visual systems tailored for Instagram, LinkedIn, and modern digital feeds to maximize engagement.',
    longDescription: 'Stop the scroll and capture undivided attention. We engineer tailored template frameworks, carousels, stories, and static graphical content designed explicitly around algorithm-boosting visual patterns.',
    category: 'content',
    iconName: 'Share2',
    deliverables: ['Highly Optimized Feed Designs', 'Interactive Multi-page Carousels', 'Engaging Story Visuals', 'Reusable Template Files']
  },
  {
    id: 'youtube-thumbnails',
    title: 'YouTube Thumbnail Design',
    description: 'Ultra-high CTR thumbnails utilizing high-contrast lighting, bold legible typography, and emotional psychology triggers.',
    longDescription: 'A video is only as good as its click-through rate. We blend high-exposure facial cutouts, meticulous light wraps, vibrant backdrops, and minimalist high-impact text elements to maximize your impressions instantly.',
    category: 'content',
    iconName: 'Youtube',
    deliverables: ['High-Contrast Object Outlines', 'Focal Point Shadow Enhancement', 'Readable Bold Typography', 'Multiple CTR A/B Test Variations']
  },
  {
    id: 'marketing-creatives',
    title: 'Marketing Creatives & Ads',
    description: 'High-converting display ads, billboard elements, and digital marketing kits designed to turn user attention into revenue.',
    longDescription: 'Visual communication optimized for raw conversion. We synthesize layouts based on modern call-to-action hierarchies, clean color blocking, and user-centric flows that guide prospects directly to sales outcomes.',
    category: 'content',
    iconName: 'Sparkles',
    deliverables: ['High-Conversion Banner Suites', 'Interactive Email Headers', 'Print-Ready Commercial Posters', 'Digital Ad Creative Bundles']
  }
];

export const PORTFOLIO: PortfolioProject[] = [
  {
    id: 'proj-1',
    title: 'Cinematic Travel Vlog Post-Production',
    category: 'video-editing',
    categoryLabel: 'Video Editing',
    description: 'Sleek, atmospheric color-grading and audio design for a renowned global content creator, yielding a 45% increase in viewer retention.',
    image: '/src/assets/images/portfolio_video_1781314859458.jpg',
    tags: ['4K Video', 'Color Grading', 'Sound Design', 'Pacing'],
    client: 'Alex Mercer (Vlogger)',
    year: '2026'
  },
  {
    id: 'proj-2',
    title: 'Aethelgard Premium Brand Ecosystem',
    category: 'brand-identity',
    categoryLabel: 'Brand Design',
    description: 'A complete typographic, visual, and print-ready identity framework built for an eco-luxury residential project.',
    image: '/src/assets/images/portfolio_brand_1781314871990.jpg',
    tags: ['Brand Guidelines', 'Logo', 'Minimalism', 'Print Mockups'],
    client: 'Aethelgard Living',
    year: '2026'
  },
  {
    id: 'proj-3',
    title: 'Editorial Studio Portrait Retouching',
    category: 'photo-editing',
    categoryLabel: 'Photo Editing',
    description: 'Flawless high-fashion portrait processing highlighting micro-skin texture preservation through frequency separation.',
    image: '/src/assets/images/portfolio_photo_1781314882910.jpg',
    tags: ['Retouching', 'Frequency Separation', 'Fashion', 'Color Correction'],
    client: 'Vogue-Affiliated Studio',
    year: '2026'
  },
  {
    id: 'proj-4',
    title: 'Hyper-Growth Social Content Suite',
    category: 'social-media',
    categoryLabel: 'Social Media',
    description: 'Bold, high-performance visual campaign layout mapping multi-platform promotional products for modern streetwear branding.',
    image: '/src/assets/images/portfolio_social_1781314897506.jpg',
    tags: ['Social Campaign', 'Typography', 'STREETWEAR UI', 'CTR Graphics'],
    client: 'Veloce Apparel',
    year: '2025'
  }
];
