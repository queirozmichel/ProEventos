using System.Threading.Tasks;
using ProEventos.Domain;

namespace ProEventos.Persistence.Contratos
{
    public interface IGeralPersist
    {
        void Add<T>(T entidade) where T : class;
        void Update<T>(T entidade) where T : class;
        void Delete<T>(T entidade) where T : class;
        void DeleteRange<T>(T[] entidade) where T : class;
        Task<bool> SaveChangesAsync();
    }
}