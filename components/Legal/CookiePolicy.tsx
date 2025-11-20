const CookiePolicy = () => {
  return (
    <div className='w-full md:min-h-[45vw] min-h-[80vh] md:py-[2vw] rounded-2xl bg-zinc-100/10 dark:bg-zinc-900/10 backdrop-blur-lg border-2 border-zinc-100/80 dark:border-zinc-900/50 flex items-center justify-between relative overflow-hidden'>

      {/* content wrapper */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-10 py-10 grid gap-5 md:gap-6">

        {/* heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-zinc-700 dark:text-zinc-300">Cookie Policy</h1>

        {/* effective date */}
        <p className="text-sm text-zinc-600 dark:text-zinc-400">Effective Date: January 1, 2026</p>

        {/* intro */}
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
          This Cookie Policy explains how Zemrev (zemrev.com) uses cookies and similar technologies to provide and improve our services. By using our website, you agree to the use of cookies described here.
        </p>

        {/* sections */}
        {[
          {
            title: "1. What Are Cookies?",
            text: "Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences and improve your experience. We use only essential and functional cookies. We do not use advertising or tracking cookies."
          },
          {
            title: "2. Types of Cookies We Use",
            sub: [
              {
                subTitle: "A. Essential Cookies (Required)",
                subText: "These cookies are needed for Zemrev to work properly. They include login & session cookies to keep you logged in securely, security cookies to protect against spam, abuse, and misuse, tool-processing cookies to support guest user credit tracking, and CSRF & access protection cookies to keep your account and requests safe. These cookies cannot be disabled because the website won't work without them."
              },
              {
                subTitle: "B. Functional Cookies",
                subText: "These help improve your experience. Examples include dark mode / theme preferences, saving small settings inside your browser, and keeping form selections or UI states. These do not track you or collect personal data."
              }
            ]
          },
          {
            title: "3. What We Do NOT Use",
            text: "Zemrev does NOT use advertising cookies, third-party tracking cookies, cross-site tracking, analytics that track you personally, marketing or retargeting cookies, or cookies for selling or sharing data. Your privacy is important to us."
          },
          {
            title: "4. How Long Are Cookies Stored?",
            text: "Different cookies have different lifetimes: session cookies are deleted when you close the browser, essential login cookies last until you log out, and preferences (like theme) may stay longer on your device. You can delete cookies anytime from your browser settings."
          },
          {
            title: "5. Managing Cookies",
            text: "Most browsers let you delete cookies, disable cookies, block third-party cookies, and clear browsing data. If you block essential cookies, some parts of Zemrev may not work, especially login, membership features, credit usage tracking, and file tool processing."
          },
          {
            title: "6. Changes to This Cookie Policy",
            text: "We may update this Cookie Policy to reflect changes in our system or laws. Whenever we update it, we will change the \"Effective Date\" at the top."
          },
          {
            title: "7. Contact Us",
            text: "If you have questions about this Cookie Policy:"
          }
        ].map((sec, idx) => (
          <section key={idx} className="grid gap-2">
            <h2 className="text-xl md:text-2xl font-semibold text-zinc-700 dark:text-zinc-300">{sec.title}</h2>
            {sec.sub ? (
              sec.sub.map((s, i) => (
                <div key={i} className="grid gap-1 pl-4">
                  <h3 className="text-lg font-medium text-zinc-700 dark:text-zinc-300">{s.subTitle}</h3>
                  <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">{s.subText}</p>
                </div>
              ))
            ) : (
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {sec.text}
                {sec.title === "7. Contact Us" && (
                  <>
                    <br />
                    <a href="mailto:support@zemrev.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                      📧 support@zemrev.com
                    </a>
                  </>
                )}
              </p>
            )}
          </section>
        ))}

      </div>
    </div>
  )
}

export default CookiePolicy