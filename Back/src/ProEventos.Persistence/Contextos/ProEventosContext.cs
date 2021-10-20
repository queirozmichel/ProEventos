using Microsoft.EntityFrameworkCore;
using ProEventos.Domain;

namespace ProEventos.Persistence.Contextos
{
    public class ProEventosContext : DbContext
    {
        public ProEventosContext(DbContextOptions<ProEventosContext> options) : base(options) { }

        public DbSet<Evento> Eventos { get; set; }
        public DbSet<Lote> Lotes { get; set; }
        public DbSet<Palestrante> Palestrantes { get; set; }
        public DbSet<PalestranteEvento> PalestrantesEventos { get; set; }
        public DbSet<RedeSocial> RedesSociais { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {   //para o entity identificar que a tabela PalestranteEvento é muitos para muitos
            modelBuilder.Entity<PalestranteEvento>()
            .HasKey(PE => new { PE.EventoId, PE.palestranteId });

            // Evento tem várias redes sociais mas elas só pode perterncer a um evento apenas
            // quando estiver deletando o Evento, delete tambem a rede social do mesmo em cascata
            modelBuilder.Entity<Evento>()
            .HasMany(e => e.RedesSociais)
            .WithOne(rs => rs.Evento)
            .OnDelete(DeleteBehavior.Cascade);

            // Evento tem várias redes sociais mas elas só podem perterncer a um evento apenas
            // quando estiver deletando o Palestrante, delete tambem a rede social do mesmo em cascata
            modelBuilder.Entity<Palestrante>()
            .HasMany(e => e.RedesSociais)
            .WithOne(rs => rs.Palestrante)
            .OnDelete(DeleteBehavior.Cascade);


        }
    }
}