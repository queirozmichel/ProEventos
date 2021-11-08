using System.Threading.Tasks;
using ProEventos.Domain;

namespace ProEventos.Persistence.Contratos
{
    public interface ILotePersist
    {
        Task<Lote[]> GetLotesByEventoIdAsync(int eventoId);
        
        /// <summary>
        /// método que retornará apenas um lote
        /// </summary>
        /// <param name="eventoId"> id do evento</param>
        /// <param name="LoteId">Id do lote</param>
        /// <returns>apenas 1 lote</returns>
        Task<Lote> GetLoteByIdsAsync(int eventoId, int LoteId);
    }
}