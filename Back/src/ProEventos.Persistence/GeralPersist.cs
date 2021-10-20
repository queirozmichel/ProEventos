using System.Threading.Tasks;
using ProEventos.Persistence.Contextos;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Persistence
{
    public class GeralPersist : IGeralPersist
    {
        private readonly ProEventosContext _contexto;

        public GeralPersist(ProEventosContext contexto)
        {
            _contexto = contexto;
        }
        public void Add<T>(T entidade) where T : class
        {
            _contexto.Add(entidade);
        }

        public void Updade<T>(T entidade) where T : class
        {
            _contexto.Update(entidade);
        }

        public void Delete<T>(T entidade) where T : class
        {
            _contexto.Remove(entidade);
        }

        public void DeleteRange<T>(T[] entidadeArray) where T : class
        {
            _contexto.RemoveRange(entidadeArray);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _contexto.SaveChangesAsync()) > 0;
        }
    }
}