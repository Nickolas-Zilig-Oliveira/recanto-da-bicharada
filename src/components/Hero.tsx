import { Button } from "./Button"

export function Hero() {
  const mapsHref =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Estrada Abias da Silva, 2357, Itaquaciara, Itapecerica da Serra, SP")

  return (
    <section id="top" className="relative overflow-hidden bg-mata">
      <div className="relative mx-auto grid max-w-content gap-12 px-6 pb-14 pt-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch lg:gap-10 lg:pb-0 lg:pt-16">
        <div className="flex max-w-xl flex-col justify-center lg:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-dourado">
            Itaquaciara · Itapecerica da Serra, SP
          </p>

          <h1 className="mt-5 text-balance font-display text-[2.9rem] font-semibold leading-[0.95] tracking-tight text-creme sm:text-6xl lg:text-[4.5rem]">
            Um recanto pra quem cuida de <span className="italic text-dourado">bicho</span>.
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-creme/70 sm:text-lg">
            Rações, acessórios e insumos para cães, gatos, aves, pintinhos e codornas —
            selecionados com o mesmo cuidado de sempre, agora também online.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-5">
            <Button variant="primary">Ver catálogo</Button>
            <a
              href="https://wa.me/5511993993322"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold uppercase tracking-wide text-creme underline decoration-dourado decoration-2 underline-offset-4 hover:text-dourado"
            >
              Falar no WhatsApp →
            </a>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-6 border-2 border-dourado bg-mata-escuro p-7">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-dourado">
              Visite a loja
            </p>
            <p className="mt-3 font-display text-xl font-semibold leading-snug text-creme">
              Estrada Abias da Silva, 2357
              <br />
              Itaquaciara, Itapecerica da Serra
            </p>
          </div>

          <dl className="flex flex-col gap-3 text-sm text-creme/75">
            <div className="flex justify-between gap-3 border-t border-creme/15 pt-3">
              <dt>Telefone</dt>
              <dd className="price-tag text-creme">(11) 4667-1430</dd>
            </div>
            <div className="flex justify-between gap-3 border-t border-creme/15 pt-3">
              <dt>WhatsApp</dt>
              <dd className="price-tag text-creme">(11) 99399-3322</dd>
            </div>
            <div className="flex justify-between gap-3 border-t border-creme/15 pt-3">
              <dt>Entrega</dt>
              <dd className="text-creme">Fazemos entrega</dd>
            </div>
          </dl>

          <a
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-dourado hover:text-creme"
          >
            Como chegar →
          </a>
        </div>
      </div>
    </section>
  )
}
