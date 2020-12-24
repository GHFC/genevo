#!/usr/bin/env python
# coding=utf-8
# ==============================================================================
# author          : Guillaume Dumas
# date            : 2015-08-18
# ==============================================================================

# Fasta generation

from Bio import SeqIO
filename = "./FA/hg19_ref.fa"
inputSeqFile = open(filename, "rU")
SeqDictHS = SeqIO.to_dict(SeqIO.parse(inputSeqFile, "fasta"))
inputSeqFile.close()
print "HS:", SeqDictHS.keys()

filename = "./FA/neutral.fa"
inputSeqFile = open(filename, "rU")
SeqDictNA = SeqIO.to_dict(SeqIO.parse(inputSeqFile, "fasta"))
inputSeqFile.close()
print "NA:", SeqDictNA.keys()

from Bio.Seq import MutableSeq
# from Bio.Alphabet import generic_dna


def findall(sub, text):
    return [n for n in xrange(len(text)) if text.find(sub, n) == n]
chLab = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13',
         '14', '15', '16', '17', '18', '19', '20', '21', '22', 'X', 'Y']
taxonsLab = ['panTro4', 'rheMac3','ponAbe2', 'gorGor3', 'papHam1', 'calJac3', 'tarSyr1', 'micMur1', 'mm10'] 

for taxon in taxonsLab:
    accu = []
    print taxon
    for ch in range(0, 24):
        chrom = 'chr' + chLab[ch]
        if chrom=='chr1':
            print "Let's start with",
        else:
            print "Now heading to",
        print chrom
        
        chromHS = SeqDictHS[chrom].seq.tomutable()
        chromNA = SeqDictNA[chrom].seq.tomutable()
        # type(chromNA)
        alignmentFile = './FA/' \
                        + chrom + '.hg19.' + taxon + '.net.axt'
        file = open(alignmentFile, 'r')
        bin = 0
        for line in file:
            if (line[0] != '#') and (line[0] != '\n'):
                if bin % 3 == 0:
                    tmp = line.split(' ')[1:4]
                    print bin % 3, line
                    print "HS19", chromHS[int(tmp[1]) - 1:int(tmp[2])]
                if bin % 3 == 1:
                    deletions = findall("-", line)
                    print "HS", bin % 3, line
                if bin % 3 == 2:
                    print len(chromNA[int(tmp[1]) - 1:int(tmp[2])])
                    print "TX", bin % 3, line
                    l = list(line[:-1])  # convert to list
                    offset = 0
                    for d in deletions:
                        del(l[d - offset])   # another way to delete it
                        offset += 1
                        line = "".join(l)    # convert back to string
                        # print len(line)
                        chromNA[int(tmp[1]) - 1:int(tmp[2])] = line
                    print "TX", bin % 3, line
                bin += 1
            # if bin > 3:
            #     break
        SeqDictNA[chrom].seq = chromNA.toseq()
    
    chLab=['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','X','Y']
    accu=[]
    for ch in range(0,24):
        chrom = 'chr'+chLab[ch]
        accu.append(SeqDictNA[chrom])

    filename = "./FA/" + taxon + ".fa"
    output_handle = open(filename, "w")
    SeqIO.write(accu, output_handle, "fasta")
    output_handle.close()

    inputSeqFile = open(filename, "rU")
    SeqDictPT = SeqIO.to_dict(SeqIO.parse(inputSeqFile, "fasta"))
    inputSeqFile.close()
    print "PT:", SeqDictPT.keys()

    for ch in range(0, 24):
        chrom = 'chr' + chLab[ch]
        print len(SeqDictHS[chrom]), len(SeqDictPT[chrom])


# VCF Generation

from Bio import SeqIO

handle1 = open("../fa_bed/hg19_ref.fa", "rU")
records1 = list(SeqIO.parse(handle1, "fasta"))

handle2 = open("../fa_bed/6epo.fa", "rU")
records2 = list(SeqIO.parse(handle2, "fasta"))

chLab = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13',
         '14', '15', '16', '17', '18', '19', '20', '21', '22', 'X', 'Y']

for ch in range(0, 24):
    print 'Ch' + chLab[ch]
    f = open('../VCF/Ancestor_Ch' + chLab[ch] + '_full.vcf', 'w')
    f.write('##fileformat=VCFv4.1\n')  # python will convert \n to os.linesep
    f.write('#CHROM\tPOS\tID\tREF\tALT\tQUAL\tFILTER\tINFO\tFORMAT\tHG19\n')
    filteredSeq1 = (records1[ch].seq).upper()
    filteredSeq2 = (records2[ch].seq).upper()
    for n in range(0, len(filteredSeq1)):
        print(chLab[ch] + '\t' + str(n + 1) + '\t.\t' + filteredSeq1[n] +
              '\t' + filteredSeq2[n] + '\t.\t.\t.\t.\t.\n')

    f.close()  # you can omit in most cases as the destructor will call if

handle1.close()
handle2.close()

from subprocess import call

call(['./toVCFGZ_full.sh'])

call(['~/Logiciels/vcftools_0.1.12a/perl/vcf-concat Ancestor_Ch1_full.vcf.gz \
    Ancestor_Ch2_full.vcf.gz Ancestor_Ch3_full.vcf.gz \
    Ancestor_Ch4_full.vcf.gz Ancestor_Ch5_full.vcf.gz \
    Ancestor_Ch6_full.vcf.gz Ancestor_Ch7_full.vcf.gz \
    Ancestor_Ch8_full.vcf.gz Ancestor_Ch9_full.vcf.gz \
    Ancestor_Ch10_full.vcf.gz Ancestor_Ch11_full.vcf.gz \
    Ancestor_Ch12_full.vcf.gz Ancestor_Ch13_full.vcf.gz \
    Ancestor_Ch14_full.vcf.gz Ancestor_Ch15_full.vcf.gz \
    Ancestor_Ch16_full.vcf.gz Ancestor_Ch17_full.vcf.gz \
    Ancestor_Ch18_full.vcf.gz Ancestor_Ch19_full.vcf.gz \
    Ancestor_Ch20_full.vcf.gz Ancestor_Ch21_full.vcf.gz \
    Ancestor_ChX_full.vcf.gz Ancestor_ChY_full.vcf.gz \
    | ~/Logiciels/tabix-0.2.6/bgzip -c > Ancestor_full.vcf.gz'])
