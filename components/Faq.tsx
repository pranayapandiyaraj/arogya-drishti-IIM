'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How does AI prediction work?',
      answer: 'Arogya Drishti combines multi-modal neural network models (computer vision for diagnostics, NLP for symptom extraction, and tabular gradient boosted trees for vital trends) to compute real-time risk scores for diabetes, cardiovascular anomalies, maternal complications, and respiratory conditions.',
    },
    {
      question: 'Can it work offline?',
      answer: 'Yes! Arogya Drishti utilizes INT8 quantized lightweight deep learning models stored directly on local tablet devices. Health workers can perform complete patient diagnostic evaluations without cellular internet. Data automatically synchronizes whenever 2G/3G/4G or Wi-Fi becomes available.',
    },
    {
      question: 'Which languages are supported?',
      answer: 'Our conversational voice assistant and interface support 12 major Indian languages: Hindi, Tamil, Telugu, Marathi, Bengali, Gujarati, Kannada, Malayalam, Odia, Punjabi, Assamese, and English. The voice AI seamlessly translates local dialect descriptions into standardized medical records.',
    },
    {
      question: 'Is patient data secure?',
      answer: 'Patient privacy is paramount. Arogya Drishti strictly complies with India’s Ayushman Bharat Digital Mission (ABDM) guidelines, Digital Personal Data Protection (DPDP) Act, and HIPAA security protocols. All patient records are encrypted at rest with AES-256 and in transit with TLS 1.3.',
    },
    {
      question: 'Can hospitals integrate existing systems?',
      answer: 'Absoluty. Arogya Drishti exposes standard RESTful APIs and HL7/FHIR compliant data pipelines, enabling effortless bi-directional interoperability with existing Hospital Information Management Systems (HIMS), electronic health record (EHR) databases, and government health portals.',
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-4 border border-emerald-200">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight mb-4">
            Everything You Need to Know
          </h2>
          <p className="text-gray-600 font-normal leading-relaxed text-base">
            Got questions about deployment, data security, or technical integration? We have answers.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden transition-all shadow-sm hover:border-emerald-300"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-bold text-lg text-navy-900 hover:text-emerald-600 transition-colors focus:outline-none"
                >
                  <span>{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    isOpen ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-2 text-gray-600 text-base leading-relaxed border-t border-gray-100 font-normal">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
