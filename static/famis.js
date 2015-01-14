function init() {
  Tabletop.init({
    key: '1cNaJmqIIJvWi1OrLSAFPQpddC0uau6nWnLdhyB2FSyU',
    callback: buildFamis,
    simpleSheet: true
  });
}

function buildFamis(data) {
  for (var d = 0; d < data.length; d++) {
    console.log(data[d]);
  }
}

window.onload = init;