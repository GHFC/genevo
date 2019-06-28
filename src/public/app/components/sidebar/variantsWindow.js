// Neanderthal Synapse
// Copyright (C) 2019 Institut Pasteur
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <http://www.gnu.org/licenses/>.

// =========================================================================
// Factory to build the popup window of the variants
// REFACTORING NEEDED, THIS IS EXTREMELY MESSY
// WATCH YOUR EYES AND SANITY PLEASE !
// =========================================================================

import windowStyle from './variantsWindowStyle.js';

// =========================================================================

export default function (entry, entryIndex) {

    const gene = entry.Gene;            // The gene name
    const ccds = entry.CDS;             // The length of the coding sequence
    const protLength = ccds / 3;        // Divide by 3 to have the protein length
    const variantHeaders = {
        'SNP': 'SNP Reference ID',
        'PopFreqMax': 'Maximum population frequency',
        'CADD_phred': 'CADD phred',
        'HS': 'Homo sapiens alleles',   // This one is not in the DB, values are calculated on the fly
        'AL': 'Altaï alleles',
        'DN': 'Denisovan alleles',
        'PT': 'Pan troglodytes alleles',
        'AN': 'Ancestor alleles'
    };

    const header =
        "<html>"+
            "<head>"+
                "<title>" + gene + " variants</title>"+
                "<link href='https://fonts.googleapis.com/css?family=Lato' rel='stylesheet'>"+
            "</head>"+
            "<body>"+
            "<style type='text/css'>" + windowStyle + "</style>";

    let template =
        "<h2>"+
            "<span id='gene' title='Gene name'>" + gene + "</span>"+
            "<small id='CCDS' title='Sequence length in nucleotides'>CCDS : " + ccds + " NT</small>"+
            "<small id='protLength' title='Protein length in amino-acid'>Protein : " + protLength + " AA</small>"+
        "</h2>";

    const footer =
        "</body>"+
    "</html>";

    for (let transcript in entry.Variants) {
        template = template.concat("<h3 title='RNA identifier'>&#x2022; RNA " + transcript + "</h3>");

        const table = document.createElement("table");

        // Build the thead
        const thead = table.createTHead();
        const theadRow = thead.insertRow();

        let th = document.createElement('th');
        let text = document.createTextNode('Variants');
        th.appendChild(text);
        theadRow.appendChild(th);

        Object.keys(entry.Variants[transcript]).forEach((variant) => {
            let th = document.createElement('th');
            let text = document.createTextNode(variant);
            th.appendChild(text);
            theadRow.appendChild(th);
        });

        // Build the tbody
        const tbody = table.createTBody();

        for (let header in variantHeaders) {
            const label = variantHeaders[header];
            const tr = tbody.insertRow();

            let td = tr.insertCell();
            let text = document.createTextNode(label);
            td.appendChild(text);

            for (let variant in entry.Variants[transcript]) {
                const variantData = entry.Variants[transcript][variant];

                let td = tr.insertCell();
                let text = null;

                if (header === 'HS') {
                    if (variantData['PopFreqMax'] && variantData['PopFreqMax'] > 0.5) {
                        text = document.createTextNode('1/1');
                    }
                    else {
                        text = document.createTextNode('0/0');
                    }
                }
                else {
                    text = document.createTextNode(variantData[header]);
                }

                td.appendChild(text);
            }
        }

        template = template.concat(table.outerHTML);
    }

    return header + template + footer;
};
