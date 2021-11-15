using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProEventos.Domain;
using ProEventos.Persistence.Contextos;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Persistence
{
    public class PalestrantePersist : IPalestrantePersist
    {
        private readonly ProEventosContext _contexto;

        public PalestrantePersist(ProEventosContext contexto)
        {
            _contexto = contexto;
        }        

        public async Task<Palestrante> GetAllPalestranteByIdAsync(int palestranteId, bool includeEventos)
        {
            IQueryable<Palestrante> query = _contexto.Palestrantes.Include(p => p.RedesSociais);

            if (includeEventos)
            {
                query = query.Include(p => p.PalestrantesEventos).ThenInclude(pe => pe.Evento);
            }
            query = query.AsNoTracking().OrderBy(p => p.Id).Where(p => p.Id == palestranteId);
            return await query.FirstOrDefaultAsync();
        }

        public async Task<Palestrante[]> GetAllPalestrantesAsync(bool includeEventos = false)
        {
            IQueryable<Palestrante> query = _contexto.Palestrantes.Include(p => p.RedesSociais);

            if (includeEventos)
            {
                query = query.Include(p => p.PalestrantesEventos).ThenInclude(pe => pe.Evento);
            }
            query = query.AsNoTracking().OrderBy(p => p.Id);
            return await query.ToArrayAsync();
        }

        public async Task<Palestrante[]> GetAllPalestrantesByNomeAsync(string nome, bool includeEventos)
        {
            IQueryable<Palestrante> query = _contexto.Palestrantes.Include(p => p.RedesSociais);

            if (includeEventos)
            {
                query = query.Include(p => p.PalestrantesEventos).ThenInclude(pe => pe.Evento);
            }
            query = query.AsNoTracking().OrderBy(p => p.Id).Where(p => p.User.PrimeiroNome.ToLower().Contains(nome.ToLower()));
            return await query.ToArrayAsync();
        }
    }
}