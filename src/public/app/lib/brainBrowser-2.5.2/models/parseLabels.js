var fs = require('fs');
var stream = require('stream');

// ---------------------------------------------------------------------- //

var labels = [];
var regionsVertices = {};

// ---------------------------------------------------------------------- //

fs.readFile('labels.txt', { encoding: 'utf8' }, function (err, data) {

    labels = data.trim().split(/\r\n|[\n\v\f\r\u0085\u2028\u2029]/g);

    fs.readFile('vertices.txt', { encoding: 'utf8' }, function (err, data) {
        data.trim()
        .split(/\r\n|[\n\v\f\r\u0085\u2028\u2029]/g)
        .map(function (value) { return parseInt(value.trim()); })
        .forEach (function (vertex, indexVertice) {

            // Vertices equal to -1 or 0 are considered unknown
            if (vertex <= 0) {
                if (!regionsVertices["unknown"]) regionsVertices["unknown"] = [];
                regionsVertices["unknown"].push(indexVertice);
                return;
            }

            // If not, store the vertex in the corresponding label
            labels.forEach(function (label, indexLabel) {
                if (vertex === indexLabel) {
                    if (!regionsVertices[label]) regionsVertices[label] = [];
                    regionsVertices[label].push(indexVertice);
                }
            });
        });

        fs.writeFileSync('regions-vertices.json', JSON.stringify(regionsVertices));
    });
});
