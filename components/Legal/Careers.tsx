const Careers = () => {
  return (
    <div className='w-full md:min-h-[45vw] min-h-[80vh] md:py-[2vw] rounded-2xl bg-zinc-100/10 dark:bg-zinc-900/10 backdrop-blur-lg border-2 border-zinc-100/80 dark:border-zinc-900/50 flex items-center justify-between relative overflow-hidden'>

      {/* content wrapper */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-10 py-10 grid gap-5 md:gap-6">

        {/* heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-zinc-700 dark:text-zinc-300">Careers at Zemrev</h1>

        {/* status */}
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
          Right now, we are not hiring and we do not have an active team. Zemrev is currently a solo-built project, and all tools and features are created and managed by one developer.
        </p>

        {/* future roles */}
        <section className="grid gap-3">
          <h2 className="text-xl md:text-2xl font-semibold text-zinc-700 dark:text-zinc-300">Future Roles</h2>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            As the platform grows, we may open opportunities for:
          </p>
          <ul className="list-disc pl-5 text-zinc-700 dark:text-zinc-300 space-y-1">
            <li>Frontend Developer</li>
            <li>Backend Developer</li>
            <li>Full Stack Developer</li>
            <li>UI/UX Designer</li>
            <li>DevOps / Cloud Engineer</li>
            <li>Customer Support</li>
          </ul>
        </section>

        {/* cta */}
        <section className="grid gap-3">
          <h2 className="text-xl md:text-2xl font-semibold text-zinc-700 dark:text-zinc-300">Get in Touch</h2>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            If you're interested in the future of online tools and would like to work with us someday, you can still reach out. We will keep your details safe and contact you if any positions open in the future.
          </p>
          <a
            href="mailto:careers@zemrev.com"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            📧 careers@zemrev.com
          </a>
        </section>

      </div>
    </div>
  )
}

export default Careers