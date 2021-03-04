#!/usr/bin/env python
# coding=utf-8
# ==============================================================================
# author          : Guillaume Dumas
# date            : 2016-11-23
# ==============================================================================

# Load FASTA

from Bio import SeqIO

filename = "fa/hg19_ref.fa"
inputSeqFile = open(filename, "rU")
SeqDictHS = SeqIO.to_dict(SeqIO.parse(inputSeqFile, "fasta"))
inputSeqFile.close()
print "HS:", SeqDictHS.keys()

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

verbose = False
clustalAlignment = False

CCDS_Final = pd.read_csv('CCDS.csv')
CCDS_Final.Chrom = CCDS_Final.Chrom.apply(str)

QualityLabel = ['hq', 'mq', 'lq']
values = ['N', 'S', 'dN', 'dS', 'omega', 'kappa', 't']
subjects2 = ['HS1', 'HS2']

subjects = ['HS1', 'HS2']
filename = "CSV/pNpS_CCDS_NoORF_PB.csv"

with open(filename, "w") as myfile:
    myfile.write('index gene EntrezId CDS ')
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
    if idx >= 0:
        row = tmp[1]
        chrom = 'chr' + row['Chrom']
        strand = row['Strand']
        cds_pos = row['CDS_positions']

        if verbose:
            print row['Gene'], chrom, strand, cds_pos, '\n'
        with open(filename, "a") as myfile:
            myfile.write("%i %s %s " % (idx, row['Gene'], row['EntrezID']))

        sequenceHS1 = ""
        sequenceHS2 = ""

        for index, exon in enumerate(cds_pos.replace('[','').replace(']','').replace('\'','').replace(' ','').split(',')):
            eS = int(exon.split('-')[0])
            eE = int(exon.split('-')[1]) + 1
            if verbose:
                print "\nCDS part #", index + 1, "from", eS, "to", eE
                print str(SeqDictHS[chrom].seq[eS:eE])
            sequenceHS1 = sequenceHS1 + str(SeqDictHS[chrom].seq[eS:eE]).upper()
            sequenceHS2 = sequenceHS2 + str(SeqDictHS[chrom].seq[eS:eE]).upper()

        # CDS = getcds(sequenceHS,strand);
        CDS = {"start": 0, "end": len(sequenceHS1), "strand": strand}
        if strand == '-':
            nucHS1 = reverse_complement(sequenceHS1)[CDS['start']:CDS['end']]
            nucHS2 = reverse_complement(sequenceHS2)[CDS['start']:CDS['end']]
        else:
            nucHS1 = sequenceHS1[CDS['start']:CDS['end']]
            nucHS2 = sequenceHS2[CDS['start']:CDS['end']]

        if (nucHS1[-3:] == 'TAG') or (nucHS1[-3:] == 'TAA') or (nucHS1[-3:] == 'TGA'):
            nucHS1 = nucHS1[:-3]
            nucHS2 = nucHS2[:-3]

        if row['Gene']=='COL26A1':
            nucHS1 = nucHS1[:1200-14]+"G"+nucHS1[1200-14:]
            nucHS2 = nucHS2[:1200-14]+"G"+nucHS2[1200-14:]

        if row['Gene']=='TMEM247':
            nucHS1 = nucHS1[:-3]
            nucHS2 = nucHS2[:-3]

        if row['Gene']=='P3H3':
            nucHS1 = nucHS1[:419]+"G"+nucHS1[419:]
            nucHS2 = nucHS2[:419]+"G"+nucHS2[419:]

        for i in range(len(nucHS1)/3):
            n = i*3
            if (nucHS1[n:n+3] == 'TAG') or (nucHS1[n:n+3] == 'TAA') or (nucHS1[n:n+3] == 'TGA'):
                print nucHS1[n:n+3]
                nucHS1 = nucHS1[:n]+'NNN'+nucHS1[n+3:]
                nucHS2 = nucHS2[:n]+'NNN'+nucHS2[n+3:]
                print row['Gene'], "has SELENOCISTEIN ?!? at codon", n

        if verbose:
            print "HS1 :\t", len(nucHS1), nucHS1[0:30] + "..." + nucHS1[-10:]
            print "HS2 :\t", len(nucHS2), nucHS2[0:30] + "..." + nucHS2[-10:]

        with open(filename, "a") as myfile:
            myfile.write("%i " % len(nucHS1))

        if clustalAlignment:
            records = (SeqIO.SeqRecord(Seq(nucHS1), 'HS1'),
                       SeqIO.SeqRecord(Seq(nucHS2), 'HS2'))
            SeqIO.write(records, 'seq.fasta', "fasta")
            cline = ClustalwCommandline("clustalw2", infile="seq.fasta", output="PHYLIP")
            clustalOutput = cline()
            if verbose:
                print clustalOutput
            align = AlignIO.read("seq.phy", "phylip")
        else:
            align = MultipleSeqAlignment(
                [SeqIO.SeqRecord(Seq(nucHS1.upper()), 'HS1'),
                 SeqIO.SeqRecord(Seq(nucHS2.upper()), 'HS2')
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
                        if BadCod > 20:
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
        else:
            for i, n in enumerate(subjects2):
                    for m in subjects[i + 1:]:
                        for v in values:
                            with open(filename, "a") as myfile:
                                myfile.write('na ')
            with open(filename, "a") as myfile:
                myfile.write('CDS\n')