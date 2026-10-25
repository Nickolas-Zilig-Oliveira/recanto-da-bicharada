import { Button } from "./Button"

export function Hero() {
  const mapsHref = "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Estrada Abias da Silva, 2357, Itaquaciara, Itapecerica da Serra, SP")

  return (
    <section id="top" className="relative overflow-hidden bg-mata">
      <div className="relative mx-auto grid max-w-content gap-12 px-6 pb-14 pt-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-10 lg:pb-20 lg:pt-20">
        <div className="max-w-xl">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-creme/55">
            Itaquaciara · Itapecerica da Serra, SP
          </p>

          <h1 className="mt-5 text-balance font-display text-[2.75rem] leading-[0.98] tracking-tight text-creme sm:text-6xl lg:text-[4.25rem]">
            Um recanto pra quem cuida de bicho.
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
              className="text-sm font-medium text-creme underline decoration-creme/30 underline-offset-4 hover:decoration-creme"
            >
              Falar no WhatsApp →
            </a>
          </div>
        </div>

        <div className="surface-mata flex flex-col justify-between gap-8 border border-creme/15 p-7">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-creme/50">
              Visite a loja
            </p>
            <p className="mt-3 font-display text-xl leading-snug text-creme">
              Estrada Abias da Silva, 2357
              <br />
              Itaquaciara, Itapecerica da Serra
            </p>
          </div>

          <dl className="flex flex-col gap-3 text-sm text-creme/75">
            <div className="flex justify-between gap-3 border-t border-creme/10 pt-3">
              <dt>Telefone</dt>
              <dd className="text-creme">(11) 4667-1430</dd>
            </div>
            <div className="flex justify-between gap-3 border-t border-creme/10 pt-3">
              <dt>WhatsApp</dt>
              <dd className="text-creme">(11) 99399-3322</dd>
            </div>
            <div className="flex justify-between gap-3 border-t border-creme/10 pt-3">
              <dt>Entrega</dt>
              <dd className="text-creme">Fazemos entrega</dd>
            </div>
          </dl>

          <a
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-creme underline decoration-creme/30 underline-offset-4 hover:decoration-creme"
          >
            Como chegar →
          </a>
        </div>
      </div>
    </section>
  )
}
