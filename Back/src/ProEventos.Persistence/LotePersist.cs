using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProEventos.Domain;
using ProEventos.Persistence.Contextos;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Persistence
{
    public class LotePersist : ILotePersist
    {
        private readonly ProEventosContext _contexto;

        public LotePersist(ProEventosContext contexto)
        {
            _contexto = contexto;
        }

        public async Task<Lote> GetLoteByIdsAsync(int eventoId, int loteId)
        {
            IQueryable<Lote> query = _contexto.Lotes;
            query = query.AsNoTracking().Where(lote => lote.EventoId == eventoId && lote.Id == loteId);
            return await query.FirstOrDefaultAsync();
        }

        public async Task<Lote[]> GetLotesByEventoIdAsync(int eventoId)
        {
            IQueryable<Lote> query = _contexto.Lotes;
            query = query.AsNoTracking().Where(lote => lote.EventoId == eventoId);
            return await query.ToArrayAsync();
        }
    }
}