import { useTranslation } from 'react-i18next';

function LoginForm() {
  const { t } = useTranslation();
  return (
    <div className="w-full md:w-1/2 flex flex-col justify-start p-4 md:p-6 lg:p-12 relative bg-white dark:bg-background-dark h-full overflow-y-auto">
        <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary p-2.5 rounded-xl text-white shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined text-2xl block">bloodtype</span>
            </div>
            <div>
                <h2 className="text-xl font-extrabold tracking-tight text-[#1b0e10] dark:text-white">{t('login.loginForm.title')}</h2>
                <p className="text-[10px] uppercase tracking-widest text-primary font-bold">{t('login.loginForm.subtitle')}</p>
            </div>
        </div>
        <div className="max-w-lg w-full mx-auto pt-2">
            <div className="mb-4">
                <h1 className="text-4xl font-extrabold mb-3 tracking-tight text-[#1b0e10] dark:text-white text-center pt-3">{t('login.loginForm.welcome')}</h1>
                {/* <p className="text-[#1b0e10] dark:text-gray-300 text-lg">Acesse sua conta para continuar fazendo a diferença.</p> */}
                <p className="text-[#1b0e10] dark:text-gray-300 pb-6 text-center">{t('login.loginForm.notMember')} <a className="text-primary font-extrabold hover:underline underline-offset-4" href="#">{t('login.loginForm.createAccount')}</a></p>
            </div>
            <div className="glass-effect p-1 border border-[#e7d0d4] dark:border-[#3d2a2d] rounded-[26px] shadow-2xl shadow-primary/5">
                <div className="bg-white dark:bg-background-dark/50 rounded-card p-8 md:p-10">
                    <form className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-[#1b0e10] dark:text-gray-300 ml-1" htmlFor="email">{t('login.loginForm.email')}</label>
                            <div className="relative group flex items-stretch rounded-xl h-14 bg-[#f3e7e9] dark:bg-[#3d2a2d] shadow-sm border-2 border-transparent focus-within:border-[3px] focus-within:border-primary focus-within:shadow-[0_0_0_1px_rgba(249,115,22,0.1)] transition-all w-full">
                                <div className="text-primary flex items-center justify-center pl-4 flex-shrink-0">
                                    <span className="material-symbols-outlined">mail</span>
                                </div>
                                <input className="flex-1 bg-transparent border-none text-[#1b0e10] dark:text-white focus:ring-0 focus:outline-none placeholder:text-gray-500 text-base px-3 min-w-0" id="email" name="email" autoComplete="username" placeholder={t('login.loginForm.emailPlaceholder')} type="email"/>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-sm font-semibold text-[#1b0e10] dark:text-gray-300" htmlFor="password">{t('login.loginForm.password')}</label>
                                <a className="text-xs text-primary font-bold hover:opacity-80 transition-opacity hover:underline underline-offset-4" href="#">{t('login.loginForm.forgotPassword')}</a>
                            </div>
                            <div className="relative group flex items-stretch rounded-xl h-14 bg-[#f3e7e9] dark:bg-[#3d2a2d] shadow-sm border-2 border-transparent focus-within:border-[3px] focus-within:border-primary focus-within:shadow-[0_0_0_1px_rgba(249,115,22,0.1)] transition-all w-full">
                                <div className="text-primary flex items-center justify-center pl-4 flex-shrink-0">
                                    <span className="material-symbols-outlined">lock</span>
                                </div>
                                <input className="flex-1 bg-transparent border-none text-[#1b0e10] dark:text-white focus:ring-0 focus:outline-none placeholder:text-gray-500 text-base px-3 min-w-0" autoComplete="current-password" id="password" name="password" placeholder={t('login.loginForm.passwordPlaceholder')} type="password"/>
                            </div>
                        </div>
                    <button className="w-full bg-primary hover:bg-[#ff7a6a] text-white font-bold py-4 px-6 rounded-input transition-all shadow-xl shadow-primary/30 flex items-center justify-center gap-2 text-lg mt-2 active:scale-[0.98]" type="submit">{t('login.loginForm.login')}<span className="material-symbols-outlined">arrow_forward</span></button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoginForm