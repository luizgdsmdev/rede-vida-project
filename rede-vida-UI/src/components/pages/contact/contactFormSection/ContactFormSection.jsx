import React from 'react';
import { useTranslation } from 'react-i18next';
import ScrollAnimation from '../../../shared/ScrollAnimation/ScrollAnimation';

function ContactFormSection() {
  const { t } = useTranslation();
  return (
    <section className="py-12 lg:py-24 bg-gray-50 dark:bg-background-dark" id="contact-form">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-background-dark p-8 lg:p-12 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                <ScrollAnimation animation="fade-up" delay={100}>
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold mb-4 text-[#1b0e10] dark:text-white">{t('contact.form.title')}</h2>
                        <p className="text-gray-600 dark:text-gray-400">{t('contact.form.subtitle')}</p>
                    </div>
                </ScrollAnimation>
                <form action="#" className="space-y-6">
                    <ScrollAnimation animation="fade-up" delay={200}>
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">{t('contact.form.name')}</label>
                                <div className="flex items-stretch rounded-lg h-12 bg-white dark:bg-[#3d2a2d] border-2 border-transparent focus-within:border-[3px] focus-within:border-primary focus-within:shadow-[0_0_0_1px_rgba(249,115,22,0.1)] transition-all w-full">
                                    <input className="flex-1 bg-transparent border-none text-[#1b0e10] dark:text-white focus:ring-0 focus:outline-none placeholder:text-gray-500 text-sm px-4 min-w-0" placeholder={t('contact.form.namePlaceholder')} type="text"/>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">{t('contact.form.email')}</label>
                                <div className="flex items-stretch rounded-lg h-12 bg-white dark:bg-[#3d2a2d] border-2 border-transparent focus-within:border-[3px] focus-within:border-primary focus-within:shadow-[0_0_0_1px_rgba(249,115,22,0.1)] transition-all w-full">
                                    <input className="flex-1 bg-transparent border-none text-[#1b0e10] dark:text-white focus:ring-0 focus:outline-none placeholder:text-gray-500 text-sm px-4 min-w-0" placeholder={t('contact.form.emailPlaceholder')} type="email"/>
                                </div>
                            </div>
                        </div>
                    </ScrollAnimation>
                    <ScrollAnimation animation="fade-up" delay={300}>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">{t('contact.form.subject')}</label>
                            <div className="flex items-stretch rounded-lg h-12 bg-white dark:bg-[#3d2a2d] border-2 border-transparent focus-within:border-[3px] focus-within:border-primary focus-within:shadow-[0_0_0_1px_rgba(249,115,22,0.1)] transition-all w-full">
                                <input className="flex-1 bg-transparent border-none text-[#1b0e10] dark:text-white focus:ring-0 focus:outline-none placeholder:text-gray-500 text-sm px-4 min-w-0" placeholder={t('contact.form.subjectPlaceholder')} type="text"/>
                            </div>
                        </div>
                    </ScrollAnimation>
                    <ScrollAnimation animation="fade-up" delay={400}>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">{t('contact.form.message')}</label>
                            <div className="flex items-stretch rounded-lg bg-white dark:bg-[#3d2a2d] border-2 border-transparent focus-within:border-[3px] focus-within:border-primary focus-within:shadow-[0_0_0_1px_rgba(249,115,22,0.1)] transition-all w-full">
                                <textarea className="flex-1 bg-transparent border-none text-[#1b0e10] dark:text-white focus:ring-0 focus:outline-none placeholder:text-gray-500 text-sm p-4 resize-none min-w-0" placeholder={t('contact.form.messagePlaceholder')} rows="6"></textarea>
                            </div>
                        </div>
                    </ScrollAnimation>
                    <ScrollAnimation animation="fade-up" delay={500}>
                        <div className="flex justify-center pt-4">
                            <button className="w-full sm:w-auto px-12 py-4 bg-primary text-white font-bold rounded-lg shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02] transition-all" type="submit">{t('contact.form.submitButton')}</button>
                        </div>
                    </ScrollAnimation>
                </form>
            </div>
        </div>
    </section>
  )
}

export default ContactFormSection