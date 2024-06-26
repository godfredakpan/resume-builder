import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Import Tailwind classes
const tw = {
  flex: 'flex',
  justifyBetween: 'justify-between',
  itemsStart: 'items-start',
  mb5: 'mb-5',
  ml5: 'ml-5',
  mr5: 'mr-5',
  mt0: 'mt-0',
  mt5: 'mt-5',
  mxAuto: 'mx-auto',
  pb20: 'pb-20',
  pl20: 'pl-20',
  pr20: 'pr-20',
  pt20: 'pt-20',
  py20: 'py-20',
  textCenter: 'text-center',
  textLeft: 'text-left',
  textRight: 'text-right',
  w1: 'w-1',
  wFull: 'w-full',
  borderGray: 'border-gray-400',
  bgGray: 'bg-gray-100',
};

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 12,
    padding: 20,
    lineHeight: 1.5,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  subHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#073499',
  },
  contact: {
    fontSize: 12,
  },
  role: {
    fontSize: 12,
    marginTop: 0,
    fontWeight: '700',
    marginBottom: 10,
  },
  section: {
    marginBottom: 10,
    paddingBottom: 10,
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
  workExperienceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  column: {
    width: '33%',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  lineHeight: {
    lineHeight: 10,
  }
});

const ResumePDF = ({ formData }) => (
  <Document>
    <Page style={[styles.page, tw.py20]}>
    <View style={[styles.section, tw.mb5, tw.flex, tw.itemsStart]}>
    <View style={[tw.flex, tw.flex, tw.flexCol, tw.itemsStart]}>
        <Text style={styles.header}>{formData.name}</Text>
        <Text style={styles.role}>{formData.role}</Text>
        <Text style={styles.contact}>{formData.address}</Text>
        <Text style={styles.contact}>{formData.linkedin}</Text>
        <Text style={styles.contact}>{formData.email}</Text>
        <Text style={styles.contact}>{formData.phone}</Text>
    </View>
    
    </View>
    <View style={[styles.section, tw.mb5]}>
        <Text style={styles.subHeader}>About</Text>
        <Text style={[tw.textRight]}>{formData.about}</Text>
    </View>
      <View style={[styles.section, tw.mb5]}>
        <Text style={styles.subHeader}>Work Experience</Text>
        {formData.workExperience.map((job, index) => (
          <View key={index}>
            <View style={styles.workExperienceItem}>
              <Text style={styles.column}>{job.jobTitle}</Text>
              <View style={[styles.column, tw.textCenter]}>
                <Text>{job.jobCompany}</Text>
              </View>
              <View style={[tw.textRight]}>
                <Text>{job.jobDuration}</Text>
              </View>
            </View>
            {job.responsibilities.map((responsibility, rIndex) => (
              <View key={rIndex} style={[styles.bulletPoint, tw.ml5]}>
                <Text>•</Text>
                <Text style={styles.bulletText}>{responsibility}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
      <View style={[styles.section, tw.mb5]}>
        <Text style={styles.subHeader}>Education</Text>
        {formData?.education?.map((edu, index) => (
          <View key={index}>
            <Text>{edu.study} at {edu.school} ({edu.duration})</Text>
          </View>
        ))}
      </View>
      <View style={[styles.section, tw.mb5]}>
        <Text style={styles.subHeader}>Skills</Text>
        <Text>{formData?.skills?.join(' | ')}</Text>
      </View>
      <View style={[styles.section, tw.mb5]}>
        <Text style={styles.subHeader}>Tools & Technologies</Text>
        <Text>{formData?.tools?.join(' | ')}</Text>
      </View>
    </Page>
  </Document>
);

export default ResumePDF;
