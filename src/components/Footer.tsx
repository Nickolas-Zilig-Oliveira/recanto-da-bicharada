import { Logo } from "./Logo"

export function Footer() {
  return (
    <footer id="contato" className="bg-carvao text-creme/80">
      <div className="mx-auto grid max-w-content gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo variant="mark" />
          <p className="mt-4 max-w-[22ch] text-sm leading-relaxed text-creme/60">
            Casa de rações e produtos para animais em Itapecerica da Serra, SP.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-creme">Loja</h3>
          <ul className="mt-4 space-y-2 text-sm text-creme/60">
            <li><a href="#catalogo" className="hover:text-creme">Catálogo</a></li>
            <li><a href="#categorias" className="hover:text-creme">Categorias</a></li>
            <li><a href="#historia" className="hover:text-creme">Nossa história</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-creme">Contato</h3>
          <ul className="mt-4 space-y-2 text-sm text-creme/60">
            <li>Estrada Abias da Silva, 2357 — Itaquaciara, Itapecerica da Serra, SP</li>
            <li className="text-creme/40">WhatsApp e horários a confirmar com o proprietário</li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-creme">Formas de pagamento</h3>
          <p className="mt-4 text-sm text-creme/40">A confirmar na Fase 5 do projeto.</p>
        </div>
      </div>

      <div className="border-t border-creme/10 px-6 py-5 text-center text-xs text-creme/40">
        © {new Date().getFullYear()} Recanto da Bicharada. Todos os direitos reservados.
      </div>
    </footer>
  )
}
