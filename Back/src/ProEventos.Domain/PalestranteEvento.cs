namespace ProEventos.Domain
{
    public class PalestranteEvento
    {
        public int palestranteId { get; set; }
        public Palestrante Palestrante { get; set; }
        public int EventoId { get; set; }
        public Evento Evento { get; set; }
    }
}