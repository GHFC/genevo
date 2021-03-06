// GenEvo
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
// Preset lists of genes
// =========================================================================

export default {
  Evolution: {
    'Evolution#Positive': 'Positive',
    'Evolution#Negative': 'Negative',
    'Evolution#Brain_structures_positive': 'Brain structures positive',
    'Evolution#Brain_structures_negative': 'Brain structures negative',
    'Evolution#Brain_structures_neutral': 'Brain structures neutral',
    'Evolution#Brain_functions_positive': 'Brain functions positive',
    'Evolution#Brain_functions_negative': 'Brain functions negative',
    'Evolution#Brain_functions_neutral': 'Brain functions neutral',
    'Evolution#Brain_diseases_positive': 'Brain diseases positive',
    'Evolution#Brain_diseases_negative': 'Brain diseases negative',
    'Evolution#Brain_diseases_neutral': 'Brain diseases neutral',
    'Evolution#Brain_structures-functions-diseases_positive': 'Brain structures-functions-diseases positive',
    'Evolution#Brain_structures-functions-diseases_negative': 'Brain structures-functions-diseases negative',
    'Evolution#Brain_structures-functions-diseases_neutral': 'Brain structures-functions-diseases neutral',
    'Evolution#No_introgression': 'No introgression',
    'Evolution#Low_introgression': 'Low introgression',
    'Evolution#High_introgression': 'High introgression',
    'Evolution#High_CADD': 'High CADD'
  },
  Body: {
    'Body#Blood': 'Blood',
    'Body#Heart': 'Heart',
    'Body#Kidney': 'Kidney',
    'Body#Liver': 'Liver',
    'Body#Lung': 'Lung',
    'Body#Skeletal_muscle': 'Skeletal muscle',
    'Body#Testes': 'Testes',
    'Body#Ovary': 'Ovary',
    'Body#Brain_(RNAseq)': 'Brain (RNAseq)',
    'Body#Brain_(MS)': 'Brain (MS)',
    'Body#Fetal_brain_(microarray)': 'Fetal brain (microarray)',
    'Body#Adult_brain_(microarray)': 'Adult brain (microarray)'
  },
  'Brain structures': {
    'Brain_Structures#Adrenal_cortex': 'Adrenal cortex',
    'Brain_Structures#Adrenal_gland': 'Adrenal gland',
    'Brain_Structures#Amygdala': 'Amygdala',
    'Brain_Structures#Caudate_nucleus': 'Caudate nucleus',
    'Brain_Structures#Cerebellum': 'Cerebellum',
    'Brain_Structures#Cerebellum_peduncles': 'Cerebellum peduncles',
    'Brain_Structures#Ciliary_ganglion': 'Ciliary ganglion',
    'Brain_Structures#Cingulate_cortex': 'Cingulate cortex',
    'Brain_Structures#Dorsal_root_ganglion': 'Dorsal root ganglion',
    'Brain_Structures#Globus_pallidus': 'Globus pallidus',
    'Brain_Structures#Hypothalamus': 'Hypothalamus',
    'Brain_Structures#Medulla_oblongata': 'Medulla oblongata',
    'Brain_Structures#Occipital_lobe': 'Occipital lobe',
    'Brain_Structures#Olfactory_bulb': 'Olfactory bulb',
    'Brain_Structures#Parietal_lobe': 'Parietal lobe',
    'Brain_Structures#Pons': 'Pons',
    'Brain_Structures#Prefrontal_cortex': 'Prefrontal cortex',
    'Brain_Structures#Spinal_cord': 'Spinal cord',
    'Brain_Structures#Subthalamic_nucleus': 'Subthalamic nucleus',
    'Brain_Structures#Superior_cervical_ganglion': 'Superior cervical ganglion',
    'Brain_Structures#Temporal_lobe': 'Temporal lobe',
    'Brain_Structures#Thalamus': 'Thalamus',
    'Brain_Structures#Trigeminal_ganglion': 'Trigeminal ganglion',
    'Brain_Structures#Pineal_gland_(day)': 'Pineal gland (day)',
    'Brain_Structures#Pineal_gland_(night)': 'Pineal gland (night)',
    'Brain_Structures#Retina': 'Retina'
  },
  'Brain functions': {
    'Brain_Functions#Cell_adhesion_and_trans-synaptic_signaling': 'Cell adhesion and trans-synaptic signaling',
    'Brain_Functions#Cell_metabolism': 'Cell metabolism',
    'Brain_Functions#Endocytosis': 'Endocytosis',
    'Brain_Functions#Excitability': 'Excitability',
    'Brain_Functions#Exocytosis': 'Exocytosis',
    'Brain_Functions#G-protein-coupled_receptor_signaling': 'G-protein-coupled receptor signaling',
    'Brain_Functions#G-protein_relay': 'G-protein relay',
    'Brain_Functions#Intracellular_signal_transduction': 'Intracellular signal transduction',
    'Brain_Functions#Intracellular_trafficking': 'Intracellular  trafficking',
    'Brain_Functions#Ion_balance/transport': 'Ion balance/transport',
    'Brain_Functions#Ligand-gated_ion_channel_signaling': 'Ligand-gated ion channel signaling',
    'Brain_Functions#Neurotransmitter_metabolism': 'Neurotransmitter metabolism',
    'Brain_Functions#Peptide/neurotrophin_signals': 'Peptide/neurotrophin signals',
    'Brain_Functions#Protein_cluster': 'Protein cluster',
    'Brain_Functions#RNA_and_protein_synthesis_folding_and_breakdown': 'RNA and protein synthesis folding and breakdown',
    'Brain_Functions#Structural_plasticity': 'Structural plasticity',
    'Brain_Functions#Tyrosine_kinase_signaling': 'Tyrosine kinase signaling',
    'Brain_Functions#Glutamatergic': 'Glutamatergic',
    'Brain_Functions#Cholinergic': 'Cholinergic',
    'Brain_Functions#Serotonergic': 'Serotonergic',
    'Brain_Functions#GABAergic': 'GABAergic',
    'Brain_Functions#Dopaminergic': 'Dopaminergic',
    'Brain_Functions#Cell_Adhesion': 'Cell Adhesion',
    'Brain_Functions#Excitatory_(MS)': 'MS Excitatory',
    'Brain_Functions#Inhibitory_(MS)': 'MS Inhibitory'
  },
  'Brain diseases': {
    'Brain_Diseases#TADA': 'TADA genes',
    'Brain_Diseases#SFARI': 'SFARI database',
    'Brain_Diseases#DBD': 'DBD database',
    'Brain_Diseases#Macrocephaly': 'Macrocephaly',
    'Brain_Diseases#Microcephaly': 'Microcephaly',
    'Brain_Diseases#Neurodegeneration': 'Neurodegeneration',
    'Brain_Diseases#Myelin': 'Myelin associated diseases',
    'Brain_Diseases#Schizophrenia': 'Schizophrenia',
    'Brain_Diseases#Epilepsy': 'Epilepsy',
    'Brain_Diseases#Depression': 'Depression',
    'Brain_Diseases#Headache': 'Headache',
    'Brain_Diseases#Parkinson': 'Parkinson',
    'Brain_Diseases#Encephalopathy': 'Encephalopathy',
    'Brain_Diseases#Huntington': 'Huntington',
    'Brain_Diseases#Blindness': 'Blindness',
    'Brain_Diseases#Deafness': 'Deafness',
    'Brain_Diseases#Dyslexia': 'Dyslexia',
    'Brain_Diseases#Intellectual_disability': 'Intellectual disability'
  },
  'Brain cells': {
    'Brain_Cells#Human-Cortex_Glyc': 'Human cortex Glyc',
    'Brain_Cells#Human-Cortex_tRG': 'Human cortex tRG',
    'Brain_Cells#Human-Cortex_RG-div1': 'Human cortex RG-div1',
    'Brain_Cells#Human-Cortex_nEN-early2': 'Human cortex nEN-early2',
    'Brain_Cells#Human-Cortex_nEN-late': 'Human cortex nEN-late',
    'Brain_Cells#Human-Cortex_EN-V1-2': 'Human cortex EN-V1-2',
    'Brain_Cells#Human-Cortex_vRG': 'Human cortex vRG',
    'Brain_Cells#Human-Cortex_RG-div2': 'Human cortex RG-div2',
    'Brain_Cells#Human-Cortex_IN-CTX-CGE1': 'Human cortex IN-CTX-CGE1',
    'Brain_Cells#Human-Cortex_IN-CTX-CGE2': 'Human cortex IN-CTX-CGE2',
    'Brain_Cells#Human-Cortex_IPC-div2': 'Human cortex IPC-div2',
    'Brain_Cells#Human-Cortex_oRG': 'Human cortex oRG',
    'Brain_Cells#Human-Cortex_IPC-nEN1': 'Human cortex IPC-nEN1',
    'Brain_Cells#Human-Cortex_IPC-div1': 'Human cortex IPC-div1',
    'Brain_Cells#Human-Cortex_OPC': 'Human cortex OPC',
    'Brain_Cells#Human-Cortex_IN-CTX-MGE2': 'Human cortex IN-CTX-MGE2',
    'Brain_Cells#Human-Cortex_Mural': 'Human cortex mural',
    'Brain_Cells#Human-Cortex_IPC-nEN3': 'Human cortex IPC-nEN3',
    'Brain_Cells#Human-Cortex_IN-CTX-MGE1': 'Human cortex IN-CTX-MGE1',
    'Brain_Cells#Human-Cortex_IPC-nEN2': 'Human cortex IPC-nEN2',
    'Brain_Cells#Human-Cortex_EN-V1-3': 'Human cortex EN-V1-3',
    'Brain_Cells#Human-Cortex_IN-STR': 'Human cortex IN-STR',
    'Brain_Cells#Human-Cortex_EN-PFC3': 'Human cortex EN-PFC3',
    'Brain_Cells#Human-Cortex_MGE-RG2': 'Human cortex MGE-RG2',
    'Brain_Cells#Human-Cortex_nIN5': 'Human cortex nIN5',
    'Brain_Cells#Human-Cortex_MGE-IPC3': 'Human cortex MGE-IPC3',
    'Brain_Cells#Human-Cortex_nIN4': 'Human cortex nIN4',
    'Brain_Cells#Human-Cortex_MGE-IPC1': 'Human cortex MGE-IPC1',
    'Brain_Cells#Human-Cortex_MGE-RG1': 'Human cortex MGE-RG1',
    'Brain_Cells#Human-Cortex_MGE-div': 'Human cortex MGE-div',
    'Brain_Cells#Human-Cortex_MGE-IPC2': 'Human cortex MGE-IPC2',
    'Brain_Cells#Human-Cortex_nIN2': 'Human cortex nIN2',
    'Brain_Cells#Human-Cortex_Astrocyte': 'Human cortex astrocyte',
    'Brain_Cells#Human-Cortex_nIN1': 'Human cortex nIN1',
    'Brain_Cells#Human-Cortex_EN-V1-1': 'Human cortex EN-V1-1',
    'Brain_Cells#Human-Cortex_nIN3': 'Human cortex nIN3',
    'Brain_Cells#Human-Cortex_EN-PFC1': 'Human cortex EN-PFC1',
    'Brain_Cells#Human-Cortex_nEN-early1': 'Human cortex nEN-early1',
    'Brain_Cells#Human-Cortex_EN-PFC2': 'Human cortex EN-PFC2',
    'Brain_Cells#Human-Cortex_RG-early': 'Human cortex RG-early',
    'Brain_Cells#Human-Cortex_Endothelial': 'Human cortex endothelial',
    'Brain_Cells#Human-Cortex_Microglia': 'Human cortex microglia',
    'Brain_Cells#Human-Cortex_Choroid': 'Human cortex choroid',
    'Brain_Cells#Mouse-Cerebellum_Astrocytes': 'Mouse cerebellum astrocytes',
    'Brain_Cells#Mouse-Cerebellum_Blood vessel': 'Mouse cerebellum blood vessel',
    'Brain_Cells#Mouse-Cerebellum_Ciliated cells': 'Mouse cerebellum ciliated cells',
    'Brain_Cells#Mouse-Cerebellum_Erythrocyte': 'Mouse cerebellum erythrocyte',
    'Brain_Cells#Mouse-Cerebellum_GABA Progenitor': 'Mouse cerebellum gABA progenitor',
    'Brain_Cells#Mouse-Cerebellum_GABAergic Interneuron': 'Mouse cerebellum gABAergic interneuron',
    'Brain_Cells#Mouse-Cerebellum_Glia': 'Mouse cerebellum glia',
    'Brain_Cells#Mouse-Cerebellum_Glutamatergic DCN': 'Mouse cerebellum glutamatergic DCN',
    'Brain_Cells#Mouse-Cerebellum_Granule': 'Mouse cerebellum granule',
    'Brain_Cells#Mouse-Cerebellum_Meninges/Pia membrane': 'Mouse cerebellum meninges/pia membrane',
    'Brain_Cells#Mouse-Cerebellum_Microglia': 'Mouse cerebellum microglia',
    'Brain_Cells#Mouse-Cerebellum_Midbrain': 'Mouse cerebellum midbrain',
    'Brain_Cells#Mouse-Cerebellum_Progenitor': 'Mouse cerebellum progenitor',
    'Brain_Cells#Mouse-Cerebellum_Purkinje': 'Mouse cerebellum purkinje',
    'Brain_Cells#Mouse-Cerebellum_Roof plate': 'Mouse cerebellum roof plate'
  }
}
