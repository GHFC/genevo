#!/usr/bin/env python
# coding=utf-8
# ==============================================================================
# author          : Guillaume Dumas
# date            : 2016-05-19
# ==============================================================================

import pandas as pd

threshold = 2
taxons = ['altai', 'denisovan', 'sidron', 'vindija', 'pantro', 'rheMac3',
          'papHam1', 'tarSyr1', 'ponAbe2', 'papHam1', 'mm10', 'micMur1',
          'gorGor3', 'calJac3']
QualityLabel = ['hq', 'mq', 'lq']

for indexQuality, QualityLevel in enumerate([0.2, 0.5, 0.8]):
    print "Quality = " + QualityLabel[indexQuality]
    dfs = pd.DataFrame()
    for taxa in taxons:
        print taxa
        df = pd.read_csv("CSV/dNdS_" + taxa + "_" + QualityLabel[indexQuality] + '_' + str(int(QualityLevel*100)) + "ProteinCoding.csv", low_memory=False)

        if taxa!='altai':
            df.drop(['Unnamed: 0','EntrezId','Unnamed: 0.1','Gene','GeneLength','EnsemblId','GeneType','CDS','AN.DNAc','AN.BadCodc','AN.Ac','AN.Tc','AN.Gc','AN.Cc','AN.Nc','AN.GCcontent','AN.GC12c','AN.GC3c','AN.debug','HS.DNAc','HS.BadCodc','HS.Ac','HS.Tc','HS.Gc','HS.Cc','HS.Nc','HS.GCcontent','HS.GC12c','HS.GC3c','HS.debug'], inplace=True, axis=1)

        dfs = pd.concat([dfs, df], axis=1)
    dfs.to_csv("CSV/dNdS_Global_" + QualityLabel[indexQuality] + '_' + str(int(QualityLevel*100)) + "ProteinCoding.csv")
