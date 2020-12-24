#!/usr/bin/env python
# coding=utf-8
# ==============================================================================
# author          : Guillaume Dumas
# date            : 2016-11-28
# ==============================================================================

import pandas as pd
import statsmodels.formula.api as sm
import numpy as np

proteinCoding = "ProteinCodingGenes_GrC37.csv"
prot = pd.read_csv(proteinCoding)
prot.rename(columns={'EntrezID':'EntrezId'}, inplace=True)

def Huguet(row):
    if (row[raw]=='lq')|(row[raw]=='na'):
        val=np.nan
    else:
        if float(row[raw])==0:
            if float(row[dS])==0:
                val=(1/float(row[N]))/(1/float(row[S]))
            else:
                val=(1/float(row[N]))/float(row[dS])
        else:
            if float(row[raw])==99:
                if float(row[dN])==0:
                    val=(1/float(row[N]))/(1/float(row[S]))
                else:
                    val=float(row[dN])/(1/float(row[S]))
            else:
                val=float(row[raw])
    return val

threshold = 2
taxons = ['altai', 'denisovan', 'sidron', 'vindija', 'pantro', 'rheMac3',
          'papHam1', 'tarSyr1', 'ponAbe2', 'papHam1', 'mm10', 'micMur1',
          'gorGor3', 'calJac3']
QualityLabel = ['hq', 'mq', 'lq']

for taxa in taxons:
    for indexQuality, QualityLevel in enumerate([0.2, 0.5, 0.8]):
	    df = pd.read_csv("CSV/dNdS_CCDS_" + taxa + "_" + QualityLabel[indexQuality] + '_' + str(int(QualityLevel*100)) + "_NoORF_Final.csv", low_memory=False)
	    dnds = pd.merge(pd.DataFrame(prot.EntrezId), df, on="EntrezId", how="inner")
	    for t in ['HS', taxa]:
	        N='AN.'+t+'.N'
	        dN='AN.'+t+'.dN'
	        S='AN.'+t+'.S'
	        dS='AN.'+t+'.dS'        
	        raw='AN.'+t+'.omega'
	        OmegaHuguet='AN.'+t+'.OmegaHuguet'
	        dnds[OmegaHuguet]=dnds[[N,dN,S,dS,raw]].apply(Huguet, axis=1)

	        LogOmegaHuguet='AN.'+t+'.LogOmegaHuguet'
	        dnds[LogOmegaHuguet]=np.log(dnds[OmegaHuguet])
	        
	        corrected='AN.'+t+'.OmegaGC12'
	        normalized='AN.'+t+'.OmegaGC12Normalized'
	        typed='AN.'+t+'.Type'
	        
	        tmp=dnds.loc[~(dnds[LogOmegaHuguet]!=dnds[LogOmegaHuguet]),['HS.GC12c',LogOmegaHuguet]]
	        tmp.rename(columns={LogOmegaHuguet:'A','HS.GC12c': 'B'}, inplace = True)
	        result = sm.ols(formula="A ~ B + pow(B,2)", data=tmp).fit()
	        print result.params
	        print result.summary()
	        newValues = tmp[np.isfinite(tmp['A'])]['A'].values - result.predict()
	        dnds.loc[np.isfinite(dnds[LogOmegaHuguet]), corrected] = newValues
	        Zscore = (newValues - newValues.mean()) /newValues.std()
	        dnds.loc[np.isfinite(dnds[LogOmegaHuguet]), normalized] = Zscore
            
	        
	        posList = np.isfinite(dnds[LogOmegaHuguet]) * dnds[normalized] > threshold
	        dnds.loc[posList, typed] = "Positive"
	        negList = np.isfinite(dnds[LogOmegaHuguet]) * dnds[normalized] < -threshold
	        dnds.loc[negList, typed] = "Negative"
	        neuList = (np.isfinite(dnds[LogOmegaHuguet]) *
	                   (dnds[normalized] < threshold) *
	                   (dnds[normalized] > -threshold))
	        dnds.loc[neuList, typed] = "Neutral"
	        misList = np.isnan(dnds[LogOmegaHuguet])
	        dnds.loc[misList, typed] = "Missing"
            
            if t!='HS':
                N='HS.'+t+'.N'
                dN='HS.'+t+'.dN'
                S='HS.'+t+'.S'
                dS='HS.'+t+'.dS'        
                raw='HS.'+t+'.omega'
                OmegaHuguet='HS.'+t+'.OmegaHuguet'
                dnds[OmegaHuguet]=dnds[[N,dN,S,dS,raw]].apply(Huguet, axis=1)

                LogOmegaHuguet='HS.'+t+'.LogOmegaHuguet'
                dnds[LogOmegaHuguet]=np.log(dnds[OmegaHuguet])

                corrected='HS.'+t+'.OmegaGC12'
                normalized='HS.'+t+'.OmegaGC12Normalized'
                typed='HS.'+t+'.Type'

                tmp=dnds.loc[~(dnds[LogOmegaHuguet]!=dnds[LogOmegaHuguet]),['HS.GC12c',LogOmegaHuguet]]
                tmp.rename(columns={LogOmegaHuguet:'A','HS.GC12c': 'B'}, inplace = True)
                result = sm.ols(formula="A ~ B + pow(B,2)", data=tmp).fit()
                print result.params
                print result.summary()
                newValues = tmp[np.isfinite(tmp['A'])]['A'].values - result.predict()
                dnds.loc[np.isfinite(dnds[LogOmegaHuguet]), corrected] = newValues
                Zscore = (newValues - newValues.mean()) /newValues.std()
                dnds.loc[np.isfinite(dnds[LogOmegaHuguet]), normalized] = Zscore
            
                posList = np.isfinite(dnds[LogOmegaHuguet]) * dnds[normalized] > threshold
                dnds.loc[posList, typed] = "Positive"
                negList = np.isfinite(dnds[LogOmegaHuguet]) * dnds[normalized] < -threshold
                dnds.loc[negList, typed] = "Negative"
                neuList = (np.isfinite(dnds[LogOmegaHuguet]) *
                           (dnds[normalized] < threshold) *
                           (dnds[normalized] > -threshold))
                dnds.loc[neuList, typed] = "Neutral"
                misList = np.isnan(dnds[LogOmegaHuguet])
                dnds.loc[misList, typed] = "Missing"
                
	    dnds.to_csv("CSV/dNdS_" + taxa + "_" + QualityLabel[indexQuality] + '_' + str(int(QualityLevel*100)) + "ProteinCoding.csv")
