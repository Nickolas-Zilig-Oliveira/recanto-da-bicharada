import { Logo } from "./Logo"

export function Footer() {
  return (
    <footer id="contato" className="bg-mata text-creme/80">
      <div className="mx-auto grid max-w-content gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo variant="mark" />
          <p className="mt-4 max-w-[22ch] text-sm leading-relaxed text-creme/60">
            Casa de rações e produtos para animais em Itapecerica da Serra, SP.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-dourado">Loja</h3>
          <ul className="mt-4 space-y-2 text-sm text-creme/70">
            <li><a href="/catalogo" className="hover:text-creme">Catálogo</a></li>
            <li><a href="/#categorias" className="hover:text-creme">Categorias</a></li>
            <li><a href="/#historia" className="hover:text-creme">Nossa história</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-dourado">Contato</h3>
          <ul className="mt-4 space-y-2 text-sm text-creme/70">
            <li>Estrada Abias da Silva, 2357 — Itaquaciara, Itapecerica da Serra, SP</li>
            <li>(11) 4667-1430</li>
            <li>
              <a
                href="https://wa.me/5511993993322"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-creme"
              >
                WhatsApp: (11) 99399-3322
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-dourado">Pagamento</h3>
          <p className="mt-4 text-sm text-creme/60">
            Pedidos online são combinados por telefone/WhatsApp — pagamento na entrega ou retirada.
          </p>
        </div>
      </div>

      <div className="border-t border-creme/10 px-6 py-5 text-center text-xs text-creme/40">
        © {new Date().getFullYear()} Recanto da Bicharada. Todos os direitos reservados.
      </div>
    </footer>
  )
}
