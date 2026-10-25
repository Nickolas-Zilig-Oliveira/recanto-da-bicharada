import { Button } from "./Button"

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-mata">
      {/* Textura botânica discreta */}
      <svg
        className="pointer-events-none absolute -right-24 -top-24 h-[36rem] w-[36rem] text-creme/[0.06]"
        viewBox="0 0 400 400"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M200 20c80 40 160 100 160 180s-80 160-160 160S40 280 40 200 120 60 200 20Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path d="M200 60v280M80 200h240" stroke="currentColor" strokeWidth="1" />
      </svg>

      <div className="relative mx-auto grid max-w-content gap-10 px-6 py-20 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16 lg:py-28">
        <div className="max-w-xl">
          <span className="inline-flex items-center rounded-pill bg-creme/10 px-3 py-1 text-xs font-medium tracking-wide text-creme/90">
            Itaquaciara · Itapecerica da Serra, SP
          </span>

          <h1 className="mt-5 font-display text-4xl leading-[1.1] text-creme sm:text-5xl lg:text-[3.25rem]">
            Cuidado de verdade para quem vive no campo e em casa.
          </h1>

          <p className="mt-5 text-base leading-relaxed text-creme/75 sm:text-lg">
            Rações, acessórios e insumos para cães, gatos, aves, pintinhos, codornas e muito mais —
            selecionados com o mesmo carinho de quem atende você há anos, agora também online.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button variant="primary">Ver catálogo</Button>
            <Button variant="ghost" className="border-creme/30 text-creme hover:border-creme hover:bg-creme/10">
              Falar no WhatsApp
            </Button>
          </div>
        </div>

        <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
          <div className="absolute inset-0 rounded-card border border-creme/15 bg-creme/[0.04]" />
          <div className="absolute inset-6 flex flex-col justify-end rounded-card bg-creme/10 p-6">
            <p className="font-display text-xl text-creme">Foto do estabelecimento</p>
            <p className="mt-1 text-sm text-creme/60">
              Espaço reservado para fotografia profissional da loja/produtos (Fase 1 — aguardando material).
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
