import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// 6 Core Stories established by user in Marathi/Hinglish
const CORE_STORIES = [
  {
    image: '/photos/photo1.jpg',
    filename: 'photo1.jpg',
    title: 'That Little Moment of Care',
    caption: 'I still remember that moment when you cared for me so genuinely.',
    description: 'Te bg tya veli tithe tu mala tila lavlas dokyala athavty te? Tu Mazi care kartes mana pasun. Those little things showed me your pure heart.',
    date: 'That Special Day',
    location: 'Moments With You',
    animation: 'fade',
    category: 'core',
    highlight: true,
    storySnippet: 'I still remember that moment when you cared for me and did that for me. Those little things showed me that your care comes genuinely from your heart.'
  },
  {
    image: '/photos/photo2.jpg',
    filename: 'photo2.jpg',
    title: 'That Sweet Prayer For Me',
    caption: 'You care about me so much that you even pray to God to reduce my laziness.',
    description: 'Majya sathi devala pn sangl ki mala akkl de mhanun ani als kami kar maza 😂 Only you can care for me like this, my baby.',
    date: 'A Little Moment',
    location: 'Things I’ll Never Forget',
    animation: 'slide-left',
    category: 'core',
    highlight: true,
    storySnippet: 'You care about me so much that you even ask God to give me some sense and reduce my laziness 😂.'
  },
  {
    image: '/photos/photo4.jpg',
    filename: 'photo4.jpg',
    title: 'That Cozy Little Food Moment',
    caption: 'I was upset and wasn’t eating... then you brought me food with so much love.',
    description: 'Nantr yetana apn bnadlelo tevha mi ruslelo ky khat nahi hoto care madhe baslelo tu mala vadapav anla ky mast vatlel mala baby te tu dilas mhanun mi khalela 💙',
    date: 'That Evening',
    location: 'Little Things That Mean Everything',
    animation: 'slide-right',
    category: 'core',
    highlight: true,
    storySnippet: 'I remember when I was upset and wasn’t eating. You brought me food because you cared about me. Baby, it felt so good. I ate it because you brought it for me.'
  },
  {
    image: '/photos/photo5.jpg',
    filename: 'photo5.jpg',
    title: 'Tension Nako Gheu, Me Aahe',
    caption: 'When you held me close and whispered that everything would be okay.',
    description: 'Ani jevha tya veli tu mala kushit ghetlelas tevha mhanay chi jast tention nako gheu me aahe mhanun 🫂 That moment meant the entire world to me.',
    date: 'That Comfort',
    location: 'Moments I’ll Always Remember',
    animation: 'rotate',
    category: 'core',
    highlight: true,
    storySnippet: 'When you held me close and told me not to take so much tension because you were there, that moment meant a lot to me.'
  },
  {
    image: '/photos/mem_01.jpg',
    filename: 'mem_01.jpg',
    title: 'The Moment of Deep Trust',
    caption: 'You cried in my arms, and in that moment I knew how deeply you trust me.',
    description: 'Ani tu Mazya kushat rdt hoi baby asa vatla tuza Mazya var khup trust aahe mhnun radlis. I promise to protect that trust with my life.',
    date: 'A Quiet Evening',
    location: 'Our Memories',
    animation: 'flip-3d',
    category: 'core',
    highlight: true,
    storySnippet: 'You cried in my arms, and somewhere in that moment I realized how much you trust me.'
  },
  {
    image: '/photos/mem_05.jpg',
    filename: 'mem_05.jpg',
    title: 'How Important You Made Me Feel',
    caption: 'Knowing my baby trusts me with her whole world made me feel so special.',
    description: 'Bhai mala life madhe khup moth kelya sarkh vatat hot Mazi baby jicha Mazya vr khup khup khup trust aahe 🤌🏻 That feeling meant more to me than words can ever say.',
    date: 'Unforgettable Day',
    location: 'Moments With You',
    animation: 'blur-zoom',
    category: 'core',
    highlight: true,
    storySnippet: 'That moment made me feel like I had become something really important in your life. My baby trusted me so much, and that feeling meant more to me than I can explain.'
  }
];

// 6 Dedicated Videos
const VIDEOS = [
  {
    filename: 'video_01.mp4',
    url: '/videos/video_01.mp4',
    image: '/photos/photo3.jpg',
    mediaType: 'video',
    videoUrl: '/videos/video_01.mp4',
    layoutSpan: 'wide',
    title: 'Our Moments on Video 🎥',
    caption: 'Every time I watch you smile in this clip, my heart melts.',
    description: 'A candid video of my favorite girl. Watching you smile and laugh naturally brings an unexplainable calm to my soul.',
    date: 'Candid Clip',
    location: 'Our Little Moments',
    animation: 'blur-zoom',
    category: 'video',
    highlight: true,
    storySnippet: 'Watching you on video just being your natural, cute self reminds me why you are my whole world.'
  },
  {
    filename: 'video_02.mp4',
    url: '/videos/video_02.mp4',
    image: '/photos/mem_02.jpg',
    mediaType: 'video',
    videoUrl: '/videos/video_02.mp4',
    layoutSpan: 'tall',
    title: 'Your Childish Laugh 🫶🏻',
    caption: 'Tu khuppp god aahes mast ekdum hasmukh childish 🤌🫶',
    description: 'Your pure, innocent laugh in this clip is something I could listen to on repeat forever. Truly my favorite melody.',
    date: 'Pure Smiles',
    location: 'Moments I’ll Always Remember',
    animation: 'rotate',
    category: 'video',
    highlight: true,
    storySnippet: 'Nobody laughs or makes faces as adorably as you. You are my sunshine.'
  },
  {
    filename: 'video_03.mp4',
    url: '/videos/video_03.mp4',
    image: '/photos/mem_03.jpg',
    mediaType: 'video',
    videoUrl: '/videos/video_03.mp4',
    layoutSpan: 'normal',
    title: 'A Memory I’ll Never Forget 💙',
    caption: 'Little things that mean everything to me.',
    description: 'Replaying this memory reminds me why I’m the luckiest person in the world. Just you and me living in the present.',
    date: 'Sweet Memories',
    location: 'Things I’ll Never Forget',
    animation: 'floating',
    category: 'video',
    highlight: false,
    storySnippet: 'A memory I keep close to my chest whenever I miss you.'
  },
  {
    filename: 'video_04.mp4',
    url: '/videos/video_04.mp4',
    image: '/photos/mem_04.jpg',
    mediaType: 'video',
    videoUrl: '/videos/video_04.mp4',
    layoutSpan: 'normal',
    title: 'Pure Joy With You 💙',
    caption: 'Khup Mazya yete mala tuzya sobat.',
    description: 'The way you look at me and make me laugh no matter what kind of day I had.',
    date: 'Joyful Moments',
    location: 'Our Little Moments',
    animation: 'polaroid',
    category: 'video',
    highlight: true,
    storySnippet: 'When I am with you, all worries fade away.'
  },
  {
    filename: 'video_05.mp4',
    url: '/videos/video_05.mp4',
    image: '/photos/mem_06.jpg',
    mediaType: 'video',
    videoUrl: '/videos/video_05.mp4',
    layoutSpan: 'wide',
    title: 'My Favorite Girl Being Herself ✨',
    caption: 'Tu nastis tr mi pagal hoin yaar 🥺',
    description: 'A special video snippet captured forever in our digital scrapbook. My baby looking effortlessly gorgeous.',
    date: 'Unforgettable Clip',
    location: 'Moments With You',
    animation: 'slide-left',
    category: 'video',
    highlight: true,
    storySnippet: 'Seeing you happy is my greatest peace.'
  },
  {
    filename: 'video_06.mp4',
    url: '/videos/video_06.mp4',
    image: '/photos/mem_07.jpg',
    mediaType: 'video',
    videoUrl: '/videos/video_06.mp4',
    layoutSpan: 'normal',
    title: 'Forever My Yedu 💙',
    caption: 'Just stay happy every single second, baby.',
    description: 'I will always be there for you, in every situation, just like in this memory.',
    date: 'Precious Clip',
    location: 'Things I’ll Never Forget',
    animation: 'fade',
    category: 'video',
    highlight: true,
    storySnippet: 'Happy Birthday, my precious girl.'
  }
];

// Rich curated themes for remaining photos
const ROMANTIC_TITLES = [
  'The Smile That Heals Me',
  'Little Conversations & Big Smiles',
  'The Calm in Your Eyes',
  'Childish & Beautiful',
  'Always By Your Side',
  'Kindest Soul I Know',
  'Golu Ye Mhan',
  'Words Aren’t Enough',
  'My Whole Life',
  'A Glimpse of Perfection',
  'The Best Chapter',
  'My Favorite Adventure',
  'A Heart of Gold',
  'Endless Smile',
  'Born on 9 October 💙',
  'Moments With You',
  'Things I’ll Never Forget',
  'Little Things That Mean Everything',
  'Unfiltered Innocence',
  'The Way You Look At Me',
  'Peace in Chaos',
  'My Favorite Human',
  'Pure Hugs & Warmth',
  'The Sweetest Laughter',
  'Every Second Counts',
  'You Made Me Feel Loved',
  'Forever My Baby',
  'Starlight in Your Eyes',
  'Soft Moments of Joy',
  'Golden Afternoon Smiles',
  'Our Little Secret World',
  'Just You and Me',
  'My Peaceful Harbor',
  'Pure Love, Zero Filters',
  'Your Beautiful Face',
  'Cutest Natkhat Expressions',
  'The Day I Realized',
  'Quiet Promises',
  'Holding Your Hand',
  'The OG Smile Reborn',
  'Forever Thankful For You',
  'My Favorite Birthday Girl',
  'A Heart Full of Care',
  'Simple Days, Perfect Memories',
  'Sweet Whispers & Teasing',
  'The Sunshine of My Days',
  'Infinite Forehead Kisses',
  'Deepest Comfort',
  'Together is My Favorite Place',
  'October Starlight',
  'My Whole Heart 💙'
];

const ROMANTIC_CAPTIONS = [
  'Ur the person that brought my smile back the og one.',
  'Khup Mazya yete mala tuzya sobat.',
  'Tuzya mule mala peace milali thanx you so so much.',
  'Tu khuppp god aahes mast ekdum hasmukh childish 🤌🫶',
  'I am always with you in every situation 🫶🏻',
  'U r kind hearted I never see the person like you fr i swear 🤍',
  'Just golu ye mhan mag lagech tuzya madatila hajar.',
  'Words nahit aahe express karnya sathi yevdhi tu mast chan aahes yaaar.',
  'Tu naslis tr mi tr pagal hoin yaar 🥺',
  'Khup god aahes tu yedu 🫶',
  'Thank you for coming into my life and giving me peace 💙',
  'Anywhere with you is where I want to be 🌊',
  'U r kind hearted fr i swear 🤍',
  'Keep smiling 🫶🏻 you look the most beautiful.',
  'Happy Birthday, My Baby 🎂💙',
  'Every second with you is a gift.',
  'Forever grateful for you, my baby.',
  'Small smiles, big memories.',
  'Tu khup natkhat ani god aahes baby 🤌🏻',
  'Tuzya hasnyane maza divas banun jato.',
  'No one understands me like you do 💙',
  'I see my entire future in your eyes.',
  'Your happiness is my highest priority in life.',
  'Majya sathi tu khup special aahes, baby.',
  'Tuzya sobat aslo ki sagla tension gayab hoto.',
  'Always my favorite notification, my favorite voice, my favorite person.',
  'Kinde aahe tu khupp yaarr sachhi 🫶🏻',
  'Golu is always right here by your side.',
  '9 October — the best day of the year.',
  'Forever and always, my baby girl 💙'
];

const ROMANTIC_DESCRIPTIONS = [
  'Every time I look at this photo, I remember how lucky I am to have you.',
  'Hours feel like minutes whenever we are talking and laughing together.',
  'Whenever life feels chaotic, just looking at you brings quiet peace to my mind.',
  'Never lose this innocence, Yedu. It is the most beautiful thing about you.',
  'In every high and low, you will never have to face anything alone.',
  'The way you care about people and love without expecting anything in return.',
  'One call, one whisper, and I’ll always be right there for you.',
  'Sometimes words fail to describe how much you truly mean to me.',
  'You’ve woven yourself into every heartbeat and every dream of mine.',
  'Every little habit and expression of yours is etched into my memory.',
  'Being loved by you is the greatest privilege I could ever ask for.',
  'Sharing food, talking nonsense, or just sitting in silence—it is all perfect.',
  'Your gentleness is something the world needs more of.',
  'Your joy is my favorite blessing in this world.',
  'Celebrating you today, tomorrow, and every single day forever.',
  'A quiet reminder of how sweet life became with you in it.',
  'Holding on to these memories like treasures.',
  'Life feels complete when you are smiling beside me.',
  'A cute candid capture of your purest self.',
  'Looking back at these moments brings an instant smile to my face.',
  'The purest definition of home is wherever you are.',
  'Nothing compares to the comfort of your presence.',
  'Every detail of this memory is etched in my heart forever.'
];

const ANIMATION_TYPES = ['fade', 'slide-left', 'slide-right', 'rotate', 'flip-3d', 'blur-zoom', 'polaroid', 'floating'];

async function buildAllMemories() {
  const photosDir = path.join(process.cwd(), 'public', 'photos');
  const allPhotoFiles = fs.readdirSync(photosDir)
    .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
    .sort();

  console.log(`Found ${allPhotoFiles.length} photos in public/photos`);

  const mediaList = [];
  let idCounter = 1;

  // 1. Add Core Stories (Photos 1, 2, 4, 5, mem_01, mem_05)
  const coreMap = new Map();
  CORE_STORIES.forEach(cs => coreMap.set(cs.filename, cs));

  // 2. Add Videos
  VIDEOS.forEach(v => {
    mediaList.push({
      id: idCounter,
      displayOrder: idCounter,
      filename: v.filename,
      url: v.url,
      image: v.image,
      mediaType: 'video',
      videoUrl: v.videoUrl,
      layoutSpan: v.layoutSpan,
      title: v.title,
      caption: v.caption,
      description: v.description,
      date: v.date,
      location: v.location,
      animation: v.animation,
      category: 'video',
      highlight: v.highlight,
      storySnippet: v.storySnippet,
      isPortrait: false,
      aspectRatio: '16/9'
    });
    idCounter++;
  });

  // 3. Process every photo in public/photos
  for (let i = 0; i < allPhotoFiles.length; i++) {
    const filename = allPhotoFiles[i];
    const fullPath = path.join(photosDir, filename);
    const meta = await sharp(fullPath).metadata();
    const isPortrait = (meta.height || 0) > (meta.width || 0);
    const aspectRatio = isPortrait ? '3/4' : '4/3';

    if (coreMap.has(filename)) {
      const core = coreMap.get(filename);
      mediaList.push({
        id: idCounter,
        displayOrder: idCounter,
        filename,
        url: `/photos/${filename}`,
        image: `/photos/${filename}`,
        mediaType: 'photo',
        layoutSpan: isPortrait ? 'tall' : 'featured',
        title: core.title,
        caption: core.caption,
        description: core.description,
        date: core.date,
        location: core.location,
        animation: core.animation,
        category: 'core',
        highlight: true,
        storySnippet: core.storySnippet,
        isPortrait,
        aspectRatio
      });
      idCounter++;
      continue;
    }

    // Default curated values
    const title = ROMANTIC_TITLES[i % ROMANTIC_TITLES.length];
    const caption = ROMANTIC_CAPTIONS[i % ROMANTIC_CAPTIONS.length];
    const description = ROMANTIC_DESCRIPTIONS[i % ROMANTIC_DESCRIPTIONS.length];
    const animation = ANIMATION_TYPES[i % ANIMATION_TYPES.length];
    const layoutSpan = isPortrait ? (i % 3 === 0 ? 'tall' : 'normal') : (i % 4 === 0 ? 'wide' : 'normal');
    const category = (i % 5 === 0) ? 'special' : 'candid';
    const highlight = i % 7 === 0;

    mediaList.push({
      id: idCounter,
      displayOrder: idCounter,
      filename,
      url: `/photos/${filename}`,
      image: `/photos/${filename}`,
      mediaType: 'photo',
      layoutSpan,
      title,
      caption,
      description,
      date: 'Our Sweet Moments',
      location: 'Little Things That Mean Everything',
      animation,
      category,
      highlight,
      storySnippet: description,
      isPortrait,
      aspectRatio
    });
    idCounter++;
  }

  console.log(`Generated total ${mediaList.length} media records (photos + videos)`);
  fs.writeFileSync('scripts/generated_media.json', JSON.stringify(mediaList, null, 2));
  console.log('Saved to scripts/generated_media.json');
}

buildAllMemories().catch(console.error);
