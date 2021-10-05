using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProEventos.API.Models;

namespace ProEventos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventoController : ControllerBase
    {
        public IEnumerable<Evento> _evento = new Evento[]{ //Ienumerable é usado só para ler um conjunto de dados
            new Evento()
                {
                    EventoId = 1,
                    Tema = "Angular 11 e Dotnet 5",
                    Local = "Belo Horizonte",
                    Lote = "1º lote",
                    QtdPessoas = 250,
                    DataEvento = DateTime.Now.AddDays(2).ToString("dd/MM/yyyy"),
                    ImagemURL = "imagem1.png"
                },
                new Evento()
                {
                    EventoId = 2,
                    Tema = "Angular 11 e suas novidades!",
                    Local = "São Paulo",
                    Lote = "2º lote",
                    QtdPessoas = 350,
                    DataEvento = DateTime.Now.AddDays(3).ToString("dd/MM/yyyy"),
                    ImagemURL = "imagem2.png"
                },
        };

        public EventoController()
        {
        }

        [HttpGet]
        public IEnumerable<Evento> Get() 
        {
            return _evento;            
        }
        [HttpGet("{id}")]
        public IEnumerable<Evento> GetById(int id) 
        {
            return _evento.Where(a => a.EventoId == id);            
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
