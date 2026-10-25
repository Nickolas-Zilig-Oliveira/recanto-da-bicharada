const benefits = [
  {
    title: "Atendimento próximo",
    description: "Quem compra aqui é atendido por nome, não por número de pedido.",
  },
  {
    title: "Variedade real",
    description: "De cães e gatos a aves, pintinhos e codornas — tudo em um só lugar.",
  },
  {
    title: "Base em Itapecerica",
    description: "Loja física na Estrada Abias da Silva, com entrega para a região.",
  },
]

export function EditorialSection() {
  return (
    <section id="historia" className="mx-auto max-w-content px-6 py-16 sm:py-24">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-terracota">
            Nossa história
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-carvao sm:text-4xl">
            Um recanto para quem cuida de bicho com seriedade.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-carvao/70">
            O Recanto da Bicharada atende em Itaquaciara, Itapecerica da Serra, quem vive
            rodeado de patas, penas e focinhos — do cachorro de apartamento à criação no
            quintal.
          </p>
        </div>

        <dl className="grid gap-6 sm:grid-cols-1">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="border-l-4 border-terracota pl-5">
              <dt className="font-display text-lg font-semibold text-mata">{benefit.title}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-carvao/65">{benefit.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
