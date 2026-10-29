import React, { useState } from 'react';
import { CheckCircle2, Eye, X, FileText, Upload, AlertCircle } from 'lucide-react';

export const KYCVerificationView: React.FC = () => {
  // Pre-filled data matching user screenshot
  const [submittedData, setSubmittedData] = useState({
    aadhaarNumber: '1234 **** 9012',
    aadhaarBackStatus: 'Uploaded',
    panNumber: 'BFYPD6306J',
    submittedAt: '05 Sep 2026, 08:17 AM',
    status: 'Approved',
  });

  // Form input states
  const [aadhaarInput, setAadhaarInput] = useState('');
  const [panInput, setPanInput] = useState('');
  const [aadhaarFrontFile, setAadhaarFrontFile] = useState<File | null>(null);
  const [aadhaarBackFile, setAadhaarBackFile] = useState<File | null>(null);
  const [panFile, setPanFile] = useState<File | null>(null);

  // Status & feedback
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Document modal preview state
  const [previewDoc, setPreviewDoc] = useState<{ title: string; docType: 'aadhaarFront' | 'aadhaarBack' | 'pan' } | null>(null);

  const handleFileChange = (
    type: 'aadhaarFront' | 'aadhaarBack' | 'pan',
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
        setFeedback({ type: 'error', message: 'File size exceeds 2 MB limit.' });
        return;
      }
      if (type === 'aadhaarFront') setAadhaarFrontFile(file);
      if (type === 'aadhaarBack') setAadhaarBackFile(file);
      if (type === 'pan') setPanFile(file);
      setFeedback(null);
    }
  };

  const handleSubmitKYC = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    // Validation
    if (!aadhaarInput.trim() && !panInput.trim() && !aadhaarFrontFile && !aadhaarBackFile && !panFile) {
      setFeedback({
        type: 'error',
        message: 'Please fill in Aadhaar Number, PAN Number, or attach new documents to update.',
      });
      return;
    }

    if (aadhaarInput.trim() && aadhaarInput.trim().replace(/\s/g, '').length !== 12) {
      setFeedback({
        type: 'error',
        message: 'Aadhaar Number must be exactly 12 digits.',
      });
      return;
    }

    if (panInput.trim() && panInput.trim().length !== 10) {
      setFeedback({
        type: 'error',
        message: 'PAN Number must be exactly 10 alphanumeric characters (e.g. ABCDE1234F).',
      });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }) + ', ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

      const maskedAadhaar = aadhaarInput.trim()
        ? `${aadhaarInput.slice(0, 4)} **** ${aadhaarInput.slice(-4)}`
        : submittedData.aadhaarNumber;

      setSubmittedData({
        aadhaarNumber: maskedAadhaar,
        aadhaarBackStatus: 'Uploaded',
        panNumber: panInput.trim().toUpperCase() || submittedData.panNumber,
        submittedAt: formattedDate,
        status: 'Approved',
      });

      setIsSubmitting(false);
      setFeedback({
        type: 'success',
        message: 'KYC documents submitted and verified successfully.',
      });

      // Reset form fields
      setAadhaarInput('');
      setPanInput('');
      setAadhaarFrontFile(null);
      setAadhaarBackFile(null);
      setPanFile(null);
    }, 800);
  };

  return (
    <div className="w-full">
      {/* Centered Main White Card Matching Screenshot 1 & 2 */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 max-w-3xl mx-auto">
        {/* Top Tag & Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-2">
          <div>
            <span className="text-xs font-bold text-[#059669] tracking-wider uppercase font-mono block mb-1">
              ACCOUNT VERIFICATION
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A1D37] tracking-tight font-heading">
              Complete your KYC
            </h2>
          </div>

          {/* Status Pill Badge: ● Approved */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF7EE] text-[#059669] border border-[#059669]/20 text-xs font-bold self-start">
            <span className="w-2 h-2 rounded-full bg-[#059669]"></span>
            <span>{submittedData.status}</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-500 font-medium mb-6">
          Upload clear documents to activate secure account services.
        </p>

        {/* Feedback Alert if any */}
        {feedback && (
          <div
            className={`mb-6 p-4 rounded-xl text-xs font-medium flex items-center gap-2 ${
              feedback.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
        )}

        {/* ================= SUBMITTED DOCUMENTS BOX ================= */}
        <div className="rounded-2xl bg-[#F8FAFD] border border-blue-100/70 p-5 mb-8">
          {/* Header Row of Submitted Documents */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-4 pb-3 border-b border-slate-200/70">
            <div>
              <h4 className="text-sm font-bold text-[#0A1D37]">Submitted documents</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Your latest uploaded information is shown below.
              </p>
            </div>
            <span className="text-xs text-slate-400 font-medium whitespace-nowrap">
              {submittedData.submittedAt}
            </span>
          </div>

          {/* 3 Document Cards: AADHAAR, AADHAAR BACK, PAN CARD */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Card 1: Aadhaar Front */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                AADHAAR
              </span>
              <div className="text-sm font-extrabold text-[#0A1D37] font-mono mt-1">
                {submittedData.aadhaarNumber}
              </div>
              <button
                type="button"
                onClick={() => setPreviewDoc({ title: 'Aadhaar Front Document', docType: 'aadhaarFront' })}
                className="text-xs text-blue-600 hover:text-blue-700 hover:underline font-semibold mt-1.5 inline-block cursor-pointer"
              >
                View front file
              </button>
            </div>

            {/* Card 2: Aadhaar Back */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                AADHAAR BACK
              </span>
              <div className="text-sm font-extrabold text-[#059669] font-mono mt-1">
                {submittedData.aadhaarBackStatus}
              </div>
              <button
                type="button"
                onClick={() => setPreviewDoc({ title: 'Aadhaar Back Document', docType: 'aadhaarBack' })}
                className="text-xs text-blue-600 hover:text-blue-700 hover:underline font-semibold mt-1.5 inline-block cursor-pointer"
              >
                View back file
              </button>
            </div>

            {/* Card 3: PAN Card */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                PAN CARD
              </span>
              <div className="text-sm font-extrabold text-[#0A1D37] font-mono mt-1 uppercase">
                {submittedData.panNumber}
              </div>
              <button
                type="button"
                onClick={() => setPreviewDoc({ title: 'Permanent Account Number (PAN) Card', docType: 'pan' })}
                className="text-xs text-blue-600 hover:text-blue-700 hover:underline font-semibold mt-1.5 inline-block cursor-pointer"
              >
                View PAN file
              </button>
            </div>
          </div>
        </div>

        {/* ================= KYC FORM FIELDS ================= */}
        <form onSubmit={handleSubmitKYC} className="space-y-5">
          {/* Aadhaar Number */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800">
              Aadhaar Number
            </label>
            <input
              type="text"
              value={aadhaarInput}
              onChange={(e) => setAadhaarInput(e.target.value.replace(/\D/g, ''))}
              placeholder="Enter 12 digit Aadhaar Number"
              maxLength={12}
              className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition"
            />
          </div>

          {/* Aadhaar Front Image */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800">
              Aadhaar Front Image
            </label>
            <div className="border border-slate-300 border-dashed rounded-xl px-4 py-3 flex items-center gap-3 bg-white hover:bg-slate-50 transition cursor-pointer relative">
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={(e) => handleFileChange('aadhaarFront', e)}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <span className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 border border-slate-300 shrink-0">
                Choose File
              </span>
              <span className="text-xs text-slate-500 truncate">
                {aadhaarFrontFile ? aadhaarFrontFile.name : 'No file chosen'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">JPG, JPEG or PNG. Maximum size 2 MB.</p>
          </div>

          {/* Aadhaar Back Image */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800">
              Aadhaar Back Image
            </label>
            <div className="border border-slate-300 border-dashed rounded-xl px-4 py-3 flex items-center gap-3 bg-white hover:bg-slate-50 transition cursor-pointer relative">
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={(e) => handleFileChange('aadhaarBack', e)}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <span className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 border border-slate-300 shrink-0">
                Choose File
              </span>
              <span className="text-xs text-slate-500 truncate">
                {aadhaarBackFile ? aadhaarBackFile.name : 'No file chosen'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">JPG, JPEG or PNG. Maximum size 2 MB.</p>
          </div>

          {/* PAN Number */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800">
              PAN Number
            </label>
            <input
              type="text"
              value={panInput}
              onChange={(e) => setPanInput(e.target.value.toUpperCase())}
              placeholder="ENTER PAN NUMBER"
              maxLength={10}
              className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition uppercase"
            />
          </div>

          {/* PAN Card Image */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800">
              PAN Card Image
            </label>
            <div className="border border-slate-300 border-dashed rounded-xl px-4 py-3 flex items-center gap-3 bg-white hover:bg-slate-50 transition cursor-pointer relative">
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={(e) => handleFileChange('pan', e)}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <span className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 border border-slate-300 shrink-0">
                Choose File
              </span>
              <span className="text-xs text-slate-500 truncate">
                {panFile ? panFile.name : 'No file chosen'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">JPG, JPEG or PNG. Maximum size 2 MB.</p>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 rounded-xl bg-[#1D61E7] hover:bg-[#1554CB] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#1D61E7]/25 transition hover:scale-[1.01] active:scale-98 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit KYC'}
            </button>
          </div>
        </form>
      </div>

      {/* ================= DOCUMENT PREVIEW MODAL ================= */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0A1D37]">{previewDoc.title}</h4>
                  <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">
                    Verified Digital Copy
                  </span>
                </div>
              </div>

              <button
                onClick={() => setPreviewDoc(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Mockup Preview Container */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 flex flex-col items-center justify-center min-h-[220px] text-center relative overflow-hidden">
              <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold border border-emerald-300">
                OFFICIALLY VERIFIED
              </div>

              <div className="w-16 h-16 rounded-2xl bg-white shadow-xs border border-slate-200 flex items-center justify-center mb-3">
                <img
                  src="/images/vivtron-ve-logo.png"
                  alt="Vivtron Emblem"
                  className="w-10 h-10 object-contain"
                />
              </div>

              <p className="text-xs font-mono font-bold text-slate-800">
                {previewDoc.docType === 'pan'
                  ? `PAN CARD: ${submittedData.panNumber}`
                  : `AADHAAR: ${submittedData.aadhaarNumber}`}
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                Uploaded & digitally attested on {submittedData.submittedAt}
              </p>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setPreviewDoc(null)}
                className="px-5 py-2 rounded-xl bg-[#081E3E] hover:bg-[#051429] text-white text-xs font-bold transition cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
