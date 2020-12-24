#!/usr/bin/env python
# coding=utf-8
# ==============================================================================
# author          : Guillaume Dumas
# date            : 2016-11-28
# ==============================================================================

# Load FASTA

taxons = ['altai', 'denisovan', 'sidron', 'vindija', 'pantro', 'rheMac3',
          'papHam1', 'tarSyr1', 'ponAbe2', 'papHam1', 'mm10', 'micMur1',
          'gorGor3', 'calJac3']

from Bio import SeqIO

filename = "fa/hg19_ref.fa"
inputSeqFile = open(filename, "rU")
SeqDictHS = SeqIO.to_dict(SeqIO.parse(inputSeqFile, "fasta"))
inputSeqFile.close()
print "HS:", SeqDictHS.keys()

filename = "fa/ancestor.fa"
inputSeqFile = open(filename, "rU")
SeqDictAN = SeqIO.to_dict(SeqIO.parse(inputSeqFile, "fasta"))
inputSeqFile.close()
print "AN:", SeqDictAN.keys()


# CDS Algoritm

from Bio.Data import CodonTable
standard_table = CodonTable.unambiguous_dna_by_name["Standard"]
from Bio.Seq import reverse_complement


def getcds(sequence, strand):
    if strand == '-':
        nuc = reverse_complement(sequence)
    else:
        nuc = sequence

    orflist = []
    orflen = []
    for frame in range(3):
        startcod = -1
        for cod in range(frame, len(nuc), 3):
            if (startcod < 0) and (nuc[cod:cod + 3] in standard_table.start_codons[2]):
                startcod = cod
            if (startcod >= 0) and (nuc[cod:cod + 3] in standard_table.stop_codons):
                orflist.append([frame, startcod, cod])
                orflen.append(cod - startcod)
                startcod = -1
    if orflen:
        m = max(orflen)
        cds = [i for i, j in enumerate(orflen) if j == m]
        cds = {"start": orflist[cds[0]][1], "end": orflist[cds[0]][2], "frame": frame, "strand": strand}
    else:
        # print "NoCDS",
        cds = {"start": None, "end": None, "strand": None}

    return cds


import pandas as pd
from Bio.Align.Applications import ClustalwCommandline
from Bio import AlignIO
from Bio.Phylo.PAML import baseml, yn00
from Bio.Seq import Seq
from Bio.Align import MultipleSeqAlignment

verbose = True
clustalAlignment = False

CCDS_Final = pd.read_csv('CCDS.csv')
QualityLabel = ['hq', 'mq', 'lq']
values = ['N', 'S', 'dN', 'dS', 'omega', 'kappa', 't']
subjects2 = ['AN', 'HS', 'TX']

import datetime

for taxa in taxons:
    subjects = ['AN', 'HS', taxa]
    filename = "FA/" + taxa + ".fa"
    inputSeqFile = open(filename, "rU")
    SeqDictTX = SeqIO.to_dict(SeqIO.parse(inputSeqFile, "fasta"))
    inputSeqFile.close()
    print taxa, ":", SeqDictTX.keys()
    for indexQuality, QualityLevel in enumerate([0.2, 0.5, 0.8]):
        print "Processing", QualityLabel[indexQuality], 'CCDS with', str(int(QualityLevel * 100)), '% coverage minimum'
        filename = "CSV/dNdS_CCDS_" + taxa + "_" + QualityLabel[indexQuality] + '_' + str(int(QualityLevel * 100)) + "_NoORF.csv"
        filenameLog = "CSV/dNdS_CCDS_" + taxa + "_" + QualityLabel[indexQuality] + '_' + str(int(QualityLevel * 100)) + "_NoORF.log"

        with open(filename, "w") as myfile:
            myfile.write('index gene EntrezId CDS ')

        current_time = datetime.datetime.now().time()

        with open(filenameLog, "w") as myfile:
            myfile.write('Analyses starts at ' + current_time.isoformat() + '\n')

        for s in subjects:
            with open(filename, "a") as myfile:
                myfile.write(s + '.DNAc ' + s + '.BadCodc ' + s + '.Ac ' + s + '.Tc ' + s + '.Gc ' + s + '.Cc ' + s + '.Nc ' + s + '.GCcontent ' + s + '.GC12c ' + s + '.GC3c ' + s + '.debug ')
        values = ['N', 'S', 'dN', 'dS', 'omega', 'kappa', 't']
        for i, n in enumerate(subjects):
            for m in subjects[i + 1:]:
                for v in values:
                    with open(filename, "a") as myfile:
                        myfile.write(n + '.' + m + '.' + v + ' ')
        with open(filename, "a") as myfile:
            myfile.write('Debug\n')

        idx = 0
        for tmp in CCDS_Final.iterrows():
            idx += 1
            remainingSTOPHS = False
            remainingSTOPAN = False
            remainingSTOPTX = False
            if idx >= 0:
                row = tmp[1]
                chrom = 'chr' + row['Chrom']
                strand = row['Strand']
                cds_pos = row['CDS_positions']

                if verbose:
                    print row['Gene'], chrom, strand, cds_pos, '\n'
                with open(filename, "a") as myfile:
                    myfile.write("%i %s %s " % (idx, row['Gene'], row['EntrezID']))

                sequenceAN = ""
                sequenceHS = ""
                sequenceTX = ""

                for index, exon in enumerate(cds_pos.replace('[', '').replace(']', '').replace('\'', '').replace(' ', '').split(',')):
                    eS = int(exon.split('-')[0])
                    eE = int(exon.split('-')[1]) + 1
                    if verbose:
                        print "\nCDS part #", index + 1, "from", eS, "to", eE
                        print str(SeqDictHS[chrom].seq[eS:eE])
                    sequenceHS = sequenceHS + str(SeqDictHS[chrom].seq[eS:eE])
                    sequenceAN = sequenceAN + str(SeqDictAN[chrom].seq[eS:eE])
                    sequenceTX = sequenceTX + str(SeqDictTX[chrom].seq[eS:eE])

                # CDS = getcds(sequenceHS,strand);
                CDS = {"start": 0, "end": len(sequenceHS), "strand": strand}
                if strand == '-':
                    nucAN = reverse_complement(sequenceAN)[CDS['start']:CDS['end']]
                    nucHS = reverse_complement(sequenceHS)[CDS['start']:CDS['end']]
                    nucTX = reverse_complement(sequenceTX)[CDS['start']:CDS['end']]
                else:
                    nucAN = sequenceAN[CDS['start']:CDS['end']]
                    nucHS = sequenceHS[CDS['start']:CDS['end']]
                    nucTX = sequenceTX[CDS['start']:CDS['end']]

                if (nucHS[-3:] == 'TAG') or (nucHS[-3:] == 'TAA') or (nucHS[-3:] == 'TGA'):
                    nucHS = nucHS[:-3]
                    remainingSTOPHS = True
                    print "HS has ending STOP in ", row['Gene']
                    with open(filenameLog, "a") as myfile:
                        myfile.write('Ending stop codon in HS for ' + row['Gene'] +'\n')

                if (nucAN[-3:] == 'TAG') or (nucAN[-3:] == 'TAA') or (nucAN[-3:] == 'TGA'):
                    nucAN = nucAN[:-3]
                    remainingSTOPAN = True
                    print "AN has ending STOP in ", row['Gene']
                    with open(filenameLog, "a") as myfile:
                        myfile.write('Ending stop codon in AN for ' + row['Gene'] +'\n')

                if (nucTX[-3:] == 'TAG') or (nucTX[-3:] == 'TAA') or (nucTX[-3:] == 'TGA'):
                    nucTX = nucTX[:-3]
                    remainingSTOPTX = True
                    print taxa, " has ending STOP in ", row['Gene']
                    with open(filenameLog, "a") as myfile:
                        myfile.write('Ending stop codon in ' + taxa + ' for ' + row['Gene'] +'\n')

                if remainingSTOPHS and remainingSTOPAN and not remainingSTOPTX:
                    nucTX = nucTX[:-3]
                if remainingSTOPHS and remainingSTOPTX and not remainingSTOPAN:
                    nucAN = nucAN[:-3]
                if remainingSTOPTX and remainingSTOPAN and not remainingSTOPHS:
                    nucHS = nucHS[:-3]

                if remainingSTOPHS and not remainingSTOPAN and not remainingSTOPTX:
                    nucAN = nucAN[:-3]
                    nucTX = nucTX[:-3]
                if remainingSTOPAN and not remainingSTOPHS and not remainingSTOPTX:
                    nucHS = nucHS[:-3]
                    nucTX = nucTX[:-3]
                if remainingSTOPTX and not remainingSTOPAN and not remainingSTOPHS:
                    nucAN = nucAN[:-3]
                    nucHS = nucHS[:-3]

                if row['Gene'] == 'COL26A1':
                    nucHS = nucHS[:1200 - 14] + "G" + nucHS[1200 - 14:]
                    nucAN = nucAN[:1200 - 14] + "N" + nucAN[1200 - 14:]
                    nucTX = nucTX[:1200 - 14] + "N" + nucTX[1200 - 14:]

                if row['Gene'] == 'TMEM247':
                    nucHS = nucHS[:-3]
                    nucAN = nucAN[:-3]
                    nucTX = nucTX[:-3]

                if row['Gene'] == 'P3H3':
                    nucHS = nucHS[:419] + "G" + nucHS[419:]
                    nucAN = nucAN[:419] + "N" + nucAN[419:]
                    nucTX = nucTX[:419] + "N" + nucTX[419:]

                for i in range(len(nucHS) / 3):
                    n = i * 3
                    if (nucHS[n:n+3] == 'TAG') or (nucHS[n:n+3] == 'TAA') or (nucHS[n:n+3] == 'TGA'):
                        print nucHS[n:n+3]
                        nucHS = nucHS[:n] + 'NNN' + nucHS[n+3:]
                        print row['Gene'], " HS has internal STOP at codon", n
                        with open(filenameLog, "a") as myfile:
                            myfile.write('Internal STOP codon in HS for ' + row['Gene'] +' at codon '+ str(n) + '\n')

                for i in range(len(nucAN) / 3):
                    n = i * 3
                    if (nucAN[n:n+3] == 'TAG') or (nucAN[n:n+3] == 'TAA') or (nucAN[n:n+3] == 'TGA'):
                        print nucAN[n:n+3]
                        nucAN = nucAN[:n] + 'NNN' + nucAN[n+3:]
                        print row['Gene'], " AN has internal STOP at codon", n
                        with open(filenameLog, "a") as myfile:
                            myfile.write('Internal STOP codon in AN for ' + row['Gene'] +' at codon '+ str(n) + '\n')

                for i in range(len(nucTX) / 3):
                    n = i * 3
                    if (nucTX[n:n+3] == 'TAG') or (nucTX[n:n+3] == 'TAA') or (nucTX[n:n+3] == 'TGA'):
                        print nucTX[n:n+3]
                        nucTX = nucTX[:n] + 'NNN' + nucTX[n+3:]
                        print row['Gene'], " TX has internal STOP at codon", n
                        with open(filenameLog, "a") as myfile:
                            myfile.write('Internal STOP codon in ' + taxa + ' for ' + row['Gene'] + ' at codon ' + str(n) + '\n')

                if verbose:
                    print "AN :\t", len(nucAN), nucAN[0:30] + "..." + nucAN[-10:]
                    print "HS :\t",len(nucHS), nucHS[0:30] + "..." + nucHS[-10:]
                    print taxa,":\t",len(nucTX), nucTX[0:30] + "..." + nucTX[-10:]

                with open(filename, "a") as myfile:
                    myfile.write("%i " % len(nucHS))

                if clustalAlignment:
                    records = (SeqIO.SeqRecord(Seq(nucAN), 'AN'),
                               SeqIO.SeqRecord(Seq(nucHS), 'HS'),
                               SeqIO.SeqRecord(Seq(nucTX), 'TX'))
                    SeqIO.write(records, 'seq.fasta', "fasta")
                    cline = ClustalwCommandline("clustalw2", infile="seq.fasta", output="PHYLIP")
                    clustalOutput = cline()
                    if verbose:
                        print clustalOutput
                    align = AlignIO.read("seq.phy", "phylip")
                else:
                    align = MultipleSeqAlignment(
                        [SeqIO.SeqRecord(Seq(nucAN.upper()), 'AN'),
                         SeqIO.SeqRecord(Seq(nucHS.upper()), 'HS'),
                         SeqIO.SeqRecord(Seq(nucTX.upper()), 'TX')
                         ])

                if verbose:
                    print align

                badSubjects = []
                goodSubjects = []
                for i, s in enumerate(subjects2):
                        # print s,
                        l = [k for k in align if (k.id == s)]
                        nuc = str(l[0].seq)
                        Ac = len([n for n in xrange(len(nuc)) if nuc.find('A', n) == n])
                        Tc = len([n for n in xrange(len(nuc)) if nuc.find('T', n) == n])
                        Gc = len([n for n in xrange(len(nuc)) if nuc.find('G', n) == n])
                        Cc = len([n for n in xrange(len(nuc)) if nuc.find('C', n) == n])
                        GCc = len([n for n in xrange(len(nuc)) if nuc.find('GC', n) == n])
                        CGc = len([n for n in xrange(len(nuc)) if nuc.find('CG', n) == n])
                        Nc = len([n for n in xrange(len(nuc)) if nuc.find('N', n) == n])
                        BadCod = 0
                        TotCod = 0
                        GC12c = 0
                        GC3c = 0
                        for n in xrange(0, len(nuc), 3):
                            TotCod = TotCod + 1
                            if 'N' in nuc[n:(n + 3)]:
                                BadCod = BadCod + 1
                            else:
                                try:
                                    GC3c = GC3c + (nuc[n + 2] == 'C') + (nuc[n + 2] == 'G')
                                    GC12c = GC12c + (nuc[n] == 'C') + (nuc[n] == 'G') + (nuc[n + 1] == 'C') + (nuc[n + 1] == 'G')
                                except:
                                    BadCod = BadCod + 1
                        DNAc = len(nuc)
                        if (Ac + Tc + Gc + Cc) > 0:
                            GCcontent = (Gc + Cc) * 1. / (Ac + Tc + Gc + Cc)
                        else:
                            GCcontent = -1
                        if TotCod > 0:
                            with open(filename, "a") as myfile:
                                myfile.write(str(DNAc) + ' ' + str(BadCod / (TotCod * 1.)) + ' ' + str(Ac / (DNAc * 1.)) + ' ' + str(Tc / (DNAc * 1.)) + ' ' + str(Gc / (DNAc * 1.)) + ' ' + str(Cc / (DNAc * 1.)) + ' ' + str(Nc / (DNAc * 1.)) + ' ' + str(GCcontent) + ' ' + str(GC12c / (TotCod * 2.)) + ' ' + str(GC3c / (TotCod * 1.)))
                        else:
                            with open(filename, "a") as myfile:
                                myfile.write(str(DNAc) + ' -1 -1 -1 -1 -1 -1 -1 -1 -1')
                        if DNAc == (Ac + Tc + Gc + Cc + Nc):
                            with open(filename, "a") as myfile:
                                if BadCod > TotCod * QualityLevel:
                                    badSubjects.append(i)
                                    myfile.write(' lq ')
                                else:
                                    goodSubjects.append(i)
                                    myfile.write(' ok ')
                        else:
                            with open(filename, "a") as myfile:
                                myfile.write(' wc ')

                alignSelected = MultipleSeqAlignment([align[k] for k in goodSubjects])

                if (len(align[0].seq) != 0) and (len(alignSelected) != 0):
                    AlignIO.write(alignSelected, 'seq2.phy', "phylip-sequential")

                    bml = baseml.Baseml()
                    yn = yn00.Yn00()
                    yn.alignment = "seq2.phy"
                    yn.out_file = "results.out"
                    yn.set_options(verbose=True, icode=2)
                    yn.write_ctl_file()
                    yn.working_dir = "."
                    yn.read_ctl_file('yn00.ctl')

                    if verbose:
                        yn.print_options()

                    try:
                        results = yn.run()
                        model = 'YN00'
                        for i, n in enumerate(subjects2):
                            for j, m in enumerate(subjects2[i + 1:]):
                                for v in values:
                                    with open(filename, "a") as myfile:
                                        if (i in goodSubjects) and (j + i + 1 in goodSubjects):
                                            myfile.write(str(results[n][m][model][v]) + ' ')
                                        else:
                                            myfile.write('lq ')

                        with open(filename, "a") as myfile:
                            myfile.write('OK\n')
                    except:
                        for i, n in enumerate(subjects2):
                            for m in subjects[i + 1:]:
                                for v in values:
                                    with open(filename, "a") as myfile:
                                        myfile.write('na ')
                        with open(filename, "a") as myfile:
                            myfile.write('YN00\n')
                else:
                    for i, n in enumerate(subjects2):
                            for m in subjects[i + 1:]:
                                for v in values:
                                    with open(filename, "a") as myfile:
                                        myfile.write('na ')
                    with open(filename, "a") as myfile:
                        myfile.write('CDS\n')
        current_time = datetime.datetime.now().time()
        with open(filenameLog, "a") as myfile:
            myfile.write('Analyses stops at ' + current_time.isoformat() + '\n')
    del SeqDictTX
