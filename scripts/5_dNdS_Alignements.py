#!/usr/bin/env python
# coding=utf-8
# ==============================================================================
# author          : Guillaume Dumas
# date            : 2016-10-07
# ==============================================================================

from Bio.Data import CodonTable
standard_table = CodonTable.unambiguous_dna_by_name["Standard"]

standard_table.forward_table = {'AAA': 'K',
                                'AAC': 'N',
                                'AAG': 'K',
                                'AAT': 'N',
                                'ACA': 'T',
                                'ACC': 'T',
                                'ACG': 'T',
                                'ACT': 'T',
                                'AGA': 'R',
                                'AGC': 'S',
                                'AGG': 'R',
                                'AGT': 'S',
                                'ATA': 'I',
                                'ATC': 'I',
                                'ATG': 'M',
                                'ATT': 'I',
                                'CAA': 'Q',
                                'CAC': 'H',
                                'CAG': 'Q',
                                'CAT': 'H',
                                'CCA': 'P',
                                'CCC': 'P',
                                'CCG': 'P',
                                'CCT': 'P',
                                'CGA': 'R',
                                'CGC': 'R',
                                'CGG': 'R',
                                'CGT': 'R',
                                'CTA': 'L',
                                'CTC': 'L',
                                'CTG': 'L',
                                'CTT': 'L',
                                'GAA': 'E',
                                'GAC': 'D',
                                'GAG': 'E',
                                'GAT': 'D',
                                'GCA': 'A',
                                'GCC': 'A',
                                'GCG': 'A',
                                'GCT': 'A',
                                'GGA': 'G',
                                'GGC': 'G',
                                'GGG': 'G',
                                'GGT': 'G',
                                'GTA': 'V',
                                'GTC': 'V',
                                'GTG': 'V',
                                'GTT': 'V',
                                'TAC': 'Y',
                                'TAT': 'Y',
                                'TCA': 'S',
                                'TCC': 'S',
                                'TCG': 'S',
                                'TCT': 'S',
                                'TGC': 'C',
                                'TGG': 'W',
                                'TGT': 'C',
                                'TTA': 'L',
                                'TTC': 'F',
                                'TTG': 'L',
                                'TTT': 'F',
                                'CTN': '?',
                                'AAN': '?',
                                'ATN': '?',
                                'AGN': '?',
                                'ACN': '?',
                                'ANA': '?',
                                'ANT': '?',
                                'ANG': '?',
                                'ANC': '?',
                                'ANN': '?',
                                'TAN': '?',
                                'TTN': '?',
                                'TGN': '?',
                                'TCN': '?',
                                'TNA': '?',
                                'TNT': '?',
                                'TNG': '?',
                                'TNC': '?',
                                'TNN': '?',
                                'GAN': '?',
                                'GTN': '?',
                                'GGN': '?',
                                'GCN': '?',
                                'GNA': '?',
                                'GNT': '?',
                                'GNG': '?',
                                'GNC': '?',
                                'GNN': '?',
                                'CAN': '?',
                                'CTN': '?',
                                'CGN': '?',
                                'CCN': '?',
                                'CNA': '?',
                                'CNT': '?',
                                'CNG': '?',
                                'CNC': '?',
                                'CNN': '?',
                                'NAA': '?',
                                'NAT': '?',
                                'NAG': '?',
                                'NAC': '?',
                                'NAN': '?',
                                'NTA': '?',
                                'NTT': '?',
                                'NTG': '?',
                                'NTC': '?',
                                'NTN': '?',
                                'NGA': '?',
                                'NGT': '?',
                                'NGG': '?',
                                'NGC': '?',
                                'NGN': '?',
                                'NCA': '?',
                                'NCT': '?',
                                'NCG': '?',
                                'NCC': '?',
                                'NCN': '?',
                                'NNA': '?',
                                'NNT': '?',
                                'NNG': '?',
                                'NNC': '?',
                                'NNN': '?',
                                'AA-': '-',
                                'AT-': '-',
                                'AG-': '-',
                                'AC-': '-',
                                'A-A': '-',
                                'A-T': '-',
                                'A-G': '-',
                                'A-C': '-',
                                'A--': '-',
                                'TA-': '-',
                                'TT-': '-',
                                'TG-': '-',
                                'TC-': '-',
                                'T-A': '-',
                                'T-T': '-',
                                'T-G': '-',
                                'T-C': '-',
                                'T--': '-',
                                'GA-': '-',
                                'GT-': '-',
                                'GG-': '-',
                                'GC-': '-',
                                'G-A': '-',
                                'G-T': '-',
                                'G-G': '-',
                                'G-C': '-',
                                'G--': '-',
                                'CA-': '-',
                                'CT-': '-',
                                'CG-': '-',
                                'CC-': '-',
                                'C-A': '-',
                                'C-T': '-',
                                'C-G': '-',
                                'C-C': '-',
                                'C--': '-',
                                '-AA': '-',
                                '-AT': '-',
                                '-AG': '-',
                                '-AC': '-',
                                '-A-': '-',
                                '-TA': '-',
                                '-TT': '-',
                                '-TG': '-',
                                '-TC': '-',
                                '-T-': '-',
                                '-GA': '-',
                                '-GT': '-',
                                '-GG': '-',
                                '-GC': '-',
                                '-G-': '-',
                                '-CA': '-',
                                '-CT': '-',
                                '-CG': '-',
                                '-CC': '-',
                                '-C-': '-',
                                '--A': '-',
                                '--T': '-',
                                '--G': '-',
                                '--C': '-',
                                '---': '-',
                                'A-N': '-',
                                'AN-': '-',
                                'T-N': '-',
                                'TN-': '-',
                                'G-N': '-',
                                'GN-': '-',
                                'C-N': '-',
                                'CN-': '-',
                                '-AN': '-',
                                '-TN': '-',
                                '-GN': '-',
                                '-CN': '-',
                                '--N': '-',
                                '-NA': '-',
                                '-NT': '-',
                                '-NG': '-',
                                '-NC': '-',
                                '-N-': '-',
                                '-NN': '-',
                                'NA-': '-',
                                'NT-': '-',
                                'NG-': '-',
                                'NC-': '-',
                                'N-A': '-',
                                'N-T': '-',
                                'N-G': '-',
                                'N-C': '-',
                                'N--': '-',
                                'N-N': '-',
                                'NN-': '-'}


from Bio.Seq import reverse_complement, translate
import pandas as pd
from Bio.Align.Applications import ClustalwCommandline
from Bio import AlignIO
from Bio.Phylo.PAML import baseml, yn00
from Bio.Seq import Seq
from Bio.Align import MultipleSeqAlignment
from Bio import SeqIO


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

CCDS_Final = pd.read_csv('/Users/gdumas/Dropbox/science/archive/GHFC/GenesLists/CCDS_Used.csv')

filename = "fa/hg19_ref.fa"
inputSeqFile = filename;  # open(filename, "rU")
SeqDictHS = SeqIO.to_dict(SeqIO.parse(inputSeqFile, "fasta"))
#inputSeqFile.close()
print("HS:", SeqDictHS.keys())

filename = "fa/ancestor.fa"
inputSeqFile = filename;  # open(filename, "rU")
SeqDictAN = SeqIO.to_dict(SeqIO.parse(inputSeqFile, "fasta"))
#inputSeqFile.close()
print("AN:", SeqDictAN.keys())


taxons = ['altai', 'denisovan', 'sidron', 'vindija', 'pantro', 'rheMac3',
          'papHam1', 'tarSyr1', 'ponAbe2', 'papHam1', 'mm10', 'micMur1',
          'gorGor3', 'calJac3']

taxa = 'altai'
filename = "FA/" + taxa + ".fa"
inputSeqFile = filename  # open(filename, "rU")
SeqDictNH = SeqIO.to_dict(SeqIO.parse(inputSeqFile, "fasta"))

taxa = 'denisovan'
filename = "FA/" + taxa + ".fa"
inputSeqFile = filename  # open(filename, "rU")
SeqDictDS = SeqIO.to_dict(SeqIO.parse(inputSeqFile, "fasta"))

taxa = 'pantro'
filename = "FA/" + taxa + ".fa"
inputSeqFile = filename  # open(filename, "rU")
SeqDictPT = SeqIO.to_dict(SeqIO.parse(inputSeqFile, "fasta"))

taxa = 'gorGor3'
filename = "FA/" + taxa + ".fa"
inputSeqFile = filename  # open(filename, "rU")
SeqDictGG = SeqIO.to_dict(SeqIO.parse(inputSeqFile, "fasta"))

taxa = 'ponAbe2'
filename = "FA/" + taxa + ".fa"
inputSeqFile = filename  # open(filename, "rU")
SeqDictPA = SeqIO.to_dict(SeqIO.parse(inputSeqFile, "fasta"))

taxa = 'rheMac3'
filename = "FA/" + taxa + ".fa"
inputSeqFile = filename  # open(filename, "rU")
SeqDictRH = SeqIO.to_dict(SeqIO.parse(inputSeqFile, "fasta"))

taxa = 'calJac3'
filename = "FA/" + taxa + ".fa"
inputSeqFile = filename  # open(filename, "rU")
SeqDictCJ = SeqIO.to_dict(SeqIO.parse(inputSeqFile, "fasta"))


idx = 0
for tmp in CCDS_Final.iterrows():
    idx += 1
    if idx >= 0:
        row = tmp[1]
        entrezid = row['EntrezID']
        chrom = 'chr' + row['Chrom']
        strand = row['Strand']
        cds_pos = row['CDS_positions']
        genename = row['Gene']

        print(chrom, genename, strand)

        sequenceAN = ""
        sequenceHS = ""
        sequenceNH = ""
        sequenceDS = ""
        sequencePT = ""
        sequenceGG = ""
        sequencePA = ""
        sequenceRH = ""
        sequenceCJ = ""

        for index, exon in enumerate(cds_pos.replace('[','').replace(']','').replace('\'','').replace(' ','').split(',')):
            eS = int(exon.split('-')[0])
            eE = int(exon.split('-')[1]) + 1
            sequenceHS = sequenceHS + str(SeqDictHS[chrom].seq[eS:eE])
            sequenceAN = sequenceAN + str(SeqDictAN[chrom].seq[eS:eE])
            sequenceNH = sequenceNH + str(SeqDictNH[chrom].seq[eS:eE])
            sequenceDS = sequenceDS + str(SeqDictDS[chrom].seq[eS:eE])
            sequencePT = sequencePT + str(SeqDictPT[chrom].seq[eS:eE])
            sequenceGG = sequenceGG + str(SeqDictGG[chrom].seq[eS:eE])
            sequencePA = sequencePA + str(SeqDictPA[chrom].seq[eS:eE])
            sequenceRH = sequenceRH + str(SeqDictRH[chrom].seq[eS:eE])
            sequenceCJ = sequenceCJ + str(SeqDictCJ[chrom].seq[eS:eE])

        # CDS = getcds(sequenceHS,strand);
        CDS = {"start": 0, "end": len(sequenceHS), "strand": strand}
        if strand == '-':
            nucAN = reverse_complement(sequenceAN)[CDS['start']:CDS['end']]
            nucHS = reverse_complement(sequenceHS)[CDS['start']:CDS['end']]
            nucNH = reverse_complement(sequenceNH)[CDS['start']:CDS['end']]
            nucDS = reverse_complement(sequenceDS)[CDS['start']:CDS['end']]
            nucPT = reverse_complement(sequencePT)[CDS['start']:CDS['end']]
            nucGG = reverse_complement(sequenceGG)[CDS['start']:CDS['end']]
            nucPA = reverse_complement(sequencePA)[CDS['start']:CDS['end']]
            nucRH = reverse_complement(sequenceRH)[CDS['start']:CDS['end']]
            nucCJ = reverse_complement(sequenceCJ)[CDS['start']:CDS['end']]
        else:
            nucAN = sequenceAN[CDS['start']:CDS['end']]
            nucHS = sequenceHS[CDS['start']:CDS['end']]
            nucNH = sequenceNH[CDS['start']:CDS['end']]
            nucDS = sequenceDS[CDS['start']:CDS['end']]
            nucPT = sequencePT[CDS['start']:CDS['end']]
            nucGG = sequenceGG[CDS['start']:CDS['end']]
            nucPA = sequencePA[CDS['start']:CDS['end']]
            nucRH = sequenceRH[CDS['start']:CDS['end']]
            nucCJ = sequenceCJ[CDS['start']:CDS['end']]

        with open(filename, "a") as myfile:
            myfile.write("%i " % len(nucHS))

        align = MultipleSeqAlignment(
            [SeqIO.SeqRecord(Seq(nucAN.upper()), id='6epo', description='Ancestor'),
             SeqIO.SeqRecord(Seq(nucHS.upper()), id='hg19', description='Homo sapiens'),
             SeqIO.SeqRecord(Seq(nucNH.upper()), id='altai', description='Neanderthal'),
             SeqIO.SeqRecord(Seq(nucDS.upper()), id='denisovan', description='Denisovan'),
             SeqIO.SeqRecord(Seq(nucPT.upper()), id='panTro4', description='Pan troglodytes'),
             SeqIO.SeqRecord(Seq(nucGG.upper()), id='gorGor3', description='Gorilla gorilla'),
             SeqIO.SeqRecord(Seq(nucPA.upper()), id='ponAbe2', description='Pongo abelii'),
             SeqIO.SeqRecord(Seq(nucRH.upper()), id='rheMac3', description='Macaca mulatta'),
             SeqIO.SeqRecord(Seq(nucCJ.upper()), id='calJac3', description='Callithrix jacchus')
             ])

        print("DNA:")
        print(align)

        output_handle = open("Sequences_new/"+str(entrezid)+"_"+genename+"_DNA.fasta", "w")
        SeqIO.write(align, output_handle, "fasta")
        output_handle.close()

        # http://biopython.org/DIST/docs/api/Bio.Seq-module.html
        # taxons = ['altai', 'denisovan', 'sidron', 'vindija', 'pantro', 'rheMac3',
        #   'papHam1', 'tarSyr1', 'ponAbe2', 'papHam1', 'mm10', 'micMur1',
        #   'gorGor3', 'calJac3']
        align = MultipleSeqAlignment(
            [SeqIO.SeqRecord(translate(Seq(nucAN.upper()), table=standard_table), id='6epo', description='Ancestor'),
             SeqIO.SeqRecord(translate(Seq(nucHS.upper()), table=standard_table), id='hg19', description='Homo sapiens'),
             SeqIO.SeqRecord(translate(Seq(nucNH.upper()), table=standard_table), id='altai', description='Neanderthal'),
             SeqIO.SeqRecord(translate(Seq(nucDS.upper()), table=standard_table), id='denisovan', description='Denisovan'),
             SeqIO.SeqRecord(translate(Seq(nucPT.upper()), table=standard_table), id='panTro4', description='Pan troglodytes'),
             SeqIO.SeqRecord(translate(Seq(nucGG.upper()), table=standard_table), id='gorGor3', description='Gorilla gorilla'),
             SeqIO.SeqRecord(translate(Seq(nucPA.upper()), table=standard_table), id='ponAbe2', description='Pongo abelii'),
             SeqIO.SeqRecord(translate(Seq(nucRH.upper()), table=standard_table), id='rheMac3', description='Macaca mulatta'),
             SeqIO.SeqRecord(translate(Seq(nucCJ.upper()), table=standard_table), id='calJac3', description='Callithrix jacchus')
             ])

        print("\nProtein:")
        print(align)

        output_handle = open("Sequences_new/"+str(entrezid)+"_"+genename+"_PROT.fasta", "w")
        SeqIO.write(align, output_handle, "fasta")
        output_handle.close()
