import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 12,
    padding: 20,
    lineHeight: 1.5,
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'column',
  },
  headerRight: {
    width: '50%',
    textAlign: 'right',
    marginTop: 70,
    fontSize: 10,
  },
  headerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 0,
  },
  headerRole: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
    marginTop: 0,
  },
  contact: {
    fontSize: 10,
    marginBottom: 2,
  },
  subHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#073499',
  },
  section: {
    marginBottom: 10,
    paddingBottom: 10,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#073499',
    marginBottom: 10,
    marginTop: -5,
  },
  workExperienceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  column: {
    width: '33%',
    fontWeight: 'bolder',
    textAlign: 'left',
  },
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
    marginLeft: 10,
  },
  bulletText: {
    fontSize: 12,
    marginLeft: 10,
  },
});

const ResumePDF = ({ formData }) => {
  if (!formData) {
    return <Text>No data available to generate the resume.</Text>;
  }

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.headerSection}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerName}>{formData.name}</Text>
            <Text style={styles.headerRole}>{formData.role}</Text>
            <Text style={styles.contact}>{formData.address}</Text>
            <Text style={styles.contact}>{formData.linkedin}</Text>
            <Text style={styles.contact}>{formData.email}</Text>
            <Text style={styles.contact}>{formData.phone}</Text>
          </View>
          <View style={styles.headerRight}>
            <Text>{formData.about}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.subHeader}>Work Experience</Text>
          <View style={styles.line}></View>
          {formData.workExperience?.map((job, index) => (
            <View key={index}>
              <View style={styles.workExperienceItem}>
                <Text style={styles.column}>{job.jobTitle}</Text>
                <View style={styles.column}>
                  <Text style={{ textAlign: 'center', fontWeight: 'bolder' }}>{job.jobCompany}</Text>
                </View>
                <View style={styles.column}>
                  <Text style={{ textAlign: 'right', fontWeight: 'bolder' }}>{job.jobDuration}</Text>
                </View>
              </View>
              {job.responsibilities?.map((responsibility, rIndex) => (
                <View key={rIndex} style={styles.bulletPoint}>
                  <Text>•</Text>
                  <Text style={styles.bulletText}>{responsibility}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.subHeader}>Education</Text>
          <View style={styles.line}></View>
          {formData.education?.map((edu, index) => (
            <View key={index}>
              <Text>Studied {edu.study} at {edu.school} ({edu.duration})</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.subHeader}>Skills</Text>
          <View style={styles.line}></View>
          <Text>{formData.skills?.join(' | ')}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subHeader}>Tools & Technologies</Text>
          <View style={styles.line}></View>
          <Text>{formData.tools?.join(' | ')}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default ResumePDF;