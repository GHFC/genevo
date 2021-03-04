#!/usr/bin/env python
# coding=utf-8
# ==============================================================================
# author          : Guillaume Dumas
# date            : 2020-10-12
# ==============================================================================

# Initialization

get_ipython().run_line_magic('matplotlib', 'inline')
import matplotlib
import matplotlib.pyplot as plt
from matplotlib.patches import Ellipse
from matplotlib import gridspec

def cm2inch(value):
    return value/2.54

matplotlib.rc('agg')
matplotlib.rc('pdf', use14corefonts=True)
matplotlib.rcParams['pdf.fonttype'] = 42
matplotlib.rcParams['ps.fonttype'] = 42
matplotlib.rcParams['text.usetex'] = False
matplotlib.rcParams['axes.unicode_minus'] = False

import seaborn as sns
sns.set_style("whitegrid")

plt.rcParams['figure.figsize'] = (cm2inch(8.9), cm2inch(5))
plt.rcParams['font.size'] = 6
plt.rcParams['axes.labelsize'] = plt.rcParams['font.size']
plt.rcParams['axes.titlesize'] = 1.5 * plt.rcParams['font.size']
plt.rcParams['legend.fontsize'] = plt.rcParams['font.size']
plt.rcParams['xtick.labelsize'] = plt.rcParams['font.size']
plt.rcParams['ytick.labelsize'] = plt.rcParams['font.size']
plt.rcParams['xtick.major.size'] = 0
plt.rcParams['xtick.minor.size'] = 0
plt.rcParams['xtick.major.width'] = 0
plt.rcParams['xtick.minor.width'] = 0
plt.rcParams['ytick.major.size'] = 0
plt.rcParams['ytick.minor.size'] = 0
plt.rcParams['ytick.major.width'] = 0
plt.rcParams['ytick.minor.width'] = 0
plt.rcParams['xtick.minor.pad'] = 3
plt.rcParams['xtick.major.pad'] = 3
plt.rcParams['ytick.minor.pad'] = 3
plt.rcParams['ytick.major.pad'] = 3
plt.rcParams['legend.frameon'] = False
plt.rcParams['legend.loc'] = 'center left'
plt.rcParams['axes.linewidth'] = 0.5

from IPython.display import set_matplotlib_formats
set_matplotlib_formats('png', 'pdf')

import pandas as pd
import numpy as np
import scipy.stats as st
from copy import deepcopy

from scipy.cluster.hierarchy import dendrogram, linkage, fcluster

pd.set_option("display.width", 200)
pd.set_option("display.max_colwidth", 50)

nPerms = 10000

def bootstrap(frame, ids, perms, mea, con=[], bins=100):
    H, xedges, yedges = np.histogram2d(frame.loc[ids, con[0]],
                                       frame.loc[ids, con[1]],
                                       (bins, bins),
                                       [[frame.loc[:, con[0]].min(),
                                         frame.loc[:, con[0]].max()],
                                        [frame.loc[:, con[1]].min(),
                                         frame.loc[:, con[1]].max()]])
    measure = np.nanmedian(frame.loc[ids, mea], axis=0)
    bootstraps = np.array([])
    for perm in range(perms):
        bootstrap = np.array([])
        for xi, x in enumerate(xedges[:-1]):
            for yi, y in enumerate(yedges[:-1]):
                xcond = np.logical_and(frame.loc[:, con[0]] >= x,
                                       frame.loc[:, con[0]] < xedges[xi+1])
                ycond = np.logical_and(frame.loc[:, con[1]] >= y,
                                       frame.loc[:, con[1]] < yedges[yi+1])
                selected = np.logical_and(xcond, ycond)

                samples = frame.loc[selected, :]
                # picked = np.random.permutation(samples.shape[0])
                if samples.shape[0] > 0:
                    picked = np.random.randint(samples.shape[0],
                                               size=int(H[xi, yi]))
                    if len(picked[:int(H[xi, yi])]):
                        bootstrap = np.concatenate(
                                     (bootstrap,
                                      samples.iloc[picked][mea]))
        bootstraps = np.concatenate(
                      (bootstraps,
                       np.array(np.nanmedian(np.array(bootstrap)))[np.newaxis]))

    distribution = np.sort(bootstraps)
    CI = (distribution[int(perms*0.025)], distribution[int(perms*0.975)])

    pvalue = 2*min((1+sum(distribution >= measure))/(perms+1),
                   (1+sum(distribution <= measure))/(perms+1))

    return measure, distribution, pvalue, CI


def bootstrap1d(frame, ids, perms, mea, con=[], bins=100):
    H, edges = np.histogram(frame.loc[ids, con],
                                     bins,
                                     [frame.loc[:, con].min(), frame.loc[:, con].max()])
    measure = np.nanmedian(frame.loc[ids, mea], axis=0)
    bootstraps = np.array([])
    for perm in range(perms):
        bootstrap = np.array([])
        for xi, x in enumerate(edges[:-1]):
            
                selected = np.logical_and(frame.loc[:, con] >= x,
                                          frame.loc[:, con] < edges[xi+1])
                
                samples = frame.loc[selected, :]

                # picked = np.random.permutation(samples.shape[0])
                if samples.shape[0] > 0:
                    picked = np.random.randint(samples.shape[0],
                                               size=int(H[xi]))
                    if len(picked[:int(H[xi])]):
                        bootstrap = np.concatenate(
                                     (bootstrap,
                                      samples.iloc[picked][mea]))
        bootstraps = np.concatenate(
                      (bootstraps,
                       np.array(np.nanmedian(np.array(bootstrap)))[np.newaxis]))

    distribution = np.sort(bootstraps)
    CI = (distribution[int(perms*0.025)], distribution[int(perms*0.975)])

    pvalue = 2*min((1+sum(distribution >= measure))/(perms+1),
                   (1+sum(distribution <= measure))/(perms+1))

    return measure, distribution, pvalue, CI

# Load data

## Gene infos
info = pd.read_csv("AllGenes-Infos.tsv", sep="\t")
info.set_index('EntrezId', inplace=True)

## dNdS
dnds = pd.read_csv("dnds_mq_50.tsv", sep="\t", na_values=['lq', 'na'])
dnds.set_index('EntrezId', inplace=True)


# Preprocessed dN/dS data

## Remove the genes with multiple orthologs

orthologs = pd.read_csv('Orthologs.tsv', sep='\t')
orthologs.set_index('EntrezID', inplace=True)
goodGenes = set((orthologs.loc[:, 'Chimpanzee.HomologyType']=='ortholog_one2one').index)
goodGenes = set(orthologs.loc[(orthologs.loc[:, 'Chimpanzee.HomologyType']=='ortholog_one2one') * 
              (orthologs.loc[:, 'Gorilla.HomologyType']=='ortholog_one2one') * 
              (orthologs.loc[:, 'Marmoset.HomologyType']=='ortholog_one2one') * 
              (orthologs.loc[:, 'Orangutan.HomologyType']=='ortholog_one2one') * 
              (orthologs.loc[:, 'Macaque.HomologyType']=='ortholog_one2one')].index)


removed_genes = dnds.loc[(dnds.index).difference(goodGenes)].index
removed_genes.difference(orthologs.index)
dnds = dnds.loc[goodGenes.intersection(dnds.index)]

HGNC = pd.read_csv('../../Data/HGNC_2017-06-25.tsv', sep='\t')
HGNC.rename(columns={u'entrez_id': 'Entrez Gene ID', u'symbol': u'Approved Symbol'}, inplace=True)
HGNC.dropna(subset=['Entrez Gene ID'], inplace=True)
HGNC['Entrez Gene ID']=HGNC['Entrez Gene ID'].astype(int)
HGNC.head(2)

location_genes = HGNC.loc[:, ['Entrez Gene ID', 'location_sortable']]
location_genes.rename(columns={'Entrez Gene ID': 'EntrezId'}, inplace=True)
location_genes.set_index('EntrezId', inplace=True)

dnds.join(location_genes).loc[:, ['AN.HS.LogOmegaHuguet', 'location_sortable']].head()  # .to_csv("./FIG/loca.csv")


## Check dN/dS distribution

tissue = u'testes_gn'

tmp=dnds[['Gene', 'AN.HS.LogOmegaHuguet']].join(info.loc[:, tissue], how='inner')
frame1 = tmp.loc[tmp[tissue]>2, 'AN.HS.LogOmegaHuguet']
frame1 = frame1.dropna()

tissue = u'brain_gn'
tmp=dnds[['Gene', 'AN.HS.LogOmegaHuguet']].join(info.loc[:, tissue], how='inner')
frame2 = tmp.loc[tmp[tissue]>2, 'AN.HS.LogOmegaHuguet']
frame2 = frame2.dropna()

plt.figure(figsize=[18,8])
plt.hist(frame1.values, bins=100, color='blue', alpha=0.5, density=True, range=[-5,5])
plt.hist(frame2.values, bins=100, color='red', alpha=0.5, density=True, range=[-5,5])
plt.hist(dnds['AN.HS.LogOmegaHuguet'].dropna().values, bins=100, color='black', histtype='step', density=True, linewidth=2, range=[-5,5])
plt.xlim([-5, 5])
plt.xlabel('Log(dN/dS)')
plt.ylabel('Density')
plt.legend(['Whole genome', 'Testes', 'Brain'], loc=1)
plt.savefig('./FIG/dNdS_Distribution.pdf',
            format='pdf', dpi=1200, bbox_inches='tight') 

dnds['AN.HS.LogOmegaHuguet'].describe()


## Choose which data to analyze

data_types = ['dN', 'OmegaHuguet', 'LogOmegaHuguet', 'OmegaGC12Normalized']
data_type = data_types[3]
dnds.rename(columns={'AN.pantro.'+data_type:'PT',
                     'AN.HS.'+data_type:'HS',
                     'AN.altai.'+data_type: 'NH',
                     'AN.denisovan.'+data_type: 'DS',
                     'AN.vindija.'+data_type:'VI',
                     'AN.sidron.'+data_type:'SI',
                     'AN.gorGor3.'+data_type:'GG',
                     'AN.ponAbe2.'+data_type:'PA',
                     'AN.rheMac3.'+data_type:'RM',
                     'AN.calJac3.'+data_type:'CJ'},
            inplace=True)


## Order taxa according to phylogeny

taxa = ['HS', 'NH', 'DS', 'PT', 'GG', 'PA', 'RM', 'CJ']


## Normalize

for c in taxa:
    tmp = dnds[c].values.astype(float)
    if (data_type == 'dN') or (data_type == 'OmegaHuguet'):
        tmp = np.log(tmp)
    dnds[c] = (tmp-np.nanmean(tmp))/np.nanstd(tmp)


## Clean the dataframe

dnds = dnds.loc[: , ['Gene', 'GeneLength', 'CDS', 'HS.GC12c']+taxa]


## Select specific taxa

tSel = 4
idx = dnds.loc[:, taxa[:tSel]].dropna().index
data = dnds.loc[idx, ['Gene']+taxa[:tSel]]
data.to_csv('./FIG/' + data_type + '_dNdS_HS-NH-DS-PT.csv')


# Figure 1

## Panel b (whole genome clustering)

currentAnalysis = 'WholeGenome'

# Limit the analysis to Homo sapiens, Neanderthal Denisovan, and Pan troglodytes
tSel = 4
X = data.loc[:, taxa[:tSel]].values

# Number of clusters determined with Rstats and the Nbclust library
k = 2

# Generate the linkage matrix
Z1 = linkage(X, 'ward')

fig = plt.figure(figsize=[cm2inch(8.9)*6, cm2inch(3)*6], dpi=1200, facecolor='w', edgecolor='k')
gs = gridspec.GridSpec(2, 2, width_ratios=[1, 5], height_ratios=[1, 1], wspace=0.1, hspace=0) 

ax = plt.subplot(gs[1])
plt.title('Hierarchical Clustering Dendrogram')
ax.yaxis.tick_right()
plt.ylabel('Distance')
ax.yaxis.set_label_position("right")

R1 = dendrogram(
    Z1,
    leaf_rotation=90.,  # rotates the x axis labels
    no_labels=True,
    color_threshold=Z1[-(k-1),2]
)

Z2 = linkage(X.T, 'ward')
ax = plt.subplot(gs[2])
plt.title('Phylogenetic tree')
plt.xlabel('Distance')
R2 = dendrogram(
    Z2,
    leaf_rotation=90.,  # rotates the x axis labels
    no_labels=True,
    orientation='left'
)
plt.xticks([0, 50, 100, 150])

ax = plt.subplot(gs[3])
ax.grid(False, which='both')
im = plt.imshow(X[R1['leaves'],:][:,R2['leaves']].T, interpolation='nearest', aspect='auto',cmap=plt.get_cmap('bwr'),
                vmin=-5, vmax=5)
plt.gca().invert_yaxis()
plt.yticks(np.arange(0, 4, 1), ['PT', 'DS', 'NH', 'HS'], fontsize=20)
plt.xticks([])
plt.xlabel('Genes', fontsize=20)

cbar_ax = fig.add_axes([0.92, 0.125, 0.01, 0.38])
cbar = fig.colorbar(im, cax=cbar_ax)
cbar.ax.tick_params(labelsize=15)
cbar.set_label('$\omega_{GC12}$', verticalalignment='top')

plt.savefig('./FIG/' + data_type + '_' + currentAnalysis + '_HierarchicalCluster.pdf',
            format='pdf', dpi=1200, bbox_inches='tight')


## Panel d (Bodymap)

[c for c in info.columns.tolist() if "brain" in c.lower()]


for threshold in [1, 2]:
    brainids = []
    for tissue in ['brain_gn','Fetalbrain_gn','Wholebrain_gn','brain_tn','Fetalbrain_tn','Wholebrain_tn']:  # ,'ProteinAtlas_Brain']:
        frame = info.loc[:, [tissue]]
        brainids += frame.loc[frame[tissue]>threshold].index.tolist()
    print(len(brainids))


df_brain = info.loc[:, ['Gene', 'brain_gn','Fetalbrain_gn','Wholebrain_gn','brain_tn','Fetalbrain_tn','Wholebrain_tn','ProteinAtlas_Brain']].copy()
df_brain['ProteinAtlas_Brain'] = (df_brain['ProteinAtlas_Brain']==1.0)


df_brain.rename({'brain_gn': 'Bodymap2_Specificity',
                 'Fetalbrain_gn': 'Su_Fetalbrain_Specificity',
                 'Wholebrain_gn': 'Su_Wholebrain_Specificity',
                 'brain_tn': 'Bodymap2_Expression',
                 'Fetalbrain_tn': 'Su_Fetalbrain_Expression',
                 'Wholebrain_tn': 'Su_Wholebrain_Expression',
                 'ProteinAtlas_Brain': 'ProteinAtlas_Boolean'}, axis=1).to_csv("./BrainLists.csv")


df_body = pd.DataFrame(data={'type': 'Body',
                             'set': cols,
                             'rc': stats_rc[:, 0].flatten(),
                             'p': stats_p[:, 0].flatten(),
                             'size': stats_s[:, 0].flatten().astype(int),
                             'bonferroni': stats_p[:, 0].flatten()<0.05/len(cols),
                             'bootstrap': stats_bootstrap_pvalue[:, 0].flatten()<0.05/len(cols),
                             'bootstrap_p': stats_bootstrap_pvalue[:, 0],
                             'bootstrap_CI_low': stats_bootstrap_CI_low[:, 0],
                             'bootstrap_CI_high': stats_bootstrap_CI_high[:, 0]})

factor = 8
taxon = 0

fig = plt.figure(figsize=[cm2inch(8.9)*1.5, cm2inch(3)*1.5], dpi=1200, facecolor='w', edgecolor='k')
ax = plt.subplot(111)
from matplotlib.cm import Set2
colors = Set2(np.linspace(0, 1, len(cols)))
plt.plot([-0.4,0.4],-np.log10(0.05/len(cols)*np.array([1.,1.])),'k--',linewidth=0.5)
plt.plot([-0.4,0.4],np.array([0.,0.]),'gray',linewidth=0.5)
for t in range(len(cols)):
    label = cols[t].split('_')[0].capitalize()
    if df_body.loc[t, 'bootstrap']:
        label += ' *'
    plt.scatter(stats_rc[t,taxon],
                -np.log10(stats_p[t,taxon]),
                s=stats_s[t,taxon]/factor, 
                c=colors[t],
                edgecolor=colors[t])
    plt.text(stats_rc[t,taxon],
             -np.log10(stats_p[t,taxon]),
             label,
             size=6)
plt.scatter(0.30,
            14,
            s=1000/factor, 
            c='white',
            edgecolor='black')
plt.scatter(0.30,
            13.5,
            s=100/factor, 
            c='white',
            edgecolor='black')
#lgd = ax.legend(cols, bbox_to_anchor=(1.5, 0.8))
plt.xlim([-0.4,0.4])
plt.ylim([-1,16])
ax.set_xticks(np.arange(-0.4,0.5,0.1))
ax.set_yticks(np.arange(0,20,5))
ax.grid('off')
ax.xaxis.grid(linewidth=0.5)
plt.xlabel('Rank-biserial correlation')
plt.ylabel('-log(p-value)')

for o in fig.findobj():
    o.set_clip_on(False)

plt.savefig('./FIG/' + data_type + '_' + currentAnalysis + '_FunnelPlot.pdf',
            format='pdf', dpi=1200, bbox_inches='tight')


# Supplementary Figures

## Su et al. 2004

currentAnalysis = 'Su2004'

cols = [u'AdrenalCortex_bgn', u'Adrenalgland_bgn', u'Amygdala_bgn',
       u'Caudatenucleus_bgn', u'Cerebellum_bgn', u'CerebellumPeduncles_bgn',
       u'CiliaryGanglion_bgn', u'CingulateCortex_bgn', u'DorsalRootGanglion_bgn', 
        u'Fetalbrain_gn', u'GlobusPallidus_bgn', u'Hypothalamus_bgn', 
       u'MedullaOblongata_bgn', u'OccipitalLobe_bgn', u'OlfactoryBulb_bgn', 
        u'ParietalLobe_bgn', u'Pons_bgn', u'PrefrontalCortex_bgn', u'Spinalcord_bgn',
        u'SubthalamicNucleus_bgn', u'SuperiorCervicalGanglion_bgn',
       u'TemporalLobe_bgn', u'Thalamus_bgn', u'TrigeminalGanglion_bgn',
       u'Wholebrain_gn', u'pineal_day_bgn', u'pineal_night_bgn', u'retina_bgn']

dfg = []
stats_p = np.zeros([len(cols), tSel])
stats_rc = np.zeros([len(cols), tSel])
stats_s = np.zeros([len(cols), tSel])
stats_bootstrap_pvalue = np.zeros([len(cols), tSel])
stats_bootstrap_CI_low = np.zeros([len(cols), tSel])
stats_bootstrap_CI_high = np.zeros([len(cols), tSel])

entrezids = []

for it, tissue in enumerate(cols):
    print('\n', tissue)
    tmp=dnds[['Gene', 'GeneLength', 'CDS', 'HS.GC12c']+taxa].join(info.loc[:, cols + ['Tau_Su']], how='inner')
    frame = tmp.loc[tmp[tissue]>threshold, taxa[:tSel]]
    allGenes = len(frame)
    frame = frame.dropna()
    
    entrezids += frame.index.tolist()
    brainids += frame.index.tolist()

    print(len(frame), '/', allGenes)
    df=pd.DataFrame({'OmegaGC' : np.nanmedian(frame.values, axis=0), 'Taxon' : taxa[:tSel]})
    df['Tissue']=tissue
    dfg.append(df)
    for i,taxon in enumerate(taxa[:tSel]):
#         try:
        umw, pmw = st.wilcoxon(frame[taxon].values) # wilcoxon if paired
        # https://en.wikipedia.org/wiki/Wilcoxon_signed-rank_test#Effect_size
        # https://en.wikipedia.org/wiki/Rank_correlation#Kerby_simple_difference_formula
        # see also: http://core.ecu.edu/psyc/wuenschk/docs30/Nonparametric-EffectSize.pdf
        values=frame[taxon].values; rank=np.argsort(values)[::-1]
        rc=float(np.sum(rank[values[rank]>0]))/np.sum(rank)-float(np.sum(rank[values[rank]<=0]))/np.sum(rank)
        if pmw<0.05/tSel/len(cols):
            print('%s ≠ 0 (W=%.2f, p=%.8f, rc=%.2f)' % (taxon,umw,pmw,rc))
        stats_p[it,i] = pmw
        stats_rc[it,i] = rc
        stats_s[it,i] = len(values)
        
        tmp.loc[:, 'logCDS'] = np.log(tmp.loc[:, 'HS.GC12c'])
        measure, distribution, pvalue, CI = bootstrap(frame=tmp, ids=frame.index, perms=nPerms, mea='HS', con=['logCDS', 'Tau_Su'], bins=10)
        stats_bootstrap_pvalue[it,i] = pvalue
        stats_bootstrap_CI_low[it,i] = CI[0]
        stats_bootstrap_CI_high[it,i] = CI[1]
#         except:
#             print("Error with " + taxon)

df_brain = pd.DataFrame(data={'type': 'Brain',
                              'set': cols,
                              'rc': stats_rc[:, 0].flatten(),
                              'p': stats_p[:, 0].flatten(),
                              'size': stats_s[:, 0].flatten().astype(int),
                              'bonferroni': stats_p[:, 0].flatten()<0.05/len(cols),
                              'bootstrap': stats_bootstrap_pvalue[:, 0].flatten()<0.05/len(cols),
                              'bootstrap_p': stats_bootstrap_pvalue[:, 0],
                              'bootstrap_CI_low': stats_bootstrap_CI_low[:, 0],
                              'bootstrap_CI_high': stats_bootstrap_CI_high[:, 0]})

factor = 4
taxon = 0

cols = [u'AdrenalCortex_bgn', u'Adrenalgland_bgn', u'Amygdala_bgn',
       u'Caudatenucleus_bgn', u'Cerebellum_bgn', u'CerebellumPeduncles_bgn',
       u'CiliaryGanglion_bgn', u'CingulateCortex_bgn', u'DorsalRootGanglion_bgn', 
        u'Fetalbrain_gn', u'GlobusPallidus_bgn', u'Hypothalamus_bgn', 
       u'MedullaOblongata_bgn', u'OccipitalLobe_bgn', u'OlfactoryBulb_bgn', 
        u'ParietalLobe_bgn', u'Pons_bgn', u'PrefrontalCortex_bgn', u'Spinalcord_bgn',
        u'SubthalamicNucleus_bgn', u'SuperiorCervicalGanglion_bgn',
       u'TemporalLobe_bgn', u'Thalamus_bgn', u'TrigeminalGanglion_bgn',
       u'Wholebrain_gn', u'pineal_day_bgn', u'pineal_night_bgn', u'retina_bgn']

fig = plt.figure(figsize=[cm2inch(8.9)*3, cm2inch(3)*5], dpi=1200, facecolor='w', edgecolor='k')
ax = plt.subplot(111)
from matplotlib.cm import Set2
colors = Set2(np.linspace(0, 1, len(cols)))
plt.plot([-0.6,0.6],-np.log10(0.05/len(cols)*np.array([1.,1.])),'k--',linewidth=0.5)
plt.plot([-0.6,0.6],np.array([0.,0.]),'gray',linewidth=0.5)
for t in range(len(cols)):
    label = cols[t].capitalize()  # .split('_')[0]
    if df_brain.loc[t, 'bootstrap']:
        label += ' *'
    plt.scatter(stats_rc[t,taxon],
                -np.log10(stats_p[t,taxon]),
                s=stats_s[t,taxon]/factor, 
                c=colors[t],
                edgecolor=colors[t])
    plt.text(stats_rc[t,taxon],
             -np.log10(stats_p[t,taxon]),
             label,
             horizontalalignment='left',
             verticalalignment='center',
             size=6)
plt.scatter(0.36,
            15,
            s=1000/factor, 
            c='white',
            edgecolor='black')
plt.scatter(0.36,
            16,
            s=100/factor, 
            c='white',
            edgecolor='black')
#lgd = ax.legend(cols, bbox_to_anchor=(1.5, 0.8))
plt.xlim([-0.6,0.6])
plt.ylim([-1,15])
ax.grid('off')
ax.xaxis.grid(linewidth=0.5)
ax.tick_params(labelsize=6, color='black', pad=3)
plt.xlabel('Rank-biserial correlation', size=6, color='black')
plt.ylabel('-log(p-value)', size=6, color='black')

for o in fig.findobj():
    o.set_clip_on(False)

for o in fig.findobj():
    o.set_clip_on(False)

plt.savefig('./FIG/' + data_type + '_' + currentAnalysis + '_FunnelPlot.pdf',
            format='pdf', dpi=1200, bbox_inches='tight')


## Synapse

currentAnalysis = 'Synapse'

cols = [u'Cell_adhesion_and_trans-synaptic_signaling',
       u'Cell_metabolism', u'Endocytosis', u'Excitability', u'Exocytosis',
       u'G-protein-coupled_receptor_signaling', u'G-protein_relay',
       u'Intracellular_signal_transduction', u'Intracellular_trafficking',
       u'Ion_balance/transport', u'Ligand-gated_ion_channel_signaling',
       u'Neurotransmitter_metabolism', u'Peptide/neurotrophin_signals',
       u'Protein_cluster', u'RNA_and_protein_synthesis_folding_and_breakdown',
       u'Structural_plasticity', u'Tyrosine_kinase_signaling',
       u'Glutamatergic', u'Cholinergic', u'Serotonergic', u'GABAergic',
       u'Dopaminergic', u'Cell Adhesion', u'MS_Excitatory', u'MS_Inhibitory']

dfg = []

entrezids = []

stats_p = np.zeros([len(cols), tSel])
stats_rc = np.zeros([len(cols), tSel])
stats_s = np.zeros([len(cols), tSel])
stats_bootstrap_pvalue = np.zeros([len(cols), tSel])
stats_bootstrap_CI_low = np.zeros([len(cols), tSel])
stats_bootstrap_CI_high = np.zeros([len(cols), tSel])
for it, tissue in enumerate(cols):
    print('\n', tissue)
    tmp=dnds[['Gene', 'GeneLength', 'CDS', 'HS.GC12c']+taxa].join(info.loc[:, cols + ['Tau_Su']], how='inner')
    frame = tmp.loc[tmp[tissue]==1, taxa[:tSel]]
    allGenes = len(frame)
    frame = frame.dropna()
    
    entrezids += frame.index.tolist()
    brainids += frame.index.tolist()

    print(len(frame), '/', allGenes)
    df=pd.DataFrame({'OmegaGC' : np.nanmedian(frame.values, axis=0), 'Taxon' : taxa[:tSel]})
    df['Tissue']=tissue
    dfg.append(df)
    for i,taxon in enumerate(taxa[:tSel]):
#         try:
        umw, pmw = st.wilcoxon(frame[taxon].values) # wilcoxon if paired
        # https://en.wikipedia.org/wiki/Wilcoxon_signed-rank_test#Effect_size
        # https://en.wikipedia.org/wiki/Rank_correlation#Kerby_simple_difference_formula
        # see also: http://core.ecu.edu/psyc/wuenschk/docs30/Nonparametric-EffectSize.pdf
        values=frame[taxon].values; rank=np.argsort(values)[::-1]
        rc=float(np.sum(rank[values[rank]>0]))/np.sum(rank)-float(np.sum(rank[values[rank]<=0]))/np.sum(rank)
        if pmw<0.05/tSel/len(cols):
            print('%s ≠ 0 (W=%.2f, p=%.8f, rc=%.2f)' % (taxon,umw,pmw,rc))
        stats_p[it,i] = pmw
        stats_rc[it,i] = rc
        stats_s[it,i] = len(values)
        
        tmp.loc[:, 'logCDS'] = np.log(tmp.loc[:, 'HS.GC12c'])
        measure, distribution, pvalue, CI = bootstrap1d(frame=tmp, ids=frame.index, perms=nPerms, mea='HS', con='logCDS', bins=10)
        stats_bootstrap_pvalue[it,i] = pvalue
        stats_bootstrap_CI_low[it,i] = CI[0]
        stats_bootstrap_CI_high[it,i] = CI[1]
#         except:
#             print("Error with " + taxon)


df_synapse = pd.DataFrame(data={'type': 'Synapse',
                                'set': cols,
                                'rc': stats_rc[:, 0].flatten(),
                                'p': stats_p[:, 0].flatten(),
                                'size': stats_s[:, 0].flatten().astype(int),
                                'bonferroni': stats_p[:, 0].flatten()<0.05/len(cols),
                                'bootstrap': stats_bootstrap_pvalue[:, 0].flatten()<0.05/len(cols),
                                'bootstrap_p': stats_bootstrap_pvalue[:, 0],
                                'bootstrap_CI_low': stats_bootstrap_CI_low[:, 0],
                                'bootstrap_CI_high': stats_bootstrap_CI_high[:, 0]})


factor = 4
taxon = 0

fig = plt.figure(figsize=[cm2inch(8.9)*3, cm2inch(3)*5], dpi=1200, facecolor='w', edgecolor='k')
ax = plt.subplot(111)
from matplotlib.cm import Set2
colors = Set2(np.linspace(0, 1, len(cols)))
plt.plot([-0.8,0.8],-np.log10(0.05/len(cols)*np.array([1.,1.])),'k--',linewidth=0.5)
plt.plot([-0.8,0.8],np.array([0.,0.]),'gray',linewidth=0.5)
for t in range(len(cols)):
    label = cols[t].replace('_', ' ')
    if df_synapse.loc[t, 'bootstrap']:
        label += ' *'
    plt.scatter(stats_rc[t,taxon],
                -np.log10(stats_p[t,taxon]),
                s=stats_s[t,taxon]/factor, 
                c=colors[t],
                edgecolor=colors[t])
    plt.text(stats_rc[t,taxon],
             -np.log10(stats_p[t,taxon]),
             label,
             horizontalalignment='left',
             verticalalignment='center',
             size=6)
plt.scatter(0.36,
            15,
            s=1000/factor, 
            c='white',
            edgecolor='black')
plt.scatter(0.36,
            16,
            s=100/factor, 
            c='white',
            edgecolor='black')
#lgd = ax.legend(cols, bbox_to_anchor=(1.5, 0.8))
plt.xlim([-0.8,0.8])
plt.ylim([-1,15])
ax.grid('off')
ax.xaxis.grid(linewidth=0.5)
ax.tick_params(labelsize=6, color='black', pad=3)
plt.xlabel('Rank-biserial correlation', size=6, color='black')
plt.ylabel('-log(p-value)', size=6, color='black')

for o in fig.findobj():
    o.set_clip_on(False)

for o in fig.findobj():
    o.set_clip_on(False)

plt.savefig('./FIG/' + data_type + '_' + currentAnalysis + '_FunnelPlot.pdf',
            format='pdf', dpi=1200, bbox_inches='tight')


## Disease

currentAnalysis = 'Disease'

cols = ['SFARI',
        'Macrocephaly_OMIM_HPO',
        'Microcephaly_OMIM_HPO',
        'Neurodegeneration_OMIM_HPO',
        'Myelin_OMIM_HPO',
        'Schizophrenia_OMIM_HPO',
        'Epilepsy_OMIM_HPO',
        'Depression_OMIM_HPO',
        'Headache_OMIM_HPO',
        'Parkinson_OMIM_HPO',
        'Encephalopathy_OMIM_HPO',
        'Huntington_OMIM_HPO',
        'Blindness_OMIM_HPO',
        'Deafness_OMIM_HPO',
        'Dyslexia_OMIM_HPO',
        'IntellectualDisability_OMIM_HPO',
        'CancerCensus']

dfg = []

entrezids = []

stats_p = np.zeros([len(cols), tSel])
stats_rc = np.zeros([len(cols), tSel])
stats_s = np.zeros([len(cols), tSel])
stats_bootstrap_pvalue = np.zeros([len(cols), tSel])
stats_bootstrap_CI_low = np.zeros([len(cols), tSel])
stats_bootstrap_CI_high = np.zeros([len(cols), tSel])
for it, tissue in enumerate(cols):
    print('\n', tissue)
    tmp=dnds[['Gene', 'GeneLength', 'CDS', 'HS.GC12c']+taxa].join(info.loc[:, cols + ['Tau_Su']], how='inner')
    frame = tmp.loc[tmp[tissue]==1, taxa[:tSel]]
    allGenes = len(frame)
    frame = frame.dropna()
    
    entrezids += frame.index.tolist()
    brainids += frame.index.tolist()

    print(len(frame), '/', allGenes)
    df=pd.DataFrame({'OmegaGC' : np.nanmedian(frame.values, axis=0), 'Taxon' : taxa[:tSel]})
    df['Tissue']=tissue
    dfg.append(df)
    for i,taxon in enumerate(taxa[:tSel]):
#         try:
        umw, pmw = st.wilcoxon(frame[taxon].values) # wilcoxon if paired
        # https://en.wikipedia.org/wiki/Wilcoxon_signed-rank_test#Effect_size
        # https://en.wikipedia.org/wiki/Rank_correlation#Kerby_simple_difference_formula
        # see also: http://core.ecu.edu/psyc/wuenschk/docs30/Nonparametric-EffectSize.pdf
        values=frame[taxon].values; rank=np.argsort(values)[::-1]
        rc=float(np.sum(rank[values[rank]>0]))/np.sum(rank)-float(np.sum(rank[values[rank]<=0]))/np.sum(rank)
        if pmw<0.05/tSel/len(cols):
            print('%s ≠ 0 (W=%.2f, p=%.8f, rc=%.2f)' % (taxon,umw,pmw,rc))
        stats_p[it,i] = pmw
        stats_rc[it,i] = rc
        stats_s[it,i] = len(values)
        
        tmp.loc[:, 'logCDS'] = np.log(tmp.loc[:, 'HS.GC12c'])
        try:
            measure, distribution, pvalue, CI = bootstrap1d(frame=tmp, ids=frame.index, perms=nPerms, mea='HS', con='logCDS', bins=10)
        except:
            print("Error with " + tissue)
        stats_bootstrap_pvalue[it,i] = pvalue
        stats_bootstrap_CI_low[it,i] = CI[0]
        stats_bootstrap_CI_high[it,i] = CI[1]
#         except:
#             print("Error with " + taxon)


df_diseases = pd.DataFrame(data={'type': 'Diseases',
                                'set': cols,
                                'rc': stats_rc[:, 0].flatten(),
                                'p': stats_p[:, 0].flatten(),
                                'size': stats_s[:, 0].flatten().astype(int),
                                'bonferroni': stats_p[:, 0].flatten()<0.05/len(cols),
                                'bootstrap': stats_bootstrap_pvalue[:, 0].flatten()<0.05/len(cols),
                                'bootstrap_p': stats_bootstrap_pvalue[:, 0],
                                'bootstrap_CI_low': stats_bootstrap_CI_low[:, 0],
                                'bootstrap_CI_high': stats_bootstrap_CI_high[:, 0]})


factor = 4
taxon = 0

fig = plt.figure(figsize=[cm2inch(8.9)*3, cm2inch(3)*5], dpi=1200, facecolor='w', edgecolor='k')
ax = plt.subplot(111)
from matplotlib.cm import Set2
colors = Set2(np.linspace(0, 1, len(cols)))
plt.plot([-1,1],-np.log10(0.05/len(cols)*np.array([1.,1.])),'k--',linewidth=0.5)
plt.plot([-1,1],np.array([0.,0.]),'gray',linewidth=0.5)
for t in range(len(cols)):
    label = cols[t].replace('_', ' ')
    if df_diseases.loc[t, 'bootstrap']:
        label += ' *'
    plt.scatter(stats_rc[t,taxon],
                -np.log10(stats_p[t,taxon]),
                s=stats_s[t,taxon]/factor, 
                c=colors[t],
                edgecolor=colors[t])
    plt.text(stats_rc[t,taxon],
             -np.log10(stats_p[t,taxon]),
             label,
             horizontalalignment='left',
             verticalalignment='center',
             size=6)
plt.scatter(0.36,
            15,
            s=1000/factor, 
            c='white',
            edgecolor='black')
plt.scatter(0.36,
            16,
            s=100/factor, 
            c='white',
            edgecolor='black')
#lgd = ax.legend(cols, bbox_to_anchor=(1.5, 0.8))
plt.xlim([-1,1])
plt.ylim([-1,15])
ax.grid('off')
ax.xaxis.grid(linewidth=0.5)
ax.tick_params(labelsize=6, color='black', pad=3)
plt.xlabel('Rank-biserial correlation', size=6, color='black')
plt.ylabel('-log(p-value)', size=6, color='black')

for o in fig.findobj():
    o.set_clip_on(False)

for o in fig.findobj():
    o.set_clip_on(False)

plt.savefig('./FIG/' + data_type + '_' + currentAnalysis + '_FunnelPlot.pdf',
            format='pdf', dpi=1200, bbox_inches='tight')


pd.concat([df_body, df_brain, df_synapse, df_diseases]).to_csv('./FIG/'+data_type+'_GlobalResults.csv')


# GTEx

GTEx = pd.read_csv('GTEx_Specificity_Genes.csv')

GTEx.set_index('EntrezID', inplace=True)

x = np.exp(GTEx.loc[:, GTEx.columns[1:]].values)
tau = np.divide(np.nansum(1 - x / (np.atleast_2d(np.nanmax(x, axis=1)).T *
                          np.ones([1, len(GTEx.columns[1:])])), axis=1),
                np.sum(~np.isnan(x), axis=1) - 1)
GTEx.loc[:, 'Tau_GTEx'] = tau


tSel = 4
threshold = 2
currentAnalysis = 'GTEx'

tissues = [t[:-4] for t in GTEx.columns if '_raw' in t]

cols = [tissue + '_gn' for tissue in tissues]
GTEx_filtered = GTEx.loc[:, cols + ['Tau_GTEx']]
cols.append('All proteins')

threshold = 2

dfg = []
stats_p = np.zeros([len(cols), tSel])
stats_rc = np.zeros([len(cols), tSel])
stats_s = np.zeros([len(cols), tSel])
stats_bootstrap_pvalue = np.zeros([len(cols), tSel])
stats_bootstrap_CI_low = np.zeros([len(cols), tSel])
stats_bootstrap_CI_high = np.zeros([len(cols), tSel])
entrezids = []

for it,tissue in enumerate(cols):
    print('\n', tissue)
    tmp=dnds[['Gene', 'GeneLength', 'CDS', 'HS.GC12c']+taxa].join(GTEx_filtered, how='inner')
    if (tissue=='All proteins'):
        frame = tmp.loc[:, taxa[:tSel]]
    else:
        frame = tmp.loc[tmp[tissue]>threshold, taxa[:tSel]]
    allGenes = len(frame)
    frame = frame.dropna()
    
    entrezids += frame.index.tolist()
        
    print(len(frame), '/', allGenes)
    df=pd.DataFrame({'dN/dS' : np.nanmedian(frame.values, axis=0), 'Taxon' : taxa[:tSel]})
    df['Tissue']=tissue
    dfg.append(df)
    for i,taxon in enumerate(taxa[:tSel]):
#         try:
        umw, pmw = st.wilcoxon(frame[taxon].values) # wilcoxon if paired
        # https://en.wikipedia.org/wiki/Wilcoxon_signed-rank_test#Effect_size
        # https://en.wikipedia.org/wiki/Rank_correlation#Kerby_simple_difference_formula
        # see also: http://core.ecu.edu/psyc/wuenschk/docs30/Nonparametric-EffectSize.pdf
        values=frame[taxon].values; rank=np.argsort(values)[::-1]
        rc=float(np.sum(rank[values[rank]>0]))/np.sum(rank)-float(np.sum(rank[values[rank]<=0]))/np.sum(rank)
        if pmw<0.05/tSel/len(cols):
            print('%s ≠ 0 (W=%.2f, p=%.8f, rc=%.2f)' % (taxon,umw,pmw,rc))
        stats_p[it,i] = pmw
        stats_rc[it,i] = rc
        stats_s[it,i] = len(values)
        
        tmp.loc[:, 'logCDS'] = np.log(tmp.loc[:, 'HS.GC12c'])
        measure, distribution, pvalue, CI = bootstrap(frame=tmp, ids=frame.index, perms=nPerms, mea='HS', con=['logCDS', 'Tau_GTEx'], bins=10)
        stats_bootstrap_pvalue[it,i] = pvalue
        stats_bootstrap_CI_low[it,i] = CI[0]
        stats_bootstrap_CI_high[it,i] = CI[1]
#         except:
#             print("Error with " + taxon)


df_gtex = pd.DataFrame(data={'type': 'GTEx',
                             'set': cols,
                             'rc': stats_rc[:, 0].flatten(),
                             'p': stats_p[:, 0].flatten(),
                             'size': stats_s[:, 0].flatten().astype(int),
                             'bonferroni': stats_p[:, 0].flatten() < 0.05 / len(cols),
                             'bootstrap': stats_bootstrap_pvalue[:, 0].flatten() < 0.05 / len(cols),
                             'bootstrap_p': stats_bootstrap_pvalue[:, 0],
                             'bootstrap_CI_low': stats_bootstrap_CI_low[:, 0],
                             'bootstrap_CI_high': stats_bootstrap_CI_high[:, 0]})

df_gtex.to_csv("GTEx_stats.csv")


factor = 4
taxon = 0

fig = plt.figure(figsize=[cm2inch(8.9)*3, cm2inch(3)*5], dpi=1200, facecolor='w', edgecolor='k')
ax = plt.subplot(111)
from matplotlib.cm import Set2
colors = Set2(np.linspace(0, 1, len(cols)))
plt.plot([-1,1],-np.log10(0.05/len(cols)*np.array([1.,1.])),'k--',linewidth=0.5)
plt.plot([-1,1],np.array([0.,0.]),'gray',linewidth=0.5)
for t in range(len(cols)):
    label = cols[t].replace('_', ' ')
    if df_gtex.loc[t, 'bootstrap']:
        label += ' *'
    plt.scatter(stats_rc[t,taxon],
                -np.log10(stats_p[t,taxon]),
                s=stats_s[t,taxon]/factor, 
                c=colors[t],
                edgecolor=colors[t])
    plt.text(stats_rc[t,taxon],
             -np.log10(stats_p[t,taxon]),
             label,
             horizontalalignment='left',
             verticalalignment='center',
             size=6)
plt.scatter(0.36,
            15,
            s=1000/factor, 
            c='white',
            edgecolor='black')
plt.scatter(0.36,
            16,
            s=100/factor, 
            c='white',
            edgecolor='black')
#lgd = ax.legend(cols, bbox_to_anchor=(1.5, 0.8))
plt.xlim([-0.75,0.75])
#plt.ylim([-1,15])
ax.grid('off')
ax.xaxis.grid(linewidth=0.5)
ax.tick_params(labelsize=6, color='black', pad=3)
plt.xlabel('Rank-biserial correlation', size=6, color='black')
plt.ylabel('-log(p-value)', size=6, color='black')

for o in fig.findobj():
    o.set_clip_on(False)

for o in fig.findobj():
    o.set_clip_on(False)

plt.savefig('./FIG/' + data_type + '_' + currentAnalysis + '_FunnelPlot.pdf',
            format='pdf', dpi=1200, bbox_inches='tight')


fig = plt.figure(figsize=[cm2inch(8.9)*5, cm2inch(8.9)*5], dpi=1200, facecolor='w', edgecolor='k')
ax = plt.subplot(111)
from matplotlib.cm import Set2
colors = Set2(np.linspace(0, 1, len(cols)))

for t,c in enumerate(cols):
    if (c=='All proteins'):
        idx = GTEx.index
    else:
        idx = GTEx.loc[GTEx.loc[:, c]>2].index
    x = np.nanmedian(GTEx.loc[idx, 'Testis_gn'].values)
    y = np.nanmedian(GTEx.loc[idx, 'Brain - Cortex_gn'].values)
    s = len(idx)

    plt.scatter(x,y,s/factor,
                c=colors[t], 
                edgecolor=colors[t])
    
    label = c.replace('_', ' ').replace(' gn', '')
    plt.text(x,y,label,
             horizontalalignment='center',
             verticalalignment='center',
             size=6)
ax.grid('off')
ax.xaxis.grid(linewidth=0.5)
ax.tick_params(labelsize=6, color='black', pad=3)
plt.xlabel('Testis', size=6, color='black')
plt.ylabel('Cortex', size=6, color='black')

for o in fig.findobj():
    o.set_clip_on(False)

for o in fig.findobj():
    o.set_clip_on(False)

plt.savefig('./FIG/' + data_type + '_' + '_Brain-vs-Testis.pdf',
            format='pdf', dpi=1200, bbox_inches='tight')