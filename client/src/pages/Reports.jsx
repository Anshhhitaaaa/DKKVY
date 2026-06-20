
// src/pages/Reports.jsx
import Layout from '../components/Layout';
import { useSelector } from 'react-redux';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';

const reports = [
  { id: 1, title: 'Applicant Report', desc: 'List of all registered applicants with details' },
  { id: 2, title: 'Sector-wise Report', desc: 'Applicants grouped by training sector' },
  { id: 3, title: 'Agency Report', desc: 'Training agencies and their performance' },
  { id: 4, title: 'Attendance Report', desc: 'Attendance records for all batches' },
  { id: 5, title: 'Payment Report', desc: 'Stipend and payment details' },
  { id: 6, title: 'Assessment Report', desc: 'Assessment results and pass/fail stats' },
  { id: 7, title: 'Certificate Report', desc: 'Certificates generated and issued' },
  { id: 8, title: 'Machine Distribution Report', desc: 'Sewing machines distributed' },
  { id: 9, title: 'E-Catalogue Report', desc: 'Products listed on the e-catalogue' }
];

const Reports = () => {
  const { applicants } = useSelector(state => state.applicants);

  const exportApplicantsExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(applicants);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Applicants');
    XLSX.writeFile(workbook, 'DKKVY_Applicant_Report.xlsx');
  };

  const exportApplicantsPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Delhi Khadi Kaushal Vikas Yojna', 20, 20);
    doc.setFontSize(14);
    doc.text('Applicant Report', 20, 30);
    doc.setFontSize(10);

    let yPosition = 40;
    applicants.forEach((app, index) => {
      if (yPosition > 280) {
        doc.addPage();
        yPosition = 20;
      }
      doc.text(`ID: ${app.applicantId}`, 20, yPosition);
      doc.text(`Name: ${app.name}`, 20, yPosition + 5);
      doc.text(`Mobile: ${app.mobile}`, 20, yPosition + 10);
      doc.text(`Sector: ${app.trainingSector}`, 20, yPosition + 15);
      doc.text(`Status: ${app.applicationStatus}`, 20, yPosition + 20);
      yPosition += 30;
    });

    doc.save('DKKVY_Applicant_Report.pdf');
  };

  const handleExportExcel = (reportId) => {
    if (reportId === 1) exportApplicantsExcel();
    else alert(`Excel export for Report ID ${reportId} coming soon!`);
  };

  const handleExportPDF = (reportId) => {
    if (reportId === 1) exportApplicantsPDF();
    else alert(`PDF export for Report ID ${reportId} coming soon!`);
  };

  return (
    <Layout>
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-gray-900">MIS Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reports.map((report) => (
            <div
              key={report.id}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all hover:-translate-y-1"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3">{report.title}</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">{report.desc}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => handleExportExcel(report.id)}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-md hover:shadow-lg"
                >
                  Export Excel
                </button>
                <button
                  onClick={() => handleExportPDF(report.id)}
                  className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-3 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all shadow-md hover:shadow-lg"
                >
                  Export PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Reports;
