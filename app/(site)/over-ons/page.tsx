export default function AboutSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <span className="text-sm font-semibold tracking-wider uppercase text-gray-500">
              Over Ons
            </span>

            <h2 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Visual Branding & Signage die merken zichtbaar maakt.
            </h2>

            <div className="mt-8 space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                Bij <strong>Maky Signing</strong> helpen we bedrijven hun merk
                sterker zichtbaar te maken. Met een combinatie van signing,
                branding en print creëren we professionele visuele oplossingen
                die opvallen en blijven hangen.
              </p>

              <p>
                Of het nu gaat om voertuigbelettering, car wraps,
                gevelreclame, raamfolies, drukwerk of complete visuele
                merkuitingen, wij zorgen voor een hoogwaardige afwerking en een
                uitstraling die past bij jouw bedrijf.
              </p>

              <p>
                We geloven dat elk merk uniek is. Daarom werken we persoonlijk,
                denken we mee vanaf het eerste idee en begeleiden we het hele
                traject van ontwerp tot realisatie.
              </p>

              <p>
                Ons doel is simpel: bedrijven helpen om professioneler,
                herkenbaarder en zichtbaarder te worden.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <div className="px-5 py-3 rounded-xl bg-gray-100">
                <span className="font-semibold">Branding</span>
              </div>

              <div className="px-5 py-3 rounded-xl bg-gray-100">
                <span className="font-semibold">Signage</span>
              </div>

              <div className="px-5 py-3 rounded-xl bg-gray-100">
                <span className="font-semibold">Print</span>
              </div>

              <div className="px-5 py-3 rounded-xl bg-gray-100">
                <span className="font-semibold">Vehicle Wraps</span>
              </div>
            </div>
          </div>

          {/* Visual Block */}
          <div className="relative">
            <div className="rounded-3xl bg-gradient-to-br from-gray-900 to-black p-10 text-white shadow-2xl">
              <h3 className="text-3xl font-bold mb-6">
                Waarom Maky Signing?
              </h3>

              <div className="space-y-5">
                <div>
                  <h4 className="font-semibold text-xl">
                    Kwaliteit voorop
                  </h4>
                  <p className="text-gray-300 mt-1">
                    Hoogwaardige materialen en een professionele afwerking voor
                    duurzame resultaten.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-xl">
                    Persoonlijke aanpak
                  </h4>
                  <p className="text-gray-300 mt-1">
                    Direct contact, korte lijnen en advies dat aansluit op jouw
                    wensen en doelen.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-xl">
                    Van idee tot realisatie
                  </h4>
                  <p className="text-gray-300 mt-1">
                    We begeleiden het volledige proces, van ontwerp en productie
                    tot montage en oplevering.
                  </p>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-gray-700">
                <p className="text-lg font-medium">
                  "Jouw merk verdient het om gezien te worden."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}