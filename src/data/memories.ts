import { Memory, StoryTimelineItem, LoveReason, SecretLetter, BirthdayLetterData, OctoberData, QuizQuestion } from '@/types';

/**
 * =========================================================================
 * 🎂 SITE CONFIGURATION & 9 OCTOBER BIRTHDAY DETAILS
 * =========================================================================
 */
export const siteConfig = {
  girlfriendName: 'Yedu',
  nickname: 'Baby',
  heroPreTitle: '09 • 10 — Today Is For My Favorite Girl 🎂 💙',
  heroMainTitle: 'Happy Birthday, My Yedu 💙',
  heroSubtitle: 'My Baby. My Favorite Girl. My Happiness.',
  heroDateLine: '9 October will always be special to me.',
  heroSmallLine: 'Born on 9 October. My favorite date in my favorite month. 🫶🏻',
  ctaButtonText: 'Open Your Birthday Surprise 🎂',

  octoberTitle: 'October Became Special Because of You 💙',
  octoberQuote: 'Before you, October was just another month. Now October will always remind me of you.',
  octoberSubQuote: 'Born on 9 October. My favorite date in my favorite month. 🫶🏻',

  storyTitle: 'Our Little Moments 💙',
  storyQuote: 'Some people come into your life unexpectedly... and somehow become your entire world.',

  galleryTitle: 'Our Little Moments 💙',
  gallerySubtitle: 'Moments I’ll always remember, things I’ll never forget, and little things that mean everything.',

  spotlightTitle: 'The Girl Who Holds My Heart',
  spotlightSubtitle: 'Moments with you that I replay in my mind every single day.',

  reasonsTitle: 'You Changed Me 💙',
  reasonsSubtitle: 'All the quiet, beautiful ways you brought my world back to life.',

  myYeduTitle: 'My Yedu 🫶🏻',
  myYeduSubtitle: 'Nobody makes me smile the way you do.',

  quizzesTitle: 'How Well Do We Know Us? 👀',
  quizzesSubtitle: 'A little cute & playful quiz just for my birthday girl...',

  gameTitle: 'Okay... One Important Question For The Birthday Girl 👀',
  gameQuestion: 'Do you know how much I love you?',
  gameYesText: 'Yes 💙',
  gameNoText: 'No 😏',
  gameSuccessTitle: 'Correct answer, my baby! 🥰🎂',
  gameSuccessMessage: 'You get unlimited hugs, forehead kisses, and lifetime love. 🤗💙',

  carouselTitle: 'Our Memory Reel 💙',
  carouselSubtitle: 'Swipe through all the beautiful chapters of us.',

  secretTeaser: 'A Little Birthday Secret For You...',
  secretButton: 'Open the Secret Letter 💌',

  finalTitle: 'Happy Birthday, My Yedu 💙',
  finalSubtitle: '9 October — my favorite date.',
  footerText: 'Made with 💙 just for my Yedu.'
};

/**
 * =========================================================================
 * 🍁 9 OCTOBER SPECIAL SECTION DATA
 * =========================================================================
 */
export const octoberData: OctoberData = {
  heading: 'October Became Special Because of You 💙',
  quote: 'Before you, October was just another month. Now October will always remind me of you.',
  subQuote: 'Born on 9 October. My favorite date in my favorite month. 🫶🏻',
  month: 'October',
  dayNumber: 9,
  formattedDate: '09 • 10',
  specialDate: '9 October 💙',
  note: '9 October — the day my favorite person came into this world. Before you, October was just another month on a calendar. But now, it is the most sacred, joyful month of my year.'
};

/**
 * =========================================================================
 * 💌 MAIN BIRTHDAY MESSAGE (EMOTIONAL LETTER)
 * =========================================================================
 * Kept completely authentic in your personal Marathi/Hinglish wording!
 */
export const birthdayLetter: BirthdayLetterData = {
  heading: 'To My Beautiful Baby 💙',
  paragraphs: [
    'Happiest birthday to my beautiful baby you are precious to me 💗 please be happy every sec I am always with you in every situation.',
    'Just golu ye mhan mag lagech tuzya madatila hajar.',
    'Thanks to you for coming into my life you made me so happy with your presence u make me feel loved 🤌🏻🫶🏻 thanks tu mala love kelas tuzya mule mala peace milali thanx you so so much.',
    'I am always with you baby 🫶🏻',
    'Keep smiling 🫶🏻'
  ],
  closing: [
    'Just Love you more more more my baby 😘',
    'Forever & Always Your Person 💙'
  ]
};

/**
 * =========================================================================
 * 💙 "YOU CHANGED ME" REASONS & QUOTES
 * =========================================================================
 */
export const loveReasons: LoveReason[] = [
  {
    id: 1,
    title: 'Brought My Smile Back',
    emoji: '😊',
    message: 'Ur the person that brought my smile back the og one.',
    originalQuote: 'Ur the person that brought my smile back the og one.',
    colorAccent: 'from-blue-600 to-sky-400'
  },
  {
    id: 2,
    title: 'Kindest Heart I Have Ever Seen',
    emoji: '🤍',
    message: 'U r kind hearted I never see the person like you fr i swear.',
    originalQuote: 'U r kind hearted I never see the person like you fr i swear.',
    colorAccent: 'from-sky-500 to-indigo-500'
  },
  {
    id: 3,
    title: 'Made Me Trust Again',
    emoji: '🤝',
    message: 'Ur the reason brought my trust again.',
    originalQuote: 'Ur the reason brought my trust again.',
    colorAccent: 'from-blue-700 to-cyan-500'
  },
  {
    id: 4,
    title: 'Ekdum Childish & Natkhat',
    emoji: '🤌',
    message: 'Tu khuppp god aahes mast ekdum hasmukh childish 🤌🫶 natkhat pn',
    originalQuote: 'Tu khuppp god aahes mast ekdum hasmukh childish 🤌🫶 natkhat pn',
    colorAccent: 'from-indigo-600 to-sky-400'
  },
  {
    id: 5,
    title: 'Khup Maja Yete',
    emoji: '✨',
    message: 'Khup Mazya yete mala tuzya sobat.',
    originalQuote: 'Khup Mazya yete mala tuzya sobat',
    colorAccent: 'from-cyan-600 to-blue-500'
  },
  {
    id: 6,
    title: 'Kind Aahes Tu Khup',
    emoji: '🌸',
    message: 'Kinde aahe tu khupp yaarr sachhi.',
    originalQuote: 'Kinde aahe tu khupp yaarr sachhi',
    colorAccent: 'from-blue-500 to-teal-400'
  },
  {
    id: 7,
    title: 'Words Nahit Express Karayla',
    emoji: '💌',
    message: 'Words nahit aahe express karnya sathi yevdhi tu mast chan aahes yaaar.',
    originalQuote: 'Words nahit aahe express karnya sathi yevdhi tu mast chan aahes yaaar',
    colorAccent: 'from-sky-600 to-blue-700'
  },
  {
    id: 8,
    title: 'Cannot Imagine Life Without You',
    emoji: '🥺',
    message: 'Tu naslis tr mi tr pagal hoin yaar.',
    originalQuote: 'Tu naslis tr mi tr pagal hoin yaar',
    colorAccent: 'from-blue-800 to-sky-500'
  },
  {
    id: 9,
    title: 'My Sweet Yedu',
    emoji: '🫶',
    message: 'Khup god aahes tu yedu 🫶',
    originalQuote: 'Khup god aahes tu yedu 🫶',
    colorAccent: 'from-cyan-500 to-blue-600'
  }
];

/**
 * =========================================================================
 * 🫶 "MY YEDU" CUTE HIGHLIGHT QUOTES
 * =========================================================================
 */
export const myYeduQuotes = [
  {
    text: 'Tu khuppp god aahes mast ekdum hasmukh childish 🤌🫶 natkhat pn',
    highlight: 'Hasmukh Childish 🤌🫶',
    emoji: '🥰'
  },
  {
    text: 'Khup Mazya yete mala tuzya sobat.',
    highlight: 'Pure Joy With You',
    emoji: '💙'
  },
  {
    text: 'Khup god aahes tu yedu 🫶',
    highlight: 'My Sweetest Yedu',
    emoji: '✨'
  }
];

/**
 * =========================================================================
 * 📖 OUR STORY TIMELINE (Blue Themed & Natural Phrasing)
 * =========================================================================
 */
export const storyTimeline: StoryTimelineItem[] = [
  {
    id: 1,
    step: 'Chapter 01',
    title: 'The Day My World Changed',
    date: 'The Beginning',
    description: 'A quiet ordinary day that turned into my greatest turning point. I still remember when you entered my life and suddenly everything started making sense.',
    icon: 'Sparkles'
  },
  {
    id: 2,
    step: 'Chapter 02',
    title: 'When My Smile Came Back',
    date: 'The Real Joy',
    description: 'You brought my smile back—the OG one. Talking to you, laughing at silly things, and realizing you are the kindest soul I have ever met.',
    icon: 'Coffee'
  },
  {
    id: 3,
    step: 'Chapter 03',
    title: 'The Little Memories & Big Care',
    date: 'Every Single Day',
    description: 'Tya veles chya athavani, the vadapav you brought when I was upset, holding me close and whispering “tension nako gheu me aahe”.',
    icon: 'HeartHandshake'
  },
  {
    id: 4,
    step: 'Chapter 04',
    title: 'Happy Birthday, My Yedu 💙',
    date: '09 • 10 & Forever',
    description: 'Today I celebrate the girl who gave me peace, who trusted me with her tears, and who I want by my side for every single chapter ahead.',
    icon: 'Heart'
  }
];

/**
 * =========================================================================
 * 🎯 CUTE & ROMANTIC QUIZZES DATA (7 Interactive Questions)
 * =========================================================================
 */
export const romanticQuizzes: QuizQuestion[] = [
  {
    id: 1,
    badge: 'Question 1 of 7',
    question: 'Who loves you more? 👀',
    subtitle: 'Think carefully before answering...',
    options: [
      { text: 'Me (You) 😌', isCorrect: false, reaction: 'Nice try, but impossible! 😜' },
      { text: 'You (Me) 💙', isCorrect: true, reaction: 'Spot on! But wait...' },
      { text: 'Obviously me (Your Baby Boy) 😌', isCorrect: true, reaction: '100% correct! Nobody can beat my love for you! 💙' }
    ],
    revealedAnswer: 'Obviously me 😌',
    sweetNote: 'No matter what happens, I will always love you more more more my baby! 😘'
  },
  {
    id: 2,
    badge: 'Question 2 of 7',
    question: 'What is my favorite thing about you?',
    subtitle: 'Can you guess what melts my heart the most?',
    options: [
      { text: 'Your sweet smile 😊', isCorrect: false, reaction: 'It truly brightens my day...' },
      { text: 'When you get childish & natkhat 🤌', isCorrect: false, reaction: 'Hasmukh childish ekdum!' },
      { text: 'How deeply and genuinely you care 🤍', isCorrect: false, reaction: 'The kindest heart in the world!' },
      { text: 'Literally everything about you 🫶🏻', isCorrect: true, reaction: 'Bingo! Every single little thing! 💙' }
    ],
    revealedAnswer: 'Literally everything about you 🫶🏻',
    sweetNote: 'From your naughty expressions to your deepest care, every bit of you is my favorite.'
  },
  {
    id: 3,
    badge: 'Question 3 of 7',
    question: 'Who gets angry first? 😤',
    subtitle: 'Be completely honest now!',
    options: [
      { text: 'You (My cute Yedu) 🙈', isCorrect: true, reaction: 'Haha caught you! But I love calming you down! 🥰' },
      { text: 'Me (Never!) 😇', isCorrect: false, reaction: 'Are you sure about that? 😂' },
      { text: 'Both of us at the same second 💥', isCorrect: false, reaction: 'A storm in a teacup! 😂' }
    ],
    revealedAnswer: 'You, but I always calm you down with love! 🫶🏻',
    sweetNote: 'Even when you get mad over silly little things, you look the cutest, and I will always hold you tight.'
  },
  {
    id: 4,
    badge: 'Question 4 of 7',
    question: 'Who says sorry first? 🥺',
    subtitle: 'When things get quiet...',
    options: [
      { text: 'Me, because I can’t stay upset with you for even a minute 🥺', isCorrect: true, reaction: 'Yes, because your happiness means everything to me!' },
      { text: 'You, with a cute pout 🥺', isCorrect: false, reaction: 'Sometimes, and it melts me completely!' },
      { text: 'We both look at each other and start laughing 😂', isCorrect: true, reaction: 'That happens the most! 😂' }
    ],
    revealedAnswer: 'Me, because I can’t bear seeing you upset 💙',
    sweetNote: 'Ego doesn’t exist between us. Your smile is worth more than any argument.'
  },
  {
    id: 5,
    badge: 'Question 5 of 7',
    question: 'Who misses the other person more? 🌙',
    subtitle: 'When we are not together...',
    options: [
      { text: 'Me, literally 24/7 non-stop 🥺', isCorrect: true, reaction: 'True! I miss you the second you leave! 💙' },
      { text: 'You, whenever nobody is there to tease 😜', isCorrect: false, reaction: 'Haha that is true too!' },
      { text: 'Both of us equally every single second ✨', isCorrect: true, reaction: 'Our hearts beat on the same frequency! 💙' }
    ],
    revealedAnswer: 'Me, 24/7 non-stop 🥺',
    sweetNote: 'Whenever I close my eyes or look at my phone, it’s always you.'
  },
  {
    id: 6,
    badge: 'Question 6 of 7',
    question: 'Where would I always choose to be? 📍',
    subtitle: 'Out of every place in the universe...',
    options: [
      { text: 'Traveling exotic places ✈️', isCorrect: false, reaction: 'Fun, but not my true home.' },
      { text: 'At home sleeping peacefully 😴', isCorrect: false, reaction: 'Tempting, but still no!' },
      { text: 'With you ❤️', isCorrect: true, reaction: 'ALWAYS. With you, holding your hand, forever.' }
    ],
    revealedAnswer: 'With you ❤️',
    sweetNote: 'No matter where I go in this world, my only true peace is right beside you.'
  },
  {
    id: 7,
    badge: 'Question 7 of 7',
    question: 'How well do you know your Baby? 🤌🏻',
    subtitle: 'The final question of our little game!',
    options: [
      { text: 'Better than anyone else in this world 🤌🏻', isCorrect: true, reaction: 'You understand me even without words!' },
      { text: 'I know all his moods and how to make him smile 😊', isCorrect: true, reaction: 'You brought my real smile back!' },
      { text: 'Still falling more in love every single day 🥰', isCorrect: true, reaction: 'And we have forever ahead of us! 💙' }
    ],
    revealedAnswer: 'Better than anyone in the world 🫶🏻',
    sweetNote: 'You know my heart inside out. Happy Birthday to the girl who owns my heart!'
  }
];

/**
 * =========================================================================
 * 📸 PHOTOS & VIDEOS MEMORIES DATA
 * =========================================================================
 * Natural, heartfelt descriptions without place names!
 * Includes all 6 videos and 76 photos with rich layouts.
 */
export const memories: Memory[] = [
  // ---------------- Core Memory 1: That Little Moment of Care ----------------
  {
    id: 1,
    image: '/photos/photo1.jpg',
    layoutSpan: 'featured',
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

  // ---------------- Core Memory 2: That Sweet Prayer ----------------
  {
    id: 2,
    image: '/photos/photo2.jpg',
    layoutSpan: 'normal',
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

  // ---------------- Video 1: Real WhatsApp Video 1 ----------------
  {
    id: 3,
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

  // ---------------- Core Memory 3: That Cozy Food Moment ----------------
  {
    id: 4,
    image: '/photos/photo4.jpg',
    layoutSpan: 'tall',
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

  // ---------------- Video 2: Real WhatsApp Video 2 ----------------
  {
    id: 5,
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

  // ---------------- Core Memory 4: Tension Nako Gheu ----------------
  {
    id: 6,
    image: '/photos/photo5.jpg',
    layoutSpan: 'featured',
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

  // ---------------- Video 3: Real WhatsApp Video 3 ----------------
  {
    id: 7,
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

  // ---------------- Core Memory 5: Pure Trust & Tears ----------------
  {
    id: 8,
    image: '/photos/mem_01.jpg',
    layoutSpan: 'wide',
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

  // ---------------- Video 4: Real WhatsApp Video 4 ----------------
  {
    id: 9,
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

  // ---------------- Core Memory 6: How Important You Made Me Feel ----------------
  {
    id: 10,
    image: '/photos/mem_05.jpg',
    layoutSpan: 'tall',
    title: 'How Important You Made Me Feel',
    caption: 'Knowing my baby trusts me with her whole world made me feel so special.',
    description: 'Bhai mala life madhe khup moth kelya sarkh vatat hot Mazi baby jicha Mazya vr khup khup khup trust aahe 🤌🏻 That feeling meant more to me than words can ever say.',
    date: 'Unforgettable Day',
    location: 'Moments With You',
    animation: 'blur-zoom',
    category: 'core',
    highlight: true,
    storySnippet: 'That moment made me feel like I had become something really important in your life. My baby trusted me so much, and that feeling meant more to me than I can explain.'
  },

  // ---------------- Video 5: Real WhatsApp Video 5 ----------------
  {
    id: 11,
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

  // ---------------- Video 6: Real WhatsApp Video 6 ----------------
  {
    id: 12,
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
  },

  // ---------------- Remaining Real Photos ----------------
  {
    id: 13,
    image: '/photos/mem_08.jpg',
    layoutSpan: 'normal',
    title: 'The Smile That Heals Me',
    caption: 'Ur the person that brought my smile back the og one.',
    description: 'Every time I look at this photo, I remember how lucky I am to have you.',
    date: 'A Sweet Memory',
    location: 'Our Little Moments',
    animation: 'fade',
    category: 'candid'
  },
  {
    id: 14,
    image: '/photos/mem_09.jpg',
    layoutSpan: 'tall',
    title: 'Little Conversations & Big Smiles',
    caption: 'Khup Mazya yete mala tuzya sobat.',
    description: 'Hours feel like minutes whenever we are talking and laughing together.',
    date: 'Candid Moments',
    location: 'Moments I’ll Always Remember',
    animation: 'slide-left',
    category: 'candid'
  },
  {
    id: 15,
    image: '/photos/mem_10.jpg',
    layoutSpan: 'normal',
    title: 'The Calm in Your Eyes',
    caption: 'Tuzya mule mala peace milali thanx you so so much.',
    description: 'Whenever life feels chaotic, just looking at you brings quiet peace to my mind.',
    date: 'Peaceful Moments',
    location: 'Our Memories',
    animation: 'slide-right',
    category: 'candid'
  },
  {
    id: 16,
    image: '/photos/mem_11.jpg',
    layoutSpan: 'wide',
    title: 'Childish & Beautiful',
    caption: 'Tu khuppp god aahes mast ekdum hasmukh childish 🤌🫶',
    description: 'Never lose this innocence, Yedu. It is the most beautiful thing about you.',
    date: 'Happy Moments',
    location: 'Little Things That Mean Everything',
    animation: 'rotate',
    category: 'candid',
    highlight: true
  },
  {
    id: 17,
    image: '/photos/mem_12.jpg',
    layoutSpan: 'normal',
    title: 'Always By Your Side',
    caption: 'I am always with you in every situation 🫶🏻',
    description: 'In every high and low, you will never have to face anything alone.',
    date: 'Our Promise',
    location: 'Moments With You',
    animation: 'flip-3d',
    category: 'candid'
  },
  {
    id: 18,
    image: '/photos/mem_13.jpg',
    layoutSpan: 'tall',
    title: 'Kindest Soul I Know',
    caption: 'U r kind hearted I never see the person like you fr i swear 🤍',
    description: 'The way you care about people and love without expecting anything in return.',
    date: 'Pure Innocence',
    location: 'Things I’ll Never Forget',
    animation: 'blur-zoom',
    category: 'candid'
  },
  {
    id: 19,
    image: '/photos/mem_14.jpg',
    layoutSpan: 'normal',
    title: 'Golu Ye Mhan',
    caption: 'Just golu ye mhan mag lagech tuzya madatila hajar.',
    description: 'One call, one whisper, and I’ll always be right there for you.',
    date: 'Always There',
    location: 'Our Memories',
    animation: 'polaroid',
    category: 'candid'
  },
  {
    id: 20,
    image: '/photos/mem_15.jpg',
    layoutSpan: 'normal',
    title: 'Words Aren’t Enough',
    caption: 'Words nahit aahe express karnya sathi yevdhi tu mast chan aahes yaaar.',
    description: 'Sometimes words fail to describe how much you truly mean to me.',
    date: 'From The Heart',
    location: 'Moments I’ll Always Remember',
    animation: 'floating',
    category: 'candid'
  },
  {
    id: 21,
    image: '/photos/mem_16.jpg',
    layoutSpan: 'wide',
    title: 'My Whole Life',
    caption: 'Tu naslis tr mi tr pagal hoin yaar 🥺',
    description: 'You’ve woven yourself into every heartbeat and every dream of mine.',
    date: 'Deep In My Heart',
    location: 'Our Little Moments',
    animation: 'fade',
    category: 'candid'
  },
  {
    id: 22,
    image: '/photos/mem_17.jpg',
    layoutSpan: 'normal',
    title: 'A Glimpse of Perfection',
    caption: 'Khup god aahes tu yedu 🫶',
    description: 'Every little habit and expression of yours is etched into my memory.',
    date: 'Cherished Snap',
    location: 'Things I’ll Never Forget',
    animation: 'blur-zoom',
    category: 'candid'
  },
  {
    id: 23,
    image: '/photos/mem_18.jpg',
    layoutSpan: 'tall',
    title: 'The Best Chapter',
    caption: 'Thank you for coming into my life and giving me peace 💙',
    description: 'Being loved by you is the greatest privilege I could ever ask for.',
    date: 'A Blessed Journey',
    location: 'Little Things That Mean Everything',
    animation: 'polaroid',
    category: 'candid'
  },
  {
    id: 24,
    image: '/photos/mem_19.jpg',
    layoutSpan: 'normal',
    title: 'My Favorite Adventure',
    caption: 'Anywhere with you is where I want to be 🌊',
    description: 'Sharing food, talking nonsense, or just sitting in silence—it is all perfect.',
    date: 'Explorations',
    location: 'Moments With You',
    animation: 'floating',
    category: 'candid'
  },
  {
    id: 25,
    image: '/photos/mem_20.jpg',
    layoutSpan: 'normal',
    title: 'A Heart of Gold',
    caption: 'U r kind hearted fr i swear 🤍',
    description: 'Your gentleness is something the world needs more of.',
    date: 'Pure Innocence',
    location: 'Our Memories',
    animation: 'fade',
    category: 'candid'
  },
  {
    id: 26,
    image: '/photos/mem_21.jpg',
    layoutSpan: 'wide',
    title: 'Endless Smile',
    caption: 'Keep smiling 🫶🏻 you look the most beautiful.',
    description: 'Your joy is my favorite blessing in this world.',
    date: 'Happy Moments',
    location: 'Things I’ll Never Forget',
    animation: 'slide-left',
    category: 'candid'
  },
  {
    id: 27,
    image: '/photos/mem_22.jpg',
    layoutSpan: 'normal',
    title: 'Born on 9 October 💙',
    caption: 'Happy Birthday, My Baby 🎂💙',
    description: 'Celebrating you today, tomorrow, and every single day forever.',
    date: '09 • 10 Birthday',
    location: 'Our Little Moments',
    animation: 'slide-right',
    category: 'core',
    highlight: true
  },
  {
    id: 28,
    image: '/photos/mem_23.jpg',
    layoutSpan: 'normal',
    title: 'Moments With You',
    caption: 'Every second with you is a gift.',
    description: 'A quiet reminder of how sweet life became with you in it.',
    date: 'Sweet Moments',
    location: 'Moments With You',
    animation: 'fade',
    category: 'candid'
  },
  {
    id: 29,
    image: '/photos/mem_24.jpg',
    layoutSpan: 'tall',
    title: 'Things I’ll Never Forget',
    caption: 'Forever grateful for you, my baby.',
    description: 'Holding on to these memories like treasures.',
    date: 'Cherished Days',
    location: 'Things I’ll Never Forget',
    animation: 'rotate',
    category: 'candid'
  },
  {
    id: 30,
    image: '/photos/mem_25.jpg',
    layoutSpan: 'normal',
    title: 'Little Things That Mean Everything',
    caption: 'Small smiles, big memories.',
    description: 'Life feels complete when you are smiling beside me.',
    date: 'Sweet Hours',
    location: 'Little Things That Mean Everything',
    animation: 'slide-left',
    category: 'candid'
  }
];

/**
 * =========================================================================
 * 💌 SECRET / SURPRISE LETTER DATA
 * =========================================================================
 */
export const secretLetter: SecretLetter = {
  teaser: 'I have one more thing to tell you...',
  heading: 'To My One & Only Yedu,',
  paragraphs: [
    'Happiest birthday to my beautiful baby, you are so precious to me.',
    'I don’t know what the future looks like, but I know I want every single tomorrow with you.',
    'Just golu ye mhan mag lagech tuzya madatila hajar.',
    'Thank you for giving me peace, for trusting me with your heart, and for bringing my smile back.'
  ],
  signOff: 'Just Love you more more more my baby 😘',
  signature: 'Forever Yours, Your Golu 💙'
};

/**
 * =========================================================================
 * 🎯 FINAL SECTION CLOSING WORDS (9 OCTOBER)
 * =========================================================================
 */
export const finalClosingLines = [
  'Happy Birthday, My Yedu 💙',
  '9 October — my favorite date.',
  'Thank you for coming into my life.',
  'Just Love you more more more my baby 😘',
  'I am always with you baby 🫶🏻',
  'Keep smiling 🫶🏻',
  'Thank you for loving me.',
  'Thank you for giving me peace.',
  '09 • 10 — The Day My Favorite Girl Came Into This World 🎂💙'
];
