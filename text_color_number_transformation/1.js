var textarea = document.querySelector("textarea");
var div = document.querySelector("div");

textarea.innerHTML = "Hi there";

textarea.addEventListener("keypress", (e) => {
  div.innerHTML = transform2(transform1(transform(e.target.value + e.code)));
});

function transform(text) {
  var text1 = "";
  for (var i = 0; i < text.length; i++) {
    text1 += text[i].charCodeAt(0).toString(2) + " ";
  }
  return text1;
}

function transform1(text) {
  var text1 = text[0];
  text += text[0];
  for (var i = 0; i < text.length; i++) {
    var n = text.slice(1).indexOf(text[0]);
    text1 += n + 1;
    text = text.slice(n + 1);
  }
  return text1;
}

var colors = [
  "red",
  "green",
  "blue",
  "yellow",
  "cyan",
  "brown",
  "black"
]

function transform2(text) {
  var text1 = "";
  for (var i = 0; i < text.length; i++) {
    var colour = parseInt(text[i]);
    text1 += "<font color='" + colors[colour-1]+ "'>" + text[i] + "</font>";
  }
  return text1;
}