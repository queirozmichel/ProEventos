using System.Threading.Tasks;
using ProEventos.Application.Dtos;

namespace ProEventos.Application.Contratos
{
    public interface ILoteService
    {
        Task<LoteDto[]> SalvarLotes(int eventoId, LoteDto[] model);
        Task<bool> DeleteLote(int eventoId, int loteId);

        Task<LoteDto[]> GetLotesByEventosIdAsync(int eventoId);
        Task<LoteDto> GetLoteByIdsAsync(int eventoId, int loteId);
    }
}