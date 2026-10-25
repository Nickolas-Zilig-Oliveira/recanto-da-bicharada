import { ArchOutline, Sprig } from "./BrandMotif"
import { Button } from "./Button"

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-mata">
      <Sprig
        strokeWidth={1}
        className="pointer-events-none absolute -left-10 top-10 h-[28rem] w-[18rem] text-creme/[0.07] lg:h-[36rem] lg:w-[22rem]"
      />
      <ArchOutline
        strokeWidth={1}
        className="pointer-events-none absolute -right-16 bottom-[-6rem] h-[26rem] w-[26rem] text-creme/[0.05]"
      />

      <div className="relative mx-auto grid max-w-content gap-14 px-6 pb-16 pt-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-10 lg:pb-0 lg:pt-20">
        <div className="max-w-xl lg:pb-20">
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

        <div className="relative lg:self-stretch">
          <div
            className="relative mx-auto aspect-[3/4] w-full max-w-xs bg-creme/[0.06] lg:max-w-sm"
            style={{
              clipPath:
                "path('M0 420 V170 C0 76 72 0 160 0 S320 76 320 170 V420 Z')",
            }}
          >
            <div className="flex h-full flex-col justify-end p-7">
              <p className="font-display text-xl text-creme">Foto da loja</p>
              <p className="mt-1 text-sm text-creme/55">
                Espaço reservado para fotografia profissional (aguardando material).
              </p>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-creme/40 lg:hidden">
            Estrada Abias da Silva, 2357 — Itaquaciara
          </p>
        </div>
      </div>

      <div className="relative border-t border-creme/10">
        <div className="mx-auto flex max-w-content flex-wrap items-center gap-x-10 gap-y-3 px-6 py-5 text-xs text-creme/50">
          <span>Fazemos entrega</span>
          <span className="hidden h-1 w-1 rounded-full bg-creme/30 sm:block" />
          <span>Atendimento (11) 4667-1430</span>
          <span className="hidden h-1 w-1 rounded-full bg-creme/30 sm:block" />
          <span>Estrada Abias da Silva, 2357</span>
        </div>
      </div>
    </section>
  )
}
