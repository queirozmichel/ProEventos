using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProEventos.API.Data;
using ProEventos.API.Models;

namespace ProEventos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventosController : ControllerBase
    {        
        private readonly DataContext _contexto;

        public EventosController(DataContext contexto)
        {
            _contexto = contexto;
        }

        [HttpGet]
        public IEnumerable<Evento> Get()
        {
            return _contexto.Eventos;
        }
        [HttpGet("{id}")]
        public Evento GetById(int id)
        {
            return _contexto.Eventos.FirstOrDefault(a => a.EventoId == id);
        }

        [HttpPost]
        public string Post()
        {
            return "Exemplo de Post";
        }

        [HttpPut("{id}")]
        public string Put(int id)
        {
            return $"Exemplo de Put com ID = {id}";
        }

        [HttpDelete("{id}")]
        public string Delete(int id)
        {
            return $"Exemplo de Delete com ID = {id}";
        }
    }
}
