#!/usr/bin/env python
# coding=utf-8
# ==============================================================================
# author          : Guillaume Dumas
# date            : 2016-11-28
# ==============================================================================

import pandas as pd

taxons = ['altai', 'denisovan', 'sidron', 'vindija', 'pantro', 'rheMac3',
          'papHam1', 'tarSyr1', 'ponAbe2', 'papHam1', 'mm10', 'micMur1',
          'gorGor3', 'calJac3']
QualityLabel = ['hq', 'mq', 'lq']

for taxa in taxons:
    print taxa
    for indexQuality, QualityLevel in enumerate([0.2, 0.5, 0.8]):
        print "Processing", QualityLabel[indexQuality], 'CCDS with', str(int(QualityLevel*100)), '% coverage minimum'
        filename = "CSV/dNdS_CCDS_" + taxa + "_" + QualityLabel[indexQuality] + '_' + str(int(QualityLevel * 100)) + "_NoORF.csv"
        df3 = pd.read_csv(filename, low_memory=False, sep=' ')
        df3.rename(columns={'gene': 'Gene'}, inplace=True)
        df4 = pd.read_csv("/Users/gdumas/Dropbox/science/Pasteur/genesLists/GeneLength_CCDS.csv", low_memory=False)
        df5 = df4.merge(df3, on='Gene')
        df5.drop(['Unnamed: 0', 'Chrom', 'Source', 'Feature', 'Start', 'Stop', 'Score', 'Strand', 'Phase', 'index'], axis=1, inplace=True)
        df5.to_csv("CSV/dNdS_CCDS_" + taxa + "_" + QualityLabel[indexQuality] + '_' + str(int(QualityLevel*100)) + "_NoORF_Final.csv")
