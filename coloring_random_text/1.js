const container = document.querySelector("div");
const button1 = container.querySelectorAll('button')[0];
const button2 = container.querySelectorAll('button')[1];
const select = container.querySelector('select');
const textarea = container.querySelector('textarea');
const output = textarea.nextElementSibling.nextElementSibling;

textarea.value = 'AshortstoryisapieceofprosefictionthattypicallycanbereadinonesittingandfocusesonaselfcontainedincidentorseriesoflinkedincidentswiththeintentofevokingasingleeffectormoodTheshortstoryisoneoftheoldesttypesofliteratureandhasexistedintheformoflegendsmythictalesfolktalesfairytalesfablesandanecdotesinvariousancientcommunitiesacrosstheworldThemodernshortstorydevelopedintheearly19thcentury';

function outputEvaluate(value) {
  output.innerHTML = transform(value);
}

textarea.addEventListener('keyup', (e) => {
  outputEvaluate(e.target.value);
});

button1.addEventListener('click', (e) => {
  textarea.value = textarea.value.replaceAll(' ', '');
  outputEvaluate(textarea.value);
});

button2.addEventListener('click', (e) => {
  textarea.value = textarea.value.replaceAll(notAlphaNotNumber, '');
  outputEvaluate(textarea.value);
});

select.addEventListener('change', (e) => {
  colorSchemeIndex = e.target.value;
  outputEvaluate(textarea.value);
})

const notAlphaNotNumber = /[^a-zA-Z0-9=]/g; 

function complexSymbolsToBase64(text) {
  while (true) {
    const m = text.match(notAlphaNotNumber); // keine azazo nine gleicht
    if (!m) break;
    text = text.replace(m[0], btoa(m[0]));
  }
  return text;
}

const colors1 = [
  'White',
  'Silver',
  'Gray',
  'Black',
  'Red',
  'Maroon',
  'Yellow',
  'Olive',
  'Lime',
  'Green',
  'Aqua',
  'Teal',
  'Blue',
  'Navy',
  'Fuchsia',
  'Purple'
].map(color => color.toUpperCase());

const colors2 = [
  "White",
  "Red",
  "Orange",
  "Yellow",
  "Green",
  "Blue",
  "Purple",
  "Black",
  "Alice Blue",
  "Antique White",
  "Aqua",
  "Aquamarine",
  "Azure",
  "Beige",
  "Bisque",
  "Blanched Almond",
  "Blue Violet",
  "Brown",
  "Burly Wood",
  "Cadet Blue",
  "Chartreuse",
  "Chocolate",
  "Coral",
  "Corn Flower Blue",
  "Corn Silk",
  "Crimson",
  "Cyan",
  "Dark Blue",
  "Dark Cyan",
  "Dark Goldenrod",
  "Dark Gray",
  "Dark Green",
  "Dark Khaki",
  "Dark Magenta",
  "Dark Olive Green",
  "Dark Orange",
  "Dark Orchid",
  "Dark Red",
  "Dark Salmon",
  "Dark Sea Green",
  "Dark Slate Blue",
  "Dark Slate Gray",
  "Dark Turquoise",
  "Dark Violet",
  "Deep Pink",
  "Deep Sky Blue",
  "Dim Gray",
  "Dodger Blue",
  "Fire Brick",
  "Floral White",
  "Forest Green",
  "Fuschia",
  "Gainsboro",
  "Ghost White",
  "Gold",
  "Goldenrod",
  "Gray",
  "Green Yellow",
  "Honeydew",
  "Hot Pink",
  "Indian Red",
  "Indigo",
  "Ivory",
  "Khaki",
  "Lavender",
  "Lavender Blush",
  "Lemon Chiffon",
  "Light Blue",
  "Light Coral",
  "Light Cyan",
  "Light Goldenrod Yellow",
  "Light Green",
  "Light Grey",
  "Light Pink",
  "Light Salmon",
  "Light Sea Green",
  "Light Sky Blue",
  "Light Slate Gray",
  "Light Steel Blue",
  "Light Yellow",
  "Lime",
  "Lime Green",
  "Linen",
  "Magenta",
  "Maroon",
  "Medium Aquamarine",
  "Medium Blue",
  "Medium Orchid",
  "Medium Purple",
  "Medium Sea Green",
  "Medium Slate Blue",
  "Medium Spring Green",
  "Medium Turquoise",
  "Medium Violet Red",
  "Midnight Blue",
  "Mint Cream",
  "Misty Rose",
  "Navajo White",
  "Navy",
  "Old Lace",
  "Olive",
  "Olive Drab",
  "Orange Red",
  "Orchid",
  "Pale Goldenrod",
  "Pale Green",
  "Pale Turquoise",
  "Pale Violet Red",
  "Papaya Whip",
  "Peach Puff",
  "Peru",
  "Pink",
  "Plum",
  "Powder Blue",
  "Rosy Brown",
  "Royal Blue",
  "Saddle Brown",
  "Sea Green",
  "Sea Shell",
  "Sienna",
  "Silver",
  "Sky Blue",
  "Slate Blue",
  "Slate Gray",
  "Snow",
  "Spring Green",
  "Steel Blue",
  "Tan",
  "Teal",
  "Thistle",
  "Tomato",
  "Turquoise",
  "Violet",
  "Wheat",
  "White Smoke",
  "Yellow Green"
].map(color => color.toUpperCase()).map(color => color.replaceAll(' ', ''));

const colorSchemes = [colors1, colors2];
let colorSchemeIndex = 0;

function markStreamWithColor(text, color) {
  const ranges = [];
  let s;
  let ind = 0;
  for (let i = 0; i < text.length; ++i) {
    if (text[i].toUpperCase() === color[ind]) {
      if (ind === 0) {
        s = i;
      } else if (ind === color.length - 1) {
        ranges.push([s, i]);
        ind = -1;
      }
      ind++;
    }
  }
  let shift = 0;
  console.log(ranges);
  for (let i = 0; i < ranges.length; i++) {
    const coloredText = text.slice(shift + ranges[i][0], shift + ranges[i][1] + 1);
    text = text.slice(0, shift + ranges[i][0]) + "<font style='background-color: " + color + "; color: #feafba;'>"
         + coloredText + "</font>"
         + text.slice(shift + ranges[i][1] + 1); // 57 + color.length
    shift += 57 + coloredText.length;
  }
  return [text, ranges.length > 0];
}

function transform(text) {
  text = complexSymbolsToBase64(text);
  const streams = colorSchemes[colorSchemeIndex].map(color => {
    const [stream, isMarked] = markStreamWithColor(text, color);
    return isMarked ? stream : null;
  }).filter(stream => stream).map(stream => '<div>' + stream + '</div>');
  return streams.join("");
}

outputEvaluate(textarea.value);