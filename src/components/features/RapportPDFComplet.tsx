import React from 'react'
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from '@react-pdf/renderer'

// Types
interface CompanyData {
  nom_entreprise: string
  secteur_activite: string
  taille_entreprise: string
  nombre_employes: number
  ca_annuel: number
  volume_factures_b2b: number
  volume_factures_b2c: number
  format_actuel: string
}

interface AuditResult {
  score_conformite: number
  niveau_risque: string
  amendes_potentielles: {
    mensuelle: number
    annuelle: number
    pa_manquante: number
  }
  plan_migration: {
    duree_estimee: string
    cout_total: number
    etapes: string[]
  }
  points_critiques: string[]
  recommandations: string[]
}

interface ROICalculation {
  economies_amendes: {
    annuelle: number
    trois_ans: number
  }
  gains_productivite: {
    annuel: number
    trois_ans: number
  }
  roi: {
    mensuel: number
    annuel: number
    trois_ans: number
  }
  breakeven_mois: number
}

interface PDPRecommendation {
  provider: string
  score_match: number
  raisons: string[]
  prix_mensuel: number
  delai_integration: string
  fonctionnalites_cles: string[]
}

interface RapportPDFProps {
  company: CompanyData
  audit: AuditResult
  roi: ROICalculation
  pdp: PDPRecommendation
}

// Styles PDF
const styles = StyleSheet.create({
  // Page générale
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40,
    fontFamily: 'Helvetica',
  },

  // Couverture
  coverPage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6366F1',
  },
  coverTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  coverSubtitle: {
    fontSize: 18,
    color: '#E0E7FF',
    marginBottom: 40,
    textAlign: 'center',
  },
  coverCompany: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  coverDate: {
    fontSize: 14,
    color: '#C7D2FE',
  },

  // Header et footer
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#6366F1',
  },
  headerTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6366F1',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  footerText: {
    fontSize: 10,
    color: '#64748B',
  },
  pageNumber: {
    fontSize: 10,
    color: '#64748B',
  },

  // Sections
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 15,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#6366F1',
  },
  sectionSubtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#475569',
    marginTop: 15,
    marginBottom: 10,
  },

  // Score et métriques
  scoreContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#6366F1',
    textAlign: 'center',
    marginBottom: 10,
  },
  scoreLabel: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
  },

  // Métriques en grille
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  metricBox: {
    width: '48%',
    backgroundColor: '#F8FAFC',
    borderRadius: 6,
    padding: 15,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  metricLabel: {
    fontSize: 11,
    color: '#64748B',
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
  },

  // Alertes et warnings
  alertBox: {
    backgroundColor: '#FEF2F2',
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
    padding: 15,
    marginBottom: 15,
    borderRadius: 4,
  },
  alertTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#991B1B',
    marginBottom: 5,
  },
  alertText: {
    fontSize: 11,
    color: '#7F1D1D',
    lineHeight: 1.5,
  },

  // Listes
  listItem: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingLeft: 10,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#6366F1',
    marginRight: 10,
    marginTop: 6,
  },
  listText: {
    fontSize: 11,
    color: '#334155',
    flex: 1,
    lineHeight: 1.6,
  },

  // Tableaux
  table: {
    marginBottom: 15,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingVertical: 8,
  },
  tableHeader: {
    backgroundColor: '#F1F5F9',
    paddingVertical: 10,
  },
  tableCell: {
    fontSize: 10,
    color: '#475569',
    padding: 5,
  },
  tableCellBold: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1E293B',
    padding: 5,
  },

  // Plan de migration
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  stepContent: {
    flex: 1,
    paddingTop: 5,
  },
  stepText: {
    fontSize: 11,
    color: '#334155',
    lineHeight: 1.6,
  },

  // Recommandation PDP
  pdpCard: {
    backgroundColor: '#EEF2FF',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#6366F1',
  },
  pdpTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4338CA',
    marginBottom: 10,
  },
  pdpScore: {
    fontSize: 16,
    color: '#6366F1',
    marginBottom: 15,
  },

  // Texte général
  text: {
    fontSize: 11,
    color: '#334155',
    lineHeight: 1.6,
    marginBottom: 8,
  },
  textBold: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  textItalic: {
    fontSize: 11,
    fontStyle: 'italic',
    color: '#64748B',
  },
})

// Composant Rapport PDF
const RapportPDFComplet: React.FC<RapportPDFProps> = ({ company, audit, roi, pdp }) => {
  const dateRapport = new Date().toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <Document>
      {/* PAGE 1: COUVERTURE */}
      <Page size="A4" style={styles.coverPage}>
        <Text style={styles.coverTitle}>Rapport d'Audit de Conformité</Text>
        <Text style={styles.coverSubtitle}>E-Facture 2026 | Analyse Complète</Text>
        <View style={{ marginVertical: 40 }}>
          <Text style={styles.coverCompany}>{company.nom_entreprise}</Text>
          <Text style={styles.coverDate}>{dateRapport}</Text>
        </View>
        <Text style={{ fontSize: 12, color: '#C7D2FE', position: 'absolute', bottom: 40 }}>
          Généré par DreamNova Compta - Propulsé par IA
        </Text>
      </Page>

      {/* PAGE 2: SOMMAIRE EXÉCUTIF */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Sommaire Exécutif</Text>
          <Text style={styles.headerTitle}>{company.nom_entreprise}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Résumé du Rapport</Text>
          <Text style={styles.text}>
            Ce rapport présente l'analyse complète de la conformité de votre entreprise aux
            nouvelles obligations de facturation électronique qui entreront en vigueur le 1er
            septembre 2026 pour les ETI et grandes entreprises.
          </Text>
        </View>

        <View style={styles.scoreContainer}>
          <Text style={styles.scoreValue}>{audit.score_conformite}%</Text>
          <Text style={styles.scoreLabel}>Score de Conformité Global</Text>
          <Text style={{ ...styles.text, textAlign: 'center', marginTop: 10, color: '#64748B' }}>
            Niveau de risque : {audit.niveau_risque}
          </Text>
        </View>

        <View style={styles.metricsGrid}>
          <View style={styles.metricBox}>
            <Text style={styles.metricLabel}>Amendes Potentielles (An 1)</Text>
            <Text style={styles.metricValue}>
              {(audit.amendes_potentielles.annuelle +
                audit.amendes_potentielles.pa_manquante).toLocaleString('fr-FR')}
              €
            </Text>
          </View>
          <View style={styles.metricBox}>
            <Text style={styles.metricLabel}>ROI Conformité (An 1)</Text>
            <Text style={styles.metricValue}>{roi.roi.annuel.toFixed(0)}%</Text>
          </View>
        </View>

        <View style={styles.metricsGrid}>
          <View style={styles.metricBox}>
            <Text style={styles.metricLabel}>Durée Mise en Conformité</Text>
            <Text style={styles.metricValue}>{audit.plan_migration.duree_estimee}</Text>
          </View>
          <View style={styles.metricBox}>
            <Text style={styles.metricLabel}>Breakeven</Text>
            <Text style={styles.metricValue}>{roi.breakeven_mois} mois</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>DreamNova Compta | Rapport de Conformité 2026</Text>
          <Text style={styles.pageNumber}>Page 2</Text>
        </View>
      </Page>

      {/* PAGE 3: INFORMATIONS ENTREPRISE */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profil Entreprise</Text>
          <Text style={styles.headerTitle}>{company.nom_entreprise}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations Générales</Text>

          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={{ ...styles.tableCellBold, flex: 1 }}>Critère</Text>
              <Text style={{ ...styles.tableCellBold, flex: 2 }}>Valeur</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={{ ...styles.tableCell, flex: 1 }}>Nom de l'entreprise</Text>
              <Text style={{ ...styles.tableCell, flex: 2 }}>{company.nom_entreprise}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={{ ...styles.tableCell, flex: 1 }}>Secteur d'activité</Text>
              <Text style={{ ...styles.tableCell, flex: 2 }}>{company.secteur_activite}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={{ ...styles.tableCell, flex: 1 }}>Taille</Text>
              <Text style={{ ...styles.tableCell, flex: 2 }}>{company.taille_entreprise}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={{ ...styles.tableCell, flex: 1 }}>Nombre d'employés</Text>
              <Text style={{ ...styles.tableCell, flex: 2 }}>
                {company.nombre_employes} employés
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={{ ...styles.tableCell, flex: 1 }}>Chiffre d'affaires</Text>
              <Text style={{ ...styles.tableCell, flex: 2 }}>
                {(company.ca_annuel / 1000000).toFixed(1)}M€
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={{ ...styles.tableCell, flex: 1 }}>Volume factures B2B</Text>
              <Text style={{ ...styles.tableCell, flex: 2 }}>
                {company.volume_factures_b2b}/mois
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={{ ...styles.tableCell, flex: 1 }}>Volume factures B2C</Text>
              <Text style={{ ...styles.tableCell, flex: 2 }}>
                {company.volume_factures_b2c}/mois
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={{ ...styles.tableCell, flex: 1 }}>Format actuel</Text>
              <Text style={{ ...styles.tableCell, flex: 2 }}>{company.format_actuel}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contexte Réglementaire</Text>
          <Text style={styles.text}>
            La loi de finances 2020 impose la généralisation de la facturation électronique entre
            entreprises assujetties à la TVA en France. Cette obligation s'appliquera
            progressivement :
          </Text>
          <View style={styles.listItem}>
            <View style={styles.bullet} />
            <Text style={styles.listText}>
              1er septembre 2026 : ETI et grandes entreprises (réception et émission)
            </Text>
          </View>
          <View style={styles.listItem}>
            <View style={styles.bullet} />
            <Text style={styles.listText}>
              1er septembre 2027 : PME et TPE (réception et émission)
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>DreamNova Compta | Rapport de Conformité 2026</Text>
          <Text style={styles.pageNumber}>Page 3</Text>
        </View>
      </Page>

      {/* PAGE 4: ANALYSE DE CONFORMITÉ */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Analyse de Conformité</Text>
          <Text style={styles.headerTitle}>{company.nom_entreprise}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Score de Conformité Détaillé</Text>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreValue}>{audit.score_conformite}%</Text>
            <Text style={styles.scoreLabel}>Score Global</Text>
          </View>

          <View style={styles.alertBox}>
            <Text style={styles.alertTitle}>⚠️ Niveau de Risque : {audit.niveau_risque}</Text>
            <Text style={styles.alertText}>
              Votre entreprise présente un niveau de risque {audit.niveau_risque.toLowerCase()}.
              Une mise en conformité rapide est {audit.niveau_risque === 'CRITIQUE' ? 'URGENTE' : 'recommandée'}.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Points Critiques Identifiés</Text>
          {audit.points_critiques.map((point, index) => (
            <View key={index} style={styles.listItem}>
              <View style={[styles.bullet, { backgroundColor: '#EF4444' }]} />
              <Text style={styles.listText}>{point}</Text>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>DreamNova Compta | Rapport de Conformité 2026</Text>
          <Text style={styles.pageNumber}>Page 4</Text>
        </View>
      </Page>

      {/* PAGE 5: AMENDES ET PÉNALITÉS */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Amendes et Pénalités</Text>
          <Text style={styles.headerTitle}>{company.nom_entreprise}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Calcul des Amendes Potentielles</Text>

          <View style={styles.alertBox}>
            <Text style={styles.alertTitle}>💰 Impact Financier An 1</Text>
            <Text style={[styles.alertText, { fontSize: 14, fontWeight: 'bold' }]}>
              {(audit.amendes_potentielles.annuelle +
                audit.amendes_potentielles.pa_manquante).toLocaleString('fr-FR')}
              € d'amendes potentielles
            </Text>
          </View>

          <View style={styles.metricsGrid}>
            <View style={styles.metricBox}>
              <Text style={styles.metricLabel}>Amendes Mensuelles</Text>
              <Text style={styles.metricValue}>
                {audit.amendes_potentielles.mensuelle.toLocaleString('fr-FR')}€
              </Text>
              <Text style={{ ...styles.text, fontSize: 9, marginTop: 5 }}>
                15€ par facture non conforme
              </Text>
            </View>
            <View style={styles.metricBox}>
              <Text style={styles.metricLabel}>Amendes Annuelles</Text>
              <Text style={styles.metricValue}>
                {audit.amendes_potentielles.annuelle.toLocaleString('fr-FR')}€
              </Text>
              <Text style={{ ...styles.text, fontSize: 9, marginTop: 5 }}>
                Plafond légal : 15,000€/an
              </Text>
            </View>
          </View>

          {audit.amendes_potentielles.pa_manquante > 0 && (
            <View style={[styles.alertBox, { backgroundColor: '#FFFBEB', borderLeftColor: '#F59E0B' }]}>
              <Text style={[styles.alertTitle, { color: '#92400E' }]}>
                ⚠️ Pénalité Plateforme d'Agrément (PA)
              </Text>
              <Text style={[styles.alertText, { color: '#78350F' }]}>
                Vous n'avez pas configuré de Plateforme d'Agrément. Pénalité de 500€ + 1,000€ par
                trimestre = {audit.amendes_potentielles.pa_manquante.toLocaleString('fr-FR')}€/an
              </Text>
            </View>
          )}

          <Text style={styles.sectionSubtitle}>Projection sur 3 Ans</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={{ ...styles.tableCellBold, flex: 1 }}>Année</Text>
              <Text style={{ ...styles.tableCellBold, flex: 2 }}>Amendes Factures</Text>
              <Text style={{ ...styles.tableCellBold, flex: 2 }}>Pénalité PA</Text>
              <Text style={{ ...styles.tableCellBold, flex: 2 }}>Total</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={{ ...styles.tableCell, flex: 1 }}>An 1</Text>
              <Text style={{ ...styles.tableCell, flex: 2 }}>
                {audit.amendes_potentielles.annuelle.toLocaleString('fr-FR')}€
              </Text>
              <Text style={{ ...styles.tableCell, flex: 2 }}>
                {audit.amendes_potentielles.pa_manquante.toLocaleString('fr-FR')}€
              </Text>
              <Text style={{ ...styles.tableCellBold, flex: 2 }}>
                {(audit.amendes_potentielles.annuelle +
                  audit.amendes_potentielles.pa_manquante).toLocaleString('fr-FR')}
                €
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={{ ...styles.tableCell, flex: 1 }}>An 2</Text>
              <Text style={{ ...styles.tableCell, flex: 2 }}>
                {audit.amendes_potentielles.annuelle.toLocaleString('fr-FR')}€
              </Text>
              <Text style={{ ...styles.tableCell, flex: 2 }}>
                {audit.amendes_potentielles.pa_manquante.toLocaleString('fr-FR')}€
              </Text>
              <Text style={{ ...styles.tableCellBold, flex: 2 }}>
                {(audit.amendes_potentielles.annuelle +
                  audit.amendes_potentielles.pa_manquante).toLocaleString('fr-FR')}
                €
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={{ ...styles.tableCell, flex: 1 }}>An 3</Text>
              <Text style={{ ...styles.tableCell, flex: 2 }}>
                {audit.amendes_potentielles.annuelle.toLocaleString('fr-FR')}€
              </Text>
              <Text style={{ ...styles.tableCell, flex: 2 }}>
                {audit.amendes_potentielles.pa_manquante.toLocaleString('fr-FR')}€
              </Text>
              <Text style={{ ...styles.tableCellBold, flex: 2 }}>
                {(audit.amendes_potentielles.annuelle +
                  audit.amendes_potentielles.pa_manquante).toLocaleString('fr-FR')}
                €
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>DreamNova Compta | Rapport de Conformité 2026</Text>
          <Text style={styles.pageNumber}>Page 5</Text>
        </View>
      </Page>

      {/* PAGE 6: ANALYSE ROI */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Analyse du Retour sur Investissement</Text>
          <Text style={styles.headerTitle}>{company.nom_entreprise}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ROI de la Mise en Conformité</Text>

          <View style={[styles.scoreContainer, { backgroundColor: '#F0FDF4', borderColor: '#10B981' }]}>
            <Text style={[styles.scoreValue, { color: '#10B981' }]}>
              {roi.roi.annuel.toFixed(0)}%
            </Text>
            <Text style={styles.scoreLabel}>ROI Annuel</Text>
          </View>

          <View style={styles.metricsGrid}>
            <View style={styles.metricBox}>
              <Text style={styles.metricLabel}>Économies An 1</Text>
              <Text style={[styles.metricValue, { color: '#10B981' }]}>
                {(roi.economies_amendes.annuelle + roi.gains_productivite.annuel).toLocaleString(
                  'fr-FR'
                )}
                €
              </Text>
            </View>
            <View style={styles.metricBox}>
              <Text style={styles.metricLabel}>Breakeven</Text>
              <Text style={[styles.metricValue, { color: '#6366F1' }]}>
                {roi.breakeven_mois} mois
              </Text>
            </View>
          </View>

          <Text style={styles.sectionSubtitle}>Détail des Économies</Text>

          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={{ ...styles.tableCellBold, flex: 2 }}>Poste d'économie</Text>
              <Text style={{ ...styles.tableCellBold, flex: 1 }}>An 1</Text>
              <Text style={{ ...styles.tableCellBold, flex: 1 }}>3 Ans</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={{ ...styles.tableCell, flex: 2 }}>Amendes évitées</Text>
              <Text style={{ ...styles.tableCell, flex: 1 }}>
                {roi.economies_amendes.annuelle.toLocaleString('fr-FR')}€
              </Text>
              <Text style={{ ...styles.tableCell, flex: 1 }}>
                {roi.economies_amendes.trois_ans.toLocaleString('fr-FR')}€
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={{ ...styles.tableCell, flex: 2 }}>Gains de productivité</Text>
              <Text style={{ ...styles.tableCell, flex: 1 }}>
                {roi.gains_productivite.annuel.toLocaleString('fr-FR')}€
              </Text>
              <Text style={{ ...styles.tableCell, flex: 1 }}>
                {roi.gains_productivite.trois_ans.toLocaleString('fr-FR')}€
              </Text>
            </View>
            <View style={[styles.tableRow, { backgroundColor: '#F0FDF4' }]}>
              <Text style={{ ...styles.tableCellBold, flex: 2 }}>Total</Text>
              <Text style={{ ...styles.tableCellBold, flex: 1 }}>
                {(roi.economies_amendes.annuelle + roi.gains_productivite.annuel).toLocaleString(
                  'fr-FR'
                )}
                €
              </Text>
              <Text style={{ ...styles.tableCellBold, flex: 1 }}>
                {(roi.economies_amendes.trois_ans + roi.gains_productivite.trois_ans).toLocaleString(
                  'fr-FR'
                )}
                €
              </Text>
            </View>
          </View>

          <Text style={styles.sectionSubtitle}>ROI sur 3 Ans</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={{ ...styles.tableCellBold, flex: 1 }}>Période</Text>
              <Text style={{ ...styles.tableCellBold, flex: 2 }}>ROI</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={{ ...styles.tableCell, flex: 1 }}>Mensuel</Text>
              <Text style={{ ...styles.tableCell, flex: 2 }}>{roi.roi.mensuel.toFixed(1)}%</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={{ ...styles.tableCell, flex: 1 }}>Annuel</Text>
              <Text style={{ ...styles.tableCell, flex: 2 }}>{roi.roi.annuel.toFixed(1)}%</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={{ ...styles.tableCell, flex: 1 }}>3 Ans</Text>
              <Text style={{ ...styles.tableCellBold, flex: 2 }}>
                {roi.roi.trois_ans.toFixed(1)}%
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>DreamNova Compta | Rapport de Conformité 2026</Text>
          <Text style={styles.pageNumber}>Page 6</Text>
        </View>
      </Page>

      {/* PAGE 7: RECOMMANDATION PDP */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Recommandation Plateforme</Text>
          <Text style={styles.headerTitle}>{company.nom_entreprise}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Plateforme de Dématérialisation Partenaire (PDP)</Text>

          <View style={styles.pdpCard}>
            <Text style={styles.pdpTitle}>{pdp.provider}</Text>
            <Text style={styles.pdpScore}>Score de correspondance : {pdp.score_match}%</Text>
            <View style={styles.metricsGrid}>
              <View style={{ width: '48%' }}>
                <Text style={[styles.textBold, { marginBottom: 5 }]}>Prix mensuel</Text>
                <Text style={styles.text}>{pdp.prix_mensuel}€/mois</Text>
              </View>
              <View style={{ width: '48%' }}>
                <Text style={[styles.textBold, { marginBottom: 5 }]}>Délai d'intégration</Text>
                <Text style={styles.text}>{pdp.delai_integration}</Text>
              </View>
            </View>
          </View>

          <Text style={styles.sectionSubtitle}>Pourquoi {pdp.provider} ?</Text>
          {pdp.raisons.map((raison, index) => (
            <View key={index} style={styles.listItem}>
              <View style={[styles.bullet, { backgroundColor: '#10B981' }]} />
              <Text style={styles.listText}>{raison}</Text>
            </View>
          ))}

          <Text style={styles.sectionSubtitle}>Fonctionnalités Clés</Text>
          {pdp.fonctionnalites_cles.map((fonc, index) => (
            <View key={index} style={styles.listItem}>
              <View style={styles.bullet} />
              <Text style={styles.listText}>{fonc}</Text>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>DreamNova Compta | Rapport de Conformité 2026</Text>
          <Text style={styles.pageNumber}>Page 7</Text>
        </View>
      </Page>

      {/* PAGE 8: PLAN DE MIGRATION */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Plan de Migration</Text>
          <Text style={styles.headerTitle}>{company.nom_entreprise}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Roadmap de Mise en Conformité</Text>

          <View style={styles.metricsGrid}>
            <View style={styles.metricBox}>
              <Text style={styles.metricLabel}>Durée Estimée</Text>
              <Text style={styles.metricValue}>{audit.plan_migration.duree_estimee}</Text>
            </View>
            <View style={styles.metricBox}>
              <Text style={styles.metricLabel}>Coût Total</Text>
              <Text style={styles.metricValue}>
                {audit.plan_migration.cout_total.toLocaleString('fr-FR')}€
              </Text>
            </View>
          </View>

          <Text style={styles.sectionSubtitle}>Étapes de Migration</Text>
          {audit.plan_migration.etapes.map((etape, index) => (
            <View key={index} style={styles.stepContainer}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepText}>{etape}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommandations d'Action</Text>
          {audit.recommandations.map((reco, index) => (
            <View key={index} style={styles.listItem}>
              <View style={[styles.bullet, { backgroundColor: '#6366F1' }]} />
              <Text style={styles.listText}>{reco}</Text>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>DreamNova Compta | Rapport de Conformité 2026</Text>
          <Text style={styles.pageNumber}>Page 8</Text>
        </View>
      </Page>

      {/* PAGE 9: CONCLUSION */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Conclusion et Prochaines Étapes</Text>
          <Text style={styles.headerTitle}>{company.nom_entreprise}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Synthèse de l'Audit</Text>
          <Text style={styles.text}>
            L'audit de conformité de {company.nom_entreprise} révèle un score de{' '}
            {audit.score_conformite}% avec un niveau de risque {audit.niveau_risque}. Une mise en
            conformité est {audit.score_conformite < 70 ? 'impérative' : 'recommandée'} avant la
            deadline du 1er septembre 2026.
          </Text>

          <View style={styles.alertBox}>
            <Text style={styles.alertTitle}>🎯 Actions Prioritaires</Text>
            <Text style={styles.alertText}>
              1. Configurer une Plateforme d'Agrément (PA) dans les 30 jours{'\n'}
              2. Migrer vers {pdp.provider} (délai : {pdp.delai_integration}){'\n'}
              3. Former vos équipes aux nouvelles obligations{'\n'}
              4. Tester le processus complet avant la deadline
            </Text>
          </View>

          <Text style={styles.sectionSubtitle}>Impact Business</Text>
          <Text style={styles.text}>
            Investissement total : {audit.plan_migration.cout_total.toLocaleString('fr-FR')}€
            {'\n'}
            ROI An 1 : {roi.roi.annuel.toFixed(0)}%{'\n'}
            Économies An 1 :{' '}
            {(roi.economies_amendes.annuelle + roi.gains_productivite.annuel).toLocaleString(
              'fr-FR'
            )}
            €{'\n'}
            Breakeven : {roi.breakeven_mois} mois
          </Text>

          <Text style={styles.sectionSubtitle}>Support DreamNova</Text>
          <Text style={styles.text}>
            Notre équipe d'experts est à votre disposition pour vous accompagner dans votre mise en
            conformité. Contactez-nous pour discuter de votre projet et bénéficier d'un
            accompagnement personnalisé.
          </Text>

          <View
            style={{
              backgroundColor: '#EEF2FF',
              padding: 15,
              borderRadius: 8,
              marginTop: 20,
            }}
          >
            <Text style={[styles.textBold, { color: '#4338CA', fontSize: 13, marginBottom: 5 }]}>
              📞 Contact
            </Text>
            <Text style={[styles.text, { marginBottom: 3 }]}>
              Email : contact@dreamnova-compta.fr
            </Text>
            <Text style={[styles.text, { marginBottom: 3 }]}>Tél : +33 1 XX XX XX XX</Text>
            <Text style={styles.text}>Web : www.dreamnova-compta.fr</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>DreamNova Compta | Rapport de Conformité 2026</Text>
          <Text style={styles.pageNumber}>Page 9</Text>
        </View>
      </Page>

      {/* PAGE 10: ANNEXES */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Annexes</Text>
          <Text style={styles.headerTitle}>{company.nom_entreprise}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Glossaire</Text>

          <View style={{ marginBottom: 10 }}>
            <Text style={styles.textBold}>PDP (Plateforme de Dématérialisation Partenaire)</Text>
            <Text style={styles.text}>
              Plateforme certifiée par l'État pour émettre et recevoir des factures électroniques
              conformes.
            </Text>
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text style={styles.textBold}>PA (Plateforme d'Agrément)</Text>
            <Text style={styles.text}>
              Entité chargée d'assurer la transmission des factures entre émetteur et destinataire
              via le portail public de facturation.
            </Text>
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text style={styles.textBold}>Factur-X</Text>
            <Text style={styles.text}>
              Format de facture électronique hybride combinant un PDF lisible et des données
              structurées XML.
            </Text>
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text style={styles.textBold}>EN 16931</Text>
            <Text style={styles.text}>
              Norme européenne définissant le modèle sémantique de données des factures
              électroniques.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mentions Légales</Text>
          <Text style={[styles.text, { fontSize: 9 }]}>
            Ce rapport a été généré automatiquement par DreamNova Compta le {dateRapport}. Les
            informations contenues dans ce document sont basées sur les données fournies par{' '}
            {company.nom_entreprise} et sur l'analyse de nos algorithmes d'intelligence
            artificielle.
            {'\n\n'}
            Les recommandations et estimations présentées sont indicatives et peuvent varier en
            fonction de l'évolution réglementaire et de la situation spécifique de votre
            entreprise. Nous recommandons de consulter un expert-comptable pour validation.
            {'\n\n'}© 2025 DreamNova Compta - Tous droits réservés
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>DreamNova Compta | Rapport de Conformité 2026</Text>
          <Text style={styles.pageNumber}>Page 10</Text>
        </View>
      </Page>
    </Document>
  )
}

export default RapportPDFComplet
