export function randomEmoji() {
  let array = [
    "😘💋",
    "😍",
    "😩",
    "❤️",
    "🍌",
    "🧎‍♀️",
    "😤",
    "🤯",
    "👩‍🏫",
    "🌶",
    "🦴",
    "🍭",
    "🙏🏼",
    "🥨",
    "😭",
    "🔥",
    "🥴",
    "😵‍",
    "😇",
    "😏",
    "🍆",
    "🍑",
    "🐱",
    "💦",
    "👉👌",
    "😛",
    "🥵",
    "🤠",
    "👀",
    "😈",
    "🤡",
    "😊",
    "🥺",
    "👅",
    "😳",
    "💆",
  ];

  return array[Math.floor(Math.random() * array.length)];
}

export function commaNum(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function randomString() {
  let array = [
    "I'm sure you liked it for the plot!",
    "'From my cold, dead hands' - you about this fic i guess",
    "If you quickly google therapy hotlines and give the first one that shows up a call, I reckon they'd be able to help",
    "We finally got out of a global pandemic and this is the choice you made",
    "'With fanfic all things are possible' - Jesus'",
    "'Once you've been to AO3, you'll never stop wanting to beat Henry Kissinger to death with your bare hands' - Anthony Bourdain",
    "Must be a great read",
    "'Ich bin ein Fanfic reader' - John F. Kennedy",
    "Do you need help? I think you might need help.",
    "'I read from the heart, not the head' - Princess Diana'.",
    "Having fun isn't hard when you've got an AO3 account.",
    "'I have a dream, that one day Childhood friends and Enemies to lovers can sit at the same table for romance' - Martin Luther Kink Jr.",
    "These are your 95 Theses nailed to the door of the internet.",
    "get busy readin' or get busy dyin'",
    "You're here to eat ass and read fanfic, and you're all out of fanfic.",
    "Make sure you left a comment telling the author how much you love it!",
    "'I love fanfic. I love smut. I don't expect anyone just to sit there and agree with me' - Margaret Thatcher",
    "'How dare you' - Greta Thunberg",
    "'I don't want to be thought of as the 'girl who was shot down by the haterz' but the 'girl who fought for fanfic'' - Malala Yousafzai",
    "なんてことだ",
    "이런 젠장",
    "'It's a love story, baby just hit kudos' - Taylor Swift",
    "'If we all gather our embarassment together, it'll become confidence' - BTS",
  ];
  return array[Math.floor(Math.random() * array.length)];
}

export function randomPersonString(str) {
  let array = [
    `Personally I'm not a fan of ${str} but you do you`,
    `But soft, what light through yonder window breaks? It is the east, and ${str} is the sun`,
    `When ${str} came to a set of two open doors, they entered the door on their left`,
    `${str} is my favourite war criminal`,
    `Who's ${str}?`,
    `If ${str} was a worm would you still love them?`,
  ];
  return array[Math.floor(Math.random() * array.length)];
}

export function randomRelationshipString(str) {
  let array = [
    `Kramer, what's going on in there?' 'Unbearable yearning, Jerry`,
    `Out of all the world's famous lovers - Antony and Cleopatra, Taylor and Burton, Jordan and Peter, Bert and Ernie - I would say that ${str} are, quite possibly, the greatest snog history has so far encountered`,
    `${str} is canon`,
    `${str} is not canon`,
    `I really think ${str} are gonna make it`,
    `When's the wedding?`,
  ];
  return array[Math.floor(Math.random() * array.length)];
}

export function randomTagString(str) {
  let array = [
    `God, ${str} really gets me going`,
    `You need a priest and a lawyer`,
    `${str}. How wholesome!`,
    `If you got "Anal Sex 🥺" you win`,
    `What even is ${str}`,
    `Once upon a time, ${str} waas considered sacrilegious. Not any more, thank goodness`,
  ];
  return array[Math.floor(Math.random() * array.length)];
}

export function readCount(n) {
  let number = n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  let array = [
    `You know, thats ${number} words. I'm impressed`,
    `Really? Only ${number} words? Time to hit the books`,
    `${number} words of smut and erotica. Nice.`,
    `You alone reached my local libraries reading goal of ${number} words`,
    `You read ${number}. You could have read the bible ${
      n / 783137
    } times instead.`,
  ];
  return array[Math.floor(Math.random() * array.length)];
}

export function generateRandomEmojiString() {
  let str = "";
  const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i in array) {
    str = str + randomEmoji();
  }
  return str;
}
